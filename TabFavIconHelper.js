/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
/*
 original:
   http://github.com/piroor/webextensions-lib-tab-favicon-helper
*/
'use strict';

const TabFavIconHelper = {
  LAST_EFFECTIVE_FAVICON: 'last-effective-favIcon',
  VALID_FAVICON_PATTERN: /^(about|app|chrome|data|file|ftp|https?|moz-extension|resource):/,
  DRAWABLE_FAVICON_PATTERN: /^(https?|moz-extension|resource):/,

  // original: chrome://mozapps/skin/extensions/extensionGeneric-16.svg
  FAVICON_EXTENSION: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="context-fill" fill-opacity="context-fill-opacity">
  <path d="M14.5 8c-.971 0-1 1-1.75 1a.765.765 0 0 1-.75-.75V5a1 1 0 0 0-1-1H7.75A.765.765 0 0 1 7 3.25c0-.75 1-.779 1-1.75C8 .635 7.1 0 6 0S4 .635 4 1.5c0 .971 1 1 1 1.75a.765.765 0 0 1-.75.75H1a1 1 0 0 0-1 1v2.25A.765.765 0 0 0 .75 8c.75 0 .779-1 1.75-1C3.365 7 4 7.9 4 9s-.635 2-1.5 2c-.971 0-1-1-1.75-1a.765.765 0 0 0-.75.75V15a1 1 0 0 0 1 1h3.25a.765.765 0 0 0 .75-.75c0-.75-1-.779-1-1.75 0-.865.9-1.5 2-1.5s2 .635 2 1.5c0 .971-1 1-1 1.75a.765.765 0 0 0 .75.75H11a1 1 0 0 0 1-1v-3.25a.765.765 0 0 1 .75-.75c.75 0 .779 1 1.75 1 .865 0 1.5-.9 1.5-2s-.635-2-1.5-2z"/>
</svg>
`,
  // original: globe-16.svg
  FAVICON_GLOBE: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path fill="context-fill" d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8zm5.163 4.958h-1.552a7.7 7.7 0 0 0-1.051-2.376 6.03 6.03 0 0 1 2.603 2.376zM14 8a5.963 5.963 0 0 1-.335 1.958h-1.821A12.327 12.327 0 0 0 12 8a12.327 12.327 0 0 0-.156-1.958h1.821A5.963 5.963 0 0 1 14 8zm-6 6c-1.075 0-2.037-1.2-2.567-2.958h5.135C10.037 12.8 9.075 14 8 14zM5.174 9.958a11.084 11.084 0 0 1 0-3.916h5.651A11.114 11.114 0 0 1 11 8a11.114 11.114 0 0 1-.174 1.958zM2 8a5.963 5.963 0 0 1 .335-1.958h1.821a12.361 12.361 0 0 0 0 3.916H2.335A5.963 5.963 0 0 1 2 8zm6-6c1.075 0 2.037 1.2 2.567 2.958H5.433C5.963 3.2 6.925 2 8 2zm-2.56.582a7.7 7.7 0 0 0-1.051 2.376H2.837A6.03 6.03 0 0 1 5.44 2.582zm-2.6 8.46h1.549a7.7 7.7 0 0 0 1.051 2.376 6.03 6.03 0 0 1-2.603-2.376zm7.723 2.376a7.7 7.7 0 0 0 1.051-2.376h1.552a6.03 6.03 0 0 1-2.606 2.376z"/>
</svg>
`,
  // original: chrome://browser/skin/privatebrowsing/favicon.svg
  FAVICON_PRIVATE_BROWSING: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8" fill="#8d20ae"/>
  <circle cx="8" cy="8" r="7.5" stroke="#7b149a" stroke-width="1" fill="none"/>
  <path d="M11.309,10.995C10.061,10.995,9.2,9.5,8,9.5s-2.135,1.5-3.309,1.5c-1.541,0-2.678-1.455-2.7-3.948C1.983,5.5,2.446,5.005,4.446,5.005S7.031,5.822,8,5.822s1.555-.817,3.555-0.817S14.017,5.5,14.006,7.047C13.987,9.54,12.85,10.995,11.309,10.995ZM5.426,6.911a1.739,1.739,0,0,0-1.716.953A2.049,2.049,0,0,0,5.3,8.544c0.788,0,1.716-.288,1.716-0.544A1.428,1.428,0,0,0,5.426,6.911Zm5.148,0A1.429,1.429,0,0,0,8.981,8c0,0.257.928,0.544,1.716,0.544a2.049,2.049,0,0,0,1.593-.681A1.739,1.739,0,0,0,10.574,6.911Z" stroke="#670c83" stroke-width="2" fill="none"/>
  <path d="M11.309,10.995C10.061,10.995,9.2,9.5,8,9.5s-2.135,1.5-3.309,1.5c-1.541,0-2.678-1.455-2.7-3.948C1.983,5.5,2.446,5.005,4.446,5.005S7.031,5.822,8,5.822s1.555-.817,3.555-0.817S14.017,5.5,14.006,7.047C13.987,9.54,12.85,10.995,11.309,10.995ZM5.426,6.911a1.739,1.739,0,0,0-1.716.953A2.049,2.049,0,0,0,5.3,8.544c0.788,0,1.716-.288,1.716-0.544A1.428,1.428,0,0,0,5.426,6.911Zm5.148,0A1.429,1.429,0,0,0,8.981,8c0,0.257.928,0.544,1.716,0.544a2.049,2.049,0,0,0,1.593-.681A1.739,1.739,0,0,0,10.574,6.911Z" fill="#fff"/>
</svg>
`,
  // original: chrome://browser/skin/settings.svg
  FAVICON_SETTINGS: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path fill="context-fill" fill-opacity="context-fill-opacity" d="M15 7h-2.1a4.967 4.967 0 0 0-.732-1.753l1.49-1.49a1 1 0 0 0-1.414-1.414l-1.49 1.49A4.968 4.968 0 0 0 9 3.1V1a1 1 0 0 0-2 0v2.1a4.968 4.968 0 0 0-1.753.732l-1.49-1.49a1 1 0 0 0-1.414 1.415l1.49 1.49A4.967 4.967 0 0 0 3.1 7H1a1 1 0 0 0 0 2h2.1a4.968 4.968 0 0 0 .737 1.763c-.014.013-.032.017-.045.03l-1.45 1.45a1 1 0 1 0 1.414 1.414l1.45-1.45c.013-.013.018-.031.03-.045A4.968 4.968 0 0 0 7 12.9V15a1 1 0 0 0 2 0v-2.1a4.968 4.968 0 0 0 1.753-.732l1.49 1.49a1 1 0 0 0 1.414-1.414l-1.49-1.49A4.967 4.967 0 0 0 12.9 9H15a1 1 0 0 0 0-2zM5 8a3 3 0 1 1 3 3 3 3 0 0 1-3-3z"/>
</svg>
`,
  // original: chrome://global/skin/icons/performance.svg
  FAVICON_PERFORMANCE: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <path fill="context-fill" d="M8 1a8 8 0 0 0-8 8 7.89 7.89 0 0 0 .78 3.43 1 1 0 0 0 .9.57.94.94 0 0 0 .43-.1 1 1 0 0 0 .47-1.33A6.07 6.07 0 0 1 2 9a6 6 0 0 1 12 0 5.93 5.93 0 0 1-.59 2.57 1 1 0 0 0 1.81.86A7.89 7.89 0 0 0 16 9a8 8 0 0 0-8-8z"/>
  <path fill="context-fill" d="M11.77 7.08a.5.5 0 0 0-.69.15L8.62 11.1A2.12 2.12 0 0 0 8 11a2 2 0 0 0 0 4 2.05 2.05 0 0 0 1.12-.34 2.31 2.31 0 0 0 .54-.54 2 2 0 0 0 0-2.24 2.31 2.31 0 0 0-.2-.24l2.46-3.87a.5.5 0 0 0-.15-.69z"/>
</svg>
`,
  // original: chrome://browser/skin/window.svg
  FAVICON_WINDOW: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path fill="context-fill" fill-opacity="context-fill-opacity" d="M13 1H3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h11a2 2 0 0 0 2-2V4a3 3 0 0 0-3-3zm1 11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6h12zm0-7H2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z"/>
</svg>
`,
  // original: chrome://browser/skin/developer.svg
  FAVICON_DEVELOPER: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path fill="context-fill" fill-opacity="context-fill-opacity" d="M14.555 3.2l-2.434 2.436a1.243 1.243 0 1 1-1.757-1.757L12.8 1.445A3.956 3.956 0 0 0 11 1a3.976 3.976 0 0 0-3.434 6.02l-6.273 6.273a1 1 0 1 0 1.414 1.414L8.98 8.434A3.96 3.96 0 0 0 11 9a4 4 0 0 0 4-4 3.956 3.956 0 0 0-.445-1.8z"/>
</svg>

`,

  recentEffectiveFavIcons: [],
  recentUneffectiveFavIcons: [],
  maxRecentEffectiveFavIcons: 30,
  effectiveFavIcons: new Map(),
  uneffectiveFavIcons: new Map(),
  tasks: [],
  processStep: 5,
  FAVICON_SIZE: 16,

  init() {
    this.onTabCreated = this.onTabCreated.bind(this);
    browser.tabs.onCreated.addListener(this.onTabCreated);

    this.onTabUpdated = this.onTabUpdated.bind(this);
    browser.tabs.onUpdated.addListener(this.onTabUpdated);

    this.onTabRemoved = this.onTabRemoved.bind(this);
    browser.tabs.onRemoved.addListener(this.onTabRemoved);

    this.onTabDetached = this.onTabDetached.bind(this);
    browser.tabs.onDetached.addListener(this.onTabDetached);

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = this.FAVICON_SIZE;
    this.canvas.setAttribute('style', `
      visibility: hidden;
      pointer-events: none;
      position: fixed
    `);
    document.body.appendChild(this.canvas);

    window.addEventListener('unload', () => {
      browser.tabs.onCreated.removeListener(this.onTabCreated);
      browser.tabs.onUpdated.removeListener(this.onTabUpdated);
      browser.tabs.onRemoved.removeListener(this.onTabRemoved);
      browser.tabs.onDetached.removeListener(this.onTabDetached);
    }, { once: true });
  },

  sessionAPIAvailable: (
    browser.sessions &&
    browser.sessions.getTabValue &&
    browser.sessions.setTabValue &&
    browser.sessions.removeTabValue
  ),

  addTask(task) {
    this.tasks.push(task);
    this.run();
  },

  run() {
    if (this.running)
      return;
    this.running = true;
    const processOneTask = () => {
      if (this.tasks.length == 0) {
        this.running = false;
      }
      else {
        const tasks = this.tasks.splice(0, this.processStep);
        while (tasks.length > 0) {
          tasks.shift()();
        }
        window.requestAnimationFrame(processOneTask);
      }
    };
    processOneTask();
  },

  loadToImage(params = {}) {
    this.addTask(() => {
      this.getEffectiveURL(params.tab, params.url)
        .then(url => {
          params.image.src = url;
          params.image.classList.remove('error');
        },
              _aError => {
                params.image.src = '';
                params.image.classList.add('error');
              });
    });
  },

  maybeImageTab(_tab) { // for backward compatibility
    return false;
  },

  getSafeFaviconUrl(url) {
    switch (url) {
      case 'chrome://browser/skin/settings.svg':
        return this.getSVGDataURI(this.FAVICON_SETTINGS);
      case 'chrome://mozapps/skin/extensions/extensionGeneric-16.svg':
        return this.getSVGDataURI(this.FAVICON_EXTENSION);
      case 'chrome://global/skin/icons/performance.svg':
        return this.getSVGDataURI(this.FAVICON_PERFORMANCE);
      case 'chrome://browser/skin/developer.svg':
        return this.getSVGDataURI(this.FAVICON_DEVELOPER);
      case 'chrome://browser/skin/window.svg':
        return this.getSVGDataURI(this.FAVICON_WINDOW);
      case 'chrome://browser/skin/privatebrowsing/favicon.svg':
        return this.getSVGDataURI(this.FAVICON_PRIVATE_BROWSING);
      default:
        if (/^chrome:\/\//.test(url) &&
            !/^chrome:\/\/branding\//.test(url))
          return this.getSVGDataURI(this.FAVICON_GLOBE);
        break;
    }
    return url;
  },
  getSVGDataURI(svg) {
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  },

  async getLastEffectiveFavIconURL(tab) {
    let lastData = this.effectiveFavIcons.get(tab.id);
    if (lastData === undefined && this.sessionAPIAvailable) {
      lastData = await browser.sessions.getTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON);
      this.effectiveFavIcons.set(tab.id, lastData || null);   // NOTE: null is valid cache entry here
    }
    if (lastData &&
        lastData.url == tab.url)
      return lastData.favIconUrl;
    return null;
  },

  getEffectiveURL(tab, url = null) {
    return new Promise(async (aResolve, aReject) => {
      url = this.getSafeFaviconUrl(url || tab.favIconUrl);
      if (!url && tab.discarded) {
        // discarded tab doesn't have favIconUrl, so we should use cached data.
        let lastData = this.effectiveFavIcons.get(tab.id);
        if (!lastData &&
            this.sessionAPIAvailable)
          lastData = await browser.sessions.getTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON);
        if (lastData &&
            lastData.url == tab.url)
          url = lastData.favIconUrl;
      }

      let loader, onLoad, onError;
      const clear = (() => {
        if (loader) {
          loader.removeEventListener('load', onLoad, { once: true });
          loader.removeEventListener('error', onError, { once: true });
        }
        loader = onLoad = onError = undefined;
      });

      onLoad = ((cache) => {
        const uneffectiveIndex = this.recentUneffectiveFavIcons.indexOf(url);
        if (uneffectiveIndex > -1)
          this.recentUneffectiveFavIcons.splice(uneffectiveIndex, 1);
        const effectiveIndex = this.recentEffectiveFavIcons.findIndex(item => item && item.url === url);
        if (effectiveIndex > -1) {
          this.recentEffectiveFavIcons.splice(effectiveIndex, 1);
        }
        else {
          let data = null;
          if (this.DRAWABLE_FAVICON_PATTERN.test(url)) {
            const context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.FAVICON_SIZE, this.FAVICON_SIZE);
            context.drawImage(loader, 0, 0, this.FAVICON_SIZE, this.FAVICON_SIZE);
            try {
              data = this.canvas.toDataURL('image/png');
            }
            catch(_e) {
              // it can fail due to security reasons
            }
          }
          cache = {
            url,
            data
          };
        }
        this.recentEffectiveFavIcons.push(cache);
        this.recentEffectiveFavIcons = this.recentEffectiveFavIcons.slice(-this.maxRecentEffectiveFavIcons);

        const oldData = this.effectiveFavIcons.get(tab.id);
        if (!oldData ||
            oldData.url != tab.url ||
            oldData.favIconUrl != url) {
          const lastEffectiveFavicon = {
            url:        tab.url,
            favIconUrl: url
          };
          this.effectiveFavIcons.set(tab.id, lastEffectiveFavicon);
          if (this.sessionAPIAvailable)
            browser.sessions.setTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON, lastEffectiveFavicon);
        }
        this.uneffectiveFavIcons.delete(tab.id);
        aResolve(cache && cache.data || url);
        clear();
      });
      onError = (async (aError) => {
        const effectiveIndex = this.recentEffectiveFavIcons.findIndex(item => item && item.url === url);
        if (effectiveIndex > -1)
          this.recentEffectiveFavIcons.splice(effectiveIndex, 1);
        const uneffectiveIndex = this.recentUneffectiveFavIcons.indexOf(url);
        if (uneffectiveIndex > -1)
          this.recentUneffectiveFavIcons.splice(uneffectiveIndex, 1);
        this.recentUneffectiveFavIcons.push(url);
        this.recentUneffectiveFavIcons = this.recentUneffectiveFavIcons.slice(-this.maxRecentEffectiveFavIcons);

        clear();
        const effectiveFaviconData = this.effectiveFavIcons.get(tab.id) ||
                                   (this.sessionAPIAvailable &&
                                    await browser.sessions.getTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON));
        this.effectiveFavIcons.delete(tab.id);
        if (this.sessionAPIAvailable)
          browser.sessions.removeTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON);
        if (!this.uneffectiveFavIcons.has(tab.id) &&
            effectiveFaviconData &&
            effectiveFaviconData.url == tab.url &&
            effectiveFaviconData.favIconUrl &&
            url != effectiveFaviconData.favIconUrl) {
          this.getEffectiveURL(tab, effectiveFaviconData.favIconUrl).then(aResolve, aError => {
            aReject(aError);
          });
        }
        else {
          this.uneffectiveFavIcons.set(tab.id, {
            url:        tab.url,
            favIconUrl: url
          });
          aReject(aError || new Error('No effective icon'));
        }
      });
      const foundCache = this.recentEffectiveFavIcons.find(item => item && item.url === url);
      if (foundCache)
        return onLoad(foundCache);
      if (!url ||
          !this.VALID_FAVICON_PATTERN.test(url) ||
          this.recentUneffectiveFavIcons.includes(url)) {
        onError();
        return;
      }
      loader = new Image();
      if (/^https?:/.test(url))
        loader.crossOrigin = 'anonymous';
      loader.addEventListener('load', () => onLoad(), { once: true });
      loader.addEventListener('error', onError, { once: true });
      try {
        loader.src = url;
      }
      catch(e) {
        onError(e);
      }
    });
  },

  onTabCreated(tab) {
    this.getEffectiveURL(tab).catch(_e => {});
  },

  onTabUpdated(tabId, changeInfo, _tab) {
    if (!this._hasFavIconInfo(changeInfo))
      return;
    let timer = this._updatingTabs.get(tabId);
    if (timer)
      clearTimeout(timer);
    // Updating of last effective favicon must be done after the loading
    // of the tab itself is correctly done, to avoid cookie problems on
    // some websites.
    // See also: https://github.com/piroor/treestyletab/issues/2064
    timer = setTimeout(async () => {
      this._updatingTabs.delete(tabId);
      const tab = await browser.tabs.get(tabId);
      if (!tab ||
          (changeInfo.favIconUrl &&
           tab.favIconUrl != changeInfo.favIconUrl) ||
          (changeInfo.url &&
           tab.url != changeInfo.url) ||
          !this._hasFavIconInfo(tab))
        return; // expired
      this.getEffectiveURL(
        tab,
        changeInfo.favIconUrl
      ).catch(_e => {});
    }, 5000);
    this._updatingTabs.set(tabId, timer);
  },
  _hasFavIconInfo(tabOrChangeInfo) {
    return 'favIconUrl' in tabOrChangeInfo;
  },
  _updatingTabs: new Map(),

  onTabRemoved(tabId, _removeInfo) {
    this.effectiveFavIcons.delete(tabId);
    this.uneffectiveFavIcons.delete(tabId);
  },

  onTabDetached(tabId, _detachInfo) {
    this.effectiveFavIcons.delete(tabId);
    this.uneffectiveFavIcons.delete(tabId);
  }
};
TabFavIconHelper.init();
