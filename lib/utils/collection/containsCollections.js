"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsCollectionsjs = undefined;

var _isCollection = require("./isCollection");

'use strict';

var exportedObject = function containsCollections(array) {
  for (var i = 0; i < array.length; i++) {
    if (isCollection(array[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Test whether an array contains collections
 * @param {Array} array
 * @returns {boolean} Returns true when the array contains one or multiple
 *                    collections (Arrays or Matrices). Returns false otherwise.
 */
/**
 * Test whether an array contains collections
 * @param {Array} array
 * @returns {boolean} Returns true when the array contains one or multiple
 *                    collections (Arrays or Matrices). Returns false otherwise.
 */
exports.containsCollectionsjs = exportedObject;
;
