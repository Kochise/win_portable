Maximus, 2005 ________________tcCalendar 1.9 ________________mxmus@yandex.ru
Module listeur de ® Maximus pour Total Commander

I. Description:
 - Calendrier perpétuel et universel
 - Possibilité d'utiliser des événements communs, célébrations ou personnels
 - Possibilité de formats spéciaux suivant le type d'événement
 - Nombreux de contrôles pour l'affichage des événements
 - Format des dates d'événements à différents formats :
	Relatifs à Pâques (Orthodoxe ou Catholique)
	Par numéro de semaine dans le mois
	Mobiles
	Cycliques
	Particulières
	Au format de date Julienne
 - Le calendrier est fait de deux parties (Classique et liste) avec possibilité de présentation
   suivant le type d'événement
 - L'affichage de la liste peut être limité (Nombre de jours avant et après aujourd'hui) 
 - Possibilité d'exporter un calendrier vers Excel. (Si Excel est installé sur l'ordinateur)
 - Interface multilingue (Tchèque, Néerlandais, Anglais, Français, Allemand, Italien, Polonais, Roumain, Russe, Slovaque, Espagnol, Ukrainien)
 
II. Installation:
 1. décompresser l'archive dans le répertoire de votre choix ([Chemin_CLD])
 2. installer le module:
     - Configuration -> Options... -> Editer/Voir ->Configurer visionneuse interne... ->Modules-LS
     - ajouter tcCld à la liste des modules
 3. ajouter un nouveau bouton à la barre des boutons:
     - Configuration -> Barre de boutons... -> Ajouter
     - Remplir les champs suivants:
         - «Commande» = "cm_List [Chemin_CLD]\tcCld.TCCALENDAR"
         - «Chemin» = "[Chemin_CLD]"
         - «Icone» = "[Chemin_CLD]\tcCld.ico" ou une icône à votre choix
             Note: le tout sans les guillemets
 4. {Facultatif} tcCalendar peut être ajouté au menu "Utilisateur":
     - {Utilisateur -> Modifier le menu Utilisateur... -> Ajouter...}
     - entrer le nouveau nom pour l'élément du menu (par exemple: "tcCalendar") -> Confirmer 
     - remplir les champs de la manière suivante:
        - «Commande» = "cm_List [Chemin_CLD]\tcCld.TCCALENDAR"
        - «Chemin» = "[Chemin_CLD]"
	  - Confirmer
     NOTE: Ne pas introduire les guillemets lors de la saisie.
 5. {Facultatif} Si le point 4 a été exécuté, on peut définir une touche raccourci pour tcCalendar:
     - {Options -> Configuration... -> Divers.}
     - Choisir une combinaison de touche «Changer la définition des touches d'accès rapide»
     - Choisir la commande "cm_UserMenu×" en remplaçant le "×" par le bon numéro dans le menu.
     - Appliquer -> Confirmer
     
______________________________________________________             

III. Clavier:
 NUM+  -  année suivante
 NUM-  -  année précédente
    S  -  Montrer/cacher le panneau d'agencement
    D  -  Montrer/cacher le panneau liste des dates proches
    R  -  Recharger la liste des événements
    C  -  Recharger le calendrier
    G  -  Sauter à un jour au choix dans la liste
    T  -  Sauter à une année au choix

Édition de note ou d'une célébration:
 Ctrl+Supp   -  effacer 
 Ctrl+Ins    -  ajouter note
 Ctrl+<      -  déplacer la note vers le haut
 Ctrl+>      -  déplacer la note vers le bas
 Ctrl+Entrée -  Confirmer les modifications
 
IV. Souris:
Dans le calendrier:
 Double clic - Sauter a une année précise
Dans le tableau:
 Double clic gauche - pour ajouter ou changer une note
 CTRL + clic gauche - pour éditer une célébration
 Maj + clic gauche  - pour éditer un événement personnel
 Clic avec bouton central pour sauter à une date à choisir

V. Fichiers: 
ÉVÉNEMENTS:
 [Chemin_CLD]\Dates\*.cdt - Événements usuels du pays
 [Chemin_CLD]\Dates\*.pdt - Événements et notes personnelles
 [Chemin_CLD]\Dates\*.edt - Événements étendus
 [Chemin_CLD]\Dates\Void\*.cdt,*.pdt,*.edt - exemples de fichiers d'événements (à copier dans "[Chemin_CLD]\Dates" pour utilisation)
MODULES EXTERNES:
 [Chemin_CLD]\ExLib\*.ecl 
 [Chemin_CLD]\ExLib\SunMoon.ecl - Informations au sujet du soleil et de la lune 
        Vous pouvez télécharger SunMoon.ecl depuis le site maximus.in.ua
JEUX DE POLICES:
 [Chemin_CLD]\FontScheme\*.fnt
 [Chemin_CLD]\tcCld.fnt - jeu actuel
LANGUES:
 [Chemin_CLD]\Language\*.lng
AIDE:
 [Chemin_CLD]\ReadMe\readme_*.txt
 
VI. Format des fichiers dates:
_______________________________________________________________________________________________
N°| Type| Section       | Format             | Commentaires
__|_____|_______________|____________________|_________________________________________________
1 |.pdt |[Notes]        | jj.mm.aaaa=texte   | Notes directement dans tcCalendar
  |     |               |                    | jj = jour (2 caractères)
  |     |               |                    | mm = mois (2 caractères)
  |     |               |                    | aaaa - année (4 caractères)
__|_____|_______________|____________________|_________________________________________________
2 |.cdt |[Dates de base]| jj.mm=texte        | Date simple
  |     |[Dates]        |                    | jj = jour (2 caractères)
  |     |[Religieuses]  |                    | mm = mois (2 caractères)_________________________________________________
__|.pdt |[Personnelles] |____________________|_________________________________________________
3 |     |[Célébrations] | ROEx=texte         | Date relative à Pâques orthodoxe
  |.edt |[Étendues]     |                    | x = «nombre»   Pâques + x jours
  |     |               |                    | x = -«nombre»   Pâques - x jours
__|     |               |____________________|_________________________________________________
4 |     |               | RCEx=texte         | Date relative à Pâques catholique
  |     |               |                    | x = «nombre»   Pâques + x jours
  |     |               |                    | x = -«nombre»   Pâques - x jours
__|     |               |____________________|_________________________________________________
5 |     |               | WDMjn=texte        | Date par semaine du mois
  |     |               |                    |                  (pour chaque mois)
  |     |               |                    | j = «jour de la semaine»
  |     |               |                    |                          0=Dimanche, 1=Lundi...
  |     |               |                    | n = «nombre de semaines depuis le début du mois»
  |     |               |                    | n = -«nombre de semaines avant fin du mois»
__|     |               |____________________|_________________________________________________
6 |     |               | WDMjn.mm=texte     | date par semaine du mois
  |     |               |                    |                  (Avec mois précisé)
  |     |               |                    | j = «jour de la semaine»
  |     |               |                    |           0=Dimanche, 1=Lundi, 2=Mardi...
  |     |               |                    | n = «nombre de semaines depuis le début du mois»
  |     |               |                    | n = -«nombre de semaines avant fin du mois»
  |     |               |                    | mm = mois (2 caractères)
__|     |               |____________________|_________________________________________________
7 |     |               |PDs.jj=texte        |date particulière
  |     |               |                    |s = «jour de la semaine»
  |     |               |                    |jj = «jour»
__|     |               |____________________|_________________________________________________
8 |     |               |PDYnnn=texte        |date particulière
  |     |               |                    |nnn = n° du jour dans l'année
__|     |               |____________________|_________________________________________________
9 |     |               |Jjj.mm=texte        |Date au format du calendrier Julien
  |     |               |                    |jj = jour
  |     |               |                    |mm = mois
__|_____|_______________|____________________|_________________________________________________
10|.pdt |[Personnelles] |CDccc:jj.mm.aaaa    |Événéments cycliques
  |     |               | -jj.mm.aaaa=texte  |ccc = <cycle> (nombre de jour dans l'intervalle)
  |     |               |                    |jj.mm.yyyy (Premier groupe) = <date de début>
  |     |               |                    |jj.mm.yyyy (Second groupe) = <date de fin>
__|_____|_______________|____________________|_________________________________________________
11|.cdt |[Dates de base]|MDdate:g,d>sci      |Dates mobiles (format court)
  |     |[Dates]        |            =texte  |g = <Jour de la semaine à gauche>
  |     |[Religieuses]  |                    |d = <Jour de la semaine à droite>
  |.pdt |[Personnelles] |                    |c = <Jour de la semaine cible>
  |     |[Célébrations] |                    |           g,d,c - [0..6] 0=Dimanche
  |.edt |[Extendue]     |                    |s = <Sens de la mobilité>
  |     |[Célébrations] |                    |                N = Suivant, P = Précédent
  |     |               |                    |i = <ignore>
  |     |               |                    |                I = affiché seulement si déplacée
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
  |     |               |                    |n = <nombre du mois du début>
  |     |               |                    |n = -<nombre du mois de la fin>
__|     |               |____________________|__________________________________________________
14|     |               |MDdate:WDMsn.mm>    |Date mobile (relative à Pâques)
  |     |               |    WDMsn.mm=texte  |date = format date 3,4
  |     |               |                    |mm = <mois>
  |     |               |                    |s = <Jour de la semaine>
  |     |               |                    |                       [0..6] 0=Dimanche
  |     |               |                    |n = <nombre du mois du début>
  |     |               |                    |n = -<nombre du mois de la fin>
__|_____|_______________|____________________|__________________________________________________

Remarques pour l'introduction de plusieurs données pour une même date il suffit de les séparer par «%n» :
  Texte = Texte_1%nTexte_2 ... %nTexte_X
  notes = Note_1%nNote_2 ... %nNote_X

Remarques pour les célébrations uniquement [Celebrations] (Fichiers xxxxx.pdt):
  jj.mm=Nom_Célébration#Année_Début_Célébration_year#format_numéro
     format_numéro =numéro du format dans la liste sauvegardés dans «tcCld.ini» sous la rubrique [CelFormat]
 					(>=0, 0 = format par défaut)
  
  Pour créer ou modifier les formats : {Options->Calendrier->Choix->Bouton «>»}
 
  	[N] = nom de l'événement à célébrer
  	[Y] = Année où l'événement a eu lieu
  	[A] = Nombre d'année écoulées depuis que l'événement a eu lieu
 
  Exemples : 1=[N] née en [Y] il y a [A] ans
		 2=[N] né en [Y] il y a [A] ans
		 3=Entrée à [N] en [Y] il y a [A] années
		 4=En [Y] il y a donc [A] ans naissait [N]




Autres exemples:
_______________________________________________________________________________________________
    ROE0=Pâques orthodoxe                       WDM02=second dimanche de chaque mois
    ROE49=Trinité orthodoxe                     WDM3-1=dernier mercredi de chaque mois
    ROE-7=Dimanche des Rameaux orthodoxe        WDM51.11=premier vendredi de novembre
    RCE0=Pâques catholique                      CD015:14.09.2005-03.05.2006=événement cyclique
    PD5.13=Vendredi 13                          (Répètera tous les 15 jours entre le 14.09.2005
    PDY256=Jour des programmeurs                                            et le 03.05.2006)
    23.04=Anniversaire de Jean%nMariage de Jeanne 
    J25.12=Noël Orthodoxe, L'église orthodoxe célèbre Noël(et d'autres fêtes) en suivant le
    calendrier Julien).
    Actuellement la différence entre les calendriers Grégorien et Julien est de 13 jours, mais
    à partir du 1er mars 2100 il sera de 14 jours, et avant le 1er mars 1900 il était de 12 jours.
_______________________________________________________________________________________________

    MD02.04:2,3>P1:4,5>N1= 2 avril —> Fête en Argentine
    Si le 2 avril est un mardi ou un mercredi, alors la fête se célèbre le lundi précédent,
    si c'est un jeudi ou un vendredi ce sera le lundi suivant, dans les autres cas, ne rien changer.

    MD01.01:6,6>N1:0,0>N1=Fête de "nouvel an" en Ukraine
    En Ukraine, si la fête nationale ou nouvel an est un samedi ou un dimanche,
    alors on ajoute un jour de congé supplémentaire le lundi suivant.
    MD01.01:6,0>N1=Fête de "nouvel an" en Ukraine
    MD01.01:6,6>N1I:0,0>N1=Fête de "nouvel an" en Ukraine, 
    le «I» ajouté fait qu'il ne sera affiché que s'il est déplacé
    MD01.05:WDM01>WDM02.05=1er mai,  fête
    Si le 1er mai est le premier dimanche du mois, alors la fête aura lieu le second dimanche du mois !.

VII. FORMATS POUR DATES:
 {Options->Affichage->Autre->Format}
Symboles spéciaux:
[D] - Jour
[M] - Mois en chiffres
[L] - Mois en lettres
[A] - Mois en lettres (abrégés)
[Y] - Année
[S] - Année (courte)
[J] - Date julienne
[W] - Jour de la semaine
[B] - Jour de la semaine (abrégé)
 \t - tabulation (pour la liste)
 \\ - \
Exemple :
 Format date julienne: j[D].[M] = j03.08
 Format pour liste: [L] [D], [Y] ([J]) = Août 16, 2005 (j03.08)
________________________________________________________________________________

VIII. FORMAT POUR CÉLÉBRATIONS:
 {Options->Calendriers->Choix->Bouton '>'}
Symboles: spéciaux
[N] - Nom de la célébration
[Y] - Année de la première célébration
[A] - Anniversaire de la célébration
Par exemple, vous voulez afficher le message suivant:
"Ce jour, il y a déjà 10 ans, est né notre cher Johnny. Cet événement a eu lieu en 1995."
Vous devez entre le format suivant:
"Ce jour, il y a déjà [A] ans, est né notre cher [N]. Cet événement a eu lieu en [Y."
et choisir ce format lors de l'ajout/édition de la célébration (Menu contextuel du calendrier) dans la 3ème colonne.
________________________________________________________________________________

IX. FORMAT POUR L'HEURE:
 {Options->Heure->Format pour l'heure}
Symboles spéciaux:
[H] - Heure
[T] - Heure (format 12 heures)
[M] - Minutes
[S] - Secondes
Exemples:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09


X. FORMAT POUR INFO-BULLES: 
FORMAT des titres du calendrier:
 {Options->Outils->FORMAT des titres du calendrier->Définir le format}

Symboles spéciaux communs:
    \n  - Nouvelle ligne
    \t  - Tabulation

Aujourd'hui:
    [T] - Aujourd'hui
        Exemple :
                    :::: [T] :::: = :::: Aujourd'hui ::::
Titre:                    
    [N] - Nom du titre
    Exemple:
                 ::++ [N] ++:: = ::++ Fériés Nationaux ++::
________________________________________________________________________________
FORMAT pour le soleil et la lune:
 {Options->Outils->Soleil et lune->Définir le format}

    [SR] - Heure du lever du soleil
    [SS] - Heure du coucher de soleil
    [MR] - Heure du lever de la lune
    [MS] - Heure du coucher de la lune
    [PP] - Luminosité de la lune (en pourcent)
    [PN] - Nom de la phase de la lune

    Exemple:
 Soleil & Lune:\nLever du soleil [SR]\nCoucher du soleil [SS]\nLever de la lune [MR]\nCoucher de la lune [MS]
 =
 Soleil & Lune:
 Lever du soleil 03:49
 Coucher du soleil 20:12
 Lever de la lune 00:26
 Coucher de la lune 14:12 
 

XI. Particularités pour l'utilisation des paramètres de police:
 {Options->Affichage->Polices}
______________________________________________________________________________________
                     | N/U      | U/O   | U/A
_____________________|__________|_______|_____________________________________________
Année                | VA       |       |
Fond                 |          | FC BC | FC={Couleur fond de la liste des événements}
                     |          |       | BC={Couleur fond du calendrier}
Grille du calendrier |          | BC    | BC={Couleur de la grille du calendrier}
... <Date>           | VA HA    |       | BC={... couleur du marqueur}
... <Text>           | VA HA BC |       |
_____________________|__________|_______|_____________________________________________
Abréviation:
 N/U - non utilisé  U/O - utilisé seulement  U/A - utilisé comme
 VA - Alignement vertical     FC - Couleur de la police
 HA - Alignement horizontal   BC - Couleur de fond

____________________________________________________________________________________________________

XII. ÉLIMINATION d'un PROBLÈME:
 Avec certaines versions de Windows (Windows 2000 par exemple) La liste des événements n'est pas affichée correctement.
 Pour éliminer ce problème copier le fichier:
     de Windows XP  -  disque:\WINNT\SYSTEM32\riched20.dll
     de Windows 98  -  disque:\Windows\SYSTEM32\riched20.dll
 vers le répertoire approprié (de Windows 2000 - disque:\WINNT\SYSTEM32\)
     disque = disque sur lequel le système est installé («C» généralement)

____________________________________________________________________________________________________
XIII. Sources:
 Pour les informations au sujet du soleil et de la lune une partie des composants de TMoon ont été utilisés.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 Pour les informations pour les pays, villes et coordonnées incluses dans le fichier (tcCld.lct) le fichier cities.dat du Calendar wfx-plugin a été utilisé.
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
+ Entrée de la situation manuellement {Options->Heure et situation}
+ Caractéristiques de la fenêtre au lancement {Options->Programme}
+ Option pour cacher le calendrier ou la liste (Clic droit)
+ Indentation pour l'alignement du texte  {Options->Affichage->Polices}
+ Raccourci pour revenir à l'année actuelle - NUM*

[1.9]
+ Informations sur le soleil et la lune par module externe {Options->Outils->Soleil et lune}
      (Voir Modules Externes, FORMAT Soleil et Lune)
      Choisir Format pour la ville et l'heure {Options->Heure et situation} 
+ Titres des calendriers dans la bulle d'information {Options->Titre->Outils->Titres des calendriers}
+ jour de la semaine en format long format et format liste des événements
+ dates mobiles supportées aussi dans .cdt [Religieux] et .edt [Étendu]
+ nouveau format de date mobile (Relative à Pâques)
+ possibilité de faire varier la taille ou de cacher le panneau Année
+ calendriers nationaux (Autriche, Allemagne)

[1.8]
/ supporte des fichiers de plus de 64 Ko avec des chaînes de plus de 2Ko
/ erreur fixée pour les dates mobiles nécessitant un changement d'année
/ correction de la différence entre calendrier Julien et Grégorie pour le calcul de Pâques Orthodoxe
+ Dates juliennes pour le calendrier (voir Format des dates /9)
+ Dates juliennes pour la liste {Options->Affichage->Autre->Format date} 
+ Dates juliennes pour les outils {Options->Calendrier->Limitation +}
+ ajout pour dates mobiles ('I')
+ ajout pour format dates mobiles (limites comme de 6 à 2)
+ ajout aux dates particulières (Jour de l'année)
+ priorité des événements et formats {Options->Affichage->Priorité}
+ paragraphes dans les outils {Options->Affichage->Autre}
+ possibilité de définir la date actuelle {menu contextuel}
+ sauvegarde de la liste aussi au format texte {Options->Exporter}
+ exportation invisible dans Excel (+ rapide) {Options->Exporter}
+ saut à une date à choisir (voir Clavier et Souris)
+ possibilité de charger des calendriers (liste) pour une année choisie {Options->Calendrier->Limitation +}
+ menu contextuel étendu pour le calendrier et la liste
+ accès plus rapide pour éditer les célébrations et événements personnels (voir Souris)



[1.7]
+ Dates mobiles
+ Dates particulières
+ format de police pour tous les événement du calendrier {Options->Affichage->Polices}
+ possibilité d'accepter/refuser l'affichage d'"Aujourd'hui" {Options->Calendriers->Limitations}
+ Enregistrement de la liste au format RTF {Options->Exporter}
+ Répertoire de stockage des données défini par l'utilisateur {Options->Programme}
* Raccourci clavier Montrer/Cacher le panneau des options changé en 'S'
 
[1.6]
+ exportation du calendrier vers Excel {Panneau des préférences -> Exporter}
/ corrections de l'erreur du menu contextuel (création erronée)
/ événements nouveaux apparaissent correctement dans le calendrier

[1.5]
 + Edition des événements personnels dans le calendrier {Menu contextuel)
 + Format d'affichage des dates
 + Enregistrement de la taille d'affichage si pas en plein écran
 * Ne pas exécuter d'opérations d'écritures si lancé depuis un CD
 * Changement de la hauteur de la liste via la souris
 * Le jeu de dates étendues sera mise à jour dans un bloc séparé
 
[1.4]
 + nouvelle catégorie d'événements personnels - célébrations (possibilité d'éditer à partir du calendrier > menu contextuel)
 + formats pour les célébrations (possibilité d'éditer à partir du calendrier {Options->Calendrier->Choix->Bouton «>»})
 * modifié les raccourcis pour l'édition des notes/célébrations (voir Clavier)
 * Options panneaux supprimées
 * menu contextuel pour calendrier étendu

[1.3]
 + Possibilité d'utiliser plusieurs évènements d'un même type pour une même date (symbole %n)
 * Nouvelle interface pour l'édition de notes personnelles
 * Suppression de l'option "Encadré épais" dans les options générales
 + Aspect réglable pour la date du jour dans le calendrier

 + Fichier langue (Czech)
 + Calendrier (Canada, English)
 + Calendrier (France, French)
 * Calendrier (Belgium, French)
 + Calendrier (Czechia, Czech)
 + Calendrier étendu (Czech, "Name-day")

[1.2]
 +  possibilité d'utiliser des événements avec un cycle de n jours
 +  réglage pour la limitation d'affichage de certains types d'événements
 +  possibilité de choisir le marqueur en fonction du type d'événement
 *  réduction de temps de chargement des listes d'événements
 *  changement dans la structure des options
 
[1.1]
 /  liste des dates affichées correctement sous Windows98
 +  nouveau type de calendrier - Date étendue
 +  possibilité de définir une date par jour de la semaine relativement au début ou la fin d'un mois
 +  polices préférées sauvegardées dans un fichier séparé
 *  la structure des options est modifiée

 +  Fichier langue (German)
 +  Fichier langue (Polish)
 +  Fichier langue (Spanish)
 +  dates set (Germany, German)
 +  2 calendrier étendus (Français, "Saint(s) du jour")
 +  readme-file (German)
 +  readme-file (Spanish)
 +  personal dates sample (German)
 
[1.01]

 /  bogue lors de l'impossibilité d'ajouter des notes
 +  possibilité d'ajouter et de supprimer des calendriers personnels directement du module
 +  possibilité de ne pas choisir de calendrier personnel

 +  Fichier langue (Dutch)
 +  Fichier langue (French)
 +  Calendrier (Belgium, French)
 +  Fichier readme-fra (French)
 +  Calendrier personnel d'exemple (French)
