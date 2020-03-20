var resizejs_resizejs = {
  'name': 'resize',
  'category': 'Matrix',
  'syntax': [
    'resize(x, size)',
    'resize(x, size, defaultValue)'
  ],
  'description': 'Resize a matrix.',
  'examples': [
    'resize([1,2,3,4,5], [3])',
    'resize([1,2,3], [5])',
    'resize([1,2,3], [5], -1)',
    'resize(2, [2, 3])',
    'resize("hello", [8], "!")'
  ],
  'seealso': [
    'size', 'subset', 'squeeze'
  ]
};

var resizejs_resizejs_name = "resize";
var resizejs_resizejs_category = "Matrix";
var resizejs_resizejs_syntax = ["resize(x, size)", "resize(x, size, defaultValue)"];
var resizejs_resizejs_description = "Resize a matrix.";

var resizejs_resizejs_examples = [
  "resize([1,2,3,4,5], [3])",
  "resize([1,2,3], [5])",
  "resize([1,2,3], [5], -1)",
  "resize(2, [2, 3])",
  "resize(\"hello\", [8], \"!\")"
];

var resizejs_resizejs_seealso = ["size", "subset", "squeeze"];
export { resizejs_resizejs_name as name, resizejs_resizejs_category as category, resizejs_resizejs_syntax as syntax, resizejs_resizejs_description as description, resizejs_resizejs_examples as examples, resizejs_resizejs_seealso as seealso };
