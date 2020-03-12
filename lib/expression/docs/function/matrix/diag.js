'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var diagjs_exportedObj = {
  'name': 'diag',
  'category': 'Matrix',
  'syntax': ['diag(x)', 'diag(x, k)'],
  'description': 'Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.',
  'examples': ['diag(1:3)', 'diag(1:3, 1)', 'a = [1, 2, 3; 4, 5, 6; 7, 8, 9]', 'diag(a)'],
  'seealso': ['concat', 'det', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros']
};

var diagjs_exportedObj_name = "diag";
var diagjs_exportedObj_category = "Matrix";
var diagjs_exportedObj_syntax = ["diag(x)", "diag(x, k)"];
var diagjs_exportedObj_description = "Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.";
var diagjs_exportedObj_examples = ["diag(1:3)", "diag(1:3, 1)", "a = [1, 2, 3; 4, 5, 6; 7, 8, 9]", "diag(a)"];

var diagjs_exportedObj_seealso = ["concat", "det", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"];

exports.name = diagjs_exportedObj_name;
exports.category = diagjs_exportedObj_category;
exports.syntax = diagjs_exportedObj_syntax;
exports.description = diagjs_exportedObj_description;
exports.examples = diagjs_exportedObj_examples;
exports.seealso = diagjs_exportedObj_seealso;
