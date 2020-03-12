import { clone as extend } from "../../utils/object";
import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
import * as addScalar_obj from "./addScalar";
import { operators as utilslatex_operatorsjs } from "../../utils/latex.js";
import * as typematrixutilsalgorithm01_obj from "../../type/matrix/utils/algorithm01";
import * as typematrixutilsalgorithm04_obj from "../../type/matrix/utils/algorithm04";
import * as typematrixutilsalgorithm10_obj from "../../type/matrix/utils/algorithm10";
import * as typematrixutilsalgorithm13_obj from "../../type/matrix/utils/algorithm13";
import * as typematrixutilsalgorithm14_obj from "../../type/matrix/utils/algorithm14";
'use strict';

function factory (type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);
  var addScalar = load(addScalar_obj);

  var algorithm01 = load(typematrixutilsalgorithm01_obj);
  var algorithm04 = load(typematrixutilsalgorithm04_obj);
  var algorithm10 = load(typematrixutilsalgorithm10_obj);
  var algorithm13 = load(typematrixutilsalgorithm13_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

  /**
   * Add two values, `x + y`.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.add(x, y)
   *
   * Examples:
   *
   *    math.add(2, 3);               // returns number 5
   *
   *    var a = math.complex(2, 3);
   *    var b = math.complex(-4, 1);
   *    math.add(a, b);               // returns Complex -2 + 4i
   *
   *    math.add([1, 2, 3], 4);       // returns Array [5, 6, 7]
   *
   *    var c = math.unit('5 cm');
   *    var d = math.unit('2.1 mm');
   *    math.add(c, d);               // returns Unit 52.1 mm
   *
   *    math.add("2.3", "4");         // returns number 6.3
   *
   * See also:
   *
   *    subtract
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x First value to add
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Second value to add
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Sum of `x` and `y`
   */
  var add = typed('add', extend);

  add.toTex = {
    2: '\\left(${args[0]}' + utilslatex_operatorsjs['add'] + '${args[1]}\\right)'
  };

  return add;
}

var name_exportedObj = 'add';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
