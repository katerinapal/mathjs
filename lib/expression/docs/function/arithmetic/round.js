var roundjs_roundjs = {
  'name': 'round',
  'category': 'Arithmetic',
  'syntax': [
    'round(x)',
    'round(x, n)'
  ],
  'description':
      'round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.',
  'examples': [
    'round(3.2)',
    'round(3.8)',
    'round(-4.2)',
    'round(-4.8)',
    'round(pi, 3)',
    'round(123.45678, 2)'
  ],
  'seealso': ['ceil', 'floor', 'fix']
};

var roundjs_roundjs_name = "round";
var roundjs_roundjs_category = "Arithmetic";
var roundjs_roundjs_syntax = ["round(x)", "round(x, n)"];
var roundjs_roundjs_description = "round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.";

var roundjs_roundjs_examples = [
  "round(3.2)",
  "round(3.8)",
  "round(-4.2)",
  "round(-4.8)",
  "round(pi, 3)",
  "round(123.45678, 2)"
];

var roundjs_roundjs_seealso = ["ceil", "floor", "fix"];
export { roundjs_roundjs_name as name, roundjs_roundjs_category as category, roundjs_roundjs_syntax as syntax, roundjs_roundjs_description as description, roundjs_roundjs_examples as examples, roundjs_roundjs_seealso as seealso };
