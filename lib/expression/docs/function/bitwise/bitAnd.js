var bitAndjs_bitAndjs = {
  'name': 'bitAnd',
  'category': 'Bitwise',
  'syntax': [
    'x & y',
    'bitAnd(x, y)'
  ],
  'description': 'Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0',
  'examples': [
    '5 & 3',
    'bitAnd(53, 131)',
    '[1, 12, 31] & 42'
  ],
  'seealso': [
    'bitNot', 'bitOr', 'bitXor', 'leftShift', 'rightArithShift', 'rightLogShift'
  ]
};

var bitAndjs_bitAndjs_name = "bitAnd";
var bitAndjs_bitAndjs_category = "Bitwise";
var bitAndjs_bitAndjs_syntax = ["x & y", "bitAnd(x, y)"];
var bitAndjs_bitAndjs_description = "Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0";
var bitAndjs_bitAndjs_examples = ["5 & 3", "bitAnd(53, 131)", "[1, 12, 31] & 42"];

var bitAndjs_bitAndjs_seealso = [
  "bitNot",
  "bitOr",
  "bitXor",
  "leftShift",
  "rightArithShift",
  "rightLogShift"
];

export { bitAndjs_bitAndjs_name as name, bitAndjs_bitAndjs_category as category, bitAndjs_bitAndjs_syntax as syntax, bitAndjs_bitAndjs_description as description, bitAndjs_bitAndjs_examples as examples, bitAndjs_bitAndjs_seealso as seealso };
