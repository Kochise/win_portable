# Interface to the wasy fonts for LaTeX2e.

## License

This material is subject to the LATEX Project Public License 1.3c.

wasysym does work with the old wasy-fonts but some characters are
missing and others may come out wrong. Therefore I suggest
to upgrade to wasy.

The WASY fonts are provided as METAFONT fonts.
There is a package wasy-type1 that contains the outline fonts.

Bug reports (and enhancements) to

Axel Kielhorn
tex@axelkielhorn.de

Please note that the EC fonts (former DC fonts) come with
a textcompanion font that contains a lot of special characters.
Use the textcomp package to access these symbols.

Many TeX fonts are now supporting a wide range of Unicode symbols.
You may look there first.

This package supports the WASY fonts version 2.4 or 
wasy-type1 version 001.001.
When used with older versions some characters may be missing.

## Changes:

1.0b
:   Corrected mathcode of integrals (now 1) (=mathop)

1.0c 
:   The command is textwasy as defined and not textlasy as
    shown in the margin

1.0d 
:   Adapted to LaTeX2e[1994/06/01]

1.0e 
:   Changed some symbols from mathrel to mathbin as in latexsym
    Changed the way the documentation is generated form
    latex2e-beta to official LaTeX2e-way.

1.0f 
:   Corrected \dh and \Dh definition for T1 encoding
    Renamed \Dh to \DH as in T1 encoding but keeping the old
    name for compatibility

1.0g 
:   Reinserted the \hbox commands, wasysym now works in mathmode again

1.0f 
:   Changed most \hbox commands to \mbox (thanks to Donald Arseneau)
    Donald added partial support for AMSmath

1.0i 
:   Changed license to LPPL, some documentation updates.

2.0  
:   Changed the way integrals are handled
    Corrected some definitions (missing \leavevmode)

2.0a 
:   Removed \rm from \DH command. It now works in
    italic and bold as well, but the italic version looks
    somewhat strange. I suggest using a T1 encoded font instead.

2.3  
:   Updated to support version 2.3 of the WASY fonts.
    New characters added: \Paragraph, \euro and \applecmd.
    Support for the bold and slanted version of wasy10.

2.4
:   Updated to support version 2.4 of the WASY fonts.
    New characters added: \longs (Unicode 017f) and \roundz a variant of the
    letter z that got reintroduced to german writing with the 
    Vereinfachte Ausgangsschrift.

