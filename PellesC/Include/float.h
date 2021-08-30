#ifndef _FLOAT_H
#define _FLOAT_H

/* float.h - standard header (IEEE 754 version) */

#ifndef RC_INVOKED

#if __POCC__ < 1100
#error <float.h> need POCC version 11.0 or higher
#endif /* __POCC__ < 1100 */

#pragma once

#include <crtdef.h>

/* common properties */
#define FLT_RADIX  __FLT_RADIX__
#define FLT_ROUNDS  (__fprounds())
#define FLT_EVAL_METHOD  (__POCC_FLTEVAL__)

#define DECIMAL_DIG  __LDBL_DECIMAL_DIG__

/* float properties */
#define FLT_EPSILON  __FLT_EPSILON__
#define FLT_MAX      __FLT_MAX__
#define FLT_MIN      __FLT_MIN__

#define FLT_DIG         __FLT_DIG__
#define FLT_MANT_DIG    __FLT_MANT_DIG__
#define FLT_MIN_10_EXP  __FLT_MIN_10_EXP__
#define FLT_MAX_10_EXP  __FLT_MAX_10_EXP__
#define FLT_MIN_EXP     __FLT_MIN_EXP__
#define FLT_MAX_EXP     __FLT_MAX_EXP__

/* double properties */
#define DBL_EPSILON  __DBL_EPSILON__
#define DBL_MAX      __DBL_MAX__
#define DBL_MIN      __DBL_MIN__

#define DBL_DIG         __DBL_DIG__
#define DBL_MANT_DIG    __DBL_MANT_DIG__
#define DBL_MIN_10_EXP  __DBL_MIN_10_EXP__
#define DBL_MAX_10_EXP  __DBL_MAX_10_EXP__
#define DBL_MIN_EXP     __DBL_MIN_EXP__
#define DBL_MAX_EXP     __DBL_MAX_EXP__

/* 64-bit long double properties */
#define LDBL_EPSILON  __LDBL_EPSILON__
#define LDBL_MAX      __LDBL_MAX__
#define LDBL_MIN      __LDBL_MIN__

#define LDBL_DIG         __LDBL_DIG__
#define LDBL_MANT_DIG    __LDBL_MANT_DIG__
#define LDBL_MIN_10_EXP  __LDBL_MIN_10_EXP__
#define LDBL_MAX_10_EXP  __LDBL_MAX_10_EXP__
#define LDBL_MIN_EXP     __LDBL_MIN_EXP__
#define LDBL_MAX_EXP     __LDBL_MAX_EXP__

#if __POCC_STDC_VERSION__ >= 201112L

#define FLT_HAS_SUBNORM   __FLT_HAS_SUBNORM__
#define DBL_HAS_SUBNORM   __DBL_HAS_SUBNORM__
#define LDBL_HAS_SUBNORM  __LDBL_HAS_SUBNORM__

#define FLT_DECIMAL_DIG   __FLT_DECIMAL_DIG__
#define DBL_DECIMAL_DIG   __DBL_DECIMAL_DIG__
#define LDBL_DECIMAL_DIG  __LDBL_DECIMAL_DIG__

#define FLT_TRUE_MIN   __FLT_TRUE_MIN__
#define DBL_TRUE_MIN   __DBL_TRUE_MIN__
#define LDBL_TRUE_MIN  __LDBL_TRUE_MIN__

#endif /* __POCC_STDC_VERSION__ >= 201112L */

#if __POCC_STDC_VERSION__ > 201710L

#define INFINITY  __INFINITY__
#define NAN  __NAN__

/* TODO: #define FLT_SNAN  ... */
/* TODO: #define DBL_SNAN  ... */
/* TODO: #define LDBL_SNAN  ... */

#define FLT_NORM_MAX   __FLT_NORM_MAX__
#define DBL_NORM_MAX   __DBL_NORM_MAX__
#define LDBL_NORM_MAX  __LDBL_NORM_MAX__

#endif /* __POCC_STDC_VERSION__ > 201710L */

/* hel(l)per function */
extern _CRTIMP int __cdecl __fprounds(void);

#endif /* !RC_INVOKED */

#endif /* _FLOAT_H */
