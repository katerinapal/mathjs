'use strict';

function factory (type, config, load, typed) {
 /**
  * Return a random integer number larger or equal to `min` and smaller than `max`
  * using a uniform distribution.
  *
  * Syntax:
  *
  *     math.randomInt(max)             // generate a random integer between 0 and max
  *     math.randomInt(min, max)        // generate a random integer between min and max
  *     math.randomInt(size)            // generate a matrix with random integer between 0 and 1
  *     math.randomInt(size, max)       // generate a matrix with random integer between 0 and max
  *     math.randomInt(size, min, max)  // generate a matrix with random integer between min and max
  *
  * Examples:
  *
  *     math.randomInt(100);    // returns a random integer between 0 and 100
  *     math.randomInt(30, 40); // returns a random integer between 30 and 40
  *     math.randomInt([2, 3]); // returns a 2x3 matrix with random integers between 0 and 1
  *
  * See also:
  *
  *     random, pickRandom
  *
  * @param {Array | Matrix} [size] If provided, an array or matrix with given
  *                                size and filled with random values is returned
  * @param {number} [min]  Minimum boundary for the random value, included
  * @param {number} [max]  Maximum boundary for the random value, excluded
  * @return {number | Array | Matrix} A random integer value
  */
 // TODO: rework randomInt to a typed-function
 var randomInt = distribution('uniform').randomInt;

 randomInt.toTex = undefined; // use default template

 return randomInt;
}

var name_name = 'randomInt';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
