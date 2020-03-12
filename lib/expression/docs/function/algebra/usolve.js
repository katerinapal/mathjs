'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var usolvejs_exportedObj = {
  'name': 'usolve',
  'category': 'Algebra',
  'syntax': ['x=usolve(U, b)'],
  'description': 'Solves the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.',
  'examples': ['x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])'],
  'seealso': ['lup', 'lusolve', 'lsolve', 'matrix', 'sparse']
};

var usolvejs_exportedObj_name = "usolve";
var usolvejs_exportedObj_category = "Algebra";
var usolvejs_exportedObj_syntax = ["x=usolve(U, b)"];
var usolvejs_exportedObj_description = "Solves the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.";

var usolvejs_exportedObj_examples = ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"];

var usolvejs_exportedObj_seealso = ["lup", "lusolve", "lsolve", "matrix", "sparse"];
exports.name = usolvejs_exportedObj_name;
exports.category = usolvejs_exportedObj_category;
exports.syntax = usolvejs_exportedObj_syntax;
exports.description = usolvejs_exportedObj_description;
exports.examples = usolvejs_exportedObj_examples;
exports.seealso = usolvejs_exportedObj_seealso;
