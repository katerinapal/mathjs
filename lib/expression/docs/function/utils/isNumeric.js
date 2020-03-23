var isNumericjs_isNumericjs = {
  'name': 'isNumeric',
  'category': 'Utils',
  'syntax': [
    'isNumeric(x)'
  ],
  'description': 'Test whether a value is a numeric value. ' +
    'Returns true when the input is a number, BigNumber, Fraction, or boolean.',
  'examples': [
    'isNumeric(2)',
    'isNumeric(0)',
    'isNumeric(bignumber(500))',
    'isNumeric(fraction(0.125))',
    'isNumeric("3")',
    'isNumeric(2 + 3i)',
    'isNumeric([2.3, "foo", false])'
  ],
  'seealso': ['isInteger', 'isZero', 'isNegative', 'isPositive', 'isNaN']
};

var isNumericjs_isNumericjs_name = "isNumeric";
var isNumericjs_isNumericjs_category = "Utils";
var isNumericjs_isNumericjs_syntax = ["isNumeric(x)"];
var isNumericjs_isNumericjs_description = "Test whether a value is a numeric value. " + "Returns true when the input is a number, BigNumber, Fraction, or boolean.";

var isNumericjs_isNumericjs_examples = [
  "isNumeric(2)",
  "isNumeric(0)",
  "isNumeric(bignumber(500))",
  "isNumeric(fraction(0.125))",
  "isNumeric(\"3\")",
  "isNumeric(2 + 3i)",
  "isNumeric([2.3, \"foo\", false])"
];

var isNumericjs_isNumericjs_seealso = ["isInteger", "isZero", "isNegative", "isPositive", "isNaN"];
export { isNumericjs_isNumericjs_name as name, isNumericjs_isNumericjs_category as category, isNumericjs_isNumericjs_syntax as syntax, isNumericjs_isNumericjs_description as description, isNumericjs_isNumericjs_examples as examples, isNumericjs_isNumericjs_seealso as seealso };
