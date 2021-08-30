#ifndef _STRINGS_H
#define _STRINGS_H

/* strings.h - private header for string operations */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <strings.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

/* declarations */
extern _CRTIMP int __cdecl _ffs(int);
extern _CRTIMP int __cdecl _strcasecmp(const char *, const char *);
extern _CRTIMP int __cdecl _strncasecmp(const char *, const char *, size_t);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern int __cdecl ffs(int);
extern int __cdecl strcasecmp(const char *, const char *);
extern int __cdecl strncasecmp(const char *, const char *, size_t);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _STRINGS_H */
