import * as decompositionlup from "./decomposition/lup";
import * as decompositionslu from "./decomposition/slu";
import * as solverlsolve from "./solver/lsolve";
import * as solverlusolve from "./solver/lusolve";
import * as solverusolve from "./solver/usolve";

var indexjs_exportedObj = [
  decompositionlup,
  decompositionslu,

  solverlsolve,
  solverlusolve,
  solverusolve
];

export { indexjs_exportedObj as indexjs };
