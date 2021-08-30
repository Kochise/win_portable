#ifndef _GETOPT_H
#define _GETOPT_H

/* getopt.h - private header for command-line option parsing */

#if __POCC__ >= 500
#pragma once
#endif

/* data declarations */
extern char *optarg;
extern int optind, opterr, optopt;

/* declarations */
extern int __cdecl _getopt(int, char * const *, const char *);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern int __cdecl getopt(int, char * const *, const char *);
#endif /* __POCC__OLDNAMES */

#endif /* _GETOPT_H */

