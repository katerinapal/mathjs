var rangejs_rangejs = {
  'name': 'range',
  'category': 'Type',
  'syntax': [
    'start:end',
    'start:step:end',
    'range(start, end)',
    'range(start, end, step)',
    'range(string)'
  ],
  'description':
      'Create a range. Lower bound of the range is included, upper bound is excluded.',
  'examples': [
    '1:5',
    '3:-1:-3',
    'range(3, 7)',
    'range(0, 12, 2)',
    'range("4:10")',
    'a = [1, 2, 3, 4; 5, 6, 7, 8]',
    'a[1:2, 1:2]'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};

var rangejs_rangejs_name = "range";
var rangejs_rangejs_category = "Type";

var rangejs_rangejs_syntax = [
  "start:end",
  "start:step:end",
  "range(start, end)",
  "range(start, end, step)",
  "range(string)"
];

var rangejs_rangejs_description = "Create a range. Lower bound of the range is included, upper bound is excluded.";

var rangejs_rangejs_examples = [
  "1:5",
  "3:-1:-3",
  "range(3, 7)",
  "range(0, 12, 2)",
  "range(\"4:10\")",
  "a = [1, 2, 3, 4; 5, 6, 7, 8]",
  "a[1:2, 1:2]"
];

var rangejs_rangejs_seealso = [
  "concat",
  "det",
  "diag",
  "eye",
  "inv",
  "ones",
  "size",
  "squeeze",
  "subset",
  "trace",
  "transpose",
  "zeros"
];

export { rangejs_rangejs_name as name, rangejs_rangejs_category as category, rangejs_rangejs_syntax as syntax, rangejs_rangejs_description as description, rangejs_rangejs_examples as examples, rangejs_rangejs_seealso as seealso };
