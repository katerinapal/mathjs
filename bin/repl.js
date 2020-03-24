#!/usr/bin/env node
"use strict";

var _repl = require("repl");

var _repl2 = _interopRequireDefault(_repl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This simply preloads mathjs and drops you into a REPL to
 * help interactive debugging.
 **/
math = {};

_repl2.default.start({ useGlobal: true });
