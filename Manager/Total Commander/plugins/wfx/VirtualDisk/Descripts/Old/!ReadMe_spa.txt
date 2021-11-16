Virtual Disk, Versi�n 1.3 final
  FS-plugin para Total Commander que permite montar im�genes de discos como
  unidades virtuales adicionales en el sistema.

Autor del plugin: Konstantin Vlasov, 2009
P�gina Web: http://flint-inc.ru
E-mail:   support@flint_inc.ru

El controlador esta basado en el proyecto open-source FileDisk de Bo Branten, 2004
P�gina Web: http://www.acc.umu.se/~bosse/
E-mail:   bosse@acc.umu.se


Descripci�n
-----------

Este plugin permite montar im�genes de disco como unidades adicionales. Solo trabaja
bajo Windows 2000/XP/2003.
Cuando una imagen es montada, una nueva unidad aparece en el sistema. Su letra
es especificada antes, y la nueva unidad presenta todos los contenidos del archivo de imagen.
Los siguientes tres modos de emulaci�n est�n disponibles:
  1. HDD - emulaci�n de disco duro local. En este modod uno puede montar im�genes de
     particiones individuales de discos duros formateados en sistemas FAT o NTFS, y tambi�n
     im�genes de disquetes y unidades-flash con el sistema de archivos FAT.
  2. FDD - emulaci�n de disquete. Este modo permite montar las mismas im�genes que en
     el modo HDD, excepto las particiones NTFS (Windows no permite usar NTFS en
     disquetes).
  3. CD/DVD - emulaci�n de CD-drive (no hay diferencia entre CD y DVD en el sistema).
     Este modo es usado para montar im�genes de discos CD y DVD. Puede usar formato ISO y
     algunas de las im�genes BIN y NRG. (Desafortunadamente, la informaci�n exacta, de cuales
     im�genes BIN y NRG pueden ser montadas, est� ausente.)

Puede montar im�genes CD ISO- y algunas BIN, y archivos de imagen arbitrarios que
son reconocidos por Windows (FAT y NTFS), incluyendo archivos-IMG - im�genes de
disquete. Cuando una imagen es montada, una nueva unidad aparece en el sistema. Su
letra es especificada previamente, y presenta todo el contenido del archivo imagen.
Tres modos est�n disponibles:
  HDD - emulaci�n de unidad de disco duro local.
  FDD - emulaci�n de unidad de disquete.
  CD/DVD - emulaci�n de CD-drive (no hay diferencia entre CD y DVD en el sistema).
Adem�s est� el modificador "Solo lectura" que deshabilita modificaciones a la imagen
montada. La emulaci�n CD-drive siempre es ejecutada en modo Solo-Lectura.


Instalaci�n
-----------

Antes de instalar el plugin, es necesario instalar el controlador de disco. Abra el men�
contextual para el archivo filedisk.sys y seleccione el comando "Instalar". El sistema
instalar� el controlador y preguntar� si reinicia la computadora. �Note que el reinicio
es necesario para que el plugin trabaje!

  Si no tiene el comando "Instalar" en el men� contextual del archivo INF, puede
  usar el m�todo antiguo de instalar el controlador: copiar el archivo vd_filedisk.sys en
  la carpeta Windows\System32\Drivers\, luego importar el archivo vd_filedisk.reg dentro
  del registro con doble-click en �l, y reiniciar la computadora.


Ahora puede instalar el plugin VirtualDisk.wfx del modo normal: ir al di�logo de config.,
seleccionar Operaci�n, luego pulsar el bot�n FS-Plugin, en el di�logo que aparece presione
Agregar y luego seleccione el archivo-WFX del plugin. Tambi�n puede usar la caracter�stica
de instalaci�n autom�tica de plugins que ha sido agregada en TotalCommander 6.50: en este
caso el plugin ser� instalado autom�ticamente cuando el archivo que contiene al plugin.
Pero note que siempre necesita instalar el controlador manualmente, como se describe arriba.

PS: En la subcarpeta x64 esta un controlador para versiones de 64-bits de Windows. Como yo no
tengo esta versi�n de Windows instalada, no he probado ninguna de las maneras de instalar el
controlador, ni su operatividad. ��selo bajo su propio riesgo!

ATENCI�N!!!
En la primera versi�n del plugin (1.0) el formato de registro era distinto al de ahora. Si
esta usando 1.1 o una versi�n m�s reciente, puede f�cilmente actualizar el plugin a la
versi�n actual. Si a�n esta en la 1.0, tras actualizar se borrar� la lista de sus discos.
Si su lista es muy grande y no quiere re-agregar los discos manualmente, por favor,
escr�bame a la direcci�n:
support@flint-inc.ru
y yo le enviar� el programa para convertir registros de formato-antiguo en el nuevo.


Trabajar con el plugin
----------------------

Despu�s de instalar una nueva carpeta aparece en el Entorno de Red de Total Commander -
"Virtual Disks". En esta carpeta existe una lista de archivos de im�genes. Al inicio esta lista
esta vac�a. Para agregar im�genes solo copie el archivo de imagen en la carpeta del plugin.
La imagen en s� no es copiada, el plugin solo recuerda el enlace a ella. Para excluir la imagen
de la lista, solo b�rrela del modo normal - el archivo original no ser� corrompido o borrado.
Para cambiar los par�metros de la imagen, presione Enter o Alt+Enter, o seleccione "Propiedades"
desde el men� contextual de click-derecho. El di�logo de opciones aparecer�. En este di�logo
puede ver la ruta completa del archivo de imagen, su estado (montado/desmontado), y adem�s puede
seleccionar la letra de unidad y el modo de montaje (HDD/FDD/CD). En el futuro ser� posible usar
una opci�n m�s - restaurar im�genes montadas al reiniciar. Ahora esto esta deshabilitado y las
im�genes est�n desmontadas al reiniciar.
Para montar im�genes presione el bot�n Montar. Si la imagen esta montada, este bot�n esta
cambiado a Desmontar.


NOTAS IMPORTANTES para trabajar con el plugin:
----------------------------------------------

1. No es conveniente montar/desmontar im�genes en diferentes instancias de Total Commander.
   Puede darse la situaci�n de cuando una copia de TC dice que la imagen esta montada, y otra
   dice que no esta montada. Actualmente muchas de tales situaciones son autom�ticamente
   resueltas pero puede haber situaciones no previstas.
   Para quienes gustan de experimentar tengo una sugerencia - por favor, prueben este plugin:
   �c�mo trabaja en varias copias de TC simult�neamente? No puedo hallar todas las situaciones 
   malas yo solo, pueden ayudarme a encontrarlas.
   Para situaciones malas hay un bot�n adicional en el di�logo Opciones - "Alternar estado".
   Este bot�n solo alterna la se�al de montaje del software y no afecta el montaje real..
2. Las im�genes-CD solo pueden ser montadas en modo-CD, im�genes FAT en modos HDD y FDD, e
   im�genes NTFS solo en modo HDD. De otro modo la imagen ser� montada, aparecer� el disco 
   virtual, pero al tratar de acceder a �l obtendr� el error de disco no formateado.
3. La nueva unidad no es visible para programas que listen unidades desde la lista de dispositivos
   del sistema. Es as� porque esta nueva unidad no es un dispositivo del sistema, solo una unidad
   l�gica. En versiones futuras intentar� agregar la creaci�n del dispositivo apropiado del sistema.


FAQ (Respuestas a preguntas frecuentes)
---------------------------------------
Q. He instalado el plugin, intento montar una imagen y obtengo el siguiente error:
     Error while creating the virtual drive!
     El controlador probablemente no est� instalado.
A. Para que el plugin trabaje es necesario instalar el controlador; debe ser instalado
   manualmente, �la instalaci�n autom�tica del plugin en TC no instala el controlador! Como
   instalar el controlador puede leerlo arriba, en la secci�n "Instalaci�n".

Q. Al intentar montar una imagen obtengo el siguiente error:
     Error while creating the virtual drive!
     There are too many drives of this type mounted already.
A. Por omisi�n, el controlador permite montar solo 4 dispositivos de cada tipo (p.e. 4 virtual
   FDDs, 4 CDs y 4 HDDs). Si necesita m�s, puede cambiar este valor en el registro
   del sistema:
     [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\VD_FileDisk\Parameters]
     NumberOfDevices=dword:00000004
   Luego necesitar� reiniciar la computadora.

Q. Cuando monto la imagen la nueva unidad es creada, pero no puedo accesar a ella: se presenta
   un error.
A. Esto significa que el formato de la imagen no es soportado por el (m�s exactamente -
   por el controlador). Compruebe que no montado accidentalmente im�genes CD/DVD como HDD o
   viceversa. Adem�s note que el conjunto de formatos actualmente soportados es muy limitado
   (ver la secci�n "Descripci�n" para detalles).

Q. En mi Windows XP/2003 x64 el plugin no monta im�genes. �Qu� est� mal?
A. Quiz�s, ha instalad el controlador incorrectamente. En sistemas Windows 64-bits el controlador
   debe ser instalado solo desde el Explorador de Windows Explorer, no desde Total Commander,
   porque TC es un aplicaci�n de  32-bit; para tales aplicaciones Windows x64 substituye carpetas
   del sistema y claves de registro. Como resultado, la instalaci�n del controlador es ejecutada
   dentro de la carpeta equivocada.



Por si acaso, he escrito esta ADVERTENCIA:
------------------------------------------

Mi plugin trabaja con funciones de bajo-nivel de Windows, y esto no es seguro. No puedo garantizar
que el programa opera correctamente (especialmente porque yo no he trabajado mucho con programaci�n de controladores). Por tanto, yo distribuyo este plugin "tal cual", sin garant�as o promesas. �selo bajo su propio riesgo.
Solo quiero agregar, que en tanto pueda yo intentar� corregir todos los bugs hallados. Despu�s de 
todo, yo mismo uso este plugin, y estoy interesado en trabajar seguro...


Planes futuros:
---------------

* Montar im�genes al reiniciar.
* Corregir operaci�n desde varias instancias de TC.
* Agregar nueva unidad en la lista de dispositivos del sistema.
* Mostrar cuales im�genes est�n montadas. (actualmente imposible)
* Soporte para formatos de im�genes no est�ndar.
* Instalaci�n autom�tica del controlador.
