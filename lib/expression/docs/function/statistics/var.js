var varjs_exportedObj = {
  'name': 'var',
  'category': 'Statistics',
  'syntax': [
    'var(a, b, c, ...)',
    'var(A)',
    'var(A, normalization)'
  ],
  'description': 'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  'examples': [
    'var(2, 4, 6)',
    'var([2, 4, 6, 8])',
    'var([2, 4, 6, 8], "uncorrected")',
    'var([2, 4, 6, 8], "biased")',
    'var([1, 2, 3; 4, 5, 6])'
  ],
  'seealso': [
    'max',
    'mean',
    'min',
    'median',
    'min',
    'prod',
    'std',
    'sum'
  ]
};

var varjs_exportedObj_name = "var";
var varjs_exportedObj_category = "Statistics";
var varjs_exportedObj_syntax = ["var(a, b, c, ...)", "var(A)", "var(A, normalization)"];
var varjs_exportedObj_description = "Compute the variance of all values. Optional parameter normalization can be \"unbiased\" (default), \"uncorrected\", or \"biased\".";

var varjs_exportedObj_examples = [
  "var(2, 4, 6)",
  "var([2, 4, 6, 8])",
  "var([2, 4, 6, 8], \"uncorrected\")",
  "var([2, 4, 6, 8], \"biased\")",
  "var([1, 2, 3; 4, 5, 6])"
];

var varjs_exportedObj_seealso = ["max", "mean", "min", "median", "min", "prod", "std", "sum"];
export { varjs_exportedObj_name as name, varjs_exportedObj_category as category, varjs_exportedObj_syntax as syntax, varjs_exportedObj_description as description, varjs_exportedObj_examples as examples, varjs_exportedObj_seealso as seealso };
