© Maximus, 2005__________________tcCalendar 2.0__________________mxmus@yandex.ru
::::Plugin de Lister para Total Commander
________________________________________________________________________________
I. DESCRIPCIÓN:
 Calendario Universal.
 Permite registrar fechas nacionales y personales en distintas categorías, con la posibilidad de limitar su exhibición.
 Para la mayoría de las fechas hay formatos especiales que definen su comportamiento:
  - relativa a la Pascua Ortodoxa               - relativa a la Pascua Católica
  - por número de día de la semana en el mes    - fechas del calendario juliano
  - fechas móviles                              - fechas con ciclo definido
  - fechas especiales
 Se puede configurar a gusto casi cualquier elemento del almanaque
 Posibilidad de exportar el almanaque a Excel o guardarlo como mapa de bits (BMP), y de guardar la lista de fechas como RTF o texto plano.
 Usando el módulo externo SunMoon.ecl, tcCalendar puede obtener información solar y lunar.
 Interfase multi-idioma (alemán, checo, danés, eslovaco, esloveno, español, francés, griego, holandés, húngaro, inglés, italiano, polaco, rumano, ruso, ucraniano)
________________________________________________________________________________
II. CONFIGURACIÓN:
 1. Descomprimir el archivo en un directorio individual ([CLD_PATH])
 2. Instalar plugin:
     - Configuración->Opciones...->Editar/Ver->Configurar visor interno...->LS-Plugins
     - añadir tcCld a la lista de plugins
 3. Agregar nuevo botón a la barra de botones:
     - Configuración->Barra de botones...->Agregar
     - llenar los campos de la siguiente manera:
         - 'Comando' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
         - 'Directorio inicial' = "[CLD_PATH]"
         - 'Ícono' = "[CLD_PATH]\tcCld.ico" o elija un ícono
             Nota: no ingrese comillas cuando ingresa los campos
 4. |opcional| Puede agregar tcCalendar en el menú 'Inicio':
     - {Inicio->Cambiar menú Inicio...->Agregar ítem...}
     - ingresar nombre del ítem de menú (por ejemplo: "tcCalendar")
     - llenar los campos de la siguiente manera:
        - 'Comando' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Directorio de inicio' = "[CLD_PATH]"
     NOTA: no ingrese comillas cuando rellena los campos
 5. |opcional| Si el ítem-4 fue ejecutado, puede definir un atajo para tcCalendar:
     - {Configuración->Opciones...->Misc.}
     - elegir una combinación conveniente en el grupo 'Redefinir teclas'
     - en la lista 'Comando', sección "User" seleccionar "cm_UserMenu" con el número que tcCalendar tiene en el menú 'Inicio'
________________________________________________________________________________
III. TECLADO:
    O - mostrar/ocultar panel de opciones
    D - mostrar/ocultar lista de fechas
    Y - mostrar/ocultar panel de año
    R - recargar lista de fechas
    C - recargar almanaque
    G - mover lista de fechas al día seleccionado
    T - ir a un año determinado
 NUM+ - año siguiente
 NUM- - año anterior
 NUM* - año actual
Edición de Notas/aniversarios/formatos de aniversarios:
 Ctrl+Del   - eliminar
 Ctrl+Ins   - agregar
 Ctrl+<     - mover arriba (excepto formatos de aniversarios)
 Ctrl+>     - mover abajo (excepto formatos de aniversarios)
 Ctrl+Enter - aplicar cambios (botón 'OK')
________________________________________________________________________________
IV. MOUSE:
 Doble click - ir a un año determinado
Almanaque:
 Doble click           - editar notas
 Ctrl+click izquierdo  - editar aniversarios
 Shift+click izquierdo - editar fechas personales
 Click central         - mover lista de fechas al día señalado
________________________________________________________________________________
V. ARCHIVOS:
Conjuntos de fechas:
 [CLD_PATH]\Dates\*.cdt - fechas comunes
 [CLD_PATH]\Dates\*.pdt - fechas personales y notas
 [CLD_PATH]\Dates\*.edt - conjunto extendido de fechas
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - muestra de conjuntos de fechas (para usar copiar a "[CLD_PATH]\Dates")
Módulos externos:
 [CLD_PATH]\ExLib\*.ecl"
 [CLD_PATH]\ExLib\SunMoon.ecl - módulo para obtener información solar y lunar
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
 |Tipo|Sección        |Formato           |Comentarios
_|____|_______________|__________________|______________________________________
1|pdt |[Notes]        |dd.mm.yyyy=notas  |hacer notas en tcCalendar es más
 |    |               |                  |             conveniente (doble click)
 |    |               |                  |dd = día (2 dígitos)
 |    |               |                  |mm = mes (2 dígitos)
 |    |               |                  |yyyy - año (4 dígitos)
_|____|_______________|__________________|______________________________________
2|cdt |[MainDates]    |dd.mm=fechas      |dd = día (2 dígitos)
 |    |[Dates]        |                  |mm = mes (2 dígitos)
_|    |[Religious]    |__________________|______________________________________
3|pdt |[PersonalDates]|ROEx=fechas       |fecha relativa a la pascua ortodoxa
 |    |[Celebrations] |                  |x = <días_después_de_la_Pascua_ortodoxa>
 |edt |[Extended]     |                  |x = -<días_antes_de_la_Pascua_ortodoxa>
_|    |               |__________________|______________________________________
4|    |               |RCEx=fechas       |fecha relativa a la pascua católica
 |    |               |                  |x = <días_después_de_la_Pascua_católica>
 |    |               |                  |x = -<días_antes_de_la_Pascua_católica>
_|    |               |__________________|______________________________________
5|    |               |WDMdn=fechas      |fecha por número de día de la semana en el mes
 |    |               |                  |                      (para todos los meses)
 |    |               |                  |d = <día_de_la_semana>
 |    |               |                  |                              0-domingo
 |    |               |                  |n = <número_relativo_al_inicio_de_mes>
 |    |               |                  |n = -<número_relativo_al_fin_de_mes>
_|    |               |__________________|______________________________________
6|    |               |WDMdn.mm=fechas   |fecha por número del día de semana en el mes
 |    |               |                  |                 (para meses concretos)
 |    |               |                  |d = <día_de_la_semana>
 |    |               |                  |                             0-domingo
 |    |               |                  |n = <número_relativo_al_inicio_de_mes>
 |    |               |                  |n = -<número_relativo_al_fin_de_mes>
 |    |               |                  |mm = mes (2 dígitos)
_|    |               |__________________|______________________________________
7|    |               |PDw.dd=fechas     |fecha especial (mensual)
 |    |               |                  |w = <día_de_la_semana>
 |    |               |                  |dd = <día>
_|    |               |__________________|______________________________________
8|    |               |PDYnnn=fechas     |fecha especial (anual)
 |    |               |                  |nnn = <número_de_día_en_el_año>
_|    |               |__________________|______________________________________
9|    |               |Jdd.mm=fechas     |Fecha de calendario juliano
 |    |               |                  |dd = <día>
 |    |               |                  |mm = <mes>
_|____|_______________|__________________|______________________________________
1|pdt |[PersonalDates]|CDccc:dd.mm.yyyy  |fecha cíclica
0|    |               |-dd.mm.yyyy=fechas|ccc = <días_en_el_ciclo>
 |    |               |                  |dd.mm.yyyy (primer grupo) =
 |    |               |                  |                     <fecha_límite_izquierda>
 |    |               |                  |dd.mm.yyyy (segundo grupo) =
 |    |               |                  |                     <fecha_límite_derecha>
_|____|_______________|__________________|______________________________________
1|.cdt|[MainDates]    |MDdate:l,r>dti    |fecha trasladable (formato corto)
1|    |[Dates]        |           =fechas|l = <día_de_la_semana_límite_izquierdo>
 |    |[Religious]    |                  |r = <día_de_la_semana_límite_derecho>
 |.pdt|[PersonalDates]|                  |t = <día_de_la_semana_al_que_se_trasladará>
 |    |[Celebrations] |                  |               l,r,t - [0..6] 0-domingo
 |.edt|[Extended]     |                  |d = <dirección_del_traslado>
 |    |               |                  |                N - siguiente, P - anterior
 |    |               |                  |i = <ignorar>
 |    |               |                  |                 I - se mostrará solamente
 |    |               |                  |                     en caso de traslado
 |    |               |                  |fecha = formatos 2,3,4
_|    |               |__________________|______________________________________
1|    |               |MDdate:l1,r1>dt1  |fecha trasladable (formato largo)
2|    |               |:l2,r2>dt2i=fechas|                    similar al formato corto,
 |    |               |                  |           pero contiene dos condiciones
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |fecha trasladable (formato relativo)
3|    |               |   WDMwn.mm=fechas|dd = <día>
 |    |               |                  |mm = <mes>
 |    |               |                  |w = <día_de_la_semana>
 |    |               |                  |                       [0..6] 0-domingo
 |    |               |                  |n = <número_relativo_al_comienzo_de_mes>
 |    |               |                  |n = -<número_relativo_al_final_de_mes>
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |fecha trasladable (formato relativo a la pascua)
4|    |               |    WDMwn.mm=fecha|w = <día_de_la_semana>
 |    |               |                  |                       [0..6] 0-domingo
 |    |               |                  |n = <número_relativo_al_comienzo_de_mes>
 |    |               |                  |n = -<número_relativo_al_final_de_mes>
 |    |               |                  |fecha = formatos 3,4
_|____|_______________|__________________|______________________________________
NOTAS:
  1. fechas = fecha_1%nfecha_2 ... %nfecha_X
       para aniversarios - .pdt [Celebrations]:
       fecha_i = nombre_aniversario#año_inicio_aniversario#formato_número
       formato_número = número de formato en lista de formatos (>=-0, -0 - formato predefinido)
                                              {Opciones->Fechas->Conjuntos->Botón '>'}
  2. notas = Nota_1%nNota_2 ... %nNota_X
  3. Formato general de fecha trasladable:
       MDfeha_de_origen:condición>fecha_a_la_que_se_moverá
       MDfeha_de_origen:condición_1>fecha_a_la_que_se_moverá_1:condición_2>fecha_a_la_que_se_moverá_2 (formato largo)
  4. Es posible editar notas y fechas simples (dd.mm), incluidos aniversarios, desde tcCalendar (ver MOUSE)
________________________________________________________________________________
EJEMPLOS:
  ROE0=Pascua                  23.04=Cumpleaños de Diego%nCumpleaños de Sergio
  ROE49=Trinidad               WDM02=segundo domingo de cada mes
  ROE-7=Domingo de ramos       WDM3-1=último miércoles de cada mes
  RCE0=Pascua católica         WDM51.11=primer viernes de Noviembre
  PD2.13=Martes 13             
  PDY256=día del programador

  J25.12=Navidad
    La iglesia ortodoxa celebra Navidad (y posiblemente otras fechas) de acuerdo al
    calendario juliano.
    La diferencia actual entre los calendarios juliano y gregoriano es de 13 días,
    paro desde el 1/3/2100 será de 14 días, y antes del 1/3/1900 era de 12 días.
  CD015:14.09.2005-03.05.2006=fecha cíclica
    Se repetirá cada 15 días comenzando el 14.09.2005, pero no después del 03.05.2006.
  MD02.04:2,3>P1:4,5>N1=Feriado del 2 de abril en Argentina
    Si el 2 de abril es martes o miércoles, el feriado se traslada al lunes anterior,
    si es jueves o viernes - al lunes siguiente, en otros casos no se traslada.
  MD01.01:6,6>N1:0,0>N1=Feriado adicional para año nuevo en Ucrania
         MD01.01:6,0>N1=Feriado adicional para año nuevo en Ucrania
    En Ucrania, si un feriado nacional (incluido año nuevo) es sábado o domingo,
    se agrega un feriado más el lunes posterior.
  MD01.01:6,0>N1I=Feriado adicional para año nuevo en Ucrania
    Si se agrega 'I' al final de la fecha trasladable, formato corto o largo, la fecha
    sólo se mostrará en caso de que sea trasladada.
  MD01.05:WDM01>WDM02.05=Feriado del 1 de mayo en algún lugar
    Si el 1 de mayo es el primer domingo del mes, entonces el feriado se traslada al segundo domingo del mes.
________________________________________________________________________________
VII. FORMATO DE ANIVERSARIOS:
 {Opciones->Fechas->Conjuntos->Botón '>'}
Símbolos especiales:
[N] - Nombre de aniversario
[Y] - Año de inicio de aniversario
[A] - Años del aniversario
Por ejemplo , si quiere ver en la lista de fechas el siguiente mensaje:
"Ese día, hace 10 años, nació el querido Alejandro. Este memorable evento evento ocurrió el año 1995."
debe agregar el siguiente formato:
"Ese día, hace [A] años, nació el querido [N]. Este memorable evento ocurrió el año [Y]."
y elegir este formato cuando agrega/edita aniversarios (menú contextual de calendario) en la tercera columna de la tabla.
________________________________________________________________________________
VIII. FORMATO DE FECHA:
 {Opciones->Apariencia->Otro->Formato de fecha}
Símbolos especiales:
[D] - Día
[M] - Número de mes
[L] - Letra del mes
[A] - Letra alternativa del mes
[Y] - Año
[S] - Año corto
[J] - Fecha del calendario juliano
[W] - Día de la semana
[B] - Día de la semana en formato corto
 \t - tabulación (para lista de fechas)
Ejemplo:
 Fecha del calendario juliano: j[D].[M] = j03.08
 Formato de fecha de lista de fechas: [L] [D], [Y] ([J]) = Agosto 16, 2005 (j03.08) 
________________________________________________________________________________
IX. FORMATO DE HORA:
 {Opciones->Hora->Formato de hora}
Símbolos especiales:
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
Símbolos especiales comunes:
\n  - nueva línea
\t  - tabulación

Hoy:
  Símbolos especiales:
    [T] - Hoy
  Ejemplo:
    :::: [T] :::: = :::: Hoy ::::

Encabezado de tipo de fecha:
  Símbolos especiales:
    [N] - Nombre del tipo de fecha
  Ejemplo:
    ::++ [N] ++:: = ::++ Feriados nacionales ++::

Información solar y lunar:
  Símbolos especiales:
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
XI. USAR PARÁMETROS PECULIARES DE FUENTES:
 {Opciones->Apariencia->Fuentes}
________________________________________________________________________________
                | N/U      | U/O   | U/A
________________|__________|_______|____________________________________________
Año             | VA       |       |
Fondo           |          | FC BC | FC={color de fondo de lista de fechas}
                |          |       | BC={color de fondo de calendario}
Calendario      |          | BC    | BC={color de cuadrícula de almanaque}
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
     disk - unidad, en la cual está instalado el SO
________________________________________________________________________________
XIII. ELEMENTOS UTILIZADOS:
 Para obtener información sobre sol y luna. Usada una parte del componente TMoon.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 Como información inicial para el archivo tcCld.lct (archivo de localizaciones) se utilizó el archivo cities.dat del plugin de sistema (wfx) Calendar.
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________
XIV. HISTORIAL:
[+] - agregado  [/] - arreglado  [*] - cambiado

[2.0]
+ guardar almanaque como mapa de bits (BMP) {Opciones->Exportar}
+ esquemas de fuentes {Opciones>Apariencia->Fuentes}
+ configuración de contenido de tooltips (etiquetas) {Opciones->Tooltips (etiquetas)->Contenido} (ver X. FORMATO DE TOOLTIPS (Etiquetas))
+ carga manual de la localización {Opciones->Hora y localización}
+ configuración de posición inicial de la ventana {Opciones->Acerca de...}
+ botones para ocultar panel de año y lista de fechas
+ sangría para alineación de texto {Opciones->Apariencia->Fuentes}
+ atajo de teclado para ir al año actual - NUM*

[1.9]
+ obtención de información sobre sol y luna utilizando un módulo externo {Opciones->Tooltips->Sol y luna}
      (ver MÓDULOS EXTERNOS, FORMATO DE INFORMACIÓN SOBRE SOL Y LUNA)
      Elección de localidad y formato de hora {Opciones->Hora} (ver FORMATO DE HORA)
+ encabezado para el tipo de fecha en las tooltips {Opciones->Tooltips->Tipo de fecha como encabezado}
      (ver FORMATO DEL TIPO DE FECHA COMO ENCABEZADO)
+ día de la semana en formato largo y formato de fecha en lista de fechas (ver FORMATO DE FECHA)
+ soporte de fechas trasladables para .cdt [Religious] y .edt [Extended]
+ nuevo formato de fecha trasladable (relativo a la Pascua)
+ establecer tamaño y posibilidad de ocultar el panel de año

+ conjunto de fechas comunes (Austria, Alemania)

[1.8]
/ soporte para archivos de fechas de más de 64 Kb con anchos de cadena de más de 2 Kb
/ fechas trasladables no se mostraban si debían moverse al año anterior/posterior
/ se tiene en cuenta la diferencia entre los calendarios juliano y gregoriano para el cálculo de la Pascua Ortodoxa
+ Fechas del calendario juliano en conjuntos de fechas (ver Formato de archivos de conjunto de fechas/9, EJEMPLOS)
+ Fechas del calendario juliano en lista de fechas {Opciones->Apariencia->Otro->Formato de fecha} (ver FORMATO DE FECHA)
+ Fecha del calendario juliano en tooltips {Opciones->Fechas->Limitación +}
+ opción 'I' para fechas trasladables (ver Formato de archivos de conjunto de fechas/11, EJEMPLOS)
+ agregado al formato de fecha trasladable (límite del tipo de 6 a 2, ver EJEMPLOS)
+ agregado día en el año para fechas especiales (ver Formato de archivos de conjunto de fechas/8, EJEMPLOS)
+ prioridad de fechas y formatos {Opciones->Apariencia->Prioridad}
+ párrafos en tooltips {Opciones->Apariencia->Otro}
+ posibilidad de indicar la fecha actual {menú contextual}
+ guardar lista de fechas también como texto plano {Opciones->Exportar}
+ exportación a Excel en modo invisible (más rápido) {Opciones->Exportar}
+ mover lista de fechas al día seleccionado (ver TECLADO, MOUSE)
+ carga de lista de fechas para el año seleccionado {Opciones->Fechas->Limitación +}
+ menú contextual extendido para almanaque y lista de fechas
+ más accesos rápidos para editar aniversarios y fechas personales (ver MOUSE)

+ archivo de idioma (griego)
+ conjunto de fechas comunes (Grecia)
+ ejemplos de conjunto de fechas (griego) 

[1.7]
+ fechas trasladables
+ fechas especiales
+ formato de fuente para todos los tipos de fecha en el almanaque {Opciones->Apariencia->Fuentes}
+ posibilidad de habilitar/deshabilitar la exhibición de "Hoy" {Opciones->Fechas->Limitación}
+ posibilidad de guardar lista de fechas en formato RTF {Opciones->Exportar}
+ ubicación definida por el usuario de la carpeta de fechas ("Dates") {Opciones->Acerca de...}
* atajo de teclado para mostrar/ocultar panel de opciones cambiado a 'S'

[1.6]
+ exportar almanaque a Excel {Opciones->Exportar}
/ corregido error con el menú contextual (no se crea correctamente)
/ ahora las fechas que se agregan aparecen inmediatamente en el calendario

[1.5]
 + edición de fechas personales desde el calendario {menú contextual}
 + formato de fecha
 + guardar tamaño no maximizado de la ventana calendario
 * no ejecutar operaciones de escritura al disco si el programa corre desde CD
 * cambiar altura de lista de fechas con arrastre de mouse
 * los conjuntos de fechas extendidas serán publicados en un paquete separado

[1.4]
 + nueva categoría de fechas personales - aniversarios (posibilidad de editarlos desde calendario {menú contextual})
 + formato de mensajes para aniversarios (posibilidad de editarlos desde calendario {Opciones->Fechas->Conjunto->Botón '>'})
 * cambiadas las teclas para editar notas/aniversarios (ver TECLADO)
 * removido el panel opciones - ahora sus estado siempre se guardan (altura de fechas movida a {Opciones->Apariencia})
 * menú contextual de calendario extendido

 + archivo de idioma (italiano)
 + archivo-readme (rumano)
 + archivo-readme (italiano)
 + conjunto de fechas (Luxemburgo, francés)
 + conjunto de fechas (Rumania, rumano)
 + conjunto de fechas (Italia, italiano)
 + muestra de conjunto de fechas (rumano)
 + muestra de conjunto de fechas personales (alemán)

[1.3]
 + posibilidad de usar más de uno de los eventos del mismo tipo en un día en los conjuntos de fechas (símbolo %n)
 * nueva interfaz para editar notas
 * {Opciones->Apariencia->Otro} removido 'Marco grueso de fecha', porque un nuevo tipo de marcador de fecha fue agregado - 'Marco grueso'
 + formato de fuente del día actual en el calendario

 + archivos de idioma (checo)
 + archivo de idioma (rumano)
 + archivo-readme (checo)
 + conjunto de fechas (Canadá, inglés)
 + conjunto de fechas (Francia, francés)
 * conjunto de fechas (Bélgica, francés)
 + conjunto de fechas (República Checa, checo)
 + conjunto de fechas extendido (Checo, "Name-day")

[1.2]
 +  posibilidad de usar fecha con ciclo definido
 +  opción de limitar presentación de fechas
 +  posibilidad de elegir tipo de marcador para tipos de fechas
 *  reducido el tiempo de carga de lista de fechas
 *  cambios en la estructura de opciones

[1.1]
 /  ahora la lista de fechas se muestra correctamente en Windows98
 +  nuevo tipo de fechas - conjunto extendido
 +  posibilidad para usar fechas por número de día de la semana en mes relativo al inicio o fin del mes
 +  opciones de fuentes en archivo separado
 *  cambios en la estructura de opciones
 +  archivo de idioma (alemán)
 +  archivo de idioma (polaco)
 +  archivo de idioma (español)
 +  conjunto de fechas (Alemania, alemán)
 +  2 conjuntos de fechas extendidas (francés, "Saint's days")
 +  archivo-readme (alemán)
 +  archivo-readme (español)
 +  muestra de conjunto de fechas personales (alemán)

[1.01]
 /  bug cuando no puede agregar notas
 +  posibilidad de agregar y borrar conjuntos personales directamente en el plugin
 +  posibilidad de no elegir un conjunto de fechas
 +  archivo de idioma (holandés)
 +  archivo de idioma (francés)
 +  conjunto de fechas (Bélgica, francés)
 +  archivo-readme (francés)
 +  muestra de conjunto de fechas personales (francés)
