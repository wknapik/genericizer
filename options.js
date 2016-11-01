'use strict';

function saveOptions() {
    chrome.storage.local.set({
        userAgent: document.getElementById('userAgent').value
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);
    });
}

function restoreOptions() {
    chrome.storage.local.get('userAgent', function(items) {
        document.getElementById('userAgent').value = items.userAgent;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
