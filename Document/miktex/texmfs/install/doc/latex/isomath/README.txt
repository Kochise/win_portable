isomath
*******
Mathematical style for science and technology
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:Author:    Günter Milde
:Date:      2012-09-10
:Copyright: © 2008, 2012 Günter Milde <milde@users.sf.net>
:Licence:   This work may be distributed and/or modified under the
            conditions of the `LaTeX Project Public License`_, either
            version 1.3 of this license or (at your option) any later version.

:Abstract: The `isomath` package provides tools for a mathematical style
           that conforms to the International Standard ISO 80000-2 and is
           common in science and technology. It changes the default shape of
           capital Greek letters to italic, sets up bold italic and
           sans-serif bold italic math alphabets with Latin and Greek
           characters, and defines macros for markup of vector, matrix and
           tensor symbols.

Files
=====

====================  =================================
README.txt            Requirements, Installation, Usage
README.html           Requirements, Installation, Usage (HTML)
                      
isomath.sty           literate source (the actual LaTeX package)
isomath.sty.txt       literate source (text version)
isomath.sty.html      literate source (HTML)
                      
isomath.txt           user documentation (source)
isomath.html          user documentation (HTML)
isomath.pdf           user documentation (PDF)
                      
isomath-test.tex      Test example (source)
isomath-test.pdf      Test example (PDF output)
====================  =================================

The bidirectional text <-> code converter PyLit_ can convert between
``isomath.sty`` and ``isomath.sty.txt``.

The Docutils_ and pdflatex were used to generate the HTML and PDF
documentation from the reStructuredText_ sources.


Requirements
============

This package builds on and extends fixmath_ by Walter Schmidt.
It also requires kvoptions_.

The cmbright_ package is recommended for *sans-serif italic* and *sans-serif
bold italic* fonts matching with Computer Modern and derivatives.

All required packages are part of TeXLive and MikTeX.


Installation
============

If possible, get this package from your distribution using its installation
manager.
  
Otherwise, make sure LaTeX can find the file `isomath.sty`:

* Download and unpack `isomath.zip` or just download `isomath.sty`.

* Copy/Move/Link ``isomath.sty`` to a suitable place in the TDS_ and run
  ``texhash``, or place it in the current working directory (e.g. for
  testing).



Usage
=====

Load the package and (optionally) change the default ``\vec`` macro with::

  \usepackage{isomath}
  \renewcommand{\vec}{\vectorsym}  % optional

Option description, more examples and usage hints are in the `user
documentation`_.

.. References
   ==========

.. _LaTeX Project Public License: http://www.latex-project.org/lppl.txt
.. _PyLit: http://pylit.berlios.de
.. _reStructuredText: http://docutils.sourceforge.net/rst.html
.. _Docutils: http://docutils.sourceforge.net/rst.html

.. _cmbright: http://mirror.ctan.org/help/Catalogue/entries/cmbright.html
.. _fixmath: http://mirror.ctan.org/help/Catalogue/entries/fixmath.html
.. _kvoptions: http://mirror.ctan.org/help/Catalogue/entries/kvoptions.html

.. _TDS: http://www.tex.ac.uk/cgi-bin/texfaq2html?label=tds

.. _user documentation: isomath.sty.html
