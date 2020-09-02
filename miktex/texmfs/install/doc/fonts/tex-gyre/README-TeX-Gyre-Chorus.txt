###########################################################################
############          The TeX Gyre Collection of Fonts         ############
############                 The font Chorus                   ############
###########################################################################

Font: TeX Gyre Chorus
Authors: Bogus\l{}aw Jackowski and Janusz M. Nowacki
Version: 2.003
Date: 16 IX 2009
Downloads: http://www.gust.org.pl/projects/e-foundry/tex-gyre/chorus

License:
  % Copyright 2007--2009 for TeX Gyre extensions by B. Jackowski
  % and J.M. Nowacki (on behalf of TeX Users Groups).
  % Vietnamese characters were added by Han The Thanh.
  %
  % This work can be freely used and distributed under
  % the GUST Font License (GFL -- see GUST-FONT-LICENSE.txt)
  % which is actually an instance of the LaTeX Project Public License
  % (LPPL -- see http://www.latex-project.org/lppl.txt ).
  %
  % This work has the maintenance status "maintained". The Current Maintainer
  % of this work is Bogus\l{}aw Jackowski and Janusz M. Nowacki.
  %
  % This work consists of the files listed
  % in the MANIFEST-TeX-Gyre-Chorus.txt file.

###########################################################################
############         A BRIEF DESCRIPTION OF THE PACKAGE        ############
###########################################################################

The current package contains the most recent version of the TeX Gyre
Chorus font in the PostScript Type 1 and OpenType formats. TeX Gyre
Chorus is based on the URW Chancery L Medium Italic kindly released
by URW++ Design and Development Inc. under GFL (independently of the
GPL release accompanying Ghostscript). The Vietnamese glyphs were
added by Han The Thanh.

TeX Gyre Chorus can be used as a replacement for the acknowledged
font ITC Zapf Chancery(R) (designed by Hermann Zapf, 1979).

Note that the widths of almost all characters covered by Adobe Standard
Encoding of the TeX Gyre Chorus glyphs are consistent with the relevant
Adobe metric data:
  ftp://ftp.adobe.com/pub/adobe/type/win/all/afmfiles/base35/zcmi____.afm
Exceptions are: `grave' (Adobe: 220; TeX Gyre: 300, i.e., consistently
with `acute') and `questiondown' (Adobe: 400; TeX Gyre: 380, i.e.,
consistently with `question'). Note also that all URW Chancery L Medium
Italic widths differ by factor 5/6 from the respective Adobe metrics.

                           *   *   *

The TeX Gyre project, following the Latin Modern project, aims at providing
a rich collection of diacritical characters in the attempt to cover as many
Latin-based scripts as possible. To our knowledge, the repertoire of
characters covers all European languages as well as some other Latin-based
alphabets such as Vietnamese and Navajo; at the request of users, recent
extensions (following the enhancement of the Latin Modern collection)
provide glyphs sufficient for typesetting of romanized transliterations
of Arabic and Sanskrit scripts. We have frequently used the information
presented by Michael Everson at the ``The Alphabets of Europe''
( http://www.evertype.com/alphabets/ ) web site. If you know about European
languages that are not covered completely or if some glyphs have apparently
wrong shapes -- please let us know. Note, however, that Greek glyphs
bear provisional character.

The TeX Gyre Project was launched and is supported by TeX USERS GROUPS
(CS TUG, DANTE eV, GUST, NTG, TUG India, TUG). Hearty thanks to the
representatives of these groups and also to all people who helped with
comments, ideas, remarks, bug reports, objections, hints, consolations, etc.

                           *   *   *

The TeX Gyre Chorus family consists of a single medium
italic font (qzcmi).

The TeX Gyre Chorus font can be freely used and distributed
under the GUST Font License (see above) which is actually
an instance of the LaTeX Project Public License
(LPPL; see http://www.latex-project.org/lppl.txt ).

                           *   *   *

The package consists of the files in the directories conforming
to the TeX Directory Structure (v. 1.1). The directories contain:

doc/fonts/tex-gyre             this file, manifest, licence, test files,
                               and, moreover, selected files used as input
                               for generating OTFs (meant as a technical
                               documentation of the OTFs)
tex/latex/tex-gyre             support for LaTeX (*.fd and *.sty files,
                               prepared by Marcin Woli\'nski)
fonts/enc/dvips/tex-gyre       support for dvips (*.enc files);
                               NOTE: all fonts of the TeX Gyre family
                                 share the same *.enc files with
                                 a few exceptions: CS, QX, and RM encodings
                                 for TeX Gyre Cursor (monospace) differ
                                 from the standard ones (because of the
                                 compatibility with Computer Modern
                                 typewriter fonts requested by users),
                                 and, moreover, CS, L7x, QX and RM encodings
                                 for TeX Gyre Chorus exploit exceptionally
                                 the `lslash_lslash' ligature
fonts/map/dvips/tex-gyre       support for dvips (*.map files)
fonts/opentype/public/tex-gyre fonts in the OpenType format (*.otf files)
fonts/type1/public/tex-gyre    PostScript (Type 1) font files and printer
                               font metric files (*.pfb and *.pfm,
                               respectively);
fonts/tfm/public/tex-gyre      TeX font metric files (*.tfm) for:
                               -- CS (CSTUG) encoding (cs-*.tfm),
                               -- EC (Cork) encoding (ec-*.tfm),
                               -- L7x (Lithuanian) encoding (l7x-*.tfm),
                               -- QX (GUST) encoding (qx-*.tfm),
                               -- RM (Regular Math or OT1) encoding (rm-*.tfm),
                               -- Y&Y's TeX'n'ANSI aka LY1 encoding
                                  (texnansi-*.tfm),
                               -- T5 (Vietnamese) encoding (t5-*.tfm),
                               -- Text Companion for EC fonts aka TS1
                                  (ts1-*.tfm).
fonts/afm/public/tex-gyre      Adobe font metric files (*.afm);

Email contact: Bogus\l{}aw Jackowski aka Jacko, B_Jackowski@gust.org.pl

                           *   *   *

In ConTeXt, support for TeX Gyre Collection can be found in the typescript
definition files:

  ... /tex/context/base/type-enc.tex
  ... /tex/context/base/type-syn.tex
  ... /tex/context/base/type-exa.tex
  ... /tex/context/base/type-map.tex

Additional encoding and map files can be found under:

  ... /texmf/fonts/map/pdftex/context
  ... /texmf/fonts/enc/pdftex/context

                           *   *   *

The Tex Gyre Chorus font contains 806 characters. Unlike for other fonts
from the TeX Gyre collection, Greek letters are missing and so do small
caps (using capital forms of chancery characters for typesetting whole
words should be forbidden by law). Here is the complete list of names
used in the Type 1 font:

A a Aacute aacute Abreve abreve Abreveacute abreveacute Abrevedotbelow
abrevedotbelow Abrevegrave abrevegrave Abrevehookabove abrevehookabove
Abrevetilde abrevetilde Acaron acaron Acircumflex acircumflex
Acircumflexacute acircumflexacute Acircumflexdotbelow acircumflexdotbelow
Acircumflexgrave acircumflexgrave Acircumflexhookabove
acircumflexhookabove Acircumflextilde acircumflextilde Acute acute
acute.dup acute.ts1 Acutecomb acutecomb Adblgrave adblgrave Adieresis
adieresis Adotbelow adotbelow AE ae AE.dup ae.dup AEacute aeacute Agrave
agrave Ahookabove ahookabove Amacron amacron ampersand anglearc angleleft
angleright Aogonek aogonek Aogonekacute aogonekacute approxequal Aring
aring Aringacute aringacute arrowdown arrowleft arrowright arrowup
asciicircum asciitilde asterisk asteriskmath at at.alt Atilde atilde B b
backslash baht bar bigcircle blanksymbol born braceleft braceright
bracketleft bracketright Breve breve breve.ts1 Breveacute breveacute
brevebelow brevebelowcomb brevebelowinverted brevebelowinvertedcomb
Brevecomb brevecomb Brevegrave brevegrave Brevehookabove brevehookabove
Breveinverted breveinverted Breveinvertedcomb breveinvertedcomb
Brevetilde brevetilde brokenbar bullet C c Cacute cacute Caron caron
caron.ts1 Caroncomb caroncomb Ccaron ccaron Ccedilla ccedilla Ccircumflex
ccircumflex Cdotaccent cdotaccent cedilla cedilla.dup cent cent.oldstyle
centigrade Circumflex circumflex circumflex.dup Circumflexacute
circumflexacute Circumflexcomb circumflexcomb Circumflexgrave
circumflexgrave Circumflexhookabove circumflexhookabove Circumflextilde
circumflextilde colon colonmonetary comma commaaccent commaaccentcomb
copyleft copyright copyright.alt currency cwm cwmascender cwmcapital
cyrBreve cyrbreve cyrFlex cyrflex D d dagger daggerdbl dblbracketleft
dblbracketright dblGrave dblgrave dblgrave.ts1 dblGravecomb dblgravecomb
dblverticalbar Dcaron dcaron Dcroat dcroat Ddotbelow ddotbelow degree
Delta diameter died Dieresis dieresis dieresis.dup dieresis.ts1
Dieresisacute dieresisacute Dieresiscaron dieresiscaron Dieresiscomb
dieresiscomb Dieresisgrave dieresisgrave discount divide divorced
Dlinebelow dlinebelow dollar dollar.oldstyle dong Dotaccent dotaccent
Dotaccentcomb dotaccentcomb dotbelow dotbelowcomb dotlessi dotlessj
dotlessj.dup E e Eacute eacute Ebreve ebreve Ecaron ecaron Ecircumflex
ecircumflex Ecircumflexacute ecircumflexacute Ecircumflexdotbelow
ecircumflexdotbelow Ecircumflexgrave ecircumflexgrave
Ecircumflexhookabove ecircumflexhookabove Ecircumflextilde
ecircumflextilde Edblgrave edblgrave Edieresis edieresis Edotaccent
edotaccent Edotbelow edotbelow Egrave egrave Ehookabove ehookabove eight
eight.oldstyle eight.prop eight.taboldstyle ell ellipsis Emacron emacron
emdash endash Eng eng Eogonek eogonek Eogonekacute eogonekacute equal
Ereversed ereversed estimated Eth eth Etilde etilde eturned Euro exclam
exclamdown F f f_k ff ffi ffl fi five five.oldstyle five.prop
five.taboldstyle fl florin four four.oldstyle four.prop four.taboldstyle
fraction fraction.alt G g Gacute gacute Gbreve gbreve Gcaron gcaron
Gcedilla gcedilla Gcircumflex gcircumflex Gcommaaccent gcommaaccent
Gdotaccent gdotaccent Germandbls germandbls germandbls.dup gnaborretni
Grave grave grave.ts1 Gravecomb gravecomb greater greaterequal
greaterorequalslant guarani guillemotleft guillemotright guilsinglleft
guilsinglright H h Hbar hbar Hbrevebelow hbrevebelow Hcircumflex
hcircumflex Hdieresis hdieresis Hdotbelow hdotbelow Hookabove hookabove
Hookabovecomb hookabovecomb Htilde htilde Hungarumlaut hungarumlaut
hungarumlaut.ts1 Hungarumlautcomb hungarumlautcomb hyphen hyphen.alt
hyphen.dup hyphen.prop hyphendbl hyphendbl.alt I i Iacute iacute Ibreve
ibreve Icaron icaron Icircumflex icircumflex Idblgrave idblgrave
Idieresis idieresis Idieresisacute idieresisacute Idotaccent Idotbelow
idotbelow Igrave igrave Ihookabove ihookabove IJ ij Imacron imacron
Imacron.alt imacron.alt infinity interrobang Iogonek iogonek Iogonekacute
iogonekacute Itilde itilde J j J_caron Jacute jacute jcaron Jcircumflex
jcircumflex K k Kcedilla kcedilla Kcommaaccent kcommaaccent L l Lacute
lacute Lcaron lcaron Lcedilla lcedilla Lcommaaccent lcommaaccent Ldot
ldot Ldotbelow ldotbelow Ldotbelowmacron ldotbelowmacron leaf less
lessequal lessorequalslant linebelow linebelowcomb lira logicalnot longs
lozenge lscript Lslash lslash lslash_lslash Ltilde ltilde M m Macron
macron Macron.alt macron.alt macron.dup macron.ts1 macronbelow
macronbelowcomb Macroncomb macroncomb married Mdotbelow mdotbelow mho
minus minusplus mu multiply musicalnote N n Nacute nacute naira nbspace
Ncaron ncaron Ncedilla ncedilla Ncommaaccent ncommaaccent Ndotaccent
ndotaccent Ndotbelow ndotbelow nine nine.oldstyle nine.prop
nine.taboldstyle notequal Ntilde ntilde numbersign O o Oacute oacute
Obreve obreve Ocaron ocaron Ocircumflex ocircumflex Ocircumflexacute
ocircumflexacute Ocircumflexdotbelow ocircumflexdotbelow Ocircumflexgrave
ocircumflexgrave Ocircumflexhookabove ocircumflexhookabove
Ocircumflextilde ocircumflextilde Odblgrave odblgrave Odieresis odieresis
Odotbelow odotbelow OE oe OE.dup oe.dup ogonek Ograve ograve ohm
Ohookabove ohookabove Ohorn ohorn Ohornacute ohornacute Ohorndotbelow
ohorndotbelow Ohorngrave ohorngrave Ohornhookabove ohornhookabove
Ohorntilde ohorntilde Ohungarumlaut ohungarumlaut Omacron omacron Omega
one one.oldstyle one.prop one.superior one.taboldstyle onehalf onequarter
Oogonek oogonek Oogonekacute oogonekacute openbullet ordfeminine
ordmasculine Orogate orogate Oslash oslash Oslash.dup oslash.dup
Oslashacute oslashacute Otilde otilde P p paragraph paragraph.alt
parenleft parenright partialdiff percent period periodcentered permyriad
perthousand perthousandzero peso plus plusminus published Q q question
questiondown quillbracketleft quillbracketright quotedbl quotedblbase
quotedblbase.ts1 quotedblleft quotedblright quoteleft quoteleft.dup
quoteright quoteright.dup quotesinglbase quotesinglbase.ts1 quotesingle
quotesingle.ts1 R r Racute racute radical Rcaron rcaron Rcedilla rcedilla
Rcommaaccent rcommaaccent Rdblgrave rdblgrave Rdotaccent rdotaccent
Rdotbelow rdotbelow Rdotbelowmacron rdotbelowmacron recipe referencemark
registered registered.alt Ring ring Ringacute ringacute Ringcomb ringcomb
ringhalfleft ringhalfright S s Sacute sacute Scaron scaron Scedilla
scedilla schwa Scircumflex scircumflex Scommaaccent scommaaccent
Sdotbelow sdotbelow section semicolon servicemark seven seven.oldstyle
seven.prop seven.taboldstyle sfthyphen six six.oldstyle six.prop
six.taboldstyle slash space star sterling summation suppress T t Tcaron
tcaron Tcedilla tcedilla Tcommaaccent tcommaaccent Tdieresis tdieresis
Tdotbelow tdotbelow Thorn thorn three three.oldstyle three.prop
three.superior three.taboldstyle threequarters threequartersemdash
tieaccentcapital tieaccentcapital.new tieaccentlowercase
tieaccentlowercase.new Tilde tilde tilde.dup tildebelow tildebelowcomb
Tildecomb tildecomb tildelow Tlinebelow tlinebelow trademark Ttilde
ttilde twelveudash two two.oldstyle two.prop two.superior two.taboldstyle
U u Uacute uacute Ubreve ubreve Ubrevebelowinverted ubrevebelowinverted
Ucaron ucaron Ucircumflex ucircumflex Udblgrave udblgrave Udieresis
udieresis Udieresisacute udieresisacute Udieresiscaron udieresiscaron
Udieresisgrave udieresisgrave Udotbelow udotbelow Ugrave ugrave
Uhookabove uhookabove Uhorn uhorn Uhornacute uhornacute Uhorndotbelow
uhorndotbelow Uhorngrave uhorngrave Uhornhookabove uhornhookabove
Uhorntilde uhorntilde Uhungarumlaut uhungarumlaut Umacron umacron
underscore uni2423 Uogonek uogonek Uring uring Utilde utilde V v W w
Wacute wacute Wcircumflex wcircumflex Wdieresis wdieresis weierstrass
Wgrave wgrave won X x Y y Yacute yacute Ycircumflex ycircumflex Ydieresis
ydieresis Ydotbelow ydotbelow yen Ygrave ygrave Yhookabove yhookabove
Ytilde ytilde Z z Zacute zacute Zcaron zcaron Zdotaccent zdotaccent
Zdotbelow zdotbelow zero zero.oldstyle zero.prop zero.slash
zero.taboldstyle
