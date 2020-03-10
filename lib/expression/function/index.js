import * as compilejs from "./compile";
import * as evaljs from "./eval";
import * as helpjs from "./help";
import * as parsejs from "./parse";
import * as parserjs from "./parser";

var indexjs_exportedObj = [
  compilejs,
  evaljs,
  helpjs,
  parsejs,
  parserjs
];

export { indexjs_exportedObj as indexjs };
