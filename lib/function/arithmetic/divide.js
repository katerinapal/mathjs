import { clone as extend } from "../../utils/object";
import * as divideScalar_obj from "./divideScalar";
import * as multiply_obj from "./multiply";
import * as matrixinv_obj from "../matrix/inv";
import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
import * as typematrixutilsalgorithm11_obj from "../../type/matrix/utils/algorithm11";
import * as typematrixutilsalgorithm14_obj from "../../type/matrix/utils/algorithm14";
'use strict';

function factory (type, config, load, typed) {

  var divideScalar = load(divideScalar_obj);
  var multiply     = load(multiply_obj);
  var inv          = load(matrixinv_obj);
  var matrix       = load(typematrixfunctionmatrix_obj);

  var algorithm11 = load(typematrixutilsalgorithm11_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);
  
  /**
   * Divide two values, `x / y`.
   * To divide matrices, `x` is multiplied with the inverse of `y`: `x * inv(y)`.
   *
   * Syntax:
   *
   *    math.divide(x, y)
   *
   * Examples:
   *
   *    math.divide(2, 3);            // returns number 0.6666666666666666
   *
   *    var a = math.complex(5, 14);
   *    var b = math.complex(4, 1);
   *    math.divide(a, b);            // returns Complex 2 + 3i
   *
   *    var c = [[7, -6], [13, -4]];
   *    var d = [[1, 2], [4, 3]];
   *    math.divide(c, d);            // returns Array [[-9, 4], [-11, 6]]
   *
   *    var e = math.unit('18 km');
   *    math.divide(e, 4.5);          // returns Unit 4 km
   *
   * See also:
   *
   *    multiply
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x   Numerator
   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix} y          Denominator
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}                      Quotient, `x / y`
   */
  var divide = typed('divide', extend);

  divide.toTex = {2: '\\frac{${args[0]}}{${args[1]}}'};

  return divide;
}

var name_exportedObj = 'divide';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
