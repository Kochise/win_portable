/****************************************************************************
 *                                                                          *
 * File    : addin.h                                                        *
 *                                                                          *
 * Purpose : Definitions for Pelles C add-in API 11.00.                     *
 *                                                                          *
 * History : Date      Reason                                               *
 *           04-01-28  Created                                              *
 *           04-05-19  Added definitions for version 2.80                   *
 *           04-10-12  Added definitions for version 2.90                   *
 *           05-02-25  Added definitions for version 3.00                   *
 *           05-07-30  Added definitions for version 4.00                   *
 *           06-04-29  Added definitions for version 4.50                   *
 *           07-03-05  Added definitions for version 5.00                   *
 *           07-05-10  Added UNICODE interface (for Sven).                  *
 *           09-03-11  Added definitions for version 6.00                   *
 *           10-09-30  Added definitions for version 6.50                   *
 *           12-03-06  Added definitions for version 7.00                   *
 *           13-08-02  Added definitions for version 8.00                   *
 *           18-04-26  Added definitions for version 9.00                   *
 *           20-05-09  Removed previously deprecated ANSI (A) stuff.        *
 *                                                                          *
 ****************************************************************************/

#ifndef _ADDIN_H
#define _ADDIN_H

#define WIN32_LEAN_AND_MEAN
#include <windows.h>

#define ADDINAPI __declspec(dllexport)

#ifndef SNDMSG
#ifdef __cplusplus
#define SNDMSG ::SendMessage
#else
#define SNDMSG SendMessage
#endif
#endif

#pragma pack(push)
#pragma pack()

/*
 * AddInMain() events.
 */
typedef enum tagADDIN_EVENT {
    AIE_APP_CREATE = 1,     // Main window created (hwnd = main window handle).
    AIE_APP_DESTROY = 2,    // Main window destroyed (hwnd = main window handle).
    AIE_PRJ_CREATE = 3,     // Project pane created (hwnd = project pane handle).
    AIE_PRJ_DESTROY = 4,    // Project pane destroyed (hwnd = project pane handle).
    AIE_PRJ_SAVE = 7,       // Project saved (2.90) (hwnd = project pane handle).
    AIE_PRJ_STARTBUILD = 8, // Project build will start (2.90) (hwnd = project pane handle).
    AIE_PRJ_ENDBUILD = 9,   // Project build has ended (2.90) (hwnd = project pane handle).
    AIE_PRJ_SETMODE = 17,   // Project mode has changed (9.00) (hwnd = project pane handle).
    AIE_DOC_CREATE = 5,     // MDI child window created (hwnd = MDI child window handle).
    AIE_DOC_DESTROY = 6,    // MDI child window destroyed (hwnd = MDI child window handle).
    AIE_DOC_SAVE = 10,      // MDI child window saved (2.90) (hwnd = MDI child window handle).
    AIE_DOC_NAVIGATE = 13,  // Web browser navigated to new URL (7.00) (hwnd = MDI child window handle).
    AIE_PRF_START = 11,     // Profiling will start (6.50) (hwnd = profiler window handle).
    AIE_PRF_END = 12,       // Profiling has ended (6.50) (hwnd = profiler window handle).
    AIE_DBG_START = 14,     // Debugging has started (8.00) (hwnd = debugger window handle).
    AIE_DBG_END = 15,       // Debugging will end (8.00) (hwnd = debugger window handle).
    AIE_DBG_BREAK = 16,     // Debuggee is paused (8.00) (hwnd = debugger window handle).
} ADDIN_EVENT;

/*
 * AddInHelp() events.
 */
typedef enum tagADDIN_HELPEVENT {  /* (4.00) */
    AIHE_SRC_KEYWORD_FIRST = 1,     // First chance: before IDE keyword lookup.
    AIHE_SRC_KEYWORD_SECOND = 2     // Last chance: after IDE keyword lookup, before custom help lookup.
} ADDIN_HELPEVENT;

/*
 * IDE Window types.
 */
enum ADDIN_WINDOW_TYPES {
    AID_UNKNOWN = 0,
    AID_SOURCE = 1,         // Source document.
    AID_RESOURCE = 2,       // Resource script document.
    AID_BITMAP = 3,         // Bitmap document.
    AID_ICON = 4,           // Icon document.
    AID_CURSOR = 5,         // Cursor document.
    AID_ANICURSOR = 6,      // Animated cursor document.
    AID_VIDEO = 7,          // Video document.
    AID_HEXDUMP = 8,        // Hexdump document.
    AID_PROJECT = 9,        // Project pane.
    AID_MSGTABLE = 10,      // Message table document (3.00).
    /*AID_DIALOG,*/
    /*AID_MENU,*/
    /*AID_ACCELTABLE,*/
    /*AID_STRINGTABLE,*/
    /*AID_VERSION,*/
    AID_DEBUG = 14,         // Debugger document (8.00).
    AID_PROFILE = 11,       // Profiler document (6.50).
    AID_WEB = 12,           // Web browser document (7.00).
    AID_DIFF = 13,          // Difference document (7.00).
};

/*
 * Text file encodings.
 */
enum ADDIN_TEXT_ENCODING {
    AITE_UNKNOWN = 0,               // Unknown, or don't apply.
    AITE_ANSI = 1,                  // ANSI encoding.
    AITE_OEM = 2,                   // OEM encoding.
    AITE_UTF8 = 3,                  // UTF-8 encoding with BOM.
    AITE_UTF8_NO_BOM = 4,           // UTF-8 encoding without BOM.
    AITE_UTF16_LE = 5,              // UTF-16 little-endian encoding with BOM.
    AITE_UTF16_LE_NO_BOM = 6,       // UTF-16 little-endian encoding without BOM.
    AITE_UTF16_BE = 7,              // UTF-16 big-endian encoding with BOM.
    AITE_UTF16_BE_NO_BOM = 8,       // UTF-16 big-endian encoding without BOM.
    AITE_UTF32_LE = 9,              // UTF-32 little-endian encoding with BOM.
    AITE_UTF32_LE_NO_BOM = 10,      // UTF-32 little-endian encoding without BOM.
    AITE_UTF32_BE = 11,             // UTF-32 big-endian encoding with BOM.
    AITE_UTF32_BE_NO_BOM = 12,      // UTF-32 big-endian encoding without BOM.
};

/*
 * IDE menu identifiers.
 */
enum ADDIN_MENU_IDENTIFIERS {
    AIM_MENU_NOTHING = 0,
    AIM_MENU_FILE = 1,                  // File menu.
    AIM_MENU_FILE_NEW = 17,             // New file menu (8.00).
    AIM_MENU_EDIT = 2,                  // Edit menu.
    AIM_MENU_VIEW = 3,                  // View menu.
    AIM_MENU_PROJECT = 4,               // Project menu.
    AIM_MENU_PROJECT_CONTEXT = 5,       // Project context menu(s).
    AIM_MENU_HELP = 6,                  // Help menu.
    AIM_MENU_SOURCE = 7,                // Source menu.
    AIM_MENU_SOURCE_CONTEXT = AIM_MENU_SOURCE,  // Source context menu.
    AIM_MENU_SOURCE_CONVERT = 9,        // Source convert menu.
    AIM_MENU_RESOURCE = 10,             // Resource menu (3.00).
    AIM_MENU_RESOURCE_NEW = 11,         // New resource menu (3.00).
    AIM_MENU_MSGTABLE = 12,             // Message table menu (3.00).
    AIM_MENU_DEBUG = 15,                // Debugger menu (8.00).
    AIM_MENU_HELP_WEB = 13,             // Web Help menu (3.00).
    AIM_MENU_WEB = 14,                  // Web browser menu (7.00).
    AIM_MENU_DIFF = 16,                 // Difference menu (8.00).
};

/*
 * IDE command identifiers - AddIn_SendIDECommand().
 */
enum ADDIN_COMMAND_IDENTIFIERS {
    /* Mistakes */
    NEW_RSRC_LABELS = 7533,
    NEW_RSRC_INCLUDES = 7534,
    /* File commands */
    AIC_FILE_NEWPROJECT = 7501,         // File - New project.
    AIC_FILE_NEWSOURCE = 7502,          // File - New source code.
    AIC_FILE_NEWRESOURCE = 7503,        // File - New resource script.
    AIC_FILE_NEWBITMAP = 7504,          // File - New bitmap.
    AIC_FILE_NEWICON = 7505,            // File - New icon.
    AIC_FILE_NEWCURSOR = 7506,          // File - New cursor.
    AIC_FILE_NEWANICURSOR = 7507,       // File - New animated cursor.
    AIC_FILE_NEWVIDEO = 7508,           // File - New video.
    AIC_FILE_NEWHEXDUMP = 7509,         // File - New binary.
    AIC_FILE_NEWMSGTABLE = 7655,        // File - New message table (3.00).
    AIC_FILE_NEWWEB = 7766,             // File - New web browser (7.00).
    AIC_FILE_NEWDIFF = 7772,            // File - New difference (7.00).
    AIC_FILE_OPEN = 7510,               // File - Open.
    AIC_FILE_CLOSE = 7511,              // File - Close.
    AIC_FILE_CLOSEPROJ = 7721,          // File - Close project (5.00).
    AIC_FILE_SAVE = 7512,               // File - Save.
    AIC_FILE_SAVEAS = 7513,             // File - Save As.
    AIC_FILE_SAVEALL = 7514,            // File - Save All.
    AIC_FILE_PRINT = 7516,              // File - Print.
    AIC_FILE_PRINTSETUP = 7517,         // File - Page setup.
    AIC_FILE_SENDMAIL = 7518,           // File - Send *** REMOVED IN 7.00 ***
    AIC_FILE_PROPERTIES = 7519,         // File - Properties.
    AIC_FILE_EXIT = 7520,               // File - Exit.
    /* Edit commands */
    AIC_EDIT_UNDO = 7521,               // Edit - Undo.
    AIC_EDIT_REDO = 7522,               // Edit - Redo.
    AIC_EDIT_CUT = 7523,                // Edit - Cut.
    AIC_EDIT_COPY = 7524,               // Edit - Copy.
    AIC_EDIT_PASTE = 7525,              // Edit - Paste.
    AIC_EDIT_INSERT = 7526,             // Insert (hidden).
    AIC_EDIT_DELETE = 7527,             // Edit - Delete.
    AIC_EDIT_DELETEWORD = 7650,         // Edit - Delete previous word (2.90).
    AIC_EDIT_SELECTALL = 7528,          // Edit - Select All.
    AIC_EDIT_FIND = 7529,               // Edit - Find.
    AIC_EDIT_FINDNEXT = 7530,           // Edit - Find next.
    AIC_EDIT_REPLACE = 7531,            // Edit - Replace.
    AIC_EDIT_FILEFIND = 7515,           // Edit - Find in files.
    AIC_FILE_FILEFIND = AIC_EDIT_FILEFIND,  // Compatibility name (< 5.00).
    AIC_EDIT_GOTO = 7532,               // Edit - Go To.
    /* View commands */
    AIC_VIEW_LABELS = NEW_RSRC_LABELS,  // View - Resource symbols (6.50: View -> Resource menu).
    AIC_VIEW_INCLUDES = NEW_RSRC_INCLUDES, // View - Resource includes (6.50: View -> Resource menu).
    AIC_VIEW_SHOWTOOLBAR = 7535,        // View - Toolbar.
    AIC_VIEW_SHOWSTATUSBAR = 7536,      // View - Statusbar.
    AIC_VIEW_SHOWDOCTABS = 7641,        // View - Document tabs (2.80).
    AIC_VIEW_SHOWWELCOME = 7780,        // View - Start page (7.00).
    AIC_VIEW_TOGGLEFULLSCREEN = 7783,   // View - Full screen (8.00).
    AIC_VIEW_SOURCEFILES = 7722,        // View - Source files (5.00).
    AIC_VIEW_TARGETFILES = 7723,        // View - Target files (5.00).
    AIC_VIEW_PROJECT = 7724,            // View - Project tab (5.00).
    AIC_VIEW_FILEFIND = 7725,           // View - Find in files tab (5.00).
    AIC_VIEW_OUTPUT = 7726,             // View - Output tab (5.00).
    AIC_VIEW_TRACE = 7727,              // View - Debug tab (5.00).
    AIC_VIEW_BREAKPOINTS = 7728,        // View - Breakpoints tab (5.00).
    AIC_VIEW_AUTO = 7729,               // View - Debugger, Auto tab (5.00).
    AIC_VIEW_WATCH = 7730,              // View - Debugger, Watch tab (5.00).
    AIC_VIEW_LOCALS = 7731,             // View - Debugger, Locals tab (5.00).
    AIC_VIEW_GLOBALS = 7732,            // View - Debugger, Globals tab (5.00).
    AIC_VIEW_REGISTERS = 7733,          // View - Debugger, Registers tab (5.00).
    AIC_VIEW_STACK = 7734,              // View - Debugger, Call stack (5.00).
    AIC_VIEW_MEMORY = 7735,             // View - Debugger, Memory tab (5.00).
    AIC_VIEW_THREADS = 7736,            // View - Debugger, Threads tab (5.00).
    AIC_VIEW_MODULES = 7737,            // View - Debugger, Modules tab (5.00).
    AIC_VIEW_EXCEPTIONS = 7738,         // View - Debugger, Exceptions tab (5.00).
    AIC_VIEW_OUTLINE = 7778,            // View - Difference, Outline (7.00).
    AIC_VIEW_EXPAND = 7779,             // View - Difference, Expand (7.00).
    AIC_VIEW_HELPCONTENTS = 7781,       // View - Help contents (7.00).
    AIC_VIEW_HELPINDEX = 7782,          // View - Help index (7.00).
    AIC_VIEW_HELPSEARCH = 7785,         // View - Help search (8.00).
    /* Project commands */
    AIC_PROJ_ADDFILE = 7537,            // Project - Add files to project.
    AIC_PROJ_ADDPROJECT = 7667,         // Project - Add project to workspace (4.00).
    AIC_PROJ_SETTINGS = 7538,           // Project - Project options.
    AIC_PROJ_MODES = 7789,              // Project - Project modes (9.00).
    AIC_PROJ_COMPILE = 7539,            // Project - compile.
    AIC_PROJ_BUILD = 7540,              // Project - Build.
    AIC_PROJ_REBUILD = 7541,            // Project - Rebuild.
    AIC_PROJ_BUILDALL = AIC_PROJ_REBUILD,   // Compatibility name (< 5.00).
    AIC_PROJ_CLEAN = 7786,              // Project - Clean (9.00).
    AIC_PROJ_BUILDWKS = 7719,           // Project - Build workspace (5.00).
    AIC_PROJ_REBUILDWKS = 7720,         // Project - Rebuild workspace (5.00).
    AIC_PROJ_CLEANWKS = 7787,           // Project - Clean workspace (9.00).
    AIC_PROJ_STOPBUILD = 7542,          // Project - Stop rebuild.
    AIC_PROJ_MAKEALLPREQS = 7543,       // Project - Update all dependencies.
    AIC_PROJ_EXECUTE = 7544,            // Project - Execute.
    AIC_PROJ_PROFILE = 7765,            // Project - Profile (6.50).
    AIC_PROJ_ZIP = 7545,                // Project - ZIP project files.
    AIC_PROJ_UNZIP = 7546,              // Project - UNZIP project files.
    AIC_PROJ_SETACTIVE = 7668,          // Project - Set active project (4.00).
    AIC_PROJ_DEPENDENCIES = 7669,       // Project - Dependencies (4.00).
    /* Tool commands */
    AIC_TOOL_CUSTOMIZE = 7547,          // Tools - Customize.
    AIC_TOOL_SETTINGS = 7548,           // Tools - Options.
    AIC_TOOL_CUSTOMTOOL = 7549,         // Tools - Custom tool #1.
    AIC_TOOL_CUSTOMTOOL_1 = 7550,       // Tools - Custom tool #2.
    AIC_TOOL_CUSTOMTOOL_2 = 7551,       // Tools - Custom tool #3.
    AIC_TOOL_CUSTOMTOOL_3 = 7552,       // Tools - Custom tool #4.
    AIC_TOOL_CUSTOMTOOL_4 = 7553,       // Tools - Custom tool #5.
    AIC_TOOL_CUSTOMTOOL_5 = 7554,       // Tools - Custom tool #6.
    AIC_TOOL_CUSTOMTOOL_6 = 7555,       // Tools - Custom tool #7.
    AIC_TOOL_CUSTOMTOOL_7 = 7556,       // Tools - Custom tool #8.
    AIC_TOOL_CUSTOMTOOL_8 = 7711,       // Tools - Custom tool #9 (5.00).
    AIC_TOOL_CUSTOMTOOL_9 = 7712,       // Tools - Custom tool #10 (5.00).
    AIC_TOOL_CUSTOMTOOL_10 = 7713,      // Tools - Custom tool #11 (5.00).
    AIC_TOOL_CUSTOMTOOL_11 = 7714,      // Tools - Custom tool #12 (5.00).
    AIC_TOOL_CUSTOMTOOL_12 = 7715,      // Tools - Custom tool #13 (5.00).
    AIC_TOOL_CUSTOMTOOL_13 = 7716,      // Tools - Custom tool #14 (5.00).
    AIC_TOOL_CUSTOMTOOL_14 = 7717,      // Tools - Custom tool #15 (5.00).
    AIC_TOOL_CUSTOMTOOL_15 = 7718,      // Tools - Custom tool #16 (5.00).
    /* Window commands */
    AIC_WIN_NEW = 7557,                 // Window - New window.
    AIC_WIN_CASCADE = 7558,             // Window - Cascade.
    AIC_WIN_TILEVERT = 7559,            // Window - Tile vertically.
    AIC_WIN_TILEHORZ = 7560,            // Window - Tile horizontally.
    AIC_WIN_CLOSEALL = 7561,            // Window - Close All.
    /* Help commands */
    AIC_HELP_CONTENTS = 7562,           // Help - Contents.
    AIC_HELP_ABOUT = 7563,              // Help - About.
    AIC_HELP_CUSTOMHELP = 7564,         // Help - Custom help #1.
    AIC_HELP_CUSTOMHELP_1 = 7565,       // Help - Custom help #2.
    AIC_HELP_CUSTOMHELP_2 = 7566,       // Help - Custom help #3.
    AIC_HELP_CUSTOMHELP_3 = 7567,       // Help - Custom help #4.
    AIC_HELP_CUSTOMHELP_4 = 7568,       // Help - Custom help #5.
    AIC_HELP_CUSTOMHELP_5 = 7569,       // Help - Custom help #6.
    AIC_HELP_CUSTOMHELP_6 = 7570,       // Help - Custom help #7.
    AIC_HELP_CUSTOMHELP_7 = 7571,       // Help - Custom help #8.
    AIC_HELP_CUSTOMHELP_8 = 7703,       // Help - Custom help #9 (5.00).
    AIC_HELP_CUSTOMHELP_9 = 7704,       // Help - Custom help #10 (5.00).
    AIC_HELP_CUSTOMHELP_10 = 7705,      // Help - Custom help #11 (5.00).
    AIC_HELP_CUSTOMHELP_11 = 7706,      // Help - Custom help #12 (5.00).
    AIC_HELP_CUSTOMHELP_12 = 7707,      // Help - Custom help #13 (5.00).
    AIC_HELP_CUSTOMHELP_13 = 7708,      // Help - Custom help #14 (5.00).
    AIC_HELP_CUSTOMHELP_14 = 7709,      // Help - Custom help #15 (5.00).
    AIC_HELP_CUSTOMHELP_15 = 7710,      // Help - Custom help #16 (5.00).
    /* Image commands */
    AIC_IMG_NEWIMAGE = 7572,
    AIC_IMG_DELETEIMAGE = 7573,
    AIC_IMG_LOADPALETTE = 7574,
    AIC_IMG_SAVEPALETTE = 7575,
    AIC_IMG_DEFAULTPALETTE = 7576,
    AIC_IMG_RESIZE = 7761,              // (5.00)
    AIC_IMG_MIRROR_HORZ = 7577,
    AIC_IMG_MIRROR_VERT = 7578,
    AIC_IMG_ROTATE = 7580,
    AIC_IMG_GRAYSCALE = 7579,
    AIC_IMG_SEPIATONE = 7659,           // (4.00)
    AIC_IMG_HSV = 7649,                 // (2.90)
    AIC_IMG_OPAQUEALPHA = 7660,         // (4.00)
    AIC_IMG_EFFECT_OILPAINT = 7581,
    AIC_IMG_EFFECT_SPREAD = 7582,
    AIC_IMG_EFFECT_EMBOSS = 7583,
    AIC_IMG_EFFECT_FISHEYE = 7648,      // (2.90)
    AIC_IMG_EFFECT_DROPSHADOW = 7661,   // (4.00)
    AIC_IMG_EFFECT_BLUR = 7584,
    AIC_IMG_EFFECT_SHARPEN = 7585,
    /* Dialog commands */
    AIC_DLG_NEWPICTURE = 7672,          // Dialog - new picture (4.50).
    AIC_DLG_NEWBITMAP = AIC_DLG_NEWPICTURE, // Compatibility name (5.00).
    AIC_DLG_NEWTEXT = 7673,             // Dialog - new text (4.50).
    AIC_DLG_NEWEDITBOX = 7674,          // Dialog - new editbox (4.50).
    AIC_DLG_NEWGROUPBOX = 7675,         // Dialog - new groupbox (4.50).
    AIC_DLG_NEWPUSHBUTTON = 7676,       // Dialog - new pushbutton (4.50).
    AIC_DLG_NEWCHECKBOX = 7677,         // Dialog - new checkbox (4.50).
    AIC_DLG_NEWRADIOBUTTON = 7678,      // Dialog - new radiobutton (4.50).
    AIC_DLG_NEWCOMBOBOX = 7679,         // Dialog - new combobox (4.50).
    AIC_DLG_NEWLISTBOX = 7680,          // Dialog - new listbox (4.50).
    AIC_DLG_NEWHSCROLLBAR = 7681,       // Dialog - new horizontal scrollbar (4.50).
    AIC_DLG_NEWVSCROLLBAR = 7682,       // Dialog - new vertical scrollbar (4.50).
    AIC_DLG_NEWUPDOWN = 7683,           // Dialog - new updown (4.50).
    AIC_DLG_NEWPROGRESS = 7684,         // Dialog - new progress (4.50).
    AIC_DLG_NEWTRACKBAR = 7685,         // Dialog - new trackbar (4.50).
    AIC_DLG_NEWHOTKEY = 7686,           // Dialog - new hotkey (4.50).
    AIC_DLG_NEWLISTVIEW = 7687,         // Dialog - new listview (4.50).
    AIC_DLG_NEWTREEVIEW = 7688,         // Dialog - new treeview (4.50).
    AIC_DLG_NEWTABCONTROL = 7689,       // Dialog - new tabcontrol (4.50).
    AIC_DLG_NEWANIMATE = 7690,          // Dialog - new animate (4.50).
    AIC_DLG_NEWRICHEDIT = 7691,         // Dialog - new richedit 1.0 (4.50).
    AIC_DLG_NEWRICHED20 = 7692,         // Dialog - new richedit 2.0 (4.50).
    AIC_DLG_NEWDATETIME = 7693,         // Dialog - new datetime (4.50).
    AIC_DLG_NEWMONTHCAL = 7694,         // Dialog - new monthcal (4.50).
    AIC_DLG_NEWCOMBOBOXEX = 7695,       // Dialog - new comboboxex (4.50).
    AIC_DLG_NEWREBAR = 7696,            // Dialog - new rebar (4.50).
    AIC_DLG_NEWPAGER = 7697,            // Dialog - new pager (4.50).
    AIC_DLG_NEWTOOLBAR = 7698,          // Dialog - new toolbar (4.50).
    AIC_DLG_NEWSTATUSBAR = 7699,        // Dialog - new statusbar (4.50).
    AIC_DLG_NEWSYSLINK = 7759,          // Dialog - new SysLink (5.00).
    AIC_DLG_NEWIPADDRESS = 7701,        // Dialog - new ip-address (5.00).
    AIC_DLG_NEWNETADDRESS = 7760,       // Dialog - new net-address (5.00).
    AIC_DLG_NEWSPLITBUTTON = 7757,      // Dialog - New splitbutton (5.00).
    AIC_DLG_NEWCOMMANDLINK = 7758,      // Dialog - New commandlink (5.00).
    AIC_DLG_NEWNATIVEFONT = 7702,       // Dialog - new native font (5.00).
    AIC_DLG_ALIGNLEFT = 7586,
    AIC_DLG_ALIGNRIGHT = 7587,
    AIC_DLG_ALIGNTOP = 7588,
    AIC_DLG_ALIGNBOTTOM = 7589,
    AIC_DLG_ALIGNVERT = 7590,
    AIC_DLG_ALIGNHORZ = 7591,
    AIC_DLG_CENTERVERT = 7592,
    AIC_DLG_CENTERHORZ = 7593,
    AIC_DLG_SPACEVERT = 7594,
    AIC_DLG_SPACEHORZ = 7595,
    AIC_DLG_ARRSIZEWIDTH = 7596,
    AIC_DLG_ARRSIZEHEIGHT = 7597,
    AIC_DLG_ARRSIZEBOTH = 7598,
    AIC_DLG_ARRPUSHBOTTOM = 7599,
    AIC_DLG_ARRPUSHRIGHT = 7600,
    AIC_DLG_SIZETOTEXT = 7601,
    AIC_DLG_NEWCUSTOM = 7602,
    AIC_DLG_OPENCUSTOM = 7603,
    AIC_DLG_REMOVECUSTOM = 7604,
    AIC_DLG_LOCKCONTROLS = 7640,        // (2.80)
    AIC_DLG_ORDERCONTROLS = 7652,       // (2.90)
    /* Resource commands */
    AIC_RSRC_NEWBITMAP = 7605,          // Resource - New bitmap.
    AIC_RSRC_NEWICON = 7606,            // Resource - New icon.
    AIC_RSRC_NEWCURSOR = 7607,          // Resource - New cursor.
    AIC_RSRC_NEWANICURSOR = 7608,       // Resource - New animated cursor.
    AIC_RSRC_NEWVIDEO = 7609,           // Resource - New video.
    AIC_RSRC_NEWDIALOG = 7610,          // Resource - New dialog.
    AIC_RSRC_NEWMENU = 7611,            // Resource - New menu.
    AIC_RSRC_NEWSTRINGTABLE = 7612,     // Resource - New string table.
    AIC_RSRC_NEWMSGTABLE = 7654,        // Resource - New message table (3.00).
    AIC_RSRC_NEWACCEL = 7613,           // Resource - New accelerator table.
    AIC_RSRC_NEWVERSION = 7614,         // Resource - New version.
    AIC_RSRC_NEWMANIFEST = 7615,        // Resource - New manifest.
    AIC_RSRC_NEWHTML = 7739,            // Resource - new HTML (5.00).
    AIC_RSRC_NEWCUSTOM = 7653,          // Resource - New custom type (3.00).
    AIC_RSRC_NEWCOPY = 7616,            // Resource - Duplicate.
    AIC_RSRC_IMPORT = 7617,             // Resource - Import.
    AIC_RSRC_EXPORT = 7762,             // Resource - Export (6.00).
    AIC_RSRC_SORTNAMES = 7651,          // Resource - Sorted names (2.90).
    AIC_RSRC_LABELS = NEW_RSRC_LABELS,  // Resource - Symbols (6.50: View -> Resource menu).
    AIC_RSRC_INCLUDES = NEW_RSRC_INCLUDES, // Resource - Includes (6.50: View -> Resource menu).
    /* Message table commands */
    AIC_MESS_SETINCLUDE = 7656,         // Message - Open symbol file (3.00).
    AIC_MESS_VIEWLABELS = 7657,         // Message - View symbols (3.00).
    /* Source commands */
    AIC_SRC_FORCECALLTIP = 7671,        // Source - Show call tip (4.50).
    AIC_SRC_COMPLETEWORD = 7642,        // Source - Complete word (2.80).
    AIC_SRC_INSERTSNIPPET = 7740,       // Source - Insert code snippet (5.00).
    AIC_SRC_SURROUNDBY = 7741,          // Source - surround by #1 (5.00).
    AIC_SRC_SURROUNDBY_1 = 7742,        // Source - surround by #2 (5.00).
    AIC_SRC_SURROUNDBY_2 = 7743,        // Source - surround by #3 (5.00).
    AIC_SRC_SURROUNDBY_3 = 7744,        // Source - surround by #4 (5.00).
    AIC_SRC_SURROUNDBY_4 = 7745,        // Source - surround by #5 (5.00).
    AIC_SRC_SURROUNDBY_5 = 7746,        // Source - surround by #6 (5.00).
    AIC_SRC_SURROUNDBY_6 = 7747,        // Source - surround by #7 (5.00).
    AIC_SRC_SURROUNDBY_7 = 7748,        // Source - surround by #8 (5.00).
    AIC_SRC_SURROUNDBY_8 = 7749,        // Source - surround by #9 (5.00).
    AIC_SRC_SURROUNDBY_9 = 7750,        // Source - surround by #10 (5.00).
    AIC_SRC_SURROUNDBY_10 = 7751,       // Source - surround by #11 (5.00).
    AIC_SRC_SURROUNDBY_11 = 7752,       // Source - surround by #12 (5.00).
    AIC_SRC_SURROUNDBY_12 = 7753,       // Source - surround by #13 (5.00).
    AIC_SRC_SURROUNDBY_13 = 7754,       // Source - surround by #14 (5.00).
    AIC_SRC_SURROUNDBY_14 = 7755,       // Source - surround by #15 (5.00).
    AIC_SRC_SURROUNDBY_15 = 7756,       // Source - surround by #16 (5.00).
    AIC_SRC_UCASE = 7618,               // Source - Convert to upper case.
    AIC_SRC_LCASE = 7619,               // Source - Convert to lower case.
    AIC_SRC_TABTOSPACE = 7620,          // Source - Convert to spaces (from tabs).
    AIC_SRC_SPACETOTAB = 7621,          // Source - Convert to tabs (from spaces).
    AIC_SRC_FORMAT = 7658,              // Source - Convert to formatted C code (3.00).
    AIC_SRC_COMMENT = 7662,             // Source - Convert to comment (4.00).
    AIC_SRC_UNCOMMENT = 7663,           // Source - Convert to no comment (4.00).
    AIC_SRC_NEXTBOOKMARK = 7622,        // Source - Next bookmark.
    AIC_SRC_PREVBOOKMARK = 7645,        // Source - Previous bookmark.
    AIC_SRC_SETBOOKMARK = 7623,         // Source - Toggle bookmark.
    AIC_SRC_CLEARBOOKMARKS = 7624,      // Source - Remove all bookmarks.
    AIC_SRC_WHITESPACE = 7625,          // Source - View whitespace.
    AIC_SRC_LINEBREAKS = 7626,          // Source - View breaks.
    AIC_SRC_LINENUMBERS = 7627,         // Source - View linenumbers.
    AIC_SRC_FOLDINGS = 7644,            // Source - View foldings (2.90).
    AIC_SRC_MATCHINGBRACES = 7700,      // Source - View matching braces (4.50).
    AIC_SRC_VIEWDEFINITION = 7763,      // Source - Go to definition of X (6.00).
    AIC_SRC_PREVDEFINITION = 7764,      // Source - Go to previous definition (6.00).
    AIC_SRC_FOLDALL = 7646,             // Source - Fold all (2.90).
    AIC_SRC_UNFOLDALL = 7647,           // Source - Unfold all (2.90).
    /* Debug commands */
    AIC_DBG_GO = 7628,
    AIC_DBG_RESTART = 7629,
    AIC_DBG_STOP = 7630,
    AIC_DBG_BREAK = 7631,
    AIC_DBG_STEPINTO = 7632,
    AIC_DBG_STEPOVER = 7633,
    AIC_DBG_STEPOUT = 7665,             // (4.00)
    AIC_DBG_RUNTOCURSOR = 7666,         // (4.00)
    AIC_DBG_TOGGLEBREAKPOINT = 7634,
    AIC_DBG_SETBREAKPOINT = AIC_DBG_TOGGLEBREAKPOINT,  // Compatibility
    AIC_DBG_SHOWNEXTSTMT = 7635,
    AIC_DBG_ADDWATCH = 7643,            // (2.80)
    AIC_DBG_QUICKWATCH = 7664,          // (4.00)
    AIC_DBG_HWBREAKS = 7670,            // (4.00)
    /* Web browser commands */
    AIC_WEB_BACK = 7767,                // Web - Back (7.00).
    AIC_WEB_FORWARD = 7768,             // Web - Forward (7.00).
    AIC_WEB_HOME = 7784,                // Web - Home (8.00).
    AIC_WEB_REFRESH = 7769,             // Web - Refresh (7.00).
    AIC_WEB_CERTIFICATE = 7770,         // Web - Certificate (7.00).
    AIC_WEB_SHOWSOURCE = 7771,          // Web - Show source (7.00).
    /* Difference commands */
    AIC_DIFF_PREVCHANGE = 7773,         // Diff - Previous change (7.00).
    AIC_DIFF_NEXTCHANGE = 7774,         // Diff - Next change (7.00).
    AIC_DIFF_REFRESH = 7775,            // Diff - Refresh (7.00).
    AIC_DIFF_OPENLEFT = 7776,           // Diff - Open left file (7.00).
    AIC_DIFF_OPENRIGHT = 7777,          // Diff - Open right file (7.00).
    AIC_DIFF_OPENCOMPOSITE = 7788,      // Diff - Open composite file (9.00).
    /* Misc commands */
    AIC_MISC_OPEN = 7636,
    AIC_MISC_TEST = 7637,
    AIC_MISC_CHECKMNEMONICS = 7638,
    AIC_MISC_NEXTWINDOW = 7639,
};

/*
 * IDE message identifiers.
 */
enum ADDIN_MESSAGE_IDENTIFIERS {
    /* Application window messages */
    /* Deprecated -- AIM_ADD_COMMAND_A = (WM_APP+1000), */
    AIM_ADD_COMMAND_W = (WM_APP+1062),  /* (5.00) */
    AIM_REMOVE_COMMAND = (WM_APP+1001),
    AIM_GET_ACTIVE_DOCUMENT = (WM_APP+1002),
    AIM_NEW_DOCUMENT = (WM_APP+1003),
    /* Deprecated -- AIM_OPEN_DOCUMENT_A = (WM_APP+1004), */
    AIM_OPEN_DOCUMENT_W = (WM_APP+1063),  /* (5.00) */
    AIM_ENUM_DOCUMENTS = (WM_APP+1046),  /* (2.90) */
    /* Deprecated -- AIM_ADD_TAB_PAGE_A = (WM_APP+1005), */
    AIM_ADD_TAB_PAGE_W = (WM_APP+1064),  /* (5.00) */
    AIM_REMOVE_TAB_PAGE = (WM_APP+1006),
    AIM_SELECT_TAB_PAGE = (WM_APP+1007),
    /* Deprecated -- AIM_WRITE_OUTPUT_A = (WM_APP+1041), */
    AIM_WRITE_OUTPUT_W = (WM_APP+1065),  /* (5.00) */
    /* AIM_ADD_FILE_TYPE_A = (WM_APP+1042), */
    AIM_ADD_FILE_TYPE_W = (WM_APP+1066),  /* (5.00) */
    AIM_FIND_IN_FILES_W = (WM_APP+1092),  /* (5.00) */
    AIM_GET_FOLDER_W = (WM_APP+1093),  /* (5.00) */
    AIM_FILE_DIFFERENCE_W = (WM_APP+1103),  /* (7.00) */
    /* Project pane messages */
    AIM_GET_PROJECT_TYPE = (WM_APP+1094),  /* (5.00) */
    AIM_GET_PROJECT_TARGET_W = (WM_APP+1138),  /* (9.00) */
    /* Deprecated -- AIM_ADD_PROJECT_FILE_A = (WM_APP+1008), */
    AIM_ADD_PROJECT_FILE_W = (WM_APP+1067),  /* (5.00) */
    /* Deprecated -- AIM_DELETE_PROJECT_FILE_A = (WM_APP+1009), */
    AIM_DELETE_PROJECT_FILE_W = (WM_APP+1068),  /* (5.00) */
    /* Deprecated -- AIM_RENAME_PROJECT_FILE_A = (WM_APP+1060), */
    AIM_RENAME_PROJECT_FILE_W = (WM_APP+1069),  /* (5.00) */
    /* Deprecated -- AIM_EXCLUDE_PROJECT_FILE_A = (WM_APP+1061), */
    AIM_EXCLUDE_PROJECT_FILE_W = (WM_APP+1070),  /* (5.00) */
    /* Deprecated -- AIM_ENUM_PROJECT_FILES_A = (WM_APP+1043), */
    AIM_ENUM_PROJECT_FILES_W = (WM_APP+1071),  /* (5.00) */
    /* Deprecated -- AIM_GET_PROJECT_SYMBOL_A = (WM_APP+1010), */
    AIM_GET_PROJECT_SYMBOL_W = (WM_APP+1072),  /* (5.00) */
    /* Deprecated -- AIM_SET_PROJECT_SYMBOL_A = (WM_APP+1011), */
    AIM_SET_PROJECT_SYMBOL_W = (WM_APP+1073),  /* (5.00) */
    /* Deprecated -- AIM_GET_PROJECT_SHELLS_A = (WM_APP+1012), */
    AIM_GET_PROJECT_SHELLS_W = (WM_APP+1074),  /* (5.00) */
    /* Deprecated -- AIM_SET_PROJECT_SHELLS_A = (WM_APP+1013), */
    AIM_SET_PROJECT_SHELLS_W = (WM_APP+1075),  /* (5.00) */
    AIM_DID_PROJECT_BUILD_FAIL = (WM_APP+1045),  /* (2.90) */
    /* Deprecated -- AIM_GET_ACTIVE_PROJECT_A = (WM_APP+1052), */
    AIM_GET_ACTIVE_PROJECT_W = (WM_APP+1076),  /* (5.00) */
    /* Deprecated -- AIM_SET_ACTIVE_PROJECT_A = (WM_APP+1053), */
    AIM_SET_ACTIVE_PROJECT_W = (WM_APP+1077),  /* (5.00) */
    /* Deprecated -- AIM_ADD_WORKSPACE_PROJECT_A = (WM_APP+1054), */
    AIM_ADD_WORKSPACE_PROJECT_W = (WM_APP+1078),  /* (5.00) */
    /* Deprecated -- AIM_DELETE_WORKSPACE_PROJECT_A = (WM_APP+1055), */
    AIM_DELETE_WORKSPACE_PROJECT_W = (WM_APP+1079),  /* (5.00) */
    /* Deprecated -- AIM_ENUM_WORKSPACE_PROJECTS_A = (WM_APP+1056), */
    AIM_ENUM_WORKSPACE_PROJECTS_W = (WM_APP+1080),  /* (5.00) */
    /* Deprecated -- AIM_SET_PROJECT_BREAKPOINT_A = (WM_APP+1057), */
    AIM_SET_PROJECT_BREAKPOINT_W = (WM_APP+1081),  /* (5.00) */
    /* Deprecated -- AIM_REMOVE_PROJECT_BREAKPOINT_A = (WM_APP+1058), */
    AIM_REMOVE_PROJECT_BREAKPOINT_W = (WM_APP+1082),  /* (5.00) */
    /* Deprecated -- AIM_ENUM_PROJECT_BREAKPOINTS_A = (WM_APP+1059), */
    AIM_ENUM_PROJECT_BREAKPOINTS_W = (WM_APP+1083),  /* (5.00) */
    AIM_GET_PROJECT_MODE_W = (WM_APP+1130),  /* (9.00) */
    AIM_SET_PROJECT_MODE_W = (WM_APP+1131),  /* (9.00) */
    AIM_ADD_PROJECT_MODE_W = (WM_APP+1132),  /* (9.00) */
    AIM_DELETE_PROJECT_MODE_W = (WM_APP+1133),  /* (9.00) */
    AIM_ENUM_PROJECT_MODES_W = (WM_APP+1134),  /* (9.00) */
    /* Document window messages */
    AIM_GET_DOCUMENT_TYPE = (WM_APP+1014),
    /* Deprecated -- AIM_GET_DOCUMENT_INFO_A = (WM_APP+1015), */
    AIM_GET_DOCUMENT_INFO_W = (WM_APP+1084),  /* (5.00) */
    /* Deprecated -- AIM_SET_DOCUMENT_INFO_A = (WM_APP+1016), */
    AIM_SET_DOCUMENT_INFO_W = (WM_APP+1085),  /* (5.00) */
    AIM_CAN_DOCUMENT_UNDO = (WM_APP+1017),
    AIM_DOCUMENT_UNDO = (WM_APP+1018),
    AIM_FORGET_DOCUMENT_UNDO = (WM_APP+1019),
    /* Deprecated -- AIM_SET_BREAKPOINT = (WM_APP+1020), */
    /* Deprecated -- AIM_REMOVE_BREAKPOINTS = (WM_APP+1021), */
    /* Deprecated -- AIM_ENUM_BREAKPOINTS = (WM_APP+1044), */
    /* Source document window messages */
    /* Deprecated -- AIM_GET_SOURCE_TEXT_A = (WM_APP+1022), */
    AIM_GET_SOURCE_TEXT_W = (WM_APP+1086),  /* (5.00) */
    AIM_GET_SOURCE_TEXT_LENGTH = (WM_APP+1023),
    /* Deprecated -- AIM_SET_SOURCE_TEXT_A = (WM_APP+1024), */
    AIM_SET_SOURCE_TEXT_W = (WM_APP+1087),  /* (5.00) */
    /* Deprecated -- AIM_GET_SOURCE_LINE_A = (WM_APP+1025), */
    AIM_GET_SOURCE_LINE_W = (WM_APP+1088),  /* (5.00) */
    AIM_GET_SOURCE_LINE_LENGTH = (WM_APP+1026),
    AIM_SET_SOURCE_LINE_W = (WM_APP+1137),  /* (9.00) */
    AIM_GET_SOURCE_WORD_W = (WM_APP+1095),  /* (6.00) */
    /* Deprecated -- AIM_GET_SOURCE_SELECTION_TEXT_A = (WM_APP+1027), */
    AIM_GET_SOURCE_SELECTION_TEXT_W = (WM_APP+1089),  /* (5.00) */
    /* Deprecated -- AIM_REPLACE_SOURCE_SELECTION_TEXT_A = (WM_APP+1028), */
    AIM_REPLACE_SOURCE_SELECTION_TEXT_W = (WM_APP+1090),  /* (5.00) */
    AIM_GET_SOURCE_SELECTION = (WM_APP+1029),
    AIM_SET_SOURCE_SELECTION = (WM_APP+1030),
    AIM_GET_SOURCE_LINE_COUNT = (WM_APP+1031),
    AIM_SOURCE_LINE_INDEX = (WM_APP+1032),
    AIM_FIRST_VISIBLE_SOURCE_LINE = (WM_APP+1033),
    AIM_SOURCE_LINE_FROM_CHAR = (WM_APP+1034),
    AIM_SOURCE_CHAR_FROM_POS = (WM_APP+1035),
    AIM_SOURCE_POS_FROM_CHAR = (WM_APP+1036),
    AIM_SCROLL_SOURCE_CARET = (WM_APP+1037),
    /* Deprecated -- AIM_FIND_SOURCE_TEXT_A = (WM_APP+1038), */
    AIM_FIND_SOURCE_TEXT_W = (WM_APP+1091),  /* (5.00) */
    AIM_GET_SOURCE_INFO = (WM_APP+1039),
    AIM_SET_SOURCE_INFO = (WM_APP+1040),
    /* Resource document window messages */
    AIM_ENUM_RESOURCES = (WM_APP+1047),  /* (3.00) */
    AIM_FIND_RESOURCE = (WM_APP+1048),  /* (3.00) */
    AIM_ADD_RESOURCE = (WM_APP+1049),  /* (3.00) */
    AIM_DELETE_RESOURCE = (WM_APP+1050),  /* (3.00) */
    AIM_UPDATE_RESOURCE = (WM_APP+1051),  /* (3.00) */
    /* Debugger document window messages */
    AIM_ADD_DEBUG_TAB_PAGE_W = (WM_APP+1107),  /* (8.00) */
    AIM_REMOVE_DEBUG_TAB_PAGE = (WM_APP+1108),  /* (8.00) */
    AIM_SELECT_DEBUG_TAB_PAGE = (WM_APP+1109),  /* (8.00) */
    AIM_GET_DEBUG_PROCESS = (WM_APP+1110),  /* (8.00) */
    AIM_ENUM_DEBUG_THREADS = (WM_APP+1111),  /* (8.00) */
    AIM_ENUM_DEBUG_MODULES_W = (WM_APP+1112),  /* (8.00) */
    AIM_ENUM_DEBUG_FUNCTIONS_W = (WM_APP+1113),  /* (8.00) */
    AIM_ENUM_DEBUG_SOURCE_W = (WM_APP+1114),  /* (8.00) */
    AIM_ENUM_DEBUG_GLOBALS_W = (WM_APP+1115),  /* (8.00) */
    AIM_ENUM_DEBUG_LOCALS_W = (WM_APP+1116),  /* (8.00) */
    AIM_ENUM_DEBUG_BREAKPOINTS_W = (WM_APP+1117),  /* (8.00) */
    AIM_FIND_DEBUG_MODULE_W = (WM_APP+1118),  /* (8.00) */
    AIM_FIND_DEBUG_FUNCTION_W = (WM_APP+1119),  /* (8.00) */
    AIM_FIND_DEBUG_SOURCE_W = (WM_APP+1120),  /* (8.00) */
    AIM_SET_DEBUG_BREAKPOINT = (WM_APP+1121),  /* (8.00) */
    AIM_REMOVE_DEBUG_BREAKPOINT = (WM_APP+1122),  /* (8.00) */
    AIM_READ_DEBUG_REGISTER = (WM_APP+1123),  /* (8.00) */
    AIM_WRITE_DEBUG_REGISTER = (WM_APP+1124),  /* (8.00) */
    AIM_READ_DEBUG_MEMORY = (WM_APP+1125),  /* (8.00) */
    AIM_WRITE_DEBUG_MEMORY = (WM_APP+1126),  /* (8.00) */
    AIM_DISASM_DEBUG_CODE_W = (WM_APP+1127),  /* (8.00) */
    AIM_ADD_DEBUG_EXCEPTION_W = (WM_APP+1135),  /* (9.00) */
    AIM_REMOVE_DEBUG_EXCEPTION = (WM_APP+1136),  /* (9.00) */
    AIM_GET_DEBUG_INFO = (WM_APP+1128),  /* (8.00) */
    AIM_SET_DEBUG_INFO = (WM_APP+1129),  /* (8.00) */
    /* Profiler document window messages */
    AIM_ENUM_PROFILER_FUNCTIONS_W = (WM_APP+1096),  /* (6.50) */
    AIM_ENUM_PROFILER_CALLTREE_W = (WM_APP+1104),  /* (8.00) */
    AIM_GET_PROFILER_INFO = (WM_APP+1105),  /* (8.00) */
    AIM_SET_PROFILER_INFO = (WM_APP+1106),  /* (8.00) */
    /* Web browser document window messages */
    AIM_GET_HTML_TEXT_W = (WM_APP+1097),  /* (7.00) */
    AIM_GET_HTML_TEXT_LENGTH = (WM_APP+1098),  /* (7.00) */
    AIM_GET_HTML_SELECTION_TEXT_W = (WM_APP+1099),  /* (7.00) */
    AIM_FIND_HTML_TEXT_W = (WM_APP+1100),  /* (7.00) */
    AIM_GET_WEB_INFO_W = (WM_APP+1101),  /* (7.00) */
    AIM_SET_WEB_INFO_W = (WM_APP+1102),  /* (7.00) */
    /* Mapping */
#if defined(UNICODE) || defined(_UNICODE)
    AIM_ADD_COMMAND = AIM_ADD_COMMAND_W,
    AIM_OPEN_DOCUMENT = AIM_OPEN_DOCUMENT_W,
    AIM_ADD_TAB_PAGE = AIM_ADD_TAB_PAGE_W,
    AIM_WRITE_OUTPUT = AIM_WRITE_OUTPUT_W,
    AIM_ADD_FILE_TYPE = AIM_ADD_FILE_TYPE_W,
    AIM_FIND_IN_FILES = AIM_FIND_IN_FILES_W,
    AIM_GET_FOLDER = AIM_GET_FOLDER_W,
    AIM_FILE_DIFFERENCE = AIM_FILE_DIFFERENCE_W,
    AIM_GET_PROJECT_TARGET = AIM_GET_PROJECT_TARGET_W,
    AIM_ADD_PROJECT_FILE = AIM_ADD_PROJECT_FILE_W,
    AIM_DELETE_PROJECT_FILE = AIM_DELETE_PROJECT_FILE_W,
    AIM_RENAME_PROJECT_FILE = AIM_RENAME_PROJECT_FILE_W,
    AIM_EXCLUDE_PROJECT_FILE = AIM_EXCLUDE_PROJECT_FILE_W,
    AIM_ENUM_PROJECT_FILES = AIM_ENUM_PROJECT_FILES_W,
    AIM_GET_PROJECT_SYMBOL = AIM_GET_PROJECT_SYMBOL_W,
    AIM_SET_PROJECT_SYMBOL = AIM_SET_PROJECT_SYMBOL_W,
    AIM_GET_PROJECT_SHELLS = AIM_GET_PROJECT_SHELLS_W,
    AIM_SET_PROJECT_SHELLS = AIM_SET_PROJECT_SHELLS_W,
    AIM_GET_ACTIVE_PROJECT = AIM_GET_ACTIVE_PROJECT_W,
    AIM_SET_ACTIVE_PROJECT = AIM_SET_ACTIVE_PROJECT_W,
    AIM_ADD_WORKSPACE_PROJECT = AIM_ADD_WORKSPACE_PROJECT_W,
    AIM_DELETE_WORKSPACE_PROJECT = AIM_DELETE_WORKSPACE_PROJECT_W,
    AIM_ENUM_WORKSPACE_PROJECTS = AIM_ENUM_WORKSPACE_PROJECTS_W,
    AIM_SET_PROJECT_BREAKPOINT = AIM_SET_PROJECT_BREAKPOINT_W,
    AIM_REMOVE_PROJECT_BREAKPOINT = AIM_REMOVE_PROJECT_BREAKPOINT_W,
    AIM_ENUM_PROJECT_BREAKPOINTS = AIM_ENUM_PROJECT_BREAKPOINTS_W,
    AIM_GET_PROJECT_MODE = AIM_GET_PROJECT_MODE_W,
    AIM_SET_PROJECT_MODE = AIM_SET_PROJECT_MODE_W,
    AIM_ADD_PROJECT_MODE = AIM_ADD_PROJECT_MODE_W,
    AIM_DELETE_PROJECT_MODE = AIM_DELETE_PROJECT_MODE_W,
    AIM_ENUM_PROJECT_MODES = AIM_ENUM_PROJECT_MODES_W,
    AIM_GET_DOCUMENT_INFO = AIM_GET_DOCUMENT_INFO_W,
    AIM_SET_DOCUMENT_INFO = AIM_SET_DOCUMENT_INFO_W,
    AIM_GET_SOURCE_TEXT = AIM_GET_SOURCE_TEXT_W,
    AIM_SET_SOURCE_TEXT = AIM_SET_SOURCE_TEXT_W,
    AIM_GET_SOURCE_LINE = AIM_GET_SOURCE_LINE_W,
    AIM_SET_SOURCE_LINE = AIM_SET_SOURCE_LINE_W,
    AIM_GET_SOURCE_WORD = AIM_GET_SOURCE_WORD_W,
    AIM_GET_SOURCE_SELECTION_TEXT = AIM_GET_SOURCE_SELECTION_TEXT_W,
    AIM_REPLACE_SOURCE_SELECTION_TEXT = AIM_REPLACE_SOURCE_SELECTION_TEXT_W,
    AIM_FIND_SOURCE_TEXT = AIM_FIND_SOURCE_TEXT_W,
    AIM_ADD_DEBUG_TAB_PAGE = AIM_ADD_DEBUG_TAB_PAGE_W,
    AIM_ENUM_DEBUG_FUNCTIONS = AIM_ENUM_DEBUG_FUNCTIONS_W,
    AIM_ENUM_DEBUG_SOURCE = AIM_ENUM_DEBUG_SOURCE_W,
    AIM_ENUM_DEBUG_GLOBALS = AIM_ENUM_DEBUG_GLOBALS_W,
    AIM_ENUM_DEBUG_LOCALS = AIM_ENUM_DEBUG_LOCALS_W,
    AIM_ENUM_DEBUG_BREAKPOINTS = AIM_ENUM_DEBUG_BREAKPOINTS_W,
    AIM_FIND_DEBUG_MODULE = AIM_FIND_DEBUG_MODULE_W,
    AIM_FIND_DEBUG_FUNCTION = AIM_FIND_DEBUG_FUNCTION_W,
    AIM_FIND_DEBUG_SOURCE = AIM_FIND_DEBUG_SOURCE_W,
    AIM_DISASM_DEBUG_CODE = AIM_DISASM_DEBUG_CODE_W,
    AIM_ADD_DEBUG_EXCEPTION = AIM_ADD_DEBUG_EXCEPTION_W,
    AIM_ENUM_PROFILER_FUNCTIONS = AIM_ENUM_PROFILER_FUNCTIONS_W,
    AIM_ENUM_PROFILER_CALLTREE = AIM_ENUM_PROFILER_CALLTREE_W,
    AIM_GET_HTML_TEXT = AIM_GET_HTML_TEXT_W,
    AIM_GET_HTML_SELECTION_TEXT = AIM_GET_HTML_SELECTION_TEXT_W,
    AIM_FIND_HTML_TEXT = AIM_FIND_HTML_TEXT_W,
    AIM_GET_WEB_INFO = AIM_GET_WEB_INFO_W,
    AIM_SET_WEB_INFO = AIM_SET_WEB_INFO_W,
#endif /* (UNICODE || _UNICODE) */
};

typedef struct tagADDIN_ADD_COMMAND_W {  /* (5.00) */
    UINT cbSize;                        // Size of this structure (version control).
    int id;                             // Command identifier.
    const WCHAR *pszText;               // Display name.
    HICON hIcon;                        // Display icon.
    int idMenu;                         // Menu id, or AIM_MENU_NOTHING for button (enum ADDIN_MENU_IDENTIFIERS).
} ADDIN_ADD_COMMAND_W, *PADDIN_ADD_COMMAND_W;

typedef struct tagADDIN_DOCUMENT_INFO_W {  /* (5.00) */
    UINT cbSize;                        // Size of this structure (version control).
    int nType;                          // Document type (enum ADDIN_WINDOW_TYPES).
    int nEncoding;                      // Document encoding (enum ADDIN_TEXT_ENCODING).
    BOOL fDirty;                        // Is the document dirty?
    FILETIME ftLastWriteTime;           // When was the document last written?
    WCHAR szFilename[260];              // Document file name (empty string if no name).
} ADDIN_DOCUMENT_INFO_W, *PADDIN_DOCUMENT_INFO_W;

typedef struct tagADDIN_SOURCE_INFO {
    UINT cbSize;                        // Size of the structure (version control).
    BOOL fReadOnly;                     // Is the document read-only?
    BOOL fInsertMode;                   // Is the source editor in insert mode?
    BOOL fCRBreak;                      // <CR> is part of line breaks?
    BOOL fLFBreak;                      // <LF> is part of line breaks?
    BOOL fWhiteSpace;                   // Show white-space (global setting)?
    BOOL fBreaks;                       // Show line breaks (global setting)?
    BOOL fLineNumbers;                  // Show line numbers (global setting)?
    BOOL fFoldings;                     // Show foldings (global setting)? (2.90)
    BOOL fCallTips;                     // Use call tips (global setting)? (2.90)
    BOOL fMemberList;                   // Use member list (global setting)? (2.90)
    BOOL fDragDrop;                     // Use drag-and-drop editing (global setting)? (2.90)
    BOOL fCtrlChars;                    // Accept control characters when typing (global setting)? (2.90)
    BOOL fWrapFindQuery;                // Question before search wrap (global setting)? (2.90)
    BOOL fSpaceTabs;                    // Insert spaces for tabs (global setting)? (3.00)
    int nIndentMode;                    // Indentation type: 0-none, 1-block, 2-smart (global setting). (3.00)
    int cSmartLines;                    // Number of smart indent context lines (global setting). (3.00)
    int nCStyle;                        // C formatting style: 0 or 1 (global setting). (3.00)
    BOOL fMatchingBraces;               // Show matching braces (global setting)? (4.50)
} ADDIN_SOURCE_INFO, *PADDIN_SOURCE_INFO;

typedef struct tagADDIN_RANGE {
    int iStartPos;                      // Starting position.
    int iEndPos;                        // Ending position.
} ADDIN_RANGE, *PADDIN_RANGE;

typedef struct tagADDIN_ENUM_DOCUMENTS {
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(HWND hwndDoc, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_DOCUMENTS, *PADDIN_ENUM_DOCUMENTS;

typedef struct tagADDIN_ENUM_PROJECT_FILES_W {  /* (5.00) */
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const WCHAR *pszFilename, LPVOID pvData);  // Callback function.
    enum _ADDIN_ENUM_PROJECT_FILES_FLAGS {
        EPFF_TARGET_FILES = 0x0001,
        EPFF_DEPENDENT_FILES = 0x0002,
        EPFF_ALL_FILES = EPFF_TARGET_FILES|EPFF_DEPENDENT_FILES
    } fuFlags;                          // Flags.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_PROJECT_FILES_W, *PADDIN_ENUM_PROJECT_FILES_W;

typedef struct tagADDIN_ENUM_WORKSPACE_PROJECTS_W {  /* (5.00) */
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const WCHAR *pszName, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_WORKSPACE_PROJECTS_W, *PADDIN_ENUM_WORKSPACE_PROJECTS_W;

typedef struct tagADDIN_PROJECT_BREAKPOINT_W {  /* (5.00) */
    UINT cbSize;                        // Size of this structure (version control).
    const WCHAR *pszFilename;           // Source file name.
    const WCHAR *pszExpression;         // Break when this expression is true (if != NULL).
    UINT cHitCount;                     // Break when this number of hits (if > 1).
    int nLine;                          // Line number (from 1).
    BOOL fEnabled;                      // Enabled?
} ADDIN_PROJECT_BREAKPOINT_W, *PADDIN_PROJECT_BREAKPOINT_W;

typedef struct tagADDIN_ENUM_PROJECT_BREAKPOINTS_W {  /* (5.00) */
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const ADDIN_PROJECT_BREAKPOINT_W * const pBrkpnt, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_PROJECT_BREAKPOINTS_W, *PADDIN_ENUM_PROJECT_BREAKPOINTS_W;

typedef struct tagADDIN_ENUM_PROJECT_MODES_W {  /* (9.00) */
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const WCHAR *pszName, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_PROJECT_MODES_W, *PADDIN_ENUM_PROJECT_MODES_W;

typedef enum tagADDIN_PARSER_COLORS {
    ADDIN_COLOR_TEXT = 0,               // Normal text.
    ADDIN_COLOR_ATTRIBUTE = 1,          // Attribute.
    ADDIN_COLOR_KEYWORD = 2,            // Keyword.
    ADDIN_COLOR_COMMENT = 3,            // Comment.
    ADDIN_COLOR_NUMBER = 4,             // Number.
    ADDIN_COLOR_STRING = 5,             // String literal.
    ADDIN_COLOR_PREPROCESSOR = 6,       // Preprocessor directive.
    ADDIN_COLOR_FUNCTION = 7,           // Function.
    ADDIN_COLOR_OPERATOR = 8,           // Operator.
} ADDIN_PARSER_COLORS;

typedef struct tagADDIN_PARSE_POINT {
    int iChar;                          // Column position (from zero) where text changes...
    int iColor;                         // ...to this color (enum ADDIN_PARSER_COLORS).
} ADDIN_PARSE_POINT;

typedef struct tagADDIN_ADD_FILE_TYPE_W {  /* (5.00) */
    UINT cbSize;                        // Size of this structure (version control).
    const WCHAR *pszDescription;        // File description.
    const WCHAR *pszExtension;          // File extension (without a dot, like "BAS").
    USHORT (CALLBACK *pfnParser)(USHORT usCookie, const WCHAR *pszText, int cchText, ADDIN_PARSE_POINT aPoints[], PINT pcPoints);  // Source code parser callback, or NULL.
    DWORD reserved;                     // (Reserved).
    const WCHAR *pszShells;             // Build command(s) - "command 1\0command 2\0...command N\0\0" (3.00)
    BOOL (CALLBACK *pfnScanner)(const WCHAR *pszFileName, BOOL (CALLBACK *pfnAddDepFile)(const WCHAR *pszDepFileName, LPCVOID pvCookie), LPCVOID pvCookie);  // File dependency scanner callback, or NULL (8.00).
} ADDIN_ADD_FILE_TYPE_W, *PADDIN_ADD_FILE_TYPE_W;

// Parser helper macros.
#define ADDIN_MAKE_COOKIE(flags,level)  MAKEWORD((flags),(level))
#define ADDIN_GET_COOKIE_LEVEL(cookie)  HIBYTE(cookie)
#define ADDIN_GET_COOKIE_FLAGS(cookie)  LOBYTE(cookie)

// Resource type ordinals.
enum tagADDIN_RSRC_ORDINALS {
    ADDIN_RSRC_CURSOR = 101,            // Bundled cursor; like a cursor file, not a cursor resource.
    ADDIN_RSRC_BITMAP = 2,
    ADDIN_RSRC_ICON = 100,              // Bundled icon; like an icon file, not an icon resource.
    ADDIN_RSRC_MENU = 4,
    ADDIN_RSRC_DIALOG = 5,
    ADDIN_RSRC_STRING = 6,
    ADDIN_RSRC_ACCELERATOR = 9,
    ADDIN_RSRC_RCDATA = 10,
    ADDIN_RSRC_MESSAGETABLE = 11,
    ADDIN_RSRC_VERSION = 16,
    ADDIN_RSRC_PLUGPLAY = 19,           // (obsolete, says Microsoft)
    ADDIN_RSRC_VXD = 20,                // (obsolete, says Microsoft)
    ADDIN_RSRC_ANICURSOR = 21,
    ADDIN_RSRC_ANIICON = 22,
    ADDIN_RSRC_HTML = 23,
    ADDIN_RSRC_MANIFEST = 24,
};

typedef struct tagADDIN_RESOURCE {
    UINT cbSize;                        // Size of this structure (version control).
    const WCHAR *pwchName;              // Name identifier (string or ordinal).
    const WCHAR *pwchType;              // Type identifier (string or ordinal).
    LPCVOID pvData;                     // Raw data.
    DWORD cbData;                       // Size of raw data.
    WORD wLanguageId;                   // Language identifier.
    WORD wReserved;
} ADDIN_RESOURCE, *PADDIN_RESOURCE;

typedef struct tagADDIN_ENUM_RESOURCES {
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const ADDIN_RESOURCE * const pResource, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_RESOURCES, *PADDIN_ENUM_RESOURCES;

typedef struct tagADDIN_FIND_IN_FILES_W {  /* (5.00) */
    UINT cbSize;                        // Size of this structure (version control).
    const WCHAR *pszText;               // Text to search for.
    const WCHAR *pszPath;               // Full path to folder to search in.
    const WCHAR *pszFormat;             // List of extensions to search through ("*.ext1;*.ext2;...").
    BOOL fWholeWord;                    // Match whole word only? (6.00)
    BOOL fMatchCase;                    // Match case?
    BOOL fRecurse;                      // Recurse into subfolders?
} ADDIN_FIND_IN_FILES_W, *PADDIN_FIND_IN_FILES_W;

enum tagADDIN_FOLDER {
    ADDIN_FOLDER_BIN = 1,               // Like: '<path-to-pelles-c>\Bin'.
    ADDIN_FOLDER_ADDINS = 2,            // Like: '<path-to-pelles-c>\Bin\AddIns'.
    ADDIN_FOLDER_HELP = 3,              // Like: '<path-to-pelles-c>\Bin\Help'.
    ADDIN_FOLDER_INTL = 4,              // Like: '<path-to-pelles-c>\Bin\Intl'.
    ADDIN_FOLDER_WIZARDS = 5,           // Like: '<path-to-pelles-c>\Bin\Wizards'.
    ADDIN_FOLDER_LIB = 6,               // Like: '<path-to-pelles-c>\Lib'.
    ADDIN_FOLDER_INCLUDE = 7,           // Like: '<path-to-pelles-c>\Include'.
    ADDIN_FOLDER_THEMES = 8,            // Like: '<path-to-pelles-c>\Bin\Themes'.
};

typedef struct tagADDIN_PROFILER_FUNCTION_LINE {  /* (6.50) */
    DWORD nLineNo;                      // Line number in source file.
    DWORD cHits;                        // Number of hits for this line.
} ADDIN_PROFILER_FUNCTION_LINE, *PADDIN_PROFILER_FUNCTION_LINE;

typedef struct tagADDIN_PROFILER_FUNCTION_W {  /* (6.50) */
    UINT cbSize;                        // Size of this structure (version control).
    const WCHAR *pszFunctionName;       // Function name.
    const WCHAR *pszModuleName;         // Module name.
    const WCHAR *pszSourceName;         // Source name.
    const ADDIN_PROFILER_FUNCTION_LINE * const pLines; // Array of source lines that was hit.
    SIZE_T cLines;                      // Number of entries in pLines[].
    DWORD cFunctionHits;                // Number of hits for the function (all threads).
    DWORD cSessionHits;                 // Number of hits for the entire session.
} ADDIN_PROFILER_FUNCTION_W, *PADDIN_PROFILER_FUNCTION_W;

typedef struct tagADDIN_ENUM_PROFILER_FUNCTIONS_W {  /* (6.50) */
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const ADDIN_PROFILER_FUNCTION_W * const pFunction, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_PROFILER_FUNCTIONS_W, *PADDIN_ENUM_PROFILER_FUNCTIONS_W;

typedef struct tagADDIN_PROFILER_CALLTREE_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    const WCHAR *pszFunctionName;       // Function name.
    const WCHAR *pszModuleName;         // Module name.
    int nIndentLevel;                   // Indentation level (0=root, 1=first level child, ...)
    DWORD cFunctionHits;                // Number of hits for the function (all threads).
    DWORD cSessionHits;                 // Number of hits for the entire session.
} ADDIN_PROFILER_CALLTREE_W, *PADDIN_PROFILER_CALLTREE_W;

typedef struct tagADDIN_ENUM_PROFILER_CALLTREE_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const ADDIN_PROFILER_CALLTREE_W * const pCallTree, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_PROFILER_CALLTREE_W, *PADDIN_ENUM_PROFILER_CALLTREE_W;

enum ADDIN_PROFILER_MODE {  /* (8.00) */
    ADDIN_PROFMODE_SRCLINES = 1,        // Source line mode.
    ADDIN_PROFMODE_CALLTREE = 2,        // Call tree mode.
};

typedef struct tagADDIN_PROFILER_INFO {  /* (8.00) */
    UINT cbSize;                        // Size of the structure (version control).
    int eProfMode;                      // Profiler mode (enum ADDIN_PROFILER_MODE).
    UINT uTimeout;                      // Time to wait between samplings, in msec.
    BOOL fAllModules;                   // Show all modules (ADDIN_PROFMODE_SRCLINES mode)?
} ADDIN_PROFILER_INFO, *PADDIN_PROFILER_INFO;

enum ADDIN_WEB_ENCRYPTION {  /* (7.00) */
    ADDIN_WEB_ENCRYPT_UNKNOWN = 0,
    ADDIN_WEB_ENCRYPT_UNSECURE = 1,
    ADDIN_WEB_ENCRYPT_MIXED = 2,
    ADDIN_WEB_ENCRYPT_SECURE = 3,
};

typedef struct tagADDIN_WEB_INFO_W {  /* (7.00) */
    UINT cbSize;                        // Size of this structure (version control).
    int eEncryption;                    // Encryption level (enum ADDIN_WEB_ENCRYPTION).
    const WCHAR *pszURL;                // Current Uniform Resource Locator.
    BOOL fWelcome;                      // Special Welcome page?
} ADDIN_WEB_INFO_W, *PADDIN_WEB_INFO_W;

typedef struct tagADDIN_FILE_DIFFERENCE_W {  /* (7.00) */
    UINT cbSize;                        // Size of this structure (version control).
    const WCHAR *pszSpecLeft;           // Left file search specification (full path with name and/or wildcards).
    const WCHAR *pszSpecRight;          // Right file search specification (full path with name and/or wildcards).
    BOOL fRecurse;                      // Recurse into subfolders?
} ADDIN_FILE_DIFFERENCE_W, *PADDIN_FILE_DIFFERENCE_W;

// Project types.
typedef enum tagADDIN_PROJECT_TYPE {
    ADDIN_PROJTYPE_WIN32_GUI = 0,
    ADDIN_PROJTYPE_WIN32_DLL = 1,
    ADDIN_PROJTYPE_WIN32_LIBRARY = 2,
    ADDIN_PROJTYPE_WIN32_CONSOLE = 3,
#ifdef _WIN64
    ADDIN_PROJTYPE_WIN64_GUI = 10,
    ADDIN_PROJTYPE_WIN64_DLL = 11,
    ADDIN_PROJTYPE_WIN64_LIBRARY = 12,
    ADDIN_PROJTYPE_WIN64_CONSOLE = 13,
#endif /* _WIN64 */
    /* ADDIN_PROJTYPE_WINCE_POCKET_PC_GUI = 4, */
    /* ADDIN_PROJTYPE_WINCE_POCKET_PC_DLL = 5, */
    /* ADDIN_PROJTYPE_WINCE_POCKET_PC_LIBRARY = 6, */
    /* ADDIN_PROJTYPE_WINCE_SMARTPHONE_GUI = 7, */
    /* ADDIN_PROJTYPE_WINCE_SMARTPHONE_DLL = 8, */
    /* ADDIN_PROJTYPE_WINCE_SMARTPHONE_LIBRARY = 9, */
    ADDIN_PROJTYPE_WIN32_INSTALLER = 50,
    /* ADDIN_PROJTYPE_WINCE_POCKET_PC_INSTALLER = 51, */
    /* ADDIN_PROJTYPE_WINCE_SMARTPHONE_INSTALLER = 52, */
} ADDIN_PROJECT_TYPE;
typedef int *PADDIN_PROJECT_TYPE;

enum ADDIN_MACHINE_TYPE {  /* (8.00) */
    ADDIN_MACHINE_UNKNOWN = 0,
    ADDIN_MACHINE_X86 = 1,
    /* ADDIN_MACHINE_ARM = 2, */
    ADDIN_MACHINE_X64 = 3,
};

typedef struct ADDIN_REAL10 { BYTE b[10]; } ADDIN_REAL10;  /* x87 */

typedef union /*DECLSPEC_ALIGN(16)*/ ADDIN_SIMD128 {  /* __m128, __m128d, __m128i */
    float m128_f32[4];
    double m128_f64[2];
    signed char m128_i8[16];
    signed short m128_i16[8];
    signed int m128_i32[4];
    signed long long m128_i64[2];
    unsigned char m128_u8[16];
    unsigned short m128_u16[8];
    unsigned int m128_u32[4];
    unsigned long long m128_u64[2];
} ADDIN_SIMD128;

typedef union /*DECLSPEC_ALIGN(32)*/ ADDIN_SIMD256 {  /* __m256, __m256d, __m256i */
    float m256_f32[8];
    double m256_f64[4];
    signed char m256_i8[32];
    signed short m256_i16[16];
    signed int m256_i32[8];
    signed long long m256_i64[4];
    unsigned char m256_u8[32];
    unsigned short m256_u16[16];
    unsigned int m256_u32[8];
    unsigned long long m256_u64[4];
} ADDIN_SIMD256;

typedef union /*DECLSPEC_ALIGN(64)*/ ADDIN_SIMD512 {  /* __m512, __m512d, __m512i (10.00) */
    float m512_f32[16];
    double m512_f64[8];
    signed char m512_i8[64];
    signed short m512_i16[32];
    signed int m512_i32[16];
    signed long long m512_i64[8];
    unsigned char m512_u8[64];
    unsigned short m512_u16[32];
    unsigned int m512_u32[16];
    unsigned long long m512_u64[8];
} ADDIN_SIMD512;

typedef union tagADDIN_DEBUG_REGISTER_VALUE {  /* (8.00) */
    BYTE Reg8;
    WORD Reg16;
    DWORD Reg32;
    DWORD64 Reg64;
    ADDIN_REAL10 Reg80;
    ADDIN_SIMD128 Reg128;
    ADDIN_SIMD256 Reg256;
    ADDIN_SIMD512 Reg512;  /* (10.0) */
} ADDIN_DEBUG_REGISTER_VALUE;

enum ADDIN_DEBUG_REGISTER_IDENTIFIERS {  /* (8.00) */
    ADDIN_REG_NONE = 0,
    /* X86 */
    ADDIN_REG_X86_FIRST = 1,
    ADDIN_REG_X86_EAX = 1,  /* u.Reg32 */
    ADDIN_REG_X86_EBX = 2,  /* u.Reg32 */
    ADDIN_REG_X86_ECX = 3,  /* u.Reg32 */
    ADDIN_REG_X86_EDX = 4,  /* u.Reg32 */
    ADDIN_REG_X86_ESP = 5,  /* u.Reg32 */
    ADDIN_REG_X86_EBP = 6,  /* u.Reg32 */
    ADDIN_REG_X86_ESI = 7,  /* u.Reg32 */
    ADDIN_REG_X86_EDI = 8,  /* u.Reg32 */
    ADDIN_REG_X86_EIP = 9,  /* u.Reg32 */
    ADDIN_REG_X86_EFLAGS = 10,  /* u.Reg32 */
    ADDIN_REG_X86_CS = 11,  /* u.Reg16 */
    ADDIN_REG_X86_DS = 12,  /* u.Reg16 */
    ADDIN_REG_X86_ES = 13,  /* u.Reg16 */
    ADDIN_REG_X86_SS = 14,  /* u.Reg16 */
    ADDIN_REG_X86_FS = 15,  /* u.Reg16 */
    ADDIN_REG_X86_GS = 16,  /* u.Reg16 */
    ADDIN_REG_X86_ST0 = 17,  /* u.Reg80 */
    ADDIN_REG_X86_ST1 = 18,  /* u.Reg80 */
    ADDIN_REG_X86_ST2 = 19,  /* u.Reg80 */
    ADDIN_REG_X86_ST3 = 20,  /* u.Reg80 */
    ADDIN_REG_X86_ST4 = 21,  /* u.Reg80 */
    ADDIN_REG_X86_ST5 = 22,  /* u.Reg80 */
    ADDIN_REG_X86_ST6 = 23,  /* u.Reg80 */
    ADDIN_REG_X86_ST7 = 24,  /* u.Reg80 */
    ADDIN_REG_X86_CONTROLWORD = 25,  /* u.Reg16 */
    ADDIN_REG_X86_STATUSWORD = 26,  /* u.Reg16 */
    ADDIN_REG_X86_TAGWORD = 27,  /* u.Reg16 */
    ADDIN_REG_X86_MM0 = 28,  /* u.Reg64 */
    ADDIN_REG_X86_MM1 = 29,  /* u.Reg64 */
    ADDIN_REG_X86_MM2 = 30,  /* u.Reg64 */
    ADDIN_REG_X86_MM3 = 31,  /* u.Reg64 */
    ADDIN_REG_X86_MM4 = 32,  /* u.Reg64 */
    ADDIN_REG_X86_MM5 = 33,  /* u.Reg64 */
    ADDIN_REG_X86_MM6 = 34,  /* u.Reg64 */
    ADDIN_REG_X86_MM7 = 35,  /* u.Reg64 */
    ADDIN_REG_X86_XMM0 = 36,  /* u.Reg128 */
    ADDIN_REG_X86_XMM1 = 37,  /* u.Reg128 */
    ADDIN_REG_X86_XMM2 = 38,  /* u.Reg128 */
    ADDIN_REG_X86_XMM3 = 39,  /* u.Reg128 */
    ADDIN_REG_X86_XMM4 = 40,  /* u.Reg128 */
    ADDIN_REG_X86_XMM5 = 41,  /* u.Reg128 */
    ADDIN_REG_X86_XMM6 = 42,  /* u.Reg128 */
    ADDIN_REG_X86_XMM7 = 43,  /* u.Reg128 */
    ADDIN_REG_X86_MXCSR = 44,  /* u.Reg32 */
    ADDIN_REG_X86_YMM0 = 45,  /* u.Reg256 */
    ADDIN_REG_X86_YMM1 = 46,  /* u.Reg256 */
    ADDIN_REG_X86_YMM2 = 47,  /* u.Reg256 */
    ADDIN_REG_X86_YMM3 = 48,  /* u.Reg256 */
    ADDIN_REG_X86_YMM4 = 49,  /* u.Reg256 */
    ADDIN_REG_X86_YMM5 = 50,  /* u.Reg256 */
    ADDIN_REG_X86_YMM6 = 51,  /* u.Reg256 */
    ADDIN_REG_X86_YMM7 = 52,  /* u.Reg256 */
    ADDIN_REG_X86_LAST = 52,
    /* X64 */
    ADDIN_REG_X64_FIRST = 201,
    ADDIN_REG_X64_RAX = 201,  /* u.Reg64 */
    ADDIN_REG_X64_RBX = 202,  /* u.Reg64 */
    ADDIN_REG_X64_RCX = 203,  /* u.Reg64 */
    ADDIN_REG_X64_RDX = 204,  /* u.Reg64 */
    ADDIN_REG_X64_RSP = 205,  /* u.Reg64 */
    ADDIN_REG_X64_RBP = 206,  /* u.Reg64 */
    ADDIN_REG_X64_RSI = 207,  /* u.Reg64 */
    ADDIN_REG_X64_RDI = 208,  /* u.Reg64 */
    ADDIN_REG_X64_R8 = 209,  /* u.Reg64 */
    ADDIN_REG_X64_R9 = 210,  /* u.Reg64 */
    ADDIN_REG_X64_R10 = 211,  /* u.Reg64 */
    ADDIN_REG_X64_R11 = 212,  /* u.Reg64 */
    ADDIN_REG_X64_R12 = 213,  /* u.Reg64 */
    ADDIN_REG_X64_R13 = 214,  /* u.Reg64 */
    ADDIN_REG_X64_R14 = 215,  /* u.Reg64 */
    ADDIN_REG_X64_R15 = 216,  /* u.Reg64 */
    ADDIN_REG_X64_RIP = 217,  /* u.Reg64 */
    ADDIN_REG_X64_EFLAGS = 218,  /* u.Reg32 */
    ADDIN_REG_X64_CS = 219,  /* u.Reg16 */
    ADDIN_REG_X64_DS = 220,  /* u.Reg16 */
    ADDIN_REG_X64_ES = 221,  /* u.Reg16 */
    ADDIN_REG_X64_SS = 222,  /* u.Reg16 */
    ADDIN_REG_X64_FS = 223,  /* u.Reg16 */
    ADDIN_REG_X64_GS = 224,  /* u.Reg16 */
    ADDIN_REG_X64_ST0 = 225,  /* u.Reg80 */
    ADDIN_REG_X64_ST1 = 226,  /* u.Reg80 */
    ADDIN_REG_X64_ST2 = 227,  /* u.Reg80 */
    ADDIN_REG_X64_ST3 = 228,  /* u.Reg80 */
    ADDIN_REG_X64_ST4 = 229,  /* u.Reg80 */
    ADDIN_REG_X64_ST5 = 230,  /* u.Reg80 */
    ADDIN_REG_X64_ST6 = 231,  /* u.Reg80 */
    ADDIN_REG_X64_ST7 = 232,  /* u.Reg80 */
    ADDIN_REG_X64_CONTROLWORD = 233,  /* u.Reg16 */
    ADDIN_REG_X64_STATUSWORD = 234,  /* u.Reg16 */
    ADDIN_REG_X64_TAGWORD = 235,  /* u.Reg16 */
    ADDIN_REG_X64_MM0 = 236,  /* u.Reg64 */
    ADDIN_REG_X64_MM1 = 237,  /* u.Reg64 */
    ADDIN_REG_X64_MM2 = 238,  /* u.Reg64 */
    ADDIN_REG_X64_MM3 = 239,  /* u.Reg64 */
    ADDIN_REG_X64_MM4 = 240,  /* u.Reg64 */
    ADDIN_REG_X64_MM5 = 241,  /* u.Reg64 */
    ADDIN_REG_X64_MM6 = 242,  /* u.Reg64 */
    ADDIN_REG_X64_MM7 = 243,  /* u.Reg64 */
    ADDIN_REG_X64_XMM0 = 244,  /* u.Reg128 */
    ADDIN_REG_X64_XMM1 = 245,  /* u.Reg128 */
    ADDIN_REG_X64_XMM2 = 246,  /* u.Reg128 */
    ADDIN_REG_X64_XMM3 = 247,  /* u.Reg128 */
    ADDIN_REG_X64_XMM4 = 248,  /* u.Reg128 */
    ADDIN_REG_X64_XMM5 = 249,  /* u.Reg128 */
    ADDIN_REG_X64_XMM6 = 250,  /* u.Reg128 */
    ADDIN_REG_X64_XMM7 = 251,  /* u.Reg128 */
    ADDIN_REG_X64_XMM8 = 252,  /* u.Reg128 */
    ADDIN_REG_X64_XMM9 = 253,  /* u.Reg128 */
    ADDIN_REG_X64_XMM10 = 254,  /* u.Reg128 */
    ADDIN_REG_X64_XMM11 = 255,  /* u.Reg128 */
    ADDIN_REG_X64_XMM12 = 256,  /* u.Reg128 */
    ADDIN_REG_X64_XMM13 = 257,  /* u.Reg128 */
    ADDIN_REG_X64_XMM14 = 258,  /* u.Reg128 */
    ADDIN_REG_X64_XMM15 = 259,  /* u.Reg128 */
    ADDIN_REG_X64_MXCSR = 260,  /* u.Reg32 */
    ADDIN_REG_X64_YMM0 = 261,  /* u.Reg256 */
    ADDIN_REG_X64_YMM1 = 262,  /* u.Reg256 */
    ADDIN_REG_X64_YMM2 = 263,  /* u.Reg256 */
    ADDIN_REG_X64_YMM3 = 264,  /* u.Reg256 */
    ADDIN_REG_X64_YMM4 = 265,  /* u.Reg256 */
    ADDIN_REG_X64_YMM5 = 266,  /* u.Reg256 */
    ADDIN_REG_X64_YMM6 = 267,  /* u.Reg256 */
    ADDIN_REG_X64_YMM7 = 268,  /* u.Reg256 */
    ADDIN_REG_X64_YMM8 = 269,  /* u.Reg256 */
    ADDIN_REG_X64_YMM9 = 270,  /* u.Reg256 */
    ADDIN_REG_X64_YMM10 = 271,  /* u.Reg256 */
    ADDIN_REG_X64_YMM11 = 272,  /* u.Reg256 */
    ADDIN_REG_X64_YMM12 = 273,  /* u.Reg256 */
    ADDIN_REG_X64_YMM13 = 274,  /* u.Reg256 */
    ADDIN_REG_X64_YMM14 = 275,  /* u.Reg256 */
    ADDIN_REG_X64_YMM15 = 276,  /* u.Reg256 */
    ADDIN_REG_X64_XMM16 = 277,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM17 = 278,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM18 = 279,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM19 = 280,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM20 = 281,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM21 = 282,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM22 = 283,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM23 = 284,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM24 = 285,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM25 = 286,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM26 = 287,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM27 = 288,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM28 = 289,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM29 = 290,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM30 = 291,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_XMM31 = 292,  /* u.Reg128 (10.0) */
    ADDIN_REG_X64_YMM16 = 293,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM17 = 294,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM18 = 295,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM19 = 296,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM20 = 297,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM21 = 298,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM22 = 299,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM23 = 300,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM24 = 301,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM25 = 302,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM26 = 303,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM27 = 304,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM28 = 305,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM29 = 306,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM30 = 307,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_YMM31 = 308,  /* u.Reg256 (10.0) */
    ADDIN_REG_X64_K0 = 309,  /* u.Reg64 (10.0) */
    ADDIN_REG_X64_K1 = 310,  /* u.Reg64 (10.0) */
    ADDIN_REG_X64_K2 = 311,  /* u.Reg64 (10.0) */
    ADDIN_REG_X64_K3 = 312,  /* u.Reg64 (10.0) */
    ADDIN_REG_X64_K4 = 313,  /* u.Reg64 (10.0) */
    ADDIN_REG_X64_K5 = 314,  /* u.Reg64 (10.0) */
    ADDIN_REG_X64_K6 = 315,  /* u.Reg64 (10.0) */
    ADDIN_REG_X64_K7 = 316,  /* u.Reg64 (10.0) */
    ADDIN_REG_X64_ZMM0 = 317,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM1 = 318,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM2 = 319,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM3 = 320,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM4 = 321,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM5 = 322,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM6 = 323,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM7 = 324,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM8 = 325,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM9 = 326,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM10 = 327,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM11 = 328,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM12 = 329,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM13 = 330,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM14 = 331,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM15 = 332,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM16 = 333,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM17 = 334,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM18 = 335,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM19 = 336,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM20 = 337,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM21 = 338,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM22 = 339,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM23 = 340,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM24 = 341,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM25 = 342,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM26 = 343,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM27 = 344,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM28 = 345,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM29 = 346,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM30 = 347,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_ZMM31 = 348,  /* u.Reg512 (10.0) */
    ADDIN_REG_X64_LAST = 348,
};

enum ADDIN_DEBUG_SYMBOL_KIND {  /* (8.00) */
    /* Symbol type */
    ADDIN_SYMKIND_VOID     = 0x00000000,  /* void */
    ADDIN_SYMKIND_INT      = 0x00000001,  /* signed integer */
    ADDIN_SYMKIND_UINT     = 0x00000002,  /* unsigned integer */
    ADDIN_SYMKIND_REAL     = 0x00000003,  /* floating-point */
    /* Deprecated -- ADDIN_SYMKIND_COMPLEX  = 0x00000004, */
    ADDIN_SYMKIND_ENUM     = 0x00000005,  /* member of enumeration */
    ADDIN_SYMKIND_BITFIELD = 0x00000006,  /* bitfield */
    ADDIN_SYMKIND_STRUCT   = 0x00000007,  /* structure */
    ADDIN_SYMKIND_UNION    = 0x00000008,  /* union */
    ADDIN_SYMKIND_TYPEMASK = 0x000000FF,  /* TYPE MASK */
    /* Symbol type size */
    ADDIN_SYMKIND_1BYTE    = 0x00000100,  /* 1 byte */
    ADDIN_SYMKIND_2BYTES   = 0x00000200,  /* 2 bytes */
    ADDIN_SYMKIND_4BYTES   = 0x00000400,  /* 4 bytes */
    ADDIN_SYMKIND_8BYTES   = 0x00000800,  /* 8 bytes */
    ADDIN_SYMKIND_16BYTES  = 0x00001000,  /* 16 bytes */
    ADDIN_SYMKIND_32BYTES  = 0x00002000,  /* 32 bytes */
    ADDIN_SYMKIND_64BYTES  = 0x00004000,  /* 64 bytes */
    ADDIN_SYMKIND_SIZEMASK = 0x0000FF00,  /* SIZE MASK */
    /* Symbol type modifiers */
    ADDIN_SYMKIND_ARRAY    = 0x01000000,  /* is array */
    ADDIN_SYMKIND_POINTER  = 0x02000000,  /* is pointer */
    ADDIN_SYMKIND_REGISTER = 0x04000000,  /* in register */
    ADDIN_SYMKIND_TLS      = 0x08000000,  /* in thread-local storage */
};

#define ADDIN_SYMBOL_TYPE(kind)  (((kind) & ADDIN_SYMKIND_TYPEMASK))
#define ADDIN_SYMBOL_SIZE(kind)  (((kind) & ADDIN_SYMKIND_SIZEMASK) >> 8)

#define ADDIN_SYMBOL_IS_ARRAY(kind)     (((kind) & ADDIN_SYMKIND_ARRAY) != 0)
#define ADDIN_SYMBOL_IS_POINTER(kind)   (((kind) & ADDIN_SYMKIND_POINTER) != 0)
#define ADDIN_SYMBOL_IN_REGISTER(kind)  (((kind) & ADDIN_SYMKIND_REGISTER) != 0)
#define ADDIN_SYMBOL_IN_TLS(kind)       (((kind) & ADDIN_SYMKIND_TLS) != 0)

enum ADDIN_DEBUG_TYPE {  /* (8.00) */
    ADDIN_DBGTYPE_NOTHING = 0,          // No debug info.
    /*ADDIN_DBGTYPE_CV_NB11 = 1,*/
    /*ADDIN_DBGTYPE_CV_PO32 = 2,*/
    /*ADDIN_DBGTYPE_CV_PO64 = 3,*/
    ADDIN_DBGTYPE_COFF = 4,             // COFF.
    ADDIN_DBGTYPE_EXPORTS = 5,          // Exports.
    ADDIN_DBGTYPE_PO10 = 6,             // Pelles C Debug Info v1.0 (9.00).
    ADDIN_DBGTYPE_PO11 = 7,             // Pelles C Debug Info v1.1 (10.00).
};

typedef struct tagADDIN_ADDR_RANGE {  /* (8.00) */
    LPCVOID pvStartAddress;             // Starting address.
    LPCVOID pvEndAddress;               // Ending address.
} ADDIN_ADDR_RANGE, *PADDIN_ADDR_RANGE;

typedef struct tagADDIN_DEBUG_PROCESS {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwProcessId;                  // Process id.
    HANDLE hProcess;                    // Process handle.
    int eMachine;                       // Process machine type (enum ADDIN_MACHINE_TYPE).
} ADDIN_DEBUG_PROCESS, *PADDIN_DEBUG_PROCESS;

typedef struct tagADDIN_DEBUG_THREAD {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwThreadId;                   // Thread id.
    HANDLE hThread;                     // Thread handle.
    LPVOID pvThreadLocalBase;           // Thread Environment Block pointer.
    BOOL fSuspended;                    // Is the thread suspended by the user?
} ADDIN_DEBUG_THREAD, *PADDIN_DEBUG_THREAD;

typedef struct tagADDIN_DEBUG_MODULE_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwModuleId;                   // Module id.
    ADDIN_ADDR_RANGE RangeImage;        // Module address range.
    ADDIN_ADDR_RANGE RangeCode;         // Module code address range.
    LPCVOID pvEntryPoint;               // Module entry-point.
    const WCHAR *pszDispName;           // Module display name.
    const WCHAR *pszFileName;           // Module file name (can be NULL).
    DWORD dwTimeStamp;                  // Module timestamp (UTC).
    DWORD dwTlsIndex;                   // Thread Local Storage index, or (DWORD)-1.
    int eDebugType;                     // Debug info type (enum ADDIN_DEBUG_TYPE).
} ADDIN_DEBUG_MODULE_W, *PADDIN_DEBUG_MODULE_W;

typedef struct tagADDIN_DEBUG_FUNCTION_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwFunctionId;                 // Function id.
    ADDIN_ADDR_RANGE RangeFunc;         // Function address range.
    ADDIN_ADDR_RANGE RangeBody;         // Function body address range.
    const WCHAR *pszName;               // Function name.
    LPCVOID pvReserved;
} ADDIN_DEBUG_FUNCTION_W, *PADDIN_DEBUG_FUNCTION_W;

typedef struct tagADDIN_DEBUG_SYMBOL_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    UINT fuKind;                        // Symbol kind (bitmask from ADDIN_DEBUG_SYMBOL_KIND).
    const WCHAR *pszName;               // Symbol name.
    LPCVOID pvAddress;                  // Global address, or NULL.
    int eRegister;                      // Register id (enum ADDIN_DEBUG_REGISTER_IDENTIFIERS).
    DWORD dwOffsetValue;                // Offset or value.
    DWORD cbTotalSize;                  // Total size, in bytes.
} ADDIN_DEBUG_SYMBOL_W, *PADDIN_DEBUG_SYMBOL_W;

typedef struct tagADDIN_DEBUG_SOURCE_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    UINT uLine;                         // Source line.
    const WCHAR *pszFileName;           // Source file name.
    LPCVOID pvAddress;                  // Code address.
} ADDIN_DEBUG_SOURCE_W, *PADDIN_DEBUG_SOURCE_W;

typedef struct tagADDIN_DEBUG_BREAKPOINT_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD Opcode;                       // Original opcode (a BYTE for ADDIN_MACHINE_X86/ADDIN_MACHINE_X64).
    LPCVOID pvAddress;                  // Code address.
    const ADDIN_PROJECT_BREAKPOINT_W *pBrkpnt; // Extended breakpoint info, or NULL.
    UINT cHitCount;                     // Current number of hits, if pBrkpnt is non-NULL; break when equals pBrkpnt->cHitCount.
    BOOL fSticky;                       // Is the breakpoint sticky?
} ADDIN_DEBUG_BREAKPOINT_W, *PADDIN_DEBUG_BREAKPOINT_W;

typedef struct tagADDIN_ENUM_DEBUG_THREADS {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const ADDIN_DEBUG_THREAD * const pThread, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_DEBUG_THREADS, *PADDIN_ENUM_DEBUG_THREADS;

typedef struct tagADDIN_ENUM_DEBUG_MODULES_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const ADDIN_DEBUG_MODULE_W * const pModule, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_DEBUG_MODULES_W, *PADDIN_ENUM_DEBUG_MODULES_W;

typedef struct tagADDIN_ENUM_DEBUG_FUNCTIONS_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwModuleId;                   // Module id.
    BOOL (CALLBACK *pfnCallback)(const ADDIN_DEBUG_FUNCTION_W * const pFunction, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
    enum _ADDIN_ENUM_DEBUG_FUNCTIONS_FLAGS {
        EDFF_SORT_BY_ADDRESS = 0x0000,
        EDFF_SORT_BY_NAME = 0x0001,
    } fuFlags;                          // Flags.
} ADDIN_ENUM_DEBUG_FUNCTIONS_W, *PADDIN_ENUM_DEBUG_FUNCTIONS_W;

typedef struct tagADDIN_ENUM_DEBUG_SOURCE_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwModuleId;                   // Module id.
    BOOL (CALLBACK *pfnCallback)(const ADDIN_DEBUG_SOURCE_W * const pSource, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_DEBUG_SOURCE_W, *PADDIN_ENUM_DEBUG_SOURCE_W;

typedef struct tagADDIN_ENUM_DEBUG_GLOBALS_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwModuleId;                   // Module id.
    BOOL (CALLBACK *pfnCallback)(const ADDIN_DEBUG_SYMBOL_W * const pSymbol, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_DEBUG_GLOBALS_W, *PADDIN_ENUM_DEBUG_GLOBALS_W;

typedef struct tagADDIN_ENUM_DEBUG_LOCALS_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwFunctionId;                 // Function id.
    BOOL (CALLBACK *pfnCallback)(const ADDIN_DEBUG_SYMBOL_W * const pSymbol, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_DEBUG_LOCALS_W, *PADDIN_ENUM_DEBUG_LOCALS_W;

typedef struct tagADDIN_ENUM_DEBUG_BREAKPOINTS_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    BOOL (CALLBACK *pfnCallback)(const ADDIN_DEBUG_BREAKPOINT_W * const pBreakpoint, LPVOID pvData);  // Callback function.
    LPVOID pvData;                      // User data for callback.
} ADDIN_ENUM_DEBUG_BREAKPOINTS_W, *PADDIN_ENUM_DEBUG_BREAKPOINTS_W;

typedef struct tagADDIN_READ_DEBUG_REGISTER {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwThreadId;                   // Thread id.
    int eRegister;                      // Register id (enum ADDIN_DEBUG_REGISTER_IDENTIFIERS).
    ADDIN_DEBUG_REGISTER_VALUE u;       // Register value.
} ADDIN_READ_DEBUG_REGISTER, *PADDIN_READ_DEBUG_REGISTER;

typedef struct tagADDIN_WRITE_DEBUG_REGISTER {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    DWORD dwThreadId;                   // Thread id.
    int eRegister;                      // Register id (enum ADDIN_DEBUG_REGISTER_IDENTIFIERS).
    ADDIN_DEBUG_REGISTER_VALUE u;       // Register value.
} ADDIN_WRITE_DEBUG_REGISTER, *PADDIN_WRITE_DEBUG_REGISTER;

typedef struct tagADDIN_READ_DEBUG_MEMORY {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    LPCVOID pvAddress;                  // Address to read from.
    LPVOID pvData;                      // Pointer to buffer.
    DWORD cbData;                       // Length of buffer, and number of bytes to read.
} ADDIN_READ_DEBUG_MEMORY, *PADDIN_READ_DEBUG_MEMORY;

typedef struct tagADDIN_WRITE_DEBUG_MEMORY {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    LPVOID pvAddress;                   // Address to write to.
    LPCVOID pvData;                     // Pointer to data to write.
    DWORD cbData;                       // Length of data to write, in bytes.
} ADDIN_WRITE_DEBUG_MEMORY, *PADDIN_WRITE_DEBUG_MEMORY;

typedef struct tagADDIN_DISASM_DEBUG_CODE_W {  /* (8.00) */
    UINT cbSize;                        // Size of this structure (version control).
    LPCVOID pvCode;                     // Pointer to instruction data.
    DWORD cbCode;                       // Size of instruction data.
    LPCVOID pvAddress;                  // Address of instruction.
    WCHAR *pchOpcode;                   // Pointer to buffer for opcode (can be NULL).
    int cchMaxOpcode;                   // Length of buffer for opcode (ignored if pchOpcode is NULL).
    WCHAR *pchOperands;                 // Pointer to buffer for operands (can be NULL).
    int cchMaxOperands;                 // Length of buffer for operands (ignored if pchOperands is NULL).
    BOOL fSymbols;                      // Attempt to display symbols in operands.
} ADDIN_DISASM_DEBUG_CODE_W, *PADDIN_DISASM_DEBUG_CODE_W;

typedef struct tagADDIN_DEBUG_INFO {  /* (8.00) */
    UINT cbSize;                        // Size of the structure (version control).
    UINT cMaxArrayElems;                // Maximum array elements to display.
    BOOL fHexValues;                    // Display values in hexadecimal notation?
    BOOL fReserved;                     // (Reserved).
    BOOL fFlagsDialog;                  // Edit CPU flags through a dialog?
    BOOL fBreakOnEntry;                 // Always break on entry-point?
} ADDIN_DEBUG_INFO, *PADDIN_DEBUG_INFO;

typedef struct tagADDIN_DEBUG_EXCEPTION_W {  /* (9.00) */
    UINT cbSize;                        // Size of this structure (version control).
    const WCHAR *pszDescription;        // Exception description.
    DWORD dwExceptionCode;              // Exception code.
    BOOL fStopAlways;                   // Always break on this exception?
} ADDIN_DEBUG_EXCEPTION_W, *PADDIN_DEBUG_EXCEPTION_W;

#pragma pack(pop)

/****** Message API ********************************************************/

#define AddIn_SendIDECommand(hwnd,id)  (void)SNDMSG((hwnd),WM_COMMAND,MAKEWPARAM((UINT)(id),0),0)
#define AddIn_AddCommandW(hwnd,pAddCmd)  (BOOL)SNDMSG((hwnd),AIM_ADD_COMMAND_W,0,(LPARAM)(PADDIN_ADD_COMMAND_W)(pAddCmd))
#define AddIn_RemoveCommand(hwnd,id)  (BOOL)SNDMSG((hwnd),AIM_REMOVE_COMMAND,(WPARAM)(id),0)
#define AddIn_GetActiveDocument(hwnd)  (HWND)SNDMSG((hwnd),AIM_GET_ACTIVE_DOCUMENT,0,0)
#define AddIn_NewDocument(hwnd,nType)  (HWND)SNDMSG((hwnd),AIM_NEW_DOCUMENT,(WPARAM)(nType),0)
#define AddIn_OpenDocumentW(hwnd,nType,pszFile)  (HWND)SNDMSG((hwnd),AIM_OPEN_DOCUMENT_W,(WPARAM)(nType),(LPARAM)(const WCHAR *)(pszFile))
#define AddIn_CloseDocument(hwnd)  (void)SNDMSG((hwnd),WM_CLOSE,0,0)
#define AddIn_EnumDocuments(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_DOCUMENTS,0,(LPARAM)(PADDIN_ENUM_DOCUMENTS)(pEnum))
#define AddIn_AddTabPageW(hwnd,pszTitle,hwndPage)  (BOOL)SNDMSG((hwnd),AIM_ADD_TAB_PAGE_W,(WPARAM)(const WCHAR *)(pszTitle),(LPARAM)(HWND)(hwndPage))
#define AddIn_RemoveTabPage(hwnd,hwndPage)  (BOOL)SNDMSG((hwnd),AIM_REMOVE_TAB_PAGE,0,(LPARAM)(HWND)(hwndPage))
#define AddIn_SelectTabPage(hwnd,hwndPage)  (BOOL)SNDMSG((hwnd),AIM_SELECT_TAB_PAGE,0,(LPARAM)(hwndPage))
#define AddIn_ClearOutput(hwnd)  (BOOL)SNDMSG((hwnd),AIM_WRITE_OUTPUT,0,0)
#define AddIn_WriteOutputW(hwnd,pszText)  (BOOL)SNDMSG((hwnd),AIM_WRITE_OUTPUT_W,0,(LPARAM)(const WCHAR *)(pszText))
#define AddIn_AddFileTypeW(hwnd,pAddFile)  (BOOL)SNDMSG((hwnd),AIM_ADD_FILE_TYPE_W,0,(LPARAM)(PADDIN_ADD_FILE_TYPE_W)(pAddFile))
#define AddIn_FindInFilesW(hwnd,pFind)  (BOOL)SNDMSG((hwnd),AIM_FIND_IN_FILES_W,0,(LPARAM)(PADDIN_FIND_IN_FILES_W)(pFind))
#define AddIn_GetIDEFolderW(hwnd,eFolder,pch,cchMax)  ((*((int *)(pch))=(cchMax)), ((int)SNDMSG((hwnd),AIM_GET_FOLDER_W,(WPARAM)(eFolder),(LPARAM)(WCHAR *)(pch))))
#define AddIn_FileDifferenceW(hwnd,pFileDiff)  (BOOL)SNDMSG((hwnd),AIM_FILE_DIFFERENCE_W,0,(LPARAM)(PADDIN_FILE_DIFFERENCE_W)(pFileDiff))
/**/
#define AddIn_AddCommandW(hwnd,pAddCmd)  (BOOL)SNDMSG((hwnd),AIM_ADD_COMMAND_W,0,(LPARAM)(PADDIN_ADD_COMMAND_W)(pAddCmd))
#define AddIn_RemoveCommand(hwnd,id)  (BOOL)SNDMSG((hwnd),AIM_REMOVE_COMMAND,(WPARAM)(id),0)
#define AddIn_GetProjectType(hwnd,pType)  (int)SNDMSG((hwnd),AIM_GET_PROJECT_TYPE,0,(LPARAM)(PADDIN_PROJECT_TYPE)(pType))
#define AddIn_GetProjectTargetW(hwnd,pch,cchMax)  (int)SNDMSG((hwnd),AIM_GET_PROJECT_TARGET_W,(WPARAM)(int)(cchMax),(LPARAM)(WCHAR *)(pch))
#define AddIn_AddProjectFileW(hwnd,pszFile)  (BOOL)SNDMSG((hwnd),AIM_ADD_PROJECT_FILE_W,0,(LPARAM)(const WCHAR *)(pszFile))
#define AddIn_DeleteProjectFileW(hwnd,pszFile)  (BOOL)SNDMSG((hwnd),AIM_DELETE_PROJECT_FILE_W,0,(LPARAM)(const WCHAR *)(pszFile))
#define AddIn_RenameProjectFileW(hwnd,pszOldFile,pszNewFile)  (BOOL)SNDMSG((hwnd),AIM_RENAME_PROJECT_FILE_W,(WPARAM)(const WCHAR *)(pszOldFile),(LPARAM)(const WCHAR *)(pszNewFile))
#define AddIn_ExcludeProjectFileW(hwnd,pszFile)  (BOOL)SNDMSG((hwnd),AIM_EXCLUDE_PROJECT_FILE_W,(WPARAM)(1),(LPARAM)(const WCHAR *)(pszFile))
#define AddIn_IncludeProjectFileW(hwnd,pszFile)  (BOOL)SNDMSG((hwnd),AIM_EXCLUDE_PROJECT_FILE_W,(WPARAM)(0),(LPARAM)(const WCHAR *)(pszFile))
#define AddIn_GetProjectSymbolW(hwnd,pszName,pch,cchMax)  ((*((int *)(pch))=(cchMax)), ((int)SNDMSG((hwnd),AIM_GET_PROJECT_SYMBOL_W,(WPARAM)(const WCHAR *)(pszName),(LPARAM)(WCHAR *)(pch))))
#define AddIn_SetProjectSymbolW(hwnd,pszName,psz)  (BOOL)SNDMSG((hwnd),AIM_SET_PROJECT_SYMBOL_W,(WPARAM)(const WCHAR *)(pszName),(LPARAM)(const WCHAR *)(psz))
#define AddIn_GetProjectShellsW(hwnd,pszFile,pch,cchMax)  ((*((int *)(pch))=(cchMax)), ((int)SNDMSG((hwnd),AIM_GET_PROJECT_SHELLS_W,(WPARAM)(const WCHAR *)(pszFile),(LPARAM)(WCHAR *)(pch))))
#define AddIn_SetProjectShellsW(hwnd,pszFile,psz)  (BOOL)SNDMSG((hwnd),AIM_SET_PROJECT_SHELLS_W,(WPARAM)(const WCHAR *)(pszFile),(LPARAM)(const WCHAR *)(psz))
#define AddIn_EnumProjectFilesW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_PROJECT_FILES_W,0,(LPARAM)(PADDIN_ENUM_PROJECT_FILES_W)(pEnum))
#define AddIn_DidProjectBuildFail(hwnd)  (BOOL)SNDMSG((hwnd),AIM_DID_PROJECT_BUILD_FAIL,0,0)
#define AddIn_GetActiveProjectW(hwnd,pch,cchMax)  (int)SNDMSG((hwnd),AIM_GET_ACTIVE_PROJECT_W,(WPARAM)(int)(cchMax),(LPARAM)(WCHAR *)(pch))
#define AddIn_SetActiveProjectW(hwnd,pszName)  (BOOL)SNDMSG((hwnd),AIM_SET_ACTIVE_PROJECT_W,0,(LPARAM)(const WCHAR *)(pszName))
#define AddIn_AddWorkspaceProjectW(hwnd,pszFile)  (BOOL)SNDMSG((hwnd),AIM_ADD_WORKSPACE_PROJECT_W,0,(LPARAM)(const WCHAR *)(pszFile))
#define AddIn_DeleteWorkspaceProjectW(hwnd,pszName)  (BOOL)SNDMSG((hwnd),AIM_DELETE_WORKSPACE_PROJECT_W,0,(LPARAM)(const WCHAR *)(pszName))
#define AddIn_EnumWorkspaceProjectsW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_WORKSPACE_PROJECTS_W,0,(LPARAM)(PADDIN_ENUM_WORKSPACE_PROJECTS_W)(pEnum))
#define AddIn_SetProjectBreakpointW(hwnd,pBrkpnt)  (BOOL)SNDMSG((hwnd),AIM_SET_PROJECT_BREAKPOINT_W,0,(LPARAM)(PADDIN_PROJECT_BREAKPOINT_W)(pBrkpnt))
#define AddIn_RemoveProjectBreakpointW(hwnd,pBrkpnt)  (BOOL)SNDMSG((hwnd),AIM_REMOVE_PROJECT_BREAKPOINT_W,0,(LPARAM)(PADDIN_PROJECT_BREAKPOINT_W)(pBrkpnt))
#define AddIn_EnumProjectBreakpointsW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_PROJECT_BREAKPOINTS_W,0,(LPARAM)(PADDIN_ENUM_PROJECT_BREAKPOINTS_W)(pEnum))
#define AddIn_GetProjectModeW(hwnd,pch,cchMax)  (int)SNDMSG((hwnd),AIM_GET_PROJECT_MODE_W,(WPARAM)(int)(cchMax),(LPARAM)(WCHAR *)(pch))
#define AddIn_SetProjectModeW(hwnd,pszName)  (BOOL)SNDMSG((hwnd),AIM_SET_PROJECT_MODE_W,0,(LPARAM)(const WCHAR *)(pszName))
#define AddIn_AddProjectModeW(hwnd,pszName)  (BOOL)SNDMSG((hwnd),AIM_ADD_PROJECT_MODE_W,0,(LPARAM)(const WCHAR *)(pszName))
#define AddIn_DeleteProjectModeW(hwnd,pszName)  (BOOL)SNDMSG((hwnd),AIM_DELETE_PROJECT_MODE_W,0,(LPARAM)(const WCHAR *)(pszName))
#define AddIn_EnumProjectModesW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_PROJECT_MODES_W,0,(LPARAM)(PADDIN_ENUM_PROJECT_MODES_W)(pEnum))
/**/
#define AddIn_GetDocumentType(hwnd)  (int)SNDMSG((hwnd),AIM_GET_DOCUMENT_TYPE,0,0)
#define AddIn_GetDocumentInfoW(hwnd,pDocInfo)  (BOOL)SNDMSG((hwnd),AIM_GET_DOCUMENT_INFO_W,0,(LPARAM)(PADDIN_DOCUMENT_INFO_W)(pDocInfo))
#define AddIn_SetDocumentInfoW(hwnd,pDocInfo)  (BOOL)SNDMSG((hwnd),AIM_SET_DOCUMENT_INFO_W,0,(LPARAM)(PADDIN_DOCUMENT_INFO_W)(pDocInfo))
#define AddIn_CanDocumentUndo(hwnd)  (BOOL)SNDMSG((hwnd),AIM_CAN_DOCUMENT_UNDO,0,0)
#define AddIn_DocumentUndo(hwnd)  (void)SNDMSG((hwnd),AIM_DOCUMENT_UNDO,0,0)
#define AddIn_ForgetDocumentUndo(hwnd)  (void)SNDMSG((hwnd),AIM_FORGET_DOCUMENT_UNDO,0,0)
/**/
#define AddIn_GetSourceTextW(hwnd,pch,cchMax)  (int)SNDMSG((hwnd),AIM_GET_SOURCE_TEXT_W,(WPARAM)(int)(cchMax),(LPARAM)(WCHAR *)(pch))
#define AddIn_GetSourceTextLength(hwnd)  (int)SNDMSG((hwnd),AIM_GET_SOURCE_TEXT_LENGTH,0,0)
#define AddIn_SetSourceTextW(hwnd,psz)  (BOOL)SNDMSG((hwnd),AIM_SET_SOURCE_TEXT_W,0,(LPARAM)(const WCHAR *)(psz))
#define AddIn_GetSourceLineW(hwnd,line,pch,cchMax)  ((*((int *)(pch))=(cchMax)), ((int)SNDMSG((hwnd),AIM_GET_SOURCE_LINE_W,(WPARAM)(int)(line),(LPARAM)(WCHAR *)(pch))))
#define AddIn_GetSourceLineLength(hwnd,line)  (int)SNDMSG((hwnd),AIM_GET_SOURCE_LINE_LENGTH,(WPARAM)(int)(line),0)
#define AddIn_SetSourceLineW(hwnd,line,psz)  (BOOL)SNDMSG((hwnd),AIM_SET_SOURCE_LINE_W,(WPARAM)(int)(line),(LPARAM)(const WCHAR *)(psz))
#define AddIn_GetSourceWordW(hwnd,pch,cchMax)  (int)SNDMSG((hwnd),AIM_GET_SOURCE_WORD_W,(WPARAM)(int)(cchMax),(LPARAM)(WCHAR *)(pch))
#define AddIn_GetSourceSelTextW(hwnd,pch,cchMax)  (int)SNDMSG((hwnd),AIM_GET_SOURCE_SELECTION_TEXT_W,(WPARAM)(int)(cchMax),(LPARAM)(WCHAR *)(pch))
#define AddIn_ReplaceSourceSelTextW(hwnd,psz)  (void)SNDMSG((hwnd),AIM_REPLACE_SOURCE_SELECTION_TEXT_W,0,(LPARAM)(const WCHAR *)(psz))
#define AddIn_GetSourceSel(hwnd,pRange)  (BOOL)SNDMSG((hwnd),AIM_GET_SOURCE_SELECTION,0,(LPARAM)(PADDIN_RANGE)(pRange))
#define AddIn_SetSourceSel(hwnd,pRange)  (BOOL)SNDMSG((hwnd),AIM_SET_SOURCE_SELECTION,0,(LPARAM)(PADDIN_RANGE)(pRange))
#define AddIn_GetSourceLineCount(hwnd)  (int)SNDMSG((hwnd),AIM_GET_SOURCE_LINE_COUNT,0,0)
#define AddIn_SourceLineIndex(hwnd,line)  (int)SNDMSG((hwnd),AIM_SOURCE_LINE_INDEX,(WPARAM)(int)(line),0)
#define AddIn_FirstVisibleSourceLine(hwnd)  (int)SNDMSG((hwnd),AIM_FIRST_VISIBLE_SOURCE_LINE,0,0)
#define AddIn_SourceLineFromChar(hwnd,ich)  (int)SNDMSG((hwnd),AIM_SOURCE_LINE_FROM_CHAR,(WPARAM)(int)(ich),0)
#define AddIn_SourceCharFromPos(hwnd,ppt)  (int)SNDMSG((hwnd),AIM_SOURCE_CHAR_FROM_POS,0,(LPARAM)(POINT*)(ppt))
#define AddIn_SourcePosFromChar(hwnd,ich,ppt)  (void)SNDMSG((hwnd),AIM_SOURCE_POS_FROM_CHAR,(WPARAM)(int)(ich),(LPARAM)(POINT*)(ppt))
#define AddIn_ScrollSourceCaret(hwnd)  (void)SNDMSG((hwnd),AIM_SCROLL_SOURCE_CARET,0,0)
#define AddIn_FindSourceTextW(hwnd,fuFlags,pszText)  (int)SNDMSG((hwnd),AIM_FIND_SOURCE_TEXT_W,(WPARAM)(UINT)(fuFlags),(LPARAM)(const WCHAR *)(pszText))
#define AddIn_GetSourceInfo(hwnd,pSrcInfo)  (BOOL)SNDMSG((hwnd),AIM_GET_SOURCE_INFO,0,(LPARAM)(PADDIN_SOURCE_INFO)(pSrcInfo))
#define AddIn_SetSourceInfo(hwnd,pSrcInfo)  (BOOL)SNDMSG((hwnd),AIM_SET_SOURCE_INFO,0,(LPARAM)(PADDIN_SOURCE_INFO)(pSrcInfo))
/**/
#define AddIn_EnumResources(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_RESOURCES,0,(LPARAM)(PADDIN_ENUM_RESOURCES)(pEnum))
#define AddIn_FindResource(hwnd,pResource)  (BOOL)SNDMSG((hwnd),AIM_FIND_RESOURCE,0,(LPARAM)(PADDIN_RESOURCE)(pResource))
#define AddIn_AddResource(hwnd,pResource)  (BOOL)SNDMSG((hwnd),AIM_ADD_RESOURCE,0,(LPARAM)(PADDIN_RESOURCE)(pResource))
#define AddIn_DeleteResource(hwnd,pResource)  (BOOL)SNDMSG((hwnd),AIM_DELETE_RESOURCE,0,(LPARAM)(PADDIN_RESOURCE)(pResource))
#define AddIn_UpdateResource(hwnd,pResource)  (BOOL)SNDMSG((hwnd),AIM_UPDATE_RESOURCE,0,(LPARAM)(PADDIN_RESOURCE)(pResource))
/**/
#define AddIn_AddDebugTabPageW(hwnd,pszTitle,hwndPage)  (BOOL)SNDMSG((hwnd),AIM_ADD_DEBUG_TAB_PAGE_W,(WPARAM)(const WCHAR *)(pszTitle),(LPARAM)(HWND)(hwndPage))
#define AddIn_RemoveDebugTabPage(hwnd,hwndPage)  (BOOL)SNDMSG((hwnd),AIM_REMOVE_DEBUG_TAB_PAGE,0,(LPARAM)(HWND)(hwndPage))
#define AddIn_SelectDebugTabPage(hwnd,hwndPage)  (BOOL)SNDMSG((hwnd),AIM_SELECT_DEBUG_TAB_PAGE,0,(LPARAM)(hwndPage))
#define AddIn_GetDebugProcess(hwnd,pProcess)  (BOOL)SNDMSG((hwnd),AIM_GET_DEBUG_PROCESS,0,(LPARAM)(PADDIN_DEBUG_PROCESS)(pProcess))
#define AddIn_EnumDebugThreads(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_DEBUG_THREADS,0,(LPARAM)(PADDIN_ENUM_DEBUG_THREADS)(pEnum))
#define AddIn_EnumDebugModulesW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_DEBUG_MODULES_W,0,(LPARAM)(PADDIN_ENUM_DEBUG_MODULES_W)(pEnum))
#define AddIn_EnumDebugFunctionsW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_DEBUG_FUNCTIONS_W,0,(LPARAM)(PADDIN_ENUM_DEBUG_FUNCTIONS_W)(pEnum))
#define AddIn_EnumDebugSourceW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_DEBUG_SOURCE_W,0,(LPARAM)(PADDIN_ENUM_DEBUG_SOURCE_W)(pEnum))
#define AddIn_EnumDebugGlobalsW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_DEBUG_GLOBALS_W,0,(LPARAM)(PADDIN_ENUM_DEBUG_GLOBALS_W)(pEnum))
#define AddIn_EnumDebugLocalsW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_DEBUG_LOCALS_W,0,(LPARAM)(PADDIN_ENUM_DEBUG_LOCALS_W)(pEnum))
#define AddIn_EnumDebugBreakpointsW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_DEBUG_BREAKPOINTS_W,0,(LPARAM)(PADDIN_ENUM_DEBUG_BREAKPOINTS_W)(pEnum))
#define AddIn_FindDebugModuleW(hwnd,pModule)  (BOOL)SNDMSG((hwnd),AIM_FIND_DEBUG_MODULE_W,0,(LPARAM)(PADDIN_DEBUG_MODULE_W)(pModule))
#define AddIn_FindDebugFunctionW(hwnd,pFunction)  (BOOL)SNDMSG((hwnd),AIM_FIND_DEBUG_FUNCTION_W,0,(LPARAM)(PADDIN_DEBUG_FUNCTION_W)(pFunction))
#define AddIn_FindDebugSourceW(hwnd,pSource)  (BOOL)SNDMSG((hwnd),AIM_FIND_DEBUG_SOURCE_W,0,(LPARAM)(PADDIN_DEBUG_SOURCE_W)(pSource))
#define AddIn_SetDebugBreakpoint(hwnd,pvAddr,fSticky)  (BOOL)SNDMSG((hwnd),AIM_SET_DEBUG_BREAKPOINT,(WPARAM)(BOOL)(fSticky),(LPARAM)(PVOID)(pvAddr))
#define AddIn_RemoveDebugBreakpoint(hwnd,pvAddr)  (BOOL)SNDMSG((hwnd),AIM_REMOVE_DEBUG_BREAKPOINT,0,(LPARAM)(PVOID)(pvAddr))
#define AddIn_ReadDebugRegister(hwnd,pRead)  (BOOL)SNDMSG((hwnd),AIM_READ_DEBUG_REGISTER,0,(LPARAM)(PADDIN_READ_DEBUG_REGISTER)(pRead))
#define AddIn_WriteDebugRegister(hwnd,pWrite)  (BOOL)SNDMSG((hwnd),AIM_WRITE_DEBUG_REGISTER,0,(LPARAM)(PADDIN_WRITE_DEBUG_REGISTER)(pWrite))
#define AddIn_ReadDebugMemory(hwnd,pRead)  (BOOL)SNDMSG((hwnd),AIM_READ_DEBUG_MEMORY,0,(LPARAM)(PADDIN_READ_DEBUG_MEMORY)(pRead))
#define AddIn_WriteDebugMemory(hwnd,pWrite)  (BOOL)SNDMSG((hwnd),AIM_WRITE_DEBUG_MEMORY,0,(LPARAM)(PADDIN_WRITE_DEBUG_MEMORY)(pWrite))
#define AddIn_DisasmDebugCodeW(hwnd,pDisasm)  (int)SNDMSG((hwnd),AIM_DISASM_DEBUG_CODE_W,0,(LPARAM)(PADDIN_DISASM_DEBUG_CODE_W)(pDisasm))
#define AddIn_AddDebugExceptionW(hwnd,pExcpt)  (BOOL)SNDMSG((hwnd),AIM_ADD_DEBUG_EXCEPTION_W,0,(LPARAM)(PADDIN_DEBUG_EXCEPTION_W)(pExcpt))
#define AddIn_RemoveDebugException(hwnd,dwCode)  (BOOL)SNDMSG((hwnd),AIM_REMOVE_DEBUG_EXCEPTION,(WPARAM)(DWORD)(dwCode),0)
#define AddIn_GetDebugInfo(hwnd,pDbgInfo)  (BOOL)SNDMSG((hwnd),AIM_GET_DEBUG_INFO,0,(LPARAM)(PADDIN_DEBUG_INFO)(pDbgInfo))
#define AddIn_SetDebugInfo(hwnd,pDbgInfo)  (BOOL)SNDMSG((hwnd),AIM_SET_DEBUG_INFO,0,(LPARAM)(PADDIN_DEBUG_INFO)(pDbgInfo))
/**/
#define AddIn_EnumProfilerFunctionsW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_PROFILER_FUNCTIONS_W,0,(LPARAM)(PADDIN_ENUM_PROFILER_FUNCTIONS_W)(pEnum))
#define AddIn_EnumProfilerCallTreeW(hwnd,pEnum)  (BOOL)SNDMSG((hwnd),AIM_ENUM_PROFILER_CALLTREE_W,0,(LPARAM)(PADDIN_ENUM_PROFILER_CALLTREE_W)(pEnum))
#define AddIn_GetProfilerInfo(hwnd,pProfInfo)  (BOOL)SNDMSG((hwnd),AIM_GET_PROFILER_INFO,0,(LPARAM)(PADDIN_PROFILER_INFO)(pProfInfo))
#define AddIn_SetProfilerInfo(hwnd,pProfInfo)  (BOOL)SNDMSG((hwnd),AIM_SET_PROFILER_INFO,0,(LPARAM)(PADDIN_PROFILER_INFO)(pProfInfo))
/**/
#define AddIn_GetHtmlTextW(hwnd,pch,cchMax)  (int)SNDMSG((hwnd),AIM_GET_HTML_TEXT_W,(WPARAM)(int)(cchMax),(LPARAM)(WCHAR *)(pch))
#define AddIn_GetHtmlTextLength(hwnd)  (int)SNDMSG((hwnd),AIM_GET_HTML_TEXT_LENGTH,0,0)
#define AddIn_GetHtmlSelTextW(hwnd,pch,cchMax)  (int)SNDMSG((hwnd),AIM_GET_HTML_SELECTION_TEXT_W,(WPARAM)(int)(cchMax),(LPARAM)(WCHAR *)(pch))
#define AddIn_FindHtmlTextW(hwnd,fuFlags,pcszText)  (BOOL)SNDMSG((hwnd),AIM_FIND_HTML_TEXT_W,(WPARAM)(UINT)(fuFlags),(LPARAM)(const WCHAR *)(pcszText))
#define AddIn_GetWebInfoW(hwnd,pWebInfo)  (BOOL)SNDMSG((hwnd),AIM_GET_WEB_INFO_W,0,(LPARAM)(PADDIN_WEB_INFO_W)(pWebInfo))
#define AddIn_SetWebInfoW(hwnd,pWebInfo)  (BOOL)SNDMSG((hwnd),AIM_SET_WEB_INFO_W,0,(LPARAM)(PADDIN_WEB_INFO_W)(pWebInfo))

#if defined(UNICODE) || defined(_UNICODE)
typedef ADDIN_ADD_COMMAND_W ADDIN_ADD_COMMAND;
typedef ADDIN_DOCUMENT_INFO_W ADDIN_DOCUMENT_INFO;
typedef ADDIN_ENUM_PROJECT_FILES_W ADDIN_ENUM_PROJECT_FILES;
typedef ADDIN_ENUM_WORKSPACE_PROJECTS_W ADDIN_ENUM_WORKSPACE_PROJECTS;
typedef ADDIN_PROJECT_BREAKPOINT_W ADDIN_PROJECT_BREAKPOINT;
typedef ADDIN_ENUM_PROJECT_BREAKPOINTS_W ADDIN_ENUM_PROJECT_BREAKPOINTS;
typedef ADDIN_ENUM_PROJECT_MODES_W ADDIN_ENUM_PROJECT_MODES;
typedef ADDIN_ADD_FILE_TYPE_W ADDIN_ADD_FILE_TYPE;
typedef ADDIN_FIND_IN_FILES_W ADDIN_FIND_IN_FILES;
typedef ADDIN_PROFILER_FUNCTION_W ADDIN_PROFILER_FUNCTION;
typedef ADDIN_PROFILER_CALLTREE_W ADDIN_PROFILER_CALLTREE;
typedef ADDIN_ENUM_PROFILER_FUNCTIONS_W ADDIN_ENUM_PROFILER_FUNCTIONS;
typedef ADDIN_ENUM_PROFILER_CALLTREE_W ADDIN_ENUM_PROFILER_CALLTREE;
typedef ADDIN_WEB_INFO_W ADDIN_WEB_INFO;
typedef ADDIN_FILE_DIFFERENCE_W ADDIN_FILE_DIFFERENCE;
typedef ADDIN_DEBUG_MODULE_W ADDIN_DEBUG_MODULE;
typedef ADDIN_DEBUG_FUNCTION_W ADDIN_DEBUG_FUNCTION;
typedef ADDIN_DEBUG_SYMBOL_W ADDIN_DEBUG_SYMBOL;
typedef ADDIN_DEBUG_SOURCE_W ADDIN_DEBUG_SOURCE;
typedef ADDIN_DEBUG_BREAKPOINT_W ADDIN_DEBUG_BREAKPOINT;
typedef ADDIN_ENUM_DEBUG_MODULES_W ADDIN_ENUM_DEBUG_MODULES;
typedef ADDIN_ENUM_DEBUG_FUNCTIONS_W ADDIN_ENUM_DEBUG_FUNCTIONS;
typedef ADDIN_ENUM_DEBUG_SOURCE_W ADDIN_ENUM_DEBUG_SOURCE;
typedef ADDIN_ENUM_DEBUG_GLOBALS_W ADDIN_ENUM_DEBUG_GLOBALS;
typedef ADDIN_ENUM_DEBUG_LOCALS_W ADDIN_ENUM_DEBUG_LOCALS;
typedef ADDIN_ENUM_DEBUG_BREAKPOINTS_W ADDIN_ENUM_DEBUG_BREAKPOINTS;
typedef ADDIN_DISASM_DEBUG_CODE_W  ADDIN_DISASM_DEBUG_CODE;
typedef ADDIN_DEBUG_EXCEPTION_W  ADDIN_DEBUG_EXCEPTION;
#define AddIn_AddCommand  AddIn_AddCommandW
#define AddIn_OpenDocument  AddIn_OpenDocumentW
#define AddIn_AddTabPage  AddIn_AddTabPageW
#define AddIn_WriteOutput  AddIn_WriteOutputW
#define AddIn_AddFileType  AddIn_AddFileTypeW
#define AddIn_FileDifference AddIn_FileDifferenceW
#define AddIn_GetProjectTarget  AddIn_GetProjectTargetW
#define AddIn_AddProjectFile  AddIn_AddProjectFileW
#define AddIn_DeleteProjectFile  AddIn_DeleteProjectFileW
#define AddIn_RenameProjectFile  AddIn_RenameProjectFileW
#define AddIn_ExcludeProjectFile  AddIn_ExcludeProjectFileW
#define AddIn_IncludeProjectFile  AddIn_IncludeProjectFileW
#define AddIn_GetProjectSymbol  AddIn_GetProjectSymbolW
#define AddIn_SetProjectSymbol  AddIn_SetProjectSymbolW
#define AddIn_GetProjectShells  AddIn_GetProjectShellsW
#define AddIn_SetProjectShells  AddIn_SetProjectShellsW
#define AddIn_EnumProjectFiles  AddIn_EnumProjectFilesW
#define AddIn_GetActiveProject  AddIn_GetActiveProjectW
#define AddIn_SetActiveProject  AddIn_SetActiveProjectW
#define AddIn_AddWorkspaceProject  AddIn_AddWorkspaceProjectW
#define AddIn_DeleteWorkspaceProject  AddIn_DeleteWorkspaceProjectW
#define AddIn_EnumWorkspaceProjects  AddIn_EnumWorkspaceProjectsW
#define AddIn_SetProjectBreakpoint  AddIn_SetProjectBreakpointW
#define AddIn_RemoveProjectBreakpoint  AddIn_RemoveProjectBreakpointW
#define AddIn_EnumProjectBreakpoints  AddIn_EnumProjectBreakpointsW
#define AddIn_GetProjectMode  AddIn_GetProjectModeW
#define AddIn_SetProjectMode  AddIn_SetProjectModeW
#define AddIn_AddProjectMode  AddIn_AddProjectModeW
#define AddIn_DeleteProjectMode  AddIn_DeleteProjectModeW
#define AddIn_EnumProjectModes  AddIn_EnumProjectModesW
#define AddIn_GetDocumentInfo  AddIn_GetDocumentInfoW
#define AddIn_SetDocumentInfo  AddIn_SetDocumentInfoW
#define AddIn_GetSourceText  AddIn_GetSourceTextW
#define AddIn_SetSourceText  AddIn_SetSourceTextW
#define AddIn_GetSourceLine  AddIn_GetSourceLineW
#define AddIn_SetSourceLine  AddIn_SetSourceLineW
#define AddIn_GetSourceWord  AddIn_GetSourceWordW
#define AddIn_GetSourceSelText  AddIn_GetSourceSelTextW
#define AddIn_ReplaceSourceSelText  AddIn_ReplaceSourceSelTextW
#define AddIn_FindSourceText  AddIn_FindSourceTextW
#define AddIn_FindInFiles  AddIn_FindInFilesW
#define AddIn_GetIDEFolder  AddIn_GetIDEFolderW
#define AddIn_AddDebugTabPage  AddIn_AddDebugTabPageW
#define AddIn_EnumDebugModules  AddIn_EnumDebugModulesW
#define AddIn_EnumDebugFunctions  AddIn_EnumDebugFunctionsW
#define AddIn_EnumDebugSource  AddIn_EnumDebugSourceW
#define AddIn_EnumDebugGlobals  AddIn_EnumDebugGlobalsW
#define AddIn_EnumDebugLocals  AddIn_EnumDebugLocalsW
#define AddIn_EnumDebugBreakpoints  AddIn_EnumDebugBreakpointsW
#define AddIn_FindDebugModule  AddIn_FindDebugModuleW
#define AddIn_FindDebugFunction  AddIn_FindDebugFunctionW
#define AddIn_FindDebugSource  AddIn_FindDebugSourceW
#define AddIn_DisasmDebugCode  AddIn_DisasmDebugCodeW
#define AddIn_AddDebugException   AddIn_AddDebugExceptionW
#define AddIn_EnumProfilerFunctions AddIn_EnumProfilerFunctionsW
#define AddIn_EnumProfilerCallTree AddIn_EnumProfilerCallTreeW
#define AddIn_GetHtmlText AddIn_GetHtmlTextW
#define AddIn_GetHtmlSelText AddIn_GetHtmlSelTextW
#define AddIn_FindHtmlText AddIn_FindHtmlTextW
#define AddIn_GetWebInfo AddIn_GetWebInfoW
#define AddIn_SetWebInfo AddIn_SetWebInfoW
#endif /* (UNICODE || _UNICODE) */

/****** Function prototypes ************************************************/

ADDINAPI BOOL WINAPI AddInMain(HWND hwnd, ADDIN_EVENT eEvent);  /* required export */
ADDINAPI void WINAPI AddInSetup(HWND hwnd, LPCVOID pcvData);  /* optional (2.90) */
#if defined(UNICODE) || defined(_UNICODE)
ADDINAPI void WINAPI AddInCommandExW(int idCmd, LPCVOID pcvData);  /* optional (2.90) */
ADDINAPI BOOL WINAPI AddInHelpW(HWND hwnd, ADDIN_HELPEVENT eEvent, LPCVOID pcvData);  /* optional (4.00) */
#define AddInCommandEx  AddInCommandExW
#define AddInHelp  AddInHelpW
#endif /* (UNICODE || _UNICODE) */

/****** Inline helper functions ********************************************/

static inline BOOL IsResourceOrdinalW(PCWSTR pwch) { return (pwch[0] == (WCHAR)-1); }
static inline int GetResourceOrdinalW(PCWSTR pwch) { return (pwch[0] == (WCHAR)-1) ? pwch[1] : -1; }
#define MakeResourceOrdinalW(ord)  (WCHAR [2]){ [0] = (WCHAR)-1, [1] = (ord) }

#endif /* _ADDIN_H */
