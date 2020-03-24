"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../lib/error/index");

var _seedRandom = require("seed-random");

var _seedRandom2 = _interopRequireDefault(_seedRandom);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _index2 = require("../../../index");

var _distribution = require("../../../lib/function/probability/distribution");

var libfunctionprobabilitydistribution_obj = _interopRequireWildcard(_distribution);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.indexjs.import(libfunctionprobabilitydistribution_obj);

var Matrix = _index2.indexjs.type.Matrix;
var distribution = _index2.indexjs.distribution;

var assertApproxEqual = function assertApproxEqual(testVal, val, tolerance) {
  var diff = Math.abs(val - testVal);
  if (diff > tolerance) _assert2.default.equal(testVal, val);else _assert2.default.ok(diff <= tolerance);
};

var assertUniformDistribution = function assertUniformDistribution(values, min, max) {
  var interval = (max - min) / 10,
      count,
      i;
  count = _underscore2.default.filter(values, function (val) {
    return val < min;
  }).length;
  _assert2.default.equal(count, 0);
  count = _underscore2.default.filter(values, function (val) {
    return val > max;
  }).length;
  _assert2.default.equal(count, 0);

  for (i = 0; i < 10; i++) {
    count = _underscore2.default.filter(values, function (val) {
      return val >= min + i * interval && val < min + (i + 1) * interval;
    }).length;
    assertApproxEqual(count / values.length, 0.1, 0.02);
  }
};

var assertUniformDistributionInt = function assertUniformDistributionInt(values, min, max) {
  var range = _underscore2.default.range(Math.floor(min), Math.floor(max)),
      count;

  values.forEach(function (val) {
    _assert2.default.ok(_underscore2.default.contains(range, val));
  });

  range.forEach(function (val) {
    count = _underscore2.default.filter(values, function (testVal) {
      return testVal === val;
    }).length;
    assertApproxEqual(count / values.length, 1 / range.length, 0.03);
  });
};

describe('distribution', function () {
  var originalRandom, uniformDistrib;

  before(function () {
    // replace the original Math.random with a reproducible one
    originalRandom = Math.random;
    Math.random = (0, _seedRandom2.default)('key');
  });

  after(function () {
    // restore the original random function
    Math.random = originalRandom;
  });

  beforeEach(function () {
    uniformDistrib = distribution('uniform');
  });

  describe('random', function () {
    var originalRandom;

    it('should pick uniformly distributed numbers in [0, 1]', function () {
      var picked = [];

      _underscore2.default.times(1000, function () {
        picked.push(uniformDistrib.random());
      });
      assertUniformDistribution(picked, 0, 1);
    });

    it('should pick uniformly distributed numbers in [min, max]', function () {
      var picked = [];

      _underscore2.default.times(1000, function () {
        picked.push(uniformDistrib.random(-10, 10));
      });
      assertUniformDistribution(picked, -10, 10);
    });

    it('should pick uniformly distributed random array, with elements in [0, 1]', function () {
      var picked = [],
          matrices = [],
          size = [2, 3, 4];

      _underscore2.default.times(100, function () {
        matrices.push(uniformDistrib.random(size));
      });

      // Collect all values in one array
      matrices.forEach(function (matrix) {
        (0, _assert2.default)(Array.isArray(matrix));
        _assert2.default.deepEqual(_index2.indexjs.size(matrix), size);
        _index2.indexjs.forEach(matrix, function (val) {
          picked.push(val);
        });
      });
      _assert2.default.equal(picked.length, 2 * 3 * 4 * 100);

      assertUniformDistribution(picked, 0, 1);
    });

    it('should pick uniformly distributed random array, with elements in [0, max]', function () {
      var picked = [],
          matrices = [],
          size = [2, 3, 4];

      _underscore2.default.times(100, function () {
        matrices.push(uniformDistrib.random(size, 8));
      });

      // Collect all values in one array
      matrices.forEach(function (matrix) {
        (0, _assert2.default)(Array.isArray(matrix));
        _assert2.default.deepEqual(_index2.indexjs.size(matrix), size);
        _index2.indexjs.forEach(matrix, function (val) {
          picked.push(val);
        });
      });
      _assert2.default.equal(picked.length, 2 * 3 * 4 * 100);

      assertUniformDistribution(picked, 0, 8);
    });

    it('should pick uniformly distributed random matrix, with elements in [0, 1]', function () {
      var picked = [],
          matrices = [],
          size = _index2.indexjs.matrix([2, 3, 4]);

      _underscore2.default.times(100, function () {
        matrices.push(uniformDistrib.random(size));
      });

      // Collect all values in one array
      matrices.forEach(function (matrix) {
        (0, _assert2.default)(matrix instanceof Matrix);
        _assert2.default.deepEqual(matrix.size(), size.valueOf());
        matrix.forEach(function (val) {
          picked.push(val);
        });
      });
      _assert2.default.equal(picked.length, 2 * 3 * 4 * 100);

      assertUniformDistribution(picked, 0, 1);
    });

    it('should pick uniformly distributed random array, with elements in [min, max]', function () {
      var picked = [],
          matrices = [],
          size = [2, 3, 4];

      _underscore2.default.times(100, function () {
        matrices.push(uniformDistrib.random(size, -103, 8));
      });

      // Collect all values in one array
      matrices.forEach(function (matrix) {
        _assert2.default.deepEqual(_index2.indexjs.size(matrix), size);
        _index2.indexjs.forEach(matrix, function (val) {
          picked.push(val);
        });
      });
      _assert2.default.equal(picked.length, 2 * 3 * 4 * 100);
      assertUniformDistribution(picked, -103, 8);
    });

    it.skip('should throw an error if called with invalid arguments', function () {
      _assert2.default.throws(function () {
        uniformDistrib.random(1, 2, [4, 8]);
      });
      _assert2.default.throws(function () {
        uniformDistrib.random(1, 2, 3, 6);
      });

      _assert2.default.throws(function () {
        uniformDistrib.random('str', 10);
      });
      _assert2.default.throws(function () {
        uniformDistrib.random(_index2.indexjs.bignumber(-10), 10);
      });
    });
  });

  describe('randomInt', function () {

    it('should pick uniformly distributed integers in [min, max)', function () {
      var picked = [];

      _underscore2.default.times(10000, function () {
        picked.push(uniformDistrib.randomInt(-15, -5));
      });

      assertUniformDistributionInt(picked, -15, -5);
    });

    it('should pick uniformly distributed random array, with elements in [min, max)', function () {
      var picked = [],
          matrices = [],
          size = [2, 3, 4];

      _underscore2.default.times(1000, function () {
        matrices.push(uniformDistrib.randomInt(size, -14.9, -2));
      });

      // Collect all values in one array
      matrices.forEach(function (matrix) {
        _assert2.default.deepEqual(_index2.indexjs.size(matrix), size);
        _index2.indexjs.forEach(matrix, function (val) {
          picked.push(val);
        });
      });
      _assert2.default.equal(picked.length, 2 * 3 * 4 * 1000);
      assertUniformDistributionInt(picked, -14.9, -2);
    });

    it('should throw an error if called with invalid arguments', function () {
      _assert2.default.throws(function () {
        uniformDistrib.randomInt(1, 2, [4, 8]);
      });

      _assert2.default.throws(function () {
        uniformDistrib.randomInt(1, 2, 3, 6);
      });
    });
  });

  describe('pickRandom', function () {

    it('should pick numbers from the given array following an uniform distribution', function () {
      var possibles = [11, 22, 33, 44, 55],
          picked = [],
          count;

      _underscore2.default.times(1000, function () {
        picked.push(uniformDistrib.pickRandom(possibles));
      });

      count = _underscore2.default.filter(picked, function (val) {
        return val === 11;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);

      count = _underscore2.default.filter(picked, function (val) {
        return val === 22;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);

      count = _underscore2.default.filter(picked, function (val) {
        return val === 33;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);

      count = _underscore2.default.filter(picked, function (val) {
        return val === 44;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);

      count = _underscore2.default.filter(picked, function (val) {
        return val === 55;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);
    });

    it('should pick numbers from the given matrix following an uniform distribution', function () {
      var possibles = _index2.indexjs.matrix([11, 22, 33, 44, 55]),
          picked = [],
          count;

      _underscore2.default.times(1000, function () {
        picked.push(uniformDistrib.pickRandom(possibles));
      });

      count = _underscore2.default.filter(picked, function (val) {
        return val === 11;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);

      count = _underscore2.default.filter(picked, function (val) {
        return val === 22;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);

      count = _underscore2.default.filter(picked, function (val) {
        return val === 33;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);

      count = _underscore2.default.filter(picked, function (val) {
        return val === 44;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);

      count = _underscore2.default.filter(picked, function (val) {
        return val === 55;
      }).length;
      _assert2.default.equal(_index2.indexjs.round(count / picked.length, 1), 0.2);
    });

    it('should throw an error when providing a multi dimensional matrix', function () {
      _assert2.default.throws(function () {
        uniformDistrib.pickRandom(_index2.indexjs.matrix([[1, 2], [3, 4]]));
      }, /Only one dimensional vectors supported/);
    });
  });

  describe('distribution.normal', function () {

    it('should pick numbers in [0, 1] following a normal distribution', function () {
      var picked = [],
          count,
          dist = distribution('normal');

      _underscore2.default.times(100000, function () {
        picked.push(dist.random());
      });
      count = _underscore2.default.filter(picked, function (val) {
        return val < 0;
      }).length;
      _assert2.default.equal(count, 0);
      count = _underscore2.default.filter(picked, function (val) {
        return val > 1;
      }).length;
      _assert2.default.equal(count, 0);

      count = _underscore2.default.filter(picked, function (val) {
        return val < 0.25;
      }).length;
      assertApproxEqual(count / picked.length, 0.07, 0.01);
      count = _underscore2.default.filter(picked, function (val) {
        return val < 0.4;
      }).length;
      assertApproxEqual(count / picked.length, 0.27, 0.01);
      count = _underscore2.default.filter(picked, function (val) {
        return val < 0.5;
      }).length;
      assertApproxEqual(count / picked.length, 0.5, 0.01);
      count = _underscore2.default.filter(picked, function (val) {
        return val < 0.6;
      }).length;
      assertApproxEqual(count / picked.length, 0.73, 0.01);
      count = _underscore2.default.filter(picked, function (val) {
        return val < 0.75;
      }).length;
      assertApproxEqual(count / picked.length, 0.93, 0.01);
    });
  });

  it('should throw an error in case of unknown distribution name', function () {
    _assert2.default.throws(function () {
      distribution('non-existing');
    }, /Unknown distribution/);
  });

  it('created random functions should throw an error in case of wrong number of arguments', function () {
    var dist = distribution('uniform');
    _assert2.default.throws(function () {
      dist.random([2, 3], 10, 100, 12);
    }, _index.indexjs.ArgumentsError);
    _assert2.default.throws(function () {
      dist.randomInt([2, 3], 10, 100, 12);
    }, _index.indexjs.ArgumentsError);
    _assert2.default.throws(function () {
      dist.pickRandom();
    }, _index.indexjs.ArgumentsError);
    _assert2.default.throws(function () {
      dist.pickRandom([], 23);
    }, _index.indexjs.ArgumentsError);
  });

  it('created random functions should throw an error in case of wrong type of arguments', function () {
    var dist = distribution('uniform');
    _assert2.default.throws(function () {
      dist.pickRandom(23);
    }, _index.indexjs.TypeError);
    // TODO: more type testing...
  });

  it('should LaTeX distribution', function () {
    var expression = _index2.indexjs.parse('distribution("normal")');
    _assert2.default.equal(expression.toTex(), '\\mathrm{distribution}\\left(\\mathtt{"normal"}\\right)');
  });
});
