from enum import Enum, auto

from homeassistant.components.binary_sensor import BinarySensorDeviceClass

# Added to handle sensors
from homeassistant.components.sensor import SensorDeviceClass
from homeassistant.const import EntityCategory, UnitOfTime

DOMAIN = "somfy_protexial"
IMAGE_SURVEILLANCE_STATE_SIGNAL = f"{DOMAIN}_image_surveillance_state"

CONF_API_TYPE = "api_type"
CONF_CODE = "code"
CONF_CODES = "codes"
CONF_MODES = "modes"
CONF_ARM_CODE = "arm_code"
CONF_NIGHT_ZONES = "night_zones"
CONF_HOME_ZONES = "home_zones"
CONF_IMAGE_SERVER_URL = "image_server_url"
CONF_IMAGE_COUNT = "image_count"

API = "api"
COORDINATOR = "coordinator"
DEVICE_INFO = "device_info"

CHALLENGE_REGEX = r"\b[A-F][1-5]\b"

HTTP_TIMEOUT = 10

LIST_ELEMENTS = "/fr/u_plistelmt.htm"
LIST_ELEMENTS_PRINT = "/fr/p_ulistelem.htm"
LIST_ELEMENTS_NOLANG = (
    "/u_plistelmt.htm"  # variante vue sur d'autres firmwares sans le préfixe de langue
)
LIST_ELEMENTS_ALT = "/fr/u_listelmt.htm"  # variante vue sur d'autres firmwares
LIST_ELEMENTS_ALT_NOLANG = (
    "/u_listelmt.htm"  # variante vue sur d'autres firmwares sans le préfixe de langue
)


class SomfyError(str, Enum):
    WRONG_CODE = "(0x0B00)"
    MAX_LOGIN_ATTEMPTS = "(0x0904)"
    WRONG_CREDENTIALS = "(0x0812)"
    SESSION_ALREADY_OPEN = "(0x0902)"
    NOT_AUTHORIZED = "(0x0903)"
    UNKNOWN_PARAMETER = "(0x1003)"
    WRONG_CODE_ALT = "(0x1101)"
    WRONG_CREDENTIALS_ALT = "(0x0901)"
    WRONG_CREDENTIALS_2_ALT = "(0x0810)"
    INCORRECT_ACCESS_RIGHTS = "(0x0811)"
    UNEXPECTED_ERROR = "(0x0000)"


class Zone(Enum):
    NONE = 0
    A = 1
    B = 2
    C = 4
    ABC = 7


ALL_ZONES = ["0", "1", "2", "4", "3", "6", "5"]


class ApiType(str, Enum):
    PROTEXIAL = "protexial"
    PROTEXIOM = "protexiom"
    PROTEXIAL_IO = "protexial_io"
    PROTEXIOM_ALT = "protexiom_alt"


class Page(str, Enum):
    LOGIN = "login"
    LOGOUT = "logout"
    PILOTAGE = "pilotage"
    STATUS = "status"
    CAMERA = "camera"
    ERROR = "error"
    ELEMENTS = "elements"
    CHALLENGE_CARD = "challenge_card"
    VERSION = "version"
    DEFAULT = "default"


class Selector(str, Enum):
    CONTENT_TYPE = "content_type"
    LOGIN_CHALLENGE = "login_challenge"
    ERROR_CODE = "error_code"
    FOOTER = "footer"
    CHALLENGE_CARD = "challenge_card"


IMAGE_SURVEILLANCE_BINARY_SENSOR = {
    "id": "image_surveillance",
    "translation_key": "image_surveillance",
    "icon_on": "mdi:camera-outline",
    "icon_off": "mdi:camera-off-outline",
    "icon_unknown": "mdi:camera-question-outline",
}

IMAGE_TRANSMITTER_BINARY_SENSOR = {
    "id": "image_transmitter",
    "translation_key": "image_transmitter",
    "icon_on": "mdi:link",
    "icon_off": "mdi:link-off",
    "icon_unknown": "mdi:lan-pending",
}

BINARY_SENSORS = [
    {
        "id": "battery",
        "translation_key": "battery",
        "device_class": BinarySensorDeviceClass.BATTERY,
        "icon_on": "mdi:battery-alert",
        "icon_off": "mdi:battery",
        "off_if": "ok",
    },
    {
        "id": "alarm",
        "translation_key": "alarm",
        "device_class": BinarySensorDeviceClass.MOTION,
        "icon_on": "mdi:motion-sensor",
        "icon_off": "mdi:motion-sensor-off",
        "off_if": "ok",
    },
    {
        "id": "door",
        "translation_key": "door",
        "device_class": BinarySensorDeviceClass.DOOR,
        "icon_on": "mdi:door-open",
        "icon_off": "mdi:door-closed",
        "off_if": "ok",
    },
    {
        # Jeedom's reference plugin (phpProtexiom.class.php) maps this same
        # status.xml tag (defaut4) to a dedicated "TAMPERED" info cmd with
        # device_class SABOTAGE: it is the centrale's box self-protection
        # (autoprotection) flag, not a generic problem flag. Renamed/
        # reclassified accordingly (was "Centrale" / PROBLEM).
        "id": "box",
        "translation_key": "box",
        "device_class": BinarySensorDeviceClass.TAMPER,
        "icon_on": "mdi:shield-alert",
        "icon_off": "mdi:shield-check",
        "off_if": "ok",
    },
    {
        "id": "radio",
        "translation_key": "radio",
        "device_class": BinarySensorDeviceClass.CONNECTIVITY,
        "icon_on": "mdi:access-point",
        "icon_off": "mdi:access-point-off",
        "on_if": "ok",
    },
    {
        "id": "gsm",
        "translation_key": "gsm",
        "device_class": BinarySensorDeviceClass.CONNECTIVITY,
        "icon_on": "mdi:cellphone",
        "icon_off": "mdi:cellphone-off",
        "on_if": "gsm connect au rseau",  # Filtered: "GSM connecté au réseau"
    },
    {
        "id": "camera",
        "translation_key": "camera",
        "device_class": BinarySensorDeviceClass.CONNECTIVITY,
        "icon_on": "mdi:cctv",
        "icon_off": "mdi:cctv-off",
        "on_if": "enabled",
    },
]
# Added SENSOR platform for GSM Provider and GSM Signal Strength
SENSORS = [
    {
        "id": "opegsm",
        "translation_key": "opegsm",
        "device_class": SensorDeviceClass.ENUM,
        "icon": "mdi:signal",
    },
    {
        "id": "recgsm",
        "translation_key": "recgsm",
        "icon": "mdi:signal-2g",
    },
    {
        "id": "last_image_event",
        "translation_key": "last_image_event",
        "icon": "mdi:calendar-range",
    },
    {
        "id": "last_image_event_count",
        "translation_key": "last_image_event_count",
        "icon": "mdi:image-multiple",
    },
    {
        "id": "last_image_age",
        "translation_key": "last_image_age",
        "device_class": SensorDeviceClass.DURATION,
        "native_unit_of_measurement": UnitOfTime.SECONDS,
        "icon": "mdi:timer-sand",
    },
    {
        "id": "last_ftp",
        "translation_key": "last_ftp",
        "device_class": SensorDeviceClass.TIMESTAMP,
        "icon": "mdi:file-download",
        "entity_category": EntityCategory.DIAGNOSTIC,
    },
    {
        "id": "last_local_communication",
        "translation_key": "last_local_communication",
        "device_class": SensorDeviceClass.TIMESTAMP,
        "icon": "mdi:web-check",
        "entity_category": EntityCategory.DIAGNOSTIC,
    },
    {
        # Diagnostic entity mirroring Jeedom's lastCommunication/timeout
        # info (checkAndUpdateCmdProtexiom()): timestamp of the last poll
        # that successfully reached the centrale. Lets you spot a centrale
        # that has stopped responding without having to read the logs.
        "id": "last_sync",
        "translation_key": "last_sync",
        "device_class": SensorDeviceClass.TIMESTAMP,
        "icon": "mdi:clock-check-outline",
        "entity_category": EntityCategory.DIAGNOSTIC,
    },
]

# Buttons to acknowledge/reset the 3 "defaut" flags that the centrale never
# clears on its own (defaut0/battery, defaut1/radio, defaut3/alarm). Each
# "id" matches one-to-one with a SomfyProtexial.reset_xxx() coroutine name,
# itself based on the Jeedom plugin's EraseDefault commands
# (RESET_BATTERY_ERR / RESET_ALARM_ERR / RESET_LINK_ERR).
BUTTONS = [
    {
        "id": "reset_battery_err",
        "translation_key": "reset_battery_err",
        "icon": "mdi:battery-off-outline",
    },
    {
        "id": "reset_alarm_err",
        "translation_key": "reset_alarm_err",
        "icon": "mdi:alarm-light-off-outline",
    },
    {
        "id": "reset_link_err",
        "translation_key": "reset_link_err",
        "icon": "mdi:access-point-off",
    },
    {
        "id": "start_image_surveillance",
        "translation_key": "start_image_surveillance",
        "icon": "mdi:camera-wireless",
        "entity_category": None,
    },
    {
        "id": "stop_image_surveillance",
        "translation_key": "stop_image_surveillance",
        "icon": "mdi:camera-off-outline",
        "entity_category": None,
    },
]
