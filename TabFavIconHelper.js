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

  // original: chrome://browser/content/aboutlogins/icons/favicon.svg
  FAVICON_LOCKWISE: `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32">
  <defs>
    <linearGradient id="b" x1="24.684" y1="5.756" x2="6.966" y2="26.663" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ff9640"/>
      <stop offset=".6" stop-color="#fc4055"/>
      <stop offset="1" stop-color="#e31587"/>
    </linearGradient>
    <linearGradient id="c" x1="26.362" y1="4.459" x2="10.705" y2="21.897" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff36e" stop-opacity=".8"/>
      <stop offset=".094" stop-color="#fff36e" stop-opacity=".699"/>
      <stop offset=".752" stop-color="#fff36e" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="d" x1="7.175" y1="27.275" x2="23.418" y2="11.454" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0090ed"/>
      <stop offset=".386" stop-color="#5b6df8"/>
      <stop offset=".629" stop-color="#9059ff"/>
      <stop offset="1" stop-color="#b833e1"/>
    </linearGradient>
    <linearGradient id="a" x1="29.104" y1="15.901" x2="26.135" y2="21.045" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#722291" stop-opacity=".5"/>
      <stop offset=".5" stop-color="#722291" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="e" x1="20.659" y1="21.192" x2="13.347" y2="28.399" xlink:href="#a"/>
    <linearGradient id="f" x1="2.97" y1="19.36" x2="10.224" y2="21.105" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#054096" stop-opacity=".5"/>
      <stop offset=".054" stop-color="#0f3d9c" stop-opacity=".441"/>
      <stop offset=".261" stop-color="#2f35b1" stop-opacity=".249"/>
      <stop offset=".466" stop-color="#462fbf" stop-opacity=".111"/>
      <stop offset=".669" stop-color="#542bc8" stop-opacity=".028"/>
      <stop offset=".864" stop-color="#592acb" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <path d="M15.986 31.076A5.635 5.635 0 0 1 12.3 29.76 103.855 103.855 0 0 1 2.249 19.7a5.841 5.841 0 0 1-.006-7.4A103.792 103.792 0 0 1 12.3 2.247a5.837 5.837 0 0 1 7.4-.006A104.1 104.1 0 0 1 29.751 12.3a5.842 5.842 0 0 1 .006 7.405c-.423.484-.584.661-.917 1.025l-.234.255a1.749 1.749 0 1 1-2.585-2.357l.234-.258c.314-.344.467-.511.86-.961a2.352 2.352 0 0 0-.008-2.814 100.308 100.308 0 0 0-9.7-9.714 2.352 2.352 0 0 0-2.814.007 100.323 100.323 0 0 0-9.7 9.7 2.354 2.354 0 0 0 .006 2.815 100.375 100.375 0 0 0 9.7 9.708 2.352 2.352 0 0 0 2.815-.006c1.311-1.145 2.326-2.031 3.434-3.086l-3.4-3.609a2.834 2.834 0 0 1-.776-2.008 2.675 2.675 0 0 1 .834-1.9l.194-.184a2.493 2.493 0 0 0 1.124-2.333 2.81 2.81 0 0 0-5.6 0 2.559 2.559 0 0 0 1.092 2.279l.127.118a2.735 2.735 0 0 1 .324 3.7 1.846 1.846 0 0 1-.253.262l-1.578 1.326a1.75 1.75 0 0 1-2.252-2.68l.755-.634a5.758 5.758 0 0 1-1.715-4.366 6.305 6.305 0 0 1 12.6 0 5.642 5.642 0 0 1-1.854 4.528l3.84 4.082a2.071 2.071 0 0 1 .59 1.446 2.128 2.128 0 0 1-.628 1.526c-1.6 1.592-2.895 2.72-4.533 4.15a5.745 5.745 0 0 1-3.753 1.354z" fill="url(#b)"/>
  <path d="M15.986 31.076A5.635 5.635 0 0 1 12.3 29.76 103.855 103.855 0 0 1 2.249 19.7a5.841 5.841 0 0 1-.006-7.4A103.792 103.792 0 0 1 12.3 2.247a5.837 5.837 0 0 1 7.4-.006A104.1 104.1 0 0 1 29.751 12.3a5.842 5.842 0 0 1 .006 7.405c-.423.484-.584.661-.917 1.025l-.234.255a1.749 1.749 0 1 1-2.585-2.357l.234-.258c.314-.344.467-.511.86-.961a2.352 2.352 0 0 0-.008-2.814 100.308 100.308 0 0 0-9.7-9.714 2.352 2.352 0 0 0-2.814.007 100.323 100.323 0 0 0-9.7 9.7 2.354 2.354 0 0 0 .006 2.815 100.375 100.375 0 0 0 9.7 9.708 2.352 2.352 0 0 0 2.815-.006c1.311-1.145 2.326-2.031 3.434-3.086l-3.4-3.609a2.834 2.834 0 0 1-.776-2.008 2.675 2.675 0 0 1 .834-1.9l.194-.184a2.493 2.493 0 0 0 1.124-2.333 2.81 2.81 0 0 0-5.6 0 2.559 2.559 0 0 0 1.092 2.279l.127.118a2.735 2.735 0 0 1 .324 3.7 1.846 1.846 0 0 1-.253.262l-1.578 1.326a1.75 1.75 0 0 1-2.252-2.68l.755-.634a5.758 5.758 0 0 1-1.715-4.366 6.305 6.305 0 0 1 12.6 0 5.642 5.642 0 0 1-1.854 4.528l3.84 4.082a2.071 2.071 0 0 1 .59 1.446 2.128 2.128 0 0 1-.628 1.526c-1.6 1.592-2.895 2.72-4.533 4.15a5.745 5.745 0 0 1-3.753 1.354z" fill="url(#c)"/>
  <path d="M29.58 17.75a34.267 34.267 0 0 0-2.473-3.15 2.352 2.352 0 0 1 .008 2.814c-.393.45-.546.617-.86.961l-.234.258a1.749 1.749 0 1 0 2.585 2.357l.234-.255c.231-.253.379-.415.59-.653a2.161 2.161 0 0 0 .15-2.332zm-8.734 6.275c-1.108 1.055-2.123 1.941-3.434 3.086a2.352 2.352 0 0 1-2.815.006 100.375 100.375 0 0 1-9.7-9.708 2.354 2.354 0 0 1-.006-2.815s-2.131 1.984-2.4 3.424a2.956 2.956 0 0 0 .724 2.782 103.772 103.772 0 0 0 9.085 8.96 5.635 5.635 0 0 0 3.683 1.316 5.745 5.745 0 0 0 3.753-1.351c.926-.808 1.741-1.52 2.565-2.273a1.558 1.558 0 0 0 0-1.476 11.55 11.55 0 0 0-1.455-1.951z" fill="url(#d)"/>
  <path d="M29.43 20.079c-.211.238-.359.4-.59.653l-.234.255a1.749 1.749 0 1 1-2.585-2.357l.234-.258c.314-.344.467-.511.86-.961a2.352 2.352 0 0 0-.008-2.814 34.267 34.267 0 0 1 2.473 3.153 2.161 2.161 0 0 1-.15 2.329z" fill="url(#a)"/>
  <path d="M22.3 25.976a11.55 11.55 0 0 0-1.458-1.951c-1.108 1.055-2.123 1.941-3.434 3.086a2.352 2.352 0 0 1-2.815.006c-1.414-1.234-2.768-2.5-4.095-3.8L8.023 25.8c1.384 1.35 2.8 2.668 4.28 3.958a5.635 5.635 0 0 0 3.683 1.316 5.745 5.745 0 0 0 3.753-1.351c.926-.808 1.741-1.52 2.565-2.273a1.558 1.558 0 0 0-.004-1.474z" fill="url(#e)"/>
  <path d="M4.892 17.409a2.354 2.354 0 0 1-.006-2.815s-2.131 1.984-2.4 3.424a2.956 2.956 0 0 0 .729 2.782c1.56 1.739 3.158 3.4 4.808 5.007l2.479-2.48c-1.935-1.891-3.802-3.844-5.61-5.918z" opacity=".9" fill="url(#f)"/>
</svg>
`,
  // original: chrome://browser/content/robot.ico
  FAVICON_ROBOT: `
data:image/x-icon;base64,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
`.trim(),
  // original: chrome://browser/skin/controlcenter/dashboard.svg
  FAVICON_DASHBOARD: `
<svg data-name="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <path fill="context-fill" fill-opacity="context-fill-opacity" d="M15 12H4a2 2 0 0 1-2-2V3a1 1 0 0 0-2 0v7a4 4 0 0 0 4 4h11a1 1 0 0 0 0-2z"/>
  <path fill="context-fill" fill-opacity="context-fill-opacity" d="M4 11a1 1 0 0 0 1-1V8a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zM7 11a1 1 0 0 0 1-1V4a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1zM10 11a1 1 0 0 0 1-1V6a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1zM13 11a1 1 0 0 0 1-1V7a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1z"/>
</svg>
`,
  // original: chrome://browser/skin/developer.svg
  FAVICON_DEVELOPER: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path fill="context-fill" fill-opacity="context-fill-opacity" d="M14.555 3.2l-2.434 2.436a1.243 1.243 0 1 1-1.757-1.757L12.8 1.445A3.956 3.956 0 0 0 11 1a3.976 3.976 0 0 0-3.434 6.02l-6.273 6.273a1 1 0 1 0 1.414 1.414L8.98 8.434A3.96 3.96 0 0 0 11 9a4 4 0 0 0 4-4 3.956 3.956 0 0 0-.445-1.8z"/>
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
  // original: chrome://global/skin/icons/settings.svg
  FAVICON_SETTINGS: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
  <path d="m8.628 16-1.25 0a1.632 1.632 0 0 1-1.562-1.177l-.406-1.414a5.939 5.939 0 0 1-.78-.466l-1.448.36a1.632 1.632 0 0 1-1.799-.765l-.625-1.082a1.633 1.633 0 0 1 .229-1.931l1.045-1.101A3.279 3.279 0 0 1 2 8c0-.153.014-.302.032-.45L.999 6.479a1.63 1.63 0 0 1-.238-1.94l.625-1.083a1.636 1.636 0 0 1 1.787-.768l1.477.355c.258-.179.51-.329.761-.452l.406-1.414A1.63 1.63 0 0 1 7.378 0l1.25 0c.714 0 1.354.478 1.559 1.163l.425 1.436c.242.121.484.266.739.444l1.478-.355a1.635 1.635 0 0 1 1.786.768l.625 1.083c.36.625.263 1.422-.237 1.941l-1.035 1.07c.018.148.032.297.032.45 0 .145-.014.285-.031.424l1.045 1.101c.492.519.586 1.312.229 1.931l-.625 1.083a1.63 1.63 0 0 1-1.8.764l-1.447-.36c-.259.182-.51.333-.759.458l-.425 1.437A1.638 1.638 0 0 1 8.628 16zm-4.016-4.341.528.109a4.72 4.72 0 0 0 1.032.615l.359.404.485 1.691c.046.16.194.271.36.271l1.25 0a.37.37 0 0 0 .359-.269l.506-1.707.355-.398c.324-.137.645-.33 1.01-.608l.529-.109 1.731.431a.378.378 0 0 0 .416-.176l.625-1.083a.378.378 0 0 0-.053-.446l-1.25-1.317-.167-.505.022-.174c.021-.127.041-.255.041-.388 0-.149-.021-.293-.042-.437l-.021-.15.171-.513 1.244-1.289a.378.378 0 0 0 .055-.448l-.625-1.082a.38.38 0 0 0-.412-.177l-1.758.422-.521-.108a4.7 4.7 0 0 0-.991-.594l-.356-.398-.506-1.707a.373.373 0 0 0-.36-.269l-1.25 0a.377.377 0 0 0-.36.271l-.486 1.691-.36.405a4.71 4.71 0 0 0-1.013.6l-.521.109-1.757-.422a.383.383 0 0 0-.413.177l-.625 1.083a.375.375 0 0 0 .055.447L3.142 6.9l.171.514-.021.15A2.981 2.981 0 0 0 3.25 8c0 .133.02.261.037.389l.022.174-.167.505-1.25 1.317a.38.38 0 0 0-.053.446l.625 1.083a.38.38 0 0 0 .415.176l1.733-.431z"/>
  <path d="M8 6.25c.965 0 1.75.785 1.75 1.75S8.965 9.75 8 9.75 6.25 8.965 6.25 8 7.035 6.25 8 6.25M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
</svg>
`,
  // original: chrome://browser/skin/window.svg
  FAVICON_WINDOW: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path fill="context-fill" fill-opacity="context-fill-opacity" d="M13 1H3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h11a2 2 0 0 0 2-2V4a3 3 0 0 0-3-3zm1 11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6h12zm0-7H2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z"/>
</svg>
`,
  // original: chrome://devtools/skin/images/profiler-stopwatch.svg
  FAVICON_PROFILER: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path fill="context-fill" fill-opacity="context-fill-opacity" d="M10.85 6.85a.5.5 0 0 0-.7-.7l-2.5 2.5.7.7 2.5-2.5zM8 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 1a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1zM8 4a5 5 0 1 0 0 10A5 5 0 0 0 8 4zM1 9a7 7 0 1 1 14 0A7 7 0 0 1 1 9z"/>
</svg>
`,
  // original: chrome://global/skin/icons/performance.svg
  FAVICON_PERFORMANCE: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <path fill="context-fill" d="M8 1a8 8 0 0 0-8 8 7.89 7.89 0 0 0 .78 3.43 1 1 0 0 0 .9.57.94.94 0 0 0 .43-.1 1 1 0 0 0 .47-1.33A6.07 6.07 0 0 1 2 9a6 6 0 0 1 12 0 5.93 5.93 0 0 1-.59 2.57 1 1 0 0 0 1.81.86A7.89 7.89 0 0 0 16 9a8 8 0 0 0-8-8z"/>
  <path fill="context-fill" d="M11.77 7.08a.5.5 0 0 0-.69.15L8.62 11.1A2.12 2.12 0 0 0 8 11a2 2 0 0 0 0 4 2.05 2.05 0 0 0 1.12-.34 2.31 2.31 0 0 0 .54-.54 2 2 0 0 0 0-2.24 2.31 2.31 0 0 0-.2-.24l2.46-3.87a.5.5 0 0 0-.15-.69z"/>
</svg>
`,
  // original: chrome://global/skin/icons/warning.svg
  FAVICON_WARNING: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path fill="context-fill" fill-opacity="context-fill-opacity" d="M14.742 12.106L9.789 2.2a2 2 0 0 0-3.578 0l-4.953 9.91A2 2 0 0 0 3.047 15h9.905a2 2 0 0 0 1.79-2.894zM7 5a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0zm1 8.25A1.25 1.25 0 1 1 9.25 12 1.25 1.25 0 0 1 8 13.25z"/>
</svg>
`,
  // original: chrome://mozapps/skin/extensions/extensionGeneric-16.svg
  FAVICON_EXTENSION: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="context-fill" fill-opacity="context-fill-opacity">
  <path d="M14.5 8c-.971 0-1 1-1.75 1a.765.765 0 0 1-.75-.75V5a1 1 0 0 0-1-1H7.75A.765.765 0 0 1 7 3.25c0-.75 1-.779 1-1.75C8 .635 7.1 0 6 0S4 .635 4 1.5c0 .971 1 1 1 1.75a.765.765 0 0 1-.75.75H1a1 1 0 0 0-1 1v2.25A.765.765 0 0 0 .75 8c.75 0 .779-1 1.75-1C3.365 7 4 7.9 4 9s-.635 2-1.5 2c-.971 0-1-1-1.75-1a.765.765 0 0 0-.75.75V15a1 1 0 0 0 1 1h3.25a.765.765 0 0 0 .75-.75c0-.75-1-.779-1-1.75 0-.865.9-1.5 2-1.5s2 .635 2 1.5c0 .971-1 1-1 1.75a.765.765 0 0 0 .75.75H11a1 1 0 0 0 1-1v-3.25a.765.765 0 0 1 .75-.75c.75 0 .779 1 1.75 1 .865 0 1.5-.9 1.5-2s-.635-2-1.5-2z"/>
</svg>
`,
  // original: globe-16.svg
  FAVICON_GLOBE: `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="context-fill" fill-opacity="context-fill-opacity">
  <path d="M8.5 1a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm2.447 1.75a6.255 6.255 0 0 1 3.756 5.125l-2.229 0A9.426 9.426 0 0 0 10.54 2.75l.407 0zm-2.049 0a8.211 8.211 0 0 1 2.321 5.125l-5.438 0A8.211 8.211 0 0 1 8.102 2.75l.796 0zm-2.846 0 .408 0a9.434 9.434 0 0 0-1.934 5.125l-2.229 0A6.254 6.254 0 0 1 6.052 2.75zm0 11.5a6.252 6.252 0 0 1-3.755-5.125l2.229 0A9.426 9.426 0 0 0 6.46 14.25l-.408 0zm2.05 0a8.211 8.211 0 0 1-2.321-5.125l5.437 0a8.211 8.211 0 0 1-2.321 5.125l-.795 0zm2.846 0-.409 0a9.418 9.418 0 0 0 1.934-5.125l2.229 0a6.253 6.253 0 0 1-3.754 5.125z"/>
</svg>
`,

  async _urlToKey(url) { // sha1 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(url);

    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
  },

  DB_NAME: 'TabFavIconHelper',
  DB_VERSION: 2,
  STORE_FAVICONS: 'favIcons',
  STORE_EFFECTIVE_FAVICONS: 'effectiveFavIcons',
  STORE_UNEFFECTIVE_FAVICONS: 'uneffectiveFavIcons',
  EXPIRATION_TIME_IN_MSEC: 7 * 24 * 60 * 60 * 1000, // 7 days

  async _openDB() {
    if (this._openedDB)
      return this._openedDB;
    return new Promise((resolve, _reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        // This can fail if this is in a private window.
        // See: https://github.com/piroor/treestyletab/issues/3387
        //reject(new Error('Failed to open database'));
        resolve(null);
      };

      request.onsuccess = () => {
        const db = request.result;
        this._openedDB = db;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStores = db.objectStoreNames;

        const needToUpgrade = event.oldVersion < this.DB_VERSION;
        if (needToUpgrade) {
          if (objectStores.contains(this.STORE_FAVICONS))
            db.deleteObjectStore(this.STORE_FAVICONS);
          if (objectStores.contains(this.STORE_EFFECTIVE_FAVICONS))
            db.deleteObjectStore(this.STORE_EFFECTIVE_FAVICONS);
          if (objectStores.contains(this.STORE_UNEFFECTIVE_FAVICONS))
            db.deleteObjectStore(this.STORE_UNEFFECTIVE_FAVICONS);
        }

        if (needToUpgrade ||
            !objectStores.contains(this.STORE_FAVICONS)) {
          const favIconsStore = db.createObjectStore(this.STORE_FAVICONS, { keyPath: 'key', unique: true });
          favIconsStore.createIndex('urlKey', 'urlKey', { unique: false });
          favIconsStore.createIndex('timestamp', 'timestamp');
        }

        if (needToUpgrade ||
            !objectStores.contains(this.STORE_EFFECTIVE_FAVICONS)) {
          const effectiveFavIconsStore = db.createObjectStore(this.STORE_EFFECTIVE_FAVICONS, { keyPath: 'urlKey', unique: true });
          effectiveFavIconsStore.createIndex('timestamp', 'timestamp');
          effectiveFavIconsStore.createIndex('favIconKey', 'favIconKey', { unique: false });
        }

        if (needToUpgrade ||
            !objectStores.contains(this.STORE_UNEFFECTIVE_FAVICONS)) {
          const uneffectiveFavIconsStore = db.createObjectStore(this.STORE_UNEFFECTIVE_FAVICONS, { keyPath: 'urlKey', unique: true });
          uneffectiveFavIconsStore.createIndex('timestamp', 'timestamp');
          uneffectiveFavIconsStore.createIndex('favIconKey', 'favIconKey', { unique: false });
        }
      };
    });
  },

  async _associateFavIconUrlToTabUrl({ favIconUrl, tabUrl, store } = {}) {
    const [db, tabUrlKey, favIconKey] = await Promise.all([
      this._openDB(),
      this._urlToKey(tabUrl),
      this._urlToKey(favIconUrl),
    ]);
    if (!db)
      return;

    try {
      const transaction = db.transaction([store, this.STORE_FAVICONS], 'readwrite');
      const associationStore = transaction.objectStore(store);
      const favIconStore = transaction.objectStore(this.STORE_FAVICONS);
      const timestamp = Date.now();

      const associationRequest = associationStore.put({ urlKey: tabUrlKey, favIconKey, timestamp });
      const favIconRequest = favIconStore.put({ key: favIconKey, url: favIconUrl, timestamp });

      transaction.oncomplete = () => {
        //db.close();
        this._reserveToExpireOldEntries();
        favIconUrl = undefined;
        tabUrl = undefined;
        store = undefined;
      };

      associationRequest.onerror = event => {
        console.error(`Failed to associate favIconUrl ${favIconUrl} to tabUrl ${tabUrl} in the store ${store}`, event);
      };

      favIconRequest.onerror = event => {
        console.error(`Failed to store favIconUrl ${favIconUrl} to tabUrl ${tabUrl} in the store ${store}`, event);
      };
    }
    catch(error) {
      console.error(`Failed to associate favIconUrl ${favIconUrl} to tabUrl ${tabUrl} in the store ${store}`, error);
    }
  },

  async _unassociateFavIconUrlFromTabUrl({ tabUrl, store } = {}) {
    const [db, tabUrlKey] = await Promise.all([
      this._openDB(),
      this._urlToKey(tabUrl),
    ]);
    if (!db)
      return;

    try {
      const transaction = db.transaction([store], 'readwrite');
      const associationStore = transaction.objectStore(store);
      const unassociationRequest = associationStore.delete(tabUrlKey);

      transaction.oncomplete = () => {
        //db.close();
        this._reserveToExpireOldEntries();
        tabUrl = undefined;
        store = undefined;
      };

      unassociationRequest.onerror = event => {
        console.error(`Failed to unassociate favIconUrl from tabUrl ${tabUrl} in the store ${store}`, event);
      };
    }
    catch(error) {
      console.error(`Failed to unassociate favIconUrl from tabUrl ${tabUrl} in the store ${store}`, error);
    }
  },

  async _getAssociatedFavIconUrlFromTabUrl({ tabUrl, store } = {}) {
    return new Promise(async (resolve, _reject) => {
      const [db, tabUrlKey] = await Promise.all([
        this._openDB(),
        this._urlToKey(tabUrl),
      ]);
      if (!db) {
        resolve(null);
        return;
      }

      try {
        const transaction = db.transaction([store, this.STORE_FAVICONS], 'readonly');
        const associationStore = transaction.objectStore(store);
        const favIconStore = transaction.objectStore(this.STORE_FAVICONS);

        const associationRequest = associationStore.get(tabUrlKey);

        associationRequest.onsuccess = () => {
          const association = associationRequest.result;
          if (!association) {
            //console.log(`No associated favIconUrl for the tabUrl ${tabUrl} in the store ${store}`);
            resolve(null);
            return;
          }

          const favIconRequest = favIconStore.get(association.favIconKey);

          favIconRequest.onsuccess = () => {
            let favIcon = favIconRequest.result;
            if (!favIcon) {
              //console.log(`FavIcon data not found for the tabUrl ${tabUrl} in the store ${store}`);
              resolve(null);
              return;
            }
            if (favIcon.timestamp < Date.now() - this.EXPIRATION_TIME_IN_MSEC) {
              //console.log(`FavIcon data is expired for the tabUrl ${tabUrl} in the store ${store}`);
              this._reserveToExpireOldEntries();
              resolve(null);
              return;
            }
            resolve(favIcon.url);
            favIcon.url = undefined;
            favIcon = undefined;
          };

          favIconRequest.onerror = event => {
            console.error(`Failed to get favIconUrl from tabUrl ${tabUrl}`, event);
            resolve(null);
          };
        };

        associationRequest.onerror = event => {
          console.error(`Failed to get favIcon association from tabUrl ${tabUrl}`, event);
          resolve(null);
        };

        transaction.oncomplete = () => {
          //db.close();
          tabUrl = undefined;
          store = undefined;
        };
      }
      catch(error) {
        console.error('Failed to get from cache:', error);
        resolve(null);
      }
    });
  },

  async _reserveToExpireOldEntries() {
    if (this._reservedExpiration)
      clearTimeout(this._reservedExpiration);
    this._reservedExpiration = setTimeout(() => {
      this._reservedExpiration = null;
      this._expireOldEntries();
    }, 500);
  },
  async _expireOldEntries() {
    return new Promise(async (resolve, reject) => {
      const db = await this._openDB();
      if (!db) {
        resolve();
        return;
      }

      try {
        const transaction = db.transaction([this.STORE_FAVICONS, this.STORE_EFFECTIVE_FAVICONS, this.STORE_UNEFFECTIVE_FAVICONS], 'readwrite');
        const favIconsStore = transaction.objectStore(this.STORE_FAVICONS);
        const effectiveFavIconsStore = transaction.objectStore(this.STORE_EFFECTIVE_FAVICONS);
        const uneffectiveFavIconsStore = transaction.objectStore(this.STORE_UNEFFECTIVE_FAVICONS);

        const favIconIndex = favIconsStore.index('timestamp');
        const effectiveFavIconIndex = effectiveFavIconsStore.index('timestamp');
        const uneffectiveFavIconIndex = uneffectiveFavIconsStore.index('timestamp');

        const expirationTimestamp = Date.now() - this.EXPIRATION_TIME_IN_MSEC;

        const favIconRequest = favIconIndex.openCursor(IDBKeyRange.upperBound(expirationTimestamp));
        favIconRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (!cursor)
            return;
          const key = cursor.primaryKey;
          cursor.continue();
          const deleteRequest = favIconsStore.delete(key);
          deleteRequest.onerror = event => {
            console.error(`Failed to clear favicon index`, event);
          };
        };
        favIconRequest.onerror = event => {
          console.error(`Failed to retrieve favicon index`, event);
        };

        const effectiveFavIconRequest = effectiveFavIconIndex.openCursor(IDBKeyRange.upperBound(expirationTimestamp));
        effectiveFavIconRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (!cursor)
            return;
          const url = cursor.primaryKey;
          cursor.continue();
          const deleteRequest = effectiveFavIconsStore.delete(url);
          deleteRequest.onerror = event => {
            console.error(`Failed to clear effective favicon index`, event);
          };
        };
        effectiveFavIconRequest.onerror = event => {
          console.error(`Failed to retrieve effective favicon index`, event);
        };

        const uneffectiveFavIconRequest = uneffectiveFavIconIndex.openCursor(IDBKeyRange.upperBound(expirationTimestamp));
        uneffectiveFavIconRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (!cursor)
            return;
          const url = cursor.primaryKey;
          cursor.continue();
          const deleteRequest = uneffectiveFavIconsStore.delete(url);
          deleteRequest.onerror = event => {
            console.error(`Failed to clear uneffective favicon index`, event);
          };
        };
        uneffectiveFavIconRequest.onerror = event => {
          console.error(`Failed to retrieve uneffective favicon index`, event);
        };

        transaction.oncomplete = () => {
          //db.close();
          resolve();
        };
      }
      catch(error) {
        console.error('Failed to expire old entries:', error);
        reject(error);
      }
    });
  },

  _tasks: [],
  _processStep: 5,
  FAVICON_SIZE: 16,

  _init() {
    this._onTabUpdated = this._onTabUpdated.bind(this);
    browser.tabs.onUpdated.addListener(this._onTabUpdated);

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = this.FAVICON_SIZE;
    this.canvas.setAttribute('style', `
      visibility: hidden;
      pointer-events: none;
      position: fixed
    `);
    document.body.appendChild(this.canvas);

    window.addEventListener('unload', () => {
      browser.tabs.onUpdated.removeListener(this._onTabUpdated);
    }, { once: true });
  },

  _sessionAPIAvailable: (
    browser.sessions &&
    browser.sessions.getTabValue &&
    browser.sessions.setTabValue &&
    browser.sessions.removeTabValue
  ),

  _addTask(task) {
    this._tasks.push(task);
    this._run();
  },

  _run() {
    if (this._running)
      return;
    this._running = true;
    const processOneTask = () => {
      if (this._tasks.length == 0) {
        this._running = false;
      }
      else {
        const tasks = this._tasks.splice(0, this._processStep);
        while (tasks.length > 0) {
          tasks.shift()();
        }
        window.requestAnimationFrame(processOneTask);
      }
    };
    processOneTask();
  },

  // public
  loadToImage(params = {}) {
    this._addTask(() => {
      this._getEffectiveFavIconURL(params.tab, params.url)
        .then(url => {
          params.image.src = url;
          params.image.classList.remove('error');
          url = undefined;
        })
        .catch(_error => {
          params.image.src = '';
          params.image.classList.add('error');
        });
    });
  },

  // public
  maybeImageTab(_tab) { // for backward compatibility
    return false;
  },

  getSafeFaviconUrl(url) {
    if (/^data:image\/png;base64,/i.test(url)) {
      try {
        const { width, height } = this.getPngDimensionsFromDataUri(url);
        if (!width || !height) {
          return this._getSVGDataURI(this.FAVICON_GLOBE);
        }
      }
      catch (_error) {
        return this._getSVGDataURI(this.FAVICON_GLOBE);
      }
    }
    switch (url) {
      case 'chrome://browser/content/aboutlogins/icons/favicon.svg':
        return this._getSVGDataURI(this.FAVICON_LOCKWISE);
      case 'chrome://browser/content/robot.ico':
        return this.FAVICON_ROBOT;
      case 'chrome://browser/skin/controlcenter/dashboard.svg':
        return this._getSVGDataURI(this.FAVICON_DASHBOARD);
      case 'chrome://browser/skin/developer.svg':
      case 'chrome://global/skin/icons/developer.svg':
        return this._getSVGDataURI(this.FAVICON_DEVELOPER);
      case 'chrome://browser/skin/privatebrowsing/favicon.svg':
        return this._getSVGDataURI(this.FAVICON_PRIVATE_BROWSING);
      case 'chrome://browser/skin/settings.svg':
      case 'chrome://global/skin/icons/settings.svg':
        return this._getSVGDataURI(this.FAVICON_SETTINGS);
      case 'chrome://browser/skin/window.svg':
        return this._getSVGDataURI(this.FAVICON_WINDOW);
      case 'chrome://devtools/skin/images/profiler-stopwatch.svg':
        return this._getSVGDataURI(this.FAVICON_PROFILER);
      case 'chrome://global/skin/icons/performance.svg':
        return this._getSVGDataURI(this.FAVICON_PERFORMANCE);
      case 'chrome://global/skin/icons/warning.svg':
        return this._getSVGDataURI(this.FAVICON_WARNING);
      case 'chrome://mozapps/skin/extensions/extensionGeneric-16.svg':
        return this._getSVGDataURI(this.FAVICON_EXTENSION);
      default:
        if (/^chrome:\/\//.test(url) &&
            !/^chrome:\/\/branding\//.test(url))
          return this._getSVGDataURI(this.FAVICON_GLOBE);
        break;
    }
    return url;
  },
  _getSVGDataURI(svg) {
    return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
  },

  // public
  async getLastEffectiveFavIconURL(tab) {
    if (tab.favIconUrl?.startsWith('data:'))
      return tab.favIconUrl;

    const uneffectiveFavIconUrl = await this._getAssociatedFavIconUrlFromTabUrl({ tabUrl: tab.url, store: this.STORE_UNEFFECTIVE_FAVICONS });
    if (uneffectiveFavIconUrl)
      return null;

    const favIconUrl = await this._getAssociatedFavIconUrlFromTabUrl({ tabUrl: tab.url, store: this.STORE_EFFECTIVE_FAVICONS });
    if (favIconUrl)
      return favIconUrl;

    if (!this._sessionAPIAvailable)
      return null;

    const lastData = await browser.sessions.getTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON);
    return lastData && lastData.url == tab.url && lastData.favIconUrl;
  },

  async _getEffectiveFavIconURL(tab, favIconUrl = null) {
    if (!favIconUrl) {
      favIconUrl = tab.favIconUrl;
    }
    if (favIconUrl?.startsWith('data:')) {
      if (/^data:image\/png;base64,/i.test(favIconUrl)) {
        try {
          const { width, height } = this.getPngDimensionsFromDataUri(favIconUrl);
          if (!width || !height) {
            throw new Error('zero size image');
          }
        }
        catch (_error) {
          browser.sessions.removeTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON);
          this._unassociateFavIconUrlFromTabUrl({ tabUrl: tab.url, store: this.STORE_EFFECTIVE_FAVICONS });
          this._associateFavIconUrlToTabUrl({ tabUrl: tab.url, favIconUrl, store: this.STORE_UNEFFECTIVE_FAVICONS });
          throw new Error('No effective icon');
        }
      }
      browser.sessions.removeTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON);
      this._unassociateFavIconUrlFromTabUrl({ tabUrl: tab.url, store: this.STORE_UNEFFECTIVE_FAVICONS });
      return favIconUrl;
    }

    return new Promise(async (resolve, reject) => {
      favIconUrl = this.getSafeFaviconUrl(favIconUrl);
      let storedFavIconUrl;
      if (!favIconUrl && tab.discarded) {
        // discarded tab doesn't have favIconUrl, so we should use cached data.
        storedFavIconUrl = favIconUrl = await this.getLastEffectiveFavIconURL(tab);
      }

      let loader, onLoad, onError;
      const clear = (() => {
        if (loader) {
          loader.removeEventListener('load', onLoad, { once: true });
          loader.removeEventListener('error', onError, { once: true });
        }
        loader = onLoad = onError = favIconUrl = storedFavIconUrl = undefined;
      });

      onLoad = async foundFavIconUrl => {
        let dataURL = null;
        if (this.DRAWABLE_FAVICON_PATTERN.test(favIconUrl)) {
          const context = this.canvas.getContext('2d');
          context.clearRect(0, 0, this.FAVICON_SIZE, this.FAVICON_SIZE);
          context.drawImage(loader, 0, 0, this.FAVICON_SIZE, this.FAVICON_SIZE);
          try {
            dataURL = this.canvas.toDataURL('image/png');
          }
          catch(_error) {
            // it can fail due to security reasons
          }
        }
        const oldFavIconUrl = foundFavIconUrl || await this._getAssociatedFavIconUrlFromTabUrl({ tabUrl: tab.url, store: this.STORE_EFFECTIVE_FAVICONS });
        if (!oldFavIconUrl ||
            oldFavIconUrl != favIconUrl) {
          if (this._sessionAPIAvailable)
            browser.sessions.setTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON, {
              url: tab.url,
              favIconUrl,
            });
        }
        this._associateFavIconUrlToTabUrl({ tabUrl: tab.url, favIconUrl, store: this.STORE_EFFECTIVE_FAVICONS });
        this._unassociateFavIconUrlFromTabUrl({ tabUrl: tab.url, store: this.STORE_UNEFFECTIVE_FAVICONS });
        resolve(dataURL || favIconUrl);
        clear();
      };
      onError = async error => {
        this._unassociateFavIconUrlFromTabUrl({ tabUrl: tab.url, store: this.STORE_EFFECTIVE_FAVICONS });
        this._associateFavIconUrlToTabUrl({ tabUrl: tab.url, favIconUrl, store: this.STORE_UNEFFECTIVE_FAVICONS });
        if (this._sessionAPIAvailable)
          browser.sessions.removeTabValue(tab.id, this.LAST_EFFECTIVE_FAVICON);
        clear();
        reject(error || new Error('No effective icon'));
      };
      storedFavIconUrl = storedFavIconUrl || await this._getAssociatedFavIconUrlFromTabUrl({ tabUrl: tab.url, store: this.STORE_EFFECTIVE_FAVICONS });
      if (storedFavIconUrl)
        return onLoad(storedFavIconUrl);
      if (!favIconUrl ||
          !this.VALID_FAVICON_PATTERN.test(favIconUrl)) {
        onError();
        return;
      }
      loader = new Image();
      if (/^https?:/.test(favIconUrl))
        loader.crossOrigin = 'anonymous';
      loader.addEventListener('load', () => onLoad(), { once: true });
      loader.addEventListener('error', onError, { once: true });
      try {
        loader.src = favIconUrl;
      }
      catch(error) {
        this._unassociateFavIconUrlFromTabUrl({ tabUrl: tab.url, store: this.STORE_EFFECTIVE_FAVICONS });
        this._associateFavIconUrlToTabUrl({ tabUrl: tab.url, favIconUrl, store: this.STORE_UNEFFECTIVE_FAVICONS });
        onError(error);
      }
    });
  },

  _onTabUpdated(tabId, changeInfo, _tab) {
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
      const tab = await browser.tabs.get(tabId).catch(_error => null);
      if (!tab ||
          (changeInfo.favIconUrl &&
           tab.favIconUrl != changeInfo.favIconUrl) ||
          (changeInfo.url &&
           tab.url != changeInfo.url) ||
          !this._hasFavIconInfo(tab))
        return; // expired

      await this._getEffectiveFavIconURL(
        tab,
        changeInfo.favIconUrl
      ).catch(_error => {});
    }, 5000);
    this._updatingTabs.set(tabId, timer);
  },
  _hasFavIconInfo(tabOrChangeInfo) {
    return 'favIconUrl' in tabOrChangeInfo;
  },
  _updatingTabs: new Map(),

  getPngDimensionsFromDataUri(uri) {
    if (!/^data:image\/png;base64,/i.test(uri))
      throw new Error('impossible to parse as PNG image data ', uri);

    const base64Data = uri.split(',')[1];
    const binaryData = atob(base64Data);
    const byteArray = new Uint8Array(binaryData.length);
    const requiredScanSize = Math.min(binaryData.length, 24);
    for (let i = 0; i < requiredScanSize; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }
    const pngSignature = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
    for (let i = 0; i < pngSignature.length; i++) {
      if (byteArray[i] !== pngSignature[i])
        throw new Error('invalid PNG header');
    }
    const width =
    (byteArray[16] << 24) |
    (byteArray[17] << 16) |
    (byteArray[18] << 8) |
    byteArray[19];
    const height =
    (byteArray[20] << 24) |
    (byteArray[21] << 16) |
    (byteArray[22] << 8) |
    byteArray[23];
    return { width, height };
  },
};
TabFavIconHelper._init(); // eslint-disable-line no-underscore-dangle
