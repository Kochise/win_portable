#ifndef _TGMATH_H
#define _TGMATH_H

/* tgmath.h - standard header */

#if __POCC__ < 1100
#error <tgmath.h> need POCC version 11.0 or higher
#endif /* __POCC__ < 1100 */

#pragma once

#include <math.h>
/* #include <complex.h> */

#if __POCC_STDC_VERSION__ < 201112L
#define __TGMATH_REAL(x,f,d,ld) \
    __generic__(x, float:f, default:d, long double:ld)
#else /* __POCC_STDC_VERSION__ >= 201112L */
#define __TGMATH_REAL(x,f,d,ld) \
    _Generic(x, float:f, default:d, long double:ld)
#endif /* __POCC_STDC_VERSION__ >= 201112L */

#define __TGMATH_REAL_BINARY(x,y,f,d,ld) \
    __TGMATH_REAL(x, \
        __TGMATH_REAL(y,  f,  d, ld), \
        __TGMATH_REAL(y,  d,  d, ld), \
        __TGMATH_REAL(y, ld, ld, ld))

#define __TGMATH_REAL_TERNARY(x,y,z,f,d,ld) \
    __TGMATH_REAL(x, \
        __TGMATH_REAL(y, \
            __TGMATH_REAL(z,  f,  d, ld), \
            __TGMATH_REAL(z,  d,  d, ld), \
            __TGMATH_REAL(z, ld, ld, ld)), \
        __TGMATH_REAL(y, \
            __TGMATH_REAL(z,  d,  d, ld), \
            __TGMATH_REAL(z,  d,  d, ld), \
            __TGMATH_REAL(z, ld, ld, ld)), \
        __TGMATH_REAL(y, \
            __TGMATH_REAL(z, ld, ld, ld), \
            __TGMATH_REAL(z, ld, ld, ld), \
            __TGMATH_REAL(z, ld, ld, ld)))

#define __TGMATH_UNARY_REAL(x,fn)  __TGMATH_REAL(x,fn##f,fn,fn##l)(x)
#define __TGMATH_BINARY_FIRST_REAL(x,y,fn)  __TGMATH_REAL(x,fn##f,fn,fn##l)(x,y)
#define __TGMATH_BINARY_REAL(x,y,fn)  __TGMATH_REAL_BINARY(x,y,fn##f,fn,fn##l)(x,y)
#define __TGMATH_TERNARY_FIRST_SECOND_REAL(x,y,z,fn)  __TGMATH_REAL_BINARY(x,y,fn##f,fn,fn##l)(x,y,z)
#define __TGMATH_TERNARY_REAL(x,y,z,fn)  __TGMATH_REAL_TERNARY(x,y,z,fn##f,fn,fn##l)(x,y,z)

/* trigonometric functions */
#undef acos
#define acos(x)  __TGMATH_UNARY_REAL(x,acos)
#undef asin
#define asin(x)  __TGMATH_UNARY_REAL(x,asin)
#undef atan
#define atan(x)  __TGMATH_UNARY_REAL(x,atan)
#undef atan2
#define atan2(x,y)  __TGMATH_BINARY_REAL(x,y,atan2)
#undef cos
#define cos(x)  __TGMATH_UNARY_REAL(x,cos)
#undef sin
#define sin(x)  __TGMATH_UNARY_REAL(x,sin)
#undef tan
#define tan(x)  __TGMATH_UNARY_REAL(x,tan)

/* hyperbolic functions */
#undef acosh
#define acosh(x)  __TGMATH_UNARY_REAL(x,acosh)
#undef asinh
#define asinh(x)  __TGMATH_UNARY_REAL(x,asinh)
#undef atanh
#define atanh(x)  __TGMATH_UNARY_REAL(x,atanh)
#undef cosh
#define cosh(x)  __TGMATH_UNARY_REAL(x,cosh)
#undef sinh
#define sinh(x)  __TGMATH_UNARY_REAL(x,sinh)
#undef tanh
#define tanh(x)  __TGMATH_UNARY_REAL(x,tanh)

/* exponential and logarithmic functions */
#undef exp
#define exp(x)  __TGMATH_UNARY_REAL(x,exp)
#undef exp2
#define exp2(x)  __TGMATH_UNARY_REAL(x,exp2)
#undef expm1
#define expm1(x)  __TGMATH_UNARY_REAL(x,expm1)
#undef frexp
#define frexp(x,y)  __TGMATH_BINARY_FIRST_REAL(x,y,frexp)
#undef ldexp
#define ldexp(x,y)  __TGMATH_BINARY_FIRST_REAL(x,y,ldexp)
#undef log
#define log(x)  __TGMATH_UNARY_REAL(x,log)
#undef log10
#define log10(x)  __TGMATH_UNARY_REAL(x,log10)
#undef log1p
#define log1p(x)  __TGMATH_UNARY_REAL(x,log1p)
#undef logb
#define logb(x)  __TGMATH_UNARY_REAL(x,logb)
#undef log2
#define log2(x)  __TGMATH_UNARY_REAL(x,log2)

/* power functions */
#undef pow
#define pow(x,y)  __TGMATH_BINARY_REAL(x,y,pow)
#undef sqrt
#define sqrt(x)  __TGMATH_UNARY_REAL(x,sqrt)
#undef hypot
#define hypot(x,y)  __TGMATH_BINARY_REAL(x,y,hypot)
#undef cbrt
#define cbrt(x)  __TGMATH_UNARY_REAL(x,cbrt)

/* nearest integer, absolute value, and remainder functions */
#undef ceil
#define ceil(x)  __TGMATH_UNARY_REAL(x,ceil)
#undef fabs
#define fabs(x)  __TGMATH_UNARY_REAL(x,fabs)
#undef floor
#define floor(x)  __TGMATH_UNARY_REAL(x,floor)
#undef fmod
#define fmod(x,y)  __TGMATH_BINARY_REAL(x,y,fmod)
#undef nearbyint
#define nearbyint(x)  __TGMATH_UNARY_REAL(x,nearbyint)
#undef round
#define round(x)  __TGMATH_UNARY_REAL(x,round)
#undef trunc
#define trunc(x)  __TGMATH_UNARY_REAL(x,trunc)
#undef remquo
#define remquo(x,y,z)  __TGMATH_TERNARY_FIRST_SECOND_REAL(x,y,z,remquo)
#undef lrint
#define lrint(x)  __TGMATH_UNARY_REAL(x,lrint)
#undef llrint
#define llrint(x)  __TGMATH_UNARY_REAL(x,llrint)
#undef lround
#define lround(x)  __TGMATH_UNARY_REAL(x,lround)
#undef llround
#define llround(x)  __TGMATH_UNARY_REAL(x,llround)
#undef copysign
#define copysign(x,y)  __TGMATH_BINARY_REAL(x,y,copysign)
#undef erf
#define erf(x)  __TGMATH_UNARY_REAL(x,erf)
#undef erfc
#define erfc(x)  __TGMATH_UNARY_REAL(x,erfc)
#undef lgamma
#define lgamma(x)  __TGMATH_UNARY_REAL(x,lgamma)
#undef tgamma
#define tgamma(x)  __TGMATH_UNARY_REAL(x,tgamma)
#undef rint
#define rint(x)  __TGMATH_UNARY_REAL(x,rint)
#undef nextafter
#define nextafter(x,y)  __TGMATH_BINARY_REAL(x,y,nextafter)
#undef nexttoward
#define nexttoward(x,y)  __TGMATH_BINARY_FIRST_REAL(x,y,nexttoward)
#undef remainder
#define remainder(x,y)  __TGMATH_BINARY_REAL(x,y,remainder)
#undef scalbn
#define scalbn(x,y)  __TGMATH_BINARY_FIRST_REAL(x,y,scalbn)
#undef scalbln
#define scalbln(x,y)  __TGMATH_BINARY_FIRST_REAL(x,y,scalbln)
#undef ilogb
#define ilogb(x)  __TGMATH_UNARY_REAL(x,ilogb)
#undef fdim
#define fdim(x,y)  __TGMATH_BINARY_REAL(x,y,fdim)
#undef fmax
#define fmax(x,y)  __TGMATH_BINARY_REAL(x,y,fmax)
#undef fmin
#define fmin(x,y)  __TGMATH_BINARY_REAL(x,y,fmin)
#undef fma
#define fma(x,y,z)  __TGMATH_TERNARY_REAL(x,y,z,fma)

#endif /* _TGMATH_H */
