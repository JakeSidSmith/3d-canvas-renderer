/* global Canvasimo, Vector */

'use strict';

(function () {

  window.Stage = function Stage (element) {
    var self = this;
    var shapes = [];
    var canvas = new Canvasimo(element);

    function rotate (direction, axis1, axis2, v, r) {
      var distance = canvas.getDistance(0, 0, v[axis1], v[axis2]);
      var angle = canvas.getAngle(0, 0, v[axis1], v[axis2]);
      v[axis1] = Math.cos(angle + r[direction]) * distance;
      v[axis2] = Math.sin(angle + r[direction]) * distance;
    }

    rotate.x = rotate.bind(null, 'x', 'y', 'z');
    rotate.y = rotate.bind(null, 'y', 'x', 'z');
    rotate.z = rotate.bind(null, 'z', 'x', 'z');

    rotate.all = function rotateAll (v, r) {
      rotate.x(v, r);
      rotate.y(v, r);
      rotate.z(v, r);
    }

    function scale (v, shape) {
      v.x *= shape.sx;
      v.y *= shape.sy;
      v.z *= shape.sz;
    }

    function translate (v, shape) {
      v.x += shape.x;
      v.y += shape.y;
      v.z += shape.z;
    }

    self.drawShape = function drawShape (shape) {
      canvas
        .forEach(shape.vertices, function (vertex) {
          var r = {
            x: canvas.getRadiansFromDegrees(shape.rx),
            y: canvas.getRadiansFromDegrees(shape.ry),
            z: canvas.getRadiansFromDegrees(shape.rz)
          };

          var v = {
            x: vertex.x,
            y: vertex.y,
            z: vertex.z
          };

          // Rotation X
          rotate.all(v, r);
          scale(v, shape);
          translate(v, shape);

          canvas
            .beginPath()
            .plotPixel(v.x, v.y)
            .closePath()
            .fill(canvas.createHSL(120 + v.z / 2, 100, 35));
        });
    };

    self.draw = function draw () {
      canvas
        .clearCanvas()
        .translate(canvas.getWidth() / 2, canvas.getHeight() / 2)
        .forEach(shapes, function (shape) {
          self.drawShape(shape);
        });
    };

    self.autoSize = function autoSize () {
      canvas.setSize(window.innerWidth, window.innerHeight);
      self.draw();
    };

    self.autoSize();

    window.addEventListener('resize', self.autoSize);

    self.add = function add (shape) {
      shapes.push(shape);
      self.draw();
    };

    return self;
  };

})();
