%% This is an -*- erlang -*- file.
%%
%% %CopyrightBegin%
%%
%% Copyright Ericsson AB 2010-2016. All Rights Reserved.
%%
%% Licensed under the Apache License, Version 2.0 (the "License");
%% you may not use this file except in compliance with the License.
%% You may obtain a copy of the License at
%%
%%     http://www.apache.org/licenses/LICENSE-2.0
%%
%% Unless required by applicable law or agreed to in writing, software
%% distributed under the License is distributed on an "AS IS" BASIS,
%% WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
%% See the License for the specific language governing permissions and
%% limitations under the License.
%%
%% %CopyrightEnd%

{application, wx,
 [{description, "Yet another graphics system"},
  {vsn, "2.1.1"},
  {modules,
   [
    %% Generated modules
  wxHelpEvent, wxColourData, wxIcon, wxColourPickerEvent, wxGraphicsMatrix, wxImage, wxGraphicsContext, wxPreviewFrame, wxFontPickerCtrl, wxEvtHandler, wxFileDialog, wxFlexGridSizer, wxPrintDialogData, wxAuiNotebook, wxDisplay, wxDCOverlay, wxClipboardTextEvent, wxMoveEvent, wxChoicebook, wxButton, wxNotificationMessage, wxGridCellFloatRenderer, wxWindowDC, wxColourDialog, wxHtmlLinkEvent, wxStatusBar, wxInitDialogEvent, wxEraseEvent, wxXmlResource, wxToggleButton, wxTaskBarIconEvent, wxPrintout, wxSysColourChangedEvent, wxGridCellRenderer, wxScrollBar, wxLocale, wxBitmap, wxQueryNewPaletteEvent, wxGridCellBoolRenderer, wxDC, wxPasswordEntryDialog, wxFrame, wxNavigationKeyEvent, wxBitmapButton, wxGraphicsRenderer, wxMouseCaptureLostEvent, wxTextEntryDialog, wxIdleEvent, wxStyledTextCtrl, wxListItem, wxSpinCtrl, wxMDIClientWindow, wxMDIChildFrame, wxStdDialogButtonSizer, wxPrintData, wxDirPickerCtrl, wxKeyEvent, wxEvent, wxFontDialog, wxRadioBox, wxMessageDialog, wxTreebook, wxWebView, wxLogNull, wxWindowDestroyEvent, wxSetCursorEvent, wxMenuItem, wxChoice, wxActivateEvent, wxGraphicsFont, wxStaticText, wxBufferedDC, wxControl, wxJoystickEvent, wxGridBagSizer, wxListbook, wxGridSizer, wxScrollEvent, wxGLContext, wxGridCellFloatEditor, wxStyledTextEvent, wxPrintDialog, wxBitmapDataObject, wxStaticBox, wxTextCtrl, wxRadioButton, wxMaximizeEvent, wxControlWithItems, wxDateEvent, wxGridCellAttr, wxCalendarEvent, wxGauge, wxGridCellTextEditor, wxShowEvent, wxPrintPreview, wxFindReplaceDialog, wxSystemOptions, wxTextDataObject, wxStaticBitmap, wxPreviewControlBar, wxStaticLine, wxMiniFrame, wxBookCtrlBase, wxListEvent, wxDialog, wxBrush, wxPaintDC, wxScreenDC, wxFileDataObject, wxSizerItem, wxPopupWindow, wxChildFocusEvent, wxFilePickerCtrl, wxPostScriptDC, wxGrid, wxAuiSimpleTabArt, wxSashEvent, wxScrolledWindow, wxSizerFlags, wxMask, wxGridEvent, wxFontData, wxSplitterEvent, wxBookCtrlEvent, wxMenu, wxHtmlWindow, wxPaletteChangedEvent, wxIconBundle, wxListItemAttr, wxMirrorDC, wxAuiManager, wxBoxSizer, wxMouseCaptureChangedEvent, wxClipboard, wxMouseEvent, wxListCtrl, wxDirDialog, wxSashWindow, wxAuiPaneInfo, wxPaintEvent, wxSplitterWindow, wxProgressDialog, wxGridCellNumberEditor, wxCheckBox, wxListBox, wxFileDirPickerEvent, wxCursor, wxMenuBar, wxDisplayChangedEvent, wxToolBar, wxGraphicsPen, wxNotifyEvent, wxArtProvider, wxHtmlEasyPrinting, wxBufferedPaintDC, wxTreeCtrl, wxFindReplaceData, wxGridCellEditor, wxListView, wxAuiManagerEvent, wxGridCellNumberRenderer, wxGraphicsGradientStops, wxNotebook, wxColourPickerCtrl, wxContextMenuEvent, wxLayoutAlgorithm, wxCheckListBox, wxGridCellBoolEditor, wxTopLevelWindow, wxMultiChoiceDialog, wxOverlay, wxWebViewEvent, wxAuiDockArt, wxComboBox, wxCommandEvent, wxPanel, wxDataObject, wxSizeEvent, wxDatePickerCtrl, wxFocusEvent, wxGridCellChoiceEditor, wxImageList, wxToolTip, wxPalette, wxSlider, wxSizer, wxGBSizerItem, wxPen, wxAuiNotebookEvent, wxGLCanvas, wxStaticBoxSizer, wxUpdateUIEvent, wxPageSetupDialogData, wxSplashScreen, wxMemoryDC, wxToolbook, wxPopupTransientWindow, wxGCDC, wxAcceleratorEntry, wxPickerBase, wxCloseEvent, wxCalendarDateAttr, wxCaret, wxIconizeEvent, wxAcceleratorTable, wxMenuEvent, wxWindowCreateEvent, wxMDIParentFrame, wxSpinButton, wxGenericDirCtrl, wxFont, wxSystemSettings, wxWindow, wxTreeEvent, wxDropFilesEvent, wxAuiTabArt, wxSpinEvent, wxSingleChoiceDialog, wxGraphicsPath, wxFontPickerEvent, wxPrinter, wxTaskBarIcon, wxRegion, wxClientDC, wxPageSetupDialog, wxSashLayoutWindow, wxGraphicsObject, wx_misc, wxGridCellStringRenderer, wxPreviewCanvas, wxTextAttr, wxScrollWinEvent, wxCalendarCtrl, wxGraphicsBrush, glu, gl,
    %% Handcrafted modules
    wx,
    wx_object,
    wxe_master,
    wxe_server,
    wxe_util
   ]},
  {registered, []},
  {applications, [stdlib, kernel]},
  {env, []},
  {runtime_dependencies, ["stdlib-2.0","kernel-3.0","erts-6.0"]}
 ]}.
