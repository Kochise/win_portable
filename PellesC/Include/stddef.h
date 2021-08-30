#ifndef _STDDEF_H
#define _STDDEF_H

/* stddef.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 1000
#error <stddef.h> need POCC version 10.0 or higher
#endif /* __POCC__ < 1000 */

#pragma once

/* macros */
#ifndef NULL
#define NULL  ((void *)0)
#endif

#ifndef offsetof
#define offsetof(TY,M)  __offsetof(TY, M)
#endif /* offsetof */

/* type definitions */
#ifndef _PTRDIFF_T_DEFINED
#define _PTRDIFF_T_DEFINED
typedef __PTRDIFF_TYPE__ ptrdiff_t;
#endif /* _PTRDIFF_T_DEFINED */

#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

#if __POCC_STDC_VERSION__ >= 201112L
#pragma warn(push)
#pragma warn(disable:2225)  /* type padded, so there */
typedef union __declspec(align(16)) { long double d; long long n; void *p; void (*f)(void); } max_align_t;
#pragma warn(pop)
#endif /* __POCC_STDC_VERSION__ >= 201112L */

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif /* _WCHAR_T_DEFINED */

/* bounds-checking interfaces (TR24731-1, C11 annex K) */
#if __STDC_WANT_LIB_EXT1__

#ifndef _RSIZE_T_DEFINED
#define _RSIZE_T_DEFINED
typedef __SIZE_TYPE__ rsize_t;
#endif /* _RSIZE_T_DEFINED */

#endif /* __STDC_WANT_LIB_EXT1__ */

#endif /* !RC_INVOKED */

#endif /* _STDDEF_H */
