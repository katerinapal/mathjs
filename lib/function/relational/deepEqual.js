'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _equal = require('./equal');

var equal_obj = _interopRequireWildcard(_equal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var equal = load(equal_obj);

  /**
   * Test element wise whether two matrices are equal.
   * The function accepts both matrices and scalar values.
   *
   * Syntax:
   *
   *    math.deepEqual(x, y)
   *
   * Examples:
   *
   *    math.deepEqual(2, 4);   // returns false
   *
   *    a = [2, 5, 1];
   *    b = [2, 7, 1];
   *
   *    math.deepEqual(a, b);   // returns false
   *    math.equal(a, b);       // returns [true, false, true]
   *
   * See also:
   *
   *    equal, unequal
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x First matrix to compare
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Second matrix to compare
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}
   *            Returns true when the input matrices have the same size and each of their elements is equal.
   */
  var deepEqual = typed('deepEqual', {
    'any, any': function anyAny(x, y) {
      return _deepEqual(x.valueOf(), y.valueOf());
    }
  });

  deepEqual.toTex = undefined; // use default template

  return deepEqual;

  /**
   * Test whether two arrays have the same size and all elements are equal
   * @param {Array | *} x
   * @param {Array | *} y
   * @return {boolean} Returns true if both arrays are deep equal
   */
  function _deepEqual(x, y) {
    if (Array.isArray(x)) {
      if (Array.isArray(y)) {
        var len = x.length;
        if (len !== y.length) {
          return false;
        }

        for (var i = 0; i < len; i++) {
          if (!_deepEqual(x[i], y[i])) {
            return false;
          }
        }

        return true;
      } else {
        return false;
      }
    } else {
      if (Array.isArray(y)) {
        return false;
      } else {
        return equal(x, y);
      }
    }
  }
}

var name_name = 'deepEqual';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
