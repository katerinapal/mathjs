import * as lupjs from "./decomposition/lup";
import * as slujs from "./decomposition/slu";
import * as lsolvejs from "./solver/lsolve";
import * as lusolvejs from "./solver/lusolve";
import * as usolvejs from "./solver/usolve";

var indexjs_exportedObj = [
  lupjs,
  slujs,

  lsolvejs,
  lusolvejs,
  usolvejs
];

export { indexjs_exportedObj as indexjs };
