var largerjs_largerjs = {
  'name': 'larger',
  'category': 'Relational',
  'syntax': [
    'x > y',
    'larger(x, y)'
  ],
  'description':
      'Check if value x is larger than y. Returns true if x is larger than y, and false if not.',
  'examples': [
    '2 > 3',
    '5 > 2*2',
    'a = 3.3',
    'b = 6-2.8',
    '(a > b)',
    '(b < a)',
    '5 cm > 2 inch'
  ],
  'seealso': [
    'equal', 'unequal', 'smaller', 'smallerEq', 'largerEq', 'compare'
  ]
};

var largerjs_largerjs_name = "larger";
var largerjs_largerjs_category = "Relational";
var largerjs_largerjs_syntax = ["x > y", "larger(x, y)"];
var largerjs_largerjs_description = "Check if value x is larger than y. Returns true if x is larger than y, and false if not.";

var largerjs_largerjs_examples = [
  "2 > 3",
  "5 > 2*2",
  "a = 3.3",
  "b = 6-2.8",
  "(a > b)",
  "(b < a)",
  "5 cm > 2 inch"
];

var largerjs_largerjs_seealso = ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare"];
export { largerjs_largerjs_name as name, largerjs_largerjs_category as category, largerjs_largerjs_syntax as syntax, largerjs_largerjs_description as description, largerjs_largerjs_examples as examples, largerjs_largerjs_seealso as seealso };
