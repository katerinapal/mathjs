#!/usr/bin/env node

import * as indexjs from "../index";
import repl_moduleDefault from "repl";

/*
 * This simply preloads mathjs and drops you into a REPL to
 * help interactive debugging.
 **/
math = indexjs;
var repl = {};

repl.start({useGlobal: true});
