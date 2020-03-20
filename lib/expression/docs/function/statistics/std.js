'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var stdjs_stdjs = {
  'name': 'std',
  'category': 'Statistics',
  'syntax': ['std(a, b, c, ...)', 'std(A)', 'std(A, normalization)'],
  'description': 'Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  'examples': ['std(2, 4, 6)', 'std([2, 4, 6, 8])', 'std([2, 4, 6, 8], "uncorrected")', 'std([2, 4, 6, 8], "biased")', 'std([1, 2, 3; 4, 5, 6])'],
  'seealso': ['max', 'mean', 'min', 'median', 'min', 'prod', 'sum', 'var']
};

var stdjs_stdjs_name = "std";
var stdjs_stdjs_category = "Statistics";
var stdjs_stdjs_syntax = ["std(a, b, c, ...)", "std(A)", "std(A, normalization)"];
var stdjs_stdjs_description = "Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be \"unbiased\" (default), \"uncorrected\", or \"biased\".";

var stdjs_stdjs_examples = ["std(2, 4, 6)", "std([2, 4, 6, 8])", "std([2, 4, 6, 8], \"uncorrected\")", "std([2, 4, 6, 8], \"biased\")", "std([1, 2, 3; 4, 5, 6])"];

var stdjs_stdjs_seealso = ["max", "mean", "min", "median", "min", "prod", "sum", "var"];
exports.name = stdjs_stdjs_name;
exports.category = stdjs_stdjs_category;
exports.syntax = stdjs_stdjs_syntax;
exports.description = stdjs_stdjs_description;
exports.examples = stdjs_stdjs_examples;
exports.seealso = stdjs_stdjs_seealso;
