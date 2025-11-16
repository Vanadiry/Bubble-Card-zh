/*! For license information please see bubble-card-zh.js.LICENSE.txt */
(()=>{"use strict";var e={26:(e,t,n)=>{n.d(t,{O:()=>i});var o=n(490);function i(e,t=e.elements,n=e.config.entity,i){if(t.currentState=e._hass.states[n]?.state,!t.currentState)return;if(t.currentList=n?.startsWith("input_select")||n?.startsWith("select")?e._hass.states[n].attributes.options:e._hass.states[n].attributes[i.select_attribute],t.currentSelectedAttribute=(0,o.aX)(e._hass.states[n],i.select_attribute),t.previousList===t.currentList&&t.previousState===t.currentState&&t.previousSelectedAttribute===t.currentSelectedAttribute)return;let a=t.currentList;for(t.currentState;t.dropdownSelect.firstChild;)t.dropdownSelect.removeChild(t.dropdownSelect.firstChild);Array.isArray(a)&&a.forEach((a=>{const r=document.createElement("mwc-list-item");r.value=a;const s=(0,o.z_)(e,e._hass.states[n],i.select_attribute,a);s&&(r.graphic="icon",r.appendChild(s));const l=(0,o.PW)(e,e._hass.states[n],i.select_attribute,a);r.appendChild(document.createTextNode(l)),a===t.currentSelectedAttribute&&r.setAttribute("selected",""),t.dropdownSelect.appendChild(r)})),t.previousList=t.currentList,t.previousState=t.currentState,t.previousSelectedAttribute=t.currentSelectedAttribute,t.dropdownContainer.appendChild(t.dropdownSelect)}},490:(e,t,n)=>{function o(e,t,n,o){function i(e){const t=e.replace(/_/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}switch(n){case"fan_modes":return e._hass.formatEntityAttributeValue(t,"fan_mode",o);case"hvac_modes":return e._hass.formatEntityState(t,o);case"swing_modes":return e._hass.formatEntityAttributeValue(t,"swing_mode",o);case"preset_modes":return e._hass.formatEntityAttributeValue(t,"preset_mode",o);default:return i(e._hass.formatEntityState(t,o))??i(o)}}function i(e,t){switch(t){case"fan_modes":return e.attributes.fan_mode||null;case"swing_modes":return e.attributes.swing_mode||null;case"preset_modes":return e.attributes.preset_mode||null;case"effect_list":return e.attributes.effect||null;case"source_list":return e.attributes.source||null;case"sound_mode_list":return e.attributes.sound_mode||null;default:return e.state}}function a(e,t,n,o){let i;switch(n){case"hvac_modes":i=document.createElement("ha-icon"),i.slot="graphic",i.icon=function(e){switch(e){case"auto":return"mdi:thermostat-auto";case"cool":return"mdi:snowflake";case"heat":return"mdi:fire";case"heat_cool":return"mdi:sun-snowflake-variant";case"dry":return"mdi:water-percent";case"fan_only":default:return"mdi:fan";case"off":return"mdi:power"}}(o);break;case"fan_modes":if(!t.attributes.fan_modes)return null;i=document.createElement("ha-attribute-icon"),i.slot="graphic",i.attribute="fan_mode",i.attributeValue=o,i.hass=e._hass,i.stateObj=t;break;case"swing_modes":i=document.createElement("ha-attribute-icon"),i.slot="graphic",i.attribute="swing_mode",i.attributeValue=o,i.hass=e._hass,i.stateObj=t;break;case"preset_modes":i=document.createElement("ha-attribute-icon"),i.slot="graphic",i.attribute="preset_mode",i.attributeValue=o,i.hass=e._hass,i.stateObj=t;break;default:i=!1}return i}function r(e,t,n,o){const i=t?.split(".")[0];switch(i){case"input_select":e._hass.callService("input_select","select_option",{entity_id:t,option:n});break;case"select":e._hass.callService("select","select_option",{entity_id:t,option:n});break;case"climate":switch(o.select_attribute){case"hvac_modes":e._hass.callService("climate","set_hvac_mode",{entity_id:t,hvac_mode:n});break;case"fan_modes":e._hass.callService("climate","set_fan_mode",{entity_id:t,fan_mode:n});break;case"swing_modes":e._hass.callService("climate","set_swing_mode",{entity_id:t,swing_mode:n});break;case"preset_modes":e._hass.callService("climate","set_preset_mode",{entity_id:t,preset_mode:n})}break;case"fan":"preset_modes"===o.select_attribute&&e._hass.callService("fan","set_preset_mode",{entity_id:t,preset_mode:n});break;case"light":"effect_list"===o.select_attribute&&e._hass.callService("light","turn_on",{entity_id:t,effect:n});break;case"media_player":switch(o.select_attribute){case"source_list":e._hass.callService("media_player","select_source",{entity_id:t,source:n});break;case"sound_mode_list":e._hass.callService("media_player","select_sound_mode",{entity_id:t,sound_mode:n})}break;default:console.warn(`Unsupported entity type: ${i}`)}}n.d(t,{Ab:()=>r,PW:()=>o,aX:()=>i,z_:()=>a})},352:(e,t,n)=>{n.d(t,{X:()=>s,F:()=>r});var o=n(537),i=n(490);const a="mwc-list-item {\n    border-radius: var(--bubble-select-list-border-radius, var(--bubble-border-radius, 24px));\n    margin: 0 8px;\n}\n\nmwc-list-item[selected] {\n    color: var(--primary-text-color) !important;\n    background-color: var(--bubble-select-list-item-accent-color, var(--bubble-list-item-accent-color, var(--bubble-accent-color, var(--bubble-default-color)))); /* Added the missing 'select' in the first var without removing the previous one for compatibilty */ \n}\n\nha-select {\n    --mdc-shape-medium: var(--bubble-select-list-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n    --mdc-theme-surface: var(--bubble-select-list-background-color, var(--bubble-select-main-background-color, var(--bubble-main-background-color, var(--card-background-color, var(--secondary-background-color)))));\n    --mdc-shape-large: 32px;\n    --mdc-shape-small: 64px;\n    --mdc-menu-max-width: min-content;\n    --mdc-menu-min-width: var(--bubble-select-list-width, 200px);\n    --mdc-select-max-width: min-content;\n    --mdc-select-outlined-hover-border-color: transparent;\n    --mdc-select-outlined-idle-border-color: transparent;\n    --mdc-theme-primary: transparent;\n    --right-value: calc(var(--mdc-menu-min-width) - 160px);\n}\n\n.bubble-sub-button ha-select {\n    --right-value: calc(var(--mdc-menu-min-width) - 168px);\n}\n\n.mdc-select {\n    color: transparent !important;\n    width: 150px !important;\n    position: absolute !important;\n    pointer-events: none;\n    right: var(--right-value, 46px);\n    height: 0px !important;\n}\n\n.mdc-menu, mwc-list, .mdc-list-item {\n    pointer-events: auto;\n}\n\n.mdc-select__dropdown-icon {\n    display: none !important;\n}\n\n.mdc-select__selected-text {\n    color: transparent !important;\n}\n\n.mdc-select__anchor {\n    width: 100%;\n    pointer-events: none;\n    top: -14px !important;\n    height: 28px !important;\n}\n\n.bubble-dropdown-container {\n    display: flex !important;\n    width: auto;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\n.bubble-dropdown-arrow {\n    display: flex;\n    position: absolute;\n    background: var(--bubble-select-arrow-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n    height: 36px;\n    width: 36px;\n    pointer-events: none;\n    border-radius: var(--bubble-select-button-border-radius, var(--bubble-border-radius, 20px));\n    align-items: center;\n    justify-content: center;\n    transition: background 0.2s, transform 0.2s;\n    pointer-events: none;\n}\n\n.bubble-dropdown-select {\n    position: relative;\n    width: 36px;\n}\n\n.bubble-dropdown-inner-border {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: var(--bubble-select-border, solid 2px var(--bubble-accent-color, var(--bubble-default-color)));\n    border-radius: var(--bubble-border-radius, 32px);\n    box-sizing: border-box;\n    pointer-events: none;\n}";function r(e,t=e.elements,n){t.dropdownContainer=(0,o.n)("div","bubble-dropdown-container"),t.dropdownSelect=(0,o.n)("ha-select","bubble-dropdown-select"),t.dropdownSelect.setAttribute("outlined",""),t.dropdownArrow=(0,o.n)("ha-icon","bubble-dropdown-arrow"),t.dropdownArrow.setAttribute("icon","mdi:chevron-down"),t.dropdownStyleElement=(0,o.n)("style"),t.dropdownCustomStyleElement=(0,o.n)("style"),t.dropdownStyleElement.textContent=a,t.dropdownContainerStyle=(0,o.n)("style"),t.dropdownContainerStyle.textContent=a,t.dropdownContainer.appendChild(t.dropdownArrow),t.dropdownContainer.appendChild(t.dropdownContainerStyle),t.dropdownSelect.updateComplete.then((()=>{var e;t.dropdownSelect.shadowRoot&&(t.dropdownSelect.shadowRoot.appendChild(t.dropdownStyleElement),t.dropdownSelect.shadowRoot.appendChild(t.dropdownCustomStyleElement),(e=t.dropdownSelect.shadowRoot.querySelector("ha-menu.mdc-select__menu"))&&(e.addEventListener("opened",(()=>{setTimeout((()=>{e.removeAttribute("open"),e.style.display=""}),0)}),{once:!0}),e.style.display="none",e.setAttribute("open","")))})),t===e.elements?t.buttonsContainer.appendChild(t.dropdownContainer):t.appendChild(t.dropdownContainer)}function s(e,t=e.elements,n=e.config.entity,a=e.config){const{dropdownArrow:r,dropdownSelect:s,mainContainer:l,background:c}=t,d=t===e.elements?l:t,u=t===e.elements?c:t;t.innerBorderElement=(0,o.n)("div"),t.innerBorderElement.classList.add("bubble-dropdown-inner-border"),d.appendChild(t.innerBorderElement),d.haRipple=(0,o.n)("ha-ripple"),t===e.elements?t.background.appendChild(d.haRipple):d.appendChild(d.haRipple);const p=e.elements.mainContainer;p&&void 0===p.openDropdowns&&(p.openDropdowns=0);let h=!1,b=null,m=0;const g=t===e.elements?!!(a&&a.button_action&&a.button_action.double_tap_action&&a.button_action.double_tap_action.action&&"none"!==a.button_action.double_tap_action.action):!!(a&&a.double_tap_action&&a.double_tap_action.action&&"none"!==a.double_tap_action.action),f=()=>{r.style.transform="rotate(180deg)",t.dropdownArrow.style.background="var(--bubble-accent-color, var(--bubble-default-color))",t.innerBorderElement&&(t.innerBorderElement.style.display="block"),e.elements&&e.elements.mainContainer&&(h||(h=!0,p&&p.openDropdowns++),e.elements.mainContainer.style.overflow="visible")};d.addEventListener("hass-action",(e=>{const t=e?.detail?.action;"double_tap"!==t&&"hold"!==t||("function"==typeof e.composedPath?e.composedPath():[]).includes(u)&&(b&&(clearTimeout(b),b=null),m=Date.now()+300)})),u.addEventListener("click",(e=>{if("mwc-list-item"===e.target.tagName.toLowerCase())return;const t=s.shadowRoot.querySelector("ha-menu.mdc-select__menu");if(t){if(h)return b&&(clearTimeout(b),b=null),void(m=Date.now()+200);Date.now()<m||(g?(b&&(clearTimeout(b),b=null),b=setTimeout((()=>{Date.now()<m||(t.show(),f()),b=null}),220)):(t.show(),f()))}else{const e=s.shadowRoot.querySelector("mwc-menu");e&&(e.setAttribute("open",""),f())}})),s.addEventListener("closed",(n=>{n.stopPropagation(),r.style.transform="rotate(0deg)",t.innerBorderElement&&(t.innerBorderElement.style.display="none"),t.dropdownArrow.style.background="",e.elements&&e.elements.mainContainer&&(h&&(h=!1,p&&p.openDropdowns--),p&&0===p.openDropdowns&&(e.elements.mainContainer.style.overflow=""))})),t.dropdownSelect.addEventListener("click",(t=>{const o=t.target.value;(0,i.Ab)(e,n,o,a)}))}},198:(e,t,n)=>{n.d(t,{AQ:()=>u,Kr:()=>d});var o=n(537),i=n(207),a=n(26),r=n(76),s=n(491),l=n(87),c=n(490);function d(e,t=e.config.sub_button){(function(e,t){if(!t)return;e.previousValues=e.previousValues||{};const n=[...e.previousValues.subButtons||[]];t.forEach(((t,n)=>{if(!t)return;const d=function(e,t,n){const i=t.entity??e.config.entity;return{index:n,entity:i,context:e,state:e._hass.states[i],name:t.name??(0,o.D$)(e,"friendly_name",i)??"",attributeType:t.attribute??"",attribute:(0,o.D$)(e,t.attribute??"",i),isOn:(0,o.$C)(e,i),showName:t.show_name??!1,showState:t.show_state??!1,showAttribute:t.show_attribute??!1,showLastChanged:t.show_last_changed??!1,showLastUpdated:t.show_last_updated??!1,showIcon:t.show_icon??!0,showBackground:t.show_background??!0,stateBackground:t.state_background??!0,lightBackground:t.light_background??!0,showArrow:t.show_arrow??!0,isSelect:i?.startsWith("input_select")||i?.startsWith("select")||t.select_attribute,icon:(0,l.sW)(e,i,t.icon??"")}}(e,t,n+1);if("fan_modes"===d.attributeType&&null==d.attribute)return void(e.elements[d.index]||(0,o.n)("div",`bubble-sub-button bubble-sub-button-${d.index}`)).classList.add("hidden");let u=e.elements[d.index];if((!u||d.isSelect&&!u.dropdownContainer)&&(u=(0,i.n)(e,d.index,d.isSelect,d.showArrow,d.entity,t)),t.hide_when_parent_unavailable&&e.config.entity&&!e.detectedEditor){if("unavailable"===(0,o.Gu)(e,e.config.entity))return void(u.style.display="none");"none"===u.style.display&&(u.style.display="")}!function(e,t,n){(function(e,t,n){const{isSelect:o,showArrow:i,entity:r,subButton:s}=n;if(o&&t.dropdownSelect){const n=e._hass.states[r]?.state,o=e.previousValues[r]?.state;n!==o&&(n&&t.dropdownSelect.value!==n&&(t.dropdownSelect.value=n,t.dropdownSelect.dispatchEvent(new Event("change",{bubbles:!0}))),e.previousValues[r]={state:n}),(0,a.O)(e,t,r,s),function(e,t){t?(e.dropdownArrow.style.display="",e.dropdownContainer.style.width="24px"):(e.dropdownArrow.style.display="none",e.dropdownContainer.style.width="0px",e.style.padding="6px")}(t,i)}else t.contains(t.dropdownContainer)&&t.removeChild(t.dropdownContainer)})(e,t,n),function(e,t){const{showBackground:n,isOn:i,stateBackground:a,lightBackground:r,entity:s,context:c}=t;if(!n)return void e.classList.remove("background-on","background-off");const d=(0,o.GM)("var(--bubble-button-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))))");i&&a?(r&&e.style.setProperty("--bubble-sub-button-light-background-color",(0,l.VA)(c,s,d?1:.8)),e.classList.add("background-on"),e.classList.remove("background-off")):(e.classList.add("background-off"),e.classList.remove("background-on"))}(t,n),function(e,t){const{subButton:n,isSelect:o,entity:i}=t;if(("none"!==n.tap_action?.action||"none"!==n.double_tap_action?.action||"none"!==n.hold_action?.action)&&!e.actionAdded){const t={tap_action:{action:o?"none":"more-info"},double_tap_action:{action:"none"},hold_action:{action:"none"}};if(o){const t={...n,tap_action:{action:"none"}};(0,s.dN)(e,t,i),e.setAttribute("no-slide","")}else(0,s.dN)(e,n,i,t);(0,s.pd)(e,e.feedback),o&&(e.style.pointerEvents="auto",e.style.cursor="pointer"),e.actionAdded=!0}}(t,n);const i=function(e,t){const{state:n,name:i,attribute:a,attributeType:r,showName:s,showState:l,showAttribute:c,showLastChanged:d,showLastUpdated:u}=e,p=[];if(s&&i&&"unknown"!==i&&p.push(i),n&&l&&"unknown"!==n.state&&p.push(t._hass.formatEntityState(n)),n&&d&&"unknown"!==n.last_changed&&p.push((0,o.r6)(n.last_changed,t._hass.locale.language)),n&&u&&"unknown"!==n.last_updated&&p.push((0,o.r6)(n.last_updated,t._hass.locale.language)),n&&c)if(r.includes("forecast")){const e="°C"===t._hass.config.unit_system.temperature,n="km"===t._hass.config.unit_system.length;if(r.includes("temperature")&&null!=a){const t=parseFloat(a);p.push((0===t||0===t?"0":t.toFixed(1).replace(/\.0$/,""))+(e?" °C":" °F"))}else r.includes("humidity")&&null!=a?p.push(parseFloat(a).toFixed(0)+" %"):r.includes("precipitation")&&null!=a?p.push(parseFloat(a).toFixed(1).replace(/\.0$/,"")+" mm"):r.includes("wind_speed")&&null!=a?p.push(parseFloat(a).toFixed(1).replace(/\.0$/,"")+(n?" km/h":" mph")):null!=a&&"unknown"!==a&&p.push(a)}else{const e=t._hass.formatEntityAttributeValue(n,r),o=n.attributes?.[r],i=e&&"string"==typeof e&&e.trim().startsWith("0")&&e.trim().length>1;(0!==a&&"unknown"!==a&&null!=a||i)&&"unknown"!==o&&null!=o&&p.push(e??a)}return p.length?p.join(" · ").charAt(0).toUpperCase()+p.join(" · ").slice(1):""}(n,e);(function(e,t,n){const{showIcon:o,isSelect:i}=t;if(!e._hasVisibilityConditions){const t=!n&&!o&&!i;e.classList.toggle("hidden",t)}e.dropdownContainer&&(e.dropdownContainer.classList.toggle("no-icon-select-container",!n&&!o&&i),e.dropdownArrow.classList.toggle("no-icon-select-arrow",!n&&!o&&i))})(t,n,i),t.nameContainer.textContent!==i&&(t.nameContainer.textContent=i);const r=!(!n.isSelect||!t.dropdownSelect)&&Array.from(t.dropdownSelect.children).find((e=>e.hasAttribute("selected")))?.value;if(n.showIcon&&n.icon){let a=t.icon;if(a||(a=(0,o.n)("ha-icon","bubble-sub-button-icon"),a.classList.add("show-icon"),t.appendChild(a),t.icon=a),r){const o=(0,c.z_)(e,n.state,n.subButton.select_attribute,r);o&&!n.subButton.icon?(a.tagName!==o.tagName||a.icon!==o.icon||a.attribute!==o.attribute||a.attributeValue!==o.attributeValue)&&(t.replaceChild(o,a),t.icon=o,a=o):a.icon!==n.icon&&a.setAttribute("icon",n.icon)}else a.icon!==n.icon&&a.setAttribute("icon",n.icon);a.classList.remove("hidden"),a.classList.add("bubble-sub-button-icon","show-icon"),a.classList.toggle("icon-with-state",!!i),a.classList.toggle("icon-without-state",!i)}else t.icon&&(t.icon.classList.remove("show-icon"),t.icon.classList.add("hidden"));t.icon?.getAttribute("icon")!==t.icon?.icon&&t.icon.setAttribute("icon",t.icon.icon)}(e,u,{...d,subButton:t}),function(e,t,n){const o=t.visibility;if(null!=o){e._hasVisibilityConditions=!0;const t=(0,r.eC)(o);if((0,r.db)(t)){const o=(0,r.XH)(t,n);void 0!==e._previousVisibilityState&&e._previousVisibilityState===o||(e.classList.toggle("hidden",!o),e._previousVisibilityState=o)}}else e._hasVisibilityConditions=!1}(u,t,e._hass)})),function(e,t,n){for(let o=t.length;o>n.length;o--){const t=e.elements[o];t&&(e.elements.subButtonContainer.removeChild(t),delete e.elements[o])}}(e,n,t),e.previousValues.subButtons=t.slice()})(e,t),function(e){Array.isArray(e.subButtonIcon)||(e.subButtonIcon=[]);("pop-up"===e.config.card_type?e.popUp:e.content).querySelectorAll(".bubble-sub-button-icon").forEach(((t,n)=>{e.subButtonIcon[n]=t}))}(e)}function u(e){const t=e.config.sub_button;return t&&Array.isArray(t)?t.map((t=>{if(!t)return"";const n=t.entity??e.config.entity;return e._hass.states[n]?.state??""})):[]}},207:(e,t,n)=>{n.d(t,{n:()=>s,g:()=>r});var o=n(537),i=n(352);const a=".bubble-sub-button-container {\n    position: relative;\n    display: flex;\n    justify-content: end;\n    right: 8px;\n    align-content: center;\n    gap: 8px;\n    align-items: center;\n}\n\n.bubble-sub-button {\n    display: flex;\n    flex-wrap: nowrap;\n    flex-direction: row-reverse;\n    align-items: center;\n    justify-content: center;\n    position: relative;\n    right: 0;\n    box-sizing: border-box;\n    width: min-content;\n    min-width: 36px;\n    height: 36px;\n    vertical-align: middle;\n    font-size: 12px;\n    border-radius: var(--bubble-sub-button-border-radius, var(--bubble-border-radius, 32px));\n    padding: 0 8px;\n    white-space: nowrap;\n    transition: all 0.5s ease-in-out;\n    color: var(--primary-text-color);\n}\n\n.bubble-sub-button-name-container {\n    display: flex;\n}\n\n.show-icon {\n    display: flex;\n    --mdc-icon-size: 16px;\n}\n\n.bright-background {\n    color: var(--bubble-sub-button-dark-text-color, rgb(0, 0, 0));\n}\n\n.background-on {\n    background-color: var(--bubble-sub-button-light-background-color, var(--bubble-accent-color, var(--bubble-default-color)));\n}\n\n.background-off {\n    background-color: var(--bubble-sub-button-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n}\n\n.icon-with-state {\n    margin-right: 4px;\n    --mdc-icon-size: 16px;\n}\n\n.icon-without-state {\n    margin-right: 0;\n    --mdc-icon-size: 20px;\n}\n\n.no-icon-select-arrow {\n    width: 24px !important;\n    height: 24px !important;\n    --mdc-icon-size: 24px;\n}\n\n.no-icon-select-container {\n    width: 16px !important;\n}\n\n.bubble-sub-button .bubble-dropdown-arrow {\n    background: none !important;\n}\n\n.bubble-sub-button.is-select.background-on {\n    background: var(--bubble-select-arrow-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background))))) !important;\n}\n\n.sub-buttons-grid .bubble-sub-button-container {\n    display: grid;\n    row-gap: calc( ( ( var(--row-height,56px) - 36px ) * var(--row-size,1) + var(--row-gap, 8px) * ( var(--row-size,1) - 1 ) ) / ( var(--row-size,1) + 1 ));\n    grid-template-rows: repeat(var(--row-size,1), 1fr);\n    grid-template-columns: repeat(1, 1fr);\n    grid-auto-flow: column;\n}\n\n.sub-buttons-grid .bubble-sub-button-container:has(> :last-child:nth-child(2)) :nth-child(2) {\n    grid-row: 1 / calc(var(--row-size,1) + 1);\n}\n\n.rows-2 .bubble-sub-button-container {\n    flex-direction: column;\n    gap: 4px !important;\n    row-gap: calc( ( ( var(--row-height,56px) - 40px ) * var(--row-size,1) + var(--row-gap, 8px) * ( var(--row-size,1) - 1 ) ) / ( 2*var(--row-size,1) + 2 ));\n    column-gap: 4px !important;\n    display: grid !important;\n    grid-template-columns: repeat(1, 1fr);\n    grid-template-rows: repeat(calc(2*var(--row-size,1)), minmax(auto, max-content));\n    grid-auto-flow: column;\n    width: auto;\n}\n\n.rows-2 .bubble-sub-button {\n    height: 20px !important;\n}\n\n.large.rows-2 .bubble-sub-button-container:has(> :last-child:nth-child(2)) :nth-child(2) {\n    grid-row: 1 / calc(2*var(--row-size,1) + 1);\n}";function r(e,t={}){const{container:n=e.content,appendTo:i=n.firstChild?.firstChild,before:r=!1}=t;e.elements=e.elements||{};let s=e.elements.subButtonContainer;if(!s&&e.config.sub_button){s=(0,o.n)("div","bubble-sub-button-container");const t=(0,o.n)("style");t.textContent=a,s.appendChild(t),r&&i?i.prepend(s):i&&i.appendChild(s),e.elements.subButtonContainer=s}return s}function s(e,t,n,a,s,l){e.elements.subButtonContainer||r(e);const c=(0,o.n)("div",`bubble-sub-button bubble-sub-button-${t}`);return c.nameContainer=(0,o.n)("div","bubble-sub-button-name-container"),c.feedbackContainer=(0,o.n)("div","bubble-feedback-container"),c.feedback=(0,o.n)("div","bubble-feedback-element feedback-element"),c.appendChild(c.feedbackContainer),c.feedbackContainer.appendChild(c.feedback),n&&(c.classList.add("is-select"),(0,i.F)(e,c,a),c.dropdownContainer.style.display="none",(0,i.X)(e,c,s,l)),c.appendChild(c.nameContainer),e.elements.subButtonContainer.appendChild(c),e.elements[t]=c,c}},404:(e,t,n)=>{function o(){try{const e=localStorage.getItem("bubble-card-module-store");if(!e)return null;const t=JSON.parse(e);if(localStorage.getItem("bubble-card-api-failure-timestamp")&&t&&t.expiration<Date.now()){console.log("🛡️ API在失败后进入冷却期且缓存已过期，临时延长有效期");const e=Date.now()+72e5;return t.expiration=e,localStorage.setItem("bubble-card-module-store",JSON.stringify(t)),console.log("⏳ 缓存延长至",new Date(e)),t}return t&&t.expiration>Date.now()?t:t?(console.log("⚠️ 缓存已过期，但会保留以应对可能的API限制情况"),t):null}catch(e){return console.error("读取缓存时出错：",e),null}}function i(e){if(e&&0!==Object.keys(e).length)try{const t=Date.now()+864e5;localStorage.setItem("bubble-card-module-store",JSON.stringify({modules:e,expiration:t,lastFetchedAt:Date.now()})),console.log("模块数据缓存至",new Date(t))}catch(e){console.error("保存缓存时出错：",e)}}function a(e,t,n="info"){if(e.hass){const o=new CustomEvent("hass-notification",{detail:{message:t,severity:n},bubbles:!0,composed:!0});e.dispatchEvent(o)}else console.log(`[${n}] ${t}`)}n.d(t,{getCachedModuleData:()=>o,q:()=>a,saveCachedModuleData:()=>i})},571:(e,t,n)=>{n.d(t,{N5:()=>s,extractYamlFromMarkdown:()=>r,oV:()=>a,tF:()=>l});var o=n(382),i=n(395);function a(e){if(!e)return null;try{const t=o.Ay.load(e);if(t&&"object"==typeof t){const e=Object.keys(t);if(e.length>0){if(t[e[0]]?.name)return e[0];for(const n of e)if(t[n]?.name)return n;return e[0]}}}catch(e){console.warn("Error during YAML parsing for key extraction:",e)}try{const t=/^([a-zA-Z0-9_-]+)(?:\s*:|:)/m,n=e.match(t);if(n&&n[1])return n[1]}catch(e){console.warn("Error during key extraction by regex:",e)}return null}function r(e,t=null){if(!e)return"";const n=[...e.matchAll(/```(?:yaml|yml)\s+([\s\S]*?)```/g)];if(n.length>0){for(const e of n){let n=e[1].trim();try{const e=o.Ay.load(n);if(e&&"object"==typeof e){const i=Object.keys(e)[0];if(e[i]?.name||e[i]?.code||e[i]?.description||e[i]?.version)return t&&"object"==typeof e[i]&&!e[i].link&&(e[i].link=t,n=o.Ay.dump(e,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0})),n}}catch(e){}}let e=n[0][1].trim();if(t)try{const n=o.Ay.load(e);if(n&&"object"==typeof n){const i=Object.keys(n)[0];i&&"object"==typeof n[i]&&!n[i].link&&(n[i].link=t,e=o.Ay.dump(n,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0}))}}catch(e){}return e}const i=[...e.matchAll(/```\s*([\s\S]*?)```/g)];if(i.length>0){let e="";for(const t of i){const n=t[1].trim();n.length>e.length&&(e=n)}if(t&&e)try{const n=o.Ay.load(e);if(n&&"object"==typeof n){const i=Object.keys(n)[0];i&&"object"==typeof n[i]&&!n[i].link&&(n[i].link=t,e=o.Ay.dump(n,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0}))}}catch(e){}return e}return""}function s(e){return e&&Array.isArray(e)?e.filter((e=>e&&e.title)).map((e=>{try{const t=e.title.match(/\[(.*?)\]/);let n=t?(0,i.TL)(t[1]):`discussion-${e.number}`,o="",s=e.html_url;if(e.body&&(o=r(e.body,s),o)){const e=a(o);e&&(n=e)}const c=l(o,n,{bodyText:e.body,title:e.title,defaultCreator:e.user?.login||""});return{id:c.id,name:c.name,description:c.description,creator:c.creator,version:c.version,moduleLink:e.html_url,type:c.type,imageUrl:c.imageUrl,supportedCards:Array.isArray(c.supported)?c.supported:c.supported?[c.supported]:[],unsupportedCards:Array.isArray(c.unsupported)?c.unsupported:c.unsupported?[c.unsupported]:[],createdAt:e.created_at,updated_at:e.updated_at,userAvatar:e.user?.avatar_url,comments:e.comments,reactions:e.reactions,yamlContent:o}}catch(t){return console.error(`Error parsing discussion #${e.number}:`,t),{id:`discussion-${e.number}`,name:e.title||`Discussion #${e.number}`,description:"Error parsing the discussion",creator:e.user?.login||"",version:"",moduleLink:e.html_url,type:"",supportedCards:[],unsupportedCards:[],createdAt:e.created_at,updated_at:e.updated_at,userAvatar:e.user?.avatar_url,comments:e.comments,reactions:e.reactions}}})).filter((e=>e.id&&e.name)):[]}function l(e,t,n={}){const{bodyText:a,title:r,defaultCreator:s}=n;let l={id:t,name:t,version:"1.0",author:"",description:"",type:"Module",editor:[],supported:["button","climate","cover","horizontal-buttons-stack","media-player","pop-up","select","separator"],unsupported:[],creator:s||"",link:"",imageUrl:"",yaml:e};const c={name:!1,version:!1,author:!1,creator:!1,description:!1,type:!1,link:!1,supported:!1,unsupported:!1,editor:!1,code:!1,imageUrl:!1},d=(e,t,n=t,o=[])=>{if(void 0!==e[t])return l[n]=e[t],c[n]=!0,!0;for(const t of o)if(void 0!==e[t]&&!c[n])return l[n]=e[t],c[n]=!0,!0;return!1},u=e=>"string"==typeof e?e:Array.isArray(e)?e.join("\n"):"object"==typeof e?JSON.stringify(e):"";if(e)try{const n=o.Ay.load(e);if(n&&"object"==typeof n){if(1===Object.keys(n).length){const e=Object.keys(n)[0],o=n[e];if(l.id===t&&(l.id=e),o&&"object"==typeof o){if(d(o,"name"),d(o,"version"),d(o,"author"),d(o,"type"),d(o,"code"),d(o,"editor"),d(o,"link"),d(o,"creator"),d(o,"form_schema","editor"),d(o,"supported","supported"),d(o,"unsupported","unsupported",["unsupported_card"]),o.unsupported&&!o.supported&&!c.supported){const e=["button","climate","cover","horizontal-buttons-stack","media-player","pop-up","select","separator"];l.supported=e.filter((e=>!o.unsupported.includes(e))),c.supported=!0}void 0!==o.description&&(l.description=u(o.description),c.description=!0),o.info&&"object"==typeof o.info&&(d(o.info,"name"),d(o.info,"version"),d(o.info,"author"),d(o.info,"type"),d(o.info,"creator"),d(o.info,"link"),void 0===o.info.description||c.description||(l.description=u(o.info.description),c.description=!0))}}else{if(d(n,"name"),d(n,"version"),d(n,"author"),d(n,"type"),d(n,"code"),d(n,"editor"),d(n,"link"),d(n,"creator"),d(n,"form_schema","editor"),d(n,"supported","supported"),d(n,"unsupported","unsupported",["unsupported_card"]),n.unsupported&&!n.supported&&!c.supported){const e=["button","climate","cover","horizontal-buttons-stack","media-player","pop-up","select","separator"];l.supported=e.filter((e=>!n.unsupported.includes(e))),c.supported=!0}void 0!==n.description&&(l.description=u(n.description),c.description=!0)}if(!(c.editor||l.editor&&l.editor.length)){const e=JSON.stringify(n);if(e.includes('"type":')&&e.includes('"name":')&&1===Object.keys(n).length){const e=Object.keys(n)[0],t=n[e];if(t&&"object"==typeof t){const e=Object.keys(t).filter((e=>"object"==typeof t[e]&&(t[e].type||t[e].name||t[e].field)));e.length>0&&(l.editor=e.map((e=>({name:e,type:t[e].type||"input",...t[e]}))),c.editor=!0)}}}}}catch(e){console.error("Error during YAML analysis:",e)}if(!l.author&&l.creator?l.author=l.creator:!l.creator&&l.author&&(l.creator=l.author),a){if(!c.version){const e=[/\*\*Version:\*\*\s*(v?[\d\.]+)/i,/\|\s*(?:Version|v):\s*(v?[\d\.]+)\s*\|/i,/version\s+(v?[\d\.]+)/i];for(const t of e){const e=a.match(t);if(e&&e[1]){l.version=e[1];break}}}if(!c.description&&!l.description){const e=a.match(/\*\*Description\s*:\*\*\s*(.*?)(?=\n\s*\*\*|\n\s*#|$)/is);if(e&&e[1])l.description=(0,i.yh)(e[1].trim());else{const e=(0,i.yh)(a).split(/\n{2,}/);for(const t of e){const e=t.trim();if(e&&!e.startsWith("#")&&!e.match(/^[a-z_]+\s*:/i)&&e.length>15){l.description=e;break}}}}if(!c.supported&&0===l.supported.length){const e=a.match(/\*\*Supported\s*(?:Cards|Card)?\s*:\*\*\s*\[(.*?)\]/i);e&&(l.supported=e[1].split(",").map((e=>e.trim().replace(/['"]/g,""))))}if(!(c.creator||l.creator&&l.creator!==s)){const e=a.match(/\*\*Creator\s*:\*\*\s*\[?([^\]\n\r]+)(?:\]|\n|$)/i);e&&(l.creator=e[1].trim(),l.author||(l.author=l.creator))}if(!c.imageUrl&&!l.imageUrl){const e={Screenshot:a.match(/Screenshot:([^#]*?)(?=#|\n\s*\n\s*\*\*|$)/is)?.[1]||"",GetThisModule:a.match(/Get this Module([^#]*?)(?=#|\n\s*\n\s*\*\*|$)/is)?.[1]||""},t=[{regex:/!\[.*?\]\((https:\/\/[^)]+)\)/g,isGlobal:!0},{regex:/<img[^>]*src=["'](https:\/\/[^"']+)["'][^>]*>/i,isGlobal:!1},{regex:/src="(https:\/\/github\.com\/user-attachments\/assets\/[^"]+)"/i,isGlobal:!1}];for(const n of Object.values(e))if(n){for(const e of t)if(e.isGlobal){const t=[...n.matchAll(e.regex)];if(t.length>0){l.imageUrl=t[0][1];break}}else{const t=n.match(e.regex);if(t){l.imageUrl=t[1];break}}if(l.imageUrl)break}if(!l.imageUrl){const e=[...a.matchAll(/!\[.*?\]\((https:\/\/[^)]+)\)/g)];if(e.length>0){const t=e.filter((e=>e[1].includes("user-images.githubusercontent.com")||e[1].includes("github.com/user-attachments")));l.imageUrl=t.length>0?t[0][1]:e[0][1]}else{const e=a.match(/<img[^>]*src=["'](https:\/\/[^"']+)["'][^>]*>/i);e&&(l.imageUrl=e[1])}}}}if(r){if(!c.type){const e=r.match(/\[(.*?) Module\]/i);e&&(l.type=e[1].toLowerCase())}if(!c.version&&"1.0"===l.version){const e=r.match(/(v?[\d\.]+)/);e&&(l.version=e[1])}if(!c.name){let e=r.replace(/\[.*?\]\s*/,"").trim();e=e.replace(/\s*-\s*v?[\d\.]+$/,"").trim(),l.name=e}}return l}},395:(e,t,n)=>{n.d(t,{TL:()=>l,XY:()=>d,_O:()=>c,a7:()=>i,bx:()=>a,yh:()=>s});var o=n(784);function i(e){const t=o.Ki.get(e)||{};let n=t.name||e,i=t.description||"",a=t.editor||[],r=t.supported||[],s=t.unsupported||[],l=t.creator||t.author||"",c=t.link||"",d=t.version||"";return"string"==typeof a&&(a=o.Ki.get(a)?.editor||[]),Array.isArray(a)||(a=[a]),Array.isArray(r)||(r=[r]),Array.isArray(s)||(s=[s]),s.length>0&&0===r.length&&(r=["button","climate","cover","horizontal-buttons-stack","media-player","pop-up","select","separator"].filter((e=>!s.includes(e)))),{name:n,description:i,formSchema:a,supportedCards:r,unsupportedCard:s,moduleVersion:d,creator:l,moduleLink:c}}function a(e){if(!e)return"No description available";try{const t=/Description:\s*([^\n]+)/i,n=e.match(t);if(n&&n[1]){const e=s(n[1].trim());if(e&&e.length>5)return r(e)}const o=/description:\s*\|([\s\S]*?)(?=\n\s*\w+:|$)/i,i=e.match(o);if(i&&i[1]){const e=i[1].trim().split(/\n{2,}/)[0].trim();if(e&&e.length>5)return r(s(e))}const a=/description:\s*["']([^"']+)["']/i,l=e.match(a);if(l&&l[1]){const e=s(l[1].trim());if(e&&e.length>5)return r(e)}const c=/description:\s*([^\n\r]+)/i,d=e.match(c);if(d&&d[1]){const e=s(d[1].trim());if(e&&e.length>5)return r(e)}const u=e.split("\n");let p=!1,h=[];for(let e=0;e<u.length;e++){const t=u[e].trim();if(t)if(t.includes("支持的卡片类型：")||t.match(/^Version:/i)||t.match(/^Creator:/i)||t.match(/^ID:/i))p=!0;else if(p){if(t.startsWith("```")||t.startsWith("#")||t.startsWith("-")||t.startsWith(">")||t.includes("yaml")||t.match(/^\s*[a-z_]+:/i))continue;if(t.length>10&&!t.includes("Supported")&&(h.push(t),h.join(" ").length>40))break}}return h.length>0?r(s(h.join(" ").trim())):"string"!=typeof e||e.includes("description:")?"无可用描述":r(s(e))}catch(e){return console.warn("在格式化描述时出错：",e),"无可用描述"}}function r(e){if(!e)return e;const t=e.trim(),n=(e,t)=>e>=0&&(-1===o||e<o);let o=-1,i=null;const a=t.search(/[.!?]\s/);n(a)&&(o=a+1,i="punct");const r=t.search(/<br|<\/p>|<p\s|<div|<\/div|<\/a>/i);n(r)&&(o=r,i="html");const s=t.search(/\n|\r\n/);if(n(s)&&(o=s,i="break"),o>=0){let e=t.substring(0,o).trim();if(e.length<5&&t.length>30){const n=t.substring(o+1).search(/[.!?]|\n|<br/i);n>0&&(e=t.substring(0,o+1+n).trim())}return e=e.replace(/<[^>]*>/g,"").trim(),"punct"===i||e.endsWith(".")?e:e+"."}const l=t.replace(/<[^>]*>/g,"").trim();return l.endsWith(".")?l:l+"."}function s(e){return e?e.replace(/\*\*(.*?)\*\*/g,"$1").replace(/\*(.*?)\*/g,"$1").replace(/`(.*?)`/g,"$1").replace(/~~(.*?)~~/g,"$1").replace(/\[(.*?)\]\(.*?\)/g,"$1").replace(/<\/?[^>]+(>|$)/g,"").replace(/^#+\s+/gm,"").replace(/\n{3,}/g,"\n\n").trim():""}function l(e){return e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}function c(e,t){if(!e||!t)return 0;const n=e.split(".").map(Number),o=t.split(".").map(Number);for(let e=0;e<Math.max(n.length,o.length);e++){const t=n[e]||0,i=o[e]||0;if(t>i)return 1;if(t<i)return-1}return 0}function d(e,t=!0){const n=e.shadowRoot.getElementById("module-editor-top-marker");if(n){const e=t?"smooth":"instant";n.scrollIntoView({behavior:e,block:"start"})}}},87:(e,t,n)=>{n.d(t,{Qp:()=>l,VA:()=>s,sW:()=>a,w1:()=>r});var o=n(537),i=n(273);function a(e,t=e.config.entity,n=e.config.icon){const i=t?.split(".")[0],a=(0,o.D$)(e,"device_class",t),r=(0,o.D$)(e,"icon",t),s=n,l=(0,o.Gu)(e,t),c={alarm_control_panel:"mdi:shield",alert:"mdi:alert",automation:"mdi:playlist-play",binary_sensor:function(){const n="off"===l;switch((0,o.D$)(e,"device_class",t)){case"battery":return n?"mdi:battery":"mdi:battery-outline";case"battery_charging":return n?"mdi:battery":"mdi:battery-charging";case"cold":return n?"mdi:thermometer":"mdi:snowflake";case"connectivity":return n?"mdi:close-network-outline":"mdi:check-network-outline";case"door":return n?"mdi:door-closed":"mdi:door-open";case"garage_door":return n?"mdi:garage":"mdi:garage-open";case"heat":return n?"mdi:thermometer":"mdi:fire";case"light":return n?"mdi:brightness-5":"mdi:brightness-7";case"lock":return n?"mdi:lock":"mdi:lock-open";case"moisture":return n?"mdi:water-off":"mdi:water";case"motion":return n?"mdi:motion-sensor-off":"mdi:motion-sensor";case"occupancy":case"presence":return n?"mdi:home-outline":"mdi:home";case"opening":return n?"mdi:square":"mdi:square-outline";case"plug":case"power":return n?"mdi:power-plug-off":"mdi:power-plug";case"running":return n?"mdi:stop":"mdi:play";case"safety":case"tamper":return n?"mdi:check-circle":"mdi:alert-circle";case"smoke":return n?"mdi:check-circle":"mdi:smoke";case"sound":return n?"mdi:music-note-off":"mdi:music-note";case"update":return n?"mdi:package":"mdi:package-up";case"vibration":return n?"mdi:crop-portrait":"mdi:vibrate";case"window":return n?"mdi:window-closed":"mdi:window-open";default:return n?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}}(),calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",cover:function(){const n="closed"!==l;switch((0,o.D$)(e,"device_class",t)){case"awning":return n?"mdi:awning-outline":"mdi:awning";case"blind":return n?"mdi:blinds-open":"mdi:blinds";case"curtain":return n?"mdi:curtains":"mdi:curtains-closed";case"damper":case"shutter":default:return n?"mdi:window-shutter-open":"mdi:window-shutter";case"door":return n?"mdi:door-open":"mdi:door-closed";case"garage":return n?"mdi:garage-open":"mdi:garage";case"gate":return n?"mdi:gate-open":"mdi:gate";case"shade":return n?"mdi:roller-shade":"mdi:roller-shade-closed";case"window":return n?"mdi:window-open":"mdi:window-closed"}}(),device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",lock:"mdi:lock",mailbox:"mdi:mailbox",media_player:"mdi:speaker",mower:"mdi:robot-mower",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:palette",script:"mdi:file-document",sensor:function(){switch((0,o.D$)(e,"device_class",t)){case"battery":return 100==l?"mdi:battery":l>=90?"mdi:battery-90":l>=80?"mdi:battery-80":l>=70?"mdi:battery-70":l>=60?"mdi:battery-60":l>=50?"mdi:battery-50":l>=40?"mdi:battery-40":l>=30?"mdi:battery-30":l>=20?"mdi:battery-20":l>=10?"mdi:battery-10":"mdi:battery-alert";case"humidity":return"mdi:water-percent";case"illuminance":return"mdi:brightness-5";case"temperature":return"mdi:thermometer";case"pressure":return"mdi:gauge";case"power":return"mdi:flash";case"signal_strength":return"mdi:wifi";case"energy":return"mdi:lightning-bolt";default:return"mdi:eye"}}(),simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weather:function(n=(0,o.Gu)(e,t)){switch(n){case"cloudy":default:return"mdi:weather-cloudy";case"partlycloudy":return"mdi:weather-partly-cloudy";case"rainy":return"mdi:weather-rainy";case"snowy":return"mdi:weather-snowy";case"sunny":return"mdi:weather-sunny";case"clear-night":return"mdi:weather-night";case"fog":return"mdi:weather-fog";case"hail":return"mdi:weather-hail";case"lightning":return"mdi:weather-lightning";case"lightning-rainy":return"mdi:weather-lightning-rainy";case"pouring":return"mdi:weather-pouring";case"windy":return"mdi:weather-windy";case"windy-variant":return"mdi:weather-windy-variant";case"exceptional":return"mdi:alert-circle-outline"}}(),weblink:"mdi:open-in-new"};return s||r||(c[i]?c[i]:c[a]?c[a]:"")}function r(e){switch(e){case"cloudy":default:return"mdi:weather-cloudy";case"partlycloudy":return"mdi:weather-partly-cloudy";case"rainy":return"mdi:weather-rainy";case"snowy":return"mdi:weather-snowy";case"sunny":return"mdi:weather-sunny";case"clear-night":return"mdi:weather-night";case"fog":return"mdi:weather-fog";case"hail":return"mdi:weather-hail";case"lightning":return"mdi:weather-lightning";case"lightning-rainy":return"mdi:weather-lightning-rainy";case"pouring":return"mdi:weather-pouring";case"windy":return"mdi:weather-windy";case"windy-variant":return"mdi:weather-windy-variant";case"exceptional":return"mdi:alert-circle-outline"}}function s(e,t=e.config.entity,n=1){const{card_type:a,use_accent_color:r}=e.config,s=(0,o.D$)(e,"rgb_color",t),l=(0,o.GM)("var(--bubble-button-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))))")?n-.2:n,c=t===e.config.entity&&(0,o.D$)(e,"unit_of_measurement",t)?.includes("°"),d=t===e.config.entity&&e._hass.states[t]?.state?.match(/\d+/);if(!t||c||d)return"var(--bubble-icon-color)";if((0,o.md)(e,"light")&&!r?"button"===a?e.card.classList.add("is-light"):"pop-up"===a&&e.elements.headerContainer.classList.add("is-light"):"button"===a?e.card.classList.remove("is-light"):"pop-up"===a&&e.elements.headerContainer.classList.remove("is-light"),!t.startsWith("light.")||r)return"var(--bubble-accent-color, var(--bubble-default-color))";const u=(0,o.f9)([225,225,210],l);if(!s)return`var(--bubble-light-color, var(--bubble-light-white-color, rgba(${u.join(", ")})))`;const p=(0,o.f9)(s,l);return(0,i.qd)(s)?`var(--bubble-light-color, var(--bubble-light-white-color, rgba(${u.join(", ")})))`:`var(--bubble-light-color, rgba(${p.join(", ")}))`}function l(e,t=e.config.entity){if(e.config.force_icon)return"";const n=(0,o.D$)(e,"entity_picture_local",t)||(0,o.D$)(e,"entity_picture",t);return n?e._hass.hassUrl(n):""}},784:(e,t,n)=>{n.d(t,{Ki:()=>g,SF:()=>w,nO:()=>h,sq:()=>u,wv:()=>p});var o=n(537),i=n(87),a=n(198),r=n(76),s=n(382);let l=null,c=!1,d=null,u=new Map;async function p(e){return c&&l?l:d||(d=(async()=>{const t=await y(["/local/bubble/bubble-modules.yaml"]),n=e?._hass?await async function(e){const t=e.states["sensor.bubble_card_modules"];if(!t)return{};if(!t.attributes?.modules)return{};const n={};let o=0;try{o=Object.keys(t.attributes.modules).length,Object.values(t.attributes.modules).forEach((e=>{try{if(!e.yaml&&(e.code||e.description))return void(n[e.id]=e);if(!e.yaml)return}catch(t){console.error(`❌ ${e.id}模块的YAML解析错误`,t),"string"==typeof e.yaml?console.error("存在问题的YAML内容：",e.yaml.substring(0,100)+"..."):console.error("存在问题的YAML内容类型：",typeof e.yaml)}}))}catch(e){console.error("从文本实体处理中模块时出错：",e)}return n}(e._hass):{};return u.clear(),t&&Object.keys(t).forEach((e=>{"modules"!==e&&"friendly_name"!==e&&"last_updated"!==e&&u.set(e,"yaml")})),n&&Object.keys(n).forEach((e=>{"modules"!==e&&"friendly_name"!==e&&"last_updated"!==e&&u.set(e,"entity")})),l={...t,...n},g.clear(),Object.entries(l).forEach((([e,t])=>{"modules"!==e&&"friendly_name"!==e&&"last_updated"!==e&&g.set(e,t)})),c=!0,l})(),d)}function h(e){e.config?.card_type&&!e.stylesYAML&&(e.stylesYAML=c&&l?Promise.resolve(l):p(e))}document.addEventListener("yaml-modules-updated",(()=>{c=!1,l=null,d=null,window.dispatchEvent(new CustomEvent("bubble-card-modules-changed"))})),window.addEventListener("bubble-card-module-updated",(e=>{e.detail&&e.detail.moduleId&&e.detail.moduleData&&(g.set(e.detail.moduleId,e.detail.moduleData),u.has(e.detail.moduleId)||u.set(e.detail.moduleId,"editor"),window.dispatchEvent(new CustomEvent("bubble-card-modules-changed")))}));const b=new s.ZU("!include",{kind:"scalar",resolve:function(e){return"string"==typeof e},construct:function(e){const t=new XMLHttpRequest;if(t.open("GET",`/local/bubble/${e}`,!1),t.send(null),200!==t.status)return console.error(`引用文件失败/local/bubble/${e}: HTTP状态${t.status}`),null;try{return s.Hh(t.responseText,{schema:m})}catch(t){return console.error(`解析引用的YAML文件时出错(/local/bubble/${e}):`,t),null}}}),m=s.my.extend([b]);let g=new Map,f=new Map;const v=new Map,y=async e=>{for(const t of e){const e=t+`?v=${Date.now()}`;try{const n=await fetch(e,{cache:"no-store"});if(!n.ok){window.bubbleYamlWarning=!0;continue}const o=await n.text();let i;return i=_(o),!g.size&&i&&Object.entries(i).forEach((([e,t])=>{"modules"!==e&&"friendly_name"!==e&&"last_updated"!==e&&g.set(e,t)})),f.set(t,i),i}catch(t){console.warn(`从${e}获取bubble-modules.yaml时出错：`,t),window.bubbleYamlWarning=!0}}return null},_=e=>{if(!e||"string"!=typeof e)return null;try{return s.Hh(e,{schema:m})}catch(e){return console.error("YAML解析错误：",e),null}},w=async(e,t=e.card)=>{const n="STYLE"===t.tagName,o=n?null:t,i=e.config.styles;if(void 0===e.cardLoaded&&!n&&(e.lastEvaluatedStyles="",e.initialLoad=!0,!e._moduleChangeListenerAdded)){const t=()=>{e.lastEvaluatedStyles="",e.stylesYAML=null,g.forEach(((t,n)=>{e._processedSchemas?.[n]&&delete e._processedSchemas[n]})),w(e,e.card)};window.addEventListener("bubble-card-modules-changed",t),window.addEventListener("bubble-card-module-updated",t),document.addEventListener("yaml-modules-updated",t),e._moduleChangeListenerAdded=!0,e._moduleChangeHandler=t}e.initialLoad&&o?.style&&(o.style.display="none");const a=function(e,t){if("STYLE"===t.tagName)return t;if(!e.styleElement||e.styleElement.parentElement!==t){const n=document.createElement("style");n.id="bubble-styles",t.appendChild(n),e.styleElement=n}return e.styleElement}(e,t);try{let t={};g.size>0?g.forEach(((e,n)=>{t[n]=e})):t=await e.stylesYAML||{};let r=[];const s=new Set,l=[],c=new Set;Array.isArray(e.config.modules)?e.config.modules.forEach((e=>{"string"==typeof e&&e.startsWith("!")?c.add(e.substring(1)):"string"==typeof e&&l.push(e)})):e.config.modules&&"string"==typeof e.config.modules&&(e.config.modules.startsWith("!")?c.add(e.config.modules.substring(1)):l.push(e.config.modules)),g.has("default")&&!c.has("default")&&s.add("default");const d=e=>{if(!e||!e.states||!e.states["sensor.bubble_card_modules"])return;const t=e.states["sensor.bubble_card_modules"].attributes.modules;if(t)for(const e in t)!0===t[e].is_global&&g.has(e)&&!c.has(e)&&s.add(e)};e._hass&&d(e._hass),l.forEach((e=>{g.has(e)&&!c.has(e)&&s.add(e)})),r=Array.from(s);let u="";r.length>0&&(u=r.map((n=>{try{let o=t[n]??"";if("object"==typeof o&&""===o.code||""===o)return"{}";const i="object"==typeof o&&o.code?o.code:o;return x(e,i,{type:"module",id:n})}catch(e){return console.error(`Bubble Card 中文 - 执行前置处理模块 ${n} 时出错：`,e),"{}"}})).join("\n"));let p="";try{p=x(e,i,{type:"custom_styles"})}catch(e){console.error("Bubble Card 中文 - 在执行前置处理自定义样式时出错：",e)}const h=`${u}\n${p}`.trim();let b=!0;n?h===a.textContent&&(b=!1):h===e.lastEvaluatedStyles?b=!1:e.lastEvaluatedStyles=h,b&&(a.textContent=h),e.initialLoad&&o?.style&&(o.style.display="",n||(e.initialLoad=!1,e.cardLoaded=!0))}catch(t){console.error("应用样式时出错：",t),e.initialLoad&&o?.style&&(o.style.display="")}};function x(e,t="",n={type:"unknown"}){if(!t)return"";if(e.editor&&e.templateEvaluationBlocked)return"";const s=["innerText","textContent","innerHTML"];["state","name"].forEach((n=>{s.map((e=>`card.querySelector('.bubble-${n}').${e} =`)).some((e=>t.includes(e)))&&!e.elements[n].templateDetected&&(e.elements[n].templateDetected=!0)}));try{let s=v.get(t);if(!s&&(s=Function("hass","entity","state","icon","subButtonState","subButtonIcon","getWeatherIcon","card","name","checkConditionsMet",`return \`${t}\`;`),v.set(t,s),v.size>500)){const e=v.keys().next().value;v.delete(e)}const c="pop-up"===e.config.card_type?e.popUp:e.card,d=(l=s.call(e,e._hass,e.config.entity,(0,o.Gu)(e),e.elements.icon,(0,a.AQ)(e),e.subButtonIcon,i.w1,c,c.name,r.XH),l.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*([{};,])\s*/g,"$1").replace(/([a-zA-Z0-9_-]+)\s*:\s*;/g,"").replace(/undefined(?=(?:(?:[^"]*"){2})*[^"]*$)/g,"").replace(/[^{};]+\s*{\s*}/g,"").replace(/,(?=\s*[}\n])/g,"").split("\n").filter((e=>e.includes("{")||e.includes("}")||e.includes(":")||e.trim().match(/['"]{2}/g)||e.includes("${")||e.match(/^@supports|^@media|^@keyframes|^@layer/))).join("\n").match(/(@[^{]*?\{(?:[^{}]*?\{[^{}]*?\})*?[^{}]*?\}|[^{}]*?\{[^{}]*?\})/g)?.join("\n")||"");if(e.editor){if(e.templateEvaluationBlocked||e.lastEmittedEditorError){const t={cardType:e.config?.card_type,entityId:e.config?.entity,sourceType:n.type,moduleId:n.id};requestAnimationFrame((()=>k("",t)))}e.templateEvaluationBlocked=!1,e.lastEmittedEditorError=null,e.templateErrorClearTimeout&&(clearTimeout(e.templateErrorClearTimeout),e.templateErrorClearTimeout=null)}return d}catch(t){let o="Unknown source";"module"===n.type&&n.id?o=`模块 ('${n.id}')`:"custom_styles"===n.type?o="卡片配置（样式部分）":"unknown"===n.type&&(o="直接调用或来源未指定");const i=e.config?.card_type||"N/A",a=e.config?.entity||"N/A",r=`Bubble Card 中文 - 模板错误:\n  卡片类型: ${i}\n  实体: ${a}\n  来源: ${o}\n  错误: ${t.message}`;if(e.editor){const o=t.message;e.lastEmittedEditorError=o;const r={cardType:i,entityId:a,sourceType:n.type,moduleId:n.id};requestAnimationFrame((()=>k(o,r))),e.templateEvaluationBlocked=!0,e.templateErrorClearTimeout&&clearTimeout(e.templateErrorClearTimeout),e.templateErrorClearTimeout=setTimeout((()=>{e.templateEvaluationBlocked=!1}),2e3)}return console.error(r),""}var l}function k(e,t){window.dispatchEvent(new CustomEvent("bubble-card-error",{detail:{message:e,context:t}}))}},273:(e,t,n)=>{n.d(t,{$i:()=>s,Bz:()=>r,qd:()=>i});var o=n(537);function i(e,t=40){if(Array.isArray(e)&&3===e.length){for(let t=0;t<3;t++)if(e[t]<0||e[t]>255)return;return e.every((e=>Math.abs(e-255)<=t))}}let a;function r(e,t,n=1){if(!e||"string"!=typeof e)return`rgba(0, 0, 0, ${t})`;if(e.startsWith("#"))if(4===e.length){let o=Math.min(255,parseInt(e.charAt(1).repeat(2),16)*n),i=Math.min(255,parseInt(e.charAt(2).repeat(2),16)*n),r=Math.min(255,parseInt(e.charAt(3).repeat(2),16)*n);a="rgba("+o+", "+i+", "+r+", "+t+")"}else{let o=Math.min(255,parseInt(e.slice(1,3),16)*n),i=Math.min(255,parseInt(e.slice(3,5),16)*n),r=Math.min(255,parseInt(e.slice(5,7),16)*n);a="rgba("+o+", "+i+", "+r+", "+t+")"}else if(e.startsWith("rgb")){let o=e.match(/\d+/g);o&&o.length>=3&&(a="rgba("+Math.min(255,o[0]*n)+", "+Math.min(255,o[1]*n)+", "+Math.min(255,o[2]*n)+", "+t+")")}else if(e.startsWith("var(--")){let o=e.slice(4,-1),i=window.getComputedStyle(document.documentElement).getPropertyValue(o);i&&(i.startsWith("#")||i.startsWith("rgb"))&&(a=r(i,t,n))}return a||(a=`rgba(0, 0, 0, ${t})`),a}function s(e=!0){const t=(0,o.qL)("var(--primary-background-color, #ffffff)");let n=(0,o.E2)(t)||(0,o.rY)(t)||[255,255,255];const i=[0,145,255].map(((e,t)=>Math.round(.7*e+.3*n[t]))),a=`rgb(${i[0]}, ${i[1]}, ${i[2]})`;return e&&document.documentElement.style.setProperty("--bubble-default-color",a),a}},491:(e,t,n)=>{n.d(t,{VR:()=>u,Xs:()=>g,dN:()=>p,pd:()=>m});var o=n(537);let i;window.isScrolling=!1;let a=!1;function r(){i&&(i.style.transform="translate(-50%, -50%) scale(0)",setTimeout((()=>{i&&(i.style.display="none")}),180))}function s(){window.isScrolling=!0,setTimeout((()=>{window.isScrolling=!1}),300)}window.__bubbleTapActionsInitialized||(document.addEventListener("scroll",s,{passive:!0}),document.body.addEventListener("pointerdown",d,{passive:!0}),document.body.addEventListener("touchstart",d,{passive:!0}),window.__bubbleTapActionsInitialized=!0);const l=new WeakMap,c=new Set;function d(e){if(window.isScrolling)return;if(e.touches&&e.touches.length>1||"touch"===e.pointerType&&!1===e.isPrimary)return;const t=e.composedPath().find((e=>e.classList?.contains("bubble-action")));if(e.composedPath().find((e=>e.classList?.contains("close-pop-up")||e.classList?.contains("bubble-close-button"))))return;if(!t)return;let n=l.get(t);if(n)n.resetState();else{const e={tap_action:JSON.parse(t.dataset.tapAction),double_tap_action:JSON.parse(t.dataset.doubleTapAction),hold_action:JSON.parse(t.dataset.holdAction),entity:t.dataset.entity};n=new h(t,e,b),l.set(t,n)}try{"pointerdown"===e.type&&t.haRipple&&"function"==typeof t.haRipple.startPress&&t.haRipple.startPress(e)}catch(e){}if(n.handleStart(e),!n.isInteractionInProgress())return;c.add(n);const o=()=>{t.removeEventListener("pointerup",i),t.removeEventListener("pointercancel",i),t.removeEventListener("touchend",i),t.removeEventListener("touchcancel",i),document.removeEventListener("pointerup",i),document.removeEventListener("touchend",i),document.removeEventListener("scroll",a);try{t.haRipple&&"function"==typeof t.haRipple.endPress&&t.haRipple.endPress()}catch(e){}c.delete(n)},i=e=>{n.handleEnd(e),o()},a=()=>{n.handleScroll(),o()};t.addEventListener("pointerup",i,{once:!0}),t.addEventListener("pointercancel",i,{once:!0}),t.addEventListener("touchend",i,{once:!0}),t.addEventListener("touchcancel",i,{once:!0}),document.addEventListener("pointerup",i,{once:!0}),document.addEventListener("touchend",i,{once:!0}),document.addEventListener("scroll",a,{once:!0})}function u(e,t,n){const o=new Event("hass-action",{bubbles:!0,composed:!0}),i={...t};i.entity&&!i.entity_id&&(i.entity_id=i.entity),"tap"===n||"double_tap"===n||"hold"===n?o.detail={config:i,action:n}:(e.modifiedConfig={...i,tap_action:{...i[n]}},delete e.modifiedConfig[n],o.detail={config:e.modifiedConfig,action:"tap"}),e.dispatchEvent(o)}function p(e,t,n,i={}){e.classList.add("bubble-action");const a=t?.tap_action||i?.tap_action||{action:"none"},r=t?.double_tap_action||i?.double_tap_action||{action:"none"},s=t?.hold_action||i?.hold_action||{action:"none"};e.dataset.entity=t?.entity||n,e.dataset.tapAction=JSON.stringify(a),e.dataset.doubleTapAction=JSON.stringify(r),e.dataset.holdAction=JSON.stringify(s);const l="none"!==a.action||"none"!==r.action||"none"!==s.action;return l&&(e.classList.add("bubble-action-enabled"),e.haRipple=(0,o.n)("ha-ripple"),e.appendChild(e.haRipple)),{tap_action:a,double_tap_action:r,hold_action:s,has_action:l}}class h{constructor(e,t,n){this.element=e,this.config=t,this.sendActionEvent=n,this.tapTimeout=null,this.holdTimeout=null,this.startX=0,this.startY=0,this.holdFired=!1,this.pointerMoveListener=this.detectScrollLikeMove.bind(this),this.touchMoveListener=this.detectScrollLikeMove.bind(this),this.isDisconnected=!1,this.hasMoved=!1,this.interactionStarted=!1,this.justEndedTouchEventTime=0,this.currentInteractionType=null,this.interactionStartTime=0,this.preventDefaultCalled=!1}isInteractionInProgress(){return this.interactionStarted}resetState(){clearTimeout(this.tapTimeout),clearTimeout(this.holdTimeout),document.removeEventListener("pointermove",this.pointerMoveListener),document.removeEventListener("touchmove",this.touchMoveListener),this.tapTimeout=null,this.holdTimeout=null,this.holdFired=!1,this.hasMoved=!1,this.interactionStarted=!1,this.isDisconnected=!1,this.justEndedTouchEventTime=0,this.currentInteractionType=null,this.interactionStartTime=0,this.preventDefaultCalled=!1,this.startX=0,this.startY=0}cleanup(){this.isDisconnected=!0,clearTimeout(this.tapTimeout),clearTimeout(this.holdTimeout),document.removeEventListener("pointermove",this.pointerMoveListener),document.removeEventListener("touchmove",this.touchMoveListener),this.tapTimeout=null,this.holdTimeout=null,this.interactionStarted=!1}handleStart(e){const t=Date.now();"pointerdown"===e.type&&t-this.justEndedTouchEventTime<50||window.isScrolling||this.isDisconnected||(this.interactionStarted?"touchstart"===e.type&&"pointerdown"===this.currentInteractionType&&this.interactionStartTime:(this.interactionStarted=!0,this.currentInteractionType=e.type,this.interactionStartTime=t,e.touches&&e.touches.length>1?this.interactionStarted=!1:(this.holdFired=!1,this.hasMoved=!1,e.touches&&e.touches[0]?(this.startX=e.touches[0].clientX,this.startY=e.touches[0].clientY):(this.startX=e.clientX,this.startY=e.clientY),document.addEventListener("pointermove",this.pointerMoveListener,{passive:!0}),document.addEventListener("touchmove",this.touchMoveListener,{passive:!0}),this.holdTimeout=setTimeout((()=>{if("none"!==(this.config.hold_action||{action:"none"}).action&&!window.isScrolling&&!this.hasMoved){this.holdFired=!0;const e="touchstart"===this.currentInteractionType;!function(e,t,n){const o=function(e){if(!i){const e=document.createElement("div");i=e,document.body.appendChild(e)}const t=e?100:50;return Object.assign(i.style,{position:"fixed",width:`${t}px`,height:`${t}px`,transform:"translate(-50%, -50%) scale(0)",pointerEvents:"none",zIndex:"999",background:"var(--primary-color)",display:"none",opacity:"0.4",borderRadius:"50%",transition:"transform 180ms ease-in-out"}),a||(["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll","pointercancel"].forEach((e=>{document.addEventListener(e,(()=>{r()}),{passive:!0})})),a=!0),i}(n),s=n?100:50;o.style.width=`${s}px`,o.style.height=`${s}px`,o.style.left=`${Math.round(e)}px`,o.style.top=`${Math.round(t)}px`,o.style.display="block",o.offsetWidth,o.style.transform="translate(-50%, -50%) scale(1)"}(this.startX,this.startY,e)}}),500))))}detectScrollLikeMove(e){let t,n;e.touches&&e.touches[0]?(t=e.touches[0].clientX,n=e.touches[0].clientY):(t=e.clientX,n=e.clientY);const o=Math.abs(t-this.startX),i=Math.abs(n-this.startY);(o>5||i>5)&&(this.hasMoved=!0,s(),clearTimeout(this.holdTimeout),this.holdTimeout=null,document.removeEventListener("pointermove",this.pointerMoveListener),document.removeEventListener("touchmove",this.touchMoveListener))}handleEnd(e){if("touchend"!==e.type&&"touchcancel"!==e.type||(this.justEndedTouchEventTime=Date.now()),!this.interactionStarted)return;if(window.isScrolling||this.isDisconnected||this.hasMoved)return this.interactionStarted=!1,void r();clearTimeout(this.holdTimeout),this.holdTimeout=null,document.removeEventListener("pointermove",this.pointerMoveListener),document.removeEventListener("touchmove",this.touchMoveListener);const t=this.holdFired,n=Date.now(),o=this.config.double_tap_action||{action:"none"},i=this.config.tap_action||{action:"none"};let a=!1;if(t?this.sendActionEvent(this.element,this.config,"hold"):this.lastTap&&n-this.lastTap<200&&"none"!==o.action?(clearTimeout(this.tapTimeout),this.sendActionEvent(this.element,this.config,"double_tap"),a=!0):"none"!==i.action&&("none"!==o.action?(this.tapTimeout=setTimeout((()=>{this.isDisconnected||this.holdFired||this.hasMoved||this.sendActionEvent(this.element,this.config,"tap")}),200),a=!0):(this.sendActionEvent(this.element,this.config,"tap"),a=!0)),a||t){e.cancelable&&e.preventDefault();const n=e=>{const n=e.composedPath().find((e=>e.classList&&e.classList.contains("bubble-pop-up")));let o=!0;n&&"true"===n.dataset.closeOnClick&&(o=!1),o&&e.stopPropagation(),t&&e.preventDefault()};document.body.addEventListener("click",n,{capture:!0,once:!0}),setTimeout((()=>{document.body.removeEventListener("click",n,{capture:!0})}),350)}this.lastTap=n,this.interactionStarted=!1,r()}handleScroll(){this.hasMoved=!0,clearTimeout(this.holdTimeout),this.holdTimeout=null,document.removeEventListener("pointermove",this.pointerMoveListener),document.removeEventListener("touchmove",this.touchMoveListener),this.interactionStarted=!1}}function b(e,t,n){const o=t.tap_action||{action:"more-info"},i=t.double_tap_action||{action:"none"},a=t.hold_action||{action:"none"},r=t.entity||this.config?.entity,s=e=>e.service&&"entity"===e.target?.entity_id&&r?{...e,target:{...e.target,entity_id:r}}:e,l=s(o),c=s(i),d=s(a);let p;switch(n){case"tap":default:p=l;break;case"double_tap":p=c;break;case"hold":p=d}u(e,{entity:r,tap_action:l,double_tap_action:c,hold_action:d},n)}function m(e,t){e.addEventListener("pointerup",(e=>{e.cancelable&&e.preventDefault(),(0,o.jp)("selection")}))}function g(){for(const e of c)e.cleanup();c.clear()}},537:(e,t,n)=>{n.d(t,{$C:()=>m,D$:()=>h,E2:()=>s,GM:()=>c,Gu:()=>p,Iz:()=>L,JK:()=>$,Nl:()=>f,f9:()=>d,jp:()=>i,mG:()=>u,md:()=>b,n:()=>g,nF:()=>C,qL:()=>r,qo:()=>E,r6:()=>v,rC:()=>o,rY:()=>l}),n(273);const o=(e,t,n,o)=>{o=o||{},n=null==n?{}:n;const i=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return i.detail=n,e.dispatchEvent(i),i},i=e=>{o(window,"haptic",e)},a=new Map;function r(e){let t=e;const n=getComputedStyle(document.body);for(;t&&t.startsWith("var(");){const e=t.match(/var\((--[^,]+),?\s*(.*)?\)/);if(!e)break;const[,o,i]=e;t=n.getPropertyValue(o).trim()||i&&i.trim()||""}return t}function s(e){const t=e.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null}function l(e){const t=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);return t?[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10)]:null}function c(e,t=.5){const n=r(e);if(!n)return!1;if(a.has(n))return a.get(n);let o=s(n)||l(n);if(!o)return a.set(n,!1),!1;const i=function(e,t,n){return(.2126*e+.7152*t+.0722*n)/255}(...o),c=i>t;return a.set(n,c),c}function d(e,t){return e.map((e=>Math.min(255,Math.round(e*t))))}function u(e){const t=e.config.name,n=h(e,"friendly_name");return e.name||t||n||""}function p(e,t=e.config.entity){return e._hass.states[t]?.state??""}function h(e,t,n=e.config.entity){if(!t)return"";try{const o=e?._hass?.states?.[n]?.attributes;if(!o)return"";if(t.includes(" ")){const e=o[t];return 0===e?"0":e??""}const i=function(e,t){if(!e||!t||"string"!=typeof t)return;const n=/[^.\[\]]+|\[(?:'([^']+)'|"([^"]+)"|(\d+))\]/g;let o,i=e;for(;(o=n.exec(t))&&null!=i;){const[,e,t,n]=o,a=void 0!==n?Number(n):void 0!==e?e:void 0!==t?t:o[0],r=void 0!==e||void 0!==t||void 0!==n?a:o[0];i=i?.[r]}return i}(o,t);return 0===i?"0":i??""}catch(e){return console.warn(`Error accessing attribute '${t}' for entity '${n}':`,e),""}}function b(e,t,n){return void 0===n&&(n=e?.config?.entity),n&&"string"==typeof n&&n.startsWith(t+".")||!1}function m(e,t=e.config.entity){const n=p(e,t).toLowerCase(),o=h(e,"unit_of_measurement",t)?.includes("°"),i=Number(n);return!!(["on","open","opening","closing","cleaning","true","home","playing","unlocked","occupied","available","running","active","connected","online","mowing","edgecut","starting","heat","cool","dry","heat_cool","fan_only","auto","alarm"].includes(n)||i||o)}function g(e,t=""){const n=document.createElement(e);return""!==t&&t.split(" ").forEach((e=>{n.classList.add(e)})),n}function f(e,t,n){const{scrolling_effect:o=!0}=e.config;if(o){if(t.previousText!==n&&(t.previousText=n,t.innerHTML=n,t.style="",t.removeAttribute("data-animated"),requestAnimationFrame((()=>{setTimeout((()=>{i(),setTimeout(i,300)}),50)})),!t.eventAdded)){const e=function(e){let t;return function(...n){clearTimeout(t),t=setTimeout((()=>e.apply(this,n)),500)}}((()=>{if(t.isConnected)t.innerHTML=t.previousText,i();else{if(t._bubbleResizeListener&&(window.removeEventListener("resize",t._bubbleResizeListener),t._bubbleResizeListener=null),window.bubbleScrollObserver&&t._bubbleObserved){try{window.bubbleScrollObserver.unobserve(t)}catch(e){}t._bubbleObserved=!1}t.eventAdded=!1}}));window.addEventListener("resize",e),t._bubbleResizeListener=e,t.eventAdded=!0}}else!function(e,t){e.innerHTML=t,e.previousText=t,Object.assign(e.style,{whiteSpace:"normal",display:"-webkit-box",WebkitLineClamp:"2",WebkitBoxOrient:"vertical",textOverflow:"ellipsis"})}(t,n);function i(){if(t.isConnected&&t.scrollWidth>t.clientWidth){const e='<span class="bubble-scroll-separator"> | </span>',o=`<span>${n+e+n+e}</span>`;t.innerHTML=`<div class="scrolling-container">${o}</div>`,t.setAttribute("data-animated","true");const i=t.querySelector(".scrolling-container span");requestAnimationFrame((()=>{if(i&&i.scrollWidth>0){const e=16,t=i.scrollWidth/2,n=Math.max(1,t/e);i.style.animationDuration=`${n.toFixed(2)}s`}})),"IntersectionObserver"in window&&(window.bubbleScrollObserver||(window.bubbleScrollObserver=new IntersectionObserver((e=>{e.forEach((e=>{const t=e.target.querySelector(".scrolling-container span");t&&(t.style.animationPlayState=e.isIntersecting?"running":"paused")}))}),{threshold:.1})),window.bubbleScrollObserver.observe(t),t._bubbleObserved=!0)}}}function v(e,t){if(!e)return"";const n=new Date(e),o=new Date;let i,a,r=Math.floor((o-n)/1e3);return isNaN(r)?"":(r<60?(i="second",a=r+1):r<3600?(i="minute",a=Math.round(r/60)):r<86400?(i="hour",a=Math.round(r/3600)):(i="day",a=Math.round(r/86400)),new Intl.RelativeTimeFormat(t,{numeric:"auto"}).format(-a,i))}let y=null,_=null,w=null,x=null,k=!1;function $(e,t=null,n=null){const o=t||e.content;if(!o)return;let i;if(n)i=e.config.card_layout??n;else{k||(y=document.querySelector("body > home-assistant"),_=y?.shadowRoot?.querySelector("home-assistant-main"),w=_?.shadowRoot?.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace"),x=w?.shadowRoot?.querySelector("hui-root"),y&&_&&w&&x?k=!0:(y=null,_=null,w=null,x=null,k=!1)),x&&!x.isConnected&&(k=!1,y=null,_=null,w=null,x=null);let t="normal";if(x?.shadowRoot){const e=x.shadowRoot.querySelector("#view > hui-view > hui-masonry-view");window.isSectionView=!e,t=window.isSectionView?"large":"normal"}i=e.config.card_layout??t}if(e.previousLayout===i)return;e.previousLayout=i;const a="large"===i||"large-2-rows"===i||"large-sub-buttons-grid"===i,r="large-2-rows"===i,s="large-sub-buttons-grid"===i;o.classList.toggle("large",a),o.classList.toggle("rows-2",r),o.classList.toggle("sub-buttons-grid",s),o===e.content&&e.elements?.mainContainer&&(e.config.rows||e.config.grid_options?.rows)?"auto"===e.config.rows||"auto"===e.config.grid_options?.rows||e.elements.mainContainer.style.setProperty("--row-size",e.config.rows||e.config.grid_options?.rows):"separator"===e.config.card_type&&e.elements.mainContainer.style.setProperty("--row-size",.8)}function C(e,t=300){let n,o,i=new Date(0);return(...a)=>{o=a;const r=Date.now()-i;r>=t?(i=Date.now(),e(...o)):n||(n=setTimeout((()=>{n=void 0,i=Date.now(),e(...o)}),t-r))}}let S=0;const A="bubble-html-scroll-locked";function E(e){if(function(){const e="bubble-card-no-scroll-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`\n        html.${A} {\n            overflow: hidden !important;\n        }\n    `,document.head.appendChild(t)}(),e){if(document.documentElement.classList.contains(A))return;S=void 0!==window.scrollY?window.scrollY:(document.documentElement||document.body.parentNode||document.body).scrollTop,document.documentElement.classList.add(A)}else{if(!document.documentElement.classList.contains(A))return;document.documentElement.classList.remove(A),window.scrollTo({top:S,behavior:"instant"})}}function L(e){try{e.querySelectorAll("*").forEach((e=>{if(e._bubbleResizeListener&&(window.removeEventListener("resize",e._bubbleResizeListener),e._bubbleResizeListener=null,e.eventAdded=!1),window.bubbleScrollObserver)try{window.bubbleScrollObserver.unobserve(e)}catch(e){}}))}catch(e){}}},76:(e,t,n)=>{function o(e,t){try{if(e.states[t])return e.states[t]?.state}catch{}}function i(e,t){const n=e.entity_id||e.entity,i=n&&t.states[n]?t.states[n]:null,r=i?e.attribute&&i.attributes?i.attributes[e.attribute]:i.state:"unavailable";let s=e.state??e.state_not;if(Array.isArray(s)){const e=s.map((e=>o(t,e))).filter((e=>void 0!==e));s=[...s,...e]}else if("string"==typeof s){const e=o(t,s);s=[s],e&&s.push(e)}return null!=e.state?a(s).includes(r):null!=e.state_not&&!a(s).includes(r)}function a(e){return void 0===e||Array.isArray(e)?e:[e]}function r(e,t){return e.every((e=>{if(e&&!1===e.enabled)return!0;if("condition"in e)switch(e.condition){case"screen":return!!(n=e).media_query&&matchMedia(n.media_query).matches;case"user":return function(e,t){return!(!e.users||!t.user?.id)&&e.users.includes(t.user.id)}(e,t);case"numeric_state":return function(e,t){const n=e.entity_id||e.entity,i=(n?t.states[n]:void 0)?.state;let a=e.above,r=e.below;"string"==typeof a&&(a=o(t,a)??a),"string"==typeof r&&(r=o(t,r)??r);const s=Number(i),l=Number(a),c=Number(r);return!isNaN(s)&&(null==e.above||isNaN(l)||l<s)&&(null==e.below||isNaN(c)||c>s)}(e,t);case"and":return function(e,t){return!e.conditions||r(e.conditions,t)}(e,t);case"or":return function(e,t){return!e.conditions||e.conditions.some((e=>r([e],t)))}(e,t);case"not":return function(e,t){return!e.conditions||!e.conditions.some((e=>r([e],t)))}(e,t);default:return i(e,t)}var n;return i(e,t)}))}function s(e){return null!=(e.entity_id||e.entity)&&(null!=e.state||null!=e.state_not)}function l(e){return e.every((e=>{if(e&&!1===e.enabled)return!0;if("condition"in e)switch(e.condition){case"screen":return null!=e.media_query;case"user":return null!=e.users;case"numeric_state":return function(e){return null!=(e.entity_id||e.entity)&&(null!=e.above||null!=e.below)}(e);case"and":case"or":case"not":return function(e){return null!=e.conditions}(e);default:return s(e)}return s(e)}))}n.d(t,{XH:()=>r,db:()=>l,eC:()=>a})},382:(e,t,n)=>{function o(e){return null==e}n.d(t,{Ay:()=>gt,Hh:()=>lt,ZU:()=>nt,my:()=>st});var i={isNothing:o,isObject:function(e){return"object"==typeof e&&null!==e},toArray:function(e){return Array.isArray(e)?e:o(e)?[]:[e]},repeat:function(e,t){var n,o="";for(n=0;n<t;n+=1)o+=e;return o},isNegativeZero:function(e){return 0===e&&Number.NEGATIVE_INFINITY===1/e},extend:function(e,t){var n,o,i,a;if(t)for(n=0,o=(a=Object.keys(t)).length;n<o;n+=1)e[i=a[n]]=t[i];return e}};function a(e,t){var n="",o=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(n+='in "'+e.mark.name+'" '),n+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!t&&e.mark.snippet&&(n+="\n\n"+e.mark.snippet),o+" "+n):o}function r(e,t){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=t,this.message=a(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack||""}r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.prototype.toString=function(e){return this.name+": "+a(this,e)};var s=r;function l(e,t,n,o,i){var a="",r="",s=Math.floor(i/2)-1;return o-t>s&&(t=o-s+(a=" ... ").length),n-o>s&&(n=o+s-(r=" ...").length),{str:a+e.slice(t,n).replace(/\t/g,"→")+r,pos:o-t+a.length}}function c(e,t){return i.repeat(" ",t-e.length)+e}var d=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],u=["scalar","sequence","mapping"],p=function(e,t){if(t=t||{},Object.keys(t).forEach((function(t){if(-1===d.indexOf(t))throw new s('Unknown option "'+t+'" is met in definition of "'+e+'" YAML type.')})),this.options=t,this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(e){return e},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.representName=t.representName||null,this.defaultStyle=t.defaultStyle||null,this.multi=t.multi||!1,this.styleAliases=function(e){var t={};return null!==e&&Object.keys(e).forEach((function(n){e[n].forEach((function(e){t[String(e)]=n}))})),t}(t.styleAliases||null),-1===u.indexOf(this.kind))throw new s('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')};function h(e,t){var n=[];return e[t].forEach((function(e){var t=n.length;n.forEach((function(n,o){n.tag===e.tag&&n.kind===e.kind&&n.multi===e.multi&&(t=o)})),n[t]=e})),n}function b(e){return this.extend(e)}b.prototype.extend=function(e){var t=[],n=[];if(e instanceof p)n.push(e);else if(Array.isArray(e))n=n.concat(e);else{if(!e||!Array.isArray(e.implicit)&&!Array.isArray(e.explicit))throw new s("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");e.implicit&&(t=t.concat(e.implicit)),e.explicit&&(n=n.concat(e.explicit))}t.forEach((function(e){if(!(e instanceof p))throw new s("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(e.loadKind&&"scalar"!==e.loadKind)throw new s("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(e.multi)throw new s("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")})),n.forEach((function(e){if(!(e instanceof p))throw new s("Specified list of YAML types (or a single Type object) contains a non-Type object.")}));var o=Object.create(b.prototype);return o.implicit=(this.implicit||[]).concat(t),o.explicit=(this.explicit||[]).concat(n),o.compiledImplicit=h(o,"implicit"),o.compiledExplicit=h(o,"explicit"),o.compiledTypeMap=function(){var e,t,n={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function o(e){e.multi?(n.multi[e.kind].push(e),n.multi.fallback.push(e)):n[e.kind][e.tag]=n.fallback[e.tag]=e}for(e=0,t=arguments.length;e<t;e+=1)arguments[e].forEach(o);return n}(o.compiledImplicit,o.compiledExplicit),o};var m=b,g=new p("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return null!==e?e:""}}),f=new p("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return null!==e?e:[]}}),v=new p("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return null!==e?e:{}}}),y=new m({explicit:[g,f,v]}),_=new p("tag:yaml.org,2002:null",{kind:"scalar",resolve:function(e){if(null===e)return!0;var t=e.length;return 1===t&&"~"===e||4===t&&("null"===e||"Null"===e||"NULL"===e)},construct:function(){return null},predicate:function(e){return null===e},represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"}),w=new p("tag:yaml.org,2002:bool",{kind:"scalar",resolve:function(e){if(null===e)return!1;var t=e.length;return 4===t&&("true"===e||"True"===e||"TRUE"===e)||5===t&&("false"===e||"False"===e||"FALSE"===e)},construct:function(e){return"true"===e||"True"===e||"TRUE"===e},predicate:function(e){return"[object Boolean]"===Object.prototype.toString.call(e)},represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function x(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function k(e){return 48<=e&&e<=55}function $(e){return 48<=e&&e<=57}var C=new p("tag:yaml.org,2002:int",{kind:"scalar",resolve:function(e){if(null===e)return!1;var t,n=e.length,o=0,i=!1;if(!n)return!1;if("-"!==(t=e[o])&&"+"!==t||(t=e[++o]),"0"===t){if(o+1===n)return!0;if("b"===(t=e[++o])){for(o++;o<n;o++)if("_"!==(t=e[o])){if("0"!==t&&"1"!==t)return!1;i=!0}return i&&"_"!==t}if("x"===t){for(o++;o<n;o++)if("_"!==(t=e[o])){if(!x(e.charCodeAt(o)))return!1;i=!0}return i&&"_"!==t}if("o"===t){for(o++;o<n;o++)if("_"!==(t=e[o])){if(!k(e.charCodeAt(o)))return!1;i=!0}return i&&"_"!==t}}if("_"===t)return!1;for(;o<n;o++)if("_"!==(t=e[o])){if(!$(e.charCodeAt(o)))return!1;i=!0}return!(!i||"_"===t)},construct:function(e){var t,n=e,o=1;if(-1!==n.indexOf("_")&&(n=n.replace(/_/g,"")),"-"!==(t=n[0])&&"+"!==t||("-"===t&&(o=-1),t=(n=n.slice(1))[0]),"0"===n)return 0;if("0"===t){if("b"===n[1])return o*parseInt(n.slice(2),2);if("x"===n[1])return o*parseInt(n.slice(2),16);if("o"===n[1])return o*parseInt(n.slice(2),8)}return o*parseInt(n,10)},predicate:function(e){return"[object Number]"===Object.prototype.toString.call(e)&&e%1==0&&!i.isNegativeZero(e)},represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),S=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),A=/^[-+]?[0-9]+e/,E=new p("tag:yaml.org,2002:float",{kind:"scalar",resolve:function(e){return null!==e&&!(!S.test(e)||"_"===e[e.length-1])},construct:function(e){var t,n;return n="-"===(t=e.replace(/_/g,"").toLowerCase())[0]?-1:1,"+-".indexOf(t[0])>=0&&(t=t.slice(1)),".inf"===t?1===n?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:".nan"===t?NaN:n*parseFloat(t,10)},predicate:function(e){return"[object Number]"===Object.prototype.toString.call(e)&&(e%1!=0||i.isNegativeZero(e))},represent:function(e,t){var n;if(isNaN(e))switch(t){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(t){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(t){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(i.isNegativeZero(e))return"-0.0";return n=e.toString(10),A.test(n)?n.replace("e",".e"):n},defaultStyle:"lowercase"}),L=y.extend({implicit:[_,w,C,E]}),M=L,T=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),I=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"),P=new p("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:function(e){return null!==e&&(null!==T.exec(e)||null!==I.exec(e))},construct:function(e){var t,n,o,i,a,r,s,l,c=0,d=null;if(null===(t=T.exec(e))&&(t=I.exec(e)),null===t)throw new Error("Date resolve error");if(n=+t[1],o=+t[2]-1,i=+t[3],!t[4])return new Date(Date.UTC(n,o,i));if(a=+t[4],r=+t[5],s=+t[6],t[7]){for(c=t[7].slice(0,3);c.length<3;)c+="0";c=+c}return t[9]&&(d=6e4*(60*+t[10]+ +(t[11]||0)),"-"===t[9]&&(d=-d)),l=new Date(Date.UTC(n,o,i,a,r,s,c)),d&&l.setTime(l.getTime()-d),l},instanceOf:Date,represent:function(e){return e.toISOString()}}),U=new p("tag:yaml.org,2002:merge",{kind:"scalar",resolve:function(e){return"<<"===e||null===e}}),O="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r",z=new p("tag:yaml.org,2002:binary",{kind:"scalar",resolve:function(e){if(null===e)return!1;var t,n,o=0,i=e.length,a=O;for(n=0;n<i;n++)if(!((t=a.indexOf(e.charAt(n)))>64)){if(t<0)return!1;o+=6}return o%8==0},construct:function(e){var t,n,o=e.replace(/[\r\n=]/g,""),i=o.length,a=O,r=0,s=[];for(t=0;t<i;t++)t%4==0&&t&&(s.push(r>>16&255),s.push(r>>8&255),s.push(255&r)),r=r<<6|a.indexOf(o.charAt(t));return 0==(n=i%4*6)?(s.push(r>>16&255),s.push(r>>8&255),s.push(255&r)):18===n?(s.push(r>>10&255),s.push(r>>2&255)):12===n&&s.push(r>>4&255),new Uint8Array(s)},predicate:function(e){return"[object Uint8Array]"===Object.prototype.toString.call(e)},represent:function(e){var t,n,o="",i=0,a=e.length,r=O;for(t=0;t<a;t++)t%3==0&&t&&(o+=r[i>>18&63],o+=r[i>>12&63],o+=r[i>>6&63],o+=r[63&i]),i=(i<<8)+e[t];return 0==(n=a%3)?(o+=r[i>>18&63],o+=r[i>>12&63],o+=r[i>>6&63],o+=r[63&i]):2===n?(o+=r[i>>10&63],o+=r[i>>4&63],o+=r[i<<2&63],o+=r[64]):1===n&&(o+=r[i>>2&63],o+=r[i<<4&63],o+=r[64],o+=r[64]),o}}),V=Object.prototype.hasOwnProperty,j=Object.prototype.toString,B=new p("tag:yaml.org,2002:omap",{kind:"sequence",resolve:function(e){if(null===e)return!0;var t,n,o,i,a,r=[],s=e;for(t=0,n=s.length;t<n;t+=1){if(o=s[t],a=!1,"[object Object]"!==j.call(o))return!1;for(i in o)if(V.call(o,i)){if(a)return!1;a=!0}if(!a)return!1;if(-1!==r.indexOf(i))return!1;r.push(i)}return!0},construct:function(e){return null!==e?e:[]}}),D=Object.prototype.toString,F=new p("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:function(e){if(null===e)return!0;var t,n,o,i,a,r=e;for(a=new Array(r.length),t=0,n=r.length;t<n;t+=1){if(o=r[t],"[object Object]"!==D.call(o))return!1;if(1!==(i=Object.keys(o)).length)return!1;a[t]=[i[0],o[i[0]]]}return!0},construct:function(e){if(null===e)return[];var t,n,o,i,a,r=e;for(a=new Array(r.length),t=0,n=r.length;t<n;t+=1)o=r[t],i=Object.keys(o),a[t]=[i[0],o[i[0]]];return a}}),N=Object.prototype.hasOwnProperty,R=new p("tag:yaml.org,2002:set",{kind:"mapping",resolve:function(e){if(null===e)return!0;var t,n=e;for(t in n)if(N.call(n,t)&&null!==n[t])return!1;return!0},construct:function(e){return null!==e?e:{}}}),q=M.extend({implicit:[P,U],explicit:[z,B,F,R]}),H=Object.prototype.hasOwnProperty,Y=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,W=/[\x85\u2028\u2029]/,X=/[,\[\]\{\}]/,K=/^(?:!|!!|![a-z\-]+!)$/i,G=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function J(e){return Object.prototype.toString.call(e)}function Z(e){return 10===e||13===e}function Q(e){return 9===e||32===e}function ee(e){return 9===e||32===e||10===e||13===e}function te(e){return 44===e||91===e||93===e||123===e||125===e}function ne(e){var t;return 48<=e&&e<=57?e-48:97<=(t=32|e)&&t<=102?t-97+10:-1}function oe(e){return 120===e?2:117===e?4:85===e?8:0}function ie(e){return 48<=e&&e<=57?e-48:-1}function ae(e){return 48===e?"\0":97===e?"":98===e?"\b":116===e||9===e?"\t":110===e?"\n":118===e?"\v":102===e?"\f":114===e?"\r":101===e?"":32===e?" ":34===e?'"':47===e?"/":92===e?"\\":78===e?"":95===e?" ":76===e?"\u2028":80===e?"\u2029":""}function re(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023))}for(var se=new Array(256),le=new Array(256),ce=0;ce<256;ce++)se[ce]=ae(ce)?1:0,le[ce]=ae(ce);function de(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||q,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function ue(e,t){var n={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return n.snippet=function(e,t){if(t=Object.create(t||null),!e.buffer)return null;t.maxLength||(t.maxLength=79),"number"!=typeof t.indent&&(t.indent=1),"number"!=typeof t.linesBefore&&(t.linesBefore=3),"number"!=typeof t.linesAfter&&(t.linesAfter=2);for(var n,o=/\r?\n|\r|\0/g,a=[0],r=[],s=-1;n=o.exec(e.buffer);)r.push(n.index),a.push(n.index+n[0].length),e.position<=n.index&&s<0&&(s=a.length-2);s<0&&(s=a.length-1);var d,u,p="",h=Math.min(e.line+t.linesAfter,r.length).toString().length,b=t.maxLength-(t.indent+h+3);for(d=1;d<=t.linesBefore&&!(s-d<0);d++)u=l(e.buffer,a[s-d],r[s-d],e.position-(a[s]-a[s-d]),b),p=i.repeat(" ",t.indent)+c((e.line-d+1).toString(),h)+" | "+u.str+"\n"+p;for(u=l(e.buffer,a[s],r[s],e.position,b),p+=i.repeat(" ",t.indent)+c((e.line+1).toString(),h)+" | "+u.str+"\n",p+=i.repeat("-",t.indent+h+3+u.pos)+"^\n",d=1;d<=t.linesAfter&&!(s+d>=r.length);d++)u=l(e.buffer,a[s+d],r[s+d],e.position-(a[s]-a[s+d]),b),p+=i.repeat(" ",t.indent)+c((e.line+d+1).toString(),h)+" | "+u.str+"\n";return p.replace(/\n$/,"")}(n),new s(t,n)}function pe(e,t){throw ue(e,t)}function he(e,t){e.onWarning&&e.onWarning.call(null,ue(e,t))}var be={YAML:function(e,t,n){var o,i,a;null!==e.version&&pe(e,"duplication of %YAML directive"),1!==n.length&&pe(e,"YAML directive accepts exactly one argument"),null===(o=/^([0-9]+)\.([0-9]+)$/.exec(n[0]))&&pe(e,"ill-formed argument of the YAML directive"),i=parseInt(o[1],10),a=parseInt(o[2],10),1!==i&&pe(e,"unacceptable YAML version of the document"),e.version=n[0],e.checkLineBreaks=a<2,1!==a&&2!==a&&he(e,"unsupported YAML version of the document")},TAG:function(e,t,n){var o,i;2!==n.length&&pe(e,"TAG directive accepts exactly two arguments"),o=n[0],i=n[1],K.test(o)||pe(e,"ill-formed tag handle (first argument) of the TAG directive"),H.call(e.tagMap,o)&&pe(e,'there is a previously declared suffix for "'+o+'" tag handle'),G.test(i)||pe(e,"ill-formed tag prefix (second argument) of the TAG directive");try{i=decodeURIComponent(i)}catch(t){pe(e,"tag prefix is malformed: "+i)}e.tagMap[o]=i}};function me(e,t,n,o){var i,a,r,s;if(t<n){if(s=e.input.slice(t,n),o)for(i=0,a=s.length;i<a;i+=1)9===(r=s.charCodeAt(i))||32<=r&&r<=1114111||pe(e,"expected valid JSON character");else Y.test(s)&&pe(e,"the stream contains non-printable characters");e.result+=s}}function ge(e,t,n,o){var a,r,s,l;for(i.isObject(n)||pe(e,"cannot merge mappings; the provided source object is unacceptable"),s=0,l=(a=Object.keys(n)).length;s<l;s+=1)r=a[s],H.call(t,r)||(t[r]=n[r],o[r]=!0)}function fe(e,t,n,o,i,a,r,s,l){var c,d;if(Array.isArray(i))for(c=0,d=(i=Array.prototype.slice.call(i)).length;c<d;c+=1)Array.isArray(i[c])&&pe(e,"nested arrays are not supported inside keys"),"object"==typeof i&&"[object Object]"===J(i[c])&&(i[c]="[object Object]");if("object"==typeof i&&"[object Object]"===J(i)&&(i="[object Object]"),i=String(i),null===t&&(t={}),"tag:yaml.org,2002:merge"===o)if(Array.isArray(a))for(c=0,d=a.length;c<d;c+=1)ge(e,t,a[c],n);else ge(e,t,a,n);else e.json||H.call(n,i)||!H.call(t,i)||(e.line=r||e.line,e.lineStart=s||e.lineStart,e.position=l||e.position,pe(e,"duplicated mapping key")),"__proto__"===i?Object.defineProperty(t,i,{configurable:!0,enumerable:!0,writable:!0,value:a}):t[i]=a,delete n[i];return t}function ve(e){var t;10===(t=e.input.charCodeAt(e.position))?e.position++:13===t?(e.position++,10===e.input.charCodeAt(e.position)&&e.position++):pe(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function ye(e,t,n){for(var o=0,i=e.input.charCodeAt(e.position);0!==i;){for(;Q(i);)9===i&&-1===e.firstTabInLine&&(e.firstTabInLine=e.position),i=e.input.charCodeAt(++e.position);if(t&&35===i)do{i=e.input.charCodeAt(++e.position)}while(10!==i&&13!==i&&0!==i);if(!Z(i))break;for(ve(e),i=e.input.charCodeAt(e.position),o++,e.lineIndent=0;32===i;)e.lineIndent++,i=e.input.charCodeAt(++e.position)}return-1!==n&&0!==o&&e.lineIndent<n&&he(e,"deficient indentation"),o}function _e(e){var t,n=e.position;return!(45!==(t=e.input.charCodeAt(n))&&46!==t||t!==e.input.charCodeAt(n+1)||t!==e.input.charCodeAt(n+2)||(n+=3,0!==(t=e.input.charCodeAt(n))&&!ee(t)))}function we(e,t){1===t?e.result+=" ":t>1&&(e.result+=i.repeat("\n",t-1))}function xe(e,t){var n,o,i=e.tag,a=e.anchor,r=[],s=!1;if(-1!==e.firstTabInLine)return!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=r),o=e.input.charCodeAt(e.position);0!==o&&(-1!==e.firstTabInLine&&(e.position=e.firstTabInLine,pe(e,"tab characters must not be used in indentation")),45===o)&&ee(e.input.charCodeAt(e.position+1));)if(s=!0,e.position++,ye(e,!0,-1)&&e.lineIndent<=t)r.push(null),o=e.input.charCodeAt(e.position);else if(n=e.line,Ce(e,t,3,!1,!0),r.push(e.result),ye(e,!0,-1),o=e.input.charCodeAt(e.position),(e.line===n||e.lineIndent>t)&&0!==o)pe(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break;return!!s&&(e.tag=i,e.anchor=a,e.kind="sequence",e.result=r,!0)}function ke(e){var t,n,o,i,a=!1,r=!1;if(33!==(i=e.input.charCodeAt(e.position)))return!1;if(null!==e.tag&&pe(e,"duplication of a tag property"),60===(i=e.input.charCodeAt(++e.position))?(a=!0,i=e.input.charCodeAt(++e.position)):33===i?(r=!0,n="!!",i=e.input.charCodeAt(++e.position)):n="!",t=e.position,a){do{i=e.input.charCodeAt(++e.position)}while(0!==i&&62!==i);e.position<e.length?(o=e.input.slice(t,e.position),i=e.input.charCodeAt(++e.position)):pe(e,"unexpected end of the stream within a verbatim tag")}else{for(;0!==i&&!ee(i);)33===i&&(r?pe(e,"tag suffix cannot contain exclamation marks"):(n=e.input.slice(t-1,e.position+1),K.test(n)||pe(e,"named tag handle cannot contain such characters"),r=!0,t=e.position+1)),i=e.input.charCodeAt(++e.position);o=e.input.slice(t,e.position),X.test(o)&&pe(e,"tag suffix cannot contain flow indicator characters")}o&&!G.test(o)&&pe(e,"tag name cannot contain such characters: "+o);try{o=decodeURIComponent(o)}catch(t){pe(e,"tag name is malformed: "+o)}return a?e.tag=o:H.call(e.tagMap,n)?e.tag=e.tagMap[n]+o:"!"===n?e.tag="!"+o:"!!"===n?e.tag="tag:yaml.org,2002:"+o:pe(e,'undeclared tag handle "'+n+'"'),!0}function $e(e){var t,n;if(38!==(n=e.input.charCodeAt(e.position)))return!1;for(null!==e.anchor&&pe(e,"duplication of an anchor property"),n=e.input.charCodeAt(++e.position),t=e.position;0!==n&&!ee(n)&&!te(n);)n=e.input.charCodeAt(++e.position);return e.position===t&&pe(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function Ce(e,t,n,o,a){var r,s,l,c,d,u,p,h,b,m=1,g=!1,f=!1;if(null!==e.listener&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,r=s=l=4===n||3===n,o&&ye(e,!0,-1)&&(g=!0,e.lineIndent>t?m=1:e.lineIndent===t?m=0:e.lineIndent<t&&(m=-1)),1===m)for(;ke(e)||$e(e);)ye(e,!0,-1)?(g=!0,l=r,e.lineIndent>t?m=1:e.lineIndent===t?m=0:e.lineIndent<t&&(m=-1)):l=!1;if(l&&(l=g||a),1!==m&&4!==n||(h=1===n||2===n?t:t+1,b=e.position-e.lineStart,1===m?l&&(xe(e,b)||function(e,t,n){var o,i,a,r,s,l,c,d=e.tag,u=e.anchor,p={},h=Object.create(null),b=null,m=null,g=null,f=!1,v=!1;if(-1!==e.firstTabInLine)return!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=p),c=e.input.charCodeAt(e.position);0!==c;){if(f||-1===e.firstTabInLine||(e.position=e.firstTabInLine,pe(e,"tab characters must not be used in indentation")),o=e.input.charCodeAt(e.position+1),a=e.line,63!==c&&58!==c||!ee(o)){if(r=e.line,s=e.lineStart,l=e.position,!Ce(e,n,2,!1,!0))break;if(e.line===a){for(c=e.input.charCodeAt(e.position);Q(c);)c=e.input.charCodeAt(++e.position);if(58===c)ee(c=e.input.charCodeAt(++e.position))||pe(e,"a whitespace character is expected after the key-value separator within a block mapping"),f&&(fe(e,p,h,b,m,null,r,s,l),b=m=g=null),v=!0,f=!1,i=!1,b=e.tag,m=e.result;else{if(!v)return e.tag=d,e.anchor=u,!0;pe(e,"can not read an implicit mapping pair; a colon is missed")}}else{if(!v)return e.tag=d,e.anchor=u,!0;pe(e,"can not read a block mapping entry; a multiline key may not be an implicit key")}}else 63===c?(f&&(fe(e,p,h,b,m,null,r,s,l),b=m=g=null),v=!0,f=!0,i=!0):f?(f=!1,i=!0):pe(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,c=o;if((e.line===a||e.lineIndent>t)&&(f&&(r=e.line,s=e.lineStart,l=e.position),Ce(e,t,4,!0,i)&&(f?m=e.result:g=e.result),f||(fe(e,p,h,b,m,g,r,s,l),b=m=g=null),ye(e,!0,-1),c=e.input.charCodeAt(e.position)),(e.line===a||e.lineIndent>t)&&0!==c)pe(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return f&&fe(e,p,h,b,m,null,r,s,l),v&&(e.tag=d,e.anchor=u,e.kind="mapping",e.result=p),v}(e,b,h))||function(e,t){var n,o,i,a,r,s,l,c,d,u,p,h,b=!0,m=e.tag,g=e.anchor,f=Object.create(null);if(91===(h=e.input.charCodeAt(e.position)))r=93,c=!1,a=[];else{if(123!==h)return!1;r=125,c=!0,a={}}for(null!==e.anchor&&(e.anchorMap[e.anchor]=a),h=e.input.charCodeAt(++e.position);0!==h;){if(ye(e,!0,t),(h=e.input.charCodeAt(e.position))===r)return e.position++,e.tag=m,e.anchor=g,e.kind=c?"mapping":"sequence",e.result=a,!0;b?44===h&&pe(e,"expected the node content, but found ','"):pe(e,"missed comma between flow collection entries"),p=null,s=l=!1,63===h&&ee(e.input.charCodeAt(e.position+1))&&(s=l=!0,e.position++,ye(e,!0,t)),n=e.line,o=e.lineStart,i=e.position,Ce(e,t,1,!1,!0),u=e.tag,d=e.result,ye(e,!0,t),h=e.input.charCodeAt(e.position),!l&&e.line!==n||58!==h||(s=!0,h=e.input.charCodeAt(++e.position),ye(e,!0,t),Ce(e,t,1,!1,!0),p=e.result),c?fe(e,a,f,u,d,p,n,o,i):s?a.push(fe(e,null,f,u,d,p,n,o,i)):a.push(d),ye(e,!0,t),44===(h=e.input.charCodeAt(e.position))?(b=!0,h=e.input.charCodeAt(++e.position)):b=!1}pe(e,"unexpected end of the stream within a flow collection")}(e,h)?f=!0:(s&&function(e,t){var n,o,a,r,s=1,l=!1,c=!1,d=t,u=0,p=!1;if(124===(r=e.input.charCodeAt(e.position)))o=!1;else{if(62!==r)return!1;o=!0}for(e.kind="scalar",e.result="";0!==r;)if(43===(r=e.input.charCodeAt(++e.position))||45===r)1===s?s=43===r?3:2:pe(e,"repeat of a chomping mode identifier");else{if(!((a=ie(r))>=0))break;0===a?pe(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):c?pe(e,"repeat of an indentation width identifier"):(d=t+a-1,c=!0)}if(Q(r)){do{r=e.input.charCodeAt(++e.position)}while(Q(r));if(35===r)do{r=e.input.charCodeAt(++e.position)}while(!Z(r)&&0!==r)}for(;0!==r;){for(ve(e),e.lineIndent=0,r=e.input.charCodeAt(e.position);(!c||e.lineIndent<d)&&32===r;)e.lineIndent++,r=e.input.charCodeAt(++e.position);if(!c&&e.lineIndent>d&&(d=e.lineIndent),Z(r))u++;else{if(e.lineIndent<d){3===s?e.result+=i.repeat("\n",l?1+u:u):1===s&&l&&(e.result+="\n");break}for(o?Q(r)?(p=!0,e.result+=i.repeat("\n",l?1+u:u)):p?(p=!1,e.result+=i.repeat("\n",u+1)):0===u?l&&(e.result+=" "):e.result+=i.repeat("\n",u):e.result+=i.repeat("\n",l?1+u:u),l=!0,c=!0,u=0,n=e.position;!Z(r)&&0!==r;)r=e.input.charCodeAt(++e.position);me(e,n,e.position,!1)}}return!0}(e,h)||function(e,t){var n,o,i;if(39!==(n=e.input.charCodeAt(e.position)))return!1;for(e.kind="scalar",e.result="",e.position++,o=i=e.position;0!==(n=e.input.charCodeAt(e.position));)if(39===n){if(me(e,o,e.position,!0),39!==(n=e.input.charCodeAt(++e.position)))return!0;o=e.position,e.position++,i=e.position}else Z(n)?(me(e,o,i,!0),we(e,ye(e,!1,t)),o=i=e.position):e.position===e.lineStart&&_e(e)?pe(e,"unexpected end of the document within a single quoted scalar"):(e.position++,i=e.position);pe(e,"unexpected end of the stream within a single quoted scalar")}(e,h)||function(e,t){var n,o,i,a,r,s;if(34!==(s=e.input.charCodeAt(e.position)))return!1;for(e.kind="scalar",e.result="",e.position++,n=o=e.position;0!==(s=e.input.charCodeAt(e.position));){if(34===s)return me(e,n,e.position,!0),e.position++,!0;if(92===s){if(me(e,n,e.position,!0),Z(s=e.input.charCodeAt(++e.position)))ye(e,!1,t);else if(s<256&&se[s])e.result+=le[s],e.position++;else if((r=oe(s))>0){for(i=r,a=0;i>0;i--)(r=ne(s=e.input.charCodeAt(++e.position)))>=0?a=(a<<4)+r:pe(e,"expected hexadecimal character");e.result+=re(a),e.position++}else pe(e,"unknown escape sequence");n=o=e.position}else Z(s)?(me(e,n,o,!0),we(e,ye(e,!1,t)),n=o=e.position):e.position===e.lineStart&&_e(e)?pe(e,"unexpected end of the document within a double quoted scalar"):(e.position++,o=e.position)}pe(e,"unexpected end of the stream within a double quoted scalar")}(e,h)?f=!0:function(e){var t,n,o;if(42!==(o=e.input.charCodeAt(e.position)))return!1;for(o=e.input.charCodeAt(++e.position),t=e.position;0!==o&&!ee(o)&&!te(o);)o=e.input.charCodeAt(++e.position);return e.position===t&&pe(e,"name of an alias node must contain at least one character"),n=e.input.slice(t,e.position),H.call(e.anchorMap,n)||pe(e,'unidentified alias "'+n+'"'),e.result=e.anchorMap[n],ye(e,!0,-1),!0}(e)?(f=!0,null===e.tag&&null===e.anchor||pe(e,"alias node should not have any properties")):function(e,t,n){var o,i,a,r,s,l,c,d,u=e.kind,p=e.result;if(ee(d=e.input.charCodeAt(e.position))||te(d)||35===d||38===d||42===d||33===d||124===d||62===d||39===d||34===d||37===d||64===d||96===d)return!1;if((63===d||45===d)&&(ee(o=e.input.charCodeAt(e.position+1))||n&&te(o)))return!1;for(e.kind="scalar",e.result="",i=a=e.position,r=!1;0!==d;){if(58===d){if(ee(o=e.input.charCodeAt(e.position+1))||n&&te(o))break}else if(35===d){if(ee(e.input.charCodeAt(e.position-1)))break}else{if(e.position===e.lineStart&&_e(e)||n&&te(d))break;if(Z(d)){if(s=e.line,l=e.lineStart,c=e.lineIndent,ye(e,!1,-1),e.lineIndent>=t){r=!0,d=e.input.charCodeAt(e.position);continue}e.position=a,e.line=s,e.lineStart=l,e.lineIndent=c;break}}r&&(me(e,i,a,!1),we(e,e.line-s),i=a=e.position,r=!1),Q(d)||(a=e.position+1),d=e.input.charCodeAt(++e.position)}return me(e,i,a,!1),!!e.result||(e.kind=u,e.result=p,!1)}(e,h,1===n)&&(f=!0,null===e.tag&&(e.tag="?")),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):0===m&&(f=l&&xe(e,b))),null===e.tag)null!==e.anchor&&(e.anchorMap[e.anchor]=e.result);else if("?"===e.tag){for(null!==e.result&&"scalar"!==e.kind&&pe(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),c=0,d=e.implicitTypes.length;c<d;c+=1)if((p=e.implicitTypes[c]).resolve(e.result)){e.result=p.construct(e.result),e.tag=p.tag,null!==e.anchor&&(e.anchorMap[e.anchor]=e.result);break}}else if("!"!==e.tag){if(H.call(e.typeMap[e.kind||"fallback"],e.tag))p=e.typeMap[e.kind||"fallback"][e.tag];else for(p=null,c=0,d=(u=e.typeMap.multi[e.kind||"fallback"]).length;c<d;c+=1)if(e.tag.slice(0,u[c].tag.length)===u[c].tag){p=u[c];break}p||pe(e,"unknown tag !<"+e.tag+">"),null!==e.result&&p.kind!==e.kind&&pe(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+p.kind+'", not "'+e.kind+'"'),p.resolve(e.result,e.tag)?(e.result=p.construct(e.result,e.tag),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):pe(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return null!==e.listener&&e.listener("close",e),null!==e.tag||null!==e.anchor||f}function Se(e){var t,n,o,i,a=e.position,r=!1;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);0!==(i=e.input.charCodeAt(e.position))&&(ye(e,!0,-1),i=e.input.charCodeAt(e.position),!(e.lineIndent>0||37!==i));){for(r=!0,i=e.input.charCodeAt(++e.position),t=e.position;0!==i&&!ee(i);)i=e.input.charCodeAt(++e.position);for(o=[],(n=e.input.slice(t,e.position)).length<1&&pe(e,"directive name must not be less than one character in length");0!==i;){for(;Q(i);)i=e.input.charCodeAt(++e.position);if(35===i){do{i=e.input.charCodeAt(++e.position)}while(0!==i&&!Z(i));break}if(Z(i))break;for(t=e.position;0!==i&&!ee(i);)i=e.input.charCodeAt(++e.position);o.push(e.input.slice(t,e.position))}0!==i&&ve(e),H.call(be,n)?be[n](e,n,o):he(e,'unknown document directive "'+n+'"')}ye(e,!0,-1),0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)?(e.position+=3,ye(e,!0,-1)):r&&pe(e,"directives end mark is expected"),Ce(e,e.lineIndent-1,4,!1,!0),ye(e,!0,-1),e.checkLineBreaks&&W.test(e.input.slice(a,e.position))&&he(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&_e(e)?46===e.input.charCodeAt(e.position)&&(e.position+=3,ye(e,!0,-1)):e.position<e.length-1&&pe(e,"end of the stream or a document separator is expected")}function Ae(e,t){t=t||{},0!==(e=String(e)).length&&(10!==e.charCodeAt(e.length-1)&&13!==e.charCodeAt(e.length-1)&&(e+="\n"),65279===e.charCodeAt(0)&&(e=e.slice(1)));var n=new de(e,t),o=e.indexOf("\0");for(-1!==o&&(n.position=o,pe(n,"null byte is not allowed in input")),n.input+="\0";32===n.input.charCodeAt(n.position);)n.lineIndent+=1,n.position+=1;for(;n.position<n.length-1;)Se(n);return n.documents}var Ee=function(e,t,n){null!==t&&"object"==typeof t&&void 0===n&&(n=t,t=null);var o=Ae(e,n);if("function"!=typeof t)return o;for(var i=0,a=o.length;i<a;i+=1)t(o[i])},Le=function(e,t){var n=Ae(e,t);if(0!==n.length){if(1===n.length)return n[0];throw new s("expected a single document in the stream, but found more")}},Me=Object.prototype.toString,Te=Object.prototype.hasOwnProperty,Ie=65279,Pe={0:"\\0",7:"\\a",8:"\\b",9:"\\t",10:"\\n",11:"\\v",12:"\\f",13:"\\r",27:"\\e",34:'\\"',92:"\\\\",133:"\\N",160:"\\_",8232:"\\L",8233:"\\P"},Ue=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],Oe=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function ze(e){var t,n,o;if(t=e.toString(16).toUpperCase(),e<=255)n="x",o=2;else if(e<=65535)n="u",o=4;else{if(!(e<=4294967295))throw new s("code point within a string may not be greater than 0xFFFFFFFF");n="U",o=8}return"\\"+n+i.repeat("0",o-t.length)+t}function Ve(e){this.schema=e.schema||q,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=i.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=function(e,t){var n,o,i,a,r,s,l;if(null===t)return{};for(n={},i=0,a=(o=Object.keys(t)).length;i<a;i+=1)r=o[i],s=String(t[r]),"!!"===r.slice(0,2)&&(r="tag:yaml.org,2002:"+r.slice(2)),(l=e.compiledTypeMap.fallback[r])&&Te.call(l.styleAliases,s)&&(s=l.styleAliases[s]),n[r]=s;return n}(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType='"'===e.quotingType?2:1,this.forceQuotes=e.forceQuotes||!1,this.replacer="function"==typeof e.replacer?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function je(e,t){for(var n,o=i.repeat(" ",t),a=0,r=-1,s="",l=e.length;a<l;)-1===(r=e.indexOf("\n",a))?(n=e.slice(a),a=l):(n=e.slice(a,r+1),a=r+1),n.length&&"\n"!==n&&(s+=o),s+=n;return s}function Be(e,t){return"\n"+i.repeat(" ",e.indent*t)}function De(e){return 32===e||9===e}function Fe(e){return 32<=e&&e<=126||161<=e&&e<=55295&&8232!==e&&8233!==e||57344<=e&&e<=65533&&e!==Ie||65536<=e&&e<=1114111}function Ne(e){return Fe(e)&&e!==Ie&&13!==e&&10!==e}function Re(e,t,n){var o=Ne(e),i=o&&!De(e);return(n?o:o&&44!==e&&91!==e&&93!==e&&123!==e&&125!==e)&&35!==e&&!(58===t&&!i)||Ne(t)&&!De(t)&&35===e||58===t&&i}function qe(e,t){var n,o=e.charCodeAt(t);return o>=55296&&o<=56319&&t+1<e.length&&(n=e.charCodeAt(t+1))>=56320&&n<=57343?1024*(o-55296)+n-56320+65536:o}function He(e){return/^\n* /.test(e)}function Ye(e,t,n,o,i){e.dump=function(){if(0===t.length)return 2===e.quotingType?'""':"''";if(!e.noCompatMode&&(-1!==Ue.indexOf(t)||Oe.test(t)))return 2===e.quotingType?'"'+t+'"':"'"+t+"'";var a=e.indent*Math.max(1,n),r=-1===e.lineWidth?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-a),l=o||e.flowLevel>-1&&n>=e.flowLevel;switch(function(e,t,n,o,i,a,r,s){var l,c=0,d=null,u=!1,p=!1,h=-1!==o,b=-1,m=function(e){return Fe(e)&&e!==Ie&&!De(e)&&45!==e&&63!==e&&58!==e&&44!==e&&91!==e&&93!==e&&123!==e&&125!==e&&35!==e&&38!==e&&42!==e&&33!==e&&124!==e&&61!==e&&62!==e&&39!==e&&34!==e&&37!==e&&64!==e&&96!==e}(qe(e,0))&&function(e){return!De(e)&&58!==e}(qe(e,e.length-1));if(t||r)for(l=0;l<e.length;c>=65536?l+=2:l++){if(!Fe(c=qe(e,l)))return 5;m=m&&Re(c,d,s),d=c}else{for(l=0;l<e.length;c>=65536?l+=2:l++){if(10===(c=qe(e,l)))u=!0,h&&(p=p||l-b-1>o&&" "!==e[b+1],b=l);else if(!Fe(c))return 5;m=m&&Re(c,d,s),d=c}p=p||h&&l-b-1>o&&" "!==e[b+1]}return u||p?n>9&&He(e)?5:r?2===a?5:2:p?4:3:!m||r||i(e)?2===a?5:2:1}(t,l,e.indent,r,(function(t){return function(e,t){var n,o;for(n=0,o=e.implicitTypes.length;n<o;n+=1)if(e.implicitTypes[n].resolve(t))return!0;return!1}(e,t)}),e.quotingType,e.forceQuotes&&!o,i)){case 1:return t;case 2:return"'"+t.replace(/'/g,"''")+"'";case 3:return"|"+We(t,e.indent)+Xe(je(t,a));case 4:return">"+We(t,e.indent)+Xe(je(function(e,t){for(var n,o,i,a=/(\n+)([^\n]*)/g,r=(i=-1!==(i=e.indexOf("\n"))?i:e.length,a.lastIndex=i,Ke(e.slice(0,i),t)),s="\n"===e[0]||" "===e[0];o=a.exec(e);){var l=o[1],c=o[2];n=" "===c[0],r+=l+(s||n||""===c?"":"\n")+Ke(c,t),s=n}return r}(t,r),a));case 5:return'"'+function(e){for(var t,n="",o=0,i=0;i<e.length;o>=65536?i+=2:i++)o=qe(e,i),!(t=Pe[o])&&Fe(o)?(n+=e[i],o>=65536&&(n+=e[i+1])):n+=t||ze(o);return n}(t)+'"';default:throw new s("impossible error: invalid scalar style")}}()}function We(e,t){var n=He(e)?String(t):"",o="\n"===e[e.length-1];return n+(!o||"\n"!==e[e.length-2]&&"\n"!==e?o?"":"-":"+")+"\n"}function Xe(e){return"\n"===e[e.length-1]?e.slice(0,-1):e}function Ke(e,t){if(""===e||" "===e[0])return e;for(var n,o,i=/ [^ ]/g,a=0,r=0,s=0,l="";n=i.exec(e);)(s=n.index)-a>t&&(o=r>a?r:s,l+="\n"+e.slice(a,o),a=o+1),r=s;return l+="\n",e.length-a>t&&r>a?l+=e.slice(a,r)+"\n"+e.slice(r+1):l+=e.slice(a),l.slice(1)}function Ge(e,t,n,o){var i,a,r,s="",l=e.tag;for(i=0,a=n.length;i<a;i+=1)r=n[i],e.replacer&&(r=e.replacer.call(n,String(i),r)),(Ze(e,t+1,r,!0,!0,!1,!0)||void 0===r&&Ze(e,t+1,null,!0,!0,!1,!0))&&(o&&""===s||(s+=Be(e,t)),e.dump&&10===e.dump.charCodeAt(0)?s+="-":s+="- ",s+=e.dump);e.tag=l,e.dump=s||"[]"}function Je(e,t,n){var o,i,a,r,l,c;for(a=0,r=(i=n?e.explicitTypes:e.implicitTypes).length;a<r;a+=1)if(((l=i[a]).instanceOf||l.predicate)&&(!l.instanceOf||"object"==typeof t&&t instanceof l.instanceOf)&&(!l.predicate||l.predicate(t))){if(n?l.multi&&l.representName?e.tag=l.representName(t):e.tag=l.tag:e.tag="?",l.represent){if(c=e.styleMap[l.tag]||l.defaultStyle,"[object Function]"===Me.call(l.represent))o=l.represent(t,c);else{if(!Te.call(l.represent,c))throw new s("!<"+l.tag+'> tag resolver accepts not "'+c+'" style');o=l.represent[c](t,c)}e.dump=o}return!0}return!1}function Ze(e,t,n,o,i,a,r){e.tag=null,e.dump=n,Je(e,n,!1)||Je(e,n,!0);var l,c=Me.call(e.dump),d=o;o&&(o=e.flowLevel<0||e.flowLevel>t);var u,p,h="[object Object]"===c||"[object Array]"===c;if(h&&(p=-1!==(u=e.duplicates.indexOf(n))),(null!==e.tag&&"?"!==e.tag||p||2!==e.indent&&t>0)&&(i=!1),p&&e.usedDuplicates[u])e.dump="*ref_"+u;else{if(h&&p&&!e.usedDuplicates[u]&&(e.usedDuplicates[u]=!0),"[object Object]"===c)o&&0!==Object.keys(e.dump).length?(function(e,t,n,o){var i,a,r,l,c,d,u="",p=e.tag,h=Object.keys(n);if(!0===e.sortKeys)h.sort();else if("function"==typeof e.sortKeys)h.sort(e.sortKeys);else if(e.sortKeys)throw new s("sortKeys must be a boolean or a function");for(i=0,a=h.length;i<a;i+=1)d="",o&&""===u||(d+=Be(e,t)),l=n[r=h[i]],e.replacer&&(l=e.replacer.call(n,r,l)),Ze(e,t+1,r,!0,!0,!0)&&((c=null!==e.tag&&"?"!==e.tag||e.dump&&e.dump.length>1024)&&(e.dump&&10===e.dump.charCodeAt(0)?d+="?":d+="? "),d+=e.dump,c&&(d+=Be(e,t)),Ze(e,t+1,l,!0,c)&&(e.dump&&10===e.dump.charCodeAt(0)?d+=":":d+=": ",u+=d+=e.dump));e.tag=p,e.dump=u||"{}"}(e,t,e.dump,i),p&&(e.dump="&ref_"+u+e.dump)):(function(e,t,n){var o,i,a,r,s,l="",c=e.tag,d=Object.keys(n);for(o=0,i=d.length;o<i;o+=1)s="",""!==l&&(s+=", "),e.condenseFlow&&(s+='"'),r=n[a=d[o]],e.replacer&&(r=e.replacer.call(n,a,r)),Ze(e,t,a,!1,!1)&&(e.dump.length>1024&&(s+="? "),s+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),Ze(e,t,r,!1,!1)&&(l+=s+=e.dump));e.tag=c,e.dump="{"+l+"}"}(e,t,e.dump),p&&(e.dump="&ref_"+u+" "+e.dump));else if("[object Array]"===c)o&&0!==e.dump.length?(e.noArrayIndent&&!r&&t>0?Ge(e,t-1,e.dump,i):Ge(e,t,e.dump,i),p&&(e.dump="&ref_"+u+e.dump)):(function(e,t,n){var o,i,a,r="",s=e.tag;for(o=0,i=n.length;o<i;o+=1)a=n[o],e.replacer&&(a=e.replacer.call(n,String(o),a)),(Ze(e,t,a,!1,!1)||void 0===a&&Ze(e,t,null,!1,!1))&&(""!==r&&(r+=","+(e.condenseFlow?"":" ")),r+=e.dump);e.tag=s,e.dump="["+r+"]"}(e,t,e.dump),p&&(e.dump="&ref_"+u+" "+e.dump));else{if("[object String]"!==c){if("[object Undefined]"===c)return!1;if(e.skipInvalid)return!1;throw new s("unacceptable kind of an object to dump "+c)}"?"!==e.tag&&Ye(e,e.dump,t,a,d)}null!==e.tag&&"?"!==e.tag&&(l=encodeURI("!"===e.tag[0]?e.tag.slice(1):e.tag).replace(/!/g,"%21"),l="!"===e.tag[0]?"!"+l:"tag:yaml.org,2002:"===l.slice(0,18)?"!!"+l.slice(18):"!<"+l+">",e.dump=l+" "+e.dump)}return!0}function Qe(e,t){var n,o,i=[],a=[];for(et(e,i,a),n=0,o=a.length;n<o;n+=1)t.duplicates.push(i[a[n]]);t.usedDuplicates=new Array(o)}function et(e,t,n){var o,i,a;if(null!==e&&"object"==typeof e)if(-1!==(i=t.indexOf(e)))-1===n.indexOf(i)&&n.push(i);else if(t.push(e),Array.isArray(e))for(i=0,a=e.length;i<a;i+=1)et(e[i],t,n);else for(i=0,a=(o=Object.keys(e)).length;i<a;i+=1)et(e[o[i]],t,n)}function tt(e,t){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+t+" instead, which is now safe by default.")}}var nt=p,ot=m,it=y,at=L,rt=M,st=q,lt=Le,ct=Ee,dt=function(e,t){var n=new Ve(t=t||{});n.noRefs||Qe(e,n);var o=e;return n.replacer&&(o=n.replacer.call({"":o},"",o)),Ze(n,0,o,!0,!0)?n.dump+"\n":""},ut=s,pt={binary:z,float:E,map:v,null:_,pairs:F,set:R,timestamp:P,bool:w,int:C,merge:U,omap:B,seq:f,str:g},ht=tt("safeLoad","load"),bt=tt("safeLoadAll","loadAll"),mt=tt("safeDump","dump");const gt={Type:nt,Schema:ot,FAILSAFE_SCHEMA:it,JSON_SCHEMA:at,CORE_SCHEMA:rt,DEFAULT_SCHEMA:st,load:lt,loadAll:ct,dump:dt,YAMLException:ut,types:pt,safeLoad:ht,safeLoadAll:bt,safeDump:mt}}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let o="v3.0.4.002";var i=n(491),a=n(784),r=n(273),s=n(537);const l=globalThis,c=l.ShadowRoot&&(void 0===l.ShadyCSS||l.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,d=Symbol(),u=new WeakMap;class p{constructor(e,t,n){if(this._$cssResult$=!0,n!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(c&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=u.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&u.set(t,e))}return e}toString(){return this.cssText}}const h=e=>new p("string"==typeof e?e:e+"",void 0,d),b=(e,...t)=>{const n=1===e.length?e[0]:t.reduce(((t,n,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[o+1]),e[0]);return new p(n,e,d)},m=(e,t)=>{if(c)e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const n of t){const t=document.createElement("style"),o=l.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=n.cssText,e.appendChild(t)}},g=c?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return h(t)})(e):e,{is:f,defineProperty:v,getOwnPropertyDescriptor:y,getOwnPropertyNames:_,getOwnPropertySymbols:w,getPrototypeOf:x}=Object,k=globalThis,$=k.trustedTypes,C=$?$.emptyScript:"",S=k.reactiveElementPolyfillSupport,A=(e,t)=>e,E={toAttribute(e,t){switch(t){case Boolean:e=e?C:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},L=(e,t)=>!f(e,t),M={attribute:!0,type:String,converter:E,reflect:!1,hasChanged:L};Symbol.metadata??=Symbol("metadata"),k.litPropertyMetadata??=new WeakMap;class T extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=M){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),o=this.getPropertyDescriptor(e,n,t);void 0!==o&&v(this.prototype,e,o)}}static getPropertyDescriptor(e,t,n){const{get:o,set:i}=y(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return o?.call(this)},set(t){const a=o?.call(this);i.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??M}static _$Ei(){if(this.hasOwnProperty(A("elementProperties")))return;const e=x(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(A("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(A("properties"))){const e=this.properties,t=[..._(e),...w(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(g(e))}else void 0!==e&&t.push(g(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return m(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EC(e,t){const n=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,n);if(void 0!==o&&!0===n.reflect){const i=(void 0!==n.converter?.toAttribute?n.converter:E).toAttribute(t,n.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const n=this.constructor,o=n._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=n.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:E;this._$Em=o,this[o]=i.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,n){if(void 0!==e){if(n??=this.constructor.getPropertyOptions(e),!(n.hasChanged??L)(this[e],t))return;this.P(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,n){this._$AL.has(e)||this._$AL.set(e,t),!0===n.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e)!0!==n.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],n)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach((e=>this._$EC(e,this[e]))),this._$EU()}updated(e){}firstUpdated(e){}}T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[A("elementProperties")]=new Map,T[A("finalized")]=new Map,S?.({ReactiveElement:T}),(k.reactiveElementVersions??=[]).push("2.0.4");const I=globalThis,P=I.trustedTypes,U=P?P.createPolicy("lit-html",{createHTML:e=>e}):void 0,O="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,V="?"+z,j=`<${V}>`,B=document,D=()=>B.createComment(""),F=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,R="[ \t\n\f\r]",q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,Y=/>/g,W=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),X=/'/g,K=/"/g,G=/^(?:script|style|textarea|title)$/i,J=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),Z=J(1),Q=(J(2),J(3),Symbol.for("lit-noChange")),ee=Symbol.for("lit-nothing"),te=new WeakMap,ne=B.createTreeWalker(B,129);function oe(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==U?U.createHTML(t):t}const ie=(e,t)=>{const n=e.length-1,o=[];let i,a=2===t?"<svg>":3===t?"<math>":"",r=q;for(let t=0;t<n;t++){const n=e[t];let s,l,c=-1,d=0;for(;d<n.length&&(r.lastIndex=d,l=r.exec(n),null!==l);)d=r.lastIndex,r===q?"!--"===l[1]?r=H:void 0!==l[1]?r=Y:void 0!==l[2]?(G.test(l[2])&&(i=RegExp("</"+l[2],"g")),r=W):void 0!==l[3]&&(r=W):r===W?">"===l[0]?(r=i??q,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?W:'"'===l[3]?K:X):r===K||r===X?r=W:r===H||r===Y?r=q:(r=W,i=void 0);const u=r===W&&e[t+1].startsWith("/>")?" ":"";a+=r===q?n+j:c>=0?(o.push(s),n.slice(0,c)+O+n.slice(c)+z+u):n+z+(-2===c?t:u)}return[oe(e,a+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class ae{constructor({strings:e,_$litType$:t},n){let o;this.parts=[];let i=0,a=0;const r=e.length-1,s=this.parts,[l,c]=ie(e,t);if(this.el=ae.createElement(l,n),ne.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=ne.nextNode())&&s.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(O)){const t=c[a++],n=o.getAttribute(e).split(z),r=/([.?@])?(.*)/.exec(t);s.push({type:1,index:i,name:r[2],strings:n,ctor:"."===r[1]?de:"?"===r[1]?ue:"@"===r[1]?pe:ce}),o.removeAttribute(e)}else e.startsWith(z)&&(s.push({type:6,index:i}),o.removeAttribute(e));if(G.test(o.tagName)){const e=o.textContent.split(z),t=e.length-1;if(t>0){o.textContent=P?P.emptyScript:"";for(let n=0;n<t;n++)o.append(e[n],D()),ne.nextNode(),s.push({type:2,index:++i});o.append(e[t],D())}}}else if(8===o.nodeType)if(o.data===V)s.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(z,e+1));)s.push({type:7,index:i}),e+=z.length-1}i++}}static createElement(e,t){const n=B.createElement("template");return n.innerHTML=e,n}}function re(e,t,n=e,o){if(t===Q)return t;let i=void 0!==o?n._$Co?.[o]:n._$Cl;const a=F(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),void 0===a?i=void 0:(i=new a(e),i._$AT(e,n,o)),void 0!==o?(n._$Co??=[])[o]=i:n._$Cl=i),void 0!==i&&(t=re(e,i._$AS(e,t.values),i,o)),t}class se{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,o=(e?.creationScope??B).importNode(t,!0);ne.currentNode=o;let i=ne.nextNode(),a=0,r=0,s=n[0];for(;void 0!==s;){if(a===s.index){let t;2===s.type?t=new le(i,i.nextSibling,this,e):1===s.type?t=new s.ctor(i,s.name,s.strings,this,e):6===s.type&&(t=new he(i,this,e)),this._$AV.push(t),s=n[++r]}a!==s?.index&&(i=ne.nextNode(),a++)}return ne.currentNode=B,o}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class le{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,o){this.type=2,this._$AH=ee,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=re(this,e,t),F(e)?e===ee||null==e||""===e?(this._$AH!==ee&&this._$AR(),this._$AH=ee):e!==this._$AH&&e!==Q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ee&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,o="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=ae.createElement(oe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new se(o,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=te.get(e.strings);return void 0===t&&te.set(e.strings,t=new ae(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,o=0;for(const i of e)o===t.length?t.push(n=new le(this.O(D()),this.O(D()),this,this.options)):n=t[o],n._$AI(i),o++;o<t.length&&(this._$AR(n&&n._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ce{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,o,i){this.type=1,this._$AH=ee,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ee}_$AI(e,t=this,n,o){const i=this.strings;let a=!1;if(void 0===i)e=re(this,e,t,0),a=!F(e)||e!==this._$AH&&e!==Q,a&&(this._$AH=e);else{const o=e;let r,s;for(e=i[0],r=0;r<i.length-1;r++)s=re(this,o[n+r],t,r),s===Q&&(s=this._$AH[r]),a||=!F(s)||s!==this._$AH[r],s===ee?e=ee:e!==ee&&(e+=(s??"")+i[r+1]),this._$AH[r]=s}a&&!o&&this.j(e)}j(e){e===ee?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class de extends ce{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ee?void 0:e}}class ue extends ce{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ee)}}class pe extends ce{constructor(e,t,n,o,i){super(e,t,n,o,i),this.type=5}_$AI(e,t=this){if((e=re(this,e,t,0)??ee)===Q)return;const n=this._$AH,o=e===ee&&n!==ee||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==ee&&(n===ee||o);o&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class he{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){re(this,e)}}const be=I.litHtmlPolyfillSupport;be?.(ae,le),(I.litHtmlVersions??=[]).push("3.2.1");const me=(e,t,n)=>{const o=n?.renderBefore??t;let i=o._$litPart$;if(void 0===i){const e=n?.renderBefore??null;o._$litPart$=i=new le(t.insertBefore(D(),e),e,void 0,n??{})}return i._$AI(e),i};class ge extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}}ge._$litElement$=!0,ge.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ge});const fe=globalThis.litElementPolyfillSupport;function ve(e){const t=e._config.entity;if(!t)return!0;const n=t.split(".")[0];return"sensor"===n||!["light","media_player","cover","input_number","number","fan","climate"].includes(n)}function ye(e){let t={};"slider"!==e._config.button_type||e._disableEntityFilter||(t={filter:[{domain:["light","media_player","cover","input_number","number","climate","fan"]},{domain:"sensor",device_class:"battery"}]});const n="pop-up"===e._config.card_type;let o=e._config.button_action||"";e._config.button_type||(e._config.button_type=n?"name":"switch");let i=e._config.button_type;return Z`
        <div class="card-config">
            ${n?"":e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
            ${e.makeDropdown("按钮类型","button_type",[{label:"开关",value:"switch"},{label:"滑块",value:"slider"},{label:"状态",value:"state"},{label:"名称或文本",value:"name"}])}
            <ha-form
                .hass=${e.hass}
                .data=${e._config}
                .schema=${[{name:"entity",label:"slider"!==i?"实体（开关类）":"实体（支持的实体类型见下文）",selector:{entity:t}}]}   
                .computeLabel=${e._computeLabelCallback}
                .disabled="${"name"===e._config.button_type}"
                @value-changed=${e._valueChanged}
            ></ha-form>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:cog"></ha-icon>
                ${n?"卡片标头设置":"卡片设置"}
                </h4>
                <div class="content">     
                    <ha-textfield
                        label="名称（可选）"
                        .value="${e._config?.name||""}"
                        .configValue="${"name"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                    ${e.makeDropdown("图标（可选）","icon")}
                    ${e.makeShowState()}
                </div>
            </ha-expansion-panel>
            ${function(e){return void 0===e._disableEntityFilter&&(e._disableEntityFilter=!1),Z`
        <ha-expansion-panel outlined style="display: ${"slider"!==e._config.button_type?"none":""}">
            <h4 slot="header">
            <ha-icon icon="mdi:tune-variant"></ha-icon>
            滑块设置
            </h4>
            <div class="content">
                <div class="checkbox-wrapper">
                    <ha-formfield label="禁用实体过滤（用于自定义滑块）">
                        <ha-switch
                            .checked=${e._disableEntityFilter}
                            @change="${t=>{e._disableEntityFilter=t.target.checked,e.requestUpdate()}}"
                        ></ha-switch>
                    </ha-formfield>
                </div>
                <div class="bubble-info" style="display: ${e._disableEntityFilter?"":"none"}">
                    <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        自定义滑块
                    </h4>
                    <div class="content">
                        <p>要创建自定义滑块（只读），请在上方选择一个具有数值状态的实体，然后在下方设置最小值和最大值。</p>  
                        <p>例如，你可以利用此功能在特定范围内显示你的太阳能发电量。</p>
                    </div>
                </div>
                <ha-form
                    .hass=${e.hass}
                    .data=${e._config}
                    .schema=${[{type:"grid",flatten:!0,schema:[{name:"min_value",label:"最小值",selector:{number:{step:"any"}}},{name:"max_value",label:"最大值",selector:{number:{step:"any"}}},{name:"step",label:"步进值",selector:{number:{step:"any"}}}]}]}   
                    .computeLabel=${e._computeLabelCallback}
                    .disabled="${"name"===e._config.button_type}"
                    @value-changed=${e._valueChanged}
                ></ha-form>
                <hr>
                <ha-formfield>
                    <ha-switch
                        .checked=${e._config.tap_to_slide&&!e._config.relative_slide}
                        .configValue="${"tap_to_slide"}"
                        @change="${e._valueChanged}"
                        .disabled=${e._config.relative_slide||ve(e)}
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">点击滑动（旧版行为）</label>
                    </div>
                </ha-formfield>
                <ha-formfield>
                    <ha-switch
                        .checked=${!e._config.tap_to_slide&&e._config.relative_slide}
                        .configValue="${"relative_slide"}"
                        @change="${e._valueChanged}"
                        .disabled=${e._config.tap_to_slide||ve(e)}
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">相对滑动（与点击滑动不兼容）</label>
                    </div>
                </ha-formfield>
                <ha-formfield>
                    <ha-switch
                        .checked=${e._config.read_only_slider??ve(e)}
                        .configValue="${"read_only_slider"}"
                        .disabled=${ve(e)}
                        @change="${e._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">只读滑块</label> 
                    </div>
                </ha-formfield>
                <ha-formfield>
                    <ha-switch
                        .checked=${e._config.slider_live_update}
                        .configValue="${"slider_live_update"}"
                        .disabled=${ve(e)}
                        @change="${e._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">滑块实时更新</label> 
                    </div>
                </ha-formfield>
                <div class="bubble-info" style="display: ${e._config.slider_live_update?"":"none"}">
                    <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        滑块实时更新
                    </h4>
                    <div class="content">
                        <p>默认情况下，滑块只会在松开时更新实体状态。启用此选项后，滑动过程中也会实时更新实体状态。此功能并不适用于所有实体，如遇到问题请将其关闭。</p>
                    </div>
                </div>
                ${e._config.entity?.startsWith("light")?Z`
                    <ha-formfield>
                        <ha-switch
                            .checked=${e._config.use_accent_color??!1}
                            .configValue="${"use_accent_color"}"
                            @change="${e._valueChanged}"
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">使用强调色替代灯光颜色</label> 
                        </div>
                    </ha-formfield>
                    ${e._config.tap_to_slide?"":Z`
                        <ha-formfield>
                            <ha-switch
                                .checked=${e._config.allow_light_slider_to_0??!1}
                                .configValue="${"allow_light_slider_to_0"}"
                                @change=${e._valueChanged}
                            ></ha-switch>
                            <div class="mdc-form-field">
                                <label class="mdc-label">允许滑块关闭灯光（降为0%时关闭）</label> 
                            </div>
                        </ha-formfield>
                    `}
                    <ha-formfield>
                        <ha-switch
                            .checked=${e._config.light_transition}
                            .configValue="${"light_transition"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">启用平滑亮度过渡</label> 
                        </div>
                    </ha-formfield>
                    ${e._config.light_transition?Z`
                        <div class="bubble-info">
                            <h4 class="bubble-section-title">
                                <ha-icon icon="mdi:information-outline"></ha-icon>
                                灯光过渡
                            </h4>
                            <div class="content">
                                <p><b>重要提示：</b>此功能仅适用于支持<a target="_blank" rel="noopener noreferrer" href="https://www.home-assistant.io/integrations/light/#action-lightturn_on">light.turn_on</a>的灯光，并且必须支持transition属性。</p>
                                <p>如果灯光本身不支持过渡效果，启用此功能将不会产生任何作用。默认过渡时间为 500ms（除非你在下方修改）。</p>
                            </div>
                        </div>
                        
                        <ha-textfield
                            label="过渡时间（毫秒）"
                            type="number"
                            min="1"
                            max="2000"
                            .value="${e._config.light_transition_time}"
                            .configValue="${"light_transition_time"}"
                            @input="${e._valueChanged}"
                        ></ha-textfield>
                    `:""}
                `:""}
            </div>
        </ha-expansion-panel>
    `}(e)}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:gesture-tap"></ha-icon>
                图标点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为")}
                    ${e.makeActionPanel("双击行为")}
                    ${e.makeActionPanel("长按行为")}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined style="display: ${"slider"===e._config.button_type&&e._config.tap_to_slide?"none":""}">
                <h4 slot="header">
                <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
                卡片点击行为
                </h4>
                <div class="content">
                    <!-- 
                      Default button action mapping to match create.js defaults:
                      - name: tap="none", double="none", hold="none"
                      - state: tap="more-info", double="none", hold="more-info" 
                      - slider: tap="more-info"(sensor)/"toggle"(others), double="none", hold="none"
                      - switch: tap="toggle", double="none", hold="more-info"
                    -->
                    ${e.makeActionPanel("单击行为",o,"name"===e._config.button_type?"none":"state"===e._config.button_type||"slider"===e._config.button_type&&(0,s.md)(e,"sensor",e._config.entity)?"more-info":"toggle","button_action")}
                    ${e.makeActionPanel("双击行为",o,"none","button_action")}
                    ${e.makeActionPanel("长按行为",o,"name"===e._config.button_type||"slider"===e._config.button_type?"none":"more-info","button_action")}
                </div>
            </ha-expansion-panel>
            ${e.makeSubButtonPanel()}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:palette"></ha-icon>
                样式
                </h4>
                <div class="content">
                    ${e.makeLayoutOptions()}
                    ${n?"":e.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${n?"":e.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    按钮卡片${n?"（带标头）":""}
                </h4>
                <div class="content">
                    <p>这个卡片的功能非常多。可以用作开关、滑块、状态显示，或名称/文本按钮。选择你想了解的按钮类型即可查看更多信息。</p>
                    
                    ${"switch"!==e._config.button_type&&e._config.button_type?"":Z`
                        <p><strong>开关：</strong>这是默认的按钮类型。默认情况下，它会切换实体的开关状态，并且背景颜色会根据实体状态或灯光颜色变化。你可以在”卡片点击行为“部分修改它的动作。</p>
                    `}
                    
                    ${"slider"===e._config.button_type?Z`
                        <p><strong>滑块按钮：</strong>可以控制具有可调节范围的实体，适用于调节灯光亮度等，滑块的填充色也会根据灯光颜色变化。它还可以用于显示数值，例如电量百分比。</p>
                        <p>支持的实体：</p>
                        <ul class="icon-list">
                            <li><ha-icon icon="mdi:lightbulb-outline"></ha-icon>灯光（亮度）</li>
                            <li><ha-icon icon="mdi:speaker"></ha-icon>媒体播放器（音量）</li>
                            <li><ha-icon icon="mdi:window-shutter"></ha-icon>遮阳设备（开合程度）</li>
                            <li><ha-icon icon="mdi:fan"></ha-icon>风扇（风速百分比）</li>
                            <li><ha-icon icon="mdi:thermometer"></ha-icon>空调（温度）</li>
                            <li><ha-icon icon="mdi:numeric"></ha-icon>数值</li>
                            <li><ha-icon icon="mdi:battery-50"></ha-icon>电池电量（百分比，只读）</li>
                        </ul>
                        <p>你也可以通过禁用滑块设置中的实体过滤，来使用任何具有数值状态的实体，然后自行定义最小值和最大值。此模式为只读。</p>
                    `:""}
                    
                    ${"state"===e._config.button_type?Z`
                        <p><strong>状态按钮：</strong>适用于显示传感器或任意实体的信息。按下它时，会打开该实体的 “详细信息” 面板。这个按钮的背景色不会发生变化。</p>
                    `:""}
                    
                    ${"name"===e._config.button_type?Z`
                        <p><strong>名称或文本按钮：</strong>这是唯一一种不需要实体的按钮类型。可以用来显示一段简短文字、名称或标题。你也可以为它添加各种动作。这个按钮的背景色不会发生变化。</p>
                    `:""}
                </div>
            </div>
            ${n?"":e.makeVersion()}
        </div>
    `}function _e(e,t){delete e._config[t+"_name"],delete e._config[t+"_icon"],delete e._config[t+"_link"],delete e._config[t+"_entity"],delete e._config[t+"_pir_sensor"];for(let n=t;n<e.buttonIndex;n++)e._config[n+"_name"]=e._config[n+1+"_name"],e._config[n+"_icon"]=e._config[n+1+"_icon"],e._config[n+"_link"]=e._config[n+1+"_link"],e._config[n+"_entity"]=e._config[n+1+"_entity"],e._config[n+"_pir_sensor"]=e._config[n+1+"_pir_sensor"];delete e._config[e.buttonIndex+"_name"],delete e._config[e.buttonIndex+"_icon"],delete e._config[e.buttonIndex+"_link"],delete e._config[e.buttonIndex+"_entity"],delete e._config[e.buttonIndex+"_pir_sensor"],e.buttonIndex--,(0,s.rC)(e,"config-changed",{config:e._config})}function we(e){return Array.from(e).reduce(((e,t)=>t.charCodeAt(0)+((e<<5)-e)),0)}function xe(e){const t=(16777215&e).toString(16).toUpperCase();return"#"+"00000".substring(0,6-t.length)+t}fe?.({LitElement:ge}),(globalThis.litElementVersions??=[]).push("4.1.1");const ke=e=>e.title||e.label;function $e(e,t,n,o){if(void 0===e._lazyContentLoadedFlags&&(e._lazyContentLoadedFlags={}),n&&!e._lazyContentLoadedFlags[t]&&(e._lazyContentLoadedFlags[t]=!0),e._lazyContentLoadedFlags[t])return o()}customElements.define("ha-selector-calendar_entity-zh",class extends ge{getSchema(e){return[{type:"expandable",name:"",title:e?this.hass.states[e].attributes.friendly_name||e:"添加日历",schema:[{name:"entity",title:"实体",selector:{entity:{domain:["calendar"]}}},{name:"color",title:"颜色",selector:{ui_color:{}}}]}]}static properties={hass:{},value:{type:Array},label:{}};constructor(){super(),this.value=[]}render(){const e=e=>()=>{const t=[...this.value||[]];t.splice(e,1),this.valueChanged({detail:{value:t}})},t=this.value??[];return Z`
      <ha-expansion-panel outlined style="--expansion-panel-summary-padding: 0 8px;">
        <h4 slot="header" style="display: flex; align-items: center; margin: 10px 0;">
          <ha-icon icon="mdi:calendar" style="margin: 8px;"></ha-icon>
          &nbsp;日历列表
        </h4>
        <div class="content"> 
          ${t.map(((t,n)=>Z`
              <div style="display: flex; align-items: center; margin: 12px 4px 14px 4px">
                <ha-form
                  .data=${t}
                  .schema=${this.getSchema(t.entity)}
                  .hass=${this.hass}
                  .computeLabel=${ke}
                  @value-changed=${e=>{e.stopPropagation();const t=[...this.value||[]];t[n]=e.detail.value,this.valueChanged({detail:{value:t}})}}
                  style="flex-grow: 1;"
                ></ha-form>
                <ha-button @click=${e(n)}>
                  <ha-icon icon="mdi:calendar-remove"></ha-icon>&nbsp;
                  删除此日历
                </ha-button>
              </div>
            `))}
          <ha-button @click=${()=>{const e=[...this.value||[]];e.push({entity:"",color:""}),this.valueChanged({detail:{value:e}})}} style="margin: 12px 4px 14px 4px;">
            <ha-icon icon="mdi:calendar-plus"></ha-icon>&nbsp;
            添加日历
          </ha-button>
        </div>
      </ha-expansion-panel>
    `}valueChanged(e){const t=e.detail.value.map((e=>{const t=e.entity?xe(we(e.entity)):"";return{entity:e.entity,color:e.color||t}}));(0,s.rC)(this,"value-changed",{value:t},void 0)}});var Ce=n(395),Se=n(571),Ae=n(404),Ee=n(382);function Le(e){try{e._processedSchemas&&(e._processedSchemas={}),e._schemaCache?Object.keys(e._schemaCache).forEach((t=>{delete e._schemaCache[t]})):e._schemaCache={},e.lastEvaluatedStyles="",e.card&&"function"==typeof e.handleCustomStyles&&e.handleCustomStyles(e,e.card),(0,s.rC)(e,"editor-refresh",{}),e.requestUpdate(),setTimeout((()=>{e.card&&"function"==typeof e.handleCustomStyles&&e.handleCustomStyles(e,e.card),e.requestUpdate(),setTimeout((()=>{if(e._config){const t={...e._config};e.stylesYAML&&(e.stylesYAML=null,document.dispatchEvent(new CustomEvent("yaml-modules-updated"))),(0,s.rC)(e,"config-changed",{config:t}),e.card&&"function"==typeof e.handleCustomStyles&&e.handleCustomStyles(e,e.card)}e.requestUpdate()}),100)}),50)}catch(e){}}async function Me(e,t){try{let n="";if(t.yamlContent&&""!==t.yamlContent.trim()?n=t.yamlContent:t.description&&""!==t.description.trim()&&(n=t.description),!n)throw new Error("未找到此模块的YAML内容");const o=(0,Se.oV)(n)||t.id,i=(0,Se.tF)(n,o,{title:t.name,defaultCreator:t.creator});let r=n;try{const e=Ee.Ay.load(n);if(e&&"object"==typeof e){const i=Object.keys(e);if(1===i.length){const n=i[0],a=e[n];if(a&&"object"==typeof a)if(a[o]){t.moduleLink&&"object"==typeof a[o]&&(a[o].link=t.moduleLink);const e={};e[o]=a[o],r=Ee.Ay.dump(e,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0})}else if(n===o&&Object.keys(a).some((e=>"object"==typeof a[e]&&a[e].name&&a[e].code))){const e={};Object.entries(a).forEach((([t,n])=>{"object"==typeof n&&"unsupported"!==t&&"editor"!==t&&n.name||(e[t]=n)})),t.moduleLink&&(e.link=t.moduleLink),e.code&&"string"==typeof e.code&&(e.code=e.code.replace(/\n/g,"\n      "));const n={};n[o]=e,r=Ee.Ay.dump(n,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0,flowLevel:-1})}else if(n===o)t.moduleLink&&!e[o].link&&(e[o].link=t.moduleLink),r=Ee.Ay.dump(e,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0,flowLevel:-1});else{t.moduleLink&&(a.link=t.moduleLink);const e={};e[o]=a,r=Ee.Ay.dump(e,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0,flowLevel:-1})}}else{t.moduleLink&&(e.link=t.moduleLink);const n={};n[o]=e,r=Ee.Ay.dump(n,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0,flowLevel:-1})}r=r.replace(/code: \|/g,"code: |").replace(/description: \|/g,"description: |").replace(/(\|\n)(\s+)/g,((e,t,n)=>t+"      "));try{const e=Ee.Ay.load(r);e&&e[o]||console.warn("警告：YAML格式可能存在问题")}catch(e){console.warn("验证格式化后的YAML时出错：",e),r=n}}}catch(e){console.warn("处理YAML结构时出错：",e)}const l={id:o,yaml:r};a.Ki.set(o,i);try{a.sq.set(o,"entity")}catch(e){}document.dispatchEvent(new CustomEvent("yaml-modules-updated")),function(e,t){try{window.dispatchEvent(new CustomEvent("bubble-card-module-updated",{detail:{moduleId:e,moduleData:t}}))}catch(e){}}(o,i);try{const n="sensor.bubble_card_modules";if(!(e.hass&&e.hass.states&&e.hass.states[n]))return(0,Ae.q)(e,"未配置持久化存储 - 模块仅能在浏览器中临时保存","warning"),Le(e),{success:!0,storage:"local_only",reason:"missing_entity",message:"未配置持久化存储实体。请在“模块”标签页查看设置说明。"};let a={};try{const t=await e.hass.callApi("get",`states/${n}`);if(t&&t.attributes&&t.attributes.modules)a=t.attributes.modules;else if(t&&t.attributes&&t.attributes.module_data){const e=t.attributes.module_data;e&&e.id&&(a[e.id]=e)}}catch(e){console.warn("Unable to load existing modules:",e)}a[o]=l;try{const e=Ee.Ay.load(r);if(e&&e[o]){const n=e[o];a[o]={id:o,...n,name:i.name||n.name,version:i.version||n.version,description:i.description||n.description,creator:i.creator||n.creator||i.author,link:t.moduleLink||i.link||n.link},"default"===o&&(a[o].is_global=!0)}else a[o]={id:o,...i},"default"===o&&(a[o].is_global=!0)}catch(e){console.warn("Error parsing module YAML for storage:",e),a[o]={id:o,name:i.name,version:i.version,description:i.description,creator:i.creator},"default"===o&&(a[o].is_global=!0)}try{await e.hass.callApi("post","events/bubble_card_update_modules",{modules:a,last_updated:(new Date).toISOString()})}catch(t){console.warn("Unable to send event, trying to update state directly:",t),await e.hass.callApi("post",`states/${n}`,{state:"saved",attributes:{friendly_name:"Bubble Card Modules",modules:a,last_updated:(new Date).toISOString()}})}return(0,Ae.q)(e,"模块安装成功"),(0,s.rC)(e,"config-changed",{config:e._config}),Le(e),e.requestUpdate(),{success:!0}}catch(t){return console.error("REST API 不可用或发生错误：",t),(0,Ae.q)(e,"模块仅能在浏览器中临时保存","warning"),Le(e),{success:!0,storage:"local_only"}}}catch(t){throw console.error("安装错误：",t),(0,Ae.q)(e,"安装错误："+t.message,"error"),t}}async function Te(e,t,o){try{if(!t||""===t.trim())throw new Error("未提供YAML内容");if(o)try{const{extractYamlFromMarkdown:e}=await Promise.resolve().then(n.bind(n,571)),i=e("```yaml\n"+t+"\n```",o);i&&i!==t&&(t=i)}catch(e){console.warn("无法将链接直接添加到YAML：",e)}const i={yamlContent:t,description:t,moduleLink:o};return await Me(e,i)}catch(t){throw console.error("手动安装模块错误：",t),(0,Ae.q)(e,"安装错误："+t.message,"error"),t}}function Ie(e){const t=e.hass&&e.hass.states&&e.hass.states["sensor.bubble_card_modules"];if(void 0===e._storeShowOnlyCompatible&&(e._storeShowOnlyCompatible=!0),void 0===e._rankingInfoDismissed)try{e._rankingInfoDismissed="true"===localStorage.getItem("bubble-card-ranking-info-dismissed")}catch(t){e._rankingInfoDismissed=!1}if(e._dismissRankingInfo=()=>{e._rankingInfoDismissed=!0;try{localStorage.setItem("bubble-card-ranking-info-dismissed","true")}catch(e){console.warn("Failed to save ranking info dismiss state to localStorage",e)}e.requestUpdate()},!t)return Z`
      <div class="bubble-info warning">
        <h4 class="bubble-section-title">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          需要进行配置
        </h4>
        <div class="content">
          <p>你的Home Assistant中尚未配置用于存储的 <code>sensor.bubble_card_modules</code> 实体。</p>
          <hr />
          <p><b>To use the Module store, follow these steps:</b></p>

          <p>1. 在 <code>configuration.yaml</code> 文件中，添加以下内容：</p>
          <code-block><pre>
# Bubble Card 模块存储
template:
  - trigger:
      - trigger: event
        event_type: bubble_card_update_modules
    sensor:
      - name: "Bubble Card Modules"
        state: "saved"
        icon: "mdi:puzzle"
        attributes:
          modules: "{{ trigger.event.data.modules }}"
          last_updated: "{{ trigger.event.data.last_updated }}"
          </pre></code-block>
          <p>2. 保存并重启Home Assistant</p>
          <p>3. 即可使用模块商店！</p>
        </div>
      </div>
    `;if(!e._storeModules){const t=(0,Ae.getCachedModuleData)();if(t){e._storeModules=t.modules,e._isLoadingStore=!1;const n=Date.now(),o=n-(t.lastFetchedAt||(t.expiration?t.expiration-864e5:0))>216e5,i=t.expiration<n+36e5;(o||i)&&Be(e,!0)}else e._isLoadingStore=!0,Be(e)}if(e._storeAutoRefreshTimer||(e._storeAutoRefreshTimer=setInterval((()=>{Be(e,!0)}),216e5)),e._isLoadingStore){const t=e._loadingProgress||0,n=e._loadingStatus||"正在加载模块";return Z`
      <div class="store-loading">
        <div class="bubble-loading-icon">
          <div class="icon-center-wrapper">
            <ha-icon icon="mdi:puzzle"></ha-icon>
          </div>
          <div class="bubble-loading-orbit">
            <div class="bubble-loading-satellite"></div>
          </div>
        </div>
        <div class="bubble-progress-container">
          <div class="bubble-progress-track">
            <div class="bubble-progress-bar" style="width: ${t}%">
              <div class="bubble-progress-glow"></div>
            </div>
          </div>
          <div class="bubble-progress-percentage">
            <span class="bubble-progress-text">${n}</span>
            <span class="bubble-progress-value">${Math.round(t)}%</span>
          </div>
        </div>
      </div>
    `}return e._storeError?Z`
      <div class="bubble-info error">
        <h4 class="bubble-section-title">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          加载失败
        </h4>
        <div class="content">
          <p>Could not load modules from GitHub: ${e._storeError}</p>
          <mwc-button @click=${()=>Be(e)}>
            <ha-icon icon="mdi:refresh" style="margin-right: 8px;"></ha-icon>
            重试
          </mwc-button>
        </div>
      </div>
    `:([...new Set(e._storeModules.filter((e=>e.type)).map((e=>e.type.toLowerCase())))].sort(),void 0===e._zoomedImage&&(e._zoomedImage=null),e._toggleImageZoom=t=>{e._zoomedImage===t?e._zoomedImage=null:e._zoomedImage=t,e.requestUpdate()},Z`
    <div class="module-store">
      <div class="store-header">
        <div class="store-header-top">
          <div class="store-header-title">
            <ha-icon icon="mdi:puzzle-plus-outline"></ha-icon>
            <span>模块商店</span>
          </div>
          <div 
            class="store-refresh-button" 
            @click=${()=>{e._isApiCallInProgress=!1,Be(e,!1)}}
            title="刷新模块列表"
          >
            <ha-icon icon="mdi:refresh"></ha-icon>
          </div>
        </div>
        <div class="store-search">
          <ha-textfield
            label="搜索模块"
            icon
            .value=${e._storeSearchQuery||""}
            @input=${t=>{e._storeSearchQuery=t.target.value,e.requestUpdate()}}
          >
            <slot name="prefix" slot="leadingIcon">
              <ha-icon slot="prefix" icon="mdi:magnify"></ha-icon>
            </slot>
          </ha-textfield>
        </div>
        <div class="store-filters">

          <ha-formfield label="仅显示与此卡片兼容的模块">
            <ha-switch
              .checked=${e._storeShowOnlyCompatible??!0}
              @change=${t=>{e._storeShowOnlyCompatible=t.target.checked,e.requestUpdate()}}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>

      ${e._rankingInfoDismissed?"":Z`
        <div class="bubble-info info">
          <div class="bubble-info-header">
            <h4 class="bubble-section-title">
              <ha-icon icon="mdi:information-outline"></ha-icon>
              模块如何排名？
              <div class="bubble-info-dismiss bubble-badge" @click=${e._dismissRankingInfo} title="关闭" 
                style="
                  display: inline-flex;
                  align-items: center;
                  position: absolute;
                  right: 16px;
                  padding: 0 8px;
                  cursor: pointer;"
              >
                <ha-icon icon="mdi:close" style="margin: 0;"></ha-icon>
                Dismiss
              </div>
            </h4>
          </div>
          <div class="content">
            <p>由于GitHub API的限制，只会统计主讨论帖上的表情（如❤️👍🚀）来计算受欢迎程度，并结合其他因素，如：近期活动、评论数量、更新频率等。</p>
            <p><b>如果你觉得某个模块有用，点一下“更多信息”按钮去支持一下吧！</b></p>
          </div>
        </div>
      `}

      <div class="store-modules">
        ${Pe(e).map((t=>{const n=Oe(t.id),o=ze(t.id),i=Ve(t.id,t.version),a=e._config.card_type??"";let r=!0;return r=t.supportedCards&&Array.isArray(t.supportedCards)&&t.supportedCards.length>0?t.supportedCards.includes(a):!t.unsupportedCards||!t.unsupportedCards.includes(a),Z`
            <div class="store-module-card">
              <div class="store-module-header ${r?"":"warning"}">
                <div class="bubble-section-title">
                  <ha-icon icon="mdi:puzzle"></ha-icon>
                  <h3>${t.name}</h3>
                </div>

                <div class="store-module-meta">
                  <div class="store-module-author">
                    ${t.userAvatar?Z`
                      <img src="${t.userAvatar}" alt="${t.creator||"匿名"}" class="author-avatar">
                    `:""}
                    <span>来自 ${t.creator||"匿名"}</span>
                  </div>
                  <div class="version-container">
                    ${Ue(t)?Z`<span class="bubble-badge new-badge"><ha-icon icon="mdi:bell-outline"></ha-icon> 新的</span>`:""}
                    ${r?"":Z`<span class="bubble-badge incompatible-badge">Incompatible</span>`}
                    ${i?Z`<span class="bubble-badge update-badge">Update available</span>`:""}
                    ${o?Z`<span class="bubble-badge yaml-badge">YAML</span>`:""}
                    <span class="bubble-badge version-badge">${t.version||""}</span>
                  </div>
                </div>

                <div class="store-module-badges bubble-badges">
                </div>
              </div>

              <div class="store-module-content">
                <div class="store-module-description">
                  ${t.description?Z`
                    <p class="module-description" .innerHTML=${(0,Ce.bx)(t.description)}></p>
                  `:Z`
                    <p><em>没有描述</em></p>
                  `}
                  ${t.imageUrl?Z`
                    <div class="module-preview-container">
                      <img src="${t.imageUrl}" alt="${t.name}" class="module-preview-image">
                      <div class="module-preview-zoom-btn" @click=${n=>{n.stopPropagation(),e._toggleImageZoom(t.imageUrl)}}>
                        <ha-icon icon="mdi:magnify"></ha-icon>
                      </div>
                    </div>
                  `:""}
                </div>

                <div class="store-module-actions bubble-badges">
                  ${n?Z`
                      ${i?Z`
                          ${je(t)?Z`
                              <a 
                                href="${t.moduleLink}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="bubble-badge update-button hoverable"
                                style="cursor: pointer;"
                              >
                                <ha-icon icon="mdi:arrow-up-circle-outline"></ha-icon>
                                <span>Update (Manual install)</span>
                              </a>
                            `:Z`
                              <div 
                                @click=${()=>Me(e,t)}
                                class="bubble-badge update-button hoverable"
                                style="cursor: pointer;"
                              >
                                <ha-icon icon="mdi:arrow-up-circle-outline"></ha-icon>
                                <span>Update</span>
                              </div>
                            `}
                        `:Z`
                          <div class="bubble-badge installed-button">
                            <ha-icon icon="mdi:check"></ha-icon>
                            <span>${o?"Installed via YAML":"Installed"}</span>
                          </div>
                        `}
                    `:Z`
                      ${je(t)?Z`
                          <a
                            href="${t.moduleLink}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="bubble-badge install-button hoverable"
                            style="cursor: pointer;"
                          >
                            <ha-icon icon="mdi:github"></ha-icon>
                            <span>手动安装</span>
                          </a>
                        `:Z`
                          <div
                            @click=${()=>Me(e,t)}
                            class="bubble-badge install-button hoverable"
                            style="cursor: pointer;"
                          >
                            <ha-icon icon="mdi:download"></ha-icon>
                            <span>安装</span>
                          </div>
                        `}
                    `}
                  <a
                    href="${t.moduleLink}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bubble-badge link-button"
                  >
                    <ha-icon icon="mdi:github"></ha-icon>
                    更多信息/反馈
                  </a>
                </div>
              </div>
            </div>
          `}))}
      </div>

      ${0===Pe(e).length?Z`
        <div class="bubble-info">
          <h4 class="bubble-section-title">
            <ha-icon icon="mdi:information-outline"></ha-icon>
            找不到模块
          </h4>
          <div class="content">
            <p>没有符合搜索条件的模块，请尝试修改你的搜索内容或筛选条件。</p>
          </div>
        </div>
      `:""}
      
      <div class="back-to-top-button" @click=${()=>(0,Ce.XY)(e)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon>
      </div>
    </div>

    ${e._zoomedImage?Z`
      <div class="module-preview-fullscreen" @click=${()=>e._toggleImageZoom(null)}>
        <img src="${e._zoomedImage}" alt="Fullscreen preview">
      </div>
    `:""}
  `)}function Pe(e){if(!e._storeModules)return[];let t=[...e._storeModules];const n=new Map([["smart_icons"]]);if(t=t.filter((e=>{const t=e&&e.id;return!t||!n.has(t)||Oe(t)})),e._storeSearchQuery){const n=e._storeSearchQuery.toLowerCase();t=t.filter((e=>e.name&&e.name.toLowerCase().includes(n)||e.description&&e.description.toLowerCase().includes(n)||e.creator&&e.creator.toLowerCase().includes(n)||e.type&&e.type.toLowerCase().includes(n)))}if(e._storeShowOnlyCompatible){const n=e._config.card_type??"";t=t.filter((e=>e.supportedCards&&Array.isArray(e.supportedCards)?e.supportedCards.includes(n):!e.unsupportedCards||!e.unsupportedCards.includes(n)))}return e._storeSelectedType&&"all"!==e._storeSelectedType&&(t=t.filter((t=>t.type&&t.type.toLowerCase()===e._storeSelectedType.toLowerCase()))),t=(o=t)&&Array.isArray(o)?o.map((e=>{let t=0,n=!1,o=!1;if(e.comments&&(t+=Math.min(e.comments,8),n=!0),e.reactions?.total_count&&(t+=5*e.reactions.total_count,n=!0),e.reactions?.heart&&(t+=10*e.reactions.total_count,n=!0),e.createdAt){const n=new Date(e.createdAt),i=(new Date-n)/864e5;i<=7?(t+=30,o=!0):i<=30?(t+=15,o=!0):i<=90&&(t+=5)}if(e.updated_at){const n=new Date(e.updated_at),i=(new Date-n)/864e5;i<=7?(t+=25,o=!0):i<=30?(t+=15,o=!0):i<=90&&(t+=8)}return n||o||(t-=30),n&&o&&(t+=20),"Clooos"===e.creator&&(t+=40),Ue(e)&&(t+=150),{...e,relevanceScore:t}})).sort(((e,t)=>t.relevanceScore-e.relevanceScore)):[],t;var o}function Ue(e){if(!e.createdAt)return!1;const t=new Date(e.createdAt);return(new Date-t)/864e5<=14}function Oe(e){return a.Ki.has(e)}function ze(e){if(!Oe(e))return!1;if(a.sq.has(e))return"yaml"===a.sq.get(e);try{return!JSON.parse(localStorage.getItem("bubble-card-modules")||"{}")[e]}catch(e){return console.warn("检查模块安装来源时出错：",e),!1}}function Ve(e,t){if(!Oe(e)||!t)return!1;const n=(a.Ki.get(e)||{}).version||"0";return(0,Ce._O)(t,n)>0}function je(e){if(!e||!e.yamlContent)return!0;const t=e.yamlContent.trim();if(!t)return!0;try{const e=Ee.Ay.load(t);if(!e||"object"!=typeof e)return!0;const n=Object.keys(e);if(n.length>1){let t=0;for(const o of n){const n=e[o];n&&"object"==typeof n&&(n.name||n.code)&&t++}if(t>1)return!0}if(1===n.length){const t=e[n[0]];if(t&&"object"==typeof t){const e=Object.keys(t);let n=0;for(const o of e){const e=t[o];e&&"object"==typeof e&&(e.name||e.code)&&n++}if(n>1)return!0}}if(1===n.length){const t=e[n[0]];if(!t||"object"!=typeof t)return!0;if(!t.name||!t.code)return!0}}catch(e){return console.warn("检查模块YAML兼容性时出错：",e),!0}return!1}async function Be(e,t=!1){if(e._isApiCallInProgress)return;e._isApiCallInProgress=!0;const o=!t&&void 0!==e._storeModules;let i=!1;if(!t){e._isLoadingStore=!0,e._storeError=null,e._loadingProgress=5,e._loadingStatus="正在检查API限制",e.requestUpdate();let t=setInterval((()=>{if(!e._isLoadingStore)return void clearInterval(t);const n=e._loadingProgress||0;let o=0;n<40?o=2.5*Math.random():n<60?o=1.5*Math.random():n<75?o=.8*Math.random():n<90&&(o=.3*Math.random()),n<90&&(e._loadingProgress=n+o,e.requestUpdate())}),200);e._progressInterval=t}try{if(!o){const n=await fetch("https://api.github.com/rate_limit",{method:"GET",headers:{Accept:"application/vnd.github.v3+json","X-GitHub-Api-Version":"2022-11-28"}});if(t||(e._loadingStatus="正在解析API相应",e._loadingProgress=Math.min(e._loadingProgress+5,30),e.requestUpdate()),n.ok){(await n.json()).resources.core.remaining<=1&&(console.warn("⚠️以达到API限制，改为使用缓存"),i=!0)}else i=!0,console.warn("⚠️无法检查API速率限制，回退冷却机制")}if(t||(e._loadingStatus="正在处理API数据",e._loadingProgress=Math.min(e._loadingProgress+5,40),e.requestUpdate()),i&&!o){const o=localStorage.getItem("bubble-card-api-failure-timestamp");if(o){const i=parseInt(o),a=18e5;if(Date.now()-i<a){const{getCachedModuleData:o}=await Promise.resolve().then(n.bind(n,404)),i=o();return i&&!e._storeModules&&(e._storeModules=i.modules,e._isLoadingStore=!1,e.requestUpdate()),void(t||(e._loadingStatus="正在从缓存中加载",e._loadingProgress=60,e.requestUpdate()))}localStorage.removeItem("bubble-card-api-failure-timestamp")}const{getCachedModuleData:i}=await Promise.resolve().then(n.bind(n,404)),a=i();return a&&!e._storeModules&&(e._storeModules=a.modules,e._isLoadingStore=!1,e.requestUpdate()),void(t||(e._loadingStatus="正在从缓存中加载",e._loadingProgress=60,e.requestUpdate()))}let a=[],r=1,s=!0;for(t||(e._loadingStatus="正在下载模块数据",e._loadingProgress=50,e.requestUpdate());s;){const n=await fetch(`https://api.github.com/repos/Clooos/Bubble-Card/discussions?per_page=100&page=${r}`,{method:"GET",headers:{Accept:"application/vnd.github.v3+json","X-GitHub-Api-Version":"2022-11-28"}});if(t||(e._loadingStatus=`正在处理页面 ${r}`,e._loadingProgress=Math.min(50+5*r,80),e.requestUpdate()),!n.ok)throw console.error("❌ REST API 错误:",n.status,n.statusText),localStorage.setItem("bubble-card-api-failure-timestamp",Date.now().toString()),new Error(`REST API 错误: ${n.status}`);const o=await n.json();0===o.length?s=!1:(a=[...a,...o],r++),n.headers.get("x-ratelimit-remaining")<=5&&(console.warn("⚠️即将到达API限制，停止分页"),s=!1)}t||(e._loadingStatus="正在筛选模块",e._loadingProgress=85,e.requestUpdate());const l=a.filter((e=>{const t=e.category?.name;return"分享你的模块"===t})),c=(0,Se.N5)(l);t||(e._loadingStatus="正在保存缓存",e._loadingProgress=95,e.requestUpdate());const{saveCachedModuleData:d}=await Promise.resolve().then(n.bind(n,404));d(c),t||(await new Promise((e=>setTimeout(e,300))),e._loadingProgress=100,e._loadingStatus="完成",e.requestUpdate()),t&&e._storeModules||(e._storeModules=c,e._isLoadingStore=!1,e._progressInterval&&(clearInterval(e._progressInterval),e._progressInterval=null),e.requestUpdate()),t&&e._storeModules&&(e._storeModules=c,e.requestUpdate())}catch(o){if(console.error("加载模块时遇到错误：",o),!t){e._loadingStatus="从缓存中加载模块时出错",e._loadingProgress=85,e.requestUpdate();const{getCachedModuleData:t}=await Promise.resolve().then(n.bind(n,404)),i=t();i?(await new Promise((e=>setTimeout(e,300))),e._storeModules=i.modules,e._isLoadingStore=!1,e._loadingProgress=100,e._loadingStatus="缓存加载完毕",e.requestUpdate()):(e._storeError=o.message,e._isLoadingStore=!1,e.requestUpdate()),e._progressInterval&&(clearInterval(e._progressInterval),e._progressInterval=null)}}finally{e._isApiCallInProgress=!1,t||e.requestUpdate()}}function De(e){const{id:t,name:n,version:o,creator:i,link:a,supported:r,description:s,code:l,editor:c}={...e},d={name:n,version:o,creator:i,link:a,supported:r,description:s,code:l,editor:c};return Object.keys(d).forEach((e=>{const t=d[e];(null==t||"link"===e&&""===t)&&delete d[e]})),{id:t,cleanData:d}}function Fe(e){try{const{id:t,cleanData:n}=De(e),o={[t]:n};return Ee.Ay.dump(o,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0,sortKeys:!1})}catch(e){return console.error("生成YAML导出时出错：",e),"# 生成YAML导出时出错"}}function Ne(e,t,n,o){try{const i=document.createElement("textarea");i.value=t,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.select(),document.execCommand("copy"),document.body.removeChild(i),(0,Ae.q)(e,n,"success"),"function"==typeof o&&o(t)}catch(n){console.error("复制到剪贴板失败：",n),(0,Ae.q)(e,"无法复制到剪贴板。请从下面的预览手动复制。","error"),"function"==typeof o&&o(t)}}function Re(e,t,n=null){e._config&&e._config.modules&&(n&&n!==t&&(e._config.modules=e._config.modules.filter((e=>e!==n))),e._config.modules.includes(t)||e._config.modules.push(t),e._previousModuleId=t,(0,s.rC)(e,"config-changed",{config:e._config}))}function qe(e){e.lastEvaluatedStyles="",e.stylesYAML=null,e.handleCustomStyles&&e.card&&e.handleCustomStyles(e,e.card),e.requestUpdate()}function He(e,t){window.dispatchEvent(new CustomEvent("bubble-card-module-updated",{detail:{moduleId:e,moduleData:t}}))}function Ye(e){try{const t=document.querySelector("body > home-assistant")?.shadowRoot?.querySelector("hui-dialog-edit-card")?.shadowRoot?.querySelector("ha-dialog > div:nth-child(4)");t&&(t.style.display=e?"none":"")}catch(e){}}function We(e){e._processedSchemas&&(e._processedSchemas={}),e._selectedModuleTab=0,"function"==typeof e._getProcessedSchema&&(e._schemaCache?Object.keys(e._schemaCache).forEach((t=>{delete e._schemaCache[t]})):e._schemaCache={}),e.lastEvaluatedStyles="",e.card&&"function"==typeof e.handleCustomStyles&&e.handleCustomStyles(e,e.card),(0,s.rC)(e,"editor-refresh",{}),e.requestUpdate(),setTimeout((()=>{e.card&&"function"==typeof e.handleCustomStyles&&e.handleCustomStyles(e,e.card),e.requestUpdate(),setTimeout((()=>{if(e._config){const t={...e._config};e.stylesYAML&&(e.stylesYAML=null,document.dispatchEvent(new CustomEvent("yaml-modules-updated"))),(0,s.rC)(e,"config-changed",{config:t}),e.card&&"function"==typeof e.handleCustomStyles&&e.handleCustomStyles(e,e.card)}e.requestUpdate()}),100)}),50)}const Xe="sensor.bubble_card_modules",Ke=["modules","store"];function Ge(){return"undefined"!=typeof customElements&&void 0!==customElements.get("ha-tab-group")&&void 0!==customElements.get("ha-tab-group-tab")?"ha-tab-group":"undefined"!=typeof customElements&&void 0!==customElements.get("sl-tab-group")?"sl-tab-group":"ha-tabs"}function Je(e){const t={entityFound:!1,hasAttributes:!1,hasModulesAttribute:!1,modulesIsObject:!1,hasLastUpdated:!1,isReady:!1};if(!e||!e.states)return t;const n=e.states[Xe];if(!n)return t;t.entityFound=!0;const o=n.attributes||{};return t.hasAttributes=!!n.attributes,"modules"in o&&(t.hasModulesAttribute=!0,t.modulesIsObject=null!==o.modules&&"object"==typeof o.modules),"last_updated"in o&&(t.hasLastUpdated="string"==typeof o.last_updated&&o.last_updated.length>0),t.isReady=t.entityFound&&t.hasModulesAttribute&&t.modulesIsObject&&t.hasLastUpdated,t}async function Ze(e,t,n){try{if(!e.hass)return!1;if(!Je(e.hass).isReady)return console.warn(`Modules storage is not ready. Please configure '${Xe}' correctly.`),!1;if(!(e.hass&&e.hass.states&&e.hass.states[Xe]))return!1;let o={};try{const t=await e.hass.callApi("get",`states/${Xe}`);if(!t)throw new Error("Failed to retrieve entity state");t.attributes&&t.attributes.modules&&(o=t.attributes.modules)}catch(e){return console.error("Error retrieving modules:",e),!1}if(!o[t])return console.warn(`Module ${t} does not exist in storage`),!1;o[t].is_global=n;try{return await e.hass.callApi("post","events/bubble_card_update_modules",{modules:o,last_updated:(new Date).toISOString()}),document.dispatchEvent(new CustomEvent("yaml-modules-updated")),!0}catch(e){return console.error("Error updating module global status:",e),!1}}catch(e){return console.error("Unexpected error setting module global status:",e),!1}}function Qe(e,t){try{if(!t||!t.states||!t.states[Xe])return!1;const n=t.states[Xe];if(!n.attributes||!n.attributes.modules)return!1;const o=n.attributes.modules[e];return o&&!0===o.is_global}catch(t){return console.warn(`Error checking if module ${e} is global:`,t),!1}}function et(e){void 0===e._selectedModuleTab&&(e._selectedModuleTab=0),void 0===e._expandedPanelStates&&(e._expandedPanelStates={});const t="bubble-card-module-editor-tab-group";e._modulesLoaded||(0,a.wv)(e).then((()=>{if(e._modulesLoaded=!0,Je(e.hass).isReady){const t=e.hass.states[Xe].attributes.modules;t&&t.default&&!0!==t.default.is_global&&Ze(e,"default",!0).then((e=>{e?document.dispatchEvent(new CustomEvent("yaml-modules-updated")):console.warn(`Failed to set module 'default' to global in ${Xe}.`)}))}e.requestUpdate()}));const n=Je(e.hass),o=n.isReady;n.entityFound&&!n.isReady&&!e._attemptedModulesStorageBootstrap&&e.hass&&(e._attemptedModulesStorageBootstrap=!0,e.hass.callApi("post","events/bubble_card_update_modules",{modules:{},last_updated:(new Date).toISOString()}).then((()=>{setTimeout((()=>e.requestUpdate()),150)})).catch((()=>{}))),function(e){if(!e._editingModuleInitialized){e._editingModule=null,e._showNewModuleForm=!1,e._showManualImportForm=!1,e._manualYamlContent="",e._exportContent=null,e._exportType=null,e._exportStep=0,e._schemaCache={},e._processedSchemas={},e._originalModuleState=null,e._previousModuleId=null,e._generateUniqueModuleId=(e="my_module")=>{if(!a.Ki.has(e))return e;let t=1,n=`${e}_${t}`;for(;a.Ki.has(n);)t++,n=`${e}_${t}`;return n};const t=e._generateUniqueModuleId("my_module");e._newModuleTemplate={id:t,name:"My Module",description:"",creator:"",version:"1.0",supported:["button","calendar","climate","cover","horizontal-buttons-stack","media-player","pop-up","select","separator"],code:"",editor:""},e._editingModuleInitialized=!0}}(e),e._workingModuleConfigs||(e._workingModuleConfigs={}),e._modulesLoaded&&!a.Ki.has("default")&&o&&Te(e,"default:\n  name: 默认\n  version: ''\n  description: 默认是空的并已启用。在这里添加你的自定义样式和/或JS模板，然后点击上方的 <ha-icon icon=\"mdi:pencil\"></ha-icon> 按钮即可应用到所有卡片。\n  code: ''\n  is_global: true\n  ").then((()=>{console.info("默认模块已自动创建"),e.requestUpdate()})).catch((e=>{console.error("自动创建默认模块时出错：",e)}));const i=function(){const e=Array.from(a.Ki.keys()),t=[];let n=0;const o=(0,Ae.getCachedModuleData)();return o&&o.modules&&o.modules.length?(e.forEach((e=>{const i=o.modules.find((t=>t.id===e));i&&Ve(e,i.version)&&(n++,t.push({id:e,name:i.name||a.Ki.get(e).name||e,currentVersion:a.Ki.get(e).version||"0",newVersion:i.version}))})),{hasUpdates:n>0,updateCount:n,modules:t}):{hasUpdates:!1,updateCount:0,modules:[]}}(),r=t=>{const n=Ge();let o;if("sl-tab-group"===n)o=parseInt(t?.detail?.name??t?.target?.activeTab??t?.detail?.value,10);else if("ha-tab-group"===n){const e=t?.detail??{},n=e.tab??e.target??e.item,i=n?.getAttribute?n.getAttribute("panel"):void 0,a=e.panel??e.tabId??i??e.value??t?.target?.activePanel??t?.target?.activeTab;if("number"==typeof a)o=a;else if("string"==typeof a){const e=Ke.indexOf(a);o=-1!==e?e:parseInt(a,10)}}else o=t?.detail?.value??t?.target?.selected;Number.isFinite(o)||(o=0),e._selectedModuleTab=o,e.requestUpdate(),requestAnimationFrame((()=>{(0,Ce.XY)(e,!1)}))},l=Z`
    <ha-expansion-panel outlined>
      <h4 slot="header">
        <ha-icon icon="mdi:puzzle"></ha-icon>
        模块
        ${i.hasUpdates&&o?Z`
          <span class="bubble-badge update-badge" style="margin-left: 8px; font-size: 0.8em; vertical-align: middle;">
            <ha-icon icon="mdi:arrow-up-circle-outline"></ha-icon>
            ${i.updateCount} update${i.updateCount>1?"s":""} available
          </span>
        `:""}
      </h4>
      <div class="content" style="margin: -8px 4px 14px 4px;">
        ${o?"":Z`
            <div class="bubble-info warning">
              <h4 class="bubble-section-title">
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                需要进行配置
              </h4>
              <div class="content">
                ${n.entityFound?Z`
                  <p><b><code>${Xe}</code> is detected, but its configuration is incomplete or incorrect.</b></p>
                `:Z`
                  <p>你的Home Assistant中尚未配置用于存储的 <code>${Xe}</code> 实体。</p>
                `}
                <hr />
                <p><b>要使用模块商店和模块编辑器，请按下面步骤操作：</b></p>

                <p>1. 在 <code>configuration.yaml</code> 文件中，添加以下内容：</p>
                <code-block><pre>
# Bubble Card 模块存储
template:
  - trigger:
      - trigger: event
        event_type: bubble_card_update_modules
    sensor:
      - name: "Bubble Card Modules"
        state: "saved"
        icon: "mdi:puzzle"
        attributes:
          modules: "{{ trigger.event.data.modules }}"
          last_updated: "{{ trigger.event.data.last_updated }}"
                </pre></code-block>
                <p>2. 保存并重启Home Assistant</p>
                <p>3. 即可使用模块商店和模块编辑器！</p>
              </div>
            </div>
        `}

        <div id="module-editor-top-marker"></div>
        
        ${(()=>{const n=Ge(),i=e._selectedModuleTab||0,a=Ke[i]??i.toString(),s=t=>{const n=Ke.indexOf(t);e._selectedModuleTab=-1!==n?n:parseInt(t,10)||0,e.requestUpdate(),requestAnimationFrame((()=>(0,Ce.XY)(e,!1)))};return"ha-tab-group"===n?Z`
        <ha-tab-group
          id="${t}"
          .activePanel=${a}
          @wa-tab-show=${r}
          @active-panel-changed=${r}
          >
          <ha-tab-group-tab
            slot="nav"
            panel=${Ke[0]}
            .active=${a===Ke[0]}
            @click=${()=>s(Ke[0])}
          >
            <ha-icon icon="mdi:puzzle-heart-outline" style="margin-right: 8px;"></ha-icon>
            我的模块
          </ha-tab-group-tab>
          <ha-tab-group-tab
            slot="nav"
            panel=${Ke[1]}
            .active=${a===Ke[1]}
            ?disabled=${!o}
            @click=${()=>s(Ke[1])}
          >
            <ha-icon icon="mdi:puzzle-plus-outline" style="margin-right: 8px;"></ha-icon>
            模块商店
          </ha-tab-group-tab>
        </ha-tab-group>
      `:"sl-tab-group"===n?Z`
        <sl-tab-group
          id="${t}"
          .selected=${i.toString()}
          @sl-tab-show=${r}
        >
          <sl-tab slot="nav" panel="0">
            <ha-icon icon="mdi:puzzle-heart-outline" style="color: inherit !important; margin-right: 8px;"></ha-icon>
            我的模块
          </sl-tab>
          <sl-tab slot="nav" panel="1" ?disabled=${!o}>
            <ha-icon icon="mdi:puzzle-plus-outline" style="color: inherit !important; margin-right: 8px;"></ha-icon>
            模块商店
          </sl-tab>
          <sl-tab-panel name="0"></sl-tab-panel>
          <sl-tab-panel name="1"></sl-tab-panel>
        </sl-tab-group>
      `:Z`
      <ha-tabs
        .selected=${i}
        @selected-changed=${r}
      >
        <paper-tab>
          <ha-icon icon="mdi:puzzle-heart-outline" style="margin-right: 8px;"></ha-icon>
          我的模块
        </paper-tab>
        <paper-tab class="${o?"":"disabled"}" ?disabled=${!o}>
          <ha-icon icon="mdi:puzzle-plus-outline" style="margin-right: 8px;"></ha-icon>
          模块商店
        </paper-tab>
      </ha-tabs>
    `})()}

        ${0!==e._selectedModuleTab&&o?Ie(e):Z`
          ${e._showManualImportForm?Z`
            <div class="module-editor-form">
              <div class="card-content">
                <h3>
                    <ha-icon icon="mdi:code-json" style="margin: 8px;"></ha-icon>
                    Import Module from YAML
                </h3>
                <p style="margin-top: 0;">Paste the complete YAML code of the module:</p>
                
                <div class="css-editor-container" style="max-height: 500px; overflow: auto;">
                  <ha-code-editor
                    .value=${e._manualYamlContent||""}
                    .mode=${"yaml"}
                    .autofocus=${!0}
                    style="height: auto; max-width: 100%;"
                    @value-changed=${t=>{e._manualYamlContent=t.detail.value}}
                  ></ha-code-editor>
                </div>
                
                <div style="display: flex; gap: 8px; justify-content: flex-end;">
                  <button 
                    class="icon-button" 
                    style="flex: 1;"
                    @click=${()=>{e._showManualImportForm=!1,e.requestUpdate()}}
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                    Cancel
                  </button>
                  <button 
                    class="icon-button" 
                    style="flex: 1;"
                    @click=${async()=>{try{const t=e._manualYamlContent;if(!t||""===t.trim())return void(0,s.rC)(e,"bubble-card-error",{message:"No YAML content provided"});await Te(e,t),e._showManualImportForm=!1,e._manualYamlContent="",e.requestUpdate()}catch(e){console.error("手动安装模块时出错：",e)}}}
                  >
                    <ha-icon icon="mdi:content-save"></ha-icon>
                    Import Module
                  </button>
                </div>
                <hr>
              </div>
            </div>
          `:""}

          ${e._showNewModuleForm||e._editingModule?function(e){if(!e._editingModule)return Ye(!1),Z``;Ye(!0);const t=!!ze&&ze(e._editingModule.id),n=!!e._yamlErrorMessage,o=!!e.errorMessage&&!!e._editingModule,i=n||o,r=t=>{const n=e.shadowRoot?.querySelector("#export-preview-content");if(n){n.textContent=t;const o=e.shadowRoot?.querySelector(".export-preview ha-expansion-panel");o&&!o.expanded&&(o.expanded=!0);const i=e.shadowRoot?.querySelector(".export-preview");i&&(i.style.animation="none",setTimeout((()=>{i.style.animation="highlight 1s ease"}),10))}};return Z`
    <div class="module-editor-form">
        <div class="form-content">
          <h3>
            <ha-icon style="margin: 8px;" icon="${e._showNewModuleForm?"mdi:puzzle-plus-outline":"mdi:puzzle-edit-outline"}"></ha-icon>
            ${e._showNewModuleForm?"Create new Module":"default"===e._editingModule.id?"编辑默认模块":"Edit Module"}
          </h3>
          
          <div class="module-editor-not-default" style="display: ${"default"===e._editingModule.id?"none":""}">
            ${t?Z`
              <div class="bubble-info warning">
                <h4 class="bubble-section-title">
                  <ha-icon icon="mdi:file-document-alert"></ha-icon>
                  Read-only Module
                </h4>
                <div class="content">
                  <p>This Module is installed from a YAML file. You need to modify the <code>bubble-modules.yaml</code> 
                  file directly, or remove it from your YAML file then import it here.</p>
                </div>
              </div>
            `:""}
            
            <ha-textfield
              label="Module ID"
              .value=${e._editingModule.id||""}
              @input=${t=>{const n=e._editingModule.id;e._editingModule.id=t.target.value,e._showNewModuleForm&&e._config.modules&&(Re(e,t.target.value,n),(0,s.rC)(e,"config-changed",{config:e._config}))}}
              ?disabled=${!e._showNewModuleForm||t}
            ></ha-textfield>
            <span class="helper-text">
              必须唯一，且模块创建后将不可更改。
            </span>
            
            <ha-textfield
              label="模块名称"
              .value=${e._editingModule.name||""}
              @input=${t=>{e._editingModule.name=t.target.value}}
              ?disabled=${t}
            ></ha-textfield>
            
            <ha-textfield
              label="版本"
              .value=${e._editingModule.version||"1.0"}
              @input=${t=>{e._editingModule.version=t.target.value}}
              ?disabled=${t}
            ></ha-textfield>
            
            <ha-textfield
              label="作者"
              .value=${e._editingModule.creator||""}
              @input=${t=>{e._editingModule.creator=t.target.value}}
              ?disabled=${t}
            ></ha-textfield>
            
            <ha-expansion-panel .header=${Z`
              <ha-icon icon="mdi:filter-check-outline" style="margin-right: 8px;"></ha-icon>
              支持的卡片类型
            `}>
              <div>
                ${function(e,t=!1){const n=[{id:"button",name:"按钮"},{id:"calendar",name:"日历"},{id:"climate",name:"空调"},{id:"cover",name:"遮阳设备"},{id:"horizontal-buttons-stack",name:"水平按钮组"},{id:"media-player",name:"媒体播放器"},{id:"pop-up",name:"弹出面板"},{id:"select",name:"选单"},{id:"separator",name:"分隔线"}];return e._editingModule.supported||(e._editingModule.supported=[],e._editingModule.unsupported&&e._editingModule.unsupported.length>0?e._editingModule.supported=n.map((e=>e.id)).filter((t=>!e._editingModule.unsupported.includes(t))):e._editingModule.supported=n.map((e=>e.id))),Z`
    <div class="checkbox-grid">
      ${n.map((n=>Z`
        <ha-formfield label="${n.name}">
          <ha-checkbox
            .checked=${e._editingModule.supported.includes(n.id)}
            @change=${o=>{t||(o.target.checked?e._editingModule.supported.includes(n.id)||e._editingModule.supported.push(n.id):e._editingModule.supported=e._editingModule.supported.filter((e=>e!==n.id)),e.requestUpdate())}}
            ?disabled=${t}
          ></ha-checkbox>
        </ha-formfield>
      `))}
    </div>
    <div class="helper-text">
      选择此模块所支持的卡片类型。
    </div>
  `}(e,t)}
              </div>
            </ha-expansion-panel>

            <ha-expansion-panel .header=${Z`
              <ha-icon icon="mdi:file-document-outline" style="margin-right: 8px;"></ha-icon>
              Description
            `}>
              <div class="code-editor-container">
                <ha-code-editor
                  class="${t?"disabled":""}"
                  mode="yaml"
                  .value=${e._editingModule.description||""}
                  @value-changed=${t=>{e._editingModule.description=t.detail.value}}
                ></ha-code-editor>
              </div>
              <span class="helper-text">
                This description appears in your module and in the Module Store (if you share it), so make sure it's clear and concise. <b>You can use HTML and inline CSS</b>, but note that it will only be rendered in your module, the Module Store will not display it.            
              </span>
            </ha-expansion-panel>
          </div>

          <ha-expansion-panel .header=${Z`
            <ha-icon icon="mdi:code-json" style="margin-right: 8px;"></ha-icon>
            代码（CSS或JS模板）
          `}>
            <div class="code-editor-container">
              <ha-code-editor
                class="${t?"disabled":""}"
                mode="yaml"
                .value=${e._editingModule.code||""}
                @value-changed=${n=>(n=>{if(!e._editingModule||!e._config||t)return;const o=e._editingModule.id;if("function"==typeof e._clearCurrentModuleError&&e._clearCurrentModuleError(o),!e._originalModuleState){const t=a.Ki.get(o);t&&(e._originalModuleState=JSON.parse(JSON.stringify(t)))}e._editingModule.code=n,e.stylesYAML&&(e.stylesYAML=null);const i={...a.Ki.get(o)||{},code:n,id:o};a.Ki.set(o,i),Re(e,o,e._previousModuleId),He(o,i)})(n.detail.value)}
              ></ha-code-editor>
            </div>
            ${e.createErrorConsole(e)}
            <span class="helper-text">
              关于CSS与JS模板的更多信息和示例，请参阅<a href="https://github.com/Clooos/Bubble-Card?tab=readme-ov-file#styling" target="_blank">样式与模板文档</a>。提示：你可以点击面板标题来放大编辑器。
            </span>
          </ha-expansion-panel>
          
          <ha-expansion-panel style="display: ${"default"===e._editingModule.id?"none":""}" .header=${Z`
            <ha-icon icon="mdi:form-select" style="margin-right: 8px;"></ha-icon>
            Optional: Editor schema (YAML)
          `}>
            <div class="editor-schema-container">
              <ha-code-editor
                class="${t?"disabled":""}"
                mode="yaml"
                .value=${e._editingModule.editor_raw||("object"==typeof e._editingModule.editor?Ee.Ay.dump(e._editingModule.editor):e._editingModule.editor||"")}
                @value-changed=${n=>{e._editingModule.editor_raw=n.detail.value,clearTimeout(e._editorSchemaDebounce),e._editorSchemaDebounce=setTimeout((()=>{try{const o=Ee.Ay.load(n.detail.value);null!==o&&"object"==typeof o&&((n=>{if(e._editingModule&&e._config&&!t)try{const t=e._editingModule.id;if(!e._originalModuleState){const n=a.Ki.get(t);n&&(e._originalModuleState=JSON.parse(JSON.stringify(n)))}const o=e._editingModule.editor_raw;e._editingModule.editor=n,o&&(e._editingModule.editor_raw=o);const i=a.Ki.get(t);if(i){const o={...i,editor:n};a.Ki.set(t,o),e._schemaCache&&delete e._schemaCache[t],e._processedSchemas&&delete e._processedSchemas[t],e.requestUpdate(),setTimeout((()=>{(0,s.rC)(e,"editor-refresh",{}),e.requestUpdate()}),50)}}catch(e){console.warn("Error applying live editor schema:",e)}})(o),e._yamlErrorMessage&&(e._yamlErrorMessage=null,e.requestUpdate()))}catch(t){console.warn("Invalid YAML for editor schema:",t),e._editingModule.editor=e._editingModule.editor_raw||n.detail.value,e._yamlErrorMessage=t.message,e.requestUpdate()}}),100)}}
              ></ha-code-editor>
            </div>
            <div class="bubble-info error" 
                style="display: ${e._yamlErrorMessage?"":"none"}">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                    YAML schema错误
                </h4>
                <div class="content">
                    <pre style="margin: 0; white-space: pre-wrap; font-size: 12px;">${e._yamlErrorMessage?e._yamlErrorMessage.charAt(0).toUpperCase()+e._yamlErrorMessage.slice(1):""}</pre>
                </div>
            </div>
            <span class="helper-text">
              这可以让你的模块添加一个可视化编辑器。你可以在<a href="https://github.com/Clooos/Bubble-Card/blob/main/src/modules/editor-schema-docs.md" target="_blank">编辑器 schema 文档</a>中了解所有可用的编辑器 schema 选项。
            </span>

            ${e._editingModule.editor&&Array.isArray(e._editingModule.editor)&&e._editingModule.editor.length>0?Z`
              <div class="form-preview">
                <h4>Editor preview</h4>
                <div class="form-preview-container">
                  <ha-form
                    .hass=${e.hass}
                    .data=${{}}
                    .schema=${e._editingModule.editor}
                    .computeLabel=${e._computeLabelCallback||(e=>e.label||e.name)}
                  ></ha-form>
                </div>
              </div>
            `:""}
          </ha-expansion-panel>

          ${!t&&i?Z`
            <div class="bubble-info warning" style="margin-top: 8px;">
              <h4 class="bubble-section-title">
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                保存已禁用
              </h4>
              <div class="content">
                <p style="margin: 0;">
                  ${n?Z`请修复上方编辑器Schema（YAML）中的错误后再尝试保存。`:""}
                  ${n&&o?Z`<br>`:""}
                  ${o?Z`请修复上方CSS/JS模板中的错误后再尝试保存。`:""}
                </p>
              </div>
            </div>
          `:""}

          <hr>

          <ha-expansion-panel .header=${Z`
            <ha-icon icon="mdi:export" style="margin-right: 8px;"></ha-icon>
            导出模块
          `}>
            <div class="content">
                <div class="export-section">
                    <div class="export-buttons">
                        <button class="icon-button" @click=${()=>{const t=Fe(e._editingModule);Ne(e,t,"YAML已经拷贝到剪切板！",r)}}>
                        <ha-icon icon="mdi:content-copy"></ha-icon>
                        拷贝为YAML
                        </button>
                        
                        <button class="icon-button" @click=${()=>{const t=function(e){try{const{id:t,cleanData:n}=De(e),{name:o,version:i,creator:a,description:r,code:s,editor:l,supported:c=[]}=n;let d=`# ${o}\n\n`;if(d+=`**版本：** ${i}  \n`,d+=`**作者：** ${a}\n\n`,c&&c.length>0&&(d+="> [!IMPORTANT] \n",d+="> **支持的卡片类型：**\n",c.forEach((e=>{d+=`>  - ${e.replace(/-/g," ").replace(/\b\w/g,(e=>e.toUpperCase()))}\n`})),d+="\n"),r&&(d+=`${r}\n`,d+="可以通过编辑器或YAML来配置此模块，例如：\n\n"),d+="```yaml\n",d+=`${t}: \n`,l&&Array.isArray(l)&&l.length>0){const e=l[0];e&&e.name&&(d+=`    ${e.name}: YOUR_VALUE\n`)}else d+="    # 在此处填写配置\n";if(d+="```\n\n",d+="---\n\n",d+="<details>\n\n",d+="<summary><b>🧩 获取此模块</b></summary>\n\n",d+="<br>\n\n",d+="> 使用此模块很简单：从模块商店安装（在任意卡片的编辑器 -> 模块 中），或将以下配置复制并粘贴到您的 `/www/bubble/bubble-modules.yaml` 文件中。\n\n",d+="```yaml\n",d+=`${t}:\n`,d+=`    name: "${o}"\n`,d+=`    version: "${i}"\n`,d+=`    creator: "${a}"\n`,d+='    link: "https://github.com/Clooos/Bubble-Card/discussions/XXXX"\n\n',c&&c.length>0&&(d+="    supported:\n",c.forEach((e=>{d+=`        - ${e}\n`})),d+="\n"),d+="    description: |\n",r){const e=r.split("\n").map((e=>`        ${e}`)).join("\n");if(d+=`${e}\n`,d+="        <br><br>\n",d+="        <code-block><pre>\n",d+=`        ${t}: \n`,l&&Array.isArray(l)&&l.length>0){const e=l[0];e&&e.name?d+=`            ${e.name}: YOUR_VALUE\n`:d+="            # 在此处填写配置\n"}else d+="            # 在此处填写配置\n";d+="        </pre></code-block>\n\n"}if(d+="    code: |\n",s){const e=s.split("\n").map((e=>`        ${e}`)).join("\n");d+=`${e}\n\n`}else d+="        # 在此处写代码\n\n";if(l){const e="object"==typeof l?Ee.Ay.dump(l,{indent:2}):l;d+="    editor:\n";const t=e.split("\n").map((e=>`      ${e}`)).join("\n");d+=`${t}`,d+="\n```"}else d+="```";return d+="\n\n</details>\n\n",d+="---\n\n",d+="### 截图:\n\n",d+="重要提示：此处的第一张截图将用于模块商店，请务必提供一张。\n",d}catch(e){return console.error("生成GitHub导出时出错：",e),"# 生成GitHub导出格式时出错"}}(e._editingModule);Ne(e,t,"GitHub讨论已经拷贝到剪切板！",r)}}>
                        <ha-icon icon="mdi:content-copy"></ha-icon>
                        拷贝为GitHub提交
                        </button>
                        
                        <button class="icon-button" @click=${()=>{!function(e,t,n){try{const o=Fe(t),i=new Blob([o],{type:"text/yaml"}),a=URL.createObjectURL(i),r=document.createElement("a");return r.href=a,r.download=`${t.id}.yaml`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(a),(0,Ae.q)(e,"模块已下载为YAML文件！","success"),"function"==typeof n&&n(o),!0}catch(t){return console.error("下载模块时出错：",t),(0,Ae.q)(e,"下载模块时出错: "+t.message,"error"),!1}}(e,e._editingModule,r)}}>
                        <ha-icon icon="mdi:file-download"></ha-icon>
                        下载YAML
                        </button>
                    </div>
                    
                    <div class="export-preview">
                        <ha-expansion-panel .header=${"导出预览"}>
                        <pre id="export-preview-content">点击上方按钮以生成预览</pre>
                        </ha-expansion-panel>
                    </div>

                    <div class="bubble-info">
                      <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        把你的模块分享到商店
                      </h4>
                      <div class="content">
                        <p>要将你的模块分享到模块商店，点击<strong>拷贝为GitHub提交</strong>，然后把内容粘贴到<a href="https://github.com/Clooos/Bubble-Card/discussions/categories/share-your-modules" target="_blank">分享你的模块</a>分类中新建的讨论帖里。
                        如果需要，你可以<strong>编辑描述、示例</strong>（会展示给使用你模块的用户），并且记得<strong>至少添加一张截图</strong>，方便在模块商店展示。</p>
                        <p>提交后，只要刷新一下商店，<strong>你的模块就会立刻可用</strong>。所以确保内容正确，且模块正常工作。当然，你之后也可以随时编辑或更新你分享的模块。</p>
                      </div>
                    </div>
                </div>
            </div>
          </ha-expansion-panel>
          
          <div class="module-editor-buttons-container">
            <button class="icon-button" style="flex: 1;" @click=${()=>{try{if(!e._showNewModuleForm&&e._editingModule){const t=e._editingModule.id;!function(e,t){if(!t)return;let n;e._originalModuleState?(n=e._originalModuleState,e._originalModuleState=null):n=a.Ki.get(t),n&&(e.lastEvaluatedStyles="",e.stylesYAML=null,a.Ki.set(t,{...n}),e._schemaCache&&delete e._schemaCache[t],e._processedSchemas&&delete e._processedSchemas[t],e.handleCustomStyles&&e.handleCustomStyles(e,e.card),He(t,n),setTimeout((()=>{if(e._config){const t={...e._config};(0,s.rC)(e,"config-changed",{config:t})}e.requestUpdate()}),50))}(e,t)}else if(e._showNewModuleForm&&e._editingModule){const t=e._editingModule.id;e._config&&e._config.modules&&t&&(e._config.modules=e._config.modules.filter((e=>e!==t)),(0,s.rC)(e,"config-changed",{config:e._config}),a.Ki.has(t)&&a.Ki.delete(t),qe(e))}}finally{e._editingModule=null,e._showNewModuleForm=!1,e._previousModuleId=null,Ye(!1),e.requestUpdate(),setTimeout((()=>(0,Ce.XY)(e)),0)}}}>
              <ha-icon icon="mdi:close"></ha-icon>
              退出编辑
            </button>
            
            <button class="icon-button ${t||i?"disabled":""}" ?disabled=${t||i} style="flex: 1;" @click=${()=>{t||i||(async function(e,t){try{const n=t.id,o=e._config.modules&&e._config.modules.includes(n);if(t.editor_raw&&"string"==typeof t.editor_raw)try{const e=Ee.Ay.load(t.editor_raw);null!==e&&"object"==typeof e&&(t.editor=e)}catch(e){console.warn("Couldn't parse editor schema during save, using fallback:",e)}t.editor_raw&&delete t.editor_raw,t.supported&&t.unsupported&&delete t.unsupported;const i="sensor.bubble_card_modules",r=e.hass&&e.hass.states&&e.hass.states[i],l={},c={...t};delete c.id,l[t.id]=c;const d=Ee.Ay.dump(l,{indent:2,lineWidth:-1,noRefs:!0,noCompatMode:!0}),u=(t.id,(0,Se.tF)(d,t.id,{title:t.name,defaultCreator:t.creator}));document.dispatchEvent(new CustomEvent("yaml-modules-updated"));const p=Array.from(a.Ki.keys()),h=new Map;p.forEach((e=>{e===t.id?h.set(t.id,u):h.set(e,a.Ki.get(e))})),p.includes(t.id)||h.set(t.id,u),a.Ki.clear(),h.forEach(((e,t)=>{a.Ki.set(t,e)}));try{a.sq.set(n,"entity")}catch(e){}e._config&&e._config.modules&&(e._config.modules.includes(n)||e._config.modules.push(n),(0,s.rC)(e,"config-changed",{config:e._config})),r&&await async function(e,t,n){try{const o=await e.hass.callApi("get",`states/${t}`);if(o){let t={};if(o.attributes&&o.attributes.modules)try{t="string"==typeof o.attributes.modules?JSON.parse(o.attributes.modules):o.attributes.modules}catch(e){console.warn("Error parsing modules from Home Assistant:",e)}t&&"object"==typeof t||(t={});const i=t[n.id],a=i&&!0===i.is_global;t[n.id]={id:n.id,name:n.name,version:n.version,creator:n.creator,description:n.description,code:n.code,editor:n.editor,supported:n.supported||[],...a?{is_global:!0}:{},..."default"===n.id?{is_global:!0}:{},...n.supported?{}:{unsupported:n.unsupported||[]}},e.hass.callWS({type:"fire_event",event_type:"bubble_card_update_modules",event_data:{modules:t,last_updated:(new Date).toISOString()}}).catch((e=>{console.error("Error firing event:",e)}))}}catch(e){console.error("Error saving module to Home Assistant:",e)}}(e,i,t),He(n,u),e.stylesYAML=null,o&&qe(e),e._editingModule=null,e._showNewModuleForm=!1,We(e),Ye(!1)}catch(e){console.error("Error saving module:",e)}finally{Ye(!1)}}(e,e._editingModule),setTimeout((()=>(0,Ce.XY)(e)),0))}}>
              <ha-icon icon="mdi:content-save"></ha-icon>
              保存模块
            </button>
          </div>
        </div>
    </div>
  `}(e):Z`
            <!-- Installed Modules List -->
            ${Array.from(a.Ki.keys()).sort(((e,t)=>"default"===e?-1:"default"===t?1:0)).map((t=>{const{name:n,description:r,formSchema:l,supportedCards:c,unsupportedCard:d,creator:u,moduleLink:p,moduleVersion:h}=(0,Ce.a7)(t),b=function(e,t){const n=e._config?.modules||[],o=Array.isArray(n)?n:[n];return!o.includes(`!${t}`)&&(!!o.includes(t)||Qe(t,e.hass))}(e,t),m=Qe(t,e.hass),g=l&&l.length>0,f="default"===t,v=f||g,y=e._config[t];void 0===e._workingModuleConfigs[t]&&(e._workingModuleConfigs[t]=structuredClone(y??{}));const _=e._workingModuleConfigs[t],w=e._config.card_type??"";let x=!1;x=c&&Array.isArray(c)&&c.length>0?!c.includes(w):d.includes(w);const k=l&&l.length>0?e._getProcessedSchema(t,l,y):[],$=i.modules.some((e=>e.id===t))&&o,C=$?i.modules.find((e=>e.id===t)):null;return Z`
                <ha-expansion-panel 
                  outlined 
                  class="${x?"disabled":""}"
                  @expanded-changed=${n=>{e._expandedPanelStates[t]=n.target.expanded,e.requestUpdate()}}
                >
                  <h4 slot="header">
                    <ha-icon
                      icon="${b?"mdi:puzzle-check":"mdi:puzzle-outline"}"
                      style="${b?"opacity: 1; color: var(--info-color) !important;":"opacity: 0.3;"}"
                    ></ha-icon>
                    ${n}
                    <span class="module-badges" style="display: inline-flex; margin-left: auto;">
                      ${$?Z`
                        <span class="bubble-badge update-badge">
                          <ha-icon icon="mdi:arrow-up-circle-outline"></ha-icon>
                          Update: ${C.newVersion}
                        </span>
                      `:""}
                      ${m?Z`
                        <span class="bubble-badge update-badge global-badge">
                          <ha-icon icon="mdi:cards-outline" style="color: var(--primary-text-color) !important;"></ha-icon>
                        </span>
                      `:""}
                    </span>
                  </h4>
                  <div class="content" style="margin-top: 4px;">
                    ${$e(e,t,!!e._expandedPanelStates[t],(()=>Z`
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="module-toggles-container">
                          <span class="module-toggles-label">
                            应用到
                          </span>
                          <div class="module-toggles">
                            <button 
                              class="bubble-badge toggle-badge ${b?"install-button":"link-button"}"
                              style="${"default"===t&&b?"cursor: default;":""} cursor: pointer;"
                              @click=${()=>{(t=>{const n=t.target,o=n.configValue,i=n.checked;e._config.modules=Array.isArray(e._config.modules)?e._config.modules:[];const a=Qe(o,e.hass);i?(e._config.modules=e._config.modules.filter((e=>e!==`!${o}`)),a||e._config.modules.includes(o)||(e._config.modules=[...e._config.modules,o])):a?(e._config.modules.includes(`!${o}`)||(e._config.modules=[...e._config.modules,`!${o}`]),e._config.modules=e._config.modules.filter((e=>e!==o))):e._config.modules=e._config.modules.filter((e=>e!==o)),(0,s.rC)(e,"config-changed",{config:e._config}),e.requestUpdate()})({target:{checked:!b,configValue:t}})}}
                            >
                              <ha-icon icon="mdi:card-outline"></ha-icon>
                              <span>这个卡片</span>
                            </button>
                            
                            ${o?Z`
                              <button 
                                class="bubble-badge toggle-badge ${m&&!g?"update-button":"link-button"} ${v?"disabled":""}"
                                style="cursor: pointer; ${v?"opacity: 0.7; cursor: default;":""}"
                                @click=${()=>{v||(async(t,n)=>{await Ze(e,t,n)&&(!0===n&&(e._config.modules=Array.isArray(e._config.modules)?e._config.modules.filter((e=>e!==`!${t}`)):[]),(0,s.rC)(e,"config-changed",{config:e._config}),e.requestUpdate(),setTimeout((()=>e.requestUpdate()),100))})(t,!m)}}
                                ?disabled=${v}
                              >
                                <ha-icon icon="mdi:cards-outline"></ha-icon>
                                <span>${"所有卡片"}</span>
                              </button>
                              ${v&&!f?Z`
                                <button 
                                  class="bubble-badge toggle-badge"
                                  style="padding: 4px;"
                                  @click=${n=>{n.stopPropagation(),e._helpModuleId=e._helpModuleId===t?null:t,e.requestUpdate()}}
                                  title="显示帮助"
                                >
                                  <ha-icon icon="mdi:help"></ha-icon>
                                </button>
                              `:""}
                            `:""}
                          </div>
                        </div>
                        
                        <!-- Module Action Buttons -->
                        <div class="module-actions">
                          ${$?Z`
                            <button 
                              class="icon-button update-button" 
                              style="margin: 0 24px;"
                              @click=${()=>{e._selectedModuleTab=1,e._storeSearchQuery=n,e.requestUpdate()}} 
                              title="Update Module"
                            >
                              <ha-icon icon="mdi:arrow-up-circle-outline"></ha-icon>
                              Update
                            </button>
                          `:""}
                          <button class="icon-button" @click=${()=>function(e,t){e._originalModuleState=null;const n=a.Ki.get(t);n?(e._editingModule={id:t,...n},Ye(!0),e._editingModule.code||(e._editingModule.code=""),e._editingModule.editor&&"string"==typeof e._editingModule.editor&&(e._editingModule.editorReference=e._editingModule.editor,e._editingModule.editor=[]),"object"==typeof e._editingModule.editor?e._editingModule.editor_raw=Ee.Ay.dump(e._editingModule.editor):e._editingModule.editor_raw=e._editingModule.editor||"",e.requestUpdate(),setTimeout((()=>(0,Ce.XY)(e)),0)):console.error(`Module ${t} not found`)}(e,t)} title="Edit Module">
                            <ha-icon icon="mdi:pencil"></ha-icon>
                          </button>
                          ${ze&&ze(t)||"default"===t?"":Z`
                              <button class="icon-button" @click=${()=>async function(e,t){const n="sensor.bubble_card_modules",o=e.hass&&e.hass.states&&e.hass.states[n];if(confirm(`Are you sure you want to delete module "${t}"?`))try{a.Ki.delete(t);try{a.sq.delete(t)}catch(e){}document.dispatchEvent(new CustomEvent("yaml-modules-updated")),o&&await async function(e,t,n){try{const o=await e.hass.callApi("get",`states/${t}`);if(o){let t={};if(o.attributes&&o.attributes.modules)try{t="string"==typeof o.attributes.modules?JSON.parse(o.attributes.modules):o.attributes.modules}catch(e){console.warn("Error parsing modules from Home Assistant:",e)}t&&"object"==typeof t||(t={}),delete t[n],e.hass.callWS({type:"fire_event",event_type:"bubble_card_update_modules",event_data:{modules:t,last_updated:(new Date).toISOString()}}).catch((e=>{console.error("Error firing event:",e)}))}}catch(e){console.error("Error updating Home Assistant entity:",e)}}(e,n,t),e._config&&e._config.modules&&(e._config.modules=e._config.modules.filter((e=>e!==t)),(0,s.rC)(e,"config-changed",{config:e._config}),qe(e)),We(e),Ye(!1)}catch(e){console.error("Error deleting module:",e)}finally{Ye(!1)}}(e,t)} title="Delete Module">
                                <ha-icon icon="mdi:delete"></ha-icon>
                              </button>
                            `}
                        </div>
                      </div>
                      <hr>

                      ${e._helpModuleId===t?Z`
                        <div class="bubble-info">
                          <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            Why "All cards" is disabled?
                          </h4>
                          <div class="content">
                            <p>Modules with custom editors cannot be applied globally. This feature is reserved for modules that only apply styles.</p>
                          </div>
                        </div>
                      `:""}

                      ${l.length>0?Z`
                          <h4 class="${b?"":"disabled"}">
                            <ha-icon icon="mdi:cog"></ha-icon>
                            Configuration
                          </h4>
                          <ha-form
                            class="${b?"":"disabled"}"
                            .hass=${e.hass}
                            .data=${_}
                            .schema=${k}
                            .computeLabel=${e._computeLabelCallback}
                            .disabled=${!b}
                            @value-changed=${n=>e._valueChangedInHaForm(n,t,l)}
                          ></ha-form>
                          <hr>
                        `:""}

                      <div class="bubble-info" style="display: ${r?"":"none"}">
                        <h4 class="bubble-section-title">
                          <ha-icon icon="mdi:information-outline"></ha-icon>
                            关于这个模块
                        </h4>
                        <div class="content">
                          ${Z`<span .innerHTML=${r}></span>`}
                        </div>
                      </div>

                      ${u||p||h?Z`
                          <h4 class="version module-version">
                            ${u?`由${u}创建`:""}
                            <span class="version-number">
                              ${p?Z`<a href="${p}" target="_blank" rel="noopener noreferrer">模块连接</a> • `:""}
                              ${h||""}
                            </span>
                          </h4>
                          `:""}
                    `))}
                  </div>
                </ha-expansion-panel>
              `}))}
          `}

          <hr>
          ${e._showNewModuleForm||e._editingModule||!o?"":Z`
          <div class="module-editor-buttons-container" style="display: flex;">
            <button class="icon-button" style="flex: 1;" @click=${()=>{e._showNewModuleForm=!0,e._showManualImportForm=!1,e._generateUniqueModuleId&&(e._newModuleTemplate.id=e._generateUniqueModuleId("my_module")),e._editingModule={...e._newModuleTemplate},e._config.modules||(e._config.modules=e._config.style_templates||[]),e._config.modules.includes(e._editingModule.id)||(e._config.modules=[...e._config.modules,e._editingModule.id],(0,s.rC)(e,"config-changed",{config:e._config})),e.requestUpdate(),setTimeout((()=>(0,Ce.XY)(e)),0)}}>
              <ha-icon icon="mdi:puzzle-plus"></ha-icon>
              新建模块
            </button>
            
            <button class="icon-button" style="flex: 1;" @click=${()=>{e._showManualImportForm=!0,e._showNewModuleForm=!1,e._manualYamlContent="",e.requestUpdate(),setTimeout((()=>(0,Ce.XY)(e)),0)}}>
              <ha-icon icon="mdi:code-json"></ha-icon>
              从YAML导入
            </button>
          </div>
          `}
        `}

        <div class="bubble-info">
          <h4 class="bubble-section-title">
            <ha-icon icon="mdi:information-outline"></ha-icon>
            模块
          </h4>
          <div class="content">
            <p>模块非常强大，是为卡片应用<a href="https://github.com/Clooos/Bubble-Card#styling" target="_blank" rel="noopener noreferrer">自定义样式</a>和<a href="https://github.com/Clooos/Bubble-Card#templates" target="_blank" rel="noopener noreferrer">JS模板</a>模板的最佳方式，无需一遍又一遍地复制粘贴相同的代码。</p>
            <p>这让你能够轻松统一修改所有卡片的样式，而对高级用户来说，还可以用真正的编辑器来修改或新增功能。</p>
            <p><b>就算你不擅长写代码</b>，也能在<b>模块商店</b>中查找并安装社区制作的模块。</p>
          </div>
        </div>
      </div>
    </ha-expansion-panel>
  `,c=Ge();return"sl-tab-group"===c?requestAnimationFrame((()=>{const n=e.shadowRoot?.getElementById(t);if(n&&"function"==typeof n.show){const t=void 0!==e._selectedModuleTab?e._selectedModuleTab.toString():"0";n.show(t)}})):"ha-tab-group"===c&&requestAnimationFrame((()=>{const n=e.shadowRoot?.getElementById(t);if(!n)return;const o=Ke[e._selectedModuleTab??0]??(e._selectedModuleTab??0).toString();"activePanel"in n&&(n.activePanel=o),n.setAttribute("active-panel",o)})),l}customElements.define("bubble-card-editor-zh",class extends ge{_previewStyleApplied=!1;_entityCache={};_cachedAttributeList=null;_cachedAttributeListEntity=null;_expandedPanelStates={};_moduleErrorCache={};_moduleCodeEvaluating=null;constructor(){super(),this._expandedPanelStates={}}setConfig(e){this._config={...e}}static get properties(){return{hass:{},_config:{}}}get _card_type(){return this._config?.card_type||""}get _button_type(){return this._config?.button_type||("pop-up"===this._config?.card_type?"":"switch")}get _entity(){return this._config?.entity||""}get _selectable_attributes(){return["source_list","sound_mode_list","hvac_modes","fan_modes","swing_modes","preset_modes","effect_list"]}updated(e){super.updated(e),e.has("hass")&&(this.listsUpdated=!1,this._entityCache={},this._cachedAttributeList=null,this._cachedAttributeListEntity=null)}async firstUpdated(e){if(super.firstUpdated(e),this.hass&&this.hass.loadFragmentTranslation)try{await this.hass.loadFragmentTranslation("config")}catch(e){console.error("Bubble Card Editor: Failed to load 'config' fragment translation",e)}}disconnectedCallback(){super.disconnectedCallback?.();try{this._errorListener&&(window.removeEventListener("bubble-card-error",this._errorListener),this._errorListener=null)}catch(e){}try{this._moduleChangeHandler&&(window.removeEventListener("bubble-card-modules-changed",this._moduleChangeHandler),window.removeEventListener("bubble-card-module-updated",this._moduleChangeHandler),document.removeEventListener("yaml-modules-updated",this._moduleChangeHandler),this._moduleChangeHandler=null,this._moduleChangeListenerAdded=!1)}catch(e){}try{this._storeAutoRefreshTimer&&(clearInterval(this._storeAutoRefreshTimer),this._storeAutoRefreshTimer=null)}catch(e){}try{this._progressInterval&&(clearInterval(this._progressInterval),this._progressInterval=null)}catch(e){}try{this._editorSchemaDebounce&&(clearTimeout(this._editorSchemaDebounce),this._editorSchemaDebounce=null)}catch(e){}}render(){if(!this.hass)return Z``;if(!this._previewStyleApplied){const e=document.querySelector("body > home-assistant"),t=e?.shadowRoot?.querySelector("hui-dialog-edit-card")?.shadowRoot?.querySelector("ha-dialog > div.content > div.element-preview");t?.style&&"sticky"!==t.style.position&&(t.style.position="sticky",t.style.top="0",t.style.height="calc(100vh - 224px)",t.style.overflowY="auto",this._previewStyleApplied=!0)}this.listsUpdated||(this._initializeLists(),this.listsUpdated=!0);const e=this.cardTypeList;switch(this.buttonTypeList,this._config?.card_type){case"pop-up":return function(e){const t=e._config?.trigger??[];if(e._config.button_action,2===Object.keys(e._config).length&&"pop-up"===e._config.card_type){const t={...e._config};let n=!1;return setTimeout((()=>{n=!window.popUpError,function(e,t){if(!e.shadowRoot)return;const n=e.shadowRoot.querySelector("#vertical-stack-alert-container");n&&(n.style.display=t?"block":"none");const o=e.shadowRoot.querySelector(".icon-button ha-icon");o&&(o.icon=t?"mdi:content-save":"mdi:plus");const i=e.shadowRoot.querySelector("#button-text");i&&(i.textContent=t?"更新锚点标识":"创建弹出面板");const a=e.shadowRoot.querySelector("#include-example");a&&(a.disabled=t);const r=e.shadowRoot.querySelector(".mdc-form-field .mdc-label");r&&(r.textContent="包含示例配置"+(t?"（已禁用，因为弹出面板已经位于一个垂直堆叠中）":""))}(e,n)}),0),e.createPopUpConfig=()=>function(e,t){try{const t=!window.popUpError,n=e.shadowRoot.querySelector("#include-example")?.checked||!1;let o="#pop-up-name";const i=e.shadowRoot.querySelector("#hash-input");if(i&&i.value&&(o=i.value),t)return e._config.hash=o,(0,s.rC)(e,"config-changed",{config:e._config}),void console.info("弹出面板已位于一个垂直堆叠中，锚点标识已更新。请注意：现在已经不需要手动创建垂直堆叠了。");if(n){const t=function(e,t="light",n=2){const o=[];return e&&e.states?(Object.keys(e.states).forEach((i=>{if(!(o.length>=n)&&i.startsWith(t+".")){let t=!1;"brightness"in e.states[i].attributes&&(t=!0),o.push({entity:i,supportsBrightness:t})}})),o):o}(e.hass);e._config={type:"vertical-stack",cards:[{type:"custom:bubble-card",card_type:"pop-up",name:"客厅",icon:"mdi:sofa-outline",hash:o},{type:"custom:bubble-card",card_type:"separator",name:"灯光（示例）",icon:"mdi:lightbulb-outline"},{type:"horizontal-stack",cards:t.length>0?t.map((e=>({type:"custom:bubble-card",card_type:"button",button_type:e.supportsBrightness?"slider":"switch",entity:e.entity,show_state:!0}))):[{type:"custom:bubble-card",card_type:"button",button_type:"name",name:"落地灯",icon:"mdi:floor-lamp-outline"}]}]}}else e._config={type:"vertical-stack",cards:[{type:"custom:bubble-card",card_type:"pop-up",hash:o}]};(0,s.rC)(e,"config-changed",{config:e._config})}catch(n){console.error("创建弹出面板时出错：",n),e._config=t,e._config.hash=e.shadowRoot.querySelector("#hash-input")?.value||"#pop-up-name",(0,s.rC)(e,"config-changed",{config:e._config})}}(e,t),Z`
            <div class="card-config">
                ${e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
                <div id="vertical-stack-alert-container" style="display: none;">
                    <div class="bubble-info warning">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:alert-outline"></ha-icon>
                            检测到旧版配置
                        </h4>
                        <div class="content">
                            <p>这个弹出面板放在一个纵向堆叠中，这是之前的用法。现在不需要这样做，但依然可以正常使用。你只需要更新下面的锚点标识即可。</p>
                        </div>
                    </div>
                </div>
                <ha-textfield
                    label="锚点标识（例如#kitchen）"
                    .value="${e._config?.hash||"#pop-up-name"}"
                    id="hash-input"
                ></ha-textfield>
                <ha-formfield .label="包含示例配置">
                    <ha-switch
                        aria-label="包含示例配置"
                        .checked=${!1}
                        id="include-example"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">包含示例配置</label>
                    </div>
                </ha-formfield>
                
                <button class="icon-button" @click="${()=>e.createPopUpConfig()}">
                    <ha-icon icon="mdi:plus"></ha-icon>
                    <span id="button-text">创建弹出面板</span>
                </button>

                <hr />

                <div class="bubble-info">
                    <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        弹出面板
                    </h4>
                    <div class="content">
                        <p>弹出面板是整理仪表板、并在需要时快速显示更多信息的绝佳方式。</p>
                        <p>如果这是你第一次创建弹出面板，可以使用示例配置来快速上手。</p>
                    </div>
                </div>
                
                ${e.makeVersion()}
            </div>
        `}return Z`
        <div class="card-config">
            ${e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
            <ha-textfield
                label="锚点标识（例如#kitchen）"
                .value="${e._config?.hash||"#pop-up-name"}"
                .configValue="${"hash"}"
                @input="${e._valueChanged}"
            ></ha-textfield>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:dock-top"></ha-icon>
                  标头设置
                </h4>
                <div class="content">
                    <ha-formfield .label="显示标头">
                        <ha-switch
                            aria-label="显示标头"
                            .checked=${e._config.show_header??!0}
                            .configValue="${"show_header"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">显示标头</label> 
                        </div>
                    </ha-formfield>
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            隐藏标头
                        </h4>
                        <div class="content">
                            <p>你可以完全隐藏弹出窗口的标题栏，包括关闭按钮。隐藏后若要关闭弹窗，可以在弹窗内部执行长滑动手势，或点击弹窗外区域。</p>
                        </div>
                    </div>
                    <div style="${e._config?.show_header??1?"":"display: none;"}">
                        <hr />
                        ${ye(e)}
                    </div>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  弹出面板设置
                </h4>
                <div class="content">
                    <ha-textfield
                        label="自动关闭时间（毫秒，例如15000）"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="1000"
                        .value="${e._config?.auto_close||""}"
                        .configValue="${"auto_close"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                    <ha-textfield
                        label="滑动关闭距离（默认400）"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="10"
                        .value="${e._config.slide_to_close_distance??400}"
                        .configValue="${"slide_to_close_distance"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                    <ha-formfield .label="点击面板外时关闭弹出面板（刷新后生效）">
                        <ha-switch
                            aria-label="点击面板外时关闭弹出面板（刷新后生效）"
                            .checked=${e._config?.close_by_clicking_outside??!0}
                            .configValue="${"close_by_clicking_outside"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">点击面板外时关闭弹出面板（刷新后生效）</label> 
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="任意点击后关闭弹出面板">
                        <ha-switch
                            aria-label="任意点击后关闭弹出面板"
                            .checked=${e._config?.close_on_click||!1}
                            .configValue="${"close_on_click"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">任意点击后关闭弹出面板</label> 
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="在后台更新卡片（不推荐）">
                        <ha-switch
                            aria-label="在后台更新卡片（不推荐）"
                            .checked=${e._config?.background_update||!1}
                            .configValue="${"background_update"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">在后台更新卡片（不推荐）</label> 
                        </div>
                    </ha-formfield>
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            后台更新
                        </h4>
                        <div class="content">
                            <p>只有在你的弹出面板中某些卡片出现问题时，才建议启用后台更新。</p>
                        </div>
                    </div>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:bell"></ha-icon>
                  弹出面板触发器
                </h4>
                <div class="content">
                    <ha-formfield>
                        <ha-switch
                            .checked=${e._config.trigger_close??!0}
                            .configValue="${"trigger_close"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">条件不满足时关闭弹出面板</label> 
                        </div>
                    </ha-formfield>
                    <ha-card-conditions-editor
                        .hass=${e.hass}
                        .conditions=${t}
                        @value-changed=${t=>e._conditionChanged(t)}
                    >
                    </ha-card-conditions-editor>
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            关于条件
                        </h4>
                        <div class="content">
                            <p>只有所有条件都满足时，弹出面板才会被打开。例如，当有人出现在你家门口时，你可以自动打开一个带摄像头画面的“安防”弹出面板。</p>
                            <p>你也可以创建一个辅助量<code>input_boolean</code>，然后在自动化里控制它的开启/关闭来触发弹出面板。</p>
                        </div>
                    </div>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap"></ha-icon>
                  开启/关闭行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("开启行为",e._config,"none")}
                    ${e.makeActionPanel("关闭行为",e._config,"none")}
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            关于行为
                        </h4>
                        <div class="content">
                            <p>这可以让你在弹出面板打开或关闭时触发一个动作。</p>
                        </div>
                    </div>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:palette"></ha-icon>
                  样式
                </h4>
                <div class="content">
                    ${e.makeLayoutOptions()}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          弹出面板样式
                        </h4>
                        <div class="content"> 
                            <ha-textfield
                                label="边距（用于修复部分居中问题，如13px）"
                                .value="${e._config?.margin||"7px"}"
                                .configValue="${"margin"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="移动端顶部边距（例如标题栏隐藏时可设为-56px）"
                                .value="${e._config?.margin_top_mobile||"0px"}"
                                .configValue="${"margin_top_mobile"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="桌面端顶部边距（例如50vh用于半屏弹出面板）"
                                .value="${e._config?.margin_top_desktop||"0px"}"
                                .configValue="${"margin_top_desktop"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="桌面端宽度（移动端默认100%）"
                                .value="${e._config?.width_desktop||"540px"}"
                                .configValue="${"width_desktop"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="背景色（支持var、hex、rgb、rgba）"
                                .value="${e._config?.bg_color||""}"
                                .configValue="${"bg_color"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="背景透明度（0–100）"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .value="${void 0!==e._config?.bg_opacity?e._config?.bg_opacity:"88"}"
                                .configValue="${"bg_opacity"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="背景模糊（0–100）"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .value="${void 0!==e._config?.bg_blur?e._config?.bg_blur:"10"}"
                                .configValue="${"bg_blur"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="背景遮罩模糊（0–100）"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .value="${void 0!==e._config?.backdrop_blur?e._config?.backdrop_blur:"0"}"
                                .configValue="${"backdrop_blur"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="阴影透明度（0–100）"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .configValue="${"shadow_opacity"}"
                                .value="${void 0!==e._config?.shadow_opacity?e._config?.shadow_opacity:"0"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="隐藏弹出面板背景层（刷新后生效）">
                                <ha-switch
                                    aria-label="隐藏弹出面板背景层（刷新后生效）"
                                    .checked=${e._config.hide_backdrop??!1}
                                    .configValue="${"hide_backdrop"}"
                                    @change=${e._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">隐藏弹出面板背景层（刷新后生效）</label> 
                                </div>
                            </ha-formfield>
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:information-outline"></ha-icon>
                                    隐藏弹出面板背景层
                                </h4>
                                <div class="content">
                                    <p>这会隐藏弹出面板的背景遮罩，也就是弹出面板下面的深色覆盖层。</p>
                                    <p>你可以在仪表板上的第一个弹出面板中开启这个设置，这样所有弹出面板都会一并应用这个选项。</p>
                                    <p><b>如果你在打开或关闭弹出面板时遇到性能问题，建议启用此功能。</b></p>
                                </div>
                            </div>
                        </div>
                    </ha-expansion-panel>
                    ${e.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${e.makeModulesEditor()}
            <div class="bubble-info-container">
                <div class="bubble-info">
                    <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        如何使用弹出面板
                    </h4>
                    <div class="content">
                        <p>弹出面板默认是隐藏的，你可以通过触发它的锚点标识（例如#pop-up-name），使用任意支持“前往”动作的卡片来打开它。</p>
                        <p>你也可以观看这段<a href="https://www.youtube.com/watch?v=7mOV7BfWoFc" target="_blank" rel="noopener noreferrer">视频</a>，了解如何创建你的第一个弹出面板。（注意：视频内容已经过时，现在不需要添加垂直堆叠了。）</p>
                    </div>
                </div>
                
                <div class="bubble-info warning">
                    <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:alert-outline"></ha-icon>
                        重要提示
                    </h4>
                    <div class="content">
                        <p>为了避免与当前视图发生错位，请将这个卡片放在当前仪表板中，所有卡片的最后。你无法从其他页面中触发这个弹出面板。</p>
                        <p>如果页面加载时，弹出面板的内容会在屏幕上闪一下，可以安装<a href="https://github.com/Clooos/Bubble-Card#pop-up-initialization-fix" target="_blank" rel="noopener noreferrer">这个补丁</a>（推荐）。</p>
                    </div>
                </div>
            </div>
            ${e.makeVersion()}
      </div>
    `}(this);case"button":return ye(this);case"separator":return Z`
    <div class="card-config">
        ${(t=this).makeDropdown("卡片类型","card_type",t.cardTypeList)}
        <ha-textfield
            label="名称"
            .value="${t._config?.name||""}"
            .configValue="${"name"}"
            @input="${t._valueChanged}"
        ></ha-textfield>
        ${t.makeDropdown("图标","icon")}
        ${t.makeSubButtonPanel()}
        <ha-expansion-panel outlined>
            <h4 slot="header">
              <ha-icon icon="mdi:palette"></ha-icon>
              样式
            </h4>
            <div class="content">
                ${t.makeLayoutOptions()}
                ${t.makeStyleEditor()}
            </div>
        </ha-expansion-panel>
        ${t.makeModulesEditor()}
        <div class="bubble-info">
            <h4 class="bubble-section-title">
                <ha-icon icon="mdi:information-outline"></ha-icon>
                分隔线卡片
            </h4>
            <div class="content">
                <p>此卡片是一个简单的分隔线，用于将你的弹窗或仪表板划分为不同类别或区域，例如：灯光、设备、遮阳、设置、自动化等。</p>
            </div>
        </div>
        ${t.makeVersion()}
  </div>
`;case"horizontal-buttons-stack":return function(e){if(!e.buttonAdded)for(e.buttonAdded=!0,e.buttonIndex=0;e._config[e.buttonIndex+1+"_link"];)e.buttonIndex++;return Z`
        <div class="card-config">
            ${e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
            <div id="buttons-container">
                ${function(e){let t=[];for(let n=1;n<=e.buttonIndex;n++)t.push(Z`
            <div class="${n}_button">
                <ha-expansion-panel outlined>
                    <h4 slot="header">
                        <ha-icon icon="mdi:border-radius"></ha-icon>
                        按钮 ${n} ${e._config[n+"_name"]?"- "+e._config[n+"_name"]:""}
                        <div class="button-container">
                            <button class="icon-button header" @click="${()=>_e(e,n)}">
                              <ha-icon icon="mdi:delete"></ha-icon>
                            </button>
                        </div>
                    </h4>
                    <div class="content">
                        <ha-textfield
                            label="链接或弹出面板的锚点标识（例如#kitchen）"
                            .value="${e._config[n+"_link"]||""}"
                            .configValue="${n}_link"
                            @input="${e._valueChanged}"
                        ></ha-textfield>
                        <ha-textfield
                            label="名称（可选）"
                            .value="${e._config[n+"_name"]||""}"
                            .configValue="${n}_name"
                            @input="${e._valueChanged}"
                        ></ha-textfield>
                        <ha-icon-picker
                            label="图标（可选）"
                            .value="${e._config[n+"_icon"]||""}"
                            .configValue="${n}_icon"
                            item-label-path="label"
                            item-value-path="value"
                            @value-changed="${e._valueChanged}"
                        ></ha-icon-picker>
                        <ha-form
                            .hass=${e.hass}
                            .data=${e._config}
                            .schema=${[{name:n+"_entity",label:"灯光或灯光分组（可选，用于背景色）",selector:{entity:{}}}]}   
                            .computeLabel=${e._computeLabelCallback}
                            @value-changed=${e._valueChanged}
                        ></ha-form>
                        <ha-form
                            .hass=${e.hass}
                            .data=${e._config}
                            .schema=${[{name:n+"_pir_sensor",label:"存在或占用类型传感器（可选，用于按钮自动排序）",selector:{entity:{}}}]}   
                            .computeLabel=${e._computeLabelCallback}
                            @value-changed=${e._valueChanged}
                        ></ha-form>
                        <ha-alert alert-type="info">实际上，任何实体类型都可以实现自动排序。例如，你也可以把灯光分组填进去，排序会根据它们最近的状态变动自动调整。</ha-alert>
                    </div>
                </ha-expansion-panel>
            </div>
        `);return t}(e)}
            </div>
            <button class="icon-button" @click="${function(){e.buttonIndex++,e.requestUpdate()}}">
                <ha-icon icon="mdi:plus"></ha-icon>
                新建按钮
            </button>
            <hr>
            <ha-formfield .label="Auto order">
                <ha-switch
                    aria-label="Toggle auto order"
                    .checked=${e._config?.auto_order||!1}
                    .configValue="${"auto_order"}"
                    @change=${e._valueChanged}
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">自动排序（可选，需要存在或占用类型传感器）</label> 
                </div>
            </ha-formfield>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:palette"></ha-icon>
                  样式
                </h4>
                <div class="content">  
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          水平按钮组样式
                        </h4>
                        <div class="content"> 
                            <ha-textfield
                                label="外边距（可选，例如13px，用于修复一些居中问题）"
                                .value="${e._config?.margin||"7px"}"
                                .configValue="${"margin"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="桌面端宽度（可选，移动端默认为100%）"
                                .value="${e._config?.width_desktop||"540px"}"
                                .configValue="${"width_desktop"}"
                                @input="${e._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="上升动画（可选，页面加载后播放一次）">
                                <ha-switch
                                    aria-label="上升动画（可选，页面加载后播放一次）"
                                    .checked=${void 0===e._config?.rise_animation||e._config?.rise_animation}
                                    .configValue="${"rise_animation"}"
                                    @change=${e._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">上升动画（可选，页面加载后播放一次）</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="高亮当前锚点标识或视图（可选）">
                                <ha-switch
                                    aria-label="高亮当前锚点标识或视图（可选）"
                                    .checked=${e._config?.highlight_current_view||!1}
                                    .configValue="${"highlight_current_view"}"
                                    @change=${e._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">高亮当前锚点标识或视图（可选）</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="隐藏渐变（可选）">
                                <ha-switch
                                    aria-label="隐藏渐变（可选）"
                                    .checked=${e._config.hide_gradient||!1}
                                    .configValue="${"hide_gradient"}"
                                    @change=${e._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">隐藏渐变（可选）</label> 
                                </div>
                            </ha-formfield>
                        </div>
                    </ha-expansion-panel>
                    ${e.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${e.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    水平按钮组卡片
                </h4>
                <div class="content">
                    <p>这个卡片是弹出面板卡片的好搭档，可以用来打开弹窗，或跳转到你的仪表板中的任意页面。此外，你还可以添加传感器，让按钮的排序自动调整。这个卡片可滚动、始终可见，并作为页脚使用。</p>
                </div>
            </div>
            ${e.makeVersion()}
        </div>
    `}(this);case"cover":return function(e){let t=e._config.button_action||"";return Z`
        <div class="card-config">
            ${e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
            <ha-form
                .hass=${e.hass}
                .data=${e._config}
                .schema=${[{name:"entity",label:"实体",selector:{entity:{domain:["cover"]}}}]}   
                .computeLabel=${e._computeLabelCallback}
                @value-changed=${e._valueChanged}
            ></ha-form>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  卡片设置
                </h4>
                <div class="content"> 
                    <ha-textfield
                        label="名称（可选）"
                        .value="${e._config?.name||""}"
                        .configValue="${"name"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                    ${e.makeDropdown("开启图标（可选）","icon_open")}
                    ${e.makeDropdown("闭合图标（可选）","icon_close")}
                    ${e.makeShowState()}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:window-shutter-cog"></ha-icon>
                  自定义服务
                </h4>
                <div class="content"> 
                    <ha-textfield
                        label="开启时服务（可选，默认为cover.open_cover）"
                        .value="${e._config?.open_service||"cover.open_cover"}"
                        .configValue="${"open_service"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                    <ha-textfield
                        label="停止时服务（可选，默认为cover.stop_cover）"
                        .value="${e._config?.stop_service||"cover.stop_cover"}"
                        .configValue="${"stop_service"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                    <ha-textfield
                        label="闭合时服务（可选，默认为cover.close_cover）"
                        .value="${e._config?.close_service||"cover.close_cover"}"
                        .configValue="${"close_service"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap"></ha-icon>
                  图标点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为")}
                    ${e.makeActionPanel("双击行为")}
                    ${e.makeActionPanel("长按行为")}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
                卡片点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为",t,"none","button_action")}
                    ${e.makeActionPanel("双击行为",t,"none","button_action")}
                    ${e.makeActionPanel("长按行为",t,"none","button_action")}
                </div>
            </ha-expansion-panel>
            ${e.makeSubButtonPanel()}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:palette"></ha-icon>
                  样式
                </h4>
                <div class="content"> 
                    ${e.makeLayoutOptions()}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          遮阳设备样式
                        </h4>
                        <div class="content"> 
                            ${e.makeDropdown("下箭头图标（可选）","icon_down")}
                            ${e.makeDropdown("上箭头图标（可选）","icon_up")}
                        </div>
                    </ha-expansion-panel>
                    ${e.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${e.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    遮阳设备卡片
                </h4>
                <div class="content">
                    <p>这个卡片用于控制你的遮阳设备，例如卷帘、百叶窗、遮阳篷、升降门等。</p>
                </div>
            </div>
            ${e.makeVersion()}
        </div>
    `}(this);case"media-player":return function(e){let t=e._config.button_action||"";return Z`
        <div class="card-config">
            ${e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
            <ha-form
                .hass=${e.hass}
                .data=${e._config}
                .schema=${[{name:"entity",label:"实体",selector:{entity:{domain:["media_player"]}}}]}   
                .computeLabel=${e._computeLabelCallback}
                @value-changed=${e._valueChanged}
            ></ha-form>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  卡片设置
                </h4>
                <div class="content"> 
                    <ha-textfield
                        label="名称（可选）"
                        .value="${e._config?.name||""}"
                        .configValue="${"name"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                    ${e.makeDropdown("图标（可选）","icon")}
                    ${e.makeShowState()}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:tune-variant"></ha-icon>
                媒体播放器设置
                </h4>
                <div class="content">
                    <ha-form
                        .hass=${e.hass}
                        .data=${e._config}
                        .schema=${[{type:"grid",flatten:!0,schema:[{name:"min_volume",label:"最小音量",selector:{number:{step:"any"}}},{name:"max_volume",label:"最大音量",selector:{number:{step:"any"}}}]}]}   
                        .computeLabel=${e._computeLabelCallback}
                        @value-changed=${e._valueChanged}
                    ></ha-form>
                    <ha-formfield .label="隐藏播放/暂停按钮（可选）">
                        <ha-switch
                            aria-label="隐藏播放/暂停按钮（可选）"
                            .checked=${e._config.hide?.play_pause_button||!1}
                            .configValue="${"hide.play_pause_button"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">隐藏播放/暂停按钮（可选）</label> 
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="隐藏音量按钮（可选）">
                        <ha-switch
                            aria-label="隐藏音量按钮（可选）"
                            .checked=${e._config.hide?.volume_button||!1}
                            .configValue="${"hide.volume_button"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">隐藏音量按钮（可选）</label>
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="隐藏下一曲按钮（可选）">
                        <ha-switch
                            aria-label="隐藏下一曲按钮（可选）"
                            .checked=${e._config.hide?.next_button||!1}
                            .configValue="${"hide.next_button"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">隐藏下一曲按钮（可选）</label>
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="隐藏上一曲按钮（可选）">
                        <ha-switch
                            aria-label="隐藏上一曲按钮（可选）"
                            .checked=${e._config.hide?.previous_button||!1}
                            .configValue="${"hide.previous_button"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">隐藏上一曲按钮（可选）</label>
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="隐藏开关按钮（可选）">
                        <ha-switch
                            aria-label="隐藏开关按钮（可选）"
                            .checked=${e._config.hide?.power_button}
                            .configValue="${"hide.power_button"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">隐藏开关按钮（可选）</label>
                        </div>
                    </ha-formfield>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap"></ha-icon>
                  图标点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为")}
                    ${e.makeActionPanel("双击行为")}
                    ${e.makeActionPanel("长按行为")}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
                卡片点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为",t,"none","button_action")}
                    ${e.makeActionPanel("双击行为",t,"none","button_action")}
                    ${e.makeActionPanel("长按行为",t,"none","button_action")}
                </div>
            </ha-expansion-panel>
            ${e.makeSubButtonPanel()}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:palette"></ha-icon>
                  样式
                </h4>
                <div class="content">
                    ${e.makeLayoutOptions()}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          媒体播放器样式
                        </h4>
                        <div class="content"> 
                            <ha-formfield .label="背景使用模糊的媒体封面（可选）">
                                <ha-switch
                                    aria-label="背景使用模糊的媒体封面（可选）"
                                    .checked=${e._config.cover_background??!1}
                                    .configValue="${"cover_background"}"
                                    @change=${e._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">背景使用模糊的媒体封面（可选）</label> 
                                </div>
                            </ha-formfield>
                        </div>
                    </ha-expansion-panel>
                    ${e.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${e.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    媒体播放器卡片
                </h4>
                <div class="content">
                    <p>这个卡片用于控制媒体播放器实体。</p>
                </div>
            </div>
            ${e.makeVersion()}
        </div>
    `}(this);case"empty-column":return function(e){return Z`
        <div class="card-config">
            ${e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    样式
                </h4>
                <div class="content">
                    ${e.makeLayoutOptions()}
                </div>
            </ha-expansion-panel>
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    空白占位卡片
                </h4>
                <div class="content">
                    <p>只是一个用于占位的卡片，会填充一块空白。</p>
                </div>
            </div>
            ${e.makeVersion()}
        </div>
    `}(this);case"select":return function(e){const t=e._config.entity,n=t?.startsWith("input_select")||t?.startsWith("select")||e._config.select_attribute,o=e.hass.states[t]?.attributes,i=e._selectable_attributes.some((e=>o?.[e])),a=Object.keys(e.hass.states[t]?.attributes||{}).map((n=>{let o=e.hass.states[t];return{label:e.hass.formatEntityAttributeName(o,n),value:n}})).filter((t=>e._selectable_attributes.includes(t.value)));let r=e._config.button_action||"";return Z`
        <div class="card-config">
            ${e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
            <ha-form
                .hass=${e.inputSelectList}
                .data=${e._config}
                .schema=${[{name:"entity",label:"实体",selector:{entity:{}}}]}   
                .computeLabel=${e._computeLabelCallback}
                @value-changed=${e._valueChanged}
            ></ha-form>
            ${i?Z`
                <div class="ha-combo-box">
                    <ha-combo-box
                        label="选单（来自属性）"
                        .value="${e._config.select_attribute}"
                        .items="${a}"
                        .configValue="${"select_attribute"}"
                        @value-changed="${e._valueChanged}"
                    ></ha-combo-box>
                </div>
            `:""}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  卡片设置
                </h4>
                <div class="content">                   
                    <ha-textfield
                        label="名称（可选）"
                        .value="${e._config?.name||""}"
                        .configValue="${"name"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                    ${e.makeDropdown("图标（可选）","icon")}
                    ${e.makeShowState()}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap"></ha-icon>
                  图标点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为")}
                    ${e.makeActionPanel("双击行为")}
                    ${e.makeActionPanel("长按行为")}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
                  按钮点击行为
                </h4>
                <div class="content">
                    <div style="${n?"opacity: 0.5; pointer-events: none;":""}">
                        ${e.makeActionPanel("单击行为",r,"none","button_action")}
                    </div>
                    ${e.makeActionPanel("双击行为",r,"none","button_action")}
                    ${e.makeActionPanel("长按行为",r,"none","button_action")}
                </div>
            </ha-expansion-panel>
            ${e.makeSubButtonPanel()}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:palette"></ha-icon>
                  样式
                </h4>
                <div class="content">
                    ${e.makeLayoutOptions()}
                    ${e.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${e.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    选单卡片
                </h4>
                <div class="content">
                    <p>这个卡片可以为你的实体提供一个带可选项目的选单：</p>
                    <ul class="icon-list">
                        <li><ha-icon icon="mdi:format-list-bulleted"></ha-icon>“输入选单”实体</li>
                        <li><ha-icon icon="mdi:form-dropdown"></ha-icon>“选单”实体</li>
                        <li><ha-icon icon="mdi:playlist-music"></ha-icon>带有“来源列表”的媒体播放器</li>
                        <li><ha-icon icon="mdi:speaker"></ha-icon>带有“音效模式列表”的媒体播放器</li>
                        <li><ha-icon icon="mdi:thermostat"></ha-icon>带有“空调模式”的空调实体</li>
                        <li><ha-icon icon="mdi:fan"></ha-icon>带有“风扇模式”的空调</li>
                        <li><ha-icon icon="mdi:air-conditioner"></ha-icon>带有“摆风模式”的空调实体</li>
                        <li><ha-icon icon="mdi:thermostat-auto"></ha-icon>带有“预设模式”的空调实体</li>
                        <li><ha-icon icon="mdi:lightbulb-group"></ha-icon>带有“效果列表”的灯光实体</li>
                    </ul>
                </div>
            </div>
            ${e.makeVersion()}
        </div>
    `}(this);case"climate":return function(e){let t=e._config.button_action||"";if("climate"===e._config.card_type&&!e.climateSubButtonsAdded&&e._config.entity){const t=e.hass.states[e._config.entity]?.attributes?.hvac_modes;e._config.sub_button&&0!==e._config.sub_button.length||(e._config.sub_button=[t?{name:"HVAC模式选单",select_attribute:"hvac_modes",state_background:!1,show_arrow:!1}:null].filter(Boolean)),e.climateSubButtonsAdded=!0}return Z`
        <div class="card-config">
        ${e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
        <ha-form
            .hass=${e.hass}
            .data=${e._config}
            .schema=${[{name:"entity",label:"实体",selector:{entity:{domain:["climate"]}}}]}   
            .computeLabel=${e._computeLabelCallback}
            @value-changed=${e._valueChanged}
        ></ha-form>
                                <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  卡片设置
                </h4>
                <div class="content">     
                    <ha-textfield
                        label="名称（可选）"
                        .value="${e._config?.name||""}"
                        .configValue="${"name"}"
                        @input="${e._valueChanged}"
                    ></ha-textfield>
                    ${e.makeDropdown("图标（可选）","icon")}
                    ${e.makeShowState()}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:tune-variant"></ha-icon>
                空调设置
                </h4>
                <div class="content">
                    <ha-form
                        .hass=${e.hass}
                        .data=${e._config}
                        .schema=${[{type:"grid",flatten:!0,schema:[{name:"min_temp",label:"最低温度",selector:{number:{step:"any"}}},{name:"max_temp",label:"最高温度",selector:{number:{step:"any"}}},{name:"step",label:"步进值",selector:{number:{step:"any"}}}]}]}   
                        .computeLabel=${e._computeLabelCallback}
                        .disabled="${"name"===e._config.button_type}"
                        @value-changed=${e._valueChanged}
                    ></ha-form>
                    ${e.hass.states[e._config.entity]?.attributes?.target_temp_low?Z`
                        <ha-formfield .label="Optional - Hide target temp low">
                            <ha-switch
                                aria-label="Optional - Hide target temp low"
                                .checked=${e._config.hide_target_temp_low}
                                .configValue="${"hide_target_temp_low"}"
                                @change=${e._valueChanged}
                            ></ha-switch>
                            <div class="mdc-form-field">
                                <label class="mdc-label">Optional - Hide target temp low</label> 
                            </div>
                        </ha-formfield>
                    `:""}
                    ${e.hass.states[e._config.entity]?.attributes?.target_temp_high?Z`
                        <ha-formfield .label="Optional - Hide target temp high">
                            <ha-switch
                                aria-label="Optional - Hide target temp high"
                                .checked=${e._config.hide_target_temp_high}
                                .configValue="${"hide_target_temp_high"}"
                                @change=${e._valueChanged}
                            ></ha-switch>
                            <div class="mdc-form-field">
                                <label class="mdc-label">Optional - Hide target temp high</label> 
                            </div>
                        </ha-formfield>
                    `:""}
                    <ha-formfield .label="隐藏温度控制（可选）">
                        <ha-switch
                            aria-label="隐藏温度控制（可选）"
                            .checked=${e._config.hide_temperature}
                            .configValue="${"hide_temperature"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">隐藏温度控制（可选）</label> 
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="开启时保持固定背景色（可选）">
                        <ha-switch
                            aria-label="开启时保持固定背景色（可选）"
                            .checked=${!0===e._config.state_color}
                            .configValue="${"state_color"}"
                            @change=${e._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">开启时保持固定背景色（可选）</label> 
                        </div>
                    </ha-formfield>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap"></ha-icon>
                  图标点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为")}
                    ${e.makeActionPanel("双击行为")}
                    ${e.makeActionPanel("长按行为")}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
                卡片点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为",t,"none","button_action")}
                    ${e.makeActionPanel("双击行为",t,"none","button_action")}
                    ${e.makeActionPanel("长按行为",t,"none","button_action")}
                </div>
            </ha-expansion-panel>
            ${e.makeSubButtonPanel()}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    样式
                </h4>
                <div class="content">
                    ${e.makeLayoutOptions()}
                    ${e.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${e.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    空调卡片
                </h4>
                <div class="content">
                    <p>这个卡片用于控制空调实体。你还可以添加一个子按钮，用来显示空调模式的下拉菜单（新建子按钮时，查看是否出现“选单”选项）。</p>
                </div>
            </div>
            ${e.makeVersion()}
        </div>
    `}(this);case"calendar":return function(e){return e._config.event_action||(e._config.event_action={tap_action:{action:"more-info"},double_tap_action:{action:"none"},hold_action:{action:"none"}}),Z`
        <div class="card-config">
            ${e.makeDropdown("卡片类型","card_type",e.cardTypeList)}
            <ha-form
                .hass=${e.hass}
                .data=${e._config}
                .schema=${[{name:"entities",title:"实体",selector:{calendar_entity:{}}}]}   
                .computeLabel=${e._computeLabelCallback}
                @value-changed=${e._valueChanged}
            ></ha-form>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  日历设置
                </h4>
                <div class="content">
                    <ha-form
                      .hass=${e.hass}
                      .data=${e._config}
                      .schema=${[{name:"limit",label:"限制",title:"限制",selector:{number:{step:1,min:1}}},{name:"show_end",label:"显示结束时间",title:"显示结束时间",selector:{boolean:{}}},{name:"show_progress",label:"显示进度",title:"显示进度",selector:{boolean:{}}},{name:"show_place",label:"显示地点",title:"显示地点",selector:{boolean:{}}},{name:"scrolling_effect",label:"文字滚动效果",title:"文字滚动效果",selector:{boolean:{}},default:!0}]}   
                      .computeLabel=${e._computeLabelCallback}
                      @value-changed=${e._valueChanged}
                    ></ha-form>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap"></ha-icon>
                  日期点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为",e._config,"none")}
                    ${e.makeActionPanel("双击行为")}
                    ${e.makeActionPanel("长按行为")}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
                  事件点击行为
                </h4>
                <div class="content">
                    ${e.makeActionPanel("单击行为",e._config.event_action,"none","event_action")}
                    ${e.makeActionPanel("双击行为",e._config.event_action,"none","event_action")}
                    ${e.makeActionPanel("长按行为",e._config.event_action,"none","event_action")}
                </div>
            </ha-expansion-panel>
            ${e.makeSubButtonPanel()}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:palette"></ha-icon>
                  样式
                </h4>
                <div class="content">
                    ${e.makeLayoutOptions()}
                    ${e.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${e.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    日历卡片
                </h4>
                <div class="content">
                    <p>这个卡片用于显示日历，并且支持滚动查看，让你能浏览更多的事件。</p>
                </div>
            </div>
            ${e.makeVersion()}
        </div>
    `}(this);case void 0:return Z`
                    <div class="card-config">
                        <div class="bubble-info">
                            <h4 class="bubble-section-title">
                                <ha-icon icon="mdi:information-outline"></ha-icon>
                                你需要先选择一个卡片类型
                            </h4>
                        </div>
                        ${this.makeDropdown("卡片类型","card_type",e)}
                        <img style="width: 100%; height: auto; border-radius: 24px;" src="https://raw.githubusercontent.com/Vanadiry/Bubble-Card-zh/main/.github/bubble-card.gif">
                        
                        <div class="bubble-info-container">
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:tag-text"></ha-icon>
                                    Bubble Card 中文 ${o}
                                </h4>
                                <div class="content">
                                    <p>如果你想了解此版本的更新内容，可以点击<a href="https://github.com/Vanadiry/Bubble-Card-zh/releases/tag/${o}" target="_blank" rel="noopener noreferrer"><b>这里</b></a>查看更新日志。</p>
                                </div>
                            </div>
                            
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:help-circle-outline"></ha-icon>
                                    资源与帮助
                                </h4>
                                <div class="content">
                                    <p>如果你遇到问题或有疑问，可以在GitHub文档中找到更多详情。你也可以通过以下链接获取有用的资源与帮助。</p>
                                    <div class="bubble-badges">
                                        <a href="https://github.com/Vanadiry/Bubble-Card-zh" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:github"></ha-icon>
                                            <span>文档</span>
                                        </a>
                                        <a href="https://github.com/Vanadiry/Bubble-Card-zh/issues" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:bug"></ha-icon>
                                            <span>问题反馈</span>
                                        </a>
                                        <a href="https://github.com/Clooos/Bubble-Card/discussions/categories/questions-about-config-custom-styles-and-templates" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:help"></ha-icon>
                                            <span>配置帮助</span>
                                        </a>
                                        <a href="https://github.com/Clooos/Bubble-Card/discussions/categories/share-your-custom-styles-templates-and-dashboards" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:wrench"></ha-icon>
                                            <span>共享示例</span>
                                        </a>
                                        <a href="https://community.home-assistant.io/t/bubble-card-a-minimalist-card-collection-for-home-assistant-with-a-nice-pop-up-touch/609678" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:home-assistant"></ha-icon>
                                            <span>HA 论坛</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:heart-outline"></ha-icon>
                                    支持原始项目
                                </h4>
                                <div class="content">
                                    <p>你好！我是Clooos，Bubble Card原始项目的开发者。我将大部分空闲时间都投入到这个项目中，希望它能做到最好。如果你喜欢我的工作，任何形式的捐赠都是支持我的好方式。</p>
                                    <p>另外，你也可以查看我的Patreon，获取独家的自定义样式、模板和模块。订阅大概是支持我、并让这个项目持续下去的最佳方式。</p>
                                    <div class="bubble-badges">
                                        <a href="https://www.buymeacoffee.com/clooos" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <div class="bmc-icon">
                                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"/>
                                                </svg>
                                            </div>
                                            <span>请我喝杯啤酒</span>
                                        </a>
                                        <a href="https://www.paypal.com/donate/?business=MRVBV9PLT9ZPL&no_recurring=0&item_name=Hi%2C+I%27m+Clooos+the+creator+of+Bubble+Card.+Thank+you+for+supporting+me+and+my+passion.+You+are+awesome%21+%F0%9F%8D%BB&currency_code=EUR" target="_blank" rel="noopener noreferrer" class="bubble-badge support-badge">
                                            <div class="paypal-icon">
                                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.016 19.198h-4.2a.562.562 0 0 1-.555-.65L5.093.584A.692.692 0 0 1 5.776 0h7.222c3.417 0 5.904 2.488 5.846 5.5-.006.25-.027.5-.066.747A6.794 6.794 0 0 1 12.071 12H8.743a.69.69 0 0 0-.682.583l-.325 2.056-.013.083-.692 4.39-.015.087zM19.79 6.142c-.01.087-.01.175-.023.261a7.76 7.76 0 0 1-7.695 6.598H9.007l-.283 1.795-.013.083-.692 4.39-.134.843-.014.088H6.86l-.497 3.15a.562.562 0 0 0 .555.65h3.612c.34 0 .63-.249.683-.585l.952-6.031a.692.692 0 0 1 .683-.584h2.126a6.793 6.793 0 0 0 6.707-5.752c.306-1.95-.466-3.744-1.89-4.906z"/>
                                                </svg>
                                            </div>
                                            <span>PayPal</span>
                                        </a>
                                        <a href="https://www.patreon.com/Clooos" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <div class="patreon-icon">
                                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.957 7.21c-.004-3.064-2.391-5.576-5.191-6.482-3.478-1.125-8.064-.962-11.384.604C2.357 3.231 1.093 7.391 1.046 11.54c-.039 3.411.302 12.396 5.369 12.46 3.765.047 4.326-4.804 6.068-7.141 1.24-1.662 2.836-2.132 4.801-2.618 3.376-.836 5.678-3.501 5.673-7.031Z"/>
                                                </svg>
                                            </div>
                                            <span>Patreon</span>
                                        </a>
                                    </div>
                                    <div class="creator-message">
                                        <a href="https://www.reddit.com/user/Clooooos/" target="_blank" rel="noopener noreferrer">
                                            <img src="https://avatars.githubusercontent.com/u/36499953" alt="Clooos" class="creator-avatar">
                                        </a>
                                        <p class="bubble-thank-you">感谢你成为这个超棒社区的一员！来自比利时的敬意！🍻</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:translate"></ha-icon>
                                    关于翻译
                                </h4>
                                <div class="content">
                                    <p>我是翻译这个插件的Vanadiry！谢谢你用我翻译的版本，希望能让你的配置过程更加省力。这是我的<a href="https://vanadiry.com/" target="_blank" rel="noopener noreferrer">个人主页</a>，欢迎大家来玩！</p>
                                    <p>除了翻译，我只替换了一些类名，使得这个分支可以和原版共存。其他功能、操作逻辑等等，都是没有修改的。以及模块商店也用的是作者的仓库。<br />作者更新项目之后，我会在两天左右同步更新，所以你可以放心使用这个翻译分支。</p>
                                    <p>如果有关于翻译的问题，请在<a href="https://github.com/Vanadiry/Bubble-Card-zh" target="_blank" rel="noopener noreferrer">Vanadiry/Bubble-Card-zh</a>项目中提出。不要在原作者的仓库中提交关于此分支的翻译问题。</p>
                                    <div class="creator-message">
                                        <a href="https://vanadiry.com/" target="_blank" rel="noopener noreferrer">
                                            <img src="https://avatars.githubusercontent.com/u/77710715" alt="Vanadiry" class="creator-avatar">
                                        </a>
                                        <p class="bubble-thank-you">我是Vanadiry，为这个插件提供中文翻译！感谢Clooos带来的超好用工具！</p>
                                    </div>
                                </div>
                            </div>
                            ${this.makeVersion()}
                        </div>
                    </div>
                `}var t}makeLayoutOptions(){const e=window.isSectionView?"large":"normal",t="separator"===this._config.card_type?"0.8":"1",n="pop-up"!==this._config.card_type&&(this._config.card_layout?.includes("large")||window.isSectionView&&!this._config.card_layout);return Z`
            <ha-combo-box
                label="${"pop-up"===this._config.card_type?"卡片标头布局":"卡片布局"}"
                .value="${this._config.card_layout||e}"
                .configValue="${"card_layout"}"
                .items="${[{label:"普通（默认）",value:"normal"},{label:"更大",value:"large"},{label:"更大（扁的子按钮）",value:"large-2-rows"},{label:"更大（网格布局的子按钮，需要至少2行）",value:"large-sub-buttons-grid"}]}"
                @value-changed="${this._valueChanged}"
            ></ha-combo-box>
            ${this._renderConditionalContent(n,Z`
                <ha-textfield
                    label="行数"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    step="0.1"
                    .disabled="${this._config.grid_options?.rows}"
                    .value="${this._config.rows||this._config.grid_options?.rows||t}"
                    .configValue="${"rows"}"
                    @input="${this._valueChanged}"
                ></ha-textfield>
            `)}
            ${this._renderConditionalContent(this._config.grid_options?.rows,Z`
            <div class="bubble-info warning">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:alert-outline"></ha-icon>
                    行数已经在“布局”中设置了
                </h4>
                <div class="content">
                    <p>如果你想修改行数，可以在编辑器顶部的“布局”选项里调整。或者在YAML配置中删掉相关设置，以重新启用此选项。</p>
                </div>
            </div>
            `)}
        `}makeShowState(e=this._config,t="",n=!1,o){const i=e?.entity??this._config.entity??"",a="name"===this._config.button_type,r=i?.startsWith("input_select")||i?.startsWith("select")||e.select_attribute,s=e?.show_attribute?Object.keys(this.hass.states[i]?.attributes||{}).map((e=>{let t=this.hass.states[i];return{label:this.hass.formatEntityAttributeName(t,e),value:e}})):[];return Z`

            ${this._renderConditionalContent("sub_button"!==n,Z`
                <ha-formfield .label="文字滚动效果">
                    <ha-switch
                        aria-label="文字滚动效果"
                        .checked=${e?.scrolling_effect??!0}
                        .configValue="${t+"scrolling_effect"}"
                        @change="${n?e=>this._arrayValueChange(o,{scrolling_effect:e.target.checked},n):this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">文字滚动效果</label> 
                    </div>
                </ha-formfield>
            `)}
            ${this._renderConditionalContent("sub_button"===n,Z`
                <ha-formfield .label="Show background">
                    <ha-switch
                        aria-label="实体开启时显示背景"
                        .checked=${e?.show_background??!0}
                        @change="${e=>this._arrayValueChange(o,{show_background:e.target.checked},n)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">实体开启时显示背景</label> 
                    </div>
                </ha-formfield>
            `)}
            ${this._renderConditionalContent("sub_button"===n&&(e?.show_background??!0),Z`
                <ha-formfield .label="背景色随实体状态变化">
                    <ha-switch
                        aria-label="背景色随实体状态变化"
                        .checked=${e?.state_background??!0}
                        @change="${e=>this._arrayValueChange(o,{state_background:e.target.checked},n)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">背景色随实体状态变化</label> 
                    </div>
                </ha-formfield>
            `)}
            ${this._renderConditionalContent("sub_button"===n&&(e?.state_background??!0)&&i.startsWith("light"),Z`
                <ha-formfield .label="背景颜色随灯光颜色变化">
                    <ha-switch
                        aria-label="背景颜色随灯光颜色变化"
                        .checked=${e?.light_background??!0}
                        @change="${e=>this._arrayValueChange(o,{light_background:e.target.checked},n)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">背景颜色随灯光颜色变化</label> 
                    </div>
                </ha-formfield>
            `)}
            ${this._renderConditionalContent("sub_button"!==n&&i.startsWith("light"),Z`
                <ha-formfield .label="使用强调色替代灯光颜色">
                    <ha-switch
                        aria-label="使用强调色替代灯光颜色"
                        .checked=${e?.use_accent_color??!1}
                        .configValue="${t+"use_accent_color"}"
                        @change="${this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">使用强调色替代灯光颜色</label> 
                    </div>
                </ha-formfield>
            `)}
            <ha-formfield .label="显示图标">
                <ha-switch
                    aria-label="显示图标"
                    .checked=${e?.show_icon??!0}
                    .configValue="${t+"show_icon"}"
                    @change="${n?e=>this._arrayValueChange(o,{show_icon:e.target.checked},n):this._valueChanged}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示图标</label> 
                </div>
            </ha-formfield>
            ${this._renderConditionalContent("sub_button"!==n,Z`
                <ha-formfield .label="图标优先于实体图片">
                    <ha-switch
                        aria-label="图标优先于实体图片"
                        .checked=${e?.force_icon??!1}
                        .configValue="${t+"force_icon"}"
                        .disabled="${a}"
                        @change="${n?e=>this._arrayValueChange(o,{force_icon:e.target.checked},n):this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">图标优先于实体图片</label> 
                    </div>
                </ha-formfield>
            `)}
            <ha-formfield .label="显示名称">
                <ha-switch
                    aria-label="显示名称"
                    .checked=${!!(e?.show_name??"sub_button"!==n)}
                    .configValue="${t+"show_name"}"
                    @change="${n?e=>this._arrayValueChange(o,{show_name:e.target.checked},n):this._valueChanged}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示名称</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="显示实体状态">
                <ha-switch
                    aria-label="显示实体状态"
                    .checked="${e?.show_state??"state"===e.button_type}"
                    .configValue="${t+"show_state"}"
                    .disabled="${a&&"sub_button"!==n}"
                    @change="${n?e=>this._arrayValueChange(o,{show_state:e.target.checked},n):this._valueChanged}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示实体状态</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="显示最近变化时间">
                <ha-switch
                    aria-label="显示最近变化时间"
                    .checked=${e?.show_last_changed}
                    .configValue="${t+"show_last_changed"}"
                    .disabled="${a&&"sub_button"!==n}"
                    @change="${n?e=>this._arrayValueChange(o,{show_last_changed:e.target.checked},n):this._valueChanged}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示最近变化时间</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="显示最近更新时间">
                <ha-switch
                    aria-label="显示最近更新时间"
                    .checked=${e?.show_last_updated}
                    .configValue="${t+"show_last_updated"}"
                    .disabled="${a&&"sub_button"!==n}"
                    @change="${n?e=>this._arrayValueChange(o,{show_last_updated:e.target.checked},n):this._valueChanged}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示最近更新时间</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="显示属性">
                <ha-switch
                    aria-label="显示属性"
                    .checked=${e?.show_attribute}
                    .configValue="${t+"show_attribute"}"
                    .disabled="${a&&"sub_button"!==n}"
                    @change="${n?e=>this._arrayValueChange(o,{show_attribute:e.target.checked},n):this._valueChanged}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示属性</label> 
                </div>
            </ha-formfield>
            ${this._renderConditionalContent(e?.show_attribute,Z`
                <div class="ha-combo-box">
                    <ha-combo-box
                        label="要显示的属性"
                        .value="${e?.attribute}"
                        .configValue="${t+"attribute"}"
                        .items="${s}"
                        .disabled="${a&&"sub_button"!==n}"
                        @value-changed="${n?e=>this._arrayValueChange(o,{attribute:e.detail.value},n):this._valueChanged}"
                    ></ha-combo-box>
                </div>
            `)}
            ${this._renderConditionalContent("sub_button"===n&&r,Z`
                <ha-formfield .label="显示箭头（仅适用于选单实体）">
                    <ha-switch
                        aria-label="显示箭头（仅适用于选单实体）"
                        .checked=${e?.show_arrow??!0}
                        .configValue="${t+"show_arrow"}"
                        @change="${n?e=>this._arrayValueChange(o,{show_arrow:e.target.checked},n):this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">显示箭头（仅适用于菜单实体）</label> 
                    </div>
                </ha-formfield>
            `)}
        `}makeDropdown(e,t,n,o){if(e.includes("icon")||e.includes("Icon"))return Z`
                <div class="ha-icon-picker">
                    <ha-icon-picker
                        label="${e}"
                        .value="${this._config[t]}"
                        .configValue="${t}"
                        item-value-path="icon"
                        item-label-path="icon"
                        @value-changed="${this._valueChanged}"
                    ></ha-icon-picker>
                </div>
            `;if(e.includes("Entity")||e.includes("entity")){let n=[],i=[];switch(this._config.card_type){case"button":default:break;case"cover":n=["cover"];break;case"climate":n=["climate"];break;case"media-player":n=["media_player"];break;case"select":n=["input_select","select"],this._config.select_attribute&&(n=[])}return Z`
                <ha-entity-picker
                    label="${e}"
                    .hass="${this.hass}"
                    .value="${this._config[t]}"
                    .configValue="${t}"
                    .includeDomains="${n.length?n:void 0}"
                    .excludeDomains="${i.length?i:void 0}"
                    .disabled="${o}"
                    allow-custom-entity
                    @value-changed="${this._valueChanged}"
                ></ha-entity-picker>
            `}return Z`
            <div class="ha-combo-box">
                <ha-combo-box
                    label="${e}"
                    .value="${this["_"+t]}"
                    .configValue="${t}"
                    .items="${n}"
                    .disabled="${o}"
                    @value-changed="${this._valueChanged}"
                ></ha-combo-box>
            </div>
          `}_renderConditionalContent(e,t){return e?t:Z``}makeActionPanel(e,t=this._config,n,o,i=this._config){const a="单击行为"===e?"mdi:gesture-tap":"双击行为"===e?"mdi:gesture-double-tap":"长按行为"===e?"mdi:gesture-tap-hold":"mdi:gesture-tap",r="单击行为"===e?"tap_action":"双击行为"===e?"double_tap_action":"长按行为"===e?"hold_action":"开启行为"===e?"open_action":"close_action",s=o?`action_panel_${o}_${i}_${r}`:`action_panel_config_${r}`;let l;try{l="单击行为"===e?t.tap_action:"双击行为"===e?t.double_tap_action:"长按行为"===e?t.hold_action:"开启行为"===e?t.open_action:t.close_action}catch{}const c=t===this._config;return n||(n=c&&"单击行为"===e?"name"!==this._config.button_type?"more-info":"none":c?"none":""),Z`
            <ha-expansion-panel 
                outlined
                @expanded-changed=${e=>{this._expandedPanelStates[s]=e.target.expanded,this.requestUpdate()}}
            >
                <h4 slot="header">
                    <ha-icon icon="${a}"></ha-icon>
                    ${e}
                </h4>
                <div class="content"> 
                    ${$e(this,s,!!this._expandedPanelStates[s],(()=>Z`
                        <ha-form
                            .hass=${this.hass}
                            .data=${t}
                            .configValue="${(o?o+".":"")+(parseInt(i)==i?i+".":"")+r}" 
                            .schema=${[{name:r,label:e,selector:{ui_action:{default_action:n}}}]}  
                            .computeLabel=${this._computeLabelCallback}
                            @value-changed=${e=>this._ActionChanged(e,o,i)}
                        ></ha-form>
                        ${"call-service"===l?.action||"perform-action"===l?.action?Z`
                            <ha-formfield .label="使用默认实体">
                                <ha-switch
                                    aria-label="使用默认实体"
                                    .configValue="${(o?o+".":"")+(parseInt(i)==i?i+".":"")+r+".default_entity"}" 
                                    .checked=${"entity"===l?.target?.entity_id}
                                     @change=${this._updateActionsEntity}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">使用默认实体</label> 
                                </div>
                            </ha-formfield>
                        `:""}
                    `))}
                </div>
            </ha-expansion-panel>
        `}makeSubButtonPanel(){return function(e){void 0===e._expandedPanelStates&&(e._expandedPanelStates={});const t=e._config?.sub_button?.map(((t,n)=>{if(!t)return;const o="sub_button."+n+".",i=t.entity??e._config.entity,a=i?.startsWith("input_select")||i?.startsWith("select")||t.select_attribute,r=e.hass.states[i]?.attributes,s=e._selectable_attributes.some((e=>r?.[e])),l=Object.keys(e.hass.states[i]?.attributes||{}).map((t=>{let n=e.hass.states[i];return{label:e.hass.formatEntityAttributeName(n,t),value:t}})).filter((t=>e._selectable_attributes.includes(t.value))),c=t.visibility??[],d=`sub_button_main_${n}`,u=`sub_button_settings_${n}`,p=`sub_button_actions_${n}`,h=`sub_button_visibility_${n}`;return Z`
            <ha-expansion-panel 
                outlined
                @expanded-changed=${t=>{e._expandedPanelStates[d]=t.target.expanded,e.requestUpdate()}}
            >
                <h4 slot="header">
                    <ha-icon icon="mdi:border-radius"></ha-icon>
                    ${e._config.sub_button[n]?"子按钮 "+(n+1)+(t.name?" - "+t.name:""):"新建按钮"}
                    <div class="button-container">
                        <button class="icon-button header" @click="${t=>{t.stopPropagation();let o=[...e._config.sub_button];o.splice(n,1),e._config.sub_button=o,e._valueChanged({target:{configValue:"sub_button",value:o}}),e.requestUpdate()}}">
                            <ha-icon icon="mdi:delete"></ha-icon>
                        </button>
                        ${n>0?Z`<button class="icon-button header" @click="${t=>{if(t.stopPropagation(),n>0){let t=[...e._config.sub_button];[t[n],t[n-1]]=[t[n-1],t[n]],e._config.sub_button=t,e._valueChanged({target:{configValue:"sub_button",value:t}})}e.requestUpdate()}}">
                            <ha-icon icon="mdi:arrow-left"></ha-icon>
                        </button>`:""}
                        ${n<e._config.sub_button.length-1?Z`<button class="icon-button header" @click="${t=>{if(t.stopPropagation(),n<e._config.sub_button.length-1){let t=[...e._config.sub_button];[t[n],t[n+1]]=[t[n+1],t[n]],e._config.sub_button=t,e._valueChanged({target:{configValue:"sub_button",value:t}})}e.requestUpdate()}}">
                            <ha-icon icon="mdi:arrow-right"></ha-icon>
                        </button>`:""}
                    </div>
                </h4>
                <div class="content">
                    ${$e(e,d,!!e._expandedPanelStates[d],(()=>Z`
                        <ha-expansion-panel 
                            outlined
                            @expanded-changed=${t=>{e._expandedPanelStates[u]=t.target.expanded,e.requestUpdate()}}
                        >
                            <h4 slot="header">
                                <ha-icon icon="mdi:cog"></ha-icon>
                                按钮设置
                            </h4>
                            <div class="content">
                                ${$e(e,u,!!e._expandedPanelStates[u],(()=>Z` 
                                    <ha-form
                                        .hass=${e.hass}
                                        .data=${t}
                                        .schema=${[{name:"entity",label:"实体（可选，默认为此卡片主实体）",selector:{entity:{}}}]}   
                                        .computeLabel=${e._computeLabelCallback}
                                        @value-changed=${t=>e._arrayValueChange(n,t.detail.value,"sub_button")}
                                    ></ha-form>
                                    ${s?Z`
                                        <div class="ha-combo-box">
                                            <ha-combo-box
                                                label="选单（可选，来自属性）"
                                                .value="${t.select_attribute}"
                                                .items="${l}"
                                                @value-changed="${t=>e._arrayValueChange(n,{select_attribute:t.detail.value},"sub_button")}"
                                            ></ha-combo-box>
                                        </div>
                                    `:""}
                                    <div class="ha-textfield">
                                        <ha-textfield
                                            label="名称（可选）"
                                            .value="${t.name??""}"
                                            @input="${t=>e._arrayValueChange(n,{name:t.target.value},"sub_button")}"
                                        ></ha-textfield>
                                    </div>
                                    <div class="ha-icon-picker">
                                        <ha-icon-picker
                                            label="图标（可选）"
                                            .value="${t.icon}"
                                            item-label-path="label"
                                            item-value-path="value"
                                            @value-changed="${t=>e._arrayValueChange(n,{icon:t.detail.value},"sub_button")}"
                                        ></ha-icon-picker>
                                    </div>
                                `))}
                                ${e.makeShowState(t,o,"sub_button",n)}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel 
                            outlined 
                            @expanded-changed=${t=>{e._expandedPanelStates[p]=t.target.expanded,e.requestUpdate()}}
                        >
                            <h4 slot="header">
                                <ha-icon icon="mdi:gesture-tap"></ha-icon>
                                按钮点击行为
                            </h4>
                            <div class="content">
                                ${$e(e,p,!!e._expandedPanelStates[p],(()=>Z`
                                    <div style="${a?"opacity: 0.5; pointer-events: none;":""}">
                                        ${e.makeActionPanel("单击行为",t,"more-info","sub_button",n)}
                                    </div>
                                    ${e.makeActionPanel("双击行为",t,"none","sub_button",n)}
                                    ${e.makeActionPanel("长按行为",t,"none","sub_button",n)}
                                `))}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel 
                            outlined
                            @expanded-changed=${t=>{e._expandedPanelStates[h]=t.target.expanded,e.requestUpdate()}}
                        >
                            <h4 slot="header">
                                <ha-icon icon="mdi:eye"></ha-icon>
                            可见性
                            </h4>
                            <div class="content">
                                ${$e(e,h,!!e._expandedPanelStates[h],(()=>Z`
                                    <ha-formfield label="父实体不可用时隐藏">
                                        <ha-switch
                                            .checked=${t.hide_when_parent_unavailable??!1}
                                            @change=${t=>e._arrayValueChange(n,{hide_when_parent_unavailable:t.target.checked},"sub_button")}
                                        ></ha-switch>
                                    </ha-formfield>
                                    <ha-card-conditions-editor
                                        .hass=${e.hass}
                                        .conditions=${c}
                                        @value-changed=${t=>e._conditionChanged(t,n,"sub_button")}
                                    >
                                    </ha-card-conditions-editor>
                                    <ha-alert alert-type="info">
                                        只有在所有条件都满足时，子按钮才会显示。如果没有设置任何条件，子按钮始终显示。
                                    </ha-alert>
                                `))}
                            </div>
                        </ha-expansion-panel>
                    `))}
                </div>
            </ha-expansion-panel>
        `}));return Z`
        <ha-expansion-panel outlined>
            <h4 slot="header">
            <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
            子按钮
            </h4>
            <div class="content">
            ${t}
            <button class="icon-button" @click="${()=>{e._config.sub_button||(e._config.sub_button=[]);let t={entity:e._config.entity};e._config.sub_button=[...e._config.sub_button],e._config.sub_button.push(t),e._valueChanged({target:{configValue:"sub_button",value:e._config.sub_button}}),e.requestUpdate()}}">
                <ha-icon icon="mdi:plus"></ha-icon>
                新建子按钮
            </button>
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    子按钮
                </h4>
                <div class="content">
                    <p>这个编辑器允许你为卡片添加自定义子按钮。</p>
                    <p>如果与以下实体搭配使用，按钮还可以显示下拉菜单：</p>
                    <ul class="icon-list">
                        <li><ha-icon icon="mdi:format-list-bulleted"></ha-icon>“输入选单”实体</li>
                        <li><ha-icon icon="mdi:form-dropdown"></ha-icon>“选单”实体</li>
                        <li><ha-icon icon="mdi:playlist-music"></ha-icon>带有“来源列表”的媒体播放器</li>
                        <li><ha-icon icon="mdi:speaker"></ha-icon>带有“音效模式列表”的媒体播放器</li>
                        <li><ha-icon icon="mdi:thermostat"></ha-icon>带有“空调模式”的空调实体</li>
                        <li><ha-icon icon="mdi:fan"></ha-icon>带有“风扇模式”的空调/风扇实体</li>
                        <li><ha-icon icon="mdi:air-conditioner"></ha-icon>带有“摆风模式”的空调实体</li>
                        <li><ha-icon icon="mdi:thermostat-auto"></ha-icon>带有“预设模式”的空调实体</li>
                        <li><ha-icon icon="mdi:lightbulb-group"></ha-icon>带有“效果列表”的灯光实体</li>
                    </ul>
                </div>
            </div>
            </div>
        </ha-expansion-panel>
    `}(this)}makeVersion(){return Z`
            <h4 class="version">
                Bubble Card 中文
                <span class="version-number">
                    ${o}
                </span>
            </h4>
        `}makeStyleEditor(){const e="style_editor_panel";return Z`
            <ha-expansion-panel 
                outlined
                @expanded-changed="${t=>{this._expandedPanelStates[e]=t.target.expanded,this.requestUpdate()}}"
            >
                <h4 slot="header">
                    <ha-icon icon="mdi:code-braces"></ha-icon>
                    自定义样式与JS模板
                </h4>
                <div class="content">
                    ${$e(this,e,!!this._expandedPanelStates[e],(()=>Z`
                        <div class="code-editor">
                            <ha-code-editor
                                mode="yaml"
                                autofocus
                                autocomplete-entities
                                autocomplete-icons
                                .hass=${this.hass}
                                .value=${this._config.styles}
                                .configValue="${"styles"}"
                                @value-changed=${e=>{this._valueChanged(e),this._clearCurrentCardError()}}
                            ></ha-code-editor>
                        </div>
                        ${this.createErrorConsole()}
                    `))}
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            自定义样式与JS模板
                        </h4>
                        <div class="content">
                            <p>对于高级用户，你可以在上方的代码编辑器中编辑此卡片的CSS样式。更多信息和示例请点击<a href="https://github.com/Clooos/Bubble-Card#styling" target="_blank" rel="noopener noreferrer">这里</a>。不需要添加<code>styles: |</code>（仅在 YAML 模式中使用）。你也可以添加<a href="https://github.com/Clooos/Bubble-Card#templates" target="_blank" rel="noopener noreferrer">JS模板</a>（不支持Jinja）。</p>
                        </div>
                    </div>
                </div>
            </ha-expansion-panel>
        `}_clearCurrentCardError(){if(!window.bubbleCardErrorRegistry)return;const e=this._config?.card_type,t=this._config?.entity;if(!e||!t)return;const n=`${e}_${t}`;window.bubbleCardErrorRegistry[n]&&(delete window.bubbleCardErrorRegistry[n],this.errorMessage="",this.errorSource="",this.requestUpdate())}_clearCurrentModuleError(e){this._moduleCodeEvaluating=e,this.errorMessage="",this.errorSource="",this.requestUpdate()}createErrorConsole(e=this){window.bubbleCardErrorRegistry||(window.bubbleCardErrorRegistry={});const t=()=>{if(void 0!==e._editingModule&&e._editingModule){const t=e._editingModule.id;if(!t)return e.errorMessage="",void(e.errorSource="");let n=!1;window.bubbleCardErrorRegistry&&Object.values(window.bubbleCardErrorRegistry).forEach((o=>{o.moduleId===t&&(e.errorMessage=o.message,e.errorSource=o.source,n=!0)})),n||(e.errorMessage="",e.errorSource="")}else{const t=e._config?.card_type,n=e._config?.entity;if(!t||!n)return e.errorMessage="",void(e.errorSource="");const o=`${t}_${n}`;if(window.bubbleCardErrorRegistry&&window.bubbleCardErrorRegistry[o]){const t=window.bubbleCardErrorRegistry[o];e.errorMessage=t.message,e.errorSource=t.source}else e.errorMessage="",e.errorSource=""}e.requestUpdate()};return e._errorListener||(e._errorListener=e=>{const n=e.detail;if(n&&"object"==typeof n&&n.context){const{message:e,context:t}=n;if(e){if(t.cardType&&t.entityId){const n=`${t.cardType}_${t.entityId}`;window.bubbleCardErrorRegistry[n]={message:e,source:"module"===t.sourceType?`Module ('${t.moduleId}')`:"Card Configuration (styles section)",cardType:t.cardType,entityId:t.entityId,moduleId:"module"===t.sourceType?t.moduleId:null}}}else if("module"===t.sourceType&&t.moduleId)Object.keys(window.bubbleCardErrorRegistry).forEach((e=>{window.bubbleCardErrorRegistry[e]?.moduleId===t.moduleId&&delete window.bubbleCardErrorRegistry[e]}));else if(t.cardType&&t.entityId){const e=`${t.cardType}_${t.entityId}`;window.bubbleCardErrorRegistry[e]&&delete window.bubbleCardErrorRegistry[e]}}t()},window.addEventListener("bubble-card-error",e._errorListener)),t(),Z`
            <div class="bubble-info error" 
                style="display: ${e.errorMessage?"":"none"}; margin-bottom: 8px;">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                    JS模板错误
                </h4>
                <div class="content">
                    <p>${e.errorMessage}</p>
                    ${e._editingModule&&"object"==typeof e._editingModule&&e._editingModule.id?Z`<hr><span class="helper-text" style="margin: 0;">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        JS模板的错误有时会在模块编辑器里延迟显示。
                    </span>`:""}
                </div>
            </div>
        `}_getProcessedSchema(e,t,n){if(this._processedSchemas&&this._processedSchemas[e])return this._processedSchemas[e];const o=structuredClone(t),i=this._updateAttributeSelectors(o,n,e);return this._processedSchemas={...this._processedSchemas,[e]:i},i}_valueChangedInHaForm(e,t,n){let o=e.detail.value;if(o&&"object"==typeof o&&!Array.isArray(o)){const e=Object.keys(o);e.length>0&&e.every((e=>!isNaN(parseInt(e,10))))&&(o=e.sort(((e,t)=>parseInt(e,10)-parseInt(t,10))).map((e=>o[e])))}this._workingModuleConfigs&&(this._workingModuleConfigs[t]=o);const i=this._cleanEmpty(o,t),a=structuredClone(n),r=this._updateAttributeSelectors(a,i,t);this._processedSchemas={...this._processedSchemas,[t]:r},(0,s.rC)(this,"config-changed",{config:{...this._config,[t]:i}})}_cleanEmpty(e,t){if(Array.isArray(e))return e.map((e=>this._cleanEmpty(e,void 0))).filter((e=>!this._isEmpty(e)));if(e&&"object"==typeof e){const t={};return Object.keys(e).forEach((n=>{const o=this._cleanEmpty(e[n],n);this._isEmpty(o)||(t[n]=o)})),Object.keys(t).length>0?t:void 0}return"string"!=typeof e||""!==e||"state"===t?e:void 0}_isEmpty(e){return null==e||(Array.isArray(e)?0===e.length:"object"==typeof e&&0===Object.keys(e).length)}_updateAttributeSelectors=(e,t,n=void 0)=>e.map((e=>{e.selector&&e.selector.entity&&(n=t&&t.entity?t.entity:void 0),e.selector&&e.selector.attribute&&(e.selector.attribute.entity_id=n);const o=t&&t[e.name]?t[e.name]:t;return Array.isArray(e.schema)&&(e.schema=this._updateAttributeSelectors(e.schema,o,n)),e}));makeModulesEditor(){return et(this)}makeModuleStore(){return Ie(this)}_valueChanged(e){const t=e.target,n=e.detail;let o,i=!1;if("HA-SWITCH"===t.tagName?(o=t.checked,i=!0):void 0!==t.value?(o="string"==typeof t.value?t.value.replace(",","."):t.value,i=!0):void 0!==n?.value&&(i=!0),!i)return;if("string"==typeof o&&(o.endsWith(".")||"-"===o))return;let a={...this._config};try{const{configValue:i,checked:r}=t;if(i){const r=i.split(".");if(r.length>1){let i=a,s="";for(let e=0;e<r.length-1;e++){const t=r[e];s=s?`${s}.${t}`:t,i[t]||(i[t]={}),i[t]={...i[t]},i=i[t]}const l=r[r.length-1];"input"===e.type?i[l]=o:n&&i[l]!==n.value?i[l]=n.value:"HA-SWITCH"===t.tagName&&(i[l]=o)}else{const i=r[0];"input"===e.type?a[i]=o:n&&a[i]!==n.value?a[i]=n.value:"HA-SWITCH"===t.tagName&&(a[i]=o)}}else a=n.value}catch(e){if(t.configValue&&n)a[t.configValue]=n.value;else{if(!n)return;a=n.value}}this._config=a,(0,s.rC)(this,"config-changed",{config:a})}_arrayValueChange(e,t,n){if(this._config.sub_button&&!this.subButtonJustAdded)return this.subButtonJustAdded=!0,void setTimeout((()=>this._arrayValueChange(e,t,n)),10);this._config[n]=this._config[n]||[];let o=[...this._config[n]];o[e]=o[e]||{},o[e]={...o[e],...t},this._config[n]=o,(0,s.rC)(this,"config-changed",{config:this._config}),this.requestUpdate()}_ActionChanged(e,t,n){var o=!1;try{e.currentTarget&&e.currentTarget.__schema&&e.currentTarget.__schema[0]&&e.detail.value[e.currentTarget.__schema[0].name]&&e.detail.value[e.currentTarget.__schema[0].name].target&&e.detail.value[e.currentTarget.__schema[0].name].target.entity_id&&"entity"===e.detail.value[e.currentTarget.__schema[0].name].target.entity_id[0]&&(o=!0)}catch{}try{e.currentTarget&&e.currentTarget.__schema&&e.currentTarget.__schema[0]&&e.detail.value[e.currentTarget.__schema[0].name]&&e.detail.value[e.currentTarget.__schema[0].name].target&&"entity"===e.detail.value[e.currentTarget.__schema[0].name].target.entity_id&&(o=!0)}catch{}if(o&&e.currentTarget&&e.currentTarget.__schema&&e.currentTarget.__schema[0]&&e.detail.value[e.currentTarget.__schema[0].name]&&(e.detail.value[e.currentTarget.__schema[0].name].action="call-service",null!=e.detail.value[e.currentTarget.__schema[0].name].perform_action&&(e.detail.value[e.currentTarget.__schema[0].name].service=""+e.detail.value[e.currentTarget.__schema[0].name].perform_action,delete e.detail.value[e.currentTarget.__schema[0].name].perform_action)),"button_action"===t||"event_action"===t)this._config[t]=e.detail.value;else if(t){this._config[t]=this._config[t]||[];let o=[...this._config[t]];o[n]=e.detail.value,this._config[t]=o}else this._config=e.detail.value;(0,s.rC)(this,"config-changed",{config:this._config})}_updateActionsEntity(e){let t=JSON.parse(JSON.stringify(this._config));const n=e.target.configValue.split(".");let o=0;for(o=0;o<n.length-2;o++)t=t[n[o]]?t[n[o]]:{};e.target.checked?t[n[o]]?t[n[o]].target={entity_id:"entity"}:t[n[o]]={target:{entity_id:"entity"}}:t[n[o]]&&"entity"===t[n[o]].target?.entity_id&&(t[n[o]].target={});var i={value:t},a={__schema:[{name:n[n.length-2]}]},r={...e,detail:i,currentTarget:a};this._ActionChanged(r,n.length>2?n[0]:null,n.length>3?n[1]:null)}_computeLabelCallback=e=>e.label;_conditionChanged(e,t,n){if(e.stopPropagation(),n){this._config[n]=this._config[n]||[];let o=[...this._config[n]];o[t]=o[t]||{};const i=e.detail.value;o[t]={...o[t],visibility:i},this._config[n]=o}else if("pop-up"===this._config.card_type){const t=e.detail.value;this._config={...this._config,trigger:t}}(0,s.rC)(this,"config-changed",{config:this._config}),this.requestUpdate()}static get styles(){return b`
        ${h('div {\n  display: grid;\n  grid-gap: 12px;\n}\n\nha-combo-box[label="卡片类型"]::after {\n  content: "";\n  position: relative;\n  background-color: var(--background-color, var(--secondary-background-color));\n  display: block;\n  width: 100%;\n  height: 1px;\n  top: 12px;\n  margin-bottom: 12px !important;\n  opacity: 0.6;\n}\n\n#add-button {\n  margin: 0 0 14px 0;\n  color: var(--text-primary-color);\n  width: 100%;\n  height: 32px;\n  border-radius: 16px;\n  border: none;\n  background-color: var(--accent-color);\n  cursor: pointer;\n}\n\np {\n  margin-bottom: 4px;\n}\n\nul {\n  margin: 0px 14px !important;\n  padding-left: 0px !important;\n}\n\nha-icon, a, p, button, h4 {\n  color: var(--primary-text-color) !important;\n}\n\nhr {\n  display: inline-block;\n  width: 100%;\n  height: 1px;\n  border: none;\n  background-color: var(--outline-color);\n  margin: 8px 0 0 0;\n}\n\ncode, code-block {\n  background: rgba(0,120,180,0.3);\n  color: var(--primary-text-color);\n  background-blend-mode: darken;\n  padding: 1px 3px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n\ncode-block {\n  display: grid;\n  width: 100%;\n  padding: 0;\n  max-height: 285px;\n  overflow: auto;\n}\n\ncode-block pre {\n  white-space: pre;\n  overflow: auto;\n  margin: 8px;\n}\n\ncode-block.with-i pre {\n  white-space: pre-line;\n  overflow: auto;\n  margin: 8px;\n}\n\ncode-block.with-i pre > i {\n  white-space: pre;\n  font-style: normal;\n}\n\nimg {\n  max-width: 100%;\n  margin: 14px 0;\n}\n\nimg.example {\n  padding: 32px;\n  box-sizing: border-box;\n  background: rgba(0, 120, 180, 0.8);\n  border-radius: 6px;\n}\n\n.button-header {\n  height: auto;\n  width: 100%;\n  display: inline-flex;\n  align-items: center;\n  margin: 0 8px;\n}\n\n.button-number {\n  display: inline-flex;\n  width: auto;\n}\n\n.remove-button {\n  display: inline-flex;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  text-align: center;\n  line-height: 24px;\n  vertical-align: middle;\n  cursor: pointer;\n}\n\n.content {\n  margin: 12px 4px 14px 4px;\n}\n\nh4 > ha-icon {\n  margin: 8px 12px 8px 8px;\n}\n\nha-expansion-panel h4:not(.version) {\n  display: flex;\n  align-items: center;\n  margin: 10px 0;\n}\n\nha-form {\n  --expansion-panel-summary-padding: 2px 14px;\n}\n\nha-textfield {\n  width: 100%;\n}\n\nh3 {\n  margin: 4px 0;\n}\n\n.code-editor {\n  overflow: scroll;\n}\n\n.icon-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: rgba(0,120,180,0.5);\n  border: none;\n  cursor: pointer;\n  margin: 0;\n  border-radius: 32px;\n  font-size: 13px;\n  font-weight: bold;\n  text-align: center;\n  text-decoration: none;\n  transition: all 0.2s ease;\n}\n\n.icon-button:hover {\n  background: rgba(0,120,180,0.7);\n  transform: translateY(-1px);\n}\n\n.icon-button:active {\n  background: rgba(0,120,180,0.9);\n}\n\n.icon-button.header {\n  background: none;\n  padding: 0;\n  margin: 0 4px;\n}\n\n.button-container {\n  display: flex;\n  margin-left: auto !important;\n}\n\nha-card-conditions-editor {\n  margin-top: -12px;\n}\n\n.disabled {\n  opacity: 0.5; \n  pointer-events: none;\n}\n\n.version {\n  font-size: 12px !important;\n  color: #fff;\n  background: rgba(0,0,0,0.1);\n  padding: 8px 16px;\n  border-radius: 32px;\n}\n\n.module-version {\n  margin: 0;\n}\n\n.version-number {\n  font-size: 10px;\n  background: rgba(0,120,180,1);\n  padding: 0px 8px;\n  border-radius: 12px;\n  margin-right: -6px;\n  float: right;\n  color: white;\n}\n\n.version-number a {\n  color: white !important;\n}\n\n.bubble-info-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.bubble-section-title {\n  font-size: 14px;\n  font-weight: 600;\n  margin-bottom: -6px !important;\n  color: var(--primary-text-color) !important;\n  display: flex;\n  align-items: center;\n  position: relative;\n  padding-left: 4px;\n}\n\n.bubble-section-title ha-icon {\n  color: var(--info-color) !important;\n  margin: 8px 8px 8px 0;\n  line-height: normal !important;\n}\n\n.bubble-section-title::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  background: var(--primary-color);\n  border-radius: 2px;\n}\n\n.bubble-info {\n  padding: 0 0 14px;\n  position: relative;\n  overflow: auto;\n}\n\n.bubble-info .content {\n  margin: 0;\n  padding: 0 18px;\n}\n\n.bubble-info::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  background-color: var(--info-color);\n  border-radius: 4px;\n  opacity: 0.12;\n  pointer-events: none;\n}\n\n.bubble-info.warning::before {\n  background-color: var(--warning-color);\n  opacity: 0.15;\n}\n\n.bubble-info.warning .bubble-section-title::before {\n  background: var(--warning-color);\n}\n\n.bubble-info.warning .bubble-section-title ha-icon {\n  color: var(--warning-color) !important;\n}\n\n.bubble-info.error::before {\n  background-color: var(--error-color);\n  opacity: 0.15;\n}\n\n.bubble-info.error .bubble-section-title::before {\n  background: var(--error-color);\n}\n\n.bubble-info.error .bubble-section-title ha-icon {\n  color: var(--error-color) !important;\n}\n\n.bubble-info h4 {\n  margin: 8px 0 0 0;\n  padding: 0 18px;\n}\n\n.bubble-info p {\n  margin: 0;\n}\n\n.bubble-info * {\n  z-index: 1;\n}\n\n.bubble-section-title + p {\n  margin-top: 0;\n  padding-top: 0;\n}\n\n.bubble-badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 4px 0;\n  justify-content: flex-start;\n}\n\n.bubble-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 8px;\n  text-decoration: none;\n  font-size: 13px;\n  transition: all 0.2s ease;\n  box-shadow: none;\n  height: 26px;\n  border: none;\n  position: relative;\n  border-radius: 18px;\n  white-space: nowrap;\n  background-color: var(--mdc-text-field-disabled-line-color);\n}\n\n.bubble-badge:hover {\n  transform: translateY(-1px);\n  background: rgba(0, 120, 180, 0.5);\n}\n\n.bubble-badge ha-icon {\n  color: var(--primary-text-color) !important;\n  --mdc-icon-size: 16px;\n  line-height: normal;\n}\n\n.paypal-icon, .bmc-icon, .patreon-icon {\n  width: 15px;\n  height: 15px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.paypal-icon svg, .bmc-icon svg, .patreon-icon svg {\n  width: 100%;\n  height: 100%;\n  fill: var(--primary-text-color);\n}\n\n.bubble-thank-you {\n  margin: 0 !important;\n  padding: 8px !important;\n  opacity: 0.8;\n}\n\n.creator-message {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.creator-message a {\n  display: flex;\n  transition: all 0.2s ease;\n}\n\n.creator-message a:hover {\n  transform: scale(0.95);\n}\n\n.creator-avatar {\n  min-width: 42px;\n  height: 42px;\n  border-radius: 50%;\n  margin: 0;\n}\n\nul.icon-list {\n  list-style-type: none;\n  padding-left: 0 !important;\n  margin-left: 0 !important;\n}\n\nul.icon-list li {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  line-height: 24px;\n}\n\nul.icon-list li ha-icon {\n  min-width: 24px;\n  margin-right: 8px;\n  --mdc-icon-size: 18px;\n}:root {\n  --rgb-primary-color: 3, 169, 244;\n  --rgb-info-color: 33, 150, 243;\n  --rgb-warning-color: 255, 152, 0;\n  --rgb-error-color: 244, 67, 54;\n  --rgb-success-color: 76, 175, 80;\n}\n\n/* Module Store Styles */\n.module-store {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  position: relative;\n  padding-bottom: 40px;\n}\n\n.store-header {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 16px;\n  background-color: var(--card-background-color);\n  border-radius: 16px;\n  padding: 16px;\n  border: 1px solid var(--divider-color);\n  box-shadow: var(--shadow-elevation-1dp);\n  position: relative;\n  overflow: hidden;\n}\n\n.store-header-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n\n.store-header-title {\n  font-size: 16px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.store-header-title ha-icon {\n  color: var(--info-color) !important;\n}\n\n.store-refresh-button {\n  color: var(--primary-text-color);\n  border-radius: 50%;\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: var(--shadow-elevation-1dp);\n}\n\n.store-refresh-button:hover {\n  transform: rotate(180deg);\n  box-shadow: var(--shadow-elevation-2dp);\n}\n\n.store-search {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  border-radius: 32px;\n  overflow: hidden;\n}\n\n.store-search ha-textfield {\n  flex-grow: 1;\n}\n\n.store-filters {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 4px;\n}\n\n.store-filter-type {\n  flex-grow: 1;\n  min-width: 180px;\n}\n\n.store-modules {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.store-module-card {\n  display: flex;\n  flex-direction: column;\n  border-radius: 16px;\n  border: 1px solid var(--divider-color);\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  background-color: var(--card-background-color);\n  box-shadow: var(--shadow-elevation-1dp);\n  margin-bottom: 16px;\n}\n\n.store-module-card:hover {\n  transform: translateY(-3px);\n  box-shadow: var(--shadow-elevation-3dp);\n}\n\n.store-module-header {\n  position: relative;\n  padding: 16px 16px 0 0;\n  margin: 0;\n  border-radius: 0;\n  border-bottom: 1px solid var(--divider-color);\n}\n\n.store-module-header::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  background-color: var(--info-color);\n  border-radius: 0;\n  opacity: 0.12;\n  pointer-events: none;\n}\n\n.store-module-header.warning::before {\n  background-color: var(--warning-color);\n  opacity: 0.15;\n}\n\n.store-module-header .bubble-section-title {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding-left: 0;\n  margin-bottom: 0px !important;\n  position: relative;\n}\n\n.store-module-header .bubble-section-title::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  background: var(--primary-color);\n  border-radius: 0 2px 2px 0;\n}\n\n.store-module-header.warning .bubble-section-title::before {\n  background: var(--warning-color);\n}\n\n.store-module-header .bubble-section-title ha-icon {\n  margin: 0 0 0 19px;\n  color: var(--info-color) !important;\n}\n\n.store-module-header.warning .bubble-section-title ha-icon {\n  color: var(--warning-color) !important;\n}\n\n.store-module-header h3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.store-module-meta {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 0 4px 18px;\n  margin-bottom: 0;\n}\n\n.store-module-badges {\n  margin: 0;\n  justify-content: flex-start;\n}\n\n.store-module-author {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n  color: var(--secondary-text-color);\n}\n\n.author-avatar {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  margin: 0;\n  border: 1px solid rgba(0,0,0,0.1);\n}\n\n.store-module-content {\n  padding: 0 16px;\n  background-color: var(--card-background-color);\n  grid-gap: 8px;\n}\n\n.module-description {\n  margin: 0 0 -4px;\n  font-size: 14px;\n  font-weight: 300;\n}\n\n.module-preview-image {\n  border-radius: 12px;\n  max-height: 220px;\n  width: 100%;\n  object-fit: contain;\n  background-color: var(--secondary-background-color);\n  margin: 0;\n  transition: all 0.3s ease;\n}\n\n.module-preview-container {\n  position: relative;\n  margin-top: 8px;\n  overflow: hidden;\n  border-radius: 12px;\n}\n\n.module-preview-zoom-btn {\n  position: absolute;\n  bottom: 8px;\n  right: 8px;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background-color: var(--primary-color);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  opacity: 0.8;\n  transition: all 0.2s ease;\n  z-index: 5;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.2);\n}\n\n.module-preview-zoom-btn:hover {\n  opacity: 1;\n  transform: scale(1.1);\n}\n\n.module-preview-zoom-btn ha-icon {\n  color: white !important;\n  --mdc-icon-size: 20px;\n}\n\n.module-preview-fullscreen {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.9);\n  z-index: 999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: zoom-out;\n}\n\n.module-preview-fullscreen img {\n  max-width: 90%;\n  max-height: 90%;\n  object-fit: contain;\n  margin: 0;\n  border-radius: 6px;\n}\n\n.compatibility-warning {\n  margin-top: -8px;\n  margin-bottom: 12px;\n}\n\n.compatibility-warning ha-icon {\n  color: var(--warning-color) !important;\n}\n\n.store-module-actions {\n  margin: 12px 0 12px;\n  justify-content: flex-start;\n  border-top: 1px solid var(--divider-color);\n  padding-top: 12px;\n  display: flex;\n  gap: 8px;\n}\n\n.store-module-card.incompatible .store-module-actions {\n  opacity: 0.8;\n}\n\n.bubble-badge.install-button {\n  background-color: rgba(33, 150, 243, 0.7);\n  color: var(--primary-color);\n  font-weight: 500;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n}\n\n.bubble-badge.install-button span {\n  color: var(--primary-text-color);\n  font-weight: 500;\n  transition: color 0.2s ease;\n}\n\n.bubble-badge.install-button ha-icon {\n  transition: color 0.2s ease;\n}\n\n.bubble-badge.install-button:hover {\n  transform: translateY(-1px);\n  background-color: rgba(33, 150, 243, 0.9);\n}\n\n.bubble-badge.install-button:hover span,\n.bubble-badge.install-button:hover ha-icon {\n  color: white !important;\n}\n\n.bubble-badge.update-button {\n  background-color: rgb(0, 220, 80);\n  font-weight: 500;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n  color: rgba(0, 0, 0, 0.8) !important;\n}\n\n.bubble-badge.update-button ha-icon {\n  color: rgba(0, 0, 0, 0.8) !important;\n}\n\n.bubble-badge.update-button:hover {\n  transform: translateY(-1px);\n  background-color: rgb(0, 180, 60);\n}\n\n.bubble-badge.clickable {\n  cursor: pointer;\n}\n\n.bubble-badge.installed-button {\n  background-color: rgba(var(--rgb-success-color, 0, 170, 0), 0.12);\n  color: var(--success-color, var(--primary-color));\n  opacity: 0.8;\n  cursor: default;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.bubble-badge.installed-button span {\n  color: var(--primary-text-color);\n  font-weight: 500;\n}\n\n.bubble-badge.installed-button:hover {\n  transform: none;\n  background: rgba(var(--rgb-success-color, 0, 170, 0), 0.12);\n}\n\n.bubble-badge.link-button {\n  background-color: rgba(0, 0, 0, 0.06);\n  color: var(--secondary-text-color);\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.bubble-badge.link-button:hover {\n  background-color: rgba(0, 0, 0, 0.12);\n  transform: translateY(-1px);\n}\n\n.bubble-badge.update-badge {\n  background-color: rgb(0, 220, 80);\n  font-weight: 500;\n  font-size: 11px;\n  padding: 2px 8px;\n  height: 20px;\n  margin-left: auto !important;\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.bubble-badge.update-badge ha-icon {\n  color: rgba(0, 0, 0, 0.8) !important;\n}\n\n.bubble-badge.update-badge:hover {\n  transform: none;\n}\n\n.bubble-badge.version-badge {\n  background-color: rgba(0, 0, 0, 0.08);\n  color: var(--primary-text-color);\n  font-weight: 500;\n  font-size: 11px;\n  padding: 2px 8px;\n  height: 20px;\n}\n\n.bubble-badge.incompatible-badge {\n  background-color: rgba(var(--rgb-warning-color), 0.12);\n  color: var(--warning-color);\n  font-weight: 500;\n  font-size: 11px;\n  padding: 2px 8px;\n  height: 20px;\n}\n\n.bubble-badge.incompatible-badge::before {\n  background-color: var(--warning-color);\n  opacity: 0.3;\n}\n\n.bubble-badge.new-badge {\n  background-color: rgba(var(--rgb-success-color, 0, 170, 0), 0.12);\n  color: var(--primary-text-color);\n  font-weight: 500;\n  font-size: 11px;\n  padding: 2px 8px;\n  height: 20px;\n}\n\n.bubble-badge.new-badge::before {\n  background-color: var(--success-color, #28a745);\n  opacity: 0.2;\n}\n\n.bubble-badge.yaml-badge {\n  background-color: rgba(255, 167, 38, 0.45);\n  color: var(--primary-text-color);\n  font-weight: 700;\n  font-size: 11px;\n  padding: 2px 8px;\n  height: 20px;\n}\n\n.bubble-badge.yaml-badge::before {\n  background-color: #ff9800;\n  opacity: 0.5;\n}\n\n.version-container {\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  gap: 8px;\n}\n\n/* Material tabs */\nha-tabs, ha-tab-group, sl-tab-group {\n  margin-bottom: 16px;\n  --primary-tab-color: var(--primary-color);\n  --secondary-tab-color: var(--secondary-text-color);\n  border-bottom: 1px solid var(--divider-color);\n  top: 0;\n  position: sticky;\n  background-color: var(--card-background-color);\n  z-index: 6;\n  padding-top: 16px;\n  margin-top: -24px;\n  top: -40px;\n}\n\nsl-tab-group {\n  border-bottom: none;\n}\n\nha-tab-group {\n  display: block;\n}\n\nha-tab-group-tab {\n  flex-grow: 1;\n  text-align: center;\n}\n\nha-tab-group-tab[active] {\n  color: var(--primary-text-color);\n  opacity: 1;\n}\n\nha-tab-group-tab[disabled] {\n  opacity: 0.4;\n  pointer-events: none;\n}\n.module-editor-top-marker {\n  display: flex;\n  position: relative;\n  top: 0;\n}\n\npaper-tab {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 120px;\n  font-weight: 500;\n  font-size: 14px;\n  transition: all 0.3s ease;\n  position: relative;\n  color: var(--secondary-tab-color);\n  padding: 0 16px;\n  opacity: 0.8;\n}\n\npaper-tab[aria-selected="true"] {\n  color: var(--primary-text-color);\n  opacity: 1;\n}\n\npaper-tab.disabled,\npaper-tab[disabled] {\n  opacity: 0.4;\n  pointer-events: none;\n}\n\npaper-tab ha-icon {\n  margin-right: 8px;\n  color: var(--secondary-tab-color);\n}\n\npaper-tab[aria-selected="true"] ha-icon {\n  color: var(--primary-tab-color) !important;\n}\n\npaper-tab::after {\n  content: \'\';\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  width: 0;\n  height: 3px;\n  background-color: var(--primary-tab-color);\n  transition: all 0.3s ease;\n  transform: translateX(-50%);\n  border-radius: 3px 3px 0 0;\n  opacity: 0;\n}\n\npaper-tab[aria-selected="true"]::after {\n  width: 80%;\n  opacity: 1;\n}\n\npaper-tab:hover {\n  background-color: rgba(var(--rgb-primary-color), 0.05);\n}\n\n/* Tab ripple effect */\npaper-ripple {\n  color: var(--primary-tab-color);\n  opacity: 0.1;\n}\n\n#tabs {\n  border-radius: 8px 8px 0 0;\n  overflow: hidden;\n  background-color: var(--card-background-color);\n  box-shadow: var(--shadow-elevation-1dp);\n}\n\n@media (max-width: 600px) {\n  paper-tab {\n    min-width: auto;\n    padding: 0 12px;\n    font-size: 13px;\n  }\n}\n\nsl-tab {\n  flex: 1;\n  text-align: center;\n}\n\n.bubble-badge.hoverable {\n  cursor: pointer !important;\n  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;\n}\n\n.bubble-badge.hoverable:active {\n  transform: translateY(0);\n}\n\n/* Back to top button */\n.back-to-top-button {\n  position: sticky;\n  bottom: 0px;\n  right: 20px;\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background-color: var(--primary-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0,0,0,0.3);\n  transition: all 0.2s ease;\n  z-index: 10;\n  margin-left: auto;\n  margin-top: 16px;\n}\n\n.back-to-top-button:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 4px 10px rgba(0,0,0,0.3);\n}\n\n.back-to-top-button:active {\n  transform: translateY(0);\n  box-shadow: 0 1px 3px rgba(0,0,0,0.3);\n}\n\n.back-to-top-button ha-icon {\n  color: white !important;\n  --mdc-icon-size: 22px;\n}\n\n.store-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 42px;\n  gap: 24px;\n  position: relative;\n  background-color: var(--card-background-color);\n  border-radius: 16px;\n  border: 1px solid var(--divider-color);\n  box-shadow: var(--shadow-elevation-1dp);\n  overflow: hidden;\n}\n\n.bubble-loading-icon {\n  position: relative;\n  width: 64px;\n  height: 64px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n\n.icon-center-wrapper {\n  position: absolute;\n  top: 3px;\n  left: 6px;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2;\n}\n\n.bubble-loading-icon ha-icon {\n  --mdc-icon-size: 26px;\n  color: var(--primary-color);\n  opacity: 0.9;\n  animation: pulseAnimation 3s ease-in-out infinite;\n  margin: 0;\n  padding: 0;\n}\n\n.bubble-loading-orbit {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 2px dashed rgba(var(--rgb-primary-color), 0.2);\n  border-radius: 50%;\n  animation: orbitRotation 8s linear infinite;\n}\n\n.bubble-loading-satellite {\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  background-color: var(--info-color);\n  border-radius: 50%;\n  top: -6px;\n  left: calc(50% - 6px);\n  box-shadow: 0 0 10px rgba(var(--rgb-info-color), 0.7);\n  animation: pulseAnimation 2s ease-in-out infinite;\n  transform-origin: center center;\n}\n\n.bubble-progress-container {\n  width: 100%;\n  max-width: 400px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  position: relative;\n}\n\n.bubble-progress-track {\n  height: 10px;\n  background-color: rgba(var(--rgb-primary-color), 0.12);\n  border-radius: 10px;\n  overflow: hidden;\n  position: relative;\n  backdrop-filter: blur(4px);\n  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);\n  transition: all 0.3s ease;\n  transform: translateZ(0);\n  contain: paint;\n}\n\n.bubble-progress-bar {\n  background: var(--info-color);\n  border-radius: 10px;\n  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  min-width: 10px;\n}\n\n.bubble-progress-glow {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.bubble-progress-percentage {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 14px;\n  color: var(--primary-text-color);\n}\n\n.bubble-progress-text {\n  font-weight: 500;\n}\n\n.bubble-progress-value {\n  font-weight: 600;\n  color: var(--primary-color);\n  font-variant-numeric: tabular-nums;\n}\n\n.bubble-progress-dots {\n  display: flex;\n  gap: 4px;\n}\n\n.bubble-progress-dots .dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background-color: var(--primary-color);\n  opacity: 0.5;\n}\n\n.bubble-progress-dots .dot:nth-child(1) {\n  animation: dotAnimation 1.4s ease-in-out infinite;\n}\n\n.bubble-progress-dots .dot:nth-child(2) {\n  animation: dotAnimation 1.4s ease-in-out 0.2s infinite;\n}\n\n.bubble-progress-dots .dot:nth-child(3) {\n  animation: dotAnimation 1.4s ease-in-out 0.4s infinite;\n}\n\n@keyframes orbitRotation {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes pulseAnimation {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 0.9;\n  }\n  50% {\n    transform: scale(1.1);\n    opacity: 1;\n  }\n}\n\n@keyframes glowAnimation {\n  0% {\n    --x: 0%;\n    opacity: 0.5;\n  }\n  50% {\n    --x: 100%;\n    opacity: 1;\n  }\n  100% {\n    --x: 0%;\n    opacity: 0.5;\n  }\n}\n\n@keyframes dotAnimation {\n  0%, 100% {\n    transform: translateY(0);\n    opacity: 0.5;\n  }\n  50% {\n    transform: translateY(-4px);\n    opacity: 1;\n  }\n}\n\n/* Styles for the supported cards selector */\n.checkbox-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n  margin-bottom: 8px;\n}\n\n@media (max-width: 600px) {\n  .checkbox-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* Module Editor Styles */\n.module-actions {\n  display: flex;\n  gap: 8px;\n  margin-left: auto;\n}\n\n.module-editor-form .card-content {\n  display: grid;\n  grid-gap: 16px;\n  padding: 0;\n}\n\n.module-editor-form h3 {\n  margin: 8px 0;\n  color: var(--primary-text-color);\n  font-size: 18px;\n  font-weight: 500;\n}\n\n.module-editor-form h4:not(.bubble-section-title) {\n  margin: 0 !important;\n  font-size: 16px;\n}\n\n.module-editor-form ha-code-editor {\n  max-height: 600px;\n  border: 1px solid var(--divider-color);\n  border-radius: 4px;\n}\n\n.module-editor-form ha-textarea {\n  width: 100%;\n}\n\n.module-actions .icon-button {\n  width: 36px;\n  height: 36px;\n  border-radius: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n}\n\n.module-actions .icon-button {\n  background: none;\n}\n\n.module-actions .icon-button ha-icon {\n  --mdc-icon-size: 18px;\n}\n\n.code-editor-container, .editor-schema-container {\n  position: relative;\n  margin-bottom: 8px;\n  overflow: auto;\n}\n\n.code-editor-container ha-code-editor {\n  height: auto; \n  max-width: 100%;\n  border: 1px solid var(--divider-color);\n  border-radius: 4px;\n  overflow: auto;\n}\n\n.form-preview {\n  border: 1px solid var(--divider-color);\n  border-radius: 8px;\n  padding: 16px;\n}\n\n.form-preview h4 {\n  margin-top: 0;\n  margin-bottom: 16px;\n  color: var(--primary-color);\n  display: flex;\n  align-items: center;\n}\n\n.form-preview-container {\n  padding: 8px;\n  border-radius: 4px;\n}\n\n@keyframes pulse {\n  0% {\n    opacity: 0.7;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.7;\n  }\n}\n\n.export-section {\n  margin-top: 12px;\n}\n\n.export-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 8px;\n  margin-bottom: 16px;\n}\n\n.export-buttons .icon-button {\n  flex: 1;\n  min-width: 160px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 16px;\n}\n\n.export-preview {\n  margin-top: 12px;\n  padding: 8px;\n  border: 1px solid var(--divider-color);\n  border-radius: 8px;\n  max-height: 300px;\n  overflow: auto;\n  background: var(--secondary-background-color);\n}\n\n.export-preview pre {\n  margin: 0;\n  white-space: pre-wrap;\n  font-family: monospace;\n  font-size: 12px;\n  line-height: 1.4;\n  padding: 8px;\n}\n\nha-expansion-panel {\n  --input-fill-color: none;\n}\n\n@keyframes highlight {\n  0% { background-color: rgba(var(--rgb-primary-color), 0.2); }\n  100% { background-color: var(--secondary-background-color); }\n}\n\n.helper-text {\n  display: block;\n  color: var(--secondary-text-color);\n  font-size: 12px;\n  margin-top: -4px;\n  margin-bottom: 8px;\n}\n\n.helper-text a {\n  color: var(--primary-color);\n}\n\n.helper-text a:hover {\n  opacity: 0.8;\n}\n\n.bubble-info > div {\n  --mdc-icon-size: 18px;\n}\n\nha-formfield.apply-module-button {\n  height: 40px;\n  border-radius: 32px;\n  padding: 0 16px;\n  background-color: rgba(0, 0, 0, 0.1);;\n}\n\n.module-editor-buttons-container {\n  display: flex; \n  gap: 8px; \n  justify-content: flex-end;\n  position: sticky;\n  bottom: -24px;\n  background-color: var(--card-background-color);\n  padding: 8px 0;\n  z-index: 1;\n}\n\n.module-toggles-container {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.module-toggles-label {\n  font-size: 0.85em;\n  font-weight: 500;\n  color: var(--secondary-text-color);\n  padding-left: 4px;\n  margin-bottom: -4px;\n}\n\n.module-toggles {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n}\n\n.module-badges {\n  display: inline-flex;\n  margin-left: auto;\n  gap: 4px;\n}\n\n.module-badges .update-badge {\n  margin-left: 0 !important;\n  z-index: 7;\n}\n\n.global-badge {\n  background-color: transparent !important;\n  border: 1px solid rgb(0, 220, 80);\n  padding: 1px 3px !important;\n}\n\n.update-badge + .global-badge {\n  margin-left: 4px !important;\n}\n\n.toggle-badge {\n  cursor: pointer !important;\n  border: 1px solid var(--primary-text-color);\n}\n')}
    `}_initializeLists(){let e=[];0===Object.keys(this._entityCache).length?Object.keys(this.hass.states).forEach((t=>{const n=this.hass.states[t],o=t.split(".")[0];this._entityCache[o]||(this._entityCache[o]=[]),this._entityCache[o].push(t),this._selectable_attributes.some((e=>n.attributes?.[e]))&&(e.includes(t)||e.push(t))})):(["input_select","select"].forEach((t=>{this._entityCache[t]&&(e=[...e,...this._entityCache[t]])})),Object.keys(this.hass.states).forEach((t=>{const n=this.hass.states[t];this._selectable_attributes.some((e=>n.attributes?.[e]))&&(e.includes(t)||e.push(t))}))),["input_select","select"].forEach((t=>{this._entityCache[t]&&this._entityCache[t].forEach((t=>{e.includes(t)||e.push(t)}))})),e=[...new Set(e)];const t={};e.forEach((e=>{this.hass.states[e]&&(t[e]=this.hass.states[e])})),this.inputSelectList={...this.hass},this.inputSelectList.states=t,this._entity?this._entity===this._cachedAttributeListEntity&&this._cachedAttributeList?this.attributeList=this._cachedAttributeList:(this.attributeList=Object.keys(this.hass.states[this._entity]?.attributes||{}).map((e=>{let t=this.hass.states[this._entity];return{label:this.hass.formatEntityAttributeName(t,e),value:e}})),this._cachedAttributeList=this.attributeList,this._cachedAttributeListEntity=this._entity):(this.attributeList=[],this._cachedAttributeList=null,this._cachedAttributeListEntity=null),this.cardTypeList=[{label:"按钮（开关、滑块...）",value:"button"},{label:"日历",value:"calendar"},{label:"遮阳设备",value:"cover"},{label:"空调",value:"climate"},{label:"空白占位",value:"empty-column"},{label:"水平按钮组",value:"horizontal-buttons-stack"},{label:"媒体播放器",value:"media-player"},{label:"弹出面板",value:"pop-up"},{label:"选单",value:"select"},{label:"分隔线",value:"separator"}]}});const tt={hashRecentlyAdded:!1,scrollY:0,currentHash:null,hashChangeProtection:!1,isAnimating:!1,animationDuration:300,activePopups:new Set,entityTriggeredPopup:null};if(!window.__bubbleLocationDeduperAdded)try{let e=null,t=0,n=!1,o="",i=window.location.hash||"";window.addEventListener("location-changed",(()=>{const a=window.location.href,r=!!window.location.hash,s=a.split("#")[0];if(r)return e=s,t=Date.now(),n=!1,o=i||"",void(i=window.location.hash);if(n)return n=!1,e=null,o="",void(i=window.location.hash||"");if(e&&s===e&&Date.now()-t<1500&&!o)try{n=!0,history.back()}catch(e){}e=null,o="",i=window.location.hash||""})),window.__bubbleLocationDeduperAdded=!0}catch(Y){}const nt=new Set(["HA-DIALOG","HA-MORE-INFO-DIALOG","HA-DIALOG-DATE-PICKER"]);function ot(){return!(tt.hashRecentlyAdded||!location.hash||tt.hashChangeProtection||(setTimeout((()=>{if(tt.hashChangeProtection)return;const e=window.location.href.split("#")[0];history.replaceState(null,"",e),window.dispatchEvent(new Event("location-changed"))}),50),0))}function it(e){tt.hashChangeProtection=!0;const t=e.startsWith("#")?window.location.href.split("#")[0]+e:e;history.pushState(null,"",t),window.dispatchEvent(new Event("location-changed")),setTimeout((()=>{tt.hashChangeProtection=!1}),200)}function at(e,t){e.config.background_update?e.popUp.style.display="none":e.editor||(e.hideContentTimeout=setTimeout((()=>{const{sectionRow:t,sectionRowContainer:n}=e;"hui-card"===t?.tagName.toLowerCase()&&(t.hidden=!0,t.style.display="none",n?.classList.contains("card")&&(n.style.display="none"))}),t))}function rt(e,t){const{showBackdrop:n,hideBackdrop:o}=wt(e);t?n():o()}function st(e,t){e.config.background_update||(t?e.verticalStack.appendChild(e.popUp):t||e.config.background_update||e.verticalStack.contains(e.popUp)&&e.verticalStack.removeChild(e.popUp))}function lt(e,t){tt.isAnimating=!0,requestAnimationFrame((()=>{e.classList.toggle("is-popup-opened",t),e.classList.toggle("is-popup-closed",!t),setTimeout((()=>{tt.isAnimating=!1}),tt.animationDuration)}))}function ct(e,t){if(e.boundClickOutside||(e.boundClickOutside=t=>function(e,t){(t.config.close_by_clicking_outside??1)&&(e.composedPath().find((e=>!(!e.classList&&!e.nodeName)&&(e.classList?.contains("bubble-pop-up")||nt.has(e.nodeName))))||ot())}(t,e)),e.resetCloseTimeout||(e.resetCloseTimeout=()=>function(e){e.config.auto_close&&e.closeTimeout&&(clearTimeout(e.closeTimeout),e.closeTimeout=setTimeout(ot,e.config.auto_close))}(e)),!e.touchHandlersInitialized){const{handleTouchStart:t,handleTouchMove:n,handleTouchEnd:o}=function(e){if(!e.handleTouchStart){let t=0,n=0,o=!1;e.handleTouchStart=e=>{t=e.touches[0].clientY,n=t,o=!1},e.handleTouchMove=i=>{if(1!==i.touches.length)return;n=i.touches[0].clientY;const a=n-t;Math.abs(a)>10&&(o=!0,a>0&&(e.popUp.style.transform=`translateY(${a}px)`,i.preventDefault()))},e.handleTouchEnd=i=>{o&&(n-t>100?ot():e.popUp.style.transform="",o=!1)}}return{handleTouchStart:e.handleTouchStart,handleTouchMove:e.handleTouchMove,handleTouchEnd:e.handleTouchEnd}}(e);e.handleTouchStart=t,e.handleTouchMove=n,e.handleTouchEnd=o,e.touchHandlersInitialized=!0}t&&!e.editor?(e.listenersAdded||(e.config.auto_close&&(e.popUp.addEventListener("touchstart",e.resetCloseTimeout,{passive:!0}),e.popUp.addEventListener("click",e.resetCloseTimeout,{passive:!0})),e.popUp&&(e.handleTouchStart&&e.popUp.addEventListener("touchstart",e.handleTouchStart,{passive:!0}),e.handleTouchMove&&e.popUp.addEventListener("touchmove",e.handleTouchMove,{passive:!1}),e.handleTouchEnd&&e.popUp.addEventListener("touchend",e.handleTouchEnd,{passive:!0}),e.handleHeaderTouchMove&&e.elements?.header&&e.elements.header.addEventListener("touchmove",e.handleHeaderTouchMove,{passive:!0}),e.handleHeaderTouchEnd&&e.elements?.header&&e.elements.header.addEventListener("touchend",e.handleHeaderTouchEnd,{passive:!0}),e.closeOnEscape&&window.addEventListener("keydown",e.closeOnEscape,{passive:!0}),e.config.close_on_click?(e.popUp.addEventListener("click",ot,{passive:!0}),e.popUp.dataset.closeOnClick="true"):delete e.popUp.dataset.closeOnClick),e.listenersAdded=!0),e.clickOutsideListenerAdded||(window.addEventListener("click",e.boundClickOutside,{passive:!0}),e.clickOutsideListenerAdded=!0)):(e.listenersAdded&&((0,s.qo)(!1),e.config.auto_close&&(e.popUp.removeEventListener("touchstart",e.resetCloseTimeout),e.popUp.removeEventListener("click",e.resetCloseTimeout)),e.popUp&&(e.handleTouchStart&&e.popUp.removeEventListener("touchstart",e.handleTouchStart),e.handleTouchMove&&e.popUp.removeEventListener("touchmove",e.handleTouchMove),e.handleTouchEnd&&e.popUp.removeEventListener("touchend",e.handleTouchEnd),e.handleHeaderTouchMove&&e.elements?.header&&e.elements.header.removeEventListener("touchmove",e.handleHeaderTouchMove),e.handleHeaderTouchEnd&&e.elements?.header&&e.elements.header.removeEventListener("touchend",e.handleHeaderTouchEnd),e.closeOnEscape&&window.removeEventListener("keydown",e.closeOnEscape),e.config.close_on_click&&(e.popUp.removeEventListener("click",ot),delete e.popUp.dataset.closeOnClick)),e.listenersAdded=!1),e.clickOutsideListenerAdded&&(window.removeEventListener("click",e.boundClickOutside),e.clickOutsideListenerAdded=!1))}function dt(e){["hideContentTimeout","removeDomTimeout","closeTimeout"].forEach((t=>{e[t]&&(clearTimeout(e[t]),e[t]=null)}))}function ut(e,t=!1){(e.popUp.classList.contains("is-popup-opened")||t)&&(dt(e),tt.activePopups.delete(e),tt.entityTriggeredPopup===e&&(tt.entityTriggeredPopup=null),lt(e.popUp,!1),rt(e,!1),e.removeDomTimeout=setTimeout((()=>{st(e,!1),at(e,0),void 0!==tt.scrollY&&window.scrollTo(0,tt.scrollY)}),tt.animationDuration),ct(e,!1),(0,s.qo)(!1),e.config.close_action&&(0,i.VR)(e,e.config,"close_action"))}function pt(e){return()=>{if(e.config.hash===location.hash){if(tt.entityTriggeredPopup)return;if(tt.hashRecentlyAdded=!0,tt.currentHash=location.hash,tt.hashChangeProtection=!0,tt.entityTriggeredPopup)return void(tt.hashChangeProtection=!1);!function(e){const t=new Set(tt.activePopups);for(const n of t)n!==e&&ut(n,!0)}(e),setTimeout((()=>{tt.hashRecentlyAdded=!1,setTimeout((()=>{tt.hashChangeProtection=!1}),100)}),100),requestAnimationFrame((()=>{!function(e){if(e.popUp.classList.contains("is-popup-opened"))return;if(tt.activePopups.size>0&&tt.entityTriggeredPopup)return;dt(e),tt.scrollY=window.scrollY;const{popUp:t}=e;e.verticalStack.contains(t)||st(e,!0),tt.activePopups.add(e);const n=function(e){try{const{backdropElement:t}=wt(e),n=e.popUp,o=e.popUpBackground||n.querySelector(".bubble-pop-up-background");n&&n.style&&(n.style.willChange="transform"),t&&t.style&&(t.style.willChange="opacity, filter"),o&&o.style&&(o.style.willChange="backdrop-filter, -webkit-backdrop-filter");try{n.getBoundingClientRect()}catch(e){}try{t&&t.getBoundingClientRect()}catch(e){}try{if(o){const e=getComputedStyle(o);e.getPropertyValue("backdrop-filter"),e.getPropertyValue("-webkit-backdrop-filter")}}catch(e){}return()=>{try{n&&n.style&&(n.style.willChange="")}catch(e){}try{t&&t.style&&(t.style.willChange="")}catch(e){}try{o&&o.style&&(o.style.willChange="")}catch(e){}}}catch(e){return()=>{}}}(e);requestAnimationFrame((()=>{try{t.getBoundingClientRect()}catch(e){}requestAnimationFrame((()=>{lt(t,!0),function(e){if(e.config.background_update)return void(e.popUp.style.display="");const{sectionRow:t,sectionRowContainer:n,popUp:o}=e;o.style.transform="","hui-card"===t?.tagName.toLowerCase()&&(t.hidden=!1,t.style.display="",n?.classList.contains("card")&&(n.style.display=""))}(e),rt(e,!0),setTimeout((()=>{try{n()}catch(e){}t.classList.contains("is-popup-opened")&&tt.activePopups.has(e)&&((0,s.qo)(!0),ct(e,!0),e.config.auto_close>0&&(e.closeTimeout&&clearTimeout(e.closeTimeout),e.closeTimeout=setTimeout((()=>{!tt.activePopups.has(e)||e.config.hash!==location.hash&&e.config.hash?tt.activePopups.has(e)&&ut(e):ot()}),e.config.auto_close)),e.config.open_action&&(0,i.VR)(e.popUp,e.config,"open_action"))}),tt.animationDuration)}))}))}(e)}))}else requestAnimationFrame((()=>{e.config.hash&&e.config.hash!==location.hash&&ut(e)}))}}const ht=".bubble-backdrop {\n  position: fixed;\n  background-color: var(--bubble-backdrop-background-color, var(--bubble-default-backdrop-background-color));\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 4;\n  opacity: 0;\n  transition: opacity 0.3s;\n  transition-delay: .1s;\n  backdrop-filter: var(--bubble-backdrop-filter, var(--custom-backdrop-filter));\n  -webkit-backdrop-filter: var(--bubble-backdrop-filter, var(--custom-backdrop-filter));\n}\n\n.bubble-backdrop.is-visible {\n  opacity: 1;\n}\n\n.bubble-backdrop.is-hidden {\n  opacity: 0;\n  pointer-events: none;\n}\n";let bt,mt,gt,ft,vt=!1;const yt=window.matchMedia("(prefers-color-scheme: dark)");function _t(){ft=getComputedStyle(document.body).getPropertyValue("--ha-card-background")||getComputedStyle(document.body).getPropertyValue("--card-background-color"),document.body.style.setProperty("--bubble-default-backdrop-background-color",(0,r.Bz)(ft,.8,.6))}function wt(e){const t=e.config.hide_backdrop??!1;if(bt)return bt;const n=(0,s.n)("div","bubble-backdrop-host"),o=n.attachShadow({mode:"open"}),i=(0,s.n)("div","bubble-backdrop backdrop is-hidden");o.appendChild(i);const a=(0,s.n)("style");a.innerHTML=ht,o.appendChild(a);const r=(0,s.n)("style");o.appendChild(r),t&&(n.style.display="none",n.style.pointerEvents="none"),document.body.appendChild(n);const l=e.config.backdrop_blur??0;return parseFloat(l)>0?i.style.setProperty("--custom-backdrop-filter",`blur(${l}px)`):i.style.setProperty("--custom-backdrop-filter","none"),bt={hideBackdrop:function(){i.classList.add("is-hidden"),i.classList.remove("is-visible")},showBackdrop:function(){requestAnimationFrame((()=>{i.classList.add("is-visible"),i.classList.remove("is-hidden"),t||(n.style.display="",n.style.pointerEvents="")}))},backdropElement:i,backdropCustomStyle:r},bt}(0,s.n)("style"),yt.addEventListener("change",_t),_t();var xt=n(76),kt=n(87);function $t(e){let t="";const n=e._hass.states[e.config.entity],o=n.attributes.hvac_action,i=n.state,a="heating"===o||"heat"===i&&e.config.state_color,r="cooling"===o||"cool"===i&&e.config.state_color,s="off"!==i&&"unknown"!==i;switch(i){case"fan_only":t="var(--bubble-state-climate-fan-only-color, var(--state-climate-fan-only-color, var(--state-climate-active-color, var(--state-active-color))))";break;case"dry":t="var(--bubble-state-climate-dry-color, var(--state-climate-dry-color, var(--state-climate-active-color, var(--state-active-color))))";break;default:t=r?"var(--bubble-state-climate-cool-color, var(--state-climate-cool-color, var(--state-climate-active-color, var(--state-active-color))))":a?"var(--bubble-state-climate-heat-color, var(--state-climate-heat-color, var(--state-climate-active-color, var(--state-active-color))))":s&&e.config.state_color?"auto"===i?"var(--bubble-state-climate-auto-color, var(--state-climate-auto-color, var(--state-climate-active-color, var(--state-active-color))))":"heat_cool"===i?"var(--bubble-state-climate-heat-cool-color, var(--state-climate-heat-cool-color, var(--state-climate-active-color, var(--state-active-color))))":"var(--bubble-climate-accent-color, var(--bubble-accent-color, var(--accent-color)))":""}return t}function Ct(e,t){const n=e._hass,o=n?.states?.[e.config.entity],i="°C"===n?.config?.unit_system?.temperature,a=t??e.config.step??o?.attributes?.target_temp_step??(i?.5:1);return Number.isInteger(Number(a))?0:1}function St(e,t,n){const o=Ct(t,n),i=Number(e);return Number.isNaN(i)?"":i.toFixed(o)}function At(e){const t=e.config?.entity,n=e.card,o=e._hass.states[t],i=(0,s.D$)(e,e.config.attribute,t),a=o?.last_changed,r=o?.last_updated,l="state"===e.config.button_type,c=e.config.show_name??!0,d=e.config.show_icon??!0,u=e.config.show_state??l,p=e.config.show_attribute??l,h=e.config.show_last_changed??!1,b=e.config.show_last_updated??!1,m=e.config.scrolling_effect??!0,g=e.previousConfig||{};if(e.previousState===o&&e.previousAttribute===i&&e.previousLastChanged===a&&e.previousLastUpdated===r&&g.showName===c&&g.showIcon===d&&g.showState===u&&g.showAttribute===p&&g.showLastChanged===h&&g.showLastUpdated===b&&g.scrollingEffect===m)return;let f=o&&u?e._hass.formatEntityState(o):"",v="",y="",_="",w="";function x(e){return e.charAt(0).toUpperCase()+e.slice(1)}function k(e,t,n,o=!0){if(null==e)return"";const i=parseFloat(e);if(isNaN(i))return e;let a=0===i?"0":i.toFixed(t);return o&&(a=a.replace(/\.0$/,"")),a+" "+n}if(p&&i)if(e.config.attribute.includes("forecast")){const t="°C"===e._hass.config.unit_system.temperature,n="km"===e._hass.config.unit_system.length;v=e.config.attribute.includes("temperature")?o?k(i,1,t?"°C":"°F"):"":e.config.attribute.includes("humidity")?o?k(i,0,"%",!1):"":e.config.attribute.includes("precipitation")?o?k(i,1,"mm"):"":e.config.attribute.includes("wind_speed")?o?k(i,1,n?"km/h":"mph"):"":o?i:""}else v=o?e.config.attribute.includes("[")?i:e._hass.formatEntityAttributeValue(o,e.config.attribute)??i:"";h&&o&&(y=o?x((0,s.r6)(a,e._hass.locale.language)):""),b&&o&&(_=o?x((0,s.r6)(r,e._hass.locale.language)):""),w=[f,v,y,_].filter(Boolean).join(" • "),e.elements.name.classList.toggle("hidden",!c),e.elements.iconContainer.classList.toggle("hidden",!d),e.elements.nameContainer.classList.toggle("name-without-icon",!d),e.elements.state.classList.toggle("state-without-name",(u||h||b||p)&&!c),e.elements.state.classList.toggle("display-state",u||h||b||p),e.elements.state.classList.toggle("hidden",!(u||h||b||p)),(0,s.Nl)(e,e.elements.state,w),t===e.config.entity&&"state"!==e.config.button_type&&!o?.attributes?.unit_of_measurement?.includes("°")&&o&&((0,s.$C)(e,t)?n.classList.contains("is-on")||(n.classList.remove("is-off"),n.classList.add("is-on")):n.classList.contains("is-off")||(n.classList.remove("is-on"),n.classList.add("is-off"))),e.previousState=o,e.previousAttribute=i,e.previousConfig={showName:c,showIcon:d,showState:u,showAttribute:p,showLastChanged:h,showLastUpdated:b,scrollingEffect:m}}function Et(e){const t=(0,s.md)(e),n=e.config.card_type,o=e.config.button_type,i=(0,s.$C)(e),a=(0,kt.sW)(e),r=(0,kt.Qp)(e),l=e.config.use_accent_color,c=e.elements.iconContainer?.style.color,d=e.elements.image?.style.backgroundImage,u=e.elements.icon?.icon,p=e.elements.icon?.style.display,h=e.elements.image?.style.display,b="name"===o||"pop-up"===n&&!o;let m="inherit";if(i&&((0,s.md)(e,"light")&&!l||!b?m=`var(--bubble-icon-color, ${(0,kt.VA)(e)})`:"climate"===t&&(m=$t(e))),e.elements.iconContainer&&("inherit"!==m?c!==m&&(e.elements.iconContainer.style.color=m):""!==c&&(e.elements.iconContainer.style.color="")),""!==r){const t=`url(${r})`;d!==t&&(e.elements.image.style.backgroundImage=t),"none"!==p&&(e.elements.icon.style.display="none"),""!==h&&(e.elements.image.style.display="")}else""!==a?(u!==a&&(e.elements.icon.icon=a),e.elements.icon.style.color!==m&&(e.elements.icon.style.color=m),""!==p&&(e.elements.icon.style.display=""),"none"!==h&&(e.elements.image.style.display="none")):("none"!==p&&(e.elements.icon.style.display="none"),"none"!==h&&(e.elements.image.style.display="none"));e.elements.icon?.getAttribute("icon")!==e.elements.icon?.icon&&e.elements.icon.setAttribute("icon",e.elements.icon.icon)}function Lt(e,t=!0){const n="name"!==e.config.button_type?(0,s.mG)(e):e.config.name;n!==e.previousName&&e.elements.name&&(e.elements.name.innerText=n,e.previousName=n,t&&(0,s.Nl)(e,e.elements.name,n))}function Mt(e){"unavailable"===(0,s.Gu)(e)?e.card.classList.add("is-unavailable"):e.card.classList.remove("is-unavailable")}var Tt=n(198);function It(e){let t=e.config.button_type;return"custom"===t&&(console.error('Buttons "custom" have been removed. Use either "switch", "slider", "state" or  "name"'),t=""),e.config.entity?t||"switch":t||"name"}function Pt(e){const t=e.config.entity;return(0,s.md)(e,"sensor",t)&&"%"===(0,s.D$)(e,"unit_of_measurement",t)}let Ut=null;function Ot(e,t){if(void 0!==e.config.min_value)return parseFloat(e.config.min_value);const n=t.entity_id.split(".")[0];return"media_player"===n&&void 0!==e.config.min_volume?parseFloat(e.config.min_volume):"climate"===n?t.attributes.min_temp??0:t.attributes.min??0}function zt(e,t){if(void 0!==e.config.max_value)return parseFloat(e.config.max_value);const n=t.entity_id.split(".")[0];return"media_player"===n&&void 0!==e.config.max_volume?parseFloat(e.config.max_volume):"climate"===n?t.attributes.max_temp??1e3:t.attributes.max??100}function Vt(e,t,n=!1){const o=e.elements.rangeSlider.getBoundingClientRect();let i=Math.max(0,Math.min(100,(t-o.left)/o.width*100));i=function(e,t){if(!e._hass.states[e.config.entity])return t;let n=t;return Math.max(0,Math.min(100,n))}(e,i);const a=e.config.entity?.split(".")[0];return"light"!==a||!1!==e.config.tap_to_slide&&void 0!==e.config.tap_to_slide||!0===e.config.allow_light_slider_to_0||i<1&&(i=1),(0,s.md)(e,"climate",e.config.entity)?(e.elements.rangeFill.style.transform=`translateX(${i}%)`,i):(e.elements.rangeFill.style.transform=`translateX(${i}%)`,(0,s.md)(e,"media_player",e.config.entity)&&e.elements.rangeValue&&(e.elements.rangeValue.innerText=`${Math.round(i)}%`),i)}function jt(e,t,n){return 100*(e-t)/(n-t)}function Bt(e,t=e.elements.rangeFill,n=e.config.entity){if(e.dragging)return;const o=n?.split(".")[0];let i=0;if(Ut&&(cancelAnimationFrame(Ut),Ut=null),i="sensor"===o&&"%"===(0,s.D$)(e,"unit_of_measurement",n)?(0,s.Gu)(e,n):function(e,t,n){const o=e._hass.states[t];if(!o)return 0;const i=Ot(e,o),a=zt(e,o);switch(n){case"light":{const n=100*(0,s.D$)(e,"brightness",t)/255;return void 0!==e.config.min_value||void 0!==e.config.max_value?jt(Math.max(i,Math.min(a,n)),i,a):n}case"media_player":{const n=(0,s.D$)(e,"volume_level",t),o=null!=n?100*n:0;return void 0!==e.config.min_value||void 0!==e.config.max_value||void 0!==e.config.min_volume||void 0!==e.config.max_volume?jt(Math.max(i,Math.min(a,o)),i,a):o}case"cover":{const n=(0,s.D$)(e,"current_position",t),o=null!=n?n:0;return void 0!==e.config.min_value||void 0!==e.config.max_value?jt(Math.max(i,Math.min(a,o)),i,a):o}case"input_number":case"number":{const n=parseFloat((0,s.Gu)(e,t));return jt(Math.max(i,Math.min(a,n)),i,a)}case"fan":if((0,s.$C)(e,t)){const n=(0,s.D$)(e,"percentage",t);if(void 0!==e.config.min_value||void 0!==e.config.max_value){const e=parseFloat(n);return jt(Math.max(i,Math.min(a,e)),i,a)}return n??0}return 0;case"climate":if((0,s.$C)(e,t)){const n=parseFloat((0,s.D$)(e,"temperature",t));return isNaN(n)||void 0===i||void 0===a?0:jt(Math.max(i,Math.min(a,n)),i,a)}return 0;default:if(void 0!==e.config.min_value&&void 0!==e.config.max_value){const n=parseFloat((0,s.Gu)(e,t));return jt(Math.max(i,Math.min(a,n)),i,a)}return 0}}(e,n,o),"media_player"===o&&e.elements.rangeValue){(0,s.Gu)(e,n);const t=(0,s.D$)(e,"volume_level",n),o=null!=t?Math.round(100*t):0;e.elements.rangeValue.innerText=`${o}%`}if("climate"===o&&e.elements.rangeValue){if(!(0,s.$C)(e,n))return e.elements.rangeValue.innerText="0%",i=0,void(t.style.transform="translateX(0%)");{const o=(0,s.D$)(e,"temperature",n),a="°C"===e._hass.config.unit_system.temperature;let r=(0,s.D$)(e,"min_temp",n),l=(0,s.D$)(e,"max_temp",n);if(void 0!==e.config.min_value&&(r=parseFloat(e.config.min_value)),void 0!==e.config.max_value&&(l=parseFloat(e.config.max_value)),void 0!==o&&void 0!==r&&void 0!==l)return i=jt(Math.max(r,Math.min(l,o)),r,l),e.elements.rangeValue.innerText=o.toFixed(1).replace(/\.0$/,"")+(a?"°C":"°F"),void(t.style.transform=`translateX(${Math.round(i)}%)`);e.elements.rangeValue.innerText=o?o.toFixed(1).replace(/\.0$/,"")+(a?"°C":"°F"):"0%"}}t.style.transform=`translateX(${Math.round(i)}%)`}function Dt(e,t){return Math.round(e/t)*t}function Ft(e,t){const n=e._hass.states[e.config.entity];if(!n)return;const o=e.config.entity.split(".")[0],i=Ot(e,n),a=zt(e,n),r=function(e,t){if(void 0!==e.config.step)return parseFloat(e.config.step);switch(t.entity_id.split(".")[0]){case"input_number":case"number":return t.attributes.step??1;case"fan":return t.attributes.percentage_step??1;case"climate":{const n="°C"===e._hass.config.unit_system.temperature;return t.attributes.target_temp_step??(n?.5:1)}case"media_player":return.01;default:return 1}}(e,n);let l=Dt(i+t/100*(a-i),r);switch(l=Math.max(i,Math.min(a,l)),o){case"light":{let n;n=void 0!==e.config.min_value||void 0!==e.config.max_value?Math.round(255*l/100):Math.round(255*t/100);const o=e.config.light_transition,i=""===e.config.light_transition_time||isNaN(e.config.light_transition_time)?500:e.config.light_transition_time;e._hass.callService("light","turn_on",{entity_id:e.config.entity,brightness:n,...o&&{transition:i/1e3}});break}case"media_player":{let n;void 0!==e.config.min_value||void 0!==e.config.max_value||void 0!==e.config.min_volume||void 0!==e.config.max_volume?n=l/100:(n=t/100,n=Dt(n,r)),n=Math.max(0,Math.min(1,n)),e._hass.callService("media_player","volume_set",{entity_id:e.config.entity,volume_level:n.toFixed(2)});break}case"cover":{let n;n=void 0!==e.config.min_value||void 0!==e.config.max_value?Math.round(l):Math.round(t),e._hass.callService("cover","set_cover_position",{entity_id:e.config.entity,position:n});break}case"input_number":e._hass.callService("input_number","set_value",{entity_id:e.config.entity,value:l});break;case"fan":{let n;n=void 0!==e.config.min_value||void 0!==e.config.max_value?Math.round(l):Math.round(t),e._hass.callService("fan","set_percentage",{entity_id:e.config.entity,percentage:n});break}case"climate":{const t=parseFloat(l.toFixed(1));(0,s.$C)(e,e.config.entity)?e._hass.callService("climate","set_temperature",{entity_id:e.config.entity,temperature:t}):e._hass.callService("climate","turn_on",{entity_id:e.config.entity}).then((()=>{e._hass.callService("climate","set_temperature",{entity_id:e.config.entity,temperature:t})})).catch((n=>{console.error("Error turning on climate entity:",n),e._hass.callService("climate","set_temperature",{entity_id:e.config.entity,temperature:t})}));break}case"number":e._hass.callService("number","set_value",{entity_id:e.config.entity,value:l})}}function Nt(e,t){return t<=0?e:Math.round(e/t)*t}function Rt(e,t={}){const n={...qt,targetElement:e.elements.mainContainer,insertBefore:e.elements.cardWrapper,sliderLiveUpdate:e.config.slider_live_update,relativeSlide:e.config.relative_slide,holdToSlide:!1,readOnlySlider:!1,styles:".bubble-range-fill {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    left: -100%;\n    transition: all .3s;\n    z-index: 0;\n    background-color: var(--bubble-accent-color, var(--bubble-default-color));\n}\n\n.is-light .bubble-range-fill {\n    background-color: var(--bubble-light-color, rgb(225, 225, 210));\n}\n\n.is-dragging .bubble-range-fill {\n    transition: none !important;\n}\n\n.is-light .bubble-range-fill {\n    opacity: 0.5;\n}\n\n.bubble-range-value {\n    position: absolute;\n    right: 14px;\n}\n\n.is-unavailable .bubble-range-slider {\n    cursor: not-allowed;\n}\n\n.slider-appear-animation {\n    transition: none;\n    animation: sliderAppear 0.2s ease-in-out;\n    transform-origin: center;\n}\n\n@keyframes sliderAppear {\n    0% {\n        transform: scale(0.96);\n        opacity: 0.8;\n    }\n    100% {\n        transform: scale(1);\n        opacity: 1;\n    }\n}",...t},o=e._hass.states[e.config.entity],i=e.config.entity?.split(".")[0];if(o?(e.sliderMinValue=function(e,t){if(void 0!==e.config.min_value)return parseFloat(e.config.min_value);const n=t.entity_id.split(".")[0];return"media_player"===n&&void 0!==e.config.min_volume?parseFloat(e.config.min_volume):"climate"===n?t.attributes.min_temp??0:t.attributes.min??0}(e,o),e.sliderMaxValue=function(e,t){if(void 0!==e.config.max_value)return parseFloat(e.config.max_value);const n=t.entity_id.split(".")[0];return"media_player"===n&&void 0!==e.config.max_volume?parseFloat(e.config.max_volume):"climate"===n?t.attributes.max_temp??100:t.attributes.max??100}(e,o),e.sliderStep=function(e,t){if(void 0!==e.config.step)return parseFloat(e.config.step);switch(t.entity_id.split(".")[0]){case"input_number":case"number":return t.attributes.step??1;case"fan":return t.attributes.percentage_step??1;case"climate":{const n="°C"===e._hass.config.unit_system.temperature;return t.attributes.target_temp_step??(n?.5:1)}case"media_player":return.01;default:return 1}}(e,o)):(e.sliderMinValue=e.config.min_value??0,e.sliderMaxValue=e.config.max_value??100,e.sliderStep=e.config.step??1),e.sliderMaxValue<=e.sliderMinValue&&(e.sliderMaxValue="climate"===i?e.sliderMinValue+1:e.sliderMinValue+100),e.elements.rangeFill=(0,s.n)("div","bubble-range-fill range-fill"),e.elements.rangeSlider=(0,s.n)("div","bubble-range-slider range-slider"),n.styles){const t=(0,s.n)("style");t.textContent=n.styles,e.elements.rangeSlider.appendChild(t)}function a(e,t,n){return n<=t?0:100*(Math.max(t,Math.min(n,e))-t)/(n-t)}function r(){let t=0;const n=e.config.entity,o=n?.split(".")[0];if("sensor"===o&&"%"===(0,s.D$)(e,"unit_of_measurement",n))return(0,s.Gu)(e,n);switch(o){case"light":t=100*(0,s.D$)(e,"brightness",n)/255;break;case"media_player":(0,s.$C)(e,n)&&(t=100*((0,s.D$)(e,"volume_level",n)??0));break;case"cover":t=a(parseFloat((0,s.D$)(e,"current_position",n)??0),e.sliderMinValue,e.sliderMaxValue);break;case"input_number":case"number":t=a(parseFloat((0,s.Gu)(e,n)),e.sliderMinValue,e.sliderMaxValue);break;case"fan":(0,s.$C)(e,n)&&(t=a(parseFloat((0,s.D$)(e,"percentage",n)??0),e.sliderMinValue,e.sliderMaxValue));break;case"climate":if((0,s.$C)(e,n)){const o=parseFloat((0,s.D$)(e,"temperature",n));isNaN(o)||(t=a(o,e.sliderMinValue,e.sliderMaxValue))}break;default:if(void 0!==e.sliderMinValue&&void 0!==e.sliderMaxValue){const o=parseFloat((0,s.Gu)(e,n));isNaN(o)||(t=a(o,e.sliderMinValue,e.sliderMaxValue))}}return Math.max(0,Math.min(100,t))}function l(e){return Math.max(0,Math.min(100,e))}function c(t){if(!e.elements.rangeValue)return;const n=e.config.entity?.split(".")[0];switch(n){case"climate":if((0,s.$C)(e,e.config.entity)){const n=e.sliderMinValue,o=e.sliderMaxValue,i=n+t/100*(o-n),a=Nt(i,e.sliderStep),r=Math.max(n,Math.min(o,a)),s="°C"===e._hass.config.unit_system.temperature,l=e._hass.states[e.config.entity],c=e.config.step||l?.attributes.target_temp_step||(s?.5:1);Math.round(i/c),e.elements.rangeValue.innerText=r.toFixed(1).replace(/\.0$/,"")+(s?"°C":"°F")}else e.elements.rangeValue.innerText=e._hass.localize("state.default.off");break;case"number":case"input_number":const n=e.sliderMinValue,o=e.sliderMaxValue,i=Nt(n+t/100*(o-n),e.sliderStep),a=Math.max(n,Math.min(o,i)),r=(0,s.D$)(e,"unit_of_measurement",e.config.entity)||"",l=e._hass.states[e.config.entity]?.attributes?.precision??(Number.isInteger(a)?0:1);e.elements.rangeValue.innerText=a.toFixed(l).replace(/\.0$/,"")+(r?` ${r}`:"");break;default:const c=e.sliderMinValue,d=e.sliderMaxValue,u=Nt(c+t/100*(d-c),e.sliderStep),p=Math.max(c,Math.min(d,u));e.elements.rangeValue.innerText=Math.round(p)+"%"}}if(n.withValueDisplay){e.elements.rangeValue=(0,s.n)("div","bubble-range-value"),e.elements.rangeSlider.appendChild(e.elements.rangeValue);const t=l(r());(0,s.md)(e,"climate",e.config.entity)?((0,s.$C)(e,e.config.entity)?c(t):e.elements.rangeValue.innerText="0%",e.elements.rangeFill.style.transform=`translateX(${t}%)`,e.elements.rangeValue.style.display=""):(c(t),e.elements.rangeValue.style.display="",e.elements.rangeFill.style.transform=`translateX(${t}%)`)}else{const t=l(r());e.elements.rangeFill.style.transform=`translateX(${t}%)`}e.elements.rangeSlider.appendChild(e.elements.rangeFill),n.insertBefore&&n.targetElement.contains(n.insertBefore)?n.targetElement.insertBefore(e.elements.rangeSlider,n.insertBefore):n.targetElement.appendChild(e.elements.rangeSlider),n.targetElement&&(n.targetElement.style.cursor="ew-resize");let d=0,u=0,p=null;function h(e){try{const t="function"==typeof e.composedPath?e.composedPath():[];if(t&&t.some((e=>e?.tagName&&"ha-sidebar"===e.tagName.toLowerCase())))return!0}catch(e){}const t=void 0!==e.clientX?e.clientX:e.touches&&e.touches[0]?e.touches[0].clientX:0;return("touch"===e.pointerType||!!e.touches)&&t<=30}function b(t){if(t.stopPropagation(),t.touches&&t.touches.length>1||t.preventDefault(),t.target.closest(".bubble-action"))return;window.isScrolling=!0;const o=Vt(e,m(t));((0,s.md)(e,"climate",e.config.entity)||n.sliderLiveUpdate)&&y(e,o),c(o)}function m(e){const t=e.pageX||(e.touches?e.touches[0].pageX:0);return n.relativeSlide?u+(t-d):t}function g(t){t.stopPropagation(),t.touches&&t.touches.length>1||t.preventDefault(),p&&clearTimeout(p);const o=t.pageX||(t.touches?t.touches[0].pageX:0),i=Vt(e,m(t),!0);Math.abs(o-d)>5&&(t.preventDefault(),t.stopImmediatePropagation()),n.targetElement.classList.remove("is-dragging"),n.targetElement.removeEventListener("pointermove",b),window.removeEventListener("pointerup",g),window.removeEventListener("touchmove",b),window.removeEventListener("touchend",g),(0,s.md)(e,"climate",e.config.entity)&&!(0,s.$C)(e,e.config.entity)?e._hass.callService("climate","turn_on",{entity_id:e.config.entity}).then((()=>{y(e,i)})).catch((e=>{console.error("Error turning on climate entity:",e)})):y(e,i),(0,s.jp)("selection"),c(i),n.targetElement.querySelectorAll("*").forEach((t=>{t!==e.elements.rangeFill&&t!==e.elements.rangeSlider&&n.holdToSlide&&!e.config.tap_to_slide&&(t.style.transition="opacity 0.3s ease-in-out",t.style.pointerEvents=null,t.style.opacity=null,e.elements.rangeValue&&(e.elements.rangeValue.style.display="none"))})),p=setTimeout((()=>{e&&(e.dragging=!1,window.isScrolling=!1)}),100)}function f(t){e.elements.rangeValue||(e.elements.rangeValue=(0,s.n)("div","bubble-range-value"),e.elements.rangeSlider.appendChild(e.elements.rangeValue),c(t)),e.elements.rangeValue.style.display=""}const v=(()=>{const t=e.config.entity;if(!t)return!0;const n=t?.split(".")[0];return"sensor"===n||!["light","media_player","cover","input_number","number","fan","climate"].includes(n)})();if(e.config.read_only_slider||v)return;if(!n.holdToSlide||n.readOnlySlider||e.config.tap_to_slide)n.readOnlySlider||n.targetElement.addEventListener("pointerdown",(t=>{if(h(t))return;const o=!!t.target.closest(".bubble-main-icon-container"),i=t.target.closest(".bubble-sub-button"),a=i?.hasAttribute("no-slide");o||i||a||(n.targetElement.setPointerCapture(t.pointerId),e.card&&e.card.classList.contains("is-unavailable")||(e.dragging=!0,window.isScrolling=!0,d=t.pageX||(t.touches?t.touches[0].pageX:0),n.targetElement.classList.add("is-dragging"),n.targetElement.addEventListener("pointermove",b,{passive:!1}),window.addEventListener("pointerup",g,{passive:!1}),window.addEventListener("touchmove",b,{passive:!1}),window.addEventListener("touchend",g,{passive:!1})))}),{passive:!1});else{let t;const o=200;let i=!1;n.targetElement.addEventListener("pointerdown",(a=>{if(h(a))return;const p=a.target.closest(".bubble-action"),m=a.target.closest(".bubble-sub-button")?.hasAttribute("no-slide");m||p&&'{"action":"none"}'!==p.getAttribute("data-hold-action")||(i=!1,t=setTimeout((()=>{i=!0,function(t){if(h(t))return;if(n.targetElement.setPointerCapture(t.pointerId),e.card&&e.card.classList.contains("is-unavailable"))return;e.dragging=!0,window.isScrolling=!0,d=t.pageX||(t.touches?t.touches[0].pageX:0);let o=0;(0,s.md)(e,"climate")&&!(0,s.$C)(e,e.config.entity)?(o=0,e.elements.rangeFill.style.transform=`translateX(${o}%)`):o=Vt(e,function(t){if(d=t.pageX||(t.touches?t.touches[0].pageX:0),!n.relativeSlide)return d;const o=l(r()),i=e.elements.rangeSlider.getBoundingClientRect();return u=i.left+i.width*o/100,u}(t)),f(o),c(o),n.sliderLiveUpdate&&y(e,o),n.targetElement.classList.add("slider-appear-animation"),(0,s.jp)("selection"),n.targetElement.querySelectorAll("*").forEach((t=>{t!==e.elements.rangeFill&&t!==e.elements.rangeSlider&&t!==e.elements.rangeValue&&(t.style.transition="opacity 0.3s ease-in-out",t.style.pointerEvents="none",t.style.opacity="0",f(o))})),setTimeout((()=>{n.targetElement.classList.remove("slider-appear-animation")}),300),n.targetElement.classList.add("is-dragging"),n.targetElement.addEventListener("pointermove",b,{passive:!1}),window.addEventListener("pointerup",g,{passive:!1}),window.addEventListener("touchmove",b,{passive:!1}),window.addEventListener("touchend",g,{passive:!1}),window.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation()}),{capture:!0,once:!0})}(a)}),o))}),{passive:!1}),n.targetElement.addEventListener("pointerup",(e=>{clearTimeout(t)})),n.targetElement.addEventListener("pointercancel",(()=>{clearTimeout(t),i=!1}))}const y=(0,s.nF)(Ft,200)}new Map;const qt={targetElement:null,insertBefore:null,sliderLiveUpdate:!1,withValueDisplay:!1,initialValue:null};var Ht=n(207);const Yt={};function Wt(e,t={}){e.elements=e.elements||{};const n={...Xt,appendTo:e.content,iconDefaultActions:{tap_action:{action:"more-info"},double_tap_action:{action:"none"},hold_action:{action:"none"}},buttonDefaultActions:{tap_action:{action:"none"},double_tap_action:{action:"none"},hold_action:{action:"none"}},baseCardStyles:"/* 'card-type' in CSS variables is replaced with the real card type \n   in card-structure.js for easier maintenance */\n\n* {\n    -webkit-tap-highlight-color: transparent !important;\n    -ms-overflow-style: none; /* for Internet Explorer, Edge */\n    scrollbar-width: none; /* for Firefox */\n\n    -webkit-user-select: none; /* Safari */\n    -ms-user-select: none; /* IE 10 and IE 11 */\n    user-select: none; /* Standard syntax */\n}\n\n*::-webkit-scrollbar {\n    display: none; /* for Chrome, Safari, and Opera */\n}\n\nha-card {\n    background: none;\n    opacity: 1;\n}\n\n.scrolling-container {\n    width: 100%;\n    white-space: nowrap;\n    mask-image: linear-gradient(to right, transparent, black 8px, black calc(100% - 8px), transparent);\n    -webkit-mask-image: linear-gradient(to right, transparent, black 8px, black calc(100% - 8px), transparent);\n    overflow: hidden;\n}\n\n.scrolling-container span {\n    display: inline-block;\n    animation-name: bubble-scroll;\n    animation-timing-function: linear;\n    animation-iteration-count: infinite;\n}\n\n.bubble-scroll-separator {\n    opacity: .3;\n    margin: 0 6px 0 8px;\n}\n\n@keyframes bubble-scroll {\n    from { transform: translateX(0); }\n    to { transform: translateX(-50%); }\n}\n/* End of scrolling styles */\n\n.bubble-container {\n    position: relative;\n    width: 100%;\n    height: 50px;\n    background-color: var(--bubble-card-type-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color))));\n    border-radius: var(--bubble-card-type-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n    box-shadow: var(--bubble-card-type-box-shadow, var(--bubble-box-shadow, none));\n    overflow: scroll;\n    touch-action: auto;\n    border: var(--bubble-card-type-border, var(--bubble-border, none));\n    box-sizing: border-box;\n}\n\n.bubble-wrapper {\n    display: flex;\n    position: absolute;\n    justify-content: space-between;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n    transition: all 1.5s;\n    border-radius: var(--bubble-card-type-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n    background-color: rgba(0,0,0,0);\n    overflow: visible;\n}\n\n.bubble-content-container {\n    display: contents;\n    flex-grow: 1;\n}\n\n.bubble-buttons-container {\n    --icon-primary-color: var(--primary-text-color);\n    display: flex;\n    margin-right: 8px;\n    gap: 4px;\n}\n\n.bubble-background {\n    display: flex;\n    position: absolute;\n    height: 100%;\n    width: 100%;\n    transition: background-color 1.5s;\n    border-radius: var(--bubble-card-type-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n    -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0) 100%);\n    mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0) 100%);\n}\n\n.bubble-icon-container {\n    display: flex;\n    flex-wrap: wrap;\n    align-content: center;\n    justify-content: center;\n    min-width: 38px;\n    min-height: 38px;\n    margin: 6px;\n    border-radius: var(--bubble-card-type-icon-border-radius, var(--bubble-icon-border-radius, var(--bubble-border-radius, 50%)));\n    background-color: var(--bubble-card-type-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n    overflow: hidden;\n    position: relative;\n    transition: all 0.3s ease-in-out;\n}\n\n.bubble-icon-feedback-container {\n    border-radius: var(--bubble-card-type-icon-border-radius, var(--bubble-icon-border-radius, var(--bubble-border-radius, 50%)));\n    overflow: hidden !important;\n}\n\n.is-off .bubble-main-icon {\n    opacity: 0.6;\n}\n\n.is-on .bubble-main-icon {\n  filter: brightness(1.1);\n  opacity: 1;\n}\n\n.bubble-entity-picture {\n    background-size: cover;\n    background-position: center;\n    height: 100%;\n    width: 100%;\n    position: absolute;\n}\n\n.bubble-name,\n.bubble-state {\n    display: flex;\n    position: relative;\n    white-space: nowrap;\n}\n\n.bubble-name-container {\n    display: flex;\n    line-height: 18px;\n    flex-direction: column;\n    justify-content: center;\n    flex-grow: 1;\n    margin: 0 16px 0 4px;\n    pointer-events: none;\n    position: relative;\n    overflow: hidden;\n}\n\n.bubble-name {\n    font-size: 13px;\n    font-weight: 600;\n}\n\n.bubble-state {\n    font-size: 12px;\n    font-weight: normal;\n    opacity: 0.7;\n}\n\n.is-unavailable .bubble-wrapper {\n    cursor: not-allowed;\n}\n\n.is-unavailable .bubble-buttons-container {\n    display: none;\n}\n\n.is-unavailable {\n    opacity: 0.5;\n}\n\n.hidden {\n    display: none !important;\n}\n\n.state-without-name {\n    opacity: 1;\n    font-size: 14px;\n}\n\n.name-without-icon {\n    margin-left: 16px;\n}\n\n.display-state {\n    display: flex;\n}\n\n.bubble-action-enabled {\n    cursor: pointer;\n}\n\n.large .bubble-container {\n    height: calc( var(--row-height,56px) * var(--row-size,1) + var(--row-gap,8px) * ( var(--row-size,1) - 1 ));\n    border-radius: var(--bubble-card-type-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n}\n\n.large .bubble-icon-container {\n    --mdc-icon-size: 24px;\n    min-width: 42px;\n    min-height: 42px;\n    margin-left: 8px;\n}",...t};let o,a;n.withMainContainer&&(e.elements.mainContainer=(0,s.n)("div",`bubble-${n.type}-container bubble-container`)),n.withBaseElements&&(e.elements.cardWrapper=(0,s.n)("div",`bubble-${n.type} bubble-wrapper`),e.elements.contentContainer=(0,s.n)("div","bubble-content-container"),e.elements.buttonsContainer=(0,s.n)("div","bubble-buttons-container"),e.elements.iconContainer=(0,s.n)("div","bubble-main-icon-container bubble-icon-container icon-container"),e.elements.icon=(0,s.n)("ha-icon","bubble-main-icon bubble-icon icon"),e.elements.image=(0,s.n)("div","bubble-entity-picture entity-picture"),e.elements.nameContainer=(0,s.n)("div","bubble-name-container name-container"),e.elements.name=(0,s.n)("div","bubble-name name"),e.elements.state=(0,s.n)("div","bubble-state state"),e.elements.iconContainer.append(e.elements.icon,n.withImage?e.elements.image:null),e.elements.nameContainer.append(e.elements.name,n.withState?e.elements.state:null),e.elements.contentContainer.append(e.elements.iconContainer,e.elements.nameContainer),e.elements.cardWrapper.append(e.elements.contentContainer,e.elements.buttonsContainer),n.withBackground&&(e.elements.background=(0,s.n)("div","bubble-background"),e.elements.cardWrapper.prepend(e.elements.background)),e.elements.mainContainer.appendChild(e.elements.cardWrapper),n.withSlider&&Rt(e,{holdToSlide:n.holdToSlide,readOnlySlider:n.readOnlySlider})),n.styles&&(Yt[n.type]||(Yt[n.type]=n.baseCardStyles.replace(/card-type/g,n.type)),e.elements.style=(0,s.n)("style"),e.elements.style.innerText=Yt[n.type]+n.styles,e.elements.mainContainer.appendChild(e.elements.style)),n.withCustomStyle&&(e.elements.customStyle=(0,s.n)("style"),e.elements.mainContainer.appendChild(e.elements.customStyle)),n.withSubButtons&&((0,Ht.g)(e,{container:n.appendTo,appendTo:e.elements.cardWrapper??e.elements.mainContainer,before:!1}),e.elements.buttonsContainer&&e.elements.cardWrapper.appendChild(e.elements.buttonsContainer)),!0===n.iconActions?o=n.iconDefaultActions:"object"==typeof n.iconActions&&(o=n.iconActions),!0===n.buttonActions?a=n.buttonDefaultActions:"object"==typeof n.buttonActions&&(a=n.buttonActions);let r={has_action:!1};e.elements.iconContainer&&(r=(0,i.dN)(e.elements.iconContainer,e.config,e.config.entity,o));let l={has_action:!1};return!1!==n.buttonActions&&e.elements.background&&(l=(0,i.dN)(e.elements.background,e.config.button_action,e.config.entity,a)),r.has_action&&e.elements.iconContainer&&(e.elements.iconFeedbackContainer=(0,s.n)("div","bubble-icon-feedback-container bubble-feedback-container"),e.elements.iconContainer.appendChild(e.elements.iconFeedbackContainer),e.elements.iconFeedback=(0,s.n)("div","bubble-icon-feedback bubble-feedback-element feedback-element"),e.elements.iconFeedback.style.display="none",e.elements.iconFeedbackContainer.appendChild(e.elements.iconFeedback),(0,i.pd)(e.elements.iconContainer,e.elements.iconFeedback)),n.withFeedback&&l.has_action&&e.elements.background&&(e.elements.feedbackContainer=(0,s.n)("div","bubble-feedback-container feedback-container"),e.elements.feedback=(0,s.n)("div","bubble-feedback-element feedback-element"),e.elements.feedback.style.display="none",e.elements.feedbackContainer.append(e.elements.feedback),e.elements.cardWrapper.append(e.elements.feedbackContainer),(0,i.pd)(e.elements.background,e.elements.feedback)),n.appendTo===e.content?e.content.appendChild(e.elements.mainContainer):n.appendTo.appendChild(e.elements.mainContainer),e.elements}const Xt={type:"base",appendTo:null,baseCardStyles:null,styles:"",withMainContainer:!0,withBaseElements:!0,withFeedback:!0,withImage:!0,withSlider:!1,holdToSlide:!1,readOnlySlider:!1,withCustomStyle:!0,withState:!0,withBackground:!0,withSubButtons:!1,iconActions:!0,buttonActions:!1};function Kt(e,t=e.content){const n=It(e);"button"!==e.cardType&&e.buttonType!==n&&function(e,t=e.container){const n="button",o=It(e),i="slider"===o,a={};a.slider={icon:!0,button:{tap_action:{action:(0,s.md)(e,"sensor")?"more-info":"toggle"},double_tap_action:{action:"none"},hold_action:{action:"none"}}},a.switch={icon:!0,button:{tap_action:{action:"toggle"},double_tap_action:{action:"none"},hold_action:{action:"more-info"}}},a.state={icon:{tap_action:{action:"more-info"},double_tap_action:{action:"none"},hold_action:{action:"more-info"}},button:{tap_action:{action:"more-info"},double_tap_action:{action:"none"},hold_action:{action:"more-info"}}},a.name={icon:{tap_action:{action:"none"},double_tap_action:{action:"none"},hold_action:{action:"none"}},button:{tap_action:{action:"none"},double_tap_action:{action:"none"},hold_action:{action:"none"}}};const r=Wt(e,{type:n,appendTo:t,styles:".bubble-range-slider {\n    display: flex;\n    position: absolute;\n    justify-content: space-between;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n    cursor: ew-resize;\n    border-radius: calc(var(--bubble-button-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2))));\n    overflow: hidden;\n    mask-image: radial-gradient(white, black);\n    -webkit-mask-image: -webkit-radial-gradient(white, black);\n}\n\n.bubble-background {\n    background-color: var(--bubble-button-background-color);\n    border-radius: calc(var(--bubble-button-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2))));\n}\n\n.bubble-buttons-container {\n    display: contents;\n}",withSlider:i,holdToSlide:i,readOnlySlider:Pt(e),withFeedback:!e.config.tap_to_slide,withSubButtons:!0,iconActions:a[o]?.icon,buttonActions:!e.config.tap_to_slide&&a[o]?.button});r.background.classList.add("bubble-button-background"),r.mainContainer.classList.add("bubble-button-card-container"),r.cardWrapper.classList.add("bubble-button-card"),i&&r.mainContainer.classList.add("bubble-button-slider-container"),t!==e.container?e.buttonType=o:e.cardType=n}(e,t),"name"!==n&&(function(e){const t=(0,s.Gu)(e),n=e.config.card_type;"unavailable"===t?"button"===n?e.card.classList.add("is-unavailable"):"pop-up"===n&&e.elements.headerContainer.classList.add("is-unavailable"):"button"===n?e.card.classList.remove("is-unavailable"):"pop-up"===n&&e.elements.headerContainer.classList.remove("is-unavailable")}(e),function(e){const t=e.config.card_type,n=It(e),o=(0,s.md)(e,"light"),i=(0,s.$C)(e),a=(0,kt.VA)(e),r="button"===t?e.card.style.getPropertyValue("--bubble-button-background-color"):e.popUp.style.getPropertyValue("--bubble-button-background-color"),l=e.elements.background.style.opacity;let c="",d="";const u=e.config.use_accent_color;"switch"===n&&i?a&&o&&!u?(c=(0,kt.VA)(e),d=".5"):(c="var(--bubble-button-accent-color, var(--bubble-accent-color, var(--bubble-default-color)))",d="1"):(c="rgba(0, 0, 0, 0)",d=".5"),"slider"===n&&(i&&(e.elements.rangeFill.style.backgroundColor=o&&!u?(0,kt.VA)(e):"var(--bubble-button-accent-color, var(--bubble-accent-color, var(--bubble-default-color)))"),Bt(e)),r!==c&&("button"===t?e.card.style.setProperty("--bubble-button-background-color",c):"pop-up"===t&&e.popUp.style.setProperty("--bubble-button-background-color",c)),l!==d&&(e.elements.background.style.opacity=d)}(e)),Et(e),Lt(e),At(e),(0,Tt.Kr)(e),"pop-up"!==e.cardType&&function(e){(0,s.JK)(e),(0,a.SF)(e)}(e)}function Gt(e,t){return function(e,t){return!(!e||void 0===e.supported_features)&&!!(e.supported_features&t)}(e.attributes,t)}let Jt=!1;function Zt(e,t){const n=e.config[`${t}_name`]??"",o=e.config[`${t}_icon`]??"",i=e.config[`${t}_pir_sensor`],a=e.config[`${t}_link`],r=e.config[`${t}_entity`];Jt=Jt||location.hash===a;const l=(0,s.n)("ha-icon","bubble-icon icon");l.icon=o;const c=(0,s.n)("div","bubble-name name");c.innerText=n;const d=(0,s.n)("div","bubble-background-color background-color"),u=(0,s.n)("div","bubble-background background"),p=(0,s.n)("div",`bubble-button bubble-button-${t} button ${a.substring(1)}`);let h=localStorage.getItem(`bubbleButtonWidth-${a}`);return p.style.width=`${h}px`,p.appendChild(l),p.appendChild(c),p.appendChild(d),p.appendChild(u),p.addEventListener("click",(()=>{location.hash!==a&&(Jt=!1),Jt?ot():it(a),Jt=!Jt,(0,s.jp)("light")})),p.icon=l,p.name=c,p.backgroundColor=d,p.background=u,p.pirSensor=i,p.lightEntity=r,p.link=a,p.index=t,p.haRipple=(0,s.n)("ha-ripple"),p.appendChild(p.haRipple),window.addEventListener("location-changed",(function(){e.config.highlight_current_view&&(location.pathname===a||location.hash===a?p.classList.add("highlight"):p.classList.remove("highlight"))})),e.elements.buttons.push(p),p}function Qt(e,t){return Math.floor((t-e)/6e4)}function en(e){if(e.date){const t=e.date.split("-"),n=parseInt(t[0],10),o=parseInt(t[1],10)-1,i=parseInt(t[2],10);return new Date(n,o,i)}return new Date(e.dateTime)}function tn(e){const t=(0,s.D$)(e,"supported_features"),n=Number(t);return Number.isFinite(n)?n:0}function nn(e,t){return!!(e&t)}function on(e){const t=e?._hass?.states?.[e?.config?.entity]?.state??"",n=tn(e),o=nn(n,1),i=nn(n,4096),a=nn(n,16384);return"playing"===t?o?{icon:"mdi:pause",service:"media_pause"}:i?{icon:"mdi:stop",service:"media_stop"}:{icon:"mdi:pause",service:"media_play_pause"}:a?{icon:"mdi:play",service:"media_play"}:{icon:"mdi:play",service:"media_play_pause"}}var an=n(352),rn=n(26);const sn={"pop-up":async function(e){if("pop-up"!==e.cardType){if(e.getRootNode()instanceof ShadowRoot==0)return;!function(e){try{if(e.cardType="pop-up",e.verticalStack=e.getRootNode(),e.sectionRow=e.verticalStack.host.parentElement,e.sectionRowContainer=e.sectionRow?.parentElement,e.popUp=e.verticalStack.querySelector("#root"),!e.popUp)throw new Error("Vertical stack not found, don't panic, it will be added automatically to your pop-up.");e.popUp.classList.add("bubble-pop-up","pop-up","is-popup-closed"),e.cardTitle=e.verticalStack.querySelector(".card-header"),e.editor||e.config.background_update||e.verticalStack.removeChild(e.popUp),e.elements={},wt(e),e.cardTitle&&(e.cardTitle.style.display="none"),vt=vt||(e.config.hide_backdrop??!0),e.popUp.style.setProperty("--custom-height-offset-desktop",e.config.margin_top_desktop??"0px"),e.popUp.style.setProperty("--custom-height-offset-mobile",e.config.margin_top_mobile??"0px"),e.popUp.style.setProperty("--custom-margin",`-${e.config.margin??"7px"}`),e.popUp.style.setProperty("--custom-popup-filter",e.config.backdrop_blur&&"0"!==e.config.backdrop_blur?"none":`blur(${e.config.bg_blur??10}px)`),e.popUp.style.setProperty("--custom-shadow-opacity",(e.config.shadow_opacity??0)/100),e.boundOnUrlChange=pt(e),window.addEventListener("location-changed",e.boundOnUrlChange),window.addEventListener("popstate",e.boundOnUrlChange),window.popUpError=!1}catch(t){if(console.warn(t),!window.popUpError){window.popUpError=!0;const t=(0,s.n)("div","bubble-error-text"),n=Z`
        <ha-alert 
          alert-type="error"
          .title=${"需要为这个弹出面板指定唯一的锚点标识"}
        >
          <p>弹出面板默认是隐藏的，你可以通过触发它的锚点标识（例如#pop-up-name），使用任意支持“前往”动作的卡片来打开它。</p>
        </ha-alert>
      `;me(n,t),e.content.appendChild(t)}}}(e),function(e){e.elements={closeIcon:(0,s.n)("ha-icon","bubble-close-icon"),closeButton:(0,s.n)("div","bubble-close-button close-pop-up"),buttonContainer:(0,s.n)("div","bubble-button-container"),header:(0,s.n)("div","bubble-header")};const t=(0,s.n)("div","bubble-feedback-container"),n=(0,s.n)("div","bubble-feedback-element feedback-element");t.appendChild(n),e.elements.closeButton.appendChild(t),e.elements.closeIcon.icon="mdi:close",e.elements.closeButton.appendChild(e.elements.closeIcon),e.elements.closeButton.feedback=n;const o=t=>{t&&(t.stopPropagation(),t.preventDefault());const n=()=>{if(location.hash){const e=window.location.href.split("#")[0];history.replaceState(null,"",e),window.dispatchEvent(new Event("location-changed"))}};try{ot(),setTimeout((()=>{location.hash===e.config.hash&&n()}),100)}catch(e){n()}(0,s.jp)("selection")};e.elements.closeButton.addEventListener("click",o),e.elements.closeButton.addEventListener("touchend",o),e.elements.closeButton.addEventListener("pointerdown",(e=>{e.stopPropagation()})),e.elements.closeButton.haRipple=(0,s.n)("ha-ripple"),e.elements.closeButton.appendChild(e.elements.closeButton.haRipple);const i=e.popUp?.querySelector(".bubble-header-container");i?Object.assign(e.elements,{headerContainer:i,closeIcon:i.querySelector(".bubble-close-icon"),closeButton:i.querySelector(".bubble-close-button"),buttonContainer:i.querySelector(".bubble-button-container"),header:i.querySelector(".bubble-header")}):(e.elements.headerContainer=(0,s.n)("div","bubble-header-container"),e.elements.headerContainer.setAttribute("id","header-container"),e.elements.headerContainer.appendChild(e.elements.header),e.elements.headerContainer.appendChild(e.elements.closeButton),e.elements.header.appendChild(e.elements.buttonContainer)),e.handleTouchStart=e=>{mt=e.touches[0].clientY},e.handleHeaderTouchMove=t=>{const n=t.touches[0].clientY-mt;n>0&&(e.popUp.style.transform=`translateY(${n}px)`)},e.handleHeaderTouchEnd=t=>{const n=t.changedTouches[0].clientY-mt;n>50?(e.popUp.style.transform=`translateY(calc(${n}px + (100% - ${n}px)))`,ot()):e.popUp.style.transform=""}}(e),function(e){try{e.elements.style=(0,s.n)("style"),e.elements.style.innerText=".bubble-pop-up-container {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    margin-top: -50px;\n    max-width: 100%;\n    padding-top: 40px;\n    padding-bottom: 80px;\n    grid-gap: var(--bubble-pop-up-gap, 14px);\n    gap: var(--bubble-pop-up-gap, 14px);\n    column-gap: var(--bubble-pop-up-gap, 14px);\n    --grid-gap: var(--bubble-pop-up-gap, 14px);\n    --vertical-stack-card-gap: var(--bubble-pop-up-gap, 14px);\n    --horizontal-stack-card-gap: var(--bubble-pop-up-gap, 14px);\n    --stack-card-gap: var(--bubble-pop-up-gap, 14px);\n    --row-size: 1;\n    -ms-overflow-style: none; /* for Internet Explorer, Edge */\n    scrollbar-width: none; /* for Firefox */\n    overflow: visible; \n    grid-auto-rows: min-content;\n    padding: 18px 18px calc(140px + var(--custom-height-offset-mobile)) 18px;\n}\n\n.bubble-pop-up-container.is-scrollable {\n    overflow: auto;\n    mask-image: linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 40px), transparent 100%);\n    -webkit-mask-image: linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 40px), transparent 100%);\n}\n\n.bubble-pop-up-container > * {\n    flex-shrink: 0 !important;\n}\n\n.bubble-pop-up.card-content {\n    width: 100% !important;\n    padding: 0 !important;\n}\n\n.bubble-pop-up {\n    transition: transform 0.3s ease;\n    position: fixed;\n    width: 100%;\n    max-width: 100%;\n    border-radius: var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) 0 0;\n    box-sizing: border-box;\n    margin-left: var(--custom-margin);\n    left: 7px;\n    z-index: 5 !important;\n    bottom: calc(-56px - var(--custom-height-offset-mobile));\n}\n\n.bubble-pop-up-background {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    top: 0;\n    left: 0;\n    position: absolute;\n    background-color: var(--bubble-pop-up-main-background-color, var(--bubble-pop-up-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--secondary-background-color)))));\n    border-radius: var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) 0 0;\n    backdrop-filter: var(--custom-popup-filter);\n    -webkit-backdrop-filter: var(--custom-popup-filter);\n    border: var(--bubble-pop-up-border, var(--bubble-border, none));\n}\n\n.bubble-pop-up-container::-webkit-scrollbar {\n    display: none; /* for Chrome, Safari, and Opera */\n}\n\n.is-popup-opened {\n    box-shadow: 0px 0px 50px rgba(0, 0, 0, var(--custom-shadow-opacity));\n}\n\n.is-popup-closed { \n    transform: translateY(100%);\n    box-shadow: none !important;\n}\n\n@media only screen and (min-width: 600px) {\n    .bubble-pop-up {\n        margin-left: 0 !important;\n        min-width: var(--desktop-width, 540px);\n        max-width: var(--desktop-width, 540px);\n        left: calc(50% - (var(--desktop-width, 540px) / 2));\n    }\n    .bubble-pop-up-container {\n        padding: 18px 18px calc(140px + var(--custom-height-offset-desktop)) 18px;\n    }\n}\n\n@media only screen and (min-width: 768px) {\n    .bubble-pop-up {\n      bottom: calc(-56px - var(--custom-height-offset-desktop));\n      left: calc(var(--mdc-drawer-width, 0px) / 2 + 50% - (var(--desktop-width, 540px) / 2));\n    }\n}\n\n.bubble-pop-up.editor {\n    transition: none !important;\n    position: relative !important;\n    top: 0;\n    left: 0;\n    width: 100% !important;\n    backdrop-filter: none !important;\n    display: flex !important;\n    transform: none !important;\n    height: auto !important;\n    min-width: auto;\n    z-index: 0 !important;\n}\n\n.bubble-header-container {\n    display: inline-flex;\n    height: 50px;\n    margin: 0;\n    padding: 0;\n    z-index: 3;\n    padding: 18px 18px 22px;\n    position: sticky;\n    top: 0;\n    background: none !important;\n    overflow: visible;\n}\n\n.bubble-header {\n    display: inline-flex;\n    flex-grow: 1;\n    margin-right: 14px;\n    color: var(--primary-text-color);\n}\n\n.bubble-name {\n    font-size: 14px;\n    font-weight: heavy;\n}\n\n.bubble-close-button {\n    display: flex;\n    position: relative;\n    height: 50px;\n    width: 50px;\n    border: var(--bubble-pop-up-close-button-border, var(--bubble-pop-up-border, var(--bubble-border, none)));\n    border-radius: var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px));\n    z-index: 1;\n    background: var(--bubble-pop-up-main-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--secondary-background-color))));\n    color: var(--primary-text-color);\n    flex-shrink: 0;\n    cursor: pointer;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    transition: all 0.3s ease;\n    box-sizing: border-box;\n}\n\n.bubble-close-icon {\n    --mdc-icon-size: 24px;\n    color: var(--primary-text-color);\n    line-height: normal;\n}\n\n.bubble-button-card-container {\n    background: var(--bubble-pop-up-main-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--secondary-background-color))));\n}\n\n.bubble-pop-up-container.editor-cropped {\n    height: 122px !important;\n    mask-image: linear-gradient(to bottom, transparent 0px, black 40px, black calc(100% - 40px), transparent 100%) !important;\n    -webkit-mask-image: linear-gradient(to bottom, transparent 0px, black 40px, black calc(100% - 40px), transparent 100%) !important;   \n}\n\n.bubble-pop-up.editor > .bubble-pop-up-container {\n    padding-bottom: 18px !important;\n    mask-image: none;\n    -webkit-mask-image: none;  \n    overflow: hidden;  \n}\n\n.editor .bubble-pop-up-background {\n    width: 100%;\n    height: 100%;\n    left: 0px;\n    top: 0px;\n    z-index: -1;\n    display: flex;\n    position: absolute;\n    background-color: var(--bubble-pop-up-main-background-color, var(--bubble-pop-up-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--secondary-background-color)))));\n    border-radius: var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) !important;\n    backdrop-filter: none;\n    -webkit-backdrop-filter: none;\n}\n\n.no-header .bubble-header-container {\n    visibility: hidden !important;\n    height: 0px !important;\n    opacity: 0 !important;\n}\n\n.no-header .bubble-pop-up-container {\n    padding-top: 4px !important;\n}\n\n.no-header .bubble-pop-up-container.is-scrollable {\n    mask-image: linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 24px), transparent 100%) !important;\n    -webkit-mask-image: linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 24px), transparent 100%) !important;\n}\n\n.large .bubble-header-container {\n  height: calc( var(--row-height,56px) * var(--row-size,1) + var(--row-gap,8px) * ( var(--row-size,1) - 1 ));\n}\n\n.large .bubble-close-button {\n    height: var(--row-height,56px);\n    width: var(--row-height,56px);\n    --mdc-icon-size: 28px !important;\n} ";let t,n=e.popUp.querySelector("style");e.stylesAdded&&n?e.elements.customStyle=n:(e.elements.customStyle=(0,s.n)("style"),e.popUp.appendChild(e.elements.customStyle),e.popUp.appendChild(e.elements.style),e.stylesAdded=!0);const o=e.config.bg_opacity??88;function i(){t=getComputedStyle(document.body).getPropertyValue("--ha-card-background")||getComputedStyle(document.body).getPropertyValue("--card-background-color");const n=e.config.bg_color?e.config.bg_color:t,i=(0,r.Bz)(n,o/100,1.02);e.popUp.style.setProperty("--bubble-pop-up-background-color",i)}e.updatePopupColorListener=()=>{i()},yt.addEventListener("change",e.updatePopupColorListener,{passive:!0}),i(),e.popUp.style.setProperty("--desktop-width",e.config.width_desktop??"540px"),e.closeOnEscape=t=>{"Escape"===t.key&&e.config.hash===location.hash&&ot()};let a=e.config.slide_to_close_distance??400;e.handleTouchMove=e=>{e.touches[0].clientY-mt>a&&e.touches[0].clientY>gt&&ot(),gt=e.touches[0].clientY};const l=e.popUp.querySelector(".bubble-pop-up-container");if(null===l){e.elements.popUpContainer=(0,s.n)("div"),e.elements.popUpContainer.classList.add("bubble-pop-up-container");let p=e.popUp.firstChild;for(;p;)e.elements.popUpContainer.appendChild(p),p=e.popUp.firstChild}else e.elements.popUpContainer=l;const c=e.elements.popUpContainer,d=()=>{c.style.overflow,c.style.overflow="auto";const e=c.scrollHeight>c.clientHeight;c.style.overflow="",c.classList.toggle("is-scrollable",e)},u=new ResizeObserver(d);u.observe(c),e.popUpResizeObserver=u,setTimeout(d,150),e.popUpBackground=(0,s.n)("div","bubble-pop-up-background"),e.popUp.appendChild(e.popUpBackground),e.popUp.appendChild(e.elements.headerContainer),e.popUp.appendChild(e.elements.popUpContainer),e.config.hash!==location.hash&&at(e,0),window.dispatchEvent(new Event("location-changed"))}catch(h){console.error(h)}}(e)}else e.popUp&&e.elements&&((e.config.hash===location.hash||e.editor)&&((e.config.entity||e.config.name||e.config.icon)&&Kt(e,e.elements.header),function(e){const{backdropCustomStyle:t}=wt(e);(0,s.JK)(e,e.popUp),(0,a.SF)(e,e.popUp),(0,a.SF)(e,t);const n=e.config.show_header??!0;e.popUp.classList.contains("no-header")===n&&e.popUp.classList.toggle("no-header",!n)}(e)),e.editor||function(e){const t=e.config.trigger,n=e.config.trigger_close??!0;if(t){const o=!e.hasPageLoaded;e.hasPageLoaded=!0;const i=(0,xt.eC)(t);if(0===i.length)return void(e.previousTrigger=!1);if((0,xt.db)(i)){const t=(0,xt.XH)(i,e._hass);if(t===e.previousTrigger)return;e.config.hash===location.hash?t||o||!n||ot():t&&it(e.config.hash),e.previousTrigger=t}}else{let t=e.config.trigger_entity??"";if(""===t)return;let n=e.config.trigger_state??"",o=e.config.trigger_close??!1,i=e._hass.states[t]?.state;if(!t)return;if(!n)return;if(e.oldTriggerEntityState===i)return;const a=!e.hasPageLoaded;e.hasPageLoaded=!0,e.config.hash===location.hash?o&&n!==i&&(a||ot()):i===n&&it(e.config.hash),e.oldTriggerEntityState=i}}(e),function(e){if(!e.verticalStack||!e.popUp)return;const{popUp:t,sectionRow:n,sectionRowContainer:o,elements:i,config:a}=e,r=t.classList,l="hui-card"===n?.tagName.toLowerCase(),c=e.editor||e.detectedEditor;if(e.detectedEditor&&!e.dialogClosedListenerAdded?(window.addEventListener("dialog-closed",(()=>{i?.popUpContainer&&i.popUpContainer.classList.add("editor-cropped")}),{once:!0}),e.dialogClosedListenerAdded=!0):!e.detectedEditor&&e.dialogClosedListenerAdded&&(e.dialogClosedListenerAdded=!1),!(r.contains("is-popup-opened")&&!r.contains("editor"))&&l&&o&&o.classList.contains("card")&&c&&"none"===o.style.display&&(o.style.display=""),c)e.editorAccess||((0,s.qo)(!1),r.remove("is-popup-opened"),r.add("is-popup-closed","editor"),i?.content&&i.content.classList.add("popup-content-in-editor-mode"),!e.detectedEditor&&i?.popUpContainer&&i.popUpContainer.classList.add("editor-cropped"),e.editorAccess=!0,function(e){const{hideBackdrop:t}=wt(e),n=e.detectedEditor;e.editor||n?(t(),clearTimeout(e.removeDomTimeout),n||function(e){if(e.observer&&(e.observer.disconnect(),e.observer=null),e.sectionRow){const t=new IntersectionObserver((t=>{t.forEach((t=>{const n=e.editor||e.detectedEditor;t.isIntersecting&&!e.verticalStack.contains(e.popUp)&&n&&e.verticalStack.appendChild(e.popUp)}))}),{rootMargin:"100px",threshold:.01});t.observe(e.sectionRow),e.observer=t}}(e)):e.observer&&(e.observer.disconnect(),e.observer=null)}(e));else if(e.editorAccess){r.remove("editor"),i?.popUpContainer&&i.popUpContainer.classList.remove("editor-cropped"),i?.content&&i.content.classList.remove("popup-content-in-editor-mode"),e.observer&&(e.observer.disconnect(),e.observer=null);const n=location.hash,o=a.hash?a.hash.startsWith("#")?a.hash:"#"+a.hash:"";o&&n===o?(r.remove("is-popup-closed"),r.add("is-popup-opened"),(0,s.qo)(!0)):e.verticalStack.contains(t)&&ut(e,!0),e.editorAccess=!1}}(e))},button:Kt,separator:function(e){"separator"!==e.cardType&&function(e){const t="separator";e.elements={},e.elements.mainContainer=(0,s.n)("div","bubble-container bubble-separator separator-container"),e.elements.icon=(0,s.n)("ha-icon","bubble-icon"),e.elements.name=(0,s.n)("h4","bubble-name"),e.elements.line=(0,s.n)("div","bubble-line"),e.elements.mainContainer.appendChild(e.elements.icon),e.elements.mainContainer.appendChild(e.elements.name),e.elements.mainContainer.appendChild(e.elements.line),Wt(e,{type:t,styles:".bubble-container {\n    display: flex;\n    background: none;\n    align-items: center;\n    height: 40px;\n    overflow: visible;\n    --bubble-separator-border: none;\n}\n.bubble-icon {\n    display: inline-flex;\n    height: auto;\n    width: auto;\n    margin: 0 22px 0 8px;\n}\n.bubble-name {\n    margin: 0 30px 0 0;\n    font-size: 16px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.bubble-name:empty {\n    display: none;\n}\n\n.bubble-line {\n    border-radius: 6px;\n    margin-right: 14px;\n    opacity: 0.6;\n    flex-grow: 1;\n    height: 6px;\n    background-color: var(--bubble-line-background-color, var(--ha-card-background-color, var(--secondary-background-color)));\n}\n\n.bubble-sub-button-container {\n    margin-left: 8px;\n}\n\n.rows-2 .bubble-sub-button-container {\n    margin-left: 14px;\n}\n\n.large .bubble-container {\n    height: calc( var(--row-height,44px) * var(--row-size,0.8) + var(--row-gap,8px) * ( var(--row-size,0.8) - 1 ))\n}",withMainContainer:!1,withBaseElements:!1,withSubButtons:!0,iconActions:!1,buttonActions:!1}),e.cardType=t}(e),function(e){e.elements.icon.icon=(0,kt.sW)(e),""===e.elements.icon.icon&&""===e.elements.icon.style.margin?(e.elements.icon.style.margin="0px 8px",e.elements.icon.style.width="0px"):""!==e.elements.icon.icon&&"0px 8px"===e.elements.icon.style.margin&&(e.elements.icon.style.margin="",e.elements.icon.style.width="")}(e),Lt(e,!1),(0,Tt.Kr)(e),function(e){(0,s.JK)(e),(0,a.SF)(e)}(e)},cover:function(e){"cover"!==e.cardType&&function(e){const t="cover",n=Wt(e,{type:t,styles:".bubble-cover-button {\n  display: flex;\n  position: relative;\n  height: 36px;\n  width: 36px;\n  border-radius: var(--bubble-cover-buttons-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n  background-color: var(--bubble-cover-button-background-color);\n  cursor: pointer;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  transition: all 0.3s ease;\n  box-sizing: border-box;\n}\n\n.bubble-cover-button-icon {\n  --mdc-icon-size: 20px;\n  color: var(--primary-text-color);\n  line-height: normal;\n}\n\n.bubble-buttons-container {\n  align-items: center;\n  gap: 8px;\n}\n\n.bubble-button.disabled {\n  opacity: 0.3 !important;\n  pointer-events: none !important;\n  cursor: none !important;\n}\n\n.large .bubble-cover-button-icon {\n  --mdc-icon-size: 24px;\n}",withSubButtons:!0,iconActions:!0,buttonActions:!0});function o(e,t,n){const o=(0,s.n)("div",`bubble-cover-button ${t}`),i=(0,s.n)("ha-icon",`bubble-cover-button-icon ${n}`);i.setAttribute("icon",e);const a=(0,s.n)("div","bubble-feedback-container"),r=(0,s.n)("div","bubble-feedback-element feedback-element");return a.appendChild(r),o.appendChild(a),o.appendChild(i),o.icon=i,o.feedback=r,o.haRipple=(0,s.n)("ha-ripple"),o.appendChild(o.haRipple),o}n.buttonsContainer.classList.add("bubble-buttons","buttons-container"),n.buttonOpen=o("mdi:arrow-up","bubble-button bubble-open button open","bubble-icon-open"),n.buttonStop=o("mdi:stop","bubble-button bubble-stop button stop","bubble-icon-stop"),n.buttonClose=o("mdi:arrow-down","bubble-button bubble-close button close","bubble-icon-close"),n.buttonsContainer.append(n.buttonOpen,n.buttonStop,n.buttonClose),n.buttonOpen.addEventListener("click",(()=>{(0,s.jp)("selection");const t=e.config.open_service??"cover.open_cover",[n,o]=t.split(".");e._hass.callService(n,o,{entity_id:e.config.entity})})),n.buttonStop.addEventListener("click",(()=>{(0,s.jp)("selection");const t=e.config.stop_service??"cover.stop_cover",[n,o]=t.split(".");e._hass.callService(n,o,{entity_id:e.config.entity})})),n.buttonClose.addEventListener("click",(()=>{(0,s.jp)("selection");const t=e.config.close_service??"cover.close_cover",[n,o]=t.split(".");e._hass.callService(n,o,{entity_id:e.config.entity})})),e.cardType=t}(e),Mt(e),Et(e),Lt(e),At(e),function(e){const t=e._hass.states[e.config.entity],{current_position:n,assumed_state:o}=t.attributes,i=Gt(t,1),a=Gt(t,2),r=Gt(t,8),l=function(e){return void 0!==e.attributes.current_position?100===e.attributes.current_position:"open"===e.state}(t),c=function(e){return void 0!==e.attributes.current_position?0===e.attributes.current_position:"closed"===e.state}(t),d="curtain"===(0,s.D$)(e,"device_class");e.elements.icon.icon=l?(0,kt.sW)(e,e.config.entity,e.config.icon_open):(0,kt.sW)(e,e.config.entity,e.config.icon_close);const u=e.config.icon_up||(d?"mdi:arrow-expand-horizontal":"mdi:arrow-up"),p=e.config.icon_down||(d?"mdi:arrow-collapse-horizontal":"mdi:arrow-down");e.elements.buttonOpen.icon.setAttribute("icon",u),e.elements.buttonClose.icon.setAttribute("icon",p),void 0!==n?(l?e.elements.buttonOpen.classList.add("disabled"):i&&e.elements.buttonOpen.classList.remove("disabled"),c?e.elements.buttonClose.classList.add("disabled"):a&&e.elements.buttonClose.classList.remove("disabled")):(e.elements.buttonOpen.classList.remove("disabled"),e.elements.buttonClose.classList.remove("disabled")),e.elements.buttonStop.style.display=r?"":"none"}(e),(0,Tt.Kr)(e),function(e){(0,s.JK)(e),(0,a.SF)(e)}(e)},"empty-column":function(e){"empty-column"!==e.cardType&&function(e){e.elements={},e.elements.emptyColumnCard=(0,s.n)("div","bubble-empty-column empty-column"),e.elements.style=(0,s.n)("style"),e.elements.style.innerText=".empty-column {\n    display: flex;\n    width: 100%;\n}\n",e.elements.customStyle=(0,s.n)("style"),e.content.innerHTML="",e.content.appendChild(e.elements.emptyColumnCard),e.content.appendChild(e.elements.style),e.content.appendChild(e.elements.customStyle),e.cardType="empty-column"}(e)},"horizontal-buttons-stack":function(e){"horizontal-buttons-stack"!==e.cardType&&function(e){e.elements={},e.elements.buttons=[],e.elements.cardContainer=(0,s.n)("div","bubble-horizontal-buttons-stack-card-container horizontal-buttons-stack-container");let t=1;for(;e.config[t+"_link"];)e.elements.cardContainer.appendChild(Zt(e,t)),t++;e.elements.style=(0,s.n)("style"),e.elements.style.innerText="@keyframes from-bottom {\n    0% { transform: translate(-50%, 100px); }\n    26% { transform: translate(-50%, -8px); }\n    46% { transform: translate(-50%, 1px); }\n    62% { transform: translate(-50%, -2px); }\n    70% { transform: translate(-50%, 0); }\n    100% { transform: translate(-50%, 0); }\n}\n@keyframes pulse {\n    0% { filter: brightness(0.7); }\n    100% { filter: brightness(1.3); }\n}\nha-card {\n    border-radius: 0;\n}\n.horizontal-buttons-stack-card {\n    bottom: 16px;\n    height: 51px;\n    margin-top: 0;\n    position: fixed;\n    width: calc(100% - var(--mdc-drawer-width, 0px) - 8px);\n    left: calc(var(--mdc-drawer-width, 0px) + 4px);\n    z-index: 6; /* Higher value hide the more-info panel */\n}\n@media only screen and (max-width: 870px) {\n    .horizontal-buttons-stack-card {\n        width: calc(100% - 16px);\n        left: 8px;\n    }\n\n    .horizontal-buttons-stack-card::before {\n        left: -10px;\n    }\n}\n.horizontal-buttons-stack-card::before {\n    content: '';\n    position: absolute;\n    top: -32px;\n    display: none;\n    background: linear-gradient(0deg, var(--bubble-horizontal-buttons-stack-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--primary-background-color)))) 50%, transparent);\n    width: 200%;\n    height: 100px;\n    pointer-events: none;\n}\n.has-gradient.horizontal-buttons-stack-card::before {\n    display: block;\n}\n\n.card-content {\n    width: calc(100% + 36px);\n    padding: 0 !important;\n    max-width: calc(var(--desktop-width) - 8px);\n    box-sizing: border-box;\n    overflow: scroll;\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%);\n    -ms-overflow-style: none;\n    scrollbar-width: none;\n    mask-image: linear-gradient(\n        90deg,\n        #000000 0%,\n        #000000 calc(0% + 28px),\n        #000000 calc(100% - 28px),\n        transparent 100%\n    );\n}\n.is-scrollable.card-content {\n    padding: 0 !important;\n    width: 100%;\n}\n.is-scrolled.card-content {\n    padding: 0 !important;\n    width: 100%;\n    mask-image: linear-gradient(\n        90deg,\n        transparent 0%,\n        #000000 calc(0% + 28px),\n        #000000 calc(100% - 28px),\n        transparent 100%\n    );\n}\n.is-maxed-scroll.card-content {\n    mask-image: linear-gradient(\n        90deg,\n        transparent 0%,\n        #000000 calc(0% + 28px),\n        #000000 calc(100% - 28px),\n        #000000 100%\n    );\n}\n.card-content::-webkit-scrollbar {\n    display: none;\n}\n\n.bubble-horizontal-buttons-stack-card-container {\n    height: 51px;\n    position: relative;\n    margin: auto;\n}\n\n.bubble-button {\n    align-items: center;\n    border-radius: var(--bubble-horizontal-buttons-stack-border-radius, var(--bubble-border-radius, 32px));\n    color: var(--primary-text-color);\n    cursor: pointer;\n    display: inline-flex;\n    height: 50px;\n    left: 0;\n    padding: 0 16px;\n    position: absolute;\n    white-space: nowrap;\n    z-index: 1;\n    transition: transform 1s;\n    box-sizing: border-box;\n}\n.bubble-button.highlight {\n    animation: pulse 1.4s infinite alternate;\n}\n.bubble-background-color {\n    border: 1px solid var(--primary-text-color);\n    border-radius: var(--bubble-horizontal-buttons-stack-border-radius, var(--bubble-border-radius, 32px));\n    box-sizing: border-box;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    transition: background-color 1s;\n    width: 100%;\n    z-index: 1;\n}\n.bubble-background {\n    opacity: 0.8;\n    border-radius: var(--bubble-horizontal-buttons-stack-border-radius, var(--bubble-border-radius, 32px));\n    width: 100%;\n    height: 100%;\n    box-sizing: border-box !important;\n    position: absolute;\n    left: 0;\n    z-index: 0;\n    background-color: var(--bubble-horizontal-buttons-stack-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--secondary-background-color))));\n}\n.bubble-icon {\n    height: 24px;\n    width: 24px;\n    z-index: 2;\n}\n.bubble-icon + .bubble-name {\n    margin-left: 8px;\n    z-index: 2;\n}\n\n.horizontal-buttons-stack-card.editor {\n    position: relative;\n    width: 100%;\n    left: 0;\n    bottom: 0;\n}\n.horizontal-buttons-stack-card.editor::before {\n    background: none;\n}",e.elements.customStyle=(0,s.n)("style"),e.card.classList.add("horizontal-buttons-stack-card"),e.card.style.marginLeft=e.config.margin??"",e.config.hide_gradient||e.card.classList.add("has-gradient"),e.card.style.setProperty("--desktop-width",e.config.width_desktop??"500px"),e.elements.cardContainer.appendChild(e.elements.style),e.elements.cardContainer.appendChild(e.elements.customStyle),e.content.appendChild(e.elements.cardContainer),e.content.addEventListener("scroll",(()=>{e.content.scrollLeft>0?e.content.classList.add("is-scrolled"):e.content.classList.remove("is-scrolled"),e.content.scrollWidth-12<e.content.offsetWidth+e.content.scrollLeft?e.content.classList.add("is-maxed-scroll"):e.content.classList.remove("is-maxed-scroll")})),(e.config.rise_animation??1)&&(e.content.style.animation="from-bottom .6s forwards",setTimeout((()=>{e.content.style.animation="none"}),1500));let n=e.card.parentNode.host;n?.parentElement&&!e.editor&&"hui-card"===n?.parentElement?.tagName.toLowerCase()&&(n.parentElement.style.padding="0 0 80px"),e.cardType="horizontal-buttons-stack"}(e),function(e){(0,a.SF)(e)}(e),function(e){if(!e.config.auto_order)return;const t=e._hass.states;e.elements.buttons.sort(((e,n)=>{if(!t[e.pirSensor])return 1;if(!t[n.pirSensor])return-1;const o=t[e.pirSensor]?.last_updated,i=t[n.pirSensor]?.last_updated;return"on"===t[e.pirSensor]?.state&&"on"===t[n.pirSensor]?.state?o>i?-1:o===i?0:1:"on"===t[e.pirSensor]?.state?-1:"on"===t[n.pirSensor]?.state?1:o>i?-1:o===i?0:1}))}(e),function(e){e.elements.buttons.forEach((t=>{const n=t.index,o=e.config[`${n}_name`]??"",i=e.config[`${n}_icon`]??"",a=e.config[`${n}_pir_sensor`],r=e.config[`${n}_link`],s=e.config[`${n}_entity`];t.pirSensor=a,t.lightEntity=s,t.link=r,o?(t.name.innerText=o,t.name.style.display=""):t.name.style.display="none",i?(t.icon.icon=i,t.icon.style.display=""):t.icon.style.display="none",void 0===r&&(t.remove(),e.elements.buttons=e.elements.buttons.filter((e=>e!==t)),e.elements.buttons.forEach(((e,t)=>{e.index=t+1})))}));let t=e.elements.buttons.length+1;for(;void 0!==e.config[`${t}_link`];){if(!e.elements.buttons.find((e=>e.index===t))){const n=Zt(e,t);e.elements.buttons.push(n)}t++}}(e),function(e){e.editor||e.detectedEditor?(e.elements.cardContainer.classList.add("editor"),e.card.classList.add("editor")):(e.elements.cardContainer.classList.remove("editor"),e.card.classList.remove("editor"))}(e),function(e){let t=0;for(let n=0;n<e.elements.buttons.length;++n){let o=localStorage.getItem(`bubbleButtonWidth-${e.elements.buttons[n].link}`);e.elements.buttons[n].style.width="";const i=e.elements.buttons[n].offsetWidth;e.elements.buttons[n].style.width=`${i}px`,i>0&&(o=i,localStorage.setItem(`bubbleButtonWidth-${e.elements.buttons[n].link}`,`${i}`)),null!==o&&(e.elements.buttons[n].style.transform=`translateX(${t}px)`,e.elements.buttons[n].style.width="",t+=+o+12)}e.elements.cardContainer.style.width=`${t}px`}(e),function(e){e.elements.buttons.forEach((t=>{const n=e._hass.states[t.lightEntity],o=n?.attributes.rgb_color,i=n?.state;if(o){const e=(0,r.qd)(o)?"rgba(255, 220, 200, 0.5)":`rgba(${o}, 0.5)`;t.backgroundColor.style.backgroundColor=e,t.backgroundColor.style.borderColor="rgba(0, 0, 0, 0)"}else"on"==i?(t.backgroundColor.style.backgroundColor="rgba(255, 255, 255, 0.5)",t.backgroundColor.style.borderColor="rgba(0, 0, 0, 0)"):(t.backgroundColor.style.backgroundColor="rgba(0, 0, 0, 0)",t.backgroundColor.style.borderColor="var(--primary-text-color)")}))}(e),function(e){e.content.scrollWidth>=e.content.offsetWidth?e.content.classList.add("is-scrollable"):e.content.classList.remove("is-scrollable")}(e)},calendar:function(e){"calendar"!==e.cardType&&function(e){const t="calendar",n=Wt(e,{type:t,styles:'.bubble-container {\n  height: var(--bubble-calendar-height, 56px);\n  display: flex;\n  gap: 8px;\n}\n.card-content::after {\n  border-radius: 0 0 var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px)) var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px));\n  content: "";\n  display: flex;\n  height: 32px;\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  pointer-events: none;\n  transition: opacity .2s, transform .2s;\n  background: -webkit-linear-gradient(0deg, var(--bubble-calendar-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color)))), transparent 14px);\n  background: -moz-linear-gradient(0deg, var(--bubble-calendar-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color)))), transparent 14px);\n  background: linear-gradient(0deg, var(--bubble-calendar-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color)))), transparent 14px);\n  z-index: 1;\n}\n.bubble-calendar-content {\n  flex-grow: 1;\n  min-width: 0;\n}\n.bubble-sub-button-container {\n  flex-shrink: 0;\n  position: sticky !important;\n  top: 0;\n}\n.bubble-day-wrapper {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  width: 100%;\n  gap: 8px;\n  padding: 7px 16px 7px 8px;\n  position: relative;\n  box-sizing: border-box;\n}\n.bubble-day-wrapper + .bubble-day-wrapper::before {\n  content: "";\n  position: absolute;\n  top: -1px;\n  left: 62px;\n  right: 16px;\n  height: 2px;\n  background-color: var(--bubble-button-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n}\n.bubble-day-chip {\n  display: flex;\n  flex-grow: 0;\n  flex-shrink: 0;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  border-radius: var(--bubble-button-icon-border-radius, var(--bubble-icon-border-radius, var(--bubble-border-radius, 50%)));\n  background-color: var(--bubble-button-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n  position: relative;\n}\n.bubble-day-number {\n  font-size: 24px;\n  line-height: 20px;\n  font-weight: 600;\n  opacity: 0.6;\n}\n.is-active .bubble-day-number {\n  filter: brightness(1.1);\n  opacity: 1;\n}\n.bubble-day-month {\n  font-size: 12px;\n  line-height: 12px;\n  font-weight: 400;\n  opacity: 0.6;\n}\n.is-active .bubble-day-month {\n  filter: brightness(1.1);\n  opacity: 1;\n}\n.bubble-day-events {\n  width: 100%;\n  border-radius: var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px));\n  min-width: 0;\n}\n.bubble-event {\n  background-color: var(--bubble-event-background-color);\n  background-image: var(--bubble-event-background-image);\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  padding: 4px 6px;\n  border-radius: var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px));\n  margin-left: -6px;\n  position: relative;\n  line-height: 1em;\n}\n.bubble-event-time {\n  font-size: 12px;\n  font-weight: 400;\n  white-space: nowrap;\n  flex-shrink: 0;\n  flex-grow: 0;\n  opacity: 0.7;\n}\n.bubble-event-color {\n  height: 12px;\n  width: 12px;\n  border-radius: var(--bubble-calendar-border-radius, var(--bubble-border-radius, 32px));\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n.bubble-event-name-wrapper {\n  width: 10px;\n  flex: 1;\n}\n.bubble-event-name {\n  font-size: 13px;\n  font-weight: 600;\n  max-width: 100%;\n  min-width: 0;\n  flex-shrink: 1;\n  flex-grow: 1;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.bubble-event-place {\n  opacity: 0.6;\n  display: flex;\n  align-items: center;\n  margin-top: 2px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  min-width: 0;\n  flex-shrink: 1;\n  flex-grow: 1;\n}\n.bubble-event-place-icon {\n  display: inline-flex;\n  --mdc-icon-size: 12px;\n  margin-right: 4px;\n}',withBaseElements:!1,withSubButtons:!0,iconActions:!1,buttonActions:!1});n.calendarCardContent=(0,s.n)("div","bubble-calendar-content"),n.mainContainer.style.setProperty("--bubble-calendar-height",56*(e.config.rows??1)+"px"),n.mainContainer.prepend(n.calendarCardContent),e.cardType=t}(e);const t=JSON.stringify(e.config.entities.map((t=>e._hass.states[t.entity])));e.cacheKey!==t&&(e.cacheKey=t,setTimeout((()=>{e.cacheKey=""}),9e5),async function(e){const t=e.config.days??7,n=`start=${(new Date).toISOString()}&end=${new Date((new Date).getTime()+864e5*t).toISOString()}`,o=e.config.entities.map((async t=>{const o=`calendars/${t.entity}?${n}`;return(await e._hass.callApi("get",o)).map((e=>({...e,entity:t})))})),i=await Promise.all(o);e.events=i.flat().sort(((e,t)=>{const n=en(e.start),o=en(t.start),i=void 0!==e.start.date,a=void 0!==t.start.date;return i&&!a?-1:!i&&a?1:n.getTime()-o.getTime()})).slice(0,e.config.limit??void 0)}(e).then((()=>{!async function(e){const t=e.events.reduce(((e,t)=>{const n=(e=>{const t=en(e);return`${t.getFullYear()}-${(t.getMonth()+1).toString().padStart(2,"0")}-${t.getDate().toString().padStart(2,"0")}`})(t.start);return e[n]||(e[n]=[]),e[n].push(t),e}),{});if(0===Object.keys(t).length){const e=(new Date).toISOString().split("T")[0];t[e]=[{start:{date:e},end:{date:e},summary:"No events",entity:{color:"transparent"}}]}const n=new DocumentFragment;Object.keys(t).sort().forEach((o=>{const a=en({date:o}),r=new Date,l=(0,s.n)("div","bubble-day-number"),c=e._hass.locale.language;l.innerHTML=`${a.getDate()}`;const d=(0,s.n)("div","bubble-day-month");d.innerHTML=a.toLocaleString(c,{month:"short"});const u=(0,s.n)("div","bubble-day-chip");u.appendChild(l),u.appendChild(d),a.getDate()===r.getDate()&&a.getMonth()===r.getMonth()&&u.classList.add("is-active"),(0,i.dN)(u,{...e.config},null);const p=(0,s.n)("div","bubble-day-events");t[o].forEach((t=>{const n=void 0!==t.start.date,o=new Date,a=en(t.start),r=en(t.end),l=(0,s.n)("div","bubble-event-time");l.innerHTML=n?"全天":a.toLocaleTimeString(c,{hour:"numeric",minute:"numeric"}),n||!0!==e.config.show_end||(l.innerHTML+=` – ${r.toLocaleTimeString(c,{hour:"numeric",minute:"numeric"})}`);const d=(0,s.n)("div","bubble-event-name-wrapper"),u=(0,s.n)("div","bubble-event-name"),h=t.summary||"忙碌";(0,s.Nl)(e,u,h),u.innerHTML=h,d.appendChild(u);const b=(0,s.n)("div","bubble-event-color");if(b.style.backgroundColor=t.entity.color?t.entity.color.startsWith("#")?t.entity.color:`var(--${t.entity.color}-color)`:xe(we(t.entity.entity)),"transparent"===t.entity.color&&(b.style.display="none"),!0===e.config.show_place&&null!==t.location){const n=(0,s.n)("div","bubble-event-place");n.innerHTML=t.location,(0,s.Nl)(e,n,t.location),d.appendChild(n)}const m=(0,s.n)("div","bubble-event");m.appendChild(b),m.appendChild(l),m.appendChild(d),(0,i.dN)(m,e.config.event_action,t.entity.entity,{tap_action:{action:"none"},double_tap_action:{action:"none"},hold_action:{action:"none"}});const g="var(--bubble-event-accent-color, var(--bubble-accent-color, var(--bubble-default-color)))";if(!0===e.config.show_progress&&n&&a<o)m.style.setProperty("--bubble-event-background-color",g);else if(!0===e.config.show_progress&&!n&&a<o){const e=Qt(a,r),t=100*Qt(a,o)/e;m.style.setProperty("--bubble-event-background-image",`linear-gradient(to right, ${g} ${t}%, transparent ${t}%)`)}p.appendChild(m)}));const h=(0,s.n)("div","bubble-day-wrapper");h.appendChild(u),h.appendChild(p),n.appendChild(h),e.elements.mainContainer.scrollHeight>e.elements.mainContainer.offsetHeight&&e.content.classList.add("is-overflowing")})),e.elements.calendarCardContent.innerHTML="",e.elements.calendarCardContent.appendChild(n)}(e)}))),function(e){(0,s.JK)(e),(0,a.SF)(e)}(e),(0,Tt.Kr)(e)},"media-player":function(e){"media-player"!==e.cardType&&function(e){const t="media-player",n=Wt(e,{type:t,styles:".bubble-media-button {\n    display: flex;\n    position: relative;\n    height: 36px;\n    width: 36px;\n    border-radius: var(--bubble-media-player-buttons-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n    background-color: var(--bubble-media-player-button-background-color);\n    cursor: pointer;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    transition: all 0.3s ease;\n    box-sizing: border-box;\n}\n\n.bubble-button-container {\n    align-items: center;\n    gap: 8px;\n  }\n\n.bubble-media-button-icon {\n    --mdc-icon-size: 20px;\n    color: var(--primary-text-color);\n    line-height: normal;\n}\n\n.bubble-play-pause-button {\n    background-color: var(--bubble-accent-color, var(--bubble-default-color));\n}\n\n.bubble-play-pause-button .bubble-media-button-icon {\n    color: var(--bubble-media-player-play-pause-icon-color, var(--bubble-button-active-icon-color, var(--primary-background-color, white)));\n}\n\n.bubble-play-pause-button:not(.large) {\n    height: 36px;\n    width: 36px;\n}\n\n.bubble-volume-slider {\n    position: absolute;\n    height: 38px;\n    width: var(--bubble-volume-slider-width-calc, var(--volume-slider-width-calc, calc(100% - 150px)));\n    left: var(--bubble-volume-slider-left-offset, var(--volume-slider-left-offset, 56px));\n    overflow: hidden;\n    border-radius: var(--bubble-media-player-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n    z-index: 1;\n    background-color: var(--bubble-media-player-slider-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n    opacity: 1;\n    transition: opacity .2s, transform .2s;\n    transform: translateX(0);\n}\n\n.bubble-range-value {\n    display: flex;\n    justify-content: flex-end;\n    height: 38px;\n    align-items: center;\n    font-size: 12px;\n    opacity: 0.8;\n    z-index: 1;\n}\n\n.bubble-mute-button {\n    opacity: 1;\n    transition: opacity .2s, transform .2s;\n    transform: translateX(0);\n}\n\n.is-hidden {\n    opacity: 0 !important;\n    pointer-events: none;\n    transform: translateX(14px);\n}\n\n.bubble-range-fill {\n    background-color: var(--bubble-accent-color, var(--bubble-default-color));\n}\n\n.bubble-mute-button {\n    display: flex;\n    position: absolute;\n    height: 38px;\n    width: 38px;\n    justify-content: center;\n    align-items: center;\n}\n\n.bubble-media-info-container {\n    display: flex;\n    line-height: 14px;\n    font-size: 12px;\n    flex-direction: column;\n    justify-content: center;\n    flex-grow: 1;\n    margin: 0 16px 0 4px;\n    pointer-events: none;\n    position: relative;\n    overflow: hidden;\n}\n\n.bubble-title,\n.bubble-artist {\n    display: flex;\n    margin: 2px 0;\n    position: relative;\n    white-space: nowrap;\n}\n\n.bubble-title {\n    font-weight: 600;\n}\n\n.bubble-background {\n    background-size: cover;\n    background-position: center;\n    filter: blur(50px);\n    opacity: 0.5;\n}\n\n@media screen and (max-width: 250px) {\n    .bubble-previous-button {\n        display: none;\n    }\n}\n\n@media screen and (max-width: 206px) {\n    .bubble-next-button {\n        display: none;\n    }\n}\n\n@media screen and (max-width: 160px) {\n    .bubble-volume-button {\n        display: none;\n    }\n}\n\n.large .bubble-mute-button {\n  height: 42px;\n  width: 42px;\n}\n\n.large .bubble-volume-slider {\n  height: 42px;\n  border-radius: var(--bubble-media-player-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n  left: var(--volume-slider-left-offset, 60px);\n  width: var(--volume-slider-width-calc, calc(100% - 164px));\n}\n\n.large .bubble-range-value {\n  place-items: center;\n  height: 42px;\n}\n\n.large .bubble-play-pause-button {\n  height: 42px;\n  width: 42px;\n}",iconActions:!0,buttonActions:!0,withSubButtons:!0});function o(e,t){const n=(0,s.n)("div",`bubble-media-button ${t}`),o=(0,s.n)("ha-icon","bubble-media-button-icon");o.setAttribute("icon",e);const i=(0,s.n)("div","bubble-feedback-container"),a=(0,s.n)("div","bubble-feedback-element feedback-element");return i.appendChild(a),n.appendChild(i),n.appendChild(o),n.icon=o,n.feedback=a,n.haRipple=(0,s.n)("ha-ripple"),n.appendChild(n.haRipple),n}n.mediaInfoContainer=(0,s.n)("div","bubble-media-info-container"),n.playPauseButton=o("mdi:play","bubble-play-pause-button"),n.previousButton=o("mdi:skip-previous","bubble-previous-button"),n.nextButton=o("mdi:skip-next","bubble-next-button"),n.volumeButton=o("mdi:volume-high","bubble-volume-button"),n.powerButton=o("mdi:power","bubble-power-button"),n.muteButton=o("mdi:volume-off","bubble-mute-button is-hidden"),n.title=(0,s.n)("div","bubble-title"),n.artist=(0,s.n)("div","bubble-artist"),n.background.classList.add("bubble-cover-background"),n.buttonsContainer.classList.add("bubble-button-container"),n.iconContainer.appendChild(n.muteButton),n.mediaInfoContainer.append(n.title,n.artist),n.contentContainer.append(n.mediaInfoContainer),n.buttonsContainer.append(n.powerButton,n.previousButton,n.nextButton,n.volumeButton,n.playPauseButton),n.volumeSliderContainer=(0,s.n)("div","bubble-volume-slider is-hidden"),Rt(e,{targetElement:n.volumeSliderContainer,sliderLiveUpdate:!1,withValueDisplay:!0,holdToSlide:!1}),n.cardWrapper.appendChild(n.volumeSliderContainer),n.volumeButton.addEventListener("click",(()=>{n.volumeSliderContainer.classList.toggle("is-hidden"),n.muteButton.classList.toggle("is-hidden"),n.icon.classList.toggle("is-hidden"),n.image.classList.toggle("is-hidden"),function(e){const t=e.elements.volumeButton.isHidden,n=t?"1":"0",o=t?"mdi:volume-high":"mdi:close";e.elements.volumeButton.icon.setAttribute("icon",o),e.elements.mediaInfoContainer.style.opacity=n,e.elements.nameContainer.style.opacity=n,e.elements.subButtonContainer&&(e.elements.subButtonContainer.style.opacity=n),e.elements.previousButton.style.opacity=n,e.elements.nextButton.style.opacity=n,e.elements.powerButton.style.opacity=n,e.elements.volumeButton.isHidden=!t}(e)})),(0,i.pd)(n.volumeButton,n.volumeButton.feedback),n.powerButton.addEventListener("click",(()=>{const t=(0,s.Gu)(e),n="off"!==t&&"unknown"!==t;e._hass.callService("media_player",n?"turn_off":"turn_on",{entity_id:e.config.entity})})),(0,i.pd)(n.powerButton,n.powerButton.feedback),n.muteButton.addEventListener("pointerdown",(t=>{t.stopPropagation();const o=!0===(0,s.D$)(e,"is_volume_muted");e._hass.callService("media_player","volume_mute",{entity_id:e.config.entity,is_volume_muted:!o}),n.muteButton.clicked=!0})),["click","touchstart","touchend","pointerup","pointercancel"].forEach((e=>{n.muteButton.addEventListener(e,(e=>{e.stopPropagation()}))})),(0,i.pd)(n.muteButton,n.muteButton.feedback),n.previousButton.addEventListener("click",(()=>{e._hass.callService("media_player","media_previous_track",{entity_id:e.config.entity})})),(0,i.pd)(n.previousButton,n.previousButton.feedback),n.nextButton.addEventListener("click",(()=>{e._hass.callService("media_player","media_next_track",{entity_id:e.config.entity})})),(0,i.pd)(n.nextButton,n.nextButton.feedback),n.playPauseButton.addEventListener("click",(()=>{const{service:t}=on(e);e._hass.callService("media_player",t,{entity_id:e.config.entity}),n.playPauseButton.clicked=!0})),(0,i.pd)(n.playPauseButton,n.playPauseButton.feedback),n.mainContainer.addEventListener("click",(()=>(0,s.jp)("selection"))),e.cardType=t}(e),Mt(e),Lt(e),function(e){const t=(0,s.D$)(e,"media_title"),n=(0,s.D$)(e,"media_artist"),o=t+n;o!==e.previousMediaState&&(e.elements.artist.style.display=""===n?"none":"flex",e.previousMediaState=o,(0,s.Nl)(e,e.elements.title,t),(0,s.Nl)(e,e.elements.artist,n))}(e),function(e){(0,s.D$)(e,"media_title");const t=""===(0,s.D$)(e,"media_artist");e.elements.mediaInfoContainer.style.display=t?"none":"",e.elements.nameContainer.style.display=t?"":"none"}(e),Et(e),function(e){const t=(0,s.$C)(e),n=(0,kt.Qp)(e),o=e.config.cover_background,i=e.elements.background.style.backgroundImage;if(o&&t&&n){const t="url("+n+")";i!==t&&(e.elements.background.style.backgroundImage=t)}else""!==i&&(e.elements.background.style.backgroundImage="")}(e),At(e),function(e){e.elements.rangeFill&&Bt(e)}(e),function(e){const{icon:t}=on(e);e.elements.playPauseButton.icon.setAttribute("icon",t),e.elements.playPauseButton.clicked=!1}(e),function(e){const t=1==(0,s.D$)(e,"is_volume_muted");e.elements.muteButton.clicked,"var(--primary-text-color)"!==e.elements.muteButton.icon.style.color&&(e.elements.muteButton.icon.style.color="var(--primary-text-color)"),t?e.elements.muteButton.icon.setAttribute("icon","mdi:volume-off"):e.elements.muteButton.icon.setAttribute("icon","mdi:volume-high"),e.elements.muteButton.clicked=!1}(e),function(e){const t=(0,s.Gu)(e),n="off"!==t&&"unknown"!==t;e.elements.powerButton.icon.style.color=n?"var(--accent-color)":""}(e),(0,Tt.Kr)(e),function(e){(0,s.JK)(e),(0,a.SF)(e);const t=(0,s.Gu)(e),n="off"!==t&&"unknown"!==t,o="playing"===t,i="paused"===t,r="idle"===t,l=function(e){const t=tn(e);return{canPrevious:nn(t,16),canNext:nn(t,32),canPlay:nn(t,16384),canPause:nn(t,1),canStop:nn(t,4096),canTurnOn:nn(t,128),canTurnOff:nn(t,256),canVolumeSet:nn(t,4),canVolumeStep:nn(t,1024),canMute:nn(t,8)}}(e),c=!e.config.hide?.power_button&&(l.canTurnOn||l.canTurnOff),d=!e.config.hide?.previous_button&&l.canPrevious&&(e.editor||o||i),u=!e.config.hide?.next_button&&l.canNext&&(e.editor||o||i),p=!e.config.hide?.volume_button&&(l.canVolumeSet||l.canVolumeStep||l.canMute)&&(e.editor||n),h=!e.config.hide?.play_pause_button&&(e.editor||n&&o&&(l.canPause||l.canStop)||n&&(i||r)&&l.canPlay),b=!(c||d||u||p||h);(!n&&e.config.hide?.power_button||b)&&"none"!==e.elements.buttonsContainer.style.display?e.elements.buttonsContainer.classList.add("hidden"):b&&e.config.hide?.power_button||!e.elements.buttonsContainer.classList.contains("hidden")||e.elements.buttonsContainer.classList.remove("hidden"),c||"none"===e.elements.powerButton.style.display?c&&e.elements.powerButton.classList.contains("hidden")&&e.elements.powerButton.classList.remove("hidden"):e.elements.powerButton.classList.add("hidden"),d||"none"===e.elements.previousButton.style.display?d&&e.elements.previousButton.classList.contains("hidden")&&e.elements.previousButton.classList.remove("hidden"):e.elements.previousButton.classList.add("hidden"),u||"none"===e.elements.nextButton.style.display?u&&e.elements.nextButton.classList.contains("hidden")&&e.elements.nextButton.classList.remove("hidden"):e.elements.nextButton.classList.add("hidden"),p||"none"===e.elements.volumeButton.style.display?p&&e.elements.volumeButton.classList.contains("hidden")&&e.elements.volumeButton.classList.remove("hidden"):e.elements.volumeButton.classList.add("hidden"),h||"none"===e.elements.playPauseButton.style.display?h&&e.elements.playPauseButton.classList.contains("hidden")&&e.elements.playPauseButton.classList.remove("hidden"):e.elements.playPauseButton.classList.add("hidden"),e.elements.muteButton&&(p&&l.canMute||"none"===e.elements.muteButton.style.display?p&&l.canMute&&e.elements.muteButton.classList.contains("hidden")&&e.elements.muteButton.classList.remove("hidden"):e.elements.muteButton.classList.add("hidden")),function(e){let t=50,n=146;e.content.classList.contains("large")&&(t=58,n=160);const o=(0,s.Gu)(e),i="off"!==o&&"unknown"!==o;(e.config.hide?.play_pause_button||!e.editor&&!i)&&(e.content.classList.contains("large")?n-=42:n-=36),e.elements.cardWrapper.style.setProperty("--volume-slider-left-offset",`${t}px`),e.elements.cardWrapper.style.setProperty("--volume-slider-width-calc",`calc(100% - ${n}px)`)}(e)}(e)},select:function(e){e.cardType,"select"!==e.cardType&&(function(e){try{const t=e.config?.button_action||{};e.config.button_action={...t,tap_action:{action:"none"}}}catch(e){}Wt(e,{type:"select",styles:".bubble-container {\n    overflow: inherit;\n    transition: border 0.3s ease;\n}\n\n.bubble-background {\n    cursor: pointer;\n}",withFeedback:!0,withSubButtons:!0,withIconActions:!0,buttonActions:!0}).mainContainer.classList.add("bubble-select-card-container"),e.cardType="select"}(e),(0,an.F)(e),(0,an.X)(e)),(0,rn.O)(e,e.elements,e.config.entity,e.config),Mt(e),Et(e),Lt(e),At(e),(0,Tt.Kr)(e),function(e){(0,s.JK)(e),(0,a.SF)(e)}(e)},climate:function(e){"climate"!==e.cardType&&function(e){const t="climate",n=Wt(e,{type:t,styles:".bubble-temperature-container, .bubble-low-temp-container, .bubble-high-temp-container {\n    display: inline-flex;\n    position: relative;\n    font-size: 12px;\n    white-space: nowrap;\n    justify-content: center;\n    align-items: center;\n    width: auto;\n    height: 36px;\n    border-radius: var(--bubble-sub-button-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n    background-color: var(--bubble-climate-button-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background))));\n}\n\n.bubble-low-temp-container {\n    color: var(--state-climate-heat-color, var(--state-climate-active-color, var(--state-active-color)));\n}\n\n.bubble-high-temp-container {\n    color: var(--state-climate-cool-color, var(--state-climate-active-color, var(--state-active-color)));\n}\n\n.bubble-target-temperature-container {\n    display: flex;\n    gap: 10px;\n}\n\n.bubble-climate-minus-button,\n.bubble-climate-plus-button {\n    display: flex;\n    position: relative;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    width: 34px;\n    height: 34px;\n    margin: 2px;\n    vertical-align: middle;\n    font-size: 18px;\n    color: var(--primary-text-color);\n    cursor: pointer;\n    border-radius: var(--bubble-sub-button-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));\n}\n\n.bubble-climate-minus-button-icon,\n.bubble-climate-plus-button-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    --mdc-icon-size: 16px;\n}\n\n@keyframes tap-warning {\n    10%, 90% { transform: translateX(-1px); }\n    20%, 80% { transform: translateX(1px); }\n    30%, 50%, 70% { transform: translateX(-2px); }\n    40%, 60% { transform: translateX(2px); }\n}",withSubButtons:!0,iconActions:!0,buttonActions:!0});function o(t,o,a){const r=Ct(e,a),l=(0,s.n)("div","bubble-climate-minus-button"),c=(0,s.n)("div","bubble-climate-plus-button"),d=(0,s.n)("ha-icon","bubble-climate-minus-button-icon");d.setAttribute("icon","mdi:minus"),l.appendChild(d),l.haRipple=(0,s.n)("ha-ripple"),l.appendChild(l.haRipple),(0,i.pd)(l);const u=(0,s.n)("ha-icon","bubble-climate-plus-button-icon");let p,h;u.setAttribute("icon","mdi:plus"),c.appendChild(u),c.haRipple=(0,s.n)("ha-ripple"),c.appendChild(c.haRipple),(0,i.pd)(c),"temperature"===o?(n.tempDisplay=(0,s.n)("div","bubble-temperature-display"),p=n.tempDisplay):"target_temp_low"===o?(n.lowTempDisplay=(0,s.n)("div","bubble-low-temperature-display"),p=n.lowTempDisplay):"target_temp_high"===o&&(n.highTempDisplay=(0,s.n)("div","bubble-high-temperature-display"),p=n.highTempDisplay),t.appendChild(l),t.appendChild(p),t.appendChild(c);let b=parseFloat((0,s.D$)(e,o))||0,m=b;function g(){const t=parseFloat((0,s.D$)(e,o))||0;t!==m&&(b=t,m=t)}function f(){g();const t={entity_id:e.config.entity};"target_temp_low"===o?(t.target_temp_low=b,t.target_temp_high=(0,s.D$)(e,"target_temp_high")):"target_temp_high"===o?(t.target_temp_high=b,t.target_temp_low=(0,s.D$)(e,"target_temp_low")):t[o]=b,e._hass.callService("climate","set_temperature",t)}function v(t){g();const i=e._hass.states[e.config.entity],l=e.config.min_temp??i?.attributes?.min_temp??0,c=e.config.max_temp??i?.attributes?.max_temp??1e3;let d=parseFloat((b+t).toFixed(r));if(d=Math.min(c,Math.max(l,d)),d<l?d=l:d>c&&(d=c),d!==b)b=d,function(t){"temperature"===o?n.tempDisplay.innerText=St(t,e,a):"target_temp_low"===o?n.lowTempDisplay.innerText=St(t,e,a):"target_temp_high"===o&&(n.highTempDisplay.innerText=St(t,e,a))}(b),clearTimeout(h),h=setTimeout(f,700);else{(0,s.jp)("failure");const t=e.elements.mainContainer;t.style.animation="tap-warning 0.4s cubic-bezier(.36,.07,.19,.97) both",setTimeout((()=>{t.style.animation=""}),500)}}l.addEventListener("click",(()=>v(-a))),c.addEventListener("click",(()=>v(a)))}n.temperatureContainer=(0,s.n)("div","bubble-temperature-container"),n.targetTemperatureContainer=(0,s.n)("div","bubble-target-temperature-container"),n.background.classList.add("bubble-color-background"),n.buttonsContainer.append(n.temperatureContainer,n.targetTemperatureContainer);const a=e._hass.states[e.config.entity],r="°C"===e._hass.config.unit_system.temperature,l=e.config.step??(a.attributes.target_temp_step?a.attributes.target_temp_step:r?.5:1);o(n.temperatureContainer,"temperature",l),n.lowTempContainer=(0,s.n)("div","bubble-low-temp-container"),o(n.lowTempContainer,"target_temp_low",l),n.targetTemperatureContainer.appendChild(n.lowTempContainer),n.highTempContainer=(0,s.n)("div","bubble-high-temp-container"),o(n.highTempContainer,"target_temp_high",l),n.targetTemperatureContainer.appendChild(n.highTempContainer),e.cardType=t}(e),Mt(e),Lt(e),Et(e),At(e),function(e){const t=(0,s.D$)(e,"temperature"),n=(0,s.Gu)(e);Ct(e),e.config.hide_temperature||"unavailable"===n||""===t||void 0===t?e.elements.temperatureContainer?.classList.add("hidden"):e.elements.temperatureContainer?.classList.remove("hidden"),t!==e.previousTemp&&(e.previousTemp=t,e.elements.tempDisplay&&""!==t&&void 0!==t&&(e.elements.tempDisplay.innerText=St(t,e)))}(e),function(e){const t=(0,s.D$)(e,"target_temp_low"),n=e.config.hide_target_temp_low,o=(0,s.Gu)(e);Ct(e),"unavailable"===o||""===t||void 0===t||n?(e.elements.targetTemperatureContainer?.classList.add("hidden"),e.elements.lowTempContainer?.classList.add("hidden")):(e.elements.targetTemperatureContainer?.classList.remove("hidden"),e.elements.lowTempContainer?.classList.remove("hidden")),t!==e.previousTargetTempLow&&(e.previousTargetTempLow=t,e.elements.lowTempDisplay&&""!==t&&void 0!==t&&(e.elements.lowTempDisplay.innerText=St(t,e)))}(e),function(e){const t=(0,s.D$)(e,"target_temp_high"),n=e.config.hide_target_temp_high,o=(0,s.Gu)(e);Ct(e),"unavailable"===o||""===t||void 0===t||n?e.elements.highTempContainer?.classList.add("hidden"):(e.elements.highTempContainer?.classList.remove("hidden"),e.elements.targetTemperatureContainer?.classList.remove("hidden")),t!==e.previousTargetTempHigh&&(e.previousTargetTempHigh=t,e.elements.highTempDisplay&&""!==t&&void 0!==t&&(e.elements.highTempDisplay.innerText=St(t,e)))}(e),(0,Tt.Kr)(e),function(e){(0,s.JK)(e),(0,a.SF)(e);const t=(0,s.Gu)(e);e.previousState!==t&&(e.previousState=t,e.elements.background.style.backgroundColor=`var(--bubble-climate-background-color, ${$t(e)})`),e.config.card_layout,e.elements.hvacModeDropdown}(e)}};class ln extends HTMLElement{editor=!1;isConnected=!1;_editorUpdateTimeout=null;connectedCallback(){this.isConnected=!0,function(e){if(!e.content){let t=e.shadowRoot||e.attachShadow({mode:"open"}),n=document.createElement("ha-card");n.style.cssText="background: none; border: none; box-shadow: none; border-radius: 16px;";let o=document.createElement("div");o.className="card-content",o.style.padding="0",n.appendChild(o),t.appendChild(n),e.card=n,e.content=o}}(this),(0,a.nO)(this),(0,r.$i)(),this._hass&&this.updateBubbleCard()}disconnectedCallback(){this.isConnected=!1,(0,i.Xs)();try{this.content&&(0,s.Iz)(this.content)}catch(e){}try{this._moduleChangeHandler&&(window.removeEventListener("bubble-card-modules-changed",this._moduleChangeHandler),window.removeEventListener("bubble-card-module-updated",this._moduleChangeHandler),document.removeEventListener("yaml-modules-updated",this._moduleChangeHandler),this._moduleChangeHandler=null,this._moduleChangeListenerAdded=!1)}catch(e){}clearTimeout(this._editorUpdateTimeout)}get detectedEditor(){return!!this.editor&&"hui-dialog-edit-card"===window.history?.state?.dialog}set editMode(e){this.editor!==e&&(this.editor=e,["pop-up","horizontal-buttons-stack"].includes(this.config.card_type)&&this.updateBubbleCard())}set hass(e){this._hass=e,this.updateBubbleCard()}updateBubbleCard(){if(!this.isConnected&&"pop-up"!==this.config.card_type)return;const e=this.config.card_type;sn[e]&&sn[e](this)}setConfig(e){if(e.error)throw new Error(e.error);const t={...e};if(!t.card_type)throw new Error("需要定义卡片类型");if(void 0!==t.grid_options?.rows&&(t.rows=t.grid_options.rows),"pop-up"===t.card_type){if(t.hash&&t.button_type&&"name"!==t.button_type&&!t.entity&&t.modules)throw new Error("需要定义实体")}else if("horizontal-buttons-stack"===t.card_type){const e={};for(const n in t)if(/^\d+_icon$/.test(n)){const o=n.replace("_icon","_link");if(void 0===t[o])throw new Error("需要定义"+o);if(e[t[o]])throw new Error("不能使用"+t[o]+"两次");e[t[o]]=!0}}else if(["button","cover","climate","select","media-player"].includes(t.card_type)){if(!t.entity&&"name"!==t.button_type)throw new Error("需要定义实体")}else if("calendar"===t.card_type&&!t.entities)throw new Error("需要定义实体列表");if("select"===t.card_type&&t.entity&&!t.select_attribute&&!t.entity.startsWith("input_select")&&!t.entity.startsWith("select"))throw new Error("缺少”从属性生成的选单“");this.config=t}getCardSize(){switch(this.config.card_type){case"pop-up":return-1e5;case"button":case"separator":case"empty-column":case"horizontal-buttons-stack":case"calendar":case"media-player":case"select":case"climate":return 1;case"cover":return 2}}getGridOptions(){const e=this.config.columns;let t={columns:e?3*e:12,rows:this.config.rows??"auto"};return"horizontal-buttons-stack"===this.config.card_type?t.rows=1.3:"separator"===this.config.card_type&&void 0===this.config.grid_options?.rows&&(t.rows=this.config.rows?"auto":.8),t}getLayoutOptions(){let e=1;"pop-up"===this.config.card_type?e=0:"horizontal-buttons-stack"===this.config.card_type?e=1:"cover"===this.config.card_type&&(e=2);let t=4;return"pop-up"===this.config.card_type?t=0:"horizontal-buttons-stack"===this.config.card_type&&(t=4),{grid_columns:this.config.columns??t,grid_rows:this.config.rows??e}}static getConfigElement(){return document.createElement("bubble-card-editor-zh")}}customElements.define("bubble-card-zh",ln),window.customCards=window.customCards||[],window.customCards.push({type:"bubble-card-zh",name:"Bubble Card 中文",preview:!1,description:"轻量、简洁的卡片组件，并提供流畅的弹出式交互。",documentationURL:"https://github.com/Vanadiry/Bubble-Card-zh/"}),console.info(`%c Bubble Card 中文 %c ${o} `,"background-color: #555;color: #fff;padding: 3px 2px 3px 3px;border-radius: 14px 0 0 14px;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)","background-color: #506eac;color: #fff;padding: 3px 3px 3px 2px;border-radius: 0 14px 14px 0;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)")})();