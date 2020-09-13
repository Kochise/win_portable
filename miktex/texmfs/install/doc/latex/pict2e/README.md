
# The pict2e package

This package was described in the 2nd edition of "LaTeX: A Document
Preparation System", but the LaTeX project team declined to produce
the package.  For a long time, LaTeX has included a "pict2e package"
that merely produced an apologetic error message.

The new package extends the existing LaTeX picture environment, using
the familiar technique (cf. the graphics and color packages) of driver
files.  The package documentation (pict2e.dtx) has a fair number of
examples of use, showing where things are improved by comparison with
the LaTeX picture environment.

Caveats:

1. Unpacking the package in the usual way (processing pict2e.ins)
   produces a file pict2e-example.cfg; this file is a satisfactory
   pict2e.cfg file, for most purposes.  You can't generate the
   documentation (by processing pict2e.dtx) unless you have a
   pict2e.cfg file. so you are recommended to rename
   pict2e-example.cfg as pict2e.cfg, beforehand.  The file pict2e.pdf,
   in the distribution, was generated in this way, using PDFLaTeX.

2. If you have not installed the 2003/12/01 release of LaTeX, you
   already have a pict2e.sty.  You should ensure that you install the
   new pict2e.sty in such a way that it gets chosen by your TeX system
   in preference to the old version.  One way of achieving this is
   simply to delete the old version, which is to be found on a TDS
   system in $TEXMF/tex/latex/base

Recommended TDS locations:
```
   pict2e.sty and driver files:  tex/latex/pict2e
   pict2e.pdf, p2e-drivers.pdf:  doc/latex/pict2e
   pict2e.cfg:                   tex/latex/[TEXDIST]/graphics.cfg
```

For bug reports use the GitHub repository: https://github.com/rolfn/pict2e/issues

