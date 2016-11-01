'use strict';

var defaults = {
    'userAgent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
};

var currentListener;
var setUserAgent = function(userAgent) {
    var listener = function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i)
            if (details.requestHeaders[i].name === 'User-Agent') {
                details.requestHeaders[i].value = userAgent;
                break;
            }
        return { requestHeaders: details.requestHeaders };
    };
    if (currentListener)
        chrome.webRequest.onBeforeSendHeaders.removeListener(currentListener);
    chrome.webRequest.onBeforeSendHeaders.addListener(listener, { urls: ['<all_urls>'] }, ['blocking', 'requestHeaders']);
    currentListener = listener;
}

chrome.storage.local.get('userAgent', function(items) {
    if (items.userAgent && items.userAgent.length > 0)
        setUserAgent(items.userAgent);
    else
        chrome.storage.local.set({ userAgent: defaults.userAgent }, function() {
            setUserAgent(defaults.userAgent);
        });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace == 'local' && 'userAgent' in changes)
        setUserAgent(changes.userAgent.newValue);
});
