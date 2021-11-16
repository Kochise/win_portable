Virtual Disk, Version 1.30 finale
  Module Syst�me de Fichiers pour Total Commander; permet de monter des images de disque en lecteur virtuels suppl�mentaires dans le Syst�me.

Auteur du module: Konstantin Vlasov, �2009
Page Internet : http://flint-inc.ru
Courriel :   support@flint_inc.ru

Auteur du pilote de disque virtuel : Bo Branten, 2004
Page Internet : http://www.acc.umu.se/~bosse/
Courriel :   bosse@acc.umu.se

Description
--------------

� Ce module permet de monter des images de disque comme lecteurs suppl�mentaires.
Il ne fonctionne QUE sous Windows NT � 2000� XP � 2003 32 et 64 bits.

� Quand une image est mont�e, un nouveau lecteur appara�t dans le Syst�me. Sa lettre a d�j� �t� sp�cifi�e, et il contient tout ce que contient le fichier d'image. 
 
� Les trois modes suivants sont disponibles : 
1. HDD = Lecteur �Disque dur� �> �mulation de lecteur de disque dur local. Dans ce mode, l'on peut monter des images de simples partitions de disques durs format�es en syt�me FAT ou NTFS, et aussi des images de lecteurs de disquettes et m�moire r�inscriptible (�Flash�) sous FAT.

2. FDD = �mulation de lecteur de disquette. Ce mode permet de monter les m�mes images que le mode HDD, except� les partitions NTFS (Windows n'assume pas l'utilisation de NTFF pour les lecteurs de disquette).

3. CD�DVD = �mulation de lecteur c�d�rom (le syst�me ne reconna�t - � son point de vue - aucune diff�rence entre c�d�rom et DVD).
Ce mode s'utilise pour monter des images de disques c�d�rom et DVD. On peut employer des formats d'image *.ISO et parfois *.BIN et *.NRG. Malheureusement, des informations pr�cises pour savoir si l'on peut monter en BIN et NRG sont absentes�

� Pour les modes HDD et FDD, l'on dispose �galement du mofificateur �Lecture seule� qui permet d'emp�cher ma modification de l'image mont�e. L'�mulation de lecteur c�d�rom est toujours ex�cut�e en mode �Lecture seule�.

Installation
--------------

� Avant d'installer le module, il est n�cessaire d'installer le pilote de disque (virtuel). 
- Ouvrez le menu local sur le fichier �vd_filedisk.inf� dans le sous-r�pertoire �VD_Driver� et choisissez la commande �Installer�.
- Ensuite, le syst�me installera le pilote �vd_filedisk.sys� et demandera de red�marrer la machine. Veuiller noter que le red�marrages est n�cessaire pour faire que le pilote - et en cons�quence, le module - fonctionne.
- Si l'on ne dispose pas de commande �Installer� dans le menu local ou que le fichier INF manque, on peut toujours utiliser l'ancienne m�thode ci-dessous :
- Ancienne m�thode : Copiez le fichier �filedisk.sys� dans le r�pertoire C:\Windows\System32\Drivers (ici, �C:\Windows\� peut �tre remplac� par le chemin r�el  de votre r�pertoire �Windows�).  Apr�s quoi, importez le fichier �filedisk.reg� dans la Base de registre du Syst�me (double-clic dessus), et red�marrez l'ordinateur. 

	>�< IMPORTANT ! >�<
� Dans les versions 64 bits de Windows, toutes les op�rations d'installation du pilote d�crites ci-dessus doivent �tre ex�cut�es depuis l'Explorateur de Window ! Si l'on tente de le faire depuis Total Commander, le pilote ne sera pas install� ! Cela est d� au fait que Total Commander est une application 32 bits, et que dans les Windows 64 bits, il ne fonctionne que dans l'environnement �Mode d'�mulation 32 bits�.

� Installez ensuite le module �VirtualDisk.wfx� lui-m�me de la fa�on habituelle :
Menu Options >>  Configuration >> Modules additionnels >> Modules �Syst�mes de Fichiers� >> Bouton "Agencer".
� On peut aussi employer le mode d'installation automatique en ouvrant l'archive, mais il doit �tre activ� - et il y a un probl�me, car comme dit auparavant, il faut d'abord installer le pilote � qui se trouve dans l'archive ! Il faut alors installer le pilote � la main, selon l'ancienne m�thode expliqu�e pr�c�demment.
 
(�) Nota du traducteur : c'est la cas de toute installation de module par un programme externe, qui peut par ailleurs se r�v�ler sur certains points meilleur que les nouvelles fonctions d'installation de T.C. 

Travailler avec le module
-------------------------------
� Apr�s l'installation, un nouveau r�pertoire appara�t dans les �Favoris R�seau� de Total Commander : �Disques Virtuels �
(Virtual Disks). Dans ce r�pertoire se place une liste de fichiers-images. Au d�part, cette liste est vide. Pour y ajouter des images, copiez le fichier-image dans le r�pertoire du module. 
- Ce n'est pas l'image elle-m�me qui est copi�e, mais le module m�morise simplement un lien vers elle. 
- Pour exclure l'image de la liste, supprimez-la de la fa�on habituelle - le fichier originel ne sera ni d�t�rior� ni d�truit-.

� Pour personnaliser les param�tres d'image, appuyez sur �Entr�e� ou �Alt+Entr�e�, ou bien choisissez �Propri�t�s� dans le menu local (clic-droit). La bo�te de dialogue �Agencements� va appara�tre. Dans ce dialogue, l'on peut voir le chemin complet du fichier-image, son statut (mont�d�mont�), l'on peut aussi y choisir la lettre de lecteur et le mode de montage (HDD=Disque dur � FDD=Lecteur de disquette � CD=C�d�rom-DVD).  
� Pour monter l'image, appuyez sur le bouton �Monter�. Si l'image est mont�e, ce bouton sa l�gende devient imm�diatement �D�monter�.
� Au red�marrage de la machine, toutes les images mont�es passent en �D�mont�es�. Il y a une option �Monter au red�marrage�permettant de remontrer les images ad-hoc n�cessaires : si l'image �tait mont�e juste avant de red�marrer, est est mont�e � nouveau, sinon elle reste d�mont�e.
� Si des erreurs se produisent lors de cette op�ration de remontage automatique, elles sont inscrites au fichier-journal �VirtualDisk.log� qui se trouve dans le r�pertoire du module.


IMPORTANTS NOTA pour travailler avec le module :
------------------------------------------------------------------
1. Il est inopportun de monter / d�monter des images dans plusieurs instances de Total Commander.
   Cela peut conduire � la situation o� une copie de T.C. dit que l'image est mont�e, alors qu'une autre dit qu'elle est d�mont�e. � pr�sent, la plupart des situations de ce genre sont r�solues automatiquement, mais l'on pourrait trouver quelques r�fractaires.
   � � ceux qui aiment exp�rimenter, je ferais une suggestion : veuillez tester ce module, voyez comment il se comporte dans plusieurs copies de T.C. en m�me temps�? Je ne peux pas d�couvrir toutes les situations critiques tout seul, mais vous pouver m'aider � les trouver.�
   Pour de telles situations critiques, il y a un bouton suppl�mentaire ��tat bistable� sur le dialogue des Agencements.
   Ce bouton ne fait que changer l'�tat binaire du "drapeau" (flag) de montage du logiciel, et n'affecte pas le montage r�el.
2. Les images-c�d�rom ne peuvent �tre mont�es qu'en mode �CD-C�d�rom�, et celles de FAT en HDD et FDD et NTFS uniquement en mode HDD.
   Sinon, l'image ne sera pas mont�e, le disque virtuel appara�tra, mais en essayant d'y acc�der, vous aurez une erreur disant que le lecteur n'est pas format� .

3. Le nouveau lecteur n'est pas visible pour des programmes qui obtiennent les lecteurs depuis la liste des dispositifs (mat�riels) du Syst�me. C'est ainsi, car ce nouveau lecteur n'est pas un disque physique du Syst�me, mais juste un lecteur logique. Dans les versions futures, j'essayerai d'ajouter la cr�ation d'un dispositif Syst�me appropri�.

FAQ (Foire Aux Questions)
----------------------------------
Q. J'ai install� le module, essay� de monter une image, et obtenu l'erreur :
     Erreur en cr�ant le lecteur virtuel ! 
     Le pilote n'est probablement pas install�.
R. Pour que le module fonctionne, il est n�cessaire d'installer le pilote; il faudrait l'installer manuellement, car l'installation automatique de TC ne le fait pas ! Veuillez lire comment installer le pilote dans la section �Installation� ci-dessus..
------------------------
Q. En essayant de moner une image, j'ai l'erreur suivante : 
     Erreur en cr�ant le lecteur virtuel !
     Trop de lecteurs de ce types sont d�j� mont�s.
R. Par d�faut, le pilote ne permet de monter que quatre dispositifs de chaque type (p. ex. 4 �FDD� virtuels, 4 �CD� et 4 [url=http://perso.wanadoo.fr/charries/relais/�]-HDD[/url]). 
- S'il  vous en faut plus, il faut chager la valeur dans le registre du syst�me :
     [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\VD_FileDisk\Parameters]
     NumberOfDevices=dword:00000004
   Apr�s quoi, il faudra red�marrer la machine.
------------------------
Q. En montant une image, le nouveau lecteur est bien cr��, mais je ne peux y acc�der, une erreur s'affiche.
R. Cela signifie que le format de l'image n'est pas assum� par le module - plus exactement, par le pilote - . 
Assurez-vous de n'avoir pas accidentellement mont� une image CD�DVD en HDD et r�ciproquement. Veuillez aussi noter que la gamme de formats assum�s est tr�s limit�e actuellement (voir la section �Description� pour les d�tails).
------------------------
Q. Dans mon Windows XP�2003 x64 le module ne monte pas les images. Qu'y a t-il de faux ?
R. Il se peut que vous n'ayez pas install� le pilote correctement. Dans les syst�mes Windows 64 bits, le pilote ne devrait �tre install� que depuis Explorateur de Windows et pas depuis Total Commander car TC est une application 32 bits; pour de telles applications, Windows x64 remplace les dossiers syst�me et les cl�s de registre  . Il en r�sulte que l'installation du pilote est ex�cut�e dans le mauvais dossier.
------------------------

Nota de l'Auteur : 

� Juste �Au cas z'o��, j'ai �crit cet AVERTISSEMENT :
----------------------------------------
Mon module fonctionne avec des fonctions de Windows �bas-niveau�, ce qui n'est pas d'une grande s�curit�. Je ne peux garantir que le programme marche absolument correctement (surtout parce que je n'ai pas beaucoup travaill� sur la programmation de pilotes).
Donc, je distribue ce module �tel-quel�, sans la moindre garantie ou promesse. Vous l'utilisez � vos risques et p�rils. 
Je veux juste ajouter que j'essayerai de corriger toutes les bogues trouv�es dans toute la mesure du possible. Apr�s tout, j'emploie moi-m�me ce module, et il est de mon propre int�r�t qu'il fonctionne de fa�on s�re��


PR�VISIONS�
-------------------

* Travailler correctement avec plusieurs instances de T.C.
* Ajouter un nouveau lecteur dans la liste des lecteurs physiques du Syst�me.
* Afficher quelles images sont mont�es (impossible actuellement).
* Prise en charge de formats d'images hors standard.
* Installation automatique du pilote.
----------------------------------------------------------------------------------------------
Traduction : Claude Charries, alias �Clo� charries � wanadoo POINT fr - 29/05/2006 - 03:24
