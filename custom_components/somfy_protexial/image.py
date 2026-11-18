"""Image platform exposing the latest photos received by the local Somfy stack."""

from __future__ import annotations

from datetime import datetime
import logging

from homeassistant.components.image import ImageEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import dt as dt_util

from .const import (
    CONF_IMAGE_COUNT,
    CONF_IMAGE_SERVER_URL,
    COORDINATOR,
    DEVICE_INFO,
    DOMAIN,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up recent Somfy image entities."""
    image_server_url = str(
        config_entry.data.get(CONF_IMAGE_SERVER_URL, "") or ""
    ).strip()
    if not image_server_url:
        _LOGGER.debug("No Somfy image server configured; image platform disabled")
        return

    coordinator = hass.data[DOMAIN][config_entry.entry_id][COORDINATOR]
    device_info = hass.data[DOMAIN][config_entry.entry_id][DEVICE_INFO]
    image_count = int(config_entry.data.get(CONF_IMAGE_COUNT, 5))

    async_add_entities(
        SomfyRecentImage(device_info, coordinator, config_entry.entry_id, slot)
        for slot in range(image_count)
    )


class SomfyRecentImage(CoordinatorEntity, ImageEntity):
    """One slot in the list of most recently received Somfy photos."""

    _attr_has_entity_name = True
    _attr_translation_key = "recent_image"
    _attr_content_type = "image/jpeg"

    def __init__(self, device_info, coordinator, entry_id: str, slot: int) -> None:
        """Initialize a recent-image slot."""
        CoordinatorEntity.__init__(self, coordinator)
        ImageEntity.__init__(self, coordinator.hass)
        self._slot = slot
        self._attr_unique_id = f"{entry_id}_recent_image_{slot + 1}"
        self._attr_device_info = device_info
        self._attr_translation_placeholders = {"number": str(slot + 1)}
        self._image: dict | None = None
        self._attr_image_last_updated = None

        self._refresh_from_coordinator()

    def _refresh_from_coordinator(self) -> None:
        images = (self.coordinator.data or {}).get("images", []) or []
        image = images[self._slot] if self._slot < len(images) else None
        previous_url = self._image_url_value(self._image)
        self._image = image if isinstance(image, dict) else None
        current_url = self._image_url_value(self._image)

        if current_url != previous_url:
            # ImageEntity caches remote URLs. Drop that cache when a slot now
            # points to a different photo.
            self._cached_image = None

        received_at = self._image.get("received_at") if self._image else None
        parsed: datetime | None = None
        if received_at:
            parsed = dt_util.parse_datetime(str(received_at))
        self._attr_image_last_updated = parsed

    @staticmethod
    def _image_url_value(image: dict | None) -> str | None:
        if not image:
            return None
        return image.get("absolute_url") or image.get("url")

    @property
    def available(self) -> bool:
        """Return True when this slot currently contains an image."""
        return super().available and self._image is not None and self.image_url is not None

    @property
    def image_url(self) -> str | None:
        """Return the HTTP URL of the current image."""
        return self._image_url_value(self._image)

    @property
    def extra_state_attributes(self) -> dict:
        """Expose useful metadata for dashboards and automations."""
        if not self._image:
            return {}
    
        return {
            "source_url": self._image_url_value(self._image),
            "detector": self._image.get("detector"),
            "type": self._image.get("type"),
            "event": self._image.get("event"),
            "filename": self._image.get("filename"),
            "size": self._image.get("size"),
            "received_at": self._image.get("received_at"),
        }

    def _handle_coordinator_update(self) -> None:
        """Handle a refreshed image list."""
        self._refresh_from_coordinator()
        self.async_write_ha_state()
