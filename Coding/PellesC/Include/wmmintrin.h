#ifndef _WMMINTRIN_H
#define _WMMINTRIN_H

/* wmmintrin.h - private header for AES intrinsics */

#if __POCC__ >= 500
#pragma once
#endif

#include <nmmintrin.h>

#if __POCC__ >= 650 && __POCC_TARGET__ == 3

extern __m128i __cdecl _mm_aesdec_si128(__m128i, __m128i);  /* aesdec */
extern __m128i __cdecl _mm_aesdeclast_si128(__m128i, __m128i);  /* aesdeclast */
extern __m128i __cdecl _mm_aesenc_si128(__m128i, __m128i);  /* aesenc */
extern __m128i __cdecl _mm_aesenclast_si128(__m128i, __m128i);  /* aesenclast */
extern __m128i __cdecl _mm_aesimc_si128(__m128i);  /* aesimc */
extern __m128i __cdecl _mm_aeskeygenassist_si128(__m128i, const int);  /* aeskeygenassist */

extern __m128i __cdecl _mm_clmulepi64_si128(__m128i, __m128i, const int);  /* pclmulqdq */

#endif /* __POCC__ >= 650 && __POCC_TARGET__ == 3 */

#endif /* _WMMINTRIN_H */
