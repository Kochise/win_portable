#ifndef _SYS_TIMEB_H
#define _SYS_TIMEB_H

/* sys/timeb.h - private header for _ftime() definitions */

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

#ifndef _TIMEB_DEFINED
#define _TIMEB_DEFINED
struct _timeb {
    time_t time;
    unsigned short millitm;
    short timezone;
    short dstflag;
};

#ifdef __POCC__OLDNAMES
struct timeb {
    time_t time;
    unsigned short millitm;
    short timezone;
    short dstflag;
};
#endif /* __POCC__OLDNAMES */
#endif /* _TIMEB_DEFINED */

/* declarations */
extern _CRTIMP void __cdecl _ftime(struct _timeb *);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern void __cdecl ftime(struct timeb *);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _SYS_TIMEB_H */
