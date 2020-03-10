import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
var assert = {};
var math = indexjs;


describe('kldivergence', function(){
    it('should return 0, cause distributions is equals', function(){
        var q = [0.1,0.4,0.5,0.2];
        assert.equal(indexjs.kldivergence(q, q), 0);
        assert.equal(indexjs.kldivergence(indexjs.matrix(q), q), 0);
        assert.equal(indexjs.kldivergence(q, indexjs.matrix(q)), 0);
        assert.equal(indexjs.kldivergence(indexjs.matrix(q), indexjs.matrix(q)), 0);
    });

    it('should return distance between two distrubutions', function(){
        var q = [0.5,0.6,0.7];
        var p = [0.4,0.5,0.6];
        assert.equal(indexjs.kldivergence(q, p), 0.00038410187968898266);

        var q2 = [0.9,0.2,0.8,0.4];
        var p2 = [0.1,0.8,0.7,0.6];
        assert.equal(indexjs.kldivergence(q2, p2), 0.6707144627487189);

    });

    it('should return normalized distance between two distributions', function(){
        var q = [1,2,3,4,5,6,7,8];
        var p = [2,3,4,5,6,7,8,9];
        assert.equal(indexjs.kldivergence(q, p), 0.006970870019248255);
    });

    it('should return infinity', function(){
        var q = [1,2];
        var p = [0,1];
        assert.equal(indexjs.kldivergence(q, p), Infinity);
    });

    it('should return NaN', function(){
        var q = [-1,2];
        var p = [0.4,1];
        assert.equal(isNaN(parseFloat(indexjs.kldivergence(q, p))), true);
    });

    it('should return bignumber', function(){
        var result = indexjs.kldivergence([indexjs.bignumber(4),indexjs.bignumber(7)], [indexjs.bignumber(1), indexjs.bignumber(4)]);
        assert.equal(result.toString(), '0.0717688178200499468328227075658945850681301640503275280115029999');
    });
});
