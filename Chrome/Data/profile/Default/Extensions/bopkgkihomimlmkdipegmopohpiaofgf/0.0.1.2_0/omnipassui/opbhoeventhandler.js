var AUTHSTAT_SUCCESS = 0;
var AUTHSTAT_FAILURE = 5;
var _PromptUILoaded = false;
var _ShowPromptMsg = null;

function consolelog(str)
{
   return;
   console.log(str);
}

$(document).ready(function () {
	$("#enrwiz_EditPassword").keypress(function () {
		$("#enrwiz_LblStatus").html("");
	});
	
	$("#OmniPass_BtnYes").click(function(){
		ProcessPrompt(true);
        HidePrompt();
	});	
	
	$("#OmniPass_BtnNo").click(function(){
		ProcessPrompt(false);
		HidePrompt();
	});
	
	$("#OmniPass_BtnOk").click(function(){
		ProcessPrompt(false);
		HidePrompt();
	});
	
	$("#enrwiz_btnSubmit").click(function(){
		 var pass = GetPassword();
		 chrome.runtime.sendMessage(
		   {
			  command : "SetPluginParam", strdevid :"44525655",param : pass
		   });		
	});	
});

$(window).resize(function () {
//	$("#lyrMain").width(document.body.scrollWidth - 4);
});

$(document).keypress(function (event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);

	if (((window.event.srcElement.id).indexOf("_BlankBtn") != -1) || (window.event.srcElement.type == "image")) {
		return true;
	}
	else {
		if (keycode == 13) {
			if (DefaultButton != null && DefaultButton.disabled == false) {
				DefaultButton.SetFocus();
				DefaultButton.Click();
			}
		}
	}
});

//////////////////
function ProcessPrompt(res)
{
  var _alwaysremember = GetChkBoxAlwaysRemember();  
  var _neverremember    = GetChkBoxNeverRemember();
  var _dontshowtrialmsg = GetChkBoxDontShowTrialMsg(); 
  var _promptdata = {save:res,alwaysremember:_alwaysremember,neverremember:_neverremember,dontshowtrialmsg:_dontshowtrialmsg};
  chrome.runtime.sendMessage({command : "ProcessPrompt",promptdata :_promptdata});
}

function GetChkBoxAlwaysRemember()
{
  return $('#enrwiz_CheckBoxAlwaysRemember').is(":checked");
}
function GetChkBoxNeverRemember()
{
	return $('#enrwiz_NeverRemember').is(":checked");
}
function GetChkBoxDontShowTrialMsg()
{
	return $('#enrwiz_CheckBoxDoNotShowTrial').is(":checked");
}

function GetPassword()
{
  return $('#enrwiz_EditPassword').val();
}


//////////////////////extension communication

chrome.runtime.onMessage.addListener(OnRequest);

function OnRequest(request, sender, sendResponse) 
{
	if(request == null || request == undefined || request.command == undefined || request.command == null)
	{
		 sendResponse(
		  {
			 farewell : "goodbye"
		  }
		  );
		  consolelog("OnRequest returns");
		  return true;
    }
	
    console.log("command ="+request.command+" ==>"+document.domain);	
	 
    if (request.command == "SetPage")
    { 
		SetStatus(request.pagenum);
		sendResponse({});		
	}else if(request.command == "AsycnMessage")
	{ 
	     consolelog(request.message);
		 sendResponse({});
	     if(request.message.status == -1)
		 {
			 SetStatus(0);
			 if(request.message.msg == "TrialMode")
			 {
				SetStatus(5);
				SetMsg(2,request.message.msg);
				ShowPrompt(5);
			 }
			 else if(request.message.strdevid == "44525676") //WBF
			 {
				SetStatus(3);
				SetMsg(2,request.message.msg);
				ShowPrompt(3);
			 }
			 else if(request.message.strdevid == "44525655") //MP
			 {
				SetStatus(2);
				SetMsg(1,"");
				ShowPrompt(2);
				$('#enrwiz_EditPassword').focus();
			 }else if(request.message.strdevid == "44525675") //GPA
			 {
				SetStatus(3);
				SetMsg(2,request.message.msg);
				ShowPrompt(4);
			 }
			 
             consolelog("prompt frame "+document.domain);
             consolelog("prompt frame "+document.URL);			 
			
		 }
		 
		 //request.message.status == -1 means initmsg
		 if(request.message.strdevid == "44525676" && request.message.status!=-1) //WBF
			SetMsg(2,request.message.msg);
		 else if(request.message.strdevid == "44525655" && request.message.status!=-1) //MP
		 {
			SetMsg(1,request.message.msg);
			if(request.message.status == AUTHSTAT_FAILURE)
			{
			 $("#enrwiz_EditPassword").val("");
			 $('#enrwiz_EditPassword').focus();			 
			}
		 }
			
		 if(request.message.status == AUTHSTAT_SUCCESS)
		 {		  
		   SetStatus(0);
		 }		
		return true;
	}else if(request.command == "ShowPrompt3")
    { 
		 console.log("OnRequest "+request.command + "  "+document.domain+" _PromptUILoaded"+_PromptUILoaded);
		 if(_PromptUILoaded)
		 {
		  SetStatus(request.pagenum);
		  ShowPrompt(request.pagenum);		   
		 }else
		 {
		   _ShowPromptMsg = request;		   
		 }	
		 sendResponse({});	  	
    }else if(request.command == "PromptUILoaded")
    {
        console.log("promptui is loaded so lets processpage now1 "+document.domain);        
		_PromptUILoaded = true;		
		console.log("promptui is loaded so lets processpage now2 "+document.domain);   		
	
        if(_ShowPromptMsg!=null)
		 {
		   console.log("OnRequest delayed showprompt "+request.command + "  "+document.domain);	  	  	         		 
		   SetStatus(_ShowPromptMsg.pagenum);
		   ShowPrompt(_ShowPromptMsg.pagenum);	
		   _ShowPromptMsg = null;
		 }           		
    }
		
    return true;		
}
