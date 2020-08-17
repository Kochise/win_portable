� Maximus, 2005__________________tcCalendar 2.0__________________mxmus@yandex.ru
Lister-plugin for Total Commander____________________________mxmus@maximus.in.ua

I. POPIS:
Univerz�ln� kalend��.
Umo��uje pou��vat obecn� a osobn� z�znamy r�zn�ch kategori� a mo�nost omezen� jejich zobrazen�.
Pro v�t�inu z�znam� je umo�n�m speci�ln� form�t:
  - relativn� ortodoxn� velikonoce  - relativn� katolick� velikonoce
  - ur�it� den t�dne v m�s�ci       - data Juli�nsk�ho kalend��e
  - pohybliv� sv�tky                - ud�losti s opakov�n�m
  - zvl�tn� ud�losti
 V�t�inu sou��st� m��ete konfigurovat jak je libo. 
 Kalend�� m��ete exportovat do excelu nebo jako obr�zek (BMP) a ulo�it z�znamy jako RTF nebo jako text.
 Pou�it�m extern�ho modulu SunMoon.ecl tcCalendar z�sk�te informace o slunci a m�s�ci.
 Kalend�� m� v�cejazy�n� rozhran� (Czech, Danish, Dutch, English, French, German, Hellenic, Hungarian, Italian, Polish, Romanian, Russian, Slovak, Slovenian, Spanish, Ukrainian)

________________________________________________________________________________


II. INSTALACE:
 1. Rozbalte archiv do zvolen�ho adres��e ([CLD_PATH])
 2. Nainstalujte plugin:
     - {Konfigurace->Nastaven�...->Prohl�en�->Konfigurace intern�ho prohl�e�e...->Z�s. moduly}
     - p�idejte tcCld do seznamu
 3. P�idejte nov� tla��tko do li�ty:
     - {Konfigurace->Tla��tkov� li�ta...->P�idat}
     - vypl�te pole n�sleduj�c�m zp�sobem:
        - 'P��kaz' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Cesta' = "[CLD_PATH]"
        - 'Soubor ikon' = "[CLD_PATH]\tcCld.ico" nebo Va�e vlastn� ikona
     Pozn�mka: v�echno pi�te bez uvozovek
 4. |voliteln�| M��ete p�idat tcCalendar do nab�dky 'Start':
     - {Start->Zm�na Start Menu...->P�idat polo�ku}
     - vlo�te n�zev polo�ky (nap��klad: "tcKalend��")
     - vypl�te pole n�sleduj�c�m zp�sobem:
        - 'P��kaz' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'V�choz� adres��' = "[CLD_PATH]"
     Pozn�mka: v�echno pi�te bez uvozovek
 5. |voliteln�| Jestli�e m�te proveden 4. bod, m��ete nastavit kl�vesovou zkratku pro tcCalendar:
     - {Konfigurace->Nastaven�...->R�zn�}
     - zvolte vhodnou kombinaci kl�ves ve skupin� 'P�emapov�n� kl�vesnice'
     - V okn� 'P��kaz', sekce "User" zvolte "cm_UserMenu" s ��slem tcCalendar ve 'Start' menu


________________________________________________________________________________

III. KL�VESNICE:

    S  -  zobrazit/skr�t panel nastaven�
    D  -  zobrazit/skr�t panel dat
    Y  -  zobrazit/skr�t rok
    R  -  obnoven� v�pisu ud�lost�
    C  -  znovuna�ten� kalend��e
    G  -  posunout v�pis z�znam� k ozna�en�mu dnu
    T  -  p�ej�t na po�adovan� rok
 NUM+  -  dal�� rok
 NUM-  -  p�edchoz� rok
 NUM*  -  aktu�ln� rok

Editace z�znam�:
 Ctrl+Del   - smazat z�znam
 Ctrl+Ins   - p�idat z�znam
 Ctrl+<     - posun nahoru (mimo oslav)
 Ctrl+>     - posun dolu (mimo oslav)
 Ctrl+Enter - potvrzen� zm�n (tla��tko 'OK')
________________________________________________________________________________
IV. MY�:
Year panel:
 Dvoj-klik           - p�ej�t na po�adovan� rok

V kalend��i:
 Dvoj-klik           - editace z�znam�
 Ctrl+lev� tla��tko  - editace oslav
 Shift+lev� tla��tko - editace osobn�ch z�znam�
 Prost�edn� tla��tko - posun v�pis z�znam� na tento den
________________________________________________________________________________
V. DATOV� SOUBORY:
 [CLD_PATH]\Dates\*.cdt - obecn� sv�tky
 [CLD_PATH]\Dates\*.pdt - osobn� z�znamy
 [CLD_PATH]\Dates\*.edt - roz���en� sv�tky
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - p��klady datov�ch soubor� (pro zkop�rov�n� do "[CLD_PATH]\Dates")
Extern� moduly:
 [CLD_PATH]\ExLib\*.ecl
 [CLD_PATH]\ExLib\SunMoon.ecl - modul pro z�sk�n� informac� o Slunci a M�s�ci
 SunMoon.ecl m��ete st�hnout z http://maximus.in.ua/
Schema font�:
 [CLD_PATH]\FontScheme\*.fnt
 [CLD_PATH]\tcCld.fnt - aktu�ln� schema font�
Jazykov� soubory:
 [CLD_PATH]\Language\*.lng
Soubory s n�pov�dou:
 [CLD_PATH]\ReadMe\readme_*.txt
________________________________________________________________________________
VI. FORM�T DATOV�CH SOUBOR�
________________________________________________________________________________
�|Typ |Sekce          |Form�t            |Koment��
_|____|_______________|__________________|______________________________________
1|pdt |[Notes]        |dd.mm.yyyy=z�znamy|z�znam
 |    |               |                  |dd = <den>
 |    |               |                  |mm = <m�s�c>
 |    |               |                  |yyyy = <rok>
_|____|_______________|__________________|______________________________________
2|cdt |[MainDates]    |dd.mm=ud�losti    |prost� z�znam
 |    |[Dates]        |                  |dd = <den>
 |    |[Religious]    |                  |mm = <m�s�c>
_|    |[PersonalDates]|__________________|______________________________________
3|pdt |[Celebrations] |ROEx=ud�losti     |relativn� datum od pravoslavn�ch velikonoc
 |edt |[Extended]     |                  |x = <dny_p�ed>
 |    |               |                  |x = -<dny_po>
_|    |               |__________________|______________________________________
4|    |               |RCEx=ud�losti     |relativn� datum od katolick�ch velikonoc
 |    |               |                  |x = <dny_p�ed>
 |    |               |                  |x = -<dny_po>
_|    |               |__________________|______________________________________
5|    |               |WDMwn=ud�losti    |ud�lost konkr�tn� den t�dne v m�s�ci
 |    |               |                  |                  (pro v�echny m�s�ce)
 |    |               |                  |w = <den_v_t�dnu>
 |    |               |                  |                     [0..6]  0-ned�le
 |    |               |                  |n = <po�ad�_od_za��tku_m�s�ce>
 |    |               |                  |n = -<po�ad�_od_konce_m�s�ce>
_|    |               |__________________|______________________________________
6|    |               |WDMwn.mm=ud�losti |ud�lost konkr�tn� den t�dne v m�s�ci
 |    |               |                  |                 (pro konkr�tn� m�s�c)
 |    |               |                  |w = <den_v_t�dnu>  
 |    |               |                  |                      [0..6]  0-ned�le
 |    |               |                  |n = <po�ad�_od_za��tku_m�s�ce>
 |    |               |                  |n = -<po�ad�_od_konce_m�s�ce>
 |    |               |                  |mm = <m�s�c>
_|    |               |__________________|______________________________________
7|    |               |PDw.dd=ud�lost    |Zvl�tn� ud�lost
 |    |               |                  |w = <den_v_t�dnu>
 |    |               |                  |dd = <den>
_|    |               |__________________|______________________________________
8|    |               |PDYnnn=ud�lost    |Zvl�tn� ud�lost
 |    |               |                  |nnn = <den_v_roce>
_|    |               |__________________|______________________________________
9|    |               |Jdd.mm=ud�lost    |Ud�lost podle juli�nsk�ho kalend��e
 |    |               |                  |dd = <den>
 |    |               |                  |mm = <m�s�c>
_|____|_______________|__________________|______________________________________
1|pdt |[PersonalDates]|CDccc:dd.mm.yyyy  |opakuj�c� se ud�lost
0|    |               |  -dd.mm.yyyy     |ccc = <dny_v_cyklu>  
 |    |               |  =ud�losti       |
 |    |               |                  |dd.mm.yyyy (prvn� skupina) = <za��tek>
 |    |               |                  |                     <po��te�n�_datum>
 |    |               |                  |dd.mm.yyyy (druh� skupina) =
 |    |               |                  |                    <kone�n�_datum>
_|____|_______________|__________________|______________________________________
1|.cdt|[MainDates]    |MDdate:l,r>dti    |Pohybliv� z�znam (kr�tk� form�t)
1|    |[Dates]        |           =z�znam|l = <lev�_den_v_t�dnu>
 |    |[Religious]    |                  |r = <prav�_den_v_t�dnu>
 |.pdt|[PersonalDates]|                  |t = <c�lov�_den_v_t�dnu>
 |    |[Celebrations] |                  |               l,r,t - [0..6] 0-ned�le
 |.edt|[Extended]     |                  |d = <sm�r_p�esunu>
 |    |               |                  |                N - dal��, P - p�edchz�
 |    |               |                  |i = <ignorovat>
 |    |               |                  |                 I - bude zobrazeno pouze
 |    |               |                  |             v p��padech kdy� se p�esouv�
 |    |               |                  |date = datumov� form�t 2,3,4
_|    |               |__________________|______________________________________
1|    |               |MDdate:l1,r1>dt1  |Pohybliv� z�znam (dlouh� form�t)
2|    |               |:l2,r2>dt2i=z�znam|                    jako kr�tk� form�t,
 |    |               |                  |             ale obsahuje dv� podm�nky
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |Pohybliv� z�znam (relativn� form�t)
3|    |               |   WDMwn.mm=z�znam|dd = <den>
 |    |               |                  |mm = <m�s�c>
 |    |               |                  |w = <den_v_t�dnu>
 |    |               |                  |                       [0..6] 0-ned�le
 |    |               |                  |n = <relativn�_po�et_m�s�c�_za��tek>
 |    |               |                  |n = -<relativn�_po�et_m�s�c�_konec>
_|    |               |__________________|______________________________________
1|    |               |MDdate:WDMwn.mm>  |Movable date (Easter relative format)
4|    |               |   WDMwn.mm=z�znam|w = <den_v_t�dnu>
 |    |               |                  |                       [0..6] 0-ned�le
 |    |               |                  |n = <relativn�_po�et_m�s�c�_za��tek>
 |    |               |                  |n = -<relativn�_po�et_m�s�c�_konec>
 |    |               |                  |date = datumov� form�t 3,4
_|____|_______________|__________________|______________________________________

POZN�MKY:
  1. z�znamy = z�znam_1%nz�znam_2%n ... %nz�znam_X
       pro oslavy - .pdt [Celebrations]:
       z�znam_i = jm�no oslavy#po��te�n�_rok_oslavy#��slo_form�tu
       ��slo_form�tu = ��slo_form�tu v seznamu form�t� (>=-1, -1 - defaultn� form�t)
                                           {Volby->Sv�tky->Nastaven�->Tla��tko '>'}
  2. ud�losti = ud�lost_1%nud�lost_2%n ... %nud�lost_X
  3. Obecn� form�t pohybliv�ch ud�lost�:
       MDv�choz�_datum:podm�nka_p�esunu>c�lov�_datum
       MDv�choz�_datum:podm�nka_p�esunu_1>c�lov�_datum_1:podm�nka_p�esunu_2>c�lov�_datum_2 (dlouh� form�t)
  4. Z�znamy je mo�n� editovat p��mo z kalend��e (viz MY�)
________________________________________________________________________________
P��KLADY:
  ROE0=Velikonoce              23.04=John - narozeniny%nPetr - narozeniny
  ROE49=Trinity                WDM02=druh� ned�le v m�s�ci (ka�d� m�s�c)
  ROE-7=Palm Sunday            WDM3-1=posledn� st�eda v m�s�ci (ka�d� m�s�c)
  RCE0=Katolick� velikonoce    WDM51.11=prvn� p�tek v listopadu
  PD5.13=p�tek 13.
  PDY256=Den program�tor�


  J25.12=v�noce
    Pravoslavn� c�rkev slav� v�noce (a mo�n� i jin� sv�tky) star�m zp�sobem
    (Juli�nsk� kalend��)
    Nyn� je rozd�l mezi Gregori�nsk�m a Juli�nsk�m kalend��em 13 dn�, ale od
    1. b�ezna 2100 to bude 14 dn�, a p�ed 1. b�eznem 1900 to bylo 12 dn�.
  CD015:14.09.2005-03.05.2006=Cyklick� ud�lost
    bude se opakovat ka�d�ch 15 dn� po��naje 14.09.2005, ale ne po 03.05.2006
  MD02.04:2,3>P1:4,5>N1=2.dubna sv�tek v Argentin�
    Jestli�e 2.dubna je �ter� nebo st�eda, potom se sv�tek p�esouv� na p�edchoz� Pond�l�,
    kdy� je to �tvrtek nebo p�tek - na n�sleduj�c� pond�l�, v ostatn�ch p��padech se nep�esouv�.
  MD01.01:6,6>N1:0,0>N1=Dodate�n� sv�tek Nov�ho roku na Ukrajin�
         MD01.01:6,0>N1=Dodate�n� sv�tek Nov�ho roku na Ukrajin�
    Na Ukrajin�, jestli�e je st�tn� sv�tek (v�etn� Nov�ho roku) v sobotu nebo v ned�li,
    potom se p�id�v� jeden sv�tek na n�sleduj�c� pond�l�.
  MD01.01:6,0>N1I=Dodate�n� sv�tek Nov�ho roku na Ukrajin�
    Jestli�e je p�id�no 'I' na konci pohybliv� ud�losti v kr�tk�m nebo dlouh�m form�tu,
    potom se z�znam zobraz� pouze kdy� dojde k p�esunu.

  MD01.05:WDM01>WDM02.05=1.kv�tna sv�tek kdekoliv
    Jestli�e 1.kv�tna je prvn� ned�le v m�s�ci, potom se sv�tek p�esouv� na druhou ned�li v kv�tnu.

________________________________________________________________________________

VII. FORM�T OSLAV:
 {Volby->Sv�tky->Nastaven�->Tla��tko '>'}
Speci�ln� symboly:
[N] - Jm�no oslavy
[Y] - Po��te�n� rok
[A] - V�ro�� oslavy
Nap��klad, pokud chcete vid�t tento text:
"Je to p�esn� 10 let, co se n�m narodil Filip. Toto �t�st� n�s postihlo v roce 1995."
mus�te vytvo�it n�sleduj�c� form�t:
"Je to p�esn� [A] let, co se n�m narodil [N]. Toto �t�st� n�s postihlo v roce [Y]."
a zvolit tento form�t p�i editaci oslavy (kalend�� - kontextov� menu) ve t�et�m sloupci tabulky.
________________________________________________________________________________

VIII. FORM�T DATA:
 {Volby->Zobrazen�->Ostatn�->Form�t data}
Speci�ln� symboly:
[D] - Den
[M] - M�s�c ��slem
[L] - M�s�c slovn�
[A] - M�s�c slovn� (2. p�d)
[Y] - Rok
[S] - Rok zkr�cen�
[J] - Juli�nsk� datum
[W] - Den v t�dnu
[B] - Zkratka dne v t�dnu
 \t - tabul�tor (pro v�pis ud�lost�)

P��klad:
 Juli�nsk� datum: j[D].[M] = j03.08
 Form�t data ve v�pisu: [L] [D], [Y] ([J]) = Srpen 16, 2005 (j03.08)
                        [D].[A] [Y] = 16.srpna 2005
________________________________________________________________________________
IX. FORM�T �ASU:
 {Volby->�as->Form�t �asu}
Speci�ln� symboly:
[H] - Hodiny
[T] - Hodiny (12-hodinov� form�t)
[M] - Minuty
[S] - Sekundy
P��klady:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09
________________________________________________________________________________
X. FORM�T HLAVI�KY TYPU DATA:
 {Volby->N�pov�dn� text->Obsah n�pov�dn�ch text�->Upravit form�t}
Obecn� speci�ln� symboly:
\n  - nov� ��dek
\t  - tabul�tor

Dnes:
  Speci�ln� symboly:
    [T] - Dnes
  P��klad:
    :::: [T] :::: = :::: Dnes ::::

Hlavi�ka typu sv�tku:
  Speci�ln� symboly:
    [N] - Jm�no typu sv�tku
  P��klad:
    ::++ [N] ++:: = ::++ St�tn� sv�tek ++::
________________________________________________________________________________
Form�t informac� o Slunci a M�s�ci:
  Speci�ln� symboly:
    [SR] - V�chod Slunce
    [SS] - Z�pad Slunce
    [MR] - V�chod M�s�ce
    [MS] - Z�pad M�s�ce
    [PP] - F�ze M�s�ce (v procentech)
    [PN] - Jm�no m�s��n� f�ze

  P��klad:
     Slunce & M�s�c:\nSlunce vych�z� v [SR] a zapad� v [SS]\nM�s�c vych�z� v [MR] a zapad� v [MS]\nF�ze M�s�ce: "[PN]" [PP]%
     =
     Slunce & M�s�c:
     Slunce vych�z� v 03:52 a zapad� v 20:13
     M�s�c vych�z� v 12:17 a zapad� v 00:36
     F�ze M�s�ce: "Prvn� �tvr�" 50%
________________________________________________________________________________

XI. POU�IT� PARAMETR� PRO FORM�T FONT�:
 {Volby->Zobrazen�->P�sma}
________________________________________________________________________________
                | N/U      | U/O   | U/A
________________|__________|_______|____________________________________________
Rok             | VA       |       |
Pozad�          |          | FC BC | FC={barva pozad� seznamu ud�lost�}
                |          |       | BC={barva pozad� kalend��e}
M��ka kalend��e|          | BC    | BC={barva m��ky}
... [Datum]     | VA HA    |       | BC={... zna�ka barvy}
... [Text]      | VA HA BC |       |
________________|__________|_______|____________________________________________
Zkratky:
 N/U - nelze pou��t  U/O - lze pou��t  U/A - zp�sob pou�it�
 VA - svisl� zarovn�n�    FC - barva znak�
 HA - vodorovn� zarovn�n�  BC - barva pozad�
________________________________________________________________________________

XII. �E�EN� PROBL�M�:
 V n�kter�ch verz�ch Windows (v�t�inou Windows 2000) se v�pis ud�lost� nezobrazuje korektn�.
 Pro odstran�n� probl�mu zkop�rujte soubor disk:\WINDOWS\SYSTEM32\riched20.dll (z Windows 98 nebo XP) do odpov�daj�c�ho adres��e (ve Windows 2000 - disk:\WINNT\SYSTEM32\)
     disk - disk, kde je instalov�n OS
________________________________________________________________________________
XIII. MATERI�LY:
 Pro z�sk�n� informac� o Slunci a M�s�ci byla pou�ita ��st aplikace TMoon.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 Jako hlavn� informace pro ur�ov�n� sou�adnic m�st (tcCld.lct) byl pou�it soubor cities.dat z Calendar wfx-plugin.
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________
XIV. HISTORIE:
[+] - p�id�no  [/] - opraveno  [*] - zm�n�no

[2.0]
+ ulo�en� tabulky kalend��e jako bitmapa (BMP) {Volby->Export}
+ schemata font� {Volby->Zobrazen�->P�sma}
+ nastaven� obsahu n�pov�dn�ch text� {Volby->N�pov�dn� text->Obsah n�pov�dn�ch text�} (viz X. TOOLTIP FORMAT)
+ manu�ln� zad�n� sou�adnic {Volby->�as a poloha}
+ nastaven� pozice okna p�i spu�t�n� {Volby->Program}
+ tla��tka pro skryt� v�pisu ud�lost� a zobrazen� roku
+ odsazen� text� {Volby->Zobrazen�->P�sma}
+ kl�vesa pro p�echod na aktu�ln� rok - NUM*

[1.9]
+ z�sk�n� informac� o Slunci a M�s�ci pou�it�m extern�ho modulu {Volby->N�pov�dn� text->Slunce a M�s�c}
      (viz EXTERN� MODULY, FORM�T INFORMAC� O SLUNCI A M�S�CI)
      V�b�r m�sta a form�tu �asu {Volby->�as} (viz FORM�T �ASU)
+ hlavi�ky pro typy data v n�pov�dn�ch textech {Volby->N�pov�dn� text->Hlavi�ka typu data}
      (viz FORM�T HLAVI�KY TYPU DATA)
+ den v t�dnu v dlouh�m form�tu data a form�t data ve v�pisu ud�lost� (viz FORM�T DATA)
+ podpora pohybliv�ch ud�lost� pro .cdt [Religious] a .edt [Extended]
+ nov� form�t pohybliv�ch ud�lost� (relativn� form�t velikonoc)
+ mo�nost nastaven� velikosti a skr�v�n� panelu rok

+ soubor sv�tk� (Austria, German)

[1.8]
/ podpora soubor� sv�tk� del��ch ne� 64 Kb s �et�zci del��mi ne� 2 Kb
/ opravena chyba v pohybliv�ch ud�lostech (nezobrazovalo se p�i p�esunu z p�edchoz�ho/n�sleduj�c�ho roku)
/ uva�ov�n rozd�l mezi Juli�nsk�m a Gregori�nsk�m kalend��em pro v�po�et Ortodoxn�ch velikonoc
+ Juli�nsk� data v datov�ch souborech (viz form�t datov�ch soubor�/9, P��KLADY)
+ Juli�nsk� data ve v�pisu {Panel nastaven�->Zobrazen�->Ostatn�->Date format} (viz FORM�T DATA)
+ Juli�nsk� data v n�pov�dn�ch textech kalend��e {Panel nastaven�->Sv�tky->Omezen� +}
+ dopln�k k pohybliv�m ud�lostem ('I' kl��, viz form�t datov�ch soubor�/11, P��KLADY)
+ dopln�k k pohybliv�m ud�lostem (limity od 6 do 2, viz P��KLADY)
+ dopln�k ke zvl�tn�m ud�lostem (den v roce, viz form�t datov�ch soubor�/8, P��KLADY)
+ priority z�znam� a form�t� {Panel nastaven�->Zobrazen�->Priority}
+ odstavce v n�pov�dn�ch textech {Panel nastaven�->Sv�tky->Ostatn�}
+ mo�nost nastaven� aktu�ln�ho data {kontextov� menu}
+ ulo�en� v�pisu ud�lost� i jako prost� text {Panel nastaven�->Export}
+ skryt� export do excelu (rychlej��) {Panel nastaven�->Export}
+ posun v�pisu ud�lost� na vybran� den (viz KL�VESNICE, MY�)
+ mo�nost nahr�t seznam ud�lost� pro vybran� rok {Panel nastaven�->Sv�tky->Omezen� +}
+ roz���en� kontextov� menu v kalend��i a ve v�pisu ud�lost�
+ rychlej�� p��stup k editaci z�znam� (viz MY�)
+ jazykov� soubor (Hellenic)
+ soubor sv�tk� (Hellas, Hellenic)
+ p��klad souboru sv�tk� (Hellenic)


[1.7]
+ pohybliv� ud�losti
+ zvl�tn� ud�losti
+ volba p�sma pro v�echny typy z�znam� v kalend��i {Panel nastaven�->Zobrazen�->P�sma}
+ mo�nost povolit/zak�zat zobrazen� "Dnes" {Panel nastaven�->Sv�tky->Omezen�}
+ ulo�en� seznamu ud�lost� do form�tu RTF {Panel nastaven�->Export}
+ mo�nost volby um�st�n� adres��e z�znam� {Panel nastaven�->Program}
* kl�vesa zobrazit/skr�t panel nastaven� zm�n�na na 'S'

[1.6]
+ export kalend��e do Excelu {Panel voleb->Export}
/ opravena chyba s kontextov�m menu
/ pr�v� p�idan� z�znamy se objev� v kalend��i okam�it�

[1.5]
 + editace osobn�ch z�znam� z kalend��e {kontextov� menu}
 + voliteln� form�t data
 + ulo�en� pozice nemaximalizovan�ho okna
 * neprov�d�n� z�pisu pokud byl program spu�t�n z CD
 * v��ku panelu ud�lost� lze m�nit ta�en�m my��
 * roz���en� datov� soubory budou vyd�v�ny samostatn�

 + jazykov� soubor (Slovak)
 + soubor sv�tk� (Russia, Russian)
 + soubor sv�tk� (Slovakia, Slovak)

[1.4]
 + nov� kategorie osobn�ch z�znam� - oslavy (mo�nost editace z kalend��e {kontextov� menu})
 + form�ty upozorn�n� oslav (mo�nost editace z kalend��e {Volby->Sv�tky->Nastaven�->Tla��tko '>'})
 * zm�na kl�ves pro editaci z�znam�/sv�tk� (viz KL�VESNICE)
 * odstran�no nastaven� panel� - nyn� se nastaven� v�dy ukl�d�
 * roz���eno kontextov� menu kalend��e

 + jazykov� soubor (Italian)
 + readme-soubor (Romanian)
 + readme-soubor (Italian)
 + soubor sv�tk� (Luxembourg, French)
 + soubor sv�tk� (Romania, Romanian)
 + soubor sv�tk� (Italy, Italian)
 + p��klad souboru sv�tk� (Romanian)
 + p��klad osobn�ch z�znam� (German)

[1.3]
 + mo�nost pou�it� v�ce ud�lost� stejn�ho typu ve stejn� den v datov�ch souborech (symbol %n)
 * nov� prost�ed� pro editaci z�znam�
 * {Volby->Zobrazen�->Ostatn�} odstran�na volba 'Tu�n� r�me�ek ozna�en�ho data', proto�e byl p�id�n nov� typ zv�razn�n� - 'Tu�n� r�me�ek'
 + nastaven� p�sma pro aktu�ln� datum v kalend��i

 + jazykov� soubor (Czech)
 + jazykov� soubor (Romanian)
 + readme-soubor (Czech)
 + soubor sv�tk� (Canada, English)
 + soubor sv�tk� (France, French)
 * soubor sv�tk� (Belgium, French)
 + soubor sv�tk� (Czechia, Czech)
 + roz���en� soubor sv�tk� (Czech, "Name-day")

[1.2]
 + mo�nost pou�it� ud�lost� s opakov�n�m
 + nastaven� omezen� pro zobrazen� dat
 + mo�nost v�b�ru zp�sobu zv�razn�n� dne pro jednotliv� typy dat
 * zkr�cen �as pro na�ten� seznamu dat
 
 + soubor sv�tk� (Poland, Polish)

[1.1]
 / nyn� seznam dat pracuje korektn� ve Windows98
 + nov� typy sv�tk� - roz���en� nastaven�
 + mo�nost pou�it� data konkr�tn�ho dne v t�dnu od za��tku nebo konce m�s�ce
 + seznam font� v odd�len�m souboru
 
 + jazykov� soubor (German)
 + jazykov� soubor (Polish)
 + jazykov� soubor (Spanish)
 + soubor sv�tk� (Germany, German)
 + 2 roz���en� soubory sv�tk� (French, "Saint's days")
 + readme-soubor (German)
 + readme-soubor (Spanish)
 + p��klad osobn�ch z�znam� (German)

[1.01]
 / opravena chyba nemo�nosti p�id�v�n� z�znam�
 + mo�nost p�id�n� a odstran�n� osobn�ch soubor� p��mo v aplikaci
 + mo�nost nevybr�n� ��dn�ho datov�ho souboru

 + jazykov� soubor (Dutch)
 + jazykov� soubor (French)
 + soubor sv�tk� (Belgium, French)
 + readme-soubor (French)
 + p��klad osobn�ch z�znam� (French)


