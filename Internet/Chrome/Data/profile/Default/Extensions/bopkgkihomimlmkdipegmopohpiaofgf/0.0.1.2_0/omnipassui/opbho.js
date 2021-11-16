var DefaultButton = null;	
firePageLoadEventOnCount = 2;

function consolelog(str)
{
   return;
   console.log(str);
}

function enrwiz_btnSubmit_Status_Script(status) {
		if (status == 1) {
			//alert("OP_SCRIPT_STATUS_ENABLE ");
			BtnNext.MakeBtnEnable();
		}
		else if (status == 2) {
			//alert("OP_SCRIPT_STATUS_DISABLE ");
			BtnNext.MakeBtnDisable();
		}
		else if (status == 3) {
			// alert("OP_SCRIPT_STATUS_HIDDEN ");
			BtnNext.MakeVisible(false);
		}
		else if (status == 4) {
			//alert("OP_SCRIPT_STATUS_VISIBLE");
			BtnNext.MakeVisible(true);
		}
		else if (status == 5) {
			//alert("OP_SCRIPT_STATUS_UPDATE");
			BtnNext.SetTitle(enrwiz_btnSubmit.value);
		}
}

function OmniPass_BtnYes_Status_Script(status) {
	if (status == 1) {
		//alert("OP_SCRIPT_STATUS_ENABLE ");
		BtnYes.MakeBtnEnable();
	}
	else if (status == 2) {
		//alert("OP_SCRIPT_STATUS_DISABLE ");
		BtnYes.MakeBtnDisable();
	}
	else if (status == 3) {
		// alert("OP_SCRIPT_STATUS_HIDDEN ");
		BtnYes.MakeVisible(false);
	}
	else if (status == 4) {
		//alert("OP_SCRIPT_STATUS_VISIBLE");
		BtnYes.MakeVisible(true);
	}
	else if (status == 5) {
		//alert("OP_SCRIPT_STATUS_UPDATE");
		BtnYes.SetTitle(OmniPass_BtnYes.value);
	}
}

function OmniPass_BtnNo_Status_Script(status) {
	if (status == 1) {
		//alert("OP_SCRIPT_STATUS_ENABLE ");
		BtnNo.MakeBtnEnable();
	}
	else if (status == 2) {
		//alert("OP_SCRIPT_STATUS_DISABLE ");
		BtnNo.MakeBtnDisable();
	}
	else if (status == 3) {
		// alert("OP_SCRIPT_STATUS_HIDDEN ");
		BtnNo.MakeVisible(false);
	}
	else if (status == 4) {
		//alert("OP_SCRIPT_STATUS_VISIBLE");
		BtnNo.MakeVisible(true);
	}
	else if (status == 5) {
		//alert("OP_SCRIPT_STATUS_UPDATE");
		BtnNo.SetTitle(OmniPass_BtnNo.value);
	}
}	
	function OmniPass_BtnOk_Status_Script(status) {
	if (status == 1) {
		//alert("OP_SCRIPT_STATUS_ENABLE ");
		BtnOk.MakeBtnEnable();
	}
	else if (status == 2) {
		//alert("OP_SCRIPT_STATUS_DISABLE ");
		BtnOk.MakeBtnDisable();
	}
	else if (status == 3) {
		// alert("OP_SCRIPT_STATUS_HIDDEN ");
		BtnOk.MakeVisible(false);
	}
	else if (status == 4) {
		//alert("OP_SCRIPT_STATUS_VISIBLE");
		BtnOk.MakeVisible(true);
	}
	else if (status == 5) {
		//alert("OP_SCRIPT_STATUS_UPDATE");
		BtnOk.SetTitle(OmniPass_BtnOk.value);
	}
}		

function SetStatus(option) {
	enrwiz_btnSubmit_Status_Script(3)
	OmniPass_BtnYes_Status_Script(3)
	OmniPass_BtnNo_Status_Script(3)
	OmniPass_BtnOk_Status_Script(3)
	
	document.getElementById('enrwiz_LblStatus1').style.display = 'none';
	document.getElementById('enrwiz_LblRememberPassword').style.display = 'none';
    $('#enrwiz_EditPassword').val('');	  
	resetTrialChanges(1);
	if (option == 1 || option == 5) //remeber prompt
	{
	    document.getElementById('enrwiz_LblRememberPassword').style.display = 'block';
		document.getElementById('lyrRemember').style.display = 'block';
		document.getElementById('lyrAuthentication').style.display = 'none';
		enrwiz_btnSubmit_Status_Script(3)
		OmniPass_BtnYes_Status_Script(4)
		OmniPass_BtnNo_Status_Script(4)
		OmniPass_BtnOk_Status_Script(3)
		if(option == 5)
		{
			document.getElementById('containerCheckboxTrial').style.display = 'block';
			document.getElementById('containerCheckboxFull').style.display = 'none';
			
			document.getElementById('containerTextTrial').style.display = 'block';
			document.getElementById('containerTextFull').style.display = 'none';
			
			document.getElementById('containerMsgTrial').style.display = 'block';
			document.getElementById('ccntainerMsgFull').style.display = 'none';
			
			OmniPass_BtnYes_Status_Script(3);
			OmniPass_BtnNo_Status_Script(3)
			OmniPass_BtnOk_Status_Script(4);
			
			DefaultButton = BtnOk
		}
		else
		{
			DefaultButton = BtnYes
		}
	}
	else if (option == 2)  //mp
	{
		document.getElementById('lyrRemember').style.display = 'none';
		document.getElementById('lyrAuthentication').style.display = 'block';
		enrwiz_btnSubmit_Status_Script(4);
		OmniPass_BtnYes_Status_Script(3);
		OmniPass_BtnNo_Status_Script(3);

		DefaultButton = BtnNext
	} else if (option == 3)  //wbf
	{
	    document.getElementById('enrwiz_LblStatus1').style.display = 'block';
		document.getElementById('lyrRemember').style.display = 'block';
		document.getElementById('lyrAuthentication').style.display = 'none';
		document.getElementById('enrwiz_CheckBoxAlwaysRemember').style.display = 'none';
		document.getElementById('enrwiz_LblAlwaysRemember').style.display = 'none';

		enrwiz_btnSubmit_Status_Script(3)
		OmniPass_BtnYes_Status_Script(3)
		OmniPass_BtnNo_Status_Script(3)
		DefaultButton = null;
	}
}

function resetTrialChanges(option)
{
	if (Number(option) == 1)
	{
		document.getElementById('containerCheckboxTrial').style.display = 'none' ;
		document.getElementById('containerCheckboxFull').style.display = 'block';
			
		document.getElementById('containerTextTrial').style.display = 'none';
		document.getElementById('containerTextFull').style.display = 'block';
			
		document.getElementById('containerMsgTrial').style.display = 'none';
		document.getElementById('ccntainerMsgFull').style.display = 'block';
		
		$('#enrwiz_CheckBoxDoNotShowTrial').attr('checked',false);
		
		OmniPass_BtnYes_Status_Script(4);
		OmniPass_BtnNo_Status_Script(4)
		OmniPass_BtnOk_Status_Script(3);	
		DefaultButton = BtnYes;
	}
}
   
function SetMsg(option,msg)
{
   if(option == 1) //MP
   {
	   document.getElementById('enrwiz_LblStatus').innerHTML = msg ;
   }
   else if(option == 2) //WBF
   {
	   document.getElementById('enrwiz_LblStatus1').innerHTML = msg;
   }
}   
   
function OPLoadXML(langfol)
{	  
    var xmlpath = "omnipassui/Lang/"+langfol+"/index.xml"
    var xmlResources = new XmlResource(chrome.runtime.getURL(xmlpath));
	xmlResources.LoadXMLFile(function () {	        
			xmlResources.SetXmlText("opbhoprmpt");
			PageLoadComplete();
	});
}

$(document).ready(function () {    
	
	$('#page_loadcomplete').click(function(){
	    window.parent.postMessage({origin:"$omnipass$",command:"PromptUILoaded",height:document.getElementById('lyrMain').offsetHeight},"*");//HTML5 communication
	});

	BtnNext = new Button('opbhoprmpt', 'BtnNext');
	BtnNext.srcObjid = "enrwiz_btnSubmit";
	BtnNext.tabIndex = 2;
	BtnNext.isDefault = true;
	BtnNext.AddButton('', 400, 7, 100, 26, 'submit', 'lyrButton');

	BtnYes = new Button('opbhoprmpt', 'BtnYes');
	BtnYes.srcObjid = "OmniPass_BtnYes";
	BtnYes.tabIndex = 1;
	BtnYes.isDefault = true;
	BtnYes.AddButton('', 550, 7, 100, 26, 'submit', 'lyrButton');

	BtnNo = new Button('opbhoprmpt', 'BtnNo');
	BtnNo.srcObjid = "OmniPass_BtnNo";
	BtnNo.tabIndex = 2;
	BtnNo.isDefault = true;
	BtnNo.AddButton('', 670, 7, 110, 26, 'submit', 'lyrButton');
	
	BtnOk = new Button('opbhoprmpt', 'BtnOk');
	BtnOk.srcObjid = "OmniPass_BtnOk";
	BtnOk.tabIndex = 2;
	BtnOk.isDefault = true;
	BtnOk.AddButton('', 670, 7, 110, 26, 'submit', 'lyrButton');

	 //this changes target pages font
	var xmlResourcesSetting = new XmlResource(chrome.runtime.getURL("omnipassui/settings.xml"));
	xmlResourcesSetting.LoadXMLFile(function () {
		xmlResourcesSetting.SetStyleSheet();
		xmlResourcesSetting.SetElementStyle("opbhoprmpt");
		xmlResourcesSetting.SetButtonElement("opbhoprmpt", "opbhoprmpt");
		PageLoadComplete();
    });

	chrome.runtime.sendMessage({command:"GetLang"}, function(response) 
	{
		 OPLoadXML(response.lang); 
	}); 
	SetStatus(0);
	BtnNext.AddEventListeners();
	BtnYes.AddEventListeners();
	BtnNo.AddEventListeners();	
	BtnOk.AddEventListeners();		
});