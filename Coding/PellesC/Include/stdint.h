#ifndef _STDINT_H
#define _STDINT_H

/* stdint.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 1100
#error <stdint.h> need POCC version 11.0 or higher
#endif /* __POCC__ < 1100 */

#pragma once

/* exact-width integer types */
typedef signed char int8_t;
typedef signed short int16_t;
typedef signed int int32_t;
typedef signed long long int64_t;
typedef unsigned char uint8_t;
typedef unsigned short uint16_t;
typedef unsigned int uint32_t;
typedef unsigned long long uint64_t;

/* minimum-width integer types */
typedef signed char int_least8_t;
typedef signed short int_least16_t;
typedef signed int int_least32_t;
typedef signed long long int_least64_t;
typedef unsigned char uint_least8_t;
typedef unsigned short uint_least16_t;
typedef unsigned int uint_least32_t;
typedef unsigned long long uint_least64_t;

/* fastest minimum-width integer types */
typedef signed char int_fast8_t;
typedef signed int int_fast16_t;
typedef signed int int_fast32_t;
typedef signed long long int_fast64_t;
typedef unsigned char uint_fast8_t;
typedef unsigned int uint_fast16_t;
typedef unsigned int uint_fast32_t;
typedef unsigned long long uint_fast64_t;

/* integer types capable of holding object pointers */
#ifndef _INTPTR_T_DEFINED
#define _INTPTR_T_DEFINED
typedef __INTPTR_TYPE__ intptr_t;
#endif /* _INTPTR_T_DEFINED */

#ifndef _UINTPTR_T_DEFINED
#define _UINTPTR_T_DEFINED
typedef __UINTPTR_TYPE__ uintptr_t;
#endif /* _UINTPTR_T_DEFINED */

/* greatest-width integer types */
typedef signed long long intmax_t;
typedef unsigned long long uintmax_t;

/* limits of exact-width integer types */
#define INT8_MIN    (-INT8_MAX - 1)
#define INT16_MIN   (-INT16_MAX - 1)
#define INT32_MIN   (-INT32_MAX - 1)
#define INT64_MIN   (-INT64_MAX - 1)

#define INT8_MAX    0x7f
#define INT16_MAX   0x7fff
#define INT32_MAX   0x7fffffff
#define INT64_MAX   0x7fffffffffffffff

#define UINT8_MAX   0xff
#define UINT16_MAX  0xffff
#define UINT32_MAX  0xffffffff
#define UINT64_MAX  0xffffffffffffffff

/* limits of minimum-width integer types */
#define INT_LEAST8_MIN    INT8_MIN
#define INT_LEAST16_MIN   INT16_MIN
#define INT_LEAST32_MIN   INT32_MIN
#define INT_LEAST64_MIN   INT64_MIN

#define INT_LEAST8_MAX    INT8_MAX
#define INT_LEAST16_MAX   INT16_MAX
#define INT_LEAST32_MAX   INT32_MAX
#define INT_LEAST64_MAX   INT64_MAX

#define UINT_LEAST8_MAX   UINT8_MAX
#define UINT_LEAST16_MAX  UINT16_MAX
#define UINT_LEAST32_MAX  UINT32_MAX
#define UINT_LEAST64_MAX  UINT64_MAX

/* limits of fastest minimum-width integer types */
#define INT_FAST8_MIN    INT8_MIN
#define INT_FAST16_MIN   INT32_MIN
#define INT_FAST32_MIN   INT32_MIN
#define INT_FAST64_MIN   INT64_MIN

#define INT_FAST8_MAX    INT8_MAX
#define INT_FAST16_MAX   INT32_MAX
#define INT_FAST32_MAX   INT32_MAX
#define INT_FAST64_MAX   INT64_MAX

#define UINT_FAST8_MAX   UINT8_MAX
#define UINT_FAST16_MAX  UINT32_MAX
#define UINT_FAST32_MAX  UINT32_MAX
#define UINT_FAST64_MAX  UINT64_MAX

/* limits of integer types capable of holding object pointers */
#define INTPTR_MIN  (-__INTPTR_MAX__ - 1)
#define INTPTR_MAX  __INTPTR_MAX__
#define UINTPTR_MAX  __UINTPTR_MAX__

/* limits of greatest-width integer types */
#define INTMAX_MIN   INT64_MIN
#define INTMAX_MAX   INT64_MAX
#define UINTMAX_MAX  UINT64_MAX

/* limits of ptrdiff_t */
#define PTRDIFF_MIN  (-__PTRDIFF_MAX__ - 1)
#define PTRDIFF_MAX  __PTRDIFF_MAX__

/* limits of sig_atomic_t */
#define SIG_ATOMIC_MIN  __SIG_ATOMIC_MIN__
#define SIG_ATOMIC_MAX  __SIG_ATOMIC_MAX__

/* limit of size_t */
#define SIZE_MAX  __SIZE_MAX__

/* limits of wchar_t */
#define WCHAR_MIN  __WCHAR_MIN__
#define WCHAR_MAX  __WCHAR_MAX__

/* limits of wint_t */
#define WINT_MIN  __WINT_MIN__
#define WINT_MAX  __WINT_MAX__

#if __POCC_STDC_VERSION__ > 201710L

/* widths of exact-width integer types */
#define INT8_WIDTH   UINT8_WIDTH
#define INT16_WIDTH  UINT16_WIDTH
#define INT32_WIDTH  UINT32_WIDTH
#define INT64_WIDTH  UINT64_WIDTH

#define UINT8_WIDTH  8
#define UINT16_WIDTH  16
#define UINT32_WIDTH  32
#define UINT64_WIDTH  64

/* widths of minimum-width integer types */
#define INT_LEAST8_WIDTH   INT8_WIDTH
#define INT_LEAST16_WIDTH  INT16_WIDTH
#define INT_LEAST32_WIDTH  INT32_WIDTH
#define INT_LEAST64_WIDTH  INT64_WIDTH

#define UINT_LEAST8_WIDTH   UINT8_WIDTH
#define UINT_LEAST16_WIDTH  UINT16_WIDTH
#define UINT_LEAST32_WIDTH  UINT32_WIDTH
#define UINT_LEAST64_WIDTH  UINT64_WIDTH

/* widths of fastest minimum-width integer types */
#define INT_FAST8_WIDTH   INT8_WIDTH
#define INT_FAST16_WIDTH  INT32_WIDTH
#define INT_FAST32_WIDTH  INT32_WIDTH
#define INT_FAST64_WIDTH  INT64_WIDTH

#define UINT_FAST8_WIDTH   UINT8_WIDTH
#define UINT_FAST16_WIDTH  UINT32_WIDTH
#define UINT_FAST32_WIDTH  UINT32_WIDTH
#define UINT_FAST64_WIDTH  UINT64_WIDTH

/* widths of integer types capable of holding object pointers */
#define INTPTR_WIDTH  __INTPTR_WIDTH__
#define UINTPTR_WIDTH  __UINTPTR_WIDTH__

/* width of greatest-width integer types */
#define INTMAX_WIDTH   64
#define UINTMAX_WIDTH  64

/* width of ptrdiff_t */
#define PTRDIFF_WIDTH  __PTRDIFF_WIDTH__

/* width of sig_atomic_t */
#define SIG_ATOMIC_WIDTH  __SIG_ATOMIC_WIDTH__

/* width of size_t */
#define SIZE_WIDTH  __SIZE_WIDTH__

/* width of wchar_t */
#define WCHAR_WIDTH  __WCHAR_WIDTH__

/* width of wint_t */
#define WINT_WIDTH  __WINT_WIDTH__

#endif /* __POCC_STDC_VERSION__ > 201710L */

/* macros for minimum-width integer constants */
#define INT8_C    __INT8_C
#define INT16_C   __INT16_C
#define INT32_C   __INT32_C
#define INT64_C   __INT64_C
#define UINT8_C   __UINT8_C
#define UINT16_C  __UINT16_C
#define UINT32_C  __UINT32_C
#define UINT64_C  __UINT64_C

/* macros for greatest-width integer constants */
#define INTMAX_C   __INTMAX_C
#define UINTMAX_C  __UINTMAX_C

/* bounds-checking interfaces (TR24731-1, C11 annex K) */
#if __STDC_WANT_LIB_EXT1__
#define RSIZE_MAX  __SSIZE_MAX__
#endif /* __STDC_WANT_LIB_EXT1__ */

#endif /* !RC_INVOKED */

#endif /* _STDINT_H */
