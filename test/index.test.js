'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../tools/approx'),
    math = require('../index');

describe('factory', function () {

  it('should get a default instance of mathjs', function () {
    _assert2.default.strictEqual(typeof math === 'undefined' ? 'undefined' : _typeof(math), 'object');
    _assert2.default.deepEqual(math.config(), {
      matrix: 'Matrix',
      number: 'number',
      precision: 64,
      predictable: false,
      epsilon: 1e-12
    });
  });

  it('should create an instance of math.js with custom configuration', function () {
    var math1 = math.create({
      matrix: 'Array',
      number: 'BigNumber'
    });

    _assert2.default.strictEqual(typeof math1 === 'undefined' ? 'undefined' : _typeof(math1), 'object');
    _assert2.default.deepEqual(math1.config(), {
      matrix: 'Array',
      number: 'BigNumber',
      precision: 64,
      predictable: false,
      epsilon: 1e-12
    });
  });

  it('two instances of math.js should be isolated from each other', function () {
    var math1 = math.create();
    var math2 = math.create({
      matrix: 'Array'
    });

    _assert2.default.notStrictEqual(math, math1);
    _assert2.default.notStrictEqual(math, math2);
    _assert2.default.notStrictEqual(math1, math2);
    _assert2.default.notDeepEqual(math1.config(), math2.config());
    _assert2.default.notDeepEqual(math.config(), math2.config());

    // changing config should not affect the other
    math1.config({ number: 'BigNumber' });
    _assert2.default.strictEqual(math.config().number, 'number');
    _assert2.default.strictEqual(math1.config().number, 'BigNumber');
    _assert2.default.strictEqual(math2.config().number, 'number');
  });

  it('should apply configuration using the config function', function () {
    var math1 = math.create();

    var config = math1.config();
    _assert2.default.deepEqual(config, {
      matrix: 'Matrix',
      number: 'number',
      precision: 64,
      predictable: false,
      epsilon: 1e-12
    });

    // restore the original config
    math1.config(config);
  });

  // TODO: test whether the namespace is correct: has functions like sin, constants like pi, objects like type and error.

  it('should throw an error when ES5 is not supported', function () {
    var create = Object.create;
    Object.create = undefined; // fake missing Object.create function

    _assert2.default.throws(function () {
      var math1 = math.create();
    }, /ES5 not supported/);

    // restore Object.create
    Object.create = create;
  });
});
