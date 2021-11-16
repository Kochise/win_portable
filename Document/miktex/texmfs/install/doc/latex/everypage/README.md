# The `everypage` package 

## Warning

This package is now in *legacy status*. Functionality similar to that provided
by this package is directly implemented in LaTeX since its 2020 Fall
release. Do not use everypage in new documents and do not rely on it in new
packages or classes of yours.

When running on a pre-2020-10-01 version of LaTeX, `everypage` will now fall
back to `everypage-1x`, its own past code base.

When running on a modern LaTeX, `everypage` will strive to provide its legacy
interfaces by using the newer LaTeX facilities. However, full equivalence is
not possible and breakage may occur. Load `everypage-1x` in place of
`everypage` if you really want to force usage of the old code base (that might
keep working for a few more LaTeX release cycles).


## Historic behavior

The `everypage` package extends LaTeX providing hooks to do actions on every
page or on the current page. Speciﬁcally, actions are performed before the page
is shipped, so they can be used to put watermarks in the background of a page,
or to set the page layout. The package reminds in some sense `bobhook` by
Karsten Tinnefeld, but it differs in the way in which the hooks are
implemented, as detailed in the package documentation. In some sense it may
also be related to the package `everyshi` by Martin Schroeder, but again the
implementation is different.

The `everypage` package is copyright 2006, 2007, 2020.
by Sergio Callegari <sergio.callegari@gmail.com>

It comprises this `README.md` file, as well as files
- `everypage.dtx`
- `everypage.ins`

To install the package, run LaTeX on the installation script `everypage.ins`
and follow the instructions provided by the script itself.


## Notes

This is version 2.0 of the `everypage` package, suitable for LaTeX releases
post Fall 2020.

Version 1.2 might keep working for a few more LaTeX release cycles. It is now
available as `everypage-1x`. It fixed a minor issue with the ordering of
operations, in version 1.1.

Version 1.1 fixed a bug in version 1.0 that caused LaTeX to exceed its capacity
or to hang.  Such behaviour was particularly evident in conjunction with the
draftwatermark package.

UPGRADE IS RECOMMENDED

## License

Package `everypage` may be distributed and/or modified under the conditions of
the LaTeX Project Public License, version 1.3c. This license is available at
https://www.latex-project.org/lppl/lppl-1-3c/.

This work has the LPPL maintenance status "maintained".
