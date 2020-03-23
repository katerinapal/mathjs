var cbrtjs_cbrtjs = {
  'name': 'cbrt',
  'category': 'Arithmetic',
  'syntax': [
    'cbrt(x)',
    'cbrt(x, allRoots)'
  ],
  'description':
      'Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned',
  'examples': [
    'cbrt(64)',
    'cube(4)',
    'cbrt(-8)',
    'cbrt(2 + 3i)',
    'cbrt(8i)',
    'cbrt(8i, true)',
    'cbrt(27 m^3)'
  ],
  'seealso': [
    'square',
    'sqrt',
    'cube',
    'multiply'
  ]
};

var cbrtjs_cbrtjs_name = "cbrt";
var cbrtjs_cbrtjs_category = "Arithmetic";
var cbrtjs_cbrtjs_syntax = ["cbrt(x)", "cbrt(x, allRoots)"];
var cbrtjs_cbrtjs_description = "Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned";

var cbrtjs_cbrtjs_examples = [
  "cbrt(64)",
  "cube(4)",
  "cbrt(-8)",
  "cbrt(2 + 3i)",
  "cbrt(8i)",
  "cbrt(8i, true)",
  "cbrt(27 m^3)"
];

var cbrtjs_cbrtjs_seealso = ["square", "sqrt", "cube", "multiply"];
export { cbrtjs_cbrtjs_name as name, cbrtjs_cbrtjs_category as category, cbrtjs_cbrtjs_syntax as syntax, cbrtjs_cbrtjs_description as description, cbrtjs_cbrtjs_examples as examples, cbrtjs_cbrtjs_seealso as seealso };
