"""
Somfy Protexial
"""

from datetime import timedelta
import logging
import time

from homeassistant.components.alarm_control_panel import AlarmControlPanelEntityFeature
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    ATTR_SW_VERSION,
    CONF_PASSWORD,
    CONF_SCAN_INTERVAL,
    CONF_URL,
    CONF_USERNAME,
    Platform,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers import aiohttp_client, device_registry as dr
from homeassistant.helpers.device_registry import CONNECTION_NETWORK_MAC
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.typing import ConfigType
from homeassistant.helpers.storage import Store
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util

from .const import (
    API,
    CONF_API_TYPE,
    CONF_CODES,
    CONF_HOME_ZONES,
    CONF_IMAGE_COUNT,
    CONF_IMAGE_SERVER_URL,
    CONF_INSTALLER_PASSWORD,
    CONF_INSTALLER_USERNAME,
    CONF_MODES,
    CONF_NIGHT_ZONES,
    COORDINATOR,
    DEVICE_INFO,
    REFRESH_ELEMENTS,
    REFRESH_INTERVAL_STORE,
    DOMAIN,
    ApiType,
    Zone,
)
from .protexial import SomfyProtexial

_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL = timedelta(seconds=20)

PLATFORMS = [
    Platform.ALARM_CONTROL_PANEL,
    Platform.BINARY_SENSOR,
    Platform.BUTTON,
    Platform.COVER,
    Platform.LIGHT,
    Platform.IMAGE,
    Platform.NUMBER,
    Platform.SELECT,
    Platform.SENSOR,
    Platform.SWITCH,
]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    if hass.data.get(DOMAIN) is None:
        hass.data.setdefault(DOMAIN, {})

    session = aiohttp_client.async_create_clientsession(hass)

    protexial = SomfyProtexial(
        session=session,
        url=entry.data.get(CONF_URL),
        api_type=entry.data.get(CONF_API_TYPE),
        username=entry.data.get(CONF_USERNAME),
        password=entry.data.get(CONF_PASSWORD),
        codes=entry.data.get(CONF_CODES),
        installer_username=entry.data.get(CONF_INSTALLER_USERNAME),
        installer_password=entry.data.get(CONF_INSTALLER_PASSWORD),
    )

    await protexial.init()

    last_status = None
    last_elements = []
    last_journal = []
    last_journal_refresh = 0.0
    last_images = []
    last_image_event = None
    last_image_event_count = None
    last_ftp = None
    last_local_communication = None
    last_image_transmitter = None
    last_image_transmitter_next_update = None

    image_server_url = str(entry.data.get(CONF_IMAGE_SERVER_URL, "") or "").strip().rstrip("/")
    image_count = int(entry.data.get(CONF_IMAGE_COUNT, 5))

    async def _refresh_elements():
        """Refresh and update the shared elements cache."""
        nonlocal last_elements
        last_elements = await protexial.get_elements()
        return last_elements

    async def _get_status():
        nonlocal last_status, last_elements, last_journal, last_journal_refresh
        nonlocal last_images, last_image_event, last_image_event_count
        nonlocal last_ftp, last_local_communication
        nonlocal last_image_transmitter, last_image_transmitter_next_update
        try:
            st = await protexial.get_status()
            current_status = {
                "zoneA": st.zoneA,
                "zoneB": st.zoneB,
                "zoneC": st.zoneC,
                "battery": st.battery,
                "radio": st.radio,
                "door": st.door,
                "alarm": st.alarm,
                "box": st.box,
                "gsm": st.gsm,
                "recgsm": st.recgsm,
                "opegsm": st.opegsm,
                "camera": st.camera,
            }
            _LOGGER.debug("new status: %s - old: %s", current_status, last_status)

            status_changed = current_status != last_status
            door_open = current_status.get("door") != "ok"

            if status_changed or door_open:
                if status_changed:
                    _LOGGER.info("Status changed: %s - old: %s", current_status, last_status)
                last_status = current_status
                await _refresh_elements()

            # The event journal is useful but does not need to be fetched at
            # every normal status refresh. Refresh it at most every 5 minutes
            # and keep the last known-good value if the journal page fails.
            now_monotonic = time.monotonic()
            if not last_journal or now_monotonic - last_journal_refresh >= 300:
                try:
                    last_journal = await protexial.get_event_journal(limit=10)
                    last_journal_refresh = now_monotonic
                except Exception as journal_err:
                    _LOGGER.warning(
                        "Unable to refresh Somfy event journal; keeping previous data: %s",
                        journal_err,
                    )
                    # Avoid hammering an unsupported/temporarily unavailable
                    # page on every coordinator refresh.
                    last_journal_refresh = now_monotonic

            # Read the image transmitter link directly from u_regcam.htm.
            # This is the state represented by Somfy's "Liaison transmetteur"
            # icon (domisdns_status_com_0x00 / 0x01 / 0x02 / 0x03 / off).
            # A temporary failure here must not make the alarm unavailable:
            # retain the last successfully read value.
            try:
                transmitter = await protexial.get_image_transmitter_status()
                if transmitter.get("status") is not None:
                    last_image_transmitter = transmitter.get("status")
                    last_image_transmitter_next_update = transmitter.get("next_update")
            except Exception as transmitter_err:
                _LOGGER.warning(
                    "Unable to refresh Somfy image transmitter status: %s",
                    transmitter_err,
                )

            # Optional local image server (Somfy local stack). Image errors
            # must never make the alarm entities unavailable, so retain the
            # last successful values if the gallery/API is temporarily down.
            if image_server_url:
                try:
                    async with session.get(
                        f"{image_server_url}/api/images",
                        params={"limit": image_count},
                        timeout=10,
                    ) as response:
                        response.raise_for_status()
                        payload = await response.json(content_type=None)
                    images = payload.get("images", [])
                    if isinstance(images, list):
                        last_images = images[:image_count]
                except Exception as image_err:
                    _LOGGER.warning(
                        "Unable to refresh Somfy images from %s: %s",
                        image_server_url,
                        image_err,
                    )

                # Latest event metadata. The event endpoint gives the real
                # image count even when it is greater than the number of
                # recent image entities configured in Home Assistant.
                try:
                    async with session.get(
                        f"{image_server_url}/api/events",
                        params={"limit": 1},
                        timeout=10,
                    ) as response:
                        response.raise_for_status()
                        events_payload = await response.json(content_type=None)
                    events = events_payload.get("events", [])
                    if isinstance(events, list) and events:
                        latest_event = events[0]
                        if isinstance(latest_event, dict):
                            last_image_event = latest_event.get("event")
                            last_image_event_count = latest_event.get("image_count")
                except Exception as event_err:
                    _LOGGER.warning(
                        "Unable to refresh Somfy image events from %s: %s",
                        image_server_url,
                        event_err,
                    )
                    # Compatibility fallback for an older stack.
                    if last_images:
                        last_image_event = last_images[0].get("event")
                        last_image_event_count = sum(
                            1
                            for image in last_images
                            if image.get("event") == last_image_event
                        )

                # Diagnostics exported by the newer local stack.
                try:
                    async with session.get(
                        f"{image_server_url}/api/status",
                        timeout=10,
                    ) as response:
                        response.raise_for_status()
                        stack_status = await response.json(content_type=None)

                    ftp_value = stack_status.get("last_ftp")
                    if ftp_value:
                        parsed_ftp = dt_util.parse_datetime(str(ftp_value))
                        if parsed_ftp is not None:
                            last_ftp = parsed_ftp

                    communication_value = stack_status.get("last_communication")
                    if communication_value:
                        parsed_communication = dt_util.parse_datetime(
                            str(communication_value)
                        )
                        if parsed_communication is not None:
                            last_local_communication = parsed_communication
                except Exception as status_err:
                    _LOGGER.warning(
                        "Unable to refresh Somfy local stack status from %s: %s",
                        image_server_url,
                        status_err,
                    )

            # Compute age of the most recent image.
            last_image_age = None
            if last_images:
                received_at = last_images[0].get("received_at")
                if received_at:
                    parsed_received = dt_util.parse_datetime(str(received_at))
                    if parsed_received is not None:
                        now = dt_util.utcnow()
                        if parsed_received.tzinfo is None:
                            parsed_received = parsed_received.replace(tzinfo=now.tzinfo)
                        last_image_age = max(0, int((now - parsed_received).total_seconds()))

            status_dict = {
                **current_status,
                "elements": last_elements,
                "event_journal": last_journal,
                "last_sync": dt_util.utcnow(),
                "images": last_images,
                "image_transmitter": last_image_transmitter,
                "image_transmitter_next_update": last_image_transmitter_next_update,
                "last_image_event": last_image_event,
                "last_image_event_count": last_image_event_count,
                "last_image_age": last_image_age,
                "last_ftp": last_ftp,
                "last_local_communication": last_local_communication,
            }
            return status_dict
        except Exception as err:
            raise UpdateFailed(f"Error communicating with API: {err}")

    # The config-entry value is only the initial/default value. Once the
    # refresh interval entity has been used, its dedicated Store value is the
    # single source of truth across reloads and Home Assistant restarts.
    refresh_interval_store = Store(
        hass, 1, f"{DOMAIN}.{entry.entry_id}.refresh_interval"
    )
    stored_refresh_interval = await refresh_interval_store.async_load()
    if isinstance(stored_refresh_interval, dict):
        stored_refresh_interval = stored_refresh_interval.get("value")
    try:
        scan_interval = int(stored_refresh_interval)
    except (TypeError, ValueError):
        scan_interval = int(entry.data.get(CONF_SCAN_INTERVAL, 60))
    if not 0 <= scan_interval <= 86400:
        scan_interval = int(entry.data.get(CONF_SCAN_INTERVAL, 60))
    update_interval = None if scan_interval == 0 else timedelta(seconds=scan_interval)

    coordinator = DataUpdateCoordinator(
        hass,
        _LOGGER,
        name="Somfy Protexial status update",
        update_method=_get_status,
        update_interval=update_interval,
    )

    device_registry = dr.async_get(hass)
    device_registry.async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(DOMAIN, "centrale")},
        connections={(CONNECTION_NETWORK_MAC, entry.data.get(CONF_URL))},
        manufacturer="Somfy",
        name="Somfy Protexial",
        model="Protexial",
        sw_version=entry.data.get(ATTR_SW_VERSION),
    )

    device_info = DeviceInfo(
        identifiers={(DOMAIN, "centrale")},
        connections={(CONNECTION_NETWORK_MAC, entry.data.get(CONF_URL))},
        name="Somfy Protexial",
        manufacturer="Somfy",
        model="Protexial",
        sw_version=entry.data.get(ATTR_SW_VERSION),
    )

    hass.data[DOMAIN][entry.entry_id] = {
        API: protexial,
        COORDINATOR: coordinator,
        DEVICE_INFO: device_info,
        REFRESH_ELEMENTS: _refresh_elements,
        REFRESH_INTERVAL_STORE: refresh_interval_store,
    }

    entry.async_on_unload(entry.add_update_listener(async_reload_entry))

    await coordinator.async_config_entry_first_refresh()

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    api = hass.data[DOMAIN][entry.entry_id][API]
    await api.logout()

    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)

    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id)

    return unload_ok


async def async_migrate_entry(hass: HomeAssistant, config_entry: ConfigEntry):
    """Migrate old entry."""
    _LOGGER.debug("Migrating from version %s", config_entry.version)

    if config_entry.version == 1:
        applyMigration = False
        new = None
        if config_entry.minor_version < 2:
            new = {**config_entry.data}
            new[CONF_API_TYPE] = ApiType.PROTEXIAL
            applyMigration = True

        if config_entry.minor_version < 3:
            new = {**config_entry.data} if new is None else new

            currentModes = config_entry.data[CONF_MODES]
            hasNightMode = any(
                m == AlarmControlPanelEntityFeature.ARM_NIGHT for m in currentModes
            )
            hasHomeMode = any(
                m == AlarmControlPanelEntityFeature.ARM_HOME for m in currentModes
            )

            new[CONF_NIGHT_ZONES] = (
                Zone.A.value + Zone.B.value if hasNightMode else Zone.NONE.value
            )
            new[CONF_HOME_ZONES] = Zone.A.value if hasHomeMode else Zone.NONE.value
            del new[CONF_MODES]
            applyMigration = True

        if applyMigration:
            hass.config_entries.async_update_entry(
                config_entry, data=new, minor_version=3, version=1
            )
            _LOGGER.debug(
                "Migration to version %s.%s successful",
                config_entry.version,
                config_entry.minor_version,
            )
    return True


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle an options update."""
    await hass.config_entries.async_reload(entry.entry_id)
