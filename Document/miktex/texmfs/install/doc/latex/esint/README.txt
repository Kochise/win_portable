The esint package is a solution to access to alternate integral symbols
using the Computer Modern fonts.

In the original Computer Modern Math font, several integral symbols are missing,
such \oiint. Many of those symbols are available
in other math fonts (pxfonts, txfonts, etc.), but there is no good solution if you
want tu use Computer Modern.

The easing.ins file allows to generate mf files, but Type1 font are available on CTAN: it's better to use them!

License : LPPL

Updates:

*2005/01/20: minor change in esint.fd in order to avoid an error inside align environment.
Thank's to Eckhard Neber.

*2019/07/19: add intimits and nointlimits options, and modify \dotsint command as \idotsint to modify all ams math symbols (request from Franck Mittelbach).

*2019/08/21 and 2019/08/27: some modification of typos in dox and ins files.

Eddie Saudrais
e.saudrais@wanadoo.fr
http://www.phylam.org