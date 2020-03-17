"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../tools/approx");

var _ArgumentsError = require("../../lib/error/ArgumentsError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../index');
var parse = math.expression.parse;
var ConditionalNode = math.expression.node.ConditionalNode;
var OperatorNode = math.expression.node.OperatorNode;
var RangeNode = math.expression.node.RangeNode;
var Complex = math.type.Complex;
var Matrix = math.type.Matrix;
var Range = math.type.Range;
var Unit = math.type.Unit;
var ResultSet = math.type.ResultSet;

/**
 * Helper function to parse an expression and immediately evaluate its results
 * @param {String} expr
 * @param {Object} [scope]
 * @return {*} result
 */
function parseAndEval(expr, scope) {
  return parse(expr).eval(scope);
}

describe('parse', function () {

  it('should parse a single expression', function () {
    (0, _approx.equal)(parse('2 + 6 / 3').compile().eval(), 4);
  });

  it('should parse an empty expression', function () {
    _assert2.default.strictEqual(parse('').compile().eval(), undefined);
  });

  it('should parse an array with expressions', function () {
    var scope = {};
    _assert2.default.deepEqual(parse(['a=3', 'b=4', 'a*b']).map(function (node) {
      return node.compile().eval(scope);
    }), [3, 4, 12]);
  });

  it('should parse a matrix with expressions', function () {
    var scope = {};
    _assert2.default.deepEqual(parse(math.matrix(['a=3', 'b=4', 'a*b'])).map(function (node) {
      return node.compile().eval(scope);
    }), math.matrix([3, 4, 12]));
  });

  it('should parse an array with an empty expression', function () {
    _assert2.default.deepEqual(parse(['']).map(function (node) {
      return node.compile().eval();
    }), [undefined]);
  });

  it('should parse an array with an empty expression', function () {
    _assert2.default.deepEqual(parse(math.matrix([''])).map(function (node) {
      return node.compile().eval();
    }), math.matrix([undefined]));
  });

  it('should parse unicode characters', function () {
    // http://unicode-table.com/en
    var scope = {};

    math.eval("\xE9 = 2", scope); // Latin Small Letter E with Acute
    _assert2.default.strictEqual(scope["\xE9"], 2);

    math.eval("\u03A6 = 3", scope); // Greek Capital Letter Phi
    _assert2.default.strictEqual(scope["\u03A6"], 3);

    math.eval("\u03A9 = 4", scope); // Greek Capital Letter Omega
    _assert2.default.strictEqual(scope["\u03A9"], 4);

    math.eval("k\xF6ln = 5", scope); // Combination of latin and unicode
    _assert2.default.strictEqual(scope["k\xF6ln"], 5);

    // test unicode characters in the astral plane (surrogate pairs
    math.eval("\uD835\uDD38 = 1", scope); // double struck capital A
    _assert2.default.strictEqual(scope["\uD835\uDD38"], 1);

    // should not allow the "holes"
    _assert2.default.throws(function () {
      math.eval("\uD835\uDCA3 = 1", scope);
    });
  });

  describe('multiline', function () {

    it('should parse multiline expressions', function () {
      _assert2.default.deepEqual(parse('a=3\nb=4\na*b').compile().eval(), new ResultSet([3, 4, 12]));
      _assert2.default.deepEqual(parse('b = 43; b * 4').compile().eval(), new ResultSet([172]));
    });

    it('should skip empty lines in multiline expressions', function () {
      _assert2.default.deepEqual(parse('\n;\n2 * 4\n').compile().eval(), new ResultSet([8]));
    });

    it('should spread operators over multiple lines', function () {
      _assert2.default.deepEqual(parse('2+\n3').compile().eval(), 5);
      _assert2.default.deepEqual(parse('2+\n\n3').compile().eval(), 5);
      _assert2.default.deepEqual(parse('2*\n3').compile().eval(), 6);
      _assert2.default.deepEqual(parse('2^\n3').compile().eval(), 8);
      _assert2.default.deepEqual(parse('2==\n3').compile().eval(), false);
      _assert2.default.deepEqual(parse('2*-\n3').compile().eval(), -6);
    });

    it('should parse multiple function assignments', function () {
      var scope = {};
      parse('f(x)=x*2;g(x)=x*3').compile().eval(scope);
      _assert2.default.equal(scope.f(2), 4);
      _assert2.default.equal(scope.g(2), 6);

      var scope2 = {};
      parse('a=2;f(x)=x^a;').compile().eval(scope2);
      _assert2.default.equal(scope2.a, 2);
      _assert2.default.equal(scope2.f(3), 9);
    });

    it('should correctly scope a function variable if also used outside the function', function () {
      var scope = {};
      var res = parse('x=2;f(x)=x^2;x').compile().eval(scope); // x should be x=2, not x of the function

      _assert2.default.deepEqual(res, { entries: [2] });
      _assert2.default.equal(scope.x, 2);
      _assert2.default.equal(scope.f(3), 9);
    });

    it('should spread a function over multiple lines', function () {
      _assert2.default.deepEqual(parse('add(\n4\n,\n2\n)').compile().eval(), 6);
    });

    it('should spread contents of parameters over multiple lines', function () {
      _assert2.default.deepEqual(parse('(\n4\n+\n2\n)').compile().eval(), 6);
    });

    it('should spread a function assignment over multiple lines', function () {
      _assert2.default.deepEqual(_typeof(parse('f(\nx\n,\ny\n)=\nx+\ny').compile().eval()), 'function');
    });

    it('should spread a variable assignment over multiple lines', function () {
      _assert2.default.deepEqual(parse('x=\n2').compile().eval(), 2);
    });

    it('should spread a matrix over multiple lines', function () {
      _assert2.default.deepEqual(parse('[\n1\n,\n2\n]').compile().eval(), math.matrix([1, 2]));
    });

    it('should spread a range over multiple lines', function () {
      _assert2.default.deepEqual(parse('2:\n4').compile().eval(), math.matrix([2, 3, 4]));
      _assert2.default.deepEqual(parse('2:\n2:\n6').compile().eval(), math.matrix([2, 4, 6]));
    });

    it('should spread an index over multiple lines', function () {
      _assert2.default.deepEqual(parse('a[\n1\n,\n1\n]').compile().eval({ a: [[1, 2], [3, 4]] }), 1);

      var scope = { a: [[1, 2], [3, 4]] };
      _assert2.default.deepEqual(parse('a[\n1\n,\n1\n]=\n100').compile().eval(scope), 100);
      _assert2.default.deepEqual(scope, { a: [[100, 2], [3, 4]] });
    });
  });

  it('should throw an error when scope contains a reserved keyword', function () {
    var scope = {
      end: 2
    };
    _assert2.default.throws(function () {
      parse('2+3').compile().eval(scope);
    }, /Scope contains an illegal symbol/);
  });

  it('should give informative syntax errors', function () {
    _assert2.default.throws(function () {
      parse('2 +');
    }, /Unexpected end of expression \(char 4\)/);
    _assert2.default.throws(function () {
      parse('2 + 3 + *');
    }, /Value expected \(char 9\)/);
  });

  it('should throw an error if called with wrong number of arguments', function () {
    _assert2.default.throws(function () {
      parse();
    }, _ArgumentsError.ArgumentsError);
    _assert2.default.throws(function () {
      parse(1, 2, 3);
    }, _ArgumentsError.ArgumentsError);
    _assert2.default.throws(function () {
      parse([1, 2]);
    }, TypeError);
  });

  it('should throw an error if called with a wrong type of argument', function () {
    _assert2.default.throws(function () {
      parse(23);
    }, TypeError);
    _assert2.default.throws(function () {
      parse(math.unit('5cm'));
    }, TypeError);
    _assert2.default.throws(function () {
      parse(new Complex(2, 3));
    }, TypeError);
    _assert2.default.throws(function () {
      parse(true);
    }, TypeError);
  });

  it('should throw an error in case of unsupported characters', function () {
    _assert2.default.throws(function () {
      parse("2\xA1");
    }, /Syntax error in part "\u00A1"/);
  });

  describe('comments', function () {

    it('should skip comments', function () {
      _assert2.default.equal(parseAndEval('2 + 3 # - 4'), 5);
    });

    it('should skip comments in a ResultSet', function () {
      _assert2.default.deepEqual(parseAndEval('2 + 3 # - 4\n6-2'), new ResultSet([5, 4]));
    });

    it('should fill in the property comment of a Node', function () {
      _assert2.default.equal(parse('2 + 3').comment, '');

      _assert2.default.equal(parse('2 + 3 # hello').comment, '# hello');
      _assert2.default.equal(parse('   # hi').comment, '# hi');

      var blockNode = parse('2 # foo\n3   # bar');
      _assert2.default.equal(blockNode.blocks.length, 2);
      _assert2.default.equal(blockNode.blocks[0].node.comment, '# foo');
      _assert2.default.equal(blockNode.blocks[1].node.comment, '# bar');
    });
  });

  describe('number', function () {

    it('should parse valid numbers', function () {
      _assert2.default.equal(parseAndEval('0'), 0);
      _assert2.default.equal(parseAndEval('3'), 3);
      _assert2.default.equal(parseAndEval('3.2'), 3.2);
      _assert2.default.equal(parseAndEval('003.2'), 3.2);
      _assert2.default.equal(parseAndEval('003.200'), 3.2);
      _assert2.default.equal(parseAndEval('.2'), 0.2);
      _assert2.default.equal(parseAndEval('3e2'), 300);
      _assert2.default.equal(parseAndEval('300e2'), 30000);
      _assert2.default.equal(parseAndEval('300e+2'), 30000);
      _assert2.default.equal(parseAndEval('300e-2'), 3);
      _assert2.default.equal(parseAndEval('300E-2'), 3);
      _assert2.default.equal(parseAndEval('3.2e2'), 320);
    });

    it('should parse a number followed by e', function () {
      (0, _approx.equal)(parseAndEval('2e'), 2 * Math.E);
    });

    it('should throw an error with invalid numbers', function () {
      _assert2.default.throws(function () {
        parseAndEval('.');
      }, /Value expected/);
      _assert2.default.throws(function () {
        parseAndEval('4.');
      }, /Unexpected operator ./);
      _assert2.default.throws(function () {
        parseAndEval('3.2.2');
      }, SyntaxError);
      _assert2.default.throws(function () {
        parseAndEval('3.2e2.2');
      }, SyntaxError);

      _assert2.default.throws(function () {
        parseAndEval('3e0.5');
      }, /Digit expected, got "."/);
      _assert2.default.throws(function () {
        parseAndEval('3e.5');
      }, /Digit expected, got "."/);
      _assert2.default.throws(function () {
        parseAndEval('-3e0.5');
      }, /Digit expected, got "."/);
      _assert2.default.throws(function () {
        parseAndEval('-3e.5');
      }, /Digit expected, got "."/);
      _assert2.default.throws(function () {
        parseAndEval('3e-0.5');
      }, /Digit expected, got "."/);
      _assert2.default.throws(function () {
        parseAndEval('3e-.5');
      }, /Digit expected, got "."/);
      _assert2.default.throws(function () {
        parseAndEval('-3e-0.5');
      }, /Digit expected, got "."/);
      _assert2.default.throws(function () {
        parseAndEval('-3e-.5');
      }, /Digit expected, got "."/);

      _assert2.default.throws(function () {
        parseAndEval('2e+a');
      }, /Digit expected, got "a"/);
    });
  });

  describe('bignumber', function () {

    it('should parse bignumbers', function () {
      _assert2.default.deepEqual(parseAndEval('bignumber(0.1)'), math.bignumber(0.1));
      _assert2.default.deepEqual(parseAndEval('bignumber("1.2e500")'), math.bignumber('1.2e500'));
    });

    it('should output bignumbers if default number type is bignumber', function () {
      var bigmath = math.create({
        number: 'BigNumber'
      });

      _assert2.default.deepEqual(bigmath.parse('0.1').compile().eval(), bigmath.bignumber(0.1));
      _assert2.default.deepEqual(bigmath.parse('1.2e5000').compile().eval(), bigmath.bignumber('1.2e5000'));
    });
  });

  describe('fraction', function () {

    it('should output fractions if default number type is fraction', function () {
      var fmath = math.create({
        number: 'Fraction'
      });

      (0, _assert2.default)(fmath.parse('0.1').compile().eval() instanceof math.type.Fraction);
      _assert2.default.equal(fmath.parse('1/3').compile().eval().toString(), '0.(3)');
      _assert2.default.equal(fmath.parse('0.1+0.2').compile().eval().toString(), '0.3');
    });
  });

  describe('string', function () {

    it('should parse a string', function () {
      _assert2.default.deepEqual(parseAndEval('"hello"'), "hello");
      _assert2.default.deepEqual(parseAndEval('   "hi" '), "hi");
    });

    it('should parse a with escaped characters', function () {
      _assert2.default.deepEqual(parseAndEval('"line end\\nnext"'), 'line end\nnext');
      _assert2.default.deepEqual(parseAndEval('"line end\\n"'), 'line end\n');
      _assert2.default.deepEqual(parseAndEval('"tab\\tnext"'), 'tab\tnext');
      _assert2.default.deepEqual(parseAndEval('"tab\\t"'), 'tab\t');
      _assert2.default.deepEqual(parseAndEval('"escaped backslash\\\\next"'), 'escaped backslash\\next');
      _assert2.default.deepEqual(parseAndEval('"escaped backslash\\\\"'), 'escaped backslash\\');
    });

    it('should throw an error with invalid strings', function () {
      _assert2.default.throws(function () {
        parseAndEval('"hi');
      }, SyntaxError);
      _assert2.default.throws(function () {
        parseAndEval(' hi" ');
      }, Error);
    });

    it('should get a string subset', function () {
      var scope = {};
      _assert2.default.deepEqual(parseAndEval('c="hello"', scope), "hello");
      _assert2.default.deepEqual(parseAndEval('c[2:4]', scope), "ell");
      _assert2.default.deepEqual(parseAndEval('c[5:-1:1]', scope), "olleh");
      _assert2.default.deepEqual(parseAndEval('c[end-2:-1:1]', scope), "leh");
      _assert2.default.deepEqual(parseAndEval('"hello"[2:4]', scope), "ell");
    });

    it('should set a string subset', function () {
      var scope = {};
      _assert2.default.deepEqual(parseAndEval('c="hello"', scope), "hello");
      _assert2.default.deepEqual(parseAndEval('c[1] = "H"', scope), "H");
      _assert2.default.deepEqual(scope.c, "Hello");
      _assert2.default.deepEqual(parseAndEval('c', scope), "Hello");
      _assert2.default.deepEqual(parseAndEval('c[6:11] = " world"', scope), " world");
      _assert2.default.deepEqual(scope.c, "Hello world");
      _assert2.default.deepEqual(parseAndEval('c[end] = "D"', scope), "D");
      _assert2.default.deepEqual(scope.c, "Hello worlD");
    });

    it('should set a string subset on an object', function () {
      var scope = { a: {} };
      _assert2.default.deepEqual(parseAndEval('a.c="hello"', scope), "hello");
      _assert2.default.deepEqual(parseAndEval('a.c[1] = "H"', scope), "H");
      _assert2.default.deepEqual(scope.a, { c: "Hello" });
      _assert2.default.deepEqual(parseAndEval('a.c', scope), "Hello");
      _assert2.default.deepEqual(parseAndEval('a.c[6:11] = " world"', scope), " world");
      _assert2.default.deepEqual(scope.a, { c: "Hello world" });
      _assert2.default.deepEqual(parseAndEval('a.c', scope), "Hello world");
      _assert2.default.deepEqual(scope.a, { c: "Hello world" });
      _assert2.default.deepEqual(parseAndEval('a.c[end] = "D"', scope), "D");
      _assert2.default.deepEqual(scope.a, { c: "Hello worlD" });
    });
  });

  describe('unit', function () {

    it('should parse units', function () {
      _assert2.default.deepEqual(parseAndEval('5cm'), new Unit(5, 'cm'));
      _assert2.default.ok(parseAndEval('5cm') instanceof Unit);
    });

    it('should correctly parse negative temperatures', function () {
      (0, _approx.equal)(parseAndEval('-6 celsius'), new Unit(-6, 'celsius'));
      (0, _approx.equal)(parseAndEval('--6 celsius'), new Unit(6, 'celsius'));
      (0, _approx.equal)(parseAndEval('-6 celsius to fahrenheit'), new Unit(21.2, 'fahrenheit').to('fahrenheit'));
    });

    it('should convert units', function () {
      var scope = {};
      (0, _approx.equal)(parseAndEval('(5.08 cm * 1000) to inch', scope), math.unit(2000, 'inch').to('inch'));
      (0, _approx.equal)(parseAndEval('a = (5.08 cm * 1000) to mm', scope), math.unit(50800, 'mm').to('mm'));
      (0, _approx.equal)(parseAndEval('a to inch', scope), math.unit(2000, 'inch').to('inch'));

      (0, _approx.equal)(parseAndEval('10 celsius to fahrenheit'), math.unit(50, 'fahrenheit').to('fahrenheit'));
      (0, _approx.equal)(parseAndEval('20 celsius to fahrenheit'), math.unit(68, 'fahrenheit').to('fahrenheit'));
      (0, _approx.equal)(parseAndEval('50 fahrenheit to celsius'), math.unit(10, 'celsius').to('celsius'));
    });

    it('should evaluate operator "to" with correct precedence ', function () {
      (0, _approx.equal)(parseAndEval('5.08 cm * 1000 to inch'), new Unit(2000, 'inch').to('inch'));
    });

    it('should evaluate operator "in" (alias of "to") ', function () {
      (0, _approx.equal)(parseAndEval('5.08 cm in inch'), new Unit(2, 'inch').to('inch'));
    });

    it('should evaluate unit "in" (should not conflict with operator "in")', function () {
      (0, _approx.equal)(parseAndEval('2 in'), new Unit(2, 'in'));
      (0, _approx.equal)(parseAndEval('5.08 cm in in'), new Unit(2, 'in').to('in'));
      (0, _approx.equal)(parseAndEval('5 in in in'), new Unit(5, 'in').to('in'));
      (0, _approx.equal)(parseAndEval('2 in to meter'), new Unit(2, 'inch').to('meter'));
      (0, _approx.equal)(parseAndEval('2 in in meter'), new Unit(2, 'inch').to('meter'));
      (0, _approx.equal)(parseAndEval('a in inch', { a: new Unit(5.08, 'cm') }), new Unit(2, 'inch').to('inch'));
      (0, _approx.equal)(parseAndEval('(2+3) in'), new Unit(5, 'in'));
      (0, _approx.equal)(parseAndEval('a in', { a: 5 }), new Unit(5, 'in'));
      (0, _approx.equal)(parseAndEval('0.5in + 1.5in to cm'), new Unit(5.08, 'cm').to('cm'));
    });
  });

  describe('complex', function () {

    it('should parse complex values', function () {
      _assert2.default.deepEqual(parseAndEval('i'), new Complex(0, 1));
      _assert2.default.deepEqual(parseAndEval('2+3i'), new Complex(2, 3));
      _assert2.default.deepEqual(parseAndEval('2+3*i'), new Complex(2, 3));
      _assert2.default.deepEqual(parseAndEval('1/2i'), new Complex(0, 0.5));
    });
  });

  describe('matrix', function () {

    it('should parse a matrix', function () {
      _assert2.default.ok(parseAndEval('[1,2;3,4]') instanceof Matrix);

      var m = parseAndEval('[1,2,3;4,5,6]');
      _assert2.default.deepEqual(m.size(), [2, 3]);
      _assert2.default.deepEqual(m, math.matrix([[1, 2, 3], [4, 5, 6]]));

      var b = parseAndEval('[5, 6; 1, 1]');
      _assert2.default.deepEqual(b.size(), [2, 2]);
      _assert2.default.deepEqual(b, math.matrix([[5, 6], [1, 1]]));

      // from 1 to n dimensions
      _assert2.default.deepEqual(parseAndEval('[ ]'), math.matrix([]));
      _assert2.default.deepEqual(parseAndEval('[1,2,3]'), math.matrix([1, 2, 3]));
      _assert2.default.deepEqual(parseAndEval('[1;2;3]'), math.matrix([[1], [2], [3]]));
      _assert2.default.deepEqual(parseAndEval('[[1,2],[3,4]]'), math.matrix([[1, 2], [3, 4]]));
      _assert2.default.deepEqual(parseAndEval('[[[1],[2]],[[3],[4]]]'), math.matrix([[[1], [2]], [[3], [4]]]));
    });

    it('should parse an empty matrix', function () {
      _assert2.default.deepEqual(parseAndEval('[]'), math.matrix([]));
    });

    it('should get a matrix subset', function () {
      var scope = {
        a: math.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
      };
      _assert2.default.deepEqual(parseAndEval('a[2, :]', scope), math.matrix([[4, 5, 6]]));
      _assert2.default.deepEqual(parseAndEval('a[2, :2]', scope), math.matrix([[4, 5]]));
      _assert2.default.deepEqual(parseAndEval('a[2, :end-1]', scope), math.matrix([[4, 5]]));
      _assert2.default.deepEqual(parseAndEval('a[2, 2:]', scope), math.matrix([[5, 6]]));
      _assert2.default.deepEqual(parseAndEval('a[2, 2:3]', scope), math.matrix([[5, 6]]));
      _assert2.default.deepEqual(parseAndEval('a[2, 1:2:3]', scope), math.matrix([[4, 6]]));
      _assert2.default.deepEqual(parseAndEval('a[:, 2]', scope), math.matrix([[2], [5], [8]]));
      _assert2.default.deepEqual(parseAndEval('a[:2, 2]', scope), math.matrix([[2], [5]]));
      _assert2.default.deepEqual(parseAndEval('a[:end-1, 2]', scope), math.matrix([[2], [5]]));
      _assert2.default.deepEqual(parseAndEval('a[2:, 2]', scope), math.matrix([[5], [8]]));
      _assert2.default.deepEqual(parseAndEval('a[2:3, 2]', scope), math.matrix([[5], [8]]));
      _assert2.default.deepEqual(parseAndEval('a[1:2:3, 2]', scope), math.matrix([[2], [8]]));
    });

    it('should get a matrix subset of a matrix subset', function () {
      var scope = {
        a: math.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
      };
      _assert2.default.deepEqual(parseAndEval('a[2, :][1,1]', scope), 4);
    });

    it('should parse matrix resizings', function () {
      var scope = {};
      _assert2.default.deepEqual(parseAndEval('a = []', scope), math.matrix([]));
      _assert2.default.deepEqual(parseAndEval('a[1:3,1] = [1;2;3]', scope), math.matrix([[1], [2], [3]]));
      _assert2.default.deepEqual(parseAndEval('a[:,2] = [4;5;6]', scope), math.matrix([[4], [5], [6]]));
      _assert2.default.deepEqual(scope.a, math.matrix([[1, 4], [2, 5], [3, 6]]));

      _assert2.default.deepEqual(parseAndEval('a = []', scope), math.matrix([]));
      _assert2.default.strictEqual(parseAndEval('a[1,3] = 3', scope), 3);
      _assert2.default.deepEqual(scope.a, math.matrix([[0, 0, 3]]));
      _assert2.default.deepEqual(parseAndEval('a[2,:] = [[4,5,6]]', scope), math.matrix([[4, 5, 6]]));
      _assert2.default.deepEqual(scope.a, math.matrix([[0, 0, 3], [4, 5, 6]]));

      _assert2.default.deepEqual(parseAndEval('a = []', scope), math.matrix([]));
      _assert2.default.strictEqual(parseAndEval('a[3,1] = 3', scope), 3);
      _assert2.default.deepEqual(scope.a, math.matrix([[0], [0], [3]]));
      _assert2.default.deepEqual(parseAndEval('a[:,2] = [4;5;6]', scope), math.matrix([[4], [5], [6]]));
      _assert2.default.deepEqual(scope.a, math.matrix([[0, 4], [0, 5], [3, 6]]));

      _assert2.default.deepEqual(parseAndEval('a = []', scope), math.matrix([]));
      _assert2.default.deepEqual(parseAndEval('a[1,1:3] = [[1,2,3]]', scope), math.matrix([[1, 2, 3]]));
      _assert2.default.deepEqual(scope.a, math.matrix([[1, 2, 3]]));
      _assert2.default.deepEqual(parseAndEval('a[2,:] = [[4,5,6]]', scope), math.matrix([[4, 5, 6]]));
      _assert2.default.deepEqual(scope.a, math.matrix([[1, 2, 3], [4, 5, 6]]));
    });

    it('should get/set the matrix correctly', function () {
      var scope = {};
      parseAndEval('a=[1,2;3,4]', scope);
      parseAndEval('a[1,1] = 100', scope);
      _assert2.default.deepEqual(scope.a.size(), [2, 2]);
      _assert2.default.deepEqual(scope.a, math.matrix([[100, 2], [3, 4]]));
      parseAndEval('a[2:3,2:3] = [10,11;12,13]', scope);
      _assert2.default.deepEqual(scope.a.size(), [3, 3]);
      _assert2.default.deepEqual(scope.a, math.matrix([[100, 2, 0], [3, 10, 11], [0, 12, 13]]));
      var a = scope.a;
      // note: after getting subset, uninitialized elements are replaced by elements with an undefined value
      _assert2.default.deepEqual(a.subset(math.index(new Range(0, 3), new Range(0, 2))), math.matrix([[100, 2], [3, 10], [0, 12]]));
      _assert2.default.deepEqual(parseAndEval('a[1:3,1:2]', scope), math.matrix([[100, 2], [3, 10], [0, 12]]));

      scope.b = [[1, 2], [3, 4]];
      _assert2.default.deepEqual(parseAndEval('b[1,:]', scope), [[1, 2]]);
    });

    it('should get/set the matrix correctly for 3d matrices', function () {
      var scope = {};
      _assert2.default.deepEqual(parseAndEval('f=[1,2;3,4]', scope), math.matrix([[1, 2], [3, 4]]));
      _assert2.default.deepEqual(parseAndEval('size(f)', scope), math.matrix([2, 2]));

      parseAndEval('f[:,:,2]=[5,6;7,8]', scope);
      _assert2.default.deepEqual(scope.f, math.matrix([[[1, 5], [2, 6]], [[3, 7], [4, 8]]]));

      _assert2.default.deepEqual(parseAndEval('size(f)', scope), math.matrix([2, 2, 2]));
      _assert2.default.deepEqual(parseAndEval('f[:,:,1]', scope), math.matrix([[[1], [2]], [[3], [4]]]));
      _assert2.default.deepEqual(parseAndEval('f[:,:,2]', scope), math.matrix([[[5], [6]], [[7], [8]]]));
      _assert2.default.deepEqual(parseAndEval('f[:,2,:]', scope), math.matrix([[[2, 6]], [[4, 8]]]));
      _assert2.default.deepEqual(parseAndEval('f[2,:,:]', scope), math.matrix([[[3, 7], [4, 8]]]));

      parseAndEval('a=diag([1,2,3,4])', scope);
      _assert2.default.deepEqual(parseAndEval('a[3:end, 3:end]', scope), math.matrix([[3, 0], [0, 4]]));
      parseAndEval('a[3:end, 2:end]=9*ones(2,3)', scope);
      _assert2.default.deepEqual(scope.a, math.matrix([[1, 0, 0, 0], [0, 2, 0, 0], [0, 9, 9, 9], [0, 9, 9, 9]]));
      _assert2.default.deepEqual(parseAndEval('a[2:end-1, 2:end-1]', scope), math.matrix([[2, 0], [9, 9]]));
    });

    it('should merge nested matrices', function () {
      var scope = {};
      parseAndEval('a=[1,2;3,4]', scope);
    });

    it('should parse matrix concatenations', function () {
      var scope = {};
      parseAndEval('a=[1,2;3,4]', scope);
      parseAndEval('b=[5,6;7,8]', scope);
      _assert2.default.deepEqual(parseAndEval('c=concat(a,b)', scope), math.matrix([[1, 2, 5, 6], [3, 4, 7, 8]]));
      _assert2.default.deepEqual(parseAndEval('c=concat(a,b,1)', scope), math.matrix([[1, 2], [3, 4], [5, 6], [7, 8]]));
      _assert2.default.deepEqual(parseAndEval('c=concat(concat(a,b), concat(b,a), 1)', scope), math.matrix([[1, 2, 5, 6], [3, 4, 7, 8], [5, 6, 1, 2], [7, 8, 3, 4]]));
      _assert2.default.deepEqual(parseAndEval('c=concat([[1,2]], [[3,4]], 1)', scope), math.matrix([[1, 2], [3, 4]]));
      _assert2.default.deepEqual(parseAndEval('c=concat([[1,2]], [[3,4]], 2)', scope), math.matrix([[1, 2, 3, 4]]));
      _assert2.default.deepEqual(parseAndEval('c=concat([[1]], [2;3], 1)', scope), math.matrix([[1], [2], [3]]));
      _assert2.default.deepEqual(parseAndEval('d=1:3', scope), math.matrix([1, 2, 3]));
      _assert2.default.deepEqual(parseAndEval('concat(d,d)', scope), math.matrix([1, 2, 3, 1, 2, 3]));
      _assert2.default.deepEqual(parseAndEval('e=1+d', scope), math.matrix([2, 3, 4]));
      _assert2.default.deepEqual(parseAndEval('size(e)', scope), math.matrix([3]));
      _assert2.default.deepEqual(parseAndEval('concat(e,e)', scope), math.matrix([2, 3, 4, 2, 3, 4]));
      _assert2.default.deepEqual(parseAndEval('[[],[]]', scope), math.matrix([[], []]));
      _assert2.default.deepEqual(parseAndEval('[[],[]]', scope).size(), [2, 0]);
      _assert2.default.deepEqual(parseAndEval('size([[],[]])', scope), math.matrix([2, 0]));
    });

    it('should execute map on an array with one based indices', function () {
      var logs = [];
      var scope = {
        A: [1, 2, 3],
        callback: function callback(value, index, matrix) {
          _assert2.default.strictEqual(matrix, scope.A);
          // note: we don't copy index, index should be a new Array for every call of callback
          logs.push([value, index]);
          return value + 1;
        }
      };
      var res = math.eval('map(A, callback)', scope);
      _assert2.default.deepEqual(res, [2, 3, 4]);

      _assert2.default.deepEqual(logs, [[1, [1]], [2, [2]], [3, [3]]]);
    });

    it('should execute map on a Matrix with one based indices', function () {
      var logs = [];
      var scope = {
        A: math.matrix([1, 2, 3]),
        callback: function callback(value, index, matrix) {
          _assert2.default.strictEqual(matrix, scope.A);
          // note: we don't copy index, index should be a new Array for every call of callback
          logs.push([value, index]);
          return value + 1;
        }
      };
      var res = math.eval('map(A, callback)', scope);
      _assert2.default.deepEqual(res, math.matrix([2, 3, 4]));

      _assert2.default.deepEqual(logs, [[1, [1]], [2, [2]], [3, [3]]]);
    });

    it('should execute forEach on an array with one based indices', function () {
      var logs = [];
      var scope = {
        A: [1, 2, 3],
        callback: function callback(value, index, matrix) {
          _assert2.default.strictEqual(matrix, scope.A);
          // note: we don't copy index, index should be a new Array for every call of callback
          logs.push([value, index]);
        }
      };
      math.eval('forEach(A, callback)', scope);

      _assert2.default.deepEqual(logs, [[1, [1]], [2, [2]], [3, [3]]]);
    });

    it('should execute forEach on a Matrix with one based indices', function () {
      var logs = [];
      var scope = {
        A: math.matrix([1, 2, 3]),
        callback: function callback(value, index, matrix) {
          _assert2.default.strictEqual(matrix, scope.A);
          // note: we don't copy index, index should be a new Array for every call of callback
          logs.push([value, index]);
        }
      };
      math.eval('forEach(A, callback)', scope);

      _assert2.default.deepEqual(logs, [[1, [1]], [2, [2]], [3, [3]]]);
    });

    it('should disable arrays as range in a matrix index', function () {
      var scope = {
        a: [[1, 2, 3], [4, 5, 6]]
      };

      _assert2.default.throws(function () {
        parseAndEval('a[2, 2+3i]', scope);
      }, /TypeError: Dimension must be an Array, Matrix, number, string, or Range/);
    });

    it('should throw an error for invalid matrix', function () {
      _assert2.default.throws(function () {
        parseAndEval('[1, 2');
      }, /End of matrix ] expected/);
      _assert2.default.throws(function () {
        parseAndEval('[1; 2');
      }, /End of matrix ] expected/);
    });

    it('should throw an error when matrix rows mismatch', function () {
      _assert2.default.throws(function () {
        parseAndEval('[1, 2; 1, 2, 3]');
      }, /Column dimensions mismatch/);
    });

    it('should throw an error for invalid matrix subsets', function () {
      var scope = { a: [1, 2, 3] };
      _assert2.default.throws(function () {
        parseAndEval('a[1', scope);
      }, /Parenthesis ] expected/);
    });

    it('should throw an error for invalid matrix concatenations', function () {
      var scope = {};
      _assert2.default.throws(function () {
        parseAndEval('c=concat(a, [1,2,3])', scope);
      });
    });
  });

  describe('objects', function () {

    it('should get an object property', function () {
      _assert2.default.deepEqual(parseAndEval('obj["foo"]', { obj: { foo: 2 } }), 2);
    });

    it('should get a nested object property', function () {
      _assert2.default.deepEqual(parseAndEval('obj["foo"]["bar"]', { obj: { foo: { bar: 2 } } }), 2);
    });

    it('should get a nested matrix subset from an object property', function () {
      _assert2.default.deepEqual(parseAndEval('obj.foo[2]', { obj: { foo: [1, 2, 3] } }), 2);
      _assert2.default.deepEqual(parseAndEval('obj.foo[end]', { obj: { foo: [1, 2, 3] } }), 3);
      _assert2.default.deepEqual(parseAndEval('obj.foo[2][3]', { obj: { foo: ['hello', 'world'] } }), 'r');
      _assert2.default.deepEqual(parseAndEval('obj.foo[2][end]', { obj: { foo: ['hello', 'world'] } }), 'd');
      _assert2.default.deepEqual(parseAndEval('obj.foo[1].bar', { obj: { foo: [{ bar: 4 }] } }), 4);
    });

    it('should set an object property', function () {
      var scope = { obj: { a: 3 } };
      var res = parseAndEval('obj["b"] = 2', scope);
      _assert2.default.strictEqual(res, 2);
      _assert2.default.deepEqual(scope, { obj: { a: 3, b: 2 } });
    });

    it('should set a nested object property', function () {
      var scope = { obj: { foo: {} } };
      var res = parseAndEval('obj["foo"]["bar"] = 2', scope);
      _assert2.default.strictEqual(res, 2);
      _assert2.default.deepEqual(scope, { obj: { foo: { bar: 2 } } });
    });

    it('should throw an error when trying to apply a matrix index as object property', function () {
      var scope = { a: {} };
      _assert2.default.throws(function () {
        parseAndEval('a[2] = 6', scope);
      }, /Cannot apply a numeric index as object property/);
    });

    it('should set a nested matrix subset from an object property (1)', function () {
      var scope = { obj: { foo: [1, 2, 3] } };
      _assert2.default.deepEqual(parseAndEval('obj.foo[2] = 6', scope), 6);
      _assert2.default.deepEqual(scope, { obj: { foo: [1, 6, 3] } });

      _assert2.default.deepEqual(parseAndEval('obj.foo[end] = 8', scope), 8);
      _assert2.default.deepEqual(scope, { obj: { foo: [1, 6, 8] } });
    });

    it('should set a nested matrix subset from an object property (2)', function () {
      var scope = { obj: { foo: [{ bar: 4 }] } };
      _assert2.default.deepEqual(parseAndEval('obj.foo[1].bar = 6', scope), 6);
      _assert2.default.deepEqual(scope, { obj: { foo: [{ bar: 6 }] } });
    });

    it('should set a nested matrix subset from an object property (3)', function () {
      var scope = { obj: { foo: [{ bar: {} }] } };
      _assert2.default.deepEqual(parseAndEval('obj.foo[1].bar.baz = 6', scope), 6);
      _assert2.default.deepEqual(scope, { obj: { foo: [{ bar: { baz: 6 } }] } });
    });

    it('should set a nested matrix subset from an object property (4)', function () {
      var scope = { obj: { foo: ['hello', 'world'] } };
      _assert2.default.deepEqual(parseAndEval('obj.foo[1][end] = "a"', scope), 'a');
      _assert2.default.deepEqual(scope, { obj: { foo: ['hella', 'world'] } });
      _assert2.default.deepEqual(parseAndEval('obj.foo[end][end] = "!"', scope), '!');
      _assert2.default.deepEqual(scope, { obj: { foo: ['hella', 'worl!'] } });
    });

    // TODO: test whether 1-based IndexErrors are thrown

    it('should get an object property with dot notation', function () {
      _assert2.default.deepEqual(parseAndEval('obj.foo', { obj: { foo: 2 } }), 2);
    });

    it('should get an object property from an object inside parentheses', function () {
      _assert2.default.deepEqual(parseAndEval('(obj).foo', { obj: { foo: 2 } }), 2);
    });

    it('should get a nested object property with dot notation', function () {
      _assert2.default.deepEqual(parseAndEval('obj.foo.bar', { obj: { foo: { bar: 2 } } }), 2);
    });

    it('should invoke a function in an object', function () {
      var scope = {
        obj: {
          fn: function fn(x) {
            return x * x;
          }
        }
      };
      _assert2.default.deepEqual(parseAndEval('obj.fn(2)', scope), 4);
      _assert2.default.deepEqual(parseAndEval('obj["fn"](2)', scope), 4);
    });

    it('should invoke a function on an object with the right context', function () {
      (0, _approx.equal)(parseAndEval('(2.54 cm).toNumeric("inch")'), 1);
      _assert2.default.deepEqual(parseAndEval('bignumber(2).plus(3)'), math.bignumber(5));
      _assert2.default.deepEqual(parseAndEval('bignumber(2)["plus"](3)'), math.bignumber(5));
    });

    it('should invoke toString on some object', function () {
      _assert2.default.strictEqual(parseAndEval('(3).toString()'), '3');
    });

    it('should get nested object property with mixed dot- and index-notation', function () {
      _assert2.default.deepEqual(parseAndEval('obj.foo["bar"].baz', { obj: { foo: { bar: { baz: 2 } } } }), 2);
      _assert2.default.deepEqual(parseAndEval('obj["foo"].bar["baz"]', { obj: { foo: { bar: { baz: 2 } } } }), 2);
    });

    it('should set an object property with dot notation', function () {
      var scope = { obj: {} };
      parseAndEval('obj.foo = 2', scope);
      _assert2.default.deepEqual(scope, { obj: { foo: 2 } });
    });

    it('should set a nested object property with dot notation', function () {
      var scope = { obj: { foo: {} } };
      parseAndEval('obj.foo.bar = 2', scope);
      _assert2.default.deepEqual(scope, { obj: { foo: { bar: 2 } } });
    });

    it('should throw an error in case of invalid property with dot notation', function () {
      _assert2.default.throws(function () {
        parseAndEval('obj. +foo');
      }, /SyntaxError: Property name expected after dot \(char 6\)/);
      _assert2.default.throws(function () {
        parseAndEval('obj.["foo"]');
      }, /SyntaxError: Property name expected after dot \(char 5\)/);
    });

    it('should create an empty object', function () {
      _assert2.default.deepEqual(parseAndEval('{}'), {});
    });

    it('should create an object with quoted keys', function () {
      _assert2.default.deepEqual(parseAndEval('{"a":2+3,"b":"foo"}'), { a: 5, b: 'foo' });
    });

    it('should create an object with unquoted keys', function () {
      _assert2.default.deepEqual(parseAndEval('{a:2+3,b:"foo"}'), { a: 5, b: 'foo' });
    });

    it('should create an object with child object', function () {
      _assert2.default.deepEqual(parseAndEval('{a:{b:2}}'), { a: { b: 2 } });
    });

    it('should get a property from a just created object', function () {
      _assert2.default.deepEqual(parseAndEval('{foo:2}["foo"]'), 2);
    });

    it('should parse an object containing a function assignment', function () {
      var obj = parseAndEval('{f: f(x)=x^2}');
      _assert2.default.deepEqual(Object.keys(obj), ['f']);
      _assert2.default.equal(obj.f(2), 4);
    });

    it('should parse an object containing a variable assignment', function () {
      var scope = {};
      _assert2.default.deepEqual(parseAndEval('{f: a=42}', scope), { f: 42 });
      _assert2.default.strictEqual(scope.a, 42);
    });

    it('should throw an exception in case of invalid object key', function () {
      _assert2.default.throws(function () {
        parseAndEval('{a b: 2}');
      }, /SyntaxError: Colon : expected after object key \(char 4\)/);
      _assert2.default.throws(function () {
        parseAndEval('{a: }');
      }, /SyntaxError: Value expected \(char 5\)/);
    });
  });

  describe('boolean', function () {

    it('should parse boolean values', function () {
      _assert2.default.equal(parseAndEval('true'), true);
      _assert2.default.equal(parseAndEval('false'), false);
    });
  });

  describe('constants', function () {

    it('should parse constants', function () {
      _assert2.default.deepEqual(parseAndEval('i'), new Complex(0, 1));
      (0, _approx.equal)(parseAndEval('pi'), Math.PI);
      (0, _approx.equal)(parseAndEval('e'), Math.E);
    });
  });

  describe('variables', function () {

    it('should parse valid variable assignments', function () {
      var scope = {};
      _assert2.default.equal(parseAndEval('a = 0.75', scope), 0.75);
      _assert2.default.equal(parseAndEval('a + 2', scope), 2.75);
      _assert2.default.equal(parseAndEval('a = 2', scope), 2);
      _assert2.default.equal(parseAndEval('a + 2', scope), 4);
      (0, _approx.equal)(parseAndEval('pi * 2', scope), 6.283185307179586);
    });

    it('should throw an error on undefined symbol', function () {
      _assert2.default.throws(function () {
        parseAndEval('qqq + 2');
      });
    });

    it('should throw an error on invalid assignments', function () {
      //assert.throws(function () {parseAndEval('sin(2) = 0.75')}, SyntaxError); // TODO: should this throw an exception?
      _assert2.default.throws(function () {
        parseAndEval('sin + 2 = 3');
      }, SyntaxError);
    });

    it('should parse nested assignments', function () {
      var scope = [];
      _assert2.default.equal(parseAndEval('c = d = (e = 4.5)', scope), 4.5);
      _assert2.default.equal(scope.c, 4.5);
      _assert2.default.equal(scope.d, 4.5);
      _assert2.default.equal(scope.e, 4.5);
      _assert2.default.deepEqual(parseAndEval('a = [1,2,f=3]', scope), math.matrix([1, 2, 3]));
      _assert2.default.equal(scope.f, 3);
      _assert2.default.equal(parseAndEval('2 + (g = 3 + 4)', scope), 9);
      _assert2.default.equal(scope.g, 7);
    });

    it('should parse variable assignment inside a function call', function () {
      var scope = {};
      _assert2.default.deepEqual(parseAndEval('sqrt(x=4)', scope), 2);
      _assert2.default.deepEqual(scope, { x: 4 });
    });

    it('should parse variable assignment inside an accessor', function () {
      var scope = { A: [10, 20, 30] };
      _assert2.default.deepEqual(parseAndEval('A[x=2]', scope), 20);
      _assert2.default.deepEqual(scope, { A: [10, 20, 30], x: 2 });
    });
  });

  describe('functions', function () {

    it('should parse functions', function () {
      _assert2.default.equal(parseAndEval('sqrt(4)'), 2);
      _assert2.default.equal(parseAndEval('sqrt(6+3)'), 3);
      _assert2.default.equal(parseAndEval('atan2(2,2)'), 0.7853981633974483);
      _assert2.default.deepEqual(parseAndEval('sqrt(-4)'), new Complex(0, 2));
      _assert2.default.equal(parseAndEval('abs(-4.2)'), 4.2);
      _assert2.default.equal(parseAndEval('add(2, 3)'), 5);
      (0, _approx.equal)(parseAndEval('1+exp(pi*i)'), new Complex(0, 0));
      _assert2.default.equal(parseAndEval('unequal(2, 3)'), true);
    });

    it('should get a subset of a matrix returned by a function', function () {
      var scope = {
        test: function test() {
          return [1, 2, 3, 4];
        }
      };
      _assert2.default.equal(parseAndEval('test()[2]', scope), 2);
    });

    it('should parse functions without parameters', function () {
      _assert2.default.equal(parseAndEval('r()', { r: function r() {
          return 2;
        } }), 2);
    });

    it('should parse function assignments', function () {
      var scope = {};
      parseAndEval('x=100', scope); // for testing scoping of the function variables
      _assert2.default.equal(parseAndEval('f(x) = x^2', scope).syntax, 'f(x)');
      _assert2.default.equal(parseAndEval('f(3)', scope), 9);
      _assert2.default.equal(scope.f(3), 9);
      _assert2.default.equal(scope.x, 100);
      _assert2.default.equal(parseAndEval('g(x, y) = x^y', scope).syntax, 'g(x, y)');
      _assert2.default.equal(parseAndEval('g(4,5)', scope), 1024);
      _assert2.default.equal(scope.g(4, 5), 1024);
    });

    it('should correctly evaluate variables in assigned functions', function () {
      var scope = {};
      _assert2.default.equal(parseAndEval('a = 3', scope), 3);
      _assert2.default.equal(parseAndEval('f(x) = a * x', scope).syntax, 'f(x)');
      _assert2.default.equal(parseAndEval('f(2)', scope), 6);
      _assert2.default.equal(parseAndEval('a = 5', scope), 5);
      _assert2.default.equal(parseAndEval('f(2)', scope), 10);
      _assert2.default.equal(parseAndEval('g(x) = x^q', scope).syntax, 'g(x)');
      _assert2.default.equal(parseAndEval('q = 4/2', scope), 2);
      _assert2.default.equal(parseAndEval('g(3)', scope), 9);
    });

    it('should throw an error for undefined variables in an assigned function', function () {
      var scope = {};
      _assert2.default.equal(parseAndEval('g(x) = x^q', scope).syntax, 'g(x)');
      _assert2.default.throws(function () {
        parseAndEval('g(3)', scope);
      }, function (err) {
        return err instanceof Error && err.toString() == 'Error: Undefined symbol q';
      });
    });

    it('should throw an error on invalid left hand side of a function assignment', function () {
      _assert2.default.throws(function () {
        var scope = {};
        parseAndEval('g(x, 2) = x^2', scope);
      }, SyntaxError);

      _assert2.default.throws(function () {
        var scope = {};
        parseAndEval('2(x, 2) = x^2', scope);
      }, SyntaxError);
    });
  });

  describe('parentheses', function () {
    it('should parse parentheses overriding the default precedence', function () {
      (0, _approx.equal)(parseAndEval('2 - (2 - 2)'), 2);
      (0, _approx.equal)(parseAndEval('2 - ((2 - 2) - 2)'), 4);
      (0, _approx.equal)(parseAndEval('3 * (2 + 3)'), 15);
      (0, _approx.equal)(parseAndEval('(2 + 3) * 3'), 15);
    });

    it('should throw an error in case of unclosed parentheses', function () {
      _assert2.default.throws(function () {
        parseAndEval('3 * (1 + 2');
      }, /Parenthesis \) expected/);
    });
  });

  describe('operators', function () {

    it('should parse operations', function () {
      (0, _approx.equal)(parseAndEval('(2+3)/4'), 1.25);
      (0, _approx.equal)(parseAndEval('2+3/4'), 2.75);
      _assert2.default.equal(parse('0 + 2').toString(), '0 + 2');
    });

    it('should parse add +', function () {
      _assert2.default.equal(parseAndEval('2 + 3'), 5);
      _assert2.default.equal(parseAndEval('2 + 3 + 4'), 9);
    });

    it('should parse divide /', function () {
      _assert2.default.equal(parseAndEval('4 / 2'), 2);
      _assert2.default.equal(parseAndEval('8 / 2 / 2'), 2);
    });

    it('should parse dotDivide ./', function () {
      _assert2.default.equal(parseAndEval('4./2'), 2);
      _assert2.default.deepEqual(parseAndEval('4./[2,4]'), math.matrix([2, 1]));
      _assert2.default.equal(parseAndEval('4 ./ 2'), 2);
      _assert2.default.equal(parseAndEval('8 ./ 2 / 2'), 2);

      _assert2.default.deepEqual(parseAndEval('[1,2,3] ./ [1,2,3]'), math.matrix([1, 1, 1]));
    });

    it('should parse dotMultiply .*', function () {
      (0, _approx.equal)(parseAndEval('2.*3'), 6);
      (0, _approx.equal)(parseAndEval('2e3.*3'), 6e3);
      (0, _approx.equal)(parseAndEval('2 .* 3'), 6);
      (0, _approx.equal)(parseAndEval('4 .* 2'), 8);
      (0, _approx.equal)(parseAndEval('8 .* 2 .* 2'), 32);
      _assert2.default.deepEqual(parseAndEval('a=3; a.*4'), new ResultSet([12]));

      _assert2.default.deepEqual(parseAndEval('[1,2,3] .* [1,2,3]'), math.matrix([1, 4, 9]));
    });

    it('should parse dotPower .^', function () {
      (0, _approx.equal)(parseAndEval('2.^3'), 8);
      (0, _approx.equal)(parseAndEval('2 .^ 3'), 8);
      (0, _approx.equal)(parseAndEval('-2.^2'), -4); // -(2^2)
      (0, _approx.equal)(parseAndEval('2.^3.^4'), 2.41785163922926e+24); // 2^(3^4)

      _assert2.default.deepEqual(parseAndEval('[2,3] .^ [2,3]'), math.matrix([4, 27]));
    });

    it('should parse equal ==', function () {
      _assert2.default.strictEqual(parseAndEval('2 == 3'), false);
      _assert2.default.strictEqual(parseAndEval('2 == 2'), true);
      _assert2.default.deepEqual(parseAndEval('[2,3] == [2,4]'), math.matrix([true, false]));
    });

    it('should parse larger >', function () {
      _assert2.default.equal(parseAndEval('2 > 3'), false);
      _assert2.default.equal(parseAndEval('2 > 2'), false);
      _assert2.default.equal(parseAndEval('2 > 1'), true);
    });

    it('should parse largerEq >=', function () {
      _assert2.default.equal(parseAndEval('2 >= 3'), false);
      _assert2.default.equal(parseAndEval('2 >= 2'), true);
      _assert2.default.equal(parseAndEval('2 >= 1'), true);
    });

    it('should parse mod %', function () {
      (0, _approx.equal)(parseAndEval('8 % 3'), 2);
    });

    it('should parse operator mod', function () {
      (0, _approx.equal)(parseAndEval('8 mod 3'), 2);
    });

    it('should parse multiply *', function () {
      (0, _approx.equal)(parseAndEval('4 * 2'), 8);
      (0, _approx.equal)(parseAndEval('8 * 2 * 2'), 32);
    });

    it('should parse implicit multiplication', function () {
      _assert2.default.equal(parseAndEval('4a', { a: 2 }), 8);
      _assert2.default.equal(parseAndEval('4 a', { a: 2 }), 8);
      _assert2.default.equal(parseAndEval('a b', { a: 2, b: 4 }), 8);
      _assert2.default.equal(parseAndEval('2a b', { a: 2, b: 4 }), 16);
      _assert2.default.equal(parseAndEval('2a * b', { a: 2, b: 4 }), 16);
      _assert2.default.equal(parseAndEval('2a / b', { a: 2, b: 4 }), 1);
      _assert2.default.equal(parseAndEval('a b c', { a: 2, b: 4, c: 6 }), 48);
      _assert2.default.equal(parseAndEval('a b*c', { a: 2, b: 4, c: 6 }), 48);
      _assert2.default.equal(parseAndEval('a*b c', { a: 2, b: 4, c: 6 }), 48);
      _assert2.default.equal(parseAndEval('a/b c', { a: 4, b: 2, c: 6 }), 12);

      _assert2.default.equal(parseAndEval('1/2a', { a: 2 }), 1);
      _assert2.default.equal(parseAndEval('8/2a/2', { a: 2 }), 4);
      _assert2.default.equal(parseAndEval('8/2a*2', { a: 2 }), 16);
      _assert2.default.equal(parseAndEval('4*2a', { a: 2 }), 16);

      _assert2.default.equal(parseAndEval('(2+3)a', { a: 2 }), 10);
      _assert2.default.equal(parseAndEval('(2+3)2'), 10);
      _assert2.default.equal(parseAndEval('(2)(3)+4'), 10);
      _assert2.default.equal(parseAndEval('2(3+4)'), 14);
      _assert2.default.equal(parseAndEval('(2+3)-2'), 3); // no implicit multiplication, just a unary minus
      _assert2.default.equal(parseAndEval('a(2+3)', { a: function a() {
          return 42;
        } }), 42); // function call
      _assert2.default.equal(parseAndEval('a.b(2+3)', { a: { b: function b() {
            return 42;
          } } }), 42); // function call
      _assert2.default.equal(parseAndEval('(2+3)(4+5)'), 45); // implicit multiplication
      _assert2.default.equal(parseAndEval('(2+3)(4+5)(3-1)'), 90); // implicit multiplication

      _assert2.default.equal(parseAndEval('(2a)^3', { a: 2 }), 64);
      _assert2.default.equal(parseAndEval('2a^3', { a: 2 }), 16);
      _assert2.default.equal(parseAndEval('2(a)^3', { a: 2 }), 16);
      _assert2.default.equal(parseAndEval('(2)a^3', { a: 2 }), 16);
      _assert2.default.equal(parseAndEval('2^3a', { a: 2 }), 16);
      _assert2.default.equal(parseAndEval('2^3(a)', { a: 2 }), 16);
      _assert2.default.equal(parseAndEval('2^(3)(a)', { a: 2 }), 16);
      _assert2.default.equal(parseAndEval('sqrt(2a)', { a: 2 }), 2);

      _assert2.default.deepEqual(parseAndEval('[2, 3] 2'), math.matrix([4, 6]));
      _assert2.default.deepEqual(parseAndEval('[2, 3] a', { a: 2 }), math.matrix([4, 6]));
      _assert2.default.deepEqual(parseAndEval('A [2,2]', { A: [[1, 2], [3, 4]] }), 4); // index
      _assert2.default.deepEqual(parseAndEval('(A) [2,2]', { A: [[1, 2], [3, 4]] }), 4); // index

      _assert2.default.deepEqual(parseAndEval('[1,2;3,4] [2,2]'), 4); // index
      _assert2.default.deepEqual(parseAndEval('([1,2;3,4])[2,2]'), 4); // index
      _assert2.default.throws(function () {
        parseAndEval('2[1,2,3]');
      }, /Unexpected operator/); // index
    });

    it('should tell the OperatorNode about implicit multiplications', function () {
      _assert2.default.equal(parse('2 + 3').implicit, false);
      _assert2.default.equal(parse('4 * a').implicit, false);

      _assert2.default.equal(parse('4a').implicit, true);
      _assert2.default.equal(parse('4 a').implicit, true);
      _assert2.default.equal(parse('a b').implicit, true);
      _assert2.default.equal(parse('2a b').implicit, true);
      _assert2.default.equal(parse('a b c').implicit, true);

      _assert2.default.equal(parse('(2+3)a').implicit, true);
      _assert2.default.equal(parse('(2+3)2').implicit, true);
      _assert2.default.equal(parse('2(3+4)').implicit, true);
    });

    it('should correctly order consecutive multiplications and implicit multiplications', function () {
      var node = parse('9km*3km');
      _assert2.default.equal(node.toString({ parenthesis: 'all' }), '((9 km) * 3) km');
    });

    it('should throw an error when having an implicit multiplication between two numbers', function () {
      _assert2.default.throws(function () {
        math.parse('2 3');
      }, /Unexpected part "3"/);
      _assert2.default.throws(function () {
        math.parse('2 * 3 4');
      }, /Unexpected part "4"/);
      _assert2.default.throws(function () {
        math.parse('2 * 3 4 * 5');
      }, /Unexpected part "4"/);
      _assert2.default.throws(function () {
        math.parse('2 / 3 4 5');
      }, /Unexpected part "4"/);
      _assert2.default.throws(function () {
        math.parse('2 + 3 4');
      }, /Unexpected part "4"/);
    });

    it('should parse pow ^', function () {
      (0, _approx.equal)(parseAndEval('2^3'), 8);
      (0, _approx.equal)(parseAndEval('-2^2'), -4); // -(2^2)
      (0, _approx.equal)(parseAndEval('2^3^4'), 2.41785163922926e+24); // 2^(3^4)
    });

    it('should parse smaller <', function () {
      _assert2.default.strictEqual(parseAndEval('2 < 3'), true);
      _assert2.default.strictEqual(parseAndEval('2 < 2'), false);
      _assert2.default.strictEqual(parseAndEval('2 < 1'), false);
    });

    it('should parse smallerEq <=', function () {
      _assert2.default.strictEqual(parseAndEval('2 <= 3'), true);
      _assert2.default.strictEqual(parseAndEval('2 <= 2'), true);
      _assert2.default.strictEqual(parseAndEval('2 <= 1'), false);
    });

    it('should parse bitwise and &', function () {
      _assert2.default.strictEqual(parseAndEval('2 & 6'), 2);
      _assert2.default.strictEqual(parseAndEval('5 & 3'), 1);
      _assert2.default.strictEqual(parseAndEval('true & true'), 1);
      _assert2.default.strictEqual(parseAndEval('true & false'), 0);
      _assert2.default.strictEqual(parseAndEval('false & true'), 0);
      _assert2.default.strictEqual(parseAndEval('false & false'), 0);
    });

    it('should parse bitwise xor ^|', function () {
      _assert2.default.strictEqual(parseAndEval('2 ^| 6'), 4);
      _assert2.default.strictEqual(parseAndEval('5 ^| 3'), 6);
      _assert2.default.strictEqual(parseAndEval('true ^| true'), 0);
      _assert2.default.strictEqual(parseAndEval('true ^| false'), 1);
      _assert2.default.strictEqual(parseAndEval('false ^| true'), 1);
      _assert2.default.strictEqual(parseAndEval('false ^| false'), 0);
    });

    it('should parse bitwise or |', function () {
      _assert2.default.strictEqual(parseAndEval('2 | 6'), 6);
      _assert2.default.strictEqual(parseAndEval('5 | 3'), 7);
      _assert2.default.strictEqual(parseAndEval('true | true'), 1);
      _assert2.default.strictEqual(parseAndEval('true | false'), 1);
      _assert2.default.strictEqual(parseAndEval('false | true'), 1);
      _assert2.default.strictEqual(parseAndEval('false | false'), 0);
    });

    it('should parse bitwise left shift <<', function () {
      _assert2.default.strictEqual(parseAndEval('23 << 1'), 46);
    });

    it('should parse bitwise right arithmetic shift >>', function () {
      _assert2.default.strictEqual(parseAndEval('32 >> 4'), 2);
      _assert2.default.strictEqual(parseAndEval('-12 >> 2'), -3);
    });

    it('should parse bitwise right logical shift >>>', function () {
      _assert2.default.strictEqual(parseAndEval('32 >>> 4'), 2);
      _assert2.default.strictEqual(parseAndEval('-12 >>> 2'), 1073741821);
    });

    it('should parse logical and', function () {
      _assert2.default.strictEqual(parseAndEval('2 and 6'), true);
      _assert2.default.strictEqual(parseAndEval('2 and 0'), false);
      _assert2.default.strictEqual(parseAndEval('true and true'), true);
      _assert2.default.strictEqual(parseAndEval('true and false'), false);
      _assert2.default.strictEqual(parseAndEval('false and true'), false);
      _assert2.default.strictEqual(parseAndEval('false and false'), false);
    });

    it('should parse logical xor', function () {
      _assert2.default.strictEqual(parseAndEval('2 xor 6'), false);
      _assert2.default.strictEqual(parseAndEval('2 xor 0'), true);
      _assert2.default.strictEqual(parseAndEval('true xor true'), false);
      _assert2.default.strictEqual(parseAndEval('true xor false'), true);
      _assert2.default.strictEqual(parseAndEval('false xor true'), true);
      _assert2.default.strictEqual(parseAndEval('false xor false'), false);
    });

    it('should parse logical or', function () {
      _assert2.default.strictEqual(parseAndEval('2 or 6'), true);
      _assert2.default.strictEqual(parseAndEval('2 or 0'), true);
      _assert2.default.strictEqual(parseAndEval('true or true'), true);
      _assert2.default.strictEqual(parseAndEval('true or false'), true);
      _assert2.default.strictEqual(parseAndEval('false or true'), true);
      _assert2.default.strictEqual(parseAndEval('false or false'), false);
    });

    it('should parse logical not', function () {
      _assert2.default.strictEqual(parseAndEval('not 2'), false);
      _assert2.default.strictEqual(parseAndEval('not not 2'), true);
      _assert2.default.strictEqual(parseAndEval('not not not 2'), false);
      _assert2.default.strictEqual(parseAndEval('not true'), false);

      _assert2.default.strictEqual(parseAndEval('4*not 2'), 0);
      _assert2.default.strictEqual(parseAndEval('4 * not 2'), 0);
      _assert2.default.strictEqual(parseAndEval('4-not 2'), 4);
      _assert2.default.strictEqual(parseAndEval('4 - not 2'), 4);
      _assert2.default.strictEqual(parseAndEval('4+not 2'), 4);
      _assert2.default.strictEqual(parseAndEval('4 + not 2'), 4);

      _assert2.default.strictEqual(parseAndEval('10+not not 3'), 11);
    });

    it('should parse minus -', function () {
      _assert2.default.equal(parseAndEval('4 - 2'), 2);
      _assert2.default.equal(parseAndEval('8 - 2 - 2'), 4);
    });

    it('should parse unary minus -', function () {
      _assert2.default.equal(parseAndEval('-2'), -2);
      _assert2.default.equal(parseAndEval('--2'), 2);
      _assert2.default.equal(parseAndEval('---2'), -2);

      _assert2.default.equal(parseAndEval('4*-2'), -8);
      _assert2.default.equal(parseAndEval('4 * -2'), -8);
      _assert2.default.equal(parseAndEval('4+-2'), 2);
      _assert2.default.equal(parseAndEval('4 + -2'), 2);
      _assert2.default.equal(parseAndEval('4--2'), 6);
      _assert2.default.equal(parseAndEval('4 - -2'), 6);

      _assert2.default.equal(parseAndEval('5-3'), 2);
      _assert2.default.equal(parseAndEval('5--3'), 8);
      _assert2.default.equal(parseAndEval('5---3'), 2);
      _assert2.default.equal(parseAndEval('5+---3'), 2);
      _assert2.default.equal(parseAndEval('5----3'), 8);
      _assert2.default.equal(parseAndEval('5+--(2+1)'), 8);
    });

    it('should parse unary +', function () {
      _assert2.default.equal(parseAndEval('+2'), 2);
      _assert2.default.equal(parseAndEval('++2'), 2);
      _assert2.default.equal(parseAndEval('+++2'), 2);
      _assert2.default.equal(parseAndEval('+true'), 1);

      _assert2.default.equal(parseAndEval('4*+2'), 8);
      _assert2.default.equal(parseAndEval('4 * +2'), 8);
      _assert2.default.equal(parseAndEval('4-+2'), 2);
      _assert2.default.equal(parseAndEval('4 - +2'), 2);
      _assert2.default.equal(parseAndEval('4++2'), 6);
      _assert2.default.equal(parseAndEval('4 + +2'), 6);

      _assert2.default.equal(parseAndEval('5+3'), 8);
      _assert2.default.equal(parseAndEval('5++3'), 8);
    });

    it('should parse unary ~', function () {
      _assert2.default.equal(parseAndEval('~2'), -3);
      _assert2.default.equal(parseAndEval('~~2'), 2);
      _assert2.default.equal(parseAndEval('~~~2'), -3);
      _assert2.default.equal(parseAndEval('~true'), -2);

      _assert2.default.equal(parseAndEval('4*~2'), -12);
      _assert2.default.equal(parseAndEval('4 * ~2'), -12);
      _assert2.default.equal(parseAndEval('4-~2'), 7);
      _assert2.default.equal(parseAndEval('4 - ~2'), 7);
      _assert2.default.equal(parseAndEval('4+~2'), 1);
      _assert2.default.equal(parseAndEval('4 + ~2'), 1);

      _assert2.default.equal(parseAndEval('10+~~3'), 13);
    });

    it('should parse unary plus and minus  +, -', function () {
      _assert2.default.equal(parseAndEval('-+2'), -2);
      _assert2.default.equal(parseAndEval('-+-2'), 2);
      _assert2.default.equal(parseAndEval('+-+-2'), 2);
      _assert2.default.equal(parseAndEval('+-2'), -2);
      _assert2.default.equal(parseAndEval('+-+2'), -2);
      _assert2.default.equal(parseAndEval('-+-+2'), 2);
    });

    it('should parse unary plus and bitwise not  +, ~', function () {
      _assert2.default.equal(parseAndEval('~+2'), -3);
      _assert2.default.equal(parseAndEval('~+~2'), 2);
      _assert2.default.equal(parseAndEval('+~+~2'), 2);
      _assert2.default.equal(parseAndEval('+~2'), -3);
      _assert2.default.equal(parseAndEval('+~+2'), -3);
      _assert2.default.equal(parseAndEval('~+~+2'), 2);
    });

    it('should parse unary minus and bitwise not  -, ~', function () {
      _assert2.default.equal(parseAndEval('~-2'), 1);
      _assert2.default.equal(parseAndEval('~-~2'), -4);
      _assert2.default.equal(parseAndEval('-~-~2'), 4);
      _assert2.default.equal(parseAndEval('-~2'), 3);
      _assert2.default.equal(parseAndEval('-~-2'), -1);
      _assert2.default.equal(parseAndEval('~-~-2'), 0);
    });

    it('should parse unary plus + and logical not', function () {
      _assert2.default.equal(parseAndEval('not+2'), false);
      _assert2.default.equal(parseAndEval('not + not 2'), true);
      _assert2.default.equal(parseAndEval('+not+not 2'), 1);
      _assert2.default.equal(parseAndEval('+ not 2'), 0);
      _assert2.default.equal(parseAndEval('+ not +2'), 0);
      _assert2.default.equal(parseAndEval('not + not +2'), true);
    });

    it('should parse bitwise not ~ and logical not', function () {
      _assert2.default.equal(parseAndEval('~not 2'), -1);
      _assert2.default.equal(parseAndEval('~not~2'), -1);
      _assert2.default.equal(parseAndEval('not~not~2'), false);
      _assert2.default.equal(parseAndEval('not~2'), false);
      _assert2.default.equal(parseAndEval('not~not 2'), false);
      _assert2.default.equal(parseAndEval('~not~not 2'), -1);
    });

    it('should parse unary minus and logical not', function () {
      _assert2.default.equal(parseAndEval('not-2'), false);
      _assert2.default.equal(parseAndEval('not-not 2'), true);
      _assert2.default.equal(parseAndEval('-not-not 2'), -1);
      _assert2.default.equal(parseAndEval('-not 2'), -0);
      _assert2.default.equal(parseAndEval('-not-2'), -0);
      _assert2.default.equal(parseAndEval('not-not-2'), true);
    });

    it('should parse unequal !=', function () {
      _assert2.default.strictEqual(parseAndEval('2 != 3'), true);
      _assert2.default.strictEqual(parseAndEval('2 != 2'), false);
      _assert2.default.deepEqual(parseAndEval('[2,3] != [2,4]'), math.matrix([false, true]));
    });

    it('should parse conditional expression a ? b : c', function () {
      _assert2.default.equal(parseAndEval('2 ? true : false'), true);
      _assert2.default.equal(parseAndEval('0 ? true : false'), false);
      _assert2.default.equal(parseAndEval('false ? true : false'), false);

      _assert2.default.equal(parseAndEval('2 > 0 ? 1 : 2 < 0 ? -1 : 0'), 1);
      _assert2.default.equal(parseAndEval('(2 > 0 ? 1 : 2 < 0) ? -1 : 0'), -1);
      _assert2.default.equal(parseAndEval('-2 > 0 ? 1 : -2 < 0 ? -1 : 0'), -1);
      _assert2.default.equal(parseAndEval('0 > 0 ? 1 : 0 < 0 ? -1 : 0'), 0);
    });

    it('should lazily evaluate conditional expression a ? b : c', function () {
      var scope = {};
      math.parse('true ? (a = 2) : (b = 2)').compile().eval(scope);
      _assert2.default.deepEqual(scope, { a: 2 });
    });

    it('should throw an error when false part of conditional expression is missing', function () {
      _assert2.default.throws(function () {
        parseAndEval('2 ? true');
      }, /False part of conditional expression expected/);
    });

    it('should parse : (range)', function () {
      _assert2.default.ok(parseAndEval('2:5') instanceof Matrix);
      _assert2.default.deepEqual(parseAndEval('2:5'), math.matrix([2, 3, 4, 5]));
      _assert2.default.deepEqual(parseAndEval('10:-2:0'), math.matrix([10, 8, 6, 4, 2, 0]));
      _assert2.default.deepEqual(parseAndEval('2:4.0'), math.matrix([2, 3, 4]));
      _assert2.default.deepEqual(parseAndEval('2:4.5'), math.matrix([2, 3, 4]));
      _assert2.default.deepEqual(parseAndEval('2:4.1'), math.matrix([2, 3, 4]));
      _assert2.default.deepEqual(parseAndEval('2:3.9'), math.matrix([2, 3]));
      _assert2.default.deepEqual(parseAndEval('2:3.5'), math.matrix([2, 3]));
      _assert2.default.deepEqual(parseAndEval('3:-1:0.5'), math.matrix([3, 2, 1]));
      _assert2.default.deepEqual(parseAndEval('3:-1:0.5'), math.matrix([3, 2, 1]));
      _assert2.default.deepEqual(parseAndEval('3:-1:0.1'), math.matrix([3, 2, 1]));
      _assert2.default.deepEqual(parseAndEval('3:-1:-0.1'), math.matrix([3, 2, 1, 0]));
    });

    it('should parse to', function () {
      (0, _approx.equal)(parseAndEval('2.54 cm to inch'), math.unit(1, 'inch').to('inch'));
      (0, _approx.equal)(parseAndEval('2.54 cm + 2 inch to foot'), math.unit(0.25, 'foot').to('foot'));
    });

    it('should parse in', function () {
      (0, _approx.equal)(parseAndEval('2.54 cm in inch'), math.unit(1, 'inch').to('inch'));
    });

    it('should parse factorial !', function () {
      _assert2.default.deepEqual(parseAndEval('5!'), 120);
      _assert2.default.deepEqual(parseAndEval('[1,2,3,4]!'), math.matrix([1, 2, 6, 24]));
      _assert2.default.deepEqual(parseAndEval('4!+2'), 26);
      _assert2.default.deepEqual(parseAndEval('4!-2'), 22);
      _assert2.default.deepEqual(parseAndEval('4!*2'), 48);
      _assert2.default.deepEqual(parseAndEval('3!!'), 720);
      _assert2.default.deepEqual(parseAndEval('[1,2;3,1]!\'!'), math.matrix([[1, 720], [2, 1]]));
      _assert2.default.deepEqual(parseAndEval('[4,5]![2]'), 120); // index [2]
    });

    it('should parse transpose \'', function () {
      _assert2.default.deepEqual(parseAndEval('23\''), 23);
      _assert2.default.deepEqual(parseAndEval('[1,2,3;4,5,6]\''), math.matrix([[1, 4], [2, 5], [3, 6]]));
      _assert2.default.ok(parseAndEval('[1,2,3;4,5,6]\'') instanceof Matrix);
      _assert2.default.deepEqual(parseAndEval('[1:5]'), math.matrix([[1, 2, 3, 4, 5]]));
      _assert2.default.deepEqual(parseAndEval('[1:5]\''), math.matrix([[1], [2], [3], [4], [5]]));
      _assert2.default.deepEqual(parseAndEval('size([1:5])'), math.matrix([1, 5]));
      _assert2.default.deepEqual(parseAndEval('[1,2;3,4]\''), math.matrix([[1, 3], [2, 4]]));
    });

    describe('operator precedence', function () {
      it('should respect precedence of plus and minus', function () {
        _assert2.default.equal(parseAndEval('4-2+3'), 5);
        _assert2.default.equal(parseAndEval('4-(2+3)'), -1);
        _assert2.default.equal(parseAndEval('4-2-3'), -1);
        _assert2.default.equal(parseAndEval('4-(2-3)'), 5);
      });

      it('should respect precedence of plus/minus and multiply/divide', function () {
        _assert2.default.equal(parseAndEval('2+3*4'), 14);
        _assert2.default.equal(parseAndEval('2*3+4'), 10);
      });

      it('should respect precedence of plus/minus and pow', function () {
        _assert2.default.equal(parseAndEval('2+3^2'), 11);
        _assert2.default.equal(parseAndEval('3^2+2'), 11);
        _assert2.default.equal(parseAndEval('8-2^2'), 4);
        _assert2.default.equal(parseAndEval('4^2-2'), 14);
      });

      it('should respect precedence of multiply/divide and pow', function () {
        _assert2.default.equal(parseAndEval('2*3^2'), 18);
        _assert2.default.equal(parseAndEval('3^2*2'), 18);
        _assert2.default.equal(parseAndEval('8/2^2'), 2);
        _assert2.default.equal(parseAndEval('4^2/2'), 8);
      });

      it('should respect precedence of pow', function () {
        _assert2.default.equal(parseAndEval('2^3'), 8);
        _assert2.default.equal(parseAndEval('2^3^4'), Math.pow(2, Math.pow(3, 4)));
        _assert2.default.equal(parseAndEval('1.5^1.5^1.5'), parseAndEval('1.5^(1.5^1.5)'));
        _assert2.default.equal(parseAndEval('1.5^1.5^1.5^1.5'), parseAndEval('1.5^(1.5^(1.5^1.5))'));
      });

      it('should respect precedence of unary operations and pow', function () {
        _assert2.default.equal(parseAndEval('-3^2'), -9);
        _assert2.default.equal(parseAndEval('(-3)^2'), 9);
        _assert2.default.equal(parseAndEval('2^-2'), 0.25);
        _assert2.default.equal(parseAndEval('2^(-2)'), 0.25);

        _assert2.default.equal(parseAndEval('+3^2'), 9);
        _assert2.default.equal(parseAndEval('(+3)^2'), 9);
        _assert2.default.equal(parseAndEval('2^(+2)'), 4);

        _assert2.default.equal(parseAndEval('~3^2'), -10);
        _assert2.default.equal(parseAndEval('(~3)^2'), 16);
        _assert2.default.equal(parseAndEval('2^~2'), 0.125);
        _assert2.default.equal(parseAndEval('2^(~2)'), 0.125);

        _assert2.default.equal(parseAndEval('not 3^2'), false);
        _assert2.default.equal(parseAndEval('(not 3)^2'), 0);
        _assert2.default.equal(parseAndEval('2^not 2'), 1);
        _assert2.default.equal(parseAndEval('2^(not 2)'), 1);
      });

      it('should respect precedence of factorial and pow', function () {
        _assert2.default.equal(parseAndEval('2^3!'), 64);
        _assert2.default.equal(parseAndEval('2^(3!)'), 64);
        _assert2.default.equal(parseAndEval('3!^2'), 36);
      });

      it('should respect precedence of factorial and unary operations', function () {
        _assert2.default.equal(parseAndEval('-4!'), -24);
        _assert2.default.equal(parseAndEval('-(4!)'), -24);

        _assert2.default.equal(parseAndEval('3!+2'), 8);
        _assert2.default.equal(parseAndEval('(3!)+2'), 8);
        _assert2.default.equal(parseAndEval('+4!'), 24);

        _assert2.default.equal(parseAndEval('~4!+1'), -24);
        _assert2.default.equal(parseAndEval('~(4!)+1'), -24);

        _assert2.default.equal(parseAndEval('not 4!'), false);
        _assert2.default.equal(parseAndEval('not not 4!'), true);
        _assert2.default.equal(parseAndEval('not(4!)'), false);
        _assert2.default.equal(parseAndEval('(not 4!)'), false);
        _assert2.default.equal(parseAndEval('(not 4)!'), 1);
      });

      it('should respect precedence of transpose', function () {
        var node = math.parse('a + b\'');
        (0, _assert2.default)(node instanceof OperatorNode);
        _assert2.default.equal(node.op, '+');
        _assert2.default.equal(node.args[0].toString(), 'a');
        _assert2.default.equal(node.args[1].toString(), 'b\'');
      });

      it('should respect precedence of transpose (2)', function () {
        var node = math.parse('a ^ b\'');
        (0, _assert2.default)(node instanceof OperatorNode);
        _assert2.default.equal(node.op, '^');
        _assert2.default.equal(node.args[0].toString(), 'a');
        _assert2.default.equal(node.args[1].toString(), 'b\'');
      });

      it('should respect precedence of conditional operator and other operators', function () {
        _assert2.default.equal(parseAndEval('2 > 3 ? true : false'), false);
        _assert2.default.equal(parseAndEval('2 == 3 ? true : false'), false);
        _assert2.default.equal(parseAndEval('3 ? 2 + 4 : 2 - 1'), 6);
        _assert2.default.deepEqual(parseAndEval('3 ? true : false; 22'), new ResultSet([22]));
        _assert2.default.deepEqual(parseAndEval('3 ? 5cm to m : 5cm in mm'), new Unit(5, 'cm').to('m'));
        _assert2.default.deepEqual(parseAndEval('2 == 4-2 ? [1,2] : false'), math.matrix([1, 2]));
        _assert2.default.deepEqual(parseAndEval('false ? 1:2:6'), math.matrix([2, 3, 4, 5, 6]));
      });

      it('should respect precedence between left/right shift and relational operators', function () {
        _assert2.default.strictEqual(parseAndEval('32 >> 4 == 2'), true);
        _assert2.default.strictEqual(parseAndEval('2 == 32 >> 4'), true);
        _assert2.default.strictEqual(parseAndEval('2 << 2 == 8'), true);
        _assert2.default.strictEqual(parseAndEval('8 == 2 << 2'), true);
      });

      it('should respect precedence between relational operators and bitwise and', function () {
        _assert2.default.strictEqual(parseAndEval('2 == 3 & 1'), 0);
        _assert2.default.strictEqual(parseAndEval('3 & 1 == 2'), 0);
        _assert2.default.strictEqual(parseAndEval('2 == (3 & 1)'), false);
      });

      it('should respect precedence between bitwise or | and logical and', function () {
        _assert2.default.strictEqual(parseAndEval('2 | 2 and 4'), true);
        _assert2.default.strictEqual(parseAndEval('4 and 2 | 2'), true);
      });

      it('should respect precedence between bitwise xor ^| and bitwise or |', function () {
        _assert2.default.strictEqual(parseAndEval('4 ^| 6 | 2'), 2);
        _assert2.default.strictEqual(parseAndEval('2 | 4 ^| 6'), 2);
        _assert2.default.strictEqual(parseAndEval('(2 | 4) ^| 6'), 0);
      });

      it('should respect precedence between bitwise and & and bitwise or |', function () {
        _assert2.default.strictEqual(parseAndEval('4 & 3 | 12'), 12);
        _assert2.default.strictEqual(parseAndEval('12 | 4 & 3'), 12);
        _assert2.default.strictEqual(parseAndEval('(12 | 4) & 3'), 0);
      });

      it('should respect precedence between logical and and or', function () {
        _assert2.default.strictEqual(parseAndEval('false and true or true'), true);
        _assert2.default.strictEqual(parseAndEval('false and (true or true)'), false);
        _assert2.default.strictEqual(parseAndEval('true or true and false'), true);
        _assert2.default.strictEqual(parseAndEval('(true or true) and false'), false);
      });

      it('should respect precedence of conditional operator and logical or', function () {
        var node = math.parse('1 or 0 ? 2 or 3 : 0 or 0');
        (0, _assert2.default)(node instanceof ConditionalNode);
        _assert2.default.equal(node.condition.toString(), '1 or 0');
        _assert2.default.equal(node.trueExpr.toString(), '2 or 3');
        _assert2.default.equal(node.falseExpr.toString(), '0 or 0');
        _assert2.default.strictEqual(node.compile().eval(), true);
      });

      it('should respect precedence of conditional operator and relational operators', function () {
        var node = math.parse('a == b ? a > b : a < b');
        (0, _assert2.default)(node instanceof ConditionalNode);
        _assert2.default.equal(node.condition.toString(), 'a == b');
        _assert2.default.equal(node.trueExpr.toString(), 'a > b');
        _assert2.default.equal(node.falseExpr.toString(), 'a < b');
      });

      it('should respect precedence of conditional operator and range operator', function () {
        var node = math.parse('a ? b : c : d');
        (0, _assert2.default)(node instanceof ConditionalNode);
        _assert2.default.equal(node.condition.toString(), 'a');
        _assert2.default.equal(node.trueExpr.toString(), 'b');
        _assert2.default.equal(node.falseExpr.toString(), 'c:d');
      });

      it('should respect precedence of conditional operator and range operator (2)', function () {
        var node = math.parse('a ? (b : c) : (d : e)');
        (0, _assert2.default)(node instanceof ConditionalNode);
        _assert2.default.equal(node.condition.toString(), 'a');
        _assert2.default.equal(node.trueExpr.toString(), '(b:c)');
        _assert2.default.equal(node.falseExpr.toString(), '(d:e)');
      });

      it('should respect precedence of conditional operator and range operator (2)', function () {
        var node = math.parse('a ? (b ? c : d) : (e ? f : g)');
        (0, _assert2.default)(node instanceof ConditionalNode);
        _assert2.default.equal(node.condition.toString(), 'a');
        _assert2.default.equal(node.trueExpr.toString(), '(b ? c : d)');
        _assert2.default.equal(node.falseExpr.toString(), '(e ? f : g)');
      });

      it('should respect precedence of range operator and relational operators', function () {
        var node = math.parse('a:b == c:d');
        (0, _assert2.default)(node instanceof OperatorNode);
        _assert2.default.equal(node.args[0].toString(), 'a:b');
        _assert2.default.equal(node.args[1].toString(), 'c:d');
      });

      it('should respect precedence of range operator and operator plus and minus', function () {
        var node = math.parse('a + b : c - d');
        (0, _assert2.default)(node instanceof RangeNode);
        _assert2.default.equal(node.start.toString(), 'a + b');
        _assert2.default.equal(node.end.toString(), 'c - d');
      });

      it('should respect precedence of "to" operator and relational operators', function () {
        var node = math.parse('a == b to c');
        (0, _assert2.default)(node instanceof OperatorNode);
        _assert2.default.equal(node.args[0].toString(), 'a');
        _assert2.default.equal(node.args[1].toString(), 'b to c');
      });

      it('should respect precedence of "to" operator and relational operators (2)', function () {
        var node = math.parse('a to b == c');
        (0, _assert2.default)(node instanceof OperatorNode);
        _assert2.default.equal(node.args[0].toString(), 'a to b');
        _assert2.default.equal(node.args[1].toString(), 'c');
      });

      // TODO: extensively test operator precedence
    });
  });

  describe('functions', function () {
    it('should evaluate function "mod"', function () {
      (0, _approx.equal)(parseAndEval('mod(8, 3)'), 2);
    });

    it('should evaluate function "to" ', function () {
      (0, _approx.equal)(parseAndEval('to(5.08 cm * 1000, inch)'), math.unit(2000, 'inch').to('inch'));
    });

    it('should evaluate function "sort" with a custom sort function', function () {
      var scope = {};
      parseAndEval('sortByLength(a, b) = size(a)[1] - size(b)[1]', scope);
      _assert2.default.deepEqual(parseAndEval('sort(["Langdon", "Tom", "Sara"], sortByLength)', scope), math.matrix(["Tom", "Sara", "Langdon"]));
    });

    it('should evaluate function "filter" with a custom test function', function () {
      var scope = {};
      parseAndEval('isPositive(x) = x > 0', scope);
      _assert2.default.deepEqual(parseAndEval('filter([6, -2, -1, 4, 3], isPositive)', scope), math.matrix([6, 4, 3]));
    });

    it('should evaluate function "filter" with a custom test equation', function () {
      _assert2.default.deepEqual(parseAndEval('filter([6, -2, -1, 4, 3], x > 0)'), math.matrix([6, 4, 3]));
    });
  });

  describe('bignumber', function () {
    var bigmath = math.create({
      number: 'BigNumber'
    });
    var BigNumber = bigmath.type.BigNumber;

    it('should parse numbers as bignumber', function () {
      _assert2.default.deepEqual(bigmath.bignumber('2.3'), new BigNumber('2.3'));
      _assert2.default.deepEqual(bigmath.eval('2.3'), new BigNumber('2.3'));
      _assert2.default.deepEqual(bigmath.eval('2.3e+500'), new BigNumber('2.3e+500'));
    });

    it('should evaluate functions supporting bignumbers', function () {
      _assert2.default.deepEqual(bigmath.eval('0.1 + 0.2'), new BigNumber('0.3'));
    });

    it('should evaluate functions supporting bignumbers', function () {
      _assert2.default.deepEqual(bigmath.eval('add(0.1, 0.2)'), new BigNumber('0.3'));
    });

    it('should work with mixed numbers and bignumbers', function () {
      (0, _approx.equal)(bigmath.eval('pi + 1'), 4.141592653589793);
    });

    it('should evaluate functions not supporting bignumbers', function () {
      (0, _approx.equal)(bigmath.eval('sin(0.1)'), 0.09983341664682815);
    });

    it('should create a range from bignumbers', function () {
      _assert2.default.deepEqual(bigmath.eval('4:6'), bigmath.matrix([new BigNumber(4), new BigNumber(5), new BigNumber(6)]));
      _assert2.default.deepEqual(bigmath.eval('0:2:4'), bigmath.matrix([new BigNumber(0), new BigNumber(2), new BigNumber(4)]));
    });

    it('should create a matrix with bignumbers', function () {
      _assert2.default.deepEqual(bigmath.eval('[0.1, 0.2]'), bigmath.matrix([new BigNumber(0.1), new BigNumber(0.2)]));
    });

    it('should get an element from a matrix with bignumbers', function () {
      var scope = {};
      _assert2.default.deepEqual(bigmath.eval('a=[0.1, 0.2]', scope), bigmath.matrix([new BigNumber(0.1), new BigNumber(0.2)]));

      _assert2.default.deepEqual(bigmath.eval('a[1]', scope), new BigNumber(0.1));
      _assert2.default.deepEqual(bigmath.eval('a[:]', scope), bigmath.matrix([new BigNumber(0.1), new BigNumber(0.2)]));
      _assert2.default.deepEqual(bigmath.eval('a[1:2]', scope), bigmath.matrix([new BigNumber(0.1), new BigNumber(0.2)]));
    });

    it('should replace elements in a matrix with bignumbers', function () {
      var scope = {};
      _assert2.default.deepEqual(bigmath.eval('a=[0.1, 0.2]', scope), bigmath.matrix([new BigNumber(0.1), new BigNumber(0.2)]));

      bigmath.eval('a[1] = 0.3', scope);
      _assert2.default.deepEqual(scope.a, bigmath.matrix([new BigNumber(0.3), new BigNumber(0.2)]));
      bigmath.eval('a[:] = [0.5, 0.6]', scope);
      _assert2.default.deepEqual(scope.a, bigmath.matrix([new BigNumber(0.5), new BigNumber(0.6)]));
      bigmath.eval('a[1:2] = [0.7, 0.8]', scope);
      _assert2.default.deepEqual(scope.a, bigmath.matrix([new BigNumber(0.7), new BigNumber(0.8)]));
    });

    it('should work with complex numbers (downgrades bignumbers to number)', function () {
      _assert2.default.deepEqual(bigmath.eval('3i'), new Complex(0, 3));
      _assert2.default.deepEqual(bigmath.eval('2 + 3i'), new Complex(2, 3));
      _assert2.default.deepEqual(bigmath.eval('2 * i'), new Complex(0, 2));
    });

    it('should work with units', function () {
      _assert2.default.deepEqual(bigmath.eval('2 cm'), new Unit(new BigNumber(2), 'cm'));
    });
  });

  describe('scope', function () {

    it('should use a given scope for assignments', function () {
      var scope = {
        a: 3,
        b: 4
      };
      _assert2.default.deepEqual(parse('a*b').compile().eval(scope), 12);
      _assert2.default.deepEqual(parse('c=5').compile().eval(scope), 5);
      _assert2.default.deepEqual(parse('f(x) = x^a').compile().eval(scope).syntax, 'f(x)');

      _assert2.default.deepEqual(Object.keys(scope).length, 4);
      _assert2.default.deepEqual(scope.a, 3);
      _assert2.default.deepEqual(scope.b, 4);
      _assert2.default.deepEqual(scope.c, 5);
      _assert2.default.deepEqual(_typeof(scope.f), 'function');

      _assert2.default.equal(scope.f(3), 27);
      scope.a = 2;
      _assert2.default.equal(scope.f(3), 9);
      scope.hello = function (name) {
        return 'hello, ' + name + '!';
      };
      _assert2.default.deepEqual(parse('hello("jos")').compile().eval(scope), 'hello, jos!');
    });

    it('should parse undefined symbols, defining symbols, and removing symbols', function () {
      var scope = {};
      var n = parse('q');
      _assert2.default.throws(function () {
        n.compile().eval(scope);
      });
      parse('q=33').compile().eval(scope);
      _assert2.default.equal(n.compile().eval(scope), 33);
      delete scope.q;
      _assert2.default.throws(function () {
        n.compile().eval(scope);
      });

      n = parse('qq[1,1]=33');
      _assert2.default.throws(function () {
        n.compile().eval(scope);
      });
      parse('qq=[1,2;3,4]').compile().eval(scope);
      n.compile().eval(scope);
      _assert2.default.deepEqual(scope.qq, math.matrix([[33, 2], [3, 4]]));
      parse('qq=[4]').compile().eval(scope);
      n.compile().eval(scope);
      _assert2.default.deepEqual(scope.qq, math.matrix([[33]]));
      delete scope.qq;
      _assert2.default.throws(function () {
        n.compile().eval(scope);
      });
    });

    it('should evaluate a symbol with value null or undefined', function () {
      _assert2.default.equal(parse('a').compile().eval({ a: null }), null);
      _assert2.default.equal(parse('a').compile().eval({ a: undefined }), undefined);
    });
  });

  describe('errors', function () {

    it('should return IndexErrors with one based indices', function () {
      // functions throw a zero-based error
      _assert2.default.throws(function () {
        math.subset([1, 2, 3], math.index(4));
      }, /Index out of range \(4 > 2\)/);
      _assert2.default.throws(function () {
        math.subset([1, 2, 3], math.index(-2));
      }, /Index out of range \(-2 < 0\)/);

      // evaluation via parser throws one-based error
      _assert2.default.throws(function () {
        math.eval('A[4]', { A: [1, 2, 3] });
      }, /Index out of range \(4 > 3\)/);
      _assert2.default.throws(function () {
        math.eval('A[-2]', { A: [1, 2, 3] });
      }, /IndexError: Index out of range \(-2 < 1\)/);
    });

    it('should return DimensionErrors with one based indices (subset)', function () {
      // TODO: it would be more clear when all errors where DimensionErrors

      // functions throw a zero-based error
      _assert2.default.throws(function () {
        math.subset([1, 2, 3], math.index(1, 1));
      }, /DimensionError: Dimension mismatch \(2 != 1\)/);

      // evaluation via parser throws one-based error
      _assert2.default.throws(function () {
        math.eval('A[1,1]', { A: [1, 2, 3] });
      }, /DimensionError: Dimension mismatch \(2 != 1\)/);
    });

    it('should return DimensionErrors with one based indices (concat)', function () {
      // TODO: it would be more clear when all errors where DimensionErrors

      // functions throw a zero-based error
      _assert2.default.throws(function () {
        math.concat([1, 2], [[3, 4]]);
      }, /DimensionError: Dimension mismatch \(1 != 2\)/);
      _assert2.default.throws(function () {
        math.concat([[1, 2]], [[3, 4]], 2);
      }, /IndexError: Index out of range \(2 > 1\)/);
      _assert2.default.throws(function () {
        math.concat([[1, 2]], [[3, 4]], -1);
      }, /IndexError: Index out of range \(-1 < 0\)/);

      // evaluation via parser throws one-based error
      _assert2.default.throws(function () {
        math.eval('concat([1,2], [[3,4]])');
      }, /DimensionError: Dimension mismatch \(1 != 2\)/);
      _assert2.default.throws(function () {
        math.eval('concat([[1,2]], [[3,4]], 3)');
      }, /IndexError: Index out of range \(3 > 2\)/);
      _assert2.default.throws(function () {
        math.eval('concat([[1,2]], [[3,4]], 0)');
      }, /IndexError: Index out of range \(0 < 1\)/);
    });

    it('should return DimensionErrors with one based indices (max)', function () {
      // TODO: it would be more clear when all errors where DimensionErrors

      // functions throw a zero-based error
      // TODO

      // evaluation via parser throws one-based error
      _assert2.default.deepEqual(math.eval('max([[1,2], [3,4]])'), 4);
      _assert2.default.deepEqual(math.eval('max([[1,2], [3,4]], 1)'), math.matrix([3, 4]));
      _assert2.default.deepEqual(math.eval('max([[1,2], [3,4]], 2)'), math.matrix([2, 4]));
      _assert2.default.throws(function () {
        math.eval('max([[1,2], [3,4]], 3)');
      }, /IndexError: Index out of range \(3 > 2\)/);
      _assert2.default.throws(function () {
        math.eval('max([[1,2], [3,4]], 0)');
      }, /IndexError: Index out of range \(0 < 1\)/);
    });

    it('should return DimensionErrors with one based indices (min)', function () {
      // TODO: it would be more clear when all errors where DimensionErrors

      // functions throw a zero-based error
      // TODO

      // evaluation via parser throws one-based error
      _assert2.default.deepEqual(math.eval('min([[1,2], [3,4]])'), 1);
      _assert2.default.deepEqual(math.eval('min([[1,2], [3,4]], 1)'), math.matrix([1, 2]));
      _assert2.default.deepEqual(math.eval('min([[1,2], [3,4]], 2)'), math.matrix([1, 3]));
      _assert2.default.throws(function () {
        math.eval('min([[1,2], [3,4]], 3)');
      }, /IndexError: Index out of range \(3 > 2\)/);
      _assert2.default.throws(function () {
        math.eval('min([[1,2], [3,4]], 0)');
      }, /IndexError: Index out of range \(0 < 1\)/);
    });

    it('should return DimensionErrors with one based indices (mean)', function () {
      // TODO: it would be more clear when all errors where DimensionErrors

      // functions throw a zero-based error
      // TODO

      // evaluation via parser throws one-based error
      _assert2.default.deepEqual(math.eval('mean([[1,2], [3,4]])'), 2.5);
      _assert2.default.deepEqual(math.eval('mean([[1,2], [3,4]], 1)'), math.matrix([2, 3]));
      _assert2.default.deepEqual(math.eval('mean([[1,2], [3,4]], 2)'), math.matrix([1.5, 3.5]));
      _assert2.default.throws(function () {
        math.eval('mean([[1,2], [3,4]], 3)');
      }, /IndexError: Index out of range \(3 > 2\)/);
      _assert2.default.throws(function () {
        math.eval('mean([[1,2], [3,4]], 0)');
      }, /IndexError: Index out of range \(0 < 1\)/);
    });
  });

  describe('node tree', function () {

    // TODO: test parsing into a node tree

    it('should correctly stringify a node tree', function () {
      _assert2.default.equal(parse('0').toString(), '0');
      _assert2.default.equal(parse('"hello"').toString(), '"hello"');
      _assert2.default.equal(parse('[1, 2 + 3i, 4]').toString(), '[1, 2 + 3 i, 4]');
      _assert2.default.equal(parse('1/2a').toString(), '1 / 2 a');
    });

    it('should correctly stringify an index with dot notation', function () {
      _assert2.default.equal(parse('A[2]').toString(), 'A[2]');
      _assert2.default.equal(parse('a["b"]').toString(), 'a["b"]');
      _assert2.default.equal(parse('a.b').toString(), 'a.b');
    });

    describe('custom nodes', function () {
      // define a custom node
      function CustomNode(args) {
        this.args = args;
      }
      CustomNode.prototype = new math.expression.node.Node();
      CustomNode.prototype.toString = function () {
        return 'CustomNode';
      };
      CustomNode.prototype._compile = function (defs) {
        var strArgs = [];
        this.args.forEach(function (arg) {
          strArgs.push(arg.toString());
        });
        return '"CustomNode(' + strArgs.join(', ') + ')"';
      };
      CustomNode.prototype.forEach = function (callback) {
        // we don't have childs
      };

      var options = {
        nodes: {
          custom: CustomNode
        }
      };

      it('should parse custom nodes', function () {
        var node = parse('custom(x, (2+x), sin(x))', options);
        _assert2.default.equal(node.compile().eval(), 'CustomNode(x, (2 + x), sin(x))');
      });

      it('should parse custom nodes without parameters', function () {
        var node = parse('custom()', options);
        _assert2.default.equal(node.compile().eval(), 'CustomNode()');
        _assert2.default.equal(node.filter(function (node) {
          return node instanceof CustomNode;
        }).length, 1);

        var node2 = parse('custom', options);
        _assert2.default.equal(node2.compile().eval(), 'CustomNode()');
        _assert2.default.equal(node2.filter(function (node) {
          return node instanceof CustomNode;
        }).length, 1);
      });

      it('should throw an error on syntax errors in using custom nodes', function () {
        _assert2.default.throws(function () {
          parse('custom(x', options);
        }, /Parenthesis \) expected/);
        _assert2.default.throws(function () {
          parse('custom(x, ', options);
        }, /Unexpected end of expression/);
      });
    });
  });
});
