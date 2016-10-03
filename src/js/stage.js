/* global Canvasimo */

'use strict';

(function () {

  // var far = 1000;
  // var close = -1000;

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

          var scaledX = shape.x + v.x * shape.sx;
          var scaledY = shape.y + v.y * shape.sy;
          var scaledZ = shape.z + v.z * shape.sz;

          // x * x & z
          // y * y & z
          // z * x & y

          var x = Math.cos(rx) * scaledX + Math.sin(rx) * scaledZ;
          var y = Math.cos(ry) * scaledY + Math.sin(ry) * scaledZ;
          var z = Math.cos(rx) * scaledZ + Math.sin(rx) * scaledX + Math.cos(ry) * scaledZ + Math.sin(ry) * scaledY;

          canvas
            .beginPath()
            .plotPixel(x, y)
            .closePath()
            .fill('black');
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
