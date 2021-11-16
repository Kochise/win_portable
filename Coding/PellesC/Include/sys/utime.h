#ifndef _SYS_UTIME_H
#define _SYS_UTIME_H

/* sys/utime.h - private header for file timestamp definitions */

#ifndef RC_INVOKED

#if __POCC__ < 1000
#error <sys/utime.h> need POCC version 10.0 or higher
#endif /* __POCC__ < 1000 */

#pragma once

#include <crtdef.h>

/* type definitions */
#ifndef _TIME_T_DEFINED
#define _TIME_T_DEFINED
typedef __TIME_TYPE__ time_t;
#endif

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif

#ifndef _UTIMBUF_DEFINED
#define _UTIMBUF_DEFINED
struct _utimbuf {
    time_t actime;
    time_t modtime;
};

#ifdef __POCC__OLDNAMES
struct utimbuf {
    time_t actime;
    time_t modtime;
};
#endif /* __POCC__OLDNAMES */
#endif /* _UTIMBUF_DEFINED */

/* declarations */
extern _CRTIMP int __cdecl _utime(const char *, struct _utimbuf *);
extern _CRTIMP int __cdecl _futime(int, struct _utimbuf *);
extern _CRTIMP int __cdecl _wutime(const wchar_t *, struct _utimbuf *);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern int __cdecl utime(const char *, struct utimbuf *);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _SYS_UTIME_H */
