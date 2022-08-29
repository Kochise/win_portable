var _webPageUserId, _webPagepassword, _DocumentTitle, _webpageurl;
var _unamefieldname, _passfieldname;
var _webusridFlg = false, _passFlg = false;
var _unamefieldhidden = false;
var _pwdfieldhidden = false;
var _alreadyAuthenticated = false;
var PROCESS_FIELD_ACTION_SETIEFIELD = 1;
var PROCESS_FIELD_ACTION_GETPASSWORDFIELD = 2;
var PROCESS_FIELD_ACTION_ENUMIEFIELD = 3;
var PROCESS_FIELD_ACTION_ENUMIEPASSWDFIELD = 4;
var MAX_RETRY = 3
var _bformfilling = false;
var _formelement = null;
var _formsubmitelement = null;
var _docready = false;
var _validaterunning = false;
var _checkpagetimerid = -1;
var _hooktimerid = -1;
var _delayHookSubmitEvent = false;
var _usrnamefilled = false;
var _skipIDCheck = false;
var _frmFillerRetryCnt = 0;
//alert(document.domain);

function MessageBox(str)
{
    return;
    alert(str);
}

function consolelog(msg){
	return;
    console.log(msg);
}

//to verify whether a element is visible or not
function isRendered(domObj) {
    if ((domObj == null) || (domObj.nodeType != 1) || (domObj == document.body)) {
        return true;
    }
	
	if (domObj.disabled == true) {
        return false;
    } 
	
    if (domObj.currentStyle && domObj.currentStyle["display"] != "none" && domObj.currentStyle["visibility"] != "hidden" && domObj.currentStyle["opacity"] != "0") {
        return isRendered(domObj.parentNode);
    } else if (document.defaultView && window.getComputedStyle) {
        var cs = document.defaultView.getComputedStyle(domObj, null);
        if (cs != null && cs.getPropertyValue("display") != "none" && cs.getPropertyValue("visibility") != "hidden" && cs.getPropertyValue("opacity") != "0") {
            return isRendered(domObj.parentNode);
        } else if (cs == null)
            return true;
    }
    return false;
}

function ProcessPage(pAction, FieldName, FieldValue,IsPassword,callback) {
    var temp_formelement_passwd = null; //form with pass element only

    if (pAction == PROCESS_FIELD_ACTION_SETIEFIELD) {
        ProcessPage1(_formelement, pAction, FieldName, FieldValue,IsPassword,callback);
        return;
    }

    _webusridFlg = _passFlg = false;
    _unamefieldhidden = _pwdfieldhidden = false;

    var formscoll = document.forms;
    _formelement = null;

    for (var i = 0; i < formscoll.length; i++) {
        if (isRendered(formscoll[i]) == false)
            continue;

        ProcessPage1(formscoll[i], pAction, FieldName, FieldValue,IsPassword, callback);
        if (_webusridFlg && _passFlg) {
            //lets store the formelement so that we
            //will use it during form filling and submitting
            _formelement = formscoll[i];
            break;
        }else if(_passFlg)
			temp_formelement_passwd = formscoll[i];
			
    }

    //process main document if uname and pass not found in forms or no form found
    if (_webusridFlg == false && _passFlg == false) {
        ProcessPage1(document, pAction, FieldName, FieldValue, IsPassword,callback);
        if (_webusridFlg && _passFlg) {
            //lets store the formelement so that we
            //will use it during form filling and submitting
            _formelement = document;
        }else if(_passFlg)
			temp_formelement_passwd = document;
    }
	
	if(_formelement == null && _passFlg && !_webusridFlg && _webPageUserId != "")
	{
		//eg msn 
	   _webusridFlg = true;
	   _formelement = temp_formelement_passwd;
	}
	
}


function ProcessPage1(frm, pAction, FieldName, FieldValue,IsPassword, callback) {
    if (frm == null || frm == undefined) return;
    var inputelements = frm.getElementsByTagName("input");
    var inputtype, inputname, inputvalue, inputidname;
    var FieldId = FieldName; //lets save original seperately because we uppercase afterwards...and if its an id..then its case sensitive
    var bfieldvalset = false;
	var emailel = null,passwdel = null;
	var emailelindex = -1,passwdelindex = -1;
   
    _webusridFlg = _passFlg = false;
    for (var i = 0; i < inputelements.length; i++) {
        inputtype = inputelements[i].type.toUpperCase();
        inputname = inputelements[i].name;
        inputidname = inputelements[i].id;
        inputvalue = inputelements[i].value;
        inputindex = inputelements[i].tabIndex;

        if (inputtype == "TEXT" || inputtype == "EMAIL" || inputtype == "PASSWORD") {
            //alert(inputtype + "=" + inputname);
            //   inputelements[i].value = "rajesh";
            //Lets maintain the variable if below fields are hidden or obscured
            if (isRendered(inputelements[i]) == false) {
                if (inputtype == "PASSWORD") {
                    _pwdfieldhidden = true;
                    consolelog("Password field is hidden");
                }
                else if (inputtype == "EMAIL") {
                    //If this is a case wherein "username" is prefilled, we need to have
                    //username for checking against vault.
                    if(inputvalue != "") {
                    _webPageUserId = inputvalue;
                    _unamefieldhidden = true;
                    }
                    consolelog("Username field is hidden");
                }
                else
                    continue;
            }
            else if (inputindex == -1) {
                if (inputtype == "PASSWORD") {
                    _pwdfieldhidden = true;
                    consolelog("Password field is obscured::InputType==>" + inputtype);
                }
                else if (inputtype == "TEXT" || inputtype == "EMAIL") {
                    if(inputvalue != "") {
                    _webPageUserId = inputvalue;
                    _unamefieldhidden = true;
                    }
                    consolelog("Username field is obscured");
                }
            }else
			{
				 if (inputtype == "PASSWORD") {
                    _pwdfieldhidden = false;
                    consolelog("Password field is visible inputname="+inputname+ ",inputidname="+inputidname);					
                }
			}

            switch (pAction) {
                case PROCESS_FIELD_ACTION_SETIEFIELD:
                    {                        
                        var tmpinputname = inputname.toUpperCase();
                        var tmpinputidname = inputidname.toUpperCase();
						FieldName = FieldName.toUpperCase();
						
                        if (_skipIDCheck || tmpinputname == FieldName || tmpinputidname == FieldName) {
                            if(IsPassword == true && inputtype != "PASSWORD")
                                continue;
							
							if(isRendered(inputelements[i]) == false)
								continue;
                            
                            inputelements[i].focus();
							FieldValue = FieldValue + " "; //append space and then remove it
                            inputelements[i].value = FieldValue;

							if(inputelements[i].value == FieldValue)
							{								
                                //keyboard event send backspace
								SendMessage({ command: "keyevent", vk: [0x08], sleep: 15 }, function (response) {
									if (callback)
										callback();
								});
							}else 
							{
								if (callback)
							    	callback();
							}
                            bfieldvalset = true;                            
                        } else
                            continue;
                    }
                    return;
                case PROCESS_FIELD_ACTION_GETPASSWORDFIELD:
                    {
                        if (inputname == "" && inputidname == "")
                            continue;

                        if (inputvalue == "")
                            continue;
                    }
                    break;
                case PROCESS_FIELD_ACTION_ENUMIEFIELD:
				case PROCESS_FIELD_ACTION_ENUMIEPASSWDFIELD:
                    break;
            }

            if (inputname == "" && inputidname == "")
                continue;

            //if inputname not found then we will save inputid
            if (inputname == "")
                inputname = inputidname;

            if (inputtype == "TEXT" || inputtype == "EMAIL") {
                _unamefieldname = inputname;                
                _webPageUserId = inputvalue;
                _webusridFlg = true;
				emailelindex = i;
				emailel = inputelements[i];
            }

            if (inputtype == "PASSWORD") {
                _passfieldname = inputname;
                _webPagepassword = inputvalue;
                _passFlg = true;
				passwdelindex = i;
				passwdel = inputelements[i];
            }

            if (_webusridFlg == true && _passFlg == true && _pwdfieldhidden == false)
                break;
        }
    }
	
	if(pAction == PROCESS_FIELD_ACTION_ENUMIEFIELD)
	{
		if(_webusridFlg == true && _passFlg == true)
		{			
			//if(!((emailel.offsetLeft == passwdel.offsetLeft) || (emailel.offsetTop == passwdel.offsetTop)))
			if(!(passwdelindex == (emailelindex + 1)))
			{				
				//_webusridFlg = _passFlg = false;		//for dropbox			
			}				
		}
	}
	
    if(pAction == PROCESS_FIELD_ACTION_SETIEFIELD) {
        //
        //Filling credentials has failed.So lets fill credentials without checing inputid or inputname.
        //
        _skipIDCheck = true;
        ProcessPage1(_formelement, pAction, FieldName, FieldValue, IsPassword, callback);
    }
}


function FormFiller1(logindata, _clickok) {
    /*
    username and pass both visible
    */
    consolelog("FormFiller1");

    ProcessPage(PROCESS_FIELD_ACTION_SETIEFIELD, logindata[0].FieldName, logindata[0].FieldVal, false, function () {
        ProcessPage(PROCESS_FIELD_ACTION_SETIEFIELD, logindata[1].FieldName, logindata[1].FieldVal,true, function () {
            if (_clickok == "true")
			{				
                SubmitForm();
			}

            _bformfilling = false;
        });
    });
}



function FormFiller1_1(logindata, _clickok) {
    /*
    username and pass both visible
	press tab after username and delay submit
    */
    consolelog("FormFiller1_1");

    ProcessPage(PROCESS_FIELD_ACTION_SETIEFIELD, logindata[0].FieldName, logindata[0].FieldVal, false, function () {
         SendMessage({ command: "keyevent", vk: [0x09], sleep: 1500 }, function (response) {
			 ProcessPage(PROCESS_FIELD_ACTION_SETIEFIELD, logindata[1].FieldName, logindata[1].FieldVal, true, function () {
				if (_clickok == "true")
				{													
			       // SendMessage({ command: "keyevent", vk: [0x09], sleep: 20 }, function (response){});
                    setTimeout(function(){SubmitForm();_bformfilling = false;}, 2000);							
				}			
			});
         })
    });
}


function FormFiller2(logindata, _clickok) {
    /*
    username visible pass invisible
    */
    consolelog("FormFiller2");

    ProcessPage(PROCESS_FIELD_ACTION_SETIEFIELD, logindata[0].FieldName, logindata[0].FieldVal,false, function () {
        if (_clickok == "true")
            SubmitForm();

        setTimeout(DelayFormFiller, 1000, logindata);

    });
}

function FormFiller3(logindata, _clickok) {
    /*
    username invisible pass visible 
    */
    consolelog("FormFiller3");

    ProcessPage(PROCESS_FIELD_ACTION_SETIEFIELD, logindata[1].FieldName, logindata[1].FieldVal,true, function () {
        if (_clickok == "true")
            SubmitForm();

        _bformfilling = false;
    });
}

function FormFiller(logindata, _clickok) {
	var currdomain = document.domain.toLowerCase();	
		
	if(document.body.innerText == "" || document.body.innerHTML == "")
		return;
	
    if (logindata.length != 2) {
        consolelog("FormFiller no data");
        return;
    }

    _bformfilling = true;
    _alreadyAuthenticated = true;
    consolelog("FormFiller url = "+GetPageUrl());
    consolelog("FormFiller _unamefieldhidden=" + _unamefieldhidden + " _pwdfieldhidden=" + _pwdfieldhidden);


    if (_unamefieldhidden == false && _pwdfieldhidden == false)
	{  
        if(currdomain == "login.microsoftonline.com")			
           FormFiller1_1(logindata, _clickok);
	   else
		   FormFiller1(logindata, _clickok);
	}
    else if (_unamefieldhidden == false && _pwdfieldhidden == true)
        FormFiller2(logindata, _clickok);
    else if (_unamefieldhidden == true && _pwdfieldhidden == false)
        FormFiller3(logindata, _clickok);
    else {
        _bformfilling = false;
        _alreadyAuthenticated = false;
    }


}


$(document).click(function(){
	consolelog("document click");
	ProcessPage(PROCESS_FIELD_ACTION_ENUMIEPASSWDFIELD);
	if (_passFlg == false)
	{  
	  startcheckpagetimer(1000, 500, 2);
	}
});
	

function HookSubmitEvent() {
    var formscoll = document.forms;
    for (var i = 0; i < formscoll.length; i++) {
        formscoll[i].addEventListener("submit", OnSubmit, false);
        Hookbytype(formscoll[i], "input");
        Hookbytype(formscoll[i], "button");
        Hookbytype(formscoll[i], "a");
        Hookbytype(formscoll[i], "div");
    }
   
	
    document.addEventListener("submit", OnSubmit, false);
    Hookbytype(document, "input");
	Hookbytype(document, "button");
	Hookbytype(document, "a");
	Hookbytype(document, "div");
	
    $(window).keydown(OnKeyDown);	
}

function UnHookSubmitEvent() {
    var formscoll = document.forms;
    for (var i = 0; i < formscoll.length; i++) {
        formscoll[i].removeEventListener("submit", OnSubmit, false);
        UnHookbytype(formscoll[i], "input");
        UnHookbytype(formscoll[i], "button");
        UnHookbytype(formscoll[i], "a");
        UnHookbytype(formscoll[i], "div");
    }
   
	document.removeEventListener("submit", OnSubmit, false);
	UnHookbytype(document, "input");
	UnHookbytype(document, "button");
	UnHookbytype(document, "a");
	UnHookbytype(document, "div");
	
    $(window).off("keydown", OnKeyDown);		
}

function SubmitForm() {	
    
    if (_formelement != null || _formelement != undefined || _formsubmitelement != null) 
	{
        //dosubmit will click the submit button of the form ....
        //we do this because some websites doesnt respond to form.submit..viz hotmail
        consolelog("SubmitForm->doSubmit");
        doSubmit();	   
    }
}

function doSubmit() {
    if (_formsubmitelement != null && typeof (_formsubmitelement.click) != 'undefined') {
        consolelog("doSubmit->_formsubmitelement sucess " + _formsubmitelement.id + "==" + _formsubmitelement.name);
        _formsubmitelement.click();
    }
    else if (_formelement != null || _formelement != undefined) {
        if (ClickSubmitButton(_formelement))
            return true;		
		else{
			consolelog("dosubmit-keyboard1")
			SendMessage({ command: "keyevent", vk: [0x0D], sleep: 15 }, function (response) {});			
			return true;
		}
    }else{
		consolelog("dosubmit-keyboard2")
		SendMessage({ command: "keyevent", vk: [0x0D], sleep: 15 }, function (response) {});		
		return true;
	}

    return false;
}

function ClickSubmitButton(frm) {

    consolelog("ClickSubmitButton");
    var submitbutton = GetSubmitButton(frm);
    if (submitbutton == null)
        return false;

    consolelog("ClickSubmitButton sucess " + submitbutton.id + "==" + submitbutton.name);
    submitbutton.click();
    return true;
}

function GetSubmitButton(formelement) {
    var submitbutton = null;
    var submitDivbtn = null;
    submitbutton = GetSubmitElement(formelement, "input");

    if (submitbutton != null)
        return submitbutton;

    submitbutton = GetSubmitElement(formelement, "button");
    if(_unamefieldhidden || _pwdfieldhidden)
    {
        submitDivbtn = GetSubmitElement(formelement, "div");
        if(submitDivbtn != null )
            return submitDivbtn;
    }
    if (submitbutton != null)
        return submitbutton;

    submitbutton = GetSubmitElement(formelement, "a");

    if (submitbutton != null)
        return submitbutton;

    return submitbutton;
}

function GetSubmitElement(frm, tagname) {
    if (frm == null)
        return null;

    var inputtype, inputname, inputvalue;
    var element;
    var elements = frm.getElementsByTagName(tagname);
    var submitelement = null;
    for (j = 0; j < elements.length; j++) {
        element = elements[j];
        if (isRendered(element) == false) continue;

        if(tagname == "div")
        {
            if( document.domain == "accounts.google.com" &&
                (element.id == "identifierNext" || element.id == "passwordNext")
              )
            {
                submitelement = element;
                return submitelement;        
            }
            else
                continue;
        }
        inputtype = element.type.toUpperCase();
        if (inputtype == "BUTTON" || inputtype == "SUBMIT" || inputtype == "IMAGE") {
            if(!submitelement) {
                //
                //If we are on "LIVE/Outlook/MSN" sites, during filling let's skip defualt button, 
                //since it is an "BACK" button
                //
                submitelement = element;
                continue;
            }
            submitelement = element;
            break;
        } else if (tagname == "a") {
            if (element.href.lastIndexOf('#') != -1 || element.href.indexOf('javascript') != -1) {
                consolelog("GetSubmitElement anchor =" + element.href);
                submitelement = element;
                break;
            }
        }
    }
    return submitelement;
}


function Hookbytype(doc, tag) {
    if (doc == undefined)
        return;

    var _elements = doc.getElementsByTagName(tag);
    var inputtype;
    for (var i = 0; i < _elements.length; i++) {
        if(tag == "div")  
        {
            if(document.domain == "accounts.google.com")
            {
                if( _elements[i].id == "identifierNext" ||                                      //hook button on username page 
                    _elements[i].id == "passwordNext"                                           //hook button on password page
	            )
	            {
	                consolelog("HookByType::AddEventListener"+_elements[i].id);
	                _elements[i].addEventListener("click", OnSubmit, false);
	                return;
	            }
                else if(_unamefieldhidden && _elements[i].getAttribute("role") == "button")
                {
                    //hook drop-down of GMAIL-multiple-account selection
                    consolelog("HookByType::AddEventListener"+_elements[i].getAttribute("aria-label"));
                    _elements[i].addEventListener("click", OnSwitchAccount, false);
                }
        	}
            continue;
        }
        inputtype = _elements[i].type.toUpperCase();
        if (inputtype == "BUTTON" || inputtype == "SUBMIT" || inputtype == "IMAGE") {
            _elements[i].addEventListener("click", OnSubmit, false);
        } else if (tag == "a") {
            _elements[i].addEventListener("click", OnSubmit, false);
        }
    }
}

function UnHookbytype(doc, tag) {
    if (doc == undefined)
        return;

    var _elements = doc.getElementsByTagName(tag);
    var inputtype;

    for (var i = 0; i < _elements.length; i++) {
        if(tag == "div")  
        {
            if(document.domain == "accounts.google.com")
            {
                if( _elements[i].id == "identifierNext" ||                                      //hook button on username page 
                    _elements[i].id == "passwordNext"                                           //hook button on password page
	              )
	            {
	                _elements[i].removeEventListener("click", OnSubmit, false);
	                return;
	            }
                else if(_unamefieldhidden && _elements[i].getAttribute("role") == "button")
                {
                    //hook drop-down of GMAIL-multiple-account selection
                    consolelog("UnHookByType::AddEventListener"+_elements[i].getAttribute("aria-label"));
                    if(_bformfilling)
                        _elements[i].removeEventListener("click", OnSwitchAccount, false);
                }
            }
            continue;
        }
        inputtype = _elements[i].type.toUpperCase();
        if (inputtype == "BUTTON" || inputtype == "SUBMIT" || inputtype == "IMAGE") {
            _elements[i].removeEventListener("click", OnSubmit, false);
        } else if (tag == "a") {
            _elements[i].removeEventListener("click", OnSubmit, false);
        }
    }
}

//send data to backgroundpage
function SendPageDatatoBkPage(_submitform, _cache, _userenrolled, _prompt, _callback) {
    //this is asychronous
    //http://en.wikipedia.org/wiki/JSON
    var data = { "DocumentTitle": _DocumentTitle,
        "WebUrl": _webpageurl,
        "unamefield": _unamefieldname,
        "webPageUserId": _webPageUserId,
        "passfieldname": _passfieldname,
        "webPagepassword": _webPagepassword
    };	
	
    SendMessage({ command: "StoreLoginData", cache: _cache, userenrolled: _userenrolled, prompt: _prompt, pagedata: JSON.stringify(data) }, function (response) {
        consolelog(response.farewell);
        //alert(response.farewell);
        if (_submitform) {
            SubmitForm();
            if (typeof (_callback) != 'undefined' && _callback != null)
                _callback();
        }
    });
}
function OnSwitchAccount(e)
{
    stopcheckpagetimer();
    SendMessage({ command: "CancelOperation" }, function (response) {
        _alreadyAuthenticated = false;
        _validaterunning = false;
    });
    //UnHookSubmitEvent();
    startcheckpagetimer(500, 500, 5);
    startHooktimer(500,1500,5);
}
function OnSubmit(e) {
    UnHookSubmitEvent();
    //also rehook again if we remain on same page but after submit..
    if (_bformfilling) {
        consolelog("OnSubmit skipped as _bformfilling");
        return;
    }	

    _formsubmitelement = null;

    var domain = document.domain;
    var bforceprompt = false;
    var bcache = true;
    var _submitbutton = null;
	var _trialExpired = false;
    var _DontShowTrialMsg = 0;
	var _prev_pwdfieldhidden = _pwdfieldhidden;
    if (e == null) {
        bforceprompt = true;
        bcache = false;
    }
    else {
        _formsubmitelement = e.currentTarget; //let store the object so that we can click it when our work is done
    }

    _DocumentTitle = GetDocumentTitle();
    _webpageurl = GetPageUrl();

    consolelog("OnSubmit processpage");

    ProcessPage(PROCESS_FIELD_ACTION_GETPASSWORDFIELD);

    stopcheckpagetimer();
    //lets send cancel command
    SendMessage({ command: "CancelOperation" }, function (response) {
        _alreadyAuthenticated = false;
        _validaterunning = false;
    });
    ProcessPage(PROCESS_FIELD_ACTION_GETPASSWORDFIELD);
    if (e != null && (e.currentTarget.tagName == "a" || e.currentTarget.tagName == "A")) {
        _submitbutton = GetSubmitButton(_formelement);
        //if current anchor element is not submit button then return
        if (_submitbutton != _formsubmitelement) {
            consolelog("OnSubmit skip this achor tag ");
            //let's try to checkpage again ..sometimes links open forms
            _formsubmitelement = null;
            _webPageUserId = false;			
            _passFlg = false;            
            _alreadyAuthenticated = false;
            _validaterunning = false;
            Cleanup();
            startcheckpagetimer(1500, 1500, 5);
            return;
        }
    }
	
    if ((_webusridFlg && _passFlg)) {
        consolelog("OnSubmit processpage --  try save -- _webusridFlg=" + _webusridFlg + "_passFlg=" + _passFlg);        
        if (e != null) {
            e.preventDefault(); //this will cancel submit			
			e.stopImmediatePropagation();
            consolelog("Prevent Default");			
        }
        SendMessage({ command: "IsPageRemembered", WebUrl: _webpageurl, passfieldname: _passfieldname, webpageUserId: _webPageUserId, enrolluser: false,TrialExpired:_trialExpired,DontShowTrialMsg:_DontShowTrialMsg}, function (response) {
            if (response.CommandError == 0 && response.isremembered == false) {
                 //Lets check if trial is expired, if expired lets show trial message
                
                if(response.TrialExpired == true)
                {
                    consolelog("Product is expired");
                    if(response.DontShowTrialMsg == true)
                    {
                        SubmitForm();
                        setTimeout(HookSubmitEvent, 500);
                        return false;
                    }   
                }
				
                if (response.isenrolled == false) {
                    if (response.isdiscoveryon == true)
                        SendPageDatatoBkPage(true, bcache, false, true, function () { setTimeout(HookSubmitEvent, 500); });
                    else {
                        SubmitForm();
                        setTimeout(HookSubmitEvent, 500);
                    }

                    return false;
                }

                if (response.noprompt && bforceprompt == false)
                    SendPageDatatoBkPage(true, true, true, false, function () { setTimeout(HookSubmitEvent, 500); });
                else
                    SendPageDatatoBkPage(true, bcache, true, true, function () { setTimeout(HookSubmitEvent, 500); });
            }
            else {
                SubmitForm();
            }
        });
		return false;
    } else if (_webusridFlg && _prev_pwdfieldhidden == true) {
      //there is hidden password field lets rehook again eg ymail gmail
        _webPageUserId = false;
        _passFlg = false;
        startcheckpagetimer(1500, 1500, 5);
        _delayHookSubmitEvent = true;
    }
	_formsubmitelement = null;
}

function GetDocumentTitle() {
    return document.title;
}

function GetPageUrl() {
	var url = document.URL;			
    return url;
}

function checkpage(timeout, retry) {
	
	if(document.body.innerText == "" || document.body.innerHTML == "")
		return;
	
    ////////////////////////
    stopcheckpagetimer();
    if(_delayHookSubmitEvent == false)
    HookSubmitEvent();

    if (_validaterunning == true || _alreadyAuthenticated == true) {
        consolelog("checkpage validate is running already as _validaterunning is true");
        return;
    }

    _DocumentTitle = GetDocumentTitle();
    _webpageurl = GetPageUrl();

    ProcessPage(PROCESS_FIELD_ACTION_ENUMIEFIELD);
    if(_delayHookSubmitEvent == true)
    {
        _delayHookSubmitEvent = false;
        HookSubmitEvent();
    }        
    
    consolelog("checkpage =" + _webpageurl + " _webusridFlg=" + _webusridFlg + " _passFlg=" + _passFlg);
    if (_webusridFlg == false || _passFlg == false) {
        if (timeout != undefined && retry != undefined && timeout > 0 && retry > 0) {
            consolelog("checkpage -- retry again after " + timeout + "ms");
            startcheckpagetimer(timeout, timeout * 2, (retry - 1));
        }
        return;
    }
    
    if(_unamefieldhidden == false && _pwdfieldhidden == true)
    {
        _webPageUserId = "";        
    }

    var data = { "DocumentTitle": _DocumentTitle,
        "WebUrl": _webpageurl,
        "unamefield": _unamefieldname,
        "passfieldname": _passfieldname,
        "webPageUserId": _webPageUserId
    };

    consolelog("cs checkandvalidate");
    SendMessage(
   {
       command: "CheckAndValidate", pagedata: JSON.stringify(data)
   }
   , function (response) {
       if (response != undefined && response.logindata != undefined) {
           consolelog("REsopnse from checkandvalidateadsfa@@@@#$#$$$$$$");
           var logindata = JSON.parse(response.logindata);
           stopcheckpagetimer();
           _alreadyAuthenticated = true;
           FormFiller(logindata.LoginData, logindata.clickok);
       }
   }
   );
}

$(document).ready(function () {
    if (_docready) {
        consolelog("jquery duplicate ready");
        return;
    }

    _docready = true;
    consolelog("jquery doc ready");
    consolelog("document.readyState = " + document.readyState);
    OnPageload();
});

function OnKeyDown(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var type = String(event.target.type);
    type = type.toUpperCase();
    if (keycode == 13 && (type == "PASSWORD" || (!_bformfilling && _pwdfieldhidden)) ) {
        if(!_pwdfieldhidden)
        	event.preventDefault();

        OnSubmit(event);
    }
}

function startcheckpagetimer(timeout, nexttimeout, retry) {
    stopcheckpagetimer();

    _checkpagetimerid = setTimeout(checkpage, timeout, nexttimeout, retry);
    consolelog("startcheckpagetimer _checkpagetimerid=" + _checkpagetimerid);
}

function stopcheckpagetimer() {
    if (_checkpagetimerid != -1) {
        consolelog("stopcheckpagetimer clear old timer _checkpagetimerid= " + _checkpagetimerid);
        clearTimeout(_checkpagetimerid);
        _checkpagetimerid = -1;
    }
}

function startHooktimer(timeout, nexttimeout, retry) {
    stopHooktimer();

    _hooktimerid = setTimeout(HookSubmitEvent, timeout, nexttimeout, retry);
    consolelog("startcheckpagetimer _checkpagetimerid=" + _checkpagetimerid);
}

function stopHooktimer() {
    if (_hooktimerid != -1) {
        consolelog("stopcheckpagetimer clear old timer _checkpagetimerid= " + _checkpagetimerid);
        clearTimeout(_hooktimerid);
        _hooktimerid = -1;
    }
}

function DelayFormFiller(logindata) {   

    _formsubmitelement = null;

    ProcessPage(PROCESS_FIELD_ACTION_ENUMIEPASSWDFIELD);

    consolelog("DelayFormFiller _pwdfieldhidden=" + _pwdfieldhidden);

    if (_pwdfieldhidden == false) {
        ProcessPage(PROCESS_FIELD_ACTION_SETIEFIELD, logindata[1].FieldName, logindata[1].FieldVal,true, function () {
            SubmitForm();
            Cleanup();            
        });
        _bformfilling = false;
        _frmFillerRetryCnt = 0;
    }
    else
    {
        _frmFillerRetryCnt++;
        if(_frmFillerRetryCnt < MAX_RETRY)
            setTimeout(DelayFormFiller, 1500, logindata);
    }
}


function Cleanup() {
    consolelog("Doing Cleanup");
    _unamefieldhidden = false;
    _pwdfieldhidden = false;
}