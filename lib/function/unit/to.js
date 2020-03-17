'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory(type, config, load, typed) {
  var latex = require('../../utils/latex');

  var matrix = load(typematrixfunctionmatrix_obj);

  var algorithm13 = load(typematrixutilsalgorithm13_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

  /**
   * Change the unit of a value.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.to(x, unit)
   *
   * Examples:
   *
   *    math.to(math.unit('2 inch'), 'cm');                   // returns Unit 5.08 cm
   *    math.to(math.unit('2 inch'), math.unit(null, 'cm'));  // returns Unit 5.08 cm
   *    math.to(math.unit(16, 'bytes'), 'bits');              // returns Unit 128 bits
   *
   * See also:
   *
   *    unit
   *
   * @param {Unit | Array | Matrix} x     The unit to be converted.
   * @param {Unit | Array | Matrix} unit  New unit. Can be a string like "cm"
   *                                      or a unit without value.
   * @return {Unit | Array | Matrix} value with changed, fixed unit.
   */
  var to = typed('to', {

    'Unit, Unit | string': function UnitUnitString(x, unit) {
      return x.to(unit);
    },

    'Matrix, Matrix': function MatrixMatrix(x, y) {
      // SparseMatrix does not support Units
      return algorithm13(x, y, to);
    },

    'Array, Array': function ArrayArray(x, y) {
      // use matrix implementation
      return to(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function ArrayMatrix(x, y) {
      // use matrix implementation
      return to(matrix(x), y);
    },

    'Matrix, Array': function MatrixArray(x, y) {
      // use matrix implementation
      return to(x, matrix(y));
    },

    'Matrix, any': function MatrixAny(x, y) {
      // SparseMatrix does not support Units
      return algorithm14(x, y, to, false);
    },

    'any, Matrix': function anyMatrix(x, y) {
      // SparseMatrix does not support Units
      return algorithm14(y, x, to, true);
    },

    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, to, false).valueOf();
    },

    'any, Array': function anyArray(x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, to, true).valueOf();
    }
  });

  to.toTex = {
    2: '\\left(${args[0]}' + latex.operators['to'] + '${args[1]}\\right)'
  };

  return to;
}

var name_name = 'to';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
