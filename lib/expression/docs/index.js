function factory (construction, config, load, typed) {
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
  docs['config'] =  coreconfig_obj;
  docs['import'] =  coreimport_obj;
  docs['typed'] =  coretyped_obj;

  // functions - complex
  docs.arg = functioncomplexarg_obj;
  docs.conj = functioncomplexconj_obj;
  docs.re = functioncomplexre_obj;
  docs.im = functioncomplexim_obj;

  // functions - expression
  docs['eval'] =  functionexpressioneval_obj;
  docs.help =  functionexpressionhelp_obj;

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
  docs.filter =  functionmatrixfilter_obj;
  docs.flatten = functionmatrixflatten_obj;
  docs.forEach =  functionmatrixforEach_obj;
  docs.inv = functionmatrixinv_obj;
  docs.map =  functionmatrixmap_obj;
  docs.ones = functionmatrixones_obj;
  docs.partitionSelect =  functionmatrixpartitionSelect_obj;
  docs.range = functionmatrixrange_obj;
  docs.resize = functionmatrixresize_obj;
  docs.size = functionmatrixsize_obj;
  docs.sort =  functionmatrixsort_obj;
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
  docs['typeof'] =  functionutilstypeof_obj;

  return docs;
}

var name_name = 'docs';
var path_path = 'expression';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
