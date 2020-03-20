var argjs_argjs = {
  'name': 'arg',
  'category': 'Complex',
  'syntax': [
    'arg(x)'
  ],
  'description':
      'Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).',
  'examples': [
    'arg(2 + 2i)',
    'atan2(3, 2)',
    'arg(2 + 3i)'
  ],
  'seealso': [
    're',
    'im',
    'conj',
    'abs'
  ]
};

var argjs_argjs_name = "arg";
var argjs_argjs_category = "Complex";
var argjs_argjs_syntax = ["arg(x)"];
var argjs_argjs_description = "Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).";
var argjs_argjs_examples = ["arg(2 + 2i)", "atan2(3, 2)", "arg(2 + 3i)"];
var argjs_argjs_seealso = ["re", "im", "conj", "abs"];
export { argjs_argjs_name as name, argjs_argjs_category as category, argjs_argjs_syntax as syntax, argjs_argjs_description as description, argjs_argjs_examples as examples, argjs_argjs_seealso as seealso };
