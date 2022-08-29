function consolelog(str)
{
   return;
   console.log(str);
}

$(document).ready(function () {

	$("#enrwiz_btnOK").click(function(){
		 var pass = GetPassword();
		 chrome.runtime.sendMessage(
		   {
			  command : "SetPluginParam", strdevid :"44525675",param : pass
		   });		
	});	
});


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
	
    consolelog("command ="+request.command);	
	 
    if(request.command == "AsycnMessage")
	{ 
	     consolelog("prompt frame "+document.domain);
         consolelog("prompt frame "+document.URL);	
	     consolelog(request.message);
		 sendResponse({});
	     if(request.message.status == -1)
		 {		 	
         	SetStatus(2);
        	SetPageText(1);			
		 }
		 
		 //request.message.status == -1 means initmsg
		 if(request.message.strdevid == "44525675" && request.message.status == 5)
		 {
		    ResetPasswordLayer();
			SetStatus(2);
	        SetPageText(2);
		 }
			
		 if(request.message.status == 0)
		 {		  
		   ResetPasswordLayer();
		 }		
		return true;
	}
		
    return true;		
}
