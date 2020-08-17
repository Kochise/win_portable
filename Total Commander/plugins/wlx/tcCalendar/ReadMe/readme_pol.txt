ê Maximus, 2005________________tcCalendar 2.0________________mxmus@yandex.ru
::::Lister-plugin do Total Commandera
________________________________________________________________________________
I. OPIS:
 Uniwersalny kalendarz.
 Pozwala na korzystanie z powszechnych oraz w³asnych dat z podzia³em na kategorie.
 Dla wiêkszoœci typów dat dostêpne s¹ specjalne formaty, pozwalaj¹ce na specjalne definiowanie dat:
 - zale¿nych od Wielkanocy katolickiej
 - zale¿nych od Wielkanocy ortodoksyjnej
 - zale¿nych od liczby dni roboczych w miesi¹cu
 - ruchomych
 - cyklicznych
 - wg kalendarza juliañskiego
 Kalendarz sk³ada siê z dwóch czêœci (tabeli i listy dat) z mo¿liwoœci¹ definicji ka¿dego z ich elementów.
 Dla listy dat istnieje mozliwoœæ ograniczenia liczby wyœwietlanych dat zarówno wstecz, jak i "do przodu" w stosunku
 do  daty bie¿¹cej.
 Istnieje mo¿liwoœæ eksportu kalendarza do Excela oraz zapisu jako plik RTF lub zwyk³y plik tekstowy.
 Korzystaj¹c z zewnêtrznego modu³u SunMoon.ecl tcCalendar mo¿e pokazywaæ informacje dotycz¹ce s³oñca i ksiêzyca.
 Posiada wielojêzyczny interfejs (czeski, duñski, holenderski, angielski, francuski, niemiecki, grecki, wêgierski,
 w³oski, polski, rumuñski, rumuñski, rosyjski s³owacki, hiszpañski, ukraiñski)
________________________________________________________________________________
II. INSTALACJA:
 1. Rozpakuj zawartoœæ archiwum do wybranego katalogu ([CLD_PATH])
 2. Zainstaluj wtyczkê:
     - Konfiguracja->Opcje...->Edycja/Widok->Skonfigurj wewn. przegl¹darkê...->Lister-Wtyczki
     - dodaj tcCld do listy wtyczek
 3. Dodaj nowy przyczisk do paska paska przycisków:
     - Konfiguracja->Zmieñ pasek narzêdzi...->Dodaj
     - wype³nij pola w nastêpuj¹cy sposób:
         - 'Polecenie' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
         - 'Pocz¹tkowa œcie¿ka' = "[CLD_PATH]"
         - 'Ikona plik' = "[CLD_PATH]\tcCld.ico" lub wybierz ws³asn¹
     UWAGA: wszystkie wpisy bez cudzys³owów
 4. |opcjonalnie| Mo¿esz dodaæ tcCalendar do menu 'Start' w TC:
     - {Start->Zmieñ pocz¹tkowe menu...->Dodaj pozycjê...}
     - wprowadŸ nazwê pozycji (np.: "tcCalendar")
     - wype³nij pola w nastêpuj¹cy sposób:
        - 'Polecenie' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Œcie¿ka pocz¹tkowa' = "[CLD_PATH]"
     UWAGA: wszystkie wpisy bez cudzys³owów
 5. |opcjonalnie| Jeœli wykona³eœ polecenia z punktu 4, mo¿esz zdefiniowaæ klawisz skrótu dla tcCalendara:
     - {Konfiguracja->Opcje...->Ró¿ne}
     - wybierz kombinacjê klawiszy w grupie 'Przedefiniowanie klawiszy'
     - w polu 'polecenie' , z sekcji "User" wybierz "cm_UserMenu" z numerem, który tcCalendar ma w menu pocz¹tkowym
________________________________________________________________________________
III. KLAWISZE:
    S - poka¿/ukryj panel ustawieñ
    D - poka¿/ukryj panel dat
    Y - Poka¿/ukryj panel roku
    R - Za³aduj ponownie listê dat
    C - Za³aduj ponownie tabelê kalendarza
    G - Przewiñ listê dat do wybranego dnia
    T - PrzejdŸ do wybranego roku
 NUM+ - nastêpny rok
 NUM- - poprzedni rok
 NUM* - bie¿¹cy rok
Edycja formatów notatek/rocznic/w³asnych terminów:
 Ctrl+Del   - usuñ
 Ctrl+Ins   - dodaj
 Ctrl+<     - przenieœ w górê (za wyj¹tkiem formatów rocznic)
 Ctrl+>     - przenieœ w dó³ (eza wyj¹tkiem formatów rocznic)
 Ctrl+Enter - zastosuj zmiany (klawisz 'OK' )
________________________________________________________________________________
IV. MYSZKA:
Panel roku:
 Podwójny klik     - przejd¿ do wybranego roku
Tabela kalendarza
 Podwójny klik     - edytuj istniej¹c¹ notatkê
 Ctrl+lewy klik    - edytuj istniej¹c¹ rocznicê
 Shift+lewy klik   - edytuj w³asny termin
 Srodkowy klik     - przewiñ listê dat do wybranego dnia
________________________________________________________________________________
V. PLIKI:
 [CLD_PATH]\Dates\*.cdt - zestaw wspólnych dat
 [CLD_PATH]\Dates\*.pdt - zestaw w³asnych dat i notatek
 [CLD_PATH]\Dates\*.edt - rozszerzony zestaw dat
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - przyk³adowe zestawy dat (aby skorzystaæ z nich, skopiuj je do "[CLD_PATH]\Dates")
Zewnêtrzne modu³y:
 [CLD_PATH]\ExLib\*.ecl
 [CLD_PATH]\ExLib\SunMoon.ecl - modu³ pozwalaj¹cy uzyskaæ informacje o s³oñcu i ksiê¿ycu
     Mo¿esz pobraæ SunMoon.ecl ze strony http://maximus.in.ua
Schematy czcionek:
 [CLD_PATH]\FontScheme\*.fnt
 [CLD_PATH]\tcCld.fnt - bie¿¹cy schemat czcionek
Pliki jêzykowe:
 [CLD_PATH]\Language\*.lng
Pliki pomocy:
 [CLD_PATH]\ReadMe\readme_*.txt

________________________________________________________________________________
VI. FORMAT PLIKÓW Z ZESTAWAMI DAT:
________________________________________________________________________________
-|Typ |Sekcja         |Format            |Komentarz
_|____|_______________|__________________|______________________________________
1|.pdt|[Notes]        |dd.mm.yyyy=notes  |Notatka
 |    |               |                  |dd = <dzieñ>
 |    |               |                  |mm = <miesi¹c>
 |    |               |                  |yyyy = <rok>
_|____|_______________|__________________|______________________________________
2|.cdt|[MainDates]    |dd.mm=dates       |Prosta data
 |    |[Dates]        |                  |dd = <dzieñ>
 |    |[Religious]    |                  |mm = <miesi¹c>
_|.pdt|[PersonalDates]|__________________|______________________________________
3|    |[Celebrations] |ROEx=dates        |Daty zale¿ne od ortodoksyjnej Wielkanocy
 |.edt|[Extended]     |                  |x = <dni_po_ortodoksyjnej_wielkanocy>
 |    |               |                  |x = -<dni_przed_ortodoksyjnej_wielkanocy>
_|    |               |__________________|______________________________________
4|    |               |RCEx=dates        |Daty zale¿ne od katolickiej Wielkanocy
 |    |               |                  |x = <dni_po_katolickiej_wielkanocy>
 |    |               |                  |x = -<dni_przed_katolickiej_Easter>
_|    |               |__________________|______________________________________
5|    |               |WDMwn=dates       |Data wg liczby dni roboczych w miesi¹cu
 |    |               |                  |              (dla wszystkich miesiêcy)
 |    |               |                  |w = <dzieñ_roboczy>
 |    |               |                  |                    [0..6] 0-Niedziela
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
_|    |               |__________________|______________________________________
6|    |               |WDMwn.mm=dates    |Data wg liczby dni roboczych w miesi¹cu
 |    |               |                  |            (dla konkretnego miesi¹ca)
 |    |               |                  |w = <dzieñ roboczy>
 |    |               |                  |                    [0..6] 0-Niedziela
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
 |    |               |                  |mm = <miesi¹c>
_|    |               |__________________|______________________________________
7|    |               |PDw.dd=dates      |Szczególna data
 |    |               |                  |w = <dzieñ_roboczy>
 |    |               |                  |dd = <dzieñ>
_|    |               |__________________|______________________________________
8|    |               |PDYnnn=dates      |Szczególna data
 |    |               |                  |nnn = <dzieñ_w_roku>
_|    |               |__________________|______________________________________
9|    |               |Jdd.mm=dates      |Data kalendarza juliañskiego
 |    |               |                  |dd = <dzieñ>
 |    |               |                  |mm = <miesi¹c>
_|____|_______________|__________________|______________________________________
1|.pdt|[PersonalDates]|CDccc:dd.mm.yyyy  |Cykliczna data
0|    |               | -dd.mm.yyyy=dates|ccc = <dni_w_cyklu>
 |    |               |                  |dd.mm.yyyy (pierwsza grupa) =
 |    |               |                  |                   <lewe_ograniczenie>
 |    |               |                  |dd.mm.yyyy (druga grupa) =
 |    |               |                  |                  <prawe_ograniczenie>
_|____|_______________|__________________|______________________________________
1|.cdt|[MainDates]    |MDdate:l,r>dti    |Data ruchoma (krótki format)
1|    |[Dates]        |            =dates|l = <lewy_dzieñ_roboczy>
 |.pdt|[PersonalDates]|                  |r = <prawy_dzieñ_roboczy>
 |    |[Celebrations] |                  |t = <docelowy_dzieñ_roboczy>
 |    |               |                  |           l,r,t - [0..6] 0-Niedziela
 |    |               |                  |d = <kierunek_ruchu>
 |    |               |                  |          N - nastêony, P - poprzedni
 |    |               |                  |i = <ignoruj>
 |    |               |                  |  I - bêdzie wyœwietlane tylko jeœli
 |    |               |                  |                  zosta³o przeniesione
 |    |               |                  |date = format daty 2,3,4
_|    |               |__________________|______________________________________
1|    |               |MDdate:l1,r1>dt1  |Data ruchoma (d³ugi format)
2|    |               | :l2,r2>dt2i=dates|       jak w krótkim formacie,
 |    |               |                  |               ale zawiera dwa warunki
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |Data ruchoma (format zale¿ny)
3|    |               |    WDMwn.mm=dates|dd = <dzieñ>
 |    |               |                  |mm = <miesi¹c>
 |    |               |                  |w = <dzieñ_roboczy>
 |    |               |                  |                    [0..6] 0-Niedziela
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
_|    |               |__________________|______________________________________
1|    |               |MDdate:WDMwn.mm>  |Data ruchoma (zale¿na od Wielkanocy)
4|    |               |     WDMwn.mm=¤ âë|w = <dzieñ_roboczy>
 |    |               |                  |                    [0..6] 0-Niedziela
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
 |    |               |                  |date = formaty daty 3,4
_|____|_______________|__________________|______________________________________
_|____|_______________|__________________|______________________________________
UWAGA:
  1. daty = date_1%ndate_2%n ... %ndate_X
       dla rocznic - .pdt [Celebrations]:
       date_i = celebration_name#celebration_begin_year#format_number
       format_number = muner formatu nma liœcie formatów (>=-1, -1 - domyœlny format)
                                       {Panel ustawieñ->Daty->Zestawy->Klawisz '>'}
  2. notatki = Note_1%nNote_2%n ... %nNote_X
  3. Format wspólny dat ruchomych:
       MDsource_date:move_condition>target_date
       MDsource_date:move_condition_1>target_date_1:move_condition_2>target_date_2 (long format)
  4. Istnieje mo¿liwoœæ edycji notatek oraz prostych dat (dd.mm), ³¹cznie z rocznicami,
  z poziomu wtyczki tcCalendar (zobacz czêœæ MYSZ)
________________________________________________________________________________
VI. PRZYK£ADY:
  ROE0=Wielkanoc                       23.04=Urodzny Jana%nUrodziny Piotra
  ROE49=Uroczystoœci Trójcy Œwiêtej    WDM02=druga niedziela ka¿dego miesi¹ca
  ROE-7=Niedziela Palmowa              WDM3-1=ostatnia œroda ka¿dego miesi¹ca
  RCE0=Katolicka Wielkanoc             WDM51.11=pierwszy pi¹tek listopada
  PD5.13=Pi¹tek "trzynastego"
  PDY256=Dzieñ programistów

  J25.12=Bo¿e Narodzenie
    Koœció³ ortodoksyjny œwiêtuje Bo¿e Narodzenia (a mo¿e i inne œwiêta) w starym stylu
    (kalendarzu juliañskim).
    Obecnie ró¿nica miêdzy kalendarzem gregoriañskim,a juliañskim wynosi 13 dni
    ale od 1 marca 2010 roku bêdzie to 14 dni, a przed 1 marca 1900 by³o 12.
  CD015:14.09.2005-03.05.2006=Data cykliczna
    Bêdzie powtrzana co 15 dni pocz¹wszy od 14.09.2005, ale nie póŸniej ni¿ do 03.05.2006.
  MD02.04:2,3>P1:4,5>N1=2 kwietnia œwiêto w Argentynie
    Jeœli 2 kwietnia wypada we wtorek lub œrodê, to œwiêto przenoszene jest na poprzedazaj¹cy
    je poniedzia³ek, jeœli w czwartek lub pi¹tek to - na nastêpny poniedzia³ek, w innym razie nie
    jest przenoszone.
  MD01.01:6,6>N1:0,0>N1=Dodatkowe œwiêto za Nowy Rok na Ukrainie
         MD01.01:6,0>N1=Dodatkowe œwiêto za Nowy Rok na Ukrainie
    Na Ukrainie, jeœli œwiêto pañstwowe (³¹cznie z Nowym Rokiem) wypada w sobotê lub niedzielê
    to wystêpuje dodatkowy wolny dzieñ w kolejny poniedzia³ek.
  MD01.01:6,0>N1I=Dodatkowe œwiêto za Nowy Rok na Ukrainie
    Jeœli dodane jest 'I' na koñcu "przenoszonej" daty w krótkim lub d³ugim formacie
    wówczas data ta bêdzie wyœwietlana tylko jeœli bêdzie przeniesiona.
  MD01.05:WDM01>WDM02.05=1 maja œwiêto Gdzieœ tam
    Jeœli 1 maja jest w pierwsz¹ niedzielê miesi¹ca wówczas œwiêto przenoszone jest
    na drug¹ niedzielê maja.
_______________________________________________________________________________
VII. FORMAT ROCZNIC:
 {Panel ustawieñ->Daty->Zestawy->Klawisz '>'}
Specjalne symbole:
[N] - Nazwa rocznicy
[Y] - Rok rozpoczêcia
[A] - Rocznica
Jeœli np. chcesz zobaczyæ na liœcie dat informacjê:
"Tego dnia , 10 lat temu, Urodzi³ siê nasz drogi Jasiu. To wspania³e wydarzenia mia³o miejsce w 1995 roku."
musisz dodaæ nastêpuj¹cy format:
"Tego dnia , [A] lat temu, Urodzi³ siê nasz drogi [N]. To wspania³e wydarzenia mia³o miejsce w [Y] roku."
i wybraæ ten format dodaj¹c/edytuj¹crocznice (menu podrêczne kalendarza) w trzeciej kolumnie tabeli, w pierwszej nale¿y wpisaæ jako nazwê: "Jasiu"
________________________________________________________________________________
VIII. FORMAT DAT:
 {Panel ustawieñ->Wyœwietlanie->Inne->Format dat}
Specjalne symbole:
[D] - Dzieñ
[M] - Numer miesi¹ca
[L] - Litera miesi¹ca
[A] - Alternatywna litera miesi¹ca
[Y] - Rok
[S] - Skrócony rok
[J] - Data juliañska
[W] - Dzieñ tygodnia
[B] - Krótki dzieñ tygodnia
 \t - tab (ma znaczenie dla listy dat)
Przyk³ad:
Format daty juliañskiej: j[D].[M] = j03.08
 Format na liœcie dat: [L] [D], [Y] ([J]) = 16 sierpnia, 2005 (j03.08)
________________________________________________________________________________
IX. FORMAT CZASU:
 {Panel ustawieñ->Czas->Format czasu}
Specjalne symbole:
[H] - Godziny
[T] - Godziny (12-godzinny format)
[M] - Minuty
[S] - Sekundy
Przyk³ad:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09
________________________________________________________________________________
X. FORMAT PODPOWIEDZI:
 {Panel ustawieñ->PodpowiedŸ->Zawartoœæ->Format podpowiedzi}
Wspólne symbole specjalne:
\n  - nowa linia
\t  - tabulator

Dziœ:
  Specialne symbole:
    [T] - Dziœ
  Sample:
    :::: [T] :::: = :::: Dziœ ::::

Format nag³ówków typów dat:
  Specialne symbole:
    [N] - Nazwa typu daty
  Przyk³ad:
    ::++ [N] ++:: = ::++ Œwiêta pañstwowe ++::

Format informacji o s³oñcu i ksiê¿ycu:
  Specjalne symbole:
    [SR] - Godzina wschodu S³oñca
    [SS] - Godzina zachodu S³oñca
    [MR] - Godzina wschodu Ksiêzyca
    [MS] - Godzina zachodu Ksiêzyca
    [PP] - Faza Ksiê¿yca (procent)
    [PN] - Nazwa fazy Ksiê¿yca
Przyk³ad:
 S³oñce i Ksiê¿yc:\nWschód S³oñca [SR]\nZachód S³oñca [SS]\nWschód Ksiê¿yca [MR]\nZachód Ksiê¿yca [MS]
 =
 S³oñca i Ksiê¿yc:
 Wschód S³oñca 03:49
 Zachód S³oñca 20:12
 Wschód Ksiê¿yca 00:26
 Zachód Ksiêzyca 14:12
________________________________________________________________________________
XI. PARAMETRTY CZCIONEK
 {Panel ustawieñ->Wyœwietlanie->Czcionki}
________________________________________________________________________________
                 | N/U      | U/O   | U/A
_________________|__________|_______|____________________________________________
Rok              | VA       |       |
T³o              |          | FC BC | FC={kolor t³a dla listy dat}
                 |          |       | BC={Kolor t³a dla kalendarza}
Siatka kalendarza|          | BC    | BC={kolor siatki kalendarza}
... <Data>       | VA HA    |       | BC={... kolor znacznika}
... <Tekst>      | VA HA BC |       |
_________________|__________|_______|____________________________________________
Skróty:
 N/U - nie u¿ywane  U/O - u¿ywane tylko U/A - u¿ywane jako
 VA - wyrównanie w pionie    FC - kolor czcionki
 HA - wyrównaie w poziomie   BC - kolor t³a
________________________________________________________________________________
XII. USUWANIE PROBLEMÓW:
 W niektórych wersjach Windowsa (np. Windows 2000) lista dat nie jest wyœwietlana w³aœciwie.
 Aby usun¹æ ten problem nale¿y skopiowaæ:
     z Windows XP  -  dysk:\WINNT\SYSTEM32\riched20.dll
     z Windows 98  -  dysk:\Windows\SYSTEM32\riched20.dll
      do w³aœciwego katalogu w Windows 2000 - disk:\WINNT\SYSTEM32\)
     dysk - dysk gdzie jest zainstalowany system operacyjny
________________________________________________________________________________
XIII. MATERIA£Y:
 For getting information about Sun and MoonFor used part of TMoon component.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 As initial information for forming of towns location file (tcCld.lct) used file cities.dat from Calendar wfx-plugin.
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________
XIV. HISTORIA:
[+] - dodano  [/] - poprawiono  [*] - zmieniono

[2.0]
+ saving calendar table as bitmap (BMP) {Settings panel->Export}
+ fonts schemes {Settings panel->Display->Fonts}
+ setting of content of tooltip {Settings panel->Tooltip->Content of tooltip} (see X. TOOLTIP FORMAT)
+ manual location input {Settings panel->Time and Location}
+ setting of window position on start {Settings panel->Program}
+ buttons for hiding year panel and dates list
+ indent for text alignment {Settings panel->Display->Fonts}
+ hotkey for going to current year - NUM*


[1.9]
+ getting information about Moon and Sun using external module {Settings panel->Tooltip->Sun and Moon}
      (see EXTERNAL MODULES, SUN AND MOON INFORMATION FORMAT)
      Choose town and time format {Settings panel->Time} (see TIME FORMAT)
+ headers for date types in tooltips {Settings panel->Tooltip->Date type header}
      (see DATE TYPE HEADER FORMAT)
+ day of week in long date format and dates list date format (see DATE FORMAT)
+ suupport mavable dates for .cdt [Religious] and .edt [Extended]
+ new format of movable dates (Easter relative format)
+ set size and possibility to hide year panel

+ common dates set (Austria, German)

[1.8]
/ support files of dates set more then 64 Kb with string width more then 2 Kb
/ fixed error in movable dates (not display if must to move from previous/next year)
/ correctly take into account difference of Julian and Gregorian calendar for Orthodox Easter calculation
+ Julian dates in dates sets (see Format of dates set files/9, SAMPLES)
+ Julian dates in dates list {Settings panel->Display->Other->Date format} (see DATE FORMAT)
+ Julian dates in calendar tooltips(hints) {Settings panel->Dates->Limitation +}
+ addition to movable dates format ('I' key, see Format of dates set files/11, SAMPLES)
+ addition to movable dates format (limits like from 6 to 2, see SAMPLES)
+ addition to particular dates format (day in year, see Format of dates set files/8, SAMPLES)
+ priority of dates and formats {Settings panel->Display->Priority}
+ paragraphs in tooltips(hints) {Settings panel->Display->Other}
+ possibility to set current date {context menu}
+ save dates list also in plain text {Settings panel->Export}
+ invisible export onto Excel (quickly) {Settings panel->Export}
+ scroll dates list to selected day (see KEYBOARD, MOUSE)
+ possibility to load dates list for choosed year {Settings panel->Dates->Limitation +}
+ extended context menu of calendar and dates list
+ more quick access for edit celebrations and personal dates (see MOUSE)

[1.7]
+ movable dates
+ particular dates
+ font format fol all date types in calendar {Settings panel->Display->Fonts}
+ possibility to enable/disable displaying of "Today" {Settings panel->Dates->Limitation}
+ saving dates list in RTF-format {Settings panel->Export}
+ user defined location of "Dates"-folder {Settings panel->Program}
* hotkey for show/hide settings panel change to 'S'

+ language file (Hungarian)
+ common dates set (Argentina, Spanish)
+ common dates set (USA, English)
+ common dates set (Hungary, Hungarian)

[1.6]
+ export calendar to Excel {Settings panel->Export}
/ fixed error with context menu (not right create)
/ now added dates always right away appear in calendar

[1.5]
 + editing personal dates from calendar {context menu}
 + date format
 + save size of not maximized calendar window
 * not execute disk write operations if program was run from CD
 * change dates list height by drag with the mouse
 * extended date sets will released in separated pack

 + language file (Slovak)
 + common dates set (Russia, Russian)
 + common dates set (Slovakia, Slovak)

[1.4]
 + new category of personal dates - celebrations (possibly editing from calendar {context menu})
 + message formats for celebrations (possibly editing from calendar {Settings panel->Dates->Sets->Button '>'})
 * changed keys for notes/celebrations editing (see KEYBOARD)
 * removed panels settings - now their state always save
 * extended calendar context menu

 + language file (Italian)
 + readme-file (Romanian)
 + readme-file (Italian)
 + common dates set (Luxembourg, French)
 + common dates set (Romania, Romanian)
 + common dates set (Italy, Italian)
 + common dates set samples (Romanian)
 + personal dates set sample (German)

[1.3]
 + possibility to use more that one events of the same type on one day in dates sets (symbol %n)
 * new interface for edit notes
 * {Settings->Display->Other} removed 'Thick frame of date', because new type of date marker was added - 'Thick frame'
 + font formatting of current date in calendar

 + language file (Czech)
 + language file (Romanian)
 + readme-file (Czech)
 + common dates set (Canada, English)
 + common dates set (France, French)
 * common dates set (Belgium, French)
 + common dates set (Czechia, Czech)
 + extended dates set (Czech, "Name-day")

[1.2]
 + possibility to use date with defined cycle
 + setting of dates displaying limitation
 + possibility to choose marker type for dates types
 * decreased time of dates list loading

 + common dates set (Poland, Polish)

[1.1]
 / now dates list display right in Windows98
 + new dates type - extended set
 + possibility to use date by number of week day in month relatively begin or end of month
 + fonts settings in separate file


 + language file (German)
 + language file (Polish)
 + language file (Spanish)
 + common dates set (Germany, German)
 + 2 extended dates sets (French, "Saint's days")
 + readme-file (German)
 + readme-file (Spanish)
 + personal dates set sample (German)

[1.01]
 / bug when you can't add notes
 + possibility add and delete personal sets directly in plugin
 + possibility do not choose one of dates set

 + language file (Dutch)
 + language file (French)
 + common dates set (Belgium, French)
 + readme-file (French)
 + personal dates set sample (French)