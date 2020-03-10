import * as bignumberjs from "./construction/bignumber";
import * as booleanjs from "./construction/boolean";
import * as complexjs from "./construction/complex";
import * as fractionjs from "./construction/fraction";
import * as indexjs from "./construction/index";
import * as matrixjs from "./construction/matrix";
import * as numberjs from "./construction/number";
import * as sparsejs from "./construction/sparse";
import * as stringjs from "./construction/string";
import * as unitjs from "./construction/unit";
import * as ejs from "./constants/e";
import * as falsejs from "./constants/false";
import * as ijs from "./constants/i";
import * as Infinityjs from "./constants/Infinity";
import * as LN2js from "./constants/LN2";
import * as LN10js from "./constants/LN10";
import * as LOG2Ejs from "./constants/LOG2E";
import * as LOG10Ejs from "./constants/LOG10E";
import * as NaNjs from "./constants/NaN";
import * as nulljs from "./constants/null";
import * as pijs from "./constants/pi";
import * as phijs from "./constants/phi";
import * as SQRT1_2js from "./constants/SQRT1_2";
import * as SQRT2js from "./constants/SQRT2";
import * as taujs from "./constants/tau";
import * as truejs from "./constants/true";
import * as versionjs from "./constants/version";
import * as lsolvejs from "./function/algebra/lsolve";
import * as lupjs from "./function/algebra/lup";
import * as lusolvejs from "./function/algebra/lusolve";
import * as slujs from "./function/algebra/slu";
import * as usolvejs from "./function/algebra/usolve";
import * as absjs from "./function/arithmetic/abs";
import * as addjs from "./function/arithmetic/add";
import * as cbrtjs from "./function/arithmetic/cbrt";
import * as ceiljs from "./function/arithmetic/ceil";
import * as cubejs from "./function/arithmetic/cube";
import * as dividejs from "./function/arithmetic/divide";
import * as dotDividejs from "./function/arithmetic/dotDivide";
import * as dotMultiplyjs from "./function/arithmetic/dotMultiply";
import * as dotPowjs from "./function/arithmetic/dotPow";
import * as expjs from "./function/arithmetic/exp";
import * as fixjs from "./function/arithmetic/fix";
import * as floorjs from "./function/arithmetic/floor";
import * as gcdjs from "./function/arithmetic/gcd";
import * as hypotjs from "./function/arithmetic/hypot";
import * as lcmjs from "./function/arithmetic/lcm";
import * as logjs from "./function/arithmetic/log";
import * as log10js from "./function/arithmetic/log10";
import * as modjs from "./function/arithmetic/mod";
import * as multiplyjs from "./function/arithmetic/multiply";
import * as normjs from "./function/arithmetic/norm";
import * as nthRootjs from "./function/arithmetic/nthRoot";
import * as powjs from "./function/arithmetic/pow";
import * as roundjs from "./function/arithmetic/round";
import * as signjs from "./function/arithmetic/sign";
import * as sqrtjs from "./function/arithmetic/sqrt";
import * as squarejs from "./function/arithmetic/square";
import * as subtractjs from "./function/arithmetic/subtract";
import * as unaryMinusjs from "./function/arithmetic/unaryMinus";
import * as unaryPlusjs from "./function/arithmetic/unaryPlus";
import * as xgcdjs from "./function/arithmetic/xgcd";
import * as bitAndjs from "./function/bitwise/bitAnd";
import * as bitNotjs from "./function/bitwise/bitNot";
import * as bitOrjs from "./function/bitwise/bitOr";
import * as bitXorjs from "./function/bitwise/bitXor";
import * as leftShiftjs from "./function/bitwise/leftShift";
import * as rightArithShiftjs from "./function/bitwise/rightArithShift";
import * as rightLogShiftjs from "./function/bitwise/rightLogShift";
import * as bellNumbersjs from "./function/combinatorics/bellNumbers";
import * as catalanjs from "./function/combinatorics/catalan";
import * as compositionjs from "./function/combinatorics/composition";
import * as stirlingS2js from "./function/combinatorics/stirlingS2";
import * as configjs from "./core/config";
import * as importjs from "./core/import";
import * as typedjs from "./core/typed";
import * as argjs from "./function/complex/arg";
import * as conjjs from "./function/complex/conj";
import * as rejs from "./function/complex/re";
import * as imjs from "./function/complex/im";
import * as evaljs from "./function/expression/eval";
import * as helpjs from "./function/expression/help";
import * as intersectjs from "./function/geometry/intersect";
import * as andjs from "./function/logical/and";
import * as notjs from "./function/logical/not";
import * as orjs from "./function/logical/or";
import * as xorjs from "./function/logical/xor";
import * as concatjs from "./function/matrix/concat";
import * as crossjs from "./function/matrix/cross";
import * as detjs from "./function/matrix/det";
import * as diagjs from "./function/matrix/diag";
import * as dotjs from "./function/matrix/dot";
import * as eyejs from "./function/matrix/eye";
import * as filterjs from "./function/matrix/filter";
import * as flattenjs from "./function/matrix/flatten";
import * as forEachjs from "./function/matrix/forEach";
import * as invjs from "./function/matrix/inv";
import * as mapjs from "./function/matrix/map";
import * as onesjs from "./function/matrix/ones";
import * as partitionSelectjs from "./function/matrix/partitionSelect";
import * as rangejs from "./function/matrix/range";
import * as resizejs from "./function/matrix/resize";
import * as sizejs from "./function/matrix/size";
import * as sortjs from "./function/matrix/sort";
import * as squeezejs from "./function/matrix/squeeze";
import * as subsetjs from "./function/matrix/subset";
import * as tracejs from "./function/matrix/trace";
import * as transposejs from "./function/matrix/transpose";
import * as zerosjs from "./function/matrix/zeros";
import * as combinationsjs from "./function/probability/combinations";
import * as factorialjs from "./function/probability/factorial";
import * as gammajs from "./function/probability/gamma";
import * as kldivergencejs from "./function/probability/kldivergence";
import * as multinomialjs from "./function/probability/multinomial";
import * as permutationsjs from "./function/probability/permutations";
import * as pickRandomjs from "./function/probability/pickRandom";
import * as randomjs from "./function/probability/random";
import * as randomIntjs from "./function/probability/randomInt";
import * as comparejs from "./function/relational/compare";
import * as deepEqualjs from "./function/relational/deepEqual";
import * as equaljs from "./function/relational/equal";
import * as largerjs from "./function/relational/larger";
import * as largerEqjs from "./function/relational/largerEq";
import * as smallerjs from "./function/relational/smaller";
import * as smallerEqjs from "./function/relational/smallerEq";
import * as unequaljs from "./function/relational/unequal";
import * as maxjs from "./function/statistics/max";
import * as meanjs from "./function/statistics/mean";
import * as medianjs from "./function/statistics/median";
import * as minjs from "./function/statistics/min";
import * as modejs from "./function/statistics/mode";
import * as prodjs from "./function/statistics/prod";
import * as quantileSeqjs from "./function/statistics/quantileSeq";
import * as stdjs from "./function/statistics/std";
import * as sumjs from "./function/statistics/sum";
import * as varjs from "./function/statistics/var";
import * as acosjs from "./function/trigonometry/acos";
import * as acoshjs from "./function/trigonometry/acosh";
import * as acotjs from "./function/trigonometry/acot";
import * as acothjs from "./function/trigonometry/acoth";
import * as acscjs from "./function/trigonometry/acsc";
import * as acschjs from "./function/trigonometry/acsch";
import * as asecjs from "./function/trigonometry/asec";
import * as asechjs from "./function/trigonometry/asech";
import * as asinjs from "./function/trigonometry/asin";
import * as asinhjs from "./function/trigonometry/asinh";
import * as atanjs from "./function/trigonometry/atan";
import * as atanhjs from "./function/trigonometry/atanh";
import * as atan2js from "./function/trigonometry/atan2";
import * as cosjs from "./function/trigonometry/cos";
import * as coshjs from "./function/trigonometry/cosh";
import * as cotjs from "./function/trigonometry/cot";
import * as cothjs from "./function/trigonometry/coth";
import * as cscjs from "./function/trigonometry/csc";
import * as cschjs from "./function/trigonometry/csch";
import * as secjs from "./function/trigonometry/sec";
import * as sechjs from "./function/trigonometry/sech";
import * as sinjs from "./function/trigonometry/sin";
import * as sinhjs from "./function/trigonometry/sinh";
import * as tanjs from "./function/trigonometry/tan";
import * as tanhjs from "./function/trigonometry/tanh";
import * as tojs from "./function/units/to";
import * as clonejs from "./function/utils/clone";
import * as formatjs from "./function/utils/format";
import * as isNaNjs from "./function/utils/isNaN";
import * as isIntegerjs from "./function/utils/isInteger";
import * as isNegativejs from "./function/utils/isNegative";
import * as isNumericjs from "./function/utils/isNumeric";
import * as isPositivejs from "./function/utils/isPositive";
import * as isPrimejs from "./function/utils/isPrime";
import * as isZerojs from "./function/utils/isZero";
import * as typeofjs from "./function/utils/typeof";
function factory (construction, config, load, typed) {
  var docs = {};


  // construction functions
  docs.bignumber = bignumberjs;
  docs['boolean'] = booleanjs;
  docs.complex = complexjs;
  docs.fraction = fractionjs;
  docs.index = indexjs;
  docs.matrix = matrixjs;
  docs.number = numberjs;
  docs.sparse = sparsejs;
  docs.string = stringjs;
  docs.unit = unitjs;

  // constants
  docs.e = ejs;
  docs.E = ejs;
  docs['false'] = falsejs;
  docs.i = ijs;
  docs['Infinity'] = Infinityjs;
  docs.LN2 = LN2js;
  docs.LN10 = LN10js;
  docs.LOG2E = LOG2Ejs;
  docs.LOG10E = LOG10Ejs;
  docs.NaN = NaNjs;
  docs['null'] = nulljs;
  docs.pi = pijs;
  docs.PI = pijs;
  docs.phi = phijs;
  docs.SQRT1_2 = SQRT1_2js;
  docs.SQRT2 = SQRT2js;
  docs.tau = taujs;
  docs['true'] = truejs;
  docs.version = versionjs;

  // physical constants
  // TODO: more detailed docs for physical constants
  docs.speedOfLight = {description: 'Speed of light in vacuum', examples: ['speedOfLight']};
  docs.gravitationConstant = {description: 'Newtonian constant of gravitation', examples: ['gravitationConstant']};
  docs.planckConstant = {description: 'Planck constant', examples: ['planckConstant']};
  docs.reducedPlanckConstant = {description: 'Reduced Planck constant', examples: ['reducedPlanckConstant']};

  docs.magneticConstant = {description: 'Magnetic constant (vacuum permeability)', examples: ['magneticConstant']};
  docs.electricConstant = {description: 'Electric constant (vacuum permeability)', examples: ['electricConstant']};
  docs.vacuumImpedance = {description: 'Characteristic impedance of vacuum', examples: ['vacuumImpedance']};
  docs.coulomb = {description: 'Coulomb\'s constant', examples: ['coulomb']};
  docs.elementaryCharge = {description: 'Elementary charge', examples: ['elementaryCharge']};
  docs.bohrMagneton = {description: 'Borh magneton', examples: ['bohrMagneton']};
  docs.conductanceQuantum = {description: 'Conductance quantum', examples: ['conductanceQuantum']};
  docs.inverseConductanceQuantum = {description: 'Inverse conductance quantum', examples: ['inverseConductanceQuantum']};
  //docs.josephson = {description: 'Josephson constant', examples: ['josephson']};
  docs.magneticFluxQuantum = {description: 'Magnetic flux quantum', examples: ['magneticFluxQuantum']};
  docs.nuclearMagneton = {description: 'Nuclear magneton', examples: ['nuclearMagneton']};
  docs.klitzing = {description: 'Von Klitzing constant', examples: ['klitzing']};

  docs.bohrRadius = {description: 'Borh radius', examples: ['bohrRadius']};
  docs.classicalElectronRadius = {description: 'Classical electron radius', examples: ['classicalElectronRadius']};
  docs.electronMass = {description: 'Electron mass', examples: ['electronMass']};
  docs.fermiCoupling = {description: 'Fermi coupling constant', examples: ['fermiCoupling']};
  docs.fineStructure = {description: 'Fine-structure constant', examples: ['fineStructure']};
  docs.hartreeEnergy = {description: 'Hartree energy', examples: ['hartreeEnergy']};
  docs.protonMass = {description: 'Proton mass', examples: ['protonMass']};
  docs.deuteronMass = {description: 'Deuteron Mass', examples: ['deuteronMass']};
  docs.neutronMass = {description: 'Neutron mass', examples: ['neutronMass']};
  docs.quantumOfCirculation = {description: 'Quantum of circulation', examples: ['quantumOfCirculation']};
  docs.rydberg = {description: 'Rydberg constant', examples: ['rydberg']};
  docs.thomsonCrossSection = {description: 'Thomson cross section', examples: ['thomsonCrossSection']};
  docs.weakMixingAngle = {description: 'Weak mixing angle', examples: ['weakMixingAngle']};
  docs.efimovFactor = {description: 'Efimov factor', examples: ['efimovFactor']};

  docs.atomicMass = {description: 'Atomic mass constant', examples: ['atomicMass']};
  docs.avogadro = {description: 'Avogadro\'s number', examples: ['avogadro']};
  docs.boltzmann = {description: 'Boltzmann constant', examples: ['boltzmann']};
  docs.faraday = {description: 'Faraday constant', examples: ['faraday']};
  docs.firstRadiation = {description: 'First radiation constant', examples: ['firstRadiation']};
  docs.loschmidt = {description: 'Loschmidt constant at T=273.15 K and p=101.325 kPa', examples: ['loschmidt']};
  docs.gasConstant = {description: 'Gas constant', examples: ['gasConstant']};
  docs.molarPlanckConstant = {description: 'Molar Planck constant', examples: ['molarPlanckConstant']};
  docs.molarVolume = {description: 'Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa', examples: ['molarVolume']};
  docs.sackurTetrode = {description: 'Sackur-Tetrode constant at T=1 K and p=101.325 kPa', examples: ['sackurTetrode']};
  docs.secondRadiation = {description: 'Second radiation constant', examples: ['secondRadiation']};
  docs.stefanBoltzmann = {description: 'Stefan-Boltzmann constant', examples: ['stefanBoltzmann']};
  docs.wienDisplacement = {description: 'Wien displacement law constant', examples: ['wienDisplacement']};
  //docs.spectralRadiance = {description: 'First radiation constant for spectral radiance', examples: ['spectralRadiance']};

  docs.molarMass = {description: 'Molar mass constant', examples: ['molarMass']};
  docs.molarMassC12 = {description: 'Molar mass constant of carbon-12', examples: ['molarMassC12']};
  docs.gravity = {description: 'Standard acceleration of gravity (standard acceleration of free-fall on Earth)', examples: ['gravity']};

  docs.planckLength = {description: 'Planck length', examples: ['planckLength']};
  docs.planckMass = {description: 'Planck mass', examples: ['planckMass']};
  docs.planckTime = {description: 'Planck time', examples: ['planckTime']};
  docs.planckCharge = {description: 'Planck charge', examples: ['planckCharge']};
  docs.planckTemperature = {description: 'Planck temperature', examples: ['planckTemperature']};

  // functions - algebra
  docs.lsolve = lsolvejs;
  docs.lup = lupjs;
  docs.lusolve = lusolvejs;
  docs.slu = slujs;
  docs.usolve = usolvejs;

  // functions - arithmetic
  docs.abs = absjs;
  docs.add = addjs;
  docs.cbrt = cbrtjs;
  docs.ceil = ceiljs;
  docs.cube = cubejs;
  docs.divide = dividejs;
  docs.dotDivide = dotDividejs;
  docs.dotMultiply = dotMultiplyjs;
  docs.dotPow = dotPowjs;
  docs.exp = expjs;
  docs.fix = fixjs;
  docs.floor = floorjs;
  docs.gcd = gcdjs;
  docs.hypot = hypotjs;
  docs.lcm = lcmjs;
  docs.log = logjs;
  docs.log10 = log10js;
  docs.mod = modjs;
  docs.multiply = multiplyjs;
  docs.norm = normjs;
  docs.nthRoot = nthRootjs;
  docs.pow = powjs;
  docs.round = roundjs;
  docs.sign = signjs;
  docs.sqrt = sqrtjs;
  docs.square = squarejs;
  docs.subtract = subtractjs;
  docs.unaryMinus = unaryMinusjs;
  docs.unaryPlus = unaryPlusjs;
  docs.xgcd = xgcdjs;

  // functions - bitwise
  docs.bitAnd = bitAndjs;
  docs.bitNot = bitNotjs;
  docs.bitOr = bitOrjs;
  docs.bitXor = bitXorjs;
  docs.leftShift = leftShiftjs;
  docs.rightArithShift = rightArithShiftjs;
  docs.rightLogShift = rightLogShiftjs;

  // functions - combinatorics
  docs.bellNumbers = bellNumbersjs;
  docs.catalan = catalanjs;
  docs.composition = compositionjs;
  docs.stirlingS2 = stirlingS2js;

  // functions - core
  docs['config'] =  configjs;
  docs['import'] =  importjs;
  docs['typed'] =  typedjs;

  // functions - complex
  docs.arg = argjs;
  docs.conj = conjjs;
  docs.re = rejs;
  docs.im = imjs;

  // functions - expression
  docs['eval'] =  evaljs;
  docs.help =  helpjs;

  // functions - geometry
  docs.distance = require('./function/geometry/distance');
  docs.intersect = intersectjs;

  // functions - logical
  docs['and'] = andjs;
  docs['not'] = notjs;
  docs['or'] = orjs;
  docs['xor'] = xorjs;

  // functions - matrix
  docs['concat'] = concatjs;
  docs.cross = crossjs;
  docs.det = detjs;
  docs.diag = diagjs;
  docs.dot = dotjs;
  docs.eye = eyejs;
  docs.filter =  filterjs;
  docs.flatten = flattenjs;
  docs.forEach =  forEachjs;
  docs.inv = invjs;
  docs.map =  mapjs;
  docs.ones = onesjs;
  docs.partitionSelect =  partitionSelectjs;
  docs.range = rangejs;
  docs.resize = resizejs;
  docs.size = sizejs;
  docs.sort =  sortjs;
  docs.squeeze = squeezejs;
  docs.subset = subsetjs;
  docs.trace = tracejs;
  docs.transpose = transposejs;
  docs.zeros = zerosjs;

  // functions - probability
  docs.combinations = combinationsjs;
  //docs.distribution = require('./function/probability/distribution');
  docs.factorial = factorialjs;
  docs.gamma = gammajs;
  docs.kldivergence = kldivergencejs;
  docs.multinomial = multinomialjs;
  docs.permutations = permutationsjs;
  docs.pickRandom = pickRandomjs;
  docs.random = randomjs;
  docs.randomInt = randomIntjs;

  // functions - relational
  docs.compare = comparejs;
  docs.deepEqual = deepEqualjs;
  docs['equal'] = equaljs;
  docs.larger = largerjs;
  docs.largerEq = largerEqjs;
  docs.smaller = smallerjs;
  docs.smallerEq = smallerEqjs;
  docs.unequal = unequaljs;

  // functions - statistics
  docs.max = maxjs;
  docs.mean = meanjs;
  docs.median = medianjs;
  docs.min = minjs;
  docs.mode = modejs;
  docs.prod = prodjs;
  docs.quantileSeq = quantileSeqjs;
  docs.std = stdjs;
  docs.sum = sumjs;
  docs['var'] = varjs;

  // functions - trigonometry
  docs.acos = acosjs;
  docs.acosh = acoshjs;
  docs.acot = acotjs;
  docs.acoth = acothjs;
  docs.acsc = acscjs;
  docs.acsch = acschjs;
  docs.asec = asecjs;
  docs.asech = asechjs;
  docs.asin = asinjs;
  docs.asinh = asinhjs;
  docs.atan = atanjs;
  docs.atanh = atanhjs;
  docs.atan2 = atan2js;
  docs.cos = cosjs;
  docs.cosh = coshjs;
  docs.cot = cotjs;
  docs.coth = cothjs;
  docs.csc = cscjs;
  docs.csch = cschjs;
  docs.sec = secjs;
  docs.sech = sechjs;
  docs.sin = sinjs;
  docs.sinh = sinhjs;
  docs.tan = tanjs;
  docs.tanh = tanhjs;

  // functions - units
  docs.to = tojs;

  // functions - utils
  docs.clone = clonejs;
  docs.format = formatjs;
  docs.isNaN = isNaNjs;
  docs.isInteger = isIntegerjs;
  docs.isNegative = isNegativejs;
  docs.isNumeric = isNumericjs;
  docs.isPositive = isPositivejs;
  docs.isPrime = isPrimejs;
  docs.isZero = isZerojs;
  // docs.print = require('./function/utils/print'); // TODO: add documentation for print as soon as the parser supports objects.
  docs['typeof'] =  typeofjs;

  return docs;
}

var name_exportedObj = 'docs';
var path_exportedObj = 'expression';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
