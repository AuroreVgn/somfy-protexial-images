/* ========================================================
   Somfy Protexial / Protexiom Card
   ======================================================== */

const CARD_VERSION = "v3.1.8";

const ALARM_FEATURES = {
  ARM_HOME: 1,
  ARM_AWAY: 2,
  ARM_NIGHT: 4,
};

const SENSORS_DEF = [
  { key: "capteur1", defaultEntity: "binary_sensor.somfy_protexial_batterie", aliases: ["batterie", "battery"], defaultText: "battery", type: "binary", okState: "off" },
  { key: "capteur2", defaultEntity: "binary_sensor.somfy_protexial_centrale", aliases: ["centrale", "control_panel"], defaultText: "controlPanel", type: "binary", okState: "off" },
  { key: "capteur3", defaultEntity: "binary_sensor.somfy_protexial_portes_ou_fenetres", aliases: ["portes_ou_fenetres", "doors_windows", "door_window"], defaultText: "doorsWindows", type: "binary", okState: "off" },
  { key: "capteur4", defaultEntity: "binary_sensor.somfy_protexial_mouvement", aliases: ["mouvement", "motion"], defaultText: "motion", type: "binary", okState: "off" },
  { key: "capteur5", defaultEntity: "binary_sensor.somfy_protexial_camera", aliases: ["camera"], defaultText: "camera", type: "binary", okState: "on" },
  { key: "capteur6", defaultEntity: "binary_sensor.somfy_protexial_comm_centrale_capteurs", aliases: ["comm_centrale_capteurs", "communication_capteurs", "sensors_communication"], defaultText: "sensors", type: "binary", okState: "on" },
  { key: "capteur7", defaultEntity: "binary_sensor.somfy_protexial_communication_gsm", aliases: ["communication_gsm", "gsm_communication"], defaultText: "gsm", type: "binary", okState: "on" },
  { key: "capteur8", defaultEntity: "sensor.somfy_protexial_operateur_gsm", aliases: ["operateur_gsm", "operator_gsm"], defaultText: "operator", type: "info" },
  { key: "capteur9", defaultEntity: "sensor.somfy_protexial_signal_gsm_5", aliases: ["signal_gsm_5", "signal_gsm", "gsm_signal"], defaultText: "gsmSignal", type: "info" },
];

const RESET_DEF = [
  { key: "battery", configKey: "reset_battery_entity", defaultEntity: "button.somfy_protexial_reinitialiser_defaut_piles", aliases: ["reinitialiser_defaut_piles", "reset_battery"], icon: "mdi:battery-sync", text: "resetBattery" },
  { key: "alarm", configKey: "reset_alarm_entity", defaultEntity: "button.somfy_protexial_reinitialiser_defaut_alarme", aliases: ["reinitialiser_defaut_alarme", "reset_alarm"], icon: "mdi:shield-refresh", text: "resetAlarm" },
  { key: "link", configKey: "reset_link_entity", defaultEntity: "button.somfy_protexial_reinitialiser_defaut_liaison_radio", aliases: ["reinitialiser_defaut_liaison_radio", "reset_radio"], icon: "mdi:access-point", text: "resetLink" },
];

const TRANSLATIONS = {
  fr: {
    cardSettings: "Paramètres de la carte", alarmEntity: "Entité alarme", cardTitle: "Titre de la carte",
    entity: "Entité", displayedName: "Nom affiché", alarm: "Alarme", sensorsTitle: "État",
    resetsTitle: "Réinitialisations", noSensors: "Aucun capteur sélectionné", disarm: "Désarmer",
    away: "Absent", home: "Présent", night: "Nuit", confirmReset: "Confirmer la réinitialisation",
    resetBattery: "Défauts piles", resetAlarm: "Défauts alarme", resetLink: "Liaison radio",
    battery: "Batterie", controlPanel: "Centrale", doorsWindows: "Portes/Fenêtres", motion: "Mouvement",
    camera: "Caméra", sensors: "Capteurs", gsm: "GSM", operator: "Opérateur", gsmSignal: "Signal GSM (/5)",
    defaultTitle: "Somfy Protexial — Contrôle", unavailable: "Indisponible", unknown: "Inconnu",
    lessThanMinute: "depuis moins d’une minute", sinceMinutes: "depuis {n} min", sinceHours: "depuis {n}",
    resetBatteryEntity: "Bouton de réinitialisation des piles", resetAlarmEntity: "Bouton de réinitialisation de l’alarme",
    resetLinkEntity: "Bouton de réinitialisation de la liaison radio", automaticDetection: "Détection automatique des entités",
    showFaults: "Afficher les défauts", showLastSync: "Afficher la dernière synchronisation",
    showRefresh: "Afficher le bouton d’actualisation", compactMode: "Mode compact", lastSyncEntity: "Entité dernière synchronisation",
    refreshEntity: "Bouton d’actualisation", faultsTitle: "Défauts", noFaults: "Aucun défaut détecté",
    lastSync: "Dernière synchronisation", refresh: "Actualiser", refreshing: "Actualisation…", connected: "Centrale connectée",
    disconnected: "Centrale indisponible", codeTitle: "Code / PIN", codePlaceholder: "Saisir le code", cancel: "Annuler",
    validate: "Valider", confirm: "Confirmer", actionError: "Impossible d’exécuter l’action", clickDetails: "Cliquez pour les détails",
    settingsDisplay: "Affichage avancé", imagesTitle: "Images", imageMonitoring: "Surveillance images", startImageMonitoring: "Démarrer", stopImageMonitoring: "Arrêter", imageStartEntity: "Bouton démarrer la surveillance images", imageStopEntity: "Bouton arrêter la surveillance images", galleryUrl: "URL de la galerie locale", imageEntity1: "Image récente 1", imageEntity2: "Image récente 2", imageEntity3: "Image récente 3", imageEntity4: "Image récente 4", imageEntity5: "Image récente 5", localGallery: "Galerie locale", openGallery: "Ouvrir la galerie", clearPin: "Effacer", lastImageEvent: "Dernier événement", lastFtp: "Dernière réception FTP", localServer: "Serveur local", imageAge: "Âge dernière image", recentImages: "Images récentes"
  },
  en: {
    cardSettings: "Card settings", alarmEntity: "Alarm entity", cardTitle: "Card title", entity: "Entity",
    displayedName: "Displayed name", alarm: "Alarm", sensorsTitle: "Status", resetsTitle: "Resets",
    noSensors: "No sensor selected", disarm: "Disarm", away: "Away", home: "Home", night: "Night",
    confirmReset: "Confirm reset", resetBattery: "Battery faults", resetAlarm: "Alarm faults", resetLink: "Radio link",
    battery: "Battery", controlPanel: "Control panel", doorsWindows: "Doors/Windows", motion: "Motion",
    camera: "Camera", sensors: "Sensors", gsm: "GSM", operator: "Operator", gsmSignal: "GSM signal (/5)",
    defaultTitle: "Somfy Protexial — Control", unavailable: "Unavailable", unknown: "Unknown",
    lessThanMinute: "for less than a minute", sinceMinutes: "for {n} min", sinceHours: "for {n}",
    resetBatteryEntity: "Battery reset button", resetAlarmEntity: "Alarm reset button", resetLinkEntity: "Radio-link reset button",
    automaticDetection: "Automatic entity detection", showFaults: "Show faults",
    showLastSync: "Show last synchronization", showRefresh: "Show refresh button", compactMode: "Compact mode",
    lastSyncEntity: "Last synchronization entity", refreshEntity: "Refresh button", faultsTitle: "Faults",
    noFaults: "No fault detected", lastSync: "Last synchronization", refresh: "Refresh", refreshing: "Refreshing…",
    connected: "Control panel connected", disconnected: "Control panel unavailable", codeTitle: "Code / PIN",
    codePlaceholder: "Enter code", cancel: "Cancel", validate: "Validate", confirm: "Confirm",
    actionError: "Unable to execute action", clickDetails: "Click for details", settingsDisplay: "Advanced display", imagesTitle: "Images", imageMonitoring: "Image monitoring", startImageMonitoring: "Start", stopImageMonitoring: "Stop", imageStartEntity: "Start image monitoring button", imageStopEntity: "Stop image monitoring button", galleryUrl: "Local gallery URL", imageEntity1: "Recent image 1", imageEntity2: "Recent image 2", imageEntity3: "Recent image 3", imageEntity4: "Recent image 4", imageEntity5: "Recent image 5", localGallery: "Local gallery", openGallery: "Open gallery", clearPin: "Clear", lastImageEvent: "Last event", lastFtp: "Last FTP reception", localServer: "Local server", imageAge: "Latest image age", recentImages: "Recent images"
  },
  de: {
    cardSettings:"Karteneinstellungen", alarmEntity:"Alarm-Entität", cardTitle:"Kartentitel", entity:"Entität", displayedName:"Angezeigter Name",
    alarm:"Alarm", sensorsTitle:"Status", resetsTitle:"Zurücksetzen", noSensors:"Kein Sensor ausgewählt", disarm:"Unscharf",
    away:"Abwesend", home:"Anwesend", night:"Nacht", confirmReset:"Zurücksetzen bestätigen", resetBattery:"Batteriefehler",
    resetAlarm:"Alarmfehler", resetLink:"Funkverbindung", battery:"Batterie", controlPanel:"Zentrale", doorsWindows:"Türen/Fenster",
    motion:"Bewegung", camera:"Kamera", sensors:"Sensoren", gsm:"GSM", operator:"Anbieter", gsmSignal:"GSM-Signal (/5)",
    defaultTitle:"Somfy Protexial — Steuerung", unavailable:"Nicht verfügbar", unknown:"Unbekannt",
    lessThanMinute:"seit weniger als einer Minute", sinceMinutes:"seit {n} Min.", sinceHours:"seit {n}",
    automaticDetection:"Automatische Entitätserkennung", showFaults:"Fehler anzeigen",
    showLastSync:"Letzte Synchronisierung anzeigen", showRefresh:"Aktualisierungsschaltfläche anzeigen", compactMode:"Kompaktmodus",
    lastSyncEntity:"Entität letzte Synchronisierung", refreshEntity:"Aktualisierungsschaltfläche", faultsTitle:"Fehler",
    noFaults:"Keine Fehler erkannt", lastSync:"Letzte Synchronisierung", refresh:"Aktualisieren", refreshing:"Aktualisierung…",
    connected:"Zentrale verbunden", disconnected:"Zentrale nicht verfügbar", codeTitle:"Code / PIN", codePlaceholder:"Code eingeben",
    cancel:"Abbrechen", validate:"Bestätigen", confirm:"Bestätigen", clickDetails:"Für Details klicken", settingsDisplay:"Erweiterte Anzeige",
    resetBatteryEntity:"Taste zum Zurücksetzen der Batteriefehler", resetAlarmEntity:"Taste zum Zurücksetzen der Alarmfehler",
    resetLinkEntity:"Taste zum Zurücksetzen der Funkverbindung"
  },
  es: {
    cardSettings:"Ajustes de la tarjeta", alarmEntity:"Entidad de alarma", cardTitle:"Título de la tarjeta", entity:"Entidad", displayedName:"Nombre mostrado",
    alarm:"Alarma", sensorsTitle:"Estado", resetsTitle:"Restablecimientos", noSensors:"Ningún sensor seleccionado", disarm:"Desarmar",
    away:"Ausente", home:"Presente", night:"Noche", confirmReset:"Confirmar restablecimiento", resetBattery:"Fallos de pilas",
    resetAlarm:"Fallos de alarma", resetLink:"Enlace de radio", battery:"Pila", controlPanel:"Central", doorsWindows:"Puertas/Ventanas",
    motion:"Movimiento", camera:"Cámara", sensors:"Sensores", gsm:"GSM", operator:"Operador", gsmSignal:"Señal GSM (/5)",
    defaultTitle:"Somfy Protexial — Control", unavailable:"No disponible", unknown:"Desconocido",
    lessThanMinute:"desde hace menos de un minuto", sinceMinutes:"desde hace {n} min", sinceHours:"desde hace {n}",
    automaticDetection:"Detección automática de entidades", showFaults:"Mostrar fallos",
    showLastSync:"Mostrar última sincronización", showRefresh:"Mostrar botón de actualización", compactMode:"Modo compacto",
    lastSyncEntity:"Entidad de última sincronización", refreshEntity:"Botón de actualización", faultsTitle:"Fallos",
    noFaults:"No se detectaron fallos", lastSync:"Última sincronización", refresh:"Actualizar", refreshing:"Actualizando…",
    connected:"Central conectada", disconnected:"Central no disponible", codeTitle:"Código / PIN", codePlaceholder:"Introducir código",
    cancel:"Cancelar", validate:"Validar", confirm:"Confirmar", clickDetails:"Haz clic para ver detalles", settingsDisplay:"Visualización avanzada",
    resetBatteryEntity:"Botón de reinicio de pilas", resetAlarmEntity:"Botón de reinicio de alarma", resetLinkEntity:"Botón de reinicio del enlace de radio"
  },
  it: {
    cardSettings:"Impostazioni scheda", alarmEntity:"Entità allarme", cardTitle:"Titolo scheda", entity:"Entità", displayedName:"Nome visualizzato",
    alarm:"Allarme", sensorsTitle:"Stato", resetsTitle:"Ripristini", noSensors:"Nessun sensore selezionato", disarm:"Disattiva",
    away:"Assente", home:"Presente", night:"Notte", confirmReset:"Conferma ripristino", resetBattery:"Errori batterie",
    resetAlarm:"Errori allarme", resetLink:"Collegamento radio", battery:"Batteria", controlPanel:"Centrale", doorsWindows:"Porte/Finestre",
    motion:"Movimento", camera:"Telecamera", sensors:"Sensori", gsm:"GSM", operator:"Operatore", gsmSignal:"Segnale GSM (/5)",
    defaultTitle:"Somfy Protexial — Controllo", unavailable:"Non disponibile", unknown:"Sconosciuto",
    lessThanMinute:"da meno di un minuto", sinceMinutes:"da {n} min", sinceHours:"da {n}",
    automaticDetection:"Rilevamento automatico entità", showFaults:"Mostra anomalie",
    showLastSync:"Mostra ultima sincronizzazione", showRefresh:"Mostra pulsante aggiorna", compactMode:"Modalità compatta",
    lastSyncEntity:"Entità ultima sincronizzazione", refreshEntity:"Pulsante aggiorna", faultsTitle:"Anomalie",
    noFaults:"Nessuna anomalia rilevata", lastSync:"Ultima sincronizzazione", refresh:"Aggiorna", refreshing:"Aggiornamento…",
    connected:"Centrale connessa", disconnected:"Centrale non disponibile", codeTitle:"Codice / PIN", codePlaceholder:"Inserisci codice",
    cancel:"Annulla", validate:"Conferma", confirm:"Conferma", clickDetails:"Clicca per i dettagli", settingsDisplay:"Visualizzazione avanzata",
    resetBatteryEntity:"Pulsante ripristino batterie", resetAlarmEntity:"Pulsante ripristino allarme", resetLinkEntity:"Pulsante ripristino collegamento radio"
  },
  nl: {
    cardSettings:"Kaartinstellingen", alarmEntity:"Alarmentiteit", cardTitle:"Kaarttitel", entity:"Entiteit", displayedName:"Weergavenaam",
    alarm:"Alarm", sensorsTitle:"Status", resetsTitle:"Resetten", noSensors:"Geen sensor geselecteerd", disarm:"Uitschakelen",
    away:"Afwezig", home:"Aanwezig", night:"Nacht", confirmReset:"Reset bevestigen", resetBattery:"Batterijfouten",
    resetAlarm:"Alarmfouten", resetLink:"Radioverbinding", battery:"Batterij", controlPanel:"Centrale", doorsWindows:"Deuren/Ramen",
    motion:"Beweging", camera:"Camera", sensors:"Sensoren", gsm:"GSM", operator:"Provider", gsmSignal:"GSM-signaal (/5)",
    defaultTitle:"Somfy Protexial — Bediening", unavailable:"Niet beschikbaar", unknown:"Onbekend",
    lessThanMinute:"sinds minder dan een minuut", sinceMinutes:"sinds {n} min", sinceHours:"sinds {n}",
    automaticDetection:"Automatische entiteitsdetectie", showFaults:"Storingen tonen",
    showLastSync:"Laatste synchronisatie tonen", showRefresh:"Vernieuwknop tonen", compactMode:"Compacte modus",
    lastSyncEntity:"Entiteit laatste synchronisatie", refreshEntity:"Vernieuwknop", faultsTitle:"Storingen",
    noFaults:"Geen storing gedetecteerd", lastSync:"Laatste synchronisatie", refresh:"Vernieuwen", refreshing:"Vernieuwen…",
    connected:"Centrale verbonden", disconnected:"Centrale niet beschikbaar", codeTitle:"Code / PIN", codePlaceholder:"Voer code in",
    cancel:"Annuleren", validate:"Bevestigen", confirm:"Bevestigen", clickDetails:"Klik voor details", settingsDisplay:"Geavanceerde weergave",
    resetBatteryEntity:"Knop batterijfouten resetten", resetAlarmEntity:"Knop alarmfouten resetten", resetLinkEntity:"Knop radioverbinding resetten"
  },
  pt: {
    cardSettings:"Definições do cartão", alarmEntity:"Entidade do alarme", cardTitle:"Título do cartão", entity:"Entidade", displayedName:"Nome apresentado",
    alarm:"Alarme", sensorsTitle:"Estado", resetsTitle:"Reposições", noSensors:"Nenhum sensor selecionado", disarm:"Desarmar",
    away:"Ausente", home:"Presente", night:"Noite", confirmReset:"Confirmar reposição", resetBattery:"Erros das pilhas",
    resetAlarm:"Erros do alarme", resetLink:"Ligação de rádio", battery:"Pilha", controlPanel:"Central", doorsWindows:"Portas/Janelas",
    motion:"Movimento", camera:"Câmara", sensors:"Sensores", gsm:"GSM", operator:"Operador", gsmSignal:"Sinal GSM (/5)",
    defaultTitle:"Somfy Protexial — Controlo", unavailable:"Indisponível", unknown:"Desconhecido",
    lessThanMinute:"há menos de um minuto", sinceMinutes:"há {n} min", sinceHours:"há {n}",
    automaticDetection:"Deteção automática de entidades", showFaults:"Mostrar falhas",
    showLastSync:"Mostrar última sincronização", showRefresh:"Mostrar botão de atualização", compactMode:"Modo compacto",
    lastSyncEntity:"Entidade da última sincronização", refreshEntity:"Botão de atualização", faultsTitle:"Falhas",
    noFaults:"Nenhuma falha detetada", lastSync:"Última sincronização", refresh:"Atualizar", refreshing:"A atualizar…",
    connected:"Central ligada", disconnected:"Central indisponível", codeTitle:"Código / PIN", codePlaceholder:"Introduzir código",
    cancel:"Cancelar", validate:"Validar", confirm:"Confirmar", clickDetails:"Clique para ver detalhes", settingsDisplay:"Visualização avançada",
    resetBatteryEntity:"Botão de reposição das pilhas", resetAlarmEntity:"Botão de reposição do alarme", resetLinkEntity:"Botão de reposição da ligação de rádio"
  }
};

for (const lang of ["de", "es", "it", "nl", "pt"]) {
  TRANSLATIONS[lang] = { ...TRANSLATIONS.en, ...TRANSLATIONS[lang] };
}

function languageFor(hass) {
  const language = (hass?.locale?.language || hass?.language || navigator.language || "en").toLowerCase();
  const short = language.split("-")[0];
  return TRANSLATIONS[short] ? short : "en";
}

function tr(hass, key, values = {}) {
  const lang = languageFor(hass);
  let text = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  Object.entries(values).forEach(([name, value]) => { text = text.replace(`{${name}}`, value); });
  return text;
}

function fireMoreInfo(element, entityId) {
  element.dispatchEvent(new CustomEvent("hass-more-info", {
    detail: { entityId },
    bubbles: true,
    composed: true,
  }));
}

class SomfyProtexialCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = {};
    this._built = false;
  }

  set hass(hass) {
    const languageChanged = this._hass && languageFor(this._hass) !== languageFor(hass);
    this._hass = hass;
    if (languageChanged) {
      this._render();
      return;
    }
    this.shadowRoot.querySelectorAll("ha-form").forEach(el => { el.hass = hass; });
  }

  setConfig(config) {
    this._config = { ...config };
    if (!this._built) {
      this._built = true;
      this._render();
    }
  }

  _fireConfig(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }



  _render() {
    const cfg = this._config || {};
    const shown = [...(cfg.sensors || SENSORS_DEF.map(sensor => sensor.key))];
    const labels = cfg.labels || {};
    const entities = cfg.entities || {};

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family:var(--primary-font-family, sans-serif); }
        ha-form { display:block; margin-bottom:8px; }
        ha-expansion-panel { display:block; margin-bottom:8px; --expansion-panel-content-padding:12px; border-radius:6px; --ha-card-border-radius:6px; }
        ha-expansion-panel h3 { margin:0; font-size:inherit; font-weight:600; }
        .block { border-top:1px solid var(--divider-color); padding:12px 0 4px; }
        .header { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
        .name { font-size:13px; font-weight:600; color:var(--primary-text-color); flex:1; }
        .checks { display:grid; gap:8px; padding:8px 0; }
        label { display:flex; align-items:center; gap:10px; font-size:14px; color:var(--primary-text-color); }
        input[type=checkbox] { width:18px; height:18px; accent-color:var(--primary-color); cursor:pointer; flex-shrink:0; }
      </style>
      <ha-form id="form_alarm"></ha-form>
      <ha-expansion-panel outlined>
        <ha-icon slot="leading-icon" icon="mdi:cog"></ha-icon>
        <h3 slot="header">${tr(this._hass, "cardSettings")}</h3>
        <div>
          <ha-form id="form_title"></ha-form>
          <div class="block">
            <div class="name">${tr(this._hass, "settingsDisplay")}</div>
            <div class="checks" id="display_checks"></div>
            <ha-form id="form_advanced"></ha-form>
          </div>
          <div id="sensors_container"></div>
          <div class="block"><ha-form id="form_resets"></ha-form></div>
        </div>
      </ha-expansion-panel>`;

    requestAnimationFrame(() => {
      const formAlarm = this.shadowRoot.getElementById("form_alarm");
      formAlarm.hass = this._hass;
      formAlarm.schema = [{ name: "alarm_entity", selector: { entity: { domain: "alarm_control_panel" } } }];
      formAlarm.data = { alarm_entity: cfg.alarm_entity || "alarm_control_panel.alarme" };
      formAlarm.computeLabel = () => tr(this._hass, "alarmEntity");
      formAlarm.addEventListener("value-changed", event => {
        event.stopPropagation();
        this._fireConfig({ ...this._config, alarm_entity: event.detail.value.alarm_entity });
      });

      const formTitle = this.shadowRoot.getElementById("form_title");
      formTitle.hass = this._hass;
      formTitle.schema = [{ name: "title", selector: { text: {} } }];
      formTitle.data = { title: cfg.title || "" };
      formTitle.computeLabel = () => tr(this._hass, "cardTitle");
      formTitle.addEventListener("value-changed", event => {
        event.stopPropagation();
        this._fireConfig({ ...this._config, title: event.detail.value.title });
      });

      const checkDefs = [
        ["auto_detect", "automaticDetection", cfg.auto_detect !== false],
        ["show_faults", "showFaults", cfg.show_faults !== false],
        ["show_last_sync", "showLastSync", cfg.show_last_sync !== false],
        ["show_refresh", "showRefresh", cfg.show_refresh !== false],
        ["compact", "compactMode", cfg.compact === true],
      ];
      const checks = this.shadowRoot.getElementById("display_checks");
      checkDefs.forEach(([key, text, checked]) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" data-config-key="${key}" ${checked ? "checked" : ""}>${tr(this._hass, text)}`;
        label.querySelector("input").addEventListener("change", event => {
          this._fireConfig({ ...this._config, [key]: event.target.checked });
        });
        checks.appendChild(label);
      });

      const formAdvanced = this.shadowRoot.getElementById("form_advanced");
      formAdvanced.hass = this._hass;
      formAdvanced.schema = [
        { name: "last_sync_entity", selector: { entity: { domain: "sensor" } } },
        { name: "refresh_entity", selector: { entity: { domain: "button" } } },
        { name: "image_start_entity", selector: { entity: { domain: "button" } } },
        { name: "image_stop_entity", selector: { entity: { domain: "button" } } },
        { name: "image_entity_1", selector: { entity: { domain: "image" } } },
        { name: "image_entity_2", selector: { entity: { domain: "image" } } },
        { name: "image_entity_3", selector: { entity: { domain: "image" } } },
        { name: "image_entity_4", selector: { entity: { domain: "image" } } },
        { name: "image_entity_5", selector: { entity: { domain: "image" } } },
        { name: "gallery_url", selector: { text: { type: "url" } } },
      ];
      formAdvanced.data = {
        last_sync_entity: cfg.last_sync_entity || "",
        refresh_entity: cfg.refresh_entity || "",
        image_start_entity: cfg.image_start_entity || "",
        image_stop_entity: cfg.image_stop_entity || "",
        image_entity_1: cfg.image_entity_1 || "",
        image_entity_2: cfg.image_entity_2 || "",
        image_entity_3: cfg.image_entity_3 || "",
        image_entity_4: cfg.image_entity_4 || "",
        image_entity_5: cfg.image_entity_5 || "",
        gallery_url: cfg.gallery_url || "",
      };
      formAdvanced.computeLabel = field => {
        const labels = {
          last_sync_entity: "lastSyncEntity",
          refresh_entity: "refreshEntity",
          image_start_entity: "imageStartEntity",
          image_stop_entity: "imageStopEntity",
          image_entity_1: "imageEntity1",
          image_entity_2: "imageEntity2",
          image_entity_3: "imageEntity3",
          image_entity_4: "imageEntity4",
          image_entity_5: "imageEntity5",
          gallery_url: "galleryUrl",
        };
        return tr(this._hass, labels[field.name] || field.name);
      };
      formAdvanced.addEventListener("value-changed", event => {
        event.stopPropagation();
        const values = event.detail.value || {};
        this._fireConfig({ ...this._config, ...values });
      });

      const container = this.shadowRoot.getElementById("sensors_container");
      SENSORS_DEF.forEach(sensor => {
        const block = document.createElement("div");
        block.className = "block";
        block.innerHTML = `
          <div class="header">
            <input type="checkbox" id="chk_${sensor.key}" ${shown.includes(sensor.key) ? "checked" : ""}>
            <div class="name">${tr(this._hass, sensor.defaultText)}</div>
          </div>
          <ha-form id="form_${sensor.key}"></ha-form>`;
        container.appendChild(block);

        block.querySelector(`#chk_${sensor.key}`).addEventListener("change", () => {
          const newShown = shown.includes(sensor.key) ? shown.filter(key => key !== sensor.key) : [...shown, sensor.key];
          shown.length = 0;
          shown.push(...newShown);
          this._fireConfig({ ...this._config, sensors: newShown });
        });

        const form = block.querySelector(`#form_${sensor.key}`);
        form.hass = this._hass;
        form.schema = [
          { name: `entity_${sensor.key}`, selector: { entity: {} } },
          { name: `label_${sensor.key}`, selector: { text: {} } },
        ];
        form.data = {
          [`entity_${sensor.key}`]: entities[sensor.key] || "",
          [`label_${sensor.key}`]: labels[sensor.key] || "",
        };
        form.computeLabel = field => field.name.startsWith("entity_") ? tr(this._hass, "entity") : tr(this._hass, "displayedName");
        form.addEventListener("value-changed", event => {
          event.stopPropagation();
          const value = event.detail.value;
          const newEntities = { ...(this._config.entities || {}) };
          const newLabels = { ...(this._config.labels || {}) };
          const entityValue = value[`entity_${sensor.key}`];
          const labelValue = value[`label_${sensor.key}`]?.trim();
          if (entityValue) newEntities[sensor.key] = entityValue;
          else delete newEntities[sensor.key];
          if (labelValue) newLabels[sensor.key] = labelValue;
          else delete newLabels[sensor.key];
          this._fireConfig({ ...this._config, entities: newEntities, labels: newLabels });
        });
      });

      const formResets = this.shadowRoot.getElementById("form_resets");
      formResets.hass = this._hass;
      formResets.schema = RESET_DEF.map(reset => ({ name: reset.configKey, selector: { entity: { domain: "button" } } }));
      formResets.data = Object.fromEntries(RESET_DEF.map(reset => [reset.configKey, cfg[reset.configKey] || ""]));
      formResets.computeLabel = field => {
        const reset = RESET_DEF.find(item => item.configKey === field.name);
        return tr(this._hass, reset ? `${reset.text}Entity` : field.name);
      };
      formResets.addEventListener("value-changed", event => {
        event.stopPropagation();
        this._fireConfig({ ...this._config, ...event.detail.value });
      });
    });
  }
}

if (!customElements.get("somfy-protexial-card-editor")) {
  customElements.define("somfy-protexial-card-editor", SomfyProtexialCardEditor);
}

class SomfyProtexialCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._rendered = false;
    this._language = null;
    this._refreshing = false;
  }

  static getConfigElement() { return document.createElement("somfy-protexial-card-editor"); }

  static getStubConfig() {
    return {
      alarm_entity: "alarm_control_panel.alarme",
      sensors: SENSORS_DEF.map(sensor => sensor.key),
      labels: {}, entities: {}, title: "",
      auto_detect: true, show_faults: true, show_last_sync: true, show_refresh: true, compact: false,
    };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    console.info(`[Somfy Protexial Card] loaded build ${CARD_VERSION} - image renderer: ${typeof this._renderImageSection}`);
    console.info(`%c SOMFY-PROTEXIAL-CARD %c ${CARD_VERSION} `,
      "color:#c8a96e;background:#1e1e2e;font-weight:700;padding:2px 4px;border-radius:4px 0 0 4px",
      "color:#1e1e2e;background:#c8a96e;font-weight:700;padding:2px 4px;border-radius:0 4px 4px 0");
    this.config = {
      alarm_entity: config.alarm_entity || "alarm_control_panel.alarme",
      sensors: config.sensors || SENSORS_DEF.map(sensor => sensor.key),
      labels: config.labels || {},
      entities: config.entities || {},
      title: config.title || "",
      auto_detect: config.auto_detect !== false,
      show_faults: config.show_faults !== false,
      show_last_sync: config.show_last_sync !== false,
      show_refresh: config.show_refresh !== false,
      compact: config.compact === true,
      last_sync_entity: config.last_sync_entity || "",
      refresh_entity: config.refresh_entity || "",
      image_start_entity: config.image_start_entity || "",
      image_stop_entity: config.image_stop_entity || "",
      image_entity_1: config.image_entity_1 || "",
      image_entity_2: config.image_entity_2 || "",
      image_entity_3: config.image_entity_3 || "",
      image_entity_4: config.image_entity_4 || "",
      image_entity_5: config.image_entity_5 || "",
      gallery_url: config.gallery_url || "",
      ...Object.fromEntries(RESET_DEF.map(reset => [reset.configKey, config[reset.configKey] || ""])),
      alarm_code: config.alarm_code,
    };
    this._rendered = false;
  }

  set hass(hass) {
    this._hass = hass;
    const language = languageFor(hass);
    if (!this._rendered || language !== this._language) {
      this._language = language;
      this._rendered = true;
      this._render();
    } else {
      this._update();
    }
  }

  _getState(entityId) { return entityId ? this._hass?.states?.[entityId] : undefined; }

  _allSomfyEntities(domain) {
    return Object.values(this._hass?.states || {}).filter(entity => {
      const id = entity.entity_id.toLowerCase();

      if (domain && !id.startsWith(`${domain}.`)) return false;

      const integration = String(entity.attributes?.integration || "").toLowerCase();

      return (
        id.includes("somfy_protexial") ||
        id.includes("somfy_protexiom") ||
        id.includes(".sofy_") ||
        integration.includes("somfy_protex") ||
        integration.includes("sofy")
      );
    });
  }

  _findByAliases(domain, aliases = []) {
    const entities = this._allSomfyEntities(domain);
    const lowered = aliases.map(alias => alias.toLowerCase());
    return entities.find(entity => {
      const haystack = `${entity.entity_id} ${entity.attributes?.friendly_name || ""}`.toLowerCase();
      return lowered.some(alias => haystack.includes(alias));
    })?.entity_id;
  }

  _resolveSensorEntity(sensor) {
    const explicit = this.config.entities[sensor.key];
    if (explicit) return explicit;
    if (this._getState(sensor.defaultEntity)) return sensor.defaultEntity;
    if (this.config.auto_detect) return this._findByAliases(sensor.defaultEntity.split(".")[0], sensor.aliases);
    return sensor.defaultEntity;
  }

  _resolveReset(reset) {
    const explicit = this.config[reset.configKey];
    if (explicit) return explicit;
    if (this._getState(reset.defaultEntity)) return reset.defaultEntity;
    return this.config.auto_detect ? this._findByAliases("button", reset.aliases) : reset.defaultEntity;
  }

  _findLastSync() {
    if (this.config.last_sync_entity) return this.config.last_sync_entity;
    if (!this.config.auto_detect) return "";
    return this._findByAliases("sensor", ["derniere_sync", "dernière sync", "derniere_synchronisation", "last_sync", "last update", "last_update"]);
  }

  _findRefresh() {
    if (this.config.refresh_entity) return this.config.refresh_entity;
    if (!this.config.auto_detect) return "";
    return this._findByAliases("button", ["actualiser", "actualisation", "rafraichir", "rafraîchir", "refresh", "synchroniser", "synchronisation", "sync"]);
  }

  _faultEntities() {
    if (!this.config.show_faults) return [];

    const ignored = new Set(
      SENSORS_DEF.map(sensor => this._resolveSensorEntity(sensor)).filter(Boolean)
    );

    const normalLabels = new Set([
      "ok", "normal", "connected", "connecté", "connectee", "connectée",
      "fermé", "fermée", "fermés", "fermées", "closed",
      "non détecté", "non detecte", "not detected"
    ]);

    return this._allSomfyEntities("binary_sensor").filter(entity => {
      if (ignored.has(entity.entity_id)) return false;
      if (["unknown", "unavailable"].includes(entity.state)) return false;

      const dc = entity.attributes?.device_class || "";
      const haystack = `${entity.entity_id} ${entity.attributes?.friendly_name || ""}`.toLowerCase();
      const formatted = this._formatState(entity).trim().toLowerCase();

      // Never report an entity explicitly formatted by HA/integration as healthy.
      if (normalLabels.has(formatted)) return false;

      const isConnectivity =
        dc === "connectivity" ||
        ["communication", "comm ", "radio", "liaison", "link"].some(token => haystack.includes(token));

      // Somfy connectivity entities use ON for a healthy link and OFF for a fault.
      if (isConnectivity) return entity.state === "off";

      const isDiagnostic =
        ["battery", "problem", "tamper", "door", "window", "motion", "safety"].includes(dc) ||
        ["defaut", "défaut", "problem", "batter", "arrachement", "tamper", "ouverture", "alarm"]
          .some(token => haystack.includes(token));

      // Other binary diagnostic entities follow the usual HA convention:
      // ON = active problem, OFF = normal.
      return isDiagnostic && entity.state === "on";
    });
  }

  _formatState(entity) {
    if (!entity) return tr(this._hass, "unavailable");
    if (entity.state === "unavailable") return tr(this._hass, "unavailable");
    if (entity.state === "unknown") return tr(this._hass, "unknown");
    try { return this._hass.formatEntityState(entity); } catch (_) { return entity.state; }
  }

_formatName(entity, fallbackKey) {
  if (entity) {
    let name = "";

    try {
      name = this._hass.formatEntityName(entity) || "";
    } catch (_) {}

    if (!name) {
      name = entity.attributes?.friendly_name || "";
    }

    if (name) {
      return name;
    }
  }

  return tr(this._hass, fallbackKey);
}

  _alarmValues() {
    const entity = this._getState(this.config.alarm_entity);
    const state = entity?.state ?? "unavailable";
    const colors = {
      disarmed: "var(--secondary-text-color)", armed_away: "#206633", armed_home: "#f59e0b",
      armed_night: "#8b5cf6", pending: "#f59e0b", arming: "#f59e0b", triggered: "#ef4444",
      unavailable: "var(--disabled-color)", unknown: "var(--disabled-color)",
    };
    return { label: this._formatState(entity), color: colors[state] || "var(--secondary-text-color)", state, entity };
  }

  _sinceLabel(entityId) {
    const entity = this._getState(entityId);
    if (!entity?.last_changed) return "";
    return this._relativeTime(entity.last_changed);
  }

  _relativeTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value || "");
    const diffMin = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
    if (diffMin < 1) return tr(this._hass, "lessThanMinute");
    if (diffMin < 60) return tr(this._hass, "sinceMinutes", { n: diffMin });
    const hours = Math.floor(diffMin / 60), minutes = diffMin % 60;
    const text = minutes === 0 ? `${hours}h` : `${hours}h${String(minutes).padStart(2, "0")}`;
    return tr(this._hass, "sinceHours", { n: text });
  }

  _entityIcon(entity, sensor) {
    if (entity?.attributes?.icon) return entity.attributes.icon;
    const state = entity?.state;
    const dc = entity?.attributes?.device_class;
    const icons = {
      battery: state === "on" ? "mdi:battery-alert" : "mdi:battery",
      connectivity: state === "on" ? "mdi:lan-disconnect" : "mdi:lan-connect",
      door: state === "on" ? "mdi:door-open" : "mdi:door-closed",
      window: state === "on" ? "mdi:window-open-variant" : "mdi:window-closed-variant",
      motion: state === "on" ? "mdi:motion-sensor" : "mdi:motion-sensor-off",
      tamper: state === "on" ? "mdi:shield-alert" : "mdi:shield-check",
      problem: state === "on" ? "mdi:alert-circle" : "mdi:check-circle",
    };
    if (icons[dc]) return icons[dc];
    const fallback = {
      capteur1: state === "on" ? "mdi:battery-alert" : "mdi:battery",
      capteur2: state === "on" ? "mdi:alert-circle" : "mdi:shield-check",
      capteur3: state === "on" ? "mdi:door-open" : "mdi:door-closed",
      capteur4: state === "on" ? "mdi:motion-sensor" : "mdi:motion-sensor-off",
      capteur5: state === "on" ? "mdi:cctv" : "mdi:cctv-off",
      capteur6: state === "on" ? "mdi:radio-tower" : "mdi:radio-tower-off",
      capteur7: state === "on" ? "mdi:signal" : "mdi:signal-off",
      capteur8: "mdi:access-point-network",
      capteur9: "mdi:signal-cellular-3",
    };
    return fallback[sensor?.key] || "mdi:alert-circle-outline";
  }

  _sensorValues(sensor) {
    const entityId = this._resolveSensorEntity(sensor);
    const entity = this._getState(entityId);
    const state = entity?.state ?? "unavailable";
    const unavailable = ["unavailable", "unknown"].includes(state);
    const statusLabel = this._formatState(entity);
    if (sensor.type === "binary") {
      const isOk = state === sensor.okState;
      const color = unavailable ? "var(--disabled-color)" : isOk ? "#22c55e" : "#ef4444";
      return { entityId, entity, statusLabel, statusColor: color, dotColor: color, icon: this._entityIcon(entity, sensor) };
    }
    return {
      entityId, entity, statusLabel,
      statusColor: unavailable ? "var(--disabled-color)" : "var(--primary-text-color)",
      dotColor: unavailable ? "var(--disabled-color)" : "var(--primary-color)",
      icon: this._entityIcon(entity, sensor),
    };
  }

  _supportedAlarmActions() {
    const entity = this._getState(this.config.alarm_entity);
    const features = Number(entity?.attributes?.supported_features || 0);
    const actions = [{ key: "disarm", label: "disarm", cls: "btn-disarm", icon: "mdi:lock-open-variant" }];
    if (!features || (features & ALARM_FEATURES.ARM_HOME)) actions.push({ key: "arm_home", label: "home", cls: "btn-arm-home", icon: "mdi:home-lock" });
    if (!features || (features & ALARM_FEATURES.ARM_AWAY)) actions.push({ key: "arm_away", label: "away", cls: "btn-arm-away", icon: "mdi:shield-lock" });
    if (features & ALARM_FEATURES.ARM_NIGHT) actions.push({ key: "arm_night", label: "night", cls: "btn-arm-night", icon: "mdi:weather-night" });
    return actions;
  }

  _connectionOk() {
    const alarm = this._getState(this.config.alarm_entity);
    return alarm && !["unavailable", "unknown"].includes(alarm.state);
  }

  _lastSyncText() {
    const entityId = this._findLastSync();
    const entity = this._getState(entityId);
    if (!entity) return "";
    const raw = entity.state;
    if (!raw || ["unknown", "unavailable"].includes(raw)) return this._formatState(entity);
    return this._relativeTime(raw);
  }

  _imageEntities() {
    if (!this._hass) return [];

    return [1, 2, 3, 4, 5]
      .map(n => {
        const configured = this.config?.[`image_entity_${n}`];
        if (configured && this._getState(configured)) {
          return this._getState(configured);
        }

        const candidates = [
          `image.sofy_recent_image_${n}`,
          `image.somfy_protexial_image_recente_${n}`,
          `image.somfy_protexiom_image_recente_${n}`,
        ];

        for (const entityId of candidates) {
          const entity = this._getState(entityId);
          if (entity) return entity;
        }

        return undefined;
      })
      .filter(Boolean);
  }

  _hasImageSupport() {
    return (
      this._imageEntities().length > 0 ||
      !!this._getState("binary_sensor.sofy_image_surveillance") ||
      !!this._getState("binary_sensor.somfy_protexial_surveillance_images") ||
      !!this._findImageStartButton() ||
      !!this._findImageStopButton() ||
      !!this._findGalleryUrl()
    );
  }

  _imageUrl(entity) {
    if (!entity) return "";
    const url = entity.attributes?.entity_picture;
    if (!url) return "";
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}v=${encodeURIComponent(entity.last_updated || Date.now())}`;
  }

  _imageMeta(entityId) {
    const e = this._hass?.states[entityId];
    if (!e || ["unknown", "unavailable"].includes(e.state)) return null;
    return this._formatState(e);
  }

  _formatImageAge() {
    const entity =
      this._hass?.states["sensor.sofy_latest_image_age"] ||
      this._hass?.states["sensor.somfy_protexial_age_de_la_derniere_image"] ||
      this._hass?.states["sensor.somfy_protexiom_age_de_la_derniere_image"];

    if (!entity || ["unknown", "unavailable"].includes(entity.state)) {
      return null;
    }

    const value = Number(entity.state);
    if (!Number.isFinite(value)) {
      return this._formatState(entity);
    }

    const unit = String(
      entity.attributes?.unit_of_measurement || ""
    ).trim().toLowerCase();

    const formatFromMinutes = totalMinutesRaw => {
      const totalMinutes = Math.max(0, Math.round(totalMinutesRaw));
      const days = Math.floor(totalMinutes / 1440);
      const hours = Math.floor((totalMinutes % 1440) / 60);
      const minutes = totalMinutes % 60;

      if (days > 0) {
        if (hours > 0) return `${days} j ${hours} h`;
        return `${days} j`;
      }

      if (hours > 0) {
        if (minutes > 0) return `${hours} h ${minutes} min`;
        return `${hours} h`;
      }

      return `${minutes} min`;
    };

    // Hours
    if (["h", "hour", "hours", "heure", "heures"].includes(unit)) {
      return formatFromMinutes(value * 60);
    }

    // Minutes
    if (["min", "minute", "minutes"].includes(unit)) {
      return formatFromMinutes(value);
    }

    // Seconds
    if (["s", "sec", "secs", "second", "seconds", "seconde", "secondes"].includes(unit)) {
      if (value < 60) {
        return `${Math.round(value)} s`;
      }
      return formatFromMinutes(value / 60);
    }

    // Home Assistant can expose longer time units too.
    if (["d", "day", "days", "jour", "jours"].includes(unit)) {
      return formatFromMinutes(value * 1440);
    }

    // If the integration does not expose a unit, keep the value exactly
    // as Home Assistant formats it instead of assuming seconds.
    return this._formatState(entity);
  }

  _normalizeGalleryUrl(value) {
    if (value === undefined || value === null) return "";
    const url = String(value).trim();
    if (!url || ["unknown", "unavailable", "none", "null"].includes(url.toLowerCase())) return "";
    return url;
  }

  _findGalleryUrl() {
    // A Lovelace card cannot read ConfigEntry private data directly.
    // Explicit card configuration therefore has first priority.
    const explicit = this._normalizeGalleryUrl(this.config.gallery_url);
    if (explicit) return explicit;

    const attrNames = [
      "gallery_url",
      "local_gallery_url",
      "image_gallery_url",
      "gallery",
      "galerie_url",
      "galerie_locale",
      "url",
    ];

    const preferredIds = [
      "sensor.sofy_images_in_latest_event",
      "sensor.sofy_latest_image_event",
      "binary_sensor.sofy_image_surveillance",
      "binary_sensor.sofy_image_transmitter_link",
    ];

    const candidates = [
      ...preferredIds.map(id => this._getState(id)).filter(Boolean),
      ...this._allSomfyEntities().filter(entity => {
        const haystack = `${entity.entity_id} ${entity.attributes?.friendly_name || ""}`.toLowerCase();
        return haystack.includes("image") || haystack.includes("gallery") || haystack.includes("galerie");
      }),
    ];

    const seen = new Set();
    for (const entity of candidates) {
      if (!entity || seen.has(entity.entity_id)) continue;
      seen.add(entity.entity_id);

      for (const name of attrNames) {
        const value = this._normalizeGalleryUrl(entity.attributes?.[name]);
        if (/^(https?:\/\/|\/)/i.test(value)) return value;
      }

      // Also accept a sensor whose state itself is a URL.
      const stateUrl = this._normalizeGalleryUrl(entity.state);
      if (/^(https?:\/\/|\/)/i.test(stateUrl)) return stateUrl;
    }

    return "";
  }

  _openGallery(url) {
    const target = this._normalizeGalleryUrl(url);
    if (!target) return;

    // Relative paths stay on the current Home Assistant origin.
    let resolved = target;
    try {
      resolved = new URL(target, window.location.origin).href;
    } catch (_) {}

    window.open(resolved, "_blank", "noopener,noreferrer");
  }

  _findImageStartButton() {
    if (this.config.image_start_entity) return this.config.image_start_entity;
    const defaultEntity = "button.sofy_start_image_surveillance";
    if (this._getState(defaultEntity)) return defaultEntity;
    if (!this.config.auto_detect) return "";
    return this._findByAliases("button", [
      "start_image_surveillance",
      "demarrer_surveillance_images",
      "démarrer surveillance images",
      "start image surveillance",
      "start image monitoring",
    ]);
  }

  _findImageStopButton() {
    if (this.config.image_stop_entity) return this.config.image_stop_entity;
    const defaultEntity = "button.sofy_stop_image_surveillance";
    if (this._getState(defaultEntity)) return defaultEntity;
    if (!this.config.auto_detect) return "";
    return this._findByAliases("button", [
      "stop_image_surveillance",
      "arreter_surveillance_images",
      "arrêter surveillance images",
      "stop image surveillance",
      "stop image monitoring",
    ]);
  }

  _renderImageSection() {
    if (!this._hasImageSupport()) return "";

    const images = this._imageEntities().sort((a, b) => {
      const na = Number(a.entity_id.match(/_(\d+)$/)?.[1] || 0);
      const nb = Number(b.entity_id.match(/_(\d+)$/)?.[1] || 0);
      return na - nb;
    });

    const monitoring = this._hass.states["binary_sensor.sofy_image_surveillance"];
    const monitoringOn = monitoring?.state === "on";

    const startEntityId = this._findImageStartButton();
    const stopEntityId = this._findImageStopButton();
    const start = this._getState(startEntityId);
    const stop = this._getState(stopEntityId);
    const galleryUrl = this._findGalleryUrl();

    const meta = [
      {
        icon: "mdi:image-multiple-outline",
        label: tr(this._hass, "lastImageEvent"),
        value: this._imageMeta("sensor.sofy_latest_image_event"),
      },
      {
        icon: "mdi:timer-sand",
        label: tr(this._hass, "imageAge"),
        value: this._formatImageAge(),
      },
      {
        icon: "mdi:file-download-outline",
        label: tr(this._hass, "lastFtp"),
        value: this._imageMeta("sensor.sofy_last_ftp_reception"),
      },
      {
        icon: "mdi:web-check",
        label: tr(this._hass, "localServer"),
        value: this._imageMeta("sensor.sofy_last_local_server_communication"),
      },
    ].filter(item => item.value !== null);

    return `
      <div class="section image-section">
        <div class="image-header">
          <div class="section-title">${tr(this._hass, "imagesTitle")}</div>
          ${monitoring ? `
            <div class="image-monitoring ${monitoringOn ? "on" : "off"}"
                 data-more-info="${monitoring.entity_id}">
              <span class="image-monitoring-dot"></span>
              <span>${tr(this._hass, "imageMonitoring")}</span>
              <strong>${this._formatState(monitoring)}</strong>
            </div>` : ""}
        </div>

        ${(start || stop || galleryUrl) ? `
          <div class="image-controls ${galleryUrl ? "has-gallery" : ""}">
            ${start ? `
              <button class="image-action image-action-start"
                      data-image-button="${start.entity_id}">
                <ha-icon icon="mdi:camera-wireless"></ha-icon>
                <span>${tr(this._hass, "startImageMonitoring")}</span>
              </button>` : ""}
            ${stop ? `
              <button class="image-action image-action-stop"
                      data-image-button="${stop.entity_id}">
                <ha-icon icon="mdi:camera-off"></ha-icon>
                <span>${tr(this._hass, "stopImageMonitoring")}</span>
              </button>` : ""}
            ${galleryUrl ? `
              <button class="image-action image-action-gallery"
                      data-gallery-url="${galleryUrl}">
                <ha-icon icon="mdi:image-multiple"></ha-icon>
                <span>${tr(this._hass, "openGallery")}</span>
              </button>` : ""}
          </div>` : ""}

        ${meta.length ? `
          <div class="image-meta">
            ${meta.map(item => `
              <div class="image-meta-item">
                <ha-icon class="image-meta-icon" icon="${item.icon}"></ha-icon>
                <div class="image-meta-text">
                  <div class="image-meta-label">${item.label}</div>
                  <div class="image-meta-value">${item.value}</div>
                </div>
              </div>`).join("")}
          </div>` : ""}

        ${images.length ? `
          <div class="image-gallery-head">
            <span>${tr(this._hass, "recentImages")}</span>
            <span class="image-count">${images.length}</span>
          </div>
          <div class="image-grid">
            ${images.map((entity, i) => `
              <div class="image-tile"
                   data-more-info="${entity.entity_id}"
                   title="${entity.attributes?.friendly_name || `Image ${i + 1}`}">
                <img src="${this._imageUrl(entity)}"
                     alt="${entity.attributes?.friendly_name || `Image ${i + 1}`}"
                     loading="lazy">
                <span class="image-tile-label">${entity.attributes?.friendly_name || `Image ${i + 1}`}</span>
              </div>`).join("")}
          </div>` : ""}
      </div>`;
  }

  _render() {
    if (!this._hass) return;
    const alarm = this._alarmValues();
    const isArmed = !["disarmed", "unavailable", "unknown"].includes(alarm.state);
    const activeSensors = SENSORS_DEF.filter(sensor => this.config.sensors.includes(sensor.key));
    const resets = RESET_DEF.map(reset => ({ ...reset, entityId: this._resolveReset(reset) })).filter(reset => this._getState(reset.entityId));
    const faultEntities = this._faultEntities();
    const refreshEntity = this._findRefresh();
    const lastSyncText = this._lastSyncText();
    const connectionOk = this._connectionOk();
    const alarmActions = this._supportedAlarmActions();

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family:var(--primary-font-family, sans-serif); }
        .card { background:var(--ha-card-background, var(--card-background-color)); border-radius:var(--ha-card-border-radius, 12px); overflow:hidden; border:1px solid var(--divider-color); box-shadow:var(--ha-card-box-shadow, none); }
        .alarm-section { padding:${this.config.compact ? "12px" : "16px"}; background:var(--secondary-background-color); border-bottom:1px solid var(--divider-color); }
        .topline { display:flex; align-items:center; gap:8px; margin-bottom:${this.config.compact ? "8px" : "14px"}; }
        .section-title { flex:1; font-size:11px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase; color:var(--secondary-text-color); }
        .connection { display:flex; align-items:center; justify-content:flex-end; gap:5px; font-size:11px; color:var(--secondary-text-color); white-space:nowrap; }
        .connection-dot { width:7px; height:7px; border-radius:50%; background:${connectionOk ? "#22c55e" : "#ef4444"}; }
        .refresh-zone { display:flex; align-items:center; gap:7px; flex-shrink:0; }
        .status-sync-stack { display:flex; flex-direction:column; align-items:flex-end; gap:2px; min-width:0; }
        .refresh-sync { display:flex; flex-direction:column; align-items:flex-end; gap:1px; min-width:0; }
        .refresh-sync-label { font-size:9px; line-height:1.15; color:var(--secondary-text-color); white-space:nowrap; }
        .refresh-sync-value { font-size:10px; line-height:1.2; color:var(--primary-text-color); white-space:nowrap; font-weight:600; }
        .refresh-icon-btn { width:32px; height:32px; border:0; border-radius:50%; display:flex; align-items:center; justify-content:center; background:transparent; color:var(--primary-text-color); cursor:pointer; flex-shrink:0; }
        .refresh-icon-btn:hover { background:var(--secondary-background-color); }
        .refresh-icon-btn[disabled] { opacity:.5; cursor:default; }
        .spin { animation:spin 1s linear infinite; } @keyframes spin { to { transform:rotate(360deg); } }
        .alarm-row { display:flex; align-items:center; gap:14px; }
        .alarm-icon-wrap { width:${this.config.compact ? "42px" : "48px"}; height:${this.config.compact ? "42px" : "48px"}; display:flex; align-items:center; justify-content:center; border-radius:12px; background:var(--primary-background-color); flex-shrink:0; color:${alarm.color}; ${isArmed ? `box-shadow:0 0 14px ${alarm.color}88;` : ""} }
        .alarm-info { flex:1; display:flex; flex-direction:column; gap:3px; min-width:0; cursor:pointer; }
        .alarm-name { font-size:15px; font-weight:600; color:var(--primary-text-color); }
        .alarm-state-row { display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; }
        .alarm-state { font-size:13px; color:${alarm.color}; }
        .alarm-since { font-size:11px; color:var(--secondary-text-color); font-style:italic; }
        .alarm-actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:7px; max-width:${this.config.compact ? "250px" : "320px"}; }
        .btn { min-height:36px; padding:0 10px; border-radius:8px; border:none; box-sizing:border-box; font:600 12px var(--primary-font-family, sans-serif); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:opacity .2s, transform .1s; white-space:nowrap; }
        .btn:hover { opacity:.85; transform:translateY(-1px); } .btn:active { transform:translateY(0); }
        .btn ha-icon { --mdc-icon-size:17px; }
        .btn-disarm { background:#4b5563; color:#fff; } .btn-arm-away { background:#206633; color:#fff; }
        .btn-arm-home { background:#f59e0b; color:#fff; } .btn-arm-night { background:#7c3aed; color:#fff; }
        .section { padding:${this.config.compact ? "10px 12px" : "14px 16px"}; background:var(--ha-card-background, var(--card-background-color)); }
        .section + .section { border-top:1px solid var(--divider-color); }
        .section-head { display:flex; align-items:center; margin-bottom:6px; }
        .section-head .section-title { margin:0; }
        .sensor-row, .fault-row { display:flex; align-items:center; gap:12px; padding:${this.config.compact ? "7px 0" : "10px 0"}; border-bottom:1px solid var(--divider-color); cursor:pointer; }
        .sensor-row:last-child, .fault-row:last-child { border-bottom:none; }
        .sensor-row:hover, .fault-row:hover { background:color-mix(in srgb, var(--primary-color) 5%, transparent); }
        .sensor-icon, .fault-icon { --mdc-icon-size:22px; color:var(--secondary-text-color); flex-shrink:0; }
        .fault-icon { color:#ef4444; }
        .sensor-label, .fault-info { flex:1; min-width:0; font-size:14px; color:var(--primary-text-color); }
        .fault-name { font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .fault-state { font-size:11px; color:var(--secondary-text-color); margin-top:2px; }
        .sensor-status { display:flex; align-items:center; gap:6px; font-size:13px; font-weight:600; text-align:right; }
        .dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
        .ok-box { display:flex; align-items:center; gap:8px; color:#22c55e; font-size:13px; padding:8px 0; }
        .reset-grid { display:grid; grid-template-columns:repeat(${Math.max(1, Math.min(3, resets.length))}, minmax(0, 1fr)); gap:8px; }
        .reset-btn { min-width:0; width:100%; min-height:42px; padding:6px 8px; background:var(--secondary-background-color); color:var(--primary-text-color); border:1px solid var(--divider-color); white-space:normal; }
        .footer { display:flex; align-items:center; gap:10px; padding:7px 16px; border-top:1px solid var(--divider-color); color:var(--disabled-color); font-size:10px; }
        .last-sync { flex:1; display:flex; align-items:center; gap:5px; }
        .version { margin-left:auto; }
        .modal-backdrop { position:fixed; inset:0; z-index:1000; display:none; align-items:center; justify-content:center; background:rgba(0,0,0,.45); padding:20px; }
        .modal-backdrop.open { display:flex; }
        .modal { width:min(380px, 100%); background:var(--ha-card-background, var(--card-background-color)); border-radius:16px; box-shadow:0 18px 50px rgba(0,0,0,.35); padding:20px; color:var(--primary-text-color); }
        .modal-title { font-size:18px; font-weight:700; margin-bottom:10px; }
        .modal-message { font-size:14px; color:var(--secondary-text-color); margin-bottom:14px; }
        .modal input { width:100%; box-sizing:border-box; padding:12px; border:1px solid var(--divider-color); border-radius:8px; background:var(--primary-background-color); color:var(--primary-text-color); font-size:16px; }
        .pin-panel { display:none; }
        .pin-panel.visible { display:block; }
        .pin-display { min-height:48px; display:flex; align-items:center; justify-content:center; gap:8px; border:1px solid var(--divider-color); border-radius:10px; background:var(--primary-background-color); margin-bottom:12px; padding:0 12px; box-sizing:border-box; }
        .pin-dots { min-height:22px; font-size:24px; line-height:1; letter-spacing:8px; color:var(--primary-text-color); text-align:center; }
        .pin-placeholder { color:var(--secondary-text-color); font-size:13px; letter-spacing:0; }
        .pin-keypad { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
        .pin-key { min-height:52px; border:1px solid var(--divider-color); border-radius:10px; background:var(--secondary-background-color); color:var(--primary-text-color); font-size:20px; font-weight:650; cursor:pointer; display:flex; align-items:center; justify-content:center; }
        .pin-key:hover { background:color-mix(in srgb, var(--primary-color) 10%, var(--secondary-background-color)); }
        .pin-key:active { transform:scale(.97); }
        .pin-key ha-icon { --mdc-icon-size:22px; }
        .pin-key.utility { font-size:12px; color:var(--secondary-text-color); }
        .modal-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:16px; }
        .modal-actions button { min-height:36px; border-radius:8px; padding:0 14px; border:0; cursor:pointer; font-weight:600; }
        .secondary { background:var(--secondary-background-color); color:var(--primary-text-color); }
        .primary { background:var(--primary-color); color:var(--text-primary-color, #fff); }

        .image-section { border-top:1px solid var(--divider-color); }
        .image-header { display:flex; align-items:center; justify-content:space-between; gap:14px; margin-bottom:12px; }
        .image-header .section-title { flex:0 1 auto; margin:0; }
        .image-monitoring { display:flex; align-items:center; gap:6px; min-width:0; font-size:12px; color:var(--secondary-text-color); cursor:pointer; }
        .image-monitoring strong { color:var(--primary-text-color); font-weight:600; }
        .image-monitoring-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .image-monitoring.on .image-monitoring-dot { background:#22c55e; }
        .image-monitoring.off .image-monitoring-dot { background:#ef4444; }

        .image-controls { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; margin-bottom:14px; } .image-controls.has-gallery { grid-template-columns:repeat(3,minmax(0,1fr)); }
        .image-action { min-height:40px; border:1px solid var(--divider-color); border-radius:9px; background:var(--secondary-background-color); color:var(--primary-text-color); padding:0 12px; cursor:pointer; font-weight:600; display:flex; align-items:center; justify-content:center; gap:7px; }
        .image-action:hover { opacity:.86; }
        .image-action ha-icon { --mdc-icon-size:19px; }
        .image-action-start { color:#206633; }
        .image-action-stop { color:#b42318; } .image-action-gallery { color:var(--primary-color); }

        .image-meta { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; margin-bottom:14px; }
        .image-meta-item { min-width:0; min-height:52px; display:flex; align-items:center; gap:10px; padding:9px 10px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:9px; background:var(--secondary-background-color); }
        .image-meta-icon { --mdc-icon-size:19px; color:var(--secondary-text-color); flex-shrink:0; }
        .image-meta-text { min-width:0; flex:1; }
        .image-meta-label { color:var(--secondary-text-color); font-size:9px; line-height:1.2; text-transform:uppercase; letter-spacing:.06em; margin-bottom:3px; }
        .image-meta-value { color:var(--primary-text-color); font-size:12px; line-height:1.3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

        .image-gallery-head { display:flex; align-items:center; justify-content:space-between; gap:8px; color:var(--secondary-text-color); font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; margin:0 0 8px; }
        .image-count { min-width:20px; height:20px; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; background:var(--secondary-background-color); color:var(--primary-text-color); font-size:10px; }
        .image-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:8px; }
        .image-tile { position:relative; aspect-ratio:4/3; min-width:0; overflow:hidden; border-radius:9px; background:var(--secondary-background-color); cursor:pointer; border:1px solid var(--divider-color); }
        .image-tile:hover { opacity:.92; }
        .image-tile img { width:100%; height:100%; display:block; object-fit:cover; }
        .image-tile-label { position:absolute; left:5px; right:5px; bottom:5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:3px 6px; border-radius:5px; background:rgba(0,0,0,.66); color:#fff; font-size:9px; }


        @media (max-width:650px) {
          .alarm-row { align-items:flex-start; flex-wrap:wrap; }
          .alarm-actions { width:100%; max-width:none; justify-content:flex-start; }
          .btn { flex:1; min-width:82px; }
          .reset-grid { grid-template-columns:1fr; }
          .connection { font-size:9px; }
          .connection span { display:inline; }
          .refresh-sync-label { display:none; }
          .refresh-sync-value { font-size:9px; }
          .image-header { align-items:flex-start; flex-direction:column; gap:6px; }
          .image-monitoring { font-size:11px; }
          .image-controls, .image-controls.has-gallery { grid-template-columns:1fr; }
          .image-meta { grid-template-columns:1fr; }
          .image-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
        }
      </style>
      <ha-card class="card">
        <div class="alarm-section">
          <div class="topline">
            <div class="section-title">${this.config.title || tr(this._hass, "defaultTitle")}</div>
            ${(this.config.show_refresh || (this.config.show_last_sync && lastSyncText)) ? `
              <div class="refresh-zone">
                <div class="status-sync-stack">
                  <div class="connection" title="${connectionOk ? tr(this._hass, "connected") : tr(this._hass, "disconnected")}">
                    <span class="connection-dot"></span>
                    <span>${connectionOk ? tr(this._hass, "connected") : tr(this._hass, "disconnected")}</span>
                  </div>
                  ${this.config.show_last_sync && lastSyncText ? `
                    <div class="refresh-sync">
                      <span class="refresh-sync-label">${tr(this._hass, "lastSync")}</span>
                      <span class="refresh-sync-value">${lastSyncText}</span>
                    </div>` : ""}
                </div>
                ${this.config.show_refresh ? `<button class="refresh-icon-btn" data-refresh title="${tr(this._hass, "refresh")}"><ha-icon icon="mdi:refresh"></ha-icon></button>` : ""}
              </div>` : ""}
          </div>
          <div class="alarm-row">
            <div class="alarm-icon-wrap"><ha-icon icon="mdi:shield-home" style="--mdc-icon-size:26px"></ha-icon></div>
            <div class="alarm-info" data-more-info="${this.config.alarm_entity}" title="${tr(this._hass, "clickDetails")}">
              <span class="alarm-name">${this._formatName(alarm.entity, "alarm")}</span>
              <div class="alarm-state-row"><span class="alarm-state">${alarm.label}</span><span class="alarm-since">${this._sinceLabel(this.config.alarm_entity)}</span></div>
            </div>
            <div class="alarm-actions">
              ${alarmActions.map(action => `<button class="btn ${action.cls}" data-alarm-action="${action.key}"><ha-icon icon="${action.icon}"></ha-icon>${tr(this._hass, action.label)}</button>`).join("")}
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-head"><div class="section-title">${tr(this._hass, "sensorsTitle")}</div></div>
          ${activeSensors.length ? activeSensors.map(sensor => {
            const values = this._sensorValues(sensor);
            const label = this.config.labels[sensor.key] || this._formatName(values.entity, sensor.defaultText);
            return `<div class="sensor-row" data-key="${sensor.key}" ${values.entityId ? `data-more-info="${values.entityId}"` : ""}>
              <ha-icon class="sensor-icon" icon="${values.icon}"></ha-icon>
              <span class="sensor-label">${label}</span>
              <span class="sensor-status" style="color:${values.statusColor}"><span class="dot" style="background:${values.dotColor}"></span><span class="sensor-val">${values.statusLabel}</span></span>
            </div>`;
          }).join("") : `<div class="ok-box">${tr(this._hass, "noSensors")}</div>`}
        </div>

        ${this.config.show_faults ? `<div class="section">
          <div class="section-head"><div class="section-title">${tr(this._hass, "faultsTitle")}${faultEntities.length ? ` (${faultEntities.length})` : ""}</div></div>
          ${faultEntities.length ? faultEntities.map(entity => `<div class="fault-row" data-more-info="${entity.entity_id}">
            <ha-icon class="fault-icon" icon="${this._entityIcon(entity)}"></ha-icon>
            <div class="fault-info"><div class="fault-name">${this._formatName(entity, "faultsTitle")}</div><div class="fault-state">${this._formatState(entity)}</div></div>
          </div>`).join("") : `<div class="ok-box"><ha-icon icon="mdi:check-circle"></ha-icon>${tr(this._hass, "noFaults")}</div>`}
        </div>` : ""}

        ${resets.length ? `<div class="section">
          <div class="section-head"><div class="section-title">${tr(this._hass, "resetsTitle")}</div></div>
          <div class="reset-grid">${resets.map(reset => `<button class="btn reset-btn" data-reset-key="${reset.key}" data-entity-id="${reset.entityId}"><ha-icon icon="${reset.icon}"></ha-icon><span>${tr(this._hass, reset.text)}</span></button>`).join("")}</div>
        </div>` : ""}

        ${(() => {
          try {
            return typeof this._renderImageSection === "function"
              ? this._renderImageSection()
              : "";
          } catch (error) {
            console.error("Somfy Protexial Card image section failed", error);
            return "";
          }
        })()}
        <div class="footer">
          <span></span>
          <span class="version">Somfy Protexial Card ${CARD_VERSION}</span>
        </div>
      </ha-card>

      <div class="modal-backdrop" id="modal">
        <div class="modal">
          <div class="modal-title" id="modal-title"></div>
          <div class="modal-message" id="modal-message"></div>
          <input id="modal-input" type="password" inputmode="numeric" autocomplete="current-password">
          <div class="pin-panel" id="pin-panel">
            <div class="pin-display">
              <div class="pin-dots" id="pin-dots"></div>
            </div>
            <div class="pin-keypad">
              <button type="button" class="pin-key" data-pin-key="1">1</button>
              <button type="button" class="pin-key" data-pin-key="2">2</button>
              <button type="button" class="pin-key" data-pin-key="3">3</button>
              <button type="button" class="pin-key" data-pin-key="4">4</button>
              <button type="button" class="pin-key" data-pin-key="5">5</button>
              <button type="button" class="pin-key" data-pin-key="6">6</button>
              <button type="button" class="pin-key" data-pin-key="7">7</button>
              <button type="button" class="pin-key" data-pin-key="8">8</button>
              <button type="button" class="pin-key" data-pin-key="9">9</button>
              <button type="button" class="pin-key utility" data-pin-clear>${tr(this._hass, "clearPin")}</button>
              <button type="button" class="pin-key" data-pin-key="0">0</button>
              <button type="button" class="pin-key utility" data-pin-backspace title="⌫"><ha-icon icon="mdi:backspace-outline"></ha-icon></button>
            </div>
          </div>
          <div class="modal-actions">
            <button class="secondary" data-modal-cancel>${tr(this._hass, "cancel")}</button>
            <button class="primary" data-modal-confirm>${tr(this._hass, "confirm")}</button>
          </div>
        </div>
      </div>`;

    this.shadowRoot.querySelectorAll("[data-more-info]").forEach(row => {
      row.addEventListener("click", event => {
        if (event.target.closest("button")) return;
        fireMoreInfo(this, row.dataset.moreInfo);
      });
    });
    this.shadowRoot.querySelectorAll("[data-alarm-action]").forEach(button => {
      button.addEventListener("click", () => this._callAlarmAction(button.dataset.alarmAction));
    });
    this.shadowRoot.querySelectorAll("[data-reset-key]").forEach(button => {
      button.addEventListener("click", () => this._callReset(button.dataset.resetKey, button.dataset.entityId));
    });
    const refresh = this.shadowRoot.querySelector("[data-refresh]");
    if (refresh) refresh.addEventListener("click", () => this._refresh(refreshEntity));

    this.shadowRoot.querySelectorAll("[data-image-button]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();
        this._callImageButton(button.dataset.imageButton);
      });
    });
    this.shadowRoot.querySelectorAll("[data-gallery-url]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();
        this._openGallery(button.dataset.galleryUrl);
      });
    });
  }

  async _callImageButton(entityId) {
    if (!entityId || !this._getState(entityId)) return;
    try {
      await this._hass.callService("button", "press", {}, { entity_id: entityId });
    } catch (error) {
      console.error("Somfy Protexial Card image action failed", error);
    }
  }


  _showModal({ title, message = "", input = false, confirmText, inputPlaceholder = "" }) {
    return new Promise(resolve => {
      const modal = this.shadowRoot.getElementById("modal");
      const titleEl = this.shadowRoot.getElementById("modal-title");
      const messageEl = this.shadowRoot.getElementById("modal-message");
      const inputEl = this.shadowRoot.getElementById("modal-input");
      const pinPanel = this.shadowRoot.getElementById("pin-panel");
      const pinDots = this.shadowRoot.getElementById("pin-dots");
      const confirmBtn = modal.querySelector("[data-modal-confirm]");
      const cancelBtn = modal.querySelector("[data-modal-cancel]");

      let pinValue = "";

      const updatePinDisplay = () => {
        if (!pinDots) return;
        if (!pinValue) {
          pinDots.innerHTML = `<span class="pin-placeholder">${inputPlaceholder || tr(this._hass, "codePlaceholder")}</span>`;
        } else {
          pinDots.textContent = "•".repeat(pinValue.length);
        }
        inputEl.value = pinValue;
      };

      const addDigit = digit => {
        if (!/^\d$/.test(digit)) return;
        // Plenty for Somfy codes while preventing accidental runaway input.
        if (pinValue.length >= 12) return;
        pinValue += digit;
        updatePinDisplay();
      };

      const backspace = () => {
        pinValue = pinValue.slice(0, -1);
        updatePinDisplay();
      };

      const clearPin = () => {
        pinValue = "";
        updatePinDisplay();
      };

      titleEl.textContent = title;
      messageEl.textContent = message;
      messageEl.style.display = message ? "" : "none";

      // Numeric PIN requests use the integrated keypad.
      inputEl.style.display = "none";
      pinPanel?.classList.toggle("visible", input);
      inputEl.placeholder = inputPlaceholder;
      inputEl.value = "";
      updatePinDisplay();

      confirmBtn.textContent = confirmText || tr(this._hass, "confirm");
      modal.classList.add("open");

      const digitButtons = [...modal.querySelectorAll("[data-pin-key]")];
      const backspaceBtn = modal.querySelector("[data-pin-backspace]");
      const clearBtn = modal.querySelector("[data-pin-clear]");

      digitButtons.forEach(button => {
        button.onclick = () => addDigit(button.dataset.pinKey);
      });
      if (backspaceBtn) backspaceBtn.onclick = backspace;
      if (clearBtn) clearBtn.onclick = clearPin;

      const close = result => {
        modal.classList.remove("open");
        pinPanel?.classList.remove("visible");
        confirmBtn.onclick = null;
        cancelBtn.onclick = null;
        modal.onclick = null;
        document.removeEventListener("keydown", onKeyDown);
        digitButtons.forEach(button => { button.onclick = null; });
        if (backspaceBtn) backspaceBtn.onclick = null;
        if (clearBtn) clearBtn.onclick = null;
        resolve(result);
      };

      const onKeyDown = event => {
        if (/^\d$/.test(event.key)) {
          event.preventDefault();
          addDigit(event.key);
        } else if (event.key === "Backspace") {
          event.preventDefault();
          backspace();
        } else if (event.key === "Delete") {
          event.preventDefault();
          clearPin();
        } else if (event.key === "Enter") {
          event.preventDefault();
          close(input ? pinValue : true);
        } else if (event.key === "Escape") {
          event.preventDefault();
          close(null);
        }
      };

      confirmBtn.onclick = () => close(input ? pinValue : true);
      cancelBtn.onclick = () => close(null);
      modal.onclick = event => { if (event.target === modal) close(null); };
      document.addEventListener("keydown", onKeyDown);
    });
  }

  async _callAlarmAction(action) {
    const entity = this._getState(this.config.alarm_entity);
    const codeRequired = Boolean(entity?.attributes?.code_format || entity?.attributes?.code_arm_required === true);
    let code = this.config.alarm_code;
    if (codeRequired && !code) {
      code = await this._showModal({
        title: tr(this._hass, "codeTitle"),
        input: true,
        inputPlaceholder: tr(this._hass, "codePlaceholder"),
        confirmText: tr(this._hass, "validate"),
      });
      if (!code) return;
    }
    const serviceMap = {
      disarm: "alarm_disarm",
      arm_home: "alarm_arm_home",
      arm_away: "alarm_arm_away",
      arm_night: "alarm_arm_night",
    };
    const service = serviceMap[action];
    if (!service) return;
    try {
      await this._hass.callService("alarm_control_panel", service, code ? { code } : {}, { entity_id: this.config.alarm_entity });
    } catch (error) {
      console.error("Somfy Protexial Card alarm action failed", error);
    }
  }

  async _callReset(key, entityId) {
    const reset = RESET_DEF.find(item => item.key === key);
    if (!reset || !entityId) return;
    const entity = this._getState(entityId);
    const label = this._formatName(entity, reset.text);
    const confirmed = await this._showModal({
      title: tr(this._hass, "confirmReset"),
      message: label,
      confirmText: tr(this._hass, "confirm"),
    });
    if (!confirmed) return;
    try {
      await this._hass.callService("button", "press", {}, { entity_id: entityId });
    } catch (error) {
      console.error("Somfy Protexial Card reset failed", error);
    }
  }

  async _refresh(refreshEntity) {
    if (this._refreshing) return;
    this._refreshing = true;
    this._updateRefreshButton();
    try {
      if (refreshEntity && this._getState(refreshEntity)) {
        await this._hass.callService("button", "press", {}, { entity_id: refreshEntity });
      } else {
        const ids = SENSORS_DEF.map(sensor => this._resolveSensorEntity(sensor))
          .concat([this.config.alarm_entity])
          .filter(entityId => entityId && this._getState(entityId));
        if (ids.length) {
          await this._hass.callService("homeassistant", "update_entity", {}, { entity_id: ids });
        }
      }
    } catch (error) {
      console.error("Somfy Protexial Card refresh failed", error);
    } finally {
      window.setTimeout(() => {
        this._refreshing = false;
        this._updateRefreshButton();
      }, 600);
    }
  }

  _updateRefreshButton() {
    const button = this.shadowRoot.querySelector("[data-refresh]");
    if (!button) return;
    button.disabled = this._refreshing;
    const icon = button.querySelector("ha-icon");
    if (icon) icon.classList.toggle("spin", this._refreshing);
    button.title = this._refreshing ? tr(this._hass, "refreshing") : tr(this._hass, "refresh");
  }

  _update() {
    if (!this._hass || !this.shadowRoot.querySelector(".card")) return;
    if (this.shadowRoot.getElementById("modal")?.classList.contains("open")) return;
    // Dynamic sections can appear/disappear when faults or image states change.
    this._render();
    this._updateRefreshButton();
  }

  getCardSize() {
    const base = this.config?.compact ? 5 : 7;
    return base + (this.config?.show_faults ? 1 : 0);
  }
}

if (!customElements.get("somfy-protexial-card")) {
  customElements.define("somfy-protexial-card", SomfyProtexialCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === "somfy-protexial-card")) {
  window.customCards.push({
    type: "somfy-protexial-card",
    name: "Somfy Protexial Card",
    description: "Multilingual card for Somfy Protexial and Protexiom alarm systems",
    configurable: true,
  });
}
