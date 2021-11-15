function consolelog(str)
{
   return;
   console.log(str);
}

function OmniPassInterface(_callbackvalidateasynlistener,_callbackformfilllistner)
{
this.port = null;
this.callbacks = {};
this.id = 0;
this.callbackvalidateasynlistener = _callbackvalidateasynlistener;
this.callbackformfilllistner      = _callbackformfilllistner;
this.request  = request;
this.connect = connect;
this.onNativeMessage = onNativeMessage; 
this.onDisconnected  = onDisconnected; 
this.IsLoaded        = IsLoaded;
this.lastrequest     = "";
this.lastresponse    = "";
this.maxretry        = 5;
this.retry           = 0;
this.multiVltSupport = false;
this._IsTrialExp 	 = false;
this._DontShowTrialMsg = false;
	
	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
	
	function request(message, callback) {
		    consolelog("onNativeMessage -- prepare request");     
			// Insert timestamp id			
			while (this.callbacks[this.id]) { this.id++; consolelog("onNativeMessage get request id");}

			message.id = this.id;
			this.callbacks[this.id] = callback;        
			if(this.port == null)
			{			  
			  console.error("disconnected from native app.something bad has happened for unknown reason. so lets try to connect again");
			  console.error("current request ="+JSON.stringify(message));
			  console.error("lastrequest ="+this.lastrequest);
			  console.error("lastresponse ="+this.lastresponse);		
              if(this.retry < this.maxretry)
			  {
			   this.retry++;
			   this.connect("Enable");
			  }else
			   console.error("disconnected from native app.max retries over..");			  
			}		
            this.lastrequest = JSON.stringify(message);		
			if(this.port != null)
			{
			  consolelog("onNativeMessage -- request send success ="+JSON.stringify(message));				  
			  this.port.postMessage(message);
			}
	};
	
	function IsLoaded()
	{
	  if(this.port!=null)
	    return true;
	  else
        return false;	  
	}

	function connect(purpose) {

	if(this.IsLoaded()== false) {
		var hostName = "com.google.chrome.opbhohost";  
	  	this.port = chrome.extension.connectNative(hostName);
	  	this.port.onMessage.addListener(this.onNativeMessage.bind(this));
	  	this.port.onDisconnect.addListener(this.onDisconnected.bind(this));	  
		}
		if(this.IsLoaded())
		{
			this.request({"command":"Identify","name":"chrome","purpose":purpose},function(res){
			console.log("onConnected identify ="+JSON.stringify(res));
            if(res.MultiVltSupport == undefined || res.productverinfo == undefined )
                this.multiVltSupport = 0;
            else
            {
               //Check HPSimplepass build number.
               //Multi Vault Support is available only with 8.01.59 and above
               if(res.productverinfo.releasever >=2049 && parseInt(res.productverinfo.webversion,10) >= 59)          		
			      this.multiVltSupport = res.MultiVltSupport;
               else
                  this.multiVltSupport = 0;
            }
				if(res.TrialExpired == undefined)
					this._IsTrialExp = false;
				else
					this._IsTrialExp = res.TrialExpired;
				
				if(res.DontShowTrialMsg == undefined)
					this._DontShowTrialMsg = false;
				else
					this._DontShowTrialMsg = res.DontShowTrialMsg;

				if(this._IsTrialExp)
					this.multiVltSupport = 0;
			}.bind(this));
		}
	}
	
	function onDisconnected() {
	   console.error("Failed to connect: " + chrome.runtime.lastError.message);
	   console.error("lastrequest ="+this.lastrequest);
	   console.error("lastresponse ="+this.lastresponse);
	   this.port = null;      
    }


	function onNativeMessage(message) {
	   	consolelog("onNativeMessage Received message: " + JSON.stringify(message));
		this.lastresponse = JSON.stringify(message);
		 
		 if (this.callbacks.hasOwnProperty(message.id)) {
					this.callbacks[message.id].apply(this, [message]);
					//this.callbacks[message.id](message);
		}

		
		if(message.command == "ValidateAsyncMsg")
		{
		  if(this.callbackvalidateasynlistener == null)
		  {
		   consolelog("onNativeMessage validateasynlistener is null");
		   return;
		  }
		  
		  this.callbackvalidateasynlistener(message.status,message.strdevid,message.msg)
		  consolelog("onNativeMessage end");
		  return;
		}
		
		if(message.command == "FormFill")
		{
		  if(this.callbackformfilllistner == null)
		  {
		   consolelog("onNativeMessage formfilllister is null");
		   return;
		  }
		  
		  this.callbackformfilllistner(message)
		  consolelog("onNativeMessage end");
		  return;
		}
		
		
		// Remove callback
		delete this.callbacks[message.id];
		if (Object.size(this.callbacks) == 0) {
				this.id = 0;
		}
		
		consolelog("onNativeMessage end");
	}
}