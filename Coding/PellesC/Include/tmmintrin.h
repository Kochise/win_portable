#ifndef _TMMINTRIN_H
#define _TMMINTRIN_H

/* tmmintrin.h - private header for SSSE3 intrinsics */

#if __POCC__ >= 500
#pragma once
#endif

#include <pmmintrin.h>

#if __POCC__ >= 650 && __POCC_TARGET__ == 3

extern __m128i __cdecl _mm_hadd_epi16(__m128i, __m128i);  /* phaddw */
extern __m128i __cdecl _mm_hadd_epi32(__m128i, __m128i);  /* phaddd */
extern __m128i __cdecl _mm_hadds_epi16(__m128i, __m128i);  /* phaddsw */

extern __m128i __cdecl _mm_hsub_epi16(__m128i, __m128i);  /* phsubw */
extern __m128i __cdecl _mm_hsub_epi32(__m128i, __m128i);  /* phsubd */
extern __m128i __cdecl _mm_hsubs_epi16(__m128i, __m128i);  /* phsubsw */

extern __m128i __cdecl _mm_maddubs_epi16(__m128i, __m128i);  /* pmaddubsw */
extern __m128i __cdecl _mm_mulhrs_epi16(__m128i, __m128i);  /* pmulhrsw */
extern __m128i __cdecl _mm_shuffle_epi8(__m128i, __m128i);  /* pshufb */

extern __m128i __cdecl _mm_sign_epi8(__m128i, __m128i);  /* psignb */
extern __m128i __cdecl _mm_sign_epi16(__m128i, __m128i);  /* psignw */
extern __m128i __cdecl _mm_sign_epi32(__m128i, __m128i);  /* psignd */

extern __m128i __cdecl _mm_alignr_epi8(__m128i, __m128i, const int);  /* palignr */

extern __m128i __cdecl _mm_abs_epi8(__m128i);  /* pabsb */
extern __m128i __cdecl _mm_abs_epi16(__m128i);  /* pabsw */
extern __m128i __cdecl _mm_abs_epi32(__m128i);  /* pabsd */

/* __m64 __cdecl _mm_hadd_pi16(__m64, __m64); */
/* __m64 __cdecl _mm_hadd_pi32(__m64, __m64); */
/* __m64 __cdecl _mm_hadds_pi16(__m64, __m64); */

/* __m64 __cdecl _mm_hsub_pi16(__m64, __m64); */
/* __m64 __cdecl _mm_hsub_pi32(__m64, __m64); */
/* __m64 __cdecl _mm_hsubs_pi16(__m64, __m64); */

/* __m64 __cdecl _mm_maddubs_pi16(__m64, __m64); */
/* __m64 __cdecl _mm_mulhrs_pi16(__m64, __m64); */
/* __m64 __cdecl _mm_shuffle_pi8(__m64, __m64); */

/* __m64 __cdecl _mm_sign_pi8(__m64, __m64); */
/* __m64 __cdecl _mm_sign_pi16(__m64, __m64); */
/* __m64 __cdecl _mm_sign_pi32(__m64, __m64); */

/* __m64 __cdecl _mm_alignr_pi8(__m64, __m64, int); */

/* __m64 __cdecl _mm_abs_pi8(__m64); */
/* __m64 __cdecl _mm_abs_pi16(__m64); */
/* __m64 __cdecl _mm_abs_pi32(__m64); */

#endif /* __POCC__ >= 650 && __POCC_TARGET__ == 3 */

#endif /* _TMMINTRIN_H */
