'use strict';

(function () {

  if (!window.performance || typeof window.performance.now !== 'function') {
    window.performance.now = function () {
      return new Date().getTime();
    };
  }

})();
