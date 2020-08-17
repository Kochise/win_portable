© Maximus, 2005__________________tcCalendar 2.0__________________mxmus@yandex.ru
Lister-plugin for Total Commander____________________________mxmus@maximus.in.ua

I. POPIS:
Univerzální kalendáø.
Umožòuje používat obecné a osobní záznamy rùzných kategorií a možnost omezení jejich zobrazení.
Pro vìtšinu záznamù je umožnìm speciální formát:
  - relativnì ortodoxní velikonoce  - relativnì katolické velikonoce
  - urèitý den týdne v mìsíci       - data Juliánského kalendáøe
  - pohyblivé svátky                - události s opakováním
  - zvláštní události
 Vìtšinu souèástí mùžete konfigurovat jak je libo. 
 Kalendáø mùžete exportovat do excelu nebo jako obrázek (BMP) a uložit záznamy jako RTF nebo jako text.
 Použitím externího modulu SunMoon.ecl tcCalendar získáte informace o slunci a mìsíci.
 Kalendáø má vícejazyèné rozhraní (Czech, Danish, Dutch, English, French, German, Hellenic, Hungarian, Italian, Polish, Romanian, Russian, Slovak, Slovenian, Spanish, Ukrainian)

________________________________________________________________________________


II. INSTALACE:
 1. Rozbalte archiv do zvoleného adresáøe ([CLD_PATH])
 2. Nainstalujte plugin:
     - {Konfigurace->Nastavení...->Prohlížení->Konfigurace interního prohlížeèe...->Zás. moduly}
     - pøidejte tcCld do seznamu
 3. Pøidejte nové tlaèítko do lišty:
     - {Konfigurace->Tlaèítková lišta...->Pøidat}
     - vyplòte pole následujícím zpùsobem:
        - 'Pøíkaz' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Cesta' = "[CLD_PATH]"
        - 'Soubor ikon' = "[CLD_PATH]\tcCld.ico" nebo Vaše vlastní ikona
     Poznámka: všechno pište bez uvozovek
 4. |volitelné| Mùžete pøidat tcCalendar do nabídky 'Start':
     - {Start->Zmìna Start Menu...->Pøidat položku}
     - vložte název položky (napøíklad: "tcKalendáø")
     - vyplòte pole následujícím zpùsobem:
        - 'Pøíkaz' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Výchozí adresáø' = "[CLD_PATH]"
     Poznámka: všechno pište bez uvozovek
 5. |volitelné| Jestliže máte proveden 4. bod, mùžete nastavit klávesovou zkratku pro tcCalendar:
     - {Konfigurace->Nastavení...->Rùzné}
     - zvolte vhodnou kombinaci kláves ve skupinì 'Pøemapování klávesnice'
     - V oknì 'Pøíkaz', sekce "User" zvolte "cm_UserMenu" s èíslem tcCalendar ve 'Start' menu


________________________________________________________________________________

III. KLÁVESNICE:

    S  -  zobrazit/skrýt panel nastavení
    D  -  zobrazit/skrýt panel dat
    Y  -  zobrazit/skrýt rok
    R  -  obnovení výpisu událostí
    C  -  znovunaètení kalendáøe
    G  -  posunout výpis záznamù k oznaèenému dnu
    T  -  pøejít na požadovaný rok
 NUM+  -  další rok
 NUM-  -  pøedchozí rok
 NUM*  -  aktuální rok

Editace záznamù:
 Ctrl+Del   - smazat záznam
 Ctrl+Ins   - pøidat záznam
 Ctrl+<     - posun nahoru (mimo oslav)
 Ctrl+>     - posun dolu (mimo oslav)
 Ctrl+Enter - potvrzení zmìn (tlaèítko 'OK')
________________________________________________________________________________
IV. MYŠ:
Year panel:
 Dvoj-klik           - pøejít na požadovaný rok

V kalendáøi:
 Dvoj-klik           - editace záznamù
 Ctrl+levé tlaèítko  - editace oslav
 Shift+levé tlaèítko - editace osobních záznamù
 Prostøední tlaèítko - posun výpis záznamù na tento den
________________________________________________________________________________
V. DATOVÉ SOUBORY:
 [CLD_PATH]\Dates\*.cdt - obecné svátky
 [CLD_PATH]\Dates\*.pdt - osobní záznamy
 [CLD_PATH]\Dates\*.edt - rozšíøené svátky
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - pøíklady datových souborù (pro zkopírování do "[CLD_PATH]\Dates")
Externí moduly:
 [CLD_PATH]\ExLib\*.ecl
 [CLD_PATH]\ExLib\SunMoon.ecl - modul pro získání informací o Slunci a Mìsíci
 SunMoon.ecl mùžete stáhnout z http://maximus.in.ua/
Schema fontù:
 [CLD_PATH]\FontScheme\*.fnt
 [CLD_PATH]\tcCld.fnt - aktuální schema fontù
Jazykové soubory:
 [CLD_PATH]\Language\*.lng
Soubory s nápovìdou:
 [CLD_PATH]\ReadMe\readme_*.txt
________________________________________________________________________________
VI. FORMÁT DATOVÝCH SOUBORÙ
________________________________________________________________________________
è|Typ |Sekce          |Formát            |Komentáø
_|____|_______________|__________________|______________________________________
1|pdt |[Notes]        |dd.mm.yyyy=záznamy|záznam
 |    |               |                  |dd = <den>
 |    |               |                  |mm = <mìsíc>
 |    |               |                  |yyyy = <rok>
_|____|_______________|__________________|______________________________________
2|cdt |[MainDates]    |dd.mm=události    |prostý záznam
 |    |[Dates]        |                  |dd = <den>
 |    |[Religious]    |                  |mm = <mìsíc>
_|    |[PersonalDates]|__________________|______________________________________
3|pdt |[Celebrations] |ROEx=události     |relativní datum od pravoslavných velikonoc
 |edt |[Extended]     |                  |x = <dny_pøed>
 |    |               |                  |x = -<dny_po>
_|    |               |__________________|______________________________________
4|    |               |RCEx=události     |relativní datum od katolických velikonoc
 |    |               |                  |x = <dny_pøed>
 |    |               |                  |x = -<dny_po>
_|    |               |__________________|______________________________________
5|    |               |WDMwn=události    |událost konkrétní den týdne v mìsíci
 |    |               |                  |                  (pro všechny mìsíce)
 |    |               |                  |w = <den_v_týdnu>
 |    |               |                  |                     [0..6]  0-nedìle
 |    |               |                  |n = <poøadí_od_zaèátku_mìsíce>
 |    |               |                  |n = -<poøadí_od_konce_mìsíce>
_|    |               |__________________|______________________________________
6|    |               |WDMwn.mm=události |událost konkrétní den týdne v mìsíci
 |    |               |                  |                 (pro konkrétní mìsíc)
 |    |               |                  |w = <den_v_týdnu>  
 |    |               |                  |                      [0..6]  0-nedìle
 |    |               |                  |n = <poøadí_od_zaèátku_mìsíce>
 |    |               |                  |n = -<poøadí_od_konce_mìsíce>
 |    |               |                  |mm = <mìsíc>
_|    |               |__________________|______________________________________
7|    |               |PDw.dd=událost    |Zvláštní událost
 |    |               |                  |w = <den_v_týdnu>
 |    |               |                  |dd = <den>
_|    |               |__________________|______________________________________
8|    |               |PDYnnn=událost    |Zvláštní událost
 |    |               |                  |nnn = <den_v_roce>
_|    |               |__________________|______________________________________
9|    |               |Jdd.mm=událost    |Událost podle juliánského kalendáøe
 |    |               |                  |dd = <den>
 |    |               |                  |mm = <mìsíc>
_|____|_______________|__________________|______________________________________
1|pdt |[PersonalDates]|CDccc:dd.mm.yyyy  |opakující se událost
0|    |               |  -dd.mm.yyyy     |ccc = <dny_v_cyklu>  
 |    |               |  =události       |
 |    |               |                  |dd.mm.yyyy (první skupina) = <zaèátek>
 |    |               |                  |                     <poèáteèní_datum>
 |    |               |                  |dd.mm.yyyy (druhá skupina) =
 |    |               |                  |                    <koneèné_datum>
_|____|_______________|__________________|______________________________________
1|.cdt|[MainDates]    |MDdate:l,r>dti    |Pohyblivý záznam (krátký formát)
1|    |[Dates]        |           =záznam|l = <levý_den_v_týdnu>
 |    |[Religious]    |                  |r = <pravý_den_v_týdnu>
 |.pdt|[PersonalDates]|                  |t = <cílový_den_v_týdnu>
 |    |[Celebrations] |                  |               l,r,t - [0..6] 0-nedìle
 |.edt|[Extended]     |                  |d = <smìr_pøesunu>
 |    |               |                  |                N - další, P - pøedchzí
 |    |               |                  |i = <ignorovat>
 |    |               |                  |                 I - bude zobrazeno pouze
 |    |               |                  |             v pøípadech když se pøesouvá
 |    |               |                  |date = datumový formát 2,3,4
_|    |               |__________________|______________________________________
1|    |               |MDdate:l1,r1>dt1  |Pohyblivý záznam (dlouhý formát)
2|    |               |:l2,r2>dt2i=záznam|                    jako krátký formát,
 |    |               |                  |             ale obsahuje dvì podmínky
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |Pohyblivý záznam (relativní formát)
3|    |               |   WDMwn.mm=záznam|dd = <den>
 |    |               |                  |mm = <mìsíc>
 |    |               |                  |w = <den_v_týdnu>
 |    |               |                  |                       [0..6] 0-nedìle
 |    |               |                  |n = <relativnì_poèet_mìsícù_zaèátek>
 |    |               |                  |n = -<relativnì_poèet_mìsícù_konec>
_|    |               |__________________|______________________________________
1|    |               |MDdate:WDMwn.mm>  |Movable date (Easter relative format)
4|    |               |   WDMwn.mm=záznam|w = <den_v_týdnu>
 |    |               |                  |                       [0..6] 0-nedìle
 |    |               |                  |n = <relativnì_poèet_mìsícù_zaèátek>
 |    |               |                  |n = -<relativnì_poèet_mìsícù_konec>
 |    |               |                  |date = datumový formát 3,4
_|____|_______________|__________________|______________________________________

POZNÁMKY:
  1. záznamy = záznam_1%nzáznam_2%n ... %nzáznam_X
       pro oslavy - .pdt [Celebrations]:
       záznam_i = jméno oslavy#poèáteèní_rok_oslavy#èíslo_formátu
       èíslo_formátu = èíslo_formátu v seznamu formátù (>=-1, -1 - defaultní formát)
                                           {Volby->Svátky->Nastavení->Tlaèítko '>'}
  2. události = událost_1%nudálost_2%n ... %nudálost_X
  3. Obecný formát pohyblivých událostí:
       MDvýchozí_datum:podmínka_pøesunu>cílové_datum
       MDvýchozí_datum:podmínka_pøesunu_1>cílové_datum_1:podmínka_pøesunu_2>cílové_datum_2 (dlouhý formát)
  4. Záznamy je možné editovat pøímo z kalendáøe (viz MYŠ)
________________________________________________________________________________
PØÍKLADY:
  ROE0=Velikonoce              23.04=John - narozeniny%nPetr - narozeniny
  ROE49=Trinity                WDM02=druhá nedìle v mìsíci (každý mìsíc)
  ROE-7=Palm Sunday            WDM3-1=poslední støeda v mìsíci (každý mìsíc)
  RCE0=Katolické velikonoce    WDM51.11=první pátek v listopadu
  PD5.13=pátek 13.
  PDY256=Den programátorù


  J25.12=vánoce
    Pravoslavná církev slaví vánoce (a možná i jiné svátky) starým zpùsobem
    (Juliánský kalendáø)
    Nyní je rozdíl mezi Gregoriánským a Juliánským kalendáøem 13 dní, ale od
    1. bøezna 2100 to bude 14 dní, a pøed 1. bøeznem 1900 to bylo 12 dní.
  CD015:14.09.2005-03.05.2006=Cyklická událost
    bude se opakovat každých 15 dní poèínaje 14.09.2005, ale ne po 03.05.2006
  MD02.04:2,3>P1:4,5>N1=2.dubna svátek v Argentinì
    Jestliže 2.dubna je úterý nebo støeda, potom se svátek pøesouvá na pøedchozí Pondìlí,
    když je to ètvrtek nebo pátek - na následující pondìlí, v ostatních pøípadech se nepøesouvá.
  MD01.01:6,6>N1:0,0>N1=Dodateèný svátek Nového roku na Ukrajinì
         MD01.01:6,0>N1=Dodateèný svátek Nového roku na Ukrajinì
    Na Ukrajinì, jestliže je státní svátek (vèetnì Nového roku) v sobotu nebo v nedìli,
    potom se pøidává jeden svátek na následující pondìlí.
  MD01.01:6,0>N1I=Dodateèný svátek Nového roku na Ukrajinì
    Jestliže je pøidáno 'I' na konci pohyblivé události v krátkém nebo dlouhém formátu,
    potom se záznam zobrazí pouze když dojde k pøesunu.

  MD01.05:WDM01>WDM02.05=1.kvìtna svátek kdekoliv
    Jestliže 1.kvìtna je první nedìle v mìsíci, potom se svátek pøesouvá na druhou nedìli v kvìtnu.

________________________________________________________________________________

VII. FORMÁT OSLAV:
 {Volby->Svátky->Nastavení->Tlaèítko '>'}
Speciální symboly:
[N] - Jméno oslavy
[Y] - Poèáteèní rok
[A] - Výroèí oslavy
Napøíklad, pokud chcete vidìt tento text:
"Je to pøesnì 10 let, co se nám narodil Filip. Toto štìstí nás postihlo v roce 1995."
musíte vytvoøit následující formát:
"Je to pøesnì [A] let, co se nám narodil [N]. Toto štìstí nás postihlo v roce [Y]."
a zvolit tento formát pøi editaci oslavy (kalendáø - kontextové menu) ve tøetím sloupci tabulky.
________________________________________________________________________________

VIII. FORMÁT DATA:
 {Volby->Zobrazení->Ostatní->Formát data}
Speciální symboly:
[D] - Den
[M] - Mìsíc èíslem
[L] - Mìsíc slovnì
[A] - Mìsíc slovnì (2. pád)
[Y] - Rok
[S] - Rok zkrácenì
[J] - Juliánské datum
[W] - Den v týdnu
[B] - Zkratka dne v týdnu
 \t - tabulátor (pro výpis událostí)

Pøíklad:
 Juliánské datum: j[D].[M] = j03.08
 Formát data ve výpisu: [L] [D], [Y] ([J]) = Srpen 16, 2005 (j03.08)
                        [D].[A] [Y] = 16.srpna 2005
________________________________________________________________________________
IX. FORMÁT ÈASU:
 {Volby->Èas->Formát èasu}
Speciální symboly:
[H] - Hodiny
[T] - Hodiny (12-hodinový formát)
[M] - Minuty
[S] - Sekundy
Pøíklady:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09
________________________________________________________________________________
X. FORMÁT HLAVIÈKY TYPU DATA:
 {Volby->Nápovìdný text->Obsah nápovìdných textù->Upravit formát}
Obecné speciální symboly:
\n  - nový øádek
\t  - tabulátor

Dnes:
  Speciální symboly:
    [T] - Dnes
  Pøíklad:
    :::: [T] :::: = :::: Dnes ::::

Hlavièka typu svátku:
  Speciální symboly:
    [N] - Jméno typu svátku
  Pøíklad:
    ::++ [N] ++:: = ::++ Státní svátek ++::
________________________________________________________________________________
Formát informací o Slunci a Mìsíci:
  Speciální symboly:
    [SR] - Východ Slunce
    [SS] - Západ Slunce
    [MR] - Východ Mìsíce
    [MS] - Západ Mìsíce
    [PP] - Fáze Mìsíce (v procentech)
    [PN] - Jméno mìsíèní fáze

  Pøíklad:
     Slunce & Mìsíc:\nSlunce vychází v [SR] a zapadá v [SS]\nMìsíc vychází v [MR] a zapadá v [MS]\nFáze Mìsíce: "[PN]" [PP]%
     =
     Slunce & Mìsíc:
     Slunce vychází v 03:52 a zapadá v 20:13
     Mìsíc vychází v 12:17 a zapadá v 00:36
     Fáze Mìsíce: "První ètvr" 50%
________________________________________________________________________________

XI. POUŽITÍ PARAMETRÙ PRO FORMÁT FONTÙ:
 {Volby->Zobrazení->Písma}
________________________________________________________________________________
                | N/U      | U/O   | U/A
________________|__________|_______|____________________________________________
Rok             | VA       |       |
Pozadí          |          | FC BC | FC={barva pozadí seznamu událostí}
                |          |       | BC={barva pozadí kalendáøe}
Møížka kalendáøe|          | BC    | BC={barva møížky}
... [Datum]     | VA HA    |       | BC={... znaèka barvy}
... [Text]      | VA HA BC |       |
________________|__________|_______|____________________________________________
Zkratky:
 N/U - nelze použít  U/O - lze použít  U/A - zpùsob použití
 VA - svislé zarovnání    FC - barva znakù
 HA - vodorovné zarovnání  BC - barva pozadí
________________________________________________________________________________

XII. ØEŠENÍ PROBLÉMÙ:
 V nìkterých verzích Windows (vìtšinou Windows 2000) se výpis událostí nezobrazuje korektnì.
 Pro odstranìní problému zkopírujte soubor disk:\WINDOWS\SYSTEM32\riched20.dll (z Windows 98 nebo XP) do odpovídajícího adresáøe (ve Windows 2000 - disk:\WINNT\SYSTEM32\)
     disk - disk, kde je instalován OS
________________________________________________________________________________
XIII. MATERIÁLY:
 Pro získání informací o Slunci a Mìsíci byla použita èást aplikace TMoon.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 Jako hlavní informace pro urèování souøadnic mìst (tcCld.lct) byl použit soubor cities.dat z Calendar wfx-plugin.
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________
XIV. HISTORIE:
[+] - pøidáno  [/] - opraveno  [*] - zmìnìno

[2.0]
+ uložení tabulky kalendáøe jako bitmapa (BMP) {Volby->Export}
+ schemata fontù {Volby->Zobrazení->Písma}
+ nastavení obsahu nápovìdných textù {Volby->Nápovìdný text->Obsah nápovìdných textù} (viz X. TOOLTIP FORMAT)
+ manuální zadání souøadnic {Volby->Èas a poloha}
+ nastavení pozice okna pøi spuštìní {Volby->Program}
+ tlaèítka pro skrytí výpisu událostí a zobrazení roku
+ odsazení textù {Volby->Zobrazení->Písma}
+ klávesa pro pøechod na aktuální rok - NUM*

[1.9]
+ získání informací o Slunci a Mìsíci použitím externího modulu {Volby->Nápovìdný text->Slunce a Mìsíc}
      (viz EXTERNÍ MODULY, FORMÁT INFORMACÍ O SLUNCI A MÌSÍCI)
      Výbìr mìsta a formátu èasu {Volby->Èas} (viz FORMÁT ÈASU)
+ hlavièky pro typy data v nápovìdných textech {Volby->Nápovìdný text->Hlavièka typu data}
      (viz FORMÁT HLAVIÈKY TYPU DATA)
+ den v týdnu v dlouhém formátu data a formát data ve výpisu událostí (viz FORMÁT DATA)
+ podpora pohyblivých událostí pro .cdt [Religious] a .edt [Extended]
+ nový formát pohyblivých událostí (relativní formát velikonoc)
+ možnost nastavení velikosti a skrývání panelu rok

+ soubor svátkù (Austria, German)

[1.8]
/ podpora souborù svátkù delších než 64 Kb s øetìzci delšími než 2 Kb
/ opravena chyba v pohyblivých událostech (nezobrazovalo se pøi pøesunu z pøedchozího/následujícího roku)
/ uvažován rozdíl mezi Juliánským a Gregoriánským kalendáøem pro výpoèet Ortodoxních velikonoc
+ Juliánská data v datových souborech (viz formát datových souborù/9, PØÍKLADY)
+ Juliánská data ve výpisu {Panel nastavení->Zobrazení->Ostatní->Date format} (viz FORMÁT DATA)
+ Juliánská data v nápovìdných textech kalendáøe {Panel nastavení->Svátky->Omezení +}
+ doplnìk k pohyblivým událostem ('I' klíè, viz formát datových souborù/11, PØÍKLADY)
+ doplnìk k pohyblivým událostem (limity od 6 do 2, viz PØÍKLADY)
+ doplnìk ke zvláštním událostem (den v roce, viz formát datových souborù/8, PØÍKLADY)
+ priority záznamù a formátù {Panel nastavení->Zobrazení->Priority}
+ odstavce v nápovìdných textech {Panel nastavení->Svátky->Ostatní}
+ možnost nastavení aktuálního data {kontextové menu}
+ uložení výpisu událostí i jako prostý text {Panel nastavení->Export}
+ skrytý export do excelu (rychlejší) {Panel nastavení->Export}
+ posun výpisu událostí na vybraný den (viz KLÁVESNICE, MYŠ)
+ možnost nahrát seznam událostí pro vybraný rok {Panel nastavení->Svátky->Omezení +}
+ rozšíøené kontextové menu v kalendáøi a ve výpisu událostí
+ rychlejší pøístup k editaci záznamù (viz MYŠ)
+ jazykový soubor (Hellenic)
+ soubor svátkù (Hellas, Hellenic)
+ pøíklad souboru svátkù (Hellenic)


[1.7]
+ pohyblivé události
+ zvláštní události
+ volba písma pro všechny typy záznamù v kalendáøi {Panel nastavení->Zobrazení->Písma}
+ možnost povolit/zakázat zobrazení "Dnes" {Panel nastavení->Svátky->Omezení}
+ uložení seznamu událostí do formátu RTF {Panel nastavení->Export}
+ možnost volby umístìní adresáøe záznamù {Panel nastavení->Program}
* klávesa zobrazit/skrýt panel nastavení zmìnìna na 'S'

[1.6]
+ export kalendáøe do Excelu {Panel voleb->Export}
/ opravena chyba s kontextovým menu
/ právì pøidané záznamy se objeví v kalendáøi okamžitì

[1.5]
 + editace osobních záznamù z kalendáøe {kontextové menu}
 + volitelný formát data
 + uložení pozice nemaximalizovaného okna
 * neprovádìní zápisu pokud byl program spuštìn z CD
 * výšku panelu událostí lze mìnit tažením myší
 * rozšíøené datové soubory budou vydávány samostatnì

 + jazykový soubor (Slovak)
 + soubor svátkù (Russia, Russian)
 + soubor svátkù (Slovakia, Slovak)

[1.4]
 + nová kategorie osobních záznamù - oslavy (možnost editace z kalendáøe {kontextové menu})
 + formáty upozornìní oslav (možnost editace z kalendáøe {Volby->Svátky->Nastavení->Tlaèítko '>'})
 * zmìna kláves pro editaci záznamù/svátkù (viz KLÁVESNICE)
 * odstranìno nastavení panelù - nyní se nastavení vždy ukládá
 * rozšíøeno kontextové menu kalendáøe

 + jazykový soubor (Italian)
 + readme-soubor (Romanian)
 + readme-soubor (Italian)
 + soubor svátkù (Luxembourg, French)
 + soubor svátkù (Romania, Romanian)
 + soubor svátkù (Italy, Italian)
 + pøíklad souboru svátkù (Romanian)
 + pøíklad osobních záznamù (German)

[1.3]
 + možnost použití více událostí stejného typu ve stejný den v datových souborech (symbol %n)
 * nové prostøedí pro editaci záznamù
 * {Volby->Zobrazení->Ostatní} odstranìna volba 'Tuèný rámeèek oznaèeného data', protože byl pøidán nový typ zvýraznìní - 'Tuèný rámeèek'
 + nastavení písma pro aktuální datum v kalendáøi

 + jazykový soubor (Czech)
 + jazykový soubor (Romanian)
 + readme-soubor (Czech)
 + soubor svátkù (Canada, English)
 + soubor svátkù (France, French)
 * soubor svátkù (Belgium, French)
 + soubor svátkù (Czechia, Czech)
 + rozšíøený soubor svátkù (Czech, "Name-day")

[1.2]
 + možnost použití událostí s opakováním
 + nastavení omezení pro zobrazení dat
 + možnost výbìru zpùsobu zvýraznìní dne pro jednotlivé typy dat
 * zkrácen èas pro naètení seznamu dat
 
 + soubor svátkù (Poland, Polish)

[1.1]
 / nyní seznam dat pracuje korektnì ve Windows98
 + nové typy svátkù - rozšíøené nastavení
 + možnost použití data konkrétního dne v týdnu od zaèátku nebo konce mìsíce
 + seznam fontù v oddìleném souboru
 
 + jazykový soubor (German)
 + jazykový soubor (Polish)
 + jazykový soubor (Spanish)
 + soubor svátkù (Germany, German)
 + 2 rozšíøené soubory svátkù (French, "Saint's days")
 + readme-soubor (German)
 + readme-soubor (Spanish)
 + pøíklad osobních záznamù (German)

[1.01]
 / opravena chyba nemožnosti pøidávání záznamù
 + možnost pøidání a odstranìní osobních souborù pøímo v aplikaci
 + možnost nevybrání žádného datového souboru

 + jazykový soubor (Dutch)
 + jazykový soubor (French)
 + soubor svátkù (Belgium, French)
 + readme-soubor (French)
 + pøíklad osobních záznamù (French)


