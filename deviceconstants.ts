export class constants{
 static readonly DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
 static readonly DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;
 
 public static readonly throttling = {
  DEVTOOLS_RTT_ADJUSTMENT_FACTOR: constants.DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
  DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR: constants.DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
   // These values align with WebPageTest's definition of "Fast 3G"
   // But offer similar charateristics to roughly the 75th percentile of 4G connections.
   mobileSlow4G: {
     rttMs: 150,
     throughputKbps: 1.6 * 1024,
     requestLatencyMs: 150 * constants.DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
     downloadThroughputKbps: 1.6 * 1024 * constants.DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
     uploadThroughputKbps: 750 * constants.DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
     cpuSlowdownMultiplier: 4,
   },
   // These values partially align with WebPageTest's definition of "Regular 3G".
   // These values are meant to roughly align with Chrome UX report's 3G definition which are based
   // on HTTP RTT of 300-1400ms and downlink throughput of <700kbps.
   mobileRegular3G: {
     rttMs: 300,
     throughputKbps: 700,
     requestLatencyMs: 300 * constants.DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
     downloadThroughputKbps: 700 * constants.DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
     uploadThroughputKbps: 700 * constants.DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
     cpuSlowdownMultiplier: 4,
   },
   // Using a "broadband" connection type
   // Corresponds to "Dense 4G 25th percentile" in https://docs.google.com/document/d/1Ft1Bnq9-t4jK5egLSOc28IL4TvR-Tt0se_1faTA4KTY/edit#heading=h.bb7nfy2x9e5v
   desktopDense4G: {
     rttMs: 40,
     throughputKbps: 10 * 1024,
     cpuSlowdownMultiplier: 1,
     requestLatencyMs: 0, // 0 means unset
     downloadThroughputKbps: 0,
     uploadThroughputKbps: 0,
   },
 };
 
 /**
  * @type {Required<LH.SharedFlagsSettings['screenEmulation']>}
  */
 static readonly MOTOGPOWER_EMULATION_METRICS = {
   mobile: true,
   width: 412,
   height: 823,
   // This value has some interesting ramifications for image-size-responsive, see:
   // https://github.com/GoogleChrome/lighthouse/issues/10741#issuecomment-626903508
   deviceScaleFactor: 1.75,
   disabled: false,
 };
 
 /**
  * Desktop metrics adapted from emulated_devices/module.json
  * @type {Required<LH.SharedFlagsSettings['screenEmulation']>}
  */
 static readonly DESKTOP_EMULATION_METRICS = {
   mobile: false,
   width: 1350,
   height: 940,
   deviceScaleFactor: 1,
   disabled: false,
 };
 
 static readonly screenEmulationMetrics = {
   mobile: constants.MOTOGPOWER_EMULATION_METRICS,
   desktop: constants.DESKTOP_EMULATION_METRICS,
 };
 
 
 static readonly MOTOG4_USERAGENT = 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36'; // eslint-disable-line max-len
 static readonly DESKTOP_USERAGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'; // eslint-disable-line max-len
 
 static readonly userAgents = {
   mobile: constants.MOTOG4_USERAGENT,
   desktop: constants.DESKTOP_USERAGENT,
 };
 
 /** @type {LH.Config.Settings} */
 static readonly defaultSettings = {
   output: 'json',
   maxWaitForFcp: 30 * 1000,
   maxWaitForLoad: 45 * 1000,
   pauseAfterFcpMs: 1000,
   pauseAfterLoadMs: 1000,
   networkQuietThresholdMs: 1000,
   cpuQuietThresholdMs: 1000,
 
   formFactor: 'mobile',
   throttling: constants.throttling.mobileSlow4G,
   throttlingMethod: 'simulate',
   screenEmulation: constants.screenEmulationMetrics.mobile,
   emulatedUserAgent: constants.userAgents.mobile,
 
   auditMode: false,
   gatherMode: false,
   disableStorageReset: false,
   debugNavigation: false,
   channel: 'node',
   usePassiveGathering: false,
   disableFullPageScreenshot: false,
   skipAboutBlank: false,
   blankPage: 'about:blank',
 
   // the following settings have no defaults but we still want ensure that `key in settings`
   // in config will work in a typechecked way
   budgets: null,
   locale: 'en-US', // actual default determined by Config using lib/i18n
   blockedUrlPatterns: null,
   additionalTraceCategories: null,
   extraHeaders: null,
   precomputedLanternData: null,
   onlyAudits: null,
   onlyCategories: null,
   skipAudits: null,
 };
 
 /** @type {LH.Config.Pass} */
 static readonly defaultPassConfig = {
   passName: 'defaultPass',
   loadFailureMode: 'fatal',
   recordTrace: false,
   useThrottling: false,
   pauseAfterFcpMs: 0,
   pauseAfterLoadMs: 0,
   networkQuietThresholdMs: 0,
   cpuQuietThresholdMs: 0,
   blockedUrlPatterns: [],
   blankPage: 'about:blank',
   gatherers: [],
 };
 
 /** @type {Required<LH.Config.NavigationJson>} */
 static readonly defaultNavigationConfig = {
   id: 'default',
   loadFailureMode: 'fatal',
   disableThrottling: false,
   disableStorageReset: false,
   pauseAfterFcpMs: 0,
   pauseAfterLoadMs: 0,
   networkQuietThresholdMs: 0,
   cpuQuietThresholdMs: 0,
   blockedUrlPatterns: [],
   blankPage: 'about:blank',
   artifacts: [],
 };
 
 static readonly nonSimulatedPassConfigOverrides = {
   pauseAfterFcpMs: 5250,
   pauseAfterLoadMs: 5250,
   networkQuietThresholdMs: 5250,
   cpuQuietThresholdMs: 5250,
 };
};