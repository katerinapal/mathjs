import assert_moduleDefault from "assert";
import * as approxjs from "../tools/approx";
import * as indexjs from "../index";
var assert = {},
    approx = approxjs,
    math = indexjs;

describe('factory', function() {

  it('should get a default instance of mathjs', function() {
    assert.strictEqual(typeof indexjs, 'object');
    assert.deepEqual(indexjs.config(), {
      matrix: 'Matrix',
      number: 'number',
      precision: 64,
      predictable: false,
      epsilon: 1e-12
    });
  });

  it('should create an instance of math.js with custom configuration', function() {
    var math1 = indexjs.create({
      matrix: 'Array',
      number: 'BigNumber'
    });

    assert.strictEqual(typeof math1, 'object');
    assert.deepEqual(math1.config(), {
      matrix: 'Array',
      number: 'BigNumber',
      precision: 64,
      predictable: false,
      epsilon: 1e-12
    });
  });

  it('two instances of math.js should be isolated from each other', function() {
    var math1 = indexjs.create();
    var math2 = indexjs.create({
      matrix: 'Array'
    });

    assert.notStrictEqual(indexjs, math1);
    assert.notStrictEqual(indexjs, math2);
    assert.notStrictEqual(math1, math2);
    assert.notDeepEqual(math1.config(), math2.config());
    assert.notDeepEqual(indexjs.config(), math2.config());

    // changing config should not affect the other
    math1.config({number: 'BigNumber'});
    assert.strictEqual(indexjs.config().number, 'number');
    assert.strictEqual(math1.config().number, 'BigNumber');
    assert.strictEqual(math2.config().number, 'number');
  });

  it('should apply configuration using the config function', function() {
    var math1 = indexjs.create();

    var config = math1.config();
    assert.deepEqual(config, {
      matrix: 'Matrix',
      number: 'number',
      precision: 64,
      predictable: false,
      epsilon: 1e-12
    });

    // restore the original config
    math1.config(config);
  });

  // TODO: test whether the namespace is correct: has functions like sin, constants like pi, objects like type and error.

  it('should throw an error when ES5 is not supported', function() {
    var create = Object.create;
    Object.create = undefined; // fake missing Object.create function

    assert.throws(function () {
      var math1 = indexjs.create();
    }, /ES5 not supported/);

    // restore Object.create
    Object.create = create;
  });

});
