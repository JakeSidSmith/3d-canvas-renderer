/* global Stage, Shape, get, getObjectProperties */

'use strict';

(function () {

  var teapot;
  var rotationX = 0;
  var rotationY = 0;
  var rotationZ = 0;
  var prevTime = new Date().getTime();
  var stage = new Stage(document.getElementById('canvas'));

  function scaleTeapot () {
    var scale = Math.min(window.innerWidth, window.innerHeight) / 10;
    teapot.setScale(scale, scale, scale);
  }

  function update () {
    var nextTime = new Date().getTime();
    var delta = (nextTime - prevTime) * 0.1;

    rotationX += delta * 0.5;
    rotationY += delta * 1;
    rotationZ += delta * 0.25;
    teapot.setRotation(rotationX, rotationY, rotationZ);
    stage.draw();

    prevTime = nextTime;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('resize', scaleTeapot);

  get(
    'objs/teapot.obj',
    function (response) {
      var obj = getObjectProperties(response);
      teapot = new Shape(obj.vertices, obj.faces);
      teapot.setRotation(rotationX, rotationY, rotationZ);
      scaleTeapot();
      stage.add(teapot);

      window.requestAnimationFrame(update);
    },
    function (error) {
      throw new Error(error);
    }
  );

})();
