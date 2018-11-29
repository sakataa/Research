(function () {
  'use strict';
  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker1.js')
      .then(function (registration) {
        console.log('Registration successful, scope is:', registration.scope);
      })
      .catch(function (error) {
        console.log('Service worker registration failed, error:', error);
      });

  }
})();