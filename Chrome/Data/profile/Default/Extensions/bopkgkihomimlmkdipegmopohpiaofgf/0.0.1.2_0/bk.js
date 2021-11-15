//alert("hi bkpage");
//opbhohost errorcodes
var COMMAND_ERROR_SUCCESS     = 0;
var COMMAND_ERROR_INVALIDJSON = 1;
var COMMAND_ERROR_INVALID     = 2; //invalid command
var COMMAND_ERROR_FAIL        = 3;
var COMMAND_ERROR_INVALIDARGS = 4;
var COMMAND_ERROR_PENDING     = 5;
var COMMAND_ERROR_VAULTSELECT = 6;
//
var AUTHSTAT_DEVICE_OPERATION_CANCELLED = 6;
var _validatetabid = -1;
var _validaterunning = false;
var _validatePending = false;
var _validatewindowid = -1;
var _language = "";
chrome.runtime.onMessage.addListener(OnRequest);
chrome.tabs.onUpdated.addListener(onUpdated);

_opinterface  = new OmniPassInterface(OnValidateASync,OnManualAuth);
_chromewindow = new ChromeWindow();
_chromewindow.AddListener("focuschange",OnFocusChange);
var lastrememberedtab = null;
var lastauthenticatedtab = null;

chrome.runtime.onInstalled.addListener(function ()
 {
    consolelog("Extension installed");
    _opinterface.connect("Install");
 });
function consolelog(str)
{
   return;
   console.log(str);
}

function IsChromeUrl(url)
{
  var len = url.length;
  if(len>=6)
  {
    var str = url.substring(0,6).toLowerCase();
	if(str == "chrome")	   
	   return true;
  }
  return false;
}

function GetURL(url)
{
    var arr = url.split("/");
	var tmpurl = arr[0] + "://" + arr[2];
	tmpurl = tmpurl.toLowerCase();
    return tmpurl;
}

function GetPageUrl(url) 
{
	var tempurl = url;
	tempurl = tempurl.toUpperCase();
	if(tempurl.indexOf("DROPBOX.COM") != -1)
		tempurl = "https://www.dropbox.com/login";
	else if(tempurl.indexOf("INSTAGRAM.COM") != -1)
		tempurl = "https://www.instagram.com/accounts/login/";
	else if(tempurl.indexOf("LOGIN.YAHOO.COM") != -1)
		tempurl = "https://login.yahoo.com";
	else
		tempurl = url;
			
    return tempurl;
}

function IsWildCardPage(url)
{
	var tempurl = url;
	tempurl = tempurl.toUpperCase();
	if(tempurl.indexOf("GOOGLE") != -1 || tempurl.indexOf("EBAY") != -1 || tempurl.indexOf("YAHOO") != -1)
	{
		return true;
	}
	
	return false;
}

function ShouldCacheTabAuth(url)
{
	var tempurl = url;
	tempurl = tempurl.toUpperCase();
	if(tempurl.indexOf("LOGIN.YAHOO.COM") != -1)
	{
		return true;
	}
	
	return false;
}

function IsTabAuthCached(tab)
{
	if(lastauthenticatedtab == null)
		return false;
	
	if(lastauthenticatedtab.id == tab.id && GetURL(lastauthenticatedtab.url) == GetURL(tab.url))
		return true;
	
	lastauthenticatedtab = null;
	return false;
}

document.onreadystatechange = function ()
{
   if (document.readyState == "complete")
   {
        //test plugin load
		try
		{
			 _opinterface.connect("Enable");			 					
			chrome.tabs.onActivated.addListener(OnTabSelect);						
			chrome.browserAction.onClicked.addListener(OnbA_OnClicked);			
		}
		catch(error)
		{
			consolelog(error.message);
		}
   }
}
	 
function OnbA_OnClicked(tab)
{
   
}

function OnFocusChange(message)
{
  consolelog("winid = "+message.win.id+ " focused = "+message.focused);
  consolelog("url = "+message.tab.url); 
  consolelog("OnFocusChange = "+JSON.stringify(message));
  consolelog("OnFocusChange _validaterunning="+_validaterunning+" _validatePending="+_validatePending);
  if(message.focused && !message.minimize)
  {	 	 	
    if(_validaterunning == false && _validatePending == false)
	{
	    consolelog("onFocusChange - CheckAndValidate url="+message.tab.url);		
		chrome.tabs.sendMessage(message.tab.id,
		 {
			command : "CheckAndValidate", From : "onFocusChange", tabId : message.tab.id
		 }        
		 );	
		}
  }
else
  {
        if(_validatewindowid == -1)
		  return;
		
		if( (_validaterunning == true && _validatePending == false) || message.minimize)
		{
            ClosePrompt();   		
		    consolelog("onFocusChange - CancelOperation url="+message.tab.url);
		    _validatePending = false;
			consolelog("onFocusChange _validatePending false");
			_opinterface.request({command:"CancelOperation",From : "onFocusChange"},function(response){
			  consolelog("onFocusChange CancelOperation complete");		
			  return;			  
			});
		}
  }
}

function IsTabRemembered(tab)
{
   if(lastrememberedtab!=null)
   {
     if(tab == null)
	   return true;
	   
     if(tab.id == lastrememberedtab.id)
	   return true;
   }
   return false;
}

function onUpdated(tabId, changeInfo, tab){    
    if(IsChromeUrl(tab.url) == false && changeInfo.status == 'complete')
	{
		 if(IsTabRemembered(tab))
		   consolelog("onUpdated complete tab remembered==>"+tab.url);	
		 else
		   consolelog("onUpdated complete tab not remembered==>"+tab.url);	
	}
	 
	if(IsChromeUrl(tab.url) == false && changeInfo.status == 'complete' && IsTabRemembered(tab) && lastrememberedtab.processing == false)
	{
	  //lastrememberedtab.processing = true;
	  console.error("onUpdated start timer to checkremeberedtab ==>"+tab.url);	 		
      
	  if(lastrememberedtab.processtimer!=undefined)
	  {
	    console.error("kill old processtimer");
        clearTimeout(lastrememberedtab.processtimer);	  
	  }
		
	  lastrememberedtab.processtimer  = setTimeout(checkrememberedtab.bind(tab),3000);
	 	 
	  function checkrememberedtab(){      
	  console.error("checkrememberedtab ==>"+this.url);	  	  
	  chrome.webNavigation.getAllFrames({tabId:lastrememberedtab.id},function(frames){
	    var framecnt = frames.length;		
	    console.error("onUpdated frames ==>"+frames.length);
	    for(i=0;i<frames.length;i++)
		{		 	 
		  var frameurl = frames[i].url.substring(0,6).toLowerCase();
		  
		  if(frameurl == "about:")
		   framecnt = framecnt - 1;
	   
	       console.error("frame==>"+JSON.stringify(frames[i]));	
		   console.error("frameurl == >" + frameurl);
		}
		console.error("onUpdated valid frames ==>"+framecnt);
		
	    var _workercnt = Math.ceil(framecnt*30/100);
		console.error("onUpdated 30% frames cnt ==>"+_workercnt);
	    lastrememberedtab.responseobj = {workercnt:_workercnt,responsecnt:0,haspassword:false,responsecallback:function(res){	   
	                         this.responsecnt++;
			                 consolelog("haspassword ="+res.status+" rescnt="+this.responsecnt+" wrkcnt="+this.workercnt);	
							 if(this.haspassword == false)
						         this.haspassword = res.status;
								
							 if(this.responsecnt == this.workercnt)
							 {
							   consolelog("haspassword received all responses haspassword="+this.haspassword);      
                               if(this.haspassword)	                                
							      lastrememberedtab = null;							   								
                               else							   
								 {	
										lastrememberedtab.processprompt = true;
										console.error(" haspassword false show prompt");			       
										if(lastrememberedtab.prompt == true)	
										{                      
											var pagenum = 1;
											if(_opinterface._IsTrialExp == true && _opinterface._DontShowTrialMsg == false)
												pagenum = 5;

											chrome.tabs.sendMessage(tabId,{command:"ShowPrompt3",pagenum:pagenum});                     					 
										}
										else
										  SaveLogin(null);				
								 }
							 }							 
	                      }
	                     };			           					
           chrome.tabs.sendMessage(lastrememberedtab.id,{command:"HasPassword"});        
		});
	  }
	}
}

function OnTabSelect(tabinfo)
{
   try{
       lastrememberedtab = null;
	   lastauthenticatedtab = null;
	   chrome.tabs.get(tabinfo.tabId, function(tab)
	   {             	      
		   ClosePrompt();		   
		   if(tab == undefined)
		    return;
			
			consolelog("OnTabSelect url="+tab.url);
		   _opinterface.request({command:"CancelOperation",From : "OnTabSelect"},function(response){
           if(tab.url == undefined)
              return;
			 
           if(IsChromeUrl(tab.url))
		   {
		      consolelog("OnTabSelect chrome url hence do nothing");
              return;		   
		   }
	         
			 consolelog("OnTabSelect CheckAndValidate");
			 chrome.tabs.sendMessage(tabinfo.tabId,
			 {
				command : "CheckAndValidate", From : "OnTabSelect", tabId : tabinfo.tabId
			 }        
			 );		 		  
		  });
	   }
	   );
   }catch(err)
   {
   }
   return true;
}


//common response handler ...here we get result from contentscript 
function OnResponse(response)
{
    //alert("Response");
   if(response == null || response == undefined || response.For == null || response.For == undefined)
     return ;//true;

   if(response.For == "OnbA_OnClicked")
   {

   }
   

   return ;//true;
}



//request handler..here we handle request sent from content script    
function OnRequest(request, sender, sendResponse)
{
   consolelog(sender.tab ?
   "from a content script:" + sender.tab.url :
   "from the extension");
   
     if(sender.tab == null || request == null || request == undefined || request.command == undefined || request.command == null)
	 {
	 sendResponse(
      {
         farewell : "goodbye"
      }
      );
	  consolelog("OnRequest returns");
     return true;
	 }
     if(request.command == "pong")
	   {
	      consolelog(sender.tab ?
   "from a content script:" + sender.tab.url :
   "from the extension");
          if (typeof (sender.tab.responsecallback) != 'undefined' && sender.tab.responsecallback != null) 
		    sender.tab.responsecallback();
						
		  if (lastrememberedtab!=null && lastrememberedtab.id == sender.tab.id && lastrememberedtab.responsecallback != null) 
		    lastrememberedtab.responsecallback();
	   }
	   
	   if(request.command == "HasPassword")
	   {
		  if (lastrememberedtab!=null && lastrememberedtab.id == sender.tab.id && lastrememberedtab.responsecallback != null) 
		    lastrememberedtab.responsecallback(request);
			
		 if (lastrememberedtab!=null && lastrememberedtab.id == sender.tab.id && lastrememberedtab.responseobj != null) 
		    lastrememberedtab.responseobj.responsecallback(request);			
	   }
	   
	 consolelog("command ="+request.command);
	 _chromewindow.Event(sender.tab,request);
	 
    if(request.command == "CheckInit")
	 {
	   consolelog(request);
	   var loaded = _opinterface.IsLoaded();
	   //loaded = false;//test force fail
	   if(loaded == false || request.topframe == false)
	    sendResponse({CheckInit : loaded});
	   else
        {		
		   consolelog("do CheckSkipList");
		   //if toplevel frame and in skiplist then we fail directly to stop processing by sending checkinit false..
		   //as promptui is only loaded in top level frame...and if promptui is not loaded ..none of the 
		   //frames will process page...as it won't receive PromptUILoaded
		   _opinterface.request({command:"CheckSkipList",domain:request.domain},function(response){	  
               if(response.skipped == true)		   
	             sendResponse({CheckInit : false,MultiVltSupport : _opinterface.multiVltSupport});
			   else	 
			     sendResponse({CheckInit : true,MultiVltSupport : _opinterface.multiVltSupport});				
		   });
        }		
	 }
   else if (request.command == "StoreLoginData")
   {      
      var pgdata = JSON.parse(request.pagedata);
	  pgdata.command = request.command;
	  pgdata.WebUrl  =  GetPageUrl(sender.tab.url);
	  consolelog("sender url ="+ sender.tab.url);
	  consolelog("web url ="+ pgdata.WebUrl);
	  
	  lastrememberedtab = {id:sender.tab.id,url:sender.tab.url};
	  lastrememberedtab.pgdata = pgdata;		
	  lastrememberedtab.userenrolled = request.userenrolled;
	  lastrememberedtab.prompt = request.prompt;
	  lastrememberedtab.prompttype   = 2;
	  lastrememberedtab.processing = false;	
	 
      sendResponse(
      {
         farewell : "goodbye"
      }
      );
   }
   else if(request.command == "CheckAndValidate")
   {      
      consolelog("CheckAndValidate tabid = " + sender.tab.id);	  
	  consolelog(request);
      var pgdata = JSON.parse(request.pagedata);	       
      _validatetabid = sender.tab.id;
	  _validatewindowid = sender.tab.windowId;
	  pgdata.command = "CheckAndValidate";	
	  pgdata.WebUrl  = GetPageUrl(sender.tab.url);
	  
	  if(IsWildCardPage(pgdata.WebUrl))
		  pgdata.passfieldname = "*";
	  
	  if(lastauthenticatedtab != null)
	  {		  
		  if(IsTabAuthCached(sender.tab))
		  {		  
	          consolelog("return from auth cache =" + lastauthenticatedtab.url + "," + sender.tab.url);
			  sendResponse(
			  {
				 logindata : JSON.stringify(lastauthenticatedtab.logindata)
			  });
			  lastauthenticatedtab = null;
			  return;
		  }		  
	  }
	  
      _opinterface.request(pgdata,function(response){

		  //Update trial params
		  if(response.TrialExpired != undefined  && response.DontShowTrialMsg != undefined ) {
			_opinterface._IsTrialExp = response.TrialExpired;
		  	_opinterface._DontShowTrialMsg = response.DontShowTrialMsg;
		  }
		  	          
          if(response.CommandError != COMMAND_ERROR_SUCCESS)
		  {
			if(response.CommandError == COMMAND_ERROR_VAULTSELECT)
			{
				_validatePending = true;
				consolelog("CheckAndValidate _validatePending true");
			}

		    sendResponse({});
		    return;
		  }		  		 
		  
		  consolelog("CheckAndValidate from lauchsite");

		  if(ShouldCacheTabAuth(sender.tab.url))
		  {
              consolelog("cache auth data " + sender.tab.url);			  
			  lastauthenticatedtab = {id:sender.tab.id,url:sender.tab.url};
			  lastauthenticatedtab.url = lastauthenticatedtab.url.toLowerCase();
			  lastauthenticatedtab.logindata = response;			  
		  }else
			  lastauthenticatedtab = null;
		  
		  sendResponse(
		  {
			 logindata : JSON.stringify(response)
		  }
		  );
	  });
   }
   else if(request.command == "RememberPwdWithoutPrompt")
   {      
	  var cmd = {"command":request.command};	  
	  _opinterface.request(cmd,function(response){	 		  
		  consolelog("RememberPwdWithoutPrompt = " + response.noprompt);
		  sendResponse(response);
	  });
   } else if(request.command == "IsPageRemembered")
   {  
      if(_opinterface.multiVltSupport == 0)
         request.webPageUserId = "";
	 
	  if(IsWildCardPage(request.WebUrl))
		  request.passfieldname = "*";
	  
	  _opinterface.request(request,function(response){	   
		  consolelog("IsPageRemembered = " + response.isremembered);
          sendResponse(response);
	  });
   }
   else if(request.command == "SetRememberPwdWithoutPrompt")
   {      
      _opinterface.request({command:"SetRememberPwdWithoutPrompt"},function(response){  	
		  sendResponse(
		  {
			 farewell : "goodbye"
		  }
		  );	  
	  });
   }else if(request.command == "SetPluginParam")
   {
      consolelog("SetPluginParam ");  
	  _opinterface.request(request,function(response){
	  });
	  
      sendResponse(
      {
         farewell : "goodbye"
      }
      );	  
   }
   else if(request.command == "GetLang")
   {      
      if(_language == "")
	  {   
		  _opinterface.request({command:"GetLang"},function(response){	  
				_language = response.Lang;
				consolelog("getlang ="+_language);
				 sendResponse({lang : _language});
		  });		
      }else
	  {
		  sendResponse({lang : _language});
	  }
   }else if(request.command == "ShowPrompt")
   {      
      consolelog(request);
      //if request coming from promptpage/frame then we skip setpage..because
	  //it is handled by the same page...and it has already done by it.
	  if(request.pagenum && request.From != "PromptPage")
	  {
		  if(_opinterface._IsTrialExp == true && _opinterface._DontShowTrialMsg == false)	
		  		request.pagenum = 5;
				  
		  chrome.tabs.sendMessage(sender.tab.id,
		  {
			 command : "SetPage",pagenum:request.pagenum
		  }      
		  );
	  }
	  if(request.topframe == false) //if request comming from topframe then dont process
	  {
		  chrome.tabs.sendMessage(sender.tab.id,
		  {
			 command : "ShowPrompt",pagenum:request.pagenum
		  }      
		  );
	  }
   }else if(request.command == "HidePrompt")
   {
      chrome.tabs.sendMessage(sender.tab.id,
      {
         command : "HidePrompt"
      }      
      );
   }else if(request.command == "ProcessPrompt")
   {           
      if(IsTabRemembered(sender.tab))
	  {
	     SaveLogin(null,request.promptdata);
	  }else
	  {
		  if(request.promptdata.dontshowtrialmsg == true)
			 _opinterface.request({command : "SetNeverShowTrialMsg"});

		  chrome.tabs.sendMessage(sender.tab.id,
		  {
			 command:"ProcessPrompt",promptdata:request.promptdata
		  }      
		  );
	  }
   }else if(request.command == "PromptUILoaded")
   {      
      chrome.tabs.sendMessage(sender.tab.id,
      {
         command:"PromptUILoaded"
      }      
      );
   }else if(request.command == "CancelOperation")
   {      
      _opinterface.request({command:"CancelOperation",From : "onSubmit"},function(response){});
   }else if(request.command == "keyevent")
   {
      _opinterface.request(request,function(response)
      {
        sendResponse(response);
      });

   }else    
   sendResponse(
   {
   }
   );
   return true;   
}
  

function OnManualAuth(data)
{
   var tempvalidatetabid = _validatetabid;
   ClosePrompt();
   consolelog("OnManualAuth");
   if(tempvalidatetabid!=-1)
   {   
      consolelog("OnManualAuth "+JSON.stringify(data));
	  
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  var currTab = tabs[0];
	  if (currTab) {
		
		if(tempvalidatetabid == currTab.id && ShouldCacheTabAuth(currTab.url))
		  {
			  consolelog("OnManualAuth cache auth data " + currTab.url);			  
			  lastauthenticatedtab = {id:currTab.id,url:currTab.url};
			  lastauthenticatedtab.url = lastauthenticatedtab.url.toLowerCase();
			  lastauthenticatedtab.logindata = data;			  
		  }else
			  lastauthenticatedtab = null;
	  }
	  consolelog("OnManualAuth send data");
	  chrome.tabs.sendMessage(tempvalidatetabid, 
		  {
			 command : "FormFill", logindata : JSON.stringify(data), From : "OnManualAuth"
		  });
	  tempvalidatetabid = -1;
     });	 
   }
}

function ClosePrompt()
{  
 if(_validatetabid!=-1)
   {
      consolelog("ClosePrompt");
      chrome.tabs.sendMessage(_validatetabid,
      {
         command : "ClosePrompt", From : "ClosePrompt"
      }
      );	
      _validaterunning = false;	  	  
   }
}

function OnValidateASync(status,strdevid,msg)
{
   consolelog("OnValidateASync = "+_validatetabid+"," + status +","+strdevid+","+msg);
   if(_validatetabid!=-1)
   {      
	  _validaterunning = true;
	  if(status == AUTHSTAT_DEVICE_OPERATION_CANCELLED)
	  {	    
	    consolelog("OnValidateASync AUTHSTAT_DEVICE_OPERATION_CANCELLED:ClosePrompt");
		_validatePending = false;
		if(msg != "TrialMode")
		{
	    	ClosePrompt();
			return;
		}
		consolelog("OnValidateASync _validatePending false");
		//If we are here it means trial mode is expired, so reset the status.
		status = -1;
	  }
	if(_opinterface.multiVltSupport && status == -1)
	{
	 	if(strdevid != -1)
		{
			_validaterunning = true;
			_validatePending = false;
			consolelog("OnValidateASync _validaterunning true _validatePending false");
		}
	}
	  
      chrome.tabs.sendMessage(_validatetabid,
      {
         command : "AsycnMessage", message : {msg:msg,status:status,strdevid:strdevid}, From : "OnValidateASync"
      }
      );
   }
}

function SaveLogin(callback,res)
{
   consolelog("SaveLogin -- save creds");      
	var pagenum = 1;	
    if(lastrememberedtab.userenrolled == false)
	   lastrememberedtab.pgdata.enrolluser = true;
	
	if(lastrememberedtab.prompt == false)
	{
	    _opinterface.request(lastrememberedtab.pgdata,function(response){	           	
		   consolelog("SaveLogin -- creds saved");			
		   if(callback)
		     callback(response);
		});
		lastrememberedtab = null;
	}else if(typeof (res) != 'undefined' && res!=null)
	{	    		
		   var promptdata = res;		   
		   consolelog("promptdata ="+ promptdata.alwaysremember);
		   if(lastrememberedtab == null)
		   {
		     if(callback)
		      callback({});
			 return;
		   }
		   promptdata.userenrolled = lastrememberedtab.userenrolled;
		   if(lastrememberedtab.userenrolled == true && promptdata.alwaysremember)
			 _opinterface.request({command : "SetRememberPwdWithoutPrompt"});
			
		   if(promptdata.dontshowtrialmsg)
			 _opinterface.request({command : "SetNeverShowTrialMsg"});
		   
		   if(promptdata.save)
			  {
				 _opinterface.request(lastrememberedtab.pgdata,function(response){			  			  
				   consolelog("SaveLogin -- creds saved");			
				    if(response.CommandError == COMMAND_ERROR_SUCCESS)
					{
					  if(promptdata.userenrolled == false && response.isenrolled == true && promptdata.alwaysremember == true)
					  {
					    _opinterface.request({command : "SetRememberPwdWithoutPrompt"});
					  }
					}
				   if(callback)
		             callback(response);
				});
			  }else
              {
			    if(callback)
		          callback(res);
              }          
		   lastrememberedtab = null;		
    }	
}