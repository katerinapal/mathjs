import assert from "assert";
import { indexjs as index_indexjsjs } from "../index";
var approx = require('../tools/approx');

describe('factory', function() {

  it('should get a default instance of mathjs', function() {
    assert.strictEqual(typeof index_indexjsjs, 'object');
    assert.deepEqual(index_indexjsjs.config(), {
      matrix: 'Matrix',
      number: 'number',
      precision: 64,
      predictable: false,
      epsilon: 1e-12
    });
  });

  it('should create an instance of math.js with custom configuration', function() {
    var math1 = index_indexjsjs.create({
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
    var math1 = index_indexjsjs.create();
    var math2 = index_indexjsjs.create({
      matrix: 'Array'
    });

    assert.notStrictEqual(index_indexjsjs, math1);
    assert.notStrictEqual(index_indexjsjs, math2);
    assert.notStrictEqual(math1, math2);
    assert.notDeepEqual(math1.config(), math2.config());
    assert.notDeepEqual(index_indexjsjs.config(), math2.config());

    // changing config should not affect the other
    math1.config({number: 'BigNumber'});
    assert.strictEqual(index_indexjsjs.config().number, 'number');
    assert.strictEqual(math1.config().number, 'BigNumber');
    assert.strictEqual(math2.config().number, 'number');
  });

  it('should apply configuration using the config function', function() {
    var math1 = index_indexjsjs.create();

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
      var math1 = index_indexjsjs.create();
    }, /ES5 not supported/);

    // restore Object.create
    Object.create = create;
  });

});
