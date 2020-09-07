#
# $Id: Makefile.am 134 2010-09-07 18:54:17Z Michael.McTernan $
#

dist_man_MANS = mscgen.1

.SUFFIXES= .1 .1in

# Use the suffix rule to support non-GNU make.
.1in.1:
	$(SED) "s/__VERSION__/$(PACKAGE_VERSION)/;s/__DATE__/`date +%F`/" $< > $@

BUILT_SOURCES = $(dist_man_MANS)

CLEANFILES = $(BUILT_SOURCES)

EXTRA_DIST = mscgen.1in
