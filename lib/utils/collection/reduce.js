import { size as array_sizejs } from "../array";
import { IndexError as errorIndexError_IndexErrorjs } from "../../error/IndexError";
'use strict';

var exportedObject = function(mat, dim, callback) {
  var size = Array.isArray(mat) ? array_sizejs(mat) : mat.size();
  if (dim < 0 || (dim >= size.length)) {
    // TODO: would be more clear when throwing a DimensionError here
    throw new errorIndexError_IndexErrorjs(dim, size.length);
  }

  if (mat && mat.isMatrix === true) {
    return mat.create(_reduce(mat.valueOf(), dim, callback));
  }else {
    return _reduce(mat, dim, callback);
  }
};

/**
 * Reduce a given matrix or array to a new matrix or
 * array with one less dimension, applying the given
 * callback in the selected dimension.
 * @param {Array | Matrix} mat
 * @param {number} dim
 * @param {Function} callback
 * @return {Array | Matrix} res
 */
/**
 * Reduce a given matrix or array to a new matrix or
 * array with one less dimension, applying the given
 * callback in the selected dimension.
 * @param {Array | Matrix} mat
 * @param {number} dim
 * @param {Function} callback
 * @return {Array | Matrix} res
 */
export { exportedObject as reducejs };;

/**
 * Recursively reduce a matrix
 * @param {Array} mat
 * @param {number} dim
 * @param {Function} callback
 * @returns {Array} ret
 * @private
 */
function _reduce(mat, dim, callback){
  var i, ret, val, tran;

  if(dim<=0){
    if( !Array.isArray(mat[0]) ){
      val = mat[0];
      for(i=1; i<mat.length; i++){
        val = callback(val, mat[i]);
      }
      return val;
    }else{
      tran = _switch(mat);
      ret = [];
      for(i=0; i<tran.length; i++){
        ret[i] = _reduce(tran[i], dim-1, callback);
      }
      return ret;
    }
  }else{
    ret = [];
    for(i=0; i<mat.length; i++){
      ret[i] = _reduce(mat[i], dim-1, callback);
    }
    return ret;
  }
}

/**
 * Transpose a matrix
 * @param {Array} mat
 * @returns {Array} ret
 * @private
 */
function _switch(mat){
  var I = mat.length;
  var J = mat[0].length;
  var i, j;
  var ret = [];
  for( j=0; j<J; j++) {
    var tmp = [];
    for( i=0; i<I; i++) {
      tmp.push(mat[i][j]);
    }
    ret.push(tmp);
  }
  return ret;
}
