/* global Canvasimo */

'use strict';

(function () {

  var near = 1000;
  var far = -near;

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

    function perspective (v, scaleMult) {
      var offsetMult = canvas.constrain(canvas.map(v.z, far, near, 0.5, 1.5), 0.5, 1.5);
      v.x *= offsetMult * scaleMult;
      v.y *= offsetMult * scaleMult;
    }

    self.drawShape = function drawShape (shape) {
      var cachedVertices = [];

      var r = {
        x: canvas.getRadiansFromDegrees(shape.rx),
        y: canvas.getRadiansFromDegrees(shape.ry),
        z: canvas.getRadiansFromDegrees(shape.rz)
      };

      var scaleMult = canvas.constrain(canvas.map(shape.z, far, near, 0, 2), 0, 2);

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
        perspective(v, scaleMult);

        cachedVertices[index] = v;

        return v;
      }

      canvas
        .forEach(shape.faces, function (face) {
          var a = getVertex(shape.vertices[face.x], face.x);
          var b = getVertex(shape.vertices[face.y], face.y);
          var c = getVertex(shape.vertices[face.z], face.z);

          if (canvas.getAngle(a.x, a.y, b.x, b.y, c.x, c.y) >= 0) {
            return;
          }

          var depth = (a.z + b.z + c.z) / 3;

          canvas
            .beginPath()
            .moveTo(a.x, a.y)
            .lineTo(b.x, b.y)
            .lineTo(c.x, c.y)
            .closePath()
            .stroke(canvas.createHSL(120 + depth / 2, 100, 35));
        });
    };

    self.draw = function draw () {
      canvas
        .clearCanvas()
        .fillCanvas('#333')
        .setFontFamily('arial')
        .setFontSize(14)
        .setTextAlign('start')
        .setTextBaseline('top')
        .setFill('white')
        .fillText('Click and drag to rotate', 10, 10)
        .fillText('Hold shift to move', 10, 30)
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
