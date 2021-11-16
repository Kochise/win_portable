#ifndef _LIMITS_H
#define _LIMITS_H

/* limits.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 1100
#error <limits.h> need POCC version 11.0 or higher
#endif /* __POCC__ < 1100 */

#pragma once

#define MB_LEN_MAX  8                       /* maximum number of bytes in multibyte char */

#if __POCC_STDC_VERSION__ > 201710L
#define BOOL_MAX      1                     /* maximum _Bool value */
#endif /* __POCC_STDC_VERSION__ > 201710L */
#define CHAR_BIT    __CHAR_BIT__            /* number of bits in a char */
#define CHAR_MIN    __CHAR_MIN__            /* minimum char value */
#define CHAR_MAX    __CHAR_MAX__            /* maximum char value */
#define SCHAR_MIN   __SCHAR_MIN__           /* minimum signed char value */
#define SCHAR_MAX   __SCHAR_MAX__           /* maximum signed char value */
#define UCHAR_MAX   __UCHAR_MAX__           /* maximum unsigned char value */
#define SHRT_MIN    __SHRT_MIN__            /* minimum signed short value */
#define SHRT_MAX    __SHRT_MAX__            /* maximum signed short value */
#define USHRT_MAX   __USHRT_MAX__           /* maximum unsigned short value */
#define INT_MIN     __INT_MIN__             /* minimum signed int value */
#define INT_MAX     __INT_MAX__             /* maximum signed int value */
#define UINT_MAX    __UINT_MAX__            /* maximum unsigned int value */
#define LONG_MIN    __LONG_MIN__            /* minimum signed long value */
#define LONG_MAX    __LONG_MAX__            /* maximum signed long value */
#define ULONG_MAX   __ULONG_MAX__           /* maximum unsigned long value */
#define LLONG_MIN   __LLONG_MIN__           /* minimum signed long long value */
#define LLONG_MAX   __LLONG_MAX__           /* maximum signed long long value */
#define ULLONG_MAX  __ULLONG_MAX__          /* maximum unsigned long long value */

#ifdef _MSC_EXTENSIONS
#define _I64_MIN    __LLONG_MIN__           /* minimum signed 64 bit value */
#define _I64_MAX    __LLONG_MAX__           /* maximum signed 64 bit value */
#define _UI64_MAX   __ULLONG_MAX__          /* maximum unsigned 64 bit value */
#endif /* _MSC_EXTENSIONS */

#define _SSIZE_MAX  __SSIZE_MAX__
#ifdef __POCC__OLDNAMES
#define SSIZE_MAX  __SSIZE_MAX__
#endif /* __POCC__OLDNAMES */

#if __POCC_STDC_VERSION__ > 201710L
#define BOOL_WIDTH    __BOOL_WIDTH__        /* width for an object of type _Bool */
#define CHAR_WIDTH    __CHAR_BIT__          /* width for an object of type char */
#define SCHAR_WIDTH   __CHAR_BIT__          /* width for an object of type signed char */
#define UCHAR_WIDTH   __CHAR_BIT__          /* width for an object of type unsigned char */
#define USHRT_WIDTH   __USHRT_WIDTH__       /* width for an object of type unsigned short int */
#define SHRT_WIDTH    __USHRT_WIDTH__       /* width for an object of type short int */
#define UINT_WIDTH    __UINT_WIDTH__        /* width for an object of type unsigned int */
#define INT_WIDTH     __UINT_WIDTH__        /* width for an object of type int */
#define ULONG_WIDTH   __ULONG_WIDTH__       /* width for an object of type unsigned long int */
#define LONG_WIDTH    __ULONG_WIDTH__       /* width for an object of type long int */
#define ULLONG_WIDTH  __ULLONG_WIDTH__      /* width for an object of type unsigned long long int */
#define LLONG_WIDTH   __ULLONG_WIDTH__      /* width for an object of type long long int */
#endif /* __POCC_STDC_VERSION__ > 201710L */

#endif /* !RC_INVOKED */

#endif /* _LIMITS_H */
