#ifndef _SMMINTRIN_H
#define _SMMINTRIN_H

/* smmintrin.h - private header for SSE4.1 intrinsics */

#if __POCC__ >= 500
#pragma once
#endif

#include <tmmintrin.h>

#if __POCC__ >= 650 && __POCC_TARGET__ == 3

#define _MM_MK_INSERTPS_NDX(src,dst,mask)  (((src)<<6)|((dst)<<4)|(mask))
#define _MM_EXTRACT_FLOAT(dst,src,ndx)  *((int *)&(dst)) = _mm_extract_ps((src), (ndx))
#define _MM_PICK_OUT_PS(src,num)  _mm_insert_ps(_mm_setzero_ps(), (src), _MM_MK_INSERTPS_NDX((num),0,0x0E))

#define _MM_FROUND_TO_NEAREST_INT  0x00
#define _MM_FROUND_TO_NEG_INF      0x01
#define _MM_FROUND_TO_POS_INF      0x02
#define _MM_FROUND_TO_ZERO         0x03
#define _MM_FROUND_CUR_DIRECTION   0x04

#define _MM_FROUND_RAISE_EXC       0x00
#define _MM_FROUND_NO_EXC          0x08

#define _MM_FROUND_NINT       (_MM_FROUND_TO_NEAREST_INT|_MM_FROUND_RAISE_EXC)
#define _MM_FROUND_FLOOR      (_MM_FROUND_TO_NEG_INF|_MM_FROUND_RAISE_EXC)
#define _MM_FROUND_CEIL       (_MM_FROUND_TO_POS_INF|_MM_FROUND_RAISE_EXC)
#define _MM_FROUND_TRUNC      (_MM_FROUND_TO_ZERO|_MM_FROUND_RAISE_EXC)
#define _MM_FROUND_RINT       (_MM_FROUND_CUR_DIRECTION|_MM_FROUND_RAISE_EXC)
#define _MM_FROUND_NEARBYINT  (_MM_FROUND_CUR_DIRECTION|_MM_FROUND_NO_EXC)

#define _mm_ceil_ps(x)  _mm_round_ps((x), _MM_FROUND_CEIL)
#define _mm_ceil_pd(x)  _mm_round_pd((x), _MM_FROUND_CEIL)

#define _mm_floor_ps(x)  _mm_round_ps((x), _MM_FROUND_FLOOR)
#define _mm_floor_pd(x)  _mm_round_pd((x), _MM_FROUND_FLOOR)

#define _mm_ceil_ss(dst,x)   _mm_round_ss((dst), (x), _MM_FROUND_CEIL)
#define _mm_ceil_sd(dst,x)   _mm_round_sd((dst), (x), _MM_FROUND_CEIL)

#define _mm_floor_ss(dst,x)  _mm_round_ss((dst), (x), _MM_FROUND_FLOOR)
#define _mm_floor_sd(dst,x)  _mm_round_sd((dst), (x), _MM_FROUND_FLOOR)

/* integer bitwise comparision */
#define _mm_test_all_zeros(x,y)  _mm_testz_si128((x),(y))
#define _mm_test_all_ones(x)  _mm_testc_si128((x),_mm_cmpeq_epi32((x),(x)))
#define _mm_test_mix_ones_zeros(x,y)  _mm_testnzc_si128((x),(y))

/* blending */
extern __m128 __cdecl _mm_blend_ps(__m128, __m128, const int);  /* blendps */
extern __m128 __cdecl _mm_blendv_ps(__m128, __m128, __m128);  /* blendvps */
extern __m128d __cdecl _mm_blend_pd(__m128d, __m128d, const int);  /* blendpd */
extern __m128d __cdecl _mm_blendv_pd(__m128d, __m128d, __m128d);  /* blendvpd */
extern __m128i __cdecl _mm_blend_epi16(__m128i, __m128i, const int);  /* pblendw */
extern __m128i __cdecl _mm_blendv_epi8(__m128i, __m128i, __m128i);  /* pblendvb */

/* dot product */
extern __m128 __cdecl _mm_dp_ps(__m128, __m128, const int);  /* dpps */
extern __m128d __cdecl _mm_dp_pd(__m128d, __m128d, const int);  /* dppd */

/* integer comparison */
extern __m128i __cdecl _mm_cmpeq_epi64(__m128i, __m128i);  /* pcmpeqq */

/* integer min/max */
extern __m128i __cdecl _mm_min_epi8(__m128i, __m128i);  /* pminsb */
extern __m128i __cdecl _mm_max_epi8(__m128i, __m128i);  /* pmaxsb */
extern __m128i __cdecl _mm_min_epu16(__m128i, __m128i);  /* pminuw */
extern __m128i __cdecl _mm_max_epu16(__m128i, __m128i);  /* pmaxuw */
extern __m128i __cdecl _mm_min_epi32(__m128i, __m128i);  /* pminsd */
extern __m128i __cdecl _mm_max_epi32(__m128i, __m128i);  /* pmaxsd */
extern __m128i __cdecl _mm_min_epu32(__m128i, __m128i);  /* pminud */
extern __m128i __cdecl _mm_max_epu32(__m128i, __m128i);  /* pmaxud */

/* integer multiplication */
extern __m128i __cdecl _mm_mullo_epi32(__m128i, __m128i);  /* pmulld */
extern __m128i __cdecl _mm_mul_epi32(__m128i, __m128i);  /* pmuldq */

/* integer bitwise comparison */
extern int __cdecl _mm_testz_si128(__m128i, __m128i);  /* ptest */
extern int __cdecl _mm_testc_si128(__m128i, __m128i);  /* ptest */
extern int __cdecl _mm_testnzc_si128(__m128i, __m128i);  /* ptest */

/* insert/extract */
extern __m128 __cdecl _mm_insert_ps(__m128, __m128, const int);  /* insertps */
extern int __cdecl _mm_extract_ps(__m128, const int);  /* extractps */
extern __m128i __cdecl _mm_insert_epi8(__m128i, int, const int);  /* pinsrb */
extern __m128i __cdecl _mm_insert_epi32(__m128i, int, const int);  /* pinsrd */
extern int __cdecl _mm_extract_epi8(__m128i, const int);  /* pextrb */
extern int __cdecl _mm_extract_epi32(__m128i, const int);  /* pextrd */

/* 64-bit only */
#if __POCC_TARGET__ == 3
extern __m128i __cdecl _mm_insert_epi64(__m128i, __int64, const int);  /* pinsrq */
extern __int64 __cdecl _mm_extract_epi64(__m128i, const int);  /* pextrq */
#endif /* __POCC_TARGET__ == 3 */

/* rounding */
extern __m128d __cdecl _mm_round_pd(__m128d, const int);  /* roundpd */
extern __m128d __cdecl _mm_round_sd(__m128d, __m128d, const int);  /* roundsd */
extern __m128 __cdecl _mm_round_ps(__m128, const int);  /* roundps */
extern __m128 __cdecl _mm_round_ss(__m128, __m128, const int);  /* roundss */

/* sign-extension */
extern __m128i __cdecl _mm_cvtepi8_epi16(__m128i);  /* pmovsxbw */
extern __m128i __cdecl _mm_cvtepi8_epi32(__m128i);  /* pmovsxbd */
extern __m128i __cdecl _mm_cvtepi8_epi64(__m128i);  /* pmovsxbq */
extern __m128i __cdecl _mm_cvtepi16_epi32(__m128i);  /* pmovsxwd */
extern __m128i __cdecl _mm_cvtepi16_epi64(__m128i);  /* pmovsxwq */
extern __m128i __cdecl _mm_cvtepi32_epi64(__m128i);  /* pmovsxdq */

/* zero-extension */
extern __m128i __cdecl _mm_cvtepu8_epi16(__m128i);  /* pmovzxbw */
extern __m128i __cdecl _mm_cvtepu8_epi32(__m128i);  /* pmovzxbd */
extern __m128i __cdecl _mm_cvtepu8_epi64(__m128i);  /* pmovzxbq */
extern __m128i __cdecl _mm_cvtepu16_epi32(__m128i);  /* pmovzxwd */
extern __m128i __cdecl _mm_cvtepu16_epi64(__m128i);  /* pmovzxwq */
extern __m128i __cdecl _mm_cvtepu32_epi64(__m128i);  /* pmovzxdq */

/* misc */
extern __m128i __cdecl _mm_minpos_epu16(__m128i);  /* phminposuw */
extern __m128i __cdecl _mm_packus_epi32(__m128i, __m128i);  /* packusdw */
extern __m128i __cdecl _mm_mpsadbw_epu8(__m128i, __m128i, const int);  /* mpsadbw */
extern __m128i __cdecl _mm_stream_load_si128(__m128i *);  /* movntdqa */

#endif /* __POCC__ >= 650 && __POCC_TARGET__ == 3 */

#endif /* _SMMINTRIN_H */
