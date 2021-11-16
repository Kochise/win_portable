#!/bin/bash
#
# $Id: renderercheck.sh 187 2011-03-03 21:48:02Z Michael.McTernan@gmail.com $
#
# Script to run tests for mscgen
# Copyright (C) 2011, Michael McTernan, Michael.McTernan.2001@cs.bris.ac.uk
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software Foundation,
# Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#

grep -q "^#define REMOVE_PNG_OUTPUT 1" $top_builddir/config.h
if [ "$?" = "0" ] ; then
  NO_PNG=1
fi

for F in `cd $srcdir && ls *.msc` ; do
    echo "$F"
    [ "$NO_PNG" == 1 ] || $VALGRIND $top_builddir/src/mscgen -T png -i $srcdir/$F -o $F.png || exit $?
    $VALGRIND $top_builddir/src/mscgen -T svg -i $srcdir/$F -o $F.svg || exit $?
    $VALGRIND $top_builddir/src/mscgen -T eps -i $srcdir/$F -o $F.eps || exit $?
    $VALGRIND $top_builddir/src/mscgen -T ismap -i $srcdir/$F -o $F.ismap || exit $?
done

# END OF SCRIPT
