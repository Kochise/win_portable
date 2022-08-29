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

const IOElement = require("./io-element");

class IOCheckbox extends IOElement
{
  static get booleanAttributes()
  {
    return ["checked", "disabled"];
  }

  attributeChangedCallback()
  {
    this.render();
  }

  created()
  {
    this.addEventListener("click", this);
    this.render();
  }

  onclick(event)
  {
    if (!this.disabled)
    {
      this.checked = !this.checked;
      this.dispatchEvent(new CustomEvent("change", {
        bubbles: true,
        cancelable: true,
        detail: this.checked
      }));
    }
  }

  render()
  {
    this.html`
    <button
      role="checkbox"
      disabled="${this.disabled}"
      aria-checked="${this.checked}"
      aria-disabled="${this.disabled}"
    />`;
  }
}

IOCheckbox.define("io-checkbox");

module.exports = IOCheckbox;

},{"./io-element":6}],6:[function(require,module,exports){
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

// external dependencies
const {default: HyperHTMLElement} = require("hyperhtml-element/cjs");

const {setElementText} = require("./i18n");

// common DOM utilities exposed as IOElement.utils
const DOMUtils = {

  // boolean related operations/helpers
  boolean: {
    // utils.boolean.attribute(node, name, setAsTrue):void
    // set a generic node attribute name as "true"
    // if value is a boolean one or it removes the attribute
    attribute(node, name, setAsTrue)
    {
      // don't use `this.value(value)` with `this` as context
      // to make destructuring of helpers always work.
      // @example
      // const {attribute: setBoolAttr} = IOElement.utils.boolean;
      // setBoolAttr(node, 'test', true);
      if (DOMUtils.boolean.value(setAsTrue))
      {
        node.setAttribute(name, "true");
      }
      else
      {
        node.removeAttribute(name);
      }
    },

    // utils.boolean.value(any):boolean
    // it returns either true or false
    // via truthy or falsy values, but also via strings
    // representing "true", "false" as well as "0" or "1"
    value(value)
    {
      if (typeof value === "string" && value.length)
      {
        try
        {
          value = JSON.parse(value);
        }
        catch (error)
        {
          // Ignore invalid JSON to continue using value as string
        }
      }
      return !!value;
    }
  },

  event: {
    // returns true if it's a left click or a touch event.
    // The left mouse button value is 0 and this
    // is compatible with pointers/touch events
    // where `button` might not be there.
    isLeftClick(event)
    {
      const re = /^(?:click|mouse|touch|pointer)/;
      return re.test(event.type) && !event.button;
    }
  }
};

// provides a unique-id suffix per each component
let counter = 0;

// common Custom Element class to extend
class IOElement extends HyperHTMLElement
{
  // exposes DOM helpers as read only utils
  static get utils()
  {
    return DOMUtils;
  }

  // get a unique ID or, if null, set one and returns it
  static getID(element)
  {
    return element.getAttribute("id") || IOElement.setID(element);
  }

  // set a unique ID to a generic element and returns the ID
  static setID(element)
  {
    const id = `${element.nodeName.toLowerCase()}-${counter++}`;
    element.setAttribute("id", id);
    return id;
  }

  // lazily retrieve or define a custom element ID
  get id()
  {
    return IOElement.getID(this);
  }

  // returns true only when the component is live and styled
  get ready()
  {
    return !!this.offsetParent && this.isStyled();
  }

  // whenever an element is created, render its content once
  created() { this.render(); }

  // based on a `--component-name: ready;` convention
  // under the `component-name {}` related stylesheet,
  // this method returns true only if such stylesheet
  // has been already loaded.
  isStyled()
  {
    const computed = window.getComputedStyle(this, null);
    const property = "--" + this.nodeName.toLowerCase();
    // in some case Edge returns '#fff' instead of ready
    return computed.getPropertyValue(property).trim() !== "";
  }

  // by default, render is a no-op
  render() {}

  // usually a template would contain a main element such
  // input, button, div, section, etc.
  // having a simple way to retrieve such element can be
  // both semantic and handy, as opposite of using
  // this.children[0] each time
  get child()
  {
    let element = this.firstElementChild;
    // if accessed too early, will render automatically
    if (!element)
    {
      this.render();
      element = this.firstElementChild;
    }
    return element;
  }
}

// whenever an interpolation with ${{i18n: 'string-id'}} is found
// transform such value into the expected content
// example:
//  render() {
//    return this.html`<div>${{i18n:'about-abp'}}</div>`;
//  }
IOElement.intent("i18n", idOrArgs =>
{
  const fragment = document.createDocumentFragment();
  if (typeof idOrArgs === "string")
    setElementText(fragment, idOrArgs);
  else if (idOrArgs instanceof Array)
    setElementText(fragment, ...idOrArgs);
  return fragment;
});

module.exports = IOElement;

},{"./i18n":4,"hyperhtml-element/cjs":35}],7:[function(require,module,exports){
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

require("./io-checkbox");
require("./io-toggle");

const IOElement = require("./io-element");
const IOScrollbar = require("./io-scrollbar");

const {$} = require("./dom");

// <io-filter-list disabled />.{filters = [...]}
class IOFilterBase extends IOElement
{
  static get booleanAttributes()
  {
    return ["disabled"];
  }

  static get observedAttributes()
  {
    return ["filters"];
  }

  get selected()
  {
    return this._selected || (this._selected = new Set());
  }

  set selected(value)
  {
    this._selected = new Set(value);
    this.render();
  }

  get defaultState()
  {
    return {
      infinite: false,
      filters: [],
      viewHeight: 0,
      rowHeight: 0,
      scrollTop: 0,
      scrollHeight: 0,
      tbody: null
    };
  }

  get filters()
  {
    return this.state.filters || [];
  }

  set filters(value)
  {
    // if the offsetParent is null, hence the component is not visible, or
    // if the related CSS is not loaded yet, this component cannot bootstrap
    // because its TBODY will never be scrollable so there's no way
    // to calculate its viewport height in pixels
    // in such case, just execute later on until the CSS is parsed
    if (!this.ready)
    {
      this._filters = value;
      return;
    }
    this.selected = [];
    // clear any previous --rule-width info
    this.style.setProperty("--rule-width", "auto");
    // render one row only for the setup
    this.setState({infinite: false, filters: []});
    // set current flex grown rule column
    this.style.setProperty(
      "--rule-width",
      $('[data-column="rule"]', this).clientWidth + "px"
    );
    // if filters have more than a row
    // prepare the table with a new state
    if (value.length)
    {
      const tbody = $("tbody", this);
      const rowHeight = $("tr", tbody).clientHeight;
      const viewHeight = tbody.clientHeight;
      this.setState({
        infinite: true,
        filters: value,
        scrollTop: tbody.scrollTop,
        scrollHeight: rowHeight * (value.length + 1) - viewHeight,
        viewHeight,
        rowHeight
      });
      // needed mostly for Firefox and Edge to have extra rows
      // reflecting the same weight of others
      this.style.setProperty("--row-height", `${rowHeight}px`);
      // setup the scrollbar size too
      this.scrollbar.size = rowHeight * value.length;
    }
  }

  created()
  {
    // force one off setup whenever the component enters the view
    if (!this.ready)
      this.addEventListener(
        "animationstart",
        function prepare(event)
        {
          this.removeEventListener(event.type, prepare);
          if (this._filters)
          {
            this.filters = this._filters;
            this._filters = null;
          }
        }
      );

    // the rest of the setup
    this.scrollbar = new IOScrollbar();
    this.scrollbar.direction = "vertical";
    this.scrollbar.addEventListener("scroll", () =>
    {
      const {position, range} = this.scrollbar;
      const {scrollHeight} = this.state;
      this.setState({
        scrollTop: getScrollTop(scrollHeight * position / range)
      });
    });
    this.addEventListener(
      "wheel",
      event =>
      {
        event.preventDefault();
        // prevent race conditions between the blur event and the scroll
        const activeElement = this.ownerDocument.activeElement;
        if (activeElement && activeElement !== this.ownerDocument.body)
        {
          activeElement.blur();
          return;
        }
        // it's necessary to handle deltaMode as it indicates
        // the units of measurement for the event delta values
        // e.g. Firefox uses a deltaMode of 1 (DOM_DELTA_LINE)
        const {scrollHeight, scrollTop, rowHeight, viewHeight} = this.state;
        const scrollFactors = {
          0: 1,
          1: rowHeight,
          // as defined in Gecko implementation
          // https://github.com/mozilla/gecko-dev/blob/535145f19797558c2bad0d1d6f8b7f06d3e6346b/layout/generic/nsGfxScrollFrame.cpp#L4527
          2: viewHeight - Math.min(0.1 * viewHeight, 2 * rowHeight)
        };
        this.setState({
          scrollTop: getScrollTop(
            scrollTop + event.deltaY * scrollFactors[event.deltaMode],
            scrollHeight
          )
        });
        // update the scrollbar position accordingly
        updateScrollbarPosition.call(this);
      },
      {passive: false}
    );
    setScrollbarReactiveOpacity.call(this);
  }

  scrollTo(row)
  {
    const {rowHeight, scrollHeight} = this.state;
    const index = typeof row === "string" ?
      this.filters.findIndex(filter => filter.text === row) :
      this.filters.findIndex(filter => filter === row);
    if (index < 0)
      console.error("invalid filter", row);
    else
    {
      this.setState({
        scrollTop: getScrollTop(index * rowHeight, scrollHeight)
      });
      updateScrollbarPosition.call(this);
    }
  }

  renderTable()
  {
    throw new Error("renderTable not implemented");
  }

  render()
  {
    let list = this.state.filters;
    if (this.state.infinite)
    {
      list = [];
      const {rowHeight, scrollTop, viewHeight} = this.state;
      const length = this.state.filters.length;
      let count = 0;
      let i = Math.floor(scrollTop / rowHeight);
      // always add an extra row to make scrolling smooth
      while ((count * rowHeight) < (viewHeight + rowHeight))
      {
        list[count++] = i < length ? this.state.filters[i++] : null;
      }
    }
    this.renderTable(list);
    postRender.call(this, list);
  }

  updateScrollbar()
  {
    const {rowHeight, viewHeight} = this.state;
    const {length} = this.filters;
    this.scrollbar.size = rowHeight * length;
    this.setState({
      scrollHeight: rowHeight * (length + 1) - viewHeight
    });
  }
}

module.exports = IOFilterBase;

// ensure the number is always between 0 and a positive number
// specially handy when filters are erased and the viewHeight
// is higher than scrollHeight and other cases too
function getScrollTop(value, scrollHeight)
{
  const scrollTop = Math.max(
    0,
    Math.min(scrollHeight || Infinity, value)
  );
  // avoid division by zero gotchas
  return isNaN(scrollTop) ? 0 : scrollTop;
}

function postRender(list)
{
  const {tbody, scrollTop, rowHeight} = this.state;
  if (this.state.infinite)
  {
    tbody.scrollTop = scrollTop % rowHeight;
  }
  // keep growing the fake list until the tbody becomes scrollable
  else if (
    !tbody ||
    (tbody.scrollHeight <= tbody.clientHeight && tbody.clientHeight)
  )
  {
    this.setState({
      tbody: tbody || $("tbody", this),
      filters: list.concat({})
    });
  }
}

function setScrollbarReactiveOpacity()
{
  // get native value for undefined opacity
  const opacity = this.scrollbar.style.opacity;
  // cache it once to never duplicate listeners
  const cancelOpacity = () =>
  {
    // store default opacity value back
    this.scrollbar.style.opacity = opacity;
    // drop all listeners
    document.removeEventListener("pointerup", cancelOpacity);
    document.removeEventListener("pointercancel", cancelOpacity);
  };
  // add listeners on scrollbaro pointerdown event
  this.scrollbar.addEventListener("pointerdown", () =>
  {
    this.scrollbar.style.opacity = 1;
    document.addEventListener("pointerup", cancelOpacity);
    document.addEventListener("pointercancel", cancelOpacity);
  });
}

function updateScrollbarPosition()
{
  const {scrollbar, state} = this;
  const {scrollHeight, scrollTop} = state;
  scrollbar.position = scrollTop * scrollbar.range / scrollHeight;
}

},{"./dom":3,"./io-checkbox":5,"./io-element":6,"./io-scrollbar":13,"./io-toggle":14}],8:[function(require,module,exports){
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

const {port} = require("./api");
const {getErrorMessage} = require("./common");
const {$, events} = require("./dom");
const {stripTagsUnsafe} = require("./i18n");
require("./io-checkbox");
const IOElement = require("./io-element");
require("./io-toggle");
const IOFilterBase = require("./io-filter-base");

const {utils, wire} = IOElement;
const prevFilterText = new WeakMap();

// <io-filter-list disabled />.{filters = [...]}
class IOFilterList extends IOFilterBase
{
  get defaultState()
  {
    return Object.assign(super.defaultState, {
      sort: {
        current: "",
        asc: false
      },
      sortMap: {
        status: "disabled",
        rule: "text",
        warning: "slow"
      }
    });
  }

  created()
  {
    setupPort.call(this);
    super.created();
  }

  onheaderclick(event)
  {
    const th = event.target.closest("th");
    if (!utils.event.isLeftClick(event) || !th)
      return;
    const {column} = th.dataset;
    if (column === "selected")
    {
      const ioCheckbox = event.target.closest("io-checkbox");
      // ignore clicks outside the io-checkbox
      if (ioCheckbox)
        this.selected = ioCheckbox.checked ? this.filters : [];
      return;
    }
    event.preventDefault();
    const {sort, sortMap} = this.state;
    if (column !== sort.current)
    {
      sort.current = column;
      sort.asc = false;
    }
    sort.asc = !sort.asc;
    const sorter = sort.asc ? 1 : -1;
    const property = sortMap[column];
    const direction = property === "slow" ? -1 : 1;
    this.filters.sort((fa, fb) =>
    {
      if (fa[property] === fb[property])
        return 0;
      return (fa[property] < fb[property] ? -sorter : sorter) * direction;
    });
    this.render();
    const dataset = th.closest("thead").dataset;
    dataset.sort = column;
    dataset.dir = sort.asc ? "asc" : "desc";
  }

  onpaste(event)
  {
    event.preventDefault();

    const data = event.clipboardData.getData("text/plain");
    // Filters must be written within a single line so we're ignoring any
    // subsequent lines in case clipboard data contains multiple lines.
    const [text] = data.trim().split("\n", 1);
    document.execCommand("insertText", false, text);
  }

  onkeydown(event)
  {
    const key = events.key(event);
    if (key === "Enter" || key === "Escape")
    {
      event.preventDefault();
      if (key === "Escape" && this._filter)
      {
        const {currentTarget} = event;
        const text = prevFilterText.get(this._filter) || this._filter.text;
        currentTarget.textContent = text;
        currentTarget.blur();
        this._filter = null;
      }
    }
  }

  onkeyup(event)
  {
    const isEnter = events.key(event) === "Enter";
    const update = isEnter || event.type === "blur";
    const {currentTarget} = event;
    const {title} = currentTarget;
    const text = currentTarget.textContent.trim();
    const filter = this._filter;

    // if triggered but there was focus lost already: return
    if (!filter)
      return;

    // in case of empty filter, remove it
    if (!text)
    {
      if (!update)
        return;
      browser.runtime.sendMessage({
        type: "filters.remove",
        text: filter.text
      }).then(errors =>
      {
        if (!errors.length)
        {
          this.selected.delete(filter);
          this.render();
          this.dispatchEvent(new CustomEvent("filter:removed", {
            cancelable: false,
            bubbles: true
          }));
        }
      });
      this._filter = null;
      return;
    }

    // store the initial filter value once
    // needed to remove the filter once finished the editing
    if (!prevFilterText.has(filter))
      prevFilterText.set(filter, title);

    // avoid updating filters that didn't change
    if (prevFilterText.get(filter) === text)
    {
      if (isEnter)
        focusTheNextFilterIfAny.call(this, currentTarget.closest("tr"));
      return;
    }

    // add + remove the filter on Enter / update
    if (update)
    {
      filter.text = text;
      currentTarget.title = text;
      // drop any validation action at distance
      this._validating = 0;
      if (this.filters.some(f => f.text === filter.text && f !== filter))
      {
        const {reason} = filter;
        filter.reason = {type: "filter_duplicated"};

        // render only if there's something different to show
        if (!isSameError(filter.reason, reason))
        {
          this.render();
        }
      }
      else
      {
        replaceFilter.call(this, filter, currentTarget);
        if (isEnter)
          focusTheNextFilterIfAny.call(this, currentTarget.closest("tr"));
      }
      return;
    }

    // don't overload validation
    if (this._validating > 0)
    {
      // but signal there is more validation to do
      this._validating++;
      return;
    }
    this._validating = 1;
    browser.runtime.sendMessage({
      type: "filters.validate",
      text
    }).then(errors =>
    {
      // in case a save operation has been asked in the meanwhile
      if (this._validating < 1)
        return;
      // if there were more validation requests
      if (this._validating > 1)
      {
        // reset the counter
        this._validating = 0;
        // re-trigger the event with same target
        this.onkeyup({currentTarget});
        return;
      }
      const {reason} = filter;
      if (errors.length)
        filter.reason = errors[0];
      else
        delete filter.reason;
      // render only if there's something different to show
      if (!isSameError(filter.reason, reason))
        this.render();
    });
  }

  onfocus(event)
  {
    const {currentTarget} = event;
    this._filter = currentTarget.data;
    currentTarget.closest("tr").classList.add("editing");
  }

  onblur(event)
  {
    const {currentTarget} = event;
    currentTarget.closest("tr").classList.remove("editing");
    // needed to avoid ellipsis on overflow hidden
    // make the filter look like disappeared from the list
    currentTarget.scrollLeft = 0;
    if (this._changingFocus)
    {
      this._filter = null;
      return;
    }
    this.onkeyup(event);
    this._filter = null;
  }

  // used in the checkbox of the selected column only
  onclick(event)
  {
    const filter = getFilter(event);
    const {filters} = this;
    if (event.shiftKey && this.selected.size)
    {
      let start = filters.indexOf(this._lastFilter);
      const end = filters.indexOf(filter);
      const method = this.selected.has(this._lastFilter) ?
                          "add" :
                          "delete";
      if (start < end)
      {
        while (start++ < end)
          this.selected[method](filters[start]);
      }
      else
      {
        while (start-- > end)
          this.selected[method](filters[start]);
      }
    }
    else
    {
      this._lastFilter = filter;
      if (this.selected.has(filter))
        this.selected.delete(filter);
      else
        this.selected.add(filter);
    }
    // render updated right after the checkbox changes
  }

  // used in both selected and status
  // the selected needs it to render at the right time
  // which is when the checkbox status changed
  // not when it's clicked
  onchange(event)
  {
    const {currentTarget} = event;
    const td = currentTarget.closest("td");
    if (td.dataset.column === "status")
    {
      const checkbox = currentTarget.closest("io-toggle");
      const filter = getFilter(event);
      filter.disabled = !checkbox.checked;
      browser.runtime.sendMessage({
        type: "filters.toggle",
        text: filter.text,
        disabled: filter.disabled
      });
    }
    else
    {
      this.render();
    }
  }

  renderTable(visibleFilters)
  {
    const {length} = this.filters;
    this.html`<table cellpadding="0" cellspacing="0">
      <thead onclick="${this}" data-call="onheaderclick">
        <th data-column="selected">
          <io-checkbox ?checked=${!!length && this.selected.size === length} />
        </th>
        <th data-column="status"></th>
        <th data-column="rule">${{i18n: "options_filter_list_rule"}}</th>
        <th data-column="warning">${
          // for the header, just return always the same warning icon
          warnings.get(this) ||
          warnings.set(this, createImageForType(false)).get(this)
        }</th>
      </thead>
      <tbody>${visibleFilters.map(getRow, this)}</tbody>
      ${this.scrollbar}
    </table>`;
  }

  sortBy(type, isAscending)
  {
    const th = $(`th[data-column="${type}"]`, this);
    if (!th)
    {
      console.error(`unable to sort by ${type}`);
      return;
    }
    const {sort} = this.state;
    sort.current = type;
    // sort.asc is flipped with current state
    // so set the one that is not desired
    sort.asc = !isAscending;
    // before triggering the event
    th.click();
  }
}

IOFilterList.define("io-filter-list");

module.exports = IOFilterList;

// delegates the handling of errors
function dispatchError(reason, filter)
{
  this.dispatchEvent(new CustomEvent("error", {
    cancelable: false,
    bubbles: true,
    detail: {
      reason,
      filter
    }
  }));
}

// Please note: the contenteditable=${...} attribute
// cannot be set directly to the TD because of an ugly
// MS Edge bug that does not allow TDs to be editable.
function getRow(filter, i)
{
  if (filter)
  {
    const selected = this.selected.has(filter);
    return wire(filter)`
    <tr class="${selected ? "selected" : ""}">
      <td data-column="selected">
        <io-checkbox
          ?checked=${selected}
          onclick="${this}" onchange="${this}"
        />
      </td>
      <td data-column="status">
        <!-- Not all filters can be en-/disabled (e.g. comments) -->
        <io-toggle
          ?checked=${!filter.disabled}
          ?disabled=${!("disabled" in filter)}
          aria-hidden="${!("disabled" in filter)}"
          onchange="${this}"
        />
      </td>
      <td data-column="rule">
        <div
          class="content"
          contenteditable="${!this.disabled}"
          title="${filter.text}"
          onpaste="${this}"
          onkeydown="${this}"
          onkeyup="${this}"
          onfocus="${this}"
          onblur="${this}"
          data="${filter}"
        >${filter.text}</div>
      </td>
      <td data-column="warning">
        ${getWarning(filter)}
      </td>
    </tr>`;
  }
  // no filter results into an empty, not editable, row
  return wire(this, `:${i}`)`
    <tr class="empty">
      <td data-column="selected"></td>
      <td data-column="status"></td>
      <td data-column="rule"></td>
      <td data-column="warning"></td>
    </tr>`;
}

// used to show issues in the last column
const issues = new WeakMap();

// used to show warnings in the last column
const warnings = new WeakMap();

// relate either issues or warnings to a filter
const createImageForFilter = (isIssue, filter) =>
{
  const error = (isIssue) ? filter.reason : {type: "filter_slow"};
  const image = createImageForType(isIssue);
  image.title = stripTagsUnsafe(getErrorMessage(error));
  return image;
};

const createImageForType = (isIssue) =>
{
  const image = new Image();
  image.src = `skin/icons/${isIssue ? "error" : "alert"}.svg`;
  return image;
};

function focusTheNextFilterIfAny(tr)
{
  const i = this.filters.indexOf(this._filter) + 1;
  if (i < this.filters.length)
  {
    const next = tr.nextElementSibling;
    const {rowHeight, scrollTop, viewHeight} = this.state;
    // used to avoid race conditions with blur event
    this._changingFocus = true;
    // force eventually the scrollTop to make
    // the next row visible
    if (next.offsetTop > viewHeight)
    {
      this.setState({
        scrollTop: getScrollTop(scrollTop + rowHeight)
      });
    }
    // focus its content field
    $(".content", next).focus();
    // set back the _changingFocus
    this._changingFocus = false;
  }
}

function animateAndDrop(target)
{
  target.addEventListener("animationend", dropSavedClass);
  target.classList.add("saved");
}

function dropSavedClass(event)
{
  const {currentTarget} = event;
  currentTarget.classList.remove("saved");
  currentTarget.removeEventListener(event.type, dropSavedClass);
}

function getFilter(event)
{
  const el = event.currentTarget;
  const div = $('td[data-column="rule"] > .content', el.closest("tr"));
  return div.data;
}

// ensure the number is always between 0 and a positive number
// specially handy when filters are erased and the viewHeight
// is higher than scrollHeight and other cases too
function getScrollTop(value, scrollHeight)
{
  const scrollTop = Math.max(
    0,
    Math.min(scrollHeight || Infinity, value)
  );
  // avoid division by zero gotchas
  return isNaN(scrollTop) ? 0 : scrollTop;
}

function getWarning(filter)
{
  let map;
  if (filter.reason)
  {
    map = issues;
  }
  else if (filter.slow)
  {
    map = warnings;
  }
  else
    return "";

  let warning = map.get(filter);
  if (warning)
    return warning;

  warning = createImageForFilter(map === issues, filter);
  map.set(filter, warning);
  return warning;
}

function isSameError(errorA = {}, errorB = {})
{
  return errorA.type === errorB.type && errorA.reason === errorB.reason;
}

function replaceFilter(filter, currentTarget)
{
  const {text} = filter;
  const old = prevFilterText.get(filter);
  // if same text, no need to bother the extension at all
  if (old === text)
  {
    animateAndDrop(currentTarget);
    return;
  }
  browser.runtime.sendMessage({
    type: "filters.replace",
    new: text,
    old
  }).then(errors =>
  {
    if (errors.length)
    {
      filter.reason = errors[0];
    }
    else
    {
      // see https://gitlab.com/eyeo/adblockplus/abpui/adblockplusui/issues/338
      // until that lands, we remove the filter and add it at the end
      // of the table so, before rendering, drop the new filter and update
      // the current known one
      const {filters} = this;
      let i = filters.length;
      let newFilter;
      while (i--)
      {
        newFilter = filters[i];
        if (newFilter.text === text)
          break;
      }
      filters.splice(i, 1);
      delete filter.disabled;
      delete filter.reason;
      Object.assign(filter, newFilter);
      prevFilterText.set(filter, text);
      animateAndDrop(currentTarget);
    }
    this.render();
  });
}

// listen to filters messages and eventually
// delegate the error handling
function setupPort()
{
  port.onMessage.addListener((message) =>
  {
    if (message.type === "filters.respond" && message.action === "changed")
    {
      const {text, disabled} = message.args[0];
      const filter = this.filters.find(f => f.text === text);

      if (!filter)
        return;

      const shownDisabled = filter.disabled;

      if (disabled !== shownDisabled)
      {
        filter.reason = {type: "filter_disabled"};
        filter.disabled = disabled;
      }
      this.render();
    }
  });
}

},{"./api":1,"./common":2,"./dom":3,"./i18n":4,"./io-checkbox":5,"./io-element":6,"./io-filter-base":7,"./io-toggle":14}],9:[function(require,module,exports){
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

const IOElement = require("./io-element");

const {$, events} = require("./dom");

const MINIMUM_SEARCH_LENGTH = 3;

// this component simply emits filter:add(text)
// and filter:match({accuracy, filter}) events
class IOFilterSearch extends IOElement
{
  static get booleanAttributes()
  {
    return ["disabled"];
  }

  static get observedAttributes()
  {
    return ["match"];
  }

  get defaultState()
  {
    return {
      filterExists: true,
      filters: [],
      match: -1
    };
  }

  get filters()
  {
    return this.state.filters;
  }

  // filters are never modified or copied
  // but used to find out if one could be added
  // or if the component in charge should show the found one
  set filters(value)
  {
    this.setState({filters: value || []});
  }

  get match()
  {
    return this.state.match;
  }

  // match is a number between -1 and 1
  // -1 means any match
  // 1 means exact match
  // 0 means match disabled => no filter:match event ever
  set match(value)
  {
    this.setState({
      match: Math.max(-1, Math.min(1, parseFloat(value) || 0))
    }, false);
  }

  get value()
  {
    return $("input", this).value.trim();
  }

  set value(text)
  {
    const value = String(text || "").trim();
    $("input", this).value = value;
    this.setState({
      filterExists: value.length ?
                      this.state.filters.some(hasValue, value) :
                      false
    });
  }

  attributeChangedCallback(name, previous, current)
  {
    if (name === "match")
      this.match = current;
    else
      this.render();
  }

  created()
  {
    const {i18n} = browser;
    this._placeholder = i18n.getMessage("options_filters_search_or_add");
    this._addingFilter = false;
    this._timer = 0;
    this.render();
  }

  onclick()
  {
    if (this.value)
      addFilter.call(this, this.value);
  }

  ondrop(event)
  {
    event.preventDefault();
    addFilter.call(this, event.dataTransfer.getData("text"));
  }

  onkeydown(event)
  {
    switch (events.key(event))
    {
      case "Enter":
        const {value} = this;
        if (
          value.length &&
          !this.disabled &&
          !this.state.filters.some(hasValue, value)
        )
          addFilter.call(this, value);
        break;
      case "Escape":
        dispatch.call(this, "filter:none");
        this.value = "";
        break;
    }
  }

  onkeyup()
  {
    // clear timeout on any action
    clearTimeout(this._timer);

    // in case it was just added, don't do anything
    if (this._addingFilter)
    {
      this._addingFilter = false;
      return;
    }

    // debounce the search operations to avoid degrading
    // performance on very long list of filters
    this._timer = setTimeout(() =>
    {
      this._timer = 0;

      const {match, value} = this;
      // clear on backspace
      if (!value.length)
      {
        dispatch.call(this, "filter:none");
        this.value = "";
      }
      // do nothing when the search text is too small
      // also no match means don't validate
      // but also multi line (paste on old browsers)
      // shouldn't pass through this logic (filtered later on)
      else if (
        !match ||
        value.length < MINIMUM_SEARCH_LENGTH ||
        isMultiLine(value)
      )
      {
        this.setState({filterExists: this.state.filters.some(hasValue, value)});
        dispatch.call(this, "filter:none");
      }
      else
      {
        const result = search.call(this, value);
        if (result.accuracy && match <= result.accuracy)
          dispatch.call(this, "filter:match", result);
        else
          dispatch.call(this, "filter:none");
      }
    }, 100);
  }

  onpaste(event)
  {
    const clipboardData = event.clipboardData || window.clipboardData;
    const data = clipboardData.getData("text").trim();
    // do not automatically paste on single line
    if (isMultiLine(data))
      addFilter.call(this, data);
  }

  render()
  {
    const {disabled} = this;
    this.html`
    <input
      placeholder="${this._placeholder}"
      onkeydown="${this}" onkeyup="${this}"
      ondrop="${this}" onpaste="${this}"
      disabled="${disabled}"
    >
    <button
      onclick="${this}"
      disabled="${disabled || this.state.filterExists || !this.value}">
      + ${{i18n: "add"}}
    </button>`;
  }
}

IOFilterSearch.define("io-filter-search");

module.exports = IOFilterSearch;

function addFilter(data)
{
  dispatch.call(this, "filter:none");
  let value = data.trim();
  if (!value)
    return;

  // in case of multi line don't bother the search
  if (isMultiLine(value))
  {
    value = clearMultiLine(value);
    dispatch.call(this, "filter:add", value);
  }
  else
  {
    const result = search.call(this, value);
    if (result.accuracy < 1)
    {
      this._addingFilter = true;
      dispatch.call(this, "filter:add", value);
    }
    else if (result.accuracy && value.length >= MINIMUM_SEARCH_LENGTH)
      dispatch.call(this, "filter:match", result);
  }
}

function dispatch(type, detail)
{
  if (type === "filter:add" || this.filters.length)
    this.dispatchEvent(new CustomEvent(type, {detail}));
}

function hasValue(filter)
{
  return filter.text == this;
}

function clearMultiLine(data)
{
  return data.split(/[\r\n]/)
              .map(text => text.trim())
              .filter(text => text.length)
              .join("\n");
}

function isMultiLine(data)
{
  return /[\r\n]/.test(data.trim());
}

function search(value)
{
  let accuracy = 0;
  let closerFilter = null;
  const matches = [];
  const searchLength = value.length;
  if (searchLength)
  {
    const match = this.match;
    const {filters} = this.state;
    const {length} = filters;
    for (let i = 0; i < length; i++)
    {
      const filter = filters[i];
      const filterLength = filter.text.length;
      // ignore all filters shorter than current search
      if (searchLength > filterLength)
        continue;
      // compare the two strings only if length is the same
      if (searchLength === filterLength)
      {
        if (filter.text === value)
        {
          matches.push(filter);
          closerFilter = filter;
          accuracy = 1;
        }
        continue;
      }
      // otherwise verify text includes searched value
      // only if the match is not meant to be 1:1
      if (match < 1 && filter.text.includes(value))
      {
        matches.push(filter);
        const tmpAccuracy = searchLength / filterLength;
        if (accuracy < tmpAccuracy)
        {
          closerFilter = filter;
          accuracy = tmpAccuracy;
        }
      }
    }
    this.setState({filterExists: accuracy === 1});
  }
  return {accuracy, matches, value, filter: closerFilter};
}

},{"./dom":3,"./io-element":6}],10:[function(require,module,exports){
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

const {getErrorMessage} = require("./common");
const IOElement = require("./io-element");
const IOFilterList = require("./io-filter-list");
const IOFilterSearch = require("./io-filter-search");

const {$, clipboard} = require("./dom");

const {bind, wire} = IOElement;

// io-filter-table is a basic controller
// used to relate the search and the list
class IOFilterTable extends IOElement
{
  static get booleanAttributes()
  {
    return ["disabled"];
  }

  static get observedAttributes()
  {
    return ["match"];
  }

  get defaultState()
  {
    return {filters: [], match: -1, ready: false};
  }

  created()
  {
    this._showing = null;
    this.search = this.appendChild(new IOFilterSearch());
    this.search.addEventListener(
      "filter:add",
      event => this.onFilterAdd(event)
    );
    this.search.addEventListener(
      "filter:match",
      event => this.onFilterMatch(event)
    );
    this.search.addEventListener(
      "filter:none",
      () =>
      {
        this.list.selected = [];
        this.updateFooter();
      }
    );
    this.list = this.appendChild(new IOFilterList());
    this.list.addEventListener(
      "filter:removed",
      event => this.onFilterRemoved(event)
    );
    this.footer = this.appendChild(wire()`<div class="footer" />`);
    this.addEventListener("click", this);
    this.addEventListener("error", this);
    this.setState({ready: true});
  }

  attributeChangedCallback(name, prev, value)
  {
    if (name === "match")
      this.setState({match: value}, false);
    this.render();
  }

  get filters()
  {
    return this.state.filters;
  }

  set filters(value)
  {
    this.setState({filters: value});
  }

  get match()
  {
    return this.state.match;
  }

  set match(value)
  {
    this.setState({match: value});
  }

  onclick(event)
  {
    if (event.target.closest("io-checkbox"))
    {
      cleanErrors.call(this);
    }
  }

  onerror(event)
  {
    // force the footer to be visible since errors are shown there
    this.updateFooter();
    this.footer.classList.add("visible");
    const {errors} = event.detail;
    const footerError = $(".footer .error", this);

    const errorMessages = errors.map(getErrorMessage);
    bind(footerError)`${errorMessages.map(mssg => `<li>${mssg}</li>`)}`;
    footerError.removeAttribute("hidden");
  }

  onfooterclick(event)
  {
    const {classList} = event.currentTarget;
    switch (true)
    {
      case classList.contains("delete"):
        const resolve = [];
        for (const filter of this.list.selected)
        {
          this.list.selected.delete(filter);
          this.filters.splice(this.filters.indexOf(filter), 1);
          resolve.push(browser.runtime.sendMessage({
            type: "filters.remove",
            text: filter.text
          }));
        }
        Promise.all(resolve).then(
          () => updateList(this.list),
          (errors) => this.onerror({detail: {errors}})
        );
        cleanErrors.call(this);
        break;
      case classList.contains("copy"):
        const filters = [];
        for (const filter of this.list.selected)
        {
          filters.push(filter.text);
        }
        clipboard.copy(filters.join("\n"));
        break;
    }
  }

  onFilterAdd(event)
  {
    const filters = event.detail.split(/(?:\r\n|\n)/);

    cleanErrors.call(this);
    browser.runtime.sendMessage({
      type: "filters.importRaw",
      text: filters.join("\n")
    })
    .then(errors =>
    {
      if (!errors.length)
      {
        filters.reverse();
        let added = false;
        for (const text of filters)
        {
          // We don't treat filter headers like invalid filters,
          // instead we simply ignore them and don't show any errors
          // in order to allow pasting complete filter lists
          if (text[0] === "[")
            continue;

          added = true;
          const i = this.filters.findIndex(flt => flt.text === text);
          const [filter] = i < 0 ? [{text}] : this.filters.splice(i, 1);
          this.filters.unshift(filter);
        }

        this.search.value = "";
        if (!added)
          return;

        this.render();
        updateList(this.list);
        this.list.scrollTo(this.filters[0]);
        this.updateFooter();
      }
      else
      {
        this.onerror({detail: {errors}});
      }
    });
  }

  onFilterMatch(event)
  {
    const {accuracy, filter, matches} = event.detail;
    this.list.selected = matches;
    // scroll either to the exact match or the first close match
    this.list.scrollTo(accuracy === 1 ? filter : matches[0]);
    this.updateFooter();
  }

  onFilterRemoved()
  {
    cleanErrors.call(this);
    this.updateFooter();
  }

  render()
  {
    const {disabled} = this;
    const {filters, match, ready} = this.state;
    if (!ready || !filters.length)
      return;

    // update inner components setting filters
    // only if necessary
    this.search.disabled = disabled;
    this.search.match = match;
    if (this.search.filters !== filters)
      this.search.filters = filters;

    this.list.disabled = disabled;
    if (this.list.filters !== filters)
      this.list.filters = filters;

    this.updateFooter();
  }

  updateFooter()
  {
    const disabled = !this.list.selected.size;
    bind(this.footer)`
      <button
        class="delete"
        onclick="${this}"
        disabled="${disabled}"
        data-call="onfooterclick"
      >${{i18n: "delete"}}</button>
      <button
        class="copy"
        onclick="${this}"
        disabled="${disabled}"
        data-call="onfooterclick"
      >${{i18n: "copy_selected"}}</button>
      <ul class="error" hidden></ul>
    `;
  }
}

IOFilterTable.define("io-filter-table");

function cleanErrors()
{
  const footerError = $(".footer .error", this);
  if (footerError)
  {
    footerError.setAttribute("hidden", true);
    bind(footerError)``;
  }
  this.updateFooter();
}

function updateList(list)
{
  list.render();
  list.updateScrollbar();
}

},{"./common":2,"./dom":3,"./io-element":6,"./io-filter-list":8,"./io-filter-search":9}],11:[function(require,module,exports){
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

const DELAY = 200;

const IOElement = require("./io-element");

const {$, $$, events} = require("./dom");

// used to create options
const {wire} = IOElement;

// used to map codes across browser
const KeyCode = {
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  DELETE: "Delete",
  ENTER: "Enter",
  ESCAPE: "Escape",
  END: "End",
  HOME: "Home",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SPACE: " ",
  TAB: "Tab"
};

/*
  <io-list-box
    ?autoclose=${boolean} to close per each change
    data-text="i18n entry text when it's closed"
    data-expanded="optional i18n entry text when it's opened"
  />
*/
class IOListBox extends IOElement
{
  static get observedAttributes()
  {
    return ["action", "swap", "disabled", "expanded", "items"];
  }

  static get booleanAttributes()
  {
    return ["autoclose"];
  }

  created()
  {
    this._blurTimer = 0;
    this._bootstrap = true;
    // in case the component has been addressed and
    // it has already an attached items property
    if (this.hasOwnProperty("items"))
    {
      const items = this.items;
      delete this.items;
      this.items = items;
    }

    this.addEventListener("blur", this, true);
  }

  // can be overridden but by default
  // it returns the item.title
  getItemTitle(item)
  {
    return item.title;
  }

  get swap()
  {
    return !!this._swap;
  }

  set swap(value)
  {
    this._swap = !!value;
  }

  // shortcuts to retrieve sub elements
  get label()
  {
    return $(`#${this.id}label`, this);
  }

  get popup()
  {
    return $(`#${this.id}popup`, this);
  }

  // component status
  get disabled()
  {
    return this.hasAttribute("disabled");
  }

  set disabled(value)
  {
    IOElement.utils.boolean.attribute(this, "disabled", value);
    this.render();
  }

  get expanded()
  {
    return this.hasAttribute("expanded");
  }

  set expanded(value)
  {
    IOElement.utils.boolean.attribute(this, "expanded", value);
    this.render();
    setTimeout(
      () =>
      {
        // be sure the element is blurred to re-open on focus
        if (!value && this.expanded)
          this.ownerDocument.activeElement.blur();
        this.dispatchEvent(new CustomEvent(value ? "open" : "close"));
      },
      DELAY + 1
    );
  }

  // items handler
  get items()
  {
    return this._items || [];
  }

  set items(items)
  {
    this._items = items;
    this.render();
    // WAI-ARIA guidelines:
    //  If an option is selected before the listbox receives focus,
    //  focus is set on the selected option.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // if no items were passed, clean up
    // and bootstrap the next time.
    // The bootstrap will focus the right item.
    if (!items.length)
    {
      this._bootstrap = true;
    }
    // if it needs to bootstrap (cleanup or new component)
    else if (this._bootstrap)
    {
      this._bootstrap = false;
      for (const item of items)
      {
        if (item.group)
          continue;

        // if an item is selected
        if (!item.disabled)
        {
          // simulate hover it and exit
          hover.call(this, "items", item);
          return;
        }
      }
      // if no item was selected, hover the first one that is not a group
      hover.call(this, "items", items.find(item => !item.group));
    }
  }

  // events related methods
  handleEvent(event)
  {
    if (!this.disabled)
    {
      this[`on${event.type}`](event);
    }
  }

  // label related events
  onblur(event)
  {
    if (event.relatedTarget && this.contains(event.relatedTarget))
      return;

    // ensure blur won't close the list right away or it's impossible
    // to get the selected raw on click (bad target)
    if (this.expanded)
      this._blurTimer = setTimeout(() =>
      {
        this.expanded = false;
      }, DELAY);
  }

  onfocus(event)
  {
    // if 0 or already cleared, nothing happens, really
    clearTimeout(this._blurTimer);
    // show the popup
    this.expanded = true;
  }

  onkeydown(event)
  {
    const hovered = $(".hover", this);
    switch (events.key(event))
    {
      case KeyCode.BACKSPACE:
      case KeyCode.DELETE:
        event.preventDefault();
        break;
      /* both SPACE, RETURN and ESC hide and blur */
      case KeyCode.ENTER:
      case KeyCode.SPACE:
        hovered.dispatchEvent(new CustomEvent("click", {bubbles: true}));
        /* eslint: fall through */
      case KeyCode.ESCAPE:
        event.preventDefault();
        this.expanded = false;
        break;
      case KeyCode.ARROW_UP:
        const prev = findNext.call(
          this,
          hovered, "previousElementSibling"
        );
        if (prev)
          hover.call(this, "key", getItem.call(this, prev.id));
        event.preventDefault();
        break;
      case KeyCode.ARROW_DOWN:
        const next = findNext.call(
          this,
          hovered, "nextElementSibling"
        );
        if (next)
          hover.call(this, "key", getItem.call(this, next.id));
        event.preventDefault();
        break;
    }
  }

  // popup related events
  onclick(event)
  {
    if (!IOElement.utils.event.isLeftClick(event))
      return;
    event.preventDefault();
    clearTimeout(this._blurTimer);
    const el = event.target.closest('[role="option"]');
    if (el)
    {
      const detail = getItem.call(this, el.id);
      const {unselectable} = detail;
      if (el.getAttribute("aria-disabled") !== "true")
      {
        this.dispatchEvent(new CustomEvent("change", {detail}));
        this.render();
      }
      if ((this.swap || this.autoclose) && !unselectable)
      {
        this.expanded = false;
      }
    }
  }

  onmousedown(event)
  {
    this.expanded = !this.expanded;
  }

  onmouseover(event)
  {
    const el = event.target.closest('[role="option"]');
    if (el && !el.classList.contains("hover"))
    {
      const item = getItem.call(this, el.id);
      if (item)
        hover.call(this, "mouse", item);
    }
  }

  // the view
  render()
  {
    const {action, dataset, disabled, expanded, id, swap} = this;
    const enabled = this._items.filter(item => !item.disabled).length;
    let buttonText = "";
    if (expanded && dataset.expanded)
      buttonText = dataset.expanded;
    else
      buttonText = dataset.text;
    const {i18n} = browser;
    this.html`
    <button
      role="combobox"
      aria-readonly="true"
      id="${id + "label"}"
      disabled="${disabled}"
      data-action="${action}"
      aria-owns="${id + "popup"}"
      aria-disabled="${disabled}"
      aria-expanded="${expanded}"
      aria-haspopup="${id + "popup"}"
      onblur="${this}" onfocus="${this}"
      onkeydown="${this}" onmousedown="${this}"
    >${"+ " + i18n.getMessage(buttonText)}</button>
    <ul
      role="listbox"
      tabindex="-1"
      id="${id + "popup"}"
      aria-labelledby="${id + "label"}"
      hidden="${!expanded}"
      onclick="${this}" onmouseover="${this}"
    >${this._items.map(item =>
    {
      if (item.group)
        return wire()`<li class="group">${item.description}</li>`;

      const itemID = getID(item);
      const selected = !swap && !item.disabled;
      const liDisabled = item.unselectable || (selected && enabled === 1);
      return wire(this, `html:${itemID}`)`
      <li
        id="${itemID}"
        role="option"
        aria-disabled="${swap ? !item.disabled : liDisabled}"
        aria-selected="${selected}"
      >${this.getItemTitle(item)}</li>`;
    })}</ul>`;
  }
}

IOListBox.define("io-list-box");

let resizeTimer = 0;
window.addEventListener("resize", () =>
{
  // debounce the potentially heavy resize at 30 FPS rate
  // which is, at least, twice as slower than standard 60 FPS
  // scheduled when it comes to requestAnimationFrame
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() =>
  {
    resizeTimer = 0;
    for (const ioListBox of $$("io-list-box"))
    {
      // avoid computing the width if there are no items
      // or if the element is inside an invisible tab
      // where such width cannot possibly be computed
      if (!ioListBox.items || isVisible(ioListBox))
        return;

      ioListBox.style.setProperty("--width", "100%");
      // theoretically one rAF should be sufficient
      // https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model
      // but some browser needs double rAF needed to ensure layout changes
      // https://bugs.chromium.org/p/chromium/issues/detail?id=675795
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15469349/
      // https://bugs.webkit.org/show_bug.cgi?id=177484
      requestAnimationFrame(() =>
      {
        requestAnimationFrame(setWidth.bind(ioListBox));
      });
    }
  }, 1000 / 30);
});

// to retrieve a unique ID per item
function getID(item)
{
  // get a unique URL for each known item
  return `li-${item.url.split("").map(
    c => c.charCodeAt(0).toString(32)
  ).join("")}`;
}

// to retrieve an item from an option id
function getItem(id)
{
  return this._items.find(item => (!item.group && getID(item) === id));
}

// private helper
function hover(type, item)
{
  const id = getID(item);
  if (!id)
    return;
  const hovered = $(".hover", this);
  if (hovered)
    hovered.classList.remove("hover");
  const option = $(`#${id}`, this);
  option.classList.add("hover");
  this.label.setAttribute("aria-activedescendant", id);
  const popup = this.popup;
  // if it's the mouse moving, don't auto scroll (annoying)
  if (type !== "mouse" && popup.scrollHeight > popup.clientHeight)
  {
    const scrollBottom = popup.clientHeight + popup.scrollTop;
    const elementBottom = option.offsetTop + option.offsetHeight;
    if (elementBottom > scrollBottom)
    {
      popup.scrollTop = elementBottom - popup.clientHeight;
    }
    else if (option.offsetTop < popup.scrollTop)
    {
      popup.scrollTop = option.offsetTop;
    }
  }
}

// find next available hoverable node
function findNext(el, other)
{
  const first = el;
  do
  {
    el = el[other];
  }
  // skip disabled items and separators/rows without an ID
  while (el && el !== first && !isDisabled.call(this, el));
  return el === first ? null : el;
}

function isDisabled(el)
{
  return el.id && getItem.call(this, el.id).disabled;
}

function isVisible(el)
{
  const cstyle = window.getComputedStyle(el, null);
  return cstyle.getPropertyValue("display") !== "none";
}

function setWidth()
{
  this.style.setProperty("--width", this.label.offsetWidth + "px");
}

},{"./dom":3,"./io-element":6}],12:[function(require,module,exports){
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

const {getDoclink} = require("./common");
const {setElementLinks} = require("./i18n");
const IOElement = require("./io-element");

class IOPopout extends IOElement
{
  static get observedAttributes()
  {
    return ["anchor-icon", "expanded", "i18n-body", "i18n-doclinks", "type"];
  }

  created()
  {
    this._children = Array.from(this.children);
    this.addEventListener("blur", this);
    this.addEventListener("click", this);
    this.setAttribute("tabindex", 0);
  }

  attributeChangedCallback()
  {
    this.render();
  }

  onblur(ev)
  {
    if (ev.relatedTarget && this.contains(ev.relatedTarget))
      return;

    this.expanded = null;
  }

  onclick(ev)
  {
    const {target} = ev;

    if (target.classList.contains("wrapper"))
    {
      ev.preventDefault();

      if (this.expanded)
      {
        this.expanded = null;
      }
      else if (this.type == "dialog" || this.type == "tooltip")
      {
        const {bottom, top} = ev.target.getBoundingClientRect();
        const {clientHeight} = document.documentElement;
        this.expanded = (clientHeight - bottom > top) ? "below" : "above";
      }
      else
      {
        this.expanded = "start";
      }
    }
    else if (target.nodeName == "A" || target.nodeName == "BUTTON")
    {
      this.expanded = null;
    }
  }

  render()
  {
    const {wire} = IOPopout;

    const role = this.type || "tooltip";
    const content = [];

    if (role == "dialog" || role == "tooltip")
    {
      content.push(wire(this, ":close")`
        <button class="icon close secondary"></button>
      `);
    }

    if (this.i18nBody)
    {
      const body = wire(this, ":body")`
        <p>${{i18n: this.i18nBody}}</p>
      `;

      // Support for link elements in the body is given through the mapping
      // of comma-separated values of `i18n-doclinks` popout dataset property
      // and the corresponding indexed anchor descendants.
      const {i18nDoclinks} = this.dataset;
      if (i18nDoclinks)
      {
        Promise.all(i18nDoclinks.split(",").map(getDoclink)).then(links =>
        {
          setElementLinks(body, ...links);
        });
      }

      content.push(body);
    }

    content.push(...this._children);

    this.html`
    <div class="wrapper icon">
      <div role="${role}" aria-hidden="${!this.expanded}">
        ${content}
      </div>
    </div>
    `;
  }
}

IOPopout.define("io-popout");

},{"./common":2,"./i18n":4,"./io-element":6}],13:[function(require,module,exports){
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

const IOElement = require("./io-element");
const {relativeCoordinates} = require("./dom");

const {isLeftClick} = IOElement.utils.event;

class IOScrollbar extends IOElement
{
  static get observedAttributes()
  {
    return ["direction", "position", "size"];
  }

  created()
  {
    this.addEventListener(
      "click",
      (event) =>
      {
        // ignore clicks on the slider or right clicks
        if (event.target !== this || !isLeftClick(event))
          return;
        // prevents clicks action on the component
        // after dragging the slider so that it won't
        // be re-positioned again on click coordinates
        if (this._dragging)
        {
          this._dragging = false;
          return;
        }
        const {x, y} = relativeCoordinates(event);
        if (this.direction === "horizontal")
          setPosition.call(this, x - (this._sliderSize / 2));
        else if (this.direction === "vertical")
          setPosition.call(this, y - (this._sliderSize / 2));
        this.dispatchEvent(new CustomEvent("scroll"));
      }
    );
    this.addEventListener(
      "wheel",
      (event) =>
      {
        stopEvent(event);
        let delta = 0;
        if (this.direction === "vertical")
          delta = event.deltaY;
        else if (this.direction === "horizontal")
          delta = event.deltaX;
        // this extra delta transformation is mostly needed for MS Edge
        // but it works OK in every other browser too
        delta = delta * this._sliderSize / this.size;
        setPosition.call(this, this.position + delta);
        this.dispatchEvent(new CustomEvent("scroll"));
      },
      {passive: false}
    );
  }

  get defaultState()
  {
    return {
      direction: "",
      position: 0,
      size: 0
    };
  }

  get direction()
  {
    return this.state.direction;
  }

  // can be (ignore case) horizontal or vertical
  set direction(value)
  {
    value = value.toLowerCase();
    this.setState({direction: value});
    this.setAttribute("direction", value);
    // trigger eventual size recalculation
    sizeChange.call(this);
  }

  get position()
  {
    return this.state.position || 0;
  }

  set position(value)
  {
    if (!this._elSize)
      return;
    setPosition.call(this, value);
  }

  // read-only: the amount of positions covered by the slider
  get range()
  {
    return this._elSize - this._sliderSize;
  }

  get size()
  {
    return this.state.size;
  }

  set size(value)
  {
    this.setState({size: parseInt(value, 10)});
    sizeChange.call(this);
  }

  onmousedown(event)
  {
    if (!isLeftClick(event))
      return;
    this._dragging = true;
    this._coords = {
      x: event.clientX,
      y: event.clientY
    };
    const slider = event.currentTarget;
    const doc = slider.ownerDocument;
    // use the document as source of mouse events truth
    // use true as third option to intercept before bubbling
    doc.addEventListener("mousemove", this, true);
    doc.addEventListener("mouseup", this, true);
    // also prevents selection like a native scrollbar would
    // (this is specially needed for Firefox and Edge)
    doc.addEventListener("selectstart", stopEvent, true);
  }

  onmousemove(event)
  {
    const {x, y} = this._coords;
    if (this.direction === "horizontal")
    {
      const {clientX} = event;
      setPosition.call(this, this.position + clientX - x);
      this._coords.x = clientX;
    }
    else if (this.direction === "vertical")
    {
      const {clientY} = event;
      setPosition.call(this, this.position + clientY - y);
      this._coords.y = clientY;
    }
    this.dispatchEvent(new CustomEvent("scroll"));
  }

  onmouseup(event)
  {
    if (!isLeftClick(event))
      return;
    const {currentTarget: doc, target} = event;
    doc.removeEventListener("mousemove", this, true);
    doc.removeEventListener("mouseup", this, true);
    doc.removeEventListener("selectstart", stopEvent, true);
    // stop dragging if mouseup happens outside this component
    // or within this component slider (the only child)
    // otherwise let the click handler ignore the action
    // which happens through the component itself
    if (target !== this || target === this.child)
      this._dragging = false;
  }

  render()
  {
    // the component and its slider are styled 100% through CSS, i.e.
    // io-scrollbar[direction="vertical"] > .slider {}
    this.html`<div
      class="slider"
      onmousedown="${this}"
    />`;
  }
}

IOScrollbar.define("io-scrollbar");

module.exports = IOScrollbar;

function setPosition(value)
{
  this.setState({
    position: Math.max(
      0,
      Math.min(
        parseFloat(value),
        this.range
      )
    )
  });
  this.style.setProperty(
    "--position",
    this.state.position + "px"
  );
}

function sizeChange()
{
  if (this.direction === "horizontal")
    this._elSize = this.clientWidth;
  else if (this.direction === "vertical")
    this._elSize = this.clientHeight;
  this._sliderSize = Math.floor(
    Math.min(1, this._elSize / this.state.size) * this._elSize
  );
  if (this.direction === "horizontal")
    this._sliderSize = Math.max(this._sliderSize, this.clientHeight);
  else if (this.direction === "vertical")
    this._sliderSize = Math.max(this._sliderSize, this.clientWidth);
  this.style.setProperty("--slider-size", this._sliderSize + "px");
  // trigger eventual position recalculation
  // once this._elSize change
  // set again the style to re-position the scroller
  setPosition.call(this, this.position);
}

// if inside a container with its own wheel or mouse events,
// avoid possible backfiring through already handled events.
function stopEvent(event)
{
  event.preventDefault();
  event.stopPropagation();
}

},{"./dom":3,"./io-element":6}],14:[function(require,module,exports){
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

const IOElement = require("./io-element");

class IOToggle extends IOElement
{
  // action, checked, and disabled should be reflected down the button
  static get observedAttributes()
  {
    return ["checked", "disabled"];
  }

  static get booleanAttributes()
  {
    return ["checked", "disabled"];
  }

  attributeChangedCallback()
  {
    this.render();
  }

  created()
  {
    this.addEventListener("click", this);
    this.render();
  }

  onclick(event)
  {
    if (!this.disabled)
    {
      this.checked = !this.checked;
      if (this.ownerDocument.activeElement !== this.child)
      {
        this.child.focus();
      }
      this.firstElementChild.dispatchEvent(new CustomEvent("change", {
        bubbles: true,
        cancelable: true,
        detail: this.checked
      }));
    }
  }

  render()
  {
    this.html`
    <button
      role="checkbox"
      disabled="${this.disabled}"
      aria-checked="${this.checked}"
      aria-disabled="${this.disabled}"
    />`;
  }
}

IOToggle.define("io-toggle");

module.exports = IOToggle;

},{"./io-element":6}],15:[function(require,module,exports){
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

const {$, $$, events} = require("../../dom");

let ignoreFocus = false;

module.exports = {
  closeAddFiltersByURL()
  {
    // if not closed, gives back the focus to the opener being sure it'll close
    if (!isClosed())
    {
      ignoreFocus = false;
      $("[data-action='open-filterlist-by-url']").focus();
    }
  },
  setupAddFiltersByURL()
  {
    const wrapper = $("#filterlist-by-url-wrap");
    wrapper.addEventListener("blur", filtersBlur, true);
    wrapper.addEventListener("keydown", filtersKeydown);

    const opener = $("[data-action='open-filterlist-by-url']", wrapper);
    opener.addEventListener("mousedown", filtersToggle);
    opener.addEventListener("focus", filtersToggle);
    opener.addEventListener("keydown", openerKeys);

    const input = $("input[type='url']", wrapper);
    input.addEventListener("keyup", checkIfValid);
  }
};

function checkIfValid(event)
{
  const {currentTarget} = event;
  const isValid = currentTarget.checkValidity();

  currentTarget.setAttribute("aria-invalid", !isValid);

  let errorText = "";
  if (!isValid)
  {
    const url = currentTarget.value;
    if (url)
    {
      let errorId = null;
      if (!(new RegExp(currentTarget.pattern).test(url)))
      {
        errorId = "options_dialog_import_subscription_location_error_protocol";
      }
      else
      {
        errorId = "options_dialog_import_subscription_location_error";
      }
      errorText = browser.i18n.getMessage(errorId);
    }
  }
  $("#import-list-url ~ .error-msg").textContent = errorText;
}

function filtersBlur()
{
  // needed to ensure there is an eventually focused element to check
  // it sets aria-hidden when focus moves elsewhere
  setTimeout(
    (wrapper) =>
    {
      const {activeElement} = document;
      if (!activeElement || !wrapper.contains(activeElement))
      {
        filtersClose();
      }
    },
    0,
    $("#filterlist-by-url-wrap")
  );
}

function filtersClose()
{
  $("#filterlist-by-url").setAttribute("aria-hidden", "true");
}

function filtersKeydown(event)
{
  // We're only interested in dialog-internal key presses so we ignore any
  // that we might get while the dialog is closed
  if (isClosed())
    return;

  const key = events.key(event);
  if (key !== "Enter" && key !== "Escape")
    return;

  event.preventDefault();
  event.stopPropagation();

  switch (key)
  {
    case "Enter":
      $("[data-action='validate-import-subscription']").click();
      break;
    case "Escape":
      $("[data-action='open-filterlist-by-url']").focus();
      filtersClose();
      break;
  }
}

function filtersOpen()
{
  const element = $("#filterlist-by-url");
  element.removeAttribute("aria-hidden");
  $("input[type='url']", element).focus();
}

function filtersToggle(event)
{
  // prevent mousedown + focus to backfire
  if (ignoreFocus)
  {
    ignoreFocus = false;
    return;
  }

  const {currentTarget} = event;
  const {activeElement} = document;
  ignoreFocus = event.type === "mousedown" && currentTarget !== activeElement;

  if (isClosed())
  {
    event.preventDefault();
    filtersOpen();
  }
  else
  {
    filtersClose();
  }
}

function isClosed()
{
  return $("#filterlist-by-url").getAttribute("aria-hidden") === "true";
}

function openerKeys(event)
{
  switch (events.key(event))
  {
    case " ":
    case "Enter":
      ignoreFocus = false;
      filtersToggle(event);
      break;
  }
}

},{"../../dom":3}],16:[function(require,module,exports){
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

const {
  closeAddFiltersByURL,
  setupAddFiltersByURL
} = require("./add-filters-by-url");
const {
  getPrettyItemTitle,
  getRawItemTitle,
  loadLanguageNames
} = require("./titles");
const api = require("../../api");
const {convertDoclinks, getDoclink, getErrorMessage} = require("../../common");
const {$, $$, events} = require("../../dom");
const {
  initI18n,
  setElementLinks,
  setElementText,
  stripTagsUnsafe
} = require("../../i18n");
require("../../io-filter-table");
require("../../io-list-box");
require("../../io-popout");
require("../../io-toggle");

const ALLOWED_PROTOCOLS = /^(?:data|https):/;

const {port} = api;

let subscriptionsMap = Object.create(null);
let filtersMap = Object.create(null);
let acceptableAdsUrl = null;
let acceptableAdsPrivacyUrl = null;
let isCustomFiltersLoaded = false;
let additionalSubscriptions = [];

const collections = Object.create(null);
const {getMessage} = browser.i18n;
const customFilters = [];
const syncErrorIds = new Map([
  ["synchronize_invalid_url",
   "options_filterList_lastDownload_invalidURL"],
  ["synchronize_connection_error",
   "options_filterList_lastDownload_connectionError"],
  ["synchronize_invalid_data",
   "options_filterList_lastDownload_invalidData"],
  ["synchronize_checksum_mismatch",
   "options_filterList_lastDownload_checksumMismatch"]
]);
const filtersDisabledErrorId = "options_filterList_filtersDisabled";
const subscriptionErrorIds = new Map();
const timestampUI = Symbol();
const allowlistedDomainRegexp = /^@@\|\|([^/:]+)\^\$document$/;
const allowlistedPageRegexp = /^@@\|([^?|]+(?:\?[^|]*)?)\|?\$document$/;
// Period of time in milliseconds
const minuteInMs = 60000;
const hourInMs = 3600000;
const fullDayInMs = 86400000;

convertDoclinks();
initI18n();

const promisedLocaleInfo = browser.runtime.sendMessage({
  type: "app.get",
  what: "localeInfo"
});
const promisedDateFormat = promisedLocaleInfo.then((addonLocale) =>
{
  return new Intl.DateTimeFormat(addonLocale.locale);
}).catch(dispatchError);
const promisedResources = loadResources();

function Collection(details)
{
  this.details = details;
  this.items = [];
}

Collection.prototype._setEmpty = function(table, detail, removeEmpty)
{
  if (removeEmpty)
  {
    const placeholders = $$(".empty-placeholder", table);
    for (const placeholder of placeholders)
      table.removeChild(placeholder);

    execAction(detail.removeEmptyAction, table);
  }
  else
  {
    const {emptyTexts = []} = detail;
    for (const text of emptyTexts)
    {
      const placeholder = document.createElement("li");
      placeholder.className = "empty-placeholder";
      placeholder.textContent = getMessage(text);
      table.appendChild(placeholder);
    }

    execAction(detail.setEmptyAction, table);
  }
};

Collection.prototype._createElementQuery = function(item)
{
  const access = (item.url || item.text).replace(/'/g, "\\'");
  return function(container)
  {
    return $(`[data-access="${access}"]`, container);
  };
};

Collection.prototype._getItemTitle = function(item, i)
{
  if (this.details[i].getItemTitle)
    return this.details[i].getItemTitle(item);

  return getRawItemTitle(item);
};

Collection.prototype._sortItems = function()
{
  this.items.sort((a, b) =>
  {
    // Make sure that Acceptable Ads is always last, since it cannot be
    // disabled, but only be removed. That way it's grouped together with
    // the "Own filter list" which cannot be disabled either at the bottom
    // of the filter lists in the Advanced tab.
    if (a.url && isAcceptableAds(a.url))
      return 1;
    if (b.url && isAcceptableAds(b.url))
      return -1;

    // Make sure that newly added entries always appear on top in descending
    // chronological order
    const aTimestamp = a[timestampUI] || 0;
    const bTimestamp = b[timestampUI] || 0;
    if (aTimestamp || bTimestamp)
      return bTimestamp - aTimestamp;

    const aTitle = this._getItemTitle(a, 0).toLowerCase();
    const bTitle = this._getItemTitle(b, 0).toLowerCase();
    return aTitle.localeCompare(bTitle);
  });
};

Collection.prototype.addItem = function(item)
{
  if (this.items.indexOf(item) >= 0)
    return;

  this.items.push(item);
  this._sortItems();
  for (let j = 0; j < this.details.length; j++)
  {
    const detail = this.details[j];
    const table = $(`#${detail.id}`);
    const template = $("template", table);
    const listItem = document.createElement("li");
    listItem.appendChild(document.importNode(template.content, true));
    listItem.setAttribute("aria-label", this._getItemTitle(item, j));
    listItem.setAttribute("data-recommended", item.recommended);
    listItem.setAttribute("data-access", item.url || item.text);
    listItem.setAttribute("role", "section");

    const tooltip = $("io-popout[type='tooltip']", listItem);
    if (tooltip)
    {
      let tooltipId = tooltip.dataset.templateI18nBody;
      tooltipId = tooltipId.replace("%value%", item.recommended);
      if (getMessage(tooltipId))
      {
        tooltip.setAttribute("i18n-body", tooltipId);
      }
      if (item.recommended === "cookies")
      {
        tooltip.dataset.i18nDoclinks = "block_cookie_warnings";
      }
    }

    this._setEmpty(table, detail, true);
    if (table.children.length > 0)
      table.insertBefore(listItem, table.children[this.items.indexOf(item)]);
    else
      table.appendChild(listItem);

    this.updateItem(item);
  }
  return length;
};

Collection.prototype.removeItem = function(item)
{
  const index = this.items.indexOf(item);
  if (index == -1)
    return;

  this.items.splice(index, 1);
  const getListElement = this._createElementQuery(item);
  for (const detail of this.details)
  {
    const table = $(`#${detail.id}`);
    const element = getListElement(table);

    // Element gets removed so make sure to handle focus appropriately
    const control = $(".control", element);
    if (control && control == document.activeElement)
    {
      if (!focusNextElement(element.parentElement, control))
      {
        // Fall back to next focusable element within same tab or dialog
        let focusableElement = element.parentElement;
        while (focusableElement)
        {
          if (focusableElement.classList.contains("tab-content") ||
              focusableElement.classList.contains("dialog-content"))
            break;

          focusableElement = focusableElement.parentElement;
        }
        focusNextElement(focusableElement || document, control);
      }
    }

    element.parentElement.removeChild(element);
    if (this.items.length == 0)
      this._setEmpty(table, detail);
  }
};

Collection.prototype.updateItem = function(item)
{
  const oldIndex = this.items.indexOf(item);
  if (oldIndex === -1)
    return;

  this._sortItems();
  const access = (item.url || item.text).replace(/'/g, "\\'");
  for (let i = 0; i < this.details.length; i++)
  {
    const table = $(`#${this.details[i].id}`);
    const element = $(`[data-access="${access}"]`, table);
    const title = this._getItemTitle(item, i);
    const displays = $$("[data-display]", element);
    for (let j = 0; j < displays.length; j++)
    {
      if (item[displays[j].dataset.display])
        displays[j].textContent = item[displays[j].dataset.display];
      else
        displays[j].textContent = title;
    }

    element.setAttribute("aria-label", title);
    if (this.details[i].searchable)
      element.setAttribute("data-search", title.toLowerCase());

    const controls = $$(
      `.control[role='checkbox'],
      io-toggle.control`,
      element
    );
    for (const control of controls)
    {
      const checked = !item.disabled;
      if (control.matches("io-toggle"))
        control.checked = checked;
      else
        control.setAttribute("aria-checked", checked);
      if (isAcceptableAds(item.url) && this == collections.filterLists)
      {
        control.disabled = true;
        control.setAttribute("aria-hidden", true);
      }
    }
    if (additionalSubscriptions.includes(item.url))
    {
      element.classList.add("preconfigured");
      const disablePreconfigures =
        $$("[data-disable~='preconfigured']", element);
      for (const disablePreconfigure of disablePreconfigures)
        disablePreconfigure.disabled = true;
    }

    const lastUpdateElement = $(".last-update", element);
    if (lastUpdateElement)
    {
      element.classList.remove("show-message");
      cleanSyncErrorIdsFromSubscription(item.url);
      if (item.downloading)
      {
        const text = getMessage("options_filterList_lastDownload_inProgress");
        $(".message", element).textContent = text;
        element.classList.add("show-message");
      }
      else if (item.downloadStatus != "synchronize_ok")
      {
        // Core doesn't tell us why the URL is invalid so we have to check
        // ourselves whether the filter list is using a supported protocol
        // https://gitlab.com/eyeo/adblockplus/adblockpluscore/blob/d3f6b1b7e3880eab6356b132493a4a947c87d33f/lib/downloader.js#L270
        if (item.downloadStatus === "synchronize_invalid_url" &&
            !ALLOWED_PROTOCOLS.test(item.url))
        {
          addErrorIdToSubscription(
            item.url,
            "options_filterList_lastDownload_invalidURLProtocol"
          );
        }
        else
        {
          const errorId = syncErrorIds.get(item.downloadStatus) ||
                          item.downloadStatus;
          if (errorId)
            addErrorIdToSubscription(item.url, errorId);
        }
      }
      else if (item.lastDownload > 0)
      {
        const lastUpdate = item.lastDownload * 1000;
        const sinceUpdate = Date.now() - lastUpdate;
        if (sinceUpdate > fullDayInMs)
        {
          const lastUpdateDate = new Date(item.lastDownload * 1000);
          promisedDateFormat.then((dateFormat) =>
          {
            lastUpdateElement.textContent = dateFormat.format(lastUpdateDate);
          });
        }
        else if (sinceUpdate > hourInMs)
        {
          lastUpdateElement.textContent =
            getMessage("options_filterList_hours");
        }
        else if (sinceUpdate > minuteInMs)
        {
          lastUpdateElement.textContent =
            getMessage("options_filterList_minutes");
        }
        else
        {
          lastUpdateElement.textContent =
            getMessage("options_filterList_now");
        }
      }

      updateErrorTooltip(element, subscriptionErrorIds.get(item.url));
    }

    const websiteElement = $("io-popout .website", element);
    if (websiteElement)
    {
      if (item.homepage)
        websiteElement.setAttribute("href", item.homepage);
      websiteElement.setAttribute("aria-hidden", !item.homepage);
    }

    const sourceElement = $("io-popout .source", element);
    if (sourceElement)
      sourceElement.setAttribute("href", item.url);

    const newIndex = this.items.indexOf(item);
    if (oldIndex != newIndex)
      table.insertBefore(element, table.childNodes[newIndex]);
  }
};

Collection.prototype.clearAll = function()
{
  this.items = [];
  for (const detail of this.details)
  {
    const table = $(`#${detail.id}`);
    let element = table.firstChild;
    while (element)
    {
      if (element.tagName == "LI" && !element.classList.contains("static"))
        table.removeChild(element);
      element = element.nextElementSibling;
    }

    this._setEmpty(table, detail);
  }
};

function focusNextElement(container, currentElement)
{
  let focusables = $$("a, button, input, .control", container);
  focusables = Array.prototype.slice.call(focusables);
  let index = focusables.indexOf(currentElement);
  index += (index == focusables.length - 1) ? -1 : 1;

  const nextElement = focusables[index];
  if (!nextElement)
    return false;

  nextElement.focus();
  return true;
}

collections.recommendedList = new Collection([
  {
    id: "recommended-list-table",
    getItemTitle: (item) => getPrettyItemTitle(item, false)
  }
]);
collections.langs = new Collection([
  {
    id: "blocking-languages-table",
    emptyTexts: ["options_language_empty"],
    getItemTitle: (item) => getPrettyItemTitle(item, false)
  }
]);
collections.more = new Collection([
  {
    id: "more-list-table",
    setEmptyAction: "hide-more-filters-section",
    removeEmptyAction: "show-more-filters-section"
  }
]);
collections.allowlist = new Collection([
  {
    id: "allowlisting-table",
    emptyTexts: ["options_allowlist_empty_1", "options_allowlist_empty_2"]
  }
]);
collections.filterLists = new Collection([
  {
    id: "all-filter-lists-table",
    emptyTexts: ["options_filterList_empty"]
  }
]);

function addSubscription(subscription)
{
  const {disabled, recommended, url} = subscription;
  let collection = null;
  switch (recommended)
  {
    case "ads":
      if (disabled == false)
        collection = collections.langs;

      const ioListBox = $("#languages-box");
      ioListBox.items = ioListBox.items.concat(subscription);
      break;
    case "cookies":
    case "notifications":
    case "privacy":
    case "social":
      collection = collections.recommendedList;
      break;
    default:
      if (typeof recommended === "undefined" &&
          !isAcceptableAds(url) &&
          disabled == false)
        collection = collections.more;
      break;
  }

  if (collection)
  {
    collection.addItem(subscription);
  }

  subscriptionsMap[url] = subscription;
}

function updateSubscription(subscription)
{
  for (const name in collections)
    collections[name].updateItem(subscription);

  if (subscription.recommended == "ads")
  {
    if (subscription.disabled)
      collections.langs.removeItem(subscription);
    else
      collections.langs.addItem(subscription);
  }
  else if (!subscription.recommended && !isAcceptableAds(subscription.url))
  {
    if (subscription.disabled == false)
    {
      collections.more.addItem(subscription);
    }
    else
    {
      collections.more.removeItem(subscription);
    }
  }

  if (!(subscription.url in subscriptionsMap))
  {
    subscriptionsMap[subscription.url] = subscription;
  }
}

function updateFilter(filter)
{
  let allowlistTitle = null;

  const domainMatch = filter.text.match(allowlistedDomainRegexp);
  if (domainMatch && !filtersMap[filter.text])
  {
    allowlistTitle = domainMatch[1];
  }
  else
  {
    const pageMatch = filter.text.match(allowlistedPageRegexp);
    if (pageMatch && !filtersMap[filter.text])
    {
      const url = pageMatch[1];
      allowlistTitle = url.replace(/^[\w-]+:\/+(?:www\.)?/, "");
      if (/\?$/.test(allowlistTitle))
      {
        allowlistTitle += "…";
      }
    }
  }

  if (allowlistTitle)
  {
    filter.title = allowlistTitle;
    collections.allowlist.addItem(filter);
    if (isCustomFiltersLoaded)
    {
      const text = getMessage("options_allowlist_notification", [filter.title]);
      showNotification(text, "info");
    }
  }
  else
  {
    customFilters.push(filter);
  }

  filtersMap[filter.text] = filter;
}

function loadCustomFilters(filters)
{
  for (const filter of filters)
    updateFilter(filter);

  const cfTable = $("#custom-filters io-filter-table");
  cfTable.filters = customFilters;
}

function removeCustomFilter(text)
{
  const index = customFilters.findIndex(filter => filter.text === text);
  if (index >= 0)
    customFilters.splice(index, 1);
}

async function loadResources()
{
  const subscriptions = [];

  try
  {
    await loadLanguageNames();

    const recommendations = await api.app.get("recommendations");
    for (const recommendation of recommendations)
    {
      const subscription = {
        disabled: true,
        downloadStatus: null,
        homepage: null,
        languages: recommendation.languages,
        recommended: recommendation.type,
        title: recommendation.title,
        url: recommendation.url
      };

      subscriptions.push(subscription);
      addSubscription(subscription);
    }
  }
  catch (ex)
  {
    dispatchError(ex);
  }

  return {recommendations: subscriptions};
}

function findParentData(element, dataName, returnElement)
{
  element = element.closest(`[data-${dataName}]`);
  if (!element)
    return null;
  if (returnElement)
    return element;
  return element.getAttribute(`data-${dataName}`);
}

function sendMessageHandleErrors(message, onSuccess)
{
  browser.runtime.sendMessage(message).then(errors =>
  {
    if (errors.length > 0)
    {
      errors = errors.map(getErrorMessage);
      alert(stripTagsUnsafe(errors.join("\n")));
    }
    else if (onSuccess)
      onSuccess();
  });
}

function switchTab(id)
{
  location.hash = id;
}

function execAction(action, element)
{
  if (element.getAttribute("aria-disabled") == "true")
    return false;

  switch (action)
  {
    case "add-domain-exception":
      addAllowlistedDomain();
      return true;
    case "add-language-subscription":
      addEnableSubscription(findParentData(element, "access", false));
      return true;
    case "add-predefined-subscription": {
      const dialog = $("#dialog-content-predefined");
      const title = $(".title > span", dialog).textContent;
      const url = $(".url > a", dialog).textContent;
      addEnableSubscription(url, title);
      closeDialog();
      return true;
    }
    case "change-language-subscription":
      changeLanguageSubscription(findParentData(element, "access", false));
      return true;
    case "close-dialog":
      closeDialog();
      return true;
    case "hide-more-filters-section":
      $("#more-filters").setAttribute("aria-hidden", true);
      return true;
    case "hide-acceptable-ads-survey":
      $("#acceptable-ads-why-not").setAttribute("aria-hidden", true);
      return false;
    case "hide-notification":
      hideNotification();
      return true;
    case "import-subscription": {
      const url = $("#blockingList-textbox").value;
      addEnableSubscription(url);
      closeDialog();
      return true;
    }
    case "open-dialog": {
      const dialog = findParentData(element, "dialog", false);
      openDialog(dialog);
      return true;
    }
    case "close-filterlist-by-url":
      closeAddFiltersByURL();
      return true;
    case "open-languages-box":
      const ioListBox = $("#languages-box");
      ioListBox.swap = true;
      $("button", ioListBox).focus();
      return true;
    case "remove-filter":
      browser.runtime.sendMessage({
        type: "filters.remove",
        text: findParentData(element, "access", false)
      });
      return true;
    case "remove-subscription":
      browser.runtime.sendMessage({
        type: "subscriptions.remove",
        url: findParentData(element, "access", false)
      });
      return true;
    case "show-more-filters-section":
      $("#more-filters").setAttribute("aria-hidden", false);
      return true;
    case "switch-acceptable-ads":
      const value = element.value || element.dataset.value;
      // User check the checkbox
      const shouldCheck = element.getAttribute("aria-checked") != "true";
      let installAcceptableAds = false;
      let installAcceptableAdsPrivacy = false;
      // Acceptable Ads checkbox clicked
      if (value == "ads")
      {
        installAcceptableAds = shouldCheck;
      }
      // Privacy Friendly Acceptable Ads checkbox clicked
      else
      {
        installAcceptableAdsPrivacy = shouldCheck;
        installAcceptableAds = !shouldCheck;
      }

      browser.runtime.sendMessage({
        type: installAcceptableAds ? "subscriptions.add" :
          "subscriptions.remove",
        url: acceptableAdsUrl
      });
      browser.runtime.sendMessage({
        type: installAcceptableAdsPrivacy ? "subscriptions.add" :
          "subscriptions.remove",
        url: acceptableAdsPrivacyUrl
      });
      return true;
    case "switch-tab":
      switchTab(element.getAttribute("href").substr(1));
      return true;
    case "enable-filters":
      const url = findParentData(element, "access", false);
      const subscription = subscriptionsMap[url];
      browser.runtime.sendMessage({
        type: "subscriptions.enableAllFilters",
        url
      }).then(() => updateSubscription(subscription));
      return true;
    case "toggle-disable-subscription":
      browser.runtime.sendMessage({
        type: "subscriptions.toggle",
        keepInstalled: true,
        url: findParentData(element, "access", false)
      });
      return true;
    case "toggle-pref":
      browser.runtime.sendMessage({
        type: "prefs.toggle",
        key: findParentData(element, "pref", false)
      });
      return true;
    case "toggle-remove-subscription":
      const subscriptionUrl = findParentData(element, "access", false);
      if (element.getAttribute("aria-checked") == "true")
      {
        browser.runtime.sendMessage({
          type: "subscriptions.remove",
          url: subscriptionUrl
        });
      }
      else
        addEnableSubscription(subscriptionUrl);
      return true;
    case "update-all-subscriptions":
      browser.runtime.sendMessage({
        type: "subscriptions.update"
      });
      return true;
    case "update-subscription":
      browser.runtime.sendMessage({
        type: "subscriptions.update",
        url: findParentData(element, "access", false)
      });
      return true;
    case "validate-import-subscription":
      const form = findParentData(element, "validation", true);
      if (!form)
        return;

      if (form.checkValidity())
      {
        addEnableSubscription($("#import-list-url", form).value);
        form.reset();
        closeAddFiltersByURL();
      }
      else
      {
        $(":invalid", form).focus();
      }
      return true;
  }

  return false;
}

function execActions(actions, element)
{
  actions = actions.split(",");
  let foundAction = false;

  for (const action of actions)
  {
    foundAction |= execAction(action, element);
  }

  return !!foundAction;
}

function changeLanguageSubscription(url)
{
  for (const key in subscriptionsMap)
  {
    const subscription = subscriptionsMap[key];
    const subscriptionType = subscription.recommended;
    if (subscriptionType == "ads" && subscription.disabled == false)
    {
      browser.runtime.sendMessage({
        type: "subscriptions.remove",
        url: subscription.url
      });
      browser.runtime.sendMessage({
        type: "subscriptions.add",
        url
      });
      break;
    }
  }
}

function onClick(e)
{
  const actions = findParentData(e.target, "action", false);
  if (!actions)
    return;

  const foundAction = execActions(actions, e.target);
  if (foundAction)
  {
    e.preventDefault();
  }
}

function onKeyUp(e)
{
  const key = events.key(e);
  let element = document.activeElement;
  if (!key || !element)
    return;

  const container = findParentData(element, "action", true);
  if (!container || !container.hasAttribute("data-keys"))
    return;

  const keys = container.getAttribute("data-keys").split(" ");
  if (keys.indexOf(key) < 0)
    return;

  if (element.getAttribute("role") == "tab")
  {
    let parent = element.parentElement;
    if (key == "ArrowLeft" || key == "ArrowUp")
      parent = parent.previousElementSibling || container.lastElementChild;
    else if (key == "ArrowRight" || key == "ArrowDown")
      parent = parent.nextElementSibling || container.firstElementChild;
    element = parent.firstElementChild;
  }

  const actions = container.getAttribute("data-action");
  const foundAction = execActions(actions, element);
  if (foundAction)
  {
    e.preventDefault();
  }
}

function selectTabItem(tabId, container, focus)
{
  // Show tab content
  document.body.setAttribute("data-tab", tabId);

  // Select tab
  const tabList = $("[role='tablist']", container);
  if (!tabList)
    return null;

  const previousTab = $("[aria-selected]", tabList);
  previousTab.removeAttribute("aria-selected");
  previousTab.setAttribute("tabindex", -1);

  const tab = $(`a[href="#${tabId}"]`, tabList);
  tab.setAttribute("aria-selected", true);
  tab.setAttribute("tabindex", 0);

  const tabContentId = tab.getAttribute("aria-controls");
  const tabContent = document.getElementById(tabContentId);

  if (tab && focus)
    tab.focus();

  if (tabId === "advanced")
  {
    setupFiltersBox();
    setupAddFiltersByURL();
  }
  return tabContent;
}

function onHashChange()
{
  const hash = location.hash.substr(1);
  if (!hash)
    return;

  // Select tab and parent tabs
  const tabIds = hash.split("-");
  let tabContent = document.body;
  for (let i = 0; i < tabIds.length; i++)
  {
    const tabId = tabIds.slice(0, i + 1).join("-");
    tabContent = selectTabItem(tabId, tabContent, true);
    if (!tabContent)
      break;
  }
}

function setupFiltersBox()
{
  const ioListBox = $("#filters-box");

  if (!ioListBox.items.length)
  {
    ioListBox.getItemTitle = (item) => getPrettyItemTitle(item, true);
    ioListBox.addEventListener("change", (event) =>
    {
      const item = event.detail;
      addEnableSubscription(item.url, item.title, item.homepage);
    });
  }

  promisedResources.then(({recommendations}) =>
  {
    ioListBox.items = getListBoxItems(recommendations);
  });
}

function getListBoxItems(subscriptions)
{
  const urls = new Set();
  for (const subscription of collections.filterLists.items)
    urls.add(subscription.url);

  const groups = {
    ads: [],
    others: []
  };

  for (const subscription of subscriptions)
  {
    const {recommended, url} = subscription;
    const key = recommended === "ads" ? recommended : "others";
    const label = getPrettyItemTitle(subscription, true);
    const selected = urls.has(url);
    const overrides = {unselectable: selected, label, selected};
    groups[key].push(Object.assign({}, subscription, overrides));
  }

  // items ordered with groups
  return [
    ...groups.others,
    {
      type: "ads",
      group: true,
      description: browser.i18n.getMessage("options_language_filter_list")
    },
    ...groups.ads
  ];
}

function setupLanguagesBox()
{
  const ioListBox = $("#languages-box");
  ioListBox.getItemTitle = (item) => getPrettyItemTitle(item, false);
  ioListBox.addEventListener("close", (event) =>
  {
    ioListBox.swap = false;
  });
  ioListBox.addEventListener("change", (event) =>
  {
    const item = event.detail;
    if (ioListBox.swap)
      changeLanguageSubscription(item.url);
    else
    {
      item.disabled = !item.disabled;
      addEnableSubscription(item.url, item.title, item.homepage);
    }
  });
}

function onDOMLoaded()
{
  setupLanguagesBox();
  populateLists().catch(dispatchError);
  populateFilters().catch(dispatchError);

  // Initialize navigation sidebar
  browser.runtime.sendMessage({
    type: "app.get",
    what: "addonVersion"
  }).then(addonVersion =>
  {
    $("#abp-version").textContent = getMessage(
      "options_dialog_about_version",
      [addonVersion]
    );
  });

  // Initialize interactive UI elements
  document.body.addEventListener("click", onClick, false);
  document.body.addEventListener("keyup", onKeyUp, false);
  $("#allowlisting-textbox").addEventListener("keyup", (e) =>
  {
    $("#allowlisting-add-button").disabled = !e.target.value;
  }, false);

  $$("li[data-pref]").forEach(async(option) =>
  {
    const key = option.dataset.pref;
    const value = await getPref(key);
    onPrefMessage(key, value, true);
  });

  // General tab
  getDoclink("acceptable_ads_criteria").then(link =>
  {
    setElementLinks("enable-acceptable-ads-description", link);
  });
  getDoclink("imprint").then((url) =>
  {
    setElementText(
      $("#copyright"),
      "options_dialog_about_copyright",
      [new Date().getFullYear()]
    );
    setElementLinks("copyright", url);
  });
  getDoclink("privacy").then((url) =>
  {
    $("#privacy-policy").href = url;
  });
  getDoclink("language_subscription").then((url) =>
  {
    setElementLinks("blocking-languages-description", url);
  });
  setElementText(
    $("#tracking-warning-1"),
    "options_tracking_warning_1",
    [
      getMessage("common_feature_privacy_title"),
      getMessage("options_acceptableAds_ads_label")
    ]
  );
  setElementText(
    $("#tracking-warning-3"),
    "options_tracking_warning_3",
    [getMessage("options_acceptableAds_privacy_label")]
  );

  getDoclink("adblock_plus_{browser}_dnt").then(url =>
  {
    setElementLinks("dnt", url);
  });
  getDoclink("acceptable_ads_survey").then(url =>
  {
    $("#acceptable-ads-why-not a.primary").href = url;
  });

  // Advanced tab
  browser.runtime.sendMessage({
    type: "app.get",
    what: "features"
  }).then(features =>
  {
    hidePref("show_devtools_panel", !features.devToolsPanel);
  });

  getDoclink("filterdoc").then(link =>
  {
    setElementLinks("custom-filters-description", link);
  });

  // Help tab
  getDoclink("help_center_abp_en").then(link =>
  {
    setElementLinks("help-center", link);
  });
  getDoclink("adblock_plus_report_bug").then(link =>
  {
    setElementLinks("report-bug", link);
  });
  getDoclink("{browser}_support").then(url =>
  {
    setElementLinks("visit-forum", url);
  });

  api.app.getInfo().then(({application, store}) =>
  {
    document.documentElement.dataset.application = application;

    // We need to restrict this feature to certain browsers for which we
    // have a link to where users can rate us
    if (!["chrome", "chromium", "opera", "firefox"].includes(application))
    {
      $("#support-us").setAttribute("aria-hidden", true);
      return;
    }

    api.doclinks.get(`${store}_review`).then((url) =>
    {
      $("#support-us a[data-i18n='options_rating_button']").href = url;
    });
  });

  $("#dialog").addEventListener("keydown", function(e)
  {
    switch (events.key(e))
    {
      case "Escape":
        closeDialog();
        break;
      case "Tab":
        if (e.shiftKey)
        {
          if (e.target.classList.contains("focus-first"))
          {
            e.preventDefault();
            $(".focus-last", this).focus();
          }
        }
        else if (e.target.classList.contains("focus-last"))
        {
          e.preventDefault();
          $(".focus-first", this).focus();
        }
        break;
    }
  }, false);

  onHashChange();
}

let focusedBeforeDialog = null;
function openDialog(name)
{
  const dialog = $("#dialog");
  dialog.setAttribute("aria-hidden", false);
  dialog.setAttribute("aria-labelledby", `dialog-title-${name}`);
  dialog.setAttribute("aria-describedby", `dialog-description-${name}`);
  document.body.setAttribute("data-dialog", name);

  let defaultFocus = $(`#dialog-content-${name} .default-focus`);
  if (!defaultFocus)
    defaultFocus = $(".focus-first", dialog);
  focusedBeforeDialog = document.activeElement;
  defaultFocus.focus();
}

function closeDialog()
{
  const dialog = $("#dialog");
  dialog.setAttribute("aria-hidden", true);
  dialog.removeAttribute("aria-labelledby");
  document.body.removeAttribute("data-dialog");
  focusedBeforeDialog.focus();
}

function showNotification(text, kind)
{
  const notification = $("#notification");
  notification.setAttribute("aria-hidden", false);
  $("#notification-text", notification).textContent = text;
  notification.classList.add(kind);
  notification.addEventListener("animationend", hideNotification);
}

function hideNotification()
{
  const notification = $("#notification");
  notification.classList.remove("info", "error");
  notification.setAttribute("aria-hidden", true);
  $("#notification-text", notification).textContent = "";
}

function setAcceptableAds()
{
  const acceptableAdsForm = $("#acceptable-ads");
  const acceptableAds = $("#acceptable-ads-allow");
  const acceptableAdsPrivacy = $("#acceptable-ads-privacy-allow");
  const wasSelected = acceptableAds.getAttribute("aria-checked") === "true";
  acceptableAdsForm.classList.remove("show-dnt-notification");
  acceptableAds.setAttribute("aria-checked", false);
  acceptableAdsPrivacy.setAttribute("aria-checked", false);
  acceptableAdsPrivacy.setAttribute("tabindex", 0);
  if (acceptableAdsUrl in subscriptionsMap &&
      !subscriptionsMap[acceptableAdsUrl].disabled)
  {
    acceptableAds.setAttribute("aria-checked", true);
    acceptableAdsPrivacy.setAttribute("aria-disabled", false);
  }
  else if (acceptableAdsPrivacyUrl in subscriptionsMap &&
          !subscriptionsMap[acceptableAdsPrivacyUrl].disabled)
  {
    acceptableAds.setAttribute("aria-checked", true);
    acceptableAdsPrivacy.setAttribute("aria-checked", true);
    acceptableAdsPrivacy.setAttribute("aria-disabled", false);

    // Edge uses window instead of navigator.
    // Prefer navigator first since it's the standard.
    if ((navigator.doNotTrack || window.doNotTrack) != 1)
      acceptableAdsForm.classList.add("show-dnt-notification");
  }
  else
  {
    // Using aria-disabled in order to keep the focus
    acceptableAdsPrivacy.setAttribute("aria-disabled", true);
    acceptableAdsPrivacy.setAttribute("tabindex", -1);
  }

  const isSelected = acceptableAds.getAttribute("aria-checked") === "true";
  const aaSurvey = $("#acceptable-ads-why-not");
  if (isSelected)
  {
    aaSurvey.setAttribute("aria-hidden", true);
  }
  else if (wasSelected)
  {
    aaSurvey.setAttribute("aria-hidden", false);
  }
}

function isAcceptableAds(url)
{
  return url == acceptableAdsUrl || url == acceptableAdsPrivacyUrl;
}

function hasPrivacyConflict()
{
  const acceptableAdsList = subscriptionsMap[acceptableAdsUrl];
  let privacyList = null;
  for (const url in subscriptionsMap)
  {
    const subscription = subscriptionsMap[url];
    if (subscription.recommended == "privacy")
    {
      privacyList = subscription;
      break;
    }
  }
  return acceptableAdsList && acceptableAdsList.disabled == false &&
    privacyList && privacyList.disabled == false;
}

function setPrivacyConflict()
{
  const acceptableAdsForm = $("#acceptable-ads");
  if (hasPrivacyConflict())
  {
    getPref("ui_warn_tracking").then((showTrackingWarning) =>
    {
      acceptableAdsForm.classList.toggle("show-warning", showTrackingWarning);
    });
  }
  else
  {
    acceptableAdsForm.classList.remove("show-warning");
  }
}

async function populateFilters()
{
  const filters = await api.filters.get();
  loadCustomFilters([].concat(...filters));
  isCustomFiltersLoaded = true;
}

async function populateLists()
{
  subscriptionsMap = Object.create(null);
  filtersMap = Object.create(null);

  // Empty collections and lists
  for (const property in collections)
    collections[property].clearAll();

  const [
    url,
    privacyUrl,
    additionalSubscriptionUrls,
    subscriptions
  ] = await Promise.all([
    api.app.get("acceptableAdsUrl"),
    api.app.get("acceptableAdsPrivacyUrl"),
    api.prefs.get("additional_subscriptions"),
    api.subscriptions.get()
  ]);

  acceptableAdsUrl = url;
  acceptableAdsPrivacyUrl = privacyUrl;
  additionalSubscriptions = additionalSubscriptionUrls;

  for (const subscription of subscriptions)
    onSubscriptionMessage("added", subscription);

  setAcceptableAds();
}

function addAllowlistedDomain()
{
  const domain = $("#allowlisting-textbox");
  const value = domain.value.trim();

  if (!value)
    return;

  for (const allowlistItem of collections.allowlist.items)
  {
    if (allowlistItem.title == value)
    {
      allowlistItem[timestampUI] = Date.now();
      collections.allowlist.updateItem(allowlistItem);
      domain.value = "";
      break;
    }
  }

  try
  {
    const {host} = new URL(/^https?:/.test(value) ? value : `http://${value}`);
    sendMessageHandleErrors({
      type: "filters.add",
      text: "@@||" + host.toLowerCase() + "^$document"
    });
    domain.value = "";
    $("#allowlisting-add-button").disabled = true;
  }
  catch (error)
  {
    dispatchError(error);
  }
}

function addEnableSubscription(url, title, homepage)
{
  let messageType = null;
  const knownSubscription = subscriptionsMap[url];
  if (knownSubscription && knownSubscription.disabled == true)
    messageType = "subscriptions.toggle";
  else
    messageType = "subscriptions.add";

  const message = {
    type: messageType,
    url
  };
  if (title)
    message.title = title;
  if (homepage)
    message.homepage = homepage;

  browser.runtime.sendMessage(message);
}

function cleanSyncErrorIdsFromSubscription(url)
{
  for (const syncErrorId of syncErrorIds.values())
  {
    removeErrorIdFromSubscription(url, syncErrorId);
  }
}

function addErrorIdToSubscription(url, errorId)
{
  let errorIds = subscriptionErrorIds.get(url);

  if (!errorIds)
  {
    errorIds = new Set();
    subscriptionErrorIds.set(url, errorIds);
  }

  errorIds.add(errorId);
}

function removeErrorIdFromSubscription(url, errorId)
{
  const errorIds = subscriptionErrorIds.get(url);

  if (!errorIds)
    return;

  errorIds.delete(errorId);

  if (errorIds.size === 0)
    subscriptionErrorIds.delete(url);
}

function updateErrorTooltip(element, errorIds)
{
  const errorTooltip = $("io-popout[anchor-icon='error']", element);
  const errorList = $(".error-list", errorTooltip);
  errorList.innerHTML = "";

  if (!errorIds || element.classList.contains("show-message"))
  {
    element.classList.remove("error");
    return;
  }

  for (const errorId of errorIds)
  {
    const listItem = document.createElement("li");
    listItem.textContent = getMessage(errorId) || errorId;
    if (errorId === filtersDisabledErrorId)
    {
      const enableFiltersButton = document.createElement("a");
      enableFiltersButton.textContent = getMessage(
        "options_filterList_enableFilters"
      );
      enableFiltersButton.setAttribute("data-action", "enable-filters");
      listItem.appendChild(enableFiltersButton);
    }
    errorList.appendChild(listItem);
  }

  element.classList.add("error");
}

function onFilterMessage(action, filter)
{
  switch (action)
  {
    case "added":
      filter[timestampUI] = Date.now();
      updateFilter(filter);
      break;
    case "removed":
      const knownFilter = filtersMap[filter.text];
      if (allowlistedDomainRegexp.test(knownFilter.text) ||
          allowlistedPageRegexp.test(knownFilter.text))
        collections.allowlist.removeItem(knownFilter);
      else
        removeCustomFilter(filter.text);

      delete filtersMap[filter.text];
      break;
  }
}

function onSubscriptionMessage(action, subscription, ...args)
{
  // Ensure that recommendations have already been loaded so that we can
  // identify and handle recommended filter lists accordingly (see #6838)
  promisedResources.then(() =>
  {
    if (subscription.url in subscriptionsMap)
    {
      const knownSubscription = subscriptionsMap[subscription.url];
      for (const property in subscription)
      {
        knownSubscription[property] = subscription[property];
      }
      subscription = knownSubscription;
    }

    switch (action)
    {
      case "added":
        const {url} = subscription;
        // Handle custom subscription
        if (/^~user/.test(url))
        {
          loadCustomFilters(subscription.filters);
          return;
        }
        else if (url in subscriptionsMap)
          updateSubscription(subscription);
        else
          addSubscription(subscription);

        if (isAcceptableAds(url))
          setAcceptableAds();

        browser.runtime.sendMessage({
          type: "subscriptions.getDisabledFilterCount",
          url: subscription.url
        }).then(disabledFilterCount =>
        {
          if (disabledFilterCount > 0)
            addErrorIdToSubscription(subscription.url, filtersDisabledErrorId);
          collections.filterLists.addItem(subscription);
          setPrivacyConflict();
        });
        break;
      case "changed":
        updateSubscription(subscription);
        if (isAcceptableAds(subscription.url))
          setAcceptableAds();

        setPrivacyConflict();
        break;
      case "filtersDisabled":
        const filtersDisabled = args[0];
        if (filtersDisabled)
          addErrorIdToSubscription(subscription.url, filtersDisabledErrorId);
        else
        {
          removeErrorIdFromSubscription(
            subscription.url,
            filtersDisabledErrorId
          );
        }
        updateSubscription(subscription);
        break;
      case "removed":
        if (subscription.recommended)
        {
          subscription.disabled = true;
          onSubscriptionMessage("changed", subscription);
        }
        else
        {
          delete subscriptionsMap[subscription.url];
          if (isAcceptableAds(subscription.url))
          {
            setAcceptableAds();
          }
          else
          {
            collections.more.removeItem(subscription);
          }
        }

        subscriptionErrorIds.delete(subscription.url);
        collections.filterLists.removeItem(subscription);
        setPrivacyConflict();
        break;
    }
  }).catch(dispatchError);
}

function hidePref(key, value)
{
  const element = getPrefElement(key);
  if (element)
    element.setAttribute("aria-hidden", value);
}

function getPrefElement(key)
{
  return $(`[data-pref="${key}"]`);
}

function getPref(key)
{
  return browser.runtime.sendMessage({
    type: "prefs.get",
    key
  });
}

function onPrefMessage(key, value, initial)
{
  switch (key)
  {
    case "notifications_ignoredcategories":
      value = value.indexOf("*") == -1;
      break;
    case "ui_warn_tracking":
      setPrivacyConflict();
      break;
  }

  const checkbox = $(`[data-pref="${key}"] button[role="checkbox"]`);
  if (checkbox)
    checkbox.setAttribute("aria-checked", value);
}

port.onMessage.addListener((message) =>
{
  switch (message.type)
  {
    case "app.respond":
      switch (message.action)
      {
        case "addSubscription":
          const subscription = message.args[0];

          let {title, url} = subscription;
          if (!title || title == url)
          {
            title = "";
          }

          if (ALLOWED_PROTOCOLS.test(url))
          {
            const dialog = $("#dialog-content-predefined");
            $(".title > span", dialog).textContent = title;
            $(".title", dialog).hidden = !title;
            const link = $(".url > a", dialog);
            link.href = url;
            link.textContent = url;
            openDialog("predefined");
          }
          else
          {
            openDialog("invalid");
          }
          break;
        case "focusSection":
          let section = message.args[0];
          if (section == "notifications")
          {
            section = "advanced";
            const elem = getPrefElement("notifications_ignoredcategories");
            elem.classList.add("highlight-animate");
            $("button", elem).focus();
          }

          selectTabItem(section, document.body, false);
          break;
      }
      break;
    case "filters.respond":
      onFilterMessage(message.action, message.args[0]);
      break;
    case "prefs.respond":
      onPrefMessage(message.action, message.args[0], false);
      break;
    case "subscriptions.respond":
      onSubscriptionMessage(message.action, ...message.args);
      setupFiltersBox();
      break;
  }
});

port.postMessage({
  type: "app.listen",
  filter: ["addSubscription", "focusSection"]
});
port.postMessage({
  type: "filters.listen",
  filter: ["added", "changed", "removed"]
});
port.postMessage({
  type: "prefs.listen",
  filter: [
    "elemhide_debug",
    "notifications_ignoredcategories",
    "recommend_language_subscriptions",
    "shouldShowBlockElementMenu",
    "show_devtools_panel",
    "show_statsinicon",
    "ui_warn_tracking"
  ]
});
port.postMessage({
  type: "subscriptions.listen",
  filter: ["added", "changed", "filtersDisabled", "removed"]
});

onDOMLoaded();

// We must call port.disconnect because of this Microsoft Edge bug:
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/19011773/
window.addEventListener("unload", () => port.disconnect());
window.addEventListener("hashchange", onHashChange, false);

// Show a generic error message
window.addEventListener(
  "error",
  showNotification.bind(
    null,
    browser.i18n.getMessage("options_generic_error"),
    "error"
  )
);

function dispatchError(error)
{
  if (error)
    window.console.error(error);
  window.dispatchEvent(new CustomEvent("error"));
}

},{"../../api":1,"../../common":2,"../../dom":3,"../../i18n":4,"../../io-filter-table":10,"../../io-list-box":11,"../../io-popout":12,"../../io-toggle":14,"./add-filters-by-url":15,"./titles":17}],17:[function(require,module,exports){
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

const {getMessage} = browser.i18n;

let languageNames = new Map();

function getRawItemTitle(item)
{
  return item.title || item.originalTitle || item.url || item.text;
}
module.exports.getRawItemTitle = getRawItemTitle;

function getLanguageItemTitle(item)
{
  const description = item.languages
    .map((langCode) => languageNames.get(langCode))
    // Remove duplicate language names
    .filter((langName, idx, arr) => arr.indexOf(langName) === idx)
    .reduce(
      (acc, langName, idx) =>
      {
        if (idx === 0)
          return langName;

        return getMessage("options_language_join", [acc, langName]);
      },
      ""
    );

  if (/\+EasyList$/.test(getRawItemTitle(item)))
    return `${description} + ${getMessage("options_english")}`;

  return description;
}

function getPrettyItemTitle(item, includeRaw)
{
  const {recommended} = item;

  let description = null;
  if (recommended === "ads")
  {
    description = getLanguageItemTitle(item);
  }
  else
  {
    description = getMessage(`common_feature_${recommended}_title`);
  }

  if (!description)
    return getRawItemTitle(item);

  if (includeRaw)
    return `${getRawItemTitle(item)} (${description})`;

  return description;
}
module.exports.getPrettyItemTitle = getPrettyItemTitle;

async function loadLanguageNames()
{
  const resp = await fetch("./data/locales.json");
  const localeData = await resp.json();
  languageNames = new Map(Object.entries(localeData.nativeNames));
}
module.exports.loadLanguageNames = loadLanguageNames;

},{}],18:[function(require,module,exports){
/*! (c) Andrea Giammarchi - ISC */
var createContent = (function (document) {'use strict';
  var FRAGMENT = 'fragment';
  var TEMPLATE = 'template';
  var HAS_CONTENT = 'content' in create(TEMPLATE);

  var createHTML = HAS_CONTENT ?
    function (html) {
      var template = create(TEMPLATE);
      template.innerHTML = html;
      return template.content;
    } :
    function (html) {
      var content = create(FRAGMENT);
      var template = create(TEMPLATE);
      var childNodes = null;
      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
        var selector = RegExp.$1;
        template.innerHTML = '<table>' + html + '</table>';
        childNodes = template.querySelectorAll(selector);
      } else {
        template.innerHTML = html;
        childNodes = template.childNodes;
      }
      append(content, childNodes);
      return content;
    };

  return function createContent(markup, type) {
    return (type === 'svg' ? createSVG : createHTML)(markup);
  };

  function append(root, childNodes) {
    var length = childNodes.length;
    while (length--)
      root.appendChild(childNodes[0]);
  }

  function create(element) {
    return element === FRAGMENT ?
      document.createDocumentFragment() :
      document.createElementNS('http://www.w3.org/1999/xhtml', element);
  }

  // it could use createElementNS when hasNode is there
  // but this fallback is equally fast and easier to maintain
  // it is also battle tested already in all IE
  function createSVG(svg) {
    var content = create(FRAGMENT);
    var template = create('div');
    template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
    append(content, template.firstChild.childNodes);
    return content;
  }

}(document));
module.exports = createContent;

},{}],19:[function(require,module,exports){
/*! (c) Andrea Giammarchi - ISC */
var self = {};
self.CustomEvent = typeof CustomEvent === 'function' ?
  CustomEvent :
  (function (__p__) {
    CustomEvent[__p__] = new CustomEvent('').constructor[__p__];
    return CustomEvent;
    function CustomEvent(type, init) {
      if (!init) init = {};
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, !!init.bubbles, !!init.cancelable, init.detail);
      return e;
    }
  }('prototype'));
module.exports = self.CustomEvent;

},{}],20:[function(require,module,exports){
/*! (c) Andrea Giammarchi - ISC */
var self = {};
try { self.Map = Map; }
catch (Map) {
  self.Map = function Map() {
    var i = 0;
    var k = [];
    var v = [];
    return {
      delete: function (key) {
        var had = contains(key);
        if (had) {
          k.splice(i, 1);
          v.splice(i, 1);
        }
        return had;
      },
      forEach: function forEach(callback, context) {
        k.forEach(
          function (key, i)  {
            callback.call(context, v[i], key, this);
          },
          this
        );
      },
      get: function get(key) {
        return contains(key) ? v[i] : void 0;
      },
      has: function has(key) {
        return contains(key);
      },
      set: function set(key, value) {
        v[contains(key) ? i : (k.push(key) - 1)] = value;
        return this;
      }
    };
    function contains(v) {
      i = k.indexOf(v);
      return -1 < i;
    }
  };
}
module.exports = self.Map;

},{}],21:[function(require,module,exports){
/*! (c) Andrea Giammarchi - ISC */
var self = {};
try { self.WeakSet = WeakSet; }
catch (WeakSet) {
  (function (id, dP) {
    var proto = WeakSet.prototype;
    proto.add = function (object) {
      if (!this.has(object))
        dP(object, this._, {value: true, configurable: true});
      return this;
    };
    proto.has = function (object) {
      return this.hasOwnProperty.call(object, this._);
    };
    proto.delete = function (object) {
      return this.has(object) && delete object[this._];
    };
    self.WeakSet = WeakSet;
    function WeakSet() {'use strict';
      dP(this, '_', {value: '_@ungap/weakmap' + id++});
    }
  }(Math.random(), Object.defineProperty));
}
module.exports = self.WeakSet;

},{}],22:[function(require,module,exports){
/*! (c) Andrea Giammarchi - ISC */
var importNode = (function (
  document,
  appendChild,
  cloneNode,
  createTextNode,
  importNode
) {
  var native = importNode in document;
  // IE 11 has problems with cloning templates:
  // it "forgets" empty childNodes. This feature-detects that.
  var fragment = document.createDocumentFragment();
  fragment[appendChild](document[createTextNode]('g'));
  fragment[appendChild](document[createTextNode](''));
  /* istanbul ignore next */
  var content = native ?
    document[importNode](fragment, true) :
    fragment[cloneNode](true);
  return content.childNodes.length < 2 ?
    function importNode(node, deep) {
      var clone = node[cloneNode]();
      for (var
        /* istanbul ignore next */
        childNodes = node.childNodes || [],
        length = childNodes.length,
        i = 0; deep && i < length; i++
      ) {
        clone[appendChild](importNode(childNodes[i], deep));
      }
      return clone;
    } :
    /* istanbul ignore next */
    (native ?
      document[importNode] :
      function (node, deep) {
        return node[cloneNode](!!deep);
      }
    );
}(
  document,
  'appendChild',
  'cloneNode',
  'createTextNode',
  'importNode'
));
module.exports = importNode;

},{}],23:[function(require,module,exports){
var isArray = Array.isArray || /* istanbul ignore next */ (function (toString) {
  /* istanbul ignore next */
  var $ = toString.call([]);
  /* istanbul ignore next */
  return function isArray(object) {
    return toString.call(object) === $;
  };
}({}.toString));
module.exports = isArray;

},{}],24:[function(require,module,exports){
'use strict';
const WeakMap = (require('@ungap/weakmap'));

var isNoOp = typeof document !== 'object';

var templateLiteral = function (tl) {
  var RAW = 'raw';
  var isBroken = function (UA) {
    return /(Firefox|Safari)\/(\d+)/.test(UA) &&
          !/(Chrom[eium]+|Android)\/(\d+)/.test(UA);
  };
  var broken = isBroken((document.defaultView.navigator || {}).userAgent);
  var FTS = !(RAW in tl) ||
            tl.propertyIsEnumerable(RAW) ||
            !Object.isFrozen(tl[RAW]);
  if (broken || FTS) {
    var forever = {};
    var foreverCache = function (tl) {
      for (var key = '.', i = 0; i < tl.length; i++)
        key += tl[i].length + '.' + tl[i];
      return forever[key] || (forever[key] = tl);
    };
    // Fallback TypeScript shenanigans
    if (FTS)
      templateLiteral = foreverCache;
    // try fast path for other browsers:
    // store the template as WeakMap key
    // and forever cache it only when it's not there.
    // this way performance is still optimal,
    // penalized only when there are GC issues
    else {
      var wm = new WeakMap;
      var set = function (tl, unique) {
        wm.set(tl, unique);
        return unique;
      };
      templateLiteral = function (tl) {
        return wm.get(tl) || set(tl, foreverCache(tl));
      };
    }
  } else {
    isNoOp = true;
  }
  return TL(tl);
};

module.exports = TL;

function TL(tl) {
  return isNoOp ? tl : templateLiteral(tl);
}

},{"@ungap/weakmap":27}],25:[function(require,module,exports){
'use strict';
const unique = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/template-literal'));

Object.defineProperty(exports, '__esModule', {value: true}).default = function (template) {
  var length = arguments.length;
  var args = [unique(template)];
  var i = 1;
  while (i < length)
    args.push(arguments[i++]);
  return args;
};

/**
 * best benchmark goes here
 * https://jsperf.com/tta-bench
 * I should probably have an @ungap/template-literal-es too
export default (...args) => {
  args[0] = unique(args[0]);
  return args;
};
 */
},{"@ungap/template-literal":24}],26:[function(require,module,exports){
var trim = ''.trim || /* istanbul ignore next */ function () {
  return String(this).replace(/^\s+|\s+/g, '');
};
module.exports = trim;

},{}],27:[function(require,module,exports){
/*! (c) Andrea Giammarchi - ISC */
var self = {};
try { self.WeakMap = WeakMap; }
catch (WeakMap) {
  // this could be better but 90% of the time
  // it's everything developers need as fallback
  self.WeakMap = (function (id, Object) {'use strict';
    var dP = Object.defineProperty;
    var hOP = Object.hasOwnProperty;
    var proto = WeakMap.prototype;
    proto.delete = function (key) {
      return this.has(key) && delete key[this._];
    };
    proto.get = function (key) {
      return this.has(key) ? key[this._] : void 0;
    };
    proto.has = function (key) {
      return hOP.call(key, this._);
    };
    proto.set = function (key, value) {
      dP(key, this._, {configurable: true, value: value});
      return this;
    };
    return WeakMap;
    function WeakMap(iterable) {
      dP(this, '_', {value: '_@ungap/weakmap' + id++});
      if (iterable)
        iterable.forEach(add, this);
    }
    function add(pair) {
      this.set(pair[0], pair[1]);
    }
  }(Math.random(), Object));
}
module.exports = self.WeakMap;

},{}],28:[function(require,module,exports){
/*! (c) Andrea Giammarchi */
function disconnected(poly) {'use strict';
  var Event = poly.Event;
  var WeakSet = poly.WeakSet;
  var notObserving = true;
  var observer = null;
  return function observe(node) {
    if (notObserving) {
      notObserving = !notObserving;
      observer = new WeakSet;
      startObserving(node.ownerDocument);
    }
    observer.add(node);
    return node;
  };
  function startObserving(document) {
    var connected = new WeakSet;
    var disconnected = new WeakSet;
    try {
      (new MutationObserver(changes)).observe(
        document,
        {subtree: true, childList: true}
      );
    }
    catch(o_O) {
      var timer = 0;
      var records = [];
      var reschedule = function (record) {
        records.push(record);
        clearTimeout(timer);
        timer = setTimeout(
          function () {
            changes(records.splice(timer = 0, records.length));
          },
          0
        );
      };
      document.addEventListener(
        'DOMNodeRemoved',
        function (event) {
          reschedule({addedNodes: [], removedNodes: [event.target]});
        },
        true
      );
      document.addEventListener(
        'DOMNodeInserted',
        function (event) {
          reschedule({addedNodes: [event.target], removedNodes: []});
        },
        true
      );
    }
    function changes(records) {
      for (var
        record,
        length = records.length,
        i = 0; i < length; i++
      ) {
        record = records[i];
        dispatchAll(record.removedNodes, 'disconnected', disconnected, connected);
        dispatchAll(record.addedNodes, 'connected', connected, disconnected);
      }
    }
    function dispatchAll(nodes, type, wsin, wsout) {
      for (var
        node,
        event = new Event(type),
        length = nodes.length,
        i = 0; i < length;
        (node = nodes[i++]).nodeType === 1 &&
        dispatchTarget(node, event, type, wsin, wsout)
      );
    }
    function dispatchTarget(node, event, type, wsin, wsout) {
      if (observer.has(node) && !wsin.has(node)) {
        wsout.delete(node);
        wsin.add(node);
        node.dispatchEvent(event);
        /*
        // The event is not bubbling (perf reason: should it?),
        // hence there's no way to know if
        // stop/Immediate/Propagation() was called.
        // Should DOM Level 0 work at all?
        // I say it's a YAGNI case for the time being,
        // and easy to implement in user-land.
        if (!event.cancelBubble) {
          var fn = node['on' + type];
          if (fn)
            fn.call(node, event);
        }
        */
      }
      for (var
        // apparently is node.children || IE11 ... ^_^;;
        // https://github.com/WebReflection/disconnected/issues/1
        children = node.children || [],
        length = children.length,
        i = 0; i < length;
        dispatchTarget(children[i++], event, type, wsin, wsout)
      );
    }
  }
}
module.exports = disconnected;

},{}],29:[function(require,module,exports){
'use strict';
/*! (c) Andrea Giammarchi - ISC */

// Custom
var UID = '-' + Math.random().toFixed(6) + '%';
//                           Edge issue!

var UID_IE = false;

try {
  if (!(function (template, content, tabindex) {
    return content in template && (
      (template.innerHTML = '<p ' + tabindex + '="' + UID + '"></p>'),
      template[content].childNodes[0].getAttribute(tabindex) == UID
    );
  }(document.createElement('template'), 'content', 'tabindex'))) {
    UID = '_dt: ' + UID.slice(1, -1) + ';';
    UID_IE = true;
  }
} catch(meh) {}

var UIDC = '<!--' + UID + '-->';

// DOM
var COMMENT_NODE = 8;
var DOCUMENT_FRAGMENT_NODE = 11;
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;

var SHOULD_USE_TEXT_CONTENT = /^(?:plaintext|script|style|textarea|title|xmp)$/i;
var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

exports.UID = UID;
exports.UIDC = UIDC;
exports.UID_IE = UID_IE;
exports.COMMENT_NODE = COMMENT_NODE;
exports.DOCUMENT_FRAGMENT_NODE = DOCUMENT_FRAGMENT_NODE;
exports.ELEMENT_NODE = ELEMENT_NODE;
exports.TEXT_NODE = TEXT_NODE;
exports.SHOULD_USE_TEXT_CONTENT = SHOULD_USE_TEXT_CONTENT;
exports.VOID_ELEMENTS = VOID_ELEMENTS;

},{}],30:[function(require,module,exports){
'use strict';
/*! (c) 2018 Andrea Giammarchi (ISC) */

const {
  eqeq, identity, indexOf, isReversed, next, append, remove, smartDiff
} = require('./utils.js');

const domdiff = (
  parentNode,     // where changes happen
  currentNodes,   // Array of current items/nodes
  futureNodes,    // Array of future items/nodes
  options         // optional object with one of the following properties
                  //  before: domNode
                  //  compare(generic, generic) => true if same generic
                  //  node(generic) => Node
) => {
  if (!options)
    options = {};

  const compare = options.compare || eqeq;
  const get = options.node || identity;
  const before = options.before == null ? null : get(options.before, 0);

  const currentLength = currentNodes.length;
  let currentEnd = currentLength;
  let currentStart = 0;

  let futureEnd = futureNodes.length;
  let futureStart = 0;

  // common prefix
  while (
    currentStart < currentEnd &&
    futureStart < futureEnd &&
    compare(currentNodes[currentStart], futureNodes[futureStart])
  ) {
    currentStart++;
    futureStart++;
  }

  // common suffix
  while (
    currentStart < currentEnd &&
    futureStart < futureEnd &&
    compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])
  ) {
    currentEnd--;
    futureEnd--;
  }

  const currentSame = currentStart === currentEnd;
  const futureSame = futureStart === futureEnd;

  // same list
  if (currentSame && futureSame)
    return futureNodes;

  // only stuff to add
  if (currentSame && futureStart < futureEnd) {
    append(
      get,
      parentNode,
      futureNodes,
      futureStart,
      futureEnd,
      next(get, currentNodes, currentStart, currentLength, before)
    );
    return futureNodes;
  }

  // only stuff to remove
  if (futureSame && currentStart < currentEnd) {
    remove(
      get,
      currentNodes,
      currentStart,
      currentEnd
    );
    return futureNodes;
  }

  const currentChanges = currentEnd - currentStart;
  const futureChanges = futureEnd - futureStart;
  let i = -1;

  // 2 simple indels: the shortest sequence is a subsequence of the longest
  if (currentChanges < futureChanges) {
    i = indexOf(
      futureNodes,
      futureStart,
      futureEnd,
      currentNodes,
      currentStart,
      currentEnd,
      compare
    );
    // inner diff
    if (-1 < i) {
      append(
        get,
        parentNode,
        futureNodes,
        futureStart,
        i,
        get(currentNodes[currentStart], 0)
      );
      append(
        get,
        parentNode,
        futureNodes,
        i + currentChanges,
        futureEnd,
        next(get, currentNodes, currentEnd, currentLength, before)
      );
      return futureNodes;
    }
  }
  /* istanbul ignore else */
  else if (futureChanges < currentChanges) {
    i = indexOf(
      currentNodes,
      currentStart,
      currentEnd,
      futureNodes,
      futureStart,
      futureEnd,
      compare
    );
    // outer diff
    if (-1 < i) {
      remove(
        get,
        currentNodes,
        currentStart,
        i
      );
      remove(
        get,
        currentNodes,
        i + futureChanges,
        currentEnd
      );
      return futureNodes;
    }
  }

  // common case with one replacement for many nodes
  // or many nodes replaced for a single one
  /* istanbul ignore else */
  if ((currentChanges < 2 || futureChanges < 2)) {
    append(
      get,
      parentNode,
      futureNodes,
      futureStart,
      futureEnd,
      get(currentNodes[currentStart], 0)
    );
    remove(
      get,
      currentNodes,
      currentStart,
      currentEnd
    );
    return futureNodes;
  }

  // the half match diff part has been skipped in petit-dom
  // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L391-L397
  // accordingly, I think it's safe to skip in here too
  // if one day it'll come out like the speediest thing ever to do
  // then I might add it in here too

  // Extra: before going too fancy, what about reversed lists ?
  //        This should bail out pretty quickly if that's not the case.
  if (
    currentChanges === futureChanges &&
    isReversed(
      futureNodes,
      futureEnd,
      currentNodes,
      currentStart,
      currentEnd,
      compare
    )
  ) {
    append(
      get,
      parentNode,
      futureNodes,
      futureStart,
      futureEnd,
      next(get, currentNodes, currentEnd, currentLength, before)
    );
    return futureNodes;
  }

  // last resort through a smart diff
  smartDiff(
    get,
    parentNode,
    futureNodes,
    futureStart,
    futureEnd,
    futureChanges,
    currentNodes,
    currentStart,
    currentEnd,
    currentChanges,
    currentLength,
    compare,
    before
  );

  return futureNodes;
};

Object.defineProperty(exports, '__esModule', {value: true}).default = domdiff;

},{"./utils.js":31}],31:[function(require,module,exports){
'use strict';
const {indexOf: iOF} = require('uarray');

const append = (get, parent, children, start, end, before) => {
  const isSelect = 'selectedIndex' in parent;
  let noSelection = isSelect;
  while (start < end) {
    const child = get(children[start], 1);
    parent.insertBefore(child, before);
    if (isSelect && noSelection && child.selected) {
      noSelection = !noSelection;
      let {selectedIndex} = parent;
      parent.selectedIndex = selectedIndex < 0 ?
        start :
        iOF.call(parent.querySelectorAll('option'), child);
    }
    start++;
  }
};
exports.append = append;

const eqeq = (a, b) => a == b;
exports.eqeq = eqeq;

const identity = O => O;
exports.identity = identity;

const indexOf = (
  moreNodes,
  moreStart,
  moreEnd,
  lessNodes,
  lessStart,
  lessEnd,
  compare
) => {
  const length = lessEnd - lessStart;
  /* istanbul ignore if */
  if (length < 1)
    return -1;
  while ((moreEnd - moreStart) >= length) {
    let m = moreStart;
    let l = lessStart;
    while (
      m < moreEnd &&
      l < lessEnd &&
      compare(moreNodes[m], lessNodes[l])
    ) {
      m++;
      l++;
    }
    if (l === lessEnd)
      return moreStart;
    moreStart = m + 1;
  }
  return -1;
};
exports.indexOf = indexOf;

const isReversed = (
  futureNodes,
  futureEnd,
  currentNodes,
  currentStart,
  currentEnd,
  compare
) => {
  while (
    currentStart < currentEnd &&
    compare(
      currentNodes[currentStart],
      futureNodes[futureEnd - 1]
    )) {
      currentStart++;
      futureEnd--;
    };
  return futureEnd === 0;
};
exports.isReversed = isReversed;

const next = (get, list, i, length, before) => i < length ?
              get(list[i], 0) :
              (0 < i ?
                get(list[i - 1], -0).nextSibling :
                before);
exports.next = next;

const remove = (get, children, start, end) => {
  while (start < end)
    drop(get(children[start++], -1));
};
exports.remove = remove;

// - - - - - - - - - - - - - - - - - - -
// diff related constants and utilities
// - - - - - - - - - - - - - - - - - - -

const DELETION = -1;
const INSERTION = 1;
const SKIP = 0;
const SKIP_OND = 50;

const HS = (
  futureNodes,
  futureStart,
  futureEnd,
  futureChanges,
  currentNodes,
  currentStart,
  currentEnd,
  currentChanges
) => {

  let k = 0;
  /* istanbul ignore next */
  let minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
  const link = Array(minLen++);
  const tresh = Array(minLen);
  tresh[0] = -1;

  for (let i = 1; i < minLen; i++)
    tresh[i] = currentEnd;

  const nodes = currentNodes.slice(currentStart, currentEnd);

  for (let i = futureStart; i < futureEnd; i++) {
    const index = nodes.indexOf(futureNodes[i]);
    if (-1 < index) {
      const idxInOld = index + currentStart;
      k = findK(tresh, minLen, idxInOld);
      /* istanbul ignore else */
      if (-1 < k) {
        tresh[k] = idxInOld;
        link[k] = {
          newi: i,
          oldi: idxInOld,
          prev: link[k - 1]
        };
      }
    }
  }

  k = --minLen;
  --currentEnd;
  while (tresh[k] > currentEnd) --k;

  minLen = currentChanges + futureChanges - k;
  const diff = Array(minLen);
  let ptr = link[k];
  --futureEnd;
  while (ptr) {
    const {newi, oldi} = ptr;
    while (futureEnd > newi) {
      diff[--minLen] = INSERTION;
      --futureEnd;
    }
    while (currentEnd > oldi) {
      diff[--minLen] = DELETION;
      --currentEnd;
    }
    diff[--minLen] = SKIP;
    --futureEnd;
    --currentEnd;
    ptr = ptr.prev;
  }
  while (futureEnd >= futureStart) {
    diff[--minLen] = INSERTION;
    --futureEnd;
  }
  while (currentEnd >= currentStart) {
    diff[--minLen] = DELETION;
    --currentEnd;
  }
  return diff;
};

// this is pretty much the same petit-dom code without the delete map part
// https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L556-L561
const OND = (
  futureNodes,
  futureStart,
  rows,
  currentNodes,
  currentStart,
  cols,
  compare
) => {
  const length = rows + cols;
  const v = [];
  let d, k, r, c, pv, cv, pd;
  outer: for (d = 0; d <= length; d++) {
    /* istanbul ignore if */
    if (d > SKIP_OND)
      return null;
    pd = d - 1;
    /* istanbul ignore next */
    pv = d ? v[d - 1] : [0, 0];
    cv = v[d] = [];
    for (k = -d; k <= d; k += 2) {
      if (k === -d || (k !== d && pv[pd + k - 1] < pv[pd + k + 1])) {
        c = pv[pd + k + 1];
      } else {
        c = pv[pd + k - 1] + 1;
      }
      r = c - k;
      while (
        c < cols &&
        r < rows &&
        compare(
          currentNodes[currentStart + c],
          futureNodes[futureStart + r]
        )
      ) {
        c++;
        r++;
      }
      if (c === cols && r === rows) {
        break outer;
      }
      cv[d + k] = c;
    }
  }

  const diff = Array(d / 2 + length / 2);
  let diffIdx = diff.length - 1;
  for (d = v.length - 1; d >= 0; d--) {
    while (
      c > 0 &&
      r > 0 &&
      compare(
        currentNodes[currentStart + c - 1],
        futureNodes[futureStart + r - 1]
      )
    ) {
      // diagonal edge = equality
      diff[diffIdx--] = SKIP;
      c--;
      r--;
    }
    if (!d)
      break;
    pd = d - 1;
    /* istanbul ignore next */
    pv = d ? v[d - 1] : [0, 0];
    k = c - r;
    if (k === -d || (k !== d && pv[pd + k - 1] < pv[pd + k + 1])) {
      // vertical edge = insertion
      r--;
      diff[diffIdx--] = INSERTION;
    } else {
      // horizontal edge = deletion
      c--;
      diff[diffIdx--] = DELETION;
    }
  }
  return diff;
};

const applyDiff = (
  diff,
  get,
  parentNode,
  futureNodes,
  futureStart,
  currentNodes,
  currentStart,
  currentLength,
  before
) => {
  const live = [];
  const length = diff.length;
  let currentIndex = currentStart;
  let i = 0;
  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        futureStart++;
        currentIndex++;
        break;
      case INSERTION:
        // TODO: bulk appends for sequential nodes
        live.push(futureNodes[futureStart]);
        append(
          get,
          parentNode,
          futureNodes,
          futureStart++,
          futureStart,
          currentIndex < currentLength ?
            get(currentNodes[currentIndex], 0) :
            before
        );
        break;
      case DELETION:
        currentIndex++;
        break;
    }
  }
  i = 0;
  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        currentStart++;
        break;
      case DELETION:
        // TODO: bulk removes for sequential nodes
        if (-1 < live.indexOf(currentNodes[currentStart]))
          currentStart++;
        else
          remove(
            get,
            currentNodes,
            currentStart++,
            currentStart
          );
        break;
    }
  }
};

const findK = (ktr, length, j) => {
  let lo = 1;
  let hi = length;
  while (lo < hi) {
    const mid = ((lo + hi) / 2) >>> 0;
    if (j < ktr[mid])
      hi = mid;
    else
      lo = mid + 1;
  }
  return lo;
}

const smartDiff = (
  get,
  parentNode,
  futureNodes,
  futureStart,
  futureEnd,
  futureChanges,
  currentNodes,
  currentStart,
  currentEnd,
  currentChanges,
  currentLength,
  compare,
  before
) => {
  applyDiff(
    OND(
      futureNodes,
      futureStart,
      futureChanges,
      currentNodes,
      currentStart,
      currentChanges,
      compare
    ) ||
    HS(
      futureNodes,
      futureStart,
      futureEnd,
      futureChanges,
      currentNodes,
      currentStart,
      currentEnd,
      currentChanges
    ),
    get,
    parentNode,
    futureNodes,
    futureStart,
    currentNodes,
    currentStart,
    currentLength,
    before
  );
};
exports.smartDiff = smartDiff;

const drop = node => (node.remove || dropChild).call(node);

function dropChild() {
  const {parentNode} = this;
  /* istanbul ignore else */
  if (parentNode)
    parentNode.removeChild(this);
}

},{"uarray":45}],32:[function(require,module,exports){
'use strict';
/*! (c) Andrea Giammarchi - ISC */

const {UID, UIDC, VOID_ELEMENTS} = require('domconstants');

Object.defineProperty(exports, '__esModule', {value: true}).default = function (template) {
  return template.join(UIDC)
          .replace(selfClosing, fullClosing)
          .replace(attrSeeker, attrReplacer);
}

var spaces = ' \\f\\n\\r\\t';
var almostEverything = '[^' + spaces + '\\/>"\'=]+';
var attrName = '[' + spaces + ']+' + almostEverything;
var tagName = '<([A-Za-z]+[A-Za-z0-9:._-]*)((?:';
var attrPartials = '(?:\\s*=\\s*(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything.replace('\\/', '') + '))?)';

var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([' + spaces + ']*/?>)', 'g');
var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([' + spaces + ']*/>)', 'g');
var findAttributes = new RegExp('(' + attrName + '\\s*=\\s*)([\'"]?)' + UIDC + '\\2', 'gi');

function attrReplacer($0, $1, $2, $3) {
  return '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
}

function replaceAttributes($0, $1, $2) {
  return $1 + ($2 || '"') + UID + ($2 || '"');
}

function fullClosing($0, $1, $2) {
  return VOID_ELEMENTS.test($1) ? $0 : ('<' + $1 + $2 + '></' + $1 + '>');
}

},{"domconstants":29}],33:[function(require,module,exports){
'use strict';
// globals
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));

// utils
const createContent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/create-content'));
const importNode = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/import-node'));
const trim = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/trim'));
const sanitize = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('domsanitizer'));
const umap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('umap'));

// local
const {find, parse} = require('./walker.js');

// the domtagger 🎉
Object.defineProperty(exports, '__esModule', {value: true}).default = domtagger;

var parsed = umap(new WeakMap);

function createInfo(options, template) {
  var markup = (options.convert || sanitize)(template);
  var transform = options.transform;
  if (transform)
    markup = transform(markup);
  var content = createContent(markup, options.type);
  cleanContent(content);
  var holes = [];
  parse(content, holes, template.slice(0), []);
  return {
    content: content,
    updates: function (content) {
      var updates = [];
      var len = holes.length;
      var i = 0;
      var off = 0;
      while (i < len) {
        var info = holes[i++];
        var node = find(content, info.path);
        switch (info.type) {
          case 'any':
            updates.push({fn: options.any(node, []), sparse: false});
            break;
          case 'attr':
            var sparse = info.sparse;
            var fn = options.attribute(node, info.name, info.node);
            if (sparse === null)
              updates.push({fn: fn, sparse: false});
            else {
              off += sparse.length - 2;
              updates.push({fn: fn, sparse: true, values: sparse});
            }
            break;
          case 'text':
            updates.push({fn: options.text(node), sparse: false});
            node.textContent = '';
            break;
        }
      }
      len += off;
      return function () {
        var length = arguments.length;
        if (len !== (length - 1)) {
          throw new Error(
            (length - 1) + ' values instead of ' + len + '\n' +
            template.join('${value}')
          );
        }
        var i = 1;
        var off = 1;
        while (i < length) {
          var update = updates[i - off];
          if (update.sparse) {
            var values = update.values;
            var value = values[0];
            var j = 1;
            var l = values.length;
            off += l - 2;
            while (j < l)
              value += arguments[i++] + values[j++];
            update.fn(value);
          }
          else
            update.fn(arguments[i++]);
        }
        return content;
      };
    }
  };
}

function createDetails(options, template) {
  var info = parsed.get(template) || parsed.set(template, createInfo(options, template));
  return info.updates(importNode.call(document, info.content, true));
}

var empty = [];
function domtagger(options) {
  var previous = empty;
  var updates = cleanContent;
  return function (template) {
    if (previous !== template)
      updates = createDetails(options, (previous = template));
    return updates.apply(null, arguments);
  };
}

function cleanContent(fragment) {
  var childNodes = fragment.childNodes;
  var i = childNodes.length;
  while (i--) {
    var child = childNodes[i];
    if (
      child.nodeType !== 1 &&
      trim.call(child.textContent).length === 0
    ) {
      fragment.removeChild(child);
    }
  }
}

},{"./walker.js":34,"@ungap/create-content":18,"@ungap/import-node":22,"@ungap/trim":26,"@ungap/weakmap":27,"domsanitizer":32,"umap":46}],34:[function(require,module,exports){
'use strict';
const trim = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/trim'));

const {
  UID, UIDC, UID_IE, COMMENT_NODE, ELEMENT_NODE, SHOULD_USE_TEXT_CONTENT, TEXT_NODE
} = require('domconstants');

exports.find = find;
exports.parse = parse;

/* istanbul ignore next */
var normalizeAttributes = UID_IE ?
  function (attributes, parts) {
    var html = parts.join(' ');
    return parts.slice.call(attributes, 0).sort(function (left, right) {
      return html.indexOf(left.name) <= html.indexOf(right.name) ? -1 : 1;
    });
  } :
  function (attributes, parts) {
    return parts.slice.call(attributes, 0);
  }
;

function find(node, path) {
  var length = path.length;
  var i = 0;
  while (i < length)
    node = node.childNodes[path[i++]];
  return node;
}

function parse(node, holes, parts, path) {
  var childNodes = node.childNodes;
  var length = childNodes.length;
  var i = 0;
  while (i < length) {
    var child = childNodes[i];
    switch (child.nodeType) {
      case ELEMENT_NODE:
        var childPath = path.concat(i);
        parseAttributes(child, holes, parts, childPath);
        parse(child, holes, parts, childPath);
        break;
      case COMMENT_NODE:
        var textContent = child.textContent;
        if (textContent === UID) {
          parts.shift();
          holes.push(
            // basicHTML or other non standard engines
            // might end up having comments in nodes
            // where they shouldn't, hence this check.
            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ?
              Text(node, path) :
              Any(child, path.concat(i))
          );
        } else {
          switch (textContent.slice(0, 2)) {
            case '/*':
              if (textContent.slice(-2) !== '*/')
                break;
            case '\uD83D\uDC7B': // ghost
              node.removeChild(child);
              i--;
              length--;
          }
        }
        break;
      case TEXT_NODE:
        // the following ignore is actually covered by browsers
        // only basicHTML ends up on previous COMMENT_NODE case
        // instead of TEXT_NODE because it knows nothing about
        // special style or textarea behavior
        /* istanbul ignore if */
        if (
          SHOULD_USE_TEXT_CONTENT.test(node.nodeName) &&
          trim.call(child.textContent) === UIDC
        ) {
          parts.shift();
          holes.push(Text(node, path));
        }
        break;
    }
    i++;
  }
}

function parseAttributes(node, holes, parts, path) {
  var attributes = node.attributes;
  var cache = [];
  var remove = [];
  var array = normalizeAttributes(attributes, parts);
  var length = array.length;
  var i = 0;
  while (i < length) {
    var attribute = array[i++];
    var direct = attribute.value === UID;
    var sparse;
    if (direct || 1 < (sparse = attribute.value.split(UIDC)).length) {
      var name = attribute.name;
      // the following ignore is covered by IE
      // and the IE9 double viewBox test
      /* istanbul ignore else */
      if (cache.indexOf(name) < 0) {
        cache.push(name);
        var realName = parts.shift().replace(
          direct ?
            /^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/ :
            new RegExp(
              '^(?:|[\\S\\s]*?\\s)(' + name + ')\\s*=\\s*(\'|")[\\S\\s]*',
              'i'
            ),
            '$1'
        );
        var value = attributes[realName] ||
                      // the following ignore is covered by browsers
                      // while basicHTML is already case-sensitive
                      /* istanbul ignore next */
                      attributes[realName.toLowerCase()];
        if (direct)
          holes.push(Attr(value, path, realName, null));
        else {
          var skip = sparse.length - 2;
          while (skip--)
            parts.shift();
          holes.push(Attr(value, path, realName, sparse));
        }
      }
      remove.push(attribute);
    }
  }
  length = remove.length;
  i = 0;

  /* istanbul ignore next */
  var cleanValue = 0 < length && UID_IE && !('ownerSVGElement' in node);
  while (i < length) {
    // Edge HTML bug #16878726
    var attr = remove[i++];
    // IE/Edge bug lighterhtml#63 - clean the value or it'll persist
    /* istanbul ignore next */
    if (cleanValue)
      attr.value = '';
    // IE/Edge bug lighterhtml#64 - don't use removeAttributeNode
    node.removeAttribute(attr.name);
  }

  // This is a very specific Firefox/Safari issue
  // but since it should be a not so common pattern,
  // it's probably worth patching regardless.
  // Basically, scripts created through strings are death.
  // You need to create fresh new scripts instead.
  // TODO: is there any other node that needs such nonsense?
  var nodeName = node.nodeName;
  if (/^script$/i.test(nodeName)) {
    // this used to be like that
    // var script = createElement(node, nodeName);
    // then Edge arrived and decided that scripts created
    // through template documents aren't worth executing
    // so it became this ... hopefully it won't hurt in the wild
    var script = document.createElement(nodeName);
    length = attributes.length;
    i = 0;
    while (i < length)
      script.setAttributeNode(attributes[i++].cloneNode(true));
    script.textContent = node.textContent;
    node.parentNode.replaceChild(script, node);
  }
}

function Any(node, path) {
  return {
    type: 'any',
    node: node,
    path: path
  };
}

function Attr(node, path, name, sparse) {
  return {
    type: 'attr',
    node: node,
    path: path,
    name: name,
    sparse: sparse
  };
}

function Text(node, path) {
  return {
    type: 'text',
    node: node,
    path: path
  };
}

},{"@ungap/trim":26,"domconstants":29}],35:[function(require,module,exports){
'use strict';
/*! (C) 2017-2018 Andrea Giammarchi - ISC Style License */

const {Component, bind, define, hyper, wire} = require('hyperhtml');

// utils to deal with custom elements builtin extends
const ATTRIBUTE_CHANGED_CALLBACK = 'attributeChangedCallback';
const O = Object;
const classes = [];
const defineProperty = O.defineProperty;
const getOwnPropertyDescriptor = O.getOwnPropertyDescriptor;
const getOwnPropertyNames = O.getOwnPropertyNames;
const getOwnPropertySymbols = O.getOwnPropertySymbols || (() => []);
const getPrototypeOf = O.getPrototypeOf || (o => o.__proto__);
const ownKeys = typeof Reflect === 'object' && Reflect.ownKeys ||
                (o => getOwnPropertyNames(o).concat(getOwnPropertySymbols(o)));
const setPrototypeOf = O.setPrototypeOf ||
                      ((o, p) => (o.__proto__ = p, o));
const camel = name => name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
const {attachShadow} = HTMLElement.prototype;
const sr = new WeakMap;

class HyperHTMLElement extends HTMLElement {

  // define a custom-element in the CustomElementsRegistry
  // class MyEl extends HyperHTMLElement {}
  // MyEl.define('my-el');
  static define(name, options) {
    const Class = this;
    const proto = Class.prototype;

    const onChanged = proto[ATTRIBUTE_CHANGED_CALLBACK];
    const hasChange = !!onChanged;

    // Class.booleanAttributes
    // -----------------------------------------------
    // attributes defined as boolean will have
    // an either available or not available attribute
    // regardless of the value.
    // All falsy values, or "false", mean attribute removed
    // while truthy values will be set as is.
    // Boolean attributes are also automatically observed.
    const booleanAttributes = Class.booleanAttributes || [];
    booleanAttributes.forEach(name => {
      if (!(name in proto)) defineProperty(
        proto,
        camel(name),
        {
          configurable: true,
          get() {
            return this.hasAttribute(name);
          },
          set(value) {
            if (!value || value === 'false')
              this.removeAttribute(name);
            else
              this.setAttribute(name, '');
          }
        }
      );
    });

    // Class.observedAttributes
    // -------------------------------------------------------
    // HyperHTMLElement will directly reflect get/setAttribute
    // operation once these attributes are used, example:
    // el.observed = 123;
    // will automatically do
    // el.setAttribute('observed', 123);
    // triggering also the attributeChangedCallback
    const observedAttributes = Class.observedAttributes || [];
    observedAttributes.forEach(name => {
      // it is possible to redefine the behavior at any time
      // simply overwriting get prop() and set prop(value)
      if (!(name in proto)) defineProperty(
        proto,
        camel(name),
        {
          configurable: true,
          get() {
            return this.getAttribute(name);
          },
          set(value) {
            if (value == null)
              this.removeAttribute(name);
            else
              this.setAttribute(name, value);
          }
        }
      );
    });

    // if these are defined, overwrite the observedAttributes getter
    // to include also booleanAttributes
    const attributes = booleanAttributes.concat(observedAttributes);
    if (attributes.length)
      defineProperty(Class, 'observedAttributes', {
        get() { return attributes; }
      });

    // created() {}
    // ---------------------------------
    // an initializer method that grants
    // the node is fully known to the browser.
    // It is ensured to run either after DOMContentLoaded,
    // or once there is a next sibling (stream-friendly) so that
    // you have full access to element attributes and/or childNodes.
    const created = proto.created || function () {
      this.render();
    };

    // used to ensure create() is called once and once only
    defineProperty(
      proto,
      '_init$',
      {
        configurable: true,
        writable: true,
        value: true
      }
    );

    defineProperty(
      proto,
      ATTRIBUTE_CHANGED_CALLBACK,
      {
        configurable: true,
        value: function aCC(name, prev, curr) {
          if (this._init$) {
            checkReady.call(this, created, attributes, booleanAttributes);
            if (this._init$)
              return this._init$$.push(aCC.bind(this, name, prev, curr));
          }
          // ensure setting same value twice
          // won't trigger twice attributeChangedCallback
          if (hasChange && prev !== curr) {
            onChanged.apply(this, arguments);
          }
        }
      }
    );

    const onConnected = proto.connectedCallback;
    const hasConnect = !!onConnected;
    defineProperty(
      proto,
      'connectedCallback',
      {
        configurable: true,
        value: function cC() {
          if (this._init$) {
            checkReady.call(this, created, attributes, booleanAttributes);
            if (this._init$)
              return this._init$$.push(cC.bind(this));
          }
          if (hasConnect) {
            onConnected.apply(this, arguments);
          }
        }
      }
    );

    // define lazily all handlers
    // class { handleClick() { ... }
    // render() { `<a onclick=${this.handleClick}>` } }
    getOwnPropertyNames(proto).forEach(key => {
      if (/^handle[A-Z]/.test(key)) {
        const _key$ = '_' + key + '$';
        const method = proto[key];
        defineProperty(proto, key, {
          configurable: true,
          get() {
            return  this[_key$] ||
                    (this[_key$] = method.bind(this));
          }
        });
      }
    });

    // whenever you want to directly use the component itself
    // as EventListener, you can pass it directly.
    // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
    //  class Reactive extends HyperHTMLElement {
    //    oninput(e) { console.log(this, 'changed', e.target.value); }
    //    render() { this.html`<input oninput="${this}">`; }
    //  }
    if (!('handleEvent' in proto)) {
      defineProperty(
        proto,
        'handleEvent',
        {
          configurable: true,
          value(event) {
            this[
              (event.currentTarget.dataset || {}).call ||
              ('on' + event.type)
            ](event);
          }
        }
      );
    }

    if (options && options.extends) {
      const Native = document.createElement(options.extends).constructor;
      const Intermediate = class extends Native {};
      const ckeys = ['length', 'name', 'arguments', 'caller', 'prototype'];
      const pkeys = [];
      let Super = null;
      let BaseClass = Class;
      while (Super = getPrototypeOf(BaseClass)) {
        [
          {target: Intermediate, base: Super, keys: ckeys},
          {target: Intermediate.prototype, base: Super.prototype, keys: pkeys}
        ]
        .forEach(({target, base, keys}) => {
          ownKeys(base)
            .filter(key => keys.indexOf(key) < 0)
            .forEach((key) => {
              keys.push(key);
              defineProperty(
                target,
                key,
                getOwnPropertyDescriptor(base, key)
              );
            });
        });

        BaseClass = Super;
        if (Super === HyperHTMLElement)
          break;
      }
      setPrototypeOf(Class, Intermediate);
      setPrototypeOf(proto, Intermediate.prototype);
      customElements.define(name, Class, options);
    } else {
      customElements.define(name, Class);
    }
    classes.push(Class);
    return Class;
  }

  // weakly relate the shadowRoot for refs usage
  attachShadow() {
    const shadowRoot = attachShadow.apply(this, arguments);
    sr.set(this, shadowRoot);
    return shadowRoot;
  }

  // returns elements by ref
  get refs() {
    const value = {};
    if ('_html$' in this) {
      const all = (sr.get(this) || this).querySelectorAll('[ref]');
      for (let {length} = all, i = 0; i < length; i++) {
        const node = all[i];
        value[node.getAttribute('ref')] = node;
      }
      Object.defineProperty(this, 'refs', {value});
      return value;
    }
    return value;
  }

  // lazily bind once hyperHTML logic
  // to either the shadowRoot, if present and open,
  // the _shadowRoot property, if set due closed shadow root,
  // or the custom-element itself if no Shadow DOM is used.
  get html() {
    return this._html$ || (this.html = bind(
      // in a way or another, bind to the right node
      // backward compatible, first two could probably go already
      this.shadowRoot || this._shadowRoot || sr.get(this) || this
    ));
  }

  // it can be set too if necessary, it won't invoke render()
  set html(value) {
    defineProperty(this, '_html$', {configurable: true, value: value});
  }

  // overwrite this method with your own render
  render() {}

  // ---------------------//
  // Basic State Handling //
  // ---------------------//

  // define the default state object
  // you could use observed properties too
  get defaultState() { return {}; }

  // the state with a default
  get state() {
    return this._state$ || (this.state = this.defaultState);
  }

  // it can be set too if necessary, it won't invoke render()
  set state(value) {
    defineProperty(this, '_state$', {configurable: true, value: value});
  }

  // currently a state is a shallow copy, like in Preact or other libraries.
  // after the state is updated, the render() method will be invoked.
  // ⚠️ do not ever call this.setState() inside this.render()
  setState(state, render) {
    const target = this.state;
    const source = typeof state === 'function' ? state.call(this, target) : state;
    for (const key in source) target[key] = source[key];
    if (render !== false) this.render();
    return this;
  }

};

// exposing hyperHTML utilities
HyperHTMLElement.Component = Component;
HyperHTMLElement.bind = bind;
HyperHTMLElement.intent = define;
HyperHTMLElement.wire = wire;
HyperHTMLElement.hyper = hyper;

try {
  if (Symbol.hasInstance) classes.push(
    defineProperty(HyperHTMLElement, Symbol.hasInstance, {
      enumerable: false,
      configurable: true,
      value(instance) {
        return classes.some(isPrototypeOf, getPrototypeOf(instance));
      }
    }));
} catch(meh) {}

Object.defineProperty(exports, '__esModule', {value: true}).default = HyperHTMLElement;

// ------------------------------//
// DOMContentLoaded VS created() //
// ------------------------------//
const dom = {
  type: 'DOMContentLoaded',
  handleEvent() {
    if (dom.ready()) {
      document.removeEventListener(dom.type, dom, false);
      dom.list.splice(0).forEach(invoke);
    }
    else
      setTimeout(dom.handleEvent);
  },
  ready() {
    return document.readyState === 'complete';
  },
  list: []
};

if (!dom.ready()) {
  document.addEventListener(dom.type, dom, false);
}

function checkReady(created, attributes, booleanAttributes) {
  if (dom.ready() || isReady.call(this, created, attributes, booleanAttributes)) {
    if (this._init$) {
      const list = this._init$$ || [];
      delete this._init$$;
      const self = defineProperty(this, '_init$', {value: false});
      booleanAttributes.forEach(name => {
        if (self.getAttribute(name) === 'false')
          self.removeAttribute(name);
      });
      attributes.forEach(name => {
        if (self.hasOwnProperty(name)) {
          const curr = self[name];
          delete self[name];
          list.unshift(() => { self[name] = curr; });
        }
      });
      created.call(self);
      list.forEach(invoke);
    }
  } else {
    if (!this.hasOwnProperty('_init$$'))
      defineProperty(this, '_init$$', {configurable: true, value: []});
    dom.list.push(checkReady.bind(this, created, attributes, booleanAttributes));
  }
}

function invoke(fn) {
  fn();
}

function isPrototypeOf(Class) {
  return this === Class.prototype;
}

function isReady(created, attributes, booleanAttributes) {
  let el = this;
  do { if (el.nextSibling) return true; }
  while (el = el.parentNode);
  setTimeout(checkReady.bind(this, created, attributes, booleanAttributes));
  return false;
}

},{"hyperhtml":41}],36:[function(require,module,exports){
/*! (c) Andrea Giammarchi - ISC */
var hyperStyle = (function (){'use strict';
  // from https://github.com/developit/preact/blob/33fc697ac11762a1cb6e71e9847670d047af7ce5/src/varants.js
  var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
  var hyphen = /([^A-Z])([A-Z]+)/g;
  return function hyperStyle(node, original) {
    return 'ownerSVGElement' in node ? svg(node, original) : update(node.style, false);
  };
  function ized($0, $1, $2) {
    return $1 + '-' + $2.toLowerCase();
  }
  function svg(node, original) {
    var style;
    if (original)
      style = original.cloneNode(true);
    else {
      node.setAttribute('style', '--hyper:style;');
      style = node.getAttributeNode('style');
    }
    style.value = '';
    node.setAttributeNode(style);
    return update(style, true);
  }
  function toStyle(object) {
    var key, css = [];
    for (key in object)
      css.push(key.replace(hyphen, ized), ':', object[key], ';');
    return css.join('');
  }
  function update(style, isSVG) {
    var oldType, oldValue;
    return function (newValue) {
      var info, key, styleValue, value;
      switch (typeof newValue) {
        case 'object':
          if (newValue) {
            if (oldType === 'object') {
              if (!isSVG) {
                if (oldValue !== newValue) {
                  for (key in oldValue) {
                    if (!(key in newValue)) {
                      style[key] = '';
                    }
                  }
                }
              }
            } else {
              if (isSVG)
                style.value = '';
              else
                style.cssText = '';
            }
            info = isSVG ? {} : style;
            for (key in newValue) {
              value = newValue[key];
              styleValue = typeof value === 'number' &&
                                  !IS_NON_DIMENSIONAL.test(key) ?
                                  (value + 'px') : value;
              if (!isSVG && /^--/.test(key))
                info.setProperty(key, styleValue);
              else
                info[key] = styleValue;
            }
            oldType = 'object';
            if (isSVG)
              style.value = toStyle((oldValue = info));
            else
              oldValue = newValue;
            break;
          }
        default:
          if (oldValue != newValue) {
            oldType = 'string';
            oldValue = newValue;
            if (isSVG)
              style.value = newValue || '';
            else
              style.cssText = newValue || '';
          }
          break;
      }
    };
  }
}());
module.exports = hyperStyle;

},{}],37:[function(require,module,exports){
/*! (c) Andrea Giammarchi - ISC */
var Wire = (function (slice, proto) {

  proto = Wire.prototype;

  proto.ELEMENT_NODE = 1;
  proto.nodeType = 111;

  proto.remove = function (keepFirst) {
    var childNodes = this.childNodes;
    var first = this.firstChild;
    var last = this.lastChild;
    this._ = null;
    if (keepFirst && childNodes.length === 2) {
      last.parentNode.removeChild(last);
    } else {
      var range = this.ownerDocument.createRange();
      range.setStartBefore(keepFirst ? childNodes[1] : first);
      range.setEndAfter(last);
      range.deleteContents();
    }
    return first;
  };

  proto.valueOf = function (forceAppend) {
    var fragment = this._;
    var noFragment = fragment == null;
    if (noFragment)
      fragment = (this._ = this.ownerDocument.createDocumentFragment());
    if (noFragment || forceAppend) {
      for (var n = this.childNodes, i = 0, l = n.length; i < l; i++)
        fragment.appendChild(n[i]);
    }
    return fragment;
  };

  return Wire;

  function Wire(childNodes) {
    var nodes = (this.childNodes = slice.call(childNodes, 0));
    this.firstChild = nodes[0];
    this.lastChild = nodes[nodes.length - 1];
    this.ownerDocument = nodes[0].ownerDocument;
    this._ = null;
  }

}([].slice));
module.exports = Wire;

},{}],38:[function(require,module,exports){
'use strict';
const CustomEvent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/custom-event'));
const Map = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/essential-map'));
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));

// hyperHTML.Component is a very basic class
// able to create Custom Elements like components
// including the ability to listen to connect/disconnect
// events via onconnect/ondisconnect attributes
// Components can be created imperatively or declaratively.
// The main difference is that declared components
// will not automatically render on setState(...)
// to simplify state handling on render.
function Component() {
  return this; // this is needed in Edge !!!
}
Object.defineProperty(exports, '__esModule', {value: true}).default = Component

// Component is lazily setup because it needs
// wire mechanism as lazy content
function setup(content) {
  // there are various weakly referenced variables in here
  // and mostly are to use Component.for(...) static method.
  const children = new WeakMap;
  const create = Object.create;
  const createEntry = (wm, id, component) => {
    wm.set(id, component);
    return component;
  };
  const get = (Class, info, context, id) => {
    const relation = info.get(Class) || relate(Class, info);
    switch (typeof id) {
      case 'object':
      case 'function':
        const wm = relation.w || (relation.w = new WeakMap);
        return wm.get(id) || createEntry(wm, id, new Class(context));
      default:
        const sm = relation.p || (relation.p = create(null));
        return sm[id] || (sm[id] = new Class(context));
    }
  };
  const relate = (Class, info) => {
    const relation = {w: null, p: null};
    info.set(Class, relation);
    return relation;
  };
  const set = context => {
    const info = new Map;
    children.set(context, info);
    return info;
  };
  // The Component Class
  Object.defineProperties(
    Component,
    {
      // Component.for(context[, id]) is a convenient way
      // to automatically relate data/context to children components
      // If not created yet, the new Component(context) is weakly stored
      // and after that same instance would always be returned.
      for: {
        configurable: true,
        value(context, id) {
          return get(
            this,
            children.get(context) || set(context),
            context,
            id == null ?
              'default' : id
          );
        }
      }
    }
  );
  Object.defineProperties(
    Component.prototype,
    {
      // all events are handled with the component as context
      handleEvent: {value(e) {
        const ct = e.currentTarget;
        this[
          ('getAttribute' in ct && ct.getAttribute('data-call')) ||
          ('on' + e.type)
        ](e);
      }},
      // components will lazily define html or svg properties
      // as soon as these are invoked within the .render() method
      // Such render() method is not provided by the base class
      // but it must be available through the Component extend.
      // Declared components could implement a
      // render(props) method too and use props as needed.
      html: lazyGetter('html', content),
      svg: lazyGetter('svg', content),
      // the state is a very basic/simple mechanism inspired by Preact
      state: lazyGetter('state', function () { return this.defaultState; }),
      // it is possible to define a default state that'd be always an object otherwise
      defaultState: {get() { return {}; }},
      // dispatch a bubbling, cancelable, custom event
      // through the first known/available node
      dispatch: {value(type, detail) {
        const {_wire$} = this;
        if (_wire$) {
          const event = new CustomEvent(type, {
            bubbles: true,
            cancelable: true,
            detail
          });
          event.component = this;
          return (_wire$.dispatchEvent ?
                    _wire$ :
                    _wire$.firstChild
                  ).dispatchEvent(event);
        }
        return false;
      }},
      // setting some property state through a new object
      // or a callback, triggers also automatically a render
      // unless explicitly specified to not do so (render === false)
      setState: {value(state, render) {
        const target = this.state;
        const source = typeof state === 'function' ? state.call(this, target) : state;
        for (const key in source) target[key] = source[key];
        if (render !== false)
          this.render();
        return this;
      }}
    }
  );
}
exports.setup = setup

// instead of a secret key I could've used a WeakMap
// However, attaching a property directly will result
// into better performance with thousands of components
// hanging around, and less memory pressure caused by the WeakMap
const lazyGetter = (type, fn) => {
  const secret = '_' + type + '$';
  return {
    get() {
      return this[secret] || setValue(this, secret, fn.call(this, type));
    },
    set(value) {
      setValue(this, secret, value);
    }
  };
};

// shortcut to set value on get or set(value)
const setValue = (self, secret, value) =>
  Object.defineProperty(self, secret, {
    configurable: true,
    value: typeof value === 'function' ?
      function () {
        return (self._wire$ = value.apply(this, arguments));
      } :
      value
  })[secret]
;

Object.defineProperties(
  Component.prototype,
  {
    // used to distinguish better than instanceof
    ELEMENT_NODE: {value: 1},
    nodeType: {value: -1}
  }
);

},{"@ungap/custom-event":19,"@ungap/essential-map":20,"@ungap/weakmap":27}],39:[function(require,module,exports){
'use strict';
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));
const tta = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/template-tag-arguments'));

const {OWNER_SVG_ELEMENT} = require('../shared/constants.js');
const {Tagger} = require('../objects/Updates.js');

// a weak collection of contexts that
// are already known to hyperHTML
const bewitched = new WeakMap;

// better known as hyper.bind(node), the render is
// the main tag function in charge of fully upgrading
// or simply updating, contexts used as hyperHTML targets.
// The `this` context is either a regular DOM node or a fragment.
function render() {
  const wicked = bewitched.get(this);
  const args = tta.apply(null, arguments);
  if (wicked && wicked.template === args[0]) {
    wicked.tagger.apply(null, args);
  } else {
    upgrade.apply(this, args);
  }
  return this;
}

// an upgrade is in charge of collecting template info,
// parse it once, if unknown, to map all interpolations
// as single DOM callbacks, relate such template
// to the current context, and render it after cleaning the context up
function upgrade(template) {
  const type = OWNER_SVG_ELEMENT in this ? 'svg' : 'html';
  const tagger = new Tagger(type);
  bewitched.set(this, {tagger, template: template});
  this.textContent = '';
  this.appendChild(tagger.apply(null, arguments));
}

Object.defineProperty(exports, '__esModule', {value: true}).default = render;

},{"../objects/Updates.js":43,"../shared/constants.js":44,"@ungap/template-tag-arguments":25,"@ungap/weakmap":27}],40:[function(require,module,exports){
'use strict';
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));
const tta = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/template-tag-arguments'));

const Wire = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('hyperhtml-wire'));

const {Tagger} = require('../objects/Updates.js');

// all wires used per each context
const wires = new WeakMap;

// A wire is a callback used as tag function
// to lazily relate a generic object to a template literal.
// hyper.wire(user)`<div id=user>${user.name}</div>`; => the div#user
// This provides the ability to have a unique DOM structure
// related to a unique JS object through a reusable template literal.
// A wire can specify a type, as svg or html, and also an id
// via html:id or :id convention. Such :id allows same JS objects
// to be associated to different DOM structures accordingly with
// the used template literal without losing previously rendered parts.
const wire = (obj, type) => obj == null ?
  content(type || 'html') :
  weakly(obj, type || 'html');

// A wire content is a virtual reference to one or more nodes.
// It's represented by either a DOM node, or an Array.
// In both cases, the wire content role is to simply update
// all nodes through the list of related callbacks.
// In few words, a wire content is like an invisible parent node
// in charge of updating its content like a bound element would do.
const content = type => {
  let wire, tagger, template;
  return function () {
    const args = tta.apply(null, arguments);
    if (template !== args[0]) {
      template = args[0];
      tagger = new Tagger(type);
      wire = wireContent(tagger.apply(tagger, args));
    } else {
      tagger.apply(tagger, args);
    }
    return wire;
  };
};

// wires are weakly created through objects.
// Each object can have multiple wires associated
// and this is thanks to the type + :id feature.
const weakly = (obj, type) => {
  const i = type.indexOf(':');
  let wire = wires.get(obj);
  let id = type;
  if (-1 < i) {
    id = type.slice(i + 1);
    type = type.slice(0, i) || 'html';
  }
  if (!wire)
    wires.set(obj, wire = {});
  return wire[id] || (wire[id] = content(type));
};

// A document fragment loses its nodes 
// as soon as it is appended into another node.
// This has the undesired effect of losing wired content
// on a second render call, because (by then) the fragment would be empty:
// no longer providing access to those sub-nodes that ultimately need to
// stay associated with the original interpolation.
// To prevent hyperHTML from forgetting about a fragment's sub-nodes,
// fragments are instead returned as an Array of nodes or, if there's only one entry,
// as a single referenced node which, unlike fragments, will indeed persist
// wire content throughout multiple renderings.
// The initial fragment, at this point, would be used as unique reference to this
// array of nodes or to this single referenced node.
const wireContent = node => {
  const childNodes = node.childNodes;
  const {length} = childNodes;
  return length === 1 ?
    childNodes[0] :
    (length ? new Wire(childNodes) : node);
};

exports.content = content;
exports.weakly = weakly;
Object.defineProperty(exports, '__esModule', {value: true}).default = wire;

},{"../objects/Updates.js":43,"@ungap/template-tag-arguments":25,"@ungap/weakmap":27,"hyperhtml-wire":37}],41:[function(require,module,exports){
'use strict';
/*! (c) Andrea Giammarchi (ISC) */
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));
const WeakSet = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/essential-weakset'));

const diff = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('domdiff'));
const Component = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./classes/Component.js'));
const {setup} = require('./classes/Component.js');
const Intent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./objects/Intent.js'));
const {observe, Tagger} = require('./objects/Updates.js');
const wire = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./hyper/wire.js'));
const {content, weakly} = require('./hyper/wire.js');
const render = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./hyper/render.js'));

// all functions are self bound to the right context
// you can do the following
// const {bind, wire} = hyperHTML;
// and use them right away: bind(node)`hello!`;
const bind = context => render.bind(context);
const define = Intent.define;
const tagger = Tagger.prototype;

hyper.Component = Component;
hyper.bind = bind;
hyper.define = define;
hyper.diff = diff;
hyper.hyper = hyper;
hyper.observe = observe;
hyper.tagger = tagger;
hyper.wire = wire;

// exported as shared utils
// for projects based on hyperHTML
// that don't necessarily need upfront polyfills
// i.e. those still targeting IE
hyper._ = {
  WeakMap,
  WeakSet
};

// the wire content is the lazy defined
// html or svg property of each hyper.Component
setup(content);

// everything is exported directly or through the
// hyperHTML callback, when used as top level script
exports.Component = Component;
exports.bind = bind;
exports.define = define;
exports.diff = diff;
exports.hyper = hyper;
exports.observe = observe;
exports.tagger = tagger;
exports.wire = wire;

// by default, hyperHTML is a smart function
// that "magically" understands what's the best
// thing to do with passed arguments
function hyper(HTML) {
  return arguments.length < 2 ?
    (HTML == null ?
      content('html') :
      (typeof HTML === 'string' ?
        hyper.wire(null, HTML) :
        ('raw' in HTML ?
          content('html')(HTML) :
          ('nodeType' in HTML ?
            hyper.bind(HTML) :
            weakly(HTML, 'html')
          )
        )
      )) :
    ('raw' in HTML ?
      content('html') : hyper.wire
    ).apply(null, arguments);
}
Object.defineProperty(exports, '__esModule', {value: true}).default = hyper

},{"./classes/Component.js":38,"./hyper/render.js":39,"./hyper/wire.js":40,"./objects/Intent.js":42,"./objects/Updates.js":43,"@ungap/essential-weakset":21,"@ungap/weakmap":27,"domdiff":30}],42:[function(require,module,exports){
'use strict';
const attributes = {};
const intents = {};
const keys = [];
const hasOwnProperty = intents.hasOwnProperty;

let length = 0;

Object.defineProperty(exports, '__esModule', {value: true}).default = {

  // used to invoke right away hyper:attributes
  attributes,

  // hyperHTML.define('intent', (object, update) => {...})
  // can be used to define a third parts update mechanism
  // when every other known mechanism failed.
  // hyper.define('user', info => info.name);
  // hyper(node)`<p>${{user}}</p>`;
  define: (intent, callback) => {
    if (intent.indexOf('-') < 0) {
      if (!(intent in intents)) {
        length = keys.push(intent);
      }
      intents[intent] = callback;
    } else {
      attributes[intent] = callback;
    }
  },

  // this method is used internally as last resort
  // to retrieve a value out of an object
  invoke: (object, callback) => {
    for (let i = 0; i < length; i++) {
      let key = keys[i];
      if (hasOwnProperty.call(object, key)) {
        return intents[key](object[key], callback);
      }
    }
  }
};

},{}],43:[function(require,module,exports){
'use strict';
const CustomEvent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/custom-event'));
const WeakSet = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/essential-weakset'));
const isArray = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/is-array'));
const createContent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/create-content'));

const disconnected = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('disconnected'));
const domdiff = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('domdiff'));
const domtagger = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('domtagger'));
const hyperStyle = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('hyperhtml-style'));
const Wire = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('hyperhtml-wire'));

const {
  CONNECTED, DISCONNECTED, DOCUMENT_FRAGMENT_NODE, OWNER_SVG_ELEMENT
} = require('../shared/constants.js');

const Component = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('../classes/Component.js'));
const Intent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./Intent.js'));

const componentType = Component.prototype.nodeType;
const wireType = Wire.prototype.nodeType;

const observe = disconnected({Event: CustomEvent, WeakSet});

exports.Tagger = Tagger;
exports.observe = observe;

// returns an intent to explicitly inject content as html
const asHTML = html => ({html});

// returns nodes from wires and components
const asNode = (item, i) => {
  switch (item.nodeType) {
    case wireType:
      // in the Wire case, the content can be
      // removed, post-pended, inserted, or pre-pended and
      // all these cases are handled by domdiff already
      /* istanbul ignore next */
      return (1 / i) < 0 ?
        (i ? item.remove(true) : item.lastChild) :
        (i ? item.valueOf(true) : item.firstChild);
    case componentType:
      return asNode(item.render(), i);
    default:
      return item;
  }
}

// returns true if domdiff can handle the value
const canDiff = value => 'ELEMENT_NODE' in value;

// borrowed from uhandlers
// https://github.com/WebReflection/uhandlers
const booleanSetter = (node, key, oldValue) => newValue => {
  if (oldValue !== !!newValue) {
    if ((oldValue = !!newValue))
      node.setAttribute(key, '');
    else
      node.removeAttribute(key);
  }
};

const hyperSetter = (node, name, svg) => svg ?
  value => {
    try {
      node[name] = value;
    }
    catch (nope) {
      node.setAttribute(name, value);
    }
  } :
  value => {
    node[name] = value;
  };

// when a Promise is used as interpolation value
// its result must be parsed once resolved.
// This callback is in charge of understanding what to do
// with a returned value once the promise is resolved.
const invokeAtDistance = (value, callback) => {
  callback(value.placeholder);
  if ('text' in value) {
    Promise.resolve(value.text).then(String).then(callback);
  } else if ('any' in value) {
    Promise.resolve(value.any).then(callback);
  } else if ('html' in value) {
    Promise.resolve(value.html).then(asHTML).then(callback);
  } else {
    Promise.resolve(Intent.invoke(value, callback)).then(callback);
  }
};

// quick and dirty way to check for Promise/ish values
const isPromise_ish = value => value != null && 'then' in value;

// list of attributes that should not be directly assigned
const readOnly = /^(?:form|list)$/i;

// reused every slice time
const slice = [].slice;

// simplifies text node creation
const text = (node, text) => node.ownerDocument.createTextNode(text);

function Tagger(type) {
  this.type = type;
  return domtagger(this);
}

Tagger.prototype = {

  // there are four kind of attributes, and related behavior:
  //  * events, with a name starting with `on`, to add/remove event listeners
  //  * special, with a name present in their inherited prototype, accessed directly
  //  * regular, accessed through get/setAttribute standard DOM methods
  //  * style, the only regular attribute that also accepts an object as value
  //    so that you can style=${{width: 120}}. In this case, the behavior has been
  //    fully inspired by Preact library and its simplicity.
  attribute(node, name, original) {
    const isSVG = OWNER_SVG_ELEMENT in node;
    let oldValue;
    // if the attribute is the style one
    // handle it differently from others
    if (name === 'style')
      return hyperStyle(node, original, isSVG);
    // direct accessors for <input .value=${...}> and friends
    else if (name.slice(0, 1) === '.')
      return hyperSetter(node, name.slice(1), isSVG);
    // boolean accessors for <input .value=${...}> and friends
    else if (name.slice(0, 1) === '?')
      return booleanSetter(node, name.slice(1));
    // the name is an event one,
    // add/remove event listeners accordingly
    else if (/^on/.test(name)) {
      let type = name.slice(2);
      if (type === CONNECTED || type === DISCONNECTED) {
        observe(node);
      }
      else if (name.toLowerCase()
        in node) {
        type = type.toLowerCase();
      }
      return newValue => {
        if (oldValue !== newValue) {
          if (oldValue)
            node.removeEventListener(type, oldValue, false);
          oldValue = newValue;
          if (newValue)
            node.addEventListener(type, newValue, false);
        }
      };
    }
    // the attribute is special ('value' in input)
    // and it's not SVG *or* the name is exactly data,
    // in this case assign the value directly
    else if (
      name === 'data' ||
      (!isSVG && name in node && !readOnly.test(name))
    ) {
      return newValue => {
        if (oldValue !== newValue) {
          oldValue = newValue;
          if (node[name] !== newValue && newValue == null) {
            // cleanup on null to avoid silly IE/Edge bug
            node[name] = '';
            node.removeAttribute(name);
          }
          else
            node[name] = newValue;
        }
      };
    }
    else if (name in Intent.attributes) {
      oldValue;
      return any => {
        const newValue = Intent.attributes[name](node, any);
        if (oldValue !== newValue) {
          oldValue = newValue;
          if (newValue == null)
            node.removeAttribute(name);
          else
            node.setAttribute(name, newValue);
        }
      };
    }
    // in every other case, use the attribute node as it is
    // update only the value, set it as node only when/if needed
    else {
      let owner = false;
      const attribute = original.cloneNode(true);
      return newValue => {
        if (oldValue !== newValue) {
          oldValue = newValue;
          if (attribute.value !== newValue) {
            if (newValue == null) {
              if (owner) {
                owner = false;
                node.removeAttributeNode(attribute);
              }
              attribute.value = newValue;
            } else {
              attribute.value = newValue;
              if (!owner) {
                owner = true;
                node.setAttributeNode(attribute);
              }
            }
          }
        }
      };
    }
  },

  // in a hyper(node)`<div>${content}</div>` case
  // everything could happen:
  //  * it's a JS primitive, stored as text
  //  * it's null or undefined, the node should be cleaned
  //  * it's a component, update the content by rendering it
  //  * it's a promise, update the content once resolved
  //  * it's an explicit intent, perform the desired operation
  //  * it's an Array, resolve all values if Promises and/or
  //    update the node with the resulting list of content
  any(node, childNodes) {
    const diffOptions = {node: asNode, before: node};
    const nodeType = OWNER_SVG_ELEMENT in node ? /* istanbul ignore next */ 'svg' : 'html';
    let fastPath = false;
    let oldValue;
    const anyContent = value => {
      switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
          if (fastPath) {
            if (oldValue !== value) {
              oldValue = value;
              childNodes[0].textContent = value;
            }
          } else {
            fastPath = true;
            oldValue = value;
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              [text(node, value)],
              diffOptions
            );
          }
          break;
        case 'function':
          anyContent(value(node));
          break;
        case 'object':
        case 'undefined':
          if (value == null) {
            fastPath = false;
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              [],
              diffOptions
            );
            break;
          }
        default:
          fastPath = false;
          oldValue = value;
          if (isArray(value)) {
            if (value.length === 0) {
              if (childNodes.length) {
                childNodes = domdiff(
                  node.parentNode,
                  childNodes,
                  [],
                  diffOptions
                );
              }
            } else {
              switch (typeof value[0]) {
                case 'string':
                case 'number':
                case 'boolean':
                  anyContent({html: value});
                  break;
                case 'object':
                  if (isArray(value[0])) {
                    value = value.concat.apply([], value);
                  }
                  if (isPromise_ish(value[0])) {
                    Promise.all(value).then(anyContent);
                    break;
                  }
                default:
                  childNodes = domdiff(
                    node.parentNode,
                    childNodes,
                    value,
                    diffOptions
                  );
                  break;
              }
            }
          } else if (canDiff(value)) {
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              value.nodeType === DOCUMENT_FRAGMENT_NODE ?
                slice.call(value.childNodes) :
                [value],
              diffOptions
            );
          } else if (isPromise_ish(value)) {
            value.then(anyContent);
          } else if ('placeholder' in value) {
            invokeAtDistance(value, anyContent);
          } else if ('text' in value) {
            anyContent(String(value.text));
          } else if ('any' in value) {
            anyContent(value.any);
          } else if ('html' in value) {
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              slice.call(
                createContent(
                  [].concat(value.html).join(''),
                  nodeType
                ).childNodes
              ),
              diffOptions
            );
          } else if ('length' in value) {
            anyContent(slice.call(value));
          } else {
            anyContent(Intent.invoke(value, anyContent));
          }
          break;
      }
    };
    return anyContent;
  },

  // style or textareas don't accept HTML as content
  // it's pointless to transform or analyze anything
  // different from text there but it's worth checking
  // for possible defined intents.
  text(node) {
    let oldValue;
    const textContent = value => {
      if (oldValue !== value) {
        oldValue = value;
        const type = typeof value;
        if (type === 'object' && value) {
          if (isPromise_ish(value)) {
            value.then(textContent);
          } else if ('placeholder' in value) {
            invokeAtDistance(value, textContent);
          } else if ('text' in value) {
            textContent(String(value.text));
          } else if ('any' in value) {
            textContent(value.any);
          } else if ('html' in value) {
            textContent([].concat(value.html).join(''));
          } else if ('length' in value) {
            textContent(slice.call(value).join(''));
          } else {
            textContent(Intent.invoke(value, textContent));
          }
        } else if (type === 'function') {
          textContent(value(node));
        } else {
          node.textContent = value == null ? '' : value;
        }
      }
    };
    return textContent;
  }
};

},{"../classes/Component.js":38,"../shared/constants.js":44,"./Intent.js":42,"@ungap/create-content":18,"@ungap/custom-event":19,"@ungap/essential-weakset":21,"@ungap/is-array":23,"disconnected":28,"domdiff":30,"domtagger":33,"hyperhtml-style":36,"hyperhtml-wire":37}],44:[function(require,module,exports){
'use strict';
// Node.CONSTANTS
// 'cause some engine has no global Node defined
// (i.e. Node, NativeScript, basicHTML ... )
const ELEMENT_NODE = 1;
exports.ELEMENT_NODE = ELEMENT_NODE;
const DOCUMENT_FRAGMENT_NODE = 11;
exports.DOCUMENT_FRAGMENT_NODE = DOCUMENT_FRAGMENT_NODE;

// SVG related constants
const OWNER_SVG_ELEMENT = 'ownerSVGElement';
exports.OWNER_SVG_ELEMENT = OWNER_SVG_ELEMENT;

// Custom Elements / MutationObserver constants
const CONNECTED = 'connected';
exports.CONNECTED = CONNECTED;
const DISCONNECTED = 'dis' + CONNECTED;
exports.DISCONNECTED = DISCONNECTED;

},{}],45:[function(require,module,exports){
'use strict';
const {isArray} = Array;
const {indexOf, slice} = [];

exports.isArray = isArray;
exports.indexOf = indexOf;
exports.slice = slice;

},{}],46:[function(require,module,exports){
'use strict';
module.exports = _ => ({
  // About: get: _.get.bind(_)
  // It looks like WebKit/Safari didn't optimize bind at all,
  // so that using bind slows it down by 60%.
  // Firefox and Chrome are just fine in both cases,
  // so let's use the approach that works fast everywhere 👍
  get: key => _.get(key),
  set: (key, value) => (_.set(key, value), value)
});

},{}]},{},[16]);
