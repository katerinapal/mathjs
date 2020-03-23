var normjs_normjs = {
  'name': 'norm',
  'category': 'Arithmetic',
  'syntax': [
    'norm(x)',
    'norm(x, p)'
  ],
  'description': 'Calculate the norm of a number, vector or matrix.',
  'examples': [
    'abs(-3.5)',
    'norm(-3.5)',
    'norm(3 - 4i))',
    'norm([1, 2, -3], Infinity)',
    'norm([1, 2, -3], -Infinity)',
    'norm([3, 4], 2)',
    'norm([[1, 2], [3, 4]], 1)',
    'norm([[1, 2], [3, 4]], \'inf\')',
    'norm([[1, 2], [3, 4]], \'fro\')'
  ]
};

var normjs_normjs_name = "norm";
var normjs_normjs_category = "Arithmetic";
var normjs_normjs_syntax = ["norm(x)", "norm(x, p)"];
var normjs_normjs_description = "Calculate the norm of a number, vector or matrix.";

var normjs_normjs_examples = [
  "abs(-3.5)",
  "norm(-3.5)",
  "norm(3 - 4i))",
  "norm([1, 2, -3], Infinity)",
  "norm([1, 2, -3], -Infinity)",
  "norm([3, 4], 2)",
  "norm([[1, 2], [3, 4]], 1)",
  "norm([[1, 2], [3, 4]], 'inf')",
  "norm([[1, 2], [3, 4]], 'fro')"
];

export { normjs_normjs_name as name, normjs_normjs_category as category, normjs_normjs_syntax as syntax, normjs_normjs_description as description, normjs_normjs_examples as examples };
