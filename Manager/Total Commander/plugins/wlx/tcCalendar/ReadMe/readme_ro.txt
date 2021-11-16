© Maximus, 2005__________________tcCalendar 1.4__________________mxmus@yandex.ru
::::Extensie Lister pentru Total Commander

DESCRIERE:
 Calendar universal.
 Permite folosirea unor date generale ºi personale din diferite categorii.
 Are formate speciale pentru majoritatea tipurilor de date, prin care e configuratã prezentarea datelor (Paºtele adecvat, numerotarea sãptãmânilor în lunã, date cu un animit ciclu).
 Calendarul conþine o listã de date, având posibilitatea stabilirii anumitor limite.
 Calendarul ºi datele au o mulþime însemnatã de opþiuni de prezentare.
 Format configurabil al datelor.
 Posibilitatea exportãrii calendarului în format Excel.
 Interfaþã multilingvã (cehã, englezã, francezã, germanã, italianã, olandezã, polonã, românã, rusã, slovacã, spaniolã, ucraineanã)

INSTALARE:
 1. Despacheteazã arhiva în directorul dorit ([CALE_CALENDAR])
 2. Instaleazã extensia:
     - {Configurare->Opþiuni...->Editare/Vizualizare->Configurare vizor intern...->Plug-in-uri LS} sau {Configurare->Opþiuni->Plug-in-uri->Plug-in-uri pentru Lister->Configurare}
     - adaugã tcCld în lista extensiilor
 3. Adaugã un buton în trusa cu butoane:
     - {Configurare->Modificã trusa de butoane...->Adaugã}
     - completeazã rubricile astfel:
        - 'Comandã' = "cm_List [CALE_CALENDAR]\tcCld.TCCALENDAR"
        - 'Porneºte din' = "[CALE_CALENDAR]"
        - 'Fiºier simbol' = "[CALE_CALENDAR]\tcCld.ico" sau alege singur simbolul
     NOTÃ: nu include ghilimelele la completarea rubricilor
 4. |opþional| Poþi include tcCalendar în meniul 'Start':
     - {Start->Modificare Meniu Start...->Adaugã...}
     - scrie numele elementului din meniu (de exemplu "tcCalendar")
     - completeazã rubricile astfel:
        - 'Comandã' = "cm_List [CALE_CALENDAR]\tcCld.TCCALENDAR"
        - 'Dosar iniþial' = "[CALE_CALENDAR]"
     NOTÃ: nu include ghilimelele la completarea rubricilor
 5. |opþional| Dacã ai executat punctul 4, poþi asocia o combinaþie de taste pentru tcCalendar:
     - {Configurare->Opþiuni...->Diverse}
     - alege combinaþia doritã în grupul 'Redefinire hotkeys'
     - în rubrica 'Comanda', secþiunea "User", alege "cm_UserMenu" cu numãrul avut de tcCalendar în meniul 'Start'

COMENZI TASTATURÃ:
 NUM+ - anul urmãtor
 NUM- - anul anterior
    S - expunere/ascundere panou opþiuni
    D - show/hide dates list
    R - reîncãrcare listã date
    C - reîncãrcare calendar date
Panouri notiþe ºi aniversãri:
 Ctrl+Del   - eliminare
 Ctrl+Ins   - adãugare
 Ctrl+<     - urcare (cu excepþia formatelor aniversãrilor)
 Ctrl+>     - coborâre (cu excepþia formatelor aniversãrilor)
 Ctrl+Enter - aplicarea modificãrilor (butonul 'OK')

MAUS:
 Clic pe an - alegerea anului dorit
 Clic dublu pe o datã - redactare notiþe
 Clic dreapta (meniu contextual) - redactare notiþe, aniversãri

FIªIERELE SETURILOR DE DATE:
 [CALE_CALENDAR]\Dates\*.cdt - seturi de date generale
 [CALE_CALENDAR]\Dates\*.pdt - seturi de date personale ºi notiþe
 [CALE_CALENDAR]\Dates\*.edt - seturi de date suplimentare
 [CALE_CALENDAR]\Dates\Void\*.cdt,*.pdt,*.edt - modele de seturi de date (pentru utilizare trebuie copiate în "[CALE_CALENDAR]\Dates")

Formatul fiºierelor de date:
_________________________________________________________________________________
0 |Tip |Secþiune       |Format            |Observaþii
__|____|_______________|__________________|______________________________________
1 |.pdt|[Notiþe]       |zz.ll.aaaa=notiþã |e mai convenabilã redactarea notiþelor
  |    |               |                  |            în tcCalendar (clic dublu)
  |    |               |                  |zz = ziua (2 cifre)
  |    |               |                  |ll = luna (2 cifre)
  |    |               |                  |aaaa = anul (4 cifre)
__|____|_______________|__________________|______________________________________
2 |.cdt|[DateDeBazã]   |zz.ll=denumire    |zz = ziua (2 cifre)
  |    |[Date]         |                  |ll = luna (2 cifre)
__|    |[Religioase]   |__________________|______________________________________
3 |.pdt|[DatePersonale]|ROEx=denumire     |relativ la Paºtele ortodox
  |    |[Aniversãri]   |                  |x = <zile>    Paºte ortodox + x zile
  |.edt|[Suplimentare] |                  |x = -<zile>   Paºte ortodox - x zile
__|    |               |__________________|______________________________________
4 |    |               |RCEx=denumire     |relativ la Paºtele catolic
  |    |               |                  |x = <zile>    Paºte catolic + x zile
  |    |               |                  |x = -<zile>   Paºte catolic - x zile
__|    |               |__________________|______________________________________
5 |    |               |WDMzn=denumire    |o zi dintr-o sãptãmânã dintr-o lunã
  |    |               |                  |                     (oricare lunã)
  |    |               |                  |z = <ziua_din_sãptãmânã>
  |    |               |                  |			[0..6] 0=Duminicã
  |    |               |                  |n = <nr_sãpt_de_la_începutul_lunii>
  |    |               |                  |n = -<nr_sãpt_pânã_la_sfârºitul_lunii>
__|    |               |__________________|______________________________________
6 |    |               |WDMzn.ll=denumire |o zi dintr-o sãptãmânã dintr-o lunã
  |    |               |                  |                   (o anumitã lunã)
  |    |               |                  |z = <ziua_din_sãptãmânã>  
  |    |               |                  |			[0..6] 0=Duminicã
  |    |               |                  |n = <nr_sãpt_de_la_începutul_lunii>
  |    |               |                  |n = -<nr_sãpt_pânã_la_sfârºitul_lunii>
  |    |               |                  |ll = luna (2 cifre)
__|    |               |__________________|_______________________________________
7 |pdt |               |PDz.zz:denumire   |datã particularã
  |    |               |                  |z = <ziua_din_sãptãmânã>
  |    |               |                  |zz = <ziua>
__|____|_______________|__________________|______________________________________
8 |.pdt|[DatePersonale]|CDccc:zz.ll.aaaa  |evenimente desfãºurate ciclic
  |    |               | -zz.ll.aaaa=text |ccc = <ciclu> (evenimentul se repetã
  |    |               |                  |            dupã acest numãr de zile)
  |    |               |                  |zz.ll.aaaa (primul grup) =
  |    |               |                  |                     <datã_pornire>
  |    |               |                  |zz.ll.aaaa (al doilea grup) =
  |    |               |                  |                    <datã_terminare>
__|____|_______________|__________________|______________________________________
9 |.cdt|[DateDeBazã]   |MDdate:s,d>mz     |Datã mobilã (formã scurtã)
  |    |[Date ]        |             =text|s = <ziua din sãptãmânã, de la stânga>
  |.pdt|[DatePersonle] |                  |d = <ziua din sãptãmânã, de la dreapta>
  |    |[Aniversãri]   |                  |z = <ziua-þintã din spãtãmânã>
  |    |               |                  |              s,d,z - [0..6] 0=Duminicã
  |    |               |                  |m = <sensul mobilitãþii>
  |    |               |                  |                N - next, P - previous
  |    |               |                  |text = datã, în formatele 2,3,4
 _|    |               |__________________|______________________________________
10|    |               |MDdate:s1,d1>mz1  |Datã mobilã (formã lungã)
  |    |               |   :s2,d2>mz2=text|                   ca în forma scurtã,
  |    |               |                  |             dar include douã condiþii
 _|    |               |__________________|______________________________________
11|    |               |MDzz.ll:WDMsn>    |Datã mobilã (formã relativã)
  |    |               |     WDMsn.ll=text|zz = <ziua>
  |    |               |                  |ll = <luna>
  |    |               |                  |s = <ziua_din_sãptãmânã>
  |    |               |                  |			[0..6] 0=Duminicã
  |    |               |                  |n = <numãrul lunii de început>
  |    |               |                  |n = -<numãrul lunii de sfârºit>
 _|____|_______________|__________________|______________________________________
NOTE:
  1. text = text_1%ntext_2%n ... %ntext_X
       pentru aniversãri - .pdt [Aniversãri]:
       text_i = nume_aniversare#an_iniþial_aniversare#numãr_format
       numãr_format = numãrul formatului în listã (>=-1, -1 este formatul standard)
                                       {Opþiuni->Date->Seturi->butonul '>'}
  2. notes = notiþe = Notiþa_1%nNotiþa_2%n ... %nNotiþa_X
  Notiþele ºi datele simple (zz.ll), inclusiv aniversãrile,
     pot fi editate din tcCalendar (vezi MAUS)
________________________________________________________________________________
EXEMPLE:
  ROE0=Paºtele ortodox         23.04=Ziua lui Ion%nZiua lui Petre
  ROE49=Rusaliile              WDM02=a doua duminicã din fiecare lunã
  ROE-7=Floriile               WDM3-1=ultima miercuri din fiecare lunã
  RCE0=Paºtele catolic         WDM51.11=prima vineri din noiembrie
  PD5.13=Vineri, 13            CD015:14.09.2005-03.05.2006=eveniment ciclic
                                 (se repetã la fiecare 15 zile, din
                                 14.09.2005 ºi pânã cel târziu la 03.05.2006)
  MD02.04:2,3>P1:4,5>N1=2 aprilie, sãrtãtoare în Argentina
    Dacã 2 aprilie este marþi sau miercuri, sãrbãtoarea se mutã în lunea anterioarã,
    dacã e joi sau vineri - lunea urmãtoare, altfel nu se mutã.
  MD01.01:6,6>N1:0,0>N1=Sãrbãtoare suplimentarã de anul nou în Ucraina
    În Ucraina, dacã o sãrbãtoare naþionalã (inclusiv Anul Nou) cade sâmbãta sau duminica,
    atunci e liberã ºi lunea care urmeazã.
  MD01.05:WDM01>WDM02.05=1 Mai, sãrbãtoare undeva
    Dacã 1 mai cade duminica, sãrbãtoarea se mutã în duminica urmãtoare.
________________________________________________________________________________

FORMAT ANIVERSÃRI:
 {Opþiuni->Date->Seturi->butonul '>'}
Simboluri speciale:
[N] - Nume aniversare
[Y] - An iniþial aniversare
[A] - Datã aniversare
De exemplu, pentru a se vedea în lista datelor mesajul urmãtor:
"În aceastã zi, acum 10 ani, s-a nãscut Ionicã. Evenimentul s-a petrecut în anul 1995."
trebuie sã scrii:
"În aceastã zi, acum [A] ani, s-a nãscut [N]. Evenimentul s-a petrecut în anul [Y]."
ºi sã alegi acest format când adaugi/editezi aniversãri (meniu contextual calendar)
    în coloana a treia a tabelului.
________________________________________________________________________________

FORMAT DATE:
 {Opþiuni->Aspect->Diverse->Format datã}
Simboluri speciale:
[D] - Zi
[M] - Numãr lunã
[L] - Nume lunã
[A] - Abreviere lunã
[Y] - An
[S] - An din 2 cifre
 \t - tab (pentru lista datelor)
 \\ - \
Exemplu: [Y], [D], [L] = 2005, 16 august
________________________________________________________________________________
PARTICULARIZAREA SCRISULUI:
 {Opþiuni->Aspect->Litere}
________________________________________________________________________________
                | NF	   | FD    | FC
________________|__________|_______|____________________________________________
An              | AV       |       |
Fundal          |          | CT CF | CT={culoarea fundalului listei datelor}
                |          |       | CF={culoarea fundalului calendarului}
Grilaj calendar |          | CF    | CF={culoarea grilajului calendarului}
... <Zi>        | AV AO    |       | CF={culoarea marcajului ...}
... <Text>      | AV AO CF |       |
________________|__________|_______|____________________________________________
Abrevieri:
 NF - nefolosit  FD - folosire doar  FC - folosire ca
 AV - aliniere pe verticalã    CT - culoare text
 AO - aliniere pe orizontalã  CF - culoare fundal
________________________________________________________________________________

DEPANARE:
 În anumite versiuni de Windows (de exemplu, Windows 2000), lista datelor e afiºatã incorect.
 Pentru corectarea acestei disfuncþii, copiazã fiºierul
    disc:\WINDOWS\SYSTEM32\riched20.dll (din Windows 98 sau XP) în dosarul adecvat
    (în Windows 2000 - disc:\WINNT\SYSTEM32\).
     disc = discul pe care e instalat Windows

ISTORIC:
[+] - adãugare  [/] - corectare  [*] - modificare

[1.7]
+ date mobile
+ date particulare
+ formate de litere în calendar pentru toate tipurile de date {Opþiuni->Aspect->Litere}
+ posibilitate activare/dezactivare afiºare "Astãzi" {Opþiuni->Date->Limitãri}
+ salvare liste date în format RTF {Opþiuni->Exportare}
+ stabilire dosar "Date" de cãtre utilizator {Opþiuni->Program}
* expunere/ascundere panou cu tasta 'S'

[1.6]
+ exportare calendar în format Excel {Opþiuni->Exportare}
/ reparare eroare cu meniul contextual (creare cu erori)
/ datele adãugate apar întotdeauna corect în calendar

[1.5]
 + modificare date personale din calendar {meniu contextual}
 + format date
 + reþinere dimensiuni fereastrã nemaximizatã a calendarului
 * fãrã încercare de scriere în fiºiere la rularea de pe un CD
 * modificare înãlþime listã prin tragere cu mausul
 * seturile de date suplimentare vor fi într-un pachet distinct

[1.4]
 + tip nou de date personale - aniversãri (posibilitate redactare din calendar {meniu contextual})
 + formate prezentare aniversãri (posibilitate stabilire din calendar {Opþiuni->Date->Seturi->buton '>'})
 * modificare taste redactare notiþe/aniversãri (vezi COMENZI TASTATURÃ)
 * eliminare opþiuni panouri - acum starea e memoratã întotdeauna (înãlþimea panoului datelor a fost mutatã în {Opþiuni->Aspect})
 * meniu contextual extins al calendarului

[1.3]
 + posibilitate folosire mai multe evenimente de acelaºi tip în aceeaºi zi dintr-un set de date (delimitare prin %n)
 * interfaþã nouã pentru redactarea notiþelor
 * {Opþiuni->Aspect->Diverse} eliminare 'Ramã groasã datã curentã', fiindcã a fost adãugat un nou tip de marcaj - 'Chenar gros'
 + format litere datã curentã în calendar

 + fiºier limbã (cehã)
 + fiºier limbã (românã)
 + fiºier info (cehã)
 + set date (Canada, englezã)
 + set date (Franþa, francezã)
 * set date (Belgia, francezã)
 + set date (Cehia, cehã)
 + set date suplimentare (Cehia, "Onomastici")

[1.2]
 + posibilitate folosire evenimente ciclice
 + limitãri prezentare date
 + posibilitate alegere tipuri de marcaj pentru tipuri de date
 * încãrcare mai rapid a listei datelor
 * modificãri în structura opþiunilor
 + set date (Polonia, polonezã)

[1.1]
 / prezentare corectã listã date în Windows 98
 + tip nou de date - set suplimentar
 + posibilitatea folosirii datei ca numãr al zilei dintr-o anumitã sãptãmânã a lunii (relativ la începutul sau sfârºitul lunii)
 + opþiuni litere în fiºier distinct
 * modificãri în structura opþiunilor

 + fiºier limbã (germanã)
 + fiºier limbã (polonezã)
 + fiºier limbã (spaniolã)
 + set date (Germania, germanã)
 + 2 seturi date suplimentare (Franþa, "Zilele sfinþilor")
 + fiºier info (germanã)
 + fiºier info (spaniolã)
 + model date personale (germanã)

[1.01]
 / disfuncþie - imposibilitate adãugare notiþe
 + posibilitate adãugare ºi eliminare seturi de date personale direct din aplicaþie
 + posibilitate omitere alegere vreun set de date

 + fiºier limbã (olandezã)
 + fiºier limbã (francezã)
 + set date (Belgia, Franþa)
 + fiºier info (francezã)
 + model date personale (francezã)

