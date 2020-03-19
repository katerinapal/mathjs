import assert from "assert";

var EPSILON = 0.0001;

/**
 * Test whether a value is a number
 * @param {*} value
 * @returns {boolean}
 */
function isNumber (value) {
  return (value instanceof Number || typeof value === 'number');
}

var equal_equal = function equal(a, b, epsilon) {
  if (epsilon === undefined) {
    epsilon = EPSILON;
  }

  if (isNumber(a) && isNumber(b)) {
    if (a === b) {
      // great, we're done :)
    }
    else if (isNaN(a)) {
      assert.equal(a.toString(), b.toString());
    }
    else if (a === 0) {
      assert.ok(Math.abs(b) < epsilon, (a + ' ~= ' + b));
    }
    else if (b === 0) {
      assert.ok(Math.abs(a) < epsilon, (a + ' ~= ' + b));
    }
    else {
      var diff = Math.abs(a - b);
      var max = Math.max(a, b);
      var max_diff = Math.abs(max * epsilon);
      assert.ok(diff <= max_diff, (a + ' ~= ' + b));
    }
  }
  else {
    assert.equal(a, b);
  }
};

var deepEqual_deepEqual = function deepEqual(a, b) {
  var prop, i, len;

  if (Array.isArray(a) && Array.isArray(b)) {
    assert.equal(a.length, b.length, a + ' ~= ' + b);
    for (i = 0, len = a.length; i < len; i++) {
      deepEqual(a[i], b[i]);
    }
  }
  else if (a instanceof Object && b instanceof Object) {
    for (prop in a) {
      if (a.hasOwnProperty(prop)) {
        assert.ok(b.hasOwnProperty(prop), a[prop] + ' ~= ' + b[prop]);
        deepEqual(a[prop], b[prop]);
      }
    }

    for (prop in b) {
      if (b.hasOwnProperty(prop)) {
        assert.ok(a.hasOwnProperty(prop), a[prop] + ' ~= ' + b[prop]);
        deepEqual(a[prop], b[prop]);
      }
    }
  }
  else {
    equal_equal(a, b);
  }
};

export { equal_equal as equal };
export { deepEqual_deepEqual as deepEqual };
