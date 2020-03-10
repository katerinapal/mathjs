import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;


describe('kldivergence', function(){
    it('should return 0, cause distributions is equals', function(){
        var q = [0.1,0.4,0.5,0.2];
        assert.equal(index_obj.kldivergence(q, q), 0);
        assert.equal(index_obj.kldivergence(index_obj.matrix(q), q), 0);
        assert.equal(index_obj.kldivergence(q, index_obj.matrix(q)), 0);
        assert.equal(index_obj.kldivergence(index_obj.matrix(q), index_obj.matrix(q)), 0);
    });

    it('should return distance between two distrubutions', function(){
        var q = [0.5,0.6,0.7];
        var p = [0.4,0.5,0.6];
        assert.equal(index_obj.kldivergence(q, p), 0.00038410187968898266);

        var q2 = [0.9,0.2,0.8,0.4];
        var p2 = [0.1,0.8,0.7,0.6];
        assert.equal(index_obj.kldivergence(q2, p2), 0.6707144627487189);

    });

    it('should return normalized distance between two distributions', function(){
        var q = [1,2,3,4,5,6,7,8];
        var p = [2,3,4,5,6,7,8,9];
        assert.equal(index_obj.kldivergence(q, p), 0.006970870019248255);
    });

    it('should return infinity', function(){
        var q = [1,2];
        var p = [0,1];
        assert.equal(index_obj.kldivergence(q, p), Infinity);
    });

    it('should return NaN', function(){
        var q = [-1,2];
        var p = [0.4,1];
        assert.equal(isNaN(parseFloat(index_obj.kldivergence(q, p))), true);
    });

    it('should return bignumber', function(){
        var result = index_obj.kldivergence([index_obj.bignumber(4),index_obj.bignumber(7)], [index_obj.bignumber(1), index_obj.bignumber(4)]);
        assert.equal(result.toString(), '0.0717688178200499468328227075658945850681301640503275280115029999');
    });
});
