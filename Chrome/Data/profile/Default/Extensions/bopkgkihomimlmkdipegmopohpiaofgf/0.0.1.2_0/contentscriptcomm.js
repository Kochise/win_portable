var _SetRememberWithoutPromptCalled = false;
var _PromptUILoaded = false;
var _ShowPromptMsg = null;
chrome.runtime.onMessage.addListener(OnRequest);

function consolelog(str)
{
   return;
   console.log(str);
}

function OnPageload()
{
	 consolelog("complete "+document.domain);
	 SendMessage(
	 {
		command : "CheckInit",domain:document.domain,topframe: (self == top)
	 }
	 ,function(response)
	 {
	     if(response == undefined)
		 {
			consolelog("CheckInit Response::"+response);
			return;
		 }
		 _MultiVltSupport = response.MultiVltSupport;
		 consolelog(response);
		 if(response.CheckInit == false)
			return;
			
		 consolelog("LoadPromptUI "+document.domain);	
		 LoadPromptUI();
		 window.parent.postMessage({origin:"$omnipass$",command:"IsPromptUILoaded"},"*");//HTML5 communication
	 });
}

function OnRequest(request, sender, sendResponse) 
{
    if(request == null || request == undefined || request.command == null || request.command == undefined)
	 {
	 sendResponse(
      {
         farewell : "goodbye"
      }
      );
     return true;
	 }
	 console.log(request.command);
   
   if (request.command == "ping")
   {
		SendMessage({command:"pong"});
		sendResponse({});		
   }else if (request.command == "FormFill")
   {
      if(request.logindata == undefined)
       {
         sendResponse({}); 
         return true;
       }
         
       var logindata = JSON.parse(request.logindata);      	   
       FormFiller(logindata.LoginData,logindata.clickok);
       sendResponse({});      
   }
   else if (request.command == "EnumGetPass")
   {
      _DocumentTitle = GetDocumentTitle();
      _webpageurl =  GetPageUrl();
      ProcessPage(PROCESS_FIELD_ACTION_GETPASSWORDFIELD);
      if (_webusridFlg == false || _passFlg == false) 
       {         
         return true;
       }
      var pgdata = "{\"DocumentTitle\":\""+_DocumentTitle+"\",\"WebUrl\":\""+_webpageurl+"\",\"unamefield\":\""+_unamefieldname+"\",\"webPageUserId\":\""+_webPageUserId+"\",\"passfieldname\":\""+_passfieldname+"\",\"webPagepassword\":\""+_webPagepassword+"\"}";
      sendResponse(
      {
         pagedata : pgdata, For : request.From, tabId : request.tabId
      }
      );
   }/*else if(request.command == "ClosePrompt")
   {
      HidePrompt();
   }*/else if(request.command == "ShowPrompt")
   { 
     console.log("OnRequest "+request.command + "  "+document.domain+" _PromptUILoaded"+_PromptUILoaded);
     if(ShowPrompt(request.pagenum,true))
	 {
      consolelog("OnRequest top "+request.command + "  "+document.domain);      
      sendResponse({});	  	  
	 }	 
   }else if(request.command == "HidePrompt" || request.command == "ClosePrompt")
   { 
     consolelog("OnRequest "+request.command + "  "+document.domain);
     if(HidePrompt(true))
	 {
      consolelog("OnRequest top "+request.command + "  "+document.domain);      
	  sendResponse({});
	 }	  
   }else if(request.command == "PromptUILoaded")
   {
        consolelog("promptui is loaded so lets processpage now1 "+document.domain);
        if(IsPromptPage()) return true;
		_PromptUILoaded = true;
		
		consolelog("promptui is loaded so lets processpage now2 "+document.domain);   		
		 checkpage();
		 if (_webusridFlg == true && _passFlg == true) 
		 {
			consolelog(document.domain + " is hooked");			
			HookSubmitEvent();					
		 }else
		 {      
			_webusridFlg = false;_passFlg  = false;
			consolelog(document.domain + " will be hooked after 1500ms");
			setTimeout(HookSubmitEvent,1500); 
			setTimeout(checkpage,1500); 
		 }

         if(_ShowPromptMsg!=null && self == top)
		 {
		     console.log("OnRequest delayed showprompt "+request.command + "  "+document.domain);
			 SendMessage({command : "ShowPrompt",pagenum:_ShowPromptMsg.pagenum,From:"top",topframe:true});			  
			 ShowPrompt(_ShowPromptMsg.pagenum,true);                             
             _ShowPromptMsg.sendResponse({});	  	  	         
			 _ShowPromptMsg = null;
		 }		 
   }else if(request.command == "CheckAndValidate")
   {
     if (_PromptUILoaded == false)
	 {
		 console.error("prompt ui is not loaded hence fail =" + document.domain);
		 sendResponse({});
		 return ;
	 }
	 console.log("CheckAndValidate promptui loaded =" + document.domain);
     _alreadyAuthenticated = false; 
     checkpage();
	  if (_webusridFlg == true && _passFlg == true) 
	   sendResponse({});
   }else if(request.command == "ShowPrompt2")
   { 
 	 console.log("OnRequest "+request.command + "  "+document.domain+" _PromptUILoaded"+_PromptUILoaded);
     if(_PromptUILoaded && ShowPrompt(request.pagenum,true))
	 {
	  SendMessage({command : "ShowPrompt",pagenum:request.pagenum,From:"top",topframe:true});
      consolelog("OnRequest top "+request.command + "  "+document.domain);      
      sendResponse({});	  	  
	 }else
     {
	   _ShowPromptMsg = request;
       _ShowPromptMsg.sendResponse = sendResponse;
     }	
   }else if (request.command == "HasPassword")
   {	    
		ProcessPage(PROCESS_FIELD_ACTION_ENUMIEFIELD);	    
		SendMessage({command:"HasPassword",status:_passFlg});	    		
		console.log(document.domain+"==>"+_passFlg+"==>"+document.readyState);
		sendResponse({});		
   }
	 
   return true;
}
