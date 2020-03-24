"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {};

describe('filter', function () {

  it('should filter an array with a filter function', function () {
    function isPositive(x) {
      return x > 0;
    }
    _assert2.default.deepEqual(_index.indexjs.filter([6, -2, -1, 4, 3], isPositive), [6, 4, 3]);
  });

  it('should filter a Matrix with a filter function', function () {
    function isPositive(x) {
      return x > 0;
    }
    _assert2.default.deepEqual(_index.indexjs.filter(_index.indexjs.matrix([6, -2, -1, 4, 3]), isPositive), _index.indexjs.matrix([6, 4, 3]));
  });

  it('should invoke callback with parameters value, index, obj', function () {
    var arr = [1, 2, 3];
    var log = [];

    _index.indexjs.filter(arr, function (value, index, obj) {
      log.push([value, index, obj === arr]);
      return true;
    }).valueOf();

    _assert2.default.deepEqual(log, [[1, [0], true], [2, [1], true], [3, [2], true]]);
  });

  it('should invoke a typed function with correct number of arguments (1)', function () {
    var output = [];
    _index.indexjs.filter([1, 2, 3], _index.indexjs.typed('callback', {
      'number': function number(value) {
        output.push(value + 2);
      }
    }));
    _assert2.default.deepEqual(output, [3, 4, 5]);
  });

  it('should invoke a typed function with correct number of arguments (2)', function () {
    var output = [];
    _index.indexjs.filter([1, 2, 3], _index.indexjs.typed('callback', {
      'number, Array': function numberArray(value, index) {
        output.push(value + 2);
      }
    }));
    _assert2.default.deepEqual(output, [3, 4, 5]);
  });

  it('should invoke a typed function with correct number of arguments (3)', function () {
    var output = [];
    _index.indexjs.filter([1, 2, 3], _index.indexjs.typed('callback', {
      'number, Array, Array': function numberArrayArray(value, index, array) {
        output.push(value + 2);
      }
    }));
    _assert2.default.deepEqual(output, [3, 4, 5]);
  });

  it('should filter an array with a regexp', function () {
    _assert2.default.deepEqual(_index.indexjs.filter(["23", "foo", "100", "55", "bar"], /[0-9]+/), ["23", "100", "55"]);
  });

  it('should filter a Matrix with a regexp', function () {
    _assert2.default.deepEqual(_index.indexjs.filter(_index.indexjs.matrix(["23", "foo", "100", "55", "bar"]), /[0-9]+/), _index.indexjs.matrix(["23", "100", "55"]));
  });

  it('should throw an error if called with a multi dimensional matrix', function () {
    function isPositive(x) {
      return x > 0;
    }
    _assert2.default.throws(function () {
      _index.indexjs.filter(_index.indexjs.matrix([[6, -2], [-1, 4]]), isPositive);
    }, /Only one dimensional matrices supported/);
  });

  it('should throw an error if called with unsupported type', function () {
    _assert2.default.throws(function () {
      _index.indexjs.filter(2, /regexp/);
    });
    _assert2.default.throws(function () {
      _index.indexjs.filter('string', /regexp/);
    });
    _assert2.default.throws(function () {
      _index.indexjs.filter([], 'string');
    });
    _assert2.default.throws(function () {
      _index.indexjs.filter([], {});
    });
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.filter([], /reg/, 'foo');
    });
    _assert2.default.throws(function () {
      _index.indexjs.filter([]);
    });
  });

  it('should LaTeX filter', function () {
    var expression = _index.indexjs.parse('filter(1,test)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{filter}\\left(1, test\\right)');
  });
});
