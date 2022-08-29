function XmlResource(strFilePath) {
	var instance = this;

	instance.LoadXMLFile = function (callback) {
		$.ajax({
			url: strFilePath,
			processData: false,
			dataType: "text",
			success: function(data){
				
				instance.LoadXMLFileDoneCallBack(data, callback);
			}
		});
	};

	instance.LoadXMLFileDoneCallBack = function (xmlData,callback) {
		var oXmlDoc = $.parseXML(xmlData);
		instance.xmlDoc = $(oXmlDoc);
		callback();
	};

	instance.SetXmlText = function (nodeName) {
		if (instance.xmlDoc) {
			instance.SetText(nodeName);
		}
		else {
			instance.LoadXMLFile(function () {
				instance.SetText(nodeName);
			});
		}        
	};

	instance.SetText = function (nodeName) {
		var xmlNodeList = instance.xmlDoc.find(nodeName);

		xmlNodeList.each(function () {
			$(this).children().each(function () {
				var targetElement = $("#" + this.nodeName);
				if (targetElement) {
					var tmpText = $(this).text();
					tmpText = $.trim(tmpText);
					tmpText = instance.ReplaceText(tmpText, "~", "<");
					tmpText = instance.ReplaceText(tmpText, "^", ">");
					tmpText = instance.ReplaceText(tmpText, "/n", "<br>");

					targetElement.html(tmpText);
				}
			});
		});
	};

	instance.ReplaceText = function (tmpText, srcChar, replaceChar) {
		do{
			tmpText = tmpText.replace(srcChar, replaceChar);
		}
		while (tmpText.indexOf(srcChar) > 0)
		return tmpText;
	};

	instance.SetXMLToolTip = function (nodeName) {
		var xmlNodeList = instance.xmlDoc.find(nodeName);

		xmlNodeList.each(function () {
			$(this).children().each(function () {
				var targetElement = $("#" + this.nodeName);
				if (targetElement) {
					var tmpText = $(this).text();
					tmpText = $.trim(tmpText);
					tmpText = instance.ReplaceText(tmpText, "~", "<");
					tmpText = instance.ReplaceText(tmpText, "^", ">");
					tmpText = instance.ReplaceText(tmpText, "/n", "<br>");

					targetElement.attr("title",tmpText);
				}
			});
		});
	};

	instance.ReadNodeText = function (nodeName, childNodeName) {
		var xmlNodeList = instance.xmlDoc.find(nodeName).find(childNodeName);
		
		if (xmlNodeList)
		{
			var tmpText = $(xmlNodeList).text();
			tmpText = $.trim(tmpText);
			tmpText = instance.ReplaceText(tmpText, "~", "<");
			tmpText = instance.ReplaceText(tmpText, "^", ">");
			tmpText = instance.ReplaceText(tmpText, "/n", "<br>");
			return tmpText;
		}
	};

	instance.SetStyleSheet = function (pageName) {
		var theRules, myFontName, subNode;

		var xmlNodeList = instance.xmlDoc.find("settings");
		xmlNodeList = xmlNodeList.find("fontStyle");
		if (pageName) {
			xmlNodeList = xmlNodeList.find(pageName);
		}

		myFontName = xmlNodeList.text();
		myFontName = $.trim(myFontName);

		if (myFontName != "") {
			for (sheetNum = 0; sheetNum < document.styleSheets.length; sheetNum++) {
				if (document.styleSheets[sheetNum].cssRules)
					theRules = document.styleSheets[sheetNum].cssRules;
				else if (document.styleSheets[sheetNum].rules)
					theRules = document.styleSheets[sheetNum].rules;

				for (i = 0; i < theRules.length; i++) {

					if (theRules[i].style) {
						if (theRules[i].style.fontFamily != "") {
							theRules[i].style.fontFamily = myFontName;
						}
						//SetStyleSheetAttrib(xmlDoc, theRules[i].style, (theRules[i].selectorText).replace(".", ""), pageName)
					}
				}

				if (document.styleSheets[sheetNum].imports) {
					for (sheets = 0; sheets < document.styleSheets[sheetNum].imports.length; sheets++) {
						theRules = document.styleSheets[sheetNum].imports[sheets].rules;

						for (i = 0; i < theRules.length; i++) {
							theRules[i].style.fontFamily = myFontName;
							//SetStyleSheetAttrib(xmlDoc, theRules[i].style, (theRules[i].selectorText).replace(".", ""), pageName)
						}
					}
				}
			}
		}
	};
	instance.SetAttribute = function (pageName) {
	    var xmlNodeList = instance.xmlDoc.find("settings");

	    if (pageName) {
	        xmlNodeList = xmlNodeList.find(pageName);
	    }

	    xmlNodeList = xmlNodeList.find("attributes");

	    if (xmlNodeList.length == 1) {
	        mainNode = xmlNodeList[0];

	        $(mainNode).children().each(function () {
	            var elementName = this.tagName;

	            $(this).children().each(function () {
	                var attrName = this.tagName;
	                var attrValue = this.childNodes[0].nodeValue;

	                $("#" + elementName).attr(attrName, attrValue);
	            });
	        });
	    }
	};


	instance.SetStyleSheetClass = function (pageName) {
	    var xmlNodeList = instance.xmlDoc.find("settings");

	    if (pageName) {
	        xmlNodeList = xmlNodeList.find(pageName);
	    }

	    xmlNodeList = xmlNodeList.find("stylesheets");

	    if (xmlNodeList.length == 1) {
	        mainNode = xmlNodeList[0];

	        $(mainNode).children().each(function () {
	            var classname = this.tagName;

	            $(this).children().each(function () {
	                var propName = this.tagName;
	                var propValue = this.childNodes[0].nodeValue;

	                $("." + classname).css(propName, propValue);
	            });
	        });
	    }
	};

	instance.SetElementStyle = function (pageName) {
	    var mainNode;
	    var xmlNodeList = instance.xmlDoc.find("settings");

	    if (pageName) {
	        xmlNodeList = xmlNodeList.find(pageName);
	    }

	    xmlNodeList = xmlNodeList.find("elements");


	    if (xmlNodeList.length == 1) {
	        mainNode = xmlNodeList[0];
	    }

	    $(mainNode).children().each(function () {
	        var elementId = this.tagName;

	        $(this).children().each(function () {
	            var propName = this.tagName;
	            var propValue = this.childNodes[0].nodeValue;;

	            $("#" + elementId).css(propName, propValue);
	        });

	    });
	};

	instance.SetButtonElement = function (pageName, btnAryStr) {
	    var mainNode;
	    var xmlNodeList = instance.xmlDoc.find("settings");

	    if (pageName) {
	        xmlNodeList = xmlNodeList.find(pageName);
	    }

	    xmlNodeList = xmlNodeList.find("buttons");

	    if (xmlNodeList.length == 1) {
	        mainNode = xmlNodeList[0];
	    }

	    $(mainNode).children().each(function () {
	        var myBtnId = this.tagName;

	        var myLeft = "";
	        var myTop = "";
	        var myWidth = "";
	        var myHeight = "";

	        $(this).children().each(function () {
	            var propName = this.tagName;
	            var propValue = this.childNodes[0].nodeValue;

	            switch (propName)
	            {
	                case "srcObjid":
	                    (aryButton[btnAryStr][myBtnId]).srcObjid = propValue;
	                    break;				
	                case "tabIndex":
	                    (aryButton[btnAryStr][myBtnId]).tabIndex = propValue;
	                    break;								
	                case "blankBtnImgPath":	
	                    (aryButton[btnAryStr][myBtnId]).blankBtnImgPath = propValue;
	                    break;							
	                case "normalBtnImgPath":
	                    (aryButton[btnAryStr][myBtnId]).normalBtnImgPath = propValue;
	                    break;								
	                case "overBtnImgPath":	
	                    (aryButton[btnAryStr][myBtnId]).overBtnImgPath = propValue;
	                    break;							
	                case "downBtnImgPath":		
	                    (aryButton[btnAryStr][myBtnId]).downBtnImgPath = propValue;
	                    break;						
	                case "disableBtnImgPath":	
	                    (aryButton[btnAryStr][myBtnId]).disableBtnImgPath = propValue;
	                    break;							
	                case "defaultBtnImgPath":	
	                    (aryButton[btnAryStr][myBtnId]).defaultBtnImgPath = propValue;
	                    break;	
	                case "btnFontNormal":	
	                    (aryButton[btnAryStr][myBtnId]).btnFontNormal = propValue;
	                    break;							
	                case "btnFontOver":	
	                    (aryButton[btnAryStr][myBtnId]).btnFontOver = propValue;
	                    break;							
	                case "btnFontDown":	
	                    (aryButton[btnAryStr][myBtnId]).btnFontDown = propValue;
	                    break;							
	                case "btnFontDisable":	
	                    (aryButton[btnAryStr][myBtnId]).btnFontDisable = propValue;
	                    break;							
	                case "left":	
	                    myLeft = propValue
	                    break;							
	                case "top":		
	                    myTop = propValue
	                    break;						
	                case "width":	
	                    myWidth = propValue
	                    break;							
	                case "height":
	                    myHeight = propValue
	                    break;		
	            }
	        });

	        if ((myLeft != "") || (myTop != "") || (myWidth != "") || (myHeight != "")) {
	            aryButton[btnAryStr][myBtnId].ReArrange(((myLeft == "") ? (aryButton[btnAryStr][myBtnId]).left : myLeft), ((myTop == "") ? (aryButton[btnAryStr][myBtnId]).top : myTop), ((myWidth == "") ? (aryButton[btnAryStr][myBtnId]).width : myWidth), ((myHeight == "") ? (aryButton[btnAryStr][myBtnId]).height : myHeight));
	        }

	    });
	};

	this.strFilePath = strFilePath;
	this.xmlDoc;
}


/*
function SetStyleSheetAttrib(xmlDoc,objStyle,styleName,pageName)
{
	var myXML, myNodes,lyrNode,elementNode,subNode;
	myXML= document.all(xmlDoc).XMLDocument;
	//Put the <name> element into an object.
	
	if (pageName == "")
	{
		subNode = "settings/"
	}
	else
	{
		subNode = "settings/" + pageName + "/"
	}
	
	myNodes=myXML.getElementsByTagName(subNode + styleName);
	//Extract the different values using a loop.
 
	for( var counter=0; counter < myNodes.length; counter++ )
	{
		tabNode = myNodes.item(counter)
		counLyrNode = tabNode.childNodes.length
		for( var counter1=0; counter1 < counLyrNode ; counter1++ )
		{
			elementNode = tabNode.childNodes(counter1)
			
			nameAttrib = elementNode.nodeName
			
			if (elementNode.childNodes(0).nodeType == 3)
			{
				var tmpText = elementNode.text;
			}
			else
			{
				var tmpText = elementNode.childNodes(0).text
			}
			
			objStyle[nameAttrib] = tmpText 
		}
	}
}

function SetButtonAttrib(xmlDoc,pageName,btnAryStr)
{
	var myXML, myNodes,lyrNode,elementNode,myBtnAttribCount,myBtnNode,myBtnId;
	var myLeft,myTop,myWidth,myHeight,subNode;
	myXML= document.all(xmlDoc).XMLDocument;
	//Put the <name> element into an object.
	
	if (pageName == "")
	{
		subNode = "settings/button"
	}
	else
	{
		subNode = "settings/button/" + pageName
	}
	
	myNodes=myXML.getElementsByTagName(subNode);
	//Extract the different values using a loop.
	
	for( var counter=0; counter < myNodes.length; counter++ )
	{
		tabNode = myNodes.item(counter)
		counLyrNode = tabNode.childNodes.length
		for( var counter1=0; counter1 < counLyrNode ; counter1++ )
		{
			myLeft = "";
			myTop = "";
			myWidth = "";
			myHeight = "";

			elementNode = tabNode.childNodes(counter1)
			myBtnId = elementNode.nodeName
			myBtnAttribCount = elementNode.childNodes.length
			for (var i=0;i < myBtnAttribCount; i++)
			{
				myBtnNode = elementNode.childNodes(i)

				if (myBtnNode.nodeType == 3)
				{
					var tmpText = myBtnNode.text;
				}
				else
				{
					var tmpText = myBtnNode.childNodes(0).text
				}
				
				switch (myBtnNode.nodeName)
				{
					case "srcObjid":
						(aryButton[btnAryStr][myBtnId]).srcObjid = tmpText;
						break;				
					case "tabIndex":
						(aryButton[btnAryStr][myBtnId]).tabIndex = tmpText;
						break;								
					case "blankBtnImgPath":	
						(aryButton[btnAryStr][myBtnId]).blankBtnImgPath = tmpText;
						break;							
					case "normalBtnImgPath":
						(aryButton[btnAryStr][myBtnId]).normalBtnImgPath = tmpText;
						break;								
					case "overBtnImgPath":	
						(aryButton[btnAryStr][myBtnId]).overBtnImgPath = tmpText;
						break;							
					case "downBtnImgPath":		
						(aryButton[btnAryStr][myBtnId]).downBtnImgPath = tmpText;
						break;						
					case "disableBtnImgPath":	
						(aryButton[btnAryStr][myBtnId]).disableBtnImgPath = tmpText;
						break;							
					case "defaultBtnImgPath":	
						(aryButton[btnAryStr][myBtnId]).defaultBtnImgPath = tmpText;
						break;	
					case "btnFontNormal":	
						(aryButton[btnAryStr][myBtnId]).btnFontNormal = tmpText;
						break;							
					case "btnFontOver":	
						(aryButton[btnAryStr][myBtnId]).btnFontOver = tmpText;
						break;							
					case "btnFontDown":	
						(aryButton[btnAryStr][myBtnId]).btnFontDown = tmpText;
						break;							
					case "btnFontDisable":	
						(aryButton[btnAryStr][myBtnId]).btnFontDisable = tmpText;
						break;							
					case "left":	
						myLeft = tmpText
						break;							
					case "top":		
						myTop = tmpText
						break;						
					case "width":	
						myWidth = tmpText
						break;							
					case "height":
						myHeight = tmpText
						break;		
				}		
			}
			
			if ((myLeft != "") || (myTop != "") || (myWidth != "") || (myHeight != ""))
			{
				aryButton[btnAryStr][myBtnId].ReArrange(((myLeft == "")? (aryButton[btnAryStr][myBtnId]).left : myLeft),((myTop == "")? (aryButton[btnAryStr][myBtnId]).top : myTop),((myWidth == "")? (aryButton[btnAryStr][myBtnId]).width : myWidth),((myHeight == "")? (aryButton[btnAryStr][myBtnId]).height : myHeight))
			}
		}
	}
}

function SetTableAttrib(xmlDoc,pageName)
{
	var myXML, myNodes,lyrNode,elementNode,myTblAttribCount,myTblNode,mytblId,subNode;

	myXML= document.all(xmlDoc).XMLDocument;
	//Put the <name> element into an object.
	
	if (pageName == "")
	{
		subNode = "settings/tableData"
	}
	else
	{
		subNode = "settings/tableData/" + pageName
	}
	
	myNodes=myXML.getElementsByTagName(subNode);
	//Extract the different values using a loop.
	
	for( var counter=0; counter < myNodes.length; counter++ )
	{
		tabNode = myNodes.item(counter)
		counLyrNode = tabNode.childNodes.length

		for( var counter1=0; counter1 < counLyrNode ; counter1++ )
		{
			elementNode = tabNode.childNodes(counter1)
			mytblId = elementNode.nodeName
			myTblAttribCount = elementNode.childNodes.length
 
			for (var i=0;i < myTblAttribCount; i++)
			{
				myTblNode = elementNode.childNodes(i)

				if (myTblNode.nodeType == 3)
				{
					var tmpText = myTblNode.text;
				}
				else
				{
					var tmpText = myTblNode.childNodes(0).text
				}
				
				if (document.getElementById(mytblId))
				{
					document.getElementById(mytblId)[myTblNode.nodeName] = tmpText;	
				}				
			}
		}
	}
}*/
