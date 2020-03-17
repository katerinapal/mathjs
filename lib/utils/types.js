'use strict';

var type_type = function(x) {
  var type = typeof x;

  if (type === 'object') {
    if (x === null)           return 'null';
    if (x instanceof Boolean) return 'boolean';
    if (x instanceof Number)  return 'number';
    if (x instanceof String)  return 'string';
    if (Array.isArray(x))     return 'Array';
    if (x instanceof Date)    return 'Date';
    if (x instanceof RegExp)  return 'RegExp';

    return 'Object';
  }

  if (type === 'function')    return 'Function';

  return type;
};

var isScalar_isScalar = function (x) {
  return !((x && x.isMatrix) || Array.isArray(x));
};

export { type_type as type };
export { isScalar_isScalar as isScalar };
