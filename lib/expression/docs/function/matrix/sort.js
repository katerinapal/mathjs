var sortjs_exportedObj = {
  'name': 'sort',
  'category': 'Matrix',
  'syntax': [
    'sort(x)',
    'sort(x, compare)'
  ],
  'description': 'Sort the items in a matrix. Compare can be a string "asc" or "desc", or a custom sort function.',
  'examples': [
    'sort([5, 10, 1])',
    'sort(["C", "B", "A", "D"])',
    'sortByLength(a, b) = size(a)[1] - size(b)[1]',
    'sort(["Langdon", "Tom", "Sara"], sortByLength)'
  ],
  'seealso': ['map', 'filter', 'forEach']
};

var sortjs_exportedObj_name = "sort";
var sortjs_exportedObj_category = "Matrix";
var sortjs_exportedObj_syntax = ["sort(x)", "sort(x, compare)"];
var sortjs_exportedObj_description = "Sort the items in a matrix. Compare can be a string \"asc\" or \"desc\", or a custom sort function.";

var sortjs_exportedObj_examples = [
  "sort([5, 10, 1])",
  "sort([\"C\", \"B\", \"A\", \"D\"])",
  "sortByLength(a, b) = size(a)[1] - size(b)[1]",
  "sort([\"Langdon\", \"Tom\", \"Sara\"], sortByLength)"
];

var sortjs_exportedObj_seealso = ["map", "filter", "forEach"];
export { sortjs_exportedObj_name as name, sortjs_exportedObj_category as category, sortjs_exportedObj_syntax as syntax, sortjs_exportedObj_description as description, sortjs_exportedObj_examples as examples, sortjs_exportedObj_seealso as seealso };
