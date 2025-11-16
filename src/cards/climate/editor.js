import { html } from "lit";


export function renderClimateEditor(editor){
    let button_action = editor._config.button_action || '';

    if (
        editor._config.card_type === "climate" && 
        !editor.climateSubButtonsAdded &&
        editor._config.entity
    ) {
        const shouldAddHVACModes = editor.hass.states[editor._config.entity]?.attributes?.hvac_modes;

        if (!editor._config.sub_button || editor._config.sub_button.length === 0) {
            editor._config.sub_button = [
                shouldAddHVACModes ? { 
                    name: 'HVAC模式选单', 
                    select_attribute: 'hvac_modes', 
                    state_background: false,
                    show_arrow: false 
                } : null
            ].filter(Boolean);
        }

        editor.climateSubButtonsAdded = true;
    }

    return html`
        <div class="card-config">
        ${editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList)}
        <ha-form
            .hass=${editor.hass}
            .data=${editor._config}
            .schema=${[
                        { name: "entity",
                        label: "实体", 
                        selector: { entity: {domain:["climate"]}  },
                        },
                    ]}   
            .computeLabel=${editor._computeLabelCallback}
            @value-changed=${editor._valueChanged}
        ></ha-form>
                                <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  卡片设置
                </h4>
                <div class="content">     
                    <ha-textfield
                        label="名称（可选）"
                        .value="${editor._config?.name || ''}"
                        .configValue="${"name"}"
                        @input="${editor._valueChanged}"
                    ></ha-textfield>
                    ${editor.makeDropdown("图标（可选）", "icon")}
                    ${editor.makeShowState()}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:tune-variant"></ha-icon>
                空调设置
                </h4>
                <div class="content">
                    <ha-form
                        .hass=${editor.hass}
                        .data=${editor._config}
                        .schema=${[
                            {
                                type: "grid",
                                flatten: true,
                                schema: [
                                    {
                                        name: "min_temp",
                                        label: "最低温度",
                                        selector: { number: {
                                            step: "any"
                                        } },
                                    },
                                    {
                                        name: "max_temp",
                                        label: "最高温度",
                                        selector: { number: {
                                            step: "any"
                                        } },
                                    },
                                    {
                                        name: "step",
                                        label: "步进值",
                                        selector: { number: {
                                            step: "any"
                                        } },
                                    },
                                ],
                            },
                        ]}   
                        .computeLabel=${editor._computeLabelCallback}
                        .disabled="${editor._config.button_type === 'name'}"
                        @value-changed=${editor._valueChanged}
                    ></ha-form>
                    ${editor.hass.states[editor._config.entity]?.attributes?.target_temp_low ? html`
                        <ha-formfield .label="Optional - Hide target temp low">
                            <ha-switch
                                aria-label="Optional - Hide target temp low"
                                .checked=${editor._config.hide_target_temp_low}
                                .configValue="${"hide_target_temp_low"}"
                                @change=${editor._valueChanged}
                            ></ha-switch>
                            <div class="mdc-form-field">
                                <label class="mdc-label">Optional - Hide target temp low</label> 
                            </div>
                        </ha-formfield>
                    ` : ''}
                    ${editor.hass.states[editor._config.entity]?.attributes?.target_temp_high ? html`
                        <ha-formfield .label="Optional - Hide target temp high">
                            <ha-switch
                                aria-label="Optional - Hide target temp high"
                                .checked=${editor._config.hide_target_temp_high}
                                .configValue="${"hide_target_temp_high"}"
                                @change=${editor._valueChanged}
                            ></ha-switch>
                            <div class="mdc-form-field">
                                <label class="mdc-label">Optional - Hide target temp high</label> 
                            </div>
                        </ha-formfield>
                    ` : ''}
                    <ha-formfield .label="隐藏温度控制（可选）">
                        <ha-switch
                            aria-label="隐藏温度控制（可选）"
                            .checked=${editor._config.hide_temperature}
                            .configValue="${"hide_temperature"}"
                            @change=${editor._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">隐藏温度控制（可选）</label> 
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="开启时保持固定背景色（可选）">
                        <ha-switch
                            aria-label="开启时保持固定背景色（可选）"
                            .checked=${editor._config.state_color === true}
                            .configValue="${"state_color"}"
                            @change=${editor._valueChanged}
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
                    ${editor.makeActionPanel("单击行为")}
                    ${editor.makeActionPanel("双击行为")}
                    ${editor.makeActionPanel("长按行为")}
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
                卡片点击行为
                </h4>
                <div class="content">
                    ${editor.makeActionPanel("单击行为", button_action, 'none', 'button_action')}
                    ${editor.makeActionPanel("双击行为", button_action, 'none', 'button_action')}
                    ${editor.makeActionPanel("长按行为", button_action, 'none', 'button_action')}
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
                    空调卡片
                </h4>
                <div class="content">
                    <p>这个卡片用于控制空调实体。你还可以添加一个子按钮，用来显示空调模式的下拉菜单（新建子按钮时，查看是否出现“选单”选项）。</p>
                </div>
            </div>
            ${editor.makeVersion()}
        </div>
    `;
}