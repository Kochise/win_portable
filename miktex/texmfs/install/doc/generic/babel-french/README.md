The babel-french package (formerly known as `frenchb')
======================================================

Description
-----------

This package provides support for the French language for the babel
multilingual system.

It is designed to work with the following engines: pdfTeX, XeTeX and LuaTeX.
Plain and LaTeX formats are supported.

## Contents

The bundle consists of the following files:

* frenchb.ins: installation file to unpack the language definition files,
* frenchb.dtx: packed language definition files and documentation,
* frenchb.pdf: unpacked documentation for babel-french,
* frenchb-doc.pdf: comprehensive documentation in French,
* frenchb-doc.tex: source file of frenchb-doc.pdf,
* README.md (this file).

License
-------

Released under the LaTeX Project Public License v1.3 or later
See http://www.latex-project.org/lppl.txt

## Installation

If the latest version of this package is not included in your LaTeX
distribution, do the following:

* issue "luatex frenchb.ins" to unpack the language definition files;
* copy the files frenchb.lua, french.ldf, frenchb.ldf, francais.ldf,
  acadian.ldf and canadien.ldf to a location where TeX can find them
  (default location: $TEXMF/tex/generic/babel-french/);
* rebuild the database (mktexlsr or so).

Documentation
-------------

See the included manuals for usage instructions: frenchb.pdf in English or
the French documentation frenchb-doc.pdf.

Changes
-------

See the included manual frenchb.pdf, section "Change History".

---
Copyright 1996--2020 Daniel Flipo
E-mail: daniel (dot) flipo (at) free (dot) fr
