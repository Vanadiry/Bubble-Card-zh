import { html } from 'lit';

export function renderEmptyColumnEditor(editor){

    return html`
        <div class="card-config">
            ${editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList)}
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    样式
                </h4>
                <div class="content">
                    ${editor.makeLayoutOptions()}
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
            ${editor.makeVersion()}
        </div>
    `;
}