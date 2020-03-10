#!/usr/bin/env node

import * as index_obj from "../index";
import repl from "repl";

/*
 * This simply preloads mathjs and drops you into a REPL to
 * help interactive debugging.
 **/
math = index_obj;

repl.start({useGlobal: true});
