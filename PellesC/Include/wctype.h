#ifndef _WCTYPE_H
#define _WCTYPE_H

/* wctype.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <wctype.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

/* macros */
#define WEOF  ((wint_t)(-1))

/* type definitions */
#ifndef _WINT_T_DEFINED
#define _WINT_T_DEFINED
typedef __WINT_TYPE__ wint_t;
#endif /* _WINT_T_DEFINED */

typedef unsigned int wctrans_t;
typedef unsigned int wctype_t;

/* declarations */
extern _CRTIMP int __cdecl iswalnum(wint_t);
extern _CRTIMP int __cdecl iswalpha(wint_t);
extern _CRTIMP int __cdecl iswblank(wint_t);
extern _CRTIMP int __cdecl iswcntrl(wint_t);
extern _CRTIMP int __cdecl iswdigit(wint_t);
extern _CRTIMP int __cdecl iswgraph(wint_t);
extern _CRTIMP int __cdecl iswlower(wint_t);
extern _CRTIMP int __cdecl iswprint(wint_t);
extern _CRTIMP int __cdecl iswpunct(wint_t);
extern _CRTIMP int __cdecl iswspace(wint_t);
extern _CRTIMP int __cdecl iswupper(wint_t);
extern _CRTIMP int __cdecl iswxdigit(wint_t);
extern _CRTIMP int __cdecl _iswascii(wint_t);
extern _CRTIMP int __cdecl iswctype(wint_t, wctype_t);
extern _CRTIMP wint_t __cdecl towlower(wint_t);
extern _CRTIMP wint_t __cdecl towupper(wint_t);
extern _CRTIMP wint_t __cdecl towctrans(wint_t, wctrans_t);
extern _CRTIMP wctrans_t __cdecl wctrans(const char *);
extern _CRTIMP wctype_t __cdecl wctype(const char *);
extern _CRTIMP _CRTOLD("Use common sense instead.") int __cdecl _iswascii(wint_t);

#ifdef __POCC__OLDNAMES
extern _CRTOLD("Use common sense instead.") int __cdecl iswascii(wint_t);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _WCTYPE_H */
