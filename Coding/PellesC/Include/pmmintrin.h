#ifndef _PMMINTRIN_H
#define _PMMINTRIN_H

/* pmmintrin.h - private header for SSE3 intrinsics */

#if __POCC__ >= 500
#pragma once
#endif

#include <emmintrin.h>

/* constants for _mm_getcsr(), _mm_setcsr() */
/* denormals are zeros (bit 6) */
#define _MM_DENORMALS_ZERO_MASK  0x0040
#define _MM_DENORMALS_ZERO_ON    0x0040
#define _MM_DENORMALS_ZERO_OFF   0x0000

#define _MM_SET_DENORMALS_ZERO_MODE(mode)  _mm_setcsr((_mm_getcsr() & ~_MM_DENORMALS_ZERO_MASK) | (mode))
#define _MM_GET_DENORMALS_ZERO_MODE()     (_mm_getcsr() & _MM_DENORMALS_ZERO_MASK)

#if __POCC__ >= 650 && (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3)

#if __POCC_TARGET__ == 3

/* single-precision vector */
extern __m128 __cdecl _mm_addsub_ps(__m128, __m128);  /* addsubps */
extern __m128 __cdecl _mm_hadd_ps(__m128, __m128);  /* haddps */
extern __m128 __cdecl _mm_hsub_ps(__m128, __m128);  /* hsubps */
extern __m128 __cdecl _mm_movehdup_ps(__m128);  /* movshdup */
extern __m128 __cdecl _mm_moveldup_ps(__m128);  /* movsldup */

/* double-precision vector */
extern __m128d __cdecl _mm_addsub_pd(__m128d, __m128d);  /* addsubpd */
extern __m128d __cdecl _mm_hadd_pd(__m128d, __m128d);  /* haddpd */
extern __m128d __cdecl _mm_hsub_pd(__m128d, __m128d);  /* hsubpd */
extern __m128d __cdecl _mm_loaddup_pd(const double *);  /* movddup */
extern __m128d __cdecl _mm_movedup_pd(__m128d);  /* movddup */

/* unaligned integer vector load */
extern __m128i __cdecl _mm_lddqu_si128(const __m128i *);  /* lddqu */

#endif /* __POCC_TARGET__ == 3 */

/* misc */
extern void __cdecl _mm_monitor(const void *, unsigned, unsigned);  /* monitor */
extern void __cdecl _mm_mwait(unsigned, unsigned);  /* mwait */

#endif /* __POCC__ >= 650 && (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3) */

#endif /* _PMMINTRIN_H */
