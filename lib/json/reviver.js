'use strict';

function factory (type, config, load, typed) {
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
  }
}

var name_name = 'reviver';
var path_path = 'json';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
