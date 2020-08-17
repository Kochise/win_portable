� Maximus, 2005__________________tcCalendar 1.4__________________mxmus@yandex.ru
::::Extensie Lister pentru Total Commander

DESCRIERE:
 Calendar universal.
 Permite folosirea unor date generale �i personale din diferite categorii.
 Are formate speciale pentru majoritatea tipurilor de date, prin care e configurat� prezentarea datelor (Pa�tele adecvat, numerotarea s�pt�m�nilor �n lun�, date cu un animit ciclu).
 Calendarul con�ine o list� de date, av�nd posibilitatea stabilirii anumitor limite.
 Calendarul �i datele au o mul�ime �nsemnat� de op�iuni de prezentare.
 Format configurabil al datelor.
 Posibilitatea export�rii calendarului �n format Excel.
 Interfa�� multilingv� (ceh�, englez�, francez�, german�, italian�, olandez�, polon�, rom�n�, rus�, slovac�, spaniol�, ucrainean�)

INSTALARE:
 1. Despacheteaz� arhiva �n directorul dorit ([CALE_CALENDAR])
 2. Instaleaz� extensia:
     - {Configurare->Op�iuni...->Editare/Vizualizare->Configurare vizor intern...->Plug-in-uri LS} sau {Configurare->Op�iuni->Plug-in-uri->Plug-in-uri pentru Lister->Configurare}
     - adaug� tcCld �n lista extensiilor
 3. Adaug� un buton �n trusa cu butoane:
     - {Configurare->Modific� trusa de butoane...->Adaug�}
     - completeaz� rubricile astfel:
        - 'Comand�' = "cm_List [CALE_CALENDAR]\tcCld.TCCALENDAR"
        - 'Porne�te din' = "[CALE_CALENDAR]"
        - 'Fi�ier simbol' = "[CALE_CALENDAR]\tcCld.ico" sau alege singur simbolul
     NOT�: nu include ghilimelele la completarea rubricilor
 4. |op�ional| Po�i include tcCalendar �n meniul 'Start':
     - {Start->Modificare Meniu Start...->Adaug�...}
     - scrie numele elementului din meniu (de exemplu "tcCalendar")
     - completeaz� rubricile astfel:
        - 'Comand�' = "cm_List [CALE_CALENDAR]\tcCld.TCCALENDAR"
        - 'Dosar ini�ial' = "[CALE_CALENDAR]"
     NOT�: nu include ghilimelele la completarea rubricilor
 5. |op�ional| Dac� ai executat punctul 4, po�i asocia o combina�ie de taste pentru tcCalendar:
     - {Configurare->Op�iuni...->Diverse}
     - alege combina�ia dorit� �n grupul 'Redefinire hotkeys'
     - �n rubrica 'Comanda', sec�iunea "User", alege "cm_UserMenu" cu num�rul avut de tcCalendar �n meniul 'Start'

COMENZI TASTATUR�:
 NUM+ - anul urm�tor
 NUM- - anul anterior
    S - expunere/ascundere panou op�iuni
    D - show/hide dates list
    R - re�nc�rcare list� date
    C - re�nc�rcare calendar date
Panouri noti�e �i anivers�ri:
 Ctrl+Del   - eliminare
 Ctrl+Ins   - ad�ugare
 Ctrl+<     - urcare (cu excep�ia formatelor anivers�rilor)
 Ctrl+>     - cobor�re (cu excep�ia formatelor anivers�rilor)
 Ctrl+Enter - aplicarea modific�rilor (butonul 'OK')

MAUS:
 Clic pe an - alegerea anului dorit
 Clic dublu pe o dat� - redactare noti�e
 Clic dreapta (meniu contextual) - redactare noti�e, anivers�ri

FI�IERELE SETURILOR DE DATE:
 [CALE_CALENDAR]\Dates\*.cdt - seturi de date generale
 [CALE_CALENDAR]\Dates\*.pdt - seturi de date personale �i noti�e
 [CALE_CALENDAR]\Dates\*.edt - seturi de date suplimentare
 [CALE_CALENDAR]\Dates\Void\*.cdt,*.pdt,*.edt - modele de seturi de date (pentru utilizare trebuie copiate �n "[CALE_CALENDAR]\Dates")

Formatul fi�ierelor de date:
_________________________________________________________________________________
0 |Tip |Sec�iune       |Format            |Observa�ii
__|____|_______________|__________________|______________________________________
1 |.pdt|[Noti�e]       |zz.ll.aaaa=noti�� |e mai convenabil� redactarea noti�elor
  |    |               |                  |            �n tcCalendar (clic dublu)
  |    |               |                  |zz = ziua (2 cifre)
  |    |               |                  |ll = luna (2 cifre)
  |    |               |                  |aaaa = anul (4 cifre)
__|____|_______________|__________________|______________________________________
2 |.cdt|[DateDeBaz�]   |zz.ll=denumire    |zz = ziua (2 cifre)
  |    |[Date]         |                  |ll = luna (2 cifre)
__|    |[Religioase]   |__________________|______________________________________
3 |.pdt|[DatePersonale]|ROEx=denumire     |relativ la Pa�tele ortodox
  |    |[Anivers�ri]   |                  |x = <zile>    Pa�te ortodox + x zile
  |.edt|[Suplimentare] |                  |x = -<zile>   Pa�te ortodox - x zile
__|    |               |__________________|______________________________________
4 |    |               |RCEx=denumire     |relativ la Pa�tele catolic
  |    |               |                  |x = <zile>    Pa�te catolic + x zile
  |    |               |                  |x = -<zile>   Pa�te catolic - x zile
__|    |               |__________________|______________________________________
5 |    |               |WDMzn=denumire    |o zi dintr-o s�pt�m�n� dintr-o lun�
  |    |               |                  |                     (oricare lun�)
  |    |               |                  |z = <ziua_din_s�pt�m�n�>
  |    |               |                  |			[0..6] 0=Duminic�
  |    |               |                  |n = <nr_s�pt_de_la_�nceputul_lunii>
  |    |               |                  |n = -<nr_s�pt_p�n�_la_sf�r�itul_lunii>
__|    |               |__________________|______________________________________
6 |    |               |WDMzn.ll=denumire |o zi dintr-o s�pt�m�n� dintr-o lun�
  |    |               |                  |                   (o anumit� lun�)
  |    |               |                  |z = <ziua_din_s�pt�m�n�>  
  |    |               |                  |			[0..6] 0=Duminic�
  |    |               |                  |n = <nr_s�pt_de_la_�nceputul_lunii>
  |    |               |                  |n = -<nr_s�pt_p�n�_la_sf�r�itul_lunii>
  |    |               |                  |ll = luna (2 cifre)
__|    |               |__________________|_______________________________________
7 |pdt |               |PDz.zz:denumire   |dat� particular�
  |    |               |                  |z = <ziua_din_s�pt�m�n�>
  |    |               |                  |zz = <ziua>
__|____|_______________|__________________|______________________________________
8 |.pdt|[DatePersonale]|CDccc:zz.ll.aaaa  |evenimente desf�urate ciclic
  |    |               | -zz.ll.aaaa=text |ccc = <ciclu> (evenimentul se repet�
  |    |               |                  |            dup� acest num�r de zile)
  |    |               |                  |zz.ll.aaaa (primul grup) =
  |    |               |                  |                     <dat�_pornire>
  |    |               |                  |zz.ll.aaaa (al doilea grup) =
  |    |               |                  |                    <dat�_terminare>
__|____|_______________|__________________|______________________________________
9 |.cdt|[DateDeBaz�]   |MDdate:s,d>mz     |Dat� mobil� (form� scurt�)
  |    |[Date ]        |             =text|s = <ziua din s�pt�m�n�, de la st�nga>
  |.pdt|[DatePersonle] |                  |d = <ziua din s�pt�m�n�, de la dreapta>
  |    |[Anivers�ri]   |                  |z = <ziua-�int� din sp�t�m�n�>
  |    |               |                  |              s,d,z - [0..6] 0=Duminic�
  |    |               |                  |m = <sensul mobilit��ii>
  |    |               |                  |                N - next, P - previous
  |    |               |                  |text = dat�, �n formatele 2,3,4
 _|    |               |__________________|______________________________________
10|    |               |MDdate:s1,d1>mz1  |Dat� mobil� (form� lung�)
  |    |               |   :s2,d2>mz2=text|                   ca �n forma scurt�,
  |    |               |                  |             dar include dou� condi�ii
 _|    |               |__________________|______________________________________
11|    |               |MDzz.ll:WDMsn>    |Dat� mobil� (form� relativ�)
  |    |               |     WDMsn.ll=text|zz = <ziua>
  |    |               |                  |ll = <luna>
  |    |               |                  |s = <ziua_din_s�pt�m�n�>
  |    |               |                  |			[0..6] 0=Duminic�
  |    |               |                  |n = <num�rul lunii de �nceput>
  |    |               |                  |n = -<num�rul lunii de sf�r�it>
 _|____|_______________|__________________|______________________________________
NOTE:
  1. text = text_1%ntext_2%n ... %ntext_X
       pentru anivers�ri - .pdt [Anivers�ri]:
       text_i = nume_aniversare#an_ini�ial_aniversare#num�r_format
       num�r_format = num�rul formatului �n list� (>=-1, -1 este formatul standard)
                                       {Op�iuni->Date->Seturi->butonul '>'}
  2. notes = noti�e = Noti�a_1%nNoti�a_2%n ... %nNoti�a_X
  Noti�ele �i datele simple (zz.ll), inclusiv anivers�rile,
     pot fi editate din tcCalendar (vezi MAUS)
________________________________________________________________________________
EXEMPLE:
  ROE0=Pa�tele ortodox         23.04=Ziua lui Ion%nZiua lui Petre
  ROE49=Rusaliile              WDM02=a doua duminic� din fiecare lun�
  ROE-7=Floriile               WDM3-1=ultima miercuri din fiecare lun�
  RCE0=Pa�tele catolic         WDM51.11=prima vineri din noiembrie
  PD5.13=Vineri, 13            CD015:14.09.2005-03.05.2006=eveniment ciclic
                                 (se repet� la fiecare 15 zile, din
                                 14.09.2005 �i p�n� cel t�rziu la 03.05.2006)
  MD02.04:2,3>P1:4,5>N1=2 aprilie, s�rt�toare �n Argentina
    Dac� 2 aprilie este mar�i sau miercuri, s�rb�toarea se mut� �n lunea anterioar�,
    dac� e joi sau vineri - lunea urm�toare, altfel nu se mut�.
  MD01.01:6,6>N1:0,0>N1=S�rb�toare suplimentar� de anul nou �n Ucraina
    �n Ucraina, dac� o s�rb�toare na�ional� (inclusiv Anul Nou) cade s�mb�ta sau duminica,
    atunci e liber� �i lunea care urmeaz�.
  MD01.05:WDM01>WDM02.05=1 Mai, s�rb�toare undeva
    Dac� 1 mai cade duminica, s�rb�toarea se mut� �n duminica urm�toare.
________________________________________________________________________________

FORMAT ANIVERS�RI:
 {Op�iuni->Date->Seturi->butonul '>'}
Simboluri speciale:
[N] - Nume aniversare
[Y] - An ini�ial aniversare
[A] - Dat� aniversare
De exemplu, pentru a se vedea �n lista datelor mesajul urm�tor:
"�n aceast� zi, acum 10 ani, s-a n�scut Ionic�. Evenimentul s-a petrecut �n anul 1995."
trebuie s� scrii:
"�n aceast� zi, acum [A] ani, s-a n�scut [N]. Evenimentul s-a petrecut �n anul [Y]."
�i s� alegi acest format c�nd adaugi/editezi anivers�ri (meniu contextual calendar)
    �n coloana a treia a tabelului.
________________________________________________________________________________

FORMAT DATE:
 {Op�iuni->Aspect->Diverse->Format dat�}
Simboluri speciale:
[D] - Zi
[M] - Num�r lun�
[L] - Nume lun�
[A] - Abreviere lun�
[Y] - An
[S] - An din 2 cifre
 \t - tab (pentru lista datelor)
 \\ - \
Exemplu: [Y], [D], [L] = 2005, 16 august
________________________________________________________________________________
PARTICULARIZAREA SCRISULUI:
 {Op�iuni->Aspect->Litere}
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
 AV - aliniere pe vertical�    CT - culoare text
 AO - aliniere pe orizontal�  CF - culoare fundal
________________________________________________________________________________

DEPANARE:
 �n anumite versiuni de Windows (de exemplu, Windows 2000), lista datelor e afi�at� incorect.
 Pentru corectarea acestei disfunc�ii, copiaz� fi�ierul
    disc:\WINDOWS\SYSTEM32\riched20.dll (din Windows 98 sau XP) �n dosarul adecvat
    (�n Windows 2000 - disc:\WINNT\SYSTEM32\).
     disc = discul pe care e instalat Windows

ISTORIC:
[+] - ad�ugare  [/] - corectare  [*] - modificare

[1.7]
+ date mobile
+ date particulare
+ formate de litere �n calendar pentru toate tipurile de date {Op�iuni->Aspect->Litere}
+ posibilitate activare/dezactivare afi�are "Ast�zi" {Op�iuni->Date->Limit�ri}
+ salvare liste date �n format RTF {Op�iuni->Exportare}
+ stabilire dosar "Date" de c�tre utilizator {Op�iuni->Program}
* expunere/ascundere panou cu tasta 'S'

[1.6]
+ exportare calendar �n format Excel {Op�iuni->Exportare}
/ reparare eroare cu meniul contextual (creare cu erori)
/ datele ad�ugate apar �ntotdeauna corect �n calendar

[1.5]
 + modificare date personale din calendar {meniu contextual}
 + format date
 + re�inere dimensiuni fereastr� nemaximizat� a calendarului
 * f�r� �ncercare de scriere �n fi�iere la rularea de pe un CD
 * modificare �n�l�ime list� prin tragere cu mausul
 * seturile de date suplimentare vor fi �ntr-un pachet distinct

[1.4]
 + tip nou de date personale - anivers�ri (posibilitate redactare din calendar {meniu contextual})
 + formate prezentare anivers�ri (posibilitate stabilire din calendar {Op�iuni->Date->Seturi->buton '>'})
 * modificare taste redactare noti�e/anivers�ri (vezi COMENZI TASTATUR�)
 * eliminare op�iuni panouri - acum starea e memorat� �ntotdeauna (�n�l�imea panoului datelor a fost mutat� �n {Op�iuni->Aspect})
 * meniu contextual extins al calendarului

[1.3]
 + posibilitate folosire mai multe evenimente de acela�i tip �n aceea�i zi dintr-un set de date (delimitare prin %n)
 * interfa�� nou� pentru redactarea noti�elor
 * {Op�iuni->Aspect->Diverse} eliminare 'Ram� groas� dat� curent�', fiindc� a fost ad�ugat un nou tip de marcaj - 'Chenar gros'
 + format litere dat� curent� �n calendar

 + fi�ier limb� (ceh�)
 + fi�ier limb� (rom�n�)
 + fi�ier info (ceh�)
 + set date (Canada, englez�)
 + set date (Fran�a, francez�)
 * set date (Belgia, francez�)
 + set date (Cehia, ceh�)
 + set date suplimentare (Cehia, "Onomastici")

[1.2]
 + posibilitate folosire evenimente ciclice
 + limit�ri prezentare date
 + posibilitate alegere tipuri de marcaj pentru tipuri de date
 * �nc�rcare mai rapid a listei datelor
 * modific�ri �n structura op�iunilor
 + set date (Polonia, polonez�)

[1.1]
 / prezentare corect� list� date �n Windows 98
 + tip nou de date - set suplimentar
 + posibilitatea folosirii datei ca num�r al zilei dintr-o anumit� s�pt�m�n� a lunii (relativ la �nceputul sau sf�r�itul lunii)
 + op�iuni litere �n fi�ier distinct
 * modific�ri �n structura op�iunilor

 + fi�ier limb� (german�)
 + fi�ier limb� (polonez�)
 + fi�ier limb� (spaniol�)
 + set date (Germania, german�)
 + 2 seturi date suplimentare (Fran�a, "Zilele sfin�ilor")
 + fi�ier info (german�)
 + fi�ier info (spaniol�)
 + model date personale (german�)

[1.01]
 / disfunc�ie - imposibilitate ad�ugare noti�e
 + posibilitate ad�ugare �i eliminare seturi de date personale direct din aplica�ie
 + posibilitate omitere alegere vreun set de date

 + fi�ier limb� (olandez�)
 + fi�ier limb� (francez�)
 + set date (Belgia, Fran�a)
 + fi�ier info (francez�)
 + model date personale (francez�)

