var minjs_minjs = {
  'name': 'min',
  'category': 'Statistics',
  'syntax': [
    'min(a, b, c, ...)',
    'min(A)',
    'min(A, dim)'
  ],
  'description': 'Compute the minimum value of a list of values.',
  'examples': [
    'min(2, 3, 4, 1)',
    'min([2, 3, 4, 1])',
    'min([2, 5; 4, 3])',
    'min([2, 5; 4, 3], 1)',
    'min([2, 5; 4, 3], 2)',
    'min(2.7, 7.1, -4.5, 2.0, 4.1)',
    'max(2.7, 7.1, -4.5, 2.0, 4.1)'
  ],
  'seealso': [
    'max',
    'mean',
    'median',
    'prod',
    'std',
    'sum',
    'var'
  ]
};

var minjs_minjs_name = "min";
var minjs_minjs_category = "Statistics";
var minjs_minjs_syntax = ["min(a, b, c, ...)", "min(A)", "min(A, dim)"];
var minjs_minjs_description = "Compute the minimum value of a list of values.";

var minjs_minjs_examples = [
  "min(2, 3, 4, 1)",
  "min([2, 3, 4, 1])",
  "min([2, 5; 4, 3])",
  "min([2, 5; 4, 3], 1)",
  "min([2, 5; 4, 3], 2)",
  "min(2.7, 7.1, -4.5, 2.0, 4.1)",
  "max(2.7, 7.1, -4.5, 2.0, 4.1)"
];

var minjs_minjs_seealso = ["max", "mean", "median", "prod", "std", "sum", "var"];
export { minjs_minjs_name as name, minjs_minjs_category as category, minjs_minjs_syntax as syntax, minjs_minjs_description as description, minjs_minjs_examples as examples, minjs_minjs_seealso as seealso };
