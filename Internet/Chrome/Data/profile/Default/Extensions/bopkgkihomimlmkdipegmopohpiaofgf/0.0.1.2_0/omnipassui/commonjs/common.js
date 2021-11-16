var pageLoadCount = 0;
var firePageLoadEventOnCount = 2;

function CheckDisable(obj)
{
	if ((obj.outerHTML).indexOf(" disabled") > 0 )
	{
		return true;
	}
	else
	{
		return false;
	}
}

function MakeLblDisable(obj)
{
	var tmpText = (obj.outerHTML).substr(0,(obj.outerHTML).indexOf(">"));
	if ( tmpText.indexOf("disabled") == -1 )
	{
		obj.outerHTML = (obj.outerHTML).replace(tmpText,(tmpText + " disabled"));
	}
}

function MakeLblEnable(obj)
{
	var tmpText = (obj.outerHTML).substr(0,(obj.outerHTML).indexOf(">"));
	if ( tmpText.indexOf("disabled") > 0 )
	{
		tmpTexta = tmpText.replace(" disabled","");
		obj.outerHTML = (obj.outerHTML).replace(tmpText,tmpTexta);
	}
}

function ShowMouseMoveEffect(imgObj,imgPath)
{
	if (typeof imgObj.filters != "undefined" && typeof imgObj.filters[0] != "undefined")
	{
		imgObj.filters[0].apply();
		imgObj.src = imgPath;
		imgObj.filters[0].play();
	}
	else
	{
		imgObj.src = imgPath;
	}
}

function MakeImageBtnVisible(btnObj)
{
	// Set GrayScale property = 0 and Opacity property = 100% for the main table.
	btnObj.style.display = "block"
}

function MakeImageBtnHidden(btnObj)
{
	// Set GrayScale property = 0 and Opacity property = 100% for the main table.
	btnObj.style.display = "none"
}

function MakeImageBtnEnable(btnObj)
{
	// Set GrayScale property = 0 and Opacity property = 100% for the main table.
	btnObj.disabled = false;
	btnObj.filters[1].GrayScale = 0
	btnObj.filters[1].Opacity = 1
}
 
function MakeImageBtnDisable(btnObj)
{
	// Set GrayScale property = 1 and Opacity property = 35% for the main table.
	btnObj.src = (btnObj.src).replace("over.gif","normal.gif");
	btnObj.src = (btnObj.src).replace("down.gif","normal.gif");
	btnObj.disabled = true;
	btnObj.filters[1].GrayScale = 1
	btnObj.filters[1].Opacity = 0.35
}

function ShowObject(objname,status)
{                             
    if(status == 0)
    {
        //alert("OP_SCRIPT_STATUS_HIDDEN ");
      	document.getElementById(objname).style.display = "none"
    }
    else if(status == 1)
    {
        //alert("OP_SCRIPT_STATUS_VISIBLE");
       	document.getElementById(objname).style.display = "block"
    }
} 

function GetobjDim(objname)
{                                 
     var x=document.getElementById(objname).offsetLeft;
     var y=document.getElementById(objname).offsetTop;
     var width=document.getElementById(objname).offsetWidth;
     var height=document.getElementById(objname).offsetHeight;
     return (parseInt(x) + "," + parseInt(y) + "," + parseInt(width) + "," + parseInt(height));
}

// Page Load Complete Notification //
function PageLoadComplete() {
    //alert("page load "+pageloadcnt);			
    if (pageLoadCount != firePageLoadEventOnCount) {
        pageLoadCount++;
        if (pageLoadCount != firePageLoadEventOnCount)
            return;
    }
    //alert("page load done ="+pageloadcnt);		  
    document.getElementById("page_loadcomplete").click();
    return;
}

// Handle Drag Event//

document.ondragstart = function() {return false;}

window.oncontextmenu = function() {return false;};
