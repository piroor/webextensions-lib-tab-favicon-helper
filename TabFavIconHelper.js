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
  MAYBE_IMAGE_PATTERN: /\.(jpe?g|png|gif|bmp|svg)/i,

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

  effectiveFavIcons: new Map(),
  tasks: [],
  processStep: 5,

  init() {
    this.onTabCreated = this.onTabCreated.bind(this);
    browser.tabs.onCreated.addListener(this.onTabCreated);

    this.onTabUpdated = this.onTabUpdated.bind(this);
    browser.tabs.onUpdated.addListener(this.onTabUpdated);

    this.onTabRemoved = this.onTabRemoved.bind(this);
    browser.tabs.onRemoved.addListener(this.onTabRemoved);

    this.onTabDetached = this.onTabDetached.bind(this);
    browser.tabs.onDetached.addListener(this.onTabDetached);

    window.addEventListener('unload', () => {
      browser.tabs.onCreated.removeListener(this.onTabCreated);
      browser.tabs.onUpdated.removeListener(this.onTabUpdated);
      browser.tabs.onRemoved.removeListener(this.onTabRemoved);
      browser.tabs.onDetached.removeListener(this.onTabDetached);
    }, { once: true });
  },

  addTask(aTask) {
    this.tasks.push(aTask);
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

  loadToImage(aParams = {}) {
    this.addTask(() => {
      this.getEffectiveURL(aParams.tab, aParams.url)
        .then(aURL => {
          aParams.image.src = aURL;
          aParams.image.classList.remove('error');
        },
              _aError => {
                aParams.image.src = '';
                aParams.image.classList.add('error');
              });
    });
  },

  maybeImageTab(aTab) {
    return aTab && 'url' in aTab && this.MAYBE_IMAGE_PATTERN.test(aTab.url);
  },

  getSafeFaviconUrl(url) {
    switch (url) {
      case 'chrome://browser/skin/settings.svg':
        return `data:image/svg+xml,${this.FAVICON_SETTINGS}`;
      case 'chrome://mozapps/skin/extensions/extensionGeneric-16.svg':
        return `data:image/svg+xml,${this.FAVICON_EXTENSION}`;
      case 'chrome://browser/skin/privatebrowsing/favicon.svg':
        return `data:image/svg+xml,${this.FAVICON_PRIVATE_BROWSING}`;
      default:
        if (/^chrome:\/\//.test(url) &&
            !/^chrome:\/\/branding\//.test(url))
          return `data:image/svg+xml,${this.FAVICON_PRIVATE_GLOBE}`;
        break;
    }
    return url;
  },

  getEffectiveURL(aTab, aURL = null) {
    return new Promise((aResolve, aReject) => {
      aURL = this.getSafeFaviconUrl(aURL || aTab.favIconUrl);
      if (!aURL && this.maybeImageTab(aTab))
        aURL = aTab.url;

      let loader, onLoad, onError;
      const clear = (() => {
        if (loader) {
          loader.removeEventListener('load', onLoad, { once: true });
          loader.removeEventListener('error', onError, { once: true });
        }
        loader = onLoad = onError = undefined;
      });

      onLoad = (() => {
        const oldData = this.effectiveFavIcons.get(aTab.id);
        if (!oldData ||
            oldData.url != aTab.url ||
            oldData.favIconUrl != aURL) {
          const lastEffectiveFavicon = {
            url:        aTab.url,
            favIconUrl: aURL
          };
          this.effectiveFavIcons.set(aTab.id, lastEffectiveFavicon);
          if (browser.sessions &&
              browser.sessions.setTabValue)
            browser.sessions.setTabValue(aTab.id, this.LAST_EFFECTIVE_FAVICON, lastEffectiveFavicon);
        }
        aResolve(aURL);
        clear();
      });
      onError = (async (aError) => {
        clear();
        const effectiveFaviconData = this.effectiveFavIcons.get(aTab.id) ||
                                   (browser.sessions &&
                                    browser.sessions.setTabValue &&
                                    await browser.sessions.getTabValue(aTab.id, this.LAST_EFFECTIVE_FAVICON));
        if (effectiveFaviconData &&
            effectiveFaviconData.url == aTab.url &&
            aURL != effectiveFaviconData.favIconUrl) {
          this.getEffectiveURL(aTab, effectiveFaviconData.favIconUrl).then(aResolve, aReject);
        }
        else {
          aReject(aError || new Error('No effective icon'));
        }
      });
      if (!aURL ||
          !this.VALID_FAVICON_PATTERN.test(aURL)) {
        onError();
        return;
      }
      loader = new Image();
      loader.addEventListener('load', onLoad, { once: true });
      loader.addEventListener('error', onError, { once: true });
      try {
        loader.src = aURL;
      }
      catch(e) {
        onError(e);
      }
    });
  },

  onTabCreated(aTab) {
    this.getEffectiveURL(aTab).catch(_e => {});
  },

  onTabUpdated(aTabId, aChangeInfo, aTab) {
    if ('favIconUrl' in aChangeInfo ||
         TabFavIconHelper.maybeImageTab(aChangeInfo)) {
      this.getEffectiveURL(
        aTab,
        aChangeInfo.favIconUrl || aChangeInfo.url
      ).catch(_e => {});
    }
  },

  onTabRemoved(aTabId, _aRemoveInfo) {
    this.effectiveFavIcons.delete(aTabId);
  },

  onTabDetached(aTabId, _aDetachInfo) {
    this.effectiveFavIcons.delete(aTabId);
  }
};
TabFavIconHelper.init();
