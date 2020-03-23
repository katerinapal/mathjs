"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _combinations = require("./combinations");

var combinations_obj = _interopRequireWildcard(_combinations);

var _factorial = require("./factorial");

var factorial_obj = _interopRequireWildcard(_factorial);

var _gamma = require("./gamma");

var gamma_obj = _interopRequireWildcard(_gamma);

var _kldivergence = require("./kldivergence");

var kldivergence_obj = _interopRequireWildcard(_kldivergence);

var _multinomial = require("./multinomial");

var multinomial_obj = _interopRequireWildcard(_multinomial);

var _permutations = require("./permutations");

var permutations_obj = _interopRequireWildcard(_permutations);

var _pickRandom = require("./pickRandom");

var pickRandom_obj = _interopRequireWildcard(_pickRandom);

var _random = require("./random");

var random_obj = _interopRequireWildcard(_random);

var _randomInt = require("./randomInt");

var randomInt_obj = _interopRequireWildcard(_randomInt);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs_indexjs = [combinations_obj, factorial_obj, gamma_obj, kldivergence_obj, multinomial_obj, permutations_obj, pickRandom_obj, random_obj, randomInt_obj];

exports.indexjs = indexjs_indexjs;
