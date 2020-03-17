'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var Spa = math.type.Spa;

describe('Spa', function () {

  describe('constructor', function () {

    it('should throw an error when called without new keyword', function () {
      _assert2.default.throws(function () {
        Spa();
      }, /Constructor must be called with the new operator/);
    });

    it('should have a property isSpa', function () {
      var a = new Spa();
      _assert2.default.strictEqual(a.isSpa, true);
    });

    it('should have a property type', function () {
      var a = new Spa();
      _assert2.default.strictEqual(a.type, 'Spa');
    });
  });

  describe('test', function () {

    it('should add value when no value exists for row', function () {
      var spa = new Spa(10);
      spa.set(5, 0.5);
      (0, _assert2.default)(spa._values[5]);
      (0, _assert2.default)(spa._values[5].value);
      _assert2.default.equal(spa._values[5].value, 0.5);
    });

    it('should set value when value exists for row', function () {
      var spa = new Spa(10);
      spa.set(5, 0.5);
      (0, _assert2.default)(spa._values[5]);
      (0, _assert2.default)(spa._values[5].value);
      _assert2.default.equal(spa._values[5].value, 0.5);
      spa.set(5, 1.5);
      (0, _assert2.default)(spa._values[5]);
      (0, _assert2.default)(spa._values[5].value);
      _assert2.default.equal(spa._values[5].value, 1.5);
    });
  });

  describe('get', function () {

    it('should get zero when no value exists for row', function () {
      var spa = new Spa(10);
      var v = spa.get(5);
      _assert2.default.equal(v, 0);
    });

    it('should get value when value exists for row', function () {
      var spa = new Spa(10);
      spa.set(5, 0.5);
      var v = spa.get(5);
      _assert2.default.equal(v, 0.5);
    });
  });

  describe('accumulate', function () {

    it('should add value when no value exists for row', function () {
      var spa = new Spa(10);
      spa.accumulate(5, 0.5);
      (0, _assert2.default)(spa._values[5]);
      (0, _assert2.default)(spa._values[5].value);
      _assert2.default.equal(spa._values[5].value, 0.5);
    });

    it('should accumulate value when value exists for row', function () {
      var spa = new Spa(10);
      spa.set(5, 0.5);
      spa.accumulate(5, 1.5);
      (0, _assert2.default)(spa._values[5]);
      (0, _assert2.default)(spa._values[5].value);
      _assert2.default.equal(spa._values[5].value, 2);
    });
  });

  describe('swap', function () {

    it('should swap two existing values', function () {
      var spa = new Spa(10);
      spa.set(5, 0.5);
      spa.set(2, 0.2);
      spa.swap(2, 5);
      (0, _assert2.default)(spa._values[5]);
      (0, _assert2.default)(spa._values[5].value);
      _assert2.default.equal(spa._values[5].value, 0.2);
      (0, _assert2.default)(spa._values[2]);
      (0, _assert2.default)(spa._values[2].value);
      _assert2.default.equal(spa._values[2].value, 0.5);
    });

    it('should swap an existing and non existing values', function () {
      var spa = new Spa(10);
      spa.set(5, 0.5);
      spa.swap(5, 2);
      (0, _assert2.default)(!spa._values[5]);
      (0, _assert2.default)(spa._values[2]);
      (0, _assert2.default)(spa._values[2].value);
      _assert2.default.equal(spa._values[2].value, 0.5);
    });

    it('should swap a non existing and existing values', function () {
      var spa = new Spa(10);
      spa.set(5, 0.5);
      spa.swap(2, 5);
      (0, _assert2.default)(!spa._values[5]);
      (0, _assert2.default)(spa._values[2]);
      (0, _assert2.default)(spa._values[2].value);
      _assert2.default.equal(spa._values[2].value, 0.5);
    });

    it('should swap two non existing values', function () {
      var spa = new Spa(10);
      spa.swap(2, 5);
      (0, _assert2.default)(!spa._values[5]);
      (0, _assert2.default)(!spa._values[2]);
    });
  });

  describe('forEach', function () {

    it('should enumerate values in correct order', function () {
      var spa = new Spa(10);
      spa.set(2, 2);
      spa.set(3, 3);
      spa.set(4, 4);
      spa.set(1, 2);
      var x;
      var c = 0;
      spa.forEach(0, 9, function (i) {
        if (!x) {
          _assert2.default.equal(i, 1);
          x = i;
        } else {
          (0, _assert2.default)(i > x);
          x = i;
        }
        c++;
      });
      _assert2.default.equal(c, 4);
      _assert2.default.equal(x, 4);
      (0, _assert2.default)(spa._heap._minimum !== null);
      _assert2.default.equal(spa._heap._size, 4);
    });

    it('should enumerate values in interval', function () {
      var spa = new Spa(10);
      spa.set(2, 2);
      spa.set(3, 3);
      spa.set(4, 4);
      spa.set(1, 2);
      var x;
      var c = 0;
      spa.forEach(2, 3, function (i) {
        if (!x) {
          _assert2.default.equal(i, 2);
          x = i;
        } else {
          (0, _assert2.default)(i > x);
          x = i;
        }
        c++;
      });
      _assert2.default.equal(c, 2);
      _assert2.default.equal(x, 3);
      (0, _assert2.default)(spa._heap._minimum !== null);
      _assert2.default.equal(spa._heap._size, 4);
    });
  });
});
