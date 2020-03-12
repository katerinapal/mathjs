'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory(type, config, load, typed) {
  /**
   * Instantiate mathjs data types from their JSON representation
   * @param {string} key
   * @param {*} value
   * @returns {*} Returns the revived object
   */
  return function reviver(key, value) {
    var constructor = type[value && value.mathjs];
    if (constructor && typeof constructor.fromJSON === 'function') {
      return constructor.fromJSON(value);
    }

    return value;
  };
}

var name_exportedObj = 'reviver';
var path_exportedObj = 'json';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;
