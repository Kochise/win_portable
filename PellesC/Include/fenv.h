#ifndef _FENV_H
#define _FENV_H

/* fenv.h - standard header; TC1 changes added */

#if __POCC__ < 1100
#error <stdlib.h> need POCC version 11.0 or higher
#endif /* __POCC__ < 1100 */

#pragma once

#include <crtdef.h>

#if __POCC_STDC_VERSION__ > 201710L && 0 /* TODO */
#define  __STDC_VERSION_FENV_H__  000000L  /* TODO */

typedef struct femode_t {
    unsigned long mode[2];
} femode_t;

/* floating-point dynamic mode */
extern int __cdecl fegetmode(femode_t *);
extern int __cdecl fesetmode(const femode_t *);

#endif /* __POCC_STDC_VERSION__ > 201710L */

typedef unsigned long fexcept_t;

typedef struct fenv_t {
    fexcept_t control, status, reserved[5];
} fenv_t;

/* macros */
#define FE_TONEAREST   0x00
#define FE_DOWNWARD    0x01
#define FE_UPWARD      0x02
#define FE_TOWARDZERO  0x03
/* #define FE_TONEARESTFROMZERO  0x04 */

#define FE_INVALID     0x01
#define FE_DIVBYZERO   0x04
#define FE_OVERFLOW    0x08
#define FE_UNDERFLOW   0x10
#define FE_INEXACT     0x20
#define FE_ALL_EXCEPT  (FE_INVALID|FE_DIVBYZERO|FE_OVERFLOW|FE_UNDERFLOW|FE_INEXACT)

#define FE_DFL_ENV  (&__dfl_fenv)

/* floating-point exception handling */
extern _CRTIMP int __cdecl feclearexcept(int);
extern _CRTIMP int __cdecl fegetexceptflag(fexcept_t *, int);
extern _CRTIMP int __cdecl feraiseexcept(int);
extern _CRTIMP int __cdecl fesetexceptflag(const fexcept_t *, int);
extern _CRTIMP int __cdecl fetestexcept(int);

/* rounding control */
extern _CRTIMP int __cdecl fegetround(void);
extern _CRTIMP int __cdecl fesetround(int);

/* floating-point environment */
extern _CRTIMP int __cdecl fegetenv(fenv_t *);
extern _CRTIMP int __cdecl fesetenv(const fenv_t *);
extern _CRTIMP int __cdecl feupdateenv(const fenv_t *);
extern _CRTIMP int __cdecl feholdexcept(fenv_t *);

/* data declarations */
extern _CRTIMP const fenv_t __dfl_fenv;
extern _CRTIMP fenv_t __fenv;

#endif /* _FENV_H */
