/* eslint-disable */(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

const platformToStore = new Map([
  ["chromium", "chrome"],
  ["edgehtml", "edge"],
  ["gecko", "firefox"]
]);

function getInfo()
{
  return Promise.all([
    app.get("application"),
    app.get("platform")
  ])
  .then(([application, platform]) =>
  {
    let store = application;
    // Edge and Opera have their own stores so we should refer to those instead
    if (application !== "edge" && application !== "opera")
    {
      store = platformToStore.get(platform) || "chrome";
    }

    return {application, platform, store};
  });
}

function send(type, args)
{
  args = Object.assign({}, {type}, args);
  return browser.runtime.sendMessage(args);
}

const app = {
  get: (what) => send("app.get", {what}),
  getInfo,
  open: (what) => send("app.open", {what})
};
module.exports.app = app;

const doclinks = {
  get: (link) => send("app.get", {what: "doclink", link})
};
module.exports.doclinks = doclinks;

const notifications = {
  get: (displayMethod) => send("notifications.get", {displayMethod}),
  seen: () => send("notifications.seen")
};
module.exports.notifications = notifications;

const prefs = {
  get: (key) => send("prefs.get", {key})
};
module.exports.prefs = prefs;

const subscriptions = {
  getInitIssues: () => send("subscriptions.getInitIssues")
};
module.exports.subscriptions = subscriptions;

const stats = {
  getBlockedPerPage: (tab) => send("stats.getBlockedPerPage", {tab}),
  getBlockedTotal: () => send("stats.getBlockedTotal")
};
module.exports.stats = stats;

// For now we are merely reusing the port for long-lived communications to fix
// https://gitlab.com/eyeo/adblockplus/abpui/adblockplusui/issues/415
const port = browser.runtime.connect({name: "ui"});
module.exports.port = port;

},{}],2:[function(require,module,exports){
/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

const api = require("../api");

function openOptions()
{
  api.app.open("options");
}

function initLinks()
{
  Promise.all([
    api.doclinks.get("acceptable_ads_criteria"),
    api.doclinks.get("acceptable_ads_opt_out")
  ]).then(([urlCriteria, urlOptOut]) =>
  {
    ext.i18n.setElementLinks(
      "control-description",
      urlCriteria, urlOptOut, openOptions
    );
  });

  api.doclinks.get("terms").then((url) =>
  {
    ext.i18n.setElementLinks("fair-description", url);
  });
  api.doclinks.get("eyeo").then((url) =>
  {
    const year = new Date().getFullYear().toString();
    const notice = document.getElementById("copyright-notice");
    ext.i18n.setElementText(notice, "common_copyright", year);
    ext.i18n.setElementLinks("copyright-notice", url);
  });
}

function initWarnings()
{
  api.subscriptions.getInitIssues()
    .then((issues) =>
    {
      const {dataCorrupted, reinitialized} = issues;
      const warnings = [];

      // Show warning if we detected some data corruption
      if (dataCorrupted)
      {
        warnings.push("dataCorrupted");
        api.doclinks.get("adblock_plus").then((url) =>
        {
          ext.i18n.setElementLinks("dataCorrupted-reinstall", url);
        });
        api.doclinks.get("help_center").then((url) =>
        {
          ext.i18n.setElementLinks(
            "dataCorrupted-support",
            "mailto:support@adblockplus.org",
            url
          );
        });
      }
      // Show warning if filterlists settings were reinitialized
      else if (reinitialized)
      {
        warnings.push("reinitialized");
        ext.i18n.setElementLinks("warning-reinitialized", openOptions);
      }

      // While our design isn't optimized for it yet, multiple warnings can
      // be shown by adding multiple strings the body's data-warnings attribute
      if (warnings.length)
      {
        document.body.dataset.warnings = warnings.join(" ");
      }
    });
}

function initApplication()
{
  api.app.get("application").then((application) =>
  {
    document.documentElement.dataset.application = application;
  });
}

// Translations are resolved on DOMContentLoaded so waiting for DOM by
// deferring script execution is insufficient
window.addEventListener("DOMContentLoaded", () =>
{
  initLinks();
  initWarnings();
  initApplication();
});

},{"../api":1}]},{},[2]);
