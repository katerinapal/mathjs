import { size as array_sizejs } from "./array";
import { isBoolean as boolean_isBooleanjs } from "./boolean";
import { memoize as function_memoizejs } from "./function";
import { isNumber as number_isNumberjs } from "./number";
import { clone as object_clonejs } from "./object";
import { isString as string_isStringjs } from "./string";
import { type as types_typejs } from "./types";
import { mixin as emitter_mixinjs } from "./emitter";
'use strict';

exports['boolean'] = boolean_isBooleanjs;
exports['function'] = function_memoizejs;
export { array_array as array };
export { number_number as number };
export { object_object as object };
export { string_string as string };
export { types_types as types };
export { emitter_emitter as emitter };
