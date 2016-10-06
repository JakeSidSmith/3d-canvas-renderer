/* global Vector, Stage, Shape, get, getObjectProperties */

'use strict';

(function () {

  var teapot;
  var down = false;
  var pmouse = null;
  var rotationVelocity = new Vector(0, 0, 0);
  var rotation = new Vector(0, 0, 0);
  var translationVelocity = new Vector(0, 0, 0);
  var translation = new Vector(0, 0, 0);
  // var prevTime = performance.now();
  var stage = new Stage(document.getElementById('canvas'));

  function scaleTeapot () {
    var scale = Math.min(window.innerWidth, window.innerHeight) / 2.5;
    teapot.scale(scale, scale, scale);
  }

  function update () {
    // var nextTime = performance.now();
    // var delta = (nextTime - prevTime) * 0.02; // Roughly 1

    rotation.add(rotationVelocity);
    translation.add(translationVelocity);

    teapot.rotate(rotation.x, rotation.y, rotation.z);
    teapot.translate(translation.x, translation.y, translation.z);
    stage.draw();

    rotationVelocity.mul(0.9);
    translationVelocity.mul(0.9);

    // prevTime = nextTime;
    window.requestAnimationFrame(update);
  }

  function mouseDown (event) {
    event.preventDefault();
    down = true;
  }

  function mouseMove (event) {
    if (event.touches && event.touches.length) {
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
    }

    console.log(event);

    if (down && pmouse) {
      if (event.shiftKey) {
        translationVelocity.add({
          x: 0,
          y: 0,
          z: (event.clientY - pmouse.clientY) / 2
        });
      } else {
        rotationVelocity.add({
          x: (pmouse.clientY - event.clientY) / 20,
          y: (pmouse.clientX - event.clientX) / 20,
          z: 0
        });
      }
    }

    pmouse = {
      clientX: event.clientX,
      clientY: event.clientY
    };
  }

  function mouseUp () {
    down = false;
    pmouse = null;
  }

  window.addEventListener('mousedown', mouseDown);
  window.addEventListener('touchstart', mouseDown);

  window.addEventListener('mousemove', mouseMove);
  window.addEventListener('touchmove', mouseMove);

  window.addEventListener('mouseup', mouseUp);
  window.addEventListener('touchend', mouseUp);

  window.addEventListener('resize', window.requestAnimationFrame.bind(null, scaleTeapot));

  get(
    'objs/wt_teapot.obj',
    function (response) {
      var obj = getObjectProperties(response);
      teapot = new Shape(obj.vertices, obj.faces);
      // Some .obj files are inverted and therefore must be inverted
      teapot.invert();
      // Adjust the anchor to be in the very center of the teapot
      teapot.anchor(0, -teapot.lengthY / 2, 0);
      scaleTeapot();
      stage.add(teapot);

      window.requestAnimationFrame(update);
    },
    function (error) {
      throw new Error(error);
    }
  );

})();
