import { html } from 'lit';
import { isEntityType } from "../../tools/utils.js";
import { makeButtonSliderPanel } from '../../components/slider/editor.js';
function getButtonList(){
    return [{
        'label': '开关',
        'value': 'switch'
    },
    {
        'label': '滑块',
        'value': 'slider'
    },
    {
        'label': '状态',
        'value': 'state'
    },
    {
        'label': '名称或文本',
        'value': 'name'
    }
];
}

export function renderButtonEditor(editor){    
    let entityList = {};
    if (editor._config.button_type === 'slider' && !editor._disableEntityFilter) {        
        entityList = {
            filter: [
                { domain: ["light", "media_player", "cover", "input_number", "number", "climate", "fan"] },
                { domain: "sensor", device_class: "battery" },
            ],
        }
    }

    const isPopUp = editor._config.card_type === 'pop-up';

    let button_action = editor._config.button_action || '';
    
    if (!editor._config.button_type) {
        editor._config.button_type = isPopUp ? 'name' : 'switch';
    }
    let button_type = editor._config.button_type;

    return html`
        <div class="card-config">
            ${!isPopUp ? editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList) : ''}
            ${editor.makeDropdown("按钮类型", "button_type", getButtonList() )}
            <ha-form
                .hass=${editor.hass}
                .data=${editor._config}
                .schema=${[
                            { name: "entity",
                            label: button_type !== 'slider' ? "实体（开关类）" : "实体（支持的实体类型见下文）", 
                            selector: { entity: entityList },
                            },
                        ]}   
                .computeLabel=${editor._computeLabelCallback}
                .disabled="${editor._config.button_type === 'name'}"
                @value-changed=${editor._valueChanged}
            ></ha-form>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                <ha-icon icon="mdi:cog"></ha-icon>
                ${isPopUp ? '卡片标头设置' : '卡片设置'}
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
            ${makeButtonSliderPanel(editor)}
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
            <ha-expansion-panel outlined style="display: ${editor._config.button_type === 'slider' && editor._config.tap_to_slide ? 'none' : ''}">
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
                    ${editor.makeActionPanel("单击行为", button_action, 
                        editor._config.button_type === 'name' ? 'none' : 
                        editor._config.button_type === 'state' ? 'more-info' : 
                        editor._config.button_type === 'slider' ? 
                            (isEntityType(editor, "sensor", editor._config.entity) ? 'more-info' : 'toggle') : 
                            'toggle', 
                        'button_action')}
                    ${editor.makeActionPanel("双击行为", button_action, 'none', 'button_action')}
                    ${editor.makeActionPanel("长按行为", button_action, 
                        editor._config.button_type === 'name' ? 'none' :
                        editor._config.button_type === 'slider' ? 'none' :
                        'more-info', 
                        'button_action')}
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
                    ${!isPopUp ? editor.makeStyleEditor() : ''}
                </div>
            </ha-expansion-panel>
            ${!isPopUp ? editor.makeModulesEditor() : ''}
            <div class="bubble-info">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                    按钮卡片${isPopUp ? '（带标头）' : ''}
                </h4>
                <div class="content">
                    <p>这个卡片的功能非常多。可以用作开关、滑块、状态显示，或名称/文本按钮。选择你想了解的按钮类型即可查看更多信息。</p>
                    
                    ${editor._config.button_type === 'switch' || !editor._config.button_type ? html`
                        <p><strong>开关：</strong>这是默认的按钮类型。默认情况下，它会切换实体的开关状态，并且背景颜色会根据实体状态或灯光颜色变化。你可以在”卡片点击行为“部分修改它的动作。</p>
                    ` : ''}
                    
                    ${editor._config.button_type === 'slider' ? html`
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
                    ` : ''}
                    
                    ${editor._config.button_type === 'state' ? html`
                        <p><strong>状态按钮：</strong>适用于显示传感器或任意实体的信息。按下它时，会打开该实体的 “详细信息” 面板。这个按钮的背景色不会发生变化。</p>
                    ` : ''}
                    
                    ${editor._config.button_type === 'name' ? html`
                        <p><strong>名称或文本按钮：</strong>这是唯一一种不需要实体的按钮类型。可以用来显示一段简短文字、名称或标题。你也可以为它添加各种动作。这个按钮的背景色不会发生变化。</p>
                    ` : ''}
                </div>
            </div>
            ${!isPopUp ? editor.makeVersion() : ''}
        </div>
    `;
}