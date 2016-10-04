/* global Canvasimo */

'use strict';

(function () {

  window.Stage = function Stage (element) {
    var self = this;
    var shapes = [];
    var canvas = new Canvasimo(element);

    self.drawShape = function drawShape (shape) {
      canvas
        .forEach(shape.vertices, function (v) {
          var rx = canvas.getRadiansFromDegrees(shape.rx);
          var ry = canvas.getRadiansFromDegrees(shape.ry);
          var rz = canvas.getRadiansFromDegrees(shape.rz);

          var x = v.x;
          var y = v.y;
          var z = v.z;

          // x * x & z
          // y * y & z
          // z * x & y

          // Rotation X
          var distance = canvas.getDistance(0, 0, y, z);
          var angle = canvas.getAngle(0, 0, y, z);
          x = x;
          y = Math.cos(angle + rx) * distance;
          z = Math.sin(angle + rx) * distance;

          // Rotation Y
          distance = canvas.getDistance(0, 0, x, z);
          angle = canvas.getAngle(0, 0, x, z);
          x = Math.cos(angle + ry) * distance;
          y = y;
          z = Math.sin(angle + ry) * distance;

          // // Rotation Z
          distance = canvas.getDistance(0, 0, x, y);
          angle = canvas.getAngle(0, 0, x, y);
          x = Math.cos(angle + rz) * distance;
          y = Math.sin(angle + rz) * distance;
          z = z;

          x = shape.x + x * shape.sx;
          y = shape.y + y * shape.sy;
          z = shape.z + z * shape.sz;

          canvas
            .beginPath()
            .plotPixel(x, y)
            .closePath()
            .fill(canvas.createHSL(120 + z / 2, 100, 35));
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
