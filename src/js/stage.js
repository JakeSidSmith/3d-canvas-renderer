/* global Canvasimo */

'use strict';

(function () {

  window.Stage = function Stage (element) {
    var self = this;
    var shapes = [];
    var canvas = new Canvasimo(element);

    function rotateDirection (direction, axis1, axis2, v, r) {
      var distance = canvas.getDistance(0, 0, v[axis1], v[axis2]);
      var angle = canvas.getAngle(0, 0, v[axis1], v[axis2]);
      v[axis1] = Math.cos(angle + r[direction]) * distance;
      v[axis2] = Math.sin(angle + r[direction]) * distance;
    }

    var rotateX = rotateDirection.bind(null, 'x', 'y', 'z');
    var rotateY = rotateDirection.bind(null, 'y', 'x', 'z');
    var rotateZ = rotateDirection.bind(null, 'z', 'x', 'y');

    function rotate (v, r) {
      rotateX(v, r);
      rotateY(v, r);
      rotateZ(v, r);
    };

    function anchor (v, shape) {
      v.x -= shape.ax;
      v.y -= shape.ay;
      v.z -= shape.az;
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
      var cachedVertices = [];

      var r = {
        x: canvas.getRadiansFromDegrees(shape.rx),
        y: canvas.getRadiansFromDegrees(shape.ry),
        z: canvas.getRadiansFromDegrees(shape.rz)
      };

      function getVertex (vertex, index) {
        if (typeof cachedVertices[index] !== 'undefined') {
          return cachedVertices[index];
        }

        var v = {
          x: vertex.x,
          y: vertex.y,
          z: vertex.z
        };

        // Rotation X
        anchor(v, shape);
        scale(v, shape);
        rotate(v, r);
        translate(v, shape);

        cachedVertices[index] = v;

        return v;
      }

      canvas
        .forEach(shape.vertices, function (vertex, index) {
          var v = getVertex(vertex, index);

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
