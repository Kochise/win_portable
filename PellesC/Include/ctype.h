#ifndef _CTYPE_H
#define _CTYPE_H

/* ctype.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 1100
#error <ctype.h> need POCC version 11.0 or higher
#endif /* __POCC__ < 1100 */

#pragma once

#include <crtdef.h>

#ifdef _MSC_EXTENSIONS
/* for compiling with windows.h -- see Microsoft ctype.h */
#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif
#endif /* _MSC_EXTENSIONS */

/* declarations */
extern _CRTIMP int __cdecl isalnum(int);
extern _CRTIMP int __cdecl isalpha(int);
extern _CRTIMP int __cdecl isblank(int);
extern _CRTIMP int __cdecl iscntrl(int);
extern _CRTIMP int __cdecl isdigit(int);
extern _CRTIMP int __cdecl isgraph(int);
extern _CRTIMP int __cdecl islower(int);
extern _CRTIMP int __cdecl isprint(int);
extern _CRTIMP int __cdecl ispunct(int);
extern _CRTIMP int __cdecl isspace(int);
extern _CRTIMP int __cdecl isupper(int);
extern _CRTIMP int __cdecl isxdigit(int);
extern _CRTIMP int __cdecl _isascii(int);
extern _CRTIMP int __cdecl tolower(int);
extern _CRTIMP int __cdecl toupper(int);
extern _CRTIMP _CRTOLD("Use common sense instead.") int __cdecl _isascii(int);
extern _CRTIMP _CRTOLD("Use common sense instead.") int __cdecl _toascii(int);

#ifdef __POCC__OLDNAMES
extern _CRTOLD("Use common sense instead.") int __cdecl isascii(int);
extern _CRTOLD("Use common sense instead.") int __cdecl toascii(int);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _CTYPE_H */
