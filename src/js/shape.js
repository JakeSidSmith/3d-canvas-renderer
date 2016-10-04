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
    self.ax = 0;
    self.ay = 0;
    self.az = 0;
    self.sx = 1;
    self.sy = 1;
    self.sz = 1;
    self.rx = 0;
    self.ry = 0;
    self.rz = 0;

    // minX, minY, minZ, maxX, maxY, maxZ, lengthX, lengthY, lengthZ
    function getDimensions () {
      for (var i = 0; i < vertices.length; i += 1) {
        var v = vertices[i];

        if (typeof self.minX === 'undefined' || v.x < self.minX) {
          self.minX = v.x;
        }

        if (typeof self.minY === 'undefined' || v.y < self.minY) {
          self.minY = v.y;
        }

        if (typeof self.minZ === 'undefined' || v.z < self.minZ) {
          self.minZ = v.z;
        }

        if (typeof self.maxX === 'undefined' || v.x > self.maxX) {
          self.maxX = v.x;
        }

        if (typeof self.maxY === 'undefined' || v.y > self.maxY) {
          self.maxY = v.y;
        }

        if (typeof self.maxZ === 'undefined' || v.z > self.maxZ) {
          self.maxZ = v.z;
        }
      }

      self.lengthX = Math.abs(self.maxX - self.minX);
      self.lengthY = Math.abs(self.maxY - self.minY);
      self.lengthZ = Math.abs(self.maxZ - self.minZ);
    }

    getDimensions();

    self.invert = function invert () {
      each(self.vertices, function (v) {
        v.inv();
      });
    };

    self.scale = function scale (sx, sy, sz) {
      self.sx = sx;
      self.sy = sy;
      self.sz = sz;
    };

    self.rotate = function scale (rx, ry, rz) {
      self.rx = rx;
      self.ry = ry;
      self.rz = rz;
    };

    self.translate = function (x, y, z) {
      self.x = x;
      self.y = y;
      self.z = z;
    };

    self.anchor = function (ax, ay, az) {
      self.ax = ax;
      self.ay = ay;
      self.az = az;
    };

    return self;
  };

})();
