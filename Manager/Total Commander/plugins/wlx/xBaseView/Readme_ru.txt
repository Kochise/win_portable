xBaseView - ������������� �������� ��������� (� ������) ��� ������

�������� � ������ ������:
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
      �����: 15 ����� ������.

����� ����������������
* 12 �������� ����������: .dbf (VFP/FoxPro/dBase/Clipper), .dbc (Visual FoxPro), .db (Paradox), .mdb (Access), .myd (MySQL), .gdb (Interbase), .fdb (Firebird), .xls (Excel), .csv (Text), .tab (Text), .xml (Microsoft & Borland XML), .cds (Borland Client DataSet).
* 3 ��������������: .udl (ADO Universal Data Link), .dsn (ODBC Data Source Name), .bde (Borland DB Engine Aliases).
* 5 ���������� �������: ADO, ODBC, Borland Engine, MySQLDAC, xBase DBF Engine. MySQLDAC ��� Direct Access Components for MySQL, ��������� microOLAP Technologies LLC. �������� ��� Oracle, DB2, SQL Server, Teradata.
* 4 ������� ������-���������� ������, � �.�. ��������� � ������� ��������� �����.
* 7 �������� �������� ������: dbf, xls, csv, tab, xml(Microsoft & Borland XML), html.
* 6 �������� ������� ������: dbf, csv, tab, xml(Microsoft & Borland XML), html.
* xBase Engine ������������� ��������� � ��������� ������������ ��� ���� ��������� (cdx, idx, mdx, ndx, ntx) � ���� (fpt, dbt) ������, ���������� ������� �������� � ������������ �������; ��� VFP � FoxPro ������������ ������ ������� ���������� � ���������������� ���� VFP8.
* ����� ���������/�������� ������� � ��������� DBF � DB ������; �����������������, ��������� � ������� ��
* ����� ��������� SQL ������� � SQL-DDL ��������� ��� ����� ���� ������.

������� ������� ������������ ��������� ����� � ���� ��������� ��������� � ���:
- ����������:  Serhiy Dubyk   <dubyk@library.lviv.ua> (http://www.wincmd.ru/plugring/ukr_expanded.html)
- ��������:    Dieter W. Rehfeld <dieter.rehfeld@web.de>  (http://www.totalcmd.net/plugring/Extended_German_Menu.html)
- �����������: diamanti <diamanti@email.it> (http://midiquiz.altervista.org/indexEn.htm)
- �����������: Erwin Veermans <NwDsk@veder.com>  (http://www.veder.com/nwdsk/)
- ��������:    Bogdan Wozniak <bwo@vp.pl>
- ���������:   Dimitrios Valsamis <dvalsami@ebox.gr>
- �����������: Franck Gartemann <FGartemann@aol.com>
- ���������:   Luis Mejia <luismejia@gmail.com>

��������� �����
  xBaseView.dbf, xBaseView.cdx, xBaseView.fpt - ����� ������� ������������� ���������,
  xBaseView.ini ��� ����������� LsPlugin.ini - ���� ����������.
  xBaseView.ext - ����, ���������� ����������, ������� ������������ � �� ���������� � ������.
  ������� ��� ���� ������ (����� LsPlugin.ini) ����� ��������:
    1) � ���������� ����� � ������ xBaseViewdir,
    2) � ����� xBaseView.dir �� �������� �������,
    3) � �������� HKCU\SOFTWARE\Mutex\xBaseView\xBaseViewdir.
  � ����������� ��������� ����� ������������ ������ ���������� ����� Windows.
  ���� ������� �� �����, ��������� ����� ������������� � �������� ������� �:
    4) ����� ����������� ���� LsPlugin.ini, ���� ��� ���� ������ [xBaseView] � �������� "Language",
    5) � ��������� ������ INI-������ ����� ���� xBaseView.ini,
    6) ���� ��������� ������� �������� ReadOnly, ����� ����������� Temp-������� Windows.

�������� �����
  ����� ������� ����� "xBase", ���������� ".LNG" � ����� ���������� � �������� ������� ��� ��������� ������.

��������� �������:
  1) F10        - ����������� ����,
     F4         - ����������� �������� ������,
  2) Enter      - ���������� ������� ���� ������ �����
     Backspace  - �������� ������� ���� ������ �����
     Ctrl+Back  - ��������� �� ������� ����� �� ������
     Ctrl+R     - �������� ������ - ���������� ����
  3) Ctrl+Alt+0 - ��������� ����� � ��������� �������
  4) Ctrl+A     - ��������� MEMO,
     Ctrl+Y     - ������� MEMO,
     Ctrl+J     - ������� Select, Insert, Update, Delete ���������� SQL,
  5) Shift+Del  - ���������� ������� ������ ����� ��� �������������.

��������� ������
- ���� ������ ���� ������ ����������� ������� ������� ��� ��������� [����� ����], Enter ��� ������.
- ������ ����� ������������� �������� ������ ��� MDB � UDL ����������, ��� DSN ���������� - ���.
- ��� ��������� ���������� ����� ����� ��� ������ (������� �������� � ���� ����� "����� ������"), ����������� ������� Ctrl � ������� ������ � ����� ������� ������ �����.
- ��� �������� ���������� ���������� ����� ����� ���������� ����� �� ��������.
- ��� ���������� �� ���������� �������� ����� ��� ������, ����������� ������� Ctrl � ������� ������ �� ���������� ������ �������. ��� DBF, DB, BDE, Borland XML � CDS - ��� �������� ����������.
- ���� ��� ����� ��� �� ������ DBF �����, �������� ������ ���� NEW.DBF; � ��� Paradox - NEW.DB.
- � ��������� �������� ������� ������ �� ��������� ����������� ������ ������� �� �������� ������.
- ��������� ���� �������, ������ � ������� ���������� ������� ����� ��������� � INI �����, ������� ��������� �������� ��� ������ ������� � �������� ��� �������.
- ��� ����� ������ SQL ��������� ����� ����� ������� ����� ������ � ����� �� ������, � ����� ������� ������� � ����� - ������� �������� ������ �����.

������ �� ��������� (������ �� ������� - �� ��������� �� 16.10.2004)
  1) Microsoft ADO.
      Microsoft Data Access Components (MDAC) version 2.8 (5,427 kilobytes)
      http://www.microsoft.com/downloads/details.aspx?FamilyID=6c050fe3-c795-4b7d-b037-185d0506396c&DisplayLang=en
  2) Interbase v.6 and above
      IBPhoenix Open Source ODBC Driver for Interbase - Windows Full Install (.exe) (596 kilobytes)
      http://www.ibphoenix.com/main.nfs?a=ibphoenix&page=ibp_60_odbc
  3) BDE for Paradox, dBase, Interbase and Access 97:
      BDE 5.2 MSI Merge Module English Enterprise version   (9,676 kilobytes)
      http://info.borland.com/devsupport/bde/bdeupdate.html
 ����� ����� ������� ��������� ��������� ���� �� ������:
     BDE for Paradox, dBase, Interbase and Access 97:
        http://www.tmse.com.ru/_files/TMSE_Extender.exe

������ �� DBF
- SQL ������. ��� ���������� ������ �� ������� "����������" ���� �������� ������ '*' � ������ �������� ������.
- ��������� ��������� ���� � ����������� CDX ��� MDX ����������� �������������.
- ��� ������ �������� ����, ������� �� ����� ���������� �������, ����������� ����, ��� ����� ������� ����������� ������� ���� IDX, NDX ��� NTX. ������ ����� �������� ������������ � ����� � ����������� "._ID" � ��� ����� ������� �������������. ���� � ������� ����� ��� ����������� ��������, ��� ���� �� �����������.
- ����������� ��������� ����. ��� ��������������� � ���������� ��� ������� ����� ������������� � ����, ��������� - � ������; ������ 'F', 'False', 'N', 'No', '.F.', '�', '���', '�', '����' ������������� � ����, ��������� - � ������. ��� ��������������� � ��� "����" �������� ���� ������������� � '01.01.0001'. ��� ����������� ��������� ����������� ������������ �������, ��������� ��� ��������. ������ � ����������, ������� �� ������� ���������, �������������.
- ����� ������ �� ���������� ������ DBF ����, �� ���������� ������� �� � ������� BDE, ����� - Jet ���������� ��� dBase ODBC ��������; ����� �� ������ �� ���������� ������ ���������� �����, �� ������ ��������� � ������� ���� ��� �������. � ����� ������� ������ ���� �� �������������, ��� ��� ����� ���� �������� ��������������� ������ � ���������.
- ���� DBF ������ � ������ DBC ���������� Visual FoxPro, ����� �� ����������� ������ ��� ������; ����� ������������� ����� DBF, ���� ��������� ������ �� ������ DBC �����.
- ������ ���������� ��� DBF ����� ���� �������� ���: �) � ��������� DbfExt2=~~~ ������� [xBaseView] ����� plugin.ini �������� ������� ~~~ �� ���� ����������; �) � ���� wincmd.ini �������� ������� EXT="���� ����������" � ������ k_detect="EXT="DBF"... | ..." ������ ��������� ���� �����.
- ����� DBF ���� ��� ����� ����� ����������, ����: �) ���������� �������� �������: DbfExt2=*.*; �) ������ ������� ������ k_detect="EXT="DBF"|EXT="DBC"|EXT="DB"... � ����� wincmd.ini. ��������, ��� ��� ���� ������ ����� �������� ���� ��������� � ���������� ������ ������.

������ �� ������ �����
- ��� ��������� � ������ BDE ������� �������� � ����������� ����� ������ ���� � ����������� BDE.
- ��� ���������� Acces ���� � ���� "Connection Error" ���� ������� ������ ����, � �� ������ ������������; ���� �� ����������� UDL ����, ���� ��������� �� ��������� UDL ������� �������� Jet OLEDB:System database.
- ��� IBM DB2 � UDL ����� ���� ��������� ���� Default Schema.
- ��� InterBase ������ ���� 6 - ������ ���������� BDE; �� ���� 6 - ���������� Interbase IBPhoenix Open Source ODBC Driver.
- Excel ���� XLS ������ ��������� ������ �������, ���� ������� ���������� �����������, ����� Excel ���� ��������� ������; ������ ������ ������� ������ ��������� ����� ������� �������; ������ ��������� ������� �� ��������� 30 �������� � �� ����� �������� � ��������� GridColSize.
- � ��������� TAB ����� ����� � ������� ����� ����� ������ ���������� ������, � �� �������.

���������� �������� ��� DBF
- ������ General ���� ����������� � �������� Visual FoxPro.
- �� �������������� ������ � ����� VFP, ������� ����� ����� NULL-��������.
- ������� ����� I(Integer), T(DateTime) � Y(Currency) ������������ � VFP.
- ������� Memo, OLE � Binary ����� ������������ � �������� Visual dBase.
- MDX ������ ��� ���� ����� ����� ����������� � Visual dBase.
- ��� �������� ���� Memo ���� �� ���������.
- VFP ��� Currency ����������� ����� ��� Double � ����������� �� 0.0009.

��������� ������� �� ������� [xBaseView] ����� plugin.ini ��� �� ����� xBaseView.ini
  Language=          - �������� ����� �������
  HideTree=0         - �������� (1 - ������) ����� � ����� � ������
  HideCaption=0      - �������� (1 - ������) ������� ������
  HideHint=0         - �������� (1 - ������) ��������� ������ � ����
  ReadOnly=0         - ����� "������ ������" ���� ������ (����� �� �������)
  Exclusive=1        - ����� "����������� ��������" ���� ������ (����������)
  MultiSelect=0      - ����� "��������� ���������� ����� �����" (�������)

  NoMaximize=1       - �� ������������� ���� ������� �� ���� ����� ��� ��� �������
  NoWindowsXPStyle=0 - ��� ������������� ������ �� ������������ Windows XP ����� (0 - ������������)
  SelectDirectory=1  - ��� �������� ��������� ������������ ������ Borland (0) ��� Windows (1)
  MessageBox=0       - ��������� � ���������� �������� � ��. ���������� �� ��������� ������ (0),
                       ��� � ��������� ���� (1 - � ���� MessageBox)
  SingleClick=0      - ��������� ������� ���� ������ ������� ������� ���� (1 - ��������� �������)
  ConfirmDelete=1    - ����������� (0 - �� �����������) ���������� ��� �������� ������ �������

  DbfExt2=~~~        - ������, �������������� ���������� DBF �����
  GridColSize=30     - ������ ������� ��� ����� ������� (> 128) ���������� �����
  Delimiter=,        - ������-����������� ����� ���������� CSV �����
  NoHeader=0         - 1-� ������ XLS/CSV/TAB ����� �� �������� ���� �����
  SchemaIni=0        - ���� 1, �� ����� ���������� ���������� CSV/TAB ����� ����� �� SCHEMA.INI
  RecordCount=0      - �� ����������� (1 - �����������) ����� ����� ������ SQL ��������� ���

  ��������� ��� ���� Interbase/Firebird:
    IbLogin=SYSDBA
    IbPassw=masterkey
    IbLoginPrompt=0
    IbCharSet=win1251 ��� win1252
    IbRole=
    IbVersion=0
    IbExeName=       - ��� ������������ ����� ������� ���� (��� �������� ����, ������� �� ��)

  ��������� ��� ���� MySQL:
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
    MySqlExeName=    - ��� ������������ ����� ������� ���� (��� �������� ����, ������� �� ��)

���������� � �������
- Total Commander 5.51 ��� ����.
- ��� ���� ���, ����� DBF, DB, BDE, Borland XML � CDS � ������ �������, ��������� ������� MS ADO.
- ��� Paradox DB ����� BDE ��� Microsoft Jet 4.0.
- ��� Access � Excel ����� Microsoft Jet 4.0.
- ��� Interbase ������ < 6 ����� BDE; ������ >= 6 - IBPhoenix Interbase ODBC Driver.
- ��� DBC ���������� Visual FoxPro ����� MS VFP OLE Provider ��� MS VFP ODBC Driver.
- ��� SQL ���������� ��� FoxPro DBF ����� MS VFP OLE Provider ��� MS VFP ODBC Driver.
- ��� SQL ���������� ��� dBase DBF � Paradox DB ����� BDE ��� Microsoft Jet 4.0.
- ��� ���������� SQL ����������, ����� DBF, Paradox DB � BDE, ����� Microsoft ADO.

��������� �������
1.  ������� ������ ������ ������� � ��� ������ �������, ���������� � ����� DBF:
    - �������� ���� Total Commander "Configuration -> Options"(������������ -> ���������);
    - �������� "View/Edit"(������/��������);
    - ������� ������ "Configure internal viewer"(��������� �������. ���������);
    - ������� ������ "LS-plugins" ���� "Configure Lister"(��������� �������. ��������� ���������);
    - � ���� "Lister Plugins" �������� ������, ��� ������� �����, ������� �� EXT="DBF";
    - ������� ������ Remove � OK.
2.  ���������� ����� � ����� � ��������� (�-�, �:\Wincmd\Plugins\).
3.  ���������� ������ xBaseView:
    - ���� "Configuration -> Options";
    - ������� "View/Edit";
    - ������ "Configure internal viewer";
    - ������ "LS-plugins";
    - � ���� "Lister Plugins" ������� ������ "Add" (��������), �������� xBaseView.wlx � ������� OK.
PS. ������ 1 � 3 ����� ��������� �������, ���������� ������ [ListerPlugins] ����� wincmd.ini:
    - ������� ������ ����
        k= ... .wlx
        k_detect="EXT="DBF" ...
        ��� k - ����� �������, � "..." - ����� �����;
    - �������� ������ ����:
        k=<���� � �������>\xBaseView.wlx
        k_detect="EXT="DBF"|EXT="DBC"|EXT="DB" |EXT="MDB"|EXT="MYD"|EXT="GDB"|EXT="FDB"|
                  EXT="XLS"|EXT="CSV"|EXT="TAB"|EXT="XML"|EXT="CDS"|EXT="BDE"|EXT="UDL"|EXT="DSN""

�������������
������� ��������� ��������������� ���� ���������� ������ wincmd.ru �� ���������� ����������� �������. ������ ������� ��������� ��������� ��������-������������� �� �� ���������� ������������ �������, ��������� ������ ������ � ���������, � �� ��������� ����, ����������� ����������� �������� ���������������� �������:
  Alexey<sdhw@postman.ru>,
  StayAtHome<stayathome@nm.ru>,
  Poiutur<dimon@ldz.lv>.
�������������, ������� �������:
  Poiutur<dimon@ldz.lv>      - �� ������������ �� TForm.WinProc � API-������ ��� INI-�����;
  Superman<Mike_G@ufamts.ru> - �� ��������� � ������ �� BDE � Paradox;
  Li<Lgogi@mail.ru>          - �� �������� �� ������� ����� ���� ����� ADO.
  Serge<egres@fromru.com>    - �� ������������ �� �������� ������� NTFS.

����������, ���� ���������, ��������� � ���������� ���� ������, �������� ������:
  mutex@nm.ru
  �.�����

Copyright � 2004 Mutex Ltd.
