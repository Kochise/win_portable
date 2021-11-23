/*****************************************************************************
 * This program is protected under international and U.S. copyright laws as  *
 * an unpublished work. This program is confidential and proprietary to the  *
 * copyright owners. Reproduction or disclosure, in whole or in part, or the *
 * production of derivative works without the express permission of          *
 * the copyright owners is prohibited.                                       *
 *                                                                           *
 *                Copyright (C) 2014-2017 by Dolby International AB.         *
 *                            All rights reserved.                           *
 *****************************************************************************/

function logMessage(msg) {
  //console.log(msg);
}

var dolby_voice_extension = { port: null, state: 10 };

function logToJavascriptPlugin (msg) {
  window.postMessage({ MeetMeDolbyVoiceMsgP1x1: 'log_msg', raw_value: { component: 'ChromeExt-FG', message: msg }}, '*');
}

function disconnect() {
  if (dolby_voice_extension.port != null) {
    logMessage('Disconnecting page_extension from the bg_extension.');
    logToJavascriptPlugin('Disconnecting form ChromeExt-BG');
    dolby_voice_extension.port.disconnect();
    dolby_voice_extension.port = null;
    dolby_voice_extension.state = 0;
    return true;
  }
  logToJavascriptPlugin('Not connected to ChromeExt-BG');
  return false;
}

function connect(version) {
  if (dolby_voice_extension.port === null) {
    logMessage('Connecting from page_extension to bg_extension with version = ' + version);
    logToJavascriptPlugin('Connecting to ChromeExt-BG (version=\'' + version + '\', id=\'' + chrome.runtime.id + '\')');
    dolby_voice_extension.port = chrome.runtime.connect(chrome.runtime.id);
    dolby_voice_extension.port.version = version;
    logToJavascriptPlugin('Sending \'connect\' message to ChromeExt-BG');
    dolby_voice_extension.port.postMessage({ MeetMeDolbyVoiceMsgE1x1: 'connect', Version: version });
    dolby_voice_extension.port.onMessage.addListener(function(msg) {
      if (typeof msg.MeetMeDolbyVoiceMsgP1x1 === 'string' && typeof msg.Version === 'string' && msg.Version === dolby_voice_extension.port.version) {
        logMessage('Page extension received message [' + msg.MeetMeDolbyVoiceMsgP1x1 + '] from bg_extension.');
        window.postMessage(msg, '*');
        if (dolby_voice_extension.state >= 0) {
          logToJavascriptPlugin('Succesfully connected to ChromeExt-BG - received first message');
          dolby_voice_extension.state = -1;
        }
        if (msg.MeetMeDolbyVoiceMsgP1x1 === 'connection' && msg.status !== 'connected') {
          logToJavascriptPlugin('Recieved connection status \'' + msg.status + '\' from ChromeExt-BG: disconnecting from ChromeExt-BG');
          disconnect();
        }
      }
    });
    dolby_voice_extension.port.onDisconnect.addListener(function() {
      if (dolby_voice_extension.state > 0) {
        logToJavascriptPlugin('Disconnected from ChromeExt-BG, retrying in 50ms (retries remaining: ' + dolby_voice_extension.state + ')');
        dolby_voice_extension.port = null;
        --dolby_voice_extension.state;
        setTimeout(connect, 50, version);
      }
      else {
        if (chrome.runtime.lastError && typeof chrome.runtime.lastError.message == 'string') {
          logMessage('Page_extension disconnected from bg_extension: [' + chrome.runtime.lastError.message + ']!');
          logToJavascriptPlugin('Disconnected from ChromeExt-BG, Error: \'' + chrome.runtime.lastError.message + '\'');
        }
        else {
          logToJavascriptPlugin('Disconnected from ChromeExt-BG');
        }
        logToJavascriptPlugin('Sending \'disconnected\' connection status to transport layer');
        window.postMessage({ MeetMeDolbyVoiceMsgP1x1: 'connection', status: 'disconnected', Version: dolby_voice_extension.port.version }, '*');
        dolby_voice_extension.port = null;
        dolby_voice_extension.state = -1;
      }
    });
    logMessage('Page_extension connected to the bg_extension.');
  }
}

window.addEventListener('message', function(event) {
  if (event.source === window && typeof event.data.MeetMeDolbyVoiceMsgE1x1 === 'string' && typeof event.data.Version === 'string') {
    if (dolby_voice_extension.port !== null && dolby_voice_extension.port.version != event.data.Version) {
      logToJavascriptPlugin('Received message with version \'' + event.data.version + '\', expected \'' + dolby_voice_extension.port.version + '\'. Ignoring message...');
      logMessage('Received message with version = ' + event.data.version + ', expected: ' + dolby_voice_extension.port.version + '.');
      return;
    }
    switch (event.data.MeetMeDolbyVoiceMsgE1x1) {
      case 'connect':
        logToJavascriptPlugin('Received \'connect\' message from transport layer');
        connect(event.data.Version);
        break;
      case 'disconnect':
        logToJavascriptPlugin('Received \'disconnect\' message from transport layer');
        if (disconnect()) {
          logToJavascriptPlugin('Sending connection status \'disconnected\' to transport layer');
          window.postMessage({ MeetMeDolbyVoiceMsgP1x1: 'connection', status: 'disconnected', Version: event.data.Version }, '*');
        }
        break;
      case 'ping':
        logToJavascriptPlugin('Received \'ping\' message from transport layer, replying with \'ping\'');
        window.postMessage({ MeetMeDolbyVoiceMsgP1x1: 'ping', Version: event.data.Version }, '*');
        break;
      default:
        if (dolby_voice_extension.port !== null) {
          logMessage('Forwarding command from page_extension to bg_extension [' + event.data.MeetMeDolbyVoiceMsgE1x1 + ']');  
          dolby_voice_extension.port.postMessage(event.data);
        }
        break;
    }
  }
}, false);

logToJavascriptPlugin('Sending \'ping\' message to transport layer');
window.postMessage({ MeetMeDolbyVoiceMsgP1x1: 'ping' }, '*');

