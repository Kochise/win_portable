#ifndef _IMMINTRIN_H
#define _IMMINTRIN_H

/* immintrin.h - private header for AVX, AVX2, BMI1, BMI2, FMA3, yada, yada intrinsics */

#if __POCC__ >= 500
#pragma once
#endif

#include <wmmintrin.h>

#if __POCC__ >= 700 && __POCC_TARGET__ == 3

typedef union __declspec(align(32)) {
    float m256_f32[8];
} __m256;

typedef union __declspec(align(32)) {
    double m256d_f64[4];
} __m256d;

typedef union __declspec(align(32)) {
    signed __int8 m256i_i8[32];
    signed __int16 m256i_i16[16];
    signed __int32 m256i_i32[8];
    signed __int64 m256i_i64[4];
    unsigned __int8 m256i_u8[32];
    unsigned __int16 m256i_u16[16];
    unsigned __int32 m256i_u32[8];
    unsigned __int64 m256i_u64[4];
} __m256i;

/*
 * Compare predicates for scalar and packed compare intrinsics
 */
#define _CMP_EQ_OQ     0x00  /* equal (ordered, non-signaling) */
#define _CMP_LT_OS     0x01  /* less-than (ordered, signaling) */
#define _CMP_LE_OS     0x02  /* less-than-or-equal (ordered, signaling) */
#define _CMP_UNORD_Q   0x03  /* unordered (non-signaling) */
#define _CMP_NEQ_UQ    0x04  /* not-equal (unordered, non-signaling) */
#define _CMP_NLT_US    0x05  /* not-less-than (unordered, signaling) */
#define _CMP_NLE_US    0x06  /* not-less-than-or-equal (unordered, signaling) */
#define _CMP_ORD_Q     0x07  /* ordered (non-signaling) */
#define _CMP_EQ_UQ     0x08  /* equal (unordered, non-signaling) */
#define _CMP_NGE_US    0x09  /* not-greater-than-or-equal (unordered, signaling) */
#define _CMP_NGT_US    0x0A  /* not-greater-than (unordered, signaling) */
#define _CMP_FALSE_OQ  0x0B  /* false (ordered, non-signaling) */
#define _CMP_NEQ_OQ    0x0C  /* not-equal (ordered, non-signaling) */
#define _CMP_GE_OS     0x0D  /* greater-than-or-equal (ordered, signaling) */
#define _CMP_GT_OS     0x0E  /* greater-than (ordered, signaling) */
#define _CMP_TRUE_UQ   0x0F  /* true (unordered, non-signaling) */
#define _CMP_EQ_OS     0x10  /* equal (ordered, signaling) */
#define _CMP_LT_OQ     0x11  /* less-than (ordered, non-signaling) */
#define _CMP_LE_OQ     0x12  /* less-than-or-equal (ordered, non-signaling) */
#define _CMP_UNORD_S   0x13  /* unordered (signaling) */
#define _CMP_NEQ_US    0x14  /* not-equal (unordered, signaling) */
#define _CMP_NLT_UQ    0x15  /* not-less-than (unordered, non-signaling) */
#define _CMP_NLE_UQ    0x16  /* not-less-than-or-equal (unordered, non-signaling) */
#define _CMP_ORD_S     0x17  /* ordered (signaling) */
#define _CMP_EQ_US     0x18  /* equal (unordered, signaling) */
#define _CMP_NGE_UQ    0x19  /* not-greater-than-or-equal (unordered, non-signaling) */
#define _CMP_NGT_UQ    0x1A  /* not-greater-than (unordered, non-signaling) */
#define _CMP_FALSE_OS  0x1B  /* false (ordered, signaling) */
#define _CMP_NEQ_OS    0x1C  /* not-equal (ordered, signaling) */
#define _CMP_GE_OQ     0x1D  /* greater-than-or-equal (ordered, non-signaling) */
#define _CMP_GT_OQ     0x1E  /* greater-than (ordered, non-signaling) */
#define _CMP_TRUE_US   0x1F  /* true (unordered, signaling) */

#define _mm256_ceil_ps(x)  _mm256_round_ps((x), 0x0A)
#define _mm256_floor_ps(x)  _mm256_round_ps((x), 0x09)
#define _mm256_ceil_pd(x)  _mm256_round_pd((x), 0x0A)
#define _mm256_floor_pd(x)  _mm256_round_pd((x), 0x09)

#define _mm256_cvtss_f32(a)  (_mm_cvtss_f32(_mm256_castps256_ps128(a)))
#define _mm256_cvtsd_f64(a)  (_mm_cvtsd_f64(_mm256_castpd256_pd128(a)))
#define _mm256_cvtsi256_si32(a)  (_mm_cvtsi128_si32(_mm256_castsi256_si128(a)))
#if __POCC_TARGET__ == 3
#define _mm256_cvtsi256_si64(a)  (_mm_cvtsi128_si64(_mm256_castsi256_si128(a)))
#endif /* __POCC_TARGET__ == 3 */

#define _mm256_set_m128(hi, lo)   _mm256_insertf128_ps(_mm256_castps128_ps256(lo), (hi), 1)
#define _mm256_set_m128d(hi, lo)  _mm256_insertf128_pd(_mm256_castpd128_pd256(lo), (hi), 1)
#define _mm256_set_m128i(hi, lo)  _mm256_insertf128_si256(_mm256_castsi128_si256(lo), (hi), 1)

#define _mm256_setr_m128(lo, hi)   _mm256_set_m128((hi), (lo))
#define _mm256_setr_m128d(lo, hi)  _mm256_set_m128d((hi), (lo))
#define _mm256_setr_m128i(lo, hi)  _mm256_set_m128i((hi), (lo))

#define _XCR_XFEATURE_ENABLED_MASK  0

/* type conversion (not value conversion) */
extern __m128 __cdecl _mm256_castps256_ps128(__m256);
extern __m128d __cdecl _mm256_castpd256_pd128(__m256d);
extern __m128i __cdecl _mm256_castsi256_si128(__m256i);
extern __m256 __cdecl _mm256_castpd_ps(__m256d);
extern __m256 __cdecl _mm256_castsi256_ps(__m256i);
extern __m256  __cdecl _mm256_castps128_ps256(__m128);
extern __m256d __cdecl _mm256_castpd128_pd256(__m128d);
extern __m256d __cdecl _mm256_castps_pd(__m256);
extern __m256d __cdecl _mm256_castsi256_pd(__m256i);
extern __m256i __cdecl _mm256_castsi128_si256(__m128i);
extern __m256i __cdecl _mm256_castps_si256(__m256);
extern __m256i __cdecl _mm256_castpd_si256(__m256d);

/* arithmetic */
extern __m256 __cdecl _mm256_add_ps(__m256, __m256);  /* vaddps */
extern __m256 __cdecl _mm256_sub_ps(__m256, __m256);  /* vsubps */
extern __m256 __cdecl _mm256_mul_ps(__m256, __m256);  /* vmulps */
extern __m256 __cdecl _mm256_div_ps(__m256, __m256);  /* vdivps */
extern __m256 __cdecl _mm256_addsub_ps(__m256, __m256);  /* vaddsubps */
extern __m256 __cdecl _mm256_hadd_ps(__m256, __m256);  /* vhaddps */
extern __m256 __cdecl _mm256_hsub_ps(__m256, __m256);  /* vhsubps */
extern __m256 __cdecl _mm256_max_ps(__m256, __m256);  /* vmaxps */
extern __m256 __cdecl _mm256_min_ps(__m256, __m256);  /* vminps */
extern __m256 __cdecl _mm256_sqrt_ps(__m256);  /* vsqrtps */
extern __m256 __cdecl _mm256_rcp_ps(__m256);  /* vrcpps */
extern __m256 __cdecl _mm256_rsqrt_ps(__m256);  /* vrsqrtps */
extern __m256 __cdecl _mm256_round_ps(__m256, const int);  /* vroundps */
extern __m256 __cdecl _mm256_dp_ps(__m256, __m256, const int);  /* vdpps */
extern __m256d __cdecl _mm256_add_pd(__m256d, __m256d);  /* vaddpd */
extern __m256d __cdecl _mm256_sub_pd(__m256d, __m256d);  /* vsubpd */
extern __m256d __cdecl _mm256_mul_pd(__m256d, __m256d);  /* vmulpd */
extern __m256d __cdecl _mm256_div_pd(__m256d, __m256d);  /* vdivpd */
extern __m256d __cdecl _mm256_addsub_pd(__m256d, __m256d);  /* vaddsubpd */
extern __m256d __cdecl _mm256_hadd_pd(__m256d, __m256d);  /* vhaddpd */
extern __m256d __cdecl _mm256_hsub_pd(__m256d, __m256d);  /* vhsubpd */
extern __m256d __cdecl _mm256_max_pd(__m256d, __m256d);  /* vmaxpd */
extern __m256d __cdecl _mm256_min_pd(__m256d, __m256d);  /* vminpd */
extern __m256d __cdecl _mm256_sqrt_pd(__m256d);  /* vsqrtpd */
extern __m256d __cdecl _mm256_round_pd(__m256d, const int);  /* vroundpd */

/* logical */
extern __m256 __cdecl _mm256_and_ps(__m256, __m256);  /* vandps */
extern __m256 __cdecl _mm256_andnot_ps(__m256, __m256);  /* vandnps */
extern __m256 __cdecl _mm256_or_ps(__m256, __m256);  /* vorps */
extern __m256 __cdecl _mm256_xor_ps(__m256, __m256);  /* vxorps */
extern __m256d __cdecl _mm256_and_pd(__m256d, __m256d);  /* vandpd */
extern __m256d __cdecl _mm256_andnot_pd(__m256d, __m256d);  /* vandnpd */
extern __m256d __cdecl _mm256_or_pd(__m256d, __m256d);  /* vorpd */
extern __m256d __cdecl _mm256_xor_pd(__m256d, __m256d);  /* vxorpd */

/* comparison */
extern __m128 __cdecl _mm_cmp_ss(__m128, __m128, const int);  /* vcmpss */
extern __m128d __cdecl _mm_cmp_sd(__m128d, __m128d, const int);  /* vcmpsd */
extern __m128 __cdecl _mm_cmp_ps(__m128, __m128, const int);  /* vcmpps */
extern __m128d __cdecl _mm_cmp_pd(__m128d, __m128d, const int);  /* vcmppd */
extern __m256 __cdecl _mm256_cmp_ps(__m256, __m256, const int);  /* vcmpps */
extern __m256d __cdecl _mm256_cmp_pd(__m256d, __m256d, const int);  /* vcmppd */

/* bitwise comparison */
extern int __cdecl _mm_testz_ps(__m128, __m128);  /* composite (vtestps) */
extern int __cdecl _mm_testc_ps(__m128, __m128);  /* composite (vtestps) */
extern int __cdecl _mm_testnzc_ps(__m128, __m128);  /* composite (vtestps) */
extern int __cdecl _mm_testz_pd(__m128d, __m128d);  /* composite (vtestpd) */
extern int __cdecl _mm_testc_pd(__m128d, __m128d);  /* composite (vtestpd) */
extern int __cdecl _mm_testnzc_pd(__m128d, __m128d);  /* composite (vtestpd) */
extern int __cdecl _mm256_testz_ps(__m256, __m256);  /* composite (vtestps) */
extern int __cdecl _mm256_testc_ps(__m256, __m256);  /* composite (vtestps) */
extern int __cdecl _mm256_testnzc_ps(__m256, __m256);  /* composite (vtestps) */
extern int __cdecl _mm256_testz_pd(__m256d, __m256d);  /* composite (vtestpd) */
extern int __cdecl _mm256_testc_pd(__m256d, __m256d);  /* composite (vtestpd) */
extern int __cdecl _mm256_testnzc_pd(__m256d, __m256d);  /* composite (vtestpd) */
extern int __cdecl _mm256_testz_si256(__m256i, __m256i);  /* composite (vptest) */
extern int __cdecl _mm256_testc_si256(__m256i, __m256i);  /* composite (vptest) */
extern int __cdecl _mm256_testnzc_si256(__m256i, __m256i);  /* composite (vptest) */

/* conversion */
extern __m128 __cdecl _mm256_cvtpd_ps(__m256d);  /* vcvtpd2ps */
extern __m128i __cdecl _mm256_cvtpd_epi32(__m256d);  /* vcvtpd2dq */
extern __m128i __cdecl _mm256_cvttpd_epi32(__m256d);  /* vcvttpd2dq */
extern __m256d __cdecl _mm256_cvtps_pd(__m128);  /* vcvtps2pd */
extern __m256i __cdecl _mm256_cvtps_epi32(__m256);  /* vcvtps2dq */
extern __m256i __cdecl _mm256_cvttps_epi32(__m256);  /* vcvttps2dq */
extern __m256 __cdecl _mm256_cvtepi32_ps(__m256i);  /* vcvtdq2ps */
extern __m256d __cdecl _mm256_cvtepi32_pd(__m128i);  /* vcvtdq2pd */

/* blend */
extern __m256 __cdecl _mm256_blend_ps(__m256, __m256, const int);  /* vblendps */
extern __m256 __cdecl _mm256_blendv_ps(__m256, __m256, __m256);  /* vblendvps */
extern __m256d __cdecl _mm256_blend_pd(__m256d, __m256d, const int);  /* vblendpd */
extern __m256d __cdecl _mm256_blendv_pd(__m256d, __m256d, __m256d);  /* vblendvpd */

/* permute */
extern __m128 __cdecl _mm_permute_ps(__m128, const int);  /* vpermilps */
extern __m128 __cdecl _mm_permutevar_ps(__m128, __m128i);  /* vpermilps */
extern __m128d __cdecl _mm_permute_pd(__m128d, const int);  /* vpermilpd */
extern __m128d __cdecl _mm_permutevar_pd(__m128d, __m128i);  /* vpermilpd */
extern __m256 __cdecl _mm256_permute_ps(__m256, const int);  /* vpermilps */
extern __m256 __cdecl _mm256_permutevar_ps(__m256, __m256i);  /* vpermilps */
extern __m256d __cdecl _mm256_permute_pd(__m256d, const int);  /* vpermilpd */
extern __m256d __cdecl _mm256_permutevar_pd(__m256d, __m256i);  /* vpermilpd */
extern __m256 __cdecl _mm256_permute2f128_ps(__m256, __m256, const int);  /* vperm2f128 */
extern __m256d __cdecl _mm256_permute2f128_pd(__m256d, __m256d, const int);  /* vperm2f128 */
extern __m256i __cdecl _mm256_permute2f128_si256(__m256i, __m256i, const int);  /* vperm2f128 */

/* load/store */
extern __m128 __cdecl _mm_broadcast_ss(const float *);  /* vbroadcastss */
extern __m256 __cdecl _mm256_broadcast_ss(const float *);  /* vbroadcastss */
extern __m256d __cdecl _mm256_broadcast_sd(const double *);  /* vbroadcastsd */
extern __m256 __cdecl _mm256_load_ps(const float *);  /* vmovaps */
extern __m256d __cdecl _mm256_load_pd(const double *);  /* vmovapd */
extern __m256i __cdecl _mm256_load_si256(const __m256i *);  /* vmovdqa */
extern __m256 __cdecl _mm256_loadu_ps(const float *);  /* vmovups */
extern __m256d __cdecl _mm256_loadu_pd(const double *);  /* vmovupd */
extern __m256i __cdecl _mm256_loadu_si256(const __m256i *);  /* vmovdqu */
extern __m128 __cdecl _mm_maskload_ps(const float *, __m128i);  /* vmaskmovps */
extern __m128d __cdecl _mm_maskload_pd(const double *, __m128i);  /* vmaskmovpd */
extern __m256 __cdecl _mm256_maskload_ps(const float *, __m256i);  /* vmaskmovps */
extern __m256d __cdecl _mm256_maskload_pd(const double *, __m256i);  /* vmaskmovpd */
extern void __cdecl _mm256_store_ps(float *, __m256);  /* vmovaps */
extern void __cdecl _mm256_store_pd(double *, __m256d);  /* vmovapd */
extern void __cdecl _mm256_storeu_ps(float *, __m256);  /* vmovups */
extern void __cdecl _mm256_storeu_pd(double *, __m256d);  /* vmovupd */
extern void __cdecl _mm256_store_si256(__m256i *, __m256i);  /* vmovdqa */
extern void __cdecl _mm256_storeu_si256(__m256i *, __m256i);  /* vmovdqu */
extern void __cdecl _mm256_stream_ps(float *, __m256);  /* vmovntps */
extern void __cdecl _mm256_stream_pd(double *, __m256d);  /* vmovntpd */
extern void __cdecl _mm256_stream_si256(__m256i *, __m256i);  /* vmovntdq */
extern void __cdecl _mm_maskstore_ps(float *, __m128i, __m128);  /* vmaskmovps */
extern void __cdecl _mm_maskstore_pd(double *, __m128i, __m128d);  /* vmaskmovpd */
extern void __cdecl _mm256_maskstore_ps(float *, __m256i, __m256);  /* vmaskmovps */
extern void __cdecl _mm256_maskstore_pd(double *, __m256i, __m256d);  /* vmaskmovpd */

/* system */
extern unsigned __int64 __cdecl _xgetbv(unsigned int);  /* xgetbv */
extern void __cdecl _xsetbv(unsigned int, unsigned __int64);  /* xsetbv */
extern void __cdecl _fxsave(void *);  /* fxsave */
extern void __cdecl _fxrstor(void *);  /* fxrstor */
extern void __cdecl _xsave(void *, unsigned __int64);  /* xsave */
extern void __cdecl _xsaveopt(void *, unsigned __int64);  /* xsaveopt */
extern void __cdecl _xrstor(void *, unsigned __int64);  /* xrstor */
extern void __cdecl _xsavec(void *, unsigned __int64);  /* xsavec */
extern void __cdecl _xsaves(void *, unsigned __int64);  /* xsaves */
extern void __cdecl _xrstors(const void *, unsigned __int64);  /* xrstors */
#if __POCC_TARGET__ == 3
extern void __cdecl _fxsave64(void *);  /* fxsave64 */
extern void __cdecl _fxrstor64(void *);  /* fxrstor64 */
extern void __cdecl _xsave64(void *, unsigned __int64);  /* xsave64 */
extern void __cdecl _xsaveopt64(void *, unsigned __int64);  /* xsaveopt64 */
extern void __cdecl _xrstor64(void *, unsigned __int64);  /* xrstor64 */
extern void __cdecl _xsavec64(void *, unsigned __int64);  /* xsavec64 */
extern void __cdecl _xsaves64(void *, unsigned __int64);  /* xsaves64 */
extern void __cdecl _xrstors64(const void *, unsigned __int64);  /* xrstors64 */
#endif /* __POCC_TARGET__ == 3 */

/* misc */
extern __m128 __cdecl _mm256_extractf128_ps(__m256, const int);  /* vextractf128 */
extern __m128d __cdecl _mm256_extractf128_pd(__m256d, const int);  /* vextractf128 */
extern __m128i __cdecl _mm256_extractf128_si256(__m256i, const int);  /* vextractf128 */
extern __m256 __cdecl _mm256_insertf128_ps(__m256, __m128, const int);  /* vinsertf128 */
extern __m256d __cdecl _mm256_insertf128_pd(__m256d, __m128d, const int);  /* vinsertf128 */
extern __m256i __cdecl _mm256_insertf128_si256(__m256i, __m128i, const int);  /* vinsertf128 */
extern __m256i __cdecl _mm256_lddqu_si256(const __m256i *);  /* vlddqu */
extern __m256d __cdecl _mm256_movedup_pd(__m256d);  /* vmovddup */
extern __m256 __cdecl _mm256_moveldup_ps(__m256);  /* vmovsldup */
extern __m256 __cdecl _mm256_movehdup_ps(__m256);  /* vmovshdup */
extern int __cdecl _mm256_movemask_ps(__m256);  /* vmovmskps */
extern int __cdecl _mm256_movemask_pd(__m256d);  /* vmovmskpd */
extern __m256 __cdecl _mm256_shuffle_ps(__m256, __m256, const int);  /* vshufps */
extern __m256d __cdecl _mm256_shuffle_pd(__m256d, __m256d, const int);  /* vshufpd */
extern __m256 __cdecl _mm256_unpacklo_ps(__m256, __m256);  /* vunpcklps */
extern __m256d __cdecl _mm256_unpacklo_pd(__m256d, __m256d);  /* vunpcklpd */
extern __m256 __cdecl _mm256_unpackhi_ps(__m256, __m256);  /* vunpckhps */
extern __m256d __cdecl _mm256_unpackhi_pd(__m256d, __m256d);  /* vunpckhpd */
extern void __cdecl _mm256_zeroall(void);  /* vzeroall */
extern void __cdecl _mm256_zeroupper(void);  /* vzeroupper */
extern __m256 __cdecl _mm256_setzero_ps(void);  /* vxorps */
extern __m256d __cdecl _mm256_setzero_pd(void);  /* vxorpd */
extern __m256i __cdecl _mm256_setzero_si256(void);  /* vpxor */

extern __m256 __cdecl _mm256_set_ps(float, float, float, float, float, float, float, float);  /* composite */
extern __m256 __cdecl _mm256_setr_ps(float, float, float, float, float, float, float, float);  /* composite */
extern __m256d __cdecl _mm256_set_pd(double, double, double, double);  /* composite */
extern __m256d __cdecl _mm256_setr_pd(double, double, double, double);  /* composite */
extern __m256i __cdecl _mm256_set_epi8(signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char);  /* composite */
extern __m256i __cdecl _mm256_setr_epi8(signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char);  /* composite */
extern __m256i __cdecl _mm256_set_epi16(short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short);  /* composite */
extern __m256i __cdecl _mm256_setr_epi16(short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short);  /* composite */
extern __m256i __cdecl _mm256_set_epi32(int, int, int, int, int, int, int, int);  /* composite */
extern __m256i __cdecl _mm256_setr_epi32(int, int, int, int, int, int, int, int);  /* composite */
extern __m256i __cdecl _mm256_set_epi64x(__int64, __int64, __int64, __int64);  /* composite */
extern __m256i __cdecl _mm256_setr_epi64x(__int64, __int64, __int64, __int64);  /* composite */
extern __m256 __cdecl _mm256_set1_ps(float);  /* composite */
extern __m256d __cdecl _mm256_set1_pd(double);  /* composite */
extern __m256i __cdecl _mm256_set1_epi8(signed char);  /* composite */
extern __m256i __cdecl _mm256_set1_epi16(short);  /* composite */
extern __m256i __cdecl _mm256_set1_epi32(int);  /* composite */
extern __m256i __cdecl _mm256_set1_epi64x(__int64);  /* composite */

static inline __m256 __cdecl _mm256_loadu2_m128(const float *hiaddr, const float *loaddr) {
    return _mm256_set_m128(_mm_loadu_ps(hiaddr), _mm_loadu_ps(loaddr));
}
static inline __m256d __cdecl _mm256_loadu2_m128d(const double *hiaddr, const double *loaddr) {
    return _mm256_set_m128d(_mm_loadu_pd(hiaddr), _mm_loadu_pd(loaddr));
}
static inline __m256i __cdecl _mm256_loadu2_m128i(const __m128i *hiaddr, const __m128i *loaddr) {
    return _mm256_set_m128i(_mm_loadu_si128(hiaddr), _mm_loadu_si128(loaddr));
}

static inline void __cdecl _mm256_storeu2_m128(float *hiaddr, float *loaddr, __m256 a) {
    _mm_storeu_ps(loaddr, _mm256_castps256_ps128(a));
    _mm_storeu_ps(hiaddr, _mm256_extractf128_ps(a, 1));
}
static inline void __cdecl _mm256_storeu2_m128d(double *hiaddr, double *loaddr, __m256d a) {
    _mm_storeu_pd(loaddr, _mm256_castpd256_pd128(a));
    _mm_storeu_pd(hiaddr, _mm256_extractf128_pd(a, 1));
}
static inline void __cdecl _mm256_storeu2_m128i(__m128i *hiaddr, __m128i *loaddr, __m256i a) {
    _mm_storeu_si128(loaddr, _mm256_castsi256_si128(a));
    _mm_storeu_si128(hiaddr, _mm256_extractf128_si256(a, 1));
}

#endif /* __POCC__ >= 700 && __POCC_TARGET__ == 3 */

#if __POCC__ >= 800 && __POCC_TARGET__ == 3

/* Fused multiply-add (FMA3) operations */
__m128  __cdecl _mm_fmadd_ps(__m128, __m128, __m128);  /* vfmadd213ps */
__m128d __cdecl _mm_fmadd_pd(__m128d, __m128d, __m128d);  /* vfmadd213pd */
__m128  __cdecl _mm_fmadd_ss(__m128, __m128, __m128);  /* vfmadd213ss */
__m128d __cdecl _mm_fmadd_sd(__m128d, __m128d, __m128d);  /* vfmadd213sd */
__m128  __cdecl _mm_fmsub_ps(__m128, __m128, __m128);  /* vfmsub213ps */
__m128d __cdecl _mm_fmsub_pd(__m128d, __m128d, __m128d);  /* vfmsub213pd */
__m128  __cdecl _mm_fmsub_ss(__m128, __m128, __m128);  /* vfmsub213ss */
__m128d __cdecl _mm_fmsub_sd(__m128d, __m128d, __m128d);  /* vfmsub213sd */
__m128  __cdecl _mm_fnmadd_ps(__m128, __m128, __m128);  /* vfnmadd213ps */
__m128d __cdecl _mm_fnmadd_pd(__m128d, __m128d, __m128d);  /* vfnmadd213pd */
__m128  __cdecl _mm_fnmadd_ss(__m128, __m128, __m128);  /* vfnmadd213ss */
__m128d __cdecl _mm_fnmadd_sd(__m128d, __m128d, __m128d);  /* vfnmadd213sd */
__m128  __cdecl _mm_fnmsub_ps(__m128, __m128, __m128);  /* vfnmsub213ps */
__m128d __cdecl _mm_fnmsub_pd(__m128d, __m128d, __m128d);  /* vfnmsub213pd */
__m128  __cdecl _mm_fnmsub_ss(__m128, __m128, __m128);  /* vfnmsub213ss */
__m128d __cdecl _mm_fnmsub_sd(__m128d, __m128d, __m128d);  /* vfnmsub213sd */

__m256  __cdecl _mm256_fmadd_ps(__m256, __m256, __m256);  /* vfmadd213ps */
__m256d __cdecl _mm256_fmadd_pd(__m256d, __m256d, __m256d);  /* vfmadd213pd */
__m256  __cdecl _mm256_fmsub_ps(__m256, __m256, __m256);  /* vfmsub213ps */
__m256d __cdecl _mm256_fmsub_pd(__m256d, __m256d, __m256d);  /* vfmsub213pd */
__m256  __cdecl _mm256_fnmadd_ps(__m256, __m256, __m256);  /* vfnmadd213ps */
__m256d __cdecl _mm256_fnmadd_pd(__m256d, __m256d, __m256d);  /* vfnmadd213pd */
__m256  __cdecl _mm256_fnmsub_ps(__m256, __m256, __m256);  /* vfnmsub213ps */
__m256d __cdecl _mm256_fnmsub_pd(__m256d, __m256d, __m256d);  /* vfnmsub213pd */

__m128  __cdecl _mm_fmaddsub_ps(__m128, __m128, __m128);  /* vfmaddsub213ps */
__m128d __cdecl _mm_fmaddsub_pd(__m128d, __m128d, __m128d);  /* vfmaddsub213pd */
__m128  __cdecl _mm_fmsubadd_ps(__m128, __m128, __m128);  /* vfmsubadd213ps */
__m128d __cdecl _mm_fmsubadd_pd(__m128d, __m128d, __m128d);  /* vfmsubadd213pd */

__m256  __cdecl _mm256_fmaddsub_ps(__m256, __m256, __m256);  /* vfmaddsub213ps */
__m256d __cdecl _mm256_fmaddsub_pd(__m256d, __m256d, __m256d);  /* vfmaddsub213pd */
__m256  __cdecl _mm256_fmsubadd_ps(__m256, __m256, __m256);  /* vfmsubadd213ps */
__m256d __cdecl _mm256_fmsubadd_pd(__m256d, __m256d, __m256d);  /* vfmsubadd213pd */

/* Integer 256-bit vector comparison operations */
extern __m256i __cdecl _mm256_cmpeq_epi8(__m256i, __m256i);  /* vpcmpeqb */
extern __m256i __cdecl _mm256_cmpeq_epi16(__m256i, __m256i);  /* vpcmpeqw */
extern __m256i __cdecl _mm256_cmpeq_epi32(__m256i, __m256i);  /* vpcmpeqd */
extern __m256i __cdecl _mm256_cmpeq_epi64(__m256i, __m256i);  /* vpcmpeqq */

extern __m256i __cdecl _mm256_cmpgt_epi8(__m256i, __m256i);  /* vpcmpgtb */
extern __m256i __cdecl _mm256_cmpgt_epi16(__m256i, __m256i);  /* vpcmpgtw */
extern __m256i __cdecl _mm256_cmpgt_epi32(__m256i, __m256i);  /* vpcmpgtd */
extern __m256i __cdecl _mm256_cmpgt_epi64(__m256i, __m256i);  /* vpcmpgtq */

/* Integer 256-bit vector MIN/MAX operations */
extern __m256i __cdecl _mm256_max_epi8(__m256i, __m256i);  /* vpmaxsb */
extern __m256i __cdecl _mm256_max_epi16(__m256i, __m256i);  /* vpmaxsw */
extern __m256i __cdecl _mm256_max_epi32(__m256i, __m256i);  /* vpmaxsd */
extern __m256i __cdecl _mm256_max_epu8(__m256i, __m256i);  /* vpmaxub */
extern __m256i __cdecl _mm256_max_epu16(__m256i, __m256i);  /* vpmaxuw */
extern __m256i __cdecl _mm256_max_epu32(__m256i, __m256i);  /* vpmaxud */

extern __m256i __cdecl _mm256_min_epi8(__m256i, __m256i);  /* vpminsb */
extern __m256i __cdecl _mm256_min_epi16(__m256i, __m256i);  /* vpminsw */
extern __m256i __cdecl _mm256_min_epi32(__m256i, __m256i);  /* vpminsd */
extern __m256i __cdecl _mm256_min_epu8(__m256i, __m256i);  /* vpminub */
extern __m256i __cdecl _mm256_min_epu16(__m256i, __m256i);  /* vpminuw */
extern __m256i __cdecl _mm256_min_epu32(__m256i, __m256i);  /* vpminud */

/* Integer 256-bit vector logical operations */
extern __m256i __cdecl _mm256_and_si256(__m256i, __m256i);  /* vpand */
extern __m256i __cdecl _mm256_andnot_si256(__m256i, __m256i);  /* vpandn */
extern __m256i __cdecl _mm256_or_si256(__m256i, __m256i);  /* vpor */
extern __m256i __cdecl _mm256_xor_si256(__m256i, __m256i);  /* vpxor */

/* Integer 256-bit vector arithmetic operations */
extern __m256i __cdecl _mm256_abs_epi8(__m256i);  /* vpabsb */
extern __m256i __cdecl _mm256_abs_epi16(__m256i);  /* vpabsw */
extern __m256i __cdecl _mm256_abs_epi32(__m256i);  /* vpabsd */

extern __m256i __cdecl _mm256_add_epi8(__m256i, __m256i);  /* vpaddb */
extern __m256i __cdecl _mm256_add_epi16(__m256i, __m256i);  /* vpaddw */
extern __m256i __cdecl _mm256_add_epi32(__m256i, __m256i);  /* vpaddd */
extern __m256i __cdecl _mm256_add_epi64(__m256i, __m256i);  /* vpaddq */

extern __m256i __cdecl _mm256_adds_epi8(__m256i, __m256i);  /* vpaddsb */
extern __m256i __cdecl _mm256_adds_epi16(__m256i, __m256i);  /* vpaddsw */
extern __m256i __cdecl _mm256_adds_epu8(__m256i, __m256i);  /* vpaddusb */
extern __m256i __cdecl _mm256_adds_epu16(__m256i, __m256i);  /* vpaddusw */

extern __m256i __cdecl _mm256_sub_epi8(__m256i, __m256i);  /* vpsubb */
extern __m256i __cdecl _mm256_sub_epi16(__m256i, __m256i);  /* vpsubw */
extern __m256i __cdecl _mm256_sub_epi32(__m256i, __m256i);  /* vpsubd */
extern __m256i __cdecl _mm256_sub_epi64(__m256i, __m256i);  /* vpsubq */

extern __m256i __cdecl _mm256_subs_epi8(__m256i, __m256i);  /* vpsubsb */
extern __m256i __cdecl _mm256_subs_epi16(__m256i, __m256i);  /* vpsubsw */
extern __m256i __cdecl _mm256_subs_epu8(__m256i, __m256i);  /* vpsubusb */
extern __m256i __cdecl _mm256_subs_epu16(__m256i, __m256i);  /* vpsubusw */

extern __m256i __cdecl _mm256_avg_epu8(__m256i, __m256i);  /* vpavgb */
extern __m256i __cdecl _mm256_avg_epu16(__m256i, __m256i);  /* vpavgw */

extern __m256i __cdecl _mm256_hadd_epi16(__m256i, __m256i);  /* vphaddw */
extern __m256i __cdecl _mm256_hadd_epi32(__m256i, __m256i);  /* vphaddd */
extern __m256i __cdecl _mm256_hadds_epi16(__m256i, __m256i);  /* vphaddsw */

extern __m256i __cdecl _mm256_hsub_epi16(__m256i, __m256i);  /* vphsubw */
extern __m256i __cdecl _mm256_hsub_epi32(__m256i, __m256i);  /* vphsubd */
extern __m256i __cdecl _mm256_hsubs_epi16(__m256i, __m256i);  /* vphsubsw */

extern __m256i __cdecl _mm256_madd_epi16(__m256i, __m256i);  /* vpmaddwd */
extern __m256i __cdecl _mm256_maddubs_epi16(__m256i, __m256i);  /* vpmaddubsw */

extern __m256i __cdecl _mm256_mulhi_epi16(__m256i, __m256i);  /* vpmulhw */
extern __m256i __cdecl _mm256_mulhi_epu16(__m256i, __m256i);  /* vpmulhuw */

extern __m256i __cdecl _mm256_mullo_epi16(__m256i, __m256i);  /* vpmullw */
extern __m256i __cdecl _mm256_mullo_epi32(__m256i, __m256i);  /* vpmulld */

extern __m256i __cdecl _mm256_mul_epi32(__m256i, __m256i);  /* vpmuldq */
extern __m256i __cdecl _mm256_mul_epu32(__m256i, __m256i);  /* vpmuludq */

extern __m256i __cdecl _mm256_mulhrs_epi16(__m256i, __m256i);  /* vpmulhrsw */

extern __m256i __cdecl _mm256_sign_epi8(__m256i, __m256i);  /* vpsignb */
extern __m256i __cdecl _mm256_sign_epi16(__m256i, __m256i);  /* vpsignw */
extern __m256i __cdecl _mm256_sign_epi32(__m256i, __m256i);  /* vpsignd */

extern __m256i __cdecl _mm256_sad_epu8(__m256i, __m256i);  /* vpsadbw */
extern __m256i __cdecl _mm256_mpsadbw_epu8(__m256i, __m256i, const int);  /* vmpsadbw */

/* Integer 128/256-bit vector arithmetic/logical shift operations */
extern __m128i __cdecl _mm_sllv_epi32(__m128i, __m128i);  /* vpsllvd */
extern __m128i __cdecl _mm_sllv_epi64(__m128i, __m128i);  /* vpsllvq */

extern __m128i __cdecl _mm_srav_epi32(__m128i, __m128i);  /* vpsravd */

extern __m128i __cdecl _mm_srlv_epi32(__m128i, __m128i);  /* vpsrlvd */
extern __m128i __cdecl _mm_srlv_epi64(__m128i, __m128i);  /* vpsrlvq */

extern __m256i __cdecl _mm256_slli_si256(__m256i, const int);  /* vpslldq */
extern __m256i __cdecl _mm256_srli_si256(__m256i, const int);  /* vpsrldq */

extern __m256i __cdecl _mm256_sll_epi16(__m256i, __m128i);  /* vpsllw */
extern __m256i __cdecl _mm256_sll_epi32(__m256i, __m128i);  /* vpslld */
extern __m256i __cdecl _mm256_sll_epi64(__m256i, __m128i);  /* vpsllq */

extern __m256i __cdecl _mm256_slli_epi16(__m256i, int);  /* vpsllw */
extern __m256i __cdecl _mm256_slli_epi32(__m256i, int);  /* vpslld */
extern __m256i __cdecl _mm256_slli_epi64(__m256i, int);  /* vpsllq */

extern __m256i __cdecl _mm256_sllv_epi32(__m256i, __m256i);  /* vpsllvd */
extern __m256i __cdecl _mm256_sllv_epi64(__m256i, __m256i);  /* vpsllvq */

extern __m256i __cdecl _mm256_sra_epi16(__m256i, __m128i);  /* vpsraw */
extern __m256i __cdecl _mm256_sra_epi32(__m256i, __m128i);  /* vpsrad */
extern __m256i __cdecl _mm256_srai_epi16(__m256i, int);  /* vpsraw */
extern __m256i __cdecl _mm256_srai_epi32(__m256i, int);  /* vpsrad */

extern __m256i __cdecl _mm256_srav_epi32(__m256i, __m256i);  /* vpsravd */

extern __m256i __cdecl _mm256_srl_epi16(__m256i, __m128i);  /* vpsrlw */
extern __m256i __cdecl _mm256_srl_epi32(__m256i, __m128i);  /* vpsrld */
extern __m256i __cdecl _mm256_srl_epi64(__m256i, __m128i);  /* vpsrlq */

extern __m256i __cdecl _mm256_srli_epi16(__m256i, int);  /* vpsrlw */
extern __m256i __cdecl _mm256_srli_epi32(__m256i, int);  /* vpsrld */
extern __m256i __cdecl _mm256_srli_epi64(__m256i, int);  /* vpsrlq */

extern __m256i __cdecl _mm256_srlv_epi32(__m256i, __m256i);  /* vpsrlvd */
extern __m256i __cdecl _mm256_srlv_epi64(__m256i, __m256i);  /* vpsrlvq */

/* Integer 128/256-bit vector pack/blend/shuffle/insert/extract operations */
extern __m256i __cdecl _mm256_alignr_epi8(__m256i, __m256i, const int);  /* vpalignr */

extern __m128i __cdecl _mm_blend_epi32(__m128i, __m128i, const int);  /* vpblendd */
extern __m256i __cdecl _mm256_blend_epi16(__m256i, __m256i, const int);  /* vpblendw */
extern __m256i __cdecl _mm256_blend_epi32(__m256i,__m256i, const int);  /* vpblendd */
extern __m256i __cdecl _mm256_blendv_epi8(__m256i, __m256i, __m256i);  /* vpblendvb */

extern __m256i __cdecl _mm256_packs_epi16(__m256i, __m256i);  /* vpacksswb */
extern __m256i __cdecl _mm256_packs_epi32(__m256i, __m256i);  /* vpackssdw */
extern __m256i __cdecl _mm256_packus_epi16(__m256i, __m256i);  /* vpackuswb */
extern __m256i __cdecl _mm256_packus_epi32(__m256i, __m256i);  /* vpackusdw */

extern __m256i __cdecl _mm256_unpackhi_epi8(__m256i, __m256i);  /* vpunpckhbw */
extern __m256i __cdecl _mm256_unpackhi_epi16(__m256i, __m256i);  /* vpunpckhwd */
extern __m256i __cdecl _mm256_unpackhi_epi32(__m256i, __m256i);  /* vpunpckhdq */
extern __m256i __cdecl _mm256_unpackhi_epi64(__m256i, __m256i);  /* vpunpckhqdq */

extern __m256i __cdecl _mm256_unpacklo_epi8(__m256i, __m256i);  /* vpunpcklbw */
extern __m256i __cdecl _mm256_unpacklo_epi16(__m256i, __m256i);  /* vpunpcklwd */
extern __m256i __cdecl _mm256_unpacklo_epi32(__m256i, __m256i);  /* vpunpckldq */
extern __m256i __cdecl _mm256_unpacklo_epi64(__m256i, __m256i);  /* vpunpcklqdq */

extern __m256i __cdecl _mm256_shuffle_epi8(__m256i, __m256i);  /* vpshufb */
extern __m256i __cdecl _mm256_shuffle_epi32(__m256i, const int);  /* vpshufd */

extern __m256i __cdecl _mm256_shufflehi_epi16(__m256i, const int);  /* vpshufhw */
extern __m256i __cdecl _mm256_shufflelo_epi16(__m256i, const int);  /* vpshuflw */

extern __m128i __cdecl _mm256_extracti128_si256(__m256i, const int);  /* vextracti128 */
extern __m256i __cdecl _mm256_inserti128_si256(__m256i, __m128i, const int);  /* vinserti128 */

/* Scalar to 128/256-bit vector broadcast operations */
extern __m128  __cdecl _mm_broadcastss_ps(__m128);  /* vbroadcastss */
extern __m128d __cdecl _mm_broadcastsd_pd(__m128d);  /* vbroadcastsd */

extern __m128i __cdecl _mm_broadcastb_epi8(__m128i);  /* vpbroadcastb */
extern __m128i __cdecl _mm_broadcastw_epi16(__m128i);  /* vpbroadcastw */
extern __m128i __cdecl _mm_broadcastd_epi32(__m128i);  /* vpbroadcastd */
extern __m128i __cdecl _mm_broadcastq_epi64(__m128i);  /* vpbroadcastq */

extern __m256  __cdecl _mm256_broadcastss_ps(__m128);  /* vbroadcastss */
extern __m256d __cdecl _mm256_broadcastsd_pd(__m128d);  /* vbroadcastsd */

extern __m256i __cdecl _mm256_broadcastb_epi8(__m128i);  /* vpbroadcastb */
extern __m256i __cdecl _mm256_broadcastw_epi16(__m128i);  /* vpbroadcastw */
extern __m256i __cdecl _mm256_broadcastd_epi32(__m128i);  /* vpbroadcastd */
extern __m256i __cdecl _mm256_broadcastq_epi64(__m128i);  /* vpbroadcastq */

extern __m256i __cdecl _mm256_broadcastsi128_si256(__m128i);  /* composite */

/* Integer 256-bit vector signed/unsigned extension operations */
extern __m256i __cdecl _mm256_cvtepi8_epi16(__m128i);  /* vpmovsxbw */
extern __m256i __cdecl _mm256_cvtepi8_epi32(__m128i);  /* vpmovsxbd */
extern __m256i __cdecl _mm256_cvtepi8_epi64(__m128i);  /* vpmovsxbq */
extern __m256i __cdecl _mm256_cvtepi16_epi32(__m128i);  /* vpmovsxwd */
extern __m256i __cdecl _mm256_cvtepi16_epi64(__m128i);  /* vpmovsxwq */
extern __m256i __cdecl _mm256_cvtepi32_epi64(__m128i);  /* vpmovsxdq */

extern __m256i __cdecl _mm256_cvtepu8_epi16(__m128i);  /* vpmovzxbw */
extern __m256i __cdecl _mm256_cvtepu8_epi32(__m128i);  /* vpmovzxbd */
extern __m256i __cdecl _mm256_cvtepu8_epi64(__m128i);  /* vpmovzxbq */
extern __m256i __cdecl _mm256_cvtepu16_epi32(__m128i);  /* vpmovzxwd */
extern __m256i __cdecl _mm256_cvtepu16_epi64(__m128i);  /* vpmovzxwq */
extern __m256i __cdecl _mm256_cvtepu32_epi64(__m128i);  /* vpmovzxdq */

/* whatever */
extern int __cdecl _mm256_movemask_epi8(__m256i);  /* vpmovmskb */

/* Masked load/store operations */
extern __m128i __cdecl _mm_maskload_epi32(const int *, __m128i);  /* vpmaskmovd */
extern __m128i __cdecl _mm_maskload_epi64(const __int64 *, __m128i);  /* vpmaskmovq */

extern void __cdecl _mm_maskstore_epi32(int *, __m128i, __m128i);  /* vpmaskmovd */
extern void __cdecl _mm_maskstore_epi64(__int64 *, __m128i, __m128i);  /* vpmaskmovq */

extern __m256i __cdecl _mm256_maskload_epi32(const int *, __m256i);  /* vpmaskmovd */
extern __m256i __cdecl _mm256_maskload_epi64(const __int64 *, __m256i);  /* vpmaskmovq */

extern void __cdecl _mm256_maskstore_epi32(int *, __m256i, __m256i);  /* vpmaskmovd */
extern void __cdecl _mm256_maskstore_epi64(__int64 *, __m256i, __m256i);  /* vpmaskmovq */

/* Permute elements in vector operations */
extern __m256  __cdecl _mm256_permutevar8x32_ps(__m256, __m256i);  /* vpermps */
extern __m256i __cdecl _mm256_permutevar8x32_epi32(__m256i, __m256i);  /* vpermd */

extern __m256d __cdecl _mm256_permute4x64_pd(__m256d, const int);  /* vpermpd */
extern __m256i __cdecl _mm256_permute4x64_epi64(__m256i, const int);  /* vpermq */

extern __m256i __cdecl _mm256_permute2x128_si256(__m256i, __m256i, const int);  /* vperm2i128 */

/* Load 32-bytes from memory using non-temporal aligned hint */
extern __m256i __cdecl _mm256_stream_load_si256(const __m256i *);  /* vmovntdqa */

/* Masked gather from memory to vector register operations */
extern __m128 __cdecl _mm_mask_i32gather_ps(__m128, const float *, __m128i, __m128, const int);  /* vgatherdps */
extern __m128 __cdecl _mm_mask_i64gather_ps(__m128, const float *, __m128i, __m128, const int);  /* vgatherqps */
extern __m128d __cdecl _mm_mask_i32gather_pd(__m128d, const double *, __m128i, __m128d, const int);  /* vgatherdpd */
extern __m128d __cdecl _mm_mask_i64gather_pd(__m128d, const double *, __m128i, __m128d, const int);  /* vgatherqpd */

extern __m128i __cdecl _mm_mask_i32gather_epi32(__m128i, const int *, __m128i, __m128i, const int);  /* vpgatherdd */
extern __m128i __cdecl _mm_mask_i32gather_epi64(__m128i, const __int64 *, __m128i, __m128i, const int);  /* vpgatherdq */
extern __m128i __cdecl _mm_mask_i64gather_epi32(__m128i, const int *, __m128i, __m128i, const int);  /* vpgatherqd */
extern __m128i __cdecl _mm_mask_i64gather_epi64(__m128i, const __int64 *, __m128i, __m128i, const int);  /* vpgatherqq */

extern __m256 __cdecl _mm256_mask_i32gather_ps(__m256, const float *, __m256i, __m256, const int);  /* vgatherdps */
extern __m128 __cdecl _mm256_mask_i64gather_ps(__m128, const float *, __m256i, __m128, const int);  /* vgatherqps */
extern __m256d __cdecl _mm256_mask_i32gather_pd(__m256d, const double *, __m128i, __m256d, const int);  /* vgatherdpd */
extern __m256d __cdecl _mm256_mask_i64gather_pd(__m256d, const double *, __m256i, __m256d, const int);  /* vgatherqpd */

extern __m256i __cdecl _mm256_mask_i32gather_epi32(__m256i, const int *, __m256i, __m256i, const int);  /* vpgatherdd */
extern __m256i __cdecl _mm256_mask_i32gather_epi64(__m256i, const __int64 *, __m128i, __m256i, const int);  /* vpgatherdq */
extern __m128i __cdecl _mm256_mask_i64gather_epi32(__m128i, const int *, __m256i, __m128i, const int);  /* vpgatherqd */
extern __m256i __cdecl _mm256_mask_i64gather_epi64(__m256i, const __int64 *, __m256i, __m256i, const int);  /* vpgatherqq */

/* Gather from memory to vector register operations */
extern __m128 __cdecl _mm_i32gather_ps(const float *, __m128i, const int);  /* vgatherdps */
extern __m128 __cdecl _mm_i64gather_ps(const float *, __m128i, const int);  /* vgatherqps */
extern __m128d __cdecl _mm_i32gather_pd(const double *, __m128i, const int);  /* vgatherdpd */
extern __m128d __cdecl _mm_i64gather_pd(const double *, __m128i, const int);  /* vgatherqpd */

extern __m128i __cdecl _mm_i32gather_epi32(const int *, __m128i, const int);  /* vpgatherdd */
extern __m128i __cdecl _mm_i32gather_epi64(const __int64 *, __m128i, const int);  /* vpgatherdq */
extern __m128i __cdecl _mm_i64gather_epi32(const int *, __m128i, const int);  /* vpgatherqd */
extern __m128i __cdecl _mm_i64gather_epi64(const __int64 *, __m128i, const int);  /* vpgatherqq */

extern __m256 __cdecl _mm256_i32gather_ps(const float *, __m256i, const int);  /* vgatherdps */
extern __m128 __cdecl _mm256_i64gather_ps(const float *, __m256i, const int);  /* vgatherqps */
extern __m256d __cdecl _mm256_i32gather_pd(const double *, __m128i, const int);  /* vgatherdpd */
extern __m256d __cdecl _mm256_i64gather_pd(const double *, __m256i, const int);  /* vgatherqpd */

extern __m256i __cdecl _mm256_i32gather_epi32(const int *, __m256i, const int);  /* vpgatherdd */
extern __m256i __cdecl _mm256_i32gather_epi64(const __int64 *, __m128i, const int);  /* vpgatherdq */
extern __m128i __cdecl _mm256_i64gather_epi32(const int *, __m256i, const int);  /* vpgatherqd */
extern __m256i __cdecl _mm256_i64gather_epi64(const __int64 *, __m256i, const int);  /* vpgatherqq */

#endif /* __POCC__ >= 800 && __POCC_TARGET__ == 3 */

#if __POCC__ >= 800 && (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3)

/*
 * Integer bit-manipulation operations
 */
extern unsigned int __cdecl _andn_u32(unsigned int, unsigned int);  /* andn */
extern unsigned int __cdecl _bextr_u32(unsigned int, unsigned int, unsigned int);  /* bextr */
extern unsigned int __cdecl _blsi_u32(unsigned int);  /* blsi */
extern unsigned int __cdecl _blsmsk_u32(unsigned int);  /* blsmsk */
extern unsigned int __cdecl _blsr_u32(unsigned int);  /* blsr */
extern unsigned int __cdecl _bzhi_u32(unsigned int, unsigned int);  /* bzhi */
extern unsigned int __cdecl _mulx_u32(unsigned int, unsigned int, unsigned int *);  /* mulx */
extern unsigned int __cdecl _pdep_u32(unsigned int, unsigned int);  /* pdep */
extern unsigned int __cdecl _pext_u32(unsigned int, unsigned int);  /* pext */
extern unsigned int __cdecl _rorx_u32(unsigned int, const unsigned int);  /* rorx */
extern int __cdecl _sarx_i32(int, unsigned int);  /* sarx */
extern unsigned int __cdecl _shlx_u32(unsigned int, unsigned int);  /* shlx */
extern unsigned int __cdecl _shrx_u32(unsigned int, unsigned int);  /* shrx */
#if __POCC_TARGET__ == 3
extern unsigned __int64 __cdecl _andn_u64(unsigned __int64, unsigned __int64);  /* andn */
extern unsigned __int64 __cdecl _bextr_u64(unsigned __int64, unsigned int, unsigned int);  /* bextr */
extern unsigned __int64 __cdecl _blsi_u64(unsigned __int64);  /* blsi */
extern unsigned __int64 __cdecl _blsmsk_u64(unsigned __int64);  /* blsmsk */
extern unsigned __int64 __cdecl _blsr_u64(unsigned __int64);  /* blsr */
extern unsigned __int64 __cdecl _bzhi_u64(unsigned __int64, unsigned int);  /* bzhi */
extern unsigned __int64 __cdecl _mulx_u64(unsigned __int64, unsigned __int64, unsigned __int64 *);  /* mulx */
extern unsigned __int64 __cdecl _pdep_u64(unsigned __int64, unsigned __int64);  /* pdep */
extern unsigned __int64 __cdecl _pext_u64(unsigned __int64, unsigned __int64);  /* pext */
extern unsigned __int64 __cdecl _rorx_u64(unsigned __int64, const unsigned int);  /* rorx */
extern __int64 __cdecl _sarx_i64(__int64, unsigned __int64);  /* sarx */
extern unsigned __int64 __cdecl _shlx_u64(unsigned __int64, unsigned __int64);  /* shlx */
extern unsigned __int64 __cdecl _shrx_u64(unsigned __int64, unsigned __int64);  /* shrx */
#endif /* __POCC_TARGET__ == 3 */

/* count leading zero bits */
extern unsigned int __cdecl _lzcnt_u32(unsigned int);  /* lzcnt */
#if __POCC_TARGET__ == 3
extern unsigned __int64 __cdecl _lzcnt_u64(unsigned __int64);  /* lzcnt */
#endif /* __POCC_TARGET__ == 3 */

/* count trailing zero bits */
extern unsigned int __cdecl _tzcnt_u32(unsigned int);  /* tzcnt */
#if __POCC_TARGET__ == 3
extern unsigned __int64 __cdecl _tzcnt_u64(unsigned __int64);  /* tzcnt */
#endif /* __POCC_TARGET__ == 3 */

/* invalidate processor context */
extern void __cdecl _invpcid(unsigned int, void *);  /* invpcid */

/*
 * Hardware Lock Elision
 */
/*
long _InterlockedCompareExchange_HLEAcquire(long volatile *,long,long);
long _InterlockedCompareExchange_HLERelease(long volatile *,long,long);
__int64 _InterlockedCompareExchange64_HLEAcquire(__int64 volatile *,__int64,__int64);
__int64 _InterlockedCompareExchange64_HLERelease(__int64 volatile *,__int64,__int64);
void *_InterlockedCompareExchangePointer_HLEAcquire(void *volatile *,void *,void *);
void *_InterlockedCompareExchangePointer_HLERelease(void *volatile *,void *,void *);
long _InterlockedExchangeAdd_HLEAcquire(long volatile *,long);
long _InterlockedExchangeAdd_HLERelease(long volatile *,long);
__int64 _InterlockedExchangeAdd64_HLEAcquire(__int64 volatile *,__int64);
__int64 _InterlockedExchangeAdd64_HLERelease(__int64 volatile *,__int64);
void _Store_HLERelease(long volatile *,long);
void _Store64_HLERelease(__int64 volatile *,__int64);
void _StorePointer_HLERelease(void * volatile *,void *);
*/

/*
 * Restricted Transactional Memory
 */
#define _XBEGIN_STARTED   (~0U)
#define _XABORT_EXPLICIT  (1U<<0)
#define _XABORT_RETRY     (1U<<1)
#define _XABORT_CONFLICT  (1U<<2)
#define _XABORT_CAPACITY  (1U<<3)
#define _XABORT_DEBUG     (1U<<4)
#define _XABORT_NESTED    (1U<<5)
#define _XABORT_CODE(x)   (((x) >> 24) & 0xFF)

extern unsigned int __cdecl _xbegin(void);  /* xbegin */
extern void __cdecl _xend(void);  /* xend */
extern void __cdecl _xabort(const unsigned int);  /* xabort */
extern unsigned char __cdecl _xtest(void);  /* xtest */

#if __POCC__ >= 900

/*
 * Random Number Generator
 */
extern int __cdecl _rdrand16_step(unsigned short *);  /* composite (rdrand) */
extern int __cdecl _rdrand32_step(unsigned int *);  /* composite (rdrand) */
extern int __cdecl _rdrand64_step(unsigned __int64 *);  /* composite (rdrand) */

extern int __cdecl _rdseed16_step(unsigned short *);  /* composite (rdseed) */
extern int __cdecl _rdseed32_step(unsigned int *);  /* composite (rdseed) */
extern int __cdecl _rdseed64_step(unsigned __int64 *);  /* composite (rdseed) */

/* add with carry */
extern unsigned char __cdecl _addcarryx_u32(unsigned char, unsigned int, unsigned int, unsigned int *);  /* composite (adcx) */
#if __POCC_TARGET__ == 3
extern unsigned char __cdecl _addcarryx_u64(unsigned char, unsigned __int64, unsigned __int64, unsigned __int64 *);  /* composite (adcx) */
#endif /* __POCC_TARGET__ == 3 */

#if __POCC_TARGET__ == 3
/*
 * Secure Hash Algorithm
 */
extern __m128i __cdecl _mm_sha1rnds4_epu32(__m128i, __m128i, const int);  /* sha1rnds4 */
extern __m128i __cdecl _mm_sha1nexte_epu32(__m128i, __m128i);  /* sha1nexte */
extern __m128i __cdecl _mm_sha1msg1_epu32(__m128i, __m128i);  /* sha1msg1 */
extern __m128i __cdecl _mm_sha1msg2_epu32(__m128i, __m128i);  /* sha1msg2 */
extern __m128i __cdecl _mm_sha256rnds2_epu32(__m128i, __m128i, __m128i);  /* sha256rnds2 */
extern __m128i __cdecl _mm_sha256msg1_epu32(__m128i, __m128i);  /* sha256msg1 */
extern __m128i __cdecl _mm_sha256msg2_epu32(__m128i, __m128i);  /* sha256msg2 */
#endif /* __POCC_TARGET__ == 3 */

#if __POCC_TARGET__ == 3
/*
 * Read/write FS/GS segment base register
 */
extern unsigned __int32 __cdecl _readfsbase_u32(void);  /* rdfsbase */
extern unsigned __int64 __cdecl _readfsbase_u64(void);  /* rdfsbase */
extern unsigned __int32 __cdecl _readgsbase_u32(void);  /* rdgsbase */
extern unsigned __int64 __cdecl _readgsbase_u64(void);  /* rdgsbase */

extern void __cdecl _writefsbase_u32(unsigned __int32);  /* wrfsbase */
extern void __cdecl _writefsbase_u64(unsigned __int64);  /* wrfsbase */
extern void __cdecl _writegsbase_u32(unsigned __int32);  /* wrgsbase */
extern void __cdecl _writegsbase_u64(unsigned __int64);  /* wrgsbase */
#endif /* __POCC_TARGET__ == 3 */

/* read processor id */
extern unsigned __int32 __cdecl _rdpid_u32(void);

/*
 * Memory Protection Extensions
 */
/*
extern void * __cdecl _bnd_set_ptr_bounds(const void *, size_t);
extern void * __cdecl _bnd_init_ptr_bounds(const void *);
extern void * __cdecl _bnd_copy_ptr_bounds(const void *, const void *);
extern void __cdecl _bnd_chk_ptr_bounds(const void *, size_t);
extern void __cdecl _bnd_chk_ptr_lbounds(const void *);
extern void __cdecl _bnd_chk_ptr_ubounds(const void *);
extern void __cdecl _bnd_store_ptr_bounds(const void **, const void *);
extern void * __cdecl _bnd_load_ptr_bounds(const void **, const void *);
extern const void * __cdecl _bnd_get_ptr_lbound(const void *);
extern const void * __cdecl _bnd_get_ptr_ubound(const void *);
extern void * __cdecl _bnd_narrow_ptr_bounds(const void *, const void *, size_t);
*/

#if __POCC__ >= 1000 && __POCC_TARGET__ == 3

/* Integer 256-bit vector insert */
extern __m256i __cdecl _mm256_insert_epi8(__m256i, __int8, const int);  /* composite (vpinsrb) */
extern __m256i __cdecl _mm256_insert_epi16(__m256i, __int16, const int);  /* composite (vpinsrw) */
extern __m256i __cdecl _mm256_insert_epi32(__m256i, __int32, const int);  /* composite (vpinsrd) */
extern __m256i __cdecl _mm256_insert_epi64(__m256i, __int64, const int);  /* composite (vpinsrq) */

/* Integer 256-bit vector extract */
extern int __cdecl _mm256_extract_epi8(__m256i, const int);  /* composite (vpextrb) */
extern int __cdecl _mm256_extract_epi16(__m256i, const int);  /* composite (vpextrw) */
extern __int32 __cdecl _mm256_extract_epi32(__m256i, const int);  /* composite (vpextrd) */
extern __int64 __cdecl _mm256_extract_epi64(__m256i, const int);  /* composite (vpextrq) */

#endif /* __POCC__ >= 1000 && __POCC_TARGET__ == 3 */

#endif /* __POCC__ >= 900 */

#endif /* __POCC__ >= 800 && (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3) */

#endif /* _IMMINTRIN_H */
