import { html } from 'lit';
import { fireEvent } from '../../tools/utils.js';
import { makeButtonSliderPanel } from '../../components/slider/editor.js';
import { renderButtonEditor } from '../button/editor.js';

function getButtonList() {
    return [
        { 'label': '开关', 'value': 'switch' },
        { 'label': '滑块', 'value': 'slider' },
        { 'label': '状态', 'value': 'state' },
        { 'label': '名称或文本', 'value': 'name' }
    ];
}

function findSuitableEntities(hass, entityType = 'light', limit = 2) {
    const entities = [];
    
    if (!hass || !hass.states) return entities;
    
    Object.keys(hass.states).forEach(entityId => {
        if (entities.length >= limit) return;
        
        if (entityId.startsWith(entityType + '.')) {
            const entity = hass.states[entityId];
            let supportsBrightness = false;
            
            if ('brightness' in entity.attributes) {
                supportsBrightness = true;
            }
            
            entities.push({
                entity: entityId,
                supportsBrightness: supportsBrightness
            });
        }
    });
    
    return entities;
}

function updateUIForVerticalStack(editor, isInVerticalStack) {
    if (!editor.shadowRoot) return;
    
    // Update the alert container
    const alertContainer = editor.shadowRoot.querySelector('#vertical-stack-alert-container');
    if (alertContainer) {
        alertContainer.style.display = isInVerticalStack ? 'block' : 'none';
    }
    
    // Update the button icon and text
    const buttonIcon = editor.shadowRoot.querySelector('.icon-button ha-icon');
    if (buttonIcon) {
        buttonIcon.icon = isInVerticalStack ? 'mdi:content-save' : 'mdi:plus';
    }
    
    const buttonText = editor.shadowRoot.querySelector('#button-text');
    if (buttonText) {
        buttonText.textContent = isInVerticalStack ? '更新锚点标识' : '创建弹出面板';
    }
    
    // Update the toggle and its label
    const exampleSwitch = editor.shadowRoot.querySelector('#include-example');
    if (exampleSwitch) {
        exampleSwitch.disabled = isInVerticalStack;
    }
    
    const exampleLabel = editor.shadowRoot.querySelector('.mdc-form-field .mdc-label');
    if (exampleLabel) {
        exampleLabel.textContent = '包含示例配置' + 
            (isInVerticalStack ? '（已禁用，因为弹出面板已经位于一个垂直堆叠中）' : '');
    }
}

function createPopUpConfig(editor, originalConfig) {
    try {
        const isInVerticalStack = !window.popUpError;
        
        // Get form value
        const includeExample = editor.shadowRoot.querySelector("#include-example")?.checked || false;
        let hashValue = '#pop-up-name';
        const hashInput = editor.shadowRoot.querySelector('#hash-input');
        if (hashInput && hashInput.value) {
            hashValue = hashInput.value;
        }
        
        if (isInVerticalStack) {
            editor._config.hash = hashValue;
            fireEvent(editor, "config-changed", { config: editor._config });
            console.info("弹出面板已位于一个垂直堆叠中，锚点标识已更新。请注意：现在已经不需要手动创建垂直堆叠了。");
            return;
        }
        
        if (includeExample) {
            const suitableEntities = findSuitableEntities(editor.hass);
            
            editor._config = {          
                type: 'vertical-stack',
                cards: [
                    {
                        type: 'custom:bubble-card',
                        card_type: 'pop-up',
                        name: '客厅',
                        icon: 'mdi:sofa-outline',
                        hash: hashValue
                    },
                    {   
                        type: 'custom:bubble-card',
                        card_type: 'separator',
                        name: '灯光（示例）',
                        icon: 'mdi:lightbulb-outline',
                    },
                    {   
                        type: 'horizontal-stack',
                        cards: suitableEntities.length > 0 ? suitableEntities.map(entity => ({
                                type: 'custom:bubble-card',
                                card_type: 'button',
                                button_type: entity.supportsBrightness ? 'slider' : 'switch',
                                entity: entity.entity,
                                show_state: true,
                            })) : [
                            {
                                type: 'custom:bubble-card',
                                card_type: 'button',
                                button_type: 'name',
                                name: '落地灯',
                                icon: 'mdi:floor-lamp-outline',
                            }
                        ]
                    }
                ]
            };
        } else {
            // Just create a basic pop-up without examples
            editor._config = {          
                type: 'vertical-stack',
                cards: [
                    {
                        type: 'custom:bubble-card',
                        card_type: 'pop-up',
                        hash: hashValue
                    }
                ]
            };
        }
        
        fireEvent(editor, "config-changed", { config: editor._config });
    } catch (error) {
        console.error("创建弹出面板时出错：", error);
        // Restore original config if there's an error
        editor._config = originalConfig;
        editor._config.hash = editor.shadowRoot.querySelector('#hash-input')?.value || '#pop-up-name';
        fireEvent(editor, "config-changed", { config: editor._config });
    }
}

export function renderPopUpEditor(editor) {
    const conditions = editor._config?.trigger ?? [];
    let button_action = editor._config.button_action || '';

    // Initial configuration screen for pop-up creation
    if (Object.keys(editor._config).length === 2 &&
        editor._config.card_type === 'pop-up') {

        const originalConfig = { ...editor._config };

        let isInVerticalStack = false;

        // Use setTimeout to correctly check if we're in a vertical stack
        setTimeout(() => {
            isInVerticalStack = !window.popUpError;
            updateUIForVerticalStack(editor, isInVerticalStack);
        }, 0);

        editor.createPopUpConfig = () => createPopUpConfig(editor, originalConfig);

        return html`
            <div class="card-config">
                ${editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList)}
                <div id="vertical-stack-alert-container" style="display: none;">
                    <div class="bubble-info warning">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:alert-outline"></ha-icon>
                            检测到旧版配置
                        </h4>
                        <div class="content">
                            <p>这个弹出面板放在一个纵向堆叠中，这是之前的用法。现在不需要这样做，但依然可以正常使用。你只需要更新下面的锚点标识即可。</p>
                        </div>
                    </div>
                </div>
                <ha-textfield
                    label="锚点标识（例如#kitchen）"
                    .value="${editor._config?.hash || '#pop-up-name'}"
                    id="hash-input"
                ></ha-textfield>
                <ha-formfield .label="包含示例配置">
                    <ha-switch
                        aria-label="包含示例配置"
                        .checked=${false}
                        id="include-example"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">包含示例配置</label>
                    </div>
                </ha-formfield>
                
                <button class="icon-button" @click="${() => editor.createPopUpConfig()}">
                    <ha-icon icon="mdi:plus"></ha-icon>
                    <span id="button-text">创建弹出面板</span>
                </button>

                <hr />

                <div class="bubble-info">
                    <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        弹出面板
                    </h4>
                    <div class="content">
                        <p>弹出面板是整理仪表板、并在需要时快速显示更多信息的绝佳方式。</p>
                        <p>如果这是你第一次创建弹出面板，可以使用示例配置来快速上手。</p>
                    </div>
                </div>
                
                ${editor.makeVersion()}
            </div>
        `;
    }

    // Full configuration interface for an existing pop-up
    return html`
        <div class="card-config">
            ${editor.makeDropdown("卡片类型", "card_type", editor.cardTypeList)}
            <ha-textfield
                label="锚点标识（例如#kitchen）"
                .value="${editor._config?.hash || '#pop-up-name'}"
                .configValue="${"hash"}"
                @input="${editor._valueChanged}"
            ></ha-textfield>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:dock-top"></ha-icon>
                  标头设置
                </h4>
                <div class="content">
                    <ha-formfield .label="显示标头">
                        <ha-switch
                            aria-label="显示标头"
                            .checked=${editor._config.show_header ?? true}
                            .configValue="${"show_header"}"
                            @change=${editor._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">显示标头</label> 
                        </div>
                    </ha-formfield>
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            隐藏标头
                        </h4>
                        <div class="content">
                            <p>你可以完全隐藏弹出窗口的标题栏，包括关闭按钮。隐藏后若要关闭弹窗，可以在弹窗内部执行长滑动手势，或点击弹窗外区域。</p>
                        </div>
                    </div>
                    <div style="${!(editor._config?.show_header ?? true) ? 'display: none;' : ''}">
                        <hr />
                        ${renderButtonEditor(editor)}
                    </div>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:cog"></ha-icon>
                  弹出面板设置
                </h4>
                <div class="content">
                    <ha-textfield
                        label="自动关闭时间（毫秒，例如15000）"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="1000"
                        .value="${editor._config?.auto_close || ''}"
                        .configValue="${"auto_close"}"
                        @input="${editor._valueChanged}"
                    ></ha-textfield>
                    <ha-textfield
                        label="滑动关闭距离（默认400）"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="10"
                        .value="${editor._config.slide_to_close_distance ?? 400}"
                        .configValue="${"slide_to_close_distance"}"
                        @input="${editor._valueChanged}"
                    ></ha-textfield>
                    <ha-formfield .label="点击面板外时关闭弹出面板（刷新后生效）">
                        <ha-switch
                            aria-label="点击面板外时关闭弹出面板（刷新后生效）"
                            .checked=${editor._config?.close_by_clicking_outside ?? true}
                            .configValue="${"close_by_clicking_outside"}"
                            @change=${editor._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">点击面板外时关闭弹出面板（刷新后生效）</label> 
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="任意点击后关闭弹出面板">
                        <ha-switch
                            aria-label="任意点击后关闭弹出面板"
                            .checked=${editor._config?.close_on_click || false}
                            .configValue="${"close_on_click"}"
                            @change=${editor._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">任意点击后关闭弹出面板</label> 
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="在后台更新卡片（不推荐）">
                        <ha-switch
                            aria-label="在后台更新卡片（不推荐）"
                            .checked=${editor._config?.background_update || false}
                            .configValue="${"background_update"}"
                            @change=${editor._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">在后台更新卡片（不推荐）</label> 
                        </div>
                    </ha-formfield>
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            后台更新
                        </h4>
                        <div class="content">
                            <p>只有在你的弹出面板中某些卡片出现问题时，才建议启用后台更新。</p>
                        </div>
                    </div>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:bell"></ha-icon>
                  弹出面板触发器
                </h4>
                <div class="content">
                    <ha-formfield>
                        <ha-switch
                            .checked=${editor._config.trigger_close ?? true}
                            .configValue="${"trigger_close"}"
                            @change=${editor._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">条件不满足时关闭弹出面板</label> 
                        </div>
                    </ha-formfield>
                    <ha-card-conditions-editor
                        .hass=${editor.hass}
                        .conditions=${conditions}
                        @value-changed=${(ev) => editor._conditionChanged(ev)}
                    >
                    </ha-card-conditions-editor>
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            关于条件
                        </h4>
                        <div class="content">
                            <p>只有所有条件都满足时，弹出面板才会被打开。例如，当有人出现在你家门口时，你可以自动打开一个带摄像头画面的“安防”弹出面板。</p>
                            <p>你也可以创建一个辅助量<code>input_boolean</code>，然后在自动化里控制它的开启/关闭来触发弹出面板。</p>
                        </div>
                    </div>
                </div>
            </ha-expansion-panel>
            <ha-expansion-panel outlined>
                <h4 slot="header">
                  <ha-icon icon="mdi:gesture-tap"></ha-icon>
                  开启/关闭行为
                </h4>
                <div class="content">
                    ${editor.makeActionPanel("开启行为", editor._config, 'none')}
                    ${editor.makeActionPanel("关闭行为", editor._config, 'none')}
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            关于行为
                        </h4>
                        <div class="content">
                            <p>这可以让你在弹出面板打开或关闭时触发一个动作。</p>
                        </div>
                    </div>
                </div>
            </ha-expansion-panel>
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
                          弹出面板样式
                        </h4>
                        <div class="content"> 
                            <ha-textfield
                                label="边距（用于修复部分居中问题，如13px）"
                                .value="${editor._config?.margin || '7px'}"
                                .configValue="${"margin"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="移动端顶部边距（例如标题栏隐藏时可设为-56px）"
                                .value="${editor._config?.margin_top_mobile || '0px'}"
                                .configValue="${"margin_top_mobile"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="桌面端顶部边距（例如50vh用于半屏弹出面板）"
                                .value="${editor._config?.margin_top_desktop || '0px'}"
                                .configValue="${"margin_top_desktop"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="桌面端宽度（移动端默认100%）"
                                .value="${editor._config?.width_desktop || '540px'}"
                                .configValue="${"width_desktop"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="背景色（支持var、hex、rgb、rgba）"
                                .value="${editor._config?.bg_color || ''}"
                                .configValue="${"bg_color"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="背景透明度（0–100）"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .value="${editor._config?.bg_opacity !== undefined ? editor._config?.bg_opacity : '88'}"
                                .configValue="${"bg_opacity"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="背景模糊（0–100）"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .value="${editor._config?.bg_blur !== undefined ? editor._config?.bg_blur : '10'}"
                                .configValue="${"bg_blur"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="背景遮罩模糊（0–100）"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .value="${editor._config?.backdrop_blur !== undefined ? editor._config?.backdrop_blur : '0'}"
                                .configValue="${"backdrop_blur"}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="阴影透明度（0–100）"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .configValue="${"shadow_opacity"}"
                                .value="${editor._config?.shadow_opacity !== undefined ? editor._config?.shadow_opacity : '0'}"
                                @input="${editor._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="隐藏弹出面板背景层（刷新后生效）">
                                <ha-switch
                                    aria-label="隐藏弹出面板背景层（刷新后生效）"
                                    .checked=${editor._config.hide_backdrop ?? false}
                                    .configValue="${"hide_backdrop"}"
                                    @change=${editor._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">隐藏弹出面板背景层（刷新后生效）</label> 
                                </div>
                            </ha-formfield>
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:information-outline"></ha-icon>
                                    隐藏弹出面板背景层
                                </h4>
                                <div class="content">
                                    <p>这会隐藏弹出面板的背景遮罩，也就是弹出面板下面的深色覆盖层。</p>
                                    <p>你可以在仪表板上的第一个弹出面板中开启这个设置，这样所有弹出面板都会一并应用这个选项。</p>
                                    <p><b>如果你在打开或关闭弹出面板时遇到性能问题，建议启用此功能。</b></p>
                                </div>
                            </div>
                        </div>
                    </ha-expansion-panel>
                    ${editor.makeStyleEditor()}
                </div>
            </ha-expansion-panel>
            ${editor.makeModulesEditor()}
            <div class="bubble-info-container">
                <div class="bubble-info">
                    <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        如何使用弹出面板
                    </h4>
                    <div class="content">
                        <p>弹出面板默认是隐藏的，你可以通过触发它的锚点标识（例如#pop-up-name），使用任意支持“前往”动作的卡片来打开它。</p>
                        <p>你也可以观看这段<a href="https://www.youtube.com/watch?v=7mOV7BfWoFc" target="_blank" rel="noopener noreferrer">视频</a>，了解如何创建你的第一个弹出面板。（注意：视频内容已经过时，现在不需要添加垂直堆叠了。）</p>
                    </div>
                </div>
                
                <div class="bubble-info warning">
                    <h4 class="bubble-section-title">
                        <ha-icon icon="mdi:alert-outline"></ha-icon>
                        重要提示
                    </h4>
                    <div class="content">
                        <p>为了避免与当前视图发生错位，请将这个卡片放在当前仪表板中，所有卡片的最后。你无法从其他页面中触发这个弹出面板。</p>
                        <p>如果页面加载时，弹出面板的内容会在屏幕上闪一下，可以安装<a href="https://github.com/Clooos/Bubble-Card#pop-up-initialization-fix" target="_blank" rel="noopener noreferrer">这个补丁</a>（推荐）。</p>
                    </div>
                </div>
            </div>
            ${editor.makeVersion()}
      </div>
    `;
}

