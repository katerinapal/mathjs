var partitionSelectjs_partitionSelectjs = {
  'name': 'partitionSelect',
  'category': 'Matrix',
  'syntax': [
    'partitionSelect(x, k)',
    'partitionSelect(x, k, compare)'
  ],
  'description': 'Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.',
  'examples': [
    'partitionSelect([5, 10, 1], 2)',
    'partitionSelect(["C", "B", "A", "D"], 1)'
  ],
  'seealso': ['sort']
};

var partitionSelectjs_partitionSelectjs_name = "partitionSelect";
var partitionSelectjs_partitionSelectjs_category = "Matrix";
var partitionSelectjs_partitionSelectjs_syntax = ["partitionSelect(x, k)", "partitionSelect(x, k, compare)"];
var partitionSelectjs_partitionSelectjs_description = "Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.";

var partitionSelectjs_partitionSelectjs_examples = [
  "partitionSelect([5, 10, 1], 2)",
  "partitionSelect([\"C\", \"B\", \"A\", \"D\"], 1)"
];

var partitionSelectjs_partitionSelectjs_seealso = ["sort"];
export { partitionSelectjs_partitionSelectjs_name as name, partitionSelectjs_partitionSelectjs_category as category, partitionSelectjs_partitionSelectjs_syntax as syntax, partitionSelectjs_partitionSelectjs_description as description, partitionSelectjs_partitionSelectjs_examples as examples, partitionSelectjs_partitionSelectjs_seealso as seealso };
