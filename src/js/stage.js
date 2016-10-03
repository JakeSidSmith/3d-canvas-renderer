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
          var scaledX = shape.x + v.x * shape.sx;
          var scaledY = shape.y + v.y * shape.sy;

          var distanceXY = canvas.getDistance(0, 0, scaledX, scaledY);
          var angleZ = canvas.getAngle(0, 0, scaledX, scaledY);

          var rotatedX = Math.cos(angleZ + canvas.getRadiansFromDegrees(shape.rz)) * distanceXY;
          var rotatedY = Math.sin(angleZ + canvas.getRadiansFromDegrees(shape.rz)) * distanceXY;
          // var z = shape.z + v.z * shape.sz;

          canvas
            .beginPath()
            .plotPixel(rotatedX, rotatedY)
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
