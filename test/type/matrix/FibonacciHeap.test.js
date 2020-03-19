'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FibonacciHeap = math.type.FibonacciHeap;

describe('FibonacciHeap', function () {

  describe('constructor', function () {

    it('should create heap', function () {
      var h = new FibonacciHeap();
      _assert2.default.equal(h._size, 0);
      (0, _assert2.default)(h._minimum === null);
    });

    it('should have a property isFibonacciHeap', function () {
      var a = new FibonacciHeap();
      _assert2.default.strictEqual(a.isFibonacciHeap, true);
    });

    it('should have a property type', function () {
      var a = new FibonacciHeap();
      _assert2.default.strictEqual(a.type, 'FibonacciHeap');
    });

    it('should throw an error when called without new keyword', function () {
      _assert2.default.throws(function () {
        FibonacciHeap();
      }, /Constructor must be called with the new operator/);
    });
  });

  describe('insert', function () {

    it('should insert node when heap is empty', function () {
      var h = new FibonacciHeap();
      h.insert(1, 'v1');
      _assert2.default.equal(h._size, 1);
      (0, _assert2.default)(h._minimum !== null);
      _assert2.default.equal(h._minimum.key, 1);
      _assert2.default.equal(h._minimum.value, 'v1');
    });

    it('should insert two nodes when heap is empty', function () {
      var h = new FibonacciHeap();
      h.insert(1, 'v1');
      h.insert(10, 'v10');
      _assert2.default.equal(h._size, 2);
      (0, _assert2.default)(h._minimum !== null);
      _assert2.default.equal(h._minimum.key, 1);
      _assert2.default.equal(h._minimum.value, 'v1');
    });

    it('should insert two nodes when heap is empty, reverse order', function () {
      var h = new FibonacciHeap();
      h.insert(10, 'v10');
      h.insert(1, 'v1');
      _assert2.default.equal(h._size, 2);
      (0, _assert2.default)(h._minimum !== null);
      _assert2.default.equal(h._minimum.key, 1);
      _assert2.default.equal(h._minimum.value, 'v1');
    });
  });

  describe('extractMinimum', function () {

    it('should extract node from heap, one node', function () {
      var h = new FibonacciHeap();
      h.insert(1, 'v1');
      var n = h.extractMinimum();
      _assert2.default.equal(n.key, 1);
      _assert2.default.equal(n.value, 'v1');
      _assert2.default.equal(h._size, 0);
      (0, _assert2.default)(h._minimum === null);
    });

    it('should extract node from heap, two nodes', function () {
      var h = new FibonacciHeap();
      h.insert(1, 'v1');
      h.insert(10, 'v10');
      var n = h.extractMinimum();
      _assert2.default.equal(n.key, 1);
      _assert2.default.equal(n.value, 'v1');
      _assert2.default.equal(h._size, 1);
      _assert2.default.equal(h._minimum.key, 10);
      _assert2.default.equal(h._minimum.value, 'v10');
    });

    it('should extract nodes in ascending order', function () {
      var h = new FibonacciHeap();
      h.insert(5, 'v5');
      h.insert(4, 'v4');
      h.insert(1, 'v1');
      h.insert(3, 'v3');
      h.insert(2, 'v2');
      // extract all nodes      
      var n;
      var l = h.extractMinimum();
      var s = h._size;
      while (true) {
        n = h.extractMinimum();
        if (!n) break;
        (0, _assert2.default)(n.key > l.key);
        _assert2.default.equal(h._size, --s);
        l = n;
      }
      _assert2.default.equal(h._size, 0);
      (0, _assert2.default)(h._minimum === null);
    });
  });

  describe('remove', function () {

    it('should remove node, one node', function () {
      var h = new FibonacciHeap();
      var n = h.insert(1, 'v1');
      h.remove(n);
      _assert2.default.equal(h._size, 0);
      (0, _assert2.default)(h._minimum === null);
    });

    it('should remove node with smaller key', function () {
      var h = new FibonacciHeap();
      h.insert(20, 'v20');
      var n = h.insert(1, 'v1');
      h.insert(10, 'v10');
      h.insert(5, 'v5');
      h.insert(4, 'v4');
      h.remove(n);
      _assert2.default.equal(h._size, 4);
    });

    it('should remove node with largest key', function () {
      var h = new FibonacciHeap();
      h.insert(1, 'v1');
      h.insert(10, 'v10');
      var n = h.insert(20, 'v20');
      h.insert(5, 'v5');
      h.insert(4, 'v4');
      h.remove(n);
      _assert2.default.equal(h._size, 4);
    });
  });
});
