c Maximus, 2005__________________tcCalendar 2.0__________________mxmus@yandex.ru
Lister-plugin for Total Commander____________________________mxmus@maximus.in.ua
________________________________________________________________________________
I. BESKRIVELSE:
 Universel kalender.
 Tillader brug af generelle og personlige aftaler i forskellige kategorier.
 For de fleste datatyper findes specielle formater:
  - relativ Katolsk Påske                 - relativ Ortodoks Påske
  - efter ugedagens nummer i måneden      - Julianske datoer
  - forskydelige datoer                   - cykliske datoer
  - særlige datoer

 Du kan konfigurere næsten ethvert element i kalenderen som du vil.
 Du kan eksportere kalendertabellen til Excel eller gemme den som bitmap (BMP), og datolisten kan gemmes som RTF eller ren Tekstfil.


 Kalenderen består af to dele (tabel og datoliste), for hvilke man kan definere formatet for hvert af deres elementer.
 I datolisten kan man begrænse det viste antal af datoer henholdsvis før og efter dags dato.
 Man kan eksportere kalendertabellen til Excel og datolisten kan gemmes som RTF eller ren Tekstfil.
 Ved hjælp af det eksterne modul SunMoon.ecl kan tcCalendar vise information om Sol og Måne.
 Kalenderen har et interface på flere sprog (Tjekkisk, Dansk, Hollandsk, Engelsk, Fransk, Tysk, Ungarnsk, Gæsk, Italiensk, Polsk, Rumænsk, Russisk, Slovakisk, Spansk, Ukrainsk)
________________________________________________________________________________
II. SETUP:
 1. Udpak zip-filen i sin egen mappe ([CLD_PATH])
 2. Installer plugin:
     - {Opsætning -> Indstillinger... -> Rediger/Vis -> Indstilling af intern fremviser... -> LS-plugins}
     - tilføj tcCld.wlx til plugin listen
 3. Tilføj ny knap til knappanel:
     - {Opsætning -> Ændre knappanel... -> Tilføj}
     - udfyld felterne således:
        - 'Kommando' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Start-mappe' = "[CLD_PATH]"
        - 'Ikonfil' = "[CLD_PATH]\tcCld.ico" eller vælg selv en ikon
     OBS: medtag ikke anførselstegnene når felterne udfyldes
 4. |valgfrit| Man kan føje tcCalendar til 'Startmenu'en:
     - {Start -> Ændre Startmenu... -> Tilføj punkt...}
     - angiv et navn for menupunktet (for eksempel: "tckalender")
     - udfyld felterne således:
        - 'Kommando' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Start-mappe' = "[CLD_PATH]"
     OBS: medtag ikke anførselstegnene når felterne udfyldes
 5. |valgfrit| Hvis punkt 4 er udført, kan man definere en genvejstast for tcCalendar:
     - {Opsætning -> Indstillinger... -> Diverse}
     - vælg en bekvem kombination under 'Omdefiner genvejstaster'
     - i 'Kommando' listen under "|___User___|" vælges "cm_UserMenu#" med det # som tcCalendar har i 'Startmenu'en
________________________________________________________________________________
III. TASTATUR:
 NUM+ - næste år
 NUM- - forrige år
    S - vis/gem indstillingspanel
    D - vis/gem datoliste
    Y - vis/gem årstalspanel
    R - genindlæs datoliste
    C - genindlæs kalendertabel
    G - rul datoliste til valgte dag
    T - gå til det ønskede år
 NUM+ - næste år
 NUM- - forrige år
 NUM* - indeværende år

Redigering af Noter/Mærkedage/Personlige aftaler/Formater for mærkedage:
 Ctrl+Del   - slet
 Ctrl+Ins   - tilføj
 Ctrl+<     - flyt op (undtagen i Formater for mærkedage)
 Ctrl+>     - flyt ned (undtagen i Formater for mærkedage)
 Ctrl+Enter - udfør ændringer ('OK' knap)
________________________________________________________________________________
IV. MUS:
Årstalspanel:
 Dobbeltklik       - gå til det ønskede år
kalendertabel:
 Dobbeltklik       - rediger noter
 Ctrl+venstreklik  - rediger mærkedage
 Skift+venstreklik - rediger personlige aftaler
 Midterklik        - rul datoliste til denne dag
________________________________________________________________________________
V. FILER:
Datosæt:
 [CLD_PATH]\Dates\*.cdt - Basale datosæt
 [CLD_PATH]\Dates\*.pdt - Personlige datosæt
 [CLD_PATH]\Dates\*.edt - Udvidet datosæt
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - eksempler på datosæt (for brug - kopier til "[CLD_PATH]\Dates")
Eksterne moduler:
 [CLD_PATH]\ExLib\*.ecl
 [CLD_PATH]\ExLib\SunMoon.ecl - modul til at få information om Sol og Måne
     Du kan downloade SunMoon.ecl fra http://maximus.in.ua
Tegnsæt-temaers:
 [CLD_PATH]\FontScheme\*.fnt
 [CLD_PATH]\tcCld.fnt - nuværende tegnsæt-tema
Sprogfiler:
 [CLD_PATH]\Language\*.lng
Hjelpefiler:
 [CLD_PATH]\ReadMe\readme_*.txt
________________________________________________________________________________
VI. FORMAT AF DATOSÆTFILER:
________________________________________________________________________________
N|Type|Afdeling       |Format            |Kommentarer
_|____|_______________|__________________|______________________________________
1|.pdt|[Notes]        |dd.mm.yyyy=noter  |Note
 |    |               |                  |dd = <dag>
 |    |               |                  |mm = <måned>
 |    |               |                  |yyyy = <år>
_|____|_______________|__________________|______________________________________
2|.cdt|[MainDates]    |dd.mm=beskrivelse |Simpel dato
 |    |[Dates]        |                  |dd = <dag>
 |    |[Religious]    |                  |mm = <måned>
_|.pdt|[personalDates]|__________________|______________________________________
3|    |[Celebrations] |ROEx=beskrivelse  |Dato relativt til ortodoks Påske
 |.edt|[Extended]     |                  |x = <dage_efter_ortodoks_Påske>
 |    |               |                  |x = -<dage_før_ortodoks_Påske>
_|    |               |__________________|______________________________________
4|    |               |RCEx=beskrivelse  |Dato relativt til katolsk Påske
 |    |               |                  |x = <dage_efter_katolsk_Påske>
 |    |               |                  |x = -<dage_før_katolsk_Påske>
_|    |               |__________________|______________________________________
5|    |               |WDMwn=beskrivelse |Dato efter ugedagens nummer i måneden
 |    |               |                  |                    (for alle måneder)
 |    |               |                  |w = <ugedag>
 |    |               |                  |                       [0..6] 0=søndag
 |    |               |                  |n = <nummer_relativt_til_måned_start>
 |    |               |                  |n = -<nummer_relativt_til_måned_slut>
_|    |               |__________________|______________________________________
6|    |               |WDMwn.mm=         |Dato efter ugedagens nummer i måneden
 |    |               |      beskrivelse |                (for konkrete måneder)
 |    |               |                  |w = <ugedag>
 |    |               |                  |                       [0..6] 0=søndag
 |    |               |                  |n = <nummer_relativt_til_måned_start>
 |    |               |                  |n = -<nummer_relativt_til_måned_slut>
 |    |               |                  |mm = <måned>
_|    |               |__________________|______________________________________
7|    |               |PDw.dd=beskrivelse|Særlig dato
 |    |               |                  |w = <ugedag>
 |    |               |                  |dd = <dag>
_|    |               |__________________|______________________________________
8|    |               |PDYnnn=beskrivelse|Særlig dato
 |    |               |                  |nnn = <dag_i_året>
_|    |               |__________________|______________________________________
9|    |               |Jdd.mm=beskrivelse|Juliansk kalenderdato
 |    |               |                  |dd = <dag>
 |    |               |                  |mm = <måned>
_|____|_______________|__________________|______________________________________
1|.pdt|[personalDates]|CDccc:dd.mm.yyyy- |Cyklisk dato
0|    |               |      dd.mm.yyyy= |ccc = <dage_i_cyklus>
 |    |               |      beskrivelse |dd.mm.yyyy (første gruppe) =
 |    |               |                  |            <venstre_afgrænsning_dato>
 |    |               |                  |dd.mm.yyyy (anden gruppe) =
 |    |               |                  |            <højre_afgrænsning_dato>
_|____|_______________|__________________|______________________________________
1|.cdt|[MainDates]    |MDdate:l,r>dti=   |Forskydelig dato (kort format)
1|    |[Dates]        |      beskrivelse |l = <venstre_ugedag>
 |    |[Religious]    |                  |r = <højre_ugedag>
 |.pdt|[personalDates]|                  |t = <mål_ugedag>
 |    |[Celebrations] |                  |               l,r,t - [0..6] 0=søndag
 |.edt|[Extended]     |                  |d = <flyt_retning>
 |    |               |                  |             N - følgende, P - forrige
 |    |               |                  |i = <ignorer>
 |    |               |                  |             I - vil kun blive vist,
 |    |               |                  |                 hvis dagen flyttes
 |    |               |                  |date = datoformat 2,3,4
_|    |               |__________________|______________________________________
1|    |               |MDdate:l1,r1>dt1  |Forskydelig dato (langt format)
2|    |               | :l2,r2>dt2i=     |             som kort format, men
 |    |               |      beskrivelse |             indeholder to betingelser
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |Forskydelig dato (relativt format)
3|    |               |        WDMwn.mm= |dd = <dag>
 |    |               |      beskrivelse |mm = <måned>
 |    |               |                  |w = <ugedag>
 |    |               |                  |                       [0..6] 0=søndag
 |    |               |                  |n = <nummer_relativt_til_måned_start>
 |    |               |                  |n = -<nummer_relativt_til_måned_slut>
_|    |               |__________________|______________________________________
1|    |               |MDdate:WDMwn.mm>  |Forskydelig dato (Påske relativt format)
4|    |               |        WDMwn.mm= |w = <ugedag>
 |    |               |      beskrivelse |                       [0..6] 0=søndag
 |    |               |                  |n = <nummer_relativt_til_måned_start>
 |    |               |                  |n = -<nummer_relativt_til_måned_slut>
 |    |               |                  |date = datoformat 3,4
_|____|_______________|__________________|______________________________________
Bemærkninger:
  1. datoer = dato_1%ndato_2%n ... %ndato_X
       for mærkedage - .pdt [Celebrations]:
       date_i = mærkedag_navn#mærkedag_start_år#format_nummer
       format_nummer = formatnummer i formatlisten (>= 0, 0 = standardformat)
                                       {Indstillingspanel -> Datosæt -> Sæt -> '>' (knap)}
  2. noter = note_1%nnote_2%n ... %nnote_X
  3. basalt format for forskydelig dato:
       MDkilde_dato:flytte_betingelse>mål_dato
       MDkilde_dato:flytte_betingelse_1>mål_dato_1:flytte_betingelse_2>mål_dato_2 (langt format)
  4. Det er muligt at redigere noter og simple datoer (dd.mm), inklusive mærkedage, fra tcCalendar (se MUS)
________________________________________________________________________________
Eksempler:
  ROE0=Påskedag                          23.04=John's birthday%nPeter's birthday
  ROE49=Pinsedag                         WDM02=Anden søndag i hver måned
  ROE-7=Palmesøndag                      WDM3-1=Sidste onsdag i hver måned
  RCE0=Katolsk Påske                     WDM51.11=Første fredag i november
  PD5.13=Fredag d. 13.
  PDY256=Programmers day

  J25.12=Jul
    Ortodokse kirke fejrer Jul (og måske andre dage) i gammel stil (Juliansk kalender).
    Nu er forskellen på den Gregorianske og den Julianske kalender 13 dage, men fra
    1. marts 2100 vil den være 14 dage, og før 1. marts 1900 var den 12 dage.
  CD015:14.09.2005-03.05.2006=Cyklisk dato
    Vil blive gentaget hver 15. dag startende fra 14.09.2005, men ikke senere end 03.05.2006.
  MD02.04:2,3>P1:4,5>N1=2. april, helligdag i Argentina
    Hvis 2. april er en tirsdag eller onsdag, flyttes helligdagen til forrige mandag,
    hvis den er en torsdag eller fredag flyttes den til næste mandag, i andre tilfæde flyttes den ikke.
  MD01.01:6,6>N1:0,0>N1=Ekstra helligdag for Nytår i Ukraine
         MD01.01:6,0>N1=Ekstra helligdag for Nytår i Ukraine
    I Ukraine, hvis den nationale helligdag (inklusiv Nytår) er en Lørdag eller søndag,
    så tilføjes en ekstra helligdag følgende mandag.
  MD01.01:6,0>N1I=Ekstra helligdag for Nytår i Ukraine
    Når der tilføjes 'I' i slutningen af den forskydelige dato (kort eller langt format), så vil datoen
    kun blive vist hvis den flyttes.
  MD01.05:WDM01>WDM02.05=1. maj, helligdag nogen steder
    Hvis 1. maj er den første søndag i måneden, så flyttes helligdagen til anden søndag i maj.
________________________________________________________________________________
VII. MÆRKEDAGE FORMAT:
 {Indstillingspanel -> Datosæt -> Sæt -> '>' (knap)}
Specielle symboler:
[N] - Mærkedag navn
[Y] - Mærkedagens start-år
[A] - Mærkedagens antal år
For eksempel, hvis du ønsker en meddelse som:
"Denne dag, for 10 år siden, blev vores kære Johnny født. Denne mindeværdige begivenhed fandt sted i året 1995."
så må du tilføje et format som ser således ud:
"Denne dag, for [A] år siden, blev vores kære [N] født. Denne mindeværdige begivenhed fandt sted i året [Y]."
og derefter vælge dette format i tredje kolonne, når du tilføjer/redigerer mærkedagen.
________________________________________________________________________________
VIII. DATOFORMAT:
 {Indstillingspanel -> Vis-> Andet -> Datoformat}
Specielle symboler:
[D] - Dag (tal)
[M] - Måned (tal)
[L] - Måned (tekst)
[A] - Måned kort (tekst)
[Y] - År (tal)
[S] - År kort (tal)
[J] - Juliansk dato
[W] - Ugedag (tekst)
[B] - Ugedag kort (tekst)
\t  - tabulering (for datoliste)
Eksempel:
 Juliansk datoformat: j[D].[M] = j03.08
 Datoliste datoformat: [L] [D], [Y] ([J]) = August 16, 2005 (j03.08)
________________________________________________________________________________
IX. TIDSFORMAT:
 {Indstillingspanel -> Tid -> Tidsformat}
Special symbols:
[H] - Timer (24-timers format)
[T] - Timer (12-timers format)
[M] - Minutter
[S] - Sekunder
Eksempel:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09
________________________________________________________________________________
X. TOOLTIP FORMAT:
 {Indstillinger -> Ballonhjælp -> Indhold af ballonhjælp -> Formater}
Almindelige specialle tegn:
\n  - lijeskift
\t  - tab

Idag:
  Specielle symboler:
    [T] - Idag
  Eksempel:
    :::: [T] :::: = :::: Idag ::::

Datotype-overskrift:
  Specielle symboler:
    [N] - Datotype navn
  Eksempel:
    ::++ [N] ++:: = ::++ Nationale helligdage ++::

Sol og Måne information:
  Specielle symboler:
    [SR] - Sol op
    [SS] - Sol ned
    [MR] - Måne op
    [MS] - Måne ned
    [PP] - Månefase (i procent)
    [PN] - Månefase navn
  Eksempel:
    Sol & Måne:\nSun op [SR]\nSol ned [SS]\nMåne op [MR]\nMåne ned [MS]
    =
    Sol & Månen:
    Sol op 03:49
    Sol ned 20:12
    Måne op 00:26
    Måne ned 14:12
________________________________________________________________________________
XI. SPIDSFINDIGHEDER MED SKRIFTTYPEINDSTILLINGER:
 {Indstilingspanel -> Vis -> Skrifttyper}
________________________________________________________________________________
                | I/B      | B/K   | B/S
________________|__________|_______|____________________________________________
År              | LJ       |       |
Baggrund        |          | SF BF | FC={baggrundsfarve i datoliste}
                |          |       | BC={baggrundsfarve i kalender}
kalender gitter |          | BF    | BC={kalender gitterfarve}
... [Dato]      | LJ VJ    |       | BC={... markeringsfarve}
... [Tekst]     | LJ VJ BF |       |
________________|__________|_______|____________________________________________
Forkortelser:
 I/B - ikke brugt  B/K - brug kun  B/S - brug som
 LJ - lodret justering    SF - skriftfarve
 VJ - vandret justering   BF - baggrundsfarve
________________________________________________________________________________
XII. PROBLEM-ELIMINERING:
 I visse Windows versioner (for eksempel, Windows 2000) vises datolisten ikke korrekt.
 Kopier filen disk:\WINDOWS\SYSTEM32\riched20.dll (fra Windows 98 eller XP) til den rigtige mappe (i Windows 2000 = disk:\WINNT\SYSTEM32\) for at eliminere dette problem.
     disk = den disk hvor operativsystemet er installeret.
________________________________________________________________________________
XIII. MATERIALE:
 For information om Sol og Måne er brugt en del af TMoon komponenten.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 Som indledende information til at lave by-placeringsfilen (tcCld.lct) er filen cities.dat fra Calendar wfx-plugin brugt.
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________
XIV. HISTORE:
[+] - tilføjet  [/] - ordnet  [*] - ændret

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
+ support mavable dates for .cdt [Religious] and .edt [Extended]
+ new format of movable dates (Easter relative format)
+ set size and possibility to hide year panel

+ common dates set (Austria, German)

[1.8]
/ support files of dates set more then 64 Kb with string width more then 2 Kb
/ fixed error in movable dates (not display if must to move from previous/next year)
/ correctly take into account difference of Julian and Gregorian kalender for Orthodox Easter calculation
+ Julian dates in dates sets (see Format of dates set files/9, SAMPLES)
+ Julian dates in dates list {Settings panel->Display->Other->Date format} (see DATE FORMAT)
+ Julian dates in kalender tooltips(hints) {Settings panel->Dates->Limitation +}
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
+ extended context menu of kalender and dates list
+ more quick access for edit celebrations and personlig dates (see MOUSE)

+ language file (Hellenic)
+ common dates set (Hellas, Hellenic)
+ dates set samples (Hellenic)

[1.7]
+ movable dates
+ particular dates
+ font format fol all date types in kalender {Settings panel->Display->Fonts}
+ possibility to enable/disable displaying of "Today" {Settings panel->Dates->Limitation}
+ saving dates list in RTF-format {Settings panel->Export}
+ user defined location of "Dates"-folder {Settings panel->Program}
* hotkey for vis/gem settings panel change to 'S'

+ language file (Hungarian)
+ common dates set (Argentina, Spanish)
+ common dates set (USA, English)
+ common dates set (Hungary, Hungarian)

[1.6]
+ export kalender to Excel {Settings panel->Export}
/ fixed error with context menu (not right create)
/ now added dates always right away appear in kalender

[1.5]
 + editing personlig dates from kalender {context menu}
 + date format
 + save size of not maximized kalender window
 * not execute disk write operations if program was run from CD
 * change dates list height by drag with the mouse
 * extended date sets will released in separated pack

 + language file (Slovak)
 + common dates set (Russia, Russian)
 + common dates set (Slovakia, Slovak)

[1.4]
 + new category of personlig dates - celebrations (possibly editing from kalender {context menu})
 + message formats for celebrations (possibly editing from kalender {Settings panel->Dates->Sets->Button '>'})
 * changed keys for notes/celebrations editing (see KEYBOARD)
 * removed panels settings - now their state always save
 * extended kalender context menu

 + language file (Italian)
 + readme-file (Romanian)
 + readme-file (Italian)
 + common dates set (Luxembourg, French)
 + common dates set (Romania, Romanian)
 + common dates set (Italy, Italian)
 + dates set samples (Romanian)
 + personlig dates set sample (German)

[1.3]
 + possibility to use more that one events of the same type on one day in dates sets (symbol %n)
 * new interface for edit notes
 * {Settings->Display->Other} removed 'Thick frame of date', because new type of date marker was added - 'Thick frame'
 + font formatting of current date in kalender

 + language file (Czech)
 + language file (Romanian)
 + readme-file (Czech)
 + common dates set (Canada, English)
 + common dates set (France, French)
 * common dates set (Belgium, French)
 + common dates set (Czechia, Czech)

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
 + readme-file (German)
 + readme-file (Spanish)
 + personlig dates set sample (German)

[1.01]
 / bug when you can't add notes
 + possibility add and delete personlig sets directly in plugin
 + possibility do not choose one of dates set

 + language file (Dutch)
 + language file (French)
 + common dates set (Belgium, French)
 + readme-file (French)
 + personlig dates set sample (French)
