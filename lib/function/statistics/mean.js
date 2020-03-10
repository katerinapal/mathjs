import { utilsarray_obj } from "../../utils/array";
import { deepForEach as utilscollectiondeepForEach_deepForEach } from "../../utils/collection/deepForEach";
import { reduce as utilscollectionreduce_reduce } from "../../utils/collection/reduce";
import {   containsCollections as utilscollectioncontainsCollections_containsCollections, } from "../../utils/collection/containsCollections";
import * as arithmeticadd_obj from "../arithmetic/add";
import * as arithmeticdivide_obj from "../arithmetic/divide";
'use strict';

var size = utilsarray_obj.size;
var deepForEach = utilscollectiondeepForEach_deepForEach;
var reduce = utilscollectionreduce_reduce;
var containsCollections = utilscollectioncontainsCollections_containsCollections;

function factory (type, config, load, typed) {
  var add = load(arithmeticadd_obj);
  var divide = load(arithmeticdivide_obj);

  /**
   * Compute the mean value of matrix or a list with values.
   * In case of a multi dimensional array, the mean of the flattened array
   * will be calculated. When `dim` is provided, the maximum over the selected
   * dimension will be calculated. Parameter `dim` is zero-based.
   *
   * Syntax:
   *
   *     math.mean(a, b, c, ...)
   *     math.mean(A)
   *     math.mean(A, dim)
   *
   * Examples:
   *
   *     math.mean(2, 1, 4, 3);                     // returns 2.5
   *     math.mean([1, 2.7, 3.2, 4]);               // returns 2.725
   *
   *     math.mean([[2, 5], [6, 3], [1, 7]], 0);    // returns [3, 5]
   *     math.mean([[2, 5], [6, 3], [1, 7]], 1);    // returns [3.5, 4.5, 4]
   *
   * See also:
   *
   *     median, min, max, sum, prod, std, var
   *
   * @param {... *} args  A single matrix or or multiple scalar values
   * @return {*} The mean of all values
   */
  var mean = typed('mean', {
      // mean([a, b, c, d, ...])
    'Array | Matrix': _mean,

      // mean([a, b, c, d, ...], dim)
    'Array | Matrix, number | BigNumber': _nmean,

    // mean(a, b, c, d, ...)
    '...': function (args) {
      if (utilscollectioncontainsCollections_containsCollections(args)) {
        throw new TypeError('Scalar values expected in function mean');
      }

      return _mean(args);
    }
  });

  mean.toTex = undefined; // use default template

  return mean;

  /**
   * Calculate the mean value in an n-dimensional array, returning a
   * n-1 dimensional array
   * @param {Array} array
   * @param {number} dim
   * @return {number} mean
   * @private
   */
  function _nmean(array, dim){
    var sum = utilscollectionreduce_reduce(array, dim, add);
    var s = Array.isArray(array) ? utilsarray_obj(array) : array.size();
    return divide(sum, s[dim]);
  }

  /**
   * Recursively calculate the mean value in an n-dimensional array
   * @param {Array} array
   * @return {number} mean
   * @private
   */
  function _mean(array) {
    var sum = 0;
    var num = 0;

    utilscollectiondeepForEach_deepForEach(array, function (value) {
      sum = add(sum, value);
      num++;
    });

    if (num === 0) {
      throw new Error('Cannot calculate mean of an empty array');
    }

    return divide(sum, num);
  }
}

var name_exportedObj = 'mean';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
