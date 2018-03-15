/* globals catcher */

"use strict";

this.deviceInfo = (function() {
  const manifest = browser.runtime.getManifest();

  let platformInfo = {};
  catcher.watchPromise(browser.runtime.getPlatformInfo().then((info) => {
    platformInfo = info;
  }));

  return function deviceInfo() {
    let match = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9.]{1,1000})/);
    const chromeVersion = match ? match[1] : null;
    match = navigator.userAgent.match(/Firefox\/([0-9.]{1,1000})/);
    const firefoxVersion = match ? match[1] : null;
    const appName = chromeVersion ? "chrome" : "firefox";

    return {
      addonVersion: manifest.version,
      platform: platformInfo.os,
      architecture: platformInfo.arch,
      version: firefoxVersion || chromeVersion,
      // These don't seem to apply to Chrome:
      // build: system.build,
      // platformVersion: system.platformVersion,
      userAgent: navigator.userAgent,
      appVendor: appName,
      appName
    };
  };

})();
