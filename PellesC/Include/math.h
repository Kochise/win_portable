#ifndef _MATH_H
#define _MATH_H

/* math.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 1100
#error <math.h> need POCC version 11.0 or higher
#endif /* __POCC__ < 1100 */

#pragma once

#include <crtdef.h>

#if __POCC_STDC_VERSION__ > 201710L
#define  __STDC_VERSION_MATH_H__  000000L  /* TODO */
#endif /* __POCC_STDC_VERSION__ > 201710L */

/* macros */
#define HUGE_VAL   ((double)__INFINITY__)
#define HUGE_VALF  __INFINITY__
#define HUGE_VALL  ((long double)__INFINITY__)
#define INFINITY   __INFINITY__
#define NAN        __NAN__

#define FP_INFINITE   1
#define FP_NAN        2
#define FP_NORMAL     (-1)
#define FP_SUBNORMAL  (-2)
#define FP_ZERO       0

#define FP_ILOGB0    (-0x7fffffff - 1)
#define FP_ILOGBNAN  0x7fffffff

#define MATH_ERRNO        1
#define MATH_ERREXCEPT    2
#define math_errhandling  (MATH_ERRNO|MATH_ERREXCEPT)

#define _FP_LT  1
#define _FP_EQ  2
#define _FP_GT  4

/* non-standard common math constants */
#ifdef _USE_MATH_DEFINES
#ifndef _MATH_DEFINES_DEFINED
#define _MATH_DEFINES_DEFINED
#define M_E         2.7182818284590452354   /* e */
#define M_LOG2E     1.4426950408889634074   /* log2(e) */
#define M_LOG10E    0.43429448190325182765  /* log10(e) */
#define M_LN2       0.69314718055994530942  /* log(2) */
#define M_LN10      2.30258509299404568402  /* log(10) */
#define M_PI        3.14159265358979323846  /* pi */
#define M_PI_2      1.57079632679489661923  /* pi/2 */
#define M_PI_4      0.78539816339744830962  /* pi/4 */
#define M_1_PI      0.31830988618379067154  /* 1/pi */
#define M_2_PI      0.63661977236758134308  /* 2/pi */
#define M_2_SQRTPI  1.12837916709551257390  /* 2/sqrt(pi) */
#define M_SQRT2     1.41421356237309504880  /* sqrt(2) */
#define M_SQRT1_2   0.70710678118654752440  /* 1/sqrt(2) */
#endif /* _MATH_DEFINES_DEFINED */
#endif /* _USE_MATH_DEFINES */

/* type definitions */
#if __POCC_FLTEVAL__ == 1
typedef double float_t;
typedef double double_t;
#elif __POCC_FLTEVAL__ == 2
typedef long double float_t;
typedef long double double_t;
#else /* __POCC_FLTEVAL__ <= 0 */
typedef float float_t;
typedef double double_t;
#endif

/* helper functions */
extern _CRTIMP int __cdecl __fpclass(double);
extern _CRTIMP int __cdecl __fpclassf(float);
extern _CRTIMP int __cdecl __fpclassl(long double);
extern _CRTIMP int __cdecl __fpcomp(double, double);
extern _CRTIMP int __cdecl __fpcompf(float, float);
extern _CRTIMP int __cdecl __fpcompl(long double, long double);
extern _CRTIMP int __cdecl __fpsign(double);
extern _CRTIMP int __cdecl __fpsignf(float);
extern _CRTIMP int __cdecl __fpsignl(long double);

#define isfinite(x)  (fpclassify(x) <= 0)
#define isinf(x)     (fpclassify(x) == FP_INFINITE)
#define isnan(x)     (fpclassify(x) == FP_NAN)
#define isnormal(x)  (fpclassify(x) == FP_NORMAL)

#define isgreater(x,y)  ((_FPCOMP(x,y) & _FP_GT) != 0)
#define isgreaterequal(x,y)  ((_FPCOMP(x,y) & (_FP_EQ|_FP_GT)) != 0)
#define isless(x,y)  ((_FPCOMP(x,y) & _FP_LT) != 0)
#define islessequal(x,y)  ((_FPCOMP(x,y) & (_FP_LT|_FP_EQ)) != 0)
#define islessgreater(x,y)  ((_FPCOMP(x,y) & (_FP_LT|_FP_GT)) != 0)
#define isunordered(x,y)  (_FPCOMP(x,y) == 0)

#if __POCC_STDC_VERSION__ < 201112L
#define fpclassify(x)  __generic__(x, float:__fpclassf, default:__fpclass, long double:__fpclassl)(x)
#define signbit(x)     __generic__(x, float:__fpsignf, default:__fpsign, long double:__fpsignl)(x)
#define _FPCOMP(x,y)   __generic__(x, float:__generic__(y, float:__fpcompf, default:__fpcomp, long double:__fpcompl), default:__generic__(y, default:__fpcomp, long double:__fpcompl), long double:__fpcompl)(x,y)
#else /* __POCC_STDC_VERSION__ >= 201112L */
#define fpclassify(x)  _Generic(x, float:__fpclassf, default:__fpclass, long double:__fpclassl)(x)
#define signbit(x)     _Generic(x, float:__fpsignf, default:__fpsign, long double:__fpsignl)(x)
#define _FPCOMP(x,y)   _Generic(x, float:_Generic(y, float:__fpcompf, default:__fpcomp, long double:__fpcompl), default:_Generic(y, default:__fpcomp, long double:__fpcompl), long double:__fpcompl)(x,y)
#endif /* __POCC_STDC_VERSION__ >= 201112L */

/* double declarations */
extern _CRTIMP double __cdecl acos(double);
extern _CRTIMP double __cdecl acosh(double);
extern _CRTIMP double __cdecl asin(double);
extern _CRTIMP double __cdecl asinh(double);
extern _CRTIMP double __cdecl atan(double);
extern _CRTIMP double __cdecl atan2(double, double);
extern _CRTIMP double __cdecl atanh(double);
extern _CRTIMP double __cdecl cbrt(double);
extern _CRTIMP double __cdecl ceil(double);
extern _CRTIMP double __cdecl copysign(double, double);
extern _CRTIMP double __cdecl erf(double);
extern _CRTIMP double __cdecl erfc(double);
extern _CRTIMP double __cdecl exp(double);
extern _CRTIMP double __cdecl exp2(double);
extern _CRTIMP double __cdecl expm1(double);
extern _CRTIMP double __cdecl fabs(double);
extern _CRTIMP double __cdecl fdim(double, double);
extern _CRTIMP double __cdecl floor(double);
extern _CRTIMP double __cdecl fma(double, double, double);
extern _CRTIMP double __cdecl fmax(double, double);
extern _CRTIMP double __cdecl fmin(double, double);
extern _CRTIMP double __cdecl fmod(double, double);
extern _CRTIMP double __cdecl frexp(double, int *);
extern _CRTIMP double __cdecl hypot(double, double);
extern _CRTIMP int __cdecl ilogb(double);
extern _CRTIMP double __cdecl ldexp(double, int);
extern _CRTIMP double __cdecl lgamma(double);
extern _CRTIMP long long __cdecl llrint(double);
extern _CRTIMP long long __cdecl llround(double);
extern _CRTIMP double __cdecl log1p(double);
extern _CRTIMP double __cdecl logb(double);
extern _CRTIMP long __cdecl lrint(double);
extern _CRTIMP long __cdecl lround(double);
extern _CRTIMP double __cdecl modf(double, double *);
extern _CRTIMP double __cdecl nan(const char *);
extern _CRTIMP double __cdecl nearbyint(double);
extern _CRTIMP double __cdecl nextafter(double, double);
extern _CRTIMP double __cdecl nexttoward(double, long double);
extern _CRTIMP double __cdecl pow(double, double);
extern _CRTIMP double __cdecl remainder(double, double);
extern _CRTIMP double __cdecl remquo(double, double, int *);
extern _CRTIMP double __cdecl rint(double);
extern _CRTIMP double __cdecl round(double);
extern _CRTIMP double __cdecl scalbn(double, int);
extern _CRTIMP double __cdecl scalbln(double, long);
extern _CRTIMP double __cdecl sqrt(double);
extern _CRTIMP double __cdecl tan(double);
extern _CRTIMP double __cdecl tanh(double);
extern _CRTIMP double __cdecl tgamma(double);
extern _CRTIMP double __cdecl trunc(double);

/* float declarations */
extern _CRTIMP float __cdecl acosf(float);
extern _CRTIMP float __cdecl acoshf(float);
extern _CRTIMP float __cdecl asinf(float);
extern _CRTIMP float __cdecl asinhf(float);
extern _CRTIMP float __cdecl atanf(float);
extern _CRTIMP float __cdecl atanhf(float);
extern _CRTIMP float __cdecl atan2f(float, float);
extern _CRTIMP float __cdecl cbrtf(float);
extern _CRTIMP float __cdecl ceilf(float);
extern _CRTIMP float __cdecl copysignf(float, float);
extern _CRTIMP float __cdecl erff(float);
extern _CRTIMP float __cdecl erfcf(float);
extern _CRTIMP float __cdecl expf(float);
extern _CRTIMP float __cdecl exp2f(float);
extern _CRTIMP float __cdecl expm1f(float);
extern _CRTIMP float __cdecl fabsf(float);
extern _CRTIMP float __cdecl fdimf(float, float);
extern _CRTIMP float __cdecl floorf(float);
extern _CRTIMP float __cdecl fmaf(float, float, float);
extern _CRTIMP float __cdecl fmaxf(float, float);
extern _CRTIMP float __cdecl fminf(float, float);
extern _CRTIMP float __cdecl fmodf(float, float);
extern _CRTIMP float __cdecl frexpf(float, int *);
extern _CRTIMP float __cdecl hypotf(float, float);
extern _CRTIMP int __cdecl ilogbf(float);
extern _CRTIMP float __cdecl ldexpf(float, int);
extern _CRTIMP float __cdecl lgammaf(float);
extern _CRTIMP long long __cdecl llrintf(float);
extern _CRTIMP long long __cdecl llroundf(float);
extern _CRTIMP float __cdecl log1pf(float);
extern _CRTIMP float __cdecl logbf(float);
extern _CRTIMP long __cdecl lrintf(float);
extern _CRTIMP long __cdecl lroundf(float);
extern _CRTIMP float __cdecl modff(float, float *);
extern _CRTIMP float __cdecl nanf(const char *);
extern _CRTIMP float __cdecl nearbyintf(float);
extern _CRTIMP float __cdecl nextafterf(float, float);
extern _CRTIMP float __cdecl nexttowardf(float, long double);
extern _CRTIMP float __cdecl powf(float, float);
extern _CRTIMP float __cdecl remainderf(float, float);
extern _CRTIMP float __cdecl remquof(float, float, int *);
extern _CRTIMP float __cdecl rintf(float);
extern _CRTIMP float __cdecl roundf(float);
extern _CRTIMP float __cdecl scalbnf(float, int);
extern _CRTIMP float __cdecl scalblnf(float, long);
extern _CRTIMP float __cdecl sqrtf(float);
extern _CRTIMP float __cdecl tanf(float);
extern _CRTIMP float __cdecl tanhf(float);
extern _CRTIMP float __cdecl tgammaf(float);
extern _CRTIMP float __cdecl truncf(float);

/* long double declarations */
extern _CRTIMP long double __cdecl acosl(long double);
extern _CRTIMP long double __cdecl acoshl(long double);
extern _CRTIMP long double __cdecl asinl(long double);
extern _CRTIMP long double __cdecl asinhl(long double);
extern _CRTIMP long double __cdecl atanl(long double);
extern _CRTIMP long double __cdecl atanhl(long double);
extern _CRTIMP long double __cdecl atan2l(long double, long double);
extern _CRTIMP long double __cdecl cbrtl(long double);
extern _CRTIMP long double __cdecl ceill(long double);
extern _CRTIMP long double __cdecl copysignl(long double, long double);
extern _CRTIMP long double __cdecl erfl(long double);
extern _CRTIMP long double __cdecl erfcl(long double);
extern _CRTIMP long double __cdecl expl(long double);
extern _CRTIMP long double __cdecl exp2l(long double);
extern _CRTIMP long double __cdecl expm1l(long double);
extern _CRTIMP long double __cdecl fabsl(long double);
extern _CRTIMP long double __cdecl fdiml(long double, long double);
extern _CRTIMP long double __cdecl floorl(long double);
extern _CRTIMP long double __cdecl fmal(long double, long double, long double);
extern _CRTIMP long double __cdecl fmaxl(long double, long double);
extern _CRTIMP long double __cdecl fminl(long double, long double);
extern _CRTIMP long double __cdecl fmodl(long double, long double);
extern _CRTIMP long double __cdecl frexpl(long double, int *);
extern _CRTIMP long double __cdecl hypotl(long double, long double);
extern _CRTIMP int __cdecl ilogbl(long double);
extern _CRTIMP long double __cdecl ldexpl(long double, int);
extern _CRTIMP long double __cdecl lgammal(long double);
extern _CRTIMP long long __cdecl llrintl(long double);
extern _CRTIMP long long __cdecl llroundl(long double);
extern _CRTIMP long double __cdecl log1pl(long double);
extern _CRTIMP long double __cdecl logbl(long double);
extern _CRTIMP long __cdecl lrintl(long double);
extern _CRTIMP long __cdecl lroundl(long double);
extern _CRTIMP long double __cdecl modfl(long double, long double *);
extern _CRTIMP long double __cdecl nanl(const char *);
extern _CRTIMP long double __cdecl nearbyintl(long double);
extern _CRTIMP long double __cdecl nextafterl(long double, long double);
extern _CRTIMP long double __cdecl nexttowardl(long double, long double);
extern _CRTIMP long double __cdecl powl(long double, long double);
extern _CRTIMP long double __cdecl remainderl(long double, long double);
extern _CRTIMP long double __cdecl remquol(long double, long double, int *);
extern _CRTIMP long double __cdecl rintl(long double);
extern _CRTIMP long double __cdecl roundl(long double);
extern _CRTIMP long double __cdecl scalbnl(long double, int);
extern _CRTIMP long double __cdecl scalblnl(long double, long);
extern _CRTIMP long double __cdecl sqrtl(long double);
extern _CRTIMP long double __cdecl tanl(long double);
extern _CRTIMP long double __cdecl tanhl(long double);
extern _CRTIMP long double __cdecl tgammal(long double);
extern _CRTIMP long double __cdecl truncl(long double);

extern _CRTIMP double __cdecl cos(double);
extern _CRTIMP double __cdecl cosh(double);
extern _CRTIMP double __cdecl log(double);
extern _CRTIMP double __cdecl log10(double);
extern _CRTIMP double __cdecl log2(double);
extern _CRTIMP double __cdecl sin(double);
extern _CRTIMP double __cdecl sinh(double);

extern _CRTIMP float __cdecl cosf(float);
extern _CRTIMP float __cdecl coshf(float);
extern _CRTIMP float __cdecl logf(float);
extern _CRTIMP float __cdecl log10f(float);
extern _CRTIMP float __cdecl log2f(float);
extern _CRTIMP float __cdecl sinf(float);
extern _CRTIMP float __cdecl sinhf(float);

extern _CRTIMP long double __cdecl cosl(long double);
extern _CRTIMP long double __cdecl coshl(long double);
extern _CRTIMP long double __cdecl logl(long double);
extern _CRTIMP long double __cdecl log10l(long double);
extern _CRTIMP long double __cdecl log2l(long double);
extern _CRTIMP long double __cdecl sinl(long double);
extern _CRTIMP long double __cdecl sinhl(long double);

#ifdef _MSC_EXTENSIONS
/* values for _exception type */
#define _DOMAIN  1
#define _SING  2
#define _OVERFLOW  3
#define _UNDERFLOW  4
#define _TLOSS  5
#define _PLOSS  6

/* compatibility names */
#ifdef __POCC__OLDNAMES
#define DOMAIN  _DOMAIN
#define SING  _SING
#define OVERFLOW  _OVERFLOW
#define UNDERFLOW  _UNDERFLOW
#define TLOSS  _TLOSS
#define PLOSS  _PLOSS
#endif /* __POCC__OLDNAMES */

/* passed to _matherr() when a fp exception is detected */
struct _exception {
    int type;
    const char *name;
    double arg1;
    double arg2;
    double retval;
};

extern int __cdecl _matherr(struct _exception *);
#endif /* _MSC_EXTENSIONS */

#endif /* !RC_INVOKED */

#endif /* _MATH_H */
