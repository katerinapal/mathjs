import * as constructionbignumber from "./construction/bignumber";
import * as constructionboolean from "./construction/boolean";
import * as constructioncomplex from "./construction/complex";
import * as constructionfraction from "./construction/fraction";
import * as constructionindex from "./construction/index";
import * as constructionmatrix from "./construction/matrix";
import * as constructionnumber from "./construction/number";
import * as constructionsparse from "./construction/sparse";
import * as constructionstring from "./construction/string";
import * as constructionunit from "./construction/unit";
import * as constantse from "./constants/e";
import * as constantsfalse from "./constants/false";
import * as constantsi from "./constants/i";
import * as constantsInfinity from "./constants/Infinity";
import * as constantsLN2 from "./constants/LN2";
import * as constantsLN10 from "./constants/LN10";
import * as constantsLOG2E from "./constants/LOG2E";
import * as constantsLOG10E from "./constants/LOG10E";
import * as constantsNaN from "./constants/NaN";
import * as constantsnull from "./constants/null";
import * as constantspi from "./constants/pi";
import * as constantsphi from "./constants/phi";
import * as constantsSQRT1_2 from "./constants/SQRT1_2";
import * as constantsSQRT2 from "./constants/SQRT2";
import * as constantstau from "./constants/tau";
import * as constantstrue from "./constants/true";
import * as constantsversion from "./constants/version";
import * as functionalgebralsolve from "./function/algebra/lsolve";
import * as functionalgebralup from "./function/algebra/lup";
import * as functionalgebralusolve from "./function/algebra/lusolve";
import * as functionalgebraslu from "./function/algebra/slu";
import * as functionalgebrausolve from "./function/algebra/usolve";
import * as functionarithmeticabs from "./function/arithmetic/abs";
import * as functionarithmeticadd from "./function/arithmetic/add";
import * as functionarithmeticcbrt from "./function/arithmetic/cbrt";
import * as functionarithmeticceil from "./function/arithmetic/ceil";
import * as functionarithmeticcube from "./function/arithmetic/cube";
import * as functionarithmeticdivide from "./function/arithmetic/divide";
import * as functionarithmeticdotDivide from "./function/arithmetic/dotDivide";
import * as functionarithmeticdotMultiply from "./function/arithmetic/dotMultiply";
import * as functionarithmeticdotPow from "./function/arithmetic/dotPow";
import * as functionarithmeticexp from "./function/arithmetic/exp";
import * as functionarithmeticfix from "./function/arithmetic/fix";
import * as functionarithmeticfloor from "./function/arithmetic/floor";
import * as functionarithmeticgcd from "./function/arithmetic/gcd";
import * as functionarithmetichypot from "./function/arithmetic/hypot";
import * as functionarithmeticlcm from "./function/arithmetic/lcm";
import * as functionarithmeticlog from "./function/arithmetic/log";
import * as functionarithmeticlog10 from "./function/arithmetic/log10";
import * as functionarithmeticmod from "./function/arithmetic/mod";
import * as functionarithmeticmultiply from "./function/arithmetic/multiply";
import * as functionarithmeticnorm from "./function/arithmetic/norm";
import * as functionarithmeticnthRoot from "./function/arithmetic/nthRoot";
import * as functionarithmeticpow from "./function/arithmetic/pow";
import * as functionarithmeticround from "./function/arithmetic/round";
import * as functionarithmeticsign from "./function/arithmetic/sign";
import * as functionarithmeticsqrt from "./function/arithmetic/sqrt";
import * as functionarithmeticsquare from "./function/arithmetic/square";
import * as functionarithmeticsubtract from "./function/arithmetic/subtract";
import * as functionarithmeticunaryMinus from "./function/arithmetic/unaryMinus";
import * as functionarithmeticunaryPlus from "./function/arithmetic/unaryPlus";
import * as functionarithmeticxgcd from "./function/arithmetic/xgcd";
import * as functionbitwisebitAnd from "./function/bitwise/bitAnd";
import * as functionbitwisebitNot from "./function/bitwise/bitNot";
import * as functionbitwisebitOr from "./function/bitwise/bitOr";
import * as functionbitwisebitXor from "./function/bitwise/bitXor";
import * as functionbitwiseleftShift from "./function/bitwise/leftShift";
import * as functionbitwiserightArithShift from "./function/bitwise/rightArithShift";
import * as functionbitwiserightLogShift from "./function/bitwise/rightLogShift";
import * as functioncombinatoricsbellNumbers from "./function/combinatorics/bellNumbers";
import * as functioncombinatoricscatalan from "./function/combinatorics/catalan";
import * as functioncombinatoricscomposition from "./function/combinatorics/composition";
import * as functioncombinatoricsstirlingS2 from "./function/combinatorics/stirlingS2";
import * as coreconfig from "./core/config";
import * as coreimport from "./core/import";
import * as coretyped from "./core/typed";
import * as functioncomplexarg from "./function/complex/arg";
import * as functioncomplexconj from "./function/complex/conj";
import * as functioncomplexre from "./function/complex/re";
import * as functioncomplexim from "./function/complex/im";
import * as functionexpressioneval from "./function/expression/eval";
import * as functionexpressionhelp from "./function/expression/help";
import * as functiongeometryintersect from "./function/geometry/intersect";
import * as functionlogicaland from "./function/logical/and";
import * as functionlogicalnot from "./function/logical/not";
import * as functionlogicalor from "./function/logical/or";
import * as functionlogicalxor from "./function/logical/xor";
import * as functionmatrixconcat from "./function/matrix/concat";
import * as functionmatrixcross from "./function/matrix/cross";
import * as functionmatrixdet from "./function/matrix/det";
import * as functionmatrixdiag from "./function/matrix/diag";
import * as functionmatrixdot from "./function/matrix/dot";
import * as functionmatrixeye from "./function/matrix/eye";
import * as functionmatrixfilter from "./function/matrix/filter";
import * as functionmatrixflatten from "./function/matrix/flatten";
import * as functionmatrixforEach from "./function/matrix/forEach";
import * as functionmatrixinv from "./function/matrix/inv";
import * as functionmatrixmap from "./function/matrix/map";
import * as functionmatrixones from "./function/matrix/ones";
import * as functionmatrixpartitionSelect from "./function/matrix/partitionSelect";
import * as functionmatrixrange from "./function/matrix/range";
import * as functionmatrixresize from "./function/matrix/resize";
import * as functionmatrixsize from "./function/matrix/size";
import * as functionmatrixsort from "./function/matrix/sort";
import * as functionmatrixsqueeze from "./function/matrix/squeeze";
import * as functionmatrixsubset from "./function/matrix/subset";
import * as functionmatrixtrace from "./function/matrix/trace";
import * as functionmatrixtranspose from "./function/matrix/transpose";
import * as functionmatrixzeros from "./function/matrix/zeros";
import * as functionprobabilitycombinations from "./function/probability/combinations";
import * as functionprobabilityfactorial from "./function/probability/factorial";
import * as functionprobabilitygamma from "./function/probability/gamma";
import * as functionprobabilitykldivergence from "./function/probability/kldivergence";
import * as functionprobabilitymultinomial from "./function/probability/multinomial";
import * as functionprobabilitypermutations from "./function/probability/permutations";
import * as functionprobabilitypickRandom from "./function/probability/pickRandom";
import * as functionprobabilityrandom from "./function/probability/random";
import * as functionprobabilityrandomInt from "./function/probability/randomInt";
import * as functionrelationalcompare from "./function/relational/compare";
import * as functionrelationaldeepEqual from "./function/relational/deepEqual";
import * as functionrelationalequal from "./function/relational/equal";
import * as functionrelationallarger from "./function/relational/larger";
import * as functionrelationallargerEq from "./function/relational/largerEq";
import * as functionrelationalsmaller from "./function/relational/smaller";
import * as functionrelationalsmallerEq from "./function/relational/smallerEq";
import * as functionrelationalunequal from "./function/relational/unequal";
import * as functionstatisticsmax from "./function/statistics/max";
import * as functionstatisticsmean from "./function/statistics/mean";
import * as functionstatisticsmedian from "./function/statistics/median";
import * as functionstatisticsmin from "./function/statistics/min";
import * as functionstatisticsmode from "./function/statistics/mode";
import * as functionstatisticsprod from "./function/statistics/prod";
import * as functionstatisticsquantileSeq from "./function/statistics/quantileSeq";
import * as functionstatisticsstd from "./function/statistics/std";
import * as functionstatisticssum from "./function/statistics/sum";
import * as functionstatisticsvar from "./function/statistics/var";
import * as functiontrigonometryacos from "./function/trigonometry/acos";
import * as functiontrigonometryacosh from "./function/trigonometry/acosh";
import * as functiontrigonometryacot from "./function/trigonometry/acot";
import * as functiontrigonometryacoth from "./function/trigonometry/acoth";
import * as functiontrigonometryacsc from "./function/trigonometry/acsc";
import * as functiontrigonometryacsch from "./function/trigonometry/acsch";
import * as functiontrigonometryasec from "./function/trigonometry/asec";
import * as functiontrigonometryasech from "./function/trigonometry/asech";
import * as functiontrigonometryasin from "./function/trigonometry/asin";
import * as functiontrigonometryasinh from "./function/trigonometry/asinh";
import * as functiontrigonometryatan from "./function/trigonometry/atan";
import * as functiontrigonometryatanh from "./function/trigonometry/atanh";
import * as functiontrigonometryatan2 from "./function/trigonometry/atan2";
import * as functiontrigonometrycos from "./function/trigonometry/cos";
import * as functiontrigonometrycosh from "./function/trigonometry/cosh";
import * as functiontrigonometrycot from "./function/trigonometry/cot";
import * as functiontrigonometrycoth from "./function/trigonometry/coth";
import * as functiontrigonometrycsc from "./function/trigonometry/csc";
import * as functiontrigonometrycsch from "./function/trigonometry/csch";
import * as functiontrigonometrysec from "./function/trigonometry/sec";
import * as functiontrigonometrysech from "./function/trigonometry/sech";
import * as functiontrigonometrysin from "./function/trigonometry/sin";
import * as functiontrigonometrysinh from "./function/trigonometry/sinh";
import * as functiontrigonometrytan from "./function/trigonometry/tan";
import * as functiontrigonometrytanh from "./function/trigonometry/tanh";
import * as functionunitsto from "./function/units/to";
import * as functionutilsclone from "./function/utils/clone";
import * as functionutilsformat from "./function/utils/format";
import * as functionutilsisNaN from "./function/utils/isNaN";
import * as functionutilsisInteger from "./function/utils/isInteger";
import * as functionutilsisNegative from "./function/utils/isNegative";
import * as functionutilsisNumeric from "./function/utils/isNumeric";
import * as functionutilsisPositive from "./function/utils/isPositive";
import * as functionutilsisPrime from "./function/utils/isPrime";
import * as functionutilsisZero from "./function/utils/isZero";
import * as functionutilstypeof from "./function/utils/typeof";
function factory (construction, config, load, typed) {
  var docs = {};


  // construction functions
  docs.bignumber = constructionbignumber;
  docs['boolean'] = constructionboolean;
  docs.complex = constructioncomplex;
  docs.fraction = constructionfraction;
  docs.index = constructionindex;
  docs.matrix = constructionmatrix;
  docs.number = constructionnumber;
  docs.sparse = constructionsparse;
  docs.string = constructionstring;
  docs.unit = constructionunit;

  // constants
  docs.e = constantse;
  docs.E = constantse;
  docs['false'] = constantsfalse;
  docs.i = constantsi;
  docs['Infinity'] = constantsInfinity;
  docs.LN2 = constantsLN2;
  docs.LN10 = constantsLN10;
  docs.LOG2E = constantsLOG2E;
  docs.LOG10E = constantsLOG10E;
  docs.NaN = constantsNaN;
  docs['null'] = constantsnull;
  docs.pi = constantspi;
  docs.PI = constantspi;
  docs.phi = constantsphi;
  docs.SQRT1_2 = constantsSQRT1_2;
  docs.SQRT2 = constantsSQRT2;
  docs.tau = constantstau;
  docs['true'] = constantstrue;
  docs.version = constantsversion;

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
  docs.lsolve = functionalgebralsolve;
  docs.lup = functionalgebralup;
  docs.lusolve = functionalgebralusolve;
  docs.slu = functionalgebraslu;
  docs.usolve = functionalgebrausolve;

  // functions - arithmetic
  docs.abs = functionarithmeticabs;
  docs.add = functionarithmeticadd;
  docs.cbrt = functionarithmeticcbrt;
  docs.ceil = functionarithmeticceil;
  docs.cube = functionarithmeticcube;
  docs.divide = functionarithmeticdivide;
  docs.dotDivide = functionarithmeticdotDivide;
  docs.dotMultiply = functionarithmeticdotMultiply;
  docs.dotPow = functionarithmeticdotPow;
  docs.exp = functionarithmeticexp;
  docs.fix = functionarithmeticfix;
  docs.floor = functionarithmeticfloor;
  docs.gcd = functionarithmeticgcd;
  docs.hypot = functionarithmetichypot;
  docs.lcm = functionarithmeticlcm;
  docs.log = functionarithmeticlog;
  docs.log10 = functionarithmeticlog10;
  docs.mod = functionarithmeticmod;
  docs.multiply = functionarithmeticmultiply;
  docs.norm = functionarithmeticnorm;
  docs.nthRoot = functionarithmeticnthRoot;
  docs.pow = functionarithmeticpow;
  docs.round = functionarithmeticround;
  docs.sign = functionarithmeticsign;
  docs.sqrt = functionarithmeticsqrt;
  docs.square = functionarithmeticsquare;
  docs.subtract = functionarithmeticsubtract;
  docs.unaryMinus = functionarithmeticunaryMinus;
  docs.unaryPlus = functionarithmeticunaryPlus;
  docs.xgcd = functionarithmeticxgcd;

  // functions - bitwise
  docs.bitAnd = functionbitwisebitAnd;
  docs.bitNot = functionbitwisebitNot;
  docs.bitOr = functionbitwisebitOr;
  docs.bitXor = functionbitwisebitXor;
  docs.leftShift = functionbitwiseleftShift;
  docs.rightArithShift = functionbitwiserightArithShift;
  docs.rightLogShift = functionbitwiserightLogShift;

  // functions - combinatorics
  docs.bellNumbers = functioncombinatoricsbellNumbers;
  docs.catalan = functioncombinatoricscatalan;
  docs.composition = functioncombinatoricscomposition;
  docs.stirlingS2 = functioncombinatoricsstirlingS2;

  // functions - core
  docs['config'] =  coreconfig;
  docs['import'] =  coreimport;
  docs['typed'] =  coretyped;

  // functions - complex
  docs.arg = functioncomplexarg;
  docs.conj = functioncomplexconj;
  docs.re = functioncomplexre;
  docs.im = functioncomplexim;

  // functions - expression
  docs['eval'] =  functionexpressioneval;
  docs.help =  functionexpressionhelp;

  // functions - geometry
  docs.distance = require('./function/geometry/distance');
  docs.intersect = functiongeometryintersect;

  // functions - logical
  docs['and'] = functionlogicaland;
  docs['not'] = functionlogicalnot;
  docs['or'] = functionlogicalor;
  docs['xor'] = functionlogicalxor;

  // functions - matrix
  docs['concat'] = functionmatrixconcat;
  docs.cross = functionmatrixcross;
  docs.det = functionmatrixdet;
  docs.diag = functionmatrixdiag;
  docs.dot = functionmatrixdot;
  docs.eye = functionmatrixeye;
  docs.filter =  functionmatrixfilter;
  docs.flatten = functionmatrixflatten;
  docs.forEach =  functionmatrixforEach;
  docs.inv = functionmatrixinv;
  docs.map =  functionmatrixmap;
  docs.ones = functionmatrixones;
  docs.partitionSelect =  functionmatrixpartitionSelect;
  docs.range = functionmatrixrange;
  docs.resize = functionmatrixresize;
  docs.size = functionmatrixsize;
  docs.sort =  functionmatrixsort;
  docs.squeeze = functionmatrixsqueeze;
  docs.subset = functionmatrixsubset;
  docs.trace = functionmatrixtrace;
  docs.transpose = functionmatrixtranspose;
  docs.zeros = functionmatrixzeros;

  // functions - probability
  docs.combinations = functionprobabilitycombinations;
  //docs.distribution = require('./function/probability/distribution');
  docs.factorial = functionprobabilityfactorial;
  docs.gamma = functionprobabilitygamma;
  docs.kldivergence = functionprobabilitykldivergence;
  docs.multinomial = functionprobabilitymultinomial;
  docs.permutations = functionprobabilitypermutations;
  docs.pickRandom = functionprobabilitypickRandom;
  docs.random = functionprobabilityrandom;
  docs.randomInt = functionprobabilityrandomInt;

  // functions - relational
  docs.compare = functionrelationalcompare;
  docs.deepEqual = functionrelationaldeepEqual;
  docs['equal'] = functionrelationalequal;
  docs.larger = functionrelationallarger;
  docs.largerEq = functionrelationallargerEq;
  docs.smaller = functionrelationalsmaller;
  docs.smallerEq = functionrelationalsmallerEq;
  docs.unequal = functionrelationalunequal;

  // functions - statistics
  docs.max = functionstatisticsmax;
  docs.mean = functionstatisticsmean;
  docs.median = functionstatisticsmedian;
  docs.min = functionstatisticsmin;
  docs.mode = functionstatisticsmode;
  docs.prod = functionstatisticsprod;
  docs.quantileSeq = functionstatisticsquantileSeq;
  docs.std = functionstatisticsstd;
  docs.sum = functionstatisticssum;
  docs['var'] = functionstatisticsvar;

  // functions - trigonometry
  docs.acos = functiontrigonometryacos;
  docs.acosh = functiontrigonometryacosh;
  docs.acot = functiontrigonometryacot;
  docs.acoth = functiontrigonometryacoth;
  docs.acsc = functiontrigonometryacsc;
  docs.acsch = functiontrigonometryacsch;
  docs.asec = functiontrigonometryasec;
  docs.asech = functiontrigonometryasech;
  docs.asin = functiontrigonometryasin;
  docs.asinh = functiontrigonometryasinh;
  docs.atan = functiontrigonometryatan;
  docs.atanh = functiontrigonometryatanh;
  docs.atan2 = functiontrigonometryatan2;
  docs.cos = functiontrigonometrycos;
  docs.cosh = functiontrigonometrycosh;
  docs.cot = functiontrigonometrycot;
  docs.coth = functiontrigonometrycoth;
  docs.csc = functiontrigonometrycsc;
  docs.csch = functiontrigonometrycsch;
  docs.sec = functiontrigonometrysec;
  docs.sech = functiontrigonometrysech;
  docs.sin = functiontrigonometrysin;
  docs.sinh = functiontrigonometrysinh;
  docs.tan = functiontrigonometrytan;
  docs.tanh = functiontrigonometrytanh;

  // functions - units
  docs.to = functionunitsto;

  // functions - utils
  docs.clone = functionutilsclone;
  docs.format = functionutilsformat;
  docs.isNaN = functionutilsisNaN;
  docs.isInteger = functionutilsisInteger;
  docs.isNegative = functionutilsisNegative;
  docs.isNumeric = functionutilsisNumeric;
  docs.isPositive = functionutilsisPositive;
  docs.isPrime = functionutilsisPrime;
  docs.isZero = functionutilsisZero;
  // docs.print = require('./function/utils/print'); // TODO: add documentation for print as soon as the parser supports objects.
  docs['typeof'] =  functionutilstypeof;

  return docs;
}

var name_exportedObj = 'docs';
var path_exportedObj = 'expression';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
