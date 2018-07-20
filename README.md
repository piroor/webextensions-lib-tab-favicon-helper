# webextensions-lib-tab-favicon-helper

[![Build Status](https://travis-ci.org/piroor/webextensions-lib-tab-favicon-helper.svg?branch=master)](https://travis-ci.org/piroor/webextensions-lib-tab-favicon-helper)

Helps to show favicon image from tabs.Tab.

As described at [bug 1402393](https://bugzilla.mozilla.org/show_bug.cgi?id=1402393), WebExtensions doesn't provide any feature to cache effective favicons.
And we need to do more workarounds for image files.
This library helps you to implement something with favicon without any annoying hacks.

## Required permissions

 * `tabs`
 * `sessions` (Firefox 57 and later)

## Usage

Load the file `TabFavIconHelper.js` from any sidebar panel or browser action panel, like:

```json
<script type="application/javascript" src="./TabFavIconHelper.js"></script>
```

And, call `TabFavIconHelper.loadToImage()` with required parameters like:

```javascript
var img = document.createElement('img');
browser.tabs.onUpdated.addListener((aTabId, aChangeInfo, aTab) => {
  TabFavIconHelper.loadToImage({
    image: img,
    tab:   aTab
  });
});
```

Here is the list of parameters:

 * `image`: An image element.
 * `tab`: A `tabs.Tab` object.
 * `url` (optional): A string of a URL, which is used as the favicon image instead of the tab's information.
   You can use this to set special image as an alternative facion.

When there is no effective favicon information, the img object given via `image` will get a class name `error`.
The class name will be removed if any effective favicon is found.
