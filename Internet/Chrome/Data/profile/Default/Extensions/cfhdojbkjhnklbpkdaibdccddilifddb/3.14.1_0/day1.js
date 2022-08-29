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

const filters = {
  get: () => send("filters.get")
};
module.exports.filters = filters;

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
  get: (options) => send("subscriptions.get", options),
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

function convertDoclinks()
{
  const links = document.querySelectorAll("a[data-doclink]");
  for (const link of links)
  {
    getDoclink(link.dataset.doclink).then((url) =>
    {
      link.target = link.target || "_blank";
      link.href = url;
    });
  }
}

function getDoclink(link)
{
  return browser.runtime.sendMessage({
    type: "app.get",
    what: "doclink",
    link
  });
}

function getErrorMessage(error)
{
  let message = null;
  if (error)
  {
    let messageId = error.reason || error.type;
    let placeholders = [];
    if (error.reason === "filter_unknown_option")
    {
      if (error.option)
        placeholders = [error.option];
      else
        messageId = "filter_invalid_option";
    }

    message = browser.i18n.getMessage(messageId, placeholders);
  }

  // Use a generic error message if we don't have one available yet
  if (!message)
  {
    message = browser.i18n.getMessage("filter_action_failed");
  }

  if (!error || typeof error.lineno !== "number")
    return message;

  return browser.i18n.getMessage("line", [
    error.lineno.toLocaleString(),
    message
  ]);
}

module.exports = {convertDoclinks, getDoclink, getErrorMessage};

},{}],3:[function(require,module,exports){
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

let browserName = "unknown";

// Firefox only, which is exactly the one
// we are looking for in order to patch events' layerX
if (browser.runtime.getBrowserInfo)
{
  browser.runtime.getBrowserInfo().then(info =>
  {
    browserName = info.name.toLowerCase();
  });
}

// used as legacy fallback in events.key(event) via keys[event.keyCode]
const keys = {
  9: "Tab",
  13: "Enter",
  27: "Escape",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown"
};

module.exports = {
  $: (selector, container = document) => container.querySelector(selector),
  $$: (selector, container = document) => container.querySelectorAll(selector),

  // helper to format as indented string any HTML/XML node
  asIndentedString,

  // basic copy and paste clipboard utility
  clipboard: {
    // warning: Firefox needs a proper event to work
    //          such click or mousedown or similar.
    copy(text)
    {
      const selection = document.getSelection();
      const selected = selection.rangeCount > 0 ?
                        selection.getRangeAt(0) : null;
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.cssText = "position:fixed;top:-999px";
      document.body.appendChild(el).select();
      document.execCommand("copy");
      document.body.removeChild(el);
      if (selected)
      {
        selection.removeAllRanges();
        // simply putting back selected doesn't work anymore
        const range = document.createRange();
        range.setStart(selected.startContainer, selected.startOffset);
        range.setEnd(selected.endContainer, selected.endOffset);
        selection.addRange(range);
      }
    },
    // optionally accepts a `paste` DOM event
    // it uses global clipboardData, if available, otherwise.
    // i.e. input.onpaste = event => console.log(dom.clipboard.paste(event));
    paste(event)
    {
      if (!event)
        event = window;
      const clipboardData = event.clipboardData || window.clipboardData;
      return clipboardData ? clipboardData.getData("text") : "";
    }
  },

  events: {
    // necessary to retrieve the right key before Chrome 51
    key(event)
    {
      return "key" in event ? event.key : keys[event.keyCode];
    }
  },

  // helper to provide the relative coordinates
  // to the closest positioned containing element
  relativeCoordinates(event)
  {
    // good old way that will work properly in older browsers too
    // mandatory for Chrome 49, still better than manual fallback
    // in all other browsers that provide such functionality
    let el = event.currentTarget;
    if ("layerX" in event && "layerY" in event)
    {
      let {layerX} = event;
      // see https://issues.adblockplus.org/ticket/7134
      if (browserName === "firefox")
        layerX -= el.offsetLeft;
      return {x: layerX, y: event.layerY};
    }
    // fallback when layerX/Y will be removed (since deprecated)
    let x = 0;
    let y = 0;
    do
    {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
    } while (
      (el = el.offsetParent) &&
      !isNaN(el.offsetLeft) &&
      !isNaN(el.offsetTop)
    );
    return {x: event.pageX - x, y: event.pageY - y};
  }
};

function asIndentedString(element, indentation = 0)
{
  // only the first time it's called
  if (!indentation)
  {
    // get the top meaningful element to parse
    if (element.nodeType === Node.DOCUMENT_NODE)
      element = element.documentElement;
    // accept only elements
    if (element.nodeType !== Node.ELEMENT_NODE)
      throw new Error("Unable to serialize " + element);
    // avoid original XML pollution at first iteration
    element = element.cloneNode(true);
  }
  const before = "  ".repeat(indentation + 1);
  const after = "  ".repeat(indentation);
  const doc = element.ownerDocument;
  for (const child of Array.from(element.childNodes))
  {
    const {nodeType} = child;
    if (nodeType === Node.ELEMENT_NODE || nodeType === Node.TEXT_NODE)
    {
      if (nodeType === Node.TEXT_NODE)
      {
        const content = child.textContent.trim();
        child.textContent = content.length ? `\n${before}${content}` : "";
      }
      else
      {
        element.insertBefore(doc.createTextNode(`\n${before}`), child);
        asIndentedString(child, indentation + 1);
      }
    }
    if (child === element.lastChild)
      element.appendChild(doc.createTextNode(`\n${after}`));
  }
  // inner calls don't need to bother serialization
  if (indentation)
    return "";
  // easiest way to recognize an HTML element from an XML one
  if (/^https?:\/\/www\.w3\.org\/1999\/xhtml$/.test(element.namespaceURI))
    return element.outerHTML;
  // all other elements should use XML serializer
  return new XMLSerializer().serializeToString(element);
}

},{}],4:[function(require,module,exports){
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

const i18nAttributes = ["alt", "placeholder", "title", "value"];

function assignAction(elements, action)
{
  for (const element of elements)
  {
    switch (typeof action)
    {
      case "string":
        element.href = action;
        element.target = "_blank";
        break;
      case "function":
        element.href = "#";
        element.addEventListener("click", (ev) =>
        {
          ev.preventDefault();
          action();
        });
        break;
    }
  }
}

function* getRemainingLinks(parent)
{
  const links = parent.querySelectorAll("a:not([data-i18n-index])");
  for (const link of links)
  {
    yield link;
  }
}

function setElementLinks(idOrElement, ...actions)
{
  const element = typeof idOrElement === "string" ?
                  document.getElementById(idOrElement) :
                  idOrElement;

  const remainingLinks = getRemainingLinks(element);

  for (let i = 0; i < actions.length; i++)
  {
    // Assign action to links with matching index
    const links = element.querySelectorAll(`a[data-i18n-index='${i}']`);
    if (links.length)
    {
      assignAction(links, actions[i]);
      continue;
    }

    // Assign action to non-indexed link in the order they appear
    // Note that this behavior is deprecated and only exists
    // for backwards compatibility
    // https://issues.adblockplus.org/ticket/6743
    const link = remainingLinks.next();
    if (link.done)
      continue;

    assignAction([link.value], actions[i]);
  }
}

// Used for visual strings cleanup(ex. tags from messages used in alert())
// Function is not meant to be used together with `innerHTML`
function stripTagsUnsafe(text)
{
  return text.replace(/<\/?[^>]+>/g, "");
}

// Inserts i18n strings into matching elements. Any inner HTML already
// in the element is parsed as JSON and used as parameters to
// substitute into placeholders in the i18n message.
function setElementText(element, stringName, args, children = [])
{
  function processString(str, currentElement)
  {
    const match = /^(.*?)<(a|em|slot|strong)(\d)?>(.*?)<\/\2\3>(.*)$/.exec(str);
    if (match)
    {
      const [, before, name, index, innerText, after] = match;
      processString(before, currentElement);

      if (name == "slot")
      {
        const e = children[index];
        if (e)
        {
          currentElement.appendChild(e);
        }
      }
      else
      {
        const e = document.createElement(name);
        if (typeof index != "undefined")
        {
          e.dataset.i18nIndex = index;
        }
        processString(innerText, e);
        currentElement.appendChild(e);
      }

      processString(after, currentElement);
    }
    else
      currentElement.appendChild(document.createTextNode(str));
  }

  while (element.lastChild)
    element.removeChild(element.lastChild);
  processString(browser.i18n.getMessage(stringName, args), element);
}


function loadI18nStrings()
{
  function resolveStringNames(container)
  {
    {
      const elements = container.querySelectorAll("[data-i18n]");
      for (const element of elements)
      {
        const children = Array.from(element.children);
        setElementText(element, element.dataset.i18n, null, children);
      }
    }

    // Resolve texts for translatable attributes
    for (const attr of i18nAttributes)
    {
      const elements = container.querySelectorAll(`[data-i18n-${attr}]`);
      for (const element of elements)
      {
        const stringName = element.getAttribute(`data-i18n-${attr}`);
        element.setAttribute(attr, browser.i18n.getMessage(stringName));
      }
    }
  }

  resolveStringNames(document);
  // Content of Template is not rendered on runtime so we need to add
  // translation strings for each Template documentFragment content
  // individually.
  for (const template of document.querySelectorAll("template"))
    resolveStringNames(template.content);
}

function initI18n()
{
  // Getting UI locale cannot be done synchronously on Firefox,
  // requires messaging the background page. For Chrome and Safari,
  // we could get the UI locale here, but would need to duplicate
  // the logic implemented in Utils.appLocale.
  browser.runtime.sendMessage({
    type: "app.get",
    what: "localeInfo"
  })
  .then(localeInfo =>
  {
    document.documentElement.lang = localeInfo.locale;
    document.documentElement.dir = localeInfo.bidiDir;
  });

  loadI18nStrings();
}

module.exports = {
  initI18n,
  setElementLinks,
  setElementText,
  stripTagsUnsafe
};

},{}],5:[function(require,module,exports){
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

const api = require("./api");
const {setElementLinks, setElementText} = require("./i18n");

function initCopyrightNotice()
{
  api.doclinks.get("eyeo").then((url) =>
  {
    const year = new Date().getFullYear().toString();
    const notice = document.getElementById("copyright-notice");
    setElementText(notice, "common_copyright", year);
    setElementLinks("copyright-notice", url);
  });
}

initCopyrightNotice();

},{"./api":1,"./i18n":4}],6:[function(require,module,exports){
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
const {convertDoclinks} = require("../common");
const {$} = require("../dom");
const {initI18n, setElementText, stripTagsUnsafe} = require("../i18n");
require("../landing");

function initContact()
{
  const email = "support@adblockplus.org";
  const subject = browser.i18n.getMessage("day1_community_contact_subject");
  const uri = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  $("#contact").href = uri;
}

function initPopupDummy()
{
  const popupDummy = $("iframe");
  // Accessing the frame's Window from here causes the browser API to become
  // unavailable to the frame. Therefore we're using our own instead.
  window.addEventListener("message", (ev) =>
  {
    if (!ev.data || ev.data.type !== "popup-dummy.resize")
      return;

    popupDummy.height = ev.data.height;
  });
}

function initTitle()
{
  api.stats.getBlockedTotal()
    .then((blockedTotal) =>
    {
      blockedTotal = blockedTotal.toLocaleString();
      setElementText(
        $("#content-message"),
        "day1_header_title",
        [blockedTotal]
      );

      const message = browser.i18n.getMessage(
        "day1_header_title",
        [blockedTotal]
      );
      $("title").textContent = stripTagsUnsafe(message);
    });
}

convertDoclinks();
initI18n();
initContact();
initPopupDummy();
initTitle();

},{"../api":1,"../common":2,"../dom":3,"../i18n":4,"../landing":5}]},{},[6]);
