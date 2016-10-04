'use strict';

(function () {

  window.Vector = function Vector (x, y, z) {
    var self = this;

    self.x = parseFloat(x);
    self.y = parseFloat(y);
    self.z = parseFloat(z);

    function standardizeValue (v) {
      if (typeof v !== 'object') {
        return {
          x: v,
          y: v,
          z: v
        };
      }

      return v;
    }

    self.add = function add (v) {
      v = standardizeValue(v);
      self.x += v.x;
      self.y += v.y;
      self.z += v.z;
      return self;
    };

    self.sub = function add (v) {
      v = standardizeValue(v);
      self.x -= v.x;
      self.y -= v.y;
      self.z -= v.z;
      return self;
    };

    self.mul = function add (v) {
      v = standardizeValue(v);
      self.x *= v.x;
      self.y *= v.y;
      self.z *= v.z;
      return self;
    };

    self.div = function add (v) {
      v = standardizeValue(v);
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
