import assert_moduleDefault from "assert";
import { math as indexjs } from "../index";
import { approx as approxjs } from "../tools/approx";
var assert = {},
    math = indexjs,
    approx = approxjs;

describe('constants', function() {

  describe('number', function () {

    it('should have pi', function() {
      approxjs(indexjs.pi, 3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664);
      approxjs(indexjs.sin(indexjs.pi / 2), 1);
      approxjs(indexjs.PI, indexjs.pi);
    });

    it('should have tau', function() {
      approxjs(indexjs.tau, 6.28318530717959);
    });

    it('should have phi, golden ratio', function() {
      approxjs(indexjs.phi, 1.61803398874989484820458683436563811772030917980576286213545);
    });

    it('should have e (euler constant)', function() {
      approxjs(indexjs.e, 2.71828182845905);
      assert.equal(indexjs.round(indexjs.add(1,indexjs.pow(indexjs.e, indexjs.multiply(indexjs.pi, indexjs.i))), 5), 0);
      assert.equal(indexjs.round(indexjs.eval('1+e^(pi*i)'), 5), 0);
    });

    it('should have LN2', function() {
      approxjs(indexjs.LN2, 0.69314718055994530941723212145817656807550013436025525412068000949339362196969471560586332699641868754200148102057068573);
    });

    it('should have LN10', function() {
      approxjs(indexjs.LN10, 2.30258509299404568401799145468436420760110148862877297603332790096757260967735248023599720508959829834196778404228624863);
   });

    it('should have LOG2E', function() {
      approxjs(indexjs.LOG2E, 1.44269504088896340735992468100189213742664595415298593413544940693110921918118507988552662289350634449699751830965254425);
   });

    it('should have LOG10E', function() {
      approxjs(indexjs.LOG10E, 0.43429448190325182765112891891660508229439700580366656611445378316586464920887077472922494933843174831870610674476630373);
   });

    it('should have PI', function() {
      approxjs(indexjs.PI, 3.14159265358979);
   });

    it('should have SQRT1_2', function() {
      approxjs(indexjs.SQRT1_2, 0.70710678118654752440084436210484903928483593768847403658833986899536623923105351942519376716382078636750692311545614851);
   });

    it('should have SQRT2', function() {
      approxjs(indexjs.SQRT2, 1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623091229702);
   });

    it('should have Infinity', function() {
      assert.strictEqual(indexjs.Infinity, Infinity);
    });

    it('should have NaN', function() {
      assert.ok(isNaN(indexjs.NaN));
    });

  });

  describe('bignumber', function () {
    var bigmath = indexjs.create({number: 'BigNumber', precision: 64});

    it('should have bignumber pi', function() {
      assert.equal(bigmath.pi.toString(),  '3.141592653589793238462643383279502884197169399375105820974944592');
    });

    it('should have bignumber tau', function() {
      assert.equal(bigmath.tau.toString(), '6.283185307179586476925286766559005768394338798750211641949889184');
    });

    it('should have bignumber phi, golden ratio', function() {
      assert.equal(bigmath.phi.toString(), '1.618033988749894848204586834365638117720309179805762862135448623');
    });

    it('should have bignumber e', function() {
      assert.equal(bigmath.e.toString(), '2.718281828459045235360287471352662497757247093699959574966967628');
    });

    it('should have bignumber LN2', function() {
      assert.equal(bigmath.LN2.toString(), '0.6931471805599453094172321214581765680755001343602552541206800095');
    });

    it('should have bignumber LN10', function() {
      assert.equal(bigmath.LN10.toString(), '2.302585092994045684017991454684364207601101488628772976033327901');
    });

    it('should have bignumber LOG2E', function() {
      assert.equal(bigmath.LOG2E.toString(), '1.442695040888963407359924681001892137426645954152985934135449407');
    });

    it('should have bignumber LOG10E', function() {
      assert.equal(bigmath.LOG10E.toString(), '0.4342944819032518276511289189166050822943970058036665661144537832');
    });

    it('should have bignumber PI (upper case)', function() {
      assert.equal(bigmath.PI.toString(), '3.141592653589793238462643383279502884197169399375105820974944592');
    });

    it('should have bignumber SQRT1_2', function() {
      assert.equal(bigmath.SQRT1_2.toString(), '0.707106781186547524400844362104849039284835937688474036588339869');
    });

    it('should have bignumber SQRT2', function() {
      assert.equal(bigmath.SQRT2.toString(), '1.414213562373095048801688724209698078569671875376948073176679738');
    });

    it('should have bignumber Infinity', function() {
      assert(bigmath.Infinity instanceof bigmath.type.BigNumber);
      assert.strictEqual(bigmath.Infinity.toString(), 'Infinity');
    });

    it('should have bignumber NaN', function() {
      assert(bigmath.NaN instanceof bigmath.type.BigNumber);
      assert.equal(bigmath.NaN.toString(), 'NaN');
      assert.ok(isNaN(bigmath.NaN));
    });
  });

  it('should have i', function() {
    assert.equal(indexjs.i.re, 0);
    assert.equal(indexjs.i.im, 1);
    assert.deepEqual(indexjs.i, indexjs.complex(0,1));
    assert.deepEqual(indexjs.sqrt(-1), indexjs.i);
    assert.deepEqual(indexjs.eval('i'), indexjs.complex(0, 1));
  });

  it('should have true and false', function() {
    assert.strictEqual(indexjs.true, true);
    assert.strictEqual(indexjs.false, false);
    assert.strictEqual(indexjs.eval('true'), true);
    assert.strictEqual(indexjs.eval('false'), false);
  });

  it('should have null', function() {
    assert.strictEqual(indexjs['null'], null);
  });

  it('should have version number', function() {
    assert.equal(indexjs.version, require('../package.json').version);
  });

});