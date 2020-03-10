var stdjs_exportedObj = {
  'name': 'std',
  'category': 'Statistics',
  'syntax': [
    'std(a, b, c, ...)',
    'std(A)',
    'std(A, normalization)'
  ],
  'description': 'Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  'examples': [
    'std(2, 4, 6)',
    'std([2, 4, 6, 8])',
    'std([2, 4, 6, 8], "uncorrected")',
    'std([2, 4, 6, 8], "biased")',
    'std([1, 2, 3; 4, 5, 6])'
  ],
  'seealso': [
    'max',
    'mean',
    'min',
    'median',
    'min',
    'prod',
    'sum',
    'var'
  ]
};

var stdjs_exportedObj_name = "std";
var stdjs_exportedObj_category = "Statistics";
var stdjs_exportedObj_syntax = ["std(a, b, c, ...)", "std(A)", "std(A, normalization)"];
var stdjs_exportedObj_description = "Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be \"unbiased\" (default), \"uncorrected\", or \"biased\".";

var stdjs_exportedObj_examples = [
  "std(2, 4, 6)",
  "std([2, 4, 6, 8])",
  "std([2, 4, 6, 8], \"uncorrected\")",
  "std([2, 4, 6, 8], \"biased\")",
  "std([1, 2, 3; 4, 5, 6])"
];

var stdjs_exportedObj_seealso = ["max", "mean", "min", "median", "min", "prod", "sum", "var"];
export { stdjs_exportedObj_name as name, stdjs_exportedObj_category as category, stdjs_exportedObj_syntax as syntax, stdjs_exportedObj_description as description, stdjs_exportedObj_examples as examples, stdjs_exportedObj_seealso as seealso };
