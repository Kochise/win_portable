//this script must be injected before load complete i.e loadstart so that we dont mess will regular 
//content script processing which happens on loadcomplete.
//this command is handled by chrome.js

window.onblur = function()
{ 
 chrome.runtime.sendMessage({command:"chromefocuschangeevt",state:"blur",domain:document.domain});
}

window.onfocus = function()
{
  chrome.runtime.sendMessage({command:"chromefocuschangeevt",state:"focus",domain:document.domain});
}