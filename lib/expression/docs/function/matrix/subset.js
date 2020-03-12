'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var subsetjs_exportedObj = {
  'name': 'subset',
  'category': 'Matrix',
  'syntax': ['value(index)', 'value(index) = replacement', 'subset(value, [index])', 'subset(value, [index], replacement)'],
  'description': 'Get or set a subset of a matrix or string. ' + 'Indexes are one-based. ' + 'Both the ranges lower-bound and upper-bound are included.',
  'examples': ['d = [1, 2; 3, 4]', 'e = []', 'e[1, 1:2] = [5, 6]', 'e[2, :] = [7, 8]', 'f = d * e', 'f[2, 1]', 'f[:, 1]'],
  'seealso': ['concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'trace', 'transpose', 'zeros']
};

var subsetjs_exportedObj_name = "subset";
var subsetjs_exportedObj_category = "Matrix";

var subsetjs_exportedObj_syntax = ["value(index)", "value(index) = replacement", "subset(value, [index])", "subset(value, [index], replacement)"];

var subsetjs_exportedObj_description = "Get or set a subset of a matrix or string. " + "Indexes are one-based. " + "Both the ranges lower-bound and upper-bound are included.";

var subsetjs_exportedObj_examples = ["d = [1, 2; 3, 4]", "e = []", "e[1, 1:2] = [5, 6]", "e[2, :] = [7, 8]", "f = d * e", "f[2, 1]", "f[:, 1]"];

var subsetjs_exportedObj_seealso = ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "trace", "transpose", "zeros"];

exports.name = subsetjs_exportedObj_name;
exports.category = subsetjs_exportedObj_category;
exports.syntax = subsetjs_exportedObj_syntax;
exports.description = subsetjs_exportedObj_description;
exports.examples = subsetjs_exportedObj_examples;
exports.seealso = subsetjs_exportedObj_seealso;
