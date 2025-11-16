import { html } from "lit";

export function renderCoverEditor(editor){

    let button_action = editor._config.button_action || '';
    return html`
        <div class="card-config">
            ${editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList)}
            <ha-form
                .hass=${editor.hass}
                .data=${editor._config}
                .schema=${[
                            { name: "entity",
                            label: "实体", 
                            selector: { entity: {domain:["cover"]}  },
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
                    ${editor.makeDropdown("开启图标（可选）", "icon_open")}
                    ${editor.makeDropdown("闭合图标（可选）", "icon_close")}
                    ${editor.makeShowState()}
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
                        .value="${editor._config?.open_service || 'cover.open_cover'}"
                        .configValue="${"open_service"}"
                        @input="${editor._valueChanged}"
                    ></ha-textfield>
                    <ha-textfield
                        label="停止时服务（可选，默认为cover.stop_cover）"
                        .value="${editor._config?.stop_service || 'cover.stop_cover'}"
                        .configValue="${"stop_service"}"
                        @input="${editor._valueChanged}"
                    ></ha-textfield>
                    <ha-textfield
                        label="闭合时服务（可选，默认为cover.close_cover）"
                        .value="${editor._config?.close_service || 'cover.close_cover'}"
                        .configValue="${"close_service"}"
                        @input="${editor._valueChanged}"
                    ></ha-textfield>
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
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          遮阳设备样式
                        </h4>
                        <div class="content"> 
                            ${editor.makeDropdown("下箭头图标（可选）", "icon_down")}
                            ${editor.makeDropdown("上箭头图标（可选）", "icon_up")}
                        </div>
                    </ha-expansion-panel>
                    ${editor.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${editor.makeModulesEditor()}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    遮阳设备卡片
                </h4>
                <div class="content">
                    <p>这个卡片用于控制你的遮阳设备，例如卷帘、百叶窗、遮阳篷、升降门等。</p>
                </div>
            </div>
            ${editor.makeVersion()}
        </div>
    `;
}