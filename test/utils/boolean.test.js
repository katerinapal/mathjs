import assert_moduleDefault from "assert";
import * as approxjs from "../../tools/approx";
import { boolean as booleanjs } from "../../lib/utils/boolean";
// test boolean utils
var assert = {},
    approx = approxjs,
    boolean = booleanjs;

describe ('boolean', function () {

  it('isBoolean', function() {
    assert.equal(booleanjs(true), true);
    assert.equal(booleanjs(false), true);
    assert.equal(booleanjs(Boolean(false)), true);
    assert.equal(booleanjs('hi'), false);
    assert.equal(booleanjs(23), false);
    assert.equal(booleanjs([]), false);
    assert.equal(booleanjs({}), false);
    assert.equal(booleanjs(new Date()), false);

    // we don't support non primitive Boolean anymore
    assert.equal(booleanjs(new Boolean(true)), false);
    assert.equal(booleanjs(new Boolean(false)), false);
  });

});