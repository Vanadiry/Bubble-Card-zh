import { html } from "lit";


export function renderSelectEditor(editor){
    const entity = editor._config.entity;
    const isSelect = entity?.startsWith("input_select") || entity?.startsWith("select") || editor._config.select_attribute;
    const entityAttribute = editor.hass.states[entity]?.attributes;
    const hasSelectAttributeList = editor._selectable_attributes.some(attr => entityAttribute?.[attr]);
    const selectableAttributeList = Object.keys(editor.hass.states[entity]?.attributes || {}).map((attributeName) => {
        let state = editor.hass.states[entity];
        let formattedName = editor.hass.formatEntityAttributeName(state, attributeName);
        return { label: formattedName, value: attributeName };
      }).filter(attribute => editor._selectable_attributes.includes(attribute.value));

    let button_action = editor._config.button_action || '';

    return html`
        <div class="card-config">
            ${editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList)}
            <ha-form
                .hass=${editor.inputSelectList}
                .data=${editor._config}
                .schema=${[
                            { name: "entity",
                            label: "实体", 
                            selector: { entity: {}},
                            },
                        ]}   
                .computeLabel=${editor._computeLabelCallback}
                @value-changed=${editor._valueChanged}
            ></ha-form>
            ${hasSelectAttributeList ? html`
                <div class="ha-combo-box">
                    <ha-combo-box
                        label="选单（来自属性）"
                        .value="${editor._config.select_attribute}"
                        .items="${selectableAttributeList}"
                        .configValue="${"select_attribute"}"
                        @value-changed="${editor._valueChanged}"
                    ></ha-combo-box>
                </div>
            ` : ''}
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
                  按钮点击行为
                </h4>
                <div class="content">
                    <div style="${isSelect ? 'opacity: 0.5; pointer-events: none;' : ''}">
                        ${editor.makeActionPanel("单击行为", button_action, 'none', 'button_action')}
                    </div>
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
                    选单卡片
                </h4>
                <div class="content">
                    <p>这个卡片可以为你的实体提供一个带可选项目的选单：</p>
                    <ul class="icon-list">
                        <li><ha-icon icon="mdi:format-list-bulleted"></ha-icon>“输入选单”实体</li>
                        <li><ha-icon icon="mdi:form-dropdown"></ha-icon>“选单”实体</li>
                        <li><ha-icon icon="mdi:playlist-music"></ha-icon>带有“来源列表”的媒体播放器</li>
                        <li><ha-icon icon="mdi:speaker"></ha-icon>带有“音效模式列表”的媒体播放器</li>
                        <li><ha-icon icon="mdi:thermostat"></ha-icon>带有“空调模式”的空调实体</li>
                        <li><ha-icon icon="mdi:fan"></ha-icon>带有“风扇模式”的空调</li>
                        <li><ha-icon icon="mdi:air-conditioner"></ha-icon>带有“摆风模式”的空调实体</li>
                        <li><ha-icon icon="mdi:thermostat-auto"></ha-icon>带有“预设模式”的空调实体</li>
                        <li><ha-icon icon="mdi:lightbulb-group"></ha-icon>带有“效果列表”的灯光实体</li>
                    </ul>
                </div>
            </div>
            ${editor.makeVersion()}
        </div>
    `;    
}