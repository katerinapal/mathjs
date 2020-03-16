"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.factory = exports.name = undefined;

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _divide = require("../arithmetic/divide");

var arithmeticdivide_obj = _interopRequireWildcard(_divide);

var _sum = require("../statistics/sum");

var statisticssum_obj = _interopRequireWildcard(_sum);

var _multiply = require("../arithmetic/multiply");

var arithmeticmultiply_obj = _interopRequireWildcard(_multiply);

var _dotDivide = require("../arithmetic/dotDivide");

var arithmeticdotDivide_obj = _interopRequireWildcard(_dotDivide);

var _log = require("../arithmetic/log");

var arithmeticlog_obj = _interopRequireWildcard(_log);

var _isNumeric = require("../utils/isNumeric");

var utilsisNumeric_obj = _interopRequireWildcard(_isNumeric);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
    var matrix = load(typematrixfunctionmatrix_obj);
    var divide = load(arithmeticdivide_obj);
    var sum = load(statisticssum_obj);
    var multiply = load(arithmeticmultiply_obj);
    var dotDivide = load(arithmeticdotDivide_obj);
    var log = load(arithmeticlog_obj);
    var isNumeric = load(utilsisNumeric_obj);

    /**
     * Calculate the Kullback-Leibler (KL) divergence  between two distributions
     *
     * Syntax:
     *
     *     math.kldivergence(x, y)
     *
     * Examples:
     *
     *     math.kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5]);   //returns 0.24376698773121153
     *
     *
     * @param  {Array | Matrix} q    First vector
     * @param  {Array | Matrix} p    Second vector
     * @return {number}              Returns distance between q and p
     */
    var kldivergence = typed('kldivergence', {
        'Array, Array': function ArrayArray(q, p) {
            return _kldiv(matrix(q), matrix(p));
        },

        'Matrix, Array': function MatrixArray(q, p) {
            return _kldiv(q, matrix(p));
        },

        'Array, Matrix': function ArrayMatrix(q, p) {
            return _kldiv(matrix(q), p);
        },

        'Matrix, Matrix': function MatrixMatrix(q, p) {
            return _kldiv(q, p);
        }

    });

    function _kldiv(q, p) {
        var plength = p.size().length;
        var qlength = q.size().length;
        if (plength > 1) {
            throw new Error('first object must be one dimensional');
        }

        if (qlength > 1) {
            throw new Error('second object must be one dimensional');
        }

        if (plength !== qlength) {
            throw new Error("Length of two vectors must be equal");
        }

        //Before calculation, apply normalization
        var sumq = sum(q);
        if (sumq === 0) {
            throw new Error("Sum of elements in first object must be non zero");
        }

        var sump = sum(p);
        if (sump === 0) {
            throw new Error("Sum of elements in second object must be non zero");
        }
        var qnorm = divide(q, sum(q));
        var pnorm = divide(p, sum(p));

        var result = sum(multiply(qnorm, log(dotDivide(qnorm, pnorm))));
        if (isNumeric(result)) {
            return result;
        } else {
            return Number.NaN;
        }
    }

    return kldivergence;
}

var name_name = 'kldivergence';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
