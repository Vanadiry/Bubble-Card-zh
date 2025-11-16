import { html } from 'lit';
import { getLazyLoadedPanelContent } from '../../editor/utils.js';

export function makeSubButtonPanel(editor) {
    // Initialize state for expanded panels if it doesn't exist
    if (typeof editor._expandedPanelStates === 'undefined') {
        editor._expandedPanelStates = {};
    }

    const subButtonElements = editor._config?.sub_button?.map((subButton, index) => {
        if (!subButton) {
            return;
        }

        const subButtonIndex = 'sub_button.' + index + '.';

        const removeSubButton = (event) => {
            event.stopPropagation();
            let subButtons = [...editor._config.sub_button];
            subButtons.splice(index, 1);
            editor._config.sub_button = subButtons;

            editor._valueChanged({ target: { configValue: 'sub_button', value: subButtons } });
            editor.requestUpdate();
        };

        const moveSubButtonLeft = (event) => {
            event.stopPropagation();
            if (index > 0) {
                let subButtons = [...editor._config.sub_button];
                [subButtons[index], subButtons[index - 1]] = [subButtons[index - 1], subButtons[index]];
                editor._config.sub_button = subButtons;

                editor._valueChanged({ target: { configValue: 'sub_button', value: subButtons } });
            }
            editor.requestUpdate();
        };

        const moveSubButtonRight = (event) => {
            event.stopPropagation();
            if (index < editor._config.sub_button.length - 1) {
                let subButtons = [...editor._config.sub_button];
                [subButtons[index], subButtons[index + 1]] = [subButtons[index + 1], subButtons[index]];
                editor._config.sub_button = subButtons;

                editor._valueChanged({ target: { configValue: 'sub_button', value: subButtons } });
            }
            editor.requestUpdate();
        };

        const entity = subButton.entity ?? editor._config.entity;
        const isSelect = entity?.startsWith("input_select") || entity?.startsWith("select") || subButton.select_attribute;
        const entityAttribute = editor.hass.states[entity]?.attributes;
        const hasSelectAttributeList = editor._selectable_attributes.some(attr => entityAttribute?.[attr]);
        const selectableAttributeList = Object.keys(editor.hass.states[entity]?.attributes || {}).map((attributeName) => {
            let state = editor.hass.states[entity];
            let formattedName = editor.hass.formatEntityAttributeName(state, attributeName);
            return { label: formattedName, value: attributeName };
        }).filter(attribute => editor._selectable_attributes.includes(attribute.value));
        const conditions = subButton.visibility ?? [];

        const mainPanelKey = `sub_button_main_${index}`;
        const settingsPanelKey = `sub_button_settings_${index}`;
        const actionsPanelKey = `sub_button_actions_${index}`;
        const visibilityPanelKey = `sub_button_visibility_${index}`;

        return html`
            <ha-expansion-panel 
                outlined
                @expanded-changed=${(e) => {
                    editor._expandedPanelStates[mainPanelKey] = e.target.expanded;
                    editor.requestUpdate();
                }}
            >
                <h4 slot="header">
                    <ha-icon icon="mdi:border-radius"></ha-icon>
                    ${editor._config.sub_button[index] ? "子按钮 " + (index + 1) + (subButton.name ? " - " + subButton.name : "") : "新建按钮"}
                    <div class="button-container">
                        <button class="icon-button header" @click="${removeSubButton}">
                            <ha-icon icon="mdi:delete"></ha-icon>
                        </button>
                        ${index > 0 ? html`<button class="icon-button header" @click="${moveSubButtonLeft}">
                            <ha-icon icon="mdi:arrow-left"></ha-icon>
                        </button>` : ''}
                        ${index < editor._config.sub_button.length - 1 ? html`<button class="icon-button header" @click="${moveSubButtonRight}">
                            <ha-icon icon="mdi:arrow-right"></ha-icon>
                        </button>` : ''}
                    </div>
                </h4>
                <div class="content">
                    ${getLazyLoadedPanelContent(editor, mainPanelKey, !!editor._expandedPanelStates[mainPanelKey], () => html`
                        <ha-expansion-panel 
                            outlined
                            @expanded-changed=${(e) => {
                                editor._expandedPanelStates[settingsPanelKey] = e.target.expanded;
                                editor.requestUpdate();
                            }}
                        >
                            <h4 slot="header">
                                <ha-icon icon="mdi:cog"></ha-icon>
                                按钮设置
                            </h4>
                            <div class="content">
                                ${getLazyLoadedPanelContent(editor, settingsPanelKey, !!editor._expandedPanelStates[settingsPanelKey], () => html` 
                                    <ha-form
                                        .hass=${editor.hass}
                                        .data=${subButton}
                                        .schema=${[
                                                    { name: "entity",
                                                        label: "实体（可选，默认为此卡片主实体）", 
                                                        selector: { entity: {} },
                                                    },
                                                ]}   
                                        .computeLabel=${editor._computeLabelCallback}
                                        @value-changed=${(ev) => editor._arrayValueChange(index, ev.detail.value, 'sub_button')}
                                    ></ha-form>
                                    ${hasSelectAttributeList ? html`
                                        <div class="ha-combo-box">
                                            <ha-combo-box
                                                label="选单（可选，来自属性）"
                                                .value="${subButton.select_attribute}"
                                                .items="${selectableAttributeList}"
                                                @value-changed="${(ev) => editor._arrayValueChange(index, { select_attribute: ev.detail.value }, 'sub_button')}"
                                            ></ha-combo-box>
                                        </div>
                                    ` : ''}
                                    <div class="ha-textfield">
                                        <ha-textfield
                                            label="名称（可选）"
                                            .value="${subButton.name ?? ''}"
                                            @input="${(ev) => editor._arrayValueChange(index, { name: ev.target.value }, 'sub_button')}"
                                        ></ha-textfield>
                                    </div>
                                    <div class="ha-icon-picker">
                                        <ha-icon-picker
                                            label="图标（可选）"
                                            .value="${subButton.icon}"
                                            item-label-path="label"
                                            item-value-path="value"
                                            @value-changed="${(ev) => editor._arrayValueChange(index, { icon: ev.detail.value }, 'sub_button')}"
                                        ></ha-icon-picker>
                                    </div>
                                `)}
                                ${editor.makeShowState(subButton, subButtonIndex, 'sub_button', index)}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel 
                            outlined 
                            @expanded-changed=${(e) => {
                                editor._expandedPanelStates[actionsPanelKey] = e.target.expanded;
                                editor.requestUpdate();
                            }}
                        >
                            <h4 slot="header">
                                <ha-icon icon="mdi:gesture-tap"></ha-icon>
                                按钮点击行为
                            </h4>
                            <div class="content">
                                ${getLazyLoadedPanelContent(editor, actionsPanelKey, !!editor._expandedPanelStates[actionsPanelKey], () => html`
                                    <div style="${isSelect ? 'opacity: 0.5; pointer-events: none;' : ''}">
                                        ${editor.makeActionPanel("单击行为", subButton, 'more-info', 'sub_button', index)}
                                    </div>
                                    ${editor.makeActionPanel("双击行为", subButton, 'none', 'sub_button', index)}
                                    ${editor.makeActionPanel("长按行为", subButton, 'none', 'sub_button', index)}
                                `)}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel 
                            outlined
                            @expanded-changed=${(e) => {
                                editor._expandedPanelStates[visibilityPanelKey] = e.target.expanded;
                                editor.requestUpdate();
                            }}
                        >
                            <h4 slot="header">
                                <ha-icon icon="mdi:eye"></ha-icon>
                            可见性
                            </h4>
                            <div class="content">
                                ${getLazyLoadedPanelContent(editor, visibilityPanelKey, !!editor._expandedPanelStates[visibilityPanelKey], () => html`
                                    <ha-formfield label="父实体不可用时隐藏">
                                        <ha-switch
                                            .checked=${subButton.hide_when_parent_unavailable ?? false}
                                            @change=${(ev) => editor._arrayValueChange(index, { hide_when_parent_unavailable: ev.target.checked }, 'sub_button')}
                                        ></ha-switch>
                                    </ha-formfield>
                                    <ha-card-conditions-editor
                                        .hass=${editor.hass}
                                        .conditions=${conditions}
                                        @value-changed=${(ev) => editor._conditionChanged(ev, index, 'sub_button')}
                                    >
                                    </ha-card-conditions-editor>
                                    <ha-alert alert-type="info">
                                        只有在所有条件都满足时，子按钮才会显示。如果没有设置任何条件，子按钮始终显示。
                                    </ha-alert>
                                `)}
                            </div>
                        </ha-expansion-panel>
                    `)}
                </div>
            </ha-expansion-panel>
        `;
    });

    const addSubButton = () => {
        if (!editor._config.sub_button) {
            editor._config.sub_button = [];
        }

        let newSubButton = {
            entity: editor._config.entity
        };
        editor._config.sub_button = [...editor._config.sub_button];
        editor._config.sub_button.push(newSubButton);
        editor._valueChanged({ target: { configValue: 'sub_button', value: editor._config.sub_button } });
        editor.requestUpdate();
    };

    // Return full panel for all sub-buttons
    return html`
        <ha-expansion-panel outlined>
            <h4 slot="header">
            <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
            子按钮
            </h4>
            <div class="content">
            ${subButtonElements}
            <button class="icon-button" @click="${addSubButton}">
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
    `;
}