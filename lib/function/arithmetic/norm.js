import * as arithmeticabs_obj from "../arithmetic/abs";
import * as arithmeticadd_obj from "../arithmetic/add";
import * as arithmeticpow_obj from "../arithmetic/pow";
import * as arithmeticsqrt_obj from "../arithmetic/sqrt";
import * as arithmeticmultiply_obj from "../arithmetic/multiply";
import { factory as relationalequalScalar_obj } from "../relational/equalScalar";
import * as relationallarger_obj from "../relational/larger";
import * as relationalsmaller_obj from "../relational/smaller";
import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
import * as matrixtrace_obj from "../matrix/trace";
import * as matrixtranspose_obj from "../matrix/transpose";
'use strict';

function factory (type, config, load, typed) {
  
  var abs         = load(arithmeticabs_obj);
  var add         = load(arithmeticadd_obj);
  var pow         = load(arithmeticpow_obj);
  var sqrt        = load(arithmeticsqrt_obj);
  var multiply    = load(arithmeticmultiply_obj);
  var equalScalar = load(relationalequalScalar_obj);
  var larger      = load(relationallarger_obj);
  var smaller     = load(relationalsmaller_obj);
  var matrix      = load(typematrixfunctionmatrix_obj);
  var trace       = load(matrixtrace_obj);
  var transpose   = load(matrixtranspose_obj);


  /**
   * Calculate the norm of a number, vector or matrix.
   *
   * The second parameter p is optional. If not provided, it defaults to 2.
   *
   * Syntax:
   *
   *    math.norm(x)
   *    math.norm(x, p)
   *
   * Examples:
   *
   *    math.abs(-3.5);                         // returns 3.5
   *    math.norm(-3.5);                        // returns 3.5
   *
   *    math.norm(math.complex(3, -4));         // returns 5
   *
   *    math.norm([1, 2, -3], Infinity);        // returns 3
   *    math.norm([1, 2, -3], -Infinity);       // returns 1
   *
   *    math.norm([3, 4], 2);                   // returns 5
   *
   *    math.norm([[1, 2], [3, 4]], 1)          // returns 6
   *    math.norm([[1, 2], [3, 4]], 'inf');     // returns 7
   *    math.norm([[1, 2], [3, 4]], 'fro');     // returns 5.477225575051661
   *
   * See also:
   *
   *    abs, hypot
   *
   * @param  {number | BigNumber | Complex | Array | Matrix} x
   *            Value for which to calculate the norm
   * @param  {number | BigNumber | string} [p=2]
   *            Vector space.
   *            Supported numbers include Infinity and -Infinity.
   *            Supported strings are: 'inf', '-inf', and 'fro' (The Frobenius norm)
   * @return {number | BigNumber} the p-norm
   */
  var norm = typed('norm', {
    'number': Math.abs,

    'Complex': function (x) {
      return x.abs();
    },

    'BigNumber': function (x) {
      // norm(x) = abs(x)
      return x.abs();
    },
    
    'boolean | null' : function (x) {
      // norm(x) = abs(x)
      return Math.abs(x);
    },

    'Array': function (x) {
      return _norm(matrix(x), 2);
    },
    
    'Matrix': function (x) {
      return _norm(x, 2);
    },

    'number | Complex | BigNumber | boolean | null, number | BigNumber | string': function (x) {
      // ignore second parameter, TODO: remove the option of second parameter for these types
      return norm(x);
    },

    'Array, number | BigNumber | string': function (x, p) {
      return _norm(matrix(x), p);
    },
    
    'Matrix, number | BigNumber | string': function (x, p) {
      return _norm(x, p);
    }
  });

  /**
   * Calculate the norm for an array
   * @param {Array} x
   * @param {number | string} p
   * @returns {number} Returns the norm
   * @private
   */
  function _norm (x, p) {
    // size
    var sizeX = x.size();
    
    // check if it is a vector
    if (sizeX.length == 1) {
      // check p
      if (p === Number.POSITIVE_INFINITY || p === 'inf') {
        // norm(x, Infinity) = max(abs(x))
        var pinf = 0;
        // skip zeros since abs(0) == 0
        x.forEach(
          function (value) {
            var v = abs(value);
            if (larger(v, pinf))
              pinf = v;
          },
          true);
        return pinf;
      }
      if (p === Number.NEGATIVE_INFINITY || p === '-inf') {
        // norm(x, -Infinity) = min(abs(x))
        var ninf;
        // skip zeros since abs(0) == 0
        x.forEach(
          function (value) {
            var v = abs(value);
            if (!ninf || smaller(v, ninf))
              ninf = v;
          },
          true);
        return ninf || 0;
      }
      if (p === 'fro') {
        return _norm(x, 2);
      }
      if (typeof p === 'number' && !isNaN(p)) {
        // check p != 0
        if (!equalScalar(p, 0)) {
          // norm(x, p) = sum(abs(xi) ^ p) ^ 1/p
          var n = 0;
          // skip zeros since abs(0) == 0
          x.forEach(
            function (value) {
              n = add(pow(abs(value), p), n);
            },
            true);
          return pow(n, 1 / p);
        }
        return Number.POSITIVE_INFINITY;
      }
      // invalid parameter value
      throw new Error('Unsupported parameter value');
    }
    // MxN matrix
    if (sizeX.length == 2) {
      // check p
      if (p === 1) {
        // norm(x) = the largest column sum
        var c = [];
        // result
        var maxc = 0;
        // skip zeros since abs(0) == 0
        x.forEach(
          function (value, index) {
            var j = index[1];
            var cj = add(c[j] || 0, abs(value));
            if (larger(cj, maxc))
              maxc = cj;
            c[j] = cj;
          },
          true);
        return maxc;
      }
      if (p === Number.POSITIVE_INFINITY || p === 'inf') {
        // norm(x) = the largest row sum
        var r = [];
        // result
        var maxr = 0;
        // skip zeros since abs(0) == 0
        x.forEach(
          function (value, index) {
            var i = index[0];
            var ri = add(r[i] || 0, abs(value));
            if (larger(ri, maxr))
              maxr = ri;
            r[i] = ri;
          },
          true);
        return maxr;
      }
      if (p === 'fro') {
        // norm(x) = sqrt(sum(diag(x'x)))
        return sqrt(trace(multiply(transpose(x), x)));
      }
      if (p === 2) {
        // not implemented
        throw new Error('Unsupported parameter value, missing implementation of matrix singular value decomposition');
      }
      // invalid parameter value
      throw new Error('Unsupported parameter value');
    }
  }

  norm.toTex = {
    1: '\\left\\|${args[0]}\\right\\|',
    2: undefined  // use default template
  };

  return norm;
}

var name_name = 'norm';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
