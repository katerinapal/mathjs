import assert from "assert";
import { isBoolean as libutilsboolean_isBooleanjs } from "../../lib/utils/boolean";
// test boolean utils
var approx = require('../../tools/approx');

describe ('boolean', function () {

  it('isBoolean', function() {
    assert.equal(libutilsboolean_isBooleanjs.isBoolean(true), true);
    assert.equal(libutilsboolean_isBooleanjs.isBoolean(false), true);
    assert.equal(libutilsboolean_isBooleanjs.isBoolean(Boolean(false)), true);
    assert.equal(libutilsboolean_isBooleanjs.isBoolean('hi'), false);
    assert.equal(libutilsboolean_isBooleanjs.isBoolean(23), false);
    assert.equal(libutilsboolean_isBooleanjs.isBoolean([]), false);
    assert.equal(libutilsboolean_isBooleanjs.isBoolean({}), false);
    assert.equal(libutilsboolean_isBooleanjs.isBoolean(new Date()), false);

    // we don't support non primitive Boolean anymore
    assert.equal(libutilsboolean_isBooleanjs.isBoolean(new Boolean(true)), false);
    assert.equal(libutilsboolean_isBooleanjs.isBoolean(new Boolean(false)), false);
  });

});