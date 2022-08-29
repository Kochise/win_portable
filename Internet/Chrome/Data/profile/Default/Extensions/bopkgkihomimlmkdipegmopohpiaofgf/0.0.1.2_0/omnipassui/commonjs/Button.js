var aryButton = new Array();
var aryDefaultClick = new Array();

function Button(page, btnName) {
    function AddButton(label, left, top, width, height, imgName, targetLyr, imgDir) {
        var tempTxt = "";

        this.btnMainImgNormalPath = chrome.runtime.getURL("omnipassui/2110/btnMainImg_" + imgName + "_normal.gif");
        this.btnMainImgOverPath = chrome.runtime.getURL("omnipassui/2110/btnMainImg_" + imgName + "_normal.gif");
        this.btnMainImgDownPath = chrome.runtime.getURL("omnipassui/2110/btnMainImg_" + imgName + "_normal.gif");
        this.btnMainImgDisablePath = chrome.runtime.getURL("omnipassui/2110/btnMainImg_" + imgName + "_normal.gif");

        tempTxt = tempTxt + '<input style="position:absolute;padding:0px;margin:0px;background-color:transparent;line-height:normal;border:none; left:' + left + 'px; top:' + top + 'px; height:' + height + 'px; width:' + width + 'px;z-index:100" type="image" id="' + (this.srcObjid + '_imgButton_BlankBtn') + '" tabindex="' + this.tabIndex + '" src="' + this.spacerImgPath + '">';
        tempTxt = tempTxt + '<table class="opbuttontbl" style="position:absolute;border-collapse:collapse;line-height:normal; left:' + left + 'px; top:' + top + 'px; height:' + height + 'px; width:' + width + 'px;z-index:99; opacity:1.0" id="' + (this.srcObjid + '_tbl') + '" border="0" cellspacing="0" cellpadding="0">';
        tempTxt = tempTxt + '	<tr>';
        tempTxt = tempTxt + '		<td width="' + this.btnLeftColWidth + 'px" style="background-image: url(\'' + this.btnLeftColBackNormalImgPath + '\'); background-repeat:no-repeat;background-size:cover"><img src="' + this.spacerImgPath + '" border="0" width="' + this.btnLeftColWidth + 'px"></td>';
        tempTxt = tempTxt + '		<td width="' + (width - this.btnLeftColWidth - this.btnRightColWidth) + 'px" style="background-image: url(\'' + this.btnCenterColBackNormalImgPath + '\'); background-repeat:repeat-x;background-size:cover;" align="center" height="' + height + 'px" valign="middle">';
        tempTxt = tempTxt + '			<table class="opbuttontbl" border="0" cellpadding="0" cellspacing="0" height="100%" align="center">';
        tempTxt = tempTxt + '				<tr>';

        if (this.isImageButton == 1) {
            if (this.imgDirection == 0) {
                tempTxt = tempTxt + '					<td align="right" valign="center"><label class="' + this.btnFontNormal + '" id="' + (this.srcObjid + '_Lbl') + '"></label></td>'
                tempTxt = tempTxt + '					<td width="' + this.btnDistanceBetnTextAndImg + '"><img src="' + this.spacerImgPath + '" border="0" width="' + this.btnDistanceBetnTextAndImg + 'px"></td>'
                tempTxt = tempTxt + '					<td align="Left" valign="center" width="' + this.btnColMainImgWidth + 'px"><img src="' + this.btnMainImgNormalPath + '" id="' + (this.srcObjid + '_imgButton') + '" border="0"></td>'
            }
            else {
                tempTxt = tempTxt + '					<td align="right" valign="center" width="' + this.btnColMainImgWidth + 'px"><img src="' + this.btnMainImgNormalPath + '" id="' + (this.srcObjid + '_imgButton') + '" border="0"></td>'
                tempTxt = tempTxt + '					<td width="' + this.btnDistanceBetnTextAndImg + '"><img src="' + this.spacerImgPath + '" border="0" width="' + this.btnDistanceBetnTextAndImg + 'px"></td>'
                tempTxt = tempTxt + '					<td align="left" valign="center"><label style="margin:0px;padding:0px;line-height:normal" class="' + this.btnFontNormal + '" id="' + (this.srcObjid + '_Lbl') + '"></label></td>'
            }
        }
        else {
            tempTxt = tempTxt + '					<td width="100%" align="center" style="vertical-align:middle"><label class="' + this.btnFontNormal + '" id="' + (this.srcObjid + '_Lbl') + '" style="vertical-align:middle"></label></td>'
        }

        tempTxt = tempTxt + '				</tr>'
        tempTxt = tempTxt + '			</table>'
        tempTxt = tempTxt + '		</td>'
        tempTxt = tempTxt + '		<td width="' + this.btnRightColWidth + 'px" style="background-image: url(\'' + this.btnRightColBackNormalImgPath + '\'); background-repeat:no-repeat;background-size:cover;"><img src="' + this.spacerImgPath + '" border="0" width="' + this.btnRightColWidth + 'px"></td>'
        tempTxt = tempTxt + '	</tr>';
        tempTxt = tempTxt + '</table>';

        document.getElementById(targetLyr).insertAdjacentHTML('beforeEnd', tempTxt);
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
    }

    function AddEventListeners() {
        var myButtonObj;

        myButtonObj = document.getElementById(this.srcObjid + '_imgButton_BlankBtn');

        myButtonObj.addEventListener('click', (function (btnobj) {
            return function () {
                if (document.getElementById(btnobj.srcObjid).disabled == false)
                    document.getElementById(btnobj.srcObjid).click();
            };
        })(this), false);


        myButtonObj.addEventListener('mouseover', (function (btnobj) {
            return function () {
                aryButton[btnobj.pageName][btnobj.btnName].ChangeImagePath(1);
            };
        })(this), false);


        myButtonObj.addEventListener('mouseout', (function (btnobj) {
            return function () {
                aryButton[btnobj.pageName][btnobj.btnName].ChangeImagePath(0);
            };
        })(this), false);


        myButtonObj.addEventListener('focus', (function (btnobj) {
            return function () {
                aryButton[btnobj.pageName][btnobj.btnName].ChangeImagePath(1);
            };
        })(this), false);


        myButtonObj.addEventListener('blur', (function (btnobj) {
            return function () {
                aryButton[btnobj.pageName][btnobj.btnName].ChangeImagePath(0);
            };
        })(this), false);

    }

    function ChangeImagePath(status) {
        var myColLeft;
        var myColCenter;
        var myColRight;
        var myTableObj;
        var myImgBtnObj;
        var myLabelObj;
        var myButtonObj;

        //Trasparent Button on the top to show focus and control element in the button class.
        myButtonObj = document.getElementById(this.srcObjid + '_imgButton_BlankBtn')
        myLabelObj = document.getElementById(this.srcObjid + '_Lbl')

        // 0 -> Normal , 1 -> Over , 2 -> down , 3 -> disable
        if (myButtonObj.disabled == false) {
            myTableObj = document.getElementById(this.srcObjid + '_tbl')
            myColLeft = myTableObj.rows[0].cells[0];
            myColCenter = myTableObj.rows[0].cells[1];
            myColRight = myTableObj.rows[0].cells[2];

            if (this.isImageButton == 1) {
                myImgBtnObj = document.getElementById(this.srcObjid + '_imgButton')
            }


            if (status == 0) {
                myLabelObj.className = this.btnFontNormal;

                if (this.isImageButton == 1)
                    myImgBtnObj.src = this.btnMainImgNormalPath;

                myColLeft.style.backgroundImage = "url('" + this.btnLeftColBackNormalImgPath + "')";
                myColRight.style.backgroundImage = "url('" + this.btnRightColBackNormalImgPath + "')";
                myColCenter.style.backgroundImage = "url('" + this.btnCenterColBackNormalImgPath + "')";
            }
            else if (status == 1) {
                myLabelObj.className = this.btnFontOver;

                if (this.isImageButton == 1)
                    myImgBtnObj.src = this.btnMainImgOverPath;

                myColLeft.style.backgroundImage = "url('" + this.btnLeftColBackOverImgPath + "')";
                myColRight.style.backgroundImage = "url('" + this.btnRightColBackOverImgPath + "')";
                myColCenter.style.backgroundImage = "url('" + this.btnCenterColBackOverImgPath + "')";
                if (myButtonObj.disabled == true) {
                    myButtonObj.style.cursor = "default"
                }
            }
            else if (status == 2) {
                myLabelObj.className = this.btnFontDown;
            }
            else if (status == 3) {
                myLabelObj.className = this.btnFontDisable;

                if (this.isImageButton == 1)
                    myImgBtnObj.src = this.btnMainImgDisablePath;
                myColLeft.style.backgroundImage = "url('" + this.btnLeftColBackDisableImgPath + "')";
                myColRight.style.backgroundImage = "url('" + this.btnRightColBackDisableImgPath + "')";
                myColCenter.style.backgroundImage = "url('" + this.btnCenterColBackDisableImgPath + "')";
                if (myButtonObj.disabled == true) {
                    myButtonObj.style.cursor = "default"
                }
            }
        }
        else {
            if (status == 3) {
                myLabelObj.className = this.btnFontDisable;
            }
        }
    }

    function MakeBtnEnable() {
        var myTableObj;
        var myImgBtnObj;
        var myLabelObj;
        var myButtonObj;

        //Trasparent Button on the top to show focus and control element in the button class.
        myButtonObj = document.getElementById(this.srcObjid + '_imgButton_BlankBtn');

        myTableObj = document.getElementById(this.srcObjid + '_tbl');
        myLabelObj = document.getElementById(this.srcObjid + '_Lbl');

        // Set the trasparent image button enable.
        myButtonObj.disabled = false;
        // Set GrayScale property = 0 and Opacity property = 100% for the main table.

        myTableObj.style.opacity = 1;

        // Swap the zIndex property of Main Table and Trasparent Image Button.
        myTableObj.style.zIndex = 99;
        myButtonObj.style.xIndex = 100;
        this.disabled = false;
        this.ChangeImagePath(0);
    }

    function MakeBtnDisable() {
        var myTableObj;
        var myImgBtnObj;
        var myLabelObj;
        var myButtonObj;

        this.ChangeImagePath(3);

        //Trasparent Button on the top to show focus and control element in the button class.
        myButtonObj = document.getElementById(this.srcObjid + '_imgButton_BlankBtn');

        myTableObj = document.getElementById(this.srcObjid + '_tbl');
        myLabelObj = document.getElementById(this.srcObjid + '_Lbl');

        // Set the trasparent image button Disable.
        myButtonObj.disabled = true;
        // Set GrayScale property = 1 and Opacity property = 35% for the main table.
        myTableObj.style.opacity = 0.5;

        // Swap the zIndex property of Main Table and Trasparent Image Button so user CAN NOT see hand onmouseover
        myTableObj.style.zIndex = 100;
        myButtonObj.style.xIndex = 99;
        this.disabled = true;
    }

    function ChangeDefault(flag) {

    }

    function SetTitle(title) {
        myLabelObj = document.getElementById(this.srcObjid + '_Lbl');
        myLabelObj.innerHTML = title;
    }

    function SetFocus() {
        var myButtonObj;

        //Trasparent Button on the top to show focus and control element in the button class.
        myButtonObj = document.getElementById(this.srcObjid + '_imgButton_BlankBtn');

        if (myButtonObj.disabled == false) {
            myButtonObj.focus();
        }
    }

    function Click() {
        if (document.getElementById(this.srcObjid).disabled == false)
            document.getElementById(this.srcObjid).click();
    }

    function MakeVisible(flag) {
        var myTableObj;
        var myButtonObj;

        // Trasparent Button on the top to show focus and control element in the button class.
        myButtonObj = document.getElementById(this.srcObjid + '_imgButton_BlankBtn');
        // Main table to display all the elements																					 
        myTableObj = document.getElementById(this.srcObjid + '_tbl')

        if (flag == true) {
            if (this.visible == false) {
                myButtonObj.style.display = "block";
                myTableObj.style.display = "block";
                this.visible = true;
            }
        }
        else {
            if (this.visible == true) {
                myButtonObj.style.display = "none";
                myTableObj.style.display = "none";
                this.visible = false;
            }
        }
    }

    function Move(left, top) {
        var myTableObj;
        var myButtonObj;

        // Trasparent Button on the top to show focus and control element in the button class.
        myButtonObj = document.getElementById(this.srcObjid + '_imgButton_BlankBtn');
        // Main table to display all the elements																					 
        myTableObj = document.getElementById(this.srcObjid + '_tbl');

        myButtonObj.style.left = left + "px";
        myButtonObj.style.top = top + "px";

        myTableObj.style.left = left + "px";
        myTableObj.style.top = top + "px";
    }

    function ReArrange(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;

        document.getElementById(this.srcObjid + '_imgButton_BlankBtn').style.left = left + "px";
        document.getElementById(this.srcObjid + '_imgButton_BlankBtn').style.top = top + "px";
        document.getElementById(this.srcObjid + '_imgButton_BlankBtn').style.width = width + "px";
        document.getElementById(this.srcObjid + '_imgButton_BlankBtn').style.height = height + "px";

        document.getElementById(this.srcObjid + '_tbl').style.left = left + "px";
        document.getElementById(this.srcObjid + '_tbl').style.top = top + "px";
        document.getElementById(this.srcObjid + '_tbl').style.width = width + "px";
        document.getElementById(this.srcObjid + '_tbl').style.height = height + "px";

        document.getElementById(this.srcObjid + '_tbl').rows[0].cells[1].width = width - this.btnLeftColWidth - this.btnRightColWidth + "px";
        this.ChangeImagePath(0);
    }

    if (aryButton[page] == null) {
        aryButton[page] = new Array();
        aryButton[page][btnName] = this;
    }
    else {
        aryButton[page][btnName] = this;
    }

    this.AddButton = AddButton;
    this.ChangeImagePath = ChangeImagePath;
    this.MakeBtnEnable = MakeBtnEnable;
    this.MakeBtnDisable = MakeBtnDisable;
    this.SetTitle = SetTitle;
    this.SetFocus = SetFocus;
    this.MakeVisible = MakeVisible;
    this.Move = Move;
    this.ReArrange = ReArrange;
    this.ChangeDefault = ChangeDefault;
    this.Click = Click;
    this.AddEventListeners = AddEventListeners;
    this.pageName = page;
    this.btnName = btnName;
    this.isImageButton = 0;
    this.imgDirection = 0;

    this.btnLeftColWidth = 15;
    this.btnRightColWidth = 15;
    this.btnColMainImgWidth = 20;
    this.btnDistanceBetnTextAndImg = 1;

    this.btnMainImgNormalPath = chrome.runtime.getURL("omnipassui/2110/spacer.gif");
    this.btnMainImgOverPath = chrome.runtime.getURL("omnipassui/2110/spacer.gif");
    this.btnMainImgDownPath = chrome.runtime.getURL("omnipassui/2110/spacer.gif");
    this.btnMainImgDisablePath = chrome.runtime.getURL("omnipassui/2110/spacer.gif");

    this.btnLeftColBackNormalImgPath = chrome.runtime.getURL("omnipassui/2110/btnLeftColBackNormalImg.png");
    this.btnLeftColBackOverImgPath = chrome.runtime.getURL("omnipassui/2110/btnLeftColBackOverImg.png");
    this.btnLeftColBackDownImgPath = chrome.runtime.getURL("omnipassui/2110/btnLeftColBackOverImg.png");
    this.btnLeftColBackDisableImgPath = chrome.runtime.getURL("omnipassui/2110/btnLeftColBackDisableImg.png");

    this.btnRightColBackNormalImgPath = chrome.runtime.getURL("omnipassui/2110/btnRightColBackNormalImg.png");
    this.btnRightColBackOverImgPath = chrome.runtime.getURL("omnipassui/2110/btnRightColBackOverImg.png");
    this.btnRightColBackDownImgPath = chrome.runtime.getURL("omnipassui/2110/btnRightColBackOverImg.png");
    this.btnRightColBackDisableImgPath = chrome.runtime.getURL("omnipassui/2110/btnRightColBackDisableImg.png");

    this.btnCenterColBackNormalImgPath = chrome.runtime.getURL("omnipassui/2110/btnCenterColBackNormalImg.png");
    this.btnCenterColBackOverImgPath = chrome.runtime.getURL("omnipassui/2110/btnCenterColBackOverImg.png");
    this.btnCenterColBackDownImgPath = chrome.runtime.getURL("omnipassui/2110/btnCenterColBackOverImg.png");
    this.btnCenterColBackDisableImgPath = chrome.runtime.getURL("omnipassui/2110/btnCenterColBackDisableImg.png");

    this.btnRightColBackImgPath = chrome.runtime.getURL("omnipassui/2110/btnRightColBackImg.gif");
    this.btnCenterColBackImgPath = chrome.runtime.getURL("omnipassui/2110/btnCenterColBackImg.gif");

    this.spacerImgPath = chrome.runtime.getURL("omnipassui/2110/spacer.gif")
    this.btnFontNormal = "BtnFontNormal";
    this.btnFontOver = "BtnFontNormal";
    this.btnFontDown = "BtnFontNormal";
    this.btnFontDisable = "BtnFontNormal";
    this.srcObjid = "";
    this.tabIndex = 1;
    this.onBlurEvent = "";
    this.flagBlur = false;
    this.isDefault = false;
    this.disabled = false;
    this.visible = true;
    this.imgPath = "2110/";
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
}

function Unclass() {
    delete aryButton;
}