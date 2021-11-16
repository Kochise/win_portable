Virtual Disk, Versión 1.3 final
  FS-plugin para Total Commander que permite montar imágenes de discos como
  unidades virtuales adicionales en el sistema.

Autor del plugin: Konstantin Vlasov, 2009
Página Web: http://flint-inc.ru
E-mail:   support@flint_inc.ru

El controlador esta basado en el proyecto open-source FileDisk de Bo Branten, 2004
Página Web: http://www.acc.umu.se/~bosse/
E-mail:   bosse@acc.umu.se


Descripción
-----------

Este plugin permite montar imágenes de disco como unidades adicionales. Solo trabaja
bajo Windows 2000/XP/2003.
Cuando una imagen es montada, una nueva unidad aparece en el sistema. Su letra
es especificada antes, y la nueva unidad presenta todos los contenidos del archivo de imagen.
Los siguientes tres modos de emulación están disponibles:
  1. HDD - emulación de disco duro local. En este modod uno puede montar imágenes de
     particiones individuales de discos duros formateados en sistemas FAT o NTFS, y también
     imágenes de disquetes y unidades-flash con el sistema de archivos FAT.
  2. FDD - emulación de disquete. Este modo permite montar las mismas imágenes que en
     el modo HDD, excepto las particiones NTFS (Windows no permite usar NTFS en
     disquetes).
  3. CD/DVD - emulación de CD-drive (no hay diferencia entre CD y DVD en el sistema).
     Este modo es usado para montar imágenes de discos CD y DVD. Puede usar formato ISO y
     algunas de las imágenes BIN y NRG. (Desafortunadamente, la información exacta, de cuales
     imágenes BIN y NRG pueden ser montadas, está ausente.)

Puede montar imágenes CD ISO- y algunas BIN, y archivos de imagen arbitrarios que
son reconocidos por Windows (FAT y NTFS), incluyendo archivos-IMG - imágenes de
disquete. Cuando una imagen es montada, una nueva unidad aparece en el sistema. Su
letra es especificada previamente, y presenta todo el contenido del archivo imagen.
Tres modos están disponibles:
  HDD - emulación de unidad de disco duro local.
  FDD - emulación de unidad de disquete.
  CD/DVD - emulación de CD-drive (no hay diferencia entre CD y DVD en el sistema).
Además está el modificador "Solo lectura" que deshabilita modificaciones a la imagen
montada. La emulación CD-drive siempre es ejecutada en modo Solo-Lectura.


Instalación
-----------

Antes de instalar el plugin, es necesario instalar el controlador de disco. Abra el menú
contextual para el archivo filedisk.sys y seleccione el comando "Instalar". El sistema
instalará el controlador y preguntará si reinicia la computadora. ¡Note que el reinicio
es necesario para que el plugin trabaje!

  Si no tiene el comando "Instalar" en el menú contextual del archivo INF, puede
  usar el método antiguo de instalar el controlador: copiar el archivo vd_filedisk.sys en
  la carpeta Windows\System32\Drivers\, luego importar el archivo vd_filedisk.reg dentro
  del registro con doble-click en él, y reiniciar la computadora.


Ahora puede instalar el plugin VirtualDisk.wfx del modo normal: ir al diálogo de config.,
seleccionar Operación, luego pulsar el botón FS-Plugin, en el diálogo que aparece presione
Agregar y luego seleccione el archivo-WFX del plugin. También puede usar la característica
de instalación automática de plugins que ha sido agregada en TotalCommander 6.50: en este
caso el plugin será instalado automáticamente cuando el archivo que contiene al plugin.
Pero note que siempre necesita instalar el controlador manualmente, como se describe arriba.

PS: En la subcarpeta x64 esta un controlador para versiones de 64-bits de Windows. Como yo no
tengo esta versión de Windows instalada, no he probado ninguna de las maneras de instalar el
controlador, ni su operatividad. ¡Úselo bajo su propio riesgo!

ATENCIÓN!!!
En la primera versión del plugin (1.0) el formato de registro era distinto al de ahora. Si
esta usando 1.1 o una versión más reciente, puede fácilmente actualizar el plugin a la
versión actual. Si aún esta en la 1.0, tras actualizar se borrará la lista de sus discos.
Si su lista es muy grande y no quiere re-agregar los discos manualmente, por favor,
escríbame a la dirección:
support@flint-inc.ru
y yo le enviaré el programa para convertir registros de formato-antiguo en el nuevo.


Trabajar con el plugin
----------------------

Después de instalar una nueva carpeta aparece en el Entorno de Red de Total Commander -
"Virtual Disks". En esta carpeta existe una lista de archivos de imágenes. Al inicio esta lista
esta vacía. Para agregar imágenes solo copie el archivo de imagen en la carpeta del plugin.
La imagen en sí no es copiada, el plugin solo recuerda el enlace a ella. Para excluir la imagen
de la lista, solo bórrela del modo normal - el archivo original no será corrompido o borrado.
Para cambiar los parámetros de la imagen, presione Enter o Alt+Enter, o seleccione "Propiedades"
desde el menú contextual de click-derecho. El diálogo de opciones aparecerá. En este diálogo
puede ver la ruta completa del archivo de imagen, su estado (montado/desmontado), y además puede
seleccionar la letra de unidad y el modo de montaje (HDD/FDD/CD). En el futuro será posible usar
una opción más - restaurar imágenes montadas al reiniciar. Ahora esto esta deshabilitado y las
imágenes están desmontadas al reiniciar.
Para montar imágenes presione el botón Montar. Si la imagen esta montada, este botón esta
cambiado a Desmontar.


NOTAS IMPORTANTES para trabajar con el plugin:
----------------------------------------------

1. No es conveniente montar/desmontar imágenes en diferentes instancias de Total Commander.
   Puede darse la situación de cuando una copia de TC dice que la imagen esta montada, y otra
   dice que no esta montada. Actualmente muchas de tales situaciones son automáticamente
   resueltas pero puede haber situaciones no previstas.
   Para quienes gustan de experimentar tengo una sugerencia - por favor, prueben este plugin:
   ¿cómo trabaja en varias copias de TC simultáneamente? No puedo hallar todas las situaciones 
   malas yo solo, pueden ayudarme a encontrarlas.
   Para situaciones malas hay un botón adicional en el diálogo Opciones - "Alternar estado".
   Este botón solo alterna la señal de montaje del software y no afecta el montaje real..
2. Las imágenes-CD solo pueden ser montadas en modo-CD, imágenes FAT en modos HDD y FDD, e
   imágenes NTFS solo en modo HDD. De otro modo la imagen será montada, aparecerá el disco 
   virtual, pero al tratar de acceder a él obtendrá el error de disco no formateado.
3. La nueva unidad no es visible para programas que listen unidades desde la lista de dispositivos
   del sistema. Es así porque esta nueva unidad no es un dispositivo del sistema, solo una unidad
   lógica. En versiones futuras intentaré agregar la creación del dispositivo apropiado del sistema.


FAQ (Respuestas a preguntas frecuentes)
---------------------------------------
Q. He instalado el plugin, intento montar una imagen y obtengo el siguiente error:
     Error while creating the virtual drive!
     El controlador probablemente no está instalado.
A. Para que el plugin trabaje es necesario instalar el controlador; debe ser instalado
   manualmente, ¡la instalación automática del plugin en TC no instala el controlador! Como
   instalar el controlador puede leerlo arriba, en la sección "Instalación".

Q. Al intentar montar una imagen obtengo el siguiente error:
     Error while creating the virtual drive!
     There are too many drives of this type mounted already.
A. Por omisión, el controlador permite montar solo 4 dispositivos de cada tipo (p.e. 4 virtual
   FDDs, 4 CDs y 4 HDDs). Si necesita más, puede cambiar este valor en el registro
   del sistema:
     [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\VD_FileDisk\Parameters]
     NumberOfDevices=dword:00000004
   Luego necesitará reiniciar la computadora.

Q. Cuando monto la imagen la nueva unidad es creada, pero no puedo accesar a ella: se presenta
   un error.
A. Esto significa que el formato de la imagen no es soportado por el (más exactamente -
   por el controlador). Compruebe que no montado accidentalmente imágenes CD/DVD como HDD o
   viceversa. Además note que el conjunto de formatos actualmente soportados es muy limitado
   (ver la sección "Descripción" para detalles).

Q. En mi Windows XP/2003 x64 el plugin no monta imágenes. ¿Qué está mal?
A. Quizás, ha instalad el controlador incorrectamente. En sistemas Windows 64-bits el controlador
   debe ser instalado solo desde el Explorador de Windows Explorer, no desde Total Commander,
   porque TC es un aplicación de  32-bit; para tales aplicaciones Windows x64 substituye carpetas
   del sistema y claves de registro. Como resultado, la instalación del controlador es ejecutada
   dentro de la carpeta equivocada.



Por si acaso, he escrito esta ADVERTENCIA:
------------------------------------------

Mi plugin trabaja con funciones de bajo-nivel de Windows, y esto no es seguro. No puedo garantizar
que el programa opera correctamente (especialmente porque yo no he trabajado mucho con programación de controladores). Por tanto, yo distribuyo este plugin "tal cual", sin garantías o promesas. Úselo bajo su propio riesgo.
Solo quiero agregar, que en tanto pueda yo intentaré corregir todos los bugs hallados. Después de 
todo, yo mismo uso este plugin, y estoy interesado en trabajar seguro...


Planes futuros:
---------------

* Montar imágenes al reiniciar.
* Corregir operación desde varias instancias de TC.
* Agregar nueva unidad en la lista de dispositivos del sistema.
* Mostrar cuales imágenes están montadas. (actualmente imposible)
* Soporte para formatos de imágenes no estándar.
* Instalación automática del controlador.
