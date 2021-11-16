xBaseView - Универсальное средство просмотра (и правки) баз данных

Просмотр и правка файлов:
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
      Всего: 15 типов файлов.

Общая функциональность
* 12 файловых расширений: .dbf (VFP/FoxPro/dBase/Clipper), .dbc (Visual FoxPro), .db (Paradox), .mdb (Access), .myd (MySQL), .gdb (Interbase), .fdb (Firebird), .xls (Excel), .csv (Text), .tab (Text), .xml (Microsoft & Borland XML), .cds (Borland Client DataSet).
* 3 дополнительные: .udl (ADO Universal Data Link), .dsn (ODBC Data Source Name), .bde (Borland DB Engine Aliases).
* 5 технологий доступа: ADO, ODBC, Borland Engine, MySQLDAC, xBase DBF Engine. MySQLDAC это Direct Access Components for MySQL, созданный microOLAP Technologies LLC. Проверен для Oracle, DB2, SQL Server, Teradata.
* 4 способа поиска-фильтрации данных, в т.ч. пошаговый и быстрый индексный поиск.
* 7 форматов экспорта данных: dbf, xls, csv, tab, xml(Microsoft & Borland XML), html.
* 6 форматов импорта данных: dbf, csv, tab, xml(Microsoft & Borland XML), html.
* xBase Engine автоматически открывает и корректно обрабатывает все типы индексных (cdx, idx, mdx, ndx, ntx) и мемо (fpt, dbt) файлов, распознает кодовые страницы и национальные символы; для VFP и FoxPro поддерживает разные правила сортировок и автоинкрементное поле VFP8.
* Можно создавать/изменять индексы и структуры DBF и DB файлов; переиндексировать, упаковать и очищать их
* Можно выполнять SQL запросы и SQL-DDL операторы для любой базы данных.

Большое спасибо переводчикам языкового файла и Ваши замечания направьте к ним:
- украинский:  Serhiy Dubyk   <dubyk@library.lviv.ua> (http://www.wincmd.ru/plugring/ukr_expanded.html)
- немецкий:    Dieter W. Rehfeld <dieter.rehfeld@web.de>  (http://www.totalcmd.net/plugring/Extended_German_Menu.html)
- итальянский: diamanti <diamanti@email.it> (http://midiquiz.altervista.org/indexEn.htm)
- голландский: Erwin Veermans <NwDsk@veder.com>  (http://www.veder.com/nwdsk/)
- польский:    Bogdan Wozniak <bwo@vp.pl>
- греческий:   Dimitrios Valsamis <dvalsami@ebox.gr>
- французский: Franck Gartemann <FGartemann@aol.com>
- испанский:   Luis Mejia <luismejia@gmail.com>

Служебные файлы
  xBaseView.dbf, xBaseView.cdx, xBaseView.fpt - файлы историй открывавшихся каталогов,
  xBaseView.ini или Тоталовский LsPlugin.ini - файл параметров.
  xBaseView.ext - файл, содержащий расширения, которые игнорируются и не включаются в дерево.
  Каталог для этих файлов (кроме LsPlugin.ini) можно задавать:
    1) в переменной среды с именем xBaseViewdir,
    2) в файле xBaseView.dir из каталога плагина,
    3) в регистре HKCU\SOFTWARE\Mutex\xBaseView\xBaseViewdir.
  В указываемых значениях можно использовать формат переменных среды Windows.
  Если каталог не задан, служебные файлы располагаются в каталоге плагина и:
    4) будет использован файл LsPlugin.ini, если там есть секция [xBaseView] и параметр "Language",
    5) в противном случае INI-файлом будет файл xBaseView.ini,
    6) если выбранный каталог является ReadOnly, будет использован Temp-каталог Windows.

Языковые файлы
  Имеют префикс имени "xBase", расширение ".LNG" и могут находиться в каталоге плагина или служебных файлов.

Некоторые клавиши:
  1) F10        - контекстное меню,
     F4         - циклическая передача фокуса,
  2) Enter      - развернуть текущий узел дерева папок
     Backspace  - свернуть текущий узел дерева папок
     Ctrl+Back  - подняться на уровень вверх по дереву
     Ctrl+R     - обновить дерево - перечитать диск
  3) Ctrl+Alt+0 - пошаговый поиск в строковой колонке
  4) Ctrl+A     - выделение MEMO,
     Ctrl+Y     - очистка MEMO,
     Ctrl+J     - шаблоны Select, Insert, Update, Delete операторов SQL,
  5) Shift+Del  - молчаливое удалени строки сетки без подтверждения.

Некоторые советы
- Лист дерева базы данных открывается двойным щелчком или клавишами [Серый Плюс], Enter или Пробел.
- Пароль может запрашиваться плагином только для MDB и UDL расширений, для DSN расширения - нет.
- Для выделения нескольких строк сетки баз данных (сначала пометьте в меню пункт "Выбор многих"), удерживайте клавишу Ctrl и делайте щелчки с левой стороны нужных строк.
- При экспорте нескольких выделенных строк сетки сортировка строк не теряется.
- Для сортировки по нескольким колонкам сетки баз данных, удерживайте клавишу Ctrl и делайте щелчки на заголовках нужных колонок. Для DBF, DB, BDE, Borland XML и CDS - эта операция недоступна.
- Если под рукой нет ни одного DBF файла, создайте пустой файл NEW.DBF; а для Paradox - NEW.DB.
- В некоторых диалогах двойной щелчок на заголовке увеличивает высоту диалога до размеров экрана.
- Состояние окна плагина, ширины и порядка следования колонок можно сохранять в INI файле, который создается отдельно для каждой таблицы и получает имя таблицы.
- При вводе текста SQL оператора можно мышью стащить имена таблиц и полей из дерева, а также двойным щелчком в сетке - забрать значение ячейки сетки.

Советы по драйверам (откуда их скачать - по состоянию на 16.10.2004)
  1) Microsoft ADO.
      Microsoft Data Access Components (MDAC) version 2.8 (5,427 kilobytes)
      http://www.microsoft.com/downloads/details.aspx?FamilyID=6c050fe3-c795-4b7d-b037-185d0506396c&DisplayLang=en
  2) Interbase v.6 and above
      IBPhoenix Open Source ODBC Driver for Interbase - Windows Full Install (.exe) (596 kilobytes)
      http://www.ibphoenix.com/main.nfs?a=ibphoenix&page=ibp_60_odbc
  3) BDE for Paradox, dBase, Interbase and Access 97:
      BDE 5.2 MSI Merge Module English Enterprise version   (9,676 kilobytes)
      http://info.borland.com/devsupport/bde/bdeupdate.html
 Также можно скачать следующий маленький файл из Рунета:
     BDE for Paradox, dBase, Interbase and Access 97:
        http://www.tmse.com.ru/_files/TMSE_Extender.exe

Советы по DBF
- SQL фильтр. Для фильтрации текста по условию "СОДЕРЖИТСЯ" надо добавить символ '*' в начало искомого текста.
- Составной индексный файл с расширением CDX или MDX открывается автоматически.
- При первом открытии базы, которая не имеет составного индекса, открывается окно, где можно указать несоставные индексы типа IDX, NDX или NTX. Список таких индексов запоминается в файле с расширением "._ID" и его можно вручную редактировать. Если в текущей папке нет несоставных индексов, это окно не открывается.
- Модификация структуры базы. При преобразованиях в логический тип нулевое число преобразуется в ложь, ненулевое - в истину; строки 'F', 'False', 'N', 'No', '.F.', 'Н', 'Нет', 'Л', 'Ложь' преобразуются в ложь, остальные - в истину. При преобразованиях в тип "дата" неверная дата преобразуется в '01.01.0001'. При модификации структуры сохраняются существующие индексы, насколько это возможно. Индекс с выражением, которое не удалось вычислить, отбрасывается.
- Когда плагин не распознает формат DBF базы, он попытается открыть ее с помощью BDE, затем - Jet процессора или dBase ODBC драйвера; когда же плагин не распознает формат индексного файла, он выдает сообщение и откроет базу без индекса. В таких случаях правка базы не рекомендуется, так как может быть нарушена согласованность данных с индексами.
- Если DBF входит в состав DBC контейнера Visual FoxPro, тогда он открывается только для чтения; чтобы редактировать такой DBF, надо запустить плагин на самого DBC файла.
- Второе расширение для DBF файла надо задавать так: а) в параметре DbfExt2=~~~ раздела [xBaseView] файла plugin.ini замените символы ~~~ на свое расширение; б) в файл wincmd.ini добавьте символы EXT="Ваше расширение" в строку k_detect="EXT="DBF"... | ..." вместо последних трех точек.
- Чтобы DBF файл мог иметь любое расширение, надо: а) установить параметр плагина: DbfExt2=*.*; б) вообще удалить строку k_detect="EXT="DBF"|EXT="DBC"|EXT="DB"... в файле wincmd.ini. Возможно, что при этом Листер будет работать чуть медленнее и потреблять больше памяти.

Советы по другим базам
- Для просмотра и правки BDE алиасов создайте и используйте любой пустой файл с расширением BDE.
- Для защищенной Acces базы в окне "Connection Error" надо вводить пароль базы, а не пароль пользователя; если Вы используете UDL файл, надо заполнить на последней UDL вкладке параметр Jet OLEDB:System database.
- Для IBM DB2 в UDL файле надо заполнить поле Default Schema.
- Для InterBase версий ниже 6 - плагин использует BDE; не ниже 6 - бесплатный Interbase IBPhoenix Open Source ODBC Driver.
- Excel файл XLS должен содержать только таблицу, безо всякого словесного комментария, иначе Excel база считается пустой; первая строка таблицы должна содержать имена колонок таблицы; ширина текстовых колонок по умолчанию 30 символов и ее можно изменить в параметре GridColSize.
- В текстовом TAB файле целая и дробная части числа должны отделяться точкой, а не запятой.

Нерешенные проблемы для DBF
- Формат General поля несовместим с форматом Visual FoxPro.
- Не поддерживается индекс с полем VFP, который может иметь NULL-значение.
- Индексы типов I(Integer), T(DateTime) и Y(Currency) несовместимы с VFP.
- Форматы Memo, OLE и Binary полей несовместимы с форматом Visual dBase.
- MDX индекс для всех типов полей несовместим с Visual dBase.
- При упаковке базы Memo файл не сжимается.
- VFP тип Currency эмулируется через тип Double и погрешность до 0.0009.

Параметры плагина из раздела [xBaseView] файла plugin.ini или из файла xBaseView.ini
  Language=          - название языка плагина
  HideTree=0         - показать (1 - скрыть) файлы и папки в дереве
  HideCaption=0      - показать (1 - скрыть) надписи кнопок
  HideHint=0         - показать (1 - скрыть) подсказки кнопок и меню
  ReadOnly=0         - режим "только чтение" базы данных (здесь он сброшен)
  Exclusive=1        - режим "монопольное открытие" базы данных (установлен)
  MultiSelect=0      - режим "Выделение нескольких строк сетки" (сброшен)

  NoMaximize=1       - не разворачивать окно плагина на весь экран при его запуске
  NoWindowsXPStyle=0 - для навигационных кнопок не использовать Windows XP стиль (0 - использовать)
  SelectDirectory=1  - для открытия каталогов использовать диалог Borland (0) или Windows (1)
  MessageBox=0       - сообщение о завершении экспорта и др. показывать на статусной строке (0),
                       или в отдельном окне (1 - в окне MessageBox)
  SingleClick=0      - открывать таблицу базы данных двойным щелчком мыши (1 - одинарным щелчком)
  ConfirmDelete=1    - запрашивать (0 - не запрашивать) разрешение для удаления записи таблицы

  DbfExt2=~~~        - второе, дополнительное расширение DBF файла
  GridColSize=30     - ширина колонок для очень длинных (> 128) символьных полей
  Delimiter=,        - символ-разделитель полей текстового CSV файла
  NoHeader=0         - 1-я строка XLS/CSV/TAB файла не содержит имен полей
  SchemaIni=0        - если 1, то часть параметров текстового CSV/TAB файла взять из SCHEMA.INI
  RecordCount=0      - не запрашивать (1 - запрашивать) число строк таблиц SQL серверных баз

  Параметры для СУБД Interbase/Firebird:
    IbLogin=SYSDBA
    IbPassw=masterkey
    IbLoginPrompt=0
    IbCharSet=win1251 или win1252
    IbRole=
    IbVersion=0
    IbExeName=       - имя исполняемого файла сервера СУБД (для проверки того, запущен ли он)

  Параметры для СУБД MySQL:
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
    MySqlExeName=    - имя исполняемого файла сервера СУБД (для проверки того, запущен ли он)

Требования к системе
- Total Commander 5.51 или выше.
- Для всех баз, кроме DBF, DB, BDE, Borland XML и CDS в первую очередь, требуется наличие MS ADO.
- Для Paradox DB нужен BDE или Microsoft Jet 4.0.
- Для Access и Excel нужен Microsoft Jet 4.0.
- Для Interbase версий < 6 нужен BDE; версий >= 6 - IBPhoenix Interbase ODBC Driver.
- Для DBC контейнера Visual FoxPro нужен MS VFP OLE Provider или MS VFP ODBC Driver.
- Для SQL операторов над FoxPro DBF нужен MS VFP OLE Provider или MS VFP ODBC Driver.
- Для SQL операторов над dBase DBF и Paradox DB нужен BDE или Microsoft Jet 4.0.
- Для выполнения SQL операторов, кроме DBF, Paradox DB и BDE, нужен Microsoft ADO.

Установка плагина
1.  Удалите старую версию плагина и все другие плагины, работающие с типом DBF:
    - выберите меню Total Commander "Configuration -> Options"(Конфигурация -> Настройка);
    - выберите "View/Edit"(Правка/Просмотр);
    - нажмите кнопку "Configure internal viewer"(Настройка внутрен. программы);
    - нажмите кнопку "LS-plugins" окна "Configure Lister"(Настройка внутрен. программы просмотра);
    - в окне "Lister Plugins" выделите строку, где имеется текст, похожий на EXT="DBF";
    - нажмите кнопки Remove и OK.
2.  Распакуйте архив в папку с плагинами (н-р, С:\Wincmd\Plugins\).
3.  Установите плагин xBaseView:
    - меню "Configuration -> Options";
    - вариант "View/Edit";
    - кнопка "Configure internal viewer";
    - кнопка "LS-plugins";
    - в окне "Lister Plugins" нажмите кнопку "Add" (Добавить), выберите xBaseView.wlx и нажмите OK.
PS. Пункты 1 и 3 можно выполнить вручную, редактируя раздел [ListerPlugins] файла wincmd.ini:
    - удалите строки вида
        k= ... .wlx
        k_detect="EXT="DBF" ...
        где k - номер плагина, а "..." - любой текст;
    - добавьте строки вида:
        k=<путь к плагину>\xBaseView.wlx
        k_detect="EXT="DBF"|EXT="DBC"|EXT="DB" |EXT="MDB"|EXT="MYD"|EXT="GDB"|EXT="FDB"|
                  EXT="XLS"|EXT="CSV"|EXT="TAB"|EXT="XML"|EXT="CDS"|EXT="BDE"|EXT="UDL"|EXT="DSN""

Благодарности
Выражаю искренную признательность всем участникам форума wincmd.ru за обсуждение недостатков плагина. Особое спасибо следующим уважаемым коллегам-программистам за их тщательное тестирование плагина, выявившее немало ошибок и недочетов, и за блестящие идеи, позволившие существенно улучшить функциональность плагина:
  Alexey<sdhw@postman.ru>,
  StayAtHome<stayathome@nm.ru>,
  Poiutur<dimon@ldz.lv>.
Дополнительно, большое спасибо:
  Poiutur<dimon@ldz.lv>      - за консультацию по TForm.WinProc и API-плагин для INI-файла;
  Superman<Mike_G@ufamts.ru> - за поддержку и советы по BDE и Paradox;
  Li<Lgogi@mail.ru>          - за алгоритм по выборке схемы базы через ADO.
  Serge<egres@fromru.com>    - за консультацию по файловой системе NTFS.

Пожалуйста, Ваши пожелания, замечания и выявленные Вами ошибки, сообщите автору:
  mutex@nm.ru
  Е.Савич

Copyright © 2004 Mutex Ltd.
