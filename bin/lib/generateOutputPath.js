'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var path = require('path');

module.exports = function generateOutput(moduleName, srcDir, isNative) {
  var splitName = moduleName.split('.');

  if (isNative) {
    return path.join.apply(path, [srcDir, 'Native'].concat(_toConsumableArray(splitName))) + '.js';
  }

  return path.join.apply(path, [srcDir].concat(_toConsumableArray(splitName))) + '.elm';
};