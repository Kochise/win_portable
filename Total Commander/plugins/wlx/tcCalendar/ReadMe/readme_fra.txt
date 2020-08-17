Maximus, 2005 ________________tcCalendar 1.9 ________________mxmus@yandex.ru
Module listeur de � Maximus pour Total Commander

I. Description:
 - Calendrier perp�tuel et universel
 - Possibilit� d'utiliser des �v�nements communs, c�l�brations ou personnels
 - Possibilit� de formats sp�ciaux suivant le type d'�v�nement
 - Nombreux de contr�les pour l'affichage des �v�nements
 - Format des dates d'�v�nements � diff�rents formats :
	Relatifs � P�ques (Orthodoxe ou Catholique)
	Par num�ro de semaine dans le mois
	Mobiles
	Cycliques
	Particuli�res
	Au format de date Julienne
 - Le calendrier est fait de deux parties (Classique et liste) avec possibilit� de pr�sentation
   suivant le type d'�v�nement
 - L'affichage de la liste peut �tre limit� (Nombre de jours avant et apr�s aujourd'hui) 
 - Possibilit� d'exporter un calendrier vers Excel. (Si Excel est install� sur l'ordinateur)
 - Interface multilingue (Tch�que, N�erlandais, Anglais, Fran�ais, Allemand, Italien, Polonais, Roumain, Russe, Slovaque, Espagnol, Ukrainien)
 
II. Installation:
 1. d�compresser l'archive dans le r�pertoire de votre choix ([Chemin_CLD])
 2. installer le module:
     - Configuration -> Options... -> Editer/Voir ->Configurer visionneuse interne... ->Modules-LS
     - ajouter tcCld � la liste des modules
 3. ajouter un nouveau bouton � la barre des boutons:
     - Configuration -> Barre de boutons... -> Ajouter
     - Remplir les champs suivants:
         - �Commande� = "cm_List [Chemin_CLD]\tcCld.TCCALENDAR"
         - �Chemin� = "[Chemin_CLD]"
         - �Icone� = "[Chemin_CLD]\tcCld.ico" ou une ic�ne � votre choix
             Note: le tout sans les guillemets
 4. {Facultatif} tcCalendar peut �tre ajout� au menu "Utilisateur":
     - {Utilisateur -> Modifier le menu Utilisateur... -> Ajouter...}
     - entrer le nouveau nom pour l'�l�ment du menu (par exemple: "tcCalendar") -> Confirmer 
     - remplir les champs de la mani�re suivante:
        - �Commande� = "cm_List [Chemin_CLD]\tcCld.TCCALENDAR"
        - �Chemin� = "[Chemin_CLD]"
	  - Confirmer
     NOTE: Ne pas introduire les guillemets lors de la saisie.
 5. {Facultatif} Si le point 4 a �t� ex�cut�, on peut d�finir une touche raccourci pour tcCalendar:
     - {Options -> Configuration... -> Divers.}
     - Choisir une combinaison de touche �Changer la d�finition des touches d'acc�s rapide�
     - Choisir la commande "cm_UserMenu�" en rempla�ant le "�" par le bon num�ro dans le menu.
     - Appliquer -> Confirmer
     
______________________________________________________             

III. Clavier:
 NUM+  -  ann�e suivante
 NUM-  -  ann�e pr�c�dente
    S  -  Montrer/cacher le panneau d'agencement
    D  -  Montrer/cacher le panneau liste des dates proches
    R  -  Recharger la liste des �v�nements
    C  -  Recharger le calendrier
    G  -  Sauter � un jour au choix dans la liste
    T  -  Sauter � une ann�e au choix

�dition de note ou d'une c�l�bration:
 Ctrl+Supp   -  effacer 
 Ctrl+Ins    -  ajouter note
 Ctrl+<      -  d�placer la note vers le haut
 Ctrl+>      -  d�placer la note vers le bas
 Ctrl+Entr�e -  Confirmer les modifications
 
IV. Souris:
Dans le calendrier:
 Double clic - Sauter a une ann�e pr�cise
Dans le tableau:
 Double clic gauche - pour ajouter ou changer une note
 CTRL + clic gauche - pour �diter une c�l�bration
 Maj + clic gauche  - pour �diter un �v�nement personnel
 Clic avec bouton central pour sauter � une date � choisir

V. Fichiers: 
�V�NEMENTS:
 [Chemin_CLD]\Dates\*.cdt - �v�nements usuels du pays
 [Chemin_CLD]\Dates\*.pdt - �v�nements et notes personnelles
 [Chemin_CLD]\Dates\*.edt - �v�nements �tendus
 [Chemin_CLD]\Dates\Void\*.cdt,*.pdt,*.edt - exemples de fichiers d'�v�nements (� copier dans "[Chemin_CLD]\Dates" pour utilisation)
MODULES EXTERNES:
 [Chemin_CLD]\ExLib\*.ecl 
 [Chemin_CLD]\ExLib\SunMoon.ecl - Informations au sujet du soleil et de la lune 
        Vous pouvez t�l�charger SunMoon.ecl depuis le site maximus.in.ua
JEUX DE POLICES:
 [Chemin_CLD]\FontScheme\*.fnt
 [Chemin_CLD]\tcCld.fnt - jeu actuel
LANGUES:
 [Chemin_CLD]\Language\*.lng
AIDE:
 [Chemin_CLD]\ReadMe\readme_*.txt
 
VI. Format des fichiers dates:
_______________________________________________________________________________________________
N�| Type| Section       | Format             | Commentaires
__|_____|_______________|____________________|_________________________________________________
1 |.pdt |[Notes]        | jj.mm.aaaa=texte   | Notes directement dans tcCalendar
  |     |               |                    | jj = jour (2 caract�res)
  |     |               |                    | mm = mois (2 caract�res)
  |     |               |                    | aaaa - ann�e (4 caract�res)
__|_____|_______________|____________________|_________________________________________________
2 |.cdt |[Dates de base]| jj.mm=texte        | Date simple
  |     |[Dates]        |                    | jj = jour (2 caract�res)
  |     |[Religieuses]  |                    | mm = mois (2 caract�res)_________________________________________________
__|.pdt |[Personnelles] |____________________|_________________________________________________
3 |     |[C�l�brations] | ROEx=texte         | Date relative � P�ques orthodoxe
  |.edt |[�tendues]     |                    | x = �nombre�   P�ques + x jours
  |     |               |                    | x = -�nombre�   P�ques - x jours
__|     |               |____________________|_________________________________________________
4 |     |               | RCEx=texte         | Date relative � P�ques catholique
  |     |               |                    | x = �nombre�   P�ques + x jours
  |     |               |                    | x = -�nombre�   P�ques - x jours
__|     |               |____________________|_________________________________________________
5 |     |               | WDMjn=texte        | Date par semaine du mois
  |     |               |                    |                  (pour chaque mois)
  |     |               |                    | j = �jour de la semaine�
  |     |               |                    |                          0=Dimanche, 1=Lundi...
  |     |               |                    | n = �nombre de semaines depuis le d�but du mois�
  |     |               |                    | n = -�nombre de semaines avant fin du mois�
__|     |               |____________________|_________________________________________________
6 |     |               | WDMjn.mm=texte     | date par semaine du mois
  |     |               |                    |                  (Avec mois pr�cis�)
  |     |               |                    | j = �jour de la semaine�
  |     |               |                    |           0=Dimanche, 1=Lundi, 2=Mardi...
  |     |               |                    | n = �nombre de semaines depuis le d�but du mois�
  |     |               |                    | n = -�nombre de semaines avant fin du mois�
  |     |               |                    | mm = mois (2 caract�res)
__|     |               |____________________|_________________________________________________
7 |     |               |PDs.jj=texte        |date particuli�re
  |     |               |                    |s = �jour de la semaine�
  |     |               |                    |jj = �jour�
__|     |               |____________________|_________________________________________________
8 |     |               |PDYnnn=texte        |date particuli�re
  |     |               |                    |nnn = n� du jour dans l'ann�e
__|     |               |____________________|_________________________________________________
9 |     |               |Jjj.mm=texte        |Date au format du calendrier Julien
  |     |               |                    |jj = jour
  |     |               |                    |mm = mois
__|_____|_______________|____________________|_________________________________________________
10|.pdt |[Personnelles] |CDccc:jj.mm.aaaa    |�v�n�ments cycliques
  |     |               | -jj.mm.aaaa=texte  |ccc = <cycle> (nombre de jour dans l'intervalle)
  |     |               |                    |jj.mm.yyyy (Premier groupe) = <date de d�but>
  |     |               |                    |jj.mm.yyyy (Second groupe) = <date de fin>
__|_____|_______________|____________________|_________________________________________________
11|.cdt |[Dates de base]|MDdate:g,d>sci      |Dates mobiles (format court)
  |     |[Dates]        |            =texte  |g = <Jour de la semaine � gauche>
  |     |[Religieuses]  |                    |d = <Jour de la semaine � droite>
  |.pdt |[Personnelles] |                    |c = <Jour de la semaine cible>
  |     |[C�l�brations] |                    |           g,d,c - [0..6] 0=Dimanche
  |.edt |[Extendue]     |                    |s = <Sens de la mobilit�>
  |     |[C�l�brations] |                    |                N = Suivant, P = Pr�c�dent
  |     |               |                    |i = <ignore>
  |     |               |                    |                I = affich� seulement si d�plac�e
  |     |               |                    |texte = formats date 2,3,4
__|     |               |____________________|__________________________________________________
12|     |               |MDdate:g1,d1>sc1    |Dates mobiles (format long)
  |     |               |  :g2,d2>sc2i=texte |        comme le format court,
  |     |               |                    |          mais avec deux conditions
__|     |               |____________________|__________________________________________________
13|     |               |MDjj.mm:WDMsn>      |Date mobile (relative)
  |     |               |    WDMsn.mm=texte  |jj = <jour>
  |     |               |                    |mm = <mois>
  |     |               |                    |s = <Jour de la semaine>
  |     |               |                    |                       [0..6] 0=Dimanche
  |     |               |                    |n = <nombre du mois du d�but>
  |     |               |                    |n = -<nombre du mois de la fin>
__|     |               |____________________|__________________________________________________
14|     |               |MDdate:WDMsn.mm>    |Date mobile (relative � P�ques)
  |     |               |    WDMsn.mm=texte  |date = format date 3,4
  |     |               |                    |mm = <mois>
  |     |               |                    |s = <Jour de la semaine>
  |     |               |                    |                       [0..6] 0=Dimanche
  |     |               |                    |n = <nombre du mois du d�but>
  |     |               |                    |n = -<nombre du mois de la fin>
__|_____|_______________|____________________|__________________________________________________

Remarques pour l'introduction de plusieurs donn�es pour une m�me date il suffit de les s�parer par �%n� :
  Texte = Texte_1%nTexte_2 ... %nTexte_X
  notes = Note_1%nNote_2 ... %nNote_X

Remarques pour les c�l�brations uniquement [Celebrations] (Fichiers xxxxx.pdt):
  jj.mm=Nom_C�l�bration#Ann�e_D�but_C�l�bration_year#format_num�ro
     format_num�ro =num�ro du format dans la liste sauvegard�s dans �tcCld.ini� sous la rubrique [CelFormat]
 					(>=0, 0 = format par d�faut)
  
  Pour cr�er ou modifier les formats : {Options->Calendrier->Choix->Bouton �>�}
 
  	[N] = nom de l'�v�nement � c�l�brer
  	[Y] = Ann�e o� l'�v�nement a eu lieu
  	[A] = Nombre d'ann�e �coul�es depuis que l'�v�nement a eu lieu
 
  Exemples : 1=[N] n�e en [Y] il y a [A] ans
		 2=[N] n� en [Y] il y a [A] ans
		 3=Entr�e � [N] en [Y] il y a [A] ann�es
		 4=En [Y] il y a donc [A] ans naissait [N]




Autres exemples:
_______________________________________________________________________________________________
    ROE0=P�ques orthodoxe                       WDM02=second dimanche de chaque mois
    ROE49=Trinit� orthodoxe                     WDM3-1=dernier mercredi de chaque mois
    ROE-7=Dimanche des Rameaux orthodoxe        WDM51.11=premier vendredi de novembre
    RCE0=P�ques catholique                      CD015:14.09.2005-03.05.2006=�v�nement cyclique
    PD5.13=Vendredi 13                          (R�p�tera tous les 15 jours entre le 14.09.2005
    PDY256=Jour des programmeurs                                            et le 03.05.2006)
    23.04=Anniversaire de Jean%nMariage de Jeanne 
    J25.12=No�l Orthodoxe, L'�glise orthodoxe c�l�bre No�l(et d'autres f�tes) en suivant le
    calendrier Julien).
    Actuellement la diff�rence entre les calendriers Gr�gorien et Julien est de 13 jours, mais
    � partir du 1er mars 2100 il sera de 14 jours, et avant le 1er mars 1900 il �tait de 12 jours.
_______________________________________________________________________________________________

    MD02.04:2,3>P1:4,5>N1= 2 avril �> F�te en Argentine
    Si le 2 avril est un mardi ou un mercredi, alors la f�te se c�l�bre le lundi pr�c�dent,
    si c'est un jeudi ou un vendredi ce sera le lundi suivant, dans les autres cas, ne rien changer.

    MD01.01:6,6>N1:0,0>N1=F�te de "nouvel an" en Ukraine
    En Ukraine, si la f�te nationale ou nouvel an est un samedi ou un dimanche,
    alors on ajoute un jour de cong� suppl�mentaire le lundi suivant.
    MD01.01:6,0>N1=F�te de "nouvel an" en Ukraine
    MD01.01:6,6>N1I:0,0>N1=F�te de "nouvel an" en Ukraine, 
    le �I� ajout� fait qu'il ne sera affich� que s'il est d�plac�
    MD01.05:WDM01>WDM02.05=1er mai,  f�te
    Si le 1er mai est le premier dimanche du mois, alors la f�te aura lieu le second dimanche du mois !.

VII. FORMATS POUR DATES:
 {Options->Affichage->Autre->Format}
Symboles sp�ciaux:
[D] - Jour
[M] - Mois en chiffres
[L] - Mois en lettres
[A] - Mois en lettres (abr�g�s)
[Y] - Ann�e
[S] - Ann�e (courte)
[J] - Date julienne
[W] - Jour de la semaine
[B] - Jour de la semaine (abr�g�)
 \t - tabulation (pour la liste)
 \\ - \
Exemple :
 Format date julienne: j[D].[M] = j03.08
 Format pour liste: [L] [D], [Y] ([J]) = Ao�t 16, 2005 (j03.08)
________________________________________________________________________________

VIII. FORMAT POUR C�L�BRATIONS:
 {Options->Calendriers->Choix->Bouton '>'}
Symboles: sp�ciaux
[N] - Nom de la c�l�bration
[Y] - Ann�e de la premi�re c�l�bration
[A] - Anniversaire de la c�l�bration
Par exemple, vous voulez afficher le message suivant:
"Ce jour, il y a d�j� 10 ans, est n� notre cher Johnny. Cet �v�nement a eu lieu en 1995."
Vous devez entre le format suivant:
"Ce jour, il y a d�j� [A] ans, est n� notre cher [N]. Cet �v�nement a eu lieu en [Y."
et choisir ce format lors de l'ajout/�dition de la c�l�bration (Menu contextuel du calendrier) dans la 3�me colonne.
________________________________________________________________________________

IX. FORMAT POUR L'HEURE:
 {Options->Heure->Format pour l'heure}
Symboles sp�ciaux:
[H] - Heure
[T] - Heure (format 12 heures)
[M] - Minutes
[S] - Secondes
Exemples:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09


X. FORMAT POUR INFO-BULLES: 
FORMAT des titres du calendrier:
 {Options->Outils->FORMAT des titres du calendrier->D�finir le format}

Symboles sp�ciaux communs:
    \n  - Nouvelle ligne
    \t  - Tabulation

Aujourd'hui:
    [T] - Aujourd'hui
        Exemple :
                    :::: [T] :::: = :::: Aujourd'hui ::::
Titre:                    
    [N] - Nom du titre
    Exemple:
                 ::++ [N] ++:: = ::++ F�ri�s Nationaux ++::
________________________________________________________________________________
FORMAT pour le soleil et la lune:
 {Options->Outils->Soleil et lune->D�finir le format}

    [SR] - Heure du lever du soleil
    [SS] - Heure du coucher de soleil
    [MR] - Heure du lever de la lune
    [MS] - Heure du coucher de la lune
    [PP] - Luminosit� de la lune (en pourcent)
    [PN] - Nom de la phase de la lune

    Exemple:
 Soleil & Lune:\nLever du soleil [SR]\nCoucher du soleil [SS]\nLever de la lune [MR]\nCoucher de la lune [MS]
 =
 Soleil & Lune:
 Lever du soleil 03:49
 Coucher du soleil 20:12
 Lever de la lune 00:26
 Coucher de la lune 14:12 
 

XI. Particularit�s pour l'utilisation des param�tres de police:
 {Options->Affichage->Polices}
______________________________________________________________________________________
                     | N/U      | U/O   | U/A
_____________________|__________|_______|_____________________________________________
Ann�e                | VA       |       |
Fond                 |          | FC BC | FC={Couleur fond de la liste des �v�nements}
                     |          |       | BC={Couleur fond du calendrier}
Grille du calendrier |          | BC    | BC={Couleur de la grille du calendrier}
... <Date>           | VA HA    |       | BC={... couleur du marqueur}
... <Text>           | VA HA BC |       |
_____________________|__________|_______|_____________________________________________
Abr�viation:
 N/U - non utilis�  U/O - utilis� seulement  U/A - utilis� comme
 VA - Alignement vertical     FC - Couleur de la police
 HA - Alignement horizontal   BC - Couleur de fond

____________________________________________________________________________________________________

XII. �LIMINATION d'un PROBL�ME:
 Avec certaines versions de Windows (Windows 2000 par exemple) La liste des �v�nements n'est pas affich�e correctement.
 Pour �liminer ce probl�me copier le fichier:
     de Windows XP  -  disque:\WINNT\SYSTEM32\riched20.dll
     de Windows 98  -  disque:\Windows\SYSTEM32\riched20.dll
 vers le r�pertoire appropri� (de Windows 2000 - disque:\WINNT\SYSTEM32\)
     disque = disque sur lequel le syst�me est install� (�C� g�n�ralement)

____________________________________________________________________________________________________
XIII. Sources:
 Pour les informations au sujet du soleil et de la lune une partie des composants de TMoon ont �t� utilis�s.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 Pour les informations pour les pays, villes et coordonn�es incluses dans le fichier (tcCld.lct) le fichier cities.dat du Calendar wfx-plugin a �t� utilis�.
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________

Historique:
 [+] - Ajout  [/] - Correction  [*] - Modification
[2.0]
+ Enregistrer le calendrier au format bitmap (BMP) {Options->Exporter}
+ Jeux de polices {Options->Affichage >Polices}
+ Agencement pour info-bulles{Options->Outils->Contenu de l'info-bulle} (voir X.)
+ Entr�e de la situation manuellement {Options->Heure et situation}
+ Caract�ristiques de la fen�tre au lancement {Options->Programme}
+ Option pour cacher le calendrier ou la liste (Clic droit)
+ Indentation pour l'alignement du texte  {Options->Affichage->Polices}
+ Raccourci pour revenir � l'ann�e actuelle - NUM*

[1.9]
+ Informations sur le soleil et la lune par module externe {Options->Outils->Soleil et lune}
      (Voir Modules Externes, FORMAT Soleil et Lune)
      Choisir Format pour la ville et l'heure {Options->Heure et situation} 
+ Titres des calendriers dans la bulle d'information {Options->Titre->Outils->Titres des calendriers}
+ jour de la semaine en format long format et format liste des �v�nements
+ dates mobiles support�es aussi dans .cdt [Religieux] et .edt [�tendu]
+ nouveau format de date mobile (Relative � P�ques)
+ possibilit� de faire varier la taille ou de cacher le panneau Ann�e
+ calendriers nationaux (Autriche, Allemagne)

[1.8]
/ supporte des fichiers de plus de 64 Ko avec des cha�nes de plus de 2Ko
/ erreur fix�e pour les dates mobiles n�cessitant un changement d'ann�e
/ correction de la diff�rence entre calendrier Julien et Gr�gorie pour le calcul de P�ques Orthodoxe
+ Dates juliennes pour le calendrier (voir Format des dates /9)
+ Dates juliennes pour la liste {Options->Affichage->Autre->Format date} 
+ Dates juliennes pour les outils {Options->Calendrier->Limitation +}
+ ajout pour dates mobiles ('I')
+ ajout pour format dates mobiles (limites comme de 6 � 2)
+ ajout aux dates particuli�res (Jour de l'ann�e)
+ priorit� des �v�nements et formats {Options->Affichage->Priorit�}
+ paragraphes dans les outils {Options->Affichage->Autre}
+ possibilit� de d�finir la date actuelle {menu contextuel}
+ sauvegarde de la liste aussi au format texte {Options->Exporter}
+ exportation invisible dans Excel (+ rapide) {Options->Exporter}
+ saut � une date � choisir (voir Clavier et Souris)
+ possibilit� de charger des calendriers (liste) pour une ann�e choisie {Options->Calendrier->Limitation +}
+ menu contextuel �tendu pour le calendrier et la liste
+ acc�s plus rapide pour �diter les c�l�brations et �v�nements personnels (voir Souris)



[1.7]
+ Dates mobiles
+ Dates particuli�res
+ format de police pour tous les �v�nement du calendrier {Options->Affichage->Polices}
+ possibilit� d'accepter/refuser l'affichage d'"Aujourd'hui" {Options->Calendriers->Limitations}
+ Enregistrement de la liste au format RTF {Options->Exporter}
+ R�pertoire de stockage des donn�es d�fini par l'utilisateur {Options->Programme}
* Raccourci clavier Montrer/Cacher le panneau des options chang� en 'S'
 
[1.6]
+ exportation du calendrier vers Excel {Panneau des pr�f�rences -> Exporter}
/ corrections de l'erreur du menu contextuel (cr�ation erron�e)
/ �v�nements nouveaux apparaissent correctement dans le calendrier

[1.5]
 + Edition des �v�nements personnels dans le calendrier {Menu contextuel)
 + Format d'affichage des dates
 + Enregistrement de la taille d'affichage si pas en plein �cran
 * Ne pas ex�cuter d'op�rations d'�critures si lanc� depuis un CD
 * Changement de la hauteur de la liste via la souris
 * Le jeu de dates �tendues sera mise � jour dans un bloc s�par�
 
[1.4]
 + nouvelle cat�gorie d'�v�nements personnels - c�l�brations (possibilit� d'�diter � partir du calendrier > menu contextuel)
 + formats pour les c�l�brations (possibilit� d'�diter � partir du calendrier {Options->Calendrier->Choix->Bouton �>�})
 * modifi� les raccourcis pour l'�dition des notes/c�l�brations (voir Clavier)
 * Options panneaux supprim�es
 * menu contextuel pour calendrier �tendu

[1.3]
 + Possibilit� d'utiliser plusieurs �v�nements d'un m�me type pour une m�me date (symbole %n)
 * Nouvelle interface pour l'�dition de notes personnelles
 * Suppression de l'option "Encadr� �pais" dans les options g�n�rales
 + Aspect r�glable pour la date du jour dans le calendrier

 + Fichier langue (Czech)
 + Calendrier (Canada, English)
 + Calendrier (France, French)
 * Calendrier (Belgium, French)
 + Calendrier (Czechia, Czech)
 + Calendrier �tendu (Czech, "Name-day")

[1.2]
 +  possibilit� d'utiliser des �v�nements avec un cycle de n jours
 +  r�glage pour la limitation d'affichage de certains types d'�v�nements
 +  possibilit� de choisir le marqueur en fonction du type d'�v�nement
 *  r�duction de temps de chargement des listes d'�v�nements
 *  changement dans la structure des options
 
[1.1]
 /  liste des dates affich�es correctement sous Windows98
 +  nouveau type de calendrier - Date �tendue
 +  possibilit� de d�finir une date par jour de la semaine relativement au d�but ou la fin d'un mois
 +  polices pr�f�r�es sauvegard�es dans un fichier s�par�
 *  la structure des options est modifi�e

 +  Fichier langue (German)
 +  Fichier langue (Polish)
 +  Fichier langue (Spanish)
 +  dates set (Germany, German)
 +  2 calendrier �tendus (Fran�ais, "Saint(s) du jour")
 +  readme-file (German)
 +  readme-file (Spanish)
 +  personal dates sample (German)
 
[1.01]

 /  bogue lors de l'impossibilit� d'ajouter des notes
 +  possibilit� d'ajouter et de supprimer des calendriers personnels directement du module
 +  possibilit� de ne pas choisir de calendrier personnel

 +  Fichier langue (Dutch)
 +  Fichier langue (French)
 +  Calendrier (Belgium, French)
 +  Fichier readme-fra (French)
 +  Calendrier personnel d'exemple (French)
