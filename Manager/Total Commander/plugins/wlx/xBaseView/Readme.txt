xBaseView - Universal Database Viewer (and Editor)

View and edit files:
   1. FoxPro (*.DBF),
   2. dBase (*.DBF),
   3. Clipper (*.DBF),
   4. Visual FoxPro (*.DBC),
   5. Paradox (*.DB),
   6. Access (*.MDB),
   7. MySQL (*.MYD),
   8. Interbase (*.GDB),
   9. Firebird (*.FDB),
  10. Excel (*.XLS),
  11. CSV Text (*.CSV),
  12. TAB Text (*.TAB),
  13. Microsoft & Borland XML (*.XML),
  14. Borland Client DataSet (*.CDS),
  15. Borland DB Engine Aliases (*.BDE),
  16. ADO Universal Data Link (*.UDL),
  17. ODBC Data Source Name (*.DSN).
      Total: 15 file types.

Main features:
* 12 file extensions: .dbf (VFP/FoxPro/dBase/Clipper), .dbc (Visual FoxPro), .db (Paradox), .mdb (Access), .myd (MySQL), .gdb (Interbase), .fdb (Firebird), .xls (Excel), .csv (Text), .tab (Text), .xml (Microsoft & Borland XML), .cds (Borland Client DataSet).
* 3 additional: .udl (ADO Universal Data Link), .dsn (ODBC Data Source Name), .bde (Borland DB Engine Aliases).
* 5 DB technologies: ADO, ODBC, Borland Engine, MySQLDAC, xBase DBF Engine. MySQLDAC is Direct Access Components for MySQL by microOLAP Technologies LLC. Tested on Oracle, DB2, SQL Server, Teradata.
* 4 methods for data searching-filtering, including incremental and quick index search.
* 7 formats for export data: dbf, xls, csv, tab, xml(Microsoft & Borland XML), html.
* 6 formats for import data: dbf, csv, tab, xml(Microsoft & Borland XML), html.
* xBase Engine automatically opens all types of index (cdx, idx, mdx, ndx, ntx) and memo (fpt, dbt) files and correctly processes their; recognizes code pages and national symbols in DBF; supports differents collates for VFP/FoxPro and autoincremental field VFP8.
* You can ñreate/modify indexes and structures of DBF/DB files and reindex, pack or zap them.
* Also you can execute SQL-Select and SQL-DDL operators for any database.

Many thanks for translation to:
- Ukrainian:  Serhiy Dubyk <dubyk@library.lviv.ua> (http://www.wincmd.ru/plugring/ukr_expanded.html)
- German:     Dieter W. Rehfeld <dieter.rehfeld@web.de>  (http://www.totalcmd.net/plugring/Extended_German_Menu.html)
- Italian:    diamanti <diamanti@email.it> (http://midiquiz.altervista.org/indexEn.htm)
- Dutch:      Erwin Veermans <NwDsk@veder.com>  (http://www.veder.com/nwdsk/)
- Polish:     Bogdan Wozniak <bwo@vp.pl>
- Greek:      Dimitrios Valsamis <dvalsami@ebox.gr>
- French:     Franck Gartemann <FGartemann@aol.com>
- Spanish:    Luis Mejia <luismejia@gmail.com>

Service Files
  xBaseView.dbf, xBaseView.cdx, xBaseView.fpt - history files,
  xBaseView.ini or Total's LsPlugin.ini - initialization file.
  xBaseView.ext - this file containing extensions, which are ignored and are not included in the tree.
  You may specify directory for these files (except LsPlugin.ini) with 3 ways:
    1) via environment variable %xBaseViewdir%,
    2) in file xBaseView.dir from Plugin Directory,
    3) via system registry HKCU\SOFTWARE\Mutex\xBaseView\xBaseViewdir.
  Everywhere you may use Windows Environment Variable format.
  If Service Directory is not specifed, Service Files are stored in the Plugin Directory and:
    4) if Section [xBaseView] and Parameter "Language" exists in the file LsPlugin.ini, this file will be used,
    5) otherwise the file xBaseView.ini will be used as INI-file,
    6) if the Service Directory is ReadOnly, Windows Temp directory will be used.

Language Files
  They have the prefix of name "xBase" and extension ".LNG". Their directory may be the plugin directory or the service files directory.


Some keys:
  1) F10        - context menu,
     F4         - cyclic move of focus,
  2) Enter      - expanding current node in the tree
     Backspace  - collapsing current node in the tree
     Ctrl+Back  - up one level in the tree
     Ctrl+R     - tree refresh - reread disk
  3) Ctrl+Alt+0 - incremental search in string column
  4) Ctrl+A     - select MEMO text,
     Ctrl+Y     - clear MEMO text,
     Ctrl+J     - template Select, Insert, Update, Delete operators,
  5) Shift+Del  - silent delete grid row without confirm.

Drivers download (October 16, 2004)
  1) Microsoft ADO.
      Microsoft Data Access Components (MDAC) version 2.8 (5,427 kilobytes)
      http://www.microsoft.com/downloads/details.aspx?FamilyID=6c050fe3-c795-4b7d-b037-185d0506396c&DisplayLang=en
  2) Interbase v.6 and above
      IBPhoenix Open Source ODBC Driver for Interbase - Windows Full Install (.exe) (596 kilobytes)
      http://www.ibphoenix.com/main.nfs?a=ibphoenix&page=ibp_60_odbc
  3) BDE for Paradox, dBase, Interbase and Access 97:
      BDE 5.2 MSI Merge Module English Enterprise version   (9,676 kilobytes)
      http://info.borland.com/devsupport/bde/bdeupdate.html

Known issues for DBF
- Format of General field are not compatible with VFP-format.
- VFP-index for field with NULL values are not supported.
- Index for type Integer, DateTime, Currency are not compatible with VFP.
- Formats of Memo, OLE, Binary fields are not compatible with Visual dBase.
- MDX-index for any types are not compatible with Visual dBase.
- Memo-file is not compressed.
- VFP-type Currency are emulated with Double type.

Description of parameters from section [xBaseView] in file plugin.ini or from file file xBaseView.ini
  Language=          - current language name
  HideTree=0         - show (1 - hide) files and folders in the tree view
  HideCaption=0      - show (1 - hide) captions of navigation buttons
  HideHint=0         - show (1 - hide) hints of buttons and menu
  ReadOnly=0         - mode "Read Only"
  Exclusive=1        - mode "Exclusive Open"
  MultiSelect=0      - mode "Multi Row Select"

  NoMaximize=1       - default window size at startup
  NoWindowsXPStyle=0 - navigation buttons without XP style (0 - with XP style)
  SelectDirectory=0  - select directory via Borland (0) or Windows (1) dialogue
  MessageBox=0       - message "Successful completion" on status bar (0) or message box (1)
  SingleClick=0      - open database table by double click (1 - by single click)
  ConfirmDelete=1    - with confirm on deleting table record (0 - without confirm)

  DbfExt2=~~~        - additional extension for DBF file
  GridColSize=30     - column width for big (> 128) character fields
  Delimiter=,        - field delimiter for CSV file
  NoHeader=0         - 1st line XLS/CSV/TAB file not contains field names
  SchemaIni=0        - if 1 - take CSV/TAB files parameters from SCHEMA.INI
  RecordCount=0      - suppress record-count for SQL server databases

  Parameters for DBMS Interbase/Firebird:
    IbLogin=SYSDBA
    IbPassw=masterkey
    IbLoginPrompt=0
    IbCharSet=win1251 èëè win1252
    IbRole=
    IbVersion=0
    IbExeName=       - name of executive file of DBMS Server

  Parameters for DBMS MySQL:
    MySqlHost=127.0.0.1
    MySqlPort=3306
    MySqlUser=
    MySqlPassw=
    MySqlLoginPrompt=0
    MySqlFoundRows=0
    MySqlNoSchema=0
    MySqlCompress=0
    MySqlODBC=0
    MySqlIgnoreSpaces=0
    MySqlExeName=    - name of executive file of DBMS Server

Requirements
- Total Commander 5.51 or later.
- For all databases, except DBF, DB, BDE, Borland XML and CDS, firstly are requires Microsoft ADO.
- For Paradox DB is requires BDE or Microsoft Jet 4.0.
- For Access and Excel is requires Microsoft Jet 4.0.
- For Interbase version < 6 is requires BDE; v. >= 6 - IBPhoenix Interbase ODBC Driver.
- For Visual FoxPro DBC container is required MS VFP OLE Provider or MS VFP ODBC Driver.
- For SOL operators on DBF is required MS VFP OLE Provider or MS VFP ODBC Driver.
- For SOL operators on Paradox DB is requires BDE or Microsoft Jet 4.0.
- For SOL operators, except DBF, Paradox DB and BDE, is requires Microsoft ADO.

Installation
- Choose "Configuration" -> "Options".
- Choose the "Edit/View".
- Click "Configure internal viewer...".
- Click [LS-Plugins] button.
- Click [Add] button and select the xBaseView.wlx.
- Or add these two lines to the [ListerPlugins] section of the wincmd.ini file:
    k=<path to plugin>\xBaseView.wlx
    k_detect="EXT="DBF"|EXT="DBC"|EXT="DB" |EXT="MDB"|EXT="MYD"|EXT="GDB"|EXT="FDB"|
              EXT="XLS"|EXT="CSV"|EXT="TAB"|EXT="XML"|EXT="CDS"|EXT="BDE"|EXT="UDL"|EXT="DSN""
  and correct the number and path.

Thanks
Many thanks to
  Alexey<sdhw@postman.ru>,
  StayAtHome<stayathome@nm.ru>,
  Poiutur<dimon@ldz.lv>,
  Superman<Mike_G@ufamts.ru>,
  Li<Lgogi@mail.ru>,
  Serge<egres@fromru.com>
for beta-testing, consultation and advices.

Please, send bugs and comments to the author:
  mutex@nm.ru
  E.Savich

Copyright © 2004 Mutex Ltd.
