#
# $Id: configure.ac 178 2011-02-14 20:07:43Z Michael.McTernan@gmail.com $
#

AC_INIT([mscgen],[0.20],[Michael.McTernan.2001@cs.bris.ac.uk])
AC_PREREQ(2.59)
AC_CONFIG_FILES([Makefile])
AC_CONFIG_FILES([src/Makefile])
AC_CONFIG_FILES([man/Makefile])
AC_CONFIG_FILES([test/Makefile])
AC_CONFIG_FILES([examples/Makefile])
AC_CONFIG_HEADERS([config.h])
AC_HEADER_STDC
AM_INIT_AUTOMAKE
AC_PROG_CC
AM_PROG_CC_C_O
AC_PROG_SED
AM_PROG_LEX
AC_PROG_YACC
AC_PROG_INSTALL
PKG_PROG_PKG_CONFIG

AC_CHECK_HEADERS([unistd.h])
AC_CHECK_HEADERS([limits.h])

#
# Check if libgd is needed
#
AC_ARG_WITH([png],
  [AS_HELP_STRING([--without-png],
                  [Remove png-support and dependence on libgd @<:@default=no@:>@])],
  [if test "$withval" = "no" ; then
     AC_DEFINE_UNQUOTED(REMOVE_PNG_OUTPUT, )
     with_libgd=no
   fi]
)

AH_TEMPLATE([REMOVE_PNG_OUTPUT],
            [If set, remove PNG output support thereby removing libgd dependence.])


# Try to figure out how gd works if we need it.
#  GD may be packaged with either gdlib-config or using pkg-config.
#  This is a real pain, so we try both and hope one works okay.
#
if test "x$with_libgd" != "xno"; then


  # Get compile and link options from either gdlib-config or pkg-config
  AC_PATH_PROG(GDLIB_CONFIG,gdlib-config)
  if test -n "$GDLIB_CONFIG"; then

    # Allow command line override as per PKG_CHECK macro
    if test -z "$GDLIB_CFLAGS"; then
      GDLIB_CFLAGS="`$GDLIB_CONFIG --cflags`"
    fi
    if test -z "$GDLIB_LIBS"; then
      GDLIB_LIBS="`$GDLIB_CONFIG --ldflags` `$GDLIB_CONFIG --libs`"
    fi

  else
    PKG_CHECK_MODULES([GDLIB], [gdlib])
  fi

  # Update flags with what we've found so far
  CPPFLAGS="$CPPFLAGS $GDLIB_CFLAGS"
  LIBS="$LIBS $GDLIB_LIBS"

  # Check we can use gd.h, otherwise the config isn't right
  AC_CHECK_HEADER(gd.h,, AC_MSG_ERROR([Failed to find gd.h]))


  # Some versions of gdlib.pc and gdlib-config fail to include -lgd in the link
  #  flags. Therefore check if it needs to be added, along with libm.
  # Note: We don't use AC_SEARCH_LIBS() since that fails if compiling on Win32
  #        using -mno-cygwin since it doesn't get the correct definition of
  #        gdImageColorAllocate() from gd.h and hence fails the link.

  AC_MSG_CHECKING([if gdImageColorAllocate() can be linked])
  gdlib=no

  AC_LINK_IFELSE([AC_LANG_PROGRAM([[#include <gd.h>]],[[gdImageColorAllocate(0,0,0,0);]])],
                 gdlib=yes,
                 gdlib=no)

  if test "x$gdlib" = xno; then
    LIBS="$LIBS -lgd"
    AC_LINK_IFELSE([AC_LANG_PROGRAM([[#include <gd.h>]],[[gdImageColorAllocate(0,0,0,0);]])],
                   gdlib="yes (-lgd)",
                   gdlib=no)
  fi

  if test "x$gdlib" = xno; then
    LIBS="$LIBS -lm"
    AC_LINK_IFELSE([AC_LANG_PROGRAM([[#include <gd.h>]],[[gdImageColorAllocate(0,0,0,0);]])],
                   gdlib="yes (-lgd -lm)",
                   gdlib=no)
  fi


  AC_MSG_RESULT([$gdlib])

  # Check if FreeType support needs testing
  AC_ARG_WITH([freetype],
    [AS_HELP_STRING([--with-freetype], [Enable FreeType font rendering @<:@default=no@:>@])],
    with_freetype=yes)

  # Check if libgd has FreeType support and is usable (i.e. has required libs)
  if test "x$with_freetype" = xyes ; then

    AC_MSG_CHECKING([if gdImageStringFT() can be linked])

    AC_LINK_IFELSE([AC_LANG_PROGRAM([[#include <gd.h>]],[[gdImageStringFT(0,0,0,0,0,0,0,0,0);]])],
                   with_freetype=yes,
                   with_freetype=no)

    AC_MSG_RESULT($with_freetype)

    if test "x$with_freetype" = xyes ; then
      AC_DEFINE_UNQUOTED(USE_FREETYPE, 1)
    else
      AC_MSG_ERROR([FreeType use was requested, but FreeType support was not found to be usable in libgd])
    fi

  fi

fi


AH_TEMPLATE([USE_FREETYPE],
            [Use FreeType for rendering text in PNGs.])


# Older versions of autoconf (<2.60?) fail to define docdir
if test -z "$docdir" ; then
  docdir='${datadir}/doc/mscgen-${PACKAGE_VERSION}'
  AC_SUBST(docdir)
fi


AC_OUTPUT

