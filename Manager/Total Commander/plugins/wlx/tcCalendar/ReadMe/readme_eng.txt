й Maximus, 2005__________________tcCalendar 2.0__________________mxmus@yandex.ru
Lister-plugin for Total Commander____________________________mxmus@maximus.in.ua
________________________________________________________________________________
I. DESCRIPTION:
 Universal calendar.
 Allows to use common and personal dates with different their categories and possibility to limit displaying.
 For most of date types provided special formats:
  - relatively Orthodox Easter         - relatively Catholic Easter
  - by number of week day in month     - Julian calendar dates
  - movable dates                      - cyclical dates
  - particular dates
 You can configure almost any element of calendar as you like.
 You can export calendar table into Excel or save it as bitmap (BMP), and save dates list as RTF or plain text.
 Using external module SunMoon.ecl tcCalendar can get information about Sun and Moon.
 Calendar has multilingual interface (Czech, Danish, Dutch, English, French, German, Hellenic, Hungarian, Italian, Polish, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Ukrainian)
________________________________________________________________________________
II. SETUP:
 1. Unpack archive to individual directory ([CLD_PATH])
 2. Install plugin:
     - {Configuration->Options...->Edit/View->Configure internal viewer...->LS-Plugins}
     - add tcCld to plugins list
 3. Add new button to button bar:
     - {Configuration->Button Bar...->Append}
     - fill fields in the following way:
        - 'Command' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Start path' = "[CLD_PATH]"
        - 'Icon file' = "[CLD_PATH]\tcCld.ico" or choose icon yourself
            Thanks for Yuri Petrashko (yuripet@ukr.net) for modernization of icon tcCld.ico
     NOTE: do not enter quotes when you fill fields
 4. |optional| You can add tcCalendar in 'Start' menu:
     - {Start->Change Start Menu...->Add Item...}
     - enter name of menu item (for example: "tcCalendar")
     - fill fields in the following way:
        - 'Command' = "cm_List [CLD_PATH]\tcCld.TCCALENDAR"
        - 'Start path' = "[CLD_PATH]"
     NOTE: do not enter quotes when you fill fields
 5. |optional| If 4-item was executed, you can define hotkey for tcCalendar:
     - {Configuration->Options...->Misc.}
     - choose convenient combination in group 'Redefine hotkeys'
     - in 'Command' list, section "User" select "cm_UserMenu" with number which tcCalendar has in 'Start' menu
________________________________________________________________________________
III. KEYBOARD:
    S - show/hide settings panel
    D - show/hide dates list
    Y - show/hide year panel
    R - reload dates list
    C - reload calendar table
    G - scroll dates list to selected day
    T - go to wanted year
 NUM+ - next year
 NUM- - previous year
 NUM* - current year
Notes/celebrations/personal dates/celebration formats editing:
 Ctrl+Del   - delete
 Ctrl+Ins   - add
 Ctrl+<     - move up (except celebration formats)
 Ctrl+>     - move down (except celebration formats)
 Ctrl+Enter - apply changes ('OK' button)
________________________________________________________________________________
IV. MOUSE:
Year panel:
 Double click     - go to wanted year
Calendar table:
 Double click     - edit notes
 Ctrl+left click  - edit celebrations
 Shift+left click - edit personal dates
 Middle click     - scroll dates list to this day
________________________________________________________________________________
V. FILES:
Dates sets:
 [CLD_PATH]\Dates\*.cdt - sets of common dates
 [CLD_PATH]\Dates\*.pdt - sets of personal dates
 [CLD_PATH]\Dates\*.edt - extended sets of dates
 [CLD_PATH]\Dates\Void\*.cdt,*.pdt,*.edt - samples of dates sets (for use copy to "[CLD_PATH]\Dates")
External modules:
 [CLD_PATH]\ExLib\*.ecl
 [CLD_PATH]\ExLib\SunMoon.ecl - module for getting information about Sun and Moon
     You can download SunMoon.ecl from http://maximus.in.ua
Fonts schemes:
 [CLD_PATH]\FontScheme\*.fnt
 [CLD_PATH]\FontScheme\Orange.fnt - fonts scheme "Orange" from Kurt Lettmaier
 [CLD_PATH]\tcCld.fnt             - current fonts scheme
Language files:
 [CLD_PATH]\Language\*.lng
Help files:
 [CLD_PATH]\ReadMe\readme_*.txt
________________________________________________________________________________
VI. FORMAT OF FILES OF DATES SETS:
________________________________________________________________________________
N|Type|Section        |Format            |Comments
_|____|_______________|__________________|______________________________________
1|.pdt|[Notes]        |dd.mm.yyyy=notes  |Note
 |    |               |                  |dd = <day>
 |    |               |                  |mm = <month>
 |    |               |                  |yyyy = <year>
_|____|_______________|__________________|______________________________________
2|.cdt|[MainDates]    |dd.mm=dates       |Simple date
 |    |[Dates]        |                  |dd = <day>
 |    |[Religious]    |                  |mm = <month>
_|.pdt|[PersonalDates]|__________________|______________________________________
3|    |[Celebrations] |ROEx=dates        |Date relatively orthodox Easter
 |.edt|[Extended]     |                  |x = <days_after_orthodox_Easter>
 |    |               |                  |x = -<days_before_orthodox_Easter>
_|    |               |__________________|______________________________________
4|    |               |RCEx=dates        |Date relatively catholic Easter
 |    |               |                  |x = <days_after_catholic_Easter>
 |    |               |                  |x = -<days_before_catholic_Easter>
_|    |               |__________________|______________________________________
5|    |               |WDMwn=dates       |Date by number of week day in month
 |    |               |                  |                      (for all months)
 |    |               |                  |w = <week_day>
 |    |               |                  |                       [0..6] 0-Sunday
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
_|    |               |__________________|______________________________________
6|    |               |WDMwn.mm=dates    |Date by number of week day in month
 |    |               |                  |                 (for concrete months)
 |    |               |                  |w = <week_day>
 |    |               |                  |                       [0..6] 0-Sunday
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
 |    |               |                  |mm = <month>
_|    |               |__________________|______________________________________
7|    |               |PDw.dd=dates      |Particular date
 |    |               |                  |w = <week_day>
 |    |               |                  |dd = <day>
_|    |               |__________________|______________________________________
8|    |               |PDYnnn=dates      |Particular date
 |    |               |                  |nnn = <day_in_year>
_|    |               |__________________|______________________________________
9|    |               |Jdd.mm=dates      |Julian calendar date
 |    |               |                  |dd = <day>
 |    |               |                  |mm = <month>
_|____|_______________|__________________|______________________________________
1|.pdt|[PersonalDates]|CDccc:dd.mm.yyyy  |Cyclical date
0|    |               | -dd.mm.yyyy=dates|ccc = <days_in_cycle>
 |    |               |                  |dd.mm.yyyy (first group) =
 |    |               |                  |                     <left_limit_date>
 |    |               |                  |dd.mm.yyyy (second group) =
 |    |               |                  |                    <right_limit_date>
_|____|_______________|__________________|______________________________________
1|.cdt|[MainDates]    |MDdate:l,r>dti    |Movable date (short format)
1|    |[Dates]        |            =dates|l = <left_week_day>
 |    |[Religious]    |                  |r = <right_week_day>
 |.pdt|[PersonalDates]|                  |t = <target_week_day>
 |    |[Celebrations] |                  |               l,r,t - [0..6] 0-Sunday
 |.edt|[Extended]     |                  |d = <move_direction>
 |    |               |                  |                N - next, P - previous
 |    |               |                  |i = <ignore>
 |    |               |                  |                 I - will be displayed
 |    |               |                  |             only in cases if it moved
 |    |               |                  |date = date formats 2,3,4
_|    |               |__________________|______________________________________
1|    |               |MDdate:l1,r1>dt1  |Movable date (long format)
2|    |               | :l2,r2>dt2i=dates|                    like short format,
 |    |               |                  |           but contains two conditions
_|    |               |__________________|______________________________________
1|    |               |MDdd.mm:WDMwn>    |Movable date (relative format)
3|    |               |    WDMwn.mm=dates|dd = <day>
 |    |               |                  |mm = <month>
 |    |               |                  |w = <week_day>
 |    |               |                  |                       [0..6] 0-Sunday
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
_|    |               |__________________|______________________________________
1|    |               |MDdate:WDMwn.mm>  |Movable date (Easter relative format)
4|    |               |     WDMwn.mm=даты|w = <week_day>
 |    |               |                  |                       [0..6] 0-Sunday
 |    |               |                  |n = <number_relatively_month_begin>
 |    |               |                  |n = -<number_relatively_month_end>
 |    |               |                  |date = date formats 3,4
_|____|_______________|__________________|______________________________________
Notes:
  1. dates = date_1%ndate_2%n ... %ndate_X
       for celebrations - .pdt [Celebrations]:
       date_i = celebration_name#celebration_begin_year#format_number
       format_number = format number in format list (>=0, 0 - default format)
                                       {Settings panel->Dates->Sets->Button '>'}
  2. notes = Note_1%nNote_2%n ... %nNote_X
  3. Common format of mavable date:
       MDsource_date:move_condition>target_date
       MDsource_date:move_condition_1>target_date_1:move_condition_2>target_date_2 (long format)
  4. It is possible to edit notes and simple dates (dd.mm), including celebrations, from tcCalendar (see MOUSE)
________________________________________________________________________________
Samples:
  ROE0=Easter                            23.04=John's birthday%nPeter's birthday
  ROE49=Trinity                          WDM02=second Sunday of each month
  ROE-7=Palm Sunday                      WDM3-1=last Wednesday of each month
  RCE0=Catholic Easter                   WDM51.11=first Friday of November
  PD5.13=Friday, 13th
  PDY256=Programmers day

  J25.12=Christmas
    Orthodox church celebrate Christmas (and maybe other dates) in old style
    (Julian calendar).
    Now difference of Gregorian and Julian calendar is 13 days, but from
    March 1, 2100 it will be 14 days, and before March 1, 1900 it was 12 days.
  CD015:14.09.2005-03.05.2006=Cyclical date
    Will be repeat each 15 days begin from 14.09.2005, but not later 03.05.2006.
  MD02.04:2,3>P1:4,5>N1=April, 2 holiday in Argentina
    If April, 2 is Tuesday or Wednesday, then holiday move to previous Monday,
    if is Thursday or Friday - to next Monday, in other cases not move.
  MD01.01:6,6>N1:0,0>N1=Additional holiday for New Year in Ukraine
         MD01.01:6,0>N1=Additional holiday for New Year in Ukraine
    In Ukraine, if National holiday (including New Year) is Saturday or Sunday,
    then add one more holiday on next Monday.
  MD01.01:6,0>N1I=Additional holiday for New Year in Ukraine
    If added 'I' on end of movable date short or long format, then date will be
    displayed only in cases if it moved.
  MD01.05:WDM01>WDM02.05=May, 1 holiday Somewhere
    If May, 1 is first Sunday of month, then holiday move to second Sunday of May.
________________________________________________________________________________
VII. CELEBRATIONS FORMAT:
 {Settings panel->Dates->Sets->Button '>'}
Special symbols:
[N] - Celebration name
[Y] - Begin celebration year
[A] - Celebration anniversary
For sample, if you want see in dates list next message:
"That day, 10 years ago, was born dear Johnny. This memorable event happens at 1995 year."
you must add next format:
"That day, [A] years ago, was born dear [N]. This memorable event happens at [Y] year."
and chose this format when add/edit celebration (calendar context menu) in third column of table.
________________________________________________________________________________
VIII. DATE FORMAT:
 {Settings panel->Display->Other->Date format}
Special symbols:
[D] - Day
[M] - Numeric month
[L] - Letter month
[A] - Alternative letter month
[Y] - Year
[S] - Short year
[J] - Julian date
[W] - Day of week
[B] - Short day of week
\t  - tab (actually for dates list)
Sample:
 Julian date format: j[D].[M] = j03.08
 Dates list date format: [L] [D], [Y] ([J]) = August 16, 2005 (j03.08)
________________________________________________________________________________
IX. TIME FORMAT:
 {Settings panel->Time->Time format}
Special symbols:
[H] - Hours
[T] - Hours (12-hours format)
[M] - Minutes
[S] - Seconds
Sample:
 [H]:[M] = 16:09
 [T]:[M] = PM04:09
________________________________________________________________________________
X. TOOLTIP FORMAT:
 {Settings panel->Tooltip->Content of tooltip->Formats}
Common special symbols:
\n  - new line
\t  - tab

Tooday:
  Special symbols:
    [T] - Tooday
  Sample:
    :::: [T] :::: = :::: Tooday ::::

Date type header format:
  Special symbols:
    [N] - Name of date type
  Sample:
    ::++ [N] ++:: = ::++ National holidays ++::

Sun and Moon information format:
  Special symbols:
    [SR] - Sun rise time
    [SS] - Sun set time
    [MR] - Moon rise time
    [MS] - Moon set time
    [PP] - Moon phase (illumination percent)
    [PN] - Moon phase name
  Sample:
    Sun & Moon:\nSun Rise [SR]\nSun Set [SS]\nMoon Rise [MR]\nMoon Set [MS]
    =
    Sun & Moon:
    Sun Rise 03:49
    Sun Set 20:12
    Moon Rise 00:26
    Moon Set 14:12
________________________________________________________________________________
XI. USE FONT PARAMETERS PECULIARITIES:
 {Settings panel->Display->Fonts}
________________________________________________________________________________
                | N/U      | U/O   | U/A
________________|__________|_______|____________________________________________
Year            | VA       |       |
Background      |          | FC BC | FC={background color of dates list}
                |          |       | BC={background color of calendar}
Calendar grid   |          | BC    | BC={calendar grid color}
... [Date]      | VA HA    |       | BC={... marker color}
... [Text]      | VA HA BC |       |
________________|__________|_______|____________________________________________
Shortenings:
 N/U - not use  U/O - use only  U/A - use as
 VA - vertical alignment    FC - font color
 HA - horizontal alignment  BC - background color
________________________________________________________________________________
XII. PROBLEMS ELIMINATE:
 In some Windows versions (for sample, Windows 2000) dates list is display not correct.
 For eliminate this problem copy file disk:\WINDOWS\SYSTEM32\riched20.dll (from Windows 98 or XP) to appropriate folder (in Windows 2000 - disk:\WINNT\SYSTEM32\).
     disk - disk, on which OS installed
________________________________________________________________________________
XIII. MATERIALS:
 For getting information about Sun and MoonFor used part of TMoon component.
     Andreas Horstemeier
     andy@hoerstemeier.de
     http://www.hoerstemeier.com
 As initial information for forming of towns location file (tcCld.lct) used file cities.dat from Calendar wfx-plugin.
     Fabio Chelly,
     fabio@chelly.net
     http://totalcommander.free.fr/fabio/calendar.zip
________________________________________________________________________________
XIV. HISTORY:
[+] - added  [/] - fixed  [*] - changed

[2.0]
+ saving calendar table as bitmap (BMP) {Settings panel->Export}
+ fonts schemes {Settings panel->Display->Fonts}
+ setting of content of tooltip {Settings panel->Tooltip->Content of tooltip} (see X. TOOLTIP FORMAT)
+ manual location input {Settings panel->Time and Location}
+ setting of window position on start {Settings panel->Program}
+ buttons for hiding year panel and dates list
+ indent for text alignment {Settings panel->Display->Fonts}
+ hotkey for going to current year - NUM*

+ language file (Serbian)
+ common dates set (Serbia and Montenegro, Serbian)

[1.9]
+ getting information about Moon and Sun using external module {Settings panel->Tooltip->Sun and Moon}
      (see EXTERNAL MODULES, SUN AND MOON INFORMATION FORMAT)
      Choose town and time format {Settings panel->Time} (see TIME FORMAT)
+ headers for date types in tooltips {Settings panel->Tooltip->Date type header}
      (see DATE TYPE HEADER FORMAT)
+ day of week in long date format and dates list date format (see DATE FORMAT)
+ support mavable dates for .cdt [Religious] and .edt [Extended]
+ new format of movable dates (Easter relative format)
+ set size and possibility to hide year panel

+ language file (Danish)
+ language file (Slovenian)
+ common dates set (Austria, German)
+ common dates set (Denmark, Danish)
+ common dates set (Slovenia, Slovenian)
+ common dates set (Angola, Portuguese)

[1.8]
/ support files of dates set more then 64 Kb with string width more then 2 Kb
/ fixed error in movable dates (not display if must to move from previous/next year)
/ correctly take into account difference of Julian and Gregorian calendar for Orthodox Easter calculation
+ Julian dates in dates sets (see Format of dates set files/9, SAMPLES)
+ Julian dates in dates list {Settings panel->Display->Other->Date format} (see DATE FORMAT)
+ Julian dates in calendar tooltips(hints) {Settings panel->Dates->Limitation +}
+ addition to movable dates format ('I' key, see Format of dates set files/11, SAMPLES)
+ addition to movable dates format (limits like from 6 to 2, see SAMPLES)
+ addition to particular dates format (day in year, see Format of dates set files/8, SAMPLES)
+ priority of dates and formats {Settings panel->Display->Priority}
+ paragraphs in tooltips(hints) {Settings panel->Display->Other}
+ possibility to set current date {context menu}
+ save dates list also in plain text {Settings panel->Export}
+ invisible export onto Excel (quickly) {Settings panel->Export}
+ scroll dates list to selected day (see KEYBOARD, MOUSE)
+ possibility to load dates list for choosed year {Settings panel->Dates->Limitation +}
+ extended context menu of calendar and dates list
+ more quick access for edit celebrations and personal dates (see MOUSE)

+ language file (Hellenic)
+ common dates set (Hellas, Hellenic)
+ dates set samples (Hellenic)

[1.7]
+ movable dates
+ particular dates
+ font format fol all date types in calendar {Settings panel->Display->Fonts}
+ possibility to enable/disable displaying of "Today" {Settings panel->Dates->Limitation}
+ saving dates list in RTF-format {Settings panel->Export}
+ user defined location of "Dates"-folder {Settings panel->Program}
* hotkey for show/hide settings panel change to 'S'

+ language file (Hungarian)
+ common dates set (Argentina, Spanish)
+ common dates set (USA, English)
+ common dates set (Hungary, Hungarian)

[1.6]
+ export calendar to Excel {Settings panel->Export}
/ fixed error with context menu (not right create)
/ now added dates always right away appear in calendar

[1.5]
 + editing personal dates from calendar {context menu}
 + date format
 + save size of not maximized calendar window
 * not execute disk write operations if program was run from CD
 * change dates list height by drag with the mouse
 * extended date sets will released in separated pack

 + language file (Slovak)
 + common dates set (Russia, Russian)
 + common dates set (Slovakia, Slovak)

[1.4]
 + new category of personal dates - celebrations (possibly editing from calendar {context menu})
 + message formats for celebrations (possibly editing from calendar {Settings panel->Dates->Sets->Button '>'})
 * changed keys for notes/celebrations editing (see KEYBOARD)
 * removed panels settings - now their state always save
 * extended calendar context menu

 + language file (Italian)
 + readme-file (Romanian)
 + readme-file (Italian)
 + common dates set (Luxembourg, French)
 + common dates set (Romania, Romanian)
 + common dates set (Italy, Italian)
 + dates set samples (Romanian)
 + personal dates set sample (German)

[1.3]
 + possibility to use more that one events of the same type on one day in dates sets (symbol %n)
 * new interface for edit notes
 * {Settings->Display->Other} removed 'Thick frame of date', because new type of date marker was added - 'Thick frame'
 + font formatting of current date in calendar

 + language file (Czech)
 + language file (Romanian)
 + readme-file (Czech)
 + common dates set (Canada, English)
 + common dates set (France, French)
 * common dates set (Belgium, French)
 + common dates set (Czechia, Czech)

[1.2]
 + possibility to use date with defined cycle
 + setting of dates displaying limitation
 + possibility to choose marker type for dates types
 * decreased time of dates list loading

 + common dates set (Poland, Polish)

[1.1]
 / now dates list display right in Windows98
 + new dates type - extended set
 + possibility to use date by number of week day in month relatively begin or end of month
 + fonts settings in separate file

 + language file (German)
 + language file (Polish)
 + language file (Spanish)
 + common dates set (Germany, German)
 + readme-file (German)
 + readme-file (Spanish)
 + personal dates set sample (German)

[1.01]
 / bug when you can't add notes
 + possibility add and delete personal sets directly in plugin
 + possibility do not choose one of dates set

 + language file (Dutch)
 + language file (French)
 + common dates set (Belgium, French)
 + readme-file (French)
 + personal dates set sample (French)
