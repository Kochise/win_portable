xBaseView - Visor Universal de Base de Datos (y Editor)

Ver y editar archivos:
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
  11. Texto CSV (*.CSV),
  12. Texto TAB (*.TAB),
  13. Borland XML (*.XML),
  14. Borland Client DataSet (*.CDS),
  15. Borland DB Engine Aliases (*.BDE),
  16. ADO Universal Data Link (*.UDL),
  17. ODBC Data Source Name (*.DSN).
      Total: 15 tipos de archivos.

Caracter�sticaS principales:
* 12 extensiones de archivo: .dbf (VFP/FoxPro/dBase/Clipper), .dbc (Visual FoxPro), .db (Paradox), .mdb (Access), .myd (MySQL), .gdb (Interbase), .fdb (Firebird), .xls (Excel), .csv (Text), .tab (Text), .xml (Borland XML), .cds (Borland Client DataSet).
* 3 adicionales: .udl (ADO Universal Data Link), .dsn (ODBC Data Source Name), .bde (Borland DB Engine Aliases).
* 5 tecnolog�as DB: ADO, ODBC, Motor Borland, MySQLDAC, Motor xBase DBF. MySQLDAC es Direct Access Components para MySQL por microOLAP Technologies LLC. Probado sobre Oracle, DB2, SQL Server, Teradata.
* 4 m�todos para b�squeda-filtrado de data incluyendo b�squeda incremental y r�pida en �ndices.
* 6 formatos para exportar data: dbf, xls, csv, tab, xml, html.
* El motor xBase autom�ticamente abre todos los tipos de �ndices (cdx, idx, mdx, ndx, ntx) y archivos memo (fpt, dbt) y los procesa correctamente; reconoce p�ginas de c�digo y s�mbolos nacionales en DBF; soporta diferentes recopilaciones (collates) para VFP/FoxPro y campos autoincrementales VFP8.
* Usted puede crear/modificar �ndices y estructuras de archivos DBF/DB y reindexar, empaquetar o borrarlos.
* Tambi�n puede ejecutar operadores SQL-Select y SQL-DDL para cualquier base de datos.

Muchas gracias por la traducci�n a:
- Ucraniano:  Serhiy Dubyk   <dubyk@library.lviv.ua> (http://www.wincmd.ru/plugring/ukr_expanded.html)
- Alem�n:     Dieter W. Rehfeld <dieter.rehfeld@web.de>  (http://www.totalcmd.net/plugring/Extended_German_Menu.html)
- Italiano:   diamanti <diamanti@email.it> (http://midiquiz.altervista.org/indexEn.htm)
- Hol�ndes:   Erwin Veermans <NwDsk@veder.com>  (http://www.veder.com/nwdsk/)
- Polaco:     Bogdan Wozniak <bwo@vp.pl>
- Griego:     Dimitrios Valsamis <dvalsami@ebox.gr>
- Franc�s:    Franck Gartemann <FGartemann@aol.com>
- Espa�ol:    Luis Mej�a <luismejia@gmail.com>

Archivos de Servicio
  xBaseView.dbf, xBaseView.cdx, xBaseView.fpt - archivos de historial,
  LsPlugin.ini o xBaseView.ini - archivo de inicializaci�n.
  Usted peude especificar el directorio para esos archivos (excepto LsPlugin.ini) de 3 maneras:
    - via variable de entorno %xBaseViewdir%,
    - en el archivo xBaseView.dir en el Directorio del Plugin,
    - via el registro del sistema HKCU\SOFTWARE\Mutex\xBaseView\xBaseViewdir.
  Everywhere you may use Windows Environment Variable format.

Algunas teclas:
  1) F10        - men� contextual,
  2) Enter      - expandir nodo actual en el �rbol
     REtroceso  - colapsar nodo actual en el �rbol
     Ctrl+Back  - subir un nivel en el �rbol
     Ctrl+R     - refrescar �rbol - releer el disco
  3) Ctrl+Alt+0 - b�squeda incremental en la columna de cadena
  4) Ctrl+A     - seleccionar texto de MEMO,
     Ctrl+Y     - borrar texto de MEMO,
     Ctrl+J     - Seleccionar plantilla, Insertar, Actualizar, Borrar operadores.
  5) Shift+Del  - silent delete grid row without confirm.

Descarga de manejadores (Octubre 16, 2004)
  1) Microsoft ADO.
      Microsoft Data Access Components (MDAC) version 2.8 (5,427 kilobytes)
      http://www.microsoft.com/downloads/details.aspx?FamilyID=6c050fe3-c795-4b7d-b037-185d0506396c&DisplayLang=en
  2) Interbase v.6 y superior
      http://www.ibphoenix.com/main.nfs?a=ibphoenix&page=ibp_60_odbc
      IBPhoenix Open Source ODBC Driver for Interbase - Windows Full Install (.exe) (596 kilobytes)
  3) BDE para Paradox, dBase, Interbase y Access 97:
      BDE 5.2 MSI Merge Module English Enterprise version   (9,676 kilobytes)
      http://info.borland.com/devsupport/bde/bdeupdate.html

Asuntos conocidos para DBF
- Formato de campo General no es compatible con el formato-VFP.
- Indices-VFP para campos con valores NULL no estan soportado.
- Indices para tipo Integer, DateTime, Currency no son compatibles con VFP.
- Formatos de campos Memo, OLE, Binary no son compatibles con Visual dBase.
- �ndices-MDX de cualquier tipo no son compatibles con Visual dBase.
- Archivo-Memo no es comprimido.
- Tipo-VFP Currency es emulado con tipo Double.

Descripci�n de par�metros de la secci�n [xBaseView] en el archivo plugin.ini o desde el archivo xBaseView.ini
  Language=           - nombre del idioma actual
  HideTree=0          - mostrar (1 - ocultar) archivos y carpetas en el �rbol
  HideCaption=0       - mostrar (1 - ocultar) t�tulos de botones de navegaci�n
  HideHint=0          - mostrar (1 - ocultar) ayudas de botones y men�s
  ReadOnly=0          - modo "Solo lectura"
  Exclusive=1         - modo "Abrir en Exclusiva"

  NoMaximize=1        - tama�o predeterminado de la ventana al iniciar
  NoWindowsXPStyle=0  - botones de navegaci�n sin estilo XP (0 - con estilo XP)
  SelectDirectory=0   - seleccionar directorio v�a di�logo Borland (0) o Windows (1)
  MessageBox=0        - mensaje "Completado exitosamente" en barra de estado (0) o cuadro de mensaje (1)
  SingleClick=0       - abrir tablas de base de datos con doble click (1 - con click simple)
  ConfirmDelete=1     - confirmar al borrar un registro de la tabla (0 - sin confirmar)

  DbfExt2=~~~         - extensi�n adicional para archivo DBF
  ExcelColSize=30     - ancho de columna de Excel o archivos de Texto
  Delimiter=,         - delimitador de campo para archivo CSV
  NoHeader=0          - 1ra l�nea de archivo CSV/TAB no contiene nombres de campos
  SchemaIni=0         - si es 1 - toma los par�metros de archivos CSV/TAB desde SCHEMA.INI
  RecordCount=0       - suprime cuenta-registros en servidores SQL de bases de datos

  Par�metros Interbase/Firebird:
    IbLogin=SYSDBA
    IbPassw=masterkey
    IbLoginPrompt=0
    IbCharSet=win1251 ��� win1252
    IbRole=
    IbVersion=0
    IbExeName=

  Par�metros MySQL:
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
    MySqlExeName=

Requerimientos
- Total Commander 5.51 o posterior.
- Para todas las bases de datos, excepto DBF, DB, BDE, XML y CDS, primeramente se requiere Microsoft ADO.
- Para Paradox DB se requiere BDE o Microsoft Jet 4.0.
- Para Access y Excel se requiere Microsoft Jet 4.0.
- Para Interbase versi�n < 6 se requiere BDE; v. >= 6 - IBPhoenix Interbase ODBC Driver.
- Para contenedor Visual FoxPro DBC se requiere MS VFP OLE Provider o MS VFP ODBC Driver.
- Para operadores SOL en DBF se requiere MS VFP OLE Provider o MS VFP ODBC Driver.
- Para operadores SOL en Paradox DB se requiere BDE o Microsoft Jet 4.0.
- Para operadores SOL, excepto DBF, Paradox DB y BDE, se requiere Microsoft ADO.

Instalaci�n
- Elegir "Configuraci�n" -> "Opciones".
- Elegir "Editar/Ver".
- Click en "Configurar visor interno...".
- Click sobre bot�n [LS-Plugins].
- Click sobre bot�n [Agregar] y seleccionar xBaseView.wlx.
- O agregar estas dos l�neas a la secci�n [ListerPlugins] del archivo wincmd.ini:
    k=<ruta al plugin>\xBaseView.wlx
    k_detect="EXT="DBF"|EXT="DBC"|EXT="DB" |EXT="MDB"|EXT="MYD"|EXT="GDB"|EXT="FDB"|
              EXT="XLS"|EXT="CSV"|EXT="TAB"|EXT="XML"|EXT="CDS"|EXT="BDE"|EXT="UDL"|EXT="DSN""
  y corregir el n�mero y la ruta.

Agradecimientos
Muchas gracias a
  Alexey<sdhw@postman.ru>,
  StayAtHome<stayathome@nm.ru>,
  Poiutur<dimon@ldz.lv>,
  Superman<Mike_G@ufamts.ru>,
  Li<Lgogi@mail.ru>
por pruebas-beta, consultas y avisos.

Por favor, env�e bugs y comentarios:
  mutex@nm.ru
  E.Savich

Copyright � 2004 Mutex Ltd.
