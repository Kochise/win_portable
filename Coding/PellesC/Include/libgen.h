#ifndef _LIBGEN_H
#define _LIBGEN_H

/* libgen.h - private header for pattern matching functions */

#if __POCC__ >= 500
#pragma once
#endif

/* declarations */
extern char * __cdecl _basename(char *);
extern char * __cdecl _dirname(char *);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern char * __cdecl basename(char *);
extern char * __cdecl dirname(char *);
#endif /* __POCC__OLDNAMES */

#endif /* _LIBGEN_H */

