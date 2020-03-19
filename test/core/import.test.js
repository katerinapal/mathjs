"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('import', function () {
  var math = null;

  beforeEach(function () {
    math = mathjs.create();
    math.import({
      myvalue: 42,
      hello: function hello(name) {
        return 'hello, ' + name + '!';
      }
    }, { override: true });
  });

  afterEach(function () {
    math = null;
  });

  it('should import a custom member', function () {
    _assert2.default.equal(math.myvalue * 2, 84);
    _assert2.default.equal(math.hello('user'), 'hello, user!');
  });

  it('should not override existing functions', function () {
    _assert2.default.throws(function () {
      math.import({ myvalue: 10 });
    }, /Error: Cannot import "myvalue": already exists/);
    _assert2.default.equal(math.myvalue, 42);
  });

  it('should throw no errors when silent:true', function () {
    math.import({ myvalue: 10 }, { silent: true });
    _assert2.default.strictEqual(math.myvalue, 42);
  });

  it('should override existing functions if forced', function () {
    math.import({ myvalue: 10 }, { override: true });
    _assert2.default.strictEqual(math.myvalue, 10);
  });

  it('should parse the user defined members', function () {
    if (math.parser) {
      var parser = math.parser();
      math.add(math.myvalue, 10);
      parser.eval('myvalue + 10'); // 52
      parser.eval('hello("user")'); // 'hello, user!'
    }
  });

  var getSize = function getSize(array) {
    return array.length;
  };

  it('shouldn\'t wrap custom functions by default', function () {
    math.import({ getSizeNotWrapped: getSize });
    _assert2.default.strictEqual(math.getSizeNotWrapped([1, 2, 3]), 3);
    _assert2.default.strictEqual(math.getSizeNotWrapped(math.matrix([1, 2, 3])), undefined);
  });

  it('should wrap custom functions if wrap = true', function () {
    math.import({ getSizeWrapped: getSize }, { wrap: true });
    _assert2.default.strictEqual(math.getSizeWrapped([1, 2, 3]), 3);
    _assert2.default.strictEqual(math.getSizeWrapped(math.matrix([1, 2, 3])), 3);
  });

  it('wrapped imported functions should accept undefined and null', function () {
    math.import({
      isNull: function isNull(obj) {
        return obj === null;
      }
    }, { wrap: true });
    _assert2.default.equal(math.isNull(null), true);
    _assert2.default.equal(math.isNull(0), false);

    math.import({
      isUndefined: function isUndefined(obj) {
        return obj === undefined;
      }
    }, { wrap: true });
    _assert2.default.equal(math.isUndefined(undefined), true);
    _assert2.default.equal(math.isUndefined(0), false);
    _assert2.default.equal(math.isUndefined(null), false);
  });

  it('should throw an error in case of wrong number of arguments', function () {
    _assert2.default.throws(function () {
      math.import();
    }, /ArgumentsError/);
    _assert2.default.throws(function () {
      math.import('', {}, 3);
    }, /ArgumentsError/);
  });

  it('should throw an error in case of wrong type of arguments', function () {
    _assert2.default.throws(function () {
      math.import(2);
    }, /TypeError: Factory, Object, or Array expected/);
    _assert2.default.throws(function () {
      math.import(function () {});
    }, /TypeError: Factory, Object, or Array expected/);
  });

  it('should ignore properties on Object', function () {
    Object.prototype.foo = 'bar';

    math.import({ bar: 456 });

    (0, _assert2.default)(!math.hasOwnProperty('foo'));
    (0, _assert2.default)(math.hasOwnProperty('bar'));

    delete Object.prototype.foo;
  });

  it('should return the imported object', function () {
    math.import({ a: 24 });
    _assert2.default.deepEqual(math.a, 24);

    math.import({ pi: 24 }, { silent: true });
    (0, _approx.equal)(math.pi, Math.PI); // pi was ignored
  });

  it('should import a boolean', function () {
    math.import({ a: true });
    _assert2.default.strictEqual(math.a, true);
  });

  it('should merge typed functions with the same name', function () {
    math.import({
      'foo': math.typed('foo', {
        'number': function number(x) {
          return 'foo(number)';
        }
      })
    });

    math.import({
      'foo': math.typed('foo', {
        'string': function string(x) {
          return 'foo(string)';
        }
      })
    });

    _assert2.default.deepEqual(Object.keys(math.foo.signatures).sort(), ['number', 'string']);
    _assert2.default.equal(math.foo(2), 'foo(number)');
    _assert2.default.equal(math.foo('bar'), 'foo(string)');
    _assert2.default.throws(function () {
      math.foo(new Date());
    }, /TypeError: Unexpected type of argument in function foo/);
  });

  it('should override existing typed functions', function () {
    math.import({
      'foo': math.typed('foo', {
        'Date': function Date(x) {
          return 'foo(Date)';
        }
      })
    });

    _assert2.default.equal(math.foo(new Date()), 'foo(Date)');

    math.import({
      'foo': math.typed('foo', {
        'string': function string(x) {
          return 'foo(string)';
        }
      })
    }, { override: true });

    _assert2.default.deepEqual(Object.keys(math.foo.signatures).sort(), ['string']);
    _assert2.default.equal(math.foo('bar'), 'foo(string)');
    _assert2.default.throws(function () {
      math.foo(new Date());
    }, /TypeError: Unexpected type of argument in function foo/);
    _assert2.default.throws(function () {
      math.foo(new Date());
    }, /TypeError: Unexpected type of argument in function foo/);
  });

  it('should merge typed functions coming from a factory', function () {
    math.import({
      'foo': math.typed('foo', {
        'number': function number(x) {
          return 'foo(number)';
        }
      })
    });

    math.import({
      'name': 'foo',
      'factory': function factory() {
        return math.typed('foo', {
          'string': function string(x) {
            return 'foo(string)';
          }
        });
      }
    });

    _assert2.default.deepEqual(Object.keys(math.foo.signatures).sort(), ['number', 'string']);
    _assert2.default.equal(math.foo(2), 'foo(number)');
    _assert2.default.equal(math.foo('bar'), 'foo(string)');
    _assert2.default.throws(function () {
      math.foo(new Date());
    }, /TypeError: Unexpected type of argument in function foo/);
  });

  it('should import a boolean', function () {
    math.import({ a: true });
    _assert2.default.strictEqual(math.a, true);
  });

  it('should import a function with transform', function () {
    function foo(text) {
      return text.toLowerCase();
    }

    foo.transform = function foo(text) {
      return text.toUpperCase();
    };

    math.import({ foo: foo });

    (0, _assert2.default)(math.hasOwnProperty('foo'));
    _assert2.default.strictEqual(math.foo, foo);
    (0, _assert2.default)(math.expression.transform.hasOwnProperty('foo'));
    _assert2.default.strictEqual(math.expression.transform.foo, foo.transform);
  });

  it.skip('should import a factory with name', function () {
    // TODO: unit test importing a factory
  });

  it.skip('should import a factory with path', function () {
    // TODO: unit test importing a factory
  });

  it.skip('should import a factory without name', function () {
    // TODO: unit test importing a factory
  });

  it.skip('should pass the namespace to a factory function', function () {
    // TODO: unit test importing a factory
  });

  it.skip('should import an Array', function () {
    // TODO: unit test importing an Array containing stuff
  });

  it('should LaTeX import', function () {
    var expression = math.parse('import(object)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{import}\\left( object\\right)');
  });
});
