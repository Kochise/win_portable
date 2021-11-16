#ifndef _DIRECT_H
#define _DIRECT_H

/* direct.h - private header for directory handling */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <direct.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

/* type definitions */
#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif

/* declarations */
extern _CRTIMP int __cdecl _chdir(const char *);
extern _CRTIMP int __cdecl _chdrive(int);
extern _CRTIMP char * __cdecl _getcwd(char *, size_t);
extern _CRTIMP wchar_t * __cdecl _wgetcwd(wchar_t *, size_t);
extern _CRTIMP int __cdecl _getdrive(void);
extern _CRTIMP int __cdecl _mkdir(const char *);
extern _CRTIMP int __cdecl _rmdir(const char *);
extern _CRTIMP int __cdecl _wchdir(const wchar_t *);
extern _CRTIMP int __cdecl _wmkdir(const wchar_t *);
extern _CRTIMP int __cdecl _wrmdir(const wchar_t *);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern int __cdecl chdir(const char *);
extern char * __cdecl getcwd(char *, size_t);
extern int __cdecl mkdir(const char *);
extern int __cdecl rmdir(const char *);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _DIRECT_H */
