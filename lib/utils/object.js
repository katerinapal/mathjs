'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var clone_exportedObj = function clone(x) {
  var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);

  // immutable primitive types
  if (type === 'number' || type === 'string' || type === 'boolean' || x === null || x === undefined) {
    return x;
  }

  // use clone function of the object when available
  if (typeof x.clone === 'function') {
    return x.clone();
  }

  // array
  if (Array.isArray(x)) {
    return x.map(function (value) {
      return clone(value);
    });
  }

  if (x instanceof Number) return new Number(x.valueOf());
  if (x instanceof String) return new String(x.valueOf());
  if (x instanceof Boolean) return new Boolean(x.valueOf());
  if (x instanceof Date) return new Date(x.valueOf());
  if (x && x.isBigNumber === true) return x; // bignumbers are immutable
  if (x instanceof RegExp) throw new TypeError('Cannot clone ' + x); // TODO: clone a RegExp

  // object
  var m = {};
  for (var key in x) {
    if (x.hasOwnProperty(key)) {
      m[key] = clone(x[key]);
    }
  }
  return m;
};

var extend_exportedObj = function extend_exportedObj(a, b) {
  for (var prop in b) {
    if (b.hasOwnProperty(prop)) {
      a[prop] = b[prop];
    }
  }
  return a;
};

var deepExtend_exportedObj = function deepExtend(a, b) {
  // TODO: add support for Arrays to deepExtend
  if (Array.isArray(b)) {
    throw new TypeError('Arrays are not supported by deepExtend');
  }

  for (var prop in b) {
    if (b.hasOwnProperty(prop)) {
      if (b[prop] && b[prop].constructor === Object) {
        if (a[prop] === undefined) {
          a[prop] = {};
        }
        if (a[prop].constructor === Object) {
          deepExtend(a[prop], b[prop]);
        } else {
          a[prop] = b[prop];
        }
      } else if (Array.isArray(b[prop])) {
        throw new TypeError('Arrays are not supported by deepExtend');
      } else {
        a[prop] = b[prop];
      }
    }
  }
  return a;
};

var deepEqual_exportedObj = function deepEqual(a, b) {
  var prop, i, len;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }

    if (a.length != b.length) {
      return false;
    }

    for (i = 0, len = a.length; i < len; i++) {
      if (!deepEqual_exportedObj(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else if (a instanceof Object) {
    if (Array.isArray(b) || !(b instanceof Object)) {
      return false;
    }

    for (prop in a) {
      //noinspection JSUnfilteredForInLoop
      if (!deepEqual_exportedObj(a[prop], b[prop])) {
        return false;
      }
    }
    for (prop in b) {
      //noinspection JSUnfilteredForInLoop
      if (!deepEqual_exportedObj(a[prop], b[prop])) {
        return false;
      }
    }
    return true;
  } else {
    return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && a == b;
  }
};

var canDefineProperty_exportedObj = function canDefineProperty_exportedObj() {
  // test needed for broken IE8 implementation
  try {
    if (Object.defineProperty) {
      Object.defineProperty({}, 'x', { get: function get() {} });
      return true;
    }
  } catch (e) {}

  return false;
};

var lazy_exportedObj = function lazy_exportedObj(object, prop, fn) {
  if (canDefineProperty_exportedObj()) {
    var _uninitialized = true;
    var _value;
    Object.defineProperty(object, prop, {
      get: function get() {
        if (_uninitialized) {
          _value = fn();
          _uninitialized = false;
        }
        return _value;
      },

      set: function set(value) {
        _value = value;
        _uninitialized = false;
      },

      configurable: true,
      enumerable: true
    });
  } else {
    // fall back to immediate evaluation
    object[prop] = fn();
  }
};

var traverse_exportedObj = function traverse_exportedObj(object, path) {
  var obj = object;

  if (path) {
    var names = path.split('.');
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (!(name in obj)) {
        obj[name] = {};
      }
      obj = obj[name];
    }
  }

  return obj;
};

var isFactory_exportedObj = function isFactory_exportedObj(object) {
  return object && typeof object.factory === 'function';
};

exports.clone = clone_exportedObj;
exports.deepExtend = deepExtend_exportedObj;
exports.extend = extend_exportedObj;
exports.deepEqual = deepEqual_exportedObj;
exports.canDefineProperty = canDefineProperty_exportedObj;
exports.lazy = lazy_exportedObj;
exports.traverse = traverse_exportedObj;
exports.isFactory = isFactory_exportedObj;
