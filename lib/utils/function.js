'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var memoize_memoize = function memoize_memoize(fn, hasher) {
  return function memoize() {
    if (_typeof(memoize.cache) !== 'object') {
      memoize.cache = {};
    }

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    var hash = hasher ? hasher(args) : JSON.stringify(args);
    if (!(hash in memoize.cache)) {
      return memoize.cache[hash] = fn.apply(fn, args);
    }
    return memoize.cache[hash];
  };
};

var maxArgumentCount_maxArgumentCount = function maxArgumentCount_maxArgumentCount(fn) {
  return Object.keys(fn.signatures || {}).reduce(function (args, signature) {
    var count = (signature.match(/,/g) || []).length + 1;
    return Math.max(args, count);
  }, -1);
};

exports.memoize = memoize_memoize;
exports.maxArgumentCount = maxArgumentCount_maxArgumentCount;
