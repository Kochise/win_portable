
function SendMessage(jsonobj,callback)
{  
  chrome.runtime.sendMessage(jsonobj,callback);  
}

function GetWindow()
{
   if(typeof unsafeWindow != "undefined")
     return unsafeWindow;
   else 
     return window;   
}