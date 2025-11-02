import { computed, toValue, reactive } from 'vue';
import { L as hash } from '../runtime.mjs';
import { i as fetchDefaults, j as useAsyncData, k as useRequestFetch } from './server.mjs';

function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller, "Request aborted as another request to the same endpoint was initiated.");
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort("Request aborted due to timeout."), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function useLazyFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  return useFetch(
    request,
    {
      ...opts,
      lazy: true
    },
    // @ts-expect-error we pass an extra argument with the resolved auto-key to prevent another from being injected
    autoKey
  );
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const AD = "Andorra";
const AE = "United Arab Emirates";
const AF = "Afghanistan";
const AG = "Antigua and Barbuda";
const AI = "Anguilla";
const AL = "Albania";
const AM = "Armenia";
const AO = "Angola";
const AQ = "Antarctica";
const AR = "Argentina";
const AS = "American Samoa";
const AT = "Austria";
const AU = "Australia";
const AW = "Aruba";
const AX = "\xC5land Islands";
const AZ = "Azerbaijan";
const BA = "Bosnia and Herzegovina";
const BB = "Barbados";
const BD = "Bangladesh";
const BE = "Belgium";
const BF = "Burkina Faso";
const BG = "Bulgaria";
const BH = "Bahrain";
const BI = "Burundi";
const BJ = "Benin";
const BL = "Saint Barth\xE9lemy";
const BM = "Bermuda";
const BN = "Brunei Darussalam";
const BO = "Bolivia, Plurinational State of";
const BQ = "Caribbean Netherlands";
const BR = "Brazil";
const BS = "Bahamas";
const BT = "Bhutan";
const BV = "Bouvet Island";
const BW = "Botswana";
const BY = "Belarus";
const BZ = "Belize";
const CA = "Canada";
const CC = "Cocos (Keeling) Islands";
const CD = "Congo, the Democratic Republic of the";
const CF = "Central African Republic";
const CG = "Republic of the Congo";
const CH = "Switzerland";
const CI = "C\xF4te d'Ivoire";
const CK = "Cook Islands";
const CL = "Chile";
const CM = "Cameroon";
const CN = "China (People's Republic of China)";
const CO = "Colombia";
const CR = "Costa Rica";
const CU = "Cuba";
const CV = "Cape Verde";
const CW = "Cura\xE7ao";
const CX = "Christmas Island";
const CY = "Cyprus";
const CZ = "Czechia";
const DE = "Germany";
const DJ = "Djibouti";
const DK = "Denmark";
const DM = "Dominica";
const DO = "Dominican Republic";
const DZ = "Algeria";
const EC = "Ecuador";
const EE = "Estonia";
const EG = "Egypt";
const EH = "Western Sahara";
const ER = "Eritrea";
const ES = "Spain";
const ET = "Ethiopia";
const EU = "Europe";
const FI = "Finland";
const FJ = "Fiji";
const FK = "Falkland Islands (Malvinas)";
const FM = "Micronesia, Federated States of";
const FO = "Faroe Islands";
const FR = "France";
const GA = "Gabon";
const GB = "United Kingdom";
const GD = "Grenada";
const GE = "Georgia";
const GF = "French Guiana";
const GG = "Guernsey";
const GH = "Ghana";
const GI = "Gibraltar";
const GL = "Greenland";
const GM = "Gambia";
const GN = "Guinea";
const GP = "Guadeloupe";
const GQ = "Equatorial Guinea";
const GR = "Greece";
const GS = "South Georgia and the South Sandwich Islands";
const GT = "Guatemala";
const GU = "Guam";
const GW = "Guinea-Bissau";
const GY = "Guyana";
const HK = "Hong Kong";
const HM = "Heard Island and McDonald Islands";
const HN = "Honduras";
const HR = "Croatia";
const HT = "Haiti";
const HU = "Hungary";
const ID = "Indonesia";
const IE = "Ireland";
const IL = "Israel";
const IM = "Isle of Man";
const IN = "India";
const IO = "British Indian Ocean Territory";
const IQ = "Iraq";
const IR = "Iran, Islamic Republic of";
const IS = "Iceland";
const IT = "Italy";
const JE = "Jersey";
const JM = "Jamaica";
const JO = "Jordan";
const JP = "Japan";
const KE = "Kenya";
const KG = "Kyrgyzstan";
const KH = "Cambodia";
const KI = "Kiribati";
const KM = "Comoros";
const KN = "Saint Kitts and Nevis";
const KP = "Korea, Democratic People's Republic of";
const KR = "Korea, Republic of";
const KW = "Kuwait";
const KY = "Cayman Islands";
const KZ = "Kazakhstan";
const LA = "Laos (Lao People's Democratic Republic)";
const LB = "Lebanon";
const LC = "Saint Lucia";
const LI = "Liechtenstein";
const LK = "Sri Lanka";
const LR = "Liberia";
const LS = "Lesotho";
const LT = "Lithuania";
const LU = "Luxembourg";
const LV = "Latvia";
const LY = "Libya";
const MA = "Morocco";
const MC = "Monaco";
const MD = "Moldova, Republic of";
const ME = "Montenegro";
const MF = "Saint Martin";
const MG = "Madagascar";
const MH = "Marshall Islands";
const MK = "North Macedonia";
const ML = "Mali";
const MM = "Myanmar";
const MN = "Mongolia";
const MO = "Macao";
const MP = "Northern Mariana Islands";
const MQ = "Martinique";
const MR = "Mauritania";
const MS = "Montserrat";
const MT = "Malta";
const MU = "Mauritius";
const MV = "Maldives";
const MW = "Malawi";
const MX = "Mexico";
const MY = "Malaysia";
const MZ = "Mozambique";
const NA = "Namibia";
const NC = "New Caledonia";
const NE = "Niger";
const NF = "Norfolk Island";
const NG = "Nigeria";
const NI = "Nicaragua";
const NL = "The Netherlands";
const NO = "Norway";
const NP = "Nepal";
const NR = "Nauru";
const NU = "Niue";
const NZ = "New Zealand";
const OM = "Oman";
const PA = "Panama";
const PE = "Peru";
const PF = "French Polynesia";
const PG = "Papua New Guinea";
const PH = "Philippines";
const PK = "Pakistan";
const PL = "Poland";
const PM = "Saint Pierre and Miquelon";
const PN = "Pitcairn";
const PR = "Puerto Rico";
const PS = "Palestine";
const PT = "Portugal";
const PW = "Palau";
const PY = "Paraguay";
const QA = "Qatar";
const RE = "R\xE9union";
const RO = "Romania";
const RS = "Serbia";
const RU = "Russian Federation";
const RW = "Rwanda";
const SA = "Saudi Arabia";
const SB = "Solomon Islands";
const SC = "Seychelles";
const SD = "Sudan";
const SE = "Sweden";
const SG = "Singapore";
const SH = "Saint Helena, Ascension and Tristan da Cunha";
const SI = "Slovenia";
const SJ = "Svalbard and Jan Mayen Islands";
const SK = "Slovakia";
const SL = "Sierra Leone";
const SM = "San Marino";
const SN = "Senegal";
const SO = "Somalia";
const SR = "Suriname";
const SS = "South Sudan";
const ST = "Sao Tome and Principe";
const SV = "El Salvador";
const SX = "Sint Maarten (Dutch part)";
const SY = "Syrian Arab Republic";
const SZ = "Swaziland";
const TC = "Turks and Caicos Islands";
const TD = "Chad";
const TF = "French Southern Territories";
const TG = "Togo";
const TH = "Thailand";
const TJ = "Tajikistan";
const TK = "Tokelau";
const TL = "Timor-Leste";
const TM = "Turkmenistan";
const TN = "Tunisia";
const TO = "Tonga";
const TR = "Turkey";
const TT = "Trinidad and Tobago";
const TV = "Tuvalu";
const TW = "Taiwan (Republic of China)";
const TZ = "Tanzania, United Republic of";
const UA = "Ukraine";
const UG = "Uganda";
const UM = "US Minor Outlying Islands";
const US = "United States";
const UY = "Uruguay";
const UZ = "Uzbekistan";
const VA = "Holy See (Vatican City State)";
const VC = "Saint Vincent and the Grenadines";
const VE = "Venezuela, Bolivarian Republic of";
const VG = "Virgin Islands, British";
const VI = "Virgin Islands, U.S.";
const VN = "Vietnam";
const VU = "Vanuatu";
const WF = "Wallis and Futuna Islands";
const WS = "Samoa";
const XK = "Kosovo";
const YE = "Yemen";
const YT = "Mayotte";
const ZA = "South Africa";
const ZM = "Zambia";
const ZW = "Zimbabwe";
const countrycodes = {
  AD,
  AE,
  AF,
  AG,
  AI,
  AL,
  AM,
  AO,
  AQ,
  AR,
  AS,
  AT,
  AU,
  AW,
  AX,
  AZ,
  BA,
  BB,
  BD,
  BE,
  BF,
  BG,
  BH,
  BI,
  BJ,
  BL,
  BM,
  BN,
  BO,
  BQ,
  BR,
  BS,
  BT,
  BV,
  BW,
  BY,
  BZ,
  CA,
  CC,
  CD,
  CF,
  CG,
  CH,
  CI,
  CK,
  CL,
  CM,
  CN,
  CO,
  CR,
  CU,
  CV,
  CW,
  CX,
  CY,
  CZ,
  DE,
  DJ,
  DK,
  DM,
  DO,
  DZ,
  EC,
  EE,
  EG,
  EH,
  ER,
  ES,
  ET,
  EU,
  FI,
  FJ,
  FK,
  FM,
  FO,
  FR,
  GA,
  "GB-ENG": "England",
  "GB-NIR": "Northern Ireland",
  "GB-SCT": "Scotland",
  "GB-WLS": "Wales",
  GB,
  GD,
  GE,
  GF,
  GG,
  GH,
  GI,
  GL,
  GM,
  GN,
  GP,
  GQ,
  GR,
  GS,
  GT,
  GU,
  GW,
  GY,
  HK,
  HM,
  HN,
  HR,
  HT,
  HU,
  ID,
  IE,
  IL,
  IM,
  IN,
  IO,
  IQ,
  IR,
  IS,
  IT,
  JE,
  JM,
  JO,
  JP,
  KE,
  KG,
  KH,
  KI,
  KM,
  KN,
  KP,
  KR,
  KW,
  KY,
  KZ,
  LA,
  LB,
  LC,
  LI,
  LK,
  LR,
  LS,
  LT,
  LU,
  LV,
  LY,
  MA,
  MC,
  MD,
  ME,
  MF,
  MG,
  MH,
  MK,
  ML,
  MM,
  MN,
  MO,
  MP,
  MQ,
  MR,
  MS,
  MT,
  MU,
  MV,
  MW,
  MX,
  MY,
  MZ,
  NA,
  NC,
  NE,
  NF,
  NG,
  NI,
  NL,
  NO,
  NP,
  NR,
  NU,
  NZ,
  OM,
  PA,
  PE,
  PF,
  PG,
  PH,
  PK,
  PL,
  PM,
  PN,
  PR,
  PS,
  PT,
  PW,
  PY,
  QA,
  RE,
  RO,
  RS,
  RU,
  RW,
  SA,
  SB,
  SC,
  SD,
  SE,
  SG,
  SH,
  SI,
  SJ,
  SK,
  SL,
  SM,
  SN,
  SO,
  SR,
  SS,
  ST,
  SV,
  SX,
  SY,
  SZ,
  TC,
  TD,
  TF,
  TG,
  TH,
  TJ,
  TK,
  TL,
  TM,
  TN,
  TO,
  TR,
  TT,
  TV,
  TW,
  TZ,
  UA,
  UG,
  UM,
  US,
  UY,
  UZ,
  VA,
  VC,
  VE,
  VG,
  VI,
  VN,
  VU,
  WF,
  WS,
  XK,
  YE,
  YT,
  ZA,
  ZM,
  ZW
};

export { useFetch as a, countrycodes as c, useLazyFetch as u };
//# sourceMappingURL=countries-AosiVuF2.mjs.map
