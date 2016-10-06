/* global Vector */

'use strict';

(function () {

  var spaces = /\s+/;
  window.spaces = spaces;

  window.getLinesBeginningWith = function getLinesBeginningWith (text, prefix) {
    var reg = new RegExp('(^' + prefix + '.*$\\n?)+', 'm');

    var res = reg.exec(text);

    if (res) {
      var lines = res[0].split('\n');

      // Remove trailing empty line
      if (!lines[lines.length - 1].replace(spaces, '')) {
        lines.pop();
      }

      return lines || [];
    }

    return [];
  };

  window.getObjectProperties = function getObjectProperties (response) {
    var vertices = window.getLinesBeginningWith(response, 'v ').map(function (v) {
      var parts = v.split(spaces);
      var vertex = new Vector(parts[1], parts[2], parts[3]);
      return vertex;
    });

    var faces = window.getLinesBeginningWith(response, 'f ').map(function (v) {
      var parts = v.split(spaces);
      var vertex = new Vector(parts[1], parts[2], parts[3]);
      // Vertex indices start at 1, but javascript indices start at zero, so we minus 1 from every vertex
      vertex.sub(1, 1, 1);
      return vertex;
    });

    return {
      vertices: vertices,
      faces: faces
    };
  };

  window.each = function each (obj, fn) {
    if (Array.isArray(obj) || typeof obj === 'string') {
      for (var i = 0; i < obj.length; i += 1) {
        fn(obj[i], i);
      }
    } else if (typeof obj === 'object') {
      for (var key in obj) {
        fn(obj[key], key);
      }
    }
  };

  window.get = function get (path, success, failure, asynchronous) {
    if (!path) {
      throw new Error('No path specified.');
    }

    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 200 && typeof success === 'function') {
          success(req.responseText);
        } else if (typeof failure === 'function') {
          failure(req.statusText);
        }
      }
    };

    req.open('GET', path, typeof asynchronous === 'undefined' ? true : asynchronous);
    req.send();
  };

})();
