/* ========================================================
   Somfy Protexial / Protexiom Card - Elements
   ======================================================== */

const ELEMENTS_CARD_VERSION = "v2.1.8";

const ELEMENTS_TRANSLATIONS = {
  fr: {
    battery:"Batterie", link:"Liaison", house:"Défaut", tamper:"Arrachement", door:"Ouverture", state:"État", zone:"Zone",
    openings:"Ouvertures", motion:"Mouvements", technical:"Technique", control:"Centrale", sirens:"Sirènes", keypads:"Claviers",
    remotes:"Télécommandes", badges:"Badges", other:"Autres", total:"Nombre total d’éléments", errors:"Éléments en erreur",
    allOk:"Tout est OK", fault:"Défaut détecté", unavailable:"Indisponible", unknown:"Inconnu", pause:"Pause", reactivate:"Réactiver",
    pauseTitle:"Mettre l’élément en pause", reactivateTitle:"Réactiver l’élément", loading:"Chargement des éléments…",
    noDevice:"Sélectionne l’appareil Somfy dans l’éditeur.", noElements:"Aucun élément Somfy avec attributs de diagnostic n’a été trouvé.",
    device:"Appareil Somfy", title:"Titre", onlyProblems:"Afficher uniquement les équipements en défaut",
    showEntityId:"Afficher les entity_id", compact:"Mode compact"
  },
  en: {
    battery:"Battery", link:"Link", house:"Fault", tamper:"Tamper", door:"Opening", state:"State", zone:"Zone",
    openings:"Openings", motion:"Motion", technical:"Technical", control:"Control", sirens:"Sirens", keypads:"Keypads",
    remotes:"Remotes", badges:"Badges", other:"Other", total:"Total equipment", errors:"Equipment with errors",
    allOk:"Everything OK", fault:"Fault detected", unavailable:"Unavailable", unknown:"Unknown", pause:"Pause", reactivate:"Reactivate",
    pauseTitle:"Pause equipment", reactivateTitle:"Reactivate equipment", loading:"Loading equipment…",
    noDevice:"Select the Somfy device in the editor.", noElements:"No Somfy equipment with diagnostic attributes was found.",
    device:"Somfy device", title:"Title", onlyProblems:"Show only equipment with faults", showEntityId:"Show entity IDs", compact:"Compact mode"
  },
  de: {
    battery:"Batterie", link:"Verbindung", house:"Fehler", tamper:"Sabotage", door:"Öffnung", state:"Status", zone:"Zone",
    openings:"Öffnungen", motion:"Bewegung", technical:"Technik", control:"Zentrale", sirens:"Sirenen", keypads:"Tastaturen",
    remotes:"Fernbedienungen", badges:"Badges", other:"Andere", total:"Anzahl Elemente", errors:"Elemente mit Fehler",
    allOk:"Alles OK", fault:"Fehler erkannt", unavailable:"Nicht verfügbar", unknown:"Unbekannt", pause:"Pausieren", reactivate:"Reaktivieren",
    pauseTitle:"Element pausieren", reactivateTitle:"Element reaktivieren", loading:"Elemente werden geladen…",
    noDevice:"Somfy-Gerät im Editor auswählen.", noElements:"Keine Somfy-Elemente mit Diagnoseattributen gefunden.",
    device:"Somfy-Gerät", title:"Titel", onlyProblems:"Nur fehlerhafte Geräte anzeigen", showEntityId:"Entity-IDs anzeigen", compact:"Kompaktmodus"
  },
  es: {
    battery:"Batería", link:"Enlace", house:"Fallo", tamper:"Sabotaje", door:"Apertura", state:"Estado", zone:"Zona",
    openings:"Aperturas", motion:"Movimiento", technical:"Técnico", control:"Central", sirens:"Sirenas", keypads:"Teclados",
    remotes:"Mandos", badges:"Badges", other:"Otros", total:"Número total de elementos", errors:"Elementos con error",
    allOk:"Todo OK", fault:"Fallo detectado", unavailable:"No disponible", unknown:"Desconocido", pause:"Pausar", reactivate:"Reactivar",
    pauseTitle:"Pausar elemento", reactivateTitle:"Reactivar elemento", loading:"Cargando elementos…",
    noDevice:"Selecciona el dispositivo Somfy en el editor.", noElements:"No se encontraron elementos Somfy con atributos de diagnóstico.",
    device:"Dispositivo Somfy", title:"Título", onlyProblems:"Mostrar solo equipos con fallos", showEntityId:"Mostrar entity_id", compact:"Modo compacto"
  },
  it: {
    battery:"Batteria", link:"Collegamento", house:"Anomalia", tamper:"Manomissione", door:"Apertura", state:"Stato", zone:"Zona",
    openings:"Aperture", motion:"Movimento", technical:"Tecnico", control:"Centrale", sirens:"Sirene", keypads:"Tastiere",
    remotes:"Telecomandi", badges:"Badge", other:"Altri", total:"Numero totale elementi", errors:"Elementi in errore",
    allOk:"Tutto OK", fault:"Anomalia rilevata", unavailable:"Non disponibile", unknown:"Sconosciuto", pause:"Pausa", reactivate:"Riattiva",
    pauseTitle:"Metti in pausa l’elemento", reactivateTitle:"Riattiva l’elemento", loading:"Caricamento elementi…",
    noDevice:"Seleziona il dispositivo Somfy nell’editor.", noElements:"Nessun elemento Somfy con attributi diagnostici trovato.",
    device:"Dispositivo Somfy", title:"Titolo", onlyProblems:"Mostra solo dispositivi con anomalie", showEntityId:"Mostra entity_id", compact:"Modalità compatta"
  },
  nl: {
    battery:"Batterij", link:"Verbinding", house:"Storing", tamper:"Sabotage", door:"Opening", state:"Status", zone:"Zone",
    openings:"Openingen", motion:"Beweging", technical:"Techniek", control:"Centrale", sirens:"Sirenes", keypads:"Bedienpanelen",
    remotes:"Afstandsbedieningen", badges:"Badges", other:"Overige", total:"Totaal aantal elementen", errors:"Elementen met fout",
    allOk:"Alles OK", fault:"Fout gedetecteerd", unavailable:"Niet beschikbaar", unknown:"Onbekend", pause:"Pauze", reactivate:"Heractiveren",
    pauseTitle:"Element pauzeren", reactivateTitle:"Element heractiveren", loading:"Elementen laden…",
    noDevice:"Selecteer het Somfy-apparaat in de editor.", noElements:"Geen Somfy-elementen met diagnostische attributen gevonden.",
    device:"Somfy-apparaat", title:"Titel", onlyProblems:"Alleen apparaten met fouten tonen", showEntityId:"Entity-ID’s tonen", compact:"Compacte modus"
  },
  pt: {
    battery:"Bateria", link:"Ligação", house:"Falha", tamper:"Violação", door:"Abertura", state:"Estado", zone:"Zona",
    openings:"Aberturas", motion:"Movimento", technical:"Técnico", control:"Central", sirens:"Sirenes", keypads:"Teclados",
    remotes:"Comandos", badges:"Crachás", other:"Outros", total:"Número total de elementos", errors:"Elementos com erro",
    allOk:"Tudo OK", fault:"Falha detetada", unavailable:"Indisponível", unknown:"Desconhecido", pause:"Pausa", reactivate:"Reativar",
    pauseTitle:"Colocar elemento em pausa", reactivateTitle:"Reativar elemento", loading:"A carregar elementos…",
    noDevice:"Selecione o dispositivo Somfy no editor.", noElements:"Nenhum elemento Somfy com atributos de diagnóstico foi encontrado.",
    device:"Dispositivo Somfy", title:"Título", onlyProblems:"Mostrar apenas equipamentos com falhas", showEntityId:"Mostrar entity_id", compact:"Modo compacto"
  }
};

function elementsLanguage(hass) {
  const language = (hass?.locale?.language || hass?.language || navigator.language || "en").toLowerCase().split("-")[0];
  return ELEMENTS_TRANSLATIONS[language] ? language : "en";
}

function et(hass, key) {
  const lang = elementsLanguage(hass);
  return ELEMENTS_TRANSLATIONS[lang]?.[key] || ELEMENTS_TRANSLATIONS.en[key] || key;
}

const ELEMENT_ATTRS = [
  { key: "Battery", tkey: "battery", fr: "Batterie", en: "Battery", icon: "mdi:battery", ok: ["ok"] },
  { key: "Link", tkey: "link", fr: "Liaison", en: "Link", icon: "mdi:radio-tower", ok: ["connected"] },
  { key: "House", tkey: "house", fr: "Défaut", en: "House", icon: "mdi:home-alert", ok: ["ok"] },
  { key: "Tamper", tkey: "tamper", fr: "Arrachement", en: "Tamper", icon: "mdi:shield-alert", ok: ["ok"] },
  { key: "Door open", tkey: "door", fr: "Ouverture", en: "Door", icon: "mdi:door", ok: ["closed"] },
  { key: "Running", tkey: "state", fr: "État", en: "State", icon: "mdi:pause-circle-outline", ok: ["running"] },
  { key: "Zone", tkey: "zone", fr: "Zone", en: "Zone", icon: "mdi:map-marker-radius", neutral: true },
];

const ELEMENT_CATEGORIES = [
  { key: "opening", tkey:"openings", fr: "Ouvertures", en: "Openings", icon: "mdi:door-open" },
  { key: "motion", tkey:"motion", fr: "Mouvements", en: "Motion", icon: "mdi:motion-sensor" },
  { key: "technical", tkey:"technical", fr: "Technique", en: "Technical", icon: "mdi:cog-outline" },
];

const TECHNICAL_SUBCATEGORIES = [
  { key: "control", tkey:"control", fr: "Centrale", en: "Control", icon: "mdi:shield-home-outline" },
  { key: "siren", tkey:"sirens", fr: "Sirènes", en: "Sirens", icon: "mdi:bullhorn" },
  { key: "keypad", tkey:"keypads", fr: "Claviers", en: "Keypads", icon: "mdi:dialpad" },
  { key: "remote", tkey:"remotes", fr: "Télécommandes", en: "Remotes", icon: "mdi:remote" },
  { key: "badge", tkey:"badges", fr: "Badges", en: "Badges", icon: "mdi:key-variant" },
  { key: "other", tkey:"other", fr: "Autres", en: "Other", icon: "mdi:dots-horizontal-circle-outline" },
];

function spLang(hass) { return elementsLanguage(hass); }

function spMoreInfo(el, entityId) {
  el.dispatchEvent(new CustomEvent("hass-more-info", {
    detail: { entityId }, bubbles: true, composed: true
  }));
}

class SomfyProtexialElementsCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = {};
    this._built = false;
    this._language = null;
  }

  set hass(hass) {
    const newLanguage = elementsLanguage(hass);
    const languageChanged =
      this._language &&
      this._language !== newLanguage;

    this._hass = hass;
    this._language = newLanguage;

    // Build the form only once during normal Home Assistant updates.
    // Rebuilding/reassigning form.hass continuously can make the
    // device selector close/reopen while its menu is displayed.
    if (!this._built || languageChanged) {
      this._render();
    }
  }

  setConfig(config) {
    const nextConfig = { ...config };

    // When an existing card is reopened, Home Assistant may call `hass`
    // before `setConfig()`. The form may therefore already exist with an
    // empty device_id. Restore the saved configuration only when it is
    // genuinely different from the editor's current configuration.
    const previousData = this._formData();
    const nextData = this._formDataFor(nextConfig);
    const configChanged =
      JSON.stringify(previousData) !== JSON.stringify(nextData);

    this._config = nextConfig;

    if (!this._built) {
      this._render();
      return;
    }

    // Do not reassign form.data for changes originating from this same
    // editor: _fire() already stored the new config before Home Assistant
    // calls setConfig() back. This prevents selector refresh loops.
    if (configChanged) {
      const form = this.shadowRoot.getElementById("form");
      if (form) {
        form.data = nextData;
      }
    }
  }

  _fire(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true
    }));
  }

  _formDataFor(config = {}) {
    return {
      device_id: config.device_id || "",
      title: config.title || "",
      only_problems: config.only_problems === true,
      show_entity_id: config.show_entity_id === true,
      compact: config.compact === true,
    };
  }

  _formData() {
    return this._formDataFor(this._config);
  }

  _render() {
    if (!this._hass) return;

    this._built = true;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display:block;
        }

        ha-form {
          display:block;
        }
      </style>

      <ha-form id="form"></ha-form>
    `;

    const form = this.shadowRoot.getElementById("form");

    form.hass = this._hass;
    form.schema = [
      { name: "device_id", selector: { device: {} } },
      { name: "title", selector: { text: {} } },
      { name: "only_problems", selector: { boolean: {} } },
      { name: "show_entity_id", selector: { boolean: {} } },
      { name: "compact", selector: { boolean: {} } },
    ];

    form.data = this._formData();

    form.computeLabel = field => {
      const labels = {
        device_id: et(this._hass, "device"),
        title: et(this._hass, "title"),
        only_problems: et(this._hass, "onlyProblems"),
        show_entity_id: et(this._hass, "showEntityId"),
        compact: et(this._hass, "compact"),
      };

      return labels[field.name] || field.name;
    };

    form.addEventListener("value-changed", event => {
      event.stopPropagation();

      const values = event.detail?.value || {};
      const newConfig = {
        ...this._config,
        ...values,
      };

      this._fire(newConfig);
    });
  }
}

if (!customElements.get("somfy-protexial-elements-card-editor")) {
  customElements.define("somfy-protexial-elements-card-editor", SomfyProtexialElementsCardEditor);
}

class SomfyProtexialElementsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._entityRegistry = null;
    this._registryLoading = false;
    this._loadedDevice = null;

    // Preserve collapsed/open sections across Home Assistant state updates.
    this._collapsedGroups = new Set();
    this._collapsedSubgroups = new Set();

    // null = use the saved "only_problems" configuration.
    // true/false = temporary filter selected from the header error counter.
    this._errorFilterOverride = null;

    // Track which device currently owns the restored UI state.
    this._uiStateDeviceId = null;
  }

  static getConfigElement() {
    return document.createElement("somfy-protexial-elements-card-editor");
  }

  static getStubConfig() {
    return {
      device_id: "",
      title: "",
      only_problems: false,
      show_entity_id: false,
      compact: false,
    };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");

    const previousDeviceId = this.config?.device_id || "";
    const previousOnlyProblems = this.config?.only_problems === true;

    const nextDeviceId = config.device_id || "";
    const nextOnlyProblems = config.only_problems === true;

    // Before switching devices, persist the current UI state for the old one.
    if (previousDeviceId && previousDeviceId !== nextDeviceId) {
      this._saveUiState(previousDeviceId);
    }

    this.config = {
      device_id: nextDeviceId,
      title: config.title || "",
      only_problems: nextOnlyProblems,
      show_entity_id: config.show_entity_id === true,
      compact: config.compact === true,
    };

    // Restore the UI state when this card is first loaded or when the selected
    // Somfy device changes.
    if (this._uiStateDeviceId !== nextDeviceId) {
      this._loadUiState(nextDeviceId);
    } else if (previousOnlyProblems !== nextOnlyProblems) {
      // A persistent editor setting explicitly changed: let that new setting
      // take precedence over the temporary header filter.
      this._errorFilterOverride = null;
      this._saveUiState(nextDeviceId);
    }
  }

  _uiStorageKey(deviceId) {
    if (!deviceId) return "";
    return `somfy-protexial-elements-card-ui:${deviceId}`;
  }

  _saveUiState(deviceId = this.config?.device_id) {
    const key = this._uiStorageKey(deviceId);
    if (!key) return;

    try {
      const state = {
        collapsedGroups: [...this._collapsedGroups],
        collapsedSubgroups: [...this._collapsedSubgroups],
        errorFilter: this._onlyProblemsActive(),
      };

      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.debug(
        "Somfy Protexial Elements Card: unable to save UI state",
        error
      );
    }
  }

  _loadUiState(deviceId = this.config?.device_id) {
    this._collapsedGroups.clear();
    this._collapsedSubgroups.clear();
    this._errorFilterOverride = null;
    this._uiStateDeviceId = deviceId || null;

    const key = this._uiStorageKey(deviceId);
    if (!key) return;

    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return;

      const state = JSON.parse(raw);

      if (Array.isArray(state?.collapsedGroups)) {
        this._collapsedGroups = new Set(
          state.collapsedGroups.filter(value => typeof value === "string")
        );
      }

      if (Array.isArray(state?.collapsedSubgroups)) {
        this._collapsedSubgroups = new Set(
          state.collapsedSubgroups.filter(value => typeof value === "string")
        );
      }

      if (typeof state?.errorFilter === "boolean") {
        this._errorFilterOverride = state.errorFilter;
      }
    } catch (error) {
      console.debug(
        "Somfy Protexial Elements Card: unable to restore UI state",
        error
      );
    }
  }

  set hass(hass) {
    this._hass = hass;

    if (this.config?.device_id &&
        this._loadedDevice !== this.config.device_id &&
        !this._registryLoading) {
      this._loadRegistry();
      return;
    }

    this._render();
  }

  _lang() { return spLang(this._hass); }
  _t(fr, en) { return this._lang() === "fr" ? fr : en; }

  async _loadRegistry() {
    if (!this._hass || !this.config?.device_id || this._registryLoading) return;

    this._registryLoading = true;

    try {
      const registry = await this._hass.callWS({
        type: "config/entity_registry/list",
      });

      this._entityRegistry = Array.isArray(registry) ? registry : [];
      this._loadedDevice = this.config.device_id;
    } catch (error) {
      console.error("Somfy Protexial Elements Card: entity registry error", error);
      this._entityRegistry = [];
      this._loadedDevice = this.config.device_id;
    } finally {
      this._registryLoading = false;
      this._render();
    }
  }

  _deviceEntityIds() {
    if (!this.config?.device_id || !Array.isArray(this._entityRegistry)) return [];

    return this._entityRegistry
      .filter(entry => entry?.device_id === this.config.device_id)
      .map(entry => entry.entity_id)
      .filter(Boolean);
  }

  _isElementSensor(entity) {
    if (!entity?.entity_id?.startsWith("binary_sensor.")) return false;

    const attrs = entity.attributes || {};

    // Real attributes exposed by SomfyElementAggregateBinarySensor.
    const diagnosticKeys = [
      "Battery",
      "Link",
      "House",
      "Tamper",
      "Door open",
      "Running",
    ];

    return diagnosticKeys.some(key =>
      Object.prototype.hasOwnProperty.call(attrs, key)
    );
  }

  _allElements() {
    if (!this.config?.device_id) return [];

    const ids = new Set(this._deviceEntityIds());

    let elements = [...ids]
      .map(entityId => this._hass?.states?.[entityId])
      .filter(entity => this._isElementSensor(entity));

    // Safe fallback: if registry resolution fails for some frontend/version,
    // use only entities exposing the very specific Somfy per-element attributes.
    if (!elements.length && this._entityRegistry !== null) {
      elements = Object.values(this._hass?.states || {})
        .filter(entity => this._isElementSensor(entity));
    }

    return elements.sort((a, b) =>
      this._name(a).localeCompare(this._name(b))
    );
  }

  _onlyProblemsActive() {
    return this._errorFilterOverride !== null
      ? this._errorFilterOverride
      : this.config.only_problems === true;
  }

  _elements() {
    const elements = this._allElements();

    if (!this._onlyProblemsActive()) {
      return elements;
    }

    return elements.filter(entity => entity.state === "on");
  }

  _mainCategory(entity) {
    const attrs = entity.attributes || {};
    const icon = String(attrs.icon || "").toLowerCase();
    const entityId = entity.entity_id.toLowerCase();

    // Icon is preferred because it is generated from the Somfy hardware type.
    if (
      icon.includes("door") ||
      icon.includes("window") ||
      icon.includes("garage")
    ) return "opening";

    if (icon.includes("motion-sensor")) return "motion";

    // Smoke, remotes, keypads, sirens, badges and transmitters are technical.
    return "technical";
  }

  _technicalSubcategory(entity) {
    const attrs = entity.attributes || {};
    const icon = String(attrs.icon || "").toLowerCase();
    const zone = String(attrs.Zone || "").toUpperCase();

    // Order does not matter here; rendering order is defined by
    // TECHNICAL_SUBCATEGORIES.
    if (icon.includes("bullhorn") || icon.includes("home-sound")) {
      return "siren";
    }

    if (icon.includes("dialpad") || icon.includes("keyboard")) {
      return "keypad";
    }

    // Remotes must be kept separate from the control / transmitter group.
    if (icon.includes("remote")) {
      return "remote";
    }

    if (icon.includes("key-variant") || icon.includes("key-alert")) {
      return "badge";
    }

    // Central / transmitter equipment. The integration uses alpha-s-box
    // icons for transmitter-type technical elements, while SYS identifies
    // system-level equipment.
    if (icon.includes("alpha-s-box") || zone === "SYS") {
      return "control";
    }

    return "other";
  }

  _groups() {
    const groups = {
      opening: [],
      motion: [],
      technical: {
        control: [],
        siren: [],
        keypad: [],
        remote: [],
        badge: [],
        other: [],
      },
    };

    for (const entity of this._elements()) {
      const main = this._mainCategory(entity);

      if (main === "technical") {
        groups.technical[this._technicalSubcategory(entity)].push(entity);
      } else {
        groups[main].push(entity);
      }
    }

    return groups;
  }



  _name(entity) {
    let name = "";

    try {
      name =
        this._hass.formatEntityName(entity) ||
        entity.attributes?.friendly_name ||
        entity.entity_id;
    } catch (_) {
      name = entity.attributes?.friendly_name || entity.entity_id;
    }

    let shortened = String(name || "").trim();

    // Remove standard Somfy product prefixes when present.
    shortened = shortened
      .replace(
        /^\s*somfy\s+(?:protexial(?:\s+io)?|protexiom)\s*(?:[-–—:]\s*)?/i,
        ""
      )
      .trim();

    // Home Assistant can prefix every element with the name of the alarm /
    // control panel. Keep only the actual Somfy equipment label, starting
    // from a known equipment type.
    //
    // Examples:
    // "Alarm DO Window"          -> "DO Window"
    // "Alarm DM Garage"          -> "DM Garage"
    // "Alarm Tr Tél - Bedroom"   -> "Tr Tél - Bedroom"
    // "Alarm Sir ext - Garden"   -> "Sir ext - Garden"
    // "Alarm Cl lcd - Entrance"  -> "Cl lcd - Entrance"
    // "Alarm TC multi - User"    -> "TC multi - User"
    // "Alarm Badge - User"       -> "Badge - User"
    const equipmentStart = new RegExp(
      "^.*?\\b(" +
        "(?:DO|DM)" +
        "|(?:TR(?:\\s+T[ÉE]L)?)" +
        "|(?:SIR(?:[ÈE]NE)?(?:\\s+(?:EXT|INT))?)" +
        "|(?:CL(?:\\s+LCD)?)" +
        "|(?:CLAVIER)" +
        "|(?:TC(?:\\s+(?:4|MULTI))?)" +
        "|(?:BADGE)" +
        "|(?:TRANSMETTEUR)" +
        "|(?:T[ÉE]L[ÉE]COMMANDE)" +
      ")\\b(.*)$",
      "i"
    );

    const match = shortened.match(equipmentStart);
    if (match) {
      shortened = `${match[1]}${match[2]}`.trim();
    }

    return shortened || name;
  }

  _stateLabel(entity) {
    if (entity.state === "on") return et(this._hass, "fault");
    if (entity.state === "off") return et(this._hass, "allOk");
    if (entity.state === "unavailable") return et(this._hass, "unavailable");
    return et(this._hass, "unknown");
  }

  _human(value) {
    const v = String(value ?? "");
    const n = v.toLowerCase();
    const fr = {
      ok: "OK",
      low: "Faible",
      connected: "Connectée",
      disconnected: "Déconnectée",
      "domestic fault/intrusion": "Défaut / intrusion",
      "open/ripped off": "Ouvert / arraché",
      closed: "Fermée",
      open: "Ouverte",
      running: "Actif",
      paused: "En pause",
    };
    const en = {
      ok: "OK",
      low: "Low",
      connected: "Connected",
      disconnected: "Disconnected",
      "domestic fault/intrusion": "Fault / intrusion",
      "open/ripped off": "Open / ripped off",
      closed: "Closed",
      open: "Open",
      running: "Active",
      paused: "Paused",
    };
    return (this._lang() === "fr" ? fr : en)[n] || v;
  }

  _ok(def, value) {
    if (def.neutral) return true;
    return (def.ok || []).includes(String(value ?? "").toLowerCase());
  }

  _registryEntry(entityId) {
    if (!entityId || !Array.isArray(this._entityRegistry)) return null;
    return this._entityRegistry.find(entry => entry?.entity_id === entityId) || null;
  }

  _normalizeElementObjectId(entityId) {
    if (!entityId) return "";

    let objectId = String(entityId).split(".")[1] || "";

    // Remove integration prefixes that can differ between installations.
    objectId = objectId
      .replace(/^somfy_protexial_/, "")
      .replace(/^somfy_protexiom_/, "")

    // Remove role suffixes.
    objectId = objectId
      .replace(/_aggregate$/, "")
      .replace(/_actif$/, "")
      .replace(/_active$/, "")
      .replace(/_pause$/, "");

    return objectId;
  }

  _pauseSwitchForElement(entity) {
    if (!entity?.entity_id || !this._hass) return null;

    const elementKey = this._normalizeElementObjectId(entity.entity_id);
    if (!elementKey) return null;

    // Search only switches attached to the selected Somfy device when possible.
    const deviceIds = new Set(this._deviceEntityIds());

    const switches = Object.values(this._hass.states || {}).filter(state => {
      if (!state?.entity_id?.startsWith("switch.")) return false;

      // If the registry gave us the device's entities, restrict matching to it.
      if (deviceIds.size && !deviceIds.has(state.entity_id)) return false;

      return true;
    });

    // 1) Exact normalized technical-name match.
    const exact = switches.find(state =>
      this._normalizeElementObjectId(state.entity_id) === elementKey
    );
    if (exact) return exact;

    // 2) Fallback: known switch naming convention:
    // switch.somfy_protexial_<element>_actif
    const expectedSuffixes = [
      `_${elementKey}_actif`,
      `_${elementKey}_active`,
      `_${elementKey}_pause`,
    ];

    const fallback = switches.find(state => {
      const objectId = state.entity_id.split(".")[1] || "";
      return expectedSuffixes.some(suffix => objectId.endsWith(suffix));
    });

    return fallback || null;
  }

  async _togglePauseSwitch(entityId) {
    const pauseSwitch = this._hass?.states?.[entityId];
    if (!pauseSwitch) return;

    // IMPORTANT:
    // ON  = element active  -> turn_off to pause
    // OFF = element paused  -> turn_on to reactivate
    const service = pauseSwitch.state === "on" ? "turn_off" : "turn_on";

    try {
      await this._hass.callService(
        "switch",
        service,
        {},
        { entity_id: entityId }
      );
    } catch (error) {
      console.error(
        "Somfy Protexial Elements Card: pause action failed",
        entityId,
        error
      );
    }
  }

  _renderElement(entity) {
    const attrs = entity.attributes || {};
    const problem = entity.state === "on";
    const defs = ELEMENT_ATTRS.filter(def =>
      Object.prototype.hasOwnProperty.call(attrs, def.key)
    );
    const icon = attrs.icon ||
      (problem ? "mdi:alert-circle-outline" : "mdi:check-circle-outline");

    const pauseSwitch = this._pauseSwitchForElement(entity);
    const active = pauseSwitch?.state === "on";
    const paused = pauseSwitch?.state === "off";

    return `
      <div class="element">
        <div class="head" data-more-info="${entity.entity_id}">
          <ha-icon class="main-icon ${problem ? "problem" : "ok"}" icon="${icon}"></ha-icon>
          <div class="info">
            <div class="name">${this._name(entity)}</div>
            ${this.config.show_entity_id
              ? `<div class="entity-id">${entity.entity_id}</div>`
              : ""}
          </div>
          <div class="summary ${problem ? "problem" : "ok"}">
            ${this._stateLabel(entity)}
          </div>
          ${pauseSwitch ? `
            <button
              type="button"
              class="pause-button ${paused ? "paused" : "active"}"
              data-pause-switch="${pauseSwitch.entity_id}"
              title="${active
                ? et(this._hass, "pauseTitle")
                : et(this._hass, "reactivateTitle")}">
              <ha-icon icon="${active ? "mdi:pause" : "mdi:play"}"></ha-icon>
              <span>${active
                ? et(this._hass, "pause")
                : et(this._hass, "reactivate")}</span>
            </button>` : ""}
        </div>
        <div class="attrs">
          ${defs.map(def => {
            const value = attrs[def.key];
            const ok = this._ok(def, value);
            return `
              <div class="attr">
                <ha-icon icon="${def.icon}"></ha-icon>
                <div class="attr-info">
                  <div class="attr-label">${et(this._hass, def.tkey)}</div>
                  <div class="attr-value ${def.neutral ? "neutral" : ok ? "ok" : "problem"}">
                    ${this._human(value)}
                  </div>
                </div>
              </div>`;
          }).join("")}
        </div>
      </div>`;
  }

  _renderGroup(category, entities) {
    if (!entities.length) return "";

    return `
      <div class="group ${this._collapsedGroups.has(category.key) ? "collapsed" : ""}" data-group="${category.key}">
        <button type="button" class="group-title" data-toggle-group="${category.key}">
          <ha-icon icon="${category.icon}"></ha-icon>
          <span class="group-name">${et(this._hass, category.tkey)}</span>
          <span class="group-count">${entities.length}</span>
          <ha-icon class="group-chevron" icon="mdi:chevron-down"></ha-icon>
        </button>
        <div class="group-content">
          ${entities.map(entity => this._renderElement(entity)).join("")}
        </div>
      </div>`;
  }


  _renderTechnical(groups) {
    const total = Object.values(groups).reduce((sum, list) => sum + list.length, 0);
    if (!total) return "";

    const main = ELEMENT_CATEGORIES.find(c => c.key === "technical");

    return `
      <div class="group ${this._collapsedGroups.has("technical") ? "collapsed" : ""}" data-group="technical">
        <button type="button" class="group-title" data-toggle-group="technical">
          <ha-icon icon="${main.icon}"></ha-icon>
          <span class="group-name">${et(this._hass, main.tkey)}</span>
          <span class="group-count">${total}</span>
          <ha-icon class="group-chevron" icon="mdi:chevron-down"></ha-icon>
        </button>

        <div class="group-content">
          ${TECHNICAL_SUBCATEGORIES.map(sub => {
            const items = groups[sub.key] || [];
            if (!items.length) return "";

            return `
              <div class="subgroup ${this._collapsedSubgroups.has(sub.key) ? "collapsed" : ""}" data-subgroup="${sub.key}">
                <button type="button" class="subgroup-title" data-toggle-subgroup="${sub.key}">
                  <ha-icon icon="${sub.icon}"></ha-icon>
                  <span class="subgroup-name">${et(this._hass, sub.tkey)}</span>
                  <span class="group-count">${items.length}</span>
                  <ha-icon class="subgroup-chevron" icon="mdi:chevron-down"></ha-icon>
                </button>
                <div class="subgroup-content">
                  ${items.map(entity => this._renderElement(entity)).join("")}
                </div>
              </div>`;
          }).join("")}
        </div>
      </div>`;
  }


  _render() {
    if (!this._hass || !this.config) return;

    const allElements = this._allElements();
    const elements = this._elements();
    const errorCount = allElements.filter(entity => entity.state === "on").length;
    const errorFilterActive = this._onlyProblemsActive();

    if (this.config.device_id && !this._registryLoading) {
      console.debug(`[Somfy Protexial Elements Card ${ELEMENTS_CARD_VERSION}]`, {
        device_id: this.config.device_id,
        registry_device_entities: this._deviceEntityIds(),
        detected_elements: allElements.map(e => e.entity_id),
        displayed_elements: elements.map(e => e.entity_id),
        error_filter_active: errorFilterActive,
        pause_switches: allElements.map(e => {
          const sw = this._pauseSwitchForElement(e);
          return {
            element: e.entity_id,
            element_key: this._normalizeElementObjectId(e.entity_id),
            switch: sw?.entity_id || null,
            state: sw?.state || null,
          };
        }),
      });
    }

    const title = this.config.title || this._t("Éléments Somfy", "Somfy equipment");

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family:var(--primary-font-family,sans-serif); }
        ha-card { overflow:hidden; }
        .header { display:flex; align-items:center; gap:12px; padding:${this.config.compact ? "12px" : "16px"}; border-bottom:1px solid var(--divider-color); }
        .title { flex:1; font-size:16px; font-weight:700; color:var(--primary-text-color); }
        .count { min-width:26px; height:26px; padding:0 7px; border-radius:13px; display:flex; align-items:center; justify-content:center; background:var(--secondary-background-color); color:var(--secondary-text-color); font-size:11px; font-weight:700; }
        .header-stats {
          display:flex;
          align-items:center;
          gap:7px;
        }
        .stat {
          height:28px;
          min-width:38px;
          box-sizing:border-box;
          padding:0 8px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:5px;
          border-radius:14px;
          background:var(--secondary-background-color);
          color:var(--secondary-text-color);
          font-size:11px;
          font-weight:700;
        }
        .stat ha-icon { --mdc-icon-size:15px; }
        button.stat {
          border:0;
          font:inherit;
          cursor:pointer;
          appearance:none;
          transition:transform .12s ease, box-shadow .12s ease, background .12s ease;
        }
        button.stat:hover {
          transform:translateY(-1px);
        }
        button.stat:active {
          transform:translateY(0);
        }
        button.stat.filter-active {
          box-shadow:inset 0 0 0 2px var(--error-color,#db4437);
          background:color-mix(in srgb, var(--error-color,#db4437) 18%, var(--secondary-background-color));
        }
        .stat.error {
          color:var(--error-color,#db4437);
          background:color-mix(in srgb, var(--error-color,#db4437) 10%, var(--secondary-background-color));
        }
        .stat.ok {
          color:var(--success-color,#43a047);
        }

        .group {
          border-bottom:1px solid var(--divider-color);
        }
        .group:last-of-type { border-bottom:0; }

        .group-title {
          width:100%;
          min-height:42px;
          box-sizing:border-box;
          padding:8px 16px;
          border:0;
          background:transparent;
          color:var(--primary-text-color);
          display:flex;
          align-items:center;
          gap:9px;
          font:inherit;
          cursor:pointer;
          text-align:left;
        }
        .group-title:hover {
          background:var(--secondary-background-color);
        }
        .group-title > ha-icon:first-child {
          --mdc-icon-size:19px;
          color:var(--secondary-text-color);
        }
        .group-title .group-name {
          flex:1;
          min-width:0;
          font-size:13px;
          font-weight:650;
        }
        .group-count {
          min-width:23px;
          height:23px;
          padding:0 6px;
          box-sizing:border-box;
          border-radius:12px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:var(--secondary-background-color);
          color:var(--secondary-text-color);
          font-size:10px;
          font-weight:700;
        }
        .group-chevron {
          --mdc-icon-size:18px;
          color:var(--secondary-text-color);
          transition:transform .18s ease;
        }
        .group.collapsed > .group-title .group-chevron {
          transform:rotate(-90deg);
        }
        .group.collapsed > .group-content {
          display:none;
        }

        .subgroup {
          padding:0 10px;
        }
        .subgroup-title {
          width:100%;
          min-height:34px;
          box-sizing:border-box;
          padding:5px 8px;
          border:0;
          background:transparent;
          color:var(--secondary-text-color);
          display:flex;
          align-items:center;
          gap:8px;
          font:inherit;
          cursor:pointer;
          text-align:left;
        }
        .subgroup-title:hover {
          background:var(--secondary-background-color);
          border-radius:8px;
        }
        .subgroup-title > ha-icon:first-child {
          --mdc-icon-size:16px;
        }
        .subgroup-title .subgroup-name {
          flex:1;
          font-size:11px;
          font-weight:650;
        }
        .subgroup-chevron {
          --mdc-icon-size:16px;
          transition:transform .18s ease;
        }
        .subgroup.collapsed .subgroup-chevron {
          transform:rotate(-90deg);
        }
        .subgroup.collapsed .subgroup-content {
          display:none;
        }

        .element { padding:${this.config.compact ? "10px 12px" : "14px 16px"}; border-bottom:1px solid var(--divider-color); }
        .element:last-of-type { border-bottom:0; }
        .head { display:flex; align-items:center; gap:11px; cursor:pointer; }
        .main-icon { --mdc-icon-size:25px; flex-shrink:0; }
        .main-icon.ok { color:#22c55e; } .main-icon.problem { color:#ef4444; }
        .info { flex:1; min-width:0; }
        .name { font-size:14px; font-weight:650; color:var(--primary-text-color); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .entity-id { font-size:9px; color:var(--disabled-color); margin-top:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .summary { font-size:11px; font-weight:650; white-space:nowrap; }
        .summary.ok { color:#22c55e; } .summary.problem { color:#ef4444; }

        .pause-button {
          min-height:30px;
          padding:0 9px;
          border:1px solid var(--divider-color);
          border-radius:8px;
          background:var(--secondary-background-color);
          color:var(--primary-text-color);
          display:flex;
          align-items:center;
          justify-content:center;
          gap:5px;
          font:inherit;
          font-size:10px;
          font-weight:650;
          cursor:pointer;
          flex-shrink:0;
        }
        .pause-button ha-icon {
          --mdc-icon-size:16px;
        }
        .pause-button.active {
          color:var(--warning-color,#f59e0b);
        }
        .pause-button.paused {
          color:var(--success-color,#43a047);
        }
        .pause-button:hover {
          background:color-mix(in srgb, var(--primary-color) 7%, var(--secondary-background-color));
        }
        .attrs { display:grid; grid-template-columns:repeat(auto-fit,minmax(125px,1fr)); gap:7px; margin-top:11px; }
        .attr { min-width:0; display:flex; align-items:center; gap:8px; padding:8px 9px; border-radius:8px; background:var(--secondary-background-color); }
        .attr ha-icon { --mdc-icon-size:18px; color:var(--secondary-text-color); flex-shrink:0; }
        .attr-info { min-width:0; }
        .attr-label { font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--secondary-text-color); }
        .attr-value { font-size:11px; font-weight:650; margin-top:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .attr-value.ok { color:#22c55e; } .attr-value.problem { color:#ef4444; } .attr-value.neutral { color:var(--primary-text-color); }
        .empty { padding:18px 16px; color:var(--secondary-text-color); font-size:13px; }
        .footer { padding:6px 12px; text-align:right; border-top:1px solid var(--divider-color); color:var(--disabled-color); font-size:9px; }
        @media (max-width:500px) {
          .attrs { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .head { flex-wrap:wrap; }
          .pause-button { margin-left:36px; }
        }
      </style>
      <ha-card>
        <div class="header">
          <div class="title">${title}</div>
          <div class="header-stats">
            <div class="stat" title="${et(this._hass, "total")}">
              <ha-icon icon="mdi:devices"></ha-icon>
              <span>${allElements.length}</span>
            </div>
            <button
              type="button"
              class="stat ${errorCount ? "error" : "ok"} ${errorFilterActive ? "filter-active" : ""}"
              data-error-filter
              aria-pressed="${errorFilterActive ? "true" : "false"}"
              title="${et(this._hass, "errors")}">
              <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
              <span>${errorCount}</span>
            </button>
          </div>
        </div>

        ${this._registryLoading ? `
          <div class="empty">
            ${et(this._hass, "loading")}
          </div>
        ` : elements.length ? (() => {
          const groups = this._groups();
          const opening = ELEMENT_CATEGORIES.find(c => c.key === "opening");
          const motion = ELEMENT_CATEGORIES.find(c => c.key === "motion");

          return [
            typeof this._renderGroup === "function" ? this._renderGroup(opening, groups.opening) : "",
            typeof this._renderGroup === "function" ? this._renderGroup(motion, groups.motion) : "",
            typeof this._renderTechnical === "function" ? this._renderTechnical(groups.technical) : "",
          ].join("");
        })() : `
          <div class="empty">
            ${this.config.device_id
              ? (errorFilterActive && allElements.length
                  ? et(this._hass, "allOk")
                  : et(this._hass, "noElements"))
              : et(this._hass, "noDevice")}
          </div>
        `}

        <div class="footer">Somfy Protexial Elements Card ${ELEMENTS_CARD_VERSION}</div>
      </ha-card>
    `;

    const errorFilterButton = this.shadowRoot.querySelector("[data-error-filter]");
    if (errorFilterButton) {
      errorFilterButton.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const currentlyFiltered = this._onlyProblemsActive();
        this._errorFilterOverride = !currentlyFiltered;

        this._saveUiState();
        this._render();
      });
    }

    this.shadowRoot.querySelectorAll("[data-toggle-group]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();

        const key = button.dataset.toggleGroup;
        const group = button.closest(".group");
        if (!key || !group) return;

        const collapsed = group.classList.toggle("collapsed");

        if (collapsed) {
          this._collapsedGroups.add(key);
        } else {
          this._collapsedGroups.delete(key);
        }

        this._saveUiState();
      });
    });

    this.shadowRoot.querySelectorAll("[data-toggle-subgroup]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();

        const key = button.dataset.toggleSubgroup;
        const subgroup = button.closest(".subgroup");
        if (!key || !subgroup) return;

        const collapsed = subgroup.classList.toggle("collapsed");

        if (collapsed) {
          this._collapsedSubgroups.add(key);
        } else {
          this._collapsedSubgroups.delete(key);
        }

        this._saveUiState();
      });
    });

    this.shadowRoot.querySelectorAll("[data-pause-switch]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();
        this._togglePauseSwitch(button.dataset.pauseSwitch);
      });
    });

    this.shadowRoot.querySelectorAll("[data-more-info]").forEach(el => {
      el.addEventListener("click", () => spMoreInfo(this, el.dataset.moreInfo));
    });
  }

  getCardSize() {
    return Math.max(2, (this._elements()?.length || 0) + 1);
  }
}

if (!customElements.get("somfy-protexial-elements-card")) {
  customElements.define("somfy-protexial-elements-card", SomfyProtexialElementsCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some(c => c.type === "somfy-protexial-elements-card")) {
  window.customCards.push({
    type: "somfy-protexial-elements-card",
    name: "Somfy Protexial Elements Card",
    description: "Per-element diagnostics for Somfy Protexial / Protexiom",
    configurable: true,
  });
}