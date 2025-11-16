import { html } from 'lit';

export function isReadOnlyEntity(editor) {
    const entity = editor._config.entity;
    if (!entity) return true;
    
    const entityType = entity.split('.')[0];
    const supportedEntities = ['light', 'media_player', 'cover', 'input_number', 'number', 'fan', 'climate'];

    if (entityType === 'sensor') return true;
    if (!supportedEntities.includes(entityType)) return true;
    
    return false;
}

export function makeButtonSliderPanel(editor) {
    // Initialize disableEntityFilter if it's not defined
    if (editor._disableEntityFilter === undefined) {
        editor._disableEntityFilter = false;
    }

    const handleFilterToggle = (e) => {
        editor._disableEntityFilter = e.target.checked;
        editor.requestUpdate();
    };

    return html`
        <ha-expansion-panel outlined style="display: ${editor._config.button_type !== 'slider' ? 'none' : ''}">
            <h4 slot="header">
            <ha-icon icon="mdi:tune-variant"></ha-icon>
            滑块设置
            </h4>
            <div class="content">
                <div class="checkbox-wrapper">
                    <ha-formfield label="禁用实体过滤（用于自定义滑块）">
                        <ha-switch
                            .checked=${editor._disableEntityFilter}
                            @change="${handleFilterToggle}"
                        ></ha-switch>
                    </ha-formfield>
                </div>
                <div class="bubble-info" style="display: ${editor._disableEntityFilter ? '' : 'none'}">
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
                    .hass=${editor.hass}
                    .data=${editor._config}
                    .schema=${[
                        {
                            type: "grid",
                            flatten: true,
                            schema: [
                                {
                                    name: "min_value",
                                    label: "最小值",
                                    selector: { number: {
                                        step: "any"
                                    } },
                                },
                                {
                                    name: "max_value",
                                    label: "最大值",
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
                <hr>
                <ha-formfield>
                    <ha-switch
                        .checked=${editor._config.tap_to_slide && !editor._config.relative_slide}
                        .configValue="${"tap_to_slide"}"
                        @change="${editor._valueChanged}"
                        .disabled=${editor._config.relative_slide || isReadOnlyEntity(editor)}
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">点击滑动（旧版行为）</label>
                    </div>
                </ha-formfield>
                <ha-formfield>
                    <ha-switch
                        .checked=${!editor._config.tap_to_slide && editor._config.relative_slide}
                        .configValue="${"relative_slide"}"
                        @change="${editor._valueChanged}"
                        .disabled=${editor._config.tap_to_slide || isReadOnlyEntity(editor)}
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">相对滑动（与点击滑动不兼容）</label>
                    </div>
                </ha-formfield>
                <ha-formfield>
                    <ha-switch
                        .checked=${editor._config.read_only_slider ?? isReadOnlyEntity(editor)}
                        .configValue="${"read_only_slider"}"
                        .disabled=${isReadOnlyEntity(editor)}
                        @change="${editor._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">只读滑块</label> 
                    </div>
                </ha-formfield>
                <ha-formfield>
                    <ha-switch
                        .checked=${editor._config.slider_live_update}
                        .configValue="${"slider_live_update"}"
                        .disabled=${isReadOnlyEntity(editor)}
                        @change="${editor._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">滑块实时更新</label> 
                    </div>
                </ha-formfield>
                <div class="bubble-info" style="display: ${editor._config.slider_live_update ? '' : 'none'}">
                    <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        滑块实时更新
                    </h4>
                    <div class="content">
                        <p>默认情况下，滑块只会在松开时更新实体状态。启用此选项后，滑动过程中也会实时更新实体状态。此功能并不适用于所有实体，如遇到问题请将其关闭。</p>
                    </div>
                </div>
                ${editor._config.entity?.startsWith("light") ? html`
                    <ha-formfield>
                        <ha-switch
                            .checked=${editor._config.use_accent_color ?? false}
                            .configValue="${"use_accent_color"}"
                            @change="${editor._valueChanged}"
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">使用强调色替代灯光颜色</label> 
                        </div>
                    </ha-formfield>
                    ${!editor._config.tap_to_slide ? html`
                        <ha-formfield>
                            <ha-switch
                                .checked=${editor._config.allow_light_slider_to_0 ?? false}
                                .configValue="${'allow_light_slider_to_0'}"
                                @change=${editor._valueChanged}
                            ></ha-switch>
                            <div class="mdc-form-field">
                                <label class="mdc-label">允许滑块关闭灯光（降为0%时关闭）</label> 
                            </div>
                        </ha-formfield>
                    ` : ''}
                    <ha-formfield>
                        <ha-switch
                            .checked=${editor._config.light_transition}
                            .configValue="${"light_transition"}"
                            @change=${editor._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">启用平滑亮度过渡</label> 
                        </div>
                    </ha-formfield>
                    ${editor._config.light_transition ? html`
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
                            .value="${editor._config.light_transition_time}"
                            .configValue="${"light_transition_time"}"
                            @input="${editor._valueChanged}"
                        ></ha-textfield>
                    ` : ''}
                ` : ''}
            </div>
        </ha-expansion-panel>
    `;
}