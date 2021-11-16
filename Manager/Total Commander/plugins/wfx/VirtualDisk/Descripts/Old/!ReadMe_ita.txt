Virtual Disk, Version 1.30 Final
  FS-plugin per Total Commander che consente la connessione di immagini di 
  dischi come unità virtuali aggiuntive nelle Risorse del Computer. 

Autore del plugin: Konstantin Vlasov, 2009
Homepage: http://flint-inc.ru/
E-mail:   support@flint_inc.ru

Il driver è basato sul progetto open-source FileDisk by Bo Branten, 2004
Homepage: http://www.acc.umu.se/~bosse/
E-mail:   bosse@acc.umu.se


Descrizione
-----------

Questo plugin permette di connettere dei files di immagine di dischi come unità 
aggiuntive nelle Risorse del Computer. Il driver funziona solo sui sistemi 
operativi Windows 2000 e Windows XP/2003 32/64-bit.

Quando un'immagine è collegata, nelle Risorse del Computer compare una nuova 
unità. La lettera asseganta all'unità viene specificata precedentemente 
dall'utente e conterrà il contenuto del file di immagine appena collegata.   

Sono disponibili i seguenti modi di connessione:
  1. HDD - emula la presenza di un disco fisso. In questa modalità si potranno
     connettere immagini di singole partizioni formattate con filesystem di tipo
     FAT  oppure NTFS, ed anche immagini di dischi rimovibili e dischi 
     flash-drive con filesystem FAT.
  2. FDD - emula la presenza di un disco rimovibile. Permette di connettere 
     tutte le stesse immagini della modalità HDD, eccetto per le partizioni NTFS
     che non sono previste da windows nella gestione del filesystem dei
     dispositivi rimovibili. 
  3. CD/DVD -emula la presenza di dischi CD/DVD (dal punto di vista del S.O. 
     non ci sono differenze tra CD e DVD). Questo sistema viene utilizato per
     connettere immagini CD/DVD. Si potranno utilizzare file .ISO ed anche buona
     parte dei files .BIN e .NGR (alcune immagini non risultano compatibili)  

Anche per le modalità HDD e FDD è disponibile l'opzione "Sola lettura" che, se
selezionata, non consente la modifica dei files delle immagini collegate.
La modalità di emulazione CD/DVD attiva automaticamente l'opzione di "Sola
lettura"

Installazione
-------------
Prima di procedere con l'installazione del plugin, è necessario installare il
driver per la gestione dei dischi virtuali.
aprire la cartella VD_Driver e cliccare con il tasto destro del mouse sul file
vd_filedisk.inf; comparirà un menù (context menu) con varie opzioni disponibili,
selezionare la voce "Installa".
Dopo aver eseguito l'installazione, verrà richiesto di riavviare il computer.
Il riavvio è assolutamente necessario per un corretto funzionamento del plugin.  

  Se nel "context menu" del file INF non compare la voce "Installa", ci si potrà
  avvalere del vecchio metodo di installazione del driver ossia:
  copiare il file vd_filedisk.sys nelal cartella Windows\System32\Drivers\ quindi
  importare il file vd_filedisk.reg nel registro di sistema cliccandolo due volte 
  con il tasto sinistro del mouse e per finire, riavviando manualmente il PC.
  

IMPORTANTE!!!
Nella versione 64-bit di Windows tutte le operazioni descritte per l'installazione 
del driver dovranno essere effettuate dalla Gestione Risorse di Windows.
Se le operazioni vengono effettuate da Total Commander, installazione avrà esito
negativo in quanto TC è un'applicazione a 32-Bit che funziona nel sistema di 
emulazione a 32 Bit del sistema operativo Windows a 64-Bit.

Portato a termine l'installazione del driver e riavviato il PC si potrà eseguire 
l'installazione del plugin VirtualDisk.wfx usando il solito sistema ossia:
Andare nel menu Configurazione, selezionare la voce Opzioni ed andare alla voce
plugin del menu a destra della finestra Configurazione, quindi cliccare il tasto
configura nella sezione "Plugin File System".
premere il tasto Aggiungi e selezionare il file WFX del plugin che si intende 
installare.
In alternativa si potrà utilizzare la procedura di installazione automatica 
implementata dalla versione 6.50 di Total Commander; in questo caso il plugin
verrà automaticamente installato quando aprirete l'archivio contenente il plugin.
Non dimenticate che dovrete comunque installare manualmente il dirver della 
gestione delle unità virtuali come descritto sopra!   

Utilizzo del plugin
-------------------
Dopo l'installazione comparirà la voce "Virtual Disks" nelle risorse della rete 
di Total Commander. 
In questa cartella verrà riportata una lista di tutte le immagini che si intendono
gestire con il plugin.
All'inizio ovviamente questa voce sarà vuota.
Per aggiungere un'immagine è sufficiente copiare l'immagine che si desidera 
utilizzare nella cartella del plugin. Facciamo presente che l'immagine non verrà
fisicamente copiata, ma semplicemente linkata. Ciò significa che il plugin si 
ricorderà la posizione dell'immagine che desiderate utilizzare.
Per rimuovere l'immagine sarà sufficiente cancellarla dalla cartella del plugin.
La cancellazione elimina solo il collegamento (Link) al file di immagineche non 
verrà assolutamente danneggiato o rimosso dal disco fisso.

Per personalizzare i parametri di connessione dell'immagine premere Invio oppure
ALT+Invio oppure selezionare la voce "Proprietà" dopo aver cliccato con il tasto
destro del mouse sopra l'immagine che si desidera connettere.
Verrà proposta una finestra di dialogo in cui si potranno selezionare i 
parametri necessari per la connessione/disconnessione dell'immagine nell'unità
virtuale.  
In questa finestra di dialogo si potrà vedere il percorso completo del file 
dell'immagine, il suo stato (collegata oppure scollegata) ed anche la possibilità
di selezionare la lettera dell'unità ed il tipo di periferca da emulare 
(HDD/FDD/CD).
Per collegare l'immagine cliccare sul tasto "Collega". Se l'immagine risulta già
collegata, sul tasto comparirà la dicitura "Scollega". 
 
Al riavvio del PC tutte le immagini collegate verranno automaticamente scollegate
a meno che non venga spuntata la voce "Collega al riavvio", nel qual caso verrà
automaticamente ricollegata al riavvio successivo.

Se si dovessero verificare degli errori durante il processo di ricollegamento 
dell'immagine all'avvio, questi verranno scritti nel file di log VirtualDisk.log
presente nella cartella del plugin 


Annotazioni per l'utilizzo del plugin:
--------------------------------------
1. E' sconsigliato collegare/scollegare le immagini da diverse istanze di Total
   Commander. Si potrebbe verificare il caso in cui una copia di TC asserisce
   che un'immagine è collegata ed un'altra che afferma l'esatto contrario!
   Molti di questi problemi dovrebbero venit risolti automaticamente risolte, ma
   Per chi volesse fare delle prove, ho un suggerimento, per cortesia verificate 
   come si comporta questo plugin in diverse istanze simultanee di TC. Non sono 
   sicuramente riuscito a testare tutti i casi possibili così se riuscirete a
   trovare delle anomalie vi prego di segnalarmele in modo da poterle risolvere.
   Per i casi più gravi ho previsto il tasto "Forza stato" che toglie il flag
   di immagine montata in modo da risolvere i vari problemi che si potessero 
   verificare.   
2. Le immagini dei CD/DVD possono essere montate solo in modalità CD/DVD, le
   immagini con file system FAT possono essere montate come emulazione HDD/FDD, 
   mentre le immagini con file system NTFS possono essere montate solo con 
   modalità HDD. Nel coso in cui non si rispettino queste condizioi, il disco 
   virtuale apparirà tra le Risorse del Computer, ma quando si tenterà di 
   accedere si otterrà il messaggio di attenzione "Disco non formattato".
3. Il nuovo drive non è disponibile per i programmi che leggono fisicamente la 
   lista dei dispositivi di sistema disponibili. Ciò perchè il disco virtuale 
   non è un dispositivo di sistema ma solo un "drive logico".
   Nelle versioni future cercherò di prevedere la creazione del dispositivo di
   sistema.  


FAQ (Frequently Asked Questions)
--------------------------------
D. Ho installato il plugin, cercato di montare un'immagine ma ottengo il 
   seguente messaggio di errore:
     Errore durante la creazione del dispositivo virtuale!
     Probabilmente il disco non è stato connesso.
R. per il corretto funzionamento del plugin è necessario installare il driver
   presente nel plugin. L'instalalzione automatica del plugin non installa il 
   dirver di sistema. Per le istruzioni sull'installazione del driver consultare
   la sezione "Installazione" del presente documento.

D. Cercando di montare un'immagine ottengo il seguente errore:
     Errore durante la creazione del dispositivo virtuale!
     Ci sono troppi dispositivi attivati del tipo selezionato.         
R. In modo standard sono ammessi al massimo 4 dispositivi virtuali per tipo (es:
   4 FDD virtuali, 4 CD e 4 HDD). Se necessitate di più dispositivi dovrete 
   cambiare il valore nel registro di sistema:
     [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\VD_FileDisk\Parameters]
     NumberOfDevices=dword:00000004
   Dopo la modifica è necessario riavviare il PC.

D. Quando collego un'immagine la lettera dell'unità viene creata, ma quando 
   provo ad accedere mi compare un errore.
R. Significa che il formato dell'immagine selezionato non è supportato dal 
   plugin (Più precisamente dal driver). verificare che non avviate erroneamente
   connesso un'immagine CD/DVD come HDD o FDD o viceversa. Considerando che il 
   tipo di immagini ammesso per la connessione è limitato, verificare il punto 2
   delle "Annotazioni per l'utilizzo del plugin".

D. In Windows XP/2003 x64 il plugin non connette le immagini. Cosa sbaglio?
R. Provabilmente il dirver è stato installato in modo errato.
   Nella versione 64-bit di Windows tutte le operazioni descritte per l'installazione 
   del driver dovranno essere effettuate dalla Gestione Risorse di Windows.
   Se le operazioni vengono effettuate da Total Commander, installazione avrà esito
   negativo in quanto TC è un'applicazione a 32-Bit che funziona nel sistema di 
   emulazione a 32 Bit del sistema operativo Windows a 64-Bit.


Inel casi in cui abbia scritto qualcosa di ERRATO:
--------------------------------------------------

Il mio plugin si interfaccia a basso livello con le funzioni di Windows. Per questo 
motivo non posso garantire che il programma funzioni in modo assolutamente corretto!
(specialmente perché non ho lavorato moltissimo con la programmazione dei drivers).
Per questo motivo distribuisco il plugin con la clausola "as is" (così com'è),
senza nessuna garanzia da utilizzare a proprio rischio.
Vorrei aggiungere che fin che potrò correggerò gli errori che dovessero 
emergere. JUtilizzandolo in prima persona, è mio interesse che il plugin funzioni 
correttamente e che non si verifichino errori... 


Progetti futuri:
----------------

* perfezionare l'utilizzo corretto da diverse istanze di TC;
* Aggiunger enuovi dispositivi nella lista delle periferiche di sistema; 
* Mostrare quali immagini sono connesse (Al momento impossibile da visualizzare);
* Supportare le immagini non-standard;
* Installazione automatica del driver.
