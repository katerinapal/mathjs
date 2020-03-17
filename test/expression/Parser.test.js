"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test parser

var math = require('../../index'),
    Parser = math.expression.Parser;

describe('parser', function () {

  it('should create a parser', function () {
    var parser = new Parser();
    _assert2.default.ok(parser instanceof Parser);
  });

  it('should have a property isParser', function () {
    var a = new Parser();
    _assert2.default.strictEqual(a.isParser, true);
  });

  it('should have a property type', function () {
    var a = new Parser();
    _assert2.default.strictEqual(a.type, 'Parser');
  });

  it('should throw an error when using deprecated function parse', function () {
    var parser = new Parser();

    _assert2.default.throws(function () {
      parser.parse('2 + 3');
    }, /is deprecated/);
  });

  it('should throw an error when using deprecated function compile', function () {
    var parser = new Parser();

    _assert2.default.throws(function () {
      parser.compile('2 + 3');
    }, /is deprecated/);
  });

  it('should evaluate an expression', function () {
    var parser = new Parser();

    var result = parser.eval('2 + 3');
    _assert2.default.equal(result, 5);
  });

  it('should get variables from the parsers namespace ', function () {
    var parser = new Parser();

    parser.eval('a = 3');
    parser.eval('b = a + 2');
    _assert2.default.equal(parser.eval('a'), 3);
    _assert2.default.equal(parser.eval('b'), 5);
    _assert2.default.equal(parser.get('a'), 3);
    _assert2.default.equal(parser.get('b'), 5);
  });

  it('should get all variables from the parsers namespace ', function () {
    var parser = new Parser();

    parser.eval('a = 3');
    parser.eval('b = a + 2');
    _assert2.default.deepEqual(parser.getAll(), { a: 3, b: 5 });

    parser.remove('a');
    _assert2.default.deepEqual(parser.getAll(), { b: 5 });
  });

  it('should return null when getting a non existing variable', function () {
    var parser = new Parser();

    _assert2.default.equal(parser.get('non_existing_variable'), null);
  });

  it('should set variables in the parsers namespace ', function () {
    var parser = new Parser();

    _assert2.default.equal(parser.set('a', 3), 3);
    _assert2.default.equal(parser.eval('a'), 3);
    _assert2.default.equal(parser.eval('a + 2'), 5);

    // adjust variable
    _assert2.default.equal(parser.eval('a = a + 2'), 5);
    _assert2.default.equal(parser.eval('a'), 5);
    _assert2.default.equal(parser.get('a'), 5);

    _assert2.default.equal(parser.set('a', parser.get('a') - 4), 1);
    _assert2.default.equal(parser.eval('a'), 1);
  });

  it('should remove a variable from the parsers namespace ', function () {
    var parser = new Parser();

    _assert2.default.equal(parser.set('qq', 3), 3);
    _assert2.default.equal(parser.eval('qq'), 3);
    _assert2.default.equal(parser.get('qq'), 3);

    parser.remove('qq');
    _assert2.default.equal(parser.get('qq'), null);
    _assert2.default.throws(function () {
      parser.eval('qq');
    });

    _assert2.default.equal(parser.eval('ww = 5'), 5);
    _assert2.default.equal(parser.get('ww'), 5);
    parser.remove('ww');
    _assert2.default.equal(parser.get('ww'), null);
    _assert2.default.throws(function () {
      parser.eval('ww');
    });
  });

  it('should clear the parsers namespace ', function () {
    var parser = new Parser();

    _assert2.default.equal(parser.eval('xx = yy = zz = 5'), 5);

    _assert2.default.equal(parser.set('pi', 'oops'), 'oops');

    _assert2.default.equal(parser.get('xx'), 5);
    _assert2.default.equal(parser.get('yy'), 5);
    _assert2.default.equal(parser.get('zz'), 5);
    _assert2.default.equal(parser.get('pi'), 'oops');

    _assert2.default.equal(parser.eval('xx'), 5);
    _assert2.default.equal(parser.eval('yy'), 5);
    _assert2.default.equal(parser.eval('zz'), 5);
    _assert2.default.equal(parser.eval('pi'), 'oops');

    parser.clear();

    _assert2.default.equal(parser.get('xx'), null);
    _assert2.default.equal(parser.get('yy'), null);
    _assert2.default.equal(parser.get('zz'), null);
    (0, _approx.equal)(parser.get('pi'), null);

    _assert2.default.throws(function () {
      parser.eval('xx');
    });
    _assert2.default.throws(function () {
      parser.eval('yy');
    });
    _assert2.default.throws(function () {
      parser.eval('zz');
    });
    _assert2.default.equal(parser.eval('pi'), Math.PI);
  });

  it('should not clear inherited properties', function () {
    var parser = new Parser();

    Object.prototype.foo = 'bar';

    parser.clear();

    _assert2.default.equal(parser.get('foo'), 'bar');

    delete Object.prototype.foo;
  });

  it('should throw an exception when creating a parser without new', function () {
    _assert2.default.throws(function () {
      Parser();
    }, /Constructor must be called with the new operator/);
  });
});
