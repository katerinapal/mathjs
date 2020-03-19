"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixin = undefined;

var _tinyEmitter = require("tiny-emitter");

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixin_mixin = function mixin_mixin(obj) {
  // create event emitter
  var emitter = new Emitter();

  // bind methods to obj (we don't want to expose the emitter.e Array...)
  obj.on = emitter.on.bind(emitter);
  obj.off = emitter.off.bind(emitter);
  obj.once = emitter.once.bind(emitter);
  obj.emit = emitter.emit.bind(emitter);

  return obj;
};

exports.mixin = mixin_mixin;
