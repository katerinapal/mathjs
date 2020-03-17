var smallerjs_smallerjs = {
  'name': 'smaller',
  'category': 'Relational',
  'syntax': [
    'x < y',
    'smaller(x, y)'
  ],
  'description':
      'Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.',
  'examples': [
    '2 < 3',
    '5 < 2*2',
    'a = 3.3',
    'b = 6-2.8',
    '(a < b)',
    '5 cm < 2 inch'
  ],
  'seealso': [
    'equal', 'unequal', 'larger', 'smallerEq', 'largerEq', 'compare'
  ]
};

var smallerjs_smallerjs_name = "smaller";
var smallerjs_smallerjs_category = "Relational";
var smallerjs_smallerjs_syntax = ["x < y", "smaller(x, y)"];
var smallerjs_smallerjs_description = "Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.";
var smallerjs_smallerjs_examples = ["2 < 3", "5 < 2*2", "a = 3.3", "b = 6-2.8", "(a < b)", "5 cm < 2 inch"];
var smallerjs_smallerjs_seealso = ["equal", "unequal", "larger", "smallerEq", "largerEq", "compare"];
export { smallerjs_smallerjs_name as name, smallerjs_smallerjs_category as category, smallerjs_smallerjs_syntax as syntax, smallerjs_smallerjs_description as description, smallerjs_smallerjs_examples as examples, smallerjs_smallerjs_seealso as seealso };
