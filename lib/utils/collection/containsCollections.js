import { isCollection as isCollection_isCollection } from "./isCollection";
'use strict';

var isCollection = isCollection_isCollection;

var exportedObject = function containsCollections (array) {
  for (var i = 0; i < array.length; i++) {
    if (isCollection_isCollection(array[i])) {
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
export { exportedObject as containsCollectionsjs };;
