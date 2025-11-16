import { html } from 'lit';
import { yamlKeysMap, moduleSourceMap } from '../tools/style-processor.js';
import { _formatModuleDescription, _getIconForType, _compareVersions, scrollToModuleForm } from './utils.js';
import { parseDiscussionsREST } from './parser.js';
import { getCachedModuleData } from './cache.js';
import { installOrUpdateModule } from './install.js';
import jsyaml from 'js-yaml';

export function makeModuleStore(context) {
  // Check if the persistent entity exists
  const entityId = 'sensor.bubble_card_modules';
  const entityExists = context.hass && context.hass.states && context.hass.states[entityId];
  
  // Initialize store settings if not already set
  if (context._storeShowOnlyCompatible === undefined) {
    context._storeShowOnlyCompatible = true; // Set to true by default
  }
  
  // Check if ranking info has been dismissed
  if (context._rankingInfoDismissed === undefined) {
    try {
      context._rankingInfoDismissed = localStorage.getItem('bubble-card-ranking-info-dismissed') === 'true';
    } catch (e) {
      context._rankingInfoDismissed = false;
    }
  }
  
  // Function to dismiss ranking info
  context._dismissRankingInfo = () => {
    context._rankingInfoDismissed = true;
    try {
      localStorage.setItem('bubble-card-ranking-info-dismissed', 'true');
    } catch (e) {
      console.warn('Failed to save ranking info dismiss state to localStorage', e);
    }
    context.requestUpdate();
  };
  
  // If entity doesn't exist, show setup instructions instead of the store
  if (!entityExists) {
    return html`
      <div class="bubble-info warning">
        <h4 class="bubble-section-title">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          需要进行配置
        </h4>
        <div class="content">
          <p>你的Home Assistant中尚未配置用于存储的 <code>sensor.bubble_card_modules</code> 实体。</p>
          <hr />
          <p><b>To use the Module store, follow these steps:</b></p>

          <p>1. 在 <code>configuration.yaml</code> 文件中，添加以下内容：</p>
          <code-block><pre>
# Bubble Card 模块存储
template:
  - trigger:
      - trigger: event
        event_type: bubble_card_update_modules
    sensor:
      - name: "Bubble Card Modules"
        state: "saved"
        icon: "mdi:puzzle"
        attributes:
          modules: "{{ trigger.event.data.modules }}"
          last_updated: "{{ trigger.event.data.last_updated }}"
          </pre></code-block>
          <p>2. 保存并重启Home Assistant</p>
          <p>3. 即可使用模块商店！</p>
        </div>
      </div>
    `;
  }

  // Continue with existing code for when the entity exists
  if (!context._storeModules) {
    // Check if data is in localStorage
    const cachedData = getCachedModuleData();
    if (cachedData) {
      // Use cached data
      context._storeModules = cachedData.modules;
      context._isLoadingStore = false;

      // SWR: refresh silently if stale (>6h) or near expiry (<1h)
      const now = Date.now();
      const lastFetchedAt = cachedData.lastFetchedAt || (cachedData.expiration ? cachedData.expiration - 86400000 : 0);
      const isStale = now - lastFetchedAt > 21600000; // 6 hours
      const isNearExpiry = cachedData.expiration < now + 3600000; // 1 hour
      if (isStale || isNearExpiry) {
        _fetchModuleStore(context, true);
      }
    } else {
      // No cache, load from GitHub
      context._isLoadingStore = true;
      _fetchModuleStore(context);
    }
  }

  // Set up a periodic background refresh every 6 hours
  if (!context._storeAutoRefreshTimer) {
    // Store an interval id on the context to avoid multiple timers
    context._storeAutoRefreshTimer = setInterval(() => {
      // Fire background refresh; built-in guard prevents overlapping calls
      _fetchModuleStore(context, true);
    }, 21600000);
  }

  if (context._isLoadingStore) {
    // Calculate progress percentage width based on current progress
    const progressWidth = context._loadingProgress || 0;
    const loadingText = context._loadingStatus || "正在加载模块";
    
    return html`
      <div class="store-loading">
        <div class="bubble-loading-icon">
          <div class="icon-center-wrapper">
            <ha-icon icon="mdi:puzzle"></ha-icon>
          </div>
          <div class="bubble-loading-orbit">
            <div class="bubble-loading-satellite"></div>
          </div>
        </div>
        <div class="bubble-progress-container">
          <div class="bubble-progress-track">
            <div class="bubble-progress-bar" style="width: ${progressWidth}%">
              <div class="bubble-progress-glow"></div>
            </div>
          </div>
          <div class="bubble-progress-percentage">
            <span class="bubble-progress-text">${loadingText}</span>
            <span class="bubble-progress-value">${Math.round(progressWidth)}%</span>
          </div>
        </div>
      </div>
    `;
  }

  if (context._storeError) {
    return html`
      <div class="bubble-info error">
        <h4 class="bubble-section-title">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          加载失败
        </h4>
        <div class="content">
          <p>Could not load modules from GitHub: ${context._storeError}</p>
          <mwc-button @click=${() => _fetchModuleStore(context)}>
            <ha-icon icon="mdi:refresh" style="margin-right: 8px;"></ha-icon>
            重试
          </mwc-button>
        </div>
      </div>
    `;
  }

  // Extract unique module types for the filter
  const moduleTypes = [...new Set(
    context._storeModules
      .filter(module => module.type)
      .map(module => module.type.toLowerCase())
  )].sort();

  // Add a state property for the currently zoomed image
  if (context._zoomedImage === undefined) {
    context._zoomedImage = null;
  }
  
  // Add a function to handle zooming in/out
  context._toggleImageZoom = (imageUrl) => {
    if (context._zoomedImage === imageUrl) {
      context._zoomedImage = null;
    } else {
      context._zoomedImage = imageUrl;
    }
    context.requestUpdate();
  };

  // Return the store UI
  return html`
    <div class="module-store">
      <div class="store-header">
        <div class="store-header-top">
          <div class="store-header-title">
            <ha-icon icon="mdi:puzzle-plus-outline"></ha-icon>
            <span>模块商店</span>
          </div>
          <div 
            class="store-refresh-button" 
            @click=${() => {
              // Reset the API call in progress flag to ensure refresh works
              context._isApiCallInProgress = false;
              _fetchModuleStore(context, false);
            }}
            title="刷新模块列表"
          >
            <ha-icon icon="mdi:refresh"></ha-icon>
          </div>
        </div>
        <div class="store-search">
          <ha-textfield
            label="搜索模块"
            icon
            .value=${context._storeSearchQuery || ''}
            @input=${(e) => {
              context._storeSearchQuery = e.target.value;
              context.requestUpdate();
            }}
          >
            <slot name="prefix" slot="leadingIcon">
              <ha-icon slot="prefix" icon="mdi:magnify"></ha-icon>
            </slot>
          </ha-textfield>
        </div>
        <div class="store-filters">

          <ha-formfield label="仅显示与此卡片兼容的模块">
            <ha-switch
              .checked=${context._storeShowOnlyCompatible ?? true}
              @change=${(e) => {
                context._storeShowOnlyCompatible = e.target.checked;
                context.requestUpdate();
              }}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>

      ${!context._rankingInfoDismissed ? html`
        <div class="bubble-info info">
          <div class="bubble-info-header">
            <h4 class="bubble-section-title">
              <ha-icon icon="mdi:information-outline"></ha-icon>
              模块如何排名？
              <div class="bubble-info-dismiss bubble-badge" @click=${context._dismissRankingInfo} title="关闭" 
                style="
                  display: inline-flex;
                  align-items: center;
                  position: absolute;
                  right: 16px;
                  padding: 0 8px;
                  cursor: pointer;"
              >
                <ha-icon icon="mdi:close" style="margin: 0;"></ha-icon>
                Dismiss
              </div>
            </h4>
          </div>
          <div class="content">
            <p>由于GitHub API的限制，只会统计主讨论帖上的表情（如❤️👍🚀）来计算受欢迎程度，并结合其他因素，如：近期活动、评论数量、更新频率等。</p>
            <p><b>如果你觉得某个模块有用，点一下“更多信息”按钮去支持一下吧！</b></p>
          </div>
        </div>
      ` : ''}

      <div class="store-modules">
        ${_getFilteredStoreModules(context).map(module => {
          const isInstalled = _isModuleInstalled(module.id);
          const isInstalledViaYaml = _isModuleInstalledViaYaml(module.id);
          const hasUpdate = _hasModuleUpdate(module.id, module.version);
          
          // Use supportedCards if available, otherwise use unsupportedCards for backward compatibility
          const cardType = context._config.card_type ?? "";
          let isCompatible = true;
          
          if (module.supportedCards && Array.isArray(module.supportedCards) && module.supportedCards.length > 0) {
            isCompatible = module.supportedCards.includes(cardType);
          } else {
            isCompatible = !module.unsupportedCards || !module.unsupportedCards.includes(cardType);
          }

          return html`
            <div class="store-module-card">
              <div class="store-module-header ${!isCompatible ? 'warning' : ''}">
                <div class="bubble-section-title">
                  <ha-icon icon="mdi:puzzle"></ha-icon>
                  <h3>${module.name}</h3>
                </div>

                <div class="store-module-meta">
                  <div class="store-module-author">
                    ${module.userAvatar ? html`
                      <img src="${module.userAvatar}" alt="${module.creator || '匿名'}" class="author-avatar">
                    ` : ''}
                    <span>来自 ${module.creator || '匿名'}</span>
                  </div>
                  <div class="version-container">
                    ${_isNewModule(module) ? html`<span class="bubble-badge new-badge"><ha-icon icon="mdi:bell-outline"></ha-icon> 新的</span>` : ''}
                    ${!isCompatible ? html`<span class="bubble-badge incompatible-badge">Incompatible</span>` : ''}
                    ${hasUpdate ? html`<span class="bubble-badge update-badge">Update available</span>` : ''}
                    ${isInstalledViaYaml ? html`<span class="bubble-badge yaml-badge">YAML</span>` : ''}
                    <span class="bubble-badge version-badge">${module.version || ''}</span>
                  </div>
                </div>

                <div class="store-module-badges bubble-badges">
                </div>
              </div>

              <div class="store-module-content">
                <div class="store-module-description">
                  ${module.description ? html`
                    <p class="module-description" .innerHTML=${_formatModuleDescription(module.description)}></p>
                  ` : html`
                    <p><em>没有描述</em></p>
                  `}
                  ${module.imageUrl ? html`
                    <div class="module-preview-container">
                      <img src="${module.imageUrl}" alt="${module.name}" class="module-preview-image">
                      <div class="module-preview-zoom-btn" @click=${(e) => { e.stopPropagation(); context._toggleImageZoom(module.imageUrl); }}>
                        <ha-icon icon="mdi:magnify"></ha-icon>
                      </div>
                    </div>
                  ` : ''}
                </div>

                <div class="store-module-actions bubble-badges">
                  ${isInstalled
                    ? html`
                      ${hasUpdate 
                        ? html`
                          ${_requiresManualInstallation(module)
                            ? html`
                              <a 
                                href="${module.moduleLink}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="bubble-badge update-button hoverable"
                                style="cursor: pointer;"
                              >
                                <ha-icon icon="mdi:arrow-up-circle-outline"></ha-icon>
                                <span>Update (Manual install)</span>
                              </a>
                            `
                            : html`
                              <div 
                                @click=${() => installOrUpdateModule(context, module)}
                                class="bubble-badge update-button hoverable"
                                style="cursor: pointer;"
                              >
                                <ha-icon icon="mdi:arrow-up-circle-outline"></ha-icon>
                                <span>Update</span>
                              </div>
                            `
                          }
                        ` 
                        : html`
                          <div class="bubble-badge installed-button">
                            <ha-icon icon="mdi:check"></ha-icon>
                            <span>${isInstalledViaYaml ? 'Installed via YAML' : 'Installed'}</span>
                          </div>
                        `
                      }
                    ` 
                    : html`
                      ${_requiresManualInstallation(module)
                        ? html`
                          <a
                            href="${module.moduleLink}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="bubble-badge install-button hoverable"
                            style="cursor: pointer;"
                          >
                            <ha-icon icon="mdi:github"></ha-icon>
                            <span>手动安装</span>
                          </a>
                        `
                        : html`
                          <div
                            @click=${() => installOrUpdateModule(context, module)}
                            class="bubble-badge install-button hoverable"
                            style="cursor: pointer;"
                          >
                            <ha-icon icon="mdi:download"></ha-icon>
                            <span>安装</span>
                          </div>
                        `
                      }
                    `}
                  <a
                    href="${module.moduleLink}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bubble-badge link-button"
                  >
                    <ha-icon icon="mdi:github"></ha-icon>
                    更多信息/反馈
                  </a>
                </div>
              </div>
            </div>
          `;
        })}
      </div>

      ${_getFilteredStoreModules(context).length === 0 ? html`
        <div class="bubble-info">
          <h4 class="bubble-section-title">
            <ha-icon icon="mdi:information-outline"></ha-icon>
            找不到模块
          </h4>
          <div class="content">
            <p>没有符合搜索条件的模块，请尝试修改你的搜索内容或筛选条件。</p>
          </div>
        </div>
      ` : ''}
      
      <div class="back-to-top-button" @click=${() => scrollToModuleForm(context)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon>
      </div>
    </div>

    ${context._zoomedImage ? html`
      <div class="module-preview-fullscreen" @click=${() => context._toggleImageZoom(null)}>
        <img src="${context._zoomedImage}" alt="Fullscreen preview">
      </div>
    ` : ''}
  `;
}

function _getFilteredStoreModules(context) {
  if (!context._storeModules) return [];

  let filteredModules = [...context._storeModules];
  
  // Blacklist with reasons (hidden unless already installed, can still be installed manually)
  // The main reason is modules that compete too much with my Patreon modules, as I need this financial support to maintain the project.
  const storeBlacklist = new Map([
    ['smart_icons'], // Competes with "Conditional icon badges" from my Patreon, and covers the same features (even if it is more advanced), sorry!
  ]);
  
  // Apply blacklist
  filteredModules = filteredModules.filter(module => {
    const id = module && module.id;
    if (!id) return true;
    if (!storeBlacklist.has(id)) return true;
    return _isModuleInstalled(id);
  });

  // Filter by search
  if (context._storeSearchQuery) {
    const query = context._storeSearchQuery.toLowerCase();
    filteredModules = filteredModules.filter(module =>
      (module.name && module.name.toLowerCase().includes(query)) ||
      (module.description && module.description.toLowerCase().includes(query)) ||
      (module.creator && module.creator.toLowerCase().includes(query)) ||
      (module.type && module.type.toLowerCase().includes(query))
    );
  }

  // Filter by compatibility
  if (context._storeShowOnlyCompatible) {
    const cardType = context._config.card_type ?? "";
    
    filteredModules = filteredModules.filter(module => {
      // First check if the module has supported cards
      if (module.supportedCards && Array.isArray(module.supportedCards)) {
        return module.supportedCards.includes(cardType);
      }
      // Backward compatibility - if the module still uses unsupportedCards
      const isCompatible = !module.unsupportedCards || !module.unsupportedCards.includes(cardType);
      return isCompatible;
    });
  }

  // Filter by module type if selected
  if (context._storeSelectedType && context._storeSelectedType !== 'all') {
    filteredModules = filteredModules.filter(module =>
      module.type && module.type.toLowerCase() === context._storeSelectedType.toLowerCase()
    );
  }

  // Sort modules using the sorting function
  filteredModules = sortModulesByRelevance(filteredModules);

  return filteredModules;
}

function sortModulesByRelevance(modules) {
  if (!modules || !Array.isArray(modules)) return [];
  
  // Calculate a score for each module
  const modulesWithScore = modules.map(module => {
    // Initialize base score
    let score = 0;
    
    // Track if module has any popularity or freshness
    let hasPopularity = false;
    let hasFreshness = false;
    
    // Popularity factors
    
    // 1. Number of comments (discussion engagement)
    if (module.comments) {
      score += Math.min(module.comments, 8); // Max 8 points from comments (8 comments)
      hasPopularity = true;
    }
    
    // 2. Reactions (hearts, +1, etc.)
    if (module.reactions?.total_count) {
      score += module.reactions.total_count * 5; // 5 points per reaction
      hasPopularity = true;
    }
    
    // Specifically value heart reactions more
    if (module.reactions?.heart) {
      score += module.reactions.total_count * 10; // 10 points per heart
      hasPopularity = true;
    }
    
    // Freshness factors
    
    // 3. Creation date (newer modules get more points)
    if (module.createdAt) {
      const creationDate = new Date(module.createdAt);
      const now = new Date();
      const ageInDays = (now - creationDate) / (1000 * 60 * 60 * 24);
      
      // Newer modules get more points (max 30 points for modules created in the last 7 days)
      if (ageInDays <= 7) {
        score += 30;
        hasFreshness = true;
      } else if (ageInDays <= 30) {
        score += 15;
        hasFreshness = true;
      } else if (ageInDays <= 90) {
        score += 5;
      }
    }
    
    // 4. Update date (recently updated modules get more points)
    if (module.updated_at) {
      const updateDate = new Date(module.updated_at);
      const now = new Date();
      const lastUpdateInDays = (now - updateDate) / (1000 * 60 * 60 * 24);
      
      // Recently updated modules get more points (max 25 points for updates in the last 7 days)
      if (lastUpdateInDays <= 7) {
        score += 25;
        hasFreshness = true;
      } else if (lastUpdateInDays <= 30) {
        score += 15;
        hasFreshness = true;
      } else if (lastUpdateInDays <= 90) {
        score += 8;
      }
    }
    
    // Penalty for modules that have neither popularity nor freshness
    if (!hasPopularity && !hasFreshness) {
      score -= 30; // Apply a significant penalty
    }
    
    // Bonus for modules that have both popularity and freshness
    if (hasPopularity && hasFreshness) {
      score += 20; // Bonus for modules that are both popular and fresh
    }

    // Bonus for modules created by great contributors
    if (module.creator === 'Clooos') {
      score += 40; // Well deserved
    }

    // Make sure new modules always appear at the top regardless of other factors
    const isNew = _isNewModule(module);
    if (isNew) {
      score += 150; // Ensure new modules always bubble to the top
    }
    
    return { ...module, relevanceScore: score };
  });
  
  // Sort by score, higher scores first
  return modulesWithScore.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

function _isNewModule(module) {
  if (!module.createdAt) return false;
  
  const creationDate = new Date(module.createdAt);
  const now = new Date();
  const ageInDays = (now - creationDate) / (1000 * 60 * 60 * 24);
  
  // Consider modules created within the last 14 days as new
  return ageInDays <= 14;
}

function _isModuleInstalled(moduleId) {
  // Check if the module is installed by looking in yamlKeysMap
  return yamlKeysMap.has(moduleId);
}

// Exported for use in other modules
export function _isModuleInstalledViaYaml(moduleId) {
  // Check if the module is installed
  if (!_isModuleInstalled(moduleId)) return false;
  
  // Check first with moduleSourceMap if the module comes from the YAML file
  if (moduleSourceMap.has(moduleId)) {
    return moduleSourceMap.get(moduleId) === 'yaml';
  }
  
  // Fallback to the old method (check if it's not in localStorage)
  try {
    const storedModules = JSON.parse(localStorage.getItem('bubble-card-modules') || '{}');
    return !storedModules[moduleId]; // Return true if NOT in localStorage (meaning it was installed via yaml)
  } catch (error) {
    console.warn("检查模块安装来源时出错：", error);
    return false;
  }
}

/**
 * Check if any installed modules have updates available
 * @returns {Object} Object containing information about updates
 */
export function checkModuleUpdates() {
  // Get all installed modules
  const installedModules = Array.from(yamlKeysMap.keys());
  const updates = [];
  let updateCount = 0;
  
  // Get modules from store cache
  const cachedData = getCachedModuleData();
  if (!cachedData || !cachedData.modules || !cachedData.modules.length) {
    return { hasUpdates: false, updateCount: 0, modules: [] };
  }
  
  // Check each installed module
  installedModules.forEach(moduleId => {
    // Find module in store
    const storeModule = cachedData.modules.find(m => m.id === moduleId);
    if (storeModule && _hasModuleUpdate(moduleId, storeModule.version)) {
      updateCount++;
      updates.push({
        id: moduleId,
        name: storeModule.name || yamlKeysMap.get(moduleId).name || moduleId,
        currentVersion: yamlKeysMap.get(moduleId).version || '0',
        newVersion: storeModule.version
      });
    }
  });
  
  return {
    hasUpdates: updateCount > 0,
    updateCount,
    modules: updates
  };
}

function _hasModuleUpdate(moduleId, storeVersion) {
  if (!_isModuleInstalled(moduleId) || !storeVersion) return false;

  const installedModule = yamlKeysMap.get(moduleId) || {};
  const installedVersion = installedModule.version || '0';

  // Compare versions
  return _compareVersions(storeVersion, installedVersion) > 0;
}

// Detect if a module has incompatible YAML that requires manual installation
function _requiresManualInstallation(module) {
  if (!module || !module.yamlContent) return true; // If no YAML, manual installation required
  
  const yamlContent = module.yamlContent.trim();
  if (!yamlContent) return true;
  
  try {
    // Try to parse the YAML
    const parsedYaml = jsyaml.load(yamlContent);
    
    if (!parsedYaml || typeof parsedYaml !== 'object') {
      return true; // Invalid YAML
    }
    
    const keys = Object.keys(parsedYaml);
    
    // If the YAML contains multiple modules at the root
    if (keys.length > 1) {
      let moduleCount = 0;
      for (const key of keys) {
        const obj = parsedYaml[key];
        if (obj && typeof obj === 'object' && (obj.name || obj.code)) {
          moduleCount++;
        }
      }
      
      if (moduleCount > 1) {
        return true; // Multiple modules in the same YAML
      }
    }
    
    // Checking for nested modules
    if (keys.length === 1) {
      const mainKey = keys[0];
      const mainObj = parsedYaml[mainKey];
      
      if (mainObj && typeof mainObj === 'object') {
        // Check if the main object has a module structure and contains other modules
        const nestedKeys = Object.keys(mainObj);
        
        let nestedModuleCount = 0;
        for (const key of nestedKeys) {
          const obj = mainObj[key];
          if (obj && typeof obj === 'object' && (obj.name || obj.code)) {
            nestedModuleCount++;
          }
        }
        
        if (nestedModuleCount > 1) {
          return true; // Multiple nested modules
        }
      }
    }
    
    // Check if the YAML is incomplete or doesn't contain required attributes
    if (keys.length === 1) {
      const mainKey = keys[0];
      const mainObj = parsedYaml[mainKey];
      
      if (!mainObj || typeof mainObj !== 'object') {
        return true;
      }
      
      // A valid module must have at least a name and code
      if (!mainObj.name || !mainObj.code) {
        return true;
      }
    }
  } catch (error) {
    console.warn("检查模块YAML兼容性时出错：", error);
    return true; // If we can't parse the YAML, manual installation required
  }
  
  return false;
}

export async function _fetchModuleStore(context, isBackgroundFetch = false) {
  // Check if an API call is already in progress
  if (context._isApiCallInProgress) {
    return;
  }

  // Force reset any previous API call in progress state
  context._isApiCallInProgress = true;

  // Determine if this is a manual refresh (direct click on refresh button)
  const isManualRefresh = !isBackgroundFetch && context._storeModules !== undefined;

  // First, check GitHub API rate limit status
  let useCache = false;
  
  if (!isBackgroundFetch) {
    context._isLoadingStore = true;
    context._storeError = null;
    context._loadingProgress = 5;
    context._loadingStatus = "正在检查API限制";
    context.requestUpdate();
    
    // Start progress animation
    let progressInterval = setInterval(() => {
      if (!context._isLoadingStore) {
        clearInterval(progressInterval);
        return;
      }
      
      // Increment at a slower rate as we get closer to 85%
      const currentProgress = context._loadingProgress || 0;
      let increment = 0;
      
      if (currentProgress < 40) {
        increment = Math.random() * 2.5;
      } else if (currentProgress < 60) {
        increment = Math.random() * 1.5;
      } else if (currentProgress < 75) {
        increment = Math.random() * 0.8;
      } else if (currentProgress < 90) {
        increment = Math.random() * 0.3;
      }
      
      if (currentProgress < 90) {
        context._loadingProgress = currentProgress + increment;
        context.requestUpdate();
      }
    }, 200);
    
    // Store interval reference to clear later
    context._progressInterval = progressInterval;
  }

  try {
    // Skip rate limit check for manual refreshes if user explicitly clicked refresh
    if (!isManualRefresh) {
      const rateResponse = await fetch('https://api.github.com/rate_limit', {
        method: "GET",
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (!isBackgroundFetch) {
        context._loadingStatus = "正在解析API相应";
        context._loadingProgress = Math.min(context._loadingProgress + 5, 30);
        context.requestUpdate();
      }

      if (rateResponse.ok) {
        const rateData = await rateResponse.json();
        const remaining = rateData.resources.core.remaining;
        
        // Only use cache if we're actually out of API calls
        if (remaining <= 1) { // Keep 1 call as buffer
          console.warn("⚠️以达到API限制，改为使用缓存");
          useCache = true;
        }
      } else {
        // If we can't check rate limit, fall back to cooldown logic
        useCache = true;
        console.warn("⚠️无法检查API速率限制，回退冷却机制");
      }
    }

    // Update loading status
    if (!isBackgroundFetch) {
      context._loadingStatus = "正在处理API数据";
      context._loadingProgress = Math.min(context._loadingProgress + 5, 40);
      context.requestUpdate();
    }

    // When rate-limited or rate status unknown, prefer using cache and skip network
    if (useCache && !isManualRefresh) {
      const lastApiFailure = localStorage.getItem('bubble-card-api-failure-timestamp');
      if (lastApiFailure) {
        const failureTime = parseInt(lastApiFailure);
        const cooldownPeriod = 30 * 60 * 1000; // 30 minutes
        
        if (Date.now() - failureTime < cooldownPeriod) {
          // Use cache if available
          const { getCachedModuleData } = await import('./cache.js');
          const cachedData = getCachedModuleData();
          if (cachedData && !context._storeModules) {
            context._storeModules = cachedData.modules;
            context._isLoadingStore = false;
            context.requestUpdate();
          }
          
          // Update loading status for using cache
          if (!isBackgroundFetch) {
            context._loadingStatus = "正在从缓存中加载";
            context._loadingProgress = 60;
            context.requestUpdate();
          }
          
          return;
        } else {
          // Cooldown finished, we can retry next time
          localStorage.removeItem('bubble-card-api-failure-timestamp');
        }
      }

      // Use cache due to rate limit or unknown status and exit early
      const { getCachedModuleData } = await import('./cache.js');
      const cachedData = getCachedModuleData();
      if (cachedData && !context._storeModules) {
        context._storeModules = cachedData.modules;
        context._isLoadingStore = false;
        context.requestUpdate();
      }
      
      if (!isBackgroundFetch) {
        context._loadingStatus = "正在从缓存中加载";
        context._loadingProgress = 60;
        context.requestUpdate();
      }
      
      return;
    }

    // Retrieve all discussions with pagination
    let allDiscussions = [];
    let page = 1;
    let hasMorePages = true;

    if (!isBackgroundFetch) {
      context._loadingStatus = "正在下载模块数据";
      context._loadingProgress = 50;
      context.requestUpdate();
    }

    while (hasMorePages) {
      const restResponse = await fetch(`https://api.github.com/repos/Clooos/Bubble-Card/discussions?per_page=100&page=${page}`, {
        method: "GET",
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (!isBackgroundFetch) {
        context._loadingStatus = `正在处理页面 ${page}`;
        // Gradually increase progress as pages load
        context._loadingProgress = Math.min(50 + (page * 5), 80);
        context.requestUpdate();
      }

      if (!restResponse.ok) {
        console.error("❌ REST API 错误:", restResponse.status, restResponse.statusText);
        
        // Save failure timestamp for cooldown
        localStorage.setItem('bubble-card-api-failure-timestamp', Date.now().toString());
        
        throw new Error(`REST API 错误: ${restResponse.status}`);
      }

      const discussionsData = await restResponse.json();

      if (discussionsData.length === 0) {
        hasMorePages = false;
      } else {
        allDiscussions = [...allDiscussions, ...discussionsData];
        page++;
      }

      // Check remaining API limit
      const remainingRequests = restResponse.headers.get('x-ratelimit-remaining');

      // If approaching API limit, stop pagination but don't trigger cooldown
      if (remainingRequests <= 5) {
        console.warn("⚠️即将到达API限制，停止分页");
        hasMorePages = false;
      }
    }


    // Update loading status
    if (!isBackgroundFetch) {
      context._loadingStatus = "正在筛选模块";
      context._loadingProgress = 85;
      context.requestUpdate();
    }

    // Filter discussions to keep only those in the "分享你的模块" category
    const moduleDiscussions = allDiscussions.filter(discussion => {
      const categoryName = discussion.category?.name;
      // Check for exact category match
      return categoryName === "分享你的模块";
    });


    // Parse discussions to extract module information
    const parsedModules = parseDiscussionsREST(moduleDiscussions);

    // Update loading status
    if (!isBackgroundFetch) {
      context._loadingStatus = "正在保存缓存";
      context._loadingProgress = 95;
      context.requestUpdate();
    }

    // Save to cache
    const { saveCachedModuleData } = await import('./cache.js');
    saveCachedModuleData(parsedModules);

    // Make sure we reach 100% at the end
    if (!isBackgroundFetch) {
      // Short pause to show progress at 95% before reaching 100%
      await new Promise(resolve => setTimeout(resolve, 300));
      context._loadingProgress = 100;
      context._loadingStatus = "完成";
      context.requestUpdate();
    }

    // Update displayed data
    if (!isBackgroundFetch || !context._storeModules) {
      context._storeModules = parsedModules;
      context._isLoadingStore = false;
      
      // Clear interval if it exists
      if (context._progressInterval) {
        clearInterval(context._progressInterval);
        context._progressInterval = null;
      }
      
      context.requestUpdate();
    }

    // For background fetches, also refresh UI to reflect new data
    if (isBackgroundFetch && context._storeModules) {
      context._storeModules = parsedModules;
      context.requestUpdate();
    }
  } catch (error) {
    console.error("加载模块时遇到错误：", error);

    // In case of error, use cached data if available
    if (!isBackgroundFetch) {
      context._loadingStatus = "从缓存中加载模块时出错";
      context._loadingProgress = 85;
      context.requestUpdate();
      
      const { getCachedModuleData } = await import('./cache.js');
      const cachedData = getCachedModuleData();
      if (cachedData) {
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        context._storeModules = cachedData.modules;
        context._isLoadingStore = false;
        context._loadingProgress = 100;
        context._loadingStatus = "缓存加载完毕";
        context.requestUpdate();
      } else {
        context._storeError = error.message;
        context._isLoadingStore = false;
        context.requestUpdate();
      }
      
      // Clear interval if it exists
      if (context._progressInterval) {
        clearInterval(context._progressInterval);
        context._progressInterval = null;
      }
    }
  } finally {
    // Always reset API call in progress, even if there's an error
    context._isApiCallInProgress = false;
    if (!isBackgroundFetch) {
      context.requestUpdate();
    }
  }
}