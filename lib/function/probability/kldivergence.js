import * as matrixjs from "../../type/matrix/function/matrix";
import * as dividejs from "../arithmetic/divide";
import * as sumjs from "../statistics/sum";
import * as multiplyjs from "../arithmetic/multiply";
import * as dotDividejs from "../arithmetic/dotDivide";
import * as logjs from "../arithmetic/log";
import * as isNumericjs from "../utils/isNumeric";
'use strict';


function factory(type, config, load, typed) {
    var matrix = load(matrixjs);
    var divide = load(dividejs);
    var sum = load(sumjs);
    var multiply = load(multiplyjs);
    var dotDivide = load(dotDividejs);
    var log = load(logjs);
    var isNumeric = load(isNumericjs);

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


var name_exportedObj = 'kldivergence';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
 
