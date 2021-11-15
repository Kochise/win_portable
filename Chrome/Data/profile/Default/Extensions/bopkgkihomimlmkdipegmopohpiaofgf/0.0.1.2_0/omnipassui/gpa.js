var aryPassword;
var sizePin = 4;
var selectedCategoryId;
var timeoutInMilliseconds = 500;
var timerId;

var xmlResources = null;
var xmlResourcesSetting = null;
firePageLoadEventOnCount = 2;


function consolelog(str)
{
   return;
   console.log(str);
}

function mouseover() {
	document.getElementById('enrwiz_btnBackspace').src = '2110/backspace_2.png';
}
function enrwiz_btnOK_Status_Script(status) {

}

function enrwiz_btnChangeCategory_Status_Script(status) {

}


function SelectCategory(categoryId, objImage) {
	for (i = 1; i <= 3; i++) {
		document.getElementById("CategoryButton_" + i).isSelected = "0";
		SetCategoryHighlight(0, document.getElementById("CategoryButton_" + i));

		document.getElementById("lblCategory_" + i).className = "normalFontBlack";
		document.getElementById("imgSelectCategory_" + i).style.display = "none";
	}

	SetCategoryHighlight(2, document.getElementById("CategoryButton_" + categoryId));
	document.getElementById("CategoryButton_" + categoryId).isSelected = "1";

	document.getElementById("lblCategory_" + categoryId).className = "normalFontBoldBlack";
	document.getElementById("imgSelectCategory_" + categoryId).style.display = "block";

	selectedCategoryId = categoryId;
	document.getElementById("enrwiz_btnCategorySelected").click();
}

function SetCategoryHighlight(fngrHighlight, objImage) {
	if (objImage.isSelected == "0") {
		if (fngrHighlight == 0) {
			objImage.src = (objImage.src).replace("_F", "_N");
			objImage.src = (objImage.src).replace("_P", "_N");
		}
		else if (fngrHighlight == 1) {
			objImage.src = (objImage.src).replace("_N", "_F");
			objImage.src = (objImage.src).replace("_P", "_F");
		}
		else if (fngrHighlight == 2) {
			objImage.src = (objImage.src).replace("_N", "_P");
			objImage.src = (objImage.src).replace("_F", "_P");
		}
	}

}

function GetSelectedCategory() {
	return selectedCategoryId;
}

function SetButtonHighlight(actionId, objButton) {
	if (actionId == 0) {
		// mouse out
		objButton.src = (objButton.src).replace("_F", "_N");
		objButton.src = (objButton.src).replace("_P", "_N");
	}
	else if (actionId == 1) {
		// mouse over
		objButton.src = (objButton.src).replace("_N", "_F");
		objButton.src = (objButton.src).replace("_P", "_F");
	}
	else if (actionId == 2) {
		// mouse pressed
		objButton.src = (objButton.src).replace("_N", "_P");
		objButton.src = (objButton.src).replace("_F", "_P");
	}
}

function SetPasswordCategory(id, strLayout) {

	clearTimeout(timerId);
	selectedCategoryId = Number(id);

	var aryLayout = strLayout.split(";")

	if (aryLayout.length == 10) {
		//Create the image prefix
		var imgButtonNamePrefix = "";

		if (Number(id) == 1) {
			imgButtonNamePrefix = "n_";
		}
		else if (Number(id) == 2) {
			imgButtonNamePrefix = "c_";
		}
		else if (Number(id) == 3) {
			imgButtonNamePrefix = "a_";
		}

		// Delete the previous buttons if any.
		for (i = 1; i <= 9; i++) {
			if (document.getElementById("ImageButton_" + i)) {
				document.getElementById("ImageButton_" + i).outerHTML = "";
			}
		}

		var count = 9;

		for (var i in aryLayout) {
			var imgButtonName = imgButtonNamePrefix + aryLayout[i] + "_N"

			var imgButtonId = "ImageButton_" + aryLayout[i];

			if (Number(id) != 1) {
				imgButtonId = "ImageButton_" + count;
			}

			var clsName = "imageButtonRightGPA";

			if (count == 0) {
				clsName = "imageButtonLeftGPA";
			}

			document.getElementById("lyrPasswordButtons").insertAdjacentHTML("beforeEnd", "<input type=\"image\" src=\"2110/" + imgButtonName + ".png\" id=\"" + imgButtonId + "\" class=\"" + clsName + "\"  name=\""+aryLayout[i]+"\" >")

			count--;
		}

		// Reset the Password and Verify Password Arrays
		aryPassword = new Array();

		// Reset the Frmes
		for (i = 1; i <= sizePin; i++) {
			document.getElementById("Password_" + i).src = "2110/frame.png";
		}

		document.getElementById("lyrPasswordButtons").style.display = "block";
	}
}

function SelectButton(buttonId) {
	var imgButtonNamePrefix;

	if (Number(selectedCategoryId) == 1) {
		imgButtonNamePrefix = "n_";
	}
	else if (Number(selectedCategoryId) == 2) {
		imgButtonNamePrefix = "c_";
	}
	else if (Number(selectedCategoryId) == 3) {
		imgButtonNamePrefix = "a_";
	}

	if (aryPassword.length < sizePin) {

		aryPassword[aryPassword.length] = buttonId;

		if (aryPassword.length > 1) {
			SetPasswordImage(aryPassword.length - 1)
			clearTimeout(timerId);
		}

		document.getElementById("Password_" + aryPassword.length).src = "2110/" + imgButtonNamePrefix + buttonId + "_N.png";
                timerId = setTimeout(SetPasswordImage, timeoutInMilliseconds,aryPassword.length,false);
		document.getElementById("enrwiz_btnNotifyPinButtonClick").click();
	}
	if (aryPassword.length == sizePin) {
		document.getElementById('enrwiz_btnOK').click();
	}

}


function SetPasswordImage(pwdFrameId, isVerify) {
	if ((document.getElementById("Password_" + pwdFrameId)) && (aryPassword.length >= Number(pwdFrameId))) {
		document.getElementById("Password_" + pwdFrameId).src = "2110/frame_dot.png";
	}

	timerId = 0;
}

function RemoveLastSelection() {
	document.getElementById("enrwiz_btnNotifyBackSpaceButtonClick").click();
	if (aryPassword.length > 0) {
		document.getElementById("Password_" + aryPassword.length).src = "2110/frame.png";
		aryPassword.splice((aryPassword.length - 1), 1);				
	}
}

function ResetPasswordLayer() {
	// Reset the Frmes
	for (i = 1; i <= sizePin; i++) {
		document.getElementById("Password_" + i).src = "2110/frame.png";
		aryPassword = new Array();
	}
}

function GetPassword() {
	return aryPassword.join(';')
}

function SetDisplay(displayId) {
	if (Number(displayId) == 0) {
		document.getElementById("lyrCategory").style.display = "none";
		document.getElementById("lyrPassword").style.display = "block";
	}
	else if (Number(displayId) == 1) {
		document.getElementById("lyrCategory").style.display = "block";
		document.getElementById("lyrPassword").style.display = "none";
	}
}

function SelectNumberButton(idNumber) {
	if (document.getElementById("ImageButton_" + idNumber)) {
		document.getElementById("ImageButton_" + idNumber).click();
	}
}

function SetTimeoutInMilliSeconds(intTime) {
	timeoutInMilliseconds = Number(intTime);
}

function SetStatus(option) {
	if (Number(option) == 1) {
		document.getElementById('lyrPasswordBox').style.display = 'block';
		document.getElementById('lyrMsg').style.display = 'none';
	}
	if (Number(option) == 2) {
		document.getElementById('lyrMsg').style.display = 'block';
		document.getElementById('lyrPasswordBox').style.display = 'none';
	}
}
function SetPageText(option) {
	if (option == "1") {
		document.getElementById("enrwiz_TxtMessage").innerHTML = xmlResources.ReadNodeText("valpwd", "enrwiz_TxtMessage1");
		document.getElementById("enrwiz_TxtMessage").className = 'normalFontBlack';
		SetStatus(2);
	}
	if (option == "2") {
		document.getElementById("enrwiz_TxtMessage").innerHTML = xmlResources.ReadNodeText("valpwd", "enrwiz_TxtMessage2");
		document.getElementById("enrwiz_TxtMessage").className = 'normalFontRedBold';
		ResetPasswordLayer();
		SetStatus(2);
	}
}

function OPLoadXML(langfol)
{	  
    var xmlpath = "omnipassui/Lang/"+langfol+"/index.xml"
	xmlpath = "Lang/"+langfol+"/index.xml"
    xmlResources = new XmlResource(xmlpath);
	xmlResources.LoadXMLFile(function () {	        
			xmlResources.SetXmlText("valpwd");
			PageLoadComplete();
	});
}

$(document).ready(function () {    
	
	$('#page_loadcomplete').click(function(){	    
		window.parent.postMessage({origin:"$omnipass$",command:"PromptUILoaded"},"*");//HTML5 communication
	});

    $('#enrwiz_LblCantLogin').hide();
	SetPasswordCategory(1,"1;2;3;4;5;6;7;8;9;0");
	var buttons = $("#ImageButton_1,#ImageButton_2,#ImageButton_3,#ImageButton_4,#ImageButton_5,#ImageButton_6,#ImageButton_7,#ImageButton_8,#ImageButton_9,#ImageButton_0"); 
	$(buttons).hover(
		function() {
		//in
	         SetButtonHighlight(1,this);
		}, function() {
		//out
	         SetButtonHighlight(0,this);
		}
	);
      	

	$(buttons).mousedown(function() {
	 SetButtonHighlight(2,this);SetStatus(2);SetStatus(1);
	 SelectButton(this.name);
    });

	$(buttons,'#enrwiz_btnBackspace').dblclick(function(event) {	
         event.preventDefault();
	});

    $('#enrwiz_btnCancel').click(function() {
          window.parent.postMessage({origin:"$omnipass$",command:"HidePrompt"},"*");//HTML5 communication
	});
        
	$('#enrwiz_btnCancel').hover(
	function() {
	//in
		 ShowMouseMoveEffect(this,'2110/cancel_2.png');
	}, function() {
	//out
		 ShowMouseMoveEffect(this,'2110/cancel_1.png');
	}
	);

	$('#enrwiz_btnBackspace').hover(
	function() {
	//in
		 ShowMouseMoveEffect(this,'2110/backspace_2.png');
	}, function() {
	//out
		 ShowMouseMoveEffect(this,'2110/backspace_1.png');
	}
	);

	$('#enrwiz_btnBackspace').mousedown(function() {
	  RemoveLastSelection();
	});

   $(window).keypress(function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
			//alert(keycode);
		if(keycode >=48 && keycode<=57)
			  {
			    event.preventDefault();
				SetStatus(2);SetStatus(1);
				SelectButton(String.fromCharCode(keycode));
			  }        
	});
	
	$(window).keydown(function(event) {
		 var keycode = (event.keyCode ? event.keyCode : event.which);
		 if(keycode == 8)
		   {
			 event.preventDefault();
			 RemoveLastSelection();
		   }
	});
	
	 //this changes target pages font
    xmlResourcesSetting = new XmlResource("settings.xml");
	xmlResourcesSetting.LoadXMLFile(function () {
		xmlResourcesSetting.SetStyleSheet();
		xmlResourcesSetting.SetElementStyle("opbhoprmpt");
		PageLoadComplete();
    });
	
	chrome.runtime.sendMessage({command:"GetLang"}, function(response) 
	{
		 OPLoadXML(response.lang); 
	}); 
	
	window.onmousemove = function(event){event.preventDefault();}
});

//HTML5 communication
$(window).on("message", function(e) {  
    e = e.originalEvent;
    var data = e.data;
    var extdomain = "chrome-extension://"+chrome.i18n.getMessage("@@extension_id");
    consolelog("postmessage listener in :-"+document.URL+"\ndata source "+e.origin+"\ndata:-"+data+" command:-"+data.command);
    
});
