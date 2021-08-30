#ifndef _FTW_H
#define _FTW_H

/* ftw.h - private header for file tree traversal */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <ftw.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>
#include <sys/stat.h>

/* classification */
#define _FTW_NS  0  /* unknown type; stat() failed */
#define _FTW_F  1   /* file */
#define _FTW_D  2   /* directory */

/* declarations */
extern _CRTIMP int __cdecl _ftw(const char *, int (__cdecl *)(const char *, const struct _stat *, int), int);
extern _CRTIMP int __cdecl _wftw(const wchar_t *, int (__cdecl *)(const wchar_t *, const struct _stat *, int), int);

/* compatibility names */
#ifdef __POCC__OLDNAMES
#define FTW_NS  _FTW_NS
#define FTW_F  _FTW_F
#define FTW_D  _FTW_D

extern int __cdecl ftw(const char *, int (__cdecl *)(const char *, const struct stat *, int), int);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _FTW_H */
