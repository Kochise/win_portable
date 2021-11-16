var $OP_DivRibbonLyr = $('<div id="OP_DivRibbonLyr" style="position:absolute;display:none;width:100%;height:82px;z-index: 2147483647;"/></div>');
var $OP_DivEmptyRibbonLyr = $('<div id="OP_DivEmptyRibbonLyr" style="display:none;width:100%;height:82px;z-index: 2147483647;"/></div>');
var _OPPromtpageURL =  chrome.runtime.getURL('omnipassui/opbhoprmpt.htm') ;

var $OP_DivGPALyr = $('<div id="OP_DivGPALyr" style="overflow: hidden;position:fixed;top:20%;left:40%;display:none;width:216px;height:356px;z-index: 1000000000000002;"/></div>');
var _OPGPApageURL =  chrome.runtime.getURL('omnipassui/gpa.htm') ;

var _IsOPPromtPage = false;
var _OPUILoaded = 0,_MaxOPUICount = 2;//we have two pages to load
var _OP_DivRibbonLyrLeft = 0;
var _OP_DivGPALyrLeft    = 0;

IsPromptPage();

function consolelog(str)
{
   return;
   console.log(str);
}

$(window).scroll(function(){
    if (self != top)
	 return;
	 	
	consolelog("_OP_DivRibbonLyrLeft = "+_OP_DivRibbonLyrLeft);
    consolelog("_OP_DivGPALyrLeft = "+_OP_DivGPALyrLeft);	
	
	if($('#OP_DivRibbonLyr').css("position") == 'fixed')
	  $('#OP_DivRibbonLyr').css('left', _OP_DivRibbonLyrLeft - $(this).scrollLeft());
	  
	//if($('#OP_DivGPALyr').css("position") == 'fixed')  
	  //$('#OP_DivGPALyr').css('left', _OP_DivGPALyrLeft - $(this).scrollLeft());
});

function IsPromptPage()
{
  if(_OPPromtpageURL == document.URL || _OPGPApageURL == document.URL)
  {
    _IsOPPromtPage = true;
	consolelog("This is op prompt page");
  }
}

function LoadPromptUI()
{
  LoadRibbonUI();
  LoadGPAUI();
  LoadBlockingUI(); 
}

function LoadRibbonUI()
{
//ui is loaded only in top level frame
    if (self != top)
	  return;
	
	consolelog("LoadRibbonUI "+document.domain);
			
	$('body').before($OP_DivRibbonLyr);
	$('body').before($OP_DivEmptyRibbonLyr);
	
	var $OP_DivRibbonFrame = $('<iframe id="OP_DivRibbonFrame" height=82px seamless style="border:0; margin:0; padding:0;"> </iframe>');
	var w  = 0;
	var w1 = window.screen.width;
	var w2 = $(document).width();
	w = (w1>w2)?w1:w2;		
	consolelog("w1="+w1+" w2="+w2+" w="+w);
	$OP_DivRibbonFrame.attr('src', _OPPromtpageURL);
	$OP_DivRibbonFrame.attr('width', w);
    
	$OP_DivRibbonFrame.load(function(){            
	        var domain = document.domain;
			consolelog("LoadRibbonUI iframe load success "+document.domain);
            $(this).focus();	   
	 }).appendTo($OP_DivRibbonLyr);
}

function LoadGPAUI()
{
//ui is loaded only in top level frame
    if (self != top)
	  return;
	
	consolelog("LoadGPA "+document.domain);
			
	$('body').before($OP_DivGPALyr);	
	
	var $OP_DivGPAFrame = $('<iframe id="OP_DivGPAFrame" width=216px height=356px seamless style="border:0; margin:0; padding:0;"> </iframe>');
	$OP_DivGPAFrame.attr('src', _OPGPApageURL);	

	$OP_DivGPAFrame.load(function(){
            _OP_DivGPALyrLeft = $(document).width() * 40/100;	
	        var domain = document.domain;
			consolelog("LoadGPA iframe load success "+document.domain);	 
		    $(this).focus();
	 }).appendTo($OP_DivGPALyr);
}

function LoadBlockingUI()
{
    if (self != top)
	{	
	  return;
	}	

	var opObj = document.getElementById('OP_lyrMain');
	if (typeof (opObj) != 'undefined' && opObj != null) 
	{
	  return;
	}
	
	var div = document.createElement('div'); 
	div.setAttribute('id','OP_lyrMain'); 
	div.style.display = 'none'; 
	div.style.zIndex = 2147483646; 
	div.style.position = 'absolute'; 
	div.style.left = 0; div.style.top = 0;
	div.style.width = (Math.max(window.innerWidth, document.body.scrollWidth)) + 'px'; 
	div.style.height = (Math.max(window.innerHeight, document.body.scrollHeight)) + 'px'; 
	div.style.backgroundColor = 'black'; 
	div.style.opacity = '0.6'; 
	div.style.filter = 'alpha(opacity=60)'; 	
	document.body.appendChild(div); 
	$(window).resize(resizeBlockingLayer); 
	$(window).scroll(resizeBlockingLayer);
}

function resizeBlockingLayer() 
{
	var opObj = document.getElementById('OP_lyrMain');
	if (typeof (opObj) != 'undefined' && opObj != null) 
	{
		opObj.style.width = (Math.max(window.innerWidth, document.body.scrollWidth)) + 'px';
		opObj.style.height = (Math.max(window.innerHeight, document.body.scrollHeight)) + 'px';
	}
}

function ShowPrompt(_pagenum,iscommand)
{
    consolelog("ShowPrompt " +document.domain);    
    //if we are processing command then process only if top level frame
	//when command is true and toplevel frame then we just show/hide the framelayer's
	
    var _iscommand = (iscommand == undefined)?false:true;
    var _topframe = (self == top);
	var from = "";
	
	if(_IsOPPromtPage)
	  from = "PromptPage";
	  
    if(_iscommand && _topframe == false)
	  return;
     
	if(_iscommand == false && _pagenum)
	{
		chrome.runtime.sendMessage(
		{
	    	command : "ShowPrompt",pagenum:_pagenum,topframe:_topframe,From : from
		});
	}
	
	if (_topframe)
	{	    	    		 		   		
		if(_pagenum == 1)
		{
		  $('#OP_lyrMain').css('top',$OP_DivRibbonLyr.attr('height'));
		  $('#OP_lyrMain').show(); 
		}
		$OP_DivRibbonLyr.css('position','fixed');			 
		$OP_DivRibbonLyr.show();
		$OP_DivEmptyRibbonLyr.show();
     
	    if(_pagenum == 4)//GPA
		{
		  $OP_DivGPALyr.show();
		  $('#OP_DivGPAFrame').focus();
		}
   		$(window).scrollTop(0);
		return true;
	}
	
    return false;	
}
 
 
function HidePrompt(iscommand)
{
    //if not argument passed means we are no processing a command sent from bk.js

    //if we are top level frame then show layer else sendcommand to bk.js which will again forward this message 
	//to all content scripts..the top level contentscript will process and display the prompt
    //if we are processing command then process only if top level frame
    var _iscommand = (iscommand == undefined)?false:iscommand;
	if (self == top)
	{
		$OP_DivRibbonLyr.hide();
		$OP_DivEmptyRibbonLyr.hide();
		$OP_DivGPALyr.hide();
		$('#OP_lyrMain').hide();
		return true;
	}else if(_iscommand == false)
	{
		chrome.runtime.sendMessage(
		{
	    	command : "HidePrompt"
		});
	}
	
    return false;	
}



//HTML5 communication
//used to handle commands from opui frames
$(window).on("message", function(e) {  
    e = e.originalEvent;
    var data = e.data;
    var extdomain = "chrome-extension://"+chrome.i18n.getMessage("@@extension_id");
    consolelog("postmessage listener in :-"+document.URL+"\ndata source "+e.origin+"\ndata:-"+data+" command:-"+data.command);
    if(self !=top)
     return;
       
    if(data.origin == undefined || data.command == undefined)
       return;

    if(e.origin != extdomain &&  data.origin!="$omnipass$")
      return;    

    if(data.command == "HidePrompt")
      HidePrompt();
	else if(data.command == "PromptUILoaded")
     {  
	   if(data.height != undefined)
	   {
	      //sent by opbho.js
	      //set the height of iframe and div to match the ribbon page height
	      $('#OP_DivRibbonFrame').attr('height', data.height);
		  $('#OP_DivRibbonLyr').css('height', data.height);
		  $('#OP_DivEmptyRibbonLyr').css('height', data.height);		 
	   }
	   _OPUILoaded++;
	   if(_OPUILoaded == _MaxOPUICount) 
	     chrome.runtime.sendMessage({command:"PromptUILoaded"});
     }else if(data.command == "IsPromptUILoaded")
	 {
		  if(_OPUILoaded == _MaxOPUICount) 
	         chrome.runtime.sendMessage({command:"PromptUILoaded"});
     }		 
});
