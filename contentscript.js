'use strict';

var actualCode = function() {
    'use strict';

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

    Object.defineProperties(navigator, props);
};

chrome.storage.local.get('userAgent', function(items) { 
    var code = 'var userAgent = "' + items.userAgent + '"; (' + actualCode + ')();';
    document.documentElement.setAttribute('onreset', code);
    document.documentElement.dispatchEvent(new CustomEvent('reset'));
    document.documentElement.removeAttribute('onreset');
});
