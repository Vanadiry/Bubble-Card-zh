import { html } from 'lit';


export function renderSeparatorEditor(editor){

    return html`
    <div class="card-config">
        ${editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList)}
        <ha-textfield
            label="名称"
            .value="${editor._config?.name || ''}"
            .configValue="${"name"}"
            @input="${editor._valueChanged}"
        ></ha-textfield>
        ${editor.makeDropdown("图标", "icon")}
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
                分隔线卡片
            </h4>
            <div class="content">
                <p>此卡片是一个简单的分隔线，用于将你的弹窗或仪表板划分为不同类别或区域，例如：灯光、设备、遮阳、设置、自动化等。</p>
            </div>
        </div>
        ${editor.makeVersion()}
  </div>
`;
}