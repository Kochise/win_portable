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

const {getErrorMessage} = require("../common");
const {initI18n, stripTagsUnsafe} = require("../i18n");

let initialFilterText = "";
let targetPageId = null;

function onKeyDown(event)
{
  if (event.keyCode == 27)
  {
    event.preventDefault();
    closeDialog();
  }
}

function addFilters(reload = false)
{
  const textarea = document.getElementById("filters");
  browser.runtime.sendMessage({
    type: "filters.importRaw",
    text: textarea.value
  }).then((errors) =>
  {
    if (errors.length > 0)
    {
      errors = errors.map(getErrorMessage);
      alert(stripTagsUnsafe(errors.join("\n")));
    }
    else
      closeDialog(!reload, reload);
  });
}

// We'd rather just call window.close, but that isn't working consistently with
// Firefox 57, even when allowScriptsToClose is passed to browser.windows.create
// See https://bugzilla.mozilla.org/show_bug.cgi?id=1418394
// window.close is also broken on Firefox 63.x
// See https://gitlab.com/eyeo/adblockplus/abpui/adblockplusui/-/issues/791#note_374617568
function closeMe()
{
  browser.runtime.sendMessage({
    type: "app.get",
    what: "senderId"
  }).then(tabId =>
    browser.tabs.remove(tabId).catch(err =>
    {
      // Opera 68 throws a "Tabs cannot be edited right now (user may be
      // dragging a tab)." exception when we attempt to close the window
      // using `browser.tabs.remove`.
      window.close();
    })
  );
}

function closeDialog(apply = false, reload = false)
{
  document.getElementById("filters").disabled = true;
  browser.runtime.sendMessage({
    type: "composer.forward",
    targetPageId,
    payload:
    {
      type: "composer.content.finished",
      popupAlreadyClosed: true,
      reload,
      apply
    }
  }).then(() =>
  {
    closeMe();
  });
}

function resetFilters()
{
  browser.tabs.sendMessage(targetPageId, {
    type: "composer.content.finished"
  }).then(() =>
  {
    browser.tabs.sendMessage(targetPageId, {
      type: "composer.content.startPickingElement"
    }).then(closeMe);
  });
}

function previewFilters({currentTarget})
{
  const {preview} = currentTarget.dataset;
  const wasActive = preview === "active";

  const filtersTextArea = document.getElementById("filters");

  // if it is inactive, disable the textarea upfront
  if (!wasActive)
    filtersTextArea.disabled = true;

  browser.runtime.sendMessage({
    type: "composer.forward",
    targetPageId,
    payload:
    {
      type: "composer.content.preview",
      // toggle the preview mode
      active: !wasActive
    }
  }).then(() =>
  {
    // if it was active, it's now inactive so the area should be editable
    if (wasActive)
      filtersTextArea.disabled = false;

    // toggle both data-preview and the button message accordingly
    currentTarget.dataset.preview = wasActive ? "inactive" : "active";
    currentTarget.textContent =
      browser.i18n.getMessage(
        wasActive ? "composer_preview" : "composer_undo_preview"
      );
  });
}

function updateComposerState({currentTarget})
{
  const {value} = currentTarget;
  const disabled = !value.trim().length;
  const changed = (initialFilterText !== value);

  const block = document.getElementById("block");
  block.hidden = changed;
  block.disabled = disabled;

  const blockReload = document.getElementById("block-reload");
  blockReload.hidden = !changed;
  blockReload.disabled = disabled;

  document.getElementById("details").hidden = changed;
  document.getElementById("preview").disabled = changed;
}

function init()
{
  // Attach event listeners
  window.addEventListener("keydown", onKeyDown, false);

  const block = document.getElementById("block");
  block.addEventListener("click", () => addFilters());

  const blockReload = document.getElementById("block-reload");
  blockReload.addEventListener("click", () => addFilters(true));

  const preview = document.getElementById("preview");
  preview.addEventListener("click", previewFilters);

  const filtersTextArea = document.getElementById("filters");
  filtersTextArea.addEventListener("input", updateComposerState);

  document.getElementById("unselect").addEventListener(
    "click",
    () => resetFilters()
  );
  document.getElementById("cancel").addEventListener(
    "click",
    () => closeDialog()
  );

  ext.onMessage.addListener((msg, sender) =>
  {
    switch (msg.type)
    {
      case "composer.dialog.init":
        targetPageId = msg.sender;
        initialFilterText = msg.filters.join("\n");
        filtersTextArea.value = initialFilterText;
        filtersTextArea.disabled = false;
        preview.disabled = false;
        block.disabled = false;
        block.focus();
        document.getElementById("selected").dataset.count = msg.highlights;

        // Firefox sometimes tells us this window had loaded before it has[1],
        // to work around that we send the "composer.dialog.init" message again
        // when sending failed. Unfortunately sometimes sending is reported as
        // successful when it's not, but with the response of `undefined`. We
        // therefore send a response here, and check for it to see if the
        // message really was sent successfully.
        // [1] - https://bugzilla.mozilla.org/show_bug.cgi?id=1418655
        return true;
      case "composer.dialog.close":
        closeMe();
        break;
    }
  });

  window.removeEventListener("load", init);
}

initI18n();
window.addEventListener("load", init, false);

},{"../common":1,"../i18n":2}]},{},[3]);
