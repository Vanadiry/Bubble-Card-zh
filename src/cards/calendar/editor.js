import { html } from "lit";
import "../../components/editor/ha-selector-calendar_entity-zh.js";

export function renderCalendarEditor(editor){
    
    // S'assurer que event_action est initialisé
    if (!editor._config.event_action) {
        editor._config.event_action = {
            tap_action: { action: "more-info" },
            double_tap_action: { action: "none" },
            hold_action: { action: "none" }
        };
    }

    return html`
        <div class="card-config">
            ${editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList)}
            <ha-form
                .hass=${editor.hass}
                .data=${editor._config}
                .schema=${[
                  {
                    name: "entities",
                    title: "实体",
                    selector: { calendar_entity: {} },
                  },
                ]}   
                .computeLabel=${editor._computeLabelCallback}
                @value-changed=${editor._valueChanged}
            ></ha-form>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  日历设置
                </h4>
                <div class="content">
                    <ha-form
                      .hass=${editor.hass}
                      .data=${editor._config}
                      .schema=${[
                        {
                          name: 'limit',
                          label: '限制',
                          title: '限制',
                          selector: { number: { step: 1, min: 1} },
                        },
                        {
                          name: 'show_end',
                          label: '显示结束时间',
                          title: '显示结束时间',
                          selector: { boolean: {} },
                        },
                        {
                          name: 'show_progress',
                          label: '显示进度',
                          title: '显示进度',
                          selector: { boolean: {} },
                        },
                        {
                          name: 'show_place',
                          label: '显示地点',
                          title: '显示地点',
                          selector: { boolean: {} },
                        },
                        {
                          name: 'scrolling_effect',
                          label: '文字滚动效果',
                          title: '文字滚动效果',
                          selector: { boolean: {} },
                          default: true
                        }
                      ]}   
                      .computeLabel=${editor._computeLabelCallback}
                      @value-changed=${editor._valueChanged}
                    ></ha-form>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap"></ha-icon>
                  日期点击行为
                </h4>
                <div class="content">
                    ${editor.makeActionPanel("单击行为", editor._config, 'none')}
                    ${editor.makeActionPanel("双击行为")}
                    ${editor.makeActionPanel("长按行为")}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
                  事件点击行为
                </h4>
                <div class="content">
                    ${editor.makeActionPanel("单击行为", editor._config.event_action, 'none', 'event_action')}
                    ${editor.makeActionPanel("双击行为", editor._config.event_action, 'none', 'event_action')}
                    ${editor.makeActionPanel("长按行为", editor._config.event_action, 'none', 'event_action')}
                </div>
            </ha-expansion-panel>
            ${editor.makeSubButtonPanel()}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:palette"></ha-icon>
                  样式
                </h4>
                <div class="content">
                    ${editor.makeLayoutOptions()}
                    ${editor.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${editor.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    日历卡片
                </h4>
                <div class="content">
                    <p>这个卡片用于显示日历，并且支持滚动查看，让你能浏览更多的事件。</p>
                </div>
            </div>
            ${editor.makeVersion()}
        </div>
    `;    
}