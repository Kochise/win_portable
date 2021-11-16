© Maximus, 2005__________________tcCalendar 2.0__________________mxmus@yandex.ru
::::Plugin Visualizzatore per Total Commander
________________________________________________________________________________
I. DESCRIZIONE:
 Calendario universale, con possibilità di inserire date personali in diverse categorie.
 Per la maggior parte delle date sono disponibili formati particolari per definire date:
 - in relazione alla Pasqua ortodossa,
 - in relazione alla Pasqua cattolica,
 - in base al numero del giorno della settimana nel mese
 - per date "mobili", che cambiano di anno in anno,
 - per date che si ripetono ciclicamente,
 - per date particolari,
 - per date del calendario giuliano.
 E' possibile definire e personalizzare a piacimento qualsiasi elemento del calendario.
 E' possibile esportare il calendario in Excel o salvarlo come immagine bitmap (BMP), e salvare la lista date in formato RTF o formato testo.
 Attraverso il modulo esterno SunMoon.ecl tcCalendar può ricavare informazioni sul Sole e sulla Luna.
 L'interfaccia è disponibile in ceco, danese, olandese, inglese, francese, tedesco, greco, ungherese, italiano, polacco, romeno,
 russo, slovacco, sloveno, spagnolo e ucraino.
________________________________________________________________________________
II. INSTALLAZIONE:
 Se si apre l'archivio all'interno di TotalCommander è possibile seguire la procedura automatica
 per l'installazione del plugin e passare direttamente al punto 3. In caso contrario:

 1. Scompattare l'archivio in una cartella ([CLD_PATH])
 2. Installazione plugin:
     - {Configurazione->Opzioni...->Visualizzatore/Editor->Configura visualizzatore interno...->Plugin}
     - Aggiungi tcCld alla lista dei plugin
 3. Aggiunta di un pulsante alla barra:
     - {Configurazione->Modifica barra pulsanti...->Aggiungi}
     - riempi i campi come segue:
        - 'Comando' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Percorso' = "[CLD_PATH]"
        - 'File icona' = "[CLD_PATH]\tcCld.ico" o scegli l'icona che preferisci
     NOTA: digitare le stringhe senza virgolette
 4. |opzionale| Aggiunta di tcCalendar al menu di Avvio di TotalCommander:
     - {Avvio->Modifica menu avvio...->Aggiungi...}
     - Inserisci un titolo per l'opzione del menu  (per esempio: "tcCalendar")
     - Riempi i campi come segue:
        - 'Comando' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Percorso' = "[CLD_PATH]"
     NOTA: digitare le stringhe senza virgolette
 5. |opzionale| Se tcCalendar è stato aggiunto al menu di Avvio (punto 4) si può definire una combinazione
     di tasti per avviare il plugin:
     - {Configurazione->Opzioni...->Misc.}
     - Scegli la combinazione di tasti nella sezione 'Ridefinizione tasti di scelta rapida'
     - Nella lista 'Comando' sottostante, scorri fino alla sezione "User" e seleziona "cm_UserMenu" con il numero
       corrispondente a quello che tcCalendar ha nel menu di Avvio.
_____________________________________________________________________________________________________
III. TASTIERA:
    S - mostra/nascondi il pannello delle opzioni
    D - mostra/nascondi il pannello delle date
    Y - mostra/nascondi l'intestazione anno
    R - ricarica la lista delle date
    C - Aggiorna il pannello del calendario
    G - scorri la lista date al giorno selezionato
    T - vai all'anno...
 NUM+ - anno successivo
 NUM- - anno precedente
 NUM* - anno corrente
Modifiche alle note, alle ricorrenze, alle date personali e ai formati:
 Ctrl+Del   - elimina
 Ctrl+Ins   - aggiungi
 Ctrl+<     - sposta su (esclusi i formati delle ricorrenze)
 Ctrl+>     - sposta giù (esclusi i formati delle ricorrenze)
 Ctrl+Enter - applica i cambiamenti
_____________________________________________________________________________________________________
IV. MOUSE:
Intestazione anno:
 Doppio click    - Vai all'anno...
Calendario:
 Doppio click su un giorno  - modifica note
 Ctrl+tasto sinistro        - modifica ricorrenze
 Shift+tasto sinistro       - modifica date personali
 Tasto centrale             - scorre la lista date al giorno indicato
_____________________________________________________________________________________________________
V. FILE:
Set delle date:
 [CLD_PATH]\Dates\*.cdt - set delle date più comuni
 [CLD_PATH]\Dates\*.pdt - set delle date e delle note personali
 [CLD_PATH]\Dates\*.edt - set esteso delle date
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - esempi di set di date (da copiare in "[CLD_PATH]\Dates"
                                           nel caso si voglia utilizzarli)
Moduli esterni:
 [CLD_PATH]\ExLib\*.ecl
 [CLD_PATH]\ExLib\SunMoon.ecl - modulo per ottenere informazioni su Sole e Luna
     Il modulo SunMoon.ecl è disponibile sul sito http://maximus.in.ua
Impostazioni caratteri:
 [CLD_PATH]\FontScheme\*.fnt
 [CLD_PATH]\tcCld.fnt - impostazioni caratteri correnti
File lingue:
 [CLD_PATH]\Language\*.lng
File Aiuto:
 [CLD_PATH]\ReadMe\readme_*.txt
_____________________________________________________________________________________________________
VI. FORMATO FILE DEI SET DELLE DATE:
_____________________________________________________________________________________________________
N|Tipo|Sezione        |Formato                        |Commenti
_|____|_______________|_______________________________|______________________________________________
1|.pdt|[Notes]        |gg.mm.aaaa=nota                |Note
 |    |               |                               |gg = <numero> (giorno)
 |    |               |                               |mm = <numero> (mese)
 |    |               |                               |aaaa = <numero> (anno)
_|____|_______________|_______________________________|______________________________________________
 |    |               |gg.mm=descrizione data         |Data semplice
2|.cdt|[MainDates]    |                               |gg = <numero> (giorno)
 |    |[Dates]        |                               |mm = <numero> (mese)
_|    |[Religious]    |_______________________________|______________________________________________
3|.pdt|[PersonalDates]|ROEx=descrizione data          |Data calcolata in relazione alla Pasqua
 |    |[Celebrations] |                               |                              ortodossa
 |.edt|[Extended]     |                               |x = <numero>  (x giorni dopo Pasqua)
 |    |               |                               |x = -<numero> (x giorni prima di Pasqua)
_|    |               |_______________________________|______________________________________________
4|    |               |RCEx=descrizione data          |Data calcolata in relazione alla Pasqua
 |    |               |                               |                              cattolica
 |    |               |                               |x = <numero>  (x giorni dopo Pasqua)
 |    |               |                               |x = -<numero> (x giorni prima di Pasqua)
_|    |               |_______________________________|______________________________________________
5|    |               |WDMsn=descrizione data         |Data calcolata in base al giorno della
 |    |               |                               | settimana nel mese (per tutti i mesi)
 |    |               |                               |s = <numero> (giorno della settimana,
 |    |               |                               |              [0...6], 0=Domenica)
 |    |               |                               |n = <numero> (giorni successivi all'inizio del
 |    |               |                               |                                          mese
 |    |               |                               |n = -<numero> (giorni che precedono la fine 
 |    |               |                               |                                   del mese
_|    |               |_______________________________|______________________________________________
6|    |               |WDMsn.mm=descrizione data      |Data calcolata in base al giorno della
 |    |               |                               |settimana nel mese (solo per il mese indicato)
 |    |               |                               |g = <numero> (giorno della settimana, 
 |    |               |                               |              0=Domenica, 1=Lunedì, ecc.)
 |    |               |                               |n = <numero> (giorni successivi all'inizio del
 |    |               |                               |                                          mese
 |    |               |                               |n = -<numero> (giorni che precedono la fine 
 |    |               |                               |                                   del mese
 |    |               |                               |mm = <numero> (mese, 2 caratteri)
_|    |               |_______________________________|______________________________________
7|    |               |PDs.dd=descrizione data        |Data particolare
 |    |               |                               |s = <numero> (giorno della settimana)
 |    |               |                               |gg = <numero> (giorno)
_|____|_______________|_______________________________|______________________________________________
8|    |               |PDYnnn=descrizione data        |Data particolare
 |    |               |                               |nnn = <numero> (giorno nell'anno)
_|    |               |_______________________________|______________________________________
9|    |               |Jgg.mm=descrizione data        |Data del calendario giuliano
 |    |               |                               |gg = <numero> (giorno)
 |    |               |                               |mm = <numero> (mese)
_|____|_______________|_______________________________|______________________________________
1|.pdt|[PersonalDates]|CDccc:gg.mm.aaaa               |data ciclica
0|    |               | -gg.mm.aaaa=descrizione data  |ccc = <numero> (la data si ripeterà dopo questo
 |    |               |                               |                numero di giorni, 3 caratteri)
 |    |               |                               |gg.mm.aaaa = <prima data,
 |    |               |                               |              data di inizio dei cicli>
 |    |               |                               |gg.mm.aaaa = <seconda data,
 |    |               |                               |              data della fine dei cicli>
_|____|_______________|_______________________________|______________________________________________
1|.cdt|[MainDates]    |MDdate:s,d>do                  |Data mobile (formato breve)
1|    |[Dates]        |              =descrizione data|s = <giorno della settimana a sinistra>
 |    |[Religious]    |                               |d = <giorno della settimana a destra>
 |.pdt|[PersonalDates]|                               |o = <giorno della settimana obiettivo>
 |    |[Celebrations] |                               |               s,d,o - [0..6] 0-Domenica
 |.edt|[Extended]     |                               |d = <direzione>
 |    |               |                               |                   N - prossima, P - precedente
 |    |               |                               |i = <ignora>                   
 |    |               |                               |                   
 |    |               |                               |                   I - mostrata solo nel caso in
 |    |               |                               |                   cui si sia mossa
 |    |               |                               |data = formati data 2,3,4
_|    |               |_______________________________|______________________________________________
1|    |               |MDdate:s1,d1>do1               |Data mobile (formato lungo)
2|    |               |    :s2,d2>do2=descrizione data|           come il formato breve,
 |    |               |                               |           ma contiene due condizioni
_|    |               |_______________________________|______________________________________________
1|    |               |MDgg.mm:WDMsn>                 |Data mobile (formato relativo)
3|    |               |      WDMwn.mm=descrizione data|dd = <giorno>
 |    |               |                               |mm = <mese>
 |    |               |                               |s = <giorno della settimana>
 |    |               |                               |                     [0..6] 0=Domenica
 |    |               |                               |n = <numero> (in relazione all'inizio del mese)
 |    |               |                               |n = -<numero> (in relazione alla fine del mese)
_|    |               |_______________________________|______________________________________________
1|    |               |MDdate:WDMsn.mm>               |Data mobile (Formato relativo alla Pasqua)
4|    |               |     WDMsn.mm=¤ âë             |s = <giorno della settimana>
 |    |               |                               |                     [0..6] 0=Domenica
 |    |               |                               |n = <numero in relazione all'inizio del mese>
 |    |               |                               |n = -<numero in relazione alla fine del mese>
 |    |               |                               |data = formati data 3,4
_|____|_______________|_______________________________|______________________________________________
NOTE:
  1. date = Descrizione_1%nDescrizione_2%n ... %nDescrizione_N
     per le ricorrenze - .pdt [Celebrations]:
     date_i = nome_festività#anno_inizio_ricorrenza#numero_formato
     numero_formato = numero formato nella lista formati (>=0, 0=formato predefinito)
                                       {Opzioni->Date->Set->Pulsante '>'}

  2. note = Nota_1%nNota_2%n ... %nNota_N
  3. Formato comune delle date mobili:
       MDsource_date:move_condition>target_date
       MDsource_date:move_condition_1>target_date_1:move_condition_2>target_date_2 (long format)
  4. E' possibile modificare note, date semplici (gg.mm) e festività all'interno di tcCalendar (vedi MOUSE)
__________________________________________________________________________________
ESEMPI:
  ROE0=Pasqua ortodossa                  23.04=Compleanno di Giovanni%nCompleanno di Pietro
  ROE40=Trinità                          WDM02=seconda domenica di ogni mese
  ROE-7=Domenica delle Palme (ortodossa) WDM3-1=ultimo mercoledì di ogni mese
  RCE0=Pasqua cattolica                  WDM51.11=primo venerdì di novembre
  RCE-7=Domenica delle Palme (cattolica)
  PD5.13=Venerdì 13
  PDY256="Festa del programmatore" (256esimo giorno dell'anno)
  
  J25.12=Natale
    La Chiesa Ortodossa celebra il Natale (e forse altre date) in base al calendario giuliano.
    Per ora la differenza tra il calendario giuliano e quello gregoriano è di 13 giorni, ma
    dal primo marzo 2100 sarà di 14 giorni, e prima del primo marzo 1900 era di 12 giorni.
  CD015:14.09.2005-03.05.2006=Evento Quindicinale
    (l'"Evento Quindicinale" si ripeterà ogni 15 giorni, a partire dal 14 settembre 2005 e non oltre il 3 marzo 2006)
  MD02.04:2,3>P1:4,5>N1=2 aprile, festa in Argentina
    Se il 2 di aprile è martedì o mercoledì, allora la festa è spostata al lunedì precedente,
    se è giovedì o venerdì, al lunedì successivo, in tutti gli altri casi non è spostata.
  MD01.01:6,6>N1:0,0>N1=Festa aggiuntiva per il nuovo anno in Ucraina
    In Ucraina, se una festa nazionale (incluso il primo dell'anno) cade di sabato o di domenica,
    si festeggia anche il lunedì successivo.
  MD01.01:6,0>N1I=Festa aggiuntiva per il nuovo anno in Ucraina
    Se viene aggiunto 'I' alla fine di una data mobile in formato lungo o corto allora la data
    verrà mostrata solo nel caso sia stata spostata.
  MD01.05:WDM01>WDM02.05=Primo maggio, in qualche parte del mondo
    Se il primo maggio cade la prima domenica del mese, la festa è spostata alla seconda domenica di maggio.
________________________________________________________________________________
VII. FORMATO RICORRENZE:
 {Opzioni->Date->Set->Pulsante '>'}
Simboli speciali:
[N] - Nome della ricorrenza da celebrare
[Y] - Anno in cui l'evento ha avuto luogo
[A] - Numero di anni trascorsi da quando l'evento ha avuto luogo (anniversario)

Per esempio, se si vuole visualizzare nella lista date il messaggio:
"In quel giorno, 10 anni fa, è nato il nostro caro Davide. Questo memorabile evento accadde nell'anno 1995."
si deve aggiungere il formato che segue:
"In quel giorno, [A] anni fa, è nato il nostro caro [N]. Questo memorabile evento accadde nell'anno [Y]."
e si deve poi scegliere questo formato nella terza colonna della finestra delle ricorrenze (tasto destro
nella finestra del calendario, dal menu contestuale scegliere "Modifica ricorrenza").
________________________________________________________________________________
VIII. FORMATO DATE:
 {Opzioni->"Visualizzazione date->Altro->Formato data}
Simboli speciali:
[D] - Giorno
[M] - Numero del mese
[L] - Nome del mese
[A] - Nome del mese alternativo (solo per alcune lingue)
[Y] - Anno
[S] - Anno abbreviato (ultime due cifre)
[J] - Data giuliana
[W] - Giorno della settimana
[B] - Giorno della settimana breve
 \t - tabulatore (solo per la lista date)
 \\ - \
Esempi:
Formato data giuliana: j[G].[M] = j03.08
Formato data lista date: [L] [Y], [D] = 16 agosto 2005 (j03.08)
________________________________________________________________________________
IX. FORMATO ORA:
 {Opzioni->Formato ora e località->Formato ora}
Simboli speciali:
[H] - Ore
[T] - Ore (formato 12 ore)
[M] - Minuti
[S] - Secondi
Esempio:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09
________________________________________________________________________________
X. FORMATO TITOLO TIPO DATA:
 {Opzioni->Suggerimenti->Titolo tipo data->Formato}
Simboli speciali comuni:
\n  - interruzione di linea
\t  - tabulazione

Oggi:
  Simboli speciali:
    [T] - Oggi
  Esempio:
    :::: [T] :::: = :::: Oggi ::::

Formato intestazione tipo data:
  Simboli speciali:
    [N] - Nome tipo data 
  Esempio:
    ::++ [N] ++:: = ::++ Feste nazionali ++::

Formato infomazioni su Sole e Luna:
  Simboli speciali:
    [SR] - Ora alba
    [SS] - Ora tramonto
    [MR] - Ora sorgere della luna
    [MS] - Ora tramonto della luna
    [PP] - Fase lunare (percentuale illuminazione)
    [PN] - Nome fase lunare
  Esempio:
    Sole & Luna:\nIl sole sorge alle [SR]\ne tramonta alle [SS]\nLa luna sorge alle [MR]\ne tramonta alle [MS]
    =
    Sole & Luna:
    Il sole sorge alle 03:49
    e tramonta alle 20:12
    La luna sorge alle 00:26
    e tramonta alle 14:12
________________________________________________________________________________
XI. PARTICOLARITÀ NELL'USO DEI CARATTERI:
 {Opzioni->Visualizzazione date->Caratteri}
__________________________________________________________________________________
                  | N/U      | U/S   | U/C
__________________|__________|_______|____________________________________________
Anno              | AV       |       |
Sfondo            |          | FC BC | FC={colore sfondo lista date}
                  |          |       | BC={colore sfondo calendario}
Griglia calendario|          | BC    | BC={colore griglia calendario}
.. <Data>         | AV AO    |       | BC={... colore evidenziatore}
.. <Testo>        | AV AO BC |       |
__________________|__________|_______|____________________________________________
Legenda:
 N/U - non usato  U/S - usato soltanto  U/C - usato come
 AV - allineamento verticale    FC - colore carattere
 AO - allineamento orizzontale  BC - colore sfondo
__________________________________________________________________________________
XII. PROBLEMI RISOLTI:
In alcune versioni di Windows (per esempio Windows 2000) la lista date non era
visualizzata correttamente.
Per eliminare il problema copiare il file "riched20.dll" dalla cartella di sistema
(in Windows XP e 98 di solito "C:\WINDOWS\SYSTEM32\riched20.dll")
nella cartella di sistema di Windows 2000 (di solito "C:\WINNT\system32\").
________________________________________________________________________________
XIII. MATERIALI:
 Per le informazioni su Sole e Luna e per TMoon, del quale sono state utilizzate parti:
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 Per le informazioni sul formato localizzazione delle città (tcCld.lct) è stato usato
 il file cities.dat plugin wfx Calendar:
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________
XIV. HISTORY:
[+] - aggiunta  [/] - correzione  [*] - modifica

[2.0]
+ possibilità di salvare il calendario come immagine bitmap (BMP) {Pannello Opzioni->Esporta}
+ impostazioni caratteri {Pannello Opzioni->Visualizzazione Date->Caratteri}
+ setting of content of tooltip {Pannello Opzioni->Suggerimenti->Contenuto dei suggerimenti} (vedi X. FORMATO SUGGERIMENTI)
+ inserimento manuale della località {Pannello Opzioni->Formato ora e località}
+ impostazione della posizione della finestra all'avvio {Pannello Opzioni->Programma}
+ pulsanti per nascondere i pannelli Lista date e Anno
+ indentazione per l'allineamento del testo {Pannello Opzioni->Visualizzazione date->Caratteri}
+ tasto scelta rapida per tornare all'anno corrente - NUM*

[1.9]
+ informazioni su Sole e Luna attraverso un modulo esterno {Opzioni->Suggerimenti->Sole e Luna}
      (vedi MODULI ESTERNI, FORMATO INFORMAZIONI SU SOLE E LUNA)
      Scelta formato ora e città {Opzioni->Formato ora e località} (vedi FORMATO ORA)
+ titoli per tipi date nei suggerimenti {Opzioni->Suggerimenti->Titolo tipo data}
      (vedi FORMATO TITOLO TIPO DATA)
+ giorno della settimana nel formato data lungo e formato data lista date (vedi FORMATO DATA)
+ supporto date mobili per .cdt [Religious] e .edt [Extended]
+ nuovo formato date mobili (formato in relazione alla Pasqua)
+ possibilità di nascondere e ridimensionare l'intestazione dell'anno

+ set date comuni (Austria, German)

[1.8]
/ supporto per i file date con dimensioni maggiori di 64Kb e con lunghezza delle stringhe maggiore di 2Kb
/ corretto errore per date mobili (non visualizzate spostando l'anno in avanti o indietro)
/ considerata correttamente la differenza tra il calendario giuliano e gregoriano per il calcolo della
  Pasqua ortodossa
+ date giuliane nei set date (vedi gli esempi al formato file set date/9)
+ date giuliane nella lista date {Opzioni->Visualizzazione date->Altro->Formato data} (vedi FORMATO DATA)
+ date giuliane nei suggerimenti (tooltips) {Opzioni->Date->Limitazioni +}
+ aggiunta al formato date mobili (chiave 'I', vedi formato data lista date/11, ESEMPI)
+ aggiunta al formato date mobili (limiti come da 6 a 2, vedi ESEMPI)
+ aggiunta al formato date particolari (giorno nell'anno, vedi formato file lista date/8, ESEMPI)
+ priorità di date e formati {Opzioni->Visualizzazione date->Priorità}
+ paragragi nei suggerimenti(tooltips) {Opzioni->Visualizzazione date->Altro}
+ possibilità di impostare la data corrente {menu contestuale}
+ salvataggio lista date anche in formato solo testo {Opzioni->Esporta}
+ esportazione in Excel in background (più veloce) {Opzioni->Esporta}
+ scorri lista date alla data corrente (vedi TASTIERA, MOUSE)
+ possibilità di caricare la lista date per anni particolari {Opzioni->Date->Limitazioni +}
+ menu contestuale esteso per lista date e calendario
+ accesso più veloce per la modifica delle date personali e delle ricorrenze (vedi MOUSE)

[1.7]
+ date mobili
+ date particolari
+ formato carattere per tutti i tipi di date nel calendario {Opzioni->Visualizzazione date->Caratteri}
+ possibilità di attivare/disattivare la visualizzazione di "Oggi" {Opzioni->Date->Limitazioni}
+ possibilità di salvare la lista date nel formato RTF {Opzioni->Esporta}
+ user defined location of "Dates"-folder {Opzioni->Programma}
* tasto per mostrare/nascondere il pannello opzioni cambiato in 'S'

+ file lingua (ungherese)
+ set date comuni (Argentina, spagnolo)
+ set date comuni (USA, inglese)
+ set date comuni (Ungheria, ungherese)

[1.6]
+ esporta il calendario in Excel {Opzioni->Esporta}
/ corretto un errore nella creazione del menu contestuale
/ le nuove date vengono immediatamente visualizzate nel calendario

[1.5]
 + Modifica delle date personali all'interno del calendario {menu contestuale}
 + formato data
 + salva il formato della finestra del calendario non ingrandita
 * nessuna operazione di scrittura se il programma è stato eseguito da CD
 * cambia l'altezza della lista date con il semplice clicca e trascina del mouse
 * set di date estesi saranno realizzati separatamente
 
 + file lingua (slovacco)
 + set di date comuni (Russia, russo)
 + set di date comuni (Slovacchia, slovacco)

[1.4]
 + nuova categoria di date personali - ricorrenze (modificabili dal menu contestuale di tcCalendar)
 + formati messaggio per le ricorrenze (modificabili in tcCalendar {Opzioni->Date->Set->Pulsante '>'})
 * cambiati i tasti per la modifica delle note/ricorrenze (vedi TASTIERA)
 * rimosse opzioni pannelli - adesso lo stato dei pannelli è salvato ogni volta (altezza del pannello
   date spostato in {Opzioni->Visualizzazione date})
 * Modificato il menu contestuale del calendario

 + file lingua (italiano)
 + file readme (romeno)
 + file readme (italiano)
 + set date (Lussemburgo, francese)
 + set date (Romania, romeno)
 + set date (Italia, italiano)
 + esempi set date (romeno)
 + esempio set date personali (tedesco)

[1.3]
 + possibilità di attribuire più di un evento dello stesso tipo ad un unico giorno (symbolo %n)
 * nuova interfaccia per la modifica delle note
 * {Opzioni->Visualizzazione date->Altro} rimosso 'Cornice data spessa', introdotto un nuovo tipo di evidenziatore - 'Cornice spessa'
 + formattazione carattere per "data attuale"

 + file lingua (ceco)
 + file lingua (romeno)
 + file Readme (ceco)
 + set date (Canada, inglese)
 + set date (Francia, francese)
 * set date (Belgio, francese)
 + set date (Repubblica Ceca, ceco)
 + set di date esteso (in ceco, "onomastici")

[1.2]
 + possibilità di usare date che si ripetono ciclicamente
 + impostazioni per la limitazione delle date visualizzate
 + possibilità di scegliere tipo di evidenziatore per i diversi tipi di date
 * diminuito il tempo di caricamento della lista date
 * cambiamenti nella struttura delle opzioni
 + set date (Polonia, polacco)

[1.1]
 / la lista date è visualizzata correttamente sotto Windows98
 + nuovo tipo di date - set esteso
 + possibilità di usare date calcolate in base al giorno della settimana relativo
   all'inizio o alla fine del mese
 + opzioni caratteri in un file separato
 * cambiamenti nella struttura delle opzioni

 + file lingua (tedesco)
 + file lingua (polacco)
 + file lingua (spagnolo)
 + set date (Germania, tedesco)
 + 2 set estesi di date (in francese, "Santo del giorno")
 + file Readme (tedesco)
 + file Readme (spagnolo)
 + file esempio di date personali (tedesco)

[1.01]
 / bug che impediva di aggiungere note
 + possibilità di aggiungere o eliminare set di date personali dall'interno del plugin
 + possibilità di non scegliere un set di date
 + file lingua (olandese)
 + file lingua (francese)
 + set date (Belgio, francese)
 + file Readme (francese)
 + file esempio di date personali (francese)

