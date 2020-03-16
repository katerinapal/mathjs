import assert from "assert";
import { isBoolean as libutilsboolean_isBooleanjs } from "../../lib/utils/boolean";
// test boolean utils
var approx = require('../../tools/approx');

describe ('boolean', function () {

  it('isBoolean', function() {
    assert.equal(libutilsboolean_isBooleanjs(true), true);
    assert.equal(libutilsboolean_isBooleanjs(false), true);
    assert.equal(libutilsboolean_isBooleanjs(Boolean(false)), true);
    assert.equal(libutilsboolean_isBooleanjs('hi'), false);
    assert.equal(libutilsboolean_isBooleanjs(23), false);
    assert.equal(libutilsboolean_isBooleanjs([]), false);
    assert.equal(libutilsboolean_isBooleanjs({}), false);
    assert.equal(libutilsboolean_isBooleanjs(new Date()), false);

    // we don't support non primitive Boolean anymore
    assert.equal(libutilsboolean_isBooleanjs(new Boolean(true)), false);
    assert.equal(libutilsboolean_isBooleanjs(new Boolean(false)), false);
  });

});