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

var name_name = 'reviver';
var path_path = 'json';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
