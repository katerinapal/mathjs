var logjs_logjs = {
  'name': 'log',
  'category': 'Arithmetic',
  'syntax': [
    'log(x)',
    'log(x, base)'
  ],
  'description': 'Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).',
  'examples': [
    'log(3.5)',
    'a = log(2.4)',
    'exp(a)',
    '10 ^ 4',
    'log(10000, 10)',
    'log(10000) / log(10)',
    'b = log(1024, 2)',
    '2 ^ b'
  ],
  'seealso': [
    'exp',
    'log10'
  ]
};

var logjs_logjs_name = "log";
var logjs_logjs_category = "Arithmetic";
var logjs_logjs_syntax = ["log(x)", "log(x, base)"];
var logjs_logjs_description = "Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).";

var logjs_logjs_examples = [
  "log(3.5)",
  "a = log(2.4)",
  "exp(a)",
  "10 ^ 4",
  "log(10000, 10)",
  "log(10000) / log(10)",
  "b = log(1024, 2)",
  "2 ^ b"
];

var logjs_logjs_seealso = ["exp", "log10"];
export { logjs_logjs_name as name, logjs_logjs_category as category, logjs_logjs_syntax as syntax, logjs_logjs_description as description, logjs_logjs_examples as examples, logjs_logjs_seealso as seealso };