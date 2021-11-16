#ifndef _SIGNAL_H
#define _SIGNAL_H

/* signal.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <signal.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

/* type definitions */
typedef __SIG_ATOMIC_TYPE__ sig_atomic_t;
typedef void __cdecl __sigfunc(int);

/* signal codes */
#define SIGINT  2
#define SIGILL  4
#define SIGABRT  6
#define SIGFPE  8
#define SIGSEGV  11
#define SIGTERM  15

/* signal return values */
#define SIG_DFL  ((__sigfunc *)0)
#define SIG_ERR  ((__sigfunc *)-1)
#define SIG_IGN  ((__sigfunc *)1)

/* declarations */
extern _CRTIMP int __cdecl raise(int);
extern _CRTIMP __sigfunc * __cdecl signal(int, __sigfunc *);

#endif /* !RC_INVOKED */

#endif /* _SIGNAL_H */
