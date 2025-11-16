import { html } from "lit";
import { fireEvent } from '../../tools/utils.js';

export function renderHorButtonStackEditor(editor){
    if (!editor.buttonAdded) {
        editor.buttonAdded = true;
        editor.buttonIndex = 0;

        while (editor._config[(editor.buttonIndex + 1) + '_link']) {
            editor.buttonIndex++;
        }
    }

    function addButton() {
        editor.buttonIndex++;
        editor.requestUpdate();
    }

    return html`
        <div class="card-config">
            ${editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList)}
            <div id="buttons-container">
                ${makeButton(editor)}
            </div>
            <button class="icon-button" @click="${addButton}">
                <ha-icon icon="mdi:plus"></ha-icon>
                新建按钮
            </button>
            <hr>
            <ha-formfield .label="Auto order">
                <ha-switch
                    aria-label="Toggle auto order"
                    .checked=${editor._config?.auto_order || false}
                    .configValue="${"auto_order"}"
                    @change=${editor._valueChanged}
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
                                .value="${editor._config?.margin || '7px'}"
                                .configValue="${"margin"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="桌面端宽度（可选，移动端默认为100%）"
                                .value="${editor._config?.width_desktop || '540px'}"
                                .configValue="${"width_desktop"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="上升动画（可选，页面加载后播放一次）">
                                <ha-switch
                                    aria-label="上升动画（可选，页面加载后播放一次）"
                                    .checked=${editor._config?.rise_animation !== undefined ? editor._config?.rise_animation : true}
                                    .configValue="${"rise_animation"}"
                                    @change=${editor._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">上升动画（可选，页面加载后播放一次）</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="高亮当前锚点标识或视图（可选）">
                                <ha-switch
                                    aria-label="高亮当前锚点标识或视图（可选）"
                                    .checked=${editor._config?.highlight_current_view || false}
                                    .configValue="${"highlight_current_view"}"
                                    @change=${editor._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">高亮当前锚点标识或视图（可选）</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="隐藏渐变（可选）">
                                <ha-switch
                                    aria-label="隐藏渐变（可选）"
                                    .checked=${editor._config.hide_gradient || false}
                                    .configValue="${"hide_gradient"}"
                                    @change=${editor._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">隐藏渐变（可选）</label> 
                                </div>
                            </ha-formfield>
                        </div>
                    </ha-expansion-panel>
                    ${editor.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${editor.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    水平按钮组卡片
                </h4>
                <div class="content">
                    <p>这个卡片是弹出面板卡片的好搭档，可以用来打开弹窗，或跳转到你的仪表板中的任意页面。此外，你还可以添加传感器，让按钮的排序自动调整。这个卡片可滚动、始终可见，并作为页脚使用。</p>
                </div>
            </div>
            ${editor.makeVersion()}
        </div>
    `;
}

function makeButton(editor) {
    let buttons = [];
    for (let i = 1; i <= editor.buttonIndex; i++) {
        buttons.push(html`
            <div class="${i}_button">
                <ha-expansion-panel outlined>
                    <h4 slot="header">
                        <ha-icon icon="mdi:border-radius"></ha-icon>
                        按钮 ${i} ${editor._config[i + '_name'] ? ("- " + editor._config[i + '_name']) : ""}
                        <div class="button-container">
                            <button class="icon-button header" @click="${() => removeButton(editor,i)}">
                              <ha-icon icon="mdi:delete"></ha-icon>
                            </button>
                        </div>
                    </h4>
                    <div class="content">
                        <ha-textfield
                            label="链接或弹出面板的锚点标识（例如#kitchen）"
                            .value="${editor._config[i + '_link'] || ''}"
                            .configValue="${i}_link"
                            @input="${editor._valueChanged}"
                        ></ha-textfield>
                        <ha-textfield
                            label="名称（可选）"
                            .value="${editor._config[i + '_name'] || ''}"
                            .configValue="${i}_name"
                            @input="${editor._valueChanged}"
                        ></ha-textfield>
                        <ha-icon-picker
                            label="图标（可选）"
                            .value="${editor._config[i + '_icon'] || ''}"
                            .configValue="${i}_icon"
                            item-label-path="label"
                            item-value-path="value"
                            @value-changed="${editor._valueChanged}"
                        ></ha-icon-picker>
                        <ha-form
                            .hass=${editor.hass}
                            .data=${editor._config}
                            .schema=${[
                                        { name: i+"_entity",
                                        label: "灯光或灯光分组（可选，用于背景色）", 
                                        selector: { entity: {} },
                                        },
                                    ]}   
                            .computeLabel=${editor._computeLabelCallback}
                            @value-changed=${editor._valueChanged}
                        ></ha-form>
                        <ha-form
                            .hass=${editor.hass}
                            .data=${editor._config}
                            .schema=${[
                                        { name: i+"_pir_sensor",
                                        label: "存在或占用类型传感器（可选，用于按钮自动排序）", 
                                        selector: { entity: {} },
                                        },
                                    ]}   
                            .computeLabel=${editor._computeLabelCallback}
                            @value-changed=${editor._valueChanged}
                        ></ha-form>
                        <ha-alert alert-type="info">实际上，任何实体类型都可以实现自动排序。例如，你也可以把灯光分组填进去，排序会根据它们最近的状态变动自动调整。</ha-alert>
                    </div>
                </ha-expansion-panel>
            </div>
        `);
    }
    return buttons;
}

function removeButton(editor, index) {
    // Removing button fields
    delete editor._config[index + '_name'];
    delete editor._config[index + '_icon'];
    delete editor._config[index + '_link'];
    delete editor._config[index + '_entity'];
    delete editor._config[index + '_pir_sensor'];

    // Updating indexes of following buttons
    for (let i = index; i < editor.buttonIndex; i++) {
        editor._config[i + '_name'] = editor._config[(i + 1) + '_name'];
        editor._config[i + '_icon'] = editor._config[(i + 1) + '_icon'];
        editor._config[i + '_link'] = editor._config[(i + 1) + '_link'];
        editor._config[i + '_entity'] = editor._config[(i + 1) + '_entity'];
        editor._config[i + '_pir_sensor'] = editor._config[(i + 1) + '_pir_sensor'];
    }

    // Removing fields of the last button
    delete editor._config[editor.buttonIndex + '_name'];
    delete editor._config[editor.buttonIndex + '_icon'];
    delete editor._config[editor.buttonIndex + '_link'];
    delete editor._config[editor.buttonIndex + '_entity'];
    delete editor._config[editor.buttonIndex + '_pir_sensor'];

    // Updating index of the last button
    editor.buttonIndex--;

    fireEvent(editor, "config-changed", {
        config: editor._config
    });
}