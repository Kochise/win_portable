function ChromeWindow()
{
  this.Event                 = Event;
  this.AddListener           = AddListener;
  this.focusedwindow         = null;  
  this.focuschangelistener   = null;
  
  function AddListener(event,listener)
  {
    if(event == "focuschange")
	  this.focuschangelistener = listener;
	else
	  console.error("invalid event");
  }
  
  function Event(tab,request)
  {
    if(tab == undefined || request == undefined)
	  return;
	
	
    if(request.command == "chromefocuschangeevt" && this.focuschangelistener!=null)
    {	   
		var bMinimized = false;
	   chrome.windows.get(tab.windowId,getwinifo.bind(this)); 
	   function getwinifo(win)
	   {
	     if(win == undefined)
		   return;
		   
	     if(this.focusedwindow == null)
		 {
		   this.focusedwindow = win;
		   if(tab.status == "complete")
		   {
				if(this.focusedwindow.state == "minimized")
					bMinimized = true;
				
				this.focuschangelistener({win:win,focused:win.focused,tab:tab,minimize:bMinimized});   
		   }
		    
		 }else if(this.focusedwindow.id!=win.id || this.focusedwindow.focused!=win.focused || this.focusedwindow.state!=win.state)
		 {
		   this.focusedwindow = win;
		   if(tab.status == "complete")
		   {
		     if(this.focusedwindow.state == "minimized")
				 bMinimized = true;
								
				this.focuschangelistener({win:win,focused:win.focused,tab:tab,minimize:bMinimized});   
		   }
		 }
	   }
    }		  
  }  
}