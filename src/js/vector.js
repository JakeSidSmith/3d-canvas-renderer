'use strict';

(function () {

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

  function defineMethod (target, key, fn) {
    Object.defineProperty(target, key, {value: fn, enumerable: false});
  }

  window.Vector = function Vector (x, y, z) {
    var self = this;

    self.x = parseFloat(x);
    self.y = parseFloat(y);
    self.z = parseFloat(z);

    defineMethod(self, 'add', function add (v) {
      v = standardizeValue(v);
      self.x += v.x;
      self.y += v.y;
      self.z += v.z;
      return self;
    });

    defineMethod(self, 'sub', function sub (v) {
      v = standardizeValue(v);
      self.x -= v.x;
      self.y -= v.y;
      self.z -= v.z;
      return self;
    });

    defineMethod(self, 'mul', function mul (v) {
      v = standardizeValue(v);
      self.x *= v.x;
      self.y *= v.y;
      self.z *= v.z;
      return self;
    });

    defineMethod(self, 'div', function div (v) {
      v = standardizeValue(v);
      self.x /= v.x;
      self.y /= v.y;
      self.z /= v.z;
      return self;
    });

    defineMethod(self, 'inv', function inv () {
      self.x *= -1;
      self.y *= -1;
      self.z *= -1;
      return self;
    });

    return self;
  };

})();
