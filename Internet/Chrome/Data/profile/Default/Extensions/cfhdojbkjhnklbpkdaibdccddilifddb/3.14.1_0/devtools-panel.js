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

const {initI18n, setElementText} = require("../i18n");

const {getMessage} = browser.i18n;

initI18n();

const onFilterChangedByRow = new WeakMap();
const promisedPlatform = browser.runtime.sendMessage({
  type: "app.get",
  what: "platform"
});
const maxTitleLength = 1000;

let lastFilterQuery = null;

browser.runtime.sendMessage({type: "types.get"})
  .then(filterTypes =>
  {
    const filterTypesElem = document.getElementById("filter-type");
    const filterStyleElem = document.createElement("style");
    for (const type of filterTypes)
    {
      filterStyleElem.innerHTML +=
        `#items[data-filter-type=${type}] tr:not([data-type=${type}])` +
        "{display: none;}";
      const optionNode = document.createElement("option");
      optionNode.appendChild(document.createTextNode(type));
      filterTypesElem.appendChild(optionNode);
    }
    document.body.appendChild(filterStyleElem);
  });

function generateFilter(request, options = {})
{
  let {allowlisted = false, domainSpecific = false} = options;
  let filterText = request.url.replace(/^[\w-]+:\/+(?:www\.)?/, "||");
  const filterOptions = [];

  if (request.type == "POPUP")
  {
    filterOptions.push("popup");

    if (request.url == "about:blank")
      domainSpecific = true;
  }

  if (request.type == "CSP")
    filterOptions.push("csp");

  if (domainSpecific)
    filterOptions.push("domain=" + request.docDomain);

  if (filterOptions.length > 0)
    filterText += "$" + filterOptions.join(",");

  if (allowlisted)
    filterText = "@@" + filterText;

  return {
    allowlisted,
    subscription: null,
    text: filterText,
    userDefined: true
  };
}

function createActionButton(action, stringId, filter, callback)
{
  const button = document.createElement("span");

  button.textContent = getMessage(stringId);
  button.classList.add("action");

  button.addEventListener("click", async() =>
  {
    await browser.runtime.sendMessage({
      type: "filters." + action,
      text: filter.text
    });

    callback(filter);
  }, false);

  return button;
}

function onUrlClick(event)
{
  if (event.button != 0)
    return;

  // Firefox doesn't support the openResource API yet
  if (!("openResource" in browser.devtools.panels))
    return;

  browser.devtools.panels.openResource(event.target.href);
  event.preventDefault();
}

function getTitleText(str)
{
  return promisedPlatform
    .then((platform) =>
    {
      // Firefox doesn't wrap tooltip strings without whitespace characters
      // so we have to split up the string into individual lines
      // https://bugzilla.mozilla.org/show_bug.cgi?id=805039
      if (platform === "gecko")
      {
        const maxLineCount = maxTitleLength / 50;

        let lines = str.match(/.{1,50}/g);
        if (lines.length > maxLineCount)
        {
          // Text is too long to display in full so we cut out the middle part
          lines = [
            ...lines.slice(0, maxLineCount / 2),
            "…",
            ...lines.slice(-(maxLineCount / 2))
          ];
        }

        return lines.join("\n");
      }

      if (str.length < maxTitleLength + 3)
        return str;

      // Text is too long to display in full so we cut out the middle part
      return [
        str.slice(0, maxTitleLength / 2),
        "…",
        str.slice(-(maxTitleLength / 2))
      ].join("\n");
    });
}

function onFilterRemoved(oldFilter)
{
  const rows = document.querySelectorAll(`[data-filter="${oldFilter.text}"]`);
  for (const row of rows)
  {
    const onFilterChanged = onFilterChangedByRow.get(row);
    onFilterChanged(null);
  }
}

function createRecord(request, filter, options = {})
{
  const {hasChanged = false, initialFilter = null} = options;
  const template = document.querySelector("template").content.firstElementChild;
  const row = document.importNode(template, true);
  row.dataset.type = request.type;
  row.classList.toggle("changed", hasChanged);

  row.querySelector(".domain").textContent = request.docDomain;
  row.querySelector(".type").textContent = request.type;

  const urlElement = row.querySelector(".url");
  const actionWrapper = row.querySelector(".action-wrapper");

  const onFilterChanged = (newFilter) =>
  {
    const newRow = createRecord(
      request,
      newFilter || initialFilter,
      {
        hasChanged: !!newFilter,
        initialFilter: (newFilter) ? (initialFilter || filter) : null
      }
    );
    row.parentNode.replaceChild(newRow, row);

    const container = document.getElementById("items");
    container.classList.add("has-changes");
  };
  onFilterChangedByRow.set(row, onFilterChanged);

  if (request.url)
  {
    setElementText(
      urlElement, "devtools_request_url",
      [request.url, request.rewrittenUrl]
    );

    const originalUrl = urlElement.querySelector("[data-i18n-index='0']");
    originalUrl.classList.add("url");
    getTitleText(request.url).then((title) =>
    {
      originalUrl.setAttribute("title", title);
    });
    originalUrl.setAttribute("href", request.url);
    originalUrl.setAttribute("target", "_blank");

    if (request.type != "POPUP")
    {
      originalUrl.addEventListener("click", onUrlClick);
    }

    if (request.rewrittenUrl)
    {
      const rewrittenUrl = urlElement.querySelector("[data-i18n-index='1'");
      rewrittenUrl.classList.add("url-rewritten");
      getTitleText(request.rewrittenUrl).then((title) =>
      {
        rewrittenUrl.setAttribute("title", title);
      });
      rewrittenUrl.setAttribute("href", request.rewrittenUrl);
      rewrittenUrl.setAttribute("target", "_blank");
      rewrittenUrl.addEventListener("click", onUrlClick);
    }
    else
    {
      urlElement.innerHTML = "";
      urlElement.appendChild(originalUrl);
    }
  }
  else
  {
    urlElement.innerHTML = "&nbsp;";
  }

  if (filter)
  {
    const filterElement = row.querySelector(".filter");
    const originElement = row.querySelector(".origin");

    getTitleText(filter.text).then((title) =>
    {
      filterElement.setAttribute("title", title);
    });
    filterElement.textContent = filter.text;
    row.dataset.state = filter.allowlisted ? "allowlisted" : "blocked";
    row.dataset.filter = filter.text;

    if (filter.subscription)
      originElement.textContent = filter.subscription;
    else
    {
      if (filter.userDefined)
        originElement.textContent = getMessage("devtools_filter_origin_custom");
      else
        originElement.textContent = getMessage("devtools_filter_origin_none");

      originElement.classList.add("unnamed");
    }

    // We cannot generate allowing filters for already allowlisted requests
    // or for filters that are applied to frames
    // Additionally, we shouldn't generate allowing filters for blocking filters
    // that were created by an action button on this page while it's open,
    // because those should be removed instead to undo the action
    if (!filter.allowlisted && request.type != "ELEMHIDE" &&
      request.type != "SNIPPET" && !hasChanged)
    {
      actionWrapper.appendChild(createActionButton(
        "add",
        "devtools_action_unblock",
        generateFilter(request, {allowlisted: true}),
        onFilterChanged
      ));
    }

    if (filter.userDefined)
    {
      actionWrapper.appendChild(createActionButton(
        "remove",
        "devtools_action_remove",
        filter,
        onFilterRemoved
      ));
    }
  }
  // We cannot generate blocking filters for the top-level frame
  else if (request.type !== "DOCUMENT")
  {
    actionWrapper.appendChild(createActionButton(
      "add",
      "devtools_action_block",
      generateFilter(request, {domainSpecific: request.specificOnly}),
      onFilterChanged
    ));
  }

  if (lastFilterQuery && shouldFilterRow(row, lastFilterQuery))
    row.classList.add("filtered-by-search");

  return row;
}

function shouldFilterRow(row, query)
{
  const elementsToSearch = [
    row.getElementsByClassName("filter"),
    row.getElementsByClassName("origin"),
    row.getElementsByClassName("type"),
    row.getElementsByClassName("url")
  ];

  for (const elements of elementsToSearch)
  {
    for (const element of elements)
    {
      if (element.innerText.search(query) != -1)
        return false;
    }
  }
  return true;
}

function performSearch(table, query)
{
  for (const row of table.rows)
  {
    if (shouldFilterRow(row, query))
      row.classList.add("filtered-by-search");
    else
      row.classList.remove("filtered-by-search");
  }
}

function cancelSearch(table)
{
  for (const row of table.rows)
    row.classList.remove("filtered-by-search");
}

document.addEventListener("DOMContentLoaded", () =>
{
  const container = document.getElementById("items");
  const table = container.querySelector("tbody");

  document.querySelector("[data-i18n='devtools_footer'] > a")
    .addEventListener("click", () =>
    {
      ext.devtools.inspectedWindow.reload();
    }, false);

  document.getElementById("filter-state").addEventListener("change", (event) =>
  {
    container.dataset.filterState = event.target.value;
  }, false);

  document.getElementById("filter-type").addEventListener("change", (event) =>
  {
    container.dataset.filterType = event.target.value;
  }, false);

  ext.onMessage.addListener((message) =>
  {
    switch (message.type)
    {
      case "add-record":
        table.appendChild(createRecord(message.request, message.filter));
        break;

      case "update-record":
        const oldRow = table.getElementsByTagName("tr")[message.index];
        const newRow = createRecord(message.request, message.filter);
        oldRow.parentNode.replaceChild(newRow, oldRow);
        break;

      case "remove-record":
        const row = table.getElementsByTagName("tr")[message.index];
        row.parentNode.removeChild(row);
        container.classList.add("has-changes");
        break;

      case "reset":
        table.innerHTML = "";
        container.classList.remove("has-changes");
        break;
    }
  });

  window.addEventListener("message", (event) =>
  {
    switch (event.data.type)
    {
      case "performSearch":
        performSearch(table, event.data.queryString);
        lastFilterQuery = event.data.queryString;
        break;
      case "cancelSearch":
        cancelSearch(table);
        lastFilterQuery = null;
        break;
    }
  });

  // Since Chrome 54 the themeName is accessible, for earlier versions we must
  // assume the default theme is being used.
  // https://bugs.chromium.org/p/chromium/issues/detail?id=608869
  const theme = ext.devtools.panels.themeName || "default";
  document.body.classList.add(theme);
}, false);

},{"../i18n":1}]},{},[2]);
