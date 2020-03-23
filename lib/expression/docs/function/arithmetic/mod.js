var modjs_modjs = {
  'name': 'mod',
  'category': 'Operators',
  'syntax': [
    'x % y',
    'x mod y',
    'mod(x, y)'
  ],
  'description':
      'Calculates the modulus, the remainder of an integer division.',
  'examples': [
    '7 % 3',
    '11 % 2',
    '10 mod 4',
    'function isOdd(x) = x % 2',
    'isOdd(2)',
    'isOdd(3)'
  ],
  'seealso': ['divide']
};

var modjs_modjs_name = "mod";
var modjs_modjs_category = "Operators";
var modjs_modjs_syntax = ["x % y", "x mod y", "mod(x, y)"];
var modjs_modjs_description = "Calculates the modulus, the remainder of an integer division.";

var modjs_modjs_examples = [
  "7 % 3",
  "11 % 2",
  "10 mod 4",
  "function isOdd(x) = x % 2",
  "isOdd(2)",
  "isOdd(3)"
];

var modjs_modjs_seealso = ["divide"];
export { modjs_modjs_name as name, modjs_modjs_category as category, modjs_modjs_syntax as syntax, modjs_modjs_description as description, modjs_modjs_examples as examples, modjs_modjs_seealso as seealso };
