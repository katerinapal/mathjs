var dotjs_dotjs = {
  'name': 'dot',
  'category': 'Matrix',
  'syntax': [
    'dot(A, B)'
  ],
  'description': 'Calculate the dot product of two vectors. ' +
      'The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] ' +
      'is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn',
  'examples': [
    'dot([2, 4, 1], [2, 2, 3])',
    '[2, 4, 1] * [2, 2, 3]'
  ],
  'seealso': [
    'multiply',
    'cross'
  ]
};

var dotjs_dotjs_name = "dot";
var dotjs_dotjs_category = "Matrix";
var dotjs_dotjs_syntax = ["dot(A, B)"];
var dotjs_dotjs_description = "Calculate the dot product of two vectors. " + "The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] " + "is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn";
var dotjs_dotjs_examples = ["dot([2, 4, 1], [2, 2, 3])", "[2, 4, 1] * [2, 2, 3]"];
var dotjs_dotjs_seealso = ["multiply", "cross"];
export { dotjs_dotjs_name as name, dotjs_dotjs_category as category, dotjs_dotjs_syntax as syntax, dotjs_dotjs_description as description, dotjs_dotjs_examples as examples, dotjs_dotjs_seealso as seealso };
