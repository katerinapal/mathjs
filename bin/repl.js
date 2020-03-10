#!/usr/bin/env node

import * as index from "../index";
import repl from "repl";

/*
 * This simply preloads mathjs and drops you into a REPL to
 * help interactive debugging.
 **/
math = index;

repl.start({useGlobal: true});
