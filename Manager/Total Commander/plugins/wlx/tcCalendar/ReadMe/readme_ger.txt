� Maximus, 2005________________tcCalendar 2.0_________________mxmus@yandex.ru
Lister-plugin f�r den Total Commander
________________________________________________________________________________
- �bersetzung: Dieter Rehfeld (Germany) / (aktualisiert von Kurt Lettmaier)
________________________________________________________________________________
I. DESCRIPTION:
 Universeller Kalender.
 Erlaubt die Verwendung allgemeiner und pers�nlicher Termine in Kategorien und Begrenzung der Anzeige.
 F�r die meisten Termintypen werden besondere Formate unterst�tzt:
  - relativ zu Orthodoxem Ostern             - relativ zu Katholischem Ostern
  - nach Nummer des Wochentages im Monat     - Julianische Kalendertermine
  - bewegliche Termine                       - sich wiederholende Termine
  - spezielle Termine
 Sie k�nnen nahezu jedes Element des Kalenders nach Ihren W�nschen konfigurieren.
 Sie k�nnen die Kalendertabelle nach Excel exportieren oder als Bitmap (BMP) speichern und die Terminliste als RTF oder Volltext speichern.
 Mit dem externen Modul SunMoon.ecl kann tcCalendar Informationen zu Sonne und Mond anzeigen.
 Der Kalender hat ein mehrsprachiges Interface (Tschechisch, D�nisch, Niederl�ndisch, Englisch, Franz�sisch, Deutsch, Griechisch, Ungarisch, Italienisch, Polnisch, Rum�nisch, Russisch, Slovakisch, Slovenisch, Spanisch, Ukrainisch)
________________________________________________________________________________
II. SETUP:
 1. Archiv in ein eigenes Verzeichnis entpacken ([CLD_PATH])
    (z.B. Unterverzeichnis des Total Commander)
 2. Plugin installieren:
     - Konfigurieren -> Operation... -> Viewer/Editor -> Internen Viewer konfigurieren... -> LS-Plugins
     - tcCld zur Plugin-Liste hinzuf�gen
 3. Neues Symbol in der Symbolleiste hinzuf�gen:
     - Rechtsklick in Symbolleiste -> �ndern -> je nach gew�nschter Position "Anf�gen"
     - Felder wie folgt f�llen:
         - 'Befehl' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
         - 'Startpfad' = "[CLD_PATH]"
         - 'Icondatei' = "[CLD_PATH]\tcCld.ico" oder ein eigenes Icon ausw�hlen
         ACHTUNG: Beim Ausf�llen der Felder  k e i n e  Anf�hrungszeichen  eingeben !
 4. [optional] tcCalendar kann auch ins Starter-Men� aufgenommen werden:
     - {Starter -> Starter-Men� �ndern ... -> Hinzuf�gen ...}
     - Einen Namen f�r den Men�eintrag w�hlen (z.B. "tcCalendar")
     - Felder wie folgt f�llen:
         - 'Befehl' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
         - 'Startpfad' = "[CLD_PATH]"
         ACHTUNG: Beim Ausf�llen der Felder  k e i n e  Anf�hrungszeichen  eingeben !
 5. [optional] Wenn Punkt 4 ausgef�hrt wurde, kann ein Hotkey f�r tcCalendar festgelegt werden:
     - {Konfigurieren -> Operation ... -> Diverses}
     - gew�nschte Kombination im Bereich 'Tasenkombination umdefinieren' festlegen
     - in der 'Befehls'-Liste, Sektion "Benutzer" w�hlen Sie "cm_UserMenu" mit der Nummer, die tcCalendar im 'Starter'-Men� belegt
________________________________________________________________________________
III. TASTENBEFEHLE:
    S - Einstellungspanel an/aus
    D - Terminliste an/aus
    Y - Jahrespanel an/aus
    R - Terminliste neu laden
    C - Kalendertabelle erneut laden
    G - Scrolle Datumsliste zu gew�hltem Tag
    T - Gehe zu gew�nschtem Jahr
 NUM+ - Folgejahr
 NUM- - Vorjahr
 NUM* - Aktuelles Jahr
Notizen/Pers�nliche Termine/Feierformate bearbeiten:
 Strg+Del   - L�schen
 Strg+Ins   - Hinzuf�gen
 Strg+<     - aufw�rts bewegen (au�er f�r Feierformate)
 Strg+>     - abw�rts bewegen (au�er f�r Feierformate)
 Strg+Enter - Eingaben �bernehmen (OK-Button)
________________________________________________________________________________
IV. MAUSAKTIONEN:
Jahrespanel:
 Doppelklick      - Gehe zu gew�nschtem Jahr
Kalendertabelle:
 Doppelklick      - Notizen bearbeiten
 Strg+Linksklick  - Feiern bearbeiten
 Shift+Linksklick - Pers�nliche Termine bearbeiten
 Mittelklick      - Scrolle Terminliste zu diesem Tag
________________________________________________________________________________
V. DATEIEN:
Terminsets:
 [CLD_PATH]\Dates\*.cdt - Allgemeine Termine
 [CLD_PATH]\Dates\*.pdt - pers�nliche Termine und Hinweise
 [CLD_PATH]\Dates\*.edt - weitere Terminsetzungen (z.B. Namenstage)
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - Beispieldateien (ggf. nach "[CLD_PATH]\Dates", wenn
                                           diese benutzt werden sollen)
Externe Module:
 [CLD_PATH]\ExLib\*.ecl
 [CLD_PATH]\ExLib\SunMoon.ecl - Modul zur Anzeige von Informationen zu Sonne und Mond
     SunMoon.ecl kann bei http://maximus.in.ua heruntergeladen werden
Schriftschemen:
 [CLD_PATH]\FontScheme\*.fnt
 [CLD_PATH]\tcCld.fnt - Aktuelles Schriftschema
Sprachdateien:
 [CLD_PATH]\Language\*.lng
Hilfedateien:
 [CLD_PATH]\ReadMe\readme_*.txt
_______________________________________________________________________________
VI. FORMAT OF FILES OF DATES SETS:
_______________________________________________________________________________________________
� | Typ | Abschnitt     | Format             | Erl�uterung
__|_____|_______________|____________________|_________________________________________________
1 | pdt |[Notes]        | tt.mm.jjjj=Notizen | Notiz
  |     |               |                    | tt = Tag (2-stellig)
  |     |               |                    | mm = Monat (2-stellig)
  |     |               |                    | jjjj - Jahr (4-stellig)
__|_____|_______________|____________________|_________________________________________________
2 |.cdt |[MainDates]    | tt.mm=Termine      | Einfache Termine
  |     |[Dates]        |                    | tt = Tag (2-stellig)
  |     |[Religious]    |                    | mm = Monat (2-stellig)
__|     |[PersonalDates]|____________________|_________________________________________________
3 |.pdt |[Celebrations] | ROEx=Termine       | Termin relativ zum orthodoxen Osterfest
  |.edt |[Extended]     |                    | x = <Zahl>   Osterfest + x Tage
  |     |               |                    | x = -<Zahl>  Osterfest - x Tage
__|     |               |____________________|_________________________________________________
4 |     |               | RCEx=Termine       | Termin relativ zum rk/ev Osterfest
  |     |               |                    | x = <Zahl>   Osterfest + x Tage
  |     |               |                    | x = -<Zahl>  Osterfest - x Tage
__|     |               |____________________|_________________________________________________
5 |     |               | WDMdn=Termine      | Termin durch Anzahl von Tagen erreichent
  |     |               |                    |                  (f�r alle Monate)
  |     |               |                    | d = <Wochentag>
  |     |               |                    |                          0-Sonntag
  |     |               |                    | n = <Anzahl Tag vom Monatsanfang gez�hlt>
  |     |               |                    | n = -<Anzahl Tag vom Monatsende gez�hlt>
__|     |               |____________________|_________________________________________________
6 |     |               | WDMdn.mm=Termin    | Termin durch Anzahl von Tagen erreichent
  |     |               |                    |             (f�r konkrete Monate)
  |     |               |                    | d = <Wochentag>
  |     |               |                    |                          0-Sonntag
  |     |               |                    | n = <Anzahl Tag vom Monatsanfang gez�hlt>
  |     |               |                    | n = -<Anzahl Tag vom Monatsende gez�hlt>
  |     |               |                    | mm = Monat (2-stellig)
__|     |               |____________________|______________________________________
7.|     |               | PDw.dd=Termine     | Besonderer Termin
  |     |               |                    | w = <Wochentag>
  |     |               |                    | dd = <Tag>
__|     |               |____________________|______________________________________
8.|     |               | PDYnnn=Termine     | BESONDERES DATUM
  |     |               |                    | nnn = <Tag_im_Jahr>
__|     |               |____________________|______________________________________
9.|     |               | Jdd.mm=Termine     | Julianisches Kalenderdatum
  |     |               |                    | dd = <Monat>
  |     |               |                    | mm = <Tag>
__|_____|_______________|____________________|______________________________________
1 |.pdt |[PersonalDates]|CDzzz:tt.mm.jjjj    | Zyklischer Termin
0.|     |               | -tt.mm.jjjj=Termine| ccc = <Zyklus> (Termin wird nach der Anzahl
  |     |               |                    |                dieser Tage wiederholt)
  |     |               |                    | tt.mm.jjjj (erste Gruppe) =
  |     |               |                    |                <linke Begrenzung (Anfang)>
  |     |               |                    | tt.mm.jjjj (zweite Gruppe) =
  |     |               |                    |                <rechte Begrenzung (Ende)>
__|_____|_______________|____________________|______________________________________
1 |.cdt |[MainDates]    |MDdate:l,r>dt       | Verschiebbarer Termin (Kurzformat)
1.|     |[Dates]        |          =Termine  | l = <links_Wochentag>
  |.pdt |[PersonalDates]|                    | r = <rechts_Wochentag>
  |     |[Celebrations] |                    | t = <Ziel_Wochentag>
  |     |               |                    |               l,r,t - [0..6] 0-Sonntag
  |.edt |[Extended]     |                    | d = <Bewegungsrichtung>
  |     |               |                    |                N - nachfolgend, P - vorher
  |     |               |                    | i = <ignorieren>
  |     |               |                    |                 I - wird nur angezeigt,
  |     |               |                    |                     falls verschoben
  |     |               |                    | date = Terminformate 2,3,4
__|     |               |____________________|______________________________________
1 |     |               |MDdate:l1,r1>dt1    | Verschiebbarer Termin (Langformat)
2.|     |               |  :l2,r2>dt2        |           wie Kurzformat,
  |     |               |          =Termine  |           aber enth�lt zwei Bedingungen
__|     |               |____________________|______________________________________
1 |     |               |MDdd.mm:WDMwn>      | Verschiebbarer Termin (relatives Format)
3.|     |               |    WDMwn.mm        | dd = <Tag>
  |     |               |          =Termine  | mm = <Monat>
  |     |               |                    | w = <Wochentag>
  |     |               |                    |                       [0..6] 0-Sonntag
  |     |               |                    | n = <Anzahl relativ zum Monatsbeginn>
  |     |               |                    | n = -<Anzahl relativ zum Monatsende>
__|     |               |____________________|______________________________________
1 |     |               | MDdate:WDMwn.mm>   | Bewegliches Datum (Oster relatives Format)
4.|     |               |     WDMwn.mm=����  | w = <Wochentag>
  |     |               |                    |                       [0..6] 0-Sunday
  |     |               |                    | n = <Zahl_relativ_zu_Monatsbeginn>
  |     |               |                    | n = -<Zahl_relativ_zu_Monatsende>
  |     |               |                    | date = Terminformate 3,4
__|_____|_______________|____________________|______________________________________
Hinweise:
  1. Termin = Termin_1%Termin_2 ... %nTermin_X
       F�r Geburtstage - .PDT [Celebrations]:
       date_i = Geburtstag_Name#Geburtstag_Beginn_Jahr#Formatnummer
       format_number = Formatnummer in Formatliste (>=-1, -1 - Standardformat)
                                Einstellungspanel->Termine->Einstellungen->Schaltfl�che '>'}
  2. Notiz = Notiz_1%nNotiz_2 ... %nNotiz_X
  3. Allgemeines Format beweglicher Termine:
       MDsource_date:Verschiebungsbedingung>Zieldatum
       MDsource_date:Verschiebungsbedingung_1>Zieldatum_1:Verschiebungsbedingung_2>Zieldatum_2 (langes Format)
  4. Es ist m�glich, Notizen und einfache Termine (dd.mm) sowie Feiern im Kalender
     zu bearbeiten: siehe Mausaktionen.
_______________________________________________________________________________________________
BEISPIELE:
  ROE0=orth. Osterfest               23.04=Johns Geburtstag%nPeters Geburtstag
  ROE49=orth .Trinitatis             WDM02=zweiter Sonntag eines jeden Monats
  ROE-7=orth. Palmsonntag            WDM3-1=letzter Mittwoch eines jeden Monats
  RCE0=rk/ev Osterfest               WDM51.11=erster Frreitag im November
  PD5.13=Freitag, der 13.
  PDY256=Tag des Programmierers

  J25.12=Weihnachten
         Die orthodoxe Kirche feiert Weihnachten (und m�glicherweise andere
         Termine) im alten Stil (Julianischer Kalender).
         Der Unterschied zwischen Gregorianischem und Julianischem Kalender
         betr�gt zur Zeit 13 Tage, wird aber ab 1. M�rz 2100 14 Tage betragen
         und betrug vor 1. M�rz 1900 12 Tage.
  CD015:14.09.2005-03.05.2006=Irgednetwas (wird alle 15 Tage wiederholt, beginnend am
                              14.09.2005 und endend am 03.05.2006)
  MD02.04:2,3>P1:4,5>N1=2. April     Feiertag in Argentinien
                       Falls der 2. April auf einen Dienstag oder Mittwoch f�llt, dann
                       f�llt der Feiertag auf den davorliegenden Montag;
                       Falls es ein Donnerstag oder Freitag ist, so f�llt der Feiertag
                       auf den folgenden Montag; in allen anderen F�llen wird er nicht
                       bewegt.
  MD01.01:6,6>N1:0,0>N1=Zus�tzlicher Feiertag f�r Neujahr in der Ukraine
  MD01.01:6,0>N1=Zus�tzlicher Feiertag f�r Neujahr in der Ukraine
                        F�llt der Nationalfeiertag (einschl. Neujahr) auf einen
                        Sonnabend oder Sonntag, so erh�lt man einen weiteren
                        Feiertag auf den folgenden Montag.
  MD01.01:6,0>N1I=Zus�tzlicher Feiertag f�r Neujahr in der Ukraine
                  Wird 'I' am Ende des kurzen oder langen Formats des  beweglichen
                  Termins angegeben, wird der Termin nur angezeigt, wenn er bewegt
                  wird.
  MD01.05:WDM01>WDM02.05=1. Mai,Maifeiertag o.�.
                         F�llt der 1. Mai auf den ersten Sonntag im Monat, dann
                         verschiebt sich der Feiertag auf den zweiten Sonntag im Mai.
________________________________________________________________________________
VII. GEBURTSTAGSFORMAT:
 {Einstellungspanel->Termine->Einstellungen->Schaltfl�che '>'}
Spezielle Symbole:
[N] - Geburtstagsname
[Y] - Beginn des Geburtstags (z.B. Geburtsjar)
[A] - Geburtstagswiederholung in Jahren
Z.B.: Wenn in der Terminliste folgende Nachricht steht
"An diesem Tag vor 10 Jahren wurde Johnny geboren. Dies geschah 1995.",
dann ist folgendes einzugeben:
"An diesem Tag vor [A] Jahren wurde [N] geboren. Dies geschah [Y]."
W�hlen Sie dieses Format in der dritten Spalte der Tabelle �ber das
Kontextmen� des Kalenders beim Hinzuf�gen oder Bearbeiten von Geburtstagen.
________________________________________________________________________________
VIII. TERMINFORMAT:
 {Einstellungspanel->Ansicht->Andere->Datumsformat}
Spezielle Symbole:
[D] - Tag
[M] - Monatszahl
[L] - Monatsname
[A] - Alternativer Monatsname
[Y] - Jahr
[S] - Jahr (kurz)
[J] - Julianisches Datum
[W] - Wochentag
[B] - Wochentag kurz
\t  - Tab (Steht im Moment f�r Datumsliste)
Beispiel:
 Julianisches Datumsformat: j[D].[M] = j03.08
 Datumsliste Datumsformat: [D]. [L] [Y] ([J]) = 16. August 2005 (j03.08)
________________________________________________________________________________
IX. ZEITFORMAT:
 {Einstellungspanel->Zeit->Zeitformat}
Spezielle Symbole:
[H] - Stunden
[T] - Stunden (12-Stundenformat)
[M] - Minuten
[S] - Sekunden
Beispiel:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09
________________________________________________________________________________
X. TOOLTIP FORMAT:
 {Einstellungspanel->Tooltipp->Sonne und Mond->Einf�geformat}
Allgemeine spezielle Symbole:
    \n  - Neue Zeile
    \t  - Tab

HEUTE:
  Spezielle Symbole:
  [T] - Heute
Beispiel:
:::: [T] :::: = :::: Heute ::::

TERMINTYP FORMAT DER �BERSCHRIFT:
   Spezielle Symbole:
   [N] - Name des Termintyps
Beispiel:
::++ [N] ++:: = ::++ Nationalfeiertage ++::

SONNE UND MOND INFORMATIONSFORMAT:
   Spezielle Symbole:
   [SR] - Sonnenaufgangszeit
   [SS] - Sonnenuntergangszeit
   [MR] - Mondaufgangszeit
   [MS] - Monduntergangszeit
   [PP] - Mondphase (illumination percent)
   [PN] - Mondphasenname
Beispiel:
 Sonne & Mond:\nSonnenaufgang [SR]\nSonnenuntergang [SS]\nMondaufgang [MR]\nMonduntergang [MS]
 =
 Sonne & Mond:
 Sonnenaufgang 03:49
 Sonnenuntergang 20:12
 Mondaufgang 00:26
 Monduntergang 14:12
________________________________________________________________________________
XI. VERWENDETE EIGENHEITEN DER FONTPARAMETER:
 {Einstellungspanel->Schrift, Farbe usw.->Schriften}
________________________________________________________________________________
                | N/U      | U/O   | U/A
________________|__________|_______|____________________________________________
Jahr            | VA       |       |
Hintergrund     |          | FC BC | FC={Hintergrundfarbe in der Terminliste}
                |          |       | BC={Hintergrund im Kalender}
Kalenderraster  |          | BC    | BC={Rasterfarbe im Kalender}
... <Datum>     | VA HA    |       | BC={... Farbe der Markierung}
... <Text>      | VA HA BC |       |
________________|__________|_______|____________________________________________
Abk�rzungen:
 N/U - nicht verwendet  U/O - ausschlie�liche verwendet  U/A - zu verwenden als
 VA - vertikale Ausrichtung    FC - Schriftfarbe
 HA - horizontale Ausrichtung  BC - Hintergrundfarbe
________________________________________________________________________________
XII. PROBLEMBEHANDLUNG:
 In einigen Windows-Versionen (z.B. Windows 2000) wird die Terminliste nicht korrekt dargestellt.
 Um dieses Problem zu beheben, kann man die Datei "Lfw:\WINDOWS\SYSTEM32\riched20.dll" (enthalten in Windows 98 oder XP) in den entsprechenden Ordner von Windows 2000, in der Regel "Lfw:\WINNT\SYSTEM32\"
 Lfw: = Laufwerkstbuchstabe, in dem sich das entsprechende Betriebssystem befindet
________________________________________________________________________________
XIII. MATERIALIEN:
 Um Informationen zu dem f�r Sonne und Mond verwendeten Teil der TMoon-Komponente zu erhalten.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 Als anf�ngliche Information zum Erstellen einer in cities.dat des Kalender wfx-Plugins verwendeten St�dte-Standortsdatei (tcCld.lct).
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________
Versionshistorie und Originaltext des Plugin-Autors
---------------------------------------------------
[+] - hinzugef�gt  [/] - gefixt  [*] - ge�ndert
siehe "readme_eng.txt" unten
