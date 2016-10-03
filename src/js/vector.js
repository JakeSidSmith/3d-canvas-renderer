'use strict';

(function () {

  window.Vector = function Vector (x, y, z) {
    var self = this;
    self.x = parseFloat(x);
    self.y = parseFloat(y);
    self.z = parseFloat(z);

    self.add = function add (v) {
      self.x += v.x;
      self.y += v.y;
      self.z += v.z;
      return self;
    };

    self.sub = function add (v) {
      self.x -= v.x;
      self.y -= v.y;
      self.z -= v.z;
      return self;
    };

    self.mul = function add (v) {
      self.x *= v.x;
      self.y *= v.y;
      self.z *= v.z;
      return self;
    };

    self.div = function add (v) {
      self.x /= v.x;
      self.y /= v.y;
      self.z /= v.z;
      return self;
    };

    self.inv = function () {
      self.x *= -1;
      self.y *= -1;
      self.z *= -1;
      return self;
    };

    return self;
  };

})();
