'use strict';

var scr = document.createElement('script');
scr.src = chrome.extension.getURL('window.js');
scr.onload = function() { scr.remove(); };
(document.head || document.documentElement).appendChild(scr);

chrome.storage.local.get('userAgent', function(items) {
    var props = getNewNavigatorProps(items.userAgent);
    setTimeout(function() {
        document.dispatchEvent(new CustomEvent('modifyNavigator', {
            detail: { props: props }
        }));
    }, 0);
});

var getNewNavigatorProps = function(userAgent) {
    var plugins = { length: 0 };
    Object.setPrototypeOf(plugins, Object.getPrototypeOf(navigator.plugins));
    var mimeTypes = { length: 0 };
    Object.setPrototypeOf(mimeTypes, Object.getPrototypeOf(navigator.mimeTypes));

    var profile = {
        appVersion: userAgent.replace('Mozilla/', ''),
        language: 'en-US',
        languages: ['en-US'],
        mimeTypes: mimeTypes,
        plugins: plugins,
        userAgent: userAgent
    };

    var props = Object.keys(profile).reduce(function(acc, e) {
        acc[e] = {
            value: profile[e],
            configurable: false,
            enumerable: true,
            writable: false
        };
        return acc;
    }, {});

    return props;
};
