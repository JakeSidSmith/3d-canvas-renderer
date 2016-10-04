/* global each */

'use strict';

(function () {

  window.Shape = function Shape (vertices, faces) {
    var self = this;
    self.vertices = vertices;
    self.faces = faces;
    self.x = 0;
    self.y = 0;
    self.z = 0;
    self.sx = 1;
    self.sy = 1;
    self.sz = 1;
    self.rx = 0;
    self.ry = 0;
    self.rz = 0;

    self.invert = function invert () {
      each(self.vertices, function (v) {
        v.inv();
      });
    };

    self.setScale = function scale (sx, sy, sz) {
      self.sx = sx;
      self.sy = sy;
      self.sz = sz;
    };

    self.setRotation = function scale (rx, ry, rz) {
      self.rx = rx;
      self.ry = ry;
      self.rz = rz;
    };

    return self;
  };

})();
