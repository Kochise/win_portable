#ifndef _EMMINTRIN_H
#define _EMMINTRIN_H

/* emmintrin.h - private header for SSE2 intrinsics */

#if __POCC__ >= 500
#pragma once
#endif

#include <xmmintrin.h>

#if __POCC__ >= 650 && (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3)

#define _MM_SHUFFLE2(x,y)  (((x)<<1)|(y))

/* #define _MM_EMPTY() */

typedef union __declspec(align(16)) __m128i {
    __int8 m128i_i8[16];
    __int16 m128i_i16[8];
    __int32 m128i_i32[4];
    __int64 m128i_i64[2];
    unsigned __int8 m128i_u8[16];
    unsigned __int16 m128i_u16[8];
    unsigned __int32 m128i_u32[4];
    unsigned __int64 m128i_u64[2];
} __m128i;

typedef union __declspec(align(16)) __m128d {
    double m128d_f64[2];
} __m128d;

#if __POCC_TARGET__ == 3

/* type conversion (not value conversion) */
extern __m128 __cdecl _mm_castpd_ps(__m128d);  /* (__m128)(x) */
extern __m128 __cdecl _mm_castsi128_ps(__m128i);  /* (__m128)(x) */
extern __m128d __cdecl _mm_castps_pd(__m128);  /* (__m128d)(x) */
extern __m128d __cdecl _mm_castsi128_pd(__m128i);  /* (__m128d)(x) */
extern __m128i __cdecl _mm_castps_si128(__m128);  /* (__m128i)(x) */
extern __m128i __cdecl _mm_castpd_si128(__m128d);  /* (__m128i)(x) */

/* double-precision arithmetic */
extern __m128d __cdecl _mm_add_sd(__m128d, __m128d);  /* addsd */
extern __m128d __cdecl _mm_add_pd(__m128d, __m128d);  /* addpd */
extern __m128d __cdecl _mm_sub_sd(__m128d, __m128d);  /* subsd */
extern __m128d __cdecl _mm_sub_pd(__m128d, __m128d);  /* subpd */
extern __m128d __cdecl _mm_mul_sd(__m128d, __m128d);  /* mulsd */
extern __m128d __cdecl _mm_mul_pd(__m128d, __m128d);  /* mulpd */
extern __m128d __cdecl _mm_div_sd(__m128d, __m128d);  /* divsd */
extern __m128d __cdecl _mm_div_pd(__m128d, __m128d);  /* divpd */
extern __m128d __cdecl _mm_max_sd(__m128d, __m128d);  /* maxsd */
extern __m128d __cdecl _mm_max_pd(__m128d, __m128d);  /* maxpd */
extern __m128d __cdecl _mm_min_sd(__m128d, __m128d);  /* minsd */
extern __m128d __cdecl _mm_min_pd(__m128d, __m128d);  /* minpd */
extern __m128d __cdecl _mm_sqrt_sd(__m128d, __m128d);  /* sqrtsd */
extern __m128d __cdecl _mm_sqrt_pd(__m128d);  /* sqrtpd */

/* double-precision logical */
extern __m128d __cdecl _mm_and_pd(__m128d, __m128d);  /* andpd */
extern __m128d __cdecl _mm_andnot_pd(__m128d, __m128d);  /* andnpd */
extern __m128d __cdecl _mm_or_pd(__m128d, __m128d);  /* orpd */
extern __m128d __cdecl _mm_xor_pd(__m128d, __m128d);  /* xorpd */

/* double-precision comparison */
extern __m128d __cdecl _mm_cmpeq_sd(__m128d, __m128d);  /* cmpsd */
extern __m128d __cdecl _mm_cmpeq_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmplt_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmplt_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmple_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmple_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmpgt_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmpgt_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmpge_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmpge_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmpneq_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmpneq_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmpnlt_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmpnlt_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmpnle_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmpnle_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmpngt_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmpngt_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmpnge_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmpnge_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmpord_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmpord_pd(__m128d, __m128d);  /* cmppd */
extern __m128d __cdecl _mm_cmpunord_sd(__m128d, __m128d);  /* cmdsd */
extern __m128d __cdecl _mm_cmpunord_pd(__m128d, __m128d);  /* cmppd */
extern int __cdecl _mm_comieq_sd(__m128d, __m128d);  /* comisd */
extern int __cdecl _mm_comilt_sd(__m128d, __m128d);  /* comisd */
extern int __cdecl _mm_comile_sd(__m128d, __m128d);  /* comisd */
extern int __cdecl _mm_comigt_sd(__m128d, __m128d);  /* comisd */
extern int __cdecl _mm_comige_sd(__m128d, __m128d);  /* comisd */
extern int __cdecl _mm_comineq_sd(__m128d, __m128d);  /* comisd */
extern int __cdecl _mm_ucomieq_sd(__m128d, __m128d);  /* ucomisd */
extern int __cdecl _mm_ucomilt_sd(__m128d, __m128d);  /* ucomisd */
extern int __cdecl _mm_ucomile_sd(__m128d, __m128d);  /* ucomisd */
extern int __cdecl _mm_ucomigt_sd(__m128d, __m128d);  /* ucomisd */
extern int __cdecl _mm_ucomige_sd(__m128d, __m128d);  /* ucomisd */
extern int __cdecl _mm_ucomineq_sd(__m128d, __m128d);  /* ucomisd */

/* double-precision conversion */
extern __m128 __cdecl _mm_cvtepi32_ps(__m128i);  /* cvtdq2pd */
extern __m128d __cdecl _mm_cvtepi32_pd(__m128i);  /* cvtdq2ps */
extern __m128i __cdecl _mm_cvtps_epi32(__m128);  /* cvtps2dq */
extern __m128i __cdecl _mm_cvtpd_epi32(__m128d);  /* cvtpd2dq */
extern __m128i __cdecl _mm_cvttps_epi32(__m128);  /* cvttps2dq */
extern __m128i __cdecl _mm_cvttpd_epi32(__m128d);  /* cvttpd2dq */
extern __m128 __cdecl _mm_cvtpd_ps(__m128d);  /* cvtpd2ps */
extern __m128d __cdecl _mm_cvtps_pd(__m128);  /* cvtps2pd */
extern __m128 __cdecl _mm_cvtsd_ss(__m128, __m128d);  /* cvtsd2ss */
extern double __cdecl _mm_cvtsd_f64(__m128d);  /* cvtsd2ss */
extern __m128d __cdecl _mm_cvtss_sd(__m128d, __m128);  /* cvtss2sd */
extern int __cdecl _mm_cvtsd_si32(__m128d);  /* cvtsd2si */
extern int __cdecl _mm_cvttsd_si32(__m128d);  /* cvttsd2si */
extern __m128d __cdecl _mm_cvtsi32_sd(__m128d, int);  /* cvtsi2sd */
/* __m64 __cdecl _mm_cvtpd_pi32(__m128d); */
/* __m64 __cdecl _mm_cvttpd_pi32(__m128d); */ 
/* __m128d __cdecl _mm_cvtpi32_pd(__m64); */

/* double-precision misc */
extern __m128d __cdecl _mm_unpackhi_pd(__m128d, __m128d);  /* unpckhpd */
extern __m128d __cdecl _mm_unpacklo_pd(__m128d, __m128d);  /* unpcklpd */
extern int __cdecl _mm_movemask_pd(__m128d);  /* movmskpd */
extern __m128d __cdecl _mm_shuffle_pd(__m128d, __m128d, const int);  /* shufpd */

/* double-precision load */
extern __m128d __cdecl _mm_load_pd(const double *);  /* movapd */
extern __m128d __cdecl _mm_load1_pd(const double *);  /* movsd + shufpd */
extern __m128d __cdecl _mm_loadr_pd(const double *);  /* movapd + shufpd */
extern __m128d __cdecl _mm_loadu_pd(const double *);  /* movupd */
extern __m128d __cdecl _mm_load_sd(const double *);  /* movsd */
extern __m128d __cdecl _mm_loadh_pd(__m128d, const double *);  /* movapd + movhpd */
extern __m128d __cdecl _mm_loadl_pd(__m128d, const double *);  /* movapd + movlpd */

/* double-precision set */
extern __m128d __cdecl _mm_set_sd(double);  /* xorpd + movsd */
extern __m128d __cdecl _mm_set1_pd(double);  /* movsd + shufpd */
extern __m128d __cdecl _mm_set_pd(double, double);  /* composite */
extern __m128d __cdecl _mm_setr_pd(double, double);  /* composite */
extern __m128d __cdecl _mm_setzero_pd(void);  /* xorpd */
extern __m128d __cdecl _mm_move_sd(__m128d, __m128d);  /* movsd */

/* double-precision store */
extern void __cdecl _mm_store_sd(double *, __m128d);  /* movsd */
extern void __cdecl _mm_store1_pd(double *, __m128d);  /* shufpd + movapd */
extern void __cdecl _mm_store_pd(double *, __m128d);  /* movapd */
extern void __cdecl _mm_storeu_pd(double *, __m128d);  /* movupd */
extern void __cdecl _mm_storer_pd(double *, __m128d);  /* shufpd + movapd */
extern void __cdecl _mm_storeh_pd(double *, __m128d);  /* movhpd */
extern void __cdecl _mm_storel_pd(double *, __m128d);  /* movlpd */

/* integer arithmetic */
extern __m128i __cdecl _mm_add_epi8(__m128i, __m128i);  /* paddb */
extern __m128i __cdecl _mm_add_epi16(__m128i, __m128i);  /* paddw */
extern __m128i __cdecl _mm_add_epi32(__m128i, __m128i);  /* paddd */
/* __m64 __cdecl _mm_add_si64(__m64, __m64); */
extern __m128i __cdecl _mm_add_epi64(__m128i, __m128i);  /* paddq */
extern __m128i __cdecl _mm_adds_epi8(__m128i, __m128i);  /* paddsb */
extern __m128i __cdecl _mm_adds_epi16(__m128i, __m128i);  /* paddsw */
extern __m128i __cdecl _mm_adds_epu8(__m128i, __m128i);  /* paddusb */
extern __m128i __cdecl _mm_adds_epu16(__m128i, __m128i);  /* paddusw */
extern __m128i __cdecl _mm_avg_epu8(__m128i, __m128i);  /* pavgb */
extern __m128i __cdecl _mm_avg_epu16(__m128i, __m128i);  /* pavgw */
extern __m128i __cdecl _mm_madd_epi16(__m128i, __m128i);  /* pmaddwd */
extern __m128i __cdecl _mm_max_epi16(__m128i, __m128i);  /* pmaxsw */
extern __m128i __cdecl _mm_max_epu8(__m128i, __m128i);  /* pmaxub */
extern __m128i __cdecl _mm_min_epi16(__m128i, __m128i);  /* pminsw */
extern __m128i __cdecl _mm_min_epu8(__m128i, __m128i);  /* pminub */
extern __m128i __cdecl _mm_mulhi_epi16(__m128i, __m128i);  /* pmulhw */
extern __m128i __cdecl _mm_mulhi_epu16(__m128i, __m128i);  /* pmulhuw */
extern __m128i __cdecl _mm_mullo_epi16(__m128i, __m128i);  /* pmullw */
/* __m64 __cdecl _mm_mul_su32(__m64, __m64); */
extern __m128i __cdecl _mm_mul_epu32(__m128i, __m128i);  /* pmuludq */
extern __m128i __cdecl _mm_sad_epu8(__m128i, __m128i);  /* psadbw */
extern __m128i __cdecl _mm_sub_epi8(__m128i, __m128i);  /* psubb */
extern __m128i __cdecl _mm_sub_epi16(__m128i, __m128i);  /* psubw */
extern __m128i __cdecl _mm_sub_epi32(__m128i, __m128i);  /* psubd */
/* __m64 __cdecl _mm_sub_si64(__m64, __m64); */
extern __m128i __cdecl _mm_sub_epi64(__m128i, __m128i);  /* psubq */
extern __m128i __cdecl _mm_subs_epi8(__m128i, __m128i);  /* psubsb */
extern __m128i __cdecl _mm_subs_epi16(__m128i, __m128i);  /* psubsw */
extern __m128i __cdecl _mm_subs_epu8(__m128i, __m128i);  /* psubusb */
extern __m128i __cdecl _mm_subs_epu16(__m128i, __m128i);  /* psubusw */

/* integer logical */
extern __m128i __cdecl _mm_and_si128(__m128i, __m128i);  /* pand */
extern __m128i __cdecl _mm_andnot_si128(__m128i, __m128i);  /* pandn */
extern __m128i __cdecl _mm_or_si128(__m128i, __m128i);  /* por */
extern __m128i __cdecl _mm_xor_si128(__m128i, __m128i);  /* pxor */

/* integer shift */
extern __m128i __cdecl _mm_slli_si128(__m128i, const int);  /* pslldq */
extern __m128i __cdecl _mm_slli_epi16(__m128i, const int);  /* psllw */
extern __m128i __cdecl _mm_sll_epi16(__m128i, __m128i);  /* psllw */
extern __m128i __cdecl _mm_slli_epi32(__m128i, const int);  /* pslld */
extern __m128i __cdecl _mm_sll_epi32(__m128i, __m128i);  /* pslld */
extern __m128i __cdecl _mm_slli_epi64(__m128i, const int);  /* psllq */
extern __m128i __cdecl _mm_sll_epi64(__m128i, __m128i);  /* psllq */
extern __m128i __cdecl _mm_srai_epi16(__m128i, const int);  /* psraw */
extern __m128i __cdecl _mm_sra_epi16(__m128i, __m128i);  /* psraw */
extern __m128i __cdecl _mm_srai_epi32(__m128i, const int);  /* psrad */
extern __m128i __cdecl _mm_sra_epi32(__m128i, __m128i);  /* psrad */
extern __m128i __cdecl _mm_srli_si128(__m128i, const int);  /* psrldq */
extern __m128i __cdecl _mm_srli_epi16(__m128i, const int);  /* psrlw */
extern __m128i __cdecl _mm_srl_epi16(__m128i, __m128i);  /* psrlw */
extern __m128i __cdecl _mm_srli_epi32(__m128i, const int);  /* psrld */
extern __m128i __cdecl _mm_srl_epi32(__m128i, __m128i);  /* psrld */
extern __m128i __cdecl _mm_srli_epi64(__m128i, const int);  /* psrlq */
extern __m128i __cdecl _mm_srl_epi64(__m128i, __m128i);  /* psrlq */

/* integer comparison */
extern __m128i __cdecl _mm_cmpeq_epi8(__m128i, __m128i);  /* pcmpeqb */
extern __m128i __cdecl _mm_cmpeq_epi16(__m128i, __m128i);  /* pcmpeqw */
extern __m128i __cdecl _mm_cmpeq_epi32(__m128i, __m128i);  /* pcmpeqd */
extern __m128i __cdecl _mm_cmpgt_epi8(__m128i, __m128i);  /* pcmpgtb */
extern __m128i __cdecl _mm_cmpgt_epi16(__m128i, __m128i);  /* pcmpgtw */
extern __m128i __cdecl _mm_cmpgt_epi32(__m128i, __m128i);  /* pcmpgtd */
#define _mm_cmplt_epi8(a,b)  _mm_cmpgt_epi8(b,a)
#define _mm_cmplt_epi16(a,b)  _mm_cmpgt_epi16(b,a)
#define _mm_cmplt_epi32(a,b)  _mm_cmpgt_epi32(b,a)
/* __m128i __cdecl _mm_cmplt_epi8(__m128i, __m128i); */
/* __m128i __cdecl _mm_cmplt_epi16(__m128i, __m128i); */
/* __m128i __cdecl _mm_cmplt_epi32(__m128i, __m128i); */

/* integer conversion */
extern __m128i __cdecl _mm_cvtsi32_si128(int);  /* movd */
extern int __cdecl _mm_cvtsi128_si32(__m128i);  /* movd */

/* integer misc */
extern __m128i __cdecl _mm_packs_epi16(__m128i, __m128i);  /* packsswb */
extern __m128i __cdecl _mm_packs_epi32(__m128i, __m128i);  /* packssdw */
extern __m128i __cdecl _mm_packus_epi16(__m128i, __m128i);  /* packuswb */
extern int __cdecl _mm_extract_epi16(__m128i, const int);  /* pextrw */
extern __m128i __cdecl _mm_insert_epi16(__m128i, int, const int);  /* pinsrw */
extern int __cdecl _mm_movemask_epi8(__m128i);  /* pmovmskb */
extern __m128i __cdecl _mm_shuffle_epi32(__m128i, const int);  /* pshufd */
extern __m128i __cdecl _mm_shufflehi_epi16(__m128i, const int);  /* pshufhw */
extern __m128i __cdecl _mm_shufflelo_epi16(__m128i, const int);  /* pshuflw */
extern __m128i __cdecl _mm_unpackhi_epi8(__m128i, __m128i);  /* punpckhbw */
extern __m128i __cdecl _mm_unpackhi_epi16(__m128i, __m128i);  /* punpckhwd */
extern __m128i __cdecl _mm_unpackhi_epi32(__m128i, __m128i);  /* punpckhdq */
extern __m128i __cdecl _mm_unpackhi_epi64(__m128i, __m128i);  /* punpckhqdq */
extern __m128i __cdecl _mm_unpacklo_epi8(__m128i, __m128i);  /* punpcklbw */
extern __m128i __cdecl _mm_unpacklo_epi16(__m128i, __m128i);  /* punpcklwd */
extern __m128i __cdecl _mm_unpacklo_epi32(__m128i, __m128i);  /* punpckldq */
extern __m128i __cdecl _mm_unpacklo_epi64(__m128i, __m128i);  /* punpcklqdq */
extern __m128i __cdecl _mm_move_epi64(__m128i);  /* movq */
/* __m128i __cdecl _mm_movpi64_epi64(__m64); */
/* __m64 __cdecl _mm_movepi64_pi64(__m128i); */

/* integer load */
extern __m128i __cdecl _mm_load_si128(const __m128i *);  /* movdqa */
extern __m128i __cdecl _mm_loadu_si128(const __m128i *);  /* movdqu */
extern __m128i __cdecl _mm_loadl_epi64(const __m128i *);  /* movq */

/* integer set */
extern __m128i __cdecl _mm_set_epi8(signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char);  /* composite */
extern __m128i __cdecl _mm_set_epi16(short, short, short, short, short, short, short, short);  /* composite */
extern __m128i __cdecl _mm_set_epi32(int, int, int, int);  /* composite */
extern __m128i __cdecl _mm_set_epi64x(__int64, __int64);  /* composite */
extern __m128i __cdecl _mm_setr_epi8(signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char);  /* composite */
extern __m128i __cdecl _mm_setr_epi16(short, short, short, short, short, short, short, short);  /* composite */
extern __m128i __cdecl _mm_setr_epi32(int, int, int, int);  /* composite */
extern __m128i __cdecl _mm_setr_epi64x(__int64, __int64);  /* composite */
extern __m128i __cdecl _mm_set1_epi8(signed char);  /* composite */
extern __m128i __cdecl _mm_set1_epi16(short);  /* composite */
extern __m128i __cdecl _mm_set1_epi32(int);  /* composite */
extern __m128i __cdecl _mm_set1_epi64x(__int64);  /* composite */
extern __m128i __cdecl _mm_setzero_si128(void);  /* pxor */

/* integer store */
extern void __cdecl _mm_store_si128(__m128i *, __m128i);  /* movdqa */
extern void __cdecl _mm_storeu_si128(__m128i *, __m128i);  /* movdqu */
extern void __cdecl _mm_storel_epi64(__m128i *, __m128i);  /* movq */
extern void __cdecl _mm_maskmoveu_si128(__m128i, __m128i, char *);  /* maskmovdqu */

/* cacheability support */
extern void __cdecl _mm_stream_pd(double *, __m128d);  /* movntpd */
extern void __cdecl _mm_stream_si128(__m128i *, __m128i);  /* movntdq */
extern void __cdecl _mm_stream_si32(int *, int);  /* movnti */

/* 64-bit only */
#if __POCC_TARGET__ == 3
extern __int64 __cdecl _mm_cvtsd_si64(__m128d);  /* cvtsd2si */
extern __int64 __cdecl _mm_cvttsd_si64(__m128d);  /* cvttsd2si */
extern __m128d __cdecl _mm_cvtsi64_sd(__m128d, __int64);  /* movapd + cvtsi2sd */
extern __m128i __cdecl _mm_cvtsi64_si128(__int64);  /* movq */
extern __int64 __cdecl _mm_cvtsi128_si64(__m128i);  /* movq */
extern void __cdecl _mm_stream_si64(__int64 *, __int64);  /* movnti */
#endif /* __POCC_TARGET__ == 3 */

/* half-float */
/* float __cdecl _cvtsh_ss(unsigned short, int); */
/* unsigned short __cdecl _cvtss_sh(float, int); */
/* __m128 __cdecl _mm_cvtph_ps(__m128i, int); */
/* __m128i __cdecl _mm_cvtps_ph(__m128, int); */

#endif /* __POCC_TARGET__ == 3 */

/* cacheability support */
extern void __cdecl _mm_clflush(const void *);  /* clflush */
extern void __cdecl _mm_lfence(void);  /* lfence */
extern void __cdecl _mm_mfence(void);  /* mfence */
extern void __cdecl _mm_pause(void);  /* pause */

#endif /* __POCC__ >= 650 && (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3) */

#endif /* _EMMINTRIN_H */
