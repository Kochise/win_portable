� Maximus, 2005________________tcCalendar 2.0________________mxmus@yandex.ru
::::Lister-plugin do Total Commandera
________________________________________________________________________________
I. OPIS:
 Uniwersalny kalendarz.
 Pozwala na korzystanie z powszechnych oraz w�asnych dat z podzia�em na kategorie.
 Dla wi�kszo�ci typ�w dat dost�pne s� specjalne formaty, pozwalaj�ce na specjalne definiowanie dat:
 - zale�nych od Wielkanocy katolickiej
 - zale�nych od Wielkanocy ortodoksyjnej
 - zale�nych od liczby dni roboczych w miesi�cu
 - ruchomych
 - cyklicznych
 - wg kalendarza julia�skiego
 Kalendarz sk�ada si� z dw�ch cz�ci (tabeli i listy dat) z mo�liwo�ci� definicji ka�dego z ich element�w.
 Dla listy dat istnieje mozliwo�� ograniczenia liczby wy�wietlanych dat zar�wno wstecz, jak i "do przodu" w stosunku
 do  daty bie��cej.
 Istnieje mo�liwo�� eksportu kalendarza do Excela oraz zapisu jako plik RTF lub zwyk�y plik tekstowy.
 Korzystaj�c z zewn�trznego modu�u SunMoon.ecl tcCalendar mo�e pokazywa� informacje dotycz�ce s�o�ca i ksi�zyca.
 Posiada wieloj�zyczny interfejs (czeski, du�ski, holenderski, angielski, francuski, niemiecki, grecki, w�gierski,
 w�oski, polski, rumu�ski, rumu�ski, rosyjski s�owacki, hiszpa�ski, ukrai�ski)
________________________________________________________________________________
II. INSTALACJA:
 1. Rozpakuj zawarto�� archiwum do wybranego katalogu ([CLD_PATH])
 2. Zainstaluj wtyczk�:
     - Konfiguracja->Opcje...->Edycja/Widok->Skonfigurj wewn. przegl�dark�...->Lister-Wtyczki
     - dodaj tcCld do listy wtyczek
 3. Dodaj nowy przyczisk do paska paska przycisk�w:
     - Konfiguracja->Zmie� pasek narz�dzi...->Dodaj
     - wype�nij pola w nast�puj�cy spos�b:
         - 'Polecenie' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
         - 'Pocz�tkowa �cie�ka' = "[CLD_PATH]"
         - 'Ikona plik' = "[CLD_PATH]\tcCld.ico" lub wybierz ws�asn�
     UWAGA: wszystkie wpisy bez cudzys�ow�w
 4. |opcjonalnie| Mo�esz doda� tcCalendar do menu 'Start' w TC:
     - {Start->Zmie� pocz�tkowe menu...->Dodaj pozycj�...}
     - wprowad� nazw� pozycji (np.: "tcCalendar")
     - wype�nij pola w nast�puj�cy spos�b:
        - 'Polecenie' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - '�cie�ka pocz�tkowa' = "[CLD_PATH]"
     UWAGA: wszystkie wpisy bez cudzys�ow�w
 5. |opcjonalnie| Je�li wykona�e� polecenia z punktu 4, mo�esz zdefiniowa� klawisz skr�tu dla tcCalendara:
     - {Konfiguracja->Opcje...->R�ne}
     - wybierz kombinacj� klawiszy w grupie 'Przedefiniowanie klawiszy'
     - w polu 'polecenie' , z sekcji "User" wybierz "cm_UserMenu" z numerem, kt�ry tcCalendar ma w menu pocz�tkowym
________________________________________________________________________________
III. KLAWISZE:
    S - poka�/ukryj panel ustawie�
    D - poka�/ukryj panel dat
    Y - Poka�/ukryj panel roku
    R - Za�aduj ponownie list� dat
    C - Za�aduj ponownie tabel� kalendarza
    G - Przewi� list� dat do wybranego dnia
    T - Przejd� do wybranego roku
 NUM+ - nast�pny rok
 NUM- - poprzedni rok
 NUM* - bie��cy rok
Edycja format�w notatek/rocznic/w�asnych termin�w:
 Ctrl+Del   - usu�
 Ctrl+Ins   - dodaj
 Ctrl+<     - przenie� w g�r� (za wyj�tkiem format�w rocznic)
 Ctrl+>     - przenie� w d� (eza wyj�tkiem format�w rocznic)
 Ctrl+Enter - zastosuj zmiany (klawisz 'OK' )
________________________________________________________________________________
IV. MYSZKA:
Panel roku:
 Podw�jny klik     - przejd� do wybranego roku
Tabela kalendarza
 Podw�jny klik     - edytuj istniej�c� notatk�
 Ctrl+lewy klik    - edytuj istniej�c� rocznic�
 Shift+lewy klik   - edytuj w�asny termin
 Srodkowy klik     - przewi� list� dat do wybranego dnia
________________________________________________________________________________
V. PLIKI:
 [CLD_PATH]\Dates\*.cdt - zestaw wsp�lnych dat
 [CLD_PATH]\Dates\*.pdt - zestaw w�asnych dat i notatek
 [CLD_PATH]\Dates\*.edt - rozszerzony zestaw dat
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - przyk�adowe zestawy dat (aby skorzysta� z nich, skopiuj je do "[CLD_PATH]\Dates")
Zewn�trzne modu�y:
 [CLD_PATH]\ExLib\*.ecl
 [CLD_PATH]\ExLib\SunMoon.ecl - modu� pozwalaj�cy uzyska� informacje o s�o�cu i ksi�ycu
     Mo�esz pobra� SunMoon.ecl ze strony http://maximus.in.ua
Schematy czcionek:
 [CLD_PATH]\FontScheme\*.fnt
 [CLD_PATH]\tcCld.fnt - bie��cy schemat czcionek
Pliki j�zykowe:
 [CLD_PATH]\Language\*.lng
Pliki pomocy:
 [CLD_PATH]\ReadMe\readme_*.txt

________________________________________________________________________________
VI. FORMAT PLIK�W Z ZESTAWAMI DAT:
________________________________________________________________________________
-|Typ |Sekcja         |Format            |Komentarz
_|____|_______________|__________________|______________________________________
1|.pdt|[Notes]        |dd.mm.yyyy=notes  |Notatka
 |    |               |                  |dd = <dzie�>
 |    |               |                  |mm = <miesi�c>
 |    |               |                  |yyyy = <rok>
_|____|_______________|__________________|______________________________________
2|.cdt|[MainDates]    |dd.mm=dates       |Prosta data
 |    |[Dates]        |                  |dd = <dzie�>
 |    |[Religious]    |                  |mm = <miesi�c>
_|.pdt|[PersonalDates]|__________________|______________________________________
3|    |[Celebrations] |ROEx=dates        |Daty zale�ne od ortodoksyjnej Wielkanocy
 |.edt|[Extended]     |                  |x = <dni_po_ortodoksyjnej_wielkanocy>
 |    |               |                  |x = -<dni_przed_ortodoksyjnej_wielkanocy>
_|    |               |__________________|______________________________________
4|    |               |RCEx=dates        |Daty zale�ne od katolickiej Wielkanocy
 |    |               |                  |x = <dni_po_katolickiej_wielkanocy>
 |    |               |                  |x = -<dni_przed_katolickiej_Easter>
_|    |               |__________________|______________________________________
5|    |               |WDMwn=dates       |Data wg liczby dni roboczych w miesi�cu
 |    |               |                  |              (dla wszystkich miesi�cy)
 |    |               |                  |w = <dzie�_roboczy>
 |    |               |                  |                    [0..6] 0-Niedziela
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
_|    |               |__________________|______________________________________
6|    |               |WDMwn.mm=dates    |Data wg liczby dni roboczych w miesi�cu
 |    |               |                  |            (dla konkretnego miesi�ca)
 |    |               |                  |w = <dzie� roboczy>
 |    |               |                  |                    [0..6] 0-Niedziela
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
 |    |               |                  |mm = <miesi�c>
_|    |               |__________________|______________________________________
7|    |               |PDw.dd=dates      |Szczeg�lna data
 |    |               |                  |w = <dzie�_roboczy>
 |    |               |                  |dd = <dzie�>
_|    |               |__________________|______________________________________
8|    |               |PDYnnn=dates      |Szczeg�lna data
 |    |               |                  |nnn = <dzie�_w_roku>
_|    |               |__________________|______________________________________
9|    |               |Jdd.mm=dates      |Data kalendarza julia�skiego
 |    |               |                  |dd = <dzie�>
 |    |               |                  |mm = <miesi�c>
_|____|_______________|__________________|______________________________________
1|.pdt|[PersonalDates]|CDccc:dd.mm.yyyy  |Cykliczna data
0|    |               | -dd.mm.yyyy=dates|ccc = <dni_w_cyklu>
 |    |               |                  |dd.mm.yyyy (pierwsza grupa) =
 |    |               |                  |                   <lewe_ograniczenie>
 |    |               |                  |dd.mm.yyyy (druga grupa) =
 |    |               |                  |                  <prawe_ograniczenie>
_|____|_______________|__________________|______________________________________
1|.cdt|[MainDates]    |MDdate:l,r>dti    |Data ruchoma (kr�tki format)
1|    |[Dates]        |            =dates|l = <lewy_dzie�_roboczy>
 |.pdt|[PersonalDates]|                  |r = <prawy_dzie�_roboczy>
 |    |[Celebrations] |                  |t = <docelowy_dzie�_roboczy>
 |    |               |                  |           l,r,t - [0..6] 0-Niedziela
 |    |               |                  |d = <kierunek_ruchu>
 |    |               |                  |          N - nast�ony, P - poprzedni
 |    |               |                  |i = <ignoruj>
 |    |               |                  |  I - b�dzie wy�wietlane tylko je�li
 |    |               |                  |                  zosta�o przeniesione
 |    |               |                  |date = format daty 2,3,4
_|    |               |__________________|______________________________________
1|    |               |MDdate:l1,r1>dt1  |Data ruchoma (d�ugi format)
2|    |               | :l2,r2>dt2i=dates|       jak w kr�tkim formacie,
 |    |               |                  |               ale zawiera dwa warunki
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |Data ruchoma (format zale�ny)
3|    |               |    WDMwn.mm=dates|dd = <dzie�>
 |    |               |                  |mm = <miesi�c>
 |    |               |                  |w = <dzie�_roboczy>
 |    |               |                  |                    [0..6] 0-Niedziela
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
_|    |               |__________________|______________________________________
1|    |               |MDdate:WDMwn.mm>  |Data ruchoma (zale�na od Wielkanocy)
4|    |               |     WDMwn.mm=����|w = <dzie�_roboczy>
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
       format_number = muner formatu nma li�cie format�w (>=-1, -1 - domy�lny format)
                                       {Panel ustawie�->Daty->Zestawy->Klawisz '>'}
  2. notatki = Note_1%nNote_2%n ... %nNote_X
  3. Format wsp�lny dat ruchomych:
       MDsource_date:move_condition>target_date
       MDsource_date:move_condition_1>target_date_1:move_condition_2>target_date_2 (long format)
  4. Istnieje mo�liwo�� edycji notatek oraz prostych dat (dd.mm), ��cznie z rocznicami,
  z poziomu wtyczki tcCalendar (zobacz cz�� MYSZ)
________________________________________________________________________________
VI. PRZYK�ADY:
  ROE0=Wielkanoc                       23.04=Urodzny Jana%nUrodziny Piotra
  ROE49=Uroczysto�ci Tr�jcy �wi�tej    WDM02=druga niedziela ka�dego miesi�ca
  ROE-7=Niedziela Palmowa              WDM3-1=ostatnia �roda ka�dego miesi�ca
  RCE0=Katolicka Wielkanoc             WDM51.11=pierwszy pi�tek listopada
  PD5.13=Pi�tek "trzynastego"
  PDY256=Dzie� programist�w

  J25.12=Bo�e Narodzenie
    Ko�ci� ortodoksyjny �wi�tuje Bo�e Narodzenia (a mo�e i inne �wi�ta) w starym stylu
    (kalendarzu julia�skim).
    Obecnie r�nica mi�dzy kalendarzem gregoria�skim,a julia�skim wynosi 13 dni
    ale od 1 marca 2010 roku b�dzie to 14 dni, a przed 1 marca 1900 by�o 12.
  CD015:14.09.2005-03.05.2006=Data cykliczna
    B�dzie powtrzana co 15 dni pocz�wszy od 14.09.2005, ale nie p�niej ni� do 03.05.2006.
  MD02.04:2,3>P1:4,5>N1=2 kwietnia �wi�to w Argentynie
    Je�li 2 kwietnia wypada we wtorek lub �rod�, to �wi�to przenoszene jest na poprzedazaj�cy
    je poniedzia�ek, je�li w czwartek lub pi�tek to - na nast�pny poniedzia�ek, w innym razie nie
    jest przenoszone.
  MD01.01:6,6>N1:0,0>N1=Dodatkowe �wi�to za Nowy Rok na Ukrainie
         MD01.01:6,0>N1=Dodatkowe �wi�to za Nowy Rok na Ukrainie
    Na Ukrainie, je�li �wi�to pa�stwowe (��cznie z Nowym Rokiem) wypada w sobot� lub niedziel�
    to wyst�puje dodatkowy wolny dzie� w kolejny poniedzia�ek.
  MD01.01:6,0>N1I=Dodatkowe �wi�to za Nowy Rok na Ukrainie
    Je�li dodane jest 'I' na ko�cu "przenoszonej" daty w kr�tkim lub d�ugim formacie
    w�wczas data ta b�dzie wy�wietlana tylko je�li b�dzie przeniesiona.
  MD01.05:WDM01>WDM02.05=1 maja �wi�to Gdzie� tam
    Je�li 1 maja jest w pierwsz� niedziel� miesi�ca w�wczas �wi�to przenoszone jest
    na drug� niedziel� maja.
_______________________________________________________________________________
VII. FORMAT ROCZNIC:
 {Panel ustawie�->Daty->Zestawy->Klawisz '>'}
Specjalne symbole:
[N] - Nazwa rocznicy
[Y] - Rok rozpocz�cia
[A] - Rocznica
Je�li np. chcesz zobaczy� na li�cie dat informacj�:
"Tego dnia , 10 lat temu, Urodzi� si� nasz drogi Jasiu. To wspania�e wydarzenia mia�o miejsce w 1995 roku."
musisz doda� nast�puj�cy format:
"Tego dnia , [A] lat temu, Urodzi� si� nasz drogi [N]. To wspania�e wydarzenia mia�o miejsce w [Y] roku."
i wybra� ten format dodaj�c/edytuj�crocznice (menu podr�czne kalendarza) w trzeciej kolumnie tabeli, w pierwszej nale�y wpisa� jako nazw�: "Jasiu"
________________________________________________________________________________
VIII. FORMAT DAT:
 {Panel ustawie�->Wy�wietlanie->Inne->Format dat}
Specjalne symbole:
[D] - Dzie�
[M] - Numer miesi�ca
[L] - Litera miesi�ca
[A] - Alternatywna litera miesi�ca
[Y] - Rok
[S] - Skr�cony rok
[J] - Data julia�ska
[W] - Dzie� tygodnia
[B] - Kr�tki dzie� tygodnia
 \t - tab (ma znaczenie dla listy dat)
Przyk�ad:
Format daty julia�skiej: j[D].[M] = j03.08
 Format na li�cie dat: [L] [D], [Y] ([J]) = 16 sierpnia, 2005 (j03.08)
________________________________________________________________________________
IX. FORMAT CZASU:
 {Panel ustawie�->Czas->Format czasu}
Specjalne symbole:
[H] - Godziny
[T] - Godziny (12-godzinny format)
[M] - Minuty
[S] - Sekundy
Przyk�ad:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09
________________________________________________________________________________
X. FORMAT PODPOWIEDZI:
 {Panel ustawie�->Podpowied�->Zawarto��->Format podpowiedzi}
Wsp�lne symbole specjalne:
\n  - nowa linia
\t  - tabulator

Dzi�:
  Specialne symbole:
    [T] - Dzi�
  Sample:
    :::: [T] :::: = :::: Dzi� ::::

Format nag��wk�w typ�w dat:
  Specialne symbole:
    [N] - Nazwa typu daty
  Przyk�ad:
    ::++ [N] ++:: = ::++ �wi�ta pa�stwowe ++::

Format informacji o s�o�cu i ksi�ycu:
  Specjalne symbole:
    [SR] - Godzina wschodu S�o�ca
    [SS] - Godzina zachodu S�o�ca
    [MR] - Godzina wschodu Ksi�zyca
    [MS] - Godzina zachodu Ksi�zyca
    [PP] - Faza Ksi�yca (procent)
    [PN] - Nazwa fazy Ksi�yca
Przyk�ad:
 S�o�ce i Ksi�yc:\nWsch�d S�o�ca [SR]\nZach�d S�o�ca [SS]\nWsch�d Ksi�yca [MR]\nZach�d Ksi�yca [MS]
 =
 S�o�ca i Ksi�yc:
 Wsch�d S�o�ca 03:49
 Zach�d S�o�ca 20:12
 Wsch�d Ksi�yca 00:26
 Zach�d Ksi�zyca 14:12
________________________________________________________________________________
XI. PARAMETRTY CZCIONEK
 {Panel ustawie�->Wy�wietlanie->Czcionki}
________________________________________________________________________________
                 | N/U      | U/O   | U/A
_________________|__________|_______|____________________________________________
Rok              | VA       |       |
T�o              |          | FC BC | FC={kolor t�a dla listy dat}
                 |          |       | BC={Kolor t�a dla kalendarza}
Siatka kalendarza|          | BC    | BC={kolor siatki kalendarza}
... <Data>       | VA HA    |       | BC={... kolor znacznika}
... <Tekst>      | VA HA BC |       |
_________________|__________|_______|____________________________________________
Skr�ty:
 N/U - nie u�ywane  U/O - u�ywane tylko U/A - u�ywane jako
 VA - wyr�wnanie w pionie    FC - kolor czcionki
 HA - wyr�wnaie w poziomie   BC - kolor t�a
________________________________________________________________________________
XII. USUWANIE PROBLEM�W:
 W niekt�rych wersjach Windowsa (np. Windows 2000) lista dat nie jest wy�wietlana w�a�ciwie.
 Aby usun�� ten problem nale�y skopiowa�:
     z Windows XP  -  dysk:\WINNT\SYSTEM32\riched20.dll
     z Windows 98  -  dysk:\Windows\SYSTEM32\riched20.dll
      do w�a�ciwego katalogu w Windows 2000 - disk:\WINNT\SYSTEM32\)
     dysk - dysk gdzie jest zainstalowany system operacyjny
________________________________________________________________________________
XIII. MATERIA�Y:
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