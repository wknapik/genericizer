'use strict';

document.addEventListener('modifyNavigator', function(e) {
    Object.defineProperties(navigator, e.detail.props);
});
