import * as compile from "./compile";
import * as eval from "./eval";
import * as help from "./help";
import * as parse from "./parse";
import * as parser from "./parser";

var indexjs_exportedObj = [
  compile,
  eval,
  help,
  parse,
  parser
];

export { indexjs_exportedObj as indexjs };
