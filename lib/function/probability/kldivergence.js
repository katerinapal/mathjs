import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
import * as arithmeticdivide_obj from "../arithmetic/divide";
import * as statisticssum_obj from "../statistics/sum";
import * as arithmeticmultiply_obj from "../arithmetic/multiply";
import * as arithmeticdotDivide_obj from "../arithmetic/dotDivide";
import * as arithmeticlog_obj from "../arithmetic/log";
import * as utilsisNumeric_obj from "../utils/isNumeric";
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
        'Array, Array': function(q, p) {
            return _kldiv(matrix(q), matrix(p));
        },

        'Matrix, Array': function(q, p) {
            return _kldiv(q, matrix(p));
        },

        'Array, Matrix': function(q, p){
            return _kldiv(matrix(q), p);
        },

        'Matrix, Matrix': function(q, p){
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
        
        if(plength !== qlength){
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
        }
        else {
            return Number.NaN;
        }
    }

    return kldivergence;
}


var name_name = 'kldivergence';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
 
