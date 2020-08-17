Virtual Disk, Version 1.30 finale
  Module Système de Fichiers pour Total Commander; permet de monter des images de disque en lecteur virtuels supplémentaires dans le Système.

Auteur du module: Konstantin Vlasov, ©2009
Page Internet : http://flint-inc.ru
Courriel :   support@flint_inc.ru

Auteur du pilote de disque virtuel : Bo Branten, 2004
Page Internet : http://www.acc.umu.se/~bosse/
Courriel :   bosse@acc.umu.se

Description
--------------

• Ce module permet de monter des images de disque comme lecteurs supplémentaires.
Il ne fonctionne QUE sous Windows NT ¦ 2000¦ XP ¦ 2003 32 et 64 bits.

• Quand une image est montée, un nouveau lecteur apparaît dans le Système. Sa lettre a déjà été spécifiée, et il contient tout ce que contient le fichier d'image. 
 
• Les trois modes suivants sont disponibles : 
1. HDD = Lecteur “Disque dur” —> émulation de lecteur de disque dur local. Dans ce mode, l'on peut monter des images de simples partitions de disques durs formatées en sytème FAT ou NTFS, et aussi des images de lecteurs de disquettes et mémoire réinscriptible (“Flash”) sous FAT.

2. FDD = émulation de lecteur de disquette. Ce mode permet de monter les mêmes images que le mode HDD, excepté les partitions NTFS (Windows n'assume pas l'utilisation de NTFF pour les lecteurs de disquette).

3. CD¦DVD = émulation de lecteur cédérom (le système ne reconnaît - à son point de vue - aucune différence entre cédérom et DVD).
Ce mode s'utilise pour monter des images de disques cédérom et DVD. On peut employer des formats d'image *.ISO et parfois *.BIN et *.NRG. Malheureusement, des informations précises pour savoir si l'on peut monter en BIN et NRG sont absentes…

• Pour les modes HDD et FDD, l'on dispose également du mofificateur “Lecture seule” qui permet d'empêcher ma modification de l'image montée. L'émulation de lecteur cédérom est toujours exécutée en mode “Lecture seule”.

Installation
--------------

• Avant d'installer le module, il est nécessaire d'installer le pilote de disque (virtuel). 
- Ouvrez le menu local sur le fichier “vd_filedisk.inf” dans le sous-répertoire «VD_Driver» et choisissez la commande “Installer”.
- Ensuite, le système installera le pilote “vd_filedisk.sys” et demandera de redémarrer la machine. Veuiller noter que le redémarrages est nécessaire pour faire que le pilote - et en conséquence, le module - fonctionne.
- Si l'on ne dispose pas de commande “Installer” dans le menu local ou que le fichier INF manque, on peut toujours utiliser l'ancienne méthode ci-dessous :
- Ancienne méthode : Copiez le fichier “filedisk.sys” dans le répertoire C:\Windows\System32\Drivers (ici, “C:\Windows\” peut être remplacé par le chemin réel  de votre répertoire «Windows»).  Après quoi, importez le fichier “filedisk.reg” dans la Base de registre du Système (double-clic dessus), et redémarrez l'ordinateur. 

	>•< IMPORTANT ! >•<
• Dans les versions 64 bits de Windows, toutes les opérations d'installation du pilote décrites ci-dessus doivent être exécutées depuis l'Explorateur de Window ! Si l'on tente de le faire depuis Total Commander, le pilote ne sera pas installé ! Cela est dû au fait que Total Commander est une application 32 bits, et que dans les Windows 64 bits, il ne fonctionne que dans l'environnement “Mode d'émulation 32 bits”.

• Installez ensuite le module “VirtualDisk.wfx” lui-même de la façon habituelle :
Menu Options >>  Configuration >> Modules additionnels >> Modules «Systèmes de Fichiers» >> Bouton "Agencer".
• On peut aussi employer le mode d'installation automatique en ouvrant l'archive, mais il doit être activé - et il y a un problème, car comme dit auparavant, il faut d'abord installer le pilote … qui se trouve dans l'archive ! Il faut alors installer le pilote à la main, selon l'ancienne méthode expliquée précédemment.
 
(¤) Nota du traducteur : c'est la cas de toute installation de module par un programme externe, qui peut par ailleurs se révéler sur certains points meilleur que les nouvelles fonctions d'installation de T.C. 

Travailler avec le module
-------------------------------
• Après l'installation, un nouveau répertoire apparaît dans les «Favoris Réseau» de Total Commander : «Disques Virtuels »
(Virtual Disks). Dans ce répertoire se place une liste de fichiers-images. Au départ, cette liste est vide. Pour y ajouter des images, copiez le fichier-image dans le répertoire du module. 
- Ce n'est pas l'image elle-même qui est copiée, mais le module mémorise simplement un lien vers elle. 
- Pour exclure l'image de la liste, supprimez-la de la façon habituelle - le fichier originel ne sera ni détérioré ni détruit-.

• Pour personnaliser les paramètres d'image, appuyez sur ‹Entrée› ou ‹Alt+Entrée›, ou bien choisissez “Propriétés” dans le menu local (clic-droit). La boîte de dialogue “Agencements” va apparaître. Dans ce dialogue, l'on peut voir le chemin complet du fichier-image, son statut (monté¦démonté), l'on peut aussi y choisir la lettre de lecteur et le mode de montage (HDD=Disque dur ¦ FDD=Lecteur de disquette ¦ CD=Cédérom-DVD).  
• Pour monter l'image, appuyez sur le bouton “Monter”. Si l'image est montée, ce bouton sa légende devient immédiatement “Démonter”.
• Au redémarrage de la machine, toutes les images montées passent en “Démontées”. Il y a une option “Monter au redémarrage”permettant de remontrer les images ad-hoc nécessaires : si l'image était montée juste avant de redémarrer, est est montée à nouveau, sinon elle reste démontée.
• Si des erreurs se produisent lors de cette opération de remontage automatique, elles sont inscrites au fichier-journal “VirtualDisk.log” qui se trouve dans le répertoire du module.


IMPORTANTS NOTA pour travailler avec le module :
------------------------------------------------------------------
1. Il est inopportun de monter / démonter des images dans plusieurs instances de Total Commander.
   Cela peut conduire à la situation où une copie de T.C. dit que l'image est montée, alors qu'une autre dit qu'elle est démontée. À présent, la plupart des situations de ce genre sont résolues automatiquement, mais l'on pourrait trouver quelques réfractaires.
   « À ceux qui aiment expérimenter, je ferais une suggestion : veuillez tester ce module, voyez comment il se comporte dans plusieurs copies de T.C. en même temps…? Je ne peux pas découvrir toutes les situations critiques tout seul, mais vous pouver m'aider à les trouver.»
   Pour de telles situations critiques, il y a un bouton supplémentaire “État bistable” sur le dialogue des Agencements.
   Ce bouton ne fait que changer l'état binaire du "drapeau" (flag) de montage du logiciel, et n'affecte pas le montage réel.
2. Les images-cédérom ne peuvent être montées qu'en mode “CD-Cédérom”, et celles de FAT en HDD et FDD et NTFS uniquement en mode HDD.
   Sinon, l'image ne sera pas montée, le disque virtuel apparaîtra, mais en essayant d'y accéder, vous aurez une erreur disant que le lecteur n'est pas formaté .

3. Le nouveau lecteur n'est pas visible pour des programmes qui obtiennent les lecteurs depuis la liste des dispositifs (matériels) du Système. C'est ainsi, car ce nouveau lecteur n'est pas un disque physique du Système, mais juste un lecteur logique. Dans les versions futures, j'essayerai d'ajouter la création d'un dispositif Système approprié.

FAQ (Foire Aux Questions)
----------------------------------
Q. J'ai installé le module, essayé de monter une image, et obtenu l'erreur :
     Erreur en créant le lecteur virtuel ! 
     Le pilote n'est probablement pas installé.
R. Pour que le module fonctionne, il est nécessaire d'installer le pilote; il faudrait l'installer manuellement, car l'installation automatique de TC ne le fait pas ! Veuillez lire comment installer le pilote dans la section “Installation” ci-dessus..
------------------------
Q. En essayant de moner une image, j'ai l'erreur suivante : 
     Erreur en créant le lecteur virtuel !
     Trop de lecteurs de ce types sont déjà montés.
R. Par défaut, le pilote ne permet de monter que quatre dispositifs de chaque type (p. ex. 4 “FDD” virtuels, 4 “CD” et 4 [url=http://perso.wanadoo.fr/charries/relais/…]-HDD[/url]). 
- S'il  vous en faut plus, il faut chager la valeur dans le registre du système :
     [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\VD_FileDisk\Parameters]
     NumberOfDevices=dword:00000004
   Après quoi, il faudra redémarrer la machine.
------------------------
Q. En montant une image, le nouveau lecteur est bien créé, mais je ne peux y accéder, une erreur s'affiche.
R. Cela signifie que le format de l'image n'est pas assumé par le module - plus exactement, par le pilote - . 
Assurez-vous de n'avoir pas accidentellement monté une image CD¦DVD en HDD et réciproquement. Veuillez aussi noter que la gamme de formats assumés est très limitée actuellement (voir la section “Description” pour les détails).
------------------------
Q. Dans mon Windows XP¦2003 x64 le module ne monte pas les images. Qu'y a t-il de faux ?
R. Il se peut que vous n'ayez pas installé le pilote correctement. Dans les systèmes Windows 64 bits, le pilote ne devrait être installé que depuis Explorateur de Windows et pas depuis Total Commander car TC est une application 32 bits; pour de telles applications, Windows x64 remplace les dossiers système et les clés de registre  . Il en résulte que l'installation du pilote est exécutée dans le mauvais dossier.
------------------------

Nota de l'Auteur : 

« Juste “Au cas z'où”, j'ai écrit cet AVERTISSEMENT :
----------------------------------------
Mon module fonctionne avec des fonctions de Windows “bas-niveau”, ce qui n'est pas d'une grande sécurité. Je ne peux garantir que le programme marche absolument correctement (surtout parce que je n'ai pas beaucoup travaillé sur la programmation de pilotes).
Donc, je distribue ce module “tel-quel”, sans la moindre garantie ou promesse. Vous l'utilisez à vos risques et périls. 
Je veux juste ajouter que j'essayerai de corriger toutes les bogues trouvées dans toute la mesure du possible. Après tout, j'emploie moi-même ce module, et il est de mon propre intérêt qu'il fonctionne de façon sûre…»


PRÉVISIONS…
-------------------

* Travailler correctement avec plusieurs instances de T.C.
* Ajouter un nouveau lecteur dans la liste des lecteurs physiques du Système.
* Afficher quelles images sont montées (impossible actuellement).
* Prise en charge de formats d'images hors standard.
* Installation automatique du pilote.
----------------------------------------------------------------------------------------------
Traduction : Claude Charries, alias ‹Clo› charries À wanadoo POINT fr - 29/05/2006 - 03:24
