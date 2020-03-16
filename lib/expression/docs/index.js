"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _bignumber = require("./construction/bignumber");

var constructionbignumber_obj = _interopRequireWildcard(_bignumber);

var _boolean = require("./construction/boolean");

var constructionboolean_obj = _interopRequireWildcard(_boolean);

var _complex = require("./construction/complex");

var constructioncomplex_obj = _interopRequireWildcard(_complex);

var _fraction = require("./construction/fraction");

var constructionfraction_obj = _interopRequireWildcard(_fraction);

var _index = require("./construction/index");

var constructionindex_obj = _interopRequireWildcard(_index);

var _matrix = require("./construction/matrix");

var constructionmatrix_obj = _interopRequireWildcard(_matrix);

var _number = require("./construction/number");

var constructionnumber_obj = _interopRequireWildcard(_number);

var _sparse = require("./construction/sparse");

var constructionsparse_obj = _interopRequireWildcard(_sparse);

var _string = require("./construction/string");

var constructionstring_obj = _interopRequireWildcard(_string);

var _unit = require("./construction/unit");

var constructionunit_obj = _interopRequireWildcard(_unit);

var _e = require("./constants/e");

var constantse_obj = _interopRequireWildcard(_e);

var _false = require("./constants/false");

var constantsfalse_obj = _interopRequireWildcard(_false);

var _i = require("./constants/i");

var constantsi_obj = _interopRequireWildcard(_i);

var _Infinity = require("./constants/Infinity");

var constantsInfinity_obj = _interopRequireWildcard(_Infinity);

var _LN = require("./constants/LN2");

var constantsLN2_obj = _interopRequireWildcard(_LN);

var _LN2 = require("./constants/LN10");

var constantsLN10_obj = _interopRequireWildcard(_LN2);

var _LOG2E = require("./constants/LOG2E");

var constantsLOG2E_obj = _interopRequireWildcard(_LOG2E);

var _LOG10E = require("./constants/LOG10E");

var constantsLOG10E_obj = _interopRequireWildcard(_LOG10E);

var _NaN = require("./constants/NaN");

var constantsNaN_obj = _interopRequireWildcard(_NaN);

var _null = require("./constants/null");

var constantsnull_obj = _interopRequireWildcard(_null);

var _pi = require("./constants/pi");

var constantspi_obj = _interopRequireWildcard(_pi);

var _phi = require("./constants/phi");

var constantsphi_obj = _interopRequireWildcard(_phi);

var _SQRT1_ = require("./constants/SQRT1_2");

var constantsSQRT1_2_obj = _interopRequireWildcard(_SQRT1_);

var _SQRT = require("./constants/SQRT2");

var constantsSQRT2_obj = _interopRequireWildcard(_SQRT);

var _tau = require("./constants/tau");

var constantstau_obj = _interopRequireWildcard(_tau);

var _true = require("./constants/true");

var constantstrue_obj = _interopRequireWildcard(_true);

var _version = require("./constants/version");

var constantsversion_obj = _interopRequireWildcard(_version);

var _lsolve = require("./function/algebra/lsolve");

var functionalgebralsolve_obj = _interopRequireWildcard(_lsolve);

var _lup = require("./function/algebra/lup");

var functionalgebralup_obj = _interopRequireWildcard(_lup);

var _lusolve = require("./function/algebra/lusolve");

var functionalgebralusolve_obj = _interopRequireWildcard(_lusolve);

var _slu = require("./function/algebra/slu");

var functionalgebraslu_obj = _interopRequireWildcard(_slu);

var _usolve = require("./function/algebra/usolve");

var functionalgebrausolve_obj = _interopRequireWildcard(_usolve);

var _abs = require("./function/arithmetic/abs");

var functionarithmeticabs_obj = _interopRequireWildcard(_abs);

var _add = require("./function/arithmetic/add");

var functionarithmeticadd_obj = _interopRequireWildcard(_add);

var _cbrt = require("./function/arithmetic/cbrt");

var functionarithmeticcbrt_obj = _interopRequireWildcard(_cbrt);

var _ceil = require("./function/arithmetic/ceil");

var functionarithmeticceil_obj = _interopRequireWildcard(_ceil);

var _cube = require("./function/arithmetic/cube");

var functionarithmeticcube_obj = _interopRequireWildcard(_cube);

var _divide = require("./function/arithmetic/divide");

var functionarithmeticdivide_obj = _interopRequireWildcard(_divide);

var _dotDivide = require("./function/arithmetic/dotDivide");

var functionarithmeticdotDivide_obj = _interopRequireWildcard(_dotDivide);

var _dotMultiply = require("./function/arithmetic/dotMultiply");

var functionarithmeticdotMultiply_obj = _interopRequireWildcard(_dotMultiply);

var _dotPow = require("./function/arithmetic/dotPow");

var functionarithmeticdotPow_obj = _interopRequireWildcard(_dotPow);

var _exp = require("./function/arithmetic/exp");

var functionarithmeticexp_obj = _interopRequireWildcard(_exp);

var _fix = require("./function/arithmetic/fix");

var functionarithmeticfix_obj = _interopRequireWildcard(_fix);

var _floor = require("./function/arithmetic/floor");

var functionarithmeticfloor_obj = _interopRequireWildcard(_floor);

var _gcd = require("./function/arithmetic/gcd");

var functionarithmeticgcd_obj = _interopRequireWildcard(_gcd);

var _hypot = require("./function/arithmetic/hypot");

var functionarithmetichypot_obj = _interopRequireWildcard(_hypot);

var _lcm = require("./function/arithmetic/lcm");

var functionarithmeticlcm_obj = _interopRequireWildcard(_lcm);

var _log = require("./function/arithmetic/log");

var functionarithmeticlog_obj = _interopRequireWildcard(_log);

var _log2 = require("./function/arithmetic/log10");

var functionarithmeticlog10_obj = _interopRequireWildcard(_log2);

var _mod = require("./function/arithmetic/mod");

var functionarithmeticmod_obj = _interopRequireWildcard(_mod);

var _multiply = require("./function/arithmetic/multiply");

var functionarithmeticmultiply_obj = _interopRequireWildcard(_multiply);

var _norm = require("./function/arithmetic/norm");

var functionarithmeticnorm_obj = _interopRequireWildcard(_norm);

var _nthRoot = require("./function/arithmetic/nthRoot");

var functionarithmeticnthRoot_obj = _interopRequireWildcard(_nthRoot);

var _pow = require("./function/arithmetic/pow");

var functionarithmeticpow_obj = _interopRequireWildcard(_pow);

var _round = require("./function/arithmetic/round");

var functionarithmeticround_obj = _interopRequireWildcard(_round);

var _sign = require("./function/arithmetic/sign");

var functionarithmeticsign_obj = _interopRequireWildcard(_sign);

var _sqrt = require("./function/arithmetic/sqrt");

var functionarithmeticsqrt_obj = _interopRequireWildcard(_sqrt);

var _square = require("./function/arithmetic/square");

var functionarithmeticsquare_obj = _interopRequireWildcard(_square);

var _subtract = require("./function/arithmetic/subtract");

var functionarithmeticsubtract_obj = _interopRequireWildcard(_subtract);

var _unaryMinus = require("./function/arithmetic/unaryMinus");

var functionarithmeticunaryMinus_obj = _interopRequireWildcard(_unaryMinus);

var _unaryPlus = require("./function/arithmetic/unaryPlus");

var functionarithmeticunaryPlus_obj = _interopRequireWildcard(_unaryPlus);

var _xgcd = require("./function/arithmetic/xgcd");

var functionarithmeticxgcd_obj = _interopRequireWildcard(_xgcd);

var _bitAnd = require("./function/bitwise/bitAnd");

var functionbitwisebitAnd_obj = _interopRequireWildcard(_bitAnd);

var _bitNot = require("./function/bitwise/bitNot");

var functionbitwisebitNot_obj = _interopRequireWildcard(_bitNot);

var _bitOr = require("./function/bitwise/bitOr");

var functionbitwisebitOr_obj = _interopRequireWildcard(_bitOr);

var _bitXor = require("./function/bitwise/bitXor");

var functionbitwisebitXor_obj = _interopRequireWildcard(_bitXor);

var _leftShift = require("./function/bitwise/leftShift");

var functionbitwiseleftShift_obj = _interopRequireWildcard(_leftShift);

var _rightArithShift = require("./function/bitwise/rightArithShift");

var functionbitwiserightArithShift_obj = _interopRequireWildcard(_rightArithShift);

var _rightLogShift = require("./function/bitwise/rightLogShift");

var functionbitwiserightLogShift_obj = _interopRequireWildcard(_rightLogShift);

var _bellNumbers = require("./function/combinatorics/bellNumbers");

var functioncombinatoricsbellNumbers_obj = _interopRequireWildcard(_bellNumbers);

var _catalan = require("./function/combinatorics/catalan");

var functioncombinatoricscatalan_obj = _interopRequireWildcard(_catalan);

var _composition = require("./function/combinatorics/composition");

var functioncombinatoricscomposition_obj = _interopRequireWildcard(_composition);

var _stirlingS = require("./function/combinatorics/stirlingS2");

var functioncombinatoricsstirlingS2_obj = _interopRequireWildcard(_stirlingS);

var _config = require("./core/config");

var coreconfig_obj = _interopRequireWildcard(_config);

var _import = require("./core/import");

var coreimport_obj = _interopRequireWildcard(_import);

var _typed = require("./core/typed");

var coretyped_obj = _interopRequireWildcard(_typed);

var _arg = require("./function/complex/arg");

var functioncomplexarg_obj = _interopRequireWildcard(_arg);

var _conj = require("./function/complex/conj");

var functioncomplexconj_obj = _interopRequireWildcard(_conj);

var _re = require("./function/complex/re");

var functioncomplexre_obj = _interopRequireWildcard(_re);

var _im = require("./function/complex/im");

var functioncomplexim_obj = _interopRequireWildcard(_im);

var _eval = require("./function/expression/eval");

var functionexpressioneval_obj = _interopRequireWildcard(_eval);

var _help = require("./function/expression/help");

var functionexpressionhelp_obj = _interopRequireWildcard(_help);

var _intersect = require("./function/geometry/intersect");

var functiongeometryintersect_obj = _interopRequireWildcard(_intersect);

var _and = require("./function/logical/and");

var functionlogicaland_obj = _interopRequireWildcard(_and);

var _not = require("./function/logical/not");

var functionlogicalnot_obj = _interopRequireWildcard(_not);

var _or = require("./function/logical/or");

var functionlogicalor_obj = _interopRequireWildcard(_or);

var _xor = require("./function/logical/xor");

var functionlogicalxor_obj = _interopRequireWildcard(_xor);

var _concat = require("./function/matrix/concat");

var functionmatrixconcat_obj = _interopRequireWildcard(_concat);

var _cross = require("./function/matrix/cross");

var functionmatrixcross_obj = _interopRequireWildcard(_cross);

var _det = require("./function/matrix/det");

var functionmatrixdet_obj = _interopRequireWildcard(_det);

var _diag = require("./function/matrix/diag");

var functionmatrixdiag_obj = _interopRequireWildcard(_diag);

var _dot = require("./function/matrix/dot");

var functionmatrixdot_obj = _interopRequireWildcard(_dot);

var _eye = require("./function/matrix/eye");

var functionmatrixeye_obj = _interopRequireWildcard(_eye);

var _filter = require("./function/matrix/filter");

var functionmatrixfilter_obj = _interopRequireWildcard(_filter);

var _flatten = require("./function/matrix/flatten");

var functionmatrixflatten_obj = _interopRequireWildcard(_flatten);

var _forEach = require("./function/matrix/forEach");

var functionmatrixforEach_obj = _interopRequireWildcard(_forEach);

var _inv = require("./function/matrix/inv");

var functionmatrixinv_obj = _interopRequireWildcard(_inv);

var _map = require("./function/matrix/map");

var functionmatrixmap_obj = _interopRequireWildcard(_map);

var _ones = require("./function/matrix/ones");

var functionmatrixones_obj = _interopRequireWildcard(_ones);

var _partitionSelect = require("./function/matrix/partitionSelect");

var functionmatrixpartitionSelect_obj = _interopRequireWildcard(_partitionSelect);

var _range = require("./function/matrix/range");

var functionmatrixrange_obj = _interopRequireWildcard(_range);

var _resize = require("./function/matrix/resize");

var functionmatrixresize_obj = _interopRequireWildcard(_resize);

var _size = require("./function/matrix/size");

var functionmatrixsize_obj = _interopRequireWildcard(_size);

var _sort = require("./function/matrix/sort");

var functionmatrixsort_obj = _interopRequireWildcard(_sort);

var _squeeze = require("./function/matrix/squeeze");

var functionmatrixsqueeze_obj = _interopRequireWildcard(_squeeze);

var _subset = require("./function/matrix/subset");

var functionmatrixsubset_obj = _interopRequireWildcard(_subset);

var _trace = require("./function/matrix/trace");

var functionmatrixtrace_obj = _interopRequireWildcard(_trace);

var _transpose = require("./function/matrix/transpose");

var functionmatrixtranspose_obj = _interopRequireWildcard(_transpose);

var _zeros = require("./function/matrix/zeros");

var functionmatrixzeros_obj = _interopRequireWildcard(_zeros);

var _combinations = require("./function/probability/combinations");

var functionprobabilitycombinations_obj = _interopRequireWildcard(_combinations);

var _factorial = require("./function/probability/factorial");

var functionprobabilityfactorial_obj = _interopRequireWildcard(_factorial);

var _gamma = require("./function/probability/gamma");

var functionprobabilitygamma_obj = _interopRequireWildcard(_gamma);

var _kldivergence = require("./function/probability/kldivergence");

var functionprobabilitykldivergence_obj = _interopRequireWildcard(_kldivergence);

var _multinomial = require("./function/probability/multinomial");

var functionprobabilitymultinomial_obj = _interopRequireWildcard(_multinomial);

var _permutations = require("./function/probability/permutations");

var functionprobabilitypermutations_obj = _interopRequireWildcard(_permutations);

var _pickRandom = require("./function/probability/pickRandom");

var functionprobabilitypickRandom_obj = _interopRequireWildcard(_pickRandom);

var _random = require("./function/probability/random");

var functionprobabilityrandom_obj = _interopRequireWildcard(_random);

var _randomInt = require("./function/probability/randomInt");

var functionprobabilityrandomInt_obj = _interopRequireWildcard(_randomInt);

var _compare = require("./function/relational/compare");

var functionrelationalcompare_obj = _interopRequireWildcard(_compare);

var _deepEqual = require("./function/relational/deepEqual");

var functionrelationaldeepEqual_obj = _interopRequireWildcard(_deepEqual);

var _equal = require("./function/relational/equal");

var functionrelationalequal_obj = _interopRequireWildcard(_equal);

var _larger = require("./function/relational/larger");

var functionrelationallarger_obj = _interopRequireWildcard(_larger);

var _largerEq = require("./function/relational/largerEq");

var functionrelationallargerEq_obj = _interopRequireWildcard(_largerEq);

var _smaller = require("./function/relational/smaller");

var functionrelationalsmaller_obj = _interopRequireWildcard(_smaller);

var _smallerEq = require("./function/relational/smallerEq");

var functionrelationalsmallerEq_obj = _interopRequireWildcard(_smallerEq);

var _unequal = require("./function/relational/unequal");

var functionrelationalunequal_obj = _interopRequireWildcard(_unequal);

var _max = require("./function/statistics/max");

var functionstatisticsmax_obj = _interopRequireWildcard(_max);

var _mean = require("./function/statistics/mean");

var functionstatisticsmean_obj = _interopRequireWildcard(_mean);

var _median = require("./function/statistics/median");

var functionstatisticsmedian_obj = _interopRequireWildcard(_median);

var _min = require("./function/statistics/min");

var functionstatisticsmin_obj = _interopRequireWildcard(_min);

var _mode = require("./function/statistics/mode");

var functionstatisticsmode_obj = _interopRequireWildcard(_mode);

var _prod = require("./function/statistics/prod");

var functionstatisticsprod_obj = _interopRequireWildcard(_prod);

var _quantileSeq = require("./function/statistics/quantileSeq");

var functionstatisticsquantileSeq_obj = _interopRequireWildcard(_quantileSeq);

var _std = require("./function/statistics/std");

var functionstatisticsstd_obj = _interopRequireWildcard(_std);

var _sum = require("./function/statistics/sum");

var functionstatisticssum_obj = _interopRequireWildcard(_sum);

var _var = require("./function/statistics/var");

var functionstatisticsvar_obj = _interopRequireWildcard(_var);

var _acos = require("./function/trigonometry/acos");

var functiontrigonometryacos_obj = _interopRequireWildcard(_acos);

var _acosh = require("./function/trigonometry/acosh");

var functiontrigonometryacosh_obj = _interopRequireWildcard(_acosh);

var _acot = require("./function/trigonometry/acot");

var functiontrigonometryacot_obj = _interopRequireWildcard(_acot);

var _acoth = require("./function/trigonometry/acoth");

var functiontrigonometryacoth_obj = _interopRequireWildcard(_acoth);

var _acsc = require("./function/trigonometry/acsc");

var functiontrigonometryacsc_obj = _interopRequireWildcard(_acsc);

var _acsch = require("./function/trigonometry/acsch");

var functiontrigonometryacsch_obj = _interopRequireWildcard(_acsch);

var _asec = require("./function/trigonometry/asec");

var functiontrigonometryasec_obj = _interopRequireWildcard(_asec);

var _asech = require("./function/trigonometry/asech");

var functiontrigonometryasech_obj = _interopRequireWildcard(_asech);

var _asin = require("./function/trigonometry/asin");

var functiontrigonometryasin_obj = _interopRequireWildcard(_asin);

var _asinh = require("./function/trigonometry/asinh");

var functiontrigonometryasinh_obj = _interopRequireWildcard(_asinh);

var _atan = require("./function/trigonometry/atan");

var functiontrigonometryatan_obj = _interopRequireWildcard(_atan);

var _atanh = require("./function/trigonometry/atanh");

var functiontrigonometryatanh_obj = _interopRequireWildcard(_atanh);

var _atan2 = require("./function/trigonometry/atan2");

var functiontrigonometryatan2_obj = _interopRequireWildcard(_atan2);

var _cos = require("./function/trigonometry/cos");

var functiontrigonometrycos_obj = _interopRequireWildcard(_cos);

var _cosh = require("./function/trigonometry/cosh");

var functiontrigonometrycosh_obj = _interopRequireWildcard(_cosh);

var _cot = require("./function/trigonometry/cot");

var functiontrigonometrycot_obj = _interopRequireWildcard(_cot);

var _coth = require("./function/trigonometry/coth");

var functiontrigonometrycoth_obj = _interopRequireWildcard(_coth);

var _csc = require("./function/trigonometry/csc");

var functiontrigonometrycsc_obj = _interopRequireWildcard(_csc);

var _csch = require("./function/trigonometry/csch");

var functiontrigonometrycsch_obj = _interopRequireWildcard(_csch);

var _sec = require("./function/trigonometry/sec");

var functiontrigonometrysec_obj = _interopRequireWildcard(_sec);

var _sech = require("./function/trigonometry/sech");

var functiontrigonometrysech_obj = _interopRequireWildcard(_sech);

var _sin = require("./function/trigonometry/sin");

var functiontrigonometrysin_obj = _interopRequireWildcard(_sin);

var _sinh = require("./function/trigonometry/sinh");

var functiontrigonometrysinh_obj = _interopRequireWildcard(_sinh);

var _tan = require("./function/trigonometry/tan");

var functiontrigonometrytan_obj = _interopRequireWildcard(_tan);

var _tanh = require("./function/trigonometry/tanh");

var functiontrigonometrytanh_obj = _interopRequireWildcard(_tanh);

var _to = require("./function/units/to");

var functionunitsto_obj = _interopRequireWildcard(_to);

var _clone = require("./function/utils/clone");

var functionutilsclone_obj = _interopRequireWildcard(_clone);

var _format = require("./function/utils/format");

var functionutilsformat_obj = _interopRequireWildcard(_format);

var _isNaN = require("./function/utils/isNaN");

var functionutilsisNaN_obj = _interopRequireWildcard(_isNaN);

var _isInteger = require("./function/utils/isInteger");

var functionutilsisInteger_obj = _interopRequireWildcard(_isInteger);

var _isNegative = require("./function/utils/isNegative");

var functionutilsisNegative_obj = _interopRequireWildcard(_isNegative);

var _isNumeric = require("./function/utils/isNumeric");

var functionutilsisNumeric_obj = _interopRequireWildcard(_isNumeric);

var _isPositive = require("./function/utils/isPositive");

var functionutilsisPositive_obj = _interopRequireWildcard(_isPositive);

var _isPrime = require("./function/utils/isPrime");

var functionutilsisPrime_obj = _interopRequireWildcard(_isPrime);

var _isZero = require("./function/utils/isZero");

var functionutilsisZero_obj = _interopRequireWildcard(_isZero);

var _typeof = require("./function/utils/typeof");

var functionutilstypeof_obj = _interopRequireWildcard(_typeof);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function factory(construction, config, load, typed) {
  var docs = {};

  // construction functions
  docs.bignumber = constructionbignumber_obj;
  docs['boolean'] = constructionboolean_obj;
  docs.complex = constructioncomplex_obj;
  docs.fraction = constructionfraction_obj;
  docs.index = constructionindex_obj;
  docs.matrix = constructionmatrix_obj;
  docs.number = constructionnumber_obj;
  docs.sparse = constructionsparse_obj;
  docs.string = constructionstring_obj;
  docs.unit = constructionunit_obj;

  // constants
  docs.e = constantse_obj;
  docs.E = constantse_obj;
  docs['false'] = constantsfalse_obj;
  docs.i = constantsi_obj;
  docs['Infinity'] = constantsInfinity_obj;
  docs.LN2 = constantsLN2_obj;
  docs.LN10 = constantsLN10_obj;
  docs.LOG2E = constantsLOG2E_obj;
  docs.LOG10E = constantsLOG10E_obj;
  docs.NaN = constantsNaN_obj;
  docs['null'] = constantsnull_obj;
  docs.pi = constantspi_obj;
  docs.PI = constantspi_obj;
  docs.phi = constantsphi_obj;
  docs.SQRT1_2 = constantsSQRT1_2_obj;
  docs.SQRT2 = constantsSQRT2_obj;
  docs.tau = constantstau_obj;
  docs['true'] = constantstrue_obj;
  docs.version = constantsversion_obj;

  // physical constants
  // TODO: more detailed docs for physical constants
  docs.speedOfLight = { description: 'Speed of light in vacuum', examples: ['speedOfLight'] };
  docs.gravitationConstant = { description: 'Newtonian constant of gravitation', examples: ['gravitationConstant'] };
  docs.planckConstant = { description: 'Planck constant', examples: ['planckConstant'] };
  docs.reducedPlanckConstant = { description: 'Reduced Planck constant', examples: ['reducedPlanckConstant'] };

  docs.magneticConstant = { description: 'Magnetic constant (vacuum permeability)', examples: ['magneticConstant'] };
  docs.electricConstant = { description: 'Electric constant (vacuum permeability)', examples: ['electricConstant'] };
  docs.vacuumImpedance = { description: 'Characteristic impedance of vacuum', examples: ['vacuumImpedance'] };
  docs.coulomb = { description: 'Coulomb\'s constant', examples: ['coulomb'] };
  docs.elementaryCharge = { description: 'Elementary charge', examples: ['elementaryCharge'] };
  docs.bohrMagneton = { description: 'Borh magneton', examples: ['bohrMagneton'] };
  docs.conductanceQuantum = { description: 'Conductance quantum', examples: ['conductanceQuantum'] };
  docs.inverseConductanceQuantum = { description: 'Inverse conductance quantum', examples: ['inverseConductanceQuantum'] };
  //docs.josephson = {description: 'Josephson constant', examples: ['josephson']};
  docs.magneticFluxQuantum = { description: 'Magnetic flux quantum', examples: ['magneticFluxQuantum'] };
  docs.nuclearMagneton = { description: 'Nuclear magneton', examples: ['nuclearMagneton'] };
  docs.klitzing = { description: 'Von Klitzing constant', examples: ['klitzing'] };

  docs.bohrRadius = { description: 'Borh radius', examples: ['bohrRadius'] };
  docs.classicalElectronRadius = { description: 'Classical electron radius', examples: ['classicalElectronRadius'] };
  docs.electronMass = { description: 'Electron mass', examples: ['electronMass'] };
  docs.fermiCoupling = { description: 'Fermi coupling constant', examples: ['fermiCoupling'] };
  docs.fineStructure = { description: 'Fine-structure constant', examples: ['fineStructure'] };
  docs.hartreeEnergy = { description: 'Hartree energy', examples: ['hartreeEnergy'] };
  docs.protonMass = { description: 'Proton mass', examples: ['protonMass'] };
  docs.deuteronMass = { description: 'Deuteron Mass', examples: ['deuteronMass'] };
  docs.neutronMass = { description: 'Neutron mass', examples: ['neutronMass'] };
  docs.quantumOfCirculation = { description: 'Quantum of circulation', examples: ['quantumOfCirculation'] };
  docs.rydberg = { description: 'Rydberg constant', examples: ['rydberg'] };
  docs.thomsonCrossSection = { description: 'Thomson cross section', examples: ['thomsonCrossSection'] };
  docs.weakMixingAngle = { description: 'Weak mixing angle', examples: ['weakMixingAngle'] };
  docs.efimovFactor = { description: 'Efimov factor', examples: ['efimovFactor'] };

  docs.atomicMass = { description: 'Atomic mass constant', examples: ['atomicMass'] };
  docs.avogadro = { description: 'Avogadro\'s number', examples: ['avogadro'] };
  docs.boltzmann = { description: 'Boltzmann constant', examples: ['boltzmann'] };
  docs.faraday = { description: 'Faraday constant', examples: ['faraday'] };
  docs.firstRadiation = { description: 'First radiation constant', examples: ['firstRadiation'] };
  docs.loschmidt = { description: 'Loschmidt constant at T=273.15 K and p=101.325 kPa', examples: ['loschmidt'] };
  docs.gasConstant = { description: 'Gas constant', examples: ['gasConstant'] };
  docs.molarPlanckConstant = { description: 'Molar Planck constant', examples: ['molarPlanckConstant'] };
  docs.molarVolume = { description: 'Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa', examples: ['molarVolume'] };
  docs.sackurTetrode = { description: 'Sackur-Tetrode constant at T=1 K and p=101.325 kPa', examples: ['sackurTetrode'] };
  docs.secondRadiation = { description: 'Second radiation constant', examples: ['secondRadiation'] };
  docs.stefanBoltzmann = { description: 'Stefan-Boltzmann constant', examples: ['stefanBoltzmann'] };
  docs.wienDisplacement = { description: 'Wien displacement law constant', examples: ['wienDisplacement'] };
  //docs.spectralRadiance = {description: 'First radiation constant for spectral radiance', examples: ['spectralRadiance']};

  docs.molarMass = { description: 'Molar mass constant', examples: ['molarMass'] };
  docs.molarMassC12 = { description: 'Molar mass constant of carbon-12', examples: ['molarMassC12'] };
  docs.gravity = { description: 'Standard acceleration of gravity (standard acceleration of free-fall on Earth)', examples: ['gravity'] };

  docs.planckLength = { description: 'Planck length', examples: ['planckLength'] };
  docs.planckMass = { description: 'Planck mass', examples: ['planckMass'] };
  docs.planckTime = { description: 'Planck time', examples: ['planckTime'] };
  docs.planckCharge = { description: 'Planck charge', examples: ['planckCharge'] };
  docs.planckTemperature = { description: 'Planck temperature', examples: ['planckTemperature'] };

  // functions - algebra
  docs.lsolve = functionalgebralsolve_obj;
  docs.lup = functionalgebralup_obj;
  docs.lusolve = functionalgebralusolve_obj;
  docs.slu = functionalgebraslu_obj;
  docs.usolve = functionalgebrausolve_obj;

  // functions - arithmetic
  docs.abs = functionarithmeticabs_obj;
  docs.add = functionarithmeticadd_obj;
  docs.cbrt = functionarithmeticcbrt_obj;
  docs.ceil = functionarithmeticceil_obj;
  docs.cube = functionarithmeticcube_obj;
  docs.divide = functionarithmeticdivide_obj;
  docs.dotDivide = functionarithmeticdotDivide_obj;
  docs.dotMultiply = functionarithmeticdotMultiply_obj;
  docs.dotPow = functionarithmeticdotPow_obj;
  docs.exp = functionarithmeticexp_obj;
  docs.fix = functionarithmeticfix_obj;
  docs.floor = functionarithmeticfloor_obj;
  docs.gcd = functionarithmeticgcd_obj;
  docs.hypot = functionarithmetichypot_obj;
  docs.lcm = functionarithmeticlcm_obj;
  docs.log = functionarithmeticlog_obj;
  docs.log10 = functionarithmeticlog10_obj;
  docs.mod = functionarithmeticmod_obj;
  docs.multiply = functionarithmeticmultiply_obj;
  docs.norm = functionarithmeticnorm_obj;
  docs.nthRoot = functionarithmeticnthRoot_obj;
  docs.pow = functionarithmeticpow_obj;
  docs.round = functionarithmeticround_obj;
  docs.sign = functionarithmeticsign_obj;
  docs.sqrt = functionarithmeticsqrt_obj;
  docs.square = functionarithmeticsquare_obj;
  docs.subtract = functionarithmeticsubtract_obj;
  docs.unaryMinus = functionarithmeticunaryMinus_obj;
  docs.unaryPlus = functionarithmeticunaryPlus_obj;
  docs.xgcd = functionarithmeticxgcd_obj;

  // functions - bitwise
  docs.bitAnd = functionbitwisebitAnd_obj;
  docs.bitNot = functionbitwisebitNot_obj;
  docs.bitOr = functionbitwisebitOr_obj;
  docs.bitXor = functionbitwisebitXor_obj;
  docs.leftShift = functionbitwiseleftShift_obj;
  docs.rightArithShift = functionbitwiserightArithShift_obj;
  docs.rightLogShift = functionbitwiserightLogShift_obj;

  // functions - combinatorics
  docs.bellNumbers = functioncombinatoricsbellNumbers_obj;
  docs.catalan = functioncombinatoricscatalan_obj;
  docs.composition = functioncombinatoricscomposition_obj;
  docs.stirlingS2 = functioncombinatoricsstirlingS2_obj;

  // functions - core
  docs['config'] = coreconfig_obj;
  docs['import'] = coreimport_obj;
  docs['typed'] = coretyped_obj;

  // functions - complex
  docs.arg = functioncomplexarg_obj;
  docs.conj = functioncomplexconj_obj;
  docs.re = functioncomplexre_obj;
  docs.im = functioncomplexim_obj;

  // functions - expression
  docs['eval'] = functionexpressioneval_obj;
  docs.help = functionexpressionhelp_obj;

  // functions - geometry
  docs.distance = {};
  docs.intersect = functiongeometryintersect_obj;

  // functions - logical
  docs['and'] = functionlogicaland_obj;
  docs['not'] = functionlogicalnot_obj;
  docs['or'] = functionlogicalor_obj;
  docs['xor'] = functionlogicalxor_obj;

  // functions - matrix
  docs['concat'] = functionmatrixconcat_obj;
  docs.cross = functionmatrixcross_obj;
  docs.det = functionmatrixdet_obj;
  docs.diag = functionmatrixdiag_obj;
  docs.dot = functionmatrixdot_obj;
  docs.eye = functionmatrixeye_obj;
  docs.filter = functionmatrixfilter_obj;
  docs.flatten = functionmatrixflatten_obj;
  docs.forEach = functionmatrixforEach_obj;
  docs.inv = functionmatrixinv_obj;
  docs.map = functionmatrixmap_obj;
  docs.ones = functionmatrixones_obj;
  docs.partitionSelect = functionmatrixpartitionSelect_obj;
  docs.range = functionmatrixrange_obj;
  docs.resize = functionmatrixresize_obj;
  docs.size = functionmatrixsize_obj;
  docs.sort = functionmatrixsort_obj;
  docs.squeeze = functionmatrixsqueeze_obj;
  docs.subset = functionmatrixsubset_obj;
  docs.trace = functionmatrixtrace_obj;
  docs.transpose = functionmatrixtranspose_obj;
  docs.zeros = functionmatrixzeros_obj;

  // functions - probability
  docs.combinations = functionprobabilitycombinations_obj;
  //docs.distribution = require('./function/probability/distribution');
  docs.factorial = functionprobabilityfactorial_obj;
  docs.gamma = functionprobabilitygamma_obj;
  docs.kldivergence = functionprobabilitykldivergence_obj;
  docs.multinomial = functionprobabilitymultinomial_obj;
  docs.permutations = functionprobabilitypermutations_obj;
  docs.pickRandom = functionprobabilitypickRandom_obj;
  docs.random = functionprobabilityrandom_obj;
  docs.randomInt = functionprobabilityrandomInt_obj;

  // functions - relational
  docs.compare = functionrelationalcompare_obj;
  docs.deepEqual = functionrelationaldeepEqual_obj;
  docs['equal'] = functionrelationalequal_obj;
  docs.larger = functionrelationallarger_obj;
  docs.largerEq = functionrelationallargerEq_obj;
  docs.smaller = functionrelationalsmaller_obj;
  docs.smallerEq = functionrelationalsmallerEq_obj;
  docs.unequal = functionrelationalunequal_obj;

  // functions - statistics
  docs.max = functionstatisticsmax_obj;
  docs.mean = functionstatisticsmean_obj;
  docs.median = functionstatisticsmedian_obj;
  docs.min = functionstatisticsmin_obj;
  docs.mode = functionstatisticsmode_obj;
  docs.prod = functionstatisticsprod_obj;
  docs.quantileSeq = functionstatisticsquantileSeq_obj;
  docs.std = functionstatisticsstd_obj;
  docs.sum = functionstatisticssum_obj;
  docs['var'] = functionstatisticsvar_obj;

  // functions - trigonometry
  docs.acos = functiontrigonometryacos_obj;
  docs.acosh = functiontrigonometryacosh_obj;
  docs.acot = functiontrigonometryacot_obj;
  docs.acoth = functiontrigonometryacoth_obj;
  docs.acsc = functiontrigonometryacsc_obj;
  docs.acsch = functiontrigonometryacsch_obj;
  docs.asec = functiontrigonometryasec_obj;
  docs.asech = functiontrigonometryasech_obj;
  docs.asin = functiontrigonometryasin_obj;
  docs.asinh = functiontrigonometryasinh_obj;
  docs.atan = functiontrigonometryatan_obj;
  docs.atanh = functiontrigonometryatanh_obj;
  docs.atan2 = functiontrigonometryatan2_obj;
  docs.cos = functiontrigonometrycos_obj;
  docs.cosh = functiontrigonometrycosh_obj;
  docs.cot = functiontrigonometrycot_obj;
  docs.coth = functiontrigonometrycoth_obj;
  docs.csc = functiontrigonometrycsc_obj;
  docs.csch = functiontrigonometrycsch_obj;
  docs.sec = functiontrigonometrysec_obj;
  docs.sech = functiontrigonometrysech_obj;
  docs.sin = functiontrigonometrysin_obj;
  docs.sinh = functiontrigonometrysinh_obj;
  docs.tan = functiontrigonometrytan_obj;
  docs.tanh = functiontrigonometrytanh_obj;

  // functions - units
  docs.to = functionunitsto_obj;

  // functions - utils
  docs.clone = functionutilsclone_obj;
  docs.format = functionutilsformat_obj;
  docs.isNaN = functionutilsisNaN_obj;
  docs.isInteger = functionutilsisInteger_obj;
  docs.isNegative = functionutilsisNegative_obj;
  docs.isNumeric = functionutilsisNumeric_obj;
  docs.isPositive = functionutilsisPositive_obj;
  docs.isPrime = functionutilsisPrime_obj;
  docs.isZero = functionutilsisZero_obj;
  // docs.print = require('./function/utils/print'); // TODO: add documentation for print as soon as the parser supports objects.
  docs['typeof'] = functionutilstypeof_obj;

  return docs;
}

var name_name = 'docs';
var path_path = 'expression';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
