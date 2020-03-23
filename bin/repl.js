#!/usr/bin/env node

import repl from "repl";

/*
 * This simply preloads mathjs and drops you into a REPL to
 * help interactive debugging.
 **/
math = require('../index');

repl.start({useGlobal: true});
