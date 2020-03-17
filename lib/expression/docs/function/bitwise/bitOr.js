var bitOrjs_bitOrjs = {
  'name': 'bitOr',
  'category': 'Bitwise',
  'syntax': [
    'x | y',
    'bitOr(x, y)'
  ],
  'description': 'Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.',
  'examples': [
    '5 | 3',
    'bitOr([1, 2, 3], 4)'
  ],
  'seealso': [
    'bitAnd', 'bitNot', 'bitXor', 'leftShift', 'rightArithShift', 'rightLogShift'
  ]
};

var bitOrjs_bitOrjs_name = "bitOr";
var bitOrjs_bitOrjs_category = "Bitwise";
var bitOrjs_bitOrjs_syntax = ["x | y", "bitOr(x, y)"];
var bitOrjs_bitOrjs_description = "Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.";
var bitOrjs_bitOrjs_examples = ["5 | 3", "bitOr([1, 2, 3], 4)"];

var bitOrjs_bitOrjs_seealso = [
  "bitAnd",
  "bitNot",
  "bitXor",
  "leftShift",
  "rightArithShift",
  "rightLogShift"
];

export { bitOrjs_bitOrjs_name as name, bitOrjs_bitOrjs_category as category, bitOrjs_bitOrjs_syntax as syntax, bitOrjs_bitOrjs_description as description, bitOrjs_bitOrjs_examples as examples, bitOrjs_bitOrjs_seealso as seealso };
