import { html, LitElement } from "lit";
import { fireEvent } from "../../tools/utils.js";
import { hashCode, intToRGB } from "../../cards/calendar/helpers.js";

const computeLabel = (schema) => {
  return schema.title || schema.label;
}

export class HaCalendarEntitySelectorZh extends LitElement {
  getSchema(entity) {
    return [{
      type: "expandable",
      name: "",
      title: entity
        ? this.hass.states[entity].attributes.friendly_name || entity
        : '添加日历',
      schema: [
        {
          name: 'entity',
          title: '实体',
          selector: { entity: { domain: ['calendar'] } },
        },
        {
          name: "color",
          title: '颜色',
          selector: { ui_color: {} },
        },
      ]
    }]
  }

  static properties = {
    hass: {},
    value: { type: Array },
    label: {},
  }
  
  constructor() {
    super();
    this.value = [];
  }

  render() {
    const addCalendar = () => {
      const newValue = [...(this.value || [])];
      newValue.push({ entity: '', color: '' });
      this.valueChanged({ detail: { value: newValue } });
    }
    const removeCalendar = (index) => () => {
      const newValue = [...(this.value || [])];
      newValue.splice(index, 1);
      this.valueChanged({ detail: { value: newValue } });
    }

    const value = this.value ?? [];
    
    return html`
      <ha-expansion-panel outlined style="--expansion-panel-summary-padding: 0 8px;">
        <h4 slot="header" style="display: flex; align-items: center; margin: 10px 0;">
          <ha-icon icon="mdi:calendar" style="margin: 8px;"></ha-icon>
          &nbsp;日历列表
        </h4>
        <div class="content"> 
          ${value.map((entity, index) => {
            const valueChanged = (ev) => {
              ev.stopPropagation();
              const newValue = [...(this.value || [])];
              newValue[index] = ev.detail.value;
              this.valueChanged({ detail: { value: newValue } });
            }
              
            return html`
              <div style="display: flex; align-items: center; margin: 12px 4px 14px 4px">
                <ha-form
                  .data=${entity}
                  .schema=${this.getSchema(entity.entity)}
                  .hass=${this.hass}
                  .computeLabel=${computeLabel}
                  @value-changed=${valueChanged}
                  style="flex-grow: 1;"
                ></ha-form>
                <ha-button @click=${removeCalendar(index)}>
                  <ha-icon icon="mdi:calendar-remove"></ha-icon>&nbsp;
                  删除此日历
                </ha-button>
              </div>
            `;
          })}
          <ha-button @click=${addCalendar} style="margin: 12px 4px 14px 4px;">
            <ha-icon icon="mdi:calendar-plus"></ha-icon>&nbsp;
            添加日历
          </ha-button>
        </div>
      </ha-expansion-panel>
    `;
  }

  valueChanged(ev) {
    const value = ev.detail.value
      .map((e) => {
        const defaultColor = e.entity ? intToRGB(hashCode(e.entity)) : '';

        return {
          entity: e.entity,
          color: e.color || defaultColor
        }
      });

    fireEvent(this, "value-changed", { value }, undefined);
  }
}

customElements.define("ha-selector-calendar_entity-zh", HaCalendarEntitySelectorZh);
