// Get cached module data from localStorage
export function getCachedModuleData() {
  try {
    const cachedDataString = localStorage.getItem('bubble-card-module-store');
    if (!cachedDataString) return null;

    const cachedData = JSON.parse(cachedDataString);

    // Check if we are in API cooldown period due to API failure
    const apiFailure = localStorage.getItem('bubble-card-api-failure-timestamp');
    
    // If the API is in cooldown period after a failure and the cache is expired but still present, 
    // temporarily extend the validity of the cache
    if (apiFailure && cachedData && cachedData.expiration < Date.now()) {
      console.log("🛡️ API在失败后进入冷却期且缓存已过期，临时延长有效期");
      // Extend the validity of the cache by 2 hours
      const extendedExpiration = Date.now() + 7200000; // 2 hours
      cachedData.expiration = extendedExpiration;
      
      // Save the extension
      localStorage.setItem('bubble-card-module-store', JSON.stringify(cachedData));
      console.log("⏳ 缓存延长至", new Date(extendedExpiration));
      
      return cachedData;
    }
    
    // Check if data is still valid (expiration after 1 day)
    if (cachedData && cachedData.expiration > Date.now()) {
      return cachedData;
    }

    // Data expired, but keep it available in case API checks show no remaining quota
    if (cachedData) {
      console.log("⚠️ 缓存已过期，但会保留以应对可能的API限制情况");
      return cachedData;
    }

    return null;
  } catch (e) {
    console.error("读取缓存时出错：", e);
    return null;
  }
}

// Save module data to the localStorage cache with modules array parameter
export function saveCachedModuleData(modules) {
  if (!modules || Object.keys(modules).length === 0) return;

  try {
    // Save to local storage with expiration (24 hours)
    const expiration = Date.now() + 86400000; // 24 hours
    localStorage.setItem('bubble-card-module-store', JSON.stringify({
      modules,
      expiration,
      // Store when the cache was last refreshed to support SWR checks
      lastFetchedAt: Date.now()
    }));
    console.log("模块数据缓存至", new Date(expiration));
  } catch (e) {
    console.error("保存缓存时出错：", e);
  }
}

// Display a toast notification
export function fireToast(context, message, severity = "info") {
  if (context.hass) {
    const event = new CustomEvent("hass-notification", {
      detail: { message, severity },
      bubbles: true,
      composed: true
    });
    context.dispatchEvent(event);
  } else {
    console.log(`[${severity}] ${message}`);
  }
} 