� Maximus, 2005__________________tcCalendar 2.0__________________mxmus@yandex.ru
::::Plugin de Lister para Total Commander
________________________________________________________________________________
I. DESCRIPCI�N:
 Calendario Universal.
 Permite registrar fechas nacionales y personales en distintas categor�as, con la posibilidad de limitar su exhibici�n.
 Para la mayor�a de las fechas hay formatos especiales que definen su comportamiento:
  - relativa a la Pascua Ortodoxa               - relativa a la Pascua Cat�lica
  - por n�mero de d�a de la semana en el mes    - fechas del calendario juliano
  - fechas m�viles                              - fechas con ciclo definido
  - fechas especiales
 Se puede configurar a gusto casi cualquier elemento del almanaque
 Posibilidad de exportar el almanaque a Excel o guardarlo como mapa de bits (BMP), y de guardar la lista de fechas como RTF o texto plano.
 Usando el m�dulo externo SunMoon.ecl, tcCalendar puede obtener informaci�n solar y lunar.
 Interfase multi-idioma (alem�n, checo, dan�s, eslovaco, esloveno, espa�ol, franc�s, griego, holand�s, h�ngaro, ingl�s, italiano, polaco, rumano, ruso, ucraniano)
________________________________________________________________________________
II. CONFIGURACI�N:
 1. Descomprimir el archivo en un directorio individual ([CLD_PATH])
 2. Instalar plugin:
     - Configuraci�n->Opciones...->Editar/Ver->Configurar visor interno...->LS-Plugins
     - a�adir tcCld a la lista de plugins
 3. Agregar nuevo bot�n a la barra de botones:
     - Configuraci�n->Barra de botones...->Agregar
     - llenar los campos de la siguiente manera:
         - 'Comando' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
         - 'Directorio inicial' = "[CLD_PATH]"
         - '�cono' = "[CLD_PATH]\tcCld.ico" o elija un �cono
             Nota: no ingrese comillas cuando ingresa los campos
 4. |opcional| Puede agregar tcCalendar en el men� 'Inicio':
     - {Inicio->Cambiar men� Inicio...->Agregar �tem...}
     - ingresar nombre del �tem de men� (por ejemplo: "tcCalendar")
     - llenar los campos de la siguiente manera:
        - 'Comando' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Directorio de inicio' = "[CLD_PATH]"
     NOTA: no ingrese comillas cuando rellena los campos
 5. |opcional| Si el �tem-4 fue ejecutado, puede definir un atajo para tcCalendar:
     - {Configuraci�n->Opciones...->Misc.}
     - elegir una combinaci�n conveniente en el grupo 'Redefinir teclas'
     - en la lista 'Comando', secci�n "User" seleccionar "cm_UserMenu" con el n�mero que tcCalendar tiene en el men� 'Inicio'
________________________________________________________________________________
III. TECLADO:
    O - mostrar/ocultar panel de opciones
    D - mostrar/ocultar lista de fechas
    Y - mostrar/ocultar panel de a�o
    R - recargar lista de fechas
    C - recargar almanaque
    G - mover lista de fechas al d�a seleccionado
    T - ir a un a�o determinado
 NUM+ - a�o siguiente
 NUM- - a�o anterior
 NUM* - a�o actual
Edici�n de Notas/aniversarios/formatos de aniversarios:
 Ctrl+Del   - eliminar
 Ctrl+Ins   - agregar
 Ctrl+<     - mover arriba (excepto formatos de aniversarios)
 Ctrl+>     - mover abajo (excepto formatos de aniversarios)
 Ctrl+Enter - aplicar cambios (bot�n 'OK')
________________________________________________________________________________
IV. MOUSE:
 Doble click - ir a un a�o determinado
Almanaque:
 Doble click           - editar notas
 Ctrl+click izquierdo  - editar aniversarios
 Shift+click izquierdo - editar fechas personales
 Click central         - mover lista de fechas al d�a se�alado
________________________________________________________________________________
V. ARCHIVOS:
Conjuntos de fechas:
 [CLD_PATH]\Dates\*.cdt - fechas comunes
 [CLD_PATH]\Dates\*.pdt - fechas personales y notas
 [CLD_PATH]\Dates\*.edt - conjunto extendido de fechas
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - muestra de conjuntos de fechas (para usar copiar a "[CLD_PATH]\Dates")
M�dulos externos:
 [CLD_PATH]\ExLib\*.ecl"
 [CLD_PATH]\ExLib\SunMoon.ecl - m�dulo para obtener informaci�n solar y lunar
 Se puede descargar SunMoon.ecl desde http://maximus.in.ua
Esquemas de fuentes:
 [CLD_PATH]\FontScheme\*.fnt
 [CLD_PATH]\tcCld.fnt - esquema actual
Archivos de idioma:
 [CLD_PATH]\Language\*.lng
Archivos de ayuda:
 [CLD_PATH]\ReadMe\readme_*.txt

________________________________________________________________________________
VI. FORMATO DE ARCHIVOS DE CONJUNTO DE FECHAS:
________________________________________________________________________________
 |Tipo|Secci�n        |Formato           |Comentarios
_|____|_______________|__________________|______________________________________
1|pdt |[Notes]        |dd.mm.yyyy=notas  |hacer notas en tcCalendar es m�s
 |    |               |                  |             conveniente (doble click)
 |    |               |                  |dd = d�a (2 d�gitos)
 |    |               |                  |mm = mes (2 d�gitos)
 |    |               |                  |yyyy - a�o (4 d�gitos)
_|____|_______________|__________________|______________________________________
2|cdt |[MainDates]    |dd.mm=fechas      |dd = d�a (2 d�gitos)
 |    |[Dates]        |                  |mm = mes (2 d�gitos)
_|    |[Religious]    |__________________|______________________________________
3|pdt |[PersonalDates]|ROEx=fechas       |fecha relativa a la pascua ortodoxa
 |    |[Celebrations] |                  |x = <d�as_despu�s_de_la_Pascua_ortodoxa>
 |edt |[Extended]     |                  |x = -<d�as_antes_de_la_Pascua_ortodoxa>
_|    |               |__________________|______________________________________
4|    |               |RCEx=fechas       |fecha relativa a la pascua cat�lica
 |    |               |                  |x = <d�as_despu�s_de_la_Pascua_cat�lica>
 |    |               |                  |x = -<d�as_antes_de_la_Pascua_cat�lica>
_|    |               |__________________|______________________________________
5|    |               |WDMdn=fechas      |fecha por n�mero de d�a de la semana en el mes
 |    |               |                  |                      (para todos los meses)
 |    |               |                  |d = <d�a_de_la_semana>
 |    |               |                  |                              0-domingo
 |    |               |                  |n = <n�mero_relativo_al_inicio_de_mes>
 |    |               |                  |n = -<n�mero_relativo_al_fin_de_mes>
_|    |               |__________________|______________________________________
6|    |               |WDMdn.mm=fechas   |fecha por n�mero del d�a de semana en el mes
 |    |               |                  |                 (para meses concretos)
 |    |               |                  |d = <d�a_de_la_semana>
 |    |               |                  |                             0-domingo
 |    |               |                  |n = <n�mero_relativo_al_inicio_de_mes>
 |    |               |                  |n = -<n�mero_relativo_al_fin_de_mes>
 |    |               |                  |mm = mes (2 d�gitos)
_|    |               |__________________|______________________________________
7|    |               |PDw.dd=fechas     |fecha especial (mensual)
 |    |               |                  |w = <d�a_de_la_semana>
 |    |               |                  |dd = <d�a>
_|    |               |__________________|______________________________________
8|    |               |PDYnnn=fechas     |fecha especial (anual)
 |    |               |                  |nnn = <n�mero_de_d�a_en_el_a�o>
_|    |               |__________________|______________________________________
9|    |               |Jdd.mm=fechas     |Fecha de calendario juliano
 |    |               |                  |dd = <d�a>
 |    |               |                  |mm = <mes>
_|____|_______________|__________________|______________________________________
1|pdt |[PersonalDates]|CDccc:dd.mm.yyyy  |fecha c�clica
0|    |               |-dd.mm.yyyy=fechas|ccc = <d�as_en_el_ciclo>
 |    |               |                  |dd.mm.yyyy (primer grupo) =
 |    |               |                  |                     <fecha_l�mite_izquierda>
 |    |               |                  |dd.mm.yyyy (segundo grupo) =
 |    |               |                  |                     <fecha_l�mite_derecha>
_|____|_______________|__________________|______________________________________
1|.cdt|[MainDates]    |MDdate:l,r>dti    |fecha trasladable (formato corto)
1|    |[Dates]        |           =fechas|l = <d�a_de_la_semana_l�mite_izquierdo>
 |    |[Religious]    |                  |r = <d�a_de_la_semana_l�mite_derecho>
 |.pdt|[PersonalDates]|                  |t = <d�a_de_la_semana_al_que_se_trasladar�>
 |    |[Celebrations] |                  |               l,r,t - [0..6] 0-domingo
 |.edt|[Extended]     |                  |d = <direcci�n_del_traslado>
 |    |               |                  |                N - siguiente, P - anterior
 |    |               |                  |i = <ignorar>
 |    |               |                  |                 I - se mostrar� solamente
 |    |               |                  |                     en caso de traslado
 |    |               |                  |fecha = formatos 2,3,4
_|    |               |__________________|______________________________________
1|    |               |MDdate:l1,r1>dt1  |fecha trasladable (formato largo)
2|    |               |:l2,r2>dt2i=fechas|                    similar al formato corto,
 |    |               |                  |           pero contiene dos condiciones
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |fecha trasladable (formato relativo)
3|    |               |   WDMwn.mm=fechas|dd = <d�a>
 |    |               |                  |mm = <mes>
 |    |               |                  |w = <d�a_de_la_semana>
 |    |               |                  |                       [0..6] 0-domingo
 |    |               |                  |n = <n�mero_relativo_al_comienzo_de_mes>
 |    |               |                  |n = -<n�mero_relativo_al_final_de_mes>
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |fecha trasladable (formato relativo a la pascua)
4|    |               |    WDMwn.mm=fecha|w = <d�a_de_la_semana>
 |    |               |                  |                       [0..6] 0-domingo
 |    |               |                  |n = <n�mero_relativo_al_comienzo_de_mes>
 |    |               |                  |n = -<n�mero_relativo_al_final_de_mes>
 |    |               |                  |fecha = formatos 3,4
_|____|_______________|__________________|______________________________________
NOTAS:
  1. fechas = fecha_1%nfecha_2 ... %nfecha_X
       para aniversarios - .pdt [Celebrations]:
       fecha_i = nombre_aniversario#a�o_inicio_aniversario#formato_n�mero
       formato_n�mero = n�mero de formato en lista de formatos (>=-0, -0 - formato predefinido)
                                              {Opciones->Fechas->Conjuntos->Bot�n '>'}
  2. notas = Nota_1%nNota_2 ... %nNota_X
  3. Formato general de fecha trasladable:
       MDfeha_de_origen:condici�n>fecha_a_la_que_se_mover�
       MDfeha_de_origen:condici�n_1>fecha_a_la_que_se_mover�_1:condici�n_2>fecha_a_la_que_se_mover�_2 (formato largo)
  4. Es posible editar notas y fechas simples (dd.mm), incluidos aniversarios, desde tcCalendar (ver MOUSE)
________________________________________________________________________________
EJEMPLOS:
  ROE0=Pascua                  23.04=Cumplea�os de Diego%nCumplea�os de Sergio
  ROE49=Trinidad               WDM02=segundo domingo de cada mes
  ROE-7=Domingo de ramos       WDM3-1=�ltimo mi�rcoles de cada mes
  RCE0=Pascua cat�lica         WDM51.11=primer viernes de Noviembre
  PD2.13=Martes 13             
  PDY256=d�a del programador

  J25.12=Navidad
    La iglesia ortodoxa celebra Navidad (y posiblemente otras fechas) de acuerdo al
    calendario juliano.
    La diferencia actual entre los calendarios juliano y gregoriano es de 13 d�as,
    paro desde el 1/3/2100 ser� de 14 d�as, y antes del 1/3/1900 era de 12 d�as.
  CD015:14.09.2005-03.05.2006=fecha c�clica
    Se repetir� cada 15 d�as comenzando el 14.09.2005, pero no despu�s del 03.05.2006.
  MD02.04:2,3>P1:4,5>N1=Feriado del 2 de abril en Argentina
    Si el 2 de abril es martes o mi�rcoles, el feriado se traslada al lunes anterior,
    si es jueves o viernes - al lunes siguiente, en otros casos no se traslada.
  MD01.01:6,6>N1:0,0>N1=Feriado adicional para a�o nuevo en Ucrania
         MD01.01:6,0>N1=Feriado adicional para a�o nuevo en Ucrania
    En Ucrania, si un feriado nacional (incluido a�o nuevo) es s�bado o domingo,
    se agrega un feriado m�s el lunes posterior.
  MD01.01:6,0>N1I=Feriado adicional para a�o nuevo en Ucrania
    Si se agrega 'I' al final de la fecha trasladable, formato corto o largo, la fecha
    s�lo se mostrar� en caso de que sea trasladada.
  MD01.05:WDM01>WDM02.05=Feriado del 1 de mayo en alg�n lugar
    Si el 1 de mayo es el primer domingo del mes, entonces el feriado se traslada al segundo domingo del mes.
________________________________________________________________________________
VII. FORMATO DE ANIVERSARIOS:
 {Opciones->Fechas->Conjuntos->Bot�n '>'}
S�mbolos especiales:
[N] - Nombre de aniversario
[Y] - A�o de inicio de aniversario
[A] - A�os del aniversario
Por ejemplo , si quiere ver en la lista de fechas el siguiente mensaje:
"Ese d�a, hace 10 a�os, naci� el querido Alejandro. Este memorable evento evento ocurri� el a�o 1995."
debe agregar el siguiente formato:
"Ese d�a, hace [A] a�os, naci� el querido [N]. Este memorable evento ocurri� el a�o [Y]."
y elegir este formato cuando agrega/edita aniversarios (men� contextual de calendario) en la tercera columna de la tabla.
________________________________________________________________________________
VIII. FORMATO DE FECHA:
 {Opciones->Apariencia->Otro->Formato de fecha}
S�mbolos especiales:
[D] - D�a
[M] - N�mero de mes
[L] - Letra del mes
[A] - Letra alternativa del mes
[Y] - A�o
[S] - A�o corto
[J] - Fecha del calendario juliano
[W] - D�a de la semana
[B] - D�a de la semana en formato corto
 \t - tabulaci�n (para lista de fechas)
Ejemplo:
 Fecha del calendario juliano: j[D].[M] = j03.08
 Formato de fecha de lista de fechas: [L] [D], [Y] ([J]) = Agosto 16, 2005 (j03.08) 
________________________________________________________________________________
IX. FORMATO DE HORA:
 {Opciones->Hora->Formato de hora}
S�mbolos especiales:
[H] - Hora
[T] - Hora (en formato de doce)
[M] - Minutos
[S] - Segundos
Ejemplo:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09
________________________________________________________________________________
X. FORMATO DE TOOLTIPS (Etiquetas):
 {Opciones->Tooltips (etiquetas)->Contenido->Formatos}
S�mbolos especiales comunes:
\n  - nueva l�nea
\t  - tabulaci�n

Hoy:
  S�mbolos especiales:
    [T] - Hoy
  Ejemplo:
    :::: [T] :::: = :::: Hoy ::::

Encabezado de tipo de fecha:
  S�mbolos especiales:
    [N] - Nombre del tipo de fecha
  Ejemplo:
    ::++ [N] ++:: = ::++ Feriados nacionales ++::

Informaci�n solar y lunar:
  S�mbolos especiales:
		[SR] - Amanecer
		[SS] - Ocaso
		[MR] - Salida de la luna
		[MS] - Puesta de la luna
		[PP] - Fase de la luna (en porcentaje iluminado)
		[PN] - Fase de la luna (nombre)
	Ejemplo:
	  Sol y luna:\nAmanecer [SR]\nOcaso [SS]\nSalida luna [MR]\nPuesta luna [MS]
	  =
	  Sol y luna:
	  Amanecer 03:49
	  Ocaso 20:12
	  Salida luna 00:26
	  Puesta luna 14:12
________________________________________________________________________________
XI. USAR PAR�METROS PECULIARES DE FUENTES:
 {Opciones->Apariencia->Fuentes}
________________________________________________________________________________
                | N/U      | U/O   | U/A
________________|__________|_______|____________________________________________
A�o             | VA       |       |
Fondo           |          | FC BC | FC={color de fondo de lista de fechas}
                |          |       | BC={color de fondo de calendario}
Calendario      |          | BC    | BC={color de cuadr�cula de almanaque}
... [Fecha]     | VA HA    |       | BC={... color de marcador}
... [Texto]     | VA HA BC |       |
________________|__________|_______|____________________________________________
Abreviaturas:
 N/U - no usar  U/O - usar solo  U/A - usar como
 VA - alineamiento vertical    FC - color de fuente
 HA - alineamiento horizontal  BC - color de fondo
________________________________________________________________________________
XII. ELIMINAR PROBLEMAS:
 En algunas versiones de Windows (eg, Windows 2000) la lista de fechas no se muestra correctamente.
 Para solucionar este problema copiar el archivo disk:\WINDOWS\SYSTEM32\riched20.dll (de Windows 98 o XP) a la carpeta apropiada (en Windows 2000 - disk:\WINNT\SYSTEM32\).
     disk - unidad, en la cual est� instalado el SO
________________________________________________________________________________
XIII. ELEMENTOS UTILIZADOS:
 Para obtener informaci�n sobre sol y luna. Usada una parte del componente TMoon.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 Como informaci�n inicial para el archivo tcCld.lct (archivo de localizaciones) se utiliz� el archivo cities.dat del plugin de sistema (wfx) Calendar.
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________
XIV. HISTORIAL:
[+] - agregado  [/] - arreglado  [*] - cambiado

[2.0]
+ guardar almanaque como mapa de bits (BMP) {Opciones->Exportar}
+ esquemas de fuentes {Opciones>Apariencia->Fuentes}
+ configuraci�n de contenido de tooltips (etiquetas) {Opciones->Tooltips (etiquetas)->Contenido} (ver X. FORMATO DE TOOLTIPS (Etiquetas))
+ carga manual de la localizaci�n {Opciones->Hora y localizaci�n}
+ configuraci�n de posici�n inicial de la ventana {Opciones->Acerca de...}
+ botones para ocultar panel de a�o y lista de fechas
+ sangr�a para alineaci�n de texto {Opciones->Apariencia->Fuentes}
+ atajo de teclado para ir al a�o actual - NUM*

[1.9]
+ obtenci�n de informaci�n sobre sol y luna utilizando un m�dulo externo {Opciones->Tooltips->Sol y luna}
      (ver M�DULOS EXTERNOS, FORMATO DE INFORMACI�N SOBRE SOL Y LUNA)
      Elecci�n de localidad y formato de hora {Opciones->Hora} (ver FORMATO DE HORA)
+ encabezado para el tipo de fecha en las tooltips {Opciones->Tooltips->Tipo de fecha como encabezado}
      (ver FORMATO DEL TIPO DE FECHA COMO ENCABEZADO)
+ d�a de la semana en formato largo y formato de fecha en lista de fechas (ver FORMATO DE FECHA)
+ soporte de fechas trasladables para .cdt [Religious] y .edt [Extended]
+ nuevo formato de fecha trasladable (relativo a la Pascua)
+ establecer tama�o y posibilidad de ocultar el panel de a�o

+ conjunto de fechas comunes (Austria, Alemania)

[1.8]
/ soporte para archivos de fechas de m�s de 64 Kb con anchos de cadena de m�s de 2 Kb
/ fechas trasladables no se mostraban si deb�an moverse al a�o anterior/posterior
/ se tiene en cuenta la diferencia entre los calendarios juliano y gregoriano para el c�lculo de la Pascua Ortodoxa
+ Fechas del calendario juliano en conjuntos de fechas (ver Formato de archivos de conjunto de fechas/9, EJEMPLOS)
+ Fechas del calendario juliano en lista de fechas {Opciones->Apariencia->Otro->Formato de fecha} (ver FORMATO DE FECHA)
+ Fecha del calendario juliano en tooltips {Opciones->Fechas->Limitaci�n +}
+ opci�n 'I' para fechas trasladables (ver Formato de archivos de conjunto de fechas/11, EJEMPLOS)
+ agregado al formato de fecha trasladable (l�mite del tipo de 6 a 2, ver EJEMPLOS)
+ agregado d�a en el a�o para fechas especiales (ver Formato de archivos de conjunto de fechas/8, EJEMPLOS)
+ prioridad de fechas y formatos {Opciones->Apariencia->Prioridad}
+ p�rrafos en tooltips {Opciones->Apariencia->Otro}
+ posibilidad de indicar la fecha actual {men� contextual}
+ guardar lista de fechas tambi�n como texto plano {Opciones->Exportar}
+ exportaci�n a Excel en modo invisible (m�s r�pido) {Opciones->Exportar}
+ mover lista de fechas al d�a seleccionado (ver TECLADO, MOUSE)
+ carga de lista de fechas para el a�o seleccionado {Opciones->Fechas->Limitaci�n +}
+ men� contextual extendido para almanaque y lista de fechas
+ m�s accesos r�pidos para editar aniversarios y fechas personales (ver MOUSE)

+ archivo de idioma (griego)
+ conjunto de fechas comunes (Grecia)
+ ejemplos de conjunto de fechas (griego) 

[1.7]
+ fechas trasladables
+ fechas especiales
+ formato de fuente para todos los tipos de fecha en el almanaque {Opciones->Apariencia->Fuentes}
+ posibilidad de habilitar/deshabilitar la exhibici�n de "Hoy" {Opciones->Fechas->Limitaci�n}
+ posibilidad de guardar lista de fechas en formato RTF {Opciones->Exportar}
+ ubicaci�n definida por el usuario de la carpeta de fechas ("Dates") {Opciones->Acerca de...}
* atajo de teclado para mostrar/ocultar panel de opciones cambiado a 'S'

[1.6]
+ exportar almanaque a Excel {Opciones->Exportar}
/ corregido error con el men� contextual (no se crea correctamente)
/ ahora las fechas que se agregan aparecen inmediatamente en el calendario

[1.5]
 + edici�n de fechas personales desde el calendario {men� contextual}
 + formato de fecha
 + guardar tama�o no maximizado de la ventana calendario
 * no ejecutar operaciones de escritura al disco si el programa corre desde CD
 * cambiar altura de lista de fechas con arrastre de mouse
 * los conjuntos de fechas extendidas ser�n publicados en un paquete separado

[1.4]
 + nueva categor�a de fechas personales - aniversarios (posibilidad de editarlos desde calendario {men� contextual})
 + formato de mensajes para aniversarios (posibilidad de editarlos desde calendario {Opciones->Fechas->Conjunto->Bot�n '>'})
 * cambiadas las teclas para editar notas/aniversarios (ver TECLADO)
 * removido el panel opciones - ahora sus estado siempre se guardan (altura de fechas movida a {Opciones->Apariencia})
 * men� contextual de calendario extendido

 + archivo de idioma (italiano)
 + archivo-readme (rumano)
 + archivo-readme (italiano)
 + conjunto de fechas (Luxemburgo, franc�s)
 + conjunto de fechas (Rumania, rumano)
 + conjunto de fechas (Italia, italiano)
 + muestra de conjunto de fechas (rumano)
 + muestra de conjunto de fechas personales (alem�n)

[1.3]
 + posibilidad de usar m�s de uno de los eventos del mismo tipo en un d�a en los conjuntos de fechas (s�mbolo %n)
 * nueva interfaz para editar notas
 * {Opciones->Apariencia->Otro} removido 'Marco grueso de fecha', porque un nuevo tipo de marcador de fecha fue agregado - 'Marco grueso'
 + formato de fuente del d�a actual en el calendario

 + archivos de idioma (checo)
 + archivo de idioma (rumano)
 + archivo-readme (checo)
 + conjunto de fechas (Canad�, ingl�s)
 + conjunto de fechas (Francia, franc�s)
 * conjunto de fechas (B�lgica, franc�s)
 + conjunto de fechas (Rep�blica Checa, checo)
 + conjunto de fechas extendido (Checo, "Name-day")

[1.2]
 +  posibilidad de usar fecha con ciclo definido
 +  opci�n de limitar presentaci�n de fechas
 +  posibilidad de elegir tipo de marcador para tipos de fechas
 *  reducido el tiempo de carga de lista de fechas
 *  cambios en la estructura de opciones

[1.1]
 /  ahora la lista de fechas se muestra correctamente en Windows98
 +  nuevo tipo de fechas - conjunto extendido
 +  posibilidad para usar fechas por n�mero de d�a de la semana en mes relativo al inicio o fin del mes
 +  opciones de fuentes en archivo separado
 *  cambios en la estructura de opciones
 +  archivo de idioma (alem�n)
 +  archivo de idioma (polaco)
 +  archivo de idioma (espa�ol)
 +  conjunto de fechas (Alemania, alem�n)
 +  2 conjuntos de fechas extendidas (franc�s, "Saint's days")
 +  archivo-readme (alem�n)
 +  archivo-readme (espa�ol)
 +  muestra de conjunto de fechas personales (alem�n)

[1.01]
 /  bug cuando no puede agregar notas
 +  posibilidad de agregar y borrar conjuntos personales directamente en el plugin
 +  posibilidad de no elegir un conjunto de fechas
 +  archivo de idioma (holand�s)
 +  archivo de idioma (franc�s)
 +  conjunto de fechas (B�lgica, franc�s)
 +  archivo-readme (franc�s)
 +  muestra de conjunto de fechas personales (franc�s)
