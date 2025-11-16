import {
    LitElement,
    html,
    css,
    unsafeCSS
} from 'lit';
import { version } from '../var/version.js';
import { fireEvent } from '../tools/utils.js';
import { renderButtonEditor } from '../cards/button/editor.js';
import { renderPopUpEditor } from '../cards/pop-up/editor.js';
import { renderSeparatorEditor } from '../cards/separator/editor.js';
import { renderHorButtonStackEditor } from '../cards/horizontal-buttons-stack/editor.js';
import { renderCoverEditor } from '../cards/cover/editor.js';
import { renderClimateEditor } from '../cards/climate/editor.js';
import { renderSelectEditor } from '../cards/select/editor.js';
import { renderCalendarEditor } from '../cards/calendar/editor.js';
import { renderMediaPlayerEditor } from '../cards/media-player/editor.js';
import { renderEmptyColumnEditor } from '../cards/empty-column/editor.js';
import { makeSubButtonPanel } from '../components/sub-button/editor.js';
import { makeModulesEditor } from '../modules/editor.js';
import { makeModuleStore, _fetchModuleStore } from '../modules/store.js';
import styles from './styles.css';
import moduleStyles from '../modules/styles.css';
import { getLazyLoadedPanelContent } from './utils.js';

class BubbleCardEditorZh extends LitElement {
    _previewStyleApplied = false;
    _entityCache = {};
    _cachedAttributeList = null;
    _cachedAttributeListEntity = null;
    _expandedPanelStates = {};
    _moduleErrorCache = {};
    _moduleCodeEvaluating = null;

    constructor() {
        super();
        this._expandedPanelStates = {};
    }

    setConfig(config) {
        this._config = {
            ...config
        };
    }

    static get properties() {
        return {
            hass: {},
            _config: {}
        };
    }

    get _card_type() {
        return this._config?.card_type || '';
    }

    get _button_type() {
        return this._config?.button_type || 
               (this._config?.card_type === 'pop-up' ? '' : 'switch');
    }

    get _entity() {
        return this._config?.entity || '';
    }

    get _selectable_attributes() {
        return [
            'source_list', 
            'sound_mode_list',
            'hvac_modes',
            'fan_modes',
            'swing_modes',
            'preset_modes',
            'effect_list'
        ];
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('hass')) {
            // If hass changes, entity lists might be stale
            this.listsUpdated = false;
            // Clear entity cache when hass changes
            this._entityCache = {};
            // Clear attribute list cache as well
            this._cachedAttributeList = null;
            this._cachedAttributeListEntity = null;
        }
    }

    async firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        if (this.hass && this.hass.loadFragmentTranslation) {
            try {
                await this.hass.loadFragmentTranslation("config");
            } catch (e) {
                console.error("Bubble Card Editor: Failed to load 'config' fragment translation", e);
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback?.();
        try { if (this._errorListener) { window.removeEventListener('bubble-card-error', this._errorListener); this._errorListener = null; } } catch (e) {}
        try {
            if (this._moduleChangeHandler) {
                window.removeEventListener('bubble-card-modules-changed', this._moduleChangeHandler);
                window.removeEventListener('bubble-card-module-updated', this._moduleChangeHandler);
                document.removeEventListener('yaml-modules-updated', this._moduleChangeHandler);
                this._moduleChangeHandler = null;
                this._moduleChangeListenerAdded = false;
            }
        } catch (e) {}
        try { if (this._storeAutoRefreshTimer) { clearInterval(this._storeAutoRefreshTimer); this._storeAutoRefreshTimer = null; } } catch (e) {}
        try { if (this._progressInterval) { clearInterval(this._progressInterval); this._progressInterval = null; } } catch (e) {}
        try { if (this._editorSchemaDebounce) { clearTimeout(this._editorSchemaDebounce); this._editorSchemaDebounce = null; } } catch (e) {}
    }

    render() {
        if (!this.hass) {
            return html``;
        }

        // Apply preview style only once
        if (!this._previewStyleApplied) {
            const homeAssistant = document.querySelector("body > home-assistant");
            const previewElement = homeAssistant?.shadowRoot
                ?.querySelector("hui-dialog-edit-card")
                ?.shadowRoot
                ?.querySelector("ha-dialog > div.content > div.element-preview");

            if (previewElement?.style && previewElement.style.position !== 'sticky') {
                previewElement.style.position = 'sticky';
                previewElement.style.top = '0';
                previewElement.style.height = 'calc(100vh - 224px)';
                previewElement.style.overflowY = 'auto';
                this._previewStyleApplied = true;
            }
        }

        if (!this.listsUpdated) {
            this._initializeLists();
            this.listsUpdated = true;
        }

        const cardTypeList = this.cardTypeList;
        const buttonTypeList = this.buttonTypeList;

        switch (this._config?.card_type) {
            case 'pop-up':
                return renderPopUpEditor(this);
            case 'button':
                return renderButtonEditor(this);
            case 'separator':
                return renderSeparatorEditor(this);
            case 'horizontal-buttons-stack':
                return renderHorButtonStackEditor(this);
            case 'cover':
                return renderCoverEditor(this);
            case 'media-player':
                return renderMediaPlayerEditor(this);
            case 'empty-column':
                return renderEmptyColumnEditor(this);
            case 'select':
                return renderSelectEditor(this);
            case 'climate':
                return renderClimateEditor(this);
            case 'calendar':
                return renderCalendarEditor(this);
            case undefined:
                return html`
                    <div class="card-config">
                        <div class="bubble-info">
                            <h4 class="bubble-section-title">
                                <ha-icon icon="mdi:information-outline"></ha-icon>
                                你需要先选择一个卡片类型
                            </h4>
                        </div>
                        ${this.makeDropdown("卡片类型", "card_type", cardTypeList)}
                        <img style="width: 100%; height: auto; border-radius: 24px;" src="https://raw.githubusercontent.com/Vanadiry/Bubble-Card-zh/main/.github/bubble-card.gif">
                        
                        <div class="bubble-info-container">
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:tag-text"></ha-icon>
                                    Bubble Card 中文 ${version}
                                </h4>
                                <div class="content">
                                    <p>如果你想了解此版本的更新内容，可以点击<a href="https://github.com/Vanadiry/Bubble-Card-zh/releases/tag/${version}" target="_blank" rel="noopener noreferrer"><b>这里</b></a>查看更新日志。</p>
                                </div>
                            </div>
                            
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:help-circle-outline"></ha-icon>
                                    资源与帮助
                                </h4>
                                <div class="content">
                                    <p>如果你遇到问题或有疑问，可以在GitHub文档中找到更多详情。你也可以通过以下链接获取有用的资源与帮助。</p>
                                    <div class="bubble-badges">
                                        <a href="https://github.com/Vanadiry/Bubble-Card-zh" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:github"></ha-icon>
                                            <span>文档</span>
                                        </a>
                                        <a href="https://github.com/Vanadiry/Bubble-Card-zh/issues" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:bug"></ha-icon>
                                            <span>问题反馈</span>
                                        </a>
                                        <a href="https://github.com/Clooos/Bubble-Card/discussions/categories/questions-about-config-custom-styles-and-templates" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:help"></ha-icon>
                                            <span>配置帮助</span>
                                        </a>
                                        <a href="https://github.com/Clooos/Bubble-Card/discussions/categories/share-your-custom-styles-templates-and-dashboards" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:wrench"></ha-icon>
                                            <span>共享示例</span>
                                        </a>
                                        <a href="https://community.home-assistant.io/t/bubble-card-a-minimalist-card-collection-for-home-assistant-with-a-nice-pop-up-touch/609678" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <ha-icon icon="mdi:home-assistant"></ha-icon>
                                            <span>HA 论坛</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:heart-outline"></ha-icon>
                                    支持原始项目
                                </h4>
                                <div class="content">
                                    <p>你好！我是Clooos，Bubble Card原始项目的开发者。我将大部分空闲时间都投入到这个项目中，希望它能做到最好。如果你喜欢我的工作，任何形式的捐赠都是支持我的好方式。</p>
                                    <p>另外，你也可以查看我的Patreon，获取独家的自定义样式、模板和模块。订阅大概是支持我、并让这个项目持续下去的最佳方式。</p>
                                    <div class="bubble-badges">
                                        <a href="https://www.buymeacoffee.com/clooos" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <div class="bmc-icon">
                                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"/>
                                                </svg>
                                            </div>
                                            <span>请我喝杯啤酒</span>
                                        </a>
                                        <a href="https://www.paypal.com/donate/?business=MRVBV9PLT9ZPL&no_recurring=0&item_name=Hi%2C+I%27m+Clooos+the+creator+of+Bubble+Card.+Thank+you+for+supporting+me+and+my+passion.+You+are+awesome%21+%F0%9F%8D%BB&currency_code=EUR" target="_blank" rel="noopener noreferrer" class="bubble-badge support-badge">
                                            <div class="paypal-icon">
                                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.016 19.198h-4.2a.562.562 0 0 1-.555-.65L5.093.584A.692.692 0 0 1 5.776 0h7.222c3.417 0 5.904 2.488 5.846 5.5-.006.25-.027.5-.066.747A6.794 6.794 0 0 1 12.071 12H8.743a.69.69 0 0 0-.682.583l-.325 2.056-.013.083-.692 4.39-.015.087zM19.79 6.142c-.01.087-.01.175-.023.261a7.76 7.76 0 0 1-7.695 6.598H9.007l-.283 1.795-.013.083-.692 4.39-.134.843-.014.088H6.86l-.497 3.15a.562.562 0 0 0 .555.65h3.612c.34 0 .63-.249.683-.585l.952-6.031a.692.692 0 0 1 .683-.584h2.126a6.793 6.793 0 0 0 6.707-5.752c.306-1.95-.466-3.744-1.89-4.906z"/>
                                                </svg>
                                            </div>
                                            <span>PayPal</span>
                                        </a>
                                        <a href="https://www.patreon.com/Clooos" target="_blank" rel="noopener noreferrer" class="bubble-badge">
                                            <div class="patreon-icon">
                                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.957 7.21c-.004-3.064-2.391-5.576-5.191-6.482-3.478-1.125-8.064-.962-11.384.604C2.357 3.231 1.093 7.391 1.046 11.54c-.039 3.411.302 12.396 5.369 12.46 3.765.047 4.326-4.804 6.068-7.141 1.24-1.662 2.836-2.132 4.801-2.618 3.376-.836 5.678-3.501 5.673-7.031Z"/>
                                                </svg>
                                            </div>
                                            <span>Patreon</span>
                                        </a>
                                    </div>
                                    <div class="creator-message">
                                        <a href="https://www.reddit.com/user/Clooooos/" target="_blank" rel="noopener noreferrer">
                                            <img src="https://avatars.githubusercontent.com/u/36499953" alt="Clooos" class="creator-avatar">
                                        </a>
                                        <p class="bubble-thank-you">感谢你成为这个超棒社区的一员！来自比利时的敬意！🍻</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bubble-info">
                                <h4 class="bubble-section-title">
                                    <ha-icon icon="mdi:translate"></ha-icon>
                                    关于翻译
                                </h4>
                                <div class="content">
                                    <p>我是翻译这个插件的Vanadiry！谢谢你用我翻译的版本，希望能让你的配置过程更加省力。这是我的<a href="https://vanadiry.com/" target="_blank" rel="noopener noreferrer">个人主页</a>，欢迎大家来玩！</p>
                                    <p>除了翻译，我只替换了一些类名，使得这个分支可以和原版共存。其他功能、操作逻辑等等，都是没有修改的。以及模块商店也用的是作者的仓库。<br />作者更新项目之后，我会在两天左右同步更新，所以你可以放心使用这个翻译分支。</p>
                                    <p>如果有关于翻译的问题，请在<a href="https://github.com/Vanadiry/Bubble-Card-zh" target="_blank" rel="noopener noreferrer">Vanadiry/Bubble-Card-zh</a>项目中提出。不要在原作者的仓库中提交关于此分支的翻译问题。</p>
                                    <div class="creator-message">
                                        <a href="https://vanadiry.com/" target="_blank" rel="noopener noreferrer">
                                            <img src="https://avatars.githubusercontent.com/u/77710715" alt="Vanadiry" class="creator-avatar">
                                        </a>
                                        <p class="bubble-thank-you">我是Vanadiry，为这个插件提供中文翻译！感谢Clooos带来的超好用工具！</p>
                                    </div>
                                </div>
                            </div>
                            ${this.makeVersion()}
                        </div>
                    </div>
                `;
        }
    }

    makeLayoutOptions() {
        const defaultLayout = window.isSectionView ? 'large' : 'normal';
        const defaultRows = this._config.card_type === "separator" ? '0.8' : '1';
        const showRowsOption = this._config.card_type !== "pop-up" && 
            (this._config.card_layout?.includes("large") || (window.isSectionView && !this._config.card_layout));

        return html`
            <ha-combo-box
                label="${this._config.card_type === "pop-up" ? '卡片标头布局' : '卡片布局'}"
                .value="${this._config.card_layout || defaultLayout}"
                .configValue="${"card_layout"}"
                .items="${[
                    { label: '普通（默认）', value: 'normal' },
                    { label: '更大', value: 'large' },
                    { label: '更大（扁的子按钮）', value: 'large-2-rows' },
                    { label: '更大（网格布局的子按钮，需要至少2行）', value: 'large-sub-buttons-grid' }
                ]}"
                @value-changed="${this._valueChanged}"
            ></ha-combo-box>
            ${this._renderConditionalContent(showRowsOption, html`
                <ha-textfield
                    label="行数"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    step="0.1"
                    .disabled="${this._config.grid_options?.rows}"
                    .value="${this._config.rows || this._config.grid_options?.rows || defaultRows}"
                    .configValue="${"rows"}"
                    @input="${this._valueChanged}"
                ></ha-textfield>
            `)}
            ${this._renderConditionalContent(this._config.grid_options?.rows, html`
            <div class="bubble-info warning">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:alert-outline"></ha-icon>
                    行数已经在“布局”中设置了
                </h4>
                <div class="content">
                    <p>如果你想修改行数，可以在编辑器顶部的“布局”选项里调整。或者在YAML配置中删掉相关设置，以重新启用此选项。</p>
                </div>
            </div>
            `)}
        `;
    }

    makeShowState(context = this._config, config = '', array = false, index) {
        const entity = context?.entity ?? this._config.entity ?? '';
        const nameButton = this._config.button_type === 'name';

        const isSelect = entity?.startsWith("input_select") || entity?.startsWith("select") || context.select_attribute;

        const attributeList = context?.show_attribute 
            ? Object.keys(this.hass.states[entity]?.attributes || {}).map((attributeName) => {
                let state = this.hass.states[entity];
                let formattedName = this.hass.formatEntityAttributeName(state, attributeName);
                return { label: formattedName, value: attributeName };
              })
            : [];

        return html`

            ${this._renderConditionalContent(array !== 'sub_button', html`
                <ha-formfield .label="文字滚动效果">
                    <ha-switch
                        aria-label="文字滚动效果"
                        .checked=${context?.scrolling_effect ?? true}
                        .configValue="${config + "scrolling_effect"}"
                        @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { scrolling_effect: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">文字滚动效果</label> 
                    </div>
                </ha-formfield>
            `)}
            ${this._renderConditionalContent(array === 'sub_button', html`
                <ha-formfield .label="Show background">
                    <ha-switch
                        aria-label="实体开启时显示背景"
                        .checked=${context?.show_background ?? true}
                        @change="${(ev) => this._arrayValueChange(index, { show_background: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">实体开启时显示背景</label> 
                    </div>
                </ha-formfield>
            `)}
            ${this._renderConditionalContent(array === 'sub_button' && (context?.show_background ?? true), html`
                <ha-formfield .label="背景色随实体状态变化">
                    <ha-switch
                        aria-label="背景色随实体状态变化"
                        .checked=${context?.state_background ?? true}
                        @change="${(ev) => this._arrayValueChange(index, { state_background: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">背景色随实体状态变化</label> 
                    </div>
                </ha-formfield>
            `)}
            ${this._renderConditionalContent(array === 'sub_button' && (context?.state_background ?? true) && entity.startsWith("light"), html`
                <ha-formfield .label="背景颜色随灯光颜色变化">
                    <ha-switch
                        aria-label="背景颜色随灯光颜色变化"
                        .checked=${context?.light_background ?? true}
                        @change="${(ev) => this._arrayValueChange(index, { light_background: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">背景颜色随灯光颜色变化</label> 
                    </div>
                </ha-formfield>
            `)}
            ${this._renderConditionalContent(array !== 'sub_button' && entity.startsWith("light"), html`
                <ha-formfield .label="使用强调色替代灯光颜色">
                    <ha-switch
                        aria-label="使用强调色替代灯光颜色"
                        .checked=${context?.use_accent_color ?? false}
                        .configValue="${config + "use_accent_color"}"
                        @change="${this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">使用强调色替代灯光颜色</label> 
                    </div>
                </ha-formfield>
            `)}
            <ha-formfield .label="显示图标">
                <ha-switch
                    aria-label="显示图标"
                    .checked=${context?.show_icon ?? true}
                    .configValue="${config + "show_icon"}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_icon: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示图标</label> 
                </div>
            </ha-formfield>
            ${this._renderConditionalContent(array !== 'sub_button', html`
                <ha-formfield .label="图标优先于实体图片">
                    <ha-switch
                        aria-label="图标优先于实体图片"
                        .checked=${context?.force_icon ?? false}
                        .configValue="${config + "force_icon"}"
                        .disabled="${nameButton}"
                        @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { force_icon: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">图标优先于实体图片</label> 
                    </div>
                </ha-formfield>
            `)}
            <ha-formfield .label="显示名称">
                <ha-switch
                    aria-label="显示名称"
                    .checked=${context?.show_name ?? array !== 'sub_button' ? true : false}
                    .configValue="${config + "show_name"}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_name: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示名称</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="显示实体状态">
                <ha-switch
                    aria-label="显示实体状态"
                    .checked="${context?.show_state ?? context.button_type === 'state'}"
                    .configValue="${config + "show_state"}"
                    .disabled="${nameButton && array !== 'sub_button'}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_state: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示实体状态</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="显示最近变化时间">
                <ha-switch
                    aria-label="显示最近变化时间"
                    .checked=${context?.show_last_changed}
                    .configValue="${config + "show_last_changed"}"
                    .disabled="${nameButton && array !== 'sub_button'}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_last_changed: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示最近变化时间</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="显示最近更新时间">
                <ha-switch
                    aria-label="显示最近更新时间"
                    .checked=${context?.show_last_updated}
                    .configValue="${config + "show_last_updated"}"
                    .disabled="${nameButton && array !== 'sub_button'}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_last_updated: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示最近更新时间</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="显示属性">
                <ha-switch
                    aria-label="显示属性"
                    .checked=${context?.show_attribute}
                    .configValue="${config + "show_attribute"}"
                    .disabled="${nameButton && array !== 'sub_button'}"
                    @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_attribute: ev.target.checked }, array)}"
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">显示属性</label> 
                </div>
            </ha-formfield>
            ${this._renderConditionalContent(context?.show_attribute, html`
                <div class="ha-combo-box">
                    <ha-combo-box
                        label="要显示的属性"
                        .value="${context?.attribute}"
                        .configValue="${config + "attribute"}"
                        .items="${attributeList}"
                        .disabled="${nameButton && array !== 'sub_button'}"
                        @value-changed="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { attribute: ev.detail.value }, array)}"
                    ></ha-combo-box>
                </div>
            `)}
            ${this._renderConditionalContent(array === 'sub_button' && isSelect, html`
                <ha-formfield .label="显示箭头（仅适用于选单实体）">
                    <ha-switch
                        aria-label="显示箭头（仅适用于选单实体）"
                        .checked=${context?.show_arrow ?? true}
                        .configValue="${config + "show_arrow"}"
                        @change="${!array ? this._valueChanged : (ev) => this._arrayValueChange(index, { show_arrow: ev.target.checked }, array)}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">显示箭头（仅适用于菜单实体）</label> 
                    </div>
                </ha-formfield>
            `)}
        `;
    }

    makeDropdown(label, configValue, items, disabled) {
        if (label.includes('icon') || label.includes('Icon')) {
            return html`
                <div class="ha-icon-picker">
                    <ha-icon-picker
                        label="${label}"
                        .value="${this._config[configValue]}"
                        .configValue="${configValue}"
                        item-value-path="icon"
                        item-label-path="icon"
                        @value-changed="${this._valueChanged}"
                    ></ha-icon-picker>
                </div>
            `;
        } else if (label.includes('Entity') || label.includes('entity')) {
            let includeDomains = [];
            let excludeDomains = [];
            
            switch(this._config.card_type) {
                case 'button':
                    break;
                case 'cover':
                    includeDomains = ['cover'];
                    break;
                case 'climate':
                    includeDomains = ['climate'];
                    break;
                case 'media-player':
                    includeDomains = ['media_player'];
                    break;
                case 'select':
                    includeDomains = ['input_select', 'select'];
                    if (this._config.select_attribute) {
                        includeDomains = [];
                    }
                    break;
                default:
                    break;
            }
            
            return html`
                <ha-entity-picker
                    label="${label}"
                    .hass="${this.hass}"
                    .value="${this._config[configValue]}"
                    .configValue="${configValue}"
                    .includeDomains="${includeDomains.length ? includeDomains : undefined}"
                    .excludeDomains="${excludeDomains.length ? excludeDomains : undefined}"
                    .disabled="${disabled}"
                    allow-custom-entity
                    @value-changed="${this._valueChanged}"
                ></ha-entity-picker>
            `;
        } else {
            return html`
            <div class="ha-combo-box">
                <ha-combo-box
                    label="${label}"
                    .value="${this['_' + configValue]}"
                    .configValue="${configValue}"
                    .items="${items}"
                    .disabled="${disabled}"
                    @value-changed="${this._valueChanged}"
                ></ha-combo-box>
            </div>
          `;
        }
    }

    _renderConditionalContent(condition, content) {
        return condition ? content : html``;
    }

    makeActionPanel(label, context = this._config, defaultAction, array, index = this._config) {
        const icon = label === "单击行为" 
            ? "mdi:gesture-tap" 
            : label === "双击行为" 
            ? "mdi:gesture-double-tap"
            : label === "长按行为" 
            ? "mdi:gesture-tap-hold"
            : "mdi:gesture-tap";
        const configValueType = label === "单击行为" 
            ? "tap_action"
            : label === "双击行为" 
            ? "double_tap_action"
            : label === "长按行为" 
            ? "hold_action"
            : label === "开启行为"
            ? "open_action"
            : "close_action";
        
        // Create a unique key for the panel
        const panelKey = array 
            ? `action_panel_${array}_${index}_${configValueType}` 
            : `action_panel_config_${configValueType}`;

        let value;
        try{
           value = label === "单击行为" 
                ? context.tap_action
                : label === "双击行为" 
                ? context.double_tap_action
                : label === "长按行为" 
                ? context.hold_action
                : label === "开启行为"
                ? context.open_action
                : context.close_action;
        }catch{}

        const isDefault = context === this._config;

        if (!defaultAction) {
            defaultAction = isDefault && label === "单击行为" 
            ? this._config.button_type !== "name" ? "more-info" : "none"
            : isDefault
            ? "none"
            : '';
        }

        return html`
            <ha-expansion-panel 
                outlined
                @expanded-changed=${(e) => {
                    this._expandedPanelStates[panelKey] = e.target.expanded;
                    this.requestUpdate();
                }}
            >
                <h4 slot="header">
                    <ha-icon icon="${icon}"></ha-icon>
                    ${label}
                </h4>
                <div class="content"> 
                    ${getLazyLoadedPanelContent(this, panelKey, !!this._expandedPanelStates[panelKey], () => html`
                        <ha-form
                            .hass=${this.hass}
                            .data=${context}
                            .configValue="${
                                          (array ? array+".":"") + (parseInt(index) == index ? index+".":"") +  configValueType}" 
                            .schema=${[{name: configValueType,
                                        label : label,
                                        selector: { ui_action: {
                                            default_action: defaultAction,} },
                                        }]}  
                            .computeLabel=${this._computeLabelCallback}
                            @value-changed=${(ev) => this._ActionChanged(ev,array,index)}
                        ></ha-form>
                        ${ value?.action  === 'call-service' || value?.action === 'perform-action' ? html`
                            <ha-formfield .label="使用默认实体">
                                <ha-switch
                                    aria-label="使用默认实体"
                                    .configValue="${
                                                  (array ? array+".":"") + (parseInt(index) == index ? index+".":"") +  configValueType+".default_entity"}" 
                                    .checked=${value?.target?.entity_id === "entity"}
                                     @change=${this._updateActionsEntity}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">使用默认实体</label> 
                                </div>
                            </ha-formfield>
                        ` : ''}
                    `)}
                </div>
            </ha-expansion-panel>
        `;
    }

    makeSubButtonPanel() {
        return makeSubButtonPanel(this);
    }

    makeVersion() {
        return html`
            <h4 class="version">
                Bubble Card 中文
                <span class="version-number">
                    ${version}
                </span>
            </h4>
        `;
    }

    makeStyleEditor() {
        const panelKey = 'style_editor_panel'; // Unique key for this panel

        return html`
            <ha-expansion-panel 
                outlined
                @expanded-changed="${(e) => { 
                    this._expandedPanelStates[panelKey] = e.target.expanded; 
                    this.requestUpdate(); 
                }}"
            >
                <h4 slot="header">
                    <ha-icon icon="mdi:code-braces"></ha-icon>
                    自定义样式与JS模板
                </h4>
                <div class="content">
                    ${getLazyLoadedPanelContent(this, panelKey, !!this._expandedPanelStates[panelKey], () => html`
                        <div class="code-editor">
                            <ha-code-editor
                                mode="yaml"
                                autofocus
                                autocomplete-entities
                                autocomplete-icons
                                .hass=${this.hass}
                                .value=${this._config.styles}
                                .configValue="${"styles"}"
                                @value-changed=${(e) => {
                                    // Clear errors for this card when code is modified
                                    this._valueChanged(e);
                                    this._clearCurrentCardError();
                                }}
                            ></ha-code-editor>
                        </div>
                        ${this.createErrorConsole()}
                    `)}
                    <div class="bubble-info">
                        <h4 class="bubble-section-title">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            自定义样式与JS模板
                        </h4>
                        <div class="content">
                            <p>对于高级用户，你可以在上方的代码编辑器中编辑此卡片的CSS样式。更多信息和示例请点击<a href="https://github.com/Clooos/Bubble-Card#styling" target="_blank" rel="noopener noreferrer">这里</a>。不需要添加<code>styles: |</code>（仅在 YAML 模式中使用）。你也可以添加<a href="https://github.com/Clooos/Bubble-Card#templates" target="_blank" rel="noopener noreferrer">JS模板</a>（不支持Jinja）。</p>
                        </div>
                    </div>
                </div>
            </ha-expansion-panel>
        `;
    }

    _clearCurrentCardError() {
        if (!window.bubbleCardErrorRegistry) return;
        
        const currentCardType = this._config?.card_type;
        const currentEntityId = this._config?.entity;
        if (!currentCardType || !currentEntityId) return;
        
        const currentCardKey = `${currentCardType}_${currentEntityId}`;
        
        if (window.bubbleCardErrorRegistry[currentCardKey]) {
            delete window.bubbleCardErrorRegistry[currentCardKey];
            // Clear displayed error immediately
            this.errorMessage = '';
            this.errorSource = '';
            this.requestUpdate();
        }
    }

    _clearCurrentModuleError(moduleId) {
        this._moduleCodeEvaluating = moduleId;
        // Clear displayed error immediately
        this.errorMessage = '';
        this.errorSource = '';
        this.requestUpdate();
    }

    createErrorConsole(context = this) {
        if (!window.bubbleCardErrorRegistry) {
            window.bubbleCardErrorRegistry = {};
        }

        // Function to update the displayed error based on current context
        const updateDisplayedError = () => {
            const isModuleEditor = context._editingModule !== undefined;
            
            if (isModuleEditor && context._editingModule) {
                const moduleId = context._editingModule.id;
                
                if (!moduleId) {
                    context.errorMessage = '';
                    context.errorSource = '';
                    return;
                }
                
                let foundModuleError = false;
                
                if (window.bubbleCardErrorRegistry) {
                    Object.values(window.bubbleCardErrorRegistry).forEach(error => {
                        if (error.moduleId === moduleId) {
                            context.errorMessage = error.message;
                            context.errorSource = error.source;
                            foundModuleError = true;
                        }
                    });
                }
                
                if (!foundModuleError) {
                    context.errorMessage = '';
                    context.errorSource = '';
                }
            } else {
                // Standard card context, use card_type and entity
                const currentCardType = context._config?.card_type;
                const currentEntityId = context._config?.entity;
                
                if (!currentCardType || !currentEntityId) {
                    context.errorMessage = '';
                    context.errorSource = '';
                    return;
                }
                
                const currentCardKey = `${currentCardType}_${currentEntityId}`;
                
                if (window.bubbleCardErrorRegistry && window.bubbleCardErrorRegistry[currentCardKey]) {
                    const currentCardError = window.bubbleCardErrorRegistry[currentCardKey];
                    context.errorMessage = currentCardError.message;
                    context.errorSource = currentCardError.source;
                } else {
                    // No error found for this card, ensure we clear any displayed errors
                    context.errorMessage = '';
                    context.errorSource = '';
                }
            }
            
            // Force a UI update
            context.requestUpdate();
        };

        if (!context._errorListener) {
            context._errorListener = (event) => {
                const errorDetail = event.detail;
                
                if (errorDetail && typeof errorDetail === 'object' && errorDetail.context) {
                    const { message, context: errorContext } = errorDetail;
                    
                    if (message) {
                        // Only process if we have a cardType and entityId (needed for regular cards)
                        if (errorContext.cardType && errorContext.entityId) {
                            // Create a unique key for this error based on card type and entity
                            const errorKey = `${errorContext.cardType}_${errorContext.entityId}`;
                            
                            // Store the error in the registry with source info
                            window.bubbleCardErrorRegistry[errorKey] = {
                                message: message,
                                source: errorContext.sourceType === 'module' 
                                    ? `Module ('${errorContext.moduleId}')` 
                                    : 'Card Configuration (styles section)',
                                cardType: errorContext.cardType,
                                entityId: errorContext.entityId,
                                moduleId: errorContext.sourceType === 'module' ? errorContext.moduleId : null
                            };
                        }
                    } else {
                        // If message is empty, clear the error from the registry
                        if (errorContext.sourceType === 'module' && errorContext.moduleId) {
                            // Clear module-specific error
                            Object.keys(window.bubbleCardErrorRegistry).forEach(key => {
                                if (window.bubbleCardErrorRegistry[key]?.moduleId === errorContext.moduleId) {
                                    delete window.bubbleCardErrorRegistry[key];
                                }
                            });
                        } else if (errorContext.cardType && errorContext.entityId) {
                            // Clear card-specific error
                            const errorKey = `${errorContext.cardType}_${errorContext.entityId}`;
                            if (window.bubbleCardErrorRegistry[errorKey]) {
                                delete window.bubbleCardErrorRegistry[errorKey];
                            }
                        }
                    }
                }
                
                // Update displayed error based on current context
                updateDisplayedError();
            };
            window.addEventListener('bubble-card-error', context._errorListener);
        }
        
        // Always update the displayed error when this function is called
        // This ensures we show the correct error when switching between cards/modules
        updateDisplayedError();

        return html`
            <div class="bubble-info error" 
                style="display: ${!context.errorMessage ? 'none' : ''}; margin-bottom: 8px;">
                <h4 class="bubble-section-title">
                    <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                    JS模板错误
                </h4>
                <div class="content">
                    <p>${context.errorMessage}</p>
                    ${context._editingModule && typeof context._editingModule === 'object' && context._editingModule.id ? html`<hr><span class="helper-text" style="margin: 0;">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        JS模板的错误有时会在模块编辑器里延迟显示。
                    </span>` : ''}
                </div>
            </div>
        `;
    }

    _getProcessedSchema(key, originalSchema, config) {
      if (this._processedSchemas && this._processedSchemas[key]) {
        return this._processedSchemas[key];
      }
      const schemaCopy = structuredClone(originalSchema);
      const updatedSchema = this._updateAttributeSelectors(schemaCopy, config, key);
      this._processedSchemas = { ...this._processedSchemas, [key]: updatedSchema };
      return updatedSchema;
    }

    _valueChangedInHaForm(e, key, originalSchema) {
      let value = e.detail.value;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        const keys = Object.keys(value);
        if (keys.length > 0 && keys.every(k => !isNaN(parseInt(k, 10)))) {
          value = keys
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map(k => value[k]);
        }
      }

      // Update the working copy FIRST to keep the form stable for the immediate re-render
      if (this._workingModuleConfigs) { // Ensure it exists
          this._workingModuleConfigs[key] = value;
      }

      // Now clean the value before updating the main config and schema
      const cleanedValue = this._cleanEmpty(value, key); 

      // Update processed schema based on the CLEANED value
      const newProcessedSchema = structuredClone(originalSchema);
      const updatedSchema = this._updateAttributeSelectors(newProcessedSchema, cleanedValue, key);
      this._processedSchemas = { ...this._processedSchemas, [key]: updatedSchema };

      // Fire event to update the main config (_config) with the CLEANED value
      fireEvent(this, "config-changed", { config: { ...this._config, [key]: cleanedValue } });
    }

    _cleanEmpty(value, key) {
      if (Array.isArray(value)) {
        return value
          .map(item => this._cleanEmpty(item, undefined))
          .filter(item => !this._isEmpty(item));
      } else if (value && typeof value === "object") {
        const cleaned = {};
        Object.keys(value).forEach(k => {
          const cleanedValue = this._cleanEmpty(value[k], k);
          if (!this._isEmpty(cleanedValue)) {
            cleaned[k] = cleanedValue;
          }
        });
        return Object.keys(cleaned).length > 0 ? cleaned : undefined;
      } else if (typeof value === 'string' && value === "") {
        if (key !== 'state') {
          return undefined;
        }
      }
      return value;
    }

    _isEmpty(value) {
      if (value === null || value === undefined) return true;
      if (Array.isArray(value)) return value.length === 0;
      if (typeof value === "object") return Object.keys(value).length === 0;
      return false;
    }

    _updateAttributeSelectors = (schema, configData, inheritedEntity = undefined) => {
      return schema.map(field => {
        if (field.selector && field.selector.entity) {
          if (configData && configData.entity) {
            inheritedEntity = configData.entity;
          } else {
            inheritedEntity = undefined;
          }
        }

        if (field.selector && field.selector.attribute) {
          field.selector.attribute.entity_id = inheritedEntity;
        }

        const nestedConfig = configData && configData[field.name] ? configData[field.name] : configData;
        if (Array.isArray(field.schema)) {
          field.schema = this._updateAttributeSelectors(field.schema, nestedConfig, inheritedEntity);
        }
        return field;
      });
    };

  makeModulesEditor() {
    return makeModulesEditor(this);
  }

  makeModuleStore() {
    return makeModuleStore(this);
  }

  _valueChanged(ev) {
    const target = ev.target;
    const detail = ev.detail;
    
    let needsUpdate = false;
    let rawValue;

    // Check if the target is a ha-switch
    if (target.tagName === 'HA-SWITCH') {
        rawValue = target.checked;
        needsUpdate = true;
    } else if (target.value !== undefined) {
        rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
        needsUpdate = true;
    } else if (detail?.value !== undefined) {
        needsUpdate = true;
    }

    if (!needsUpdate) return;

    if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
        return;
    }

    // Create a new config object to avoid mutating the original config
    let newConfig = { ...this._config };
    
    try {
        const { configValue, checked } = target;
        if (configValue) {
            const value = checked !== undefined ? checked : rawValue;
            const configKeys = configValue.split('.');
            
            // For nested properties, we need to clone progressively the structure
            if (configKeys.length > 1) {
                let tempConfig = newConfig;
                let path = '';
                
                for (let i = 0; i < configKeys.length - 1; i++) {
                    const key = configKeys[i];
                    path = path ? `${path}.${key}` : key;
                    
                    // Create the object if it doesn't exist
                    if (!tempConfig[key]) tempConfig[key] = {};
                    
                    // Clone the object to ensure it is extensible
                    tempConfig[key] = { ...tempConfig[key] };
                    tempConfig = tempConfig[key];
                }
                
                // Update the value
                const lastKey = configKeys[configKeys.length - 1];
                if (ev.type === 'input') {
                    tempConfig[lastKey] = rawValue;
                } else if (detail && tempConfig[lastKey] !== detail.value) {
                    tempConfig[lastKey] = detail.value;
                } else if (target.tagName === 'HA-SWITCH') {
                    tempConfig[lastKey] = rawValue;
                }
            } else {
                // Simple case - top level key
                const key = configKeys[0];
                if (ev.type === 'input') {
                    newConfig[key] = rawValue;
                } else if (detail && newConfig[key] !== detail.value) {
                    newConfig[key] = detail.value;
                } else if (target.tagName === 'HA-SWITCH') {
                    newConfig[key] = rawValue;
                }
            }
        } else {
            newConfig = detail.value;
        }
    } catch (error) {        
        // If an error occurs, try to update directly with the new config
        if (target.configValue && detail) {
            newConfig[target.configValue] = detail.value;
        } else if (detail) {
            newConfig = detail.value;
        } else {
            return;
        }
    }

    // Update this._config with the new config
    this._config = newConfig;
    
    // Emit the event with the new configuration
    fireEvent(this, "config-changed", { config: newConfig });
  }

  _arrayValueChange(index, value, array) {
    // Fix the climate sub-button addition
    if (this._config.sub_button && !this.subButtonJustAdded) {
      this.subButtonJustAdded = true;
      setTimeout(() => this._arrayValueChange(index, value, array), 10);
      return;
    }

    this._config[array] = this._config[array] || [];
    let arrayCopy = [...this._config[array]];
    arrayCopy[index] = arrayCopy[index] || {};
    arrayCopy[index] = { ...arrayCopy[index], ...value };
    this._config[array] = arrayCopy;
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  _ActionChanged(ev, array, index) {
    var hasDefaultEntity = false;
    try { 
      if (ev.currentTarget && 
          ev.currentTarget.__schema && 
          ev.currentTarget.__schema[0] && 
          ev.detail.value[ev.currentTarget.__schema[0].name] &&
          ev.detail.value[ev.currentTarget.__schema[0].name]['target'] &&
          ev.detail.value[ev.currentTarget.__schema[0].name]['target']['entity_id'] &&
          ev.detail.value[ev.currentTarget.__schema[0].name]['target']['entity_id'][0] === 'entity') {
        hasDefaultEntity = true;
      }
    }
    catch { }
    try { 
      if (ev.currentTarget && 
          ev.currentTarget.__schema && 
          ev.currentTarget.__schema[0] && 
          ev.detail.value[ev.currentTarget.__schema[0].name] &&
          ev.detail.value[ev.currentTarget.__schema[0].name]['target'] &&
          ev.detail.value[ev.currentTarget.__schema[0].name]['target']['entity_id'] === 'entity') {
        hasDefaultEntity = true;
      }
    }
    catch { }
    if (hasDefaultEntity) {
      if (ev.currentTarget && 
          ev.currentTarget.__schema && 
          ev.currentTarget.__schema[0] &&
          ev.detail.value[ev.currentTarget.__schema[0].name]) {
        ev.detail.value[ev.currentTarget.__schema[0].name]['action'] = 'call-service';
        if (ev.detail.value[ev.currentTarget.__schema[0].name]['perform_action'] != undefined) {
          ev.detail.value[ev.currentTarget.__schema[0].name]['service'] = "" + ev.detail.value[ev.currentTarget.__schema[0].name]['perform_action'];
          delete ev.detail.value[ev.currentTarget.__schema[0].name]['perform_action'];
        }
      }
    }

    if (array === 'button_action' || array === 'event_action') {
      this._config[array] = ev.detail.value;
    } else if (array) {
      this._config[array] = this._config[array] || [];
      let arrayCopy = [...this._config[array]];
      arrayCopy[index] = ev.detail.value;
      this._config[array] = arrayCopy;
    } else {
      this._config = ev.detail.value;
    }

    fireEvent(this, "config-changed", { config: this._config });
  }

  _updateActionsEntity(ev) {
    let obj = JSON.parse(JSON.stringify(this._config)); //get rid of the referencing
    const configKeys = ev.target.configValue.split('.');
    let i = 0
    for (i = 0; i < configKeys.length - 2; i++) {
      obj = obj[configKeys[i]] ? obj[configKeys[i]] : {};
    }

    if (!ev.target.checked) {
      if (obj[configKeys[i]] && obj[configKeys[i]].target?.entity_id === 'entity') {
        obj[configKeys[i]]['target'] = {};
      }
    } else {
      if (obj[configKeys[i]]) {
        obj[configKeys[i]]['target'] = { 'entity_id': 'entity' };
      } else {
        // Initialize the object if it doesn't exist
        obj[configKeys[i]] = { 'target': { 'entity_id': 'entity' } };
      }
    }

    var detail = { 'value': obj };
    var currentTarget = { '__schema': [{ 'name': configKeys[configKeys.length - 2] }] };
    var newev = { ...ev, detail, currentTarget };

    this._ActionChanged(newev, configKeys.length > 2 ? configKeys[0] : null, configKeys.length > 3 ? configKeys[1] : null);
  }

  _computeLabelCallback = (schema) => {
    return schema.label;
  }

  _conditionChanged(ev, index, array) {
    ev.stopPropagation();

    if (array) {
      this._config[array] = this._config[array] || [];
      let arrayCopy = [...this._config[array]];
      arrayCopy[index] = arrayCopy[index] || {};
      const conditions = ev.detail.value;
      arrayCopy[index] = {
        ...arrayCopy[index],
        visibility: conditions
      };
      this._config[array] = arrayCopy;
    } else if (this._config.card_type === 'pop-up') {
      const conditions = ev.detail.value;
      this._config = {
        ...this._config,
        trigger: conditions
      };
    }

    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  static get styles() {
    return css`
        ${unsafeCSS(styles + moduleStyles)}
    `;
  }

  _initializeLists() {
    const formateList = item => ({
        label: item,
        value: item
    });

    let selectEntities = [];

    if (Object.keys(this._entityCache).length === 0) {
        // Populate _entityCache and identify selectEntities in a single pass
        Object.keys(this.hass.states).forEach(entityId => {
            const entity = this.hass.states[entityId];
            const domain = entityId.split('.')[0];
            
            if (!this._entityCache[domain]) {
                this._entityCache[domain] = [];
            }
            this._entityCache[domain].push(entityId);

            // Check for selectable attributes for selectEntities
            if (this._selectable_attributes.some(attr => entity.attributes?.[attr])) {
                if (!selectEntities.includes(entityId)) {
                    selectEntities.push(entityId);
                }
            }
        });
    } else {
        const relevantDomainsForSelect = ['input_select', 'select'];
        relevantDomainsForSelect.forEach(domain => {
            if (this._entityCache[domain]) {
                selectEntities = [...selectEntities, ...this._entityCache[domain]];
            }
        });
        // Still need to check for other entities with selectable attributes not in input_select/select domains
        Object.keys(this.hass.states).forEach(entityId => {
            const entity = this.hass.states[entityId];
            if (this._selectable_attributes.some(attr => entity.attributes?.[attr])) {
                if (!selectEntities.includes(entityId)) { // Avoid duplicates
                    selectEntities.push(entityId);
                }
            }
        });
    }
    
    // Add entities from relevantDomains to selectEntities if not already present from attribute check
    const relevantDomains = ['input_select', 'select'];
    relevantDomains.forEach(domain => {
        if (this._entityCache[domain]) {
            this._entityCache[domain].forEach(entityId => {
                if (!selectEntities.includes(entityId)) {
                    selectEntities.push(entityId);
                }
            });
        }
    });
    // Ensure unique entities
    selectEntities = [...new Set(selectEntities)];

    const filteredStates = {};
    selectEntities.forEach(entityId => {
        if (this.hass.states[entityId]) {
            filteredStates[entityId] = this.hass.states[entityId];
        }
    });

    this.inputSelectList = { ...this.hass };
    this.inputSelectList.states = filteredStates;

    // Cache attributeList
    if (this._entity) {
        if (this._entity === this._cachedAttributeListEntity && this._cachedAttributeList) {
            this.attributeList = this._cachedAttributeList;
        } else {
            this.attributeList = Object.keys(this.hass.states[this._entity]?.attributes || {}).map((attributeName) => {
                let entity = this.hass.states[this._entity];
                let formattedName = this.hass.formatEntityAttributeName(entity, attributeName);
                return { label: formattedName, value: attributeName };
            });
            this._cachedAttributeList = this.attributeList;
            this._cachedAttributeListEntity = this._entity;
        }
    } else {
        this.attributeList = [];
        this._cachedAttributeList = null;
        this._cachedAttributeListEntity = null;
    }

    this.cardTypeList = [{
            'label': '按钮（开关、滑块...）',
            'value': 'button'
        },
        {
            'label': '日历',
            'value': 'calendar'
        },
        {
            'label': '遮阳设备',
            'value': 'cover'
        },
        {
            'label': '空调',
            'value': 'climate'
        },
        {
            'label': '空白占位',
            'value': 'empty-column'
        },
        {
            'label': '水平按钮组',
            'value': 'horizontal-buttons-stack'
        },
        {
            'label': '媒体播放器',
            'value': 'media-player'
        },
        {
            'label': '弹出面板',
            'value': 'pop-up'
        },
        {
            'label': '选单',
            'value': 'select'
        },
        {
            'label': '分隔线',
            'value': 'separator'
        }
    ];
  }
}

customElements.define('bubble-card-editor-zh', BubbleCardEditorZh);