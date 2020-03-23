'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var lupjs_lupjs = {
  'name': 'lup',
  'category': 'Algebra',
  'syntax': ['lup(m)'],
  'description': 'Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U',
  'examples': ['lup([[2, 1], [1, 4]])', 'lup(matrix([[2, 1], [1, 4]]))', 'lup(sparse([[2, 1], [1, 4]]))'],
  'seealso': ['lusolve', 'lsolve', 'usolve', 'matrix', 'sparse', 'slu']
};

var lupjs_lupjs_name = "lup";
var lupjs_lupjs_category = "Algebra";
var lupjs_lupjs_syntax = ["lup(m)"];
var lupjs_lupjs_description = "Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U";

var lupjs_lupjs_examples = ["lup([[2, 1], [1, 4]])", "lup(matrix([[2, 1], [1, 4]]))", "lup(sparse([[2, 1], [1, 4]]))"];

var lupjs_lupjs_seealso = ["lusolve", "lsolve", "usolve", "matrix", "sparse", "slu"];
exports.name = lupjs_lupjs_name;
exports.category = lupjs_lupjs_category;
exports.syntax = lupjs_lupjs_syntax;
exports.description = lupjs_lupjs_description;
exports.examples = lupjs_lupjs_examples;
exports.seealso = lupjs_lupjs_seealso;
