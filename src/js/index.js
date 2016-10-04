/* global Stage, Shape, get, getObjectProperties */

'use strict';

(function () {

  var teapot;
  var stage = new Stage(document.getElementById('canvas'));

  function scaleTeapot () {
    var scale = Math.min(window.innerWidth, window.innerHeight) / 10;
    teapot.setScale(scale, scale, scale);
  }

  window.addEventListener('resize', scaleTeapot);

  get(
    'objs/teapot.obj',
    function (response) {
      console.log('Loaded');

      var rotationX = 0;
      var rotationY = 0;
      var rotationZ = 0;

      var obj = getObjectProperties(response);
      teapot = new Shape(obj.vertices, obj.faces);
      teapot.setRotation(rotationX, rotationY, rotationZ);
      scaleTeapot();
      stage.add(teapot);

      setInterval(function () {
        rotationX += 0.5;
        rotationY += 1;
        rotationZ += 0.25;
        teapot.setRotation(rotationX, rotationY, rotationZ);
        stage.draw();
      }, 1000 / 30);
    },
    function (error) {
      throw new Error(error);
    }
  );

})();
