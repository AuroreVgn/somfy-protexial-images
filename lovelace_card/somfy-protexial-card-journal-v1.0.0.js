/* ========================================================
   Somfy Protexial / Protexiom Card - Event journal
   ======================================================== */

const EVENTS_CARD_VERSION = "v1.0.0";

const EVENTS_TRANSLATIONS = {
  fr: { title:"Journal des événements", cardTitle:"Titre de la carte", entity:"Entité journal", maxEvents:"Nombre d’événements", noEvents:"Aucun événement", unavailable:"Journal indisponible", event:"Événement", source:"Élément concerné", pickerName:"Somfy Protexial — Journal des événements", pickerDescription:"Affiche les événements récents de Somfy Protexial / Protexiom" },
  en: { title:"Event journal", cardTitle:"Card title", entity:"Journal entity", maxEvents:"Number of events", noEvents:"No event", unavailable:"Journal unavailable", event:"Event", source:"Related element", pickerName:"Somfy Protexial — Event journal", pickerDescription:"Displays recent Somfy Protexial / Protexiom events" },
  de: { title:"Ereignisprotokoll", cardTitle:"Kartentitel", entity:"Protokoll-Entität", maxEvents:"Anzahl der Ereignisse", noEvents:"Keine Ereignisse", unavailable:"Protokoll nicht verfügbar", event:"Ereignis", source:"Betroffenes Element", pickerName:"Somfy Protexial — Ereignisprotokoll", pickerDescription:"Zeigt die letzten Ereignisse von Somfy Protexial / Protexiom an" },
  es: { title:"Registro de eventos", cardTitle:"Título de la tarjeta", entity:"Entidad del registro", maxEvents:"Número de eventos", noEvents:"Sin eventos", unavailable:"Registro no disponible", event:"Evento", source:"Elemento relacionado", pickerName:"Somfy Protexial — Registro de eventos", pickerDescription:"Muestra los eventos recientes de Somfy Protexial / Protexiom" },
  it: { title:"Registro eventi", cardTitle:"Titolo della scheda", entity:"Entità registro", maxEvents:"Numero di eventi", noEvents:"Nessun evento", unavailable:"Registro non disponibile", event:"Evento", source:"Elemento interessato", pickerName:"Somfy Protexial — Registro eventi", pickerDescription:"Mostra gli eventi recenti di Somfy Protexial / Protexiom" },
  nl: { title:"Gebeurtenissenlogboek", cardTitle:"Kaarttitel", entity:"Logboekentiteit", maxEvents:"Aantal gebeurtenissen", noEvents:"Geen gebeurtenissen", unavailable:"Logboek niet beschikbaar", event:"Gebeurtenis", source:"Betrokken element", pickerName:"Somfy Protexial — Gebeurtenissenlogboek", pickerDescription:"Toont recente gebeurtenissen van Somfy Protexial / Protexiom" },
  pt: { title:"Registo de eventos", cardTitle:"Título do cartão", entity:"Entidade do registo", maxEvents:"Número de eventos", noEvents:"Sem eventos", unavailable:"Registo indisponível", event:"Evento", source:"Elemento relacionado", pickerName:"Somfy Protexial — Registo de eventos", pickerDescription:"Apresenta os eventos recentes do Somfy Protexial / Protexiom" },
};

function eventsTr(hass, key) {
  const language = (hass?.locale?.language || hass?.language || navigator.language || "en").toLowerCase().split("-")[0];
  return EVENTS_TRANSLATIONS[language]?.[key] ?? EVENTS_TRANSLATIONS.en[key] ?? key;
}

class SomfyProtexialEventsCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:"open"});
    this._config={};
    this._built=false;
  }
  set hass(hass) {
    this._hass=hass;
    if (!this._built) {
      this._built=true;
      this._render();
      return;
    }
    const form=this.shadowRoot?.getElementById("form");
    if (form) form.hass=hass;
  }
  setConfig(config) {
    this._config={...config};
    if (!this._built && this._hass) {
      this._built=true;
      this._render();
    }
  }
  _fire(config) {
    this._config=config;
    this.dispatchEvent(new CustomEvent("config-changed", {detail:{config}, bubbles:true, composed:true}));
  }
  _render() {
    if (!this.shadowRoot || !this._hass) return;
    this.shadowRoot.innerHTML = `<style>:host{display:block}ha-form{display:block}</style><ha-form id="form"></ha-form>`;
    const form=this.shadowRoot.getElementById("form");
    form.hass=this._hass;
    form.schema=[
      {name:"entity", selector:{entity:{domain:"sensor"}}},
      {name:"title", selector:{text:{}}},
      {name:"max_events", selector:{number:{min:1,max:10,step:1,mode:"box"}}},
    ];
    form.data={entity:this._config.entity||"", title:this._config.title||"", max_events:this._config.max_events ?? 10};
    form.computeLabel=field => field.name === "entity" ? eventsTr(this._hass,"entity") : field.name === "max_events" ? eventsTr(this._hass,"maxEvents") : eventsTr(this._hass,"cardTitle");
    form.addEventListener("value-changed", e => { e.stopPropagation(); this._fire({...this._config,...e.detail.value}); });
  }
}

if (!customElements.get("somfy-protexial-events-card-editor")) {
  customElements.define("somfy-protexial-events-card-editor", SomfyProtexialEventsCardEditor);
}

class SomfyProtexialEventsCard extends HTMLElement {
  constructor(){ super(); this.attachShadow({mode:"open"}); this._rendered=false; }
  static getConfigElement(){ return document.createElement("somfy-protexial-events-card-editor"); }
  static getStubConfig(){ return {entity:"", title:"", max_events:10}; }
  setConfig(config){
    this.config={entity:config?.entity||"", title:config?.title||"", max_events:Math.max(1,Math.min(10,Number(config?.max_events ?? 10)))};
    this._rendered=false;
  }
  set hass(hass){ this._hass=hass; this._render(); }
  _escape(value){ return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  _findEntity(){
    if (this.config.entity && this._hass?.states?.[this.config.entity]) return this.config.entity;
    return Object.values(this._hass?.states||{}).find(e => {
      if (!e.entity_id.startsWith("sensor.")) return false;
      const h=`${e.entity_id} ${e.attributes?.friendly_name||""}`.toLowerCase();
      return (h.includes("somfy_protexial") || h.includes("somfy_protexiom")) && (h.includes("journal") || h.includes("event"));
    })?.entity_id || this.config.entity;
  }
  _events(entity){
    const events=entity?.attributes?.events;
    return Array.isArray(events) ? events.slice(0,this.config.max_events) : [];
  }
  _render(){
    if (!this._hass || !this.config) return;
    const entityId=this._findEntity();
    const entity=entityId ? this._hass.states?.[entityId] : undefined;
    const unavailable=!entity || ["unknown","unavailable"].includes(entity.state);
    const events=this._events(entity);
    const title=this.config.title || eventsTr(this._hass,"title");
    this.shadowRoot.innerHTML=`
      <style>
        :host{display:block;font-family:var(--primary-font-family,sans-serif)}
        ha-card{overflow:hidden}
        .header{display:flex;align-items:center;gap:10px;padding:14px 16px;background:var(--secondary-background-color);border-bottom:1px solid var(--divider-color)}
        .header ha-icon{--mdc-icon-size:23px;color:var(--secondary-text-color)}
        .title{font-size:15px;font-weight:600;color:var(--primary-text-color);flex:1}
        .count{font-size:11px;color:var(--secondary-text-color)}
        .event{display:grid;grid-template-columns:64px 1fr;gap:10px;padding:10px 16px;border-bottom:1px solid var(--divider-color);cursor:pointer}
        .event:last-child{border-bottom:none}.event:hover{background:color-mix(in srgb,var(--primary-color) 5%,transparent)}
        .when{font-size:11px;line-height:1.35;color:var(--secondary-text-color);white-space:nowrap}
        .name{font-size:13px;font-weight:600;color:var(--primary-text-color);line-height:1.3}
        .source{font-size:11px;color:var(--secondary-text-color);margin-top:3px}
        .empty{display:flex;align-items:center;gap:8px;padding:16px;color:var(--secondary-text-color);font-size:13px}
        .footer{padding:6px 16px;border-top:1px solid var(--divider-color);font-size:9px;color:var(--disabled-color);text-align:right}
      </style>
      <ha-card>
        <div class="header" ${entityId ? `data-more-info="${this._escape(entityId)}"` : ""}>
          <ha-icon icon="mdi:clipboard-text-clock-outline"></ha-icon><div class="title">${this._escape(title)}</div><div class="count">${events.length}</div>
        </div>
        ${unavailable ? `<div class="empty"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this._escape(eventsTr(this._hass,"unavailable"))}</div>` : events.length ? events.map(ev => {
          const date=this._escape(ev.date||""); const time=this._escape(ev.time||""); const name=this._escape(ev.event||"");
          const source=this._escape(ev.element||""); const code=this._escape(ev.code||"");
          return `<div class="event" ${entityId ? `data-more-info="${this._escape(entityId)}"` : ""}><div class="when">${date}<br>${time}</div><div><div class="name">${name}</div>${source||code ? `<div class="source">${source}${code ? ` (${code})` : ""}</div>` : ""}</div></div>`;
        }).join("") : `<div class="empty"><ha-icon icon="mdi:information-outline"></ha-icon>${this._escape(eventsTr(this._hass,"noEvents"))}</div>`}
        <div class="footer">Somfy Protexial Events Card ${EVENTS_CARD_VERSION}</div>
      </ha-card>`;
    this.shadowRoot.querySelectorAll("[data-more-info]").forEach(el => el.addEventListener("click", () => fireMoreInfo(this, el.dataset.moreInfo)));
  }
  getCardSize(){ return Math.max(2, Math.ceil((this._events(this._hass?.states?.[this._findEntity()]).length + 1) / 2)); }
}

if (!customElements.get("somfy-protexial-events-card")) {
  customElements.define("somfy-protexial-events-card", SomfyProtexialEventsCard);
}
window.customCards=window.customCards||[];
if (!window.customCards.some(c=>c.type==="somfy-protexial-events-card")) {
  const pickerLanguage = (document.documentElement.lang || navigator.language || "en").toLowerCase().split("-")[0];
  const pickerTranslations = EVENTS_TRANSLATIONS[pickerLanguage] || EVENTS_TRANSLATIONS.en;
  window.customCards.push({type:"somfy-protexial-events-card",name:pickerTranslations.pickerName,description:pickerTranslations.pickerDescription,configurable:true});
}
