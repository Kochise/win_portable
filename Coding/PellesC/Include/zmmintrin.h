#ifndef _ZMMINTRIN_H
#define _ZMMINTRIN_H

/* zmmintrin.h - private header for AVX-512 intrinsics */

#if __POCC__ >= 500
#pragma once
#endif

#include <immintrin.h>

#if __POCC__ >= 1000 && __POCC_TARGET__ == 3

/* ultra-special mask types */
typedef unsigned __int8 __mmask8;
typedef unsigned __int16 __mmask16;
/* typedef unsigned __int32 __mmask32; */
/* typedef unsigned __int64 __mmask64; */

typedef union __declspec(align(64)) __m512 {
    float m512_f32[16];
} __m512;

typedef union __declspec(align(64)) __m512d {
    double m512d_f64[8];
} __m512d;

typedef union __declspec(align(64)) __m512i {
    signed __int8 m512i_i8[64];
    signed __int16 m512i_i16[32];
    signed __int32 m512i_i32[16];
    signed __int64 m512i_i64[8];
    unsigned __int8 m512i_u8[64];
    unsigned __int16 m512i_u16[32];
    unsigned __int32 m512i_u32[16];
    unsigned __int64 m512i_u64[8];
} __m512i;

/* type cast */
extern __m512 __cdecl _mm512_castpd_ps(__m512d);
extern __m512d __cdecl _mm512_castps_pd(__m512);
extern __m512i __cdecl _mm512_castps_si512(__m512);
extern __m512i __cdecl _mm512_castpd_si512(__m512d);
extern __m512 __cdecl _mm512_castsi512_ps(__m512i);
extern __m512d __cdecl _mm512_castsi512_pd(__m512i);

/* move cast */
extern __m512 __cdecl _mm512_castps128_ps512(__m128);
extern __m512d __cdecl _mm512_castpd128_pd512(__m128d);
extern __m512i __cdecl _mm512_castsi128_si512(__m128i);
extern __m512 __cdecl _mm512_castps256_ps512(__m256);
extern __m512d __cdecl _mm512_castpd256_pd512(__m256d);
extern __m512i __cdecl _mm512_castsi256_si512(__m256i);
extern __m128 __cdecl _mm512_castps512_ps128(__m512);
extern __m256 __cdecl _mm512_castps512_ps256(__m512);
extern __m128d __cdecl _mm512_castpd512_pd128(__m512d);
extern __m256d __cdecl _mm512_castpd512_pd256(__m512d);
extern __m128i __cdecl _mm512_castsi512_si128(__m512i);
extern __m256i __cdecl _mm512_castsi512_si256(__m512i);

/* constant for special read-only mask register 'k0' */
#define _MM_K0_REG8   (0xff)
#define _MM_K0_REG16  (0xffff)
#define _MM_K0_REG32  (0xffffffff)
#define _MM_K0_REG64  (0xffffffffffffffff)

/* constants for index scale (gather/scatter) */
typedef enum {
    _MM_SCALE_1 = 1,
    _MM_SCALE_2 = 2,
    _MM_SCALE_4 = 4,
    _MM_SCALE_8 = 8
} _MM_INDEX_SCALE_ENUM;

/* constants for mantissa extraction */
typedef enum {
    _MM_MANT_NORM_1_2 = 0,      /* interval [1, 2) */
    _MM_MANT_NORM_p5_2 = 1,     /* interval [1/2, 2) */
    _MM_MANT_NORM_p5_1 = 2,     /* interval [1/2, 1) */
    _MM_MANT_NORM_p75_1p5 = 3   /* interval [3/4, 3/2) */
} _MM_MANTISSA_NORM_ENUM;

typedef enum {
    _MM_MANT_SIGN_src = 0,      /* sign = sign(SRC) */
    _MM_MANT_SIGN_zero = 4,     /* sign = 0 */
    _MM_MANT_SIGN_nan = 8       /* DEST = qNaN if sign(SRC) != 0 */
} _MM_MANTISSA_SIGN_ENUM;

/* constants for integer comparison predicates */
typedef enum {
    _MM_CMPINT_EQ,      /* equal */
    _MM_CMPINT_LT,      /* less than */
    _MM_CMPINT_LE,      /* less than or equal */
    _MM_CMPINT_UNUSED,
    _MM_CMPINT_NE,      /* not equal */
    _MM_CMPINT_NLT,     /* not less than */
    _MM_CMPINT_NLE,     /* not less than or equal */
    /* aliases: */
    _MM_CMPINT_GE = _MM_CMPINT_NLT,  /* greater than or equal */
    _MM_CMPINT_GT = _MM_CMPINT_NLE,  /* greater than */
} _MM_CMPINT_ENUM;

#define _AVX512F_(N)  N;  /* AVX-512 Foundation */
#define _AVX512F_EWW_(N)  /* AVX-512 Foundation, but eww... later dude... */
#define _AVX512BW_(N)     /* not yet */
#define _AVX512DQ_(N)     /* not yet */
#define _AVX512CD_(N)     /* not yet */
#define _AVX512ER_(N)     /* not yet (Intel Xeon Phi only) */
#define _AVX512PF_(N)     /* not yet (Intel Xeon Phi only) */

_AVX512F_(extern __m512 __cdecl _mm512_setzero_ps(void))  /* vxorps */
_AVX512F_(extern __m512d __cdecl _mm512_setzero_pd(void))  /* vxorpd */

_AVX512F_(extern __m512 __cdecl _mm512_set_ps(float, float, float, float, float, float, float, float, float, float, float, float, float, float, float, float))  /* composite */
_AVX512F_(extern __m512d __cdecl _mm512_set_pd(double, double, double, double, double, double, double, double))  /* composite */

_AVX512F_(extern __m512 __cdecl _mm512_set1_ps(float))  /* vbroadcastss */
_AVX512F_(extern __m512d __cdecl _mm512_set1_pd(double))  /* vbroadcastsd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_load_ps(__mmask16, const void *))  /* vmovaps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_load_pd(__mmask8, const void *))  /* vmovapd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_load_ps(__m512, __mmask16, const void *))  /* composite(vmovaps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_load_pd(__m512d, __mmask8, const void *))  /* composite(vmovapd) */
_AVX512F_(extern __m512 __cdecl _mm512_maskz_loadu_ps(__mmask16, const void *))  /* vmovups */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_loadu_pd(__mmask8, const void *))  /* vmovupd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_loadu_ps(__m512, __mmask16, const void *))  /* composite(vmovups) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_loadu_pd(__m512d, __mmask8, const void *))  /* composite(vmovupd) */

_AVX512F_(extern void __cdecl _mm512_storeu_ps(void *, __m512))  /* vmovups */
_AVX512F_(extern void __cdecl _mm512_storeu_pd(void *, __m512d))  /* vmovupd */
_AVX512F_(extern void __cdecl _mm512_mask_store_ps(void *, __mmask16, __m512))  /* vmovaps */
_AVX512F_(extern void __cdecl _mm512_mask_store_pd(void *, __mmask8, __m512d))  /* vmovapd */
_AVX512F_(extern void __cdecl _mm512_mask_storeu_ps(void *, __mmask16, __m512))  /* vmovups */
_AVX512F_(extern void __cdecl _mm512_mask_storeu_pd(void *, __mmask8, __m512d))  /* vmovupd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_add_round_ps(__mmask16, __m512, __m512, const int /*rnd*/))  /* vaddps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_add_round_pd(__mmask8, __m512d, __m512d, const int /*rnd*/))  /* vaddpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_add_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* composite(vaddps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_add_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* composite(vaddpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_sub_round_ps(__mmask16, __m512, __m512, const int /*rnd*/))  /* vsubps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_sub_round_pd(__mmask8, __m512d, __m512d, const int /*rnd*/))  /* vsubpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_sub_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* composite(vsubps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_sub_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* composite(vsubpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_mul_round_ps(__mmask16, __m512, __m512, const int /*rnd*/))  /* vmulps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_mul_round_pd(__mmask8, __m512d, __m512d, const int /*rnd*/))  /* vmulpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_mul_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* composite(vmulps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_mul_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* composite(vmulpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_div_round_ps(__mmask16, __m512, __m512, const int /*rnd*/))  /* vdivps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_div_round_pd(__mmask8, __m512d, __m512d, const int /*rnd*/))  /* vdivpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_div_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* composite(vdivps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_div_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* composite(vdivpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_sqrt_round_ps(__mmask16, __m512, const int /*rnd*/))  /* vsqrtps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_sqrt_round_pd(__mmask8, __m512d, const int /*rnd*/))  /* vsqrtpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_sqrt_round_ps(__m512, __mmask16, __m512, const int /*rnd*/))  /* composite(vsqrtps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_sqrt_round_pd(__m512d, __mmask8, __m512d, const int /*rnd*/))  /* composite(vsqrtpd) */

_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_abs_ps(__mmask16, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_abs_pd(__mmask8, __m512d))
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_abs_ps(__m512, __mmask16, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_abs_pd(__m512d, __mmask8, __m512d))

_AVX512F_(extern __m512 __cdecl _mm512_maskz_max_round_ps(__mmask16, __m512, __m512, const int /*sae*/))  /* vmaxps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_max_round_pd(__mmask8, __m512d, __m512d, const int /*sae*/))  /* vmaxpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_max_round_ps(__m512, __mmask16, __m512, __m512, const int /*sae*/))  /* composite(vmaxps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_max_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*sae*/))  /* composite(vmaxpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_min_round_ps(__mmask16, __m512, __m512, const int /*sae*/))  /* vminps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_min_round_pd(__mmask8, __m512d, __m512d, const int /*sae*/))  /* vminpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_min_round_ps(__m512, __mmask16, __m512, __m512, const int /*sae*/))  /* composite(vminps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_min_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*sae*/))  /* composite(vminpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_rcp14_ps(__mmask16, __m512))  /* vrcp14ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_rcp14_pd(__mmask8, __m512d))  /* vrcp14pd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_rcp14_ps(__m512, __mmask16, __m512))  /* composite(vrcp14ps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_rcp14_pd(__m512d, __mmask8, __m512d))  /* composite(vrcp14pd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_rsqrt14_ps(__mmask16, __m512))  /* vrsqrt14ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_rsqrt14_pd(__mmask8, __m512d))  /* vrsqrt14pd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_rsqrt14_ps(__m512, __mmask16, __m512))  /* composite(vrsqrt14ps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_rsqrt14_pd(__m512d, __mmask8, __m512d))  /* composite(vrsqrt14pd) */

_AVX512ER_(extern __m512 __cdecl _mm512_maskz_rcp28_round_ps(__mmask16, __m512, const int))
_AVX512ER_(extern __m512d __cdecl _mm512_maskz_rcp28_round_pd(__mmask8, __m512d, const int))
_AVX512ER_(extern __m512 __cdecl _mm512_mask_rcp28_round_ps(__m512, __mmask16, __m512, const int))
_AVX512ER_(extern __m512d __cdecl _mm512_mask_rcp28_round_pd(__m512d, __mmask8, __m512d, const int))

_AVX512ER_(extern __m512 __cdecl _mm512_maskz_rsqrt28_round_ps(__mmask16, __m512, const int))
_AVX512ER_(extern __m512d __cdecl _mm512_maskz_rsqrt28_round_pd(__mmask8, __m512d, const int))
_AVX512ER_(extern __m512 __cdecl _mm512_mask_rsqrt28_round_ps(__m512, __mmask16, __m512, const int))
_AVX512ER_(extern __m512d __cdecl _mm512_mask_rsqrt28_round_pd(__m512d, __mmask8, __m512d, const int))

_AVX512F_(extern __m512 __cdecl _mm512_maskz_fmadd_round_ps(__mmask16, __m512, __m512, __m512, const int /*rnd*/))  /* vfmadd132ps/vfmadd213ps/vfmadd231ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_fmadd_round_pd(__mmask8, __m512d, __m512d, __m512d, const int /*rnd*/))  /* vfmadd132pd/vfmadd213pd/vfmadd231pd */
_AVX512F_EWW_(extern __m512 __cdecl _mm512_mask3_fmadd_round_ps(__m512, __m512, __m512, __mmask16, const int /*rnd*/))
_AVX512F_EWW_(extern __m512d __cdecl _mm512_mask3_fmadd_round_pd(__m512d, __m512d, __m512d, __mmask8, const int /*rnd*/))
_AVX512F_(extern __m512 __cdecl _mm512_mask_fmadd_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* vfmadd132ps/vfmadd213ps/vfmadd231ps */
_AVX512F_(extern __m512d __cdecl _mm512_mask_fmadd_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* vfmadd132pd/vfmadd213pd/vfmadd231pd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_fmsub_round_ps(__mmask16, __m512, __m512, __m512, const int /*rnd*/))  /* vfmsub132ps/vfmsub213ps/vfmsub231ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_fmsub_round_pd(__mmask8, __m512d, __m512d, __m512d, const int /*rnd*/))  /* vfmsub132pd/vfmsub213pd/vfmsub231pd */
_AVX512F_EWW_(extern __m512 __cdecl _mm512_mask3_fmsub_round_ps(__m512, __m512, __m512, __mmask16, const int /*rnd*/))
_AVX512F_EWW_(extern __m512d __cdecl _mm512_mask3_fmsub_round_pd(__m512d, __m512d, __m512d, __mmask8, const int /*rnd*/))
_AVX512F_(extern __m512 __cdecl _mm512_mask_fmsub_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* vfmsub132ps/vfmsub213ps/vfmsub231ps */
_AVX512F_(extern __m512d __cdecl _mm512_mask_fmsub_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* vfmsub132pd/vfmsub213pd/vfmsub231pd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_fmaddsub_round_ps(__mmask16, __m512, __m512, __m512, const int /*rnd*/))  /* vfmaddsub132ps/vfmaddsub213ps/vfmaddsub231ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_fmaddsub_round_pd(__mmask8, __m512d, __m512d, __m512d, const int /*rnd*/))  /* vfmaddsub132pd/vfmaddsub213pd/vfmaddsub231pd */
_AVX512F_EWW_(extern __m512 __cdecl _mm512_mask3_fmaddsub_round_ps(__m512, __m512, __m512, __mmask16, const int /*rnd*/))
_AVX512F_EWW_(extern __m512d __cdecl _mm512_mask3_fmaddsub_round_pd(__m512d, __m512d, __m512d, __mmask8, const int /*rnd*/))
_AVX512F_(extern __m512 __cdecl _mm512_mask_fmaddsub_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* vfmaddsub132ps/vfmaddsub213ps/vfmaddsub231ps */
_AVX512F_(extern __m512d __cdecl _mm512_mask_fmaddsub_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* vfmaddsub132pd/vfmaddsub213pd/vfmaddsub231pd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_fmsubadd_round_ps(__mmask16, __m512, __m512, __m512, const int /*rnd*/))  /* vfmsubadd132ps/vfmsubadd213ps/vfmsubadd231ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_fmsubadd_round_pd(__mmask8, __m512d, __m512d, __m512d, const int /*rnd*/))  /* vfmsubadd132pd/vfmsubadd213pd/vfmsubadd231pd */
_AVX512F_EWW_(extern __m512 __cdecl _mm512_mask3_fmsubadd_round_ps(__m512, __m512, __m512, __mmask16, const int /*rnd*/))
_AVX512F_EWW_(extern __m512d __cdecl _mm512_mask3_fmsubadd_round_pd(__m512d, __m512d, __m512d, __mmask8, const int /*rnd*/))
_AVX512F_(extern __m512 __cdecl _mm512_mask_fmsubadd_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* vfmsubadd132ps/vfmsubadd213ps/vfmsubadd231ps */
_AVX512F_(extern __m512d __cdecl _mm512_mask_fmsubadd_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* vfmsubadd132pd/vfmsubadd213pd/vfmsubadd231pd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_fnmadd_round_ps(__mmask16, __m512, __m512, __m512, const int /*rnd*/))  /* vfnmadd132ps/vfnmadd213ps/vfnmadd231ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_fnmadd_round_pd(__mmask8, __m512d, __m512d, __m512d, const int /*rnd*/))  /* vfnmadd132pd/vfnmadd213pd/vfnmadd231pd */
_AVX512F_EWW_(extern __m512 __cdecl _mm512_mask3_fnmadd_round_ps(__m512, __m512, __m512, __mmask16, const int /*rnd*/))
_AVX512F_EWW_(extern __m512d __cdecl _mm512_mask3_fnmadd_round_pd(__m512d, __m512d, __m512d, __mmask8, const int /*rnd*/))
_AVX512F_(extern __m512 __cdecl _mm512_mask_fnmadd_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* vfnmadd132ps/vfnmadd213ps/vfnmadd231ps */
_AVX512F_(extern __m512d __cdecl _mm512_mask_fnmadd_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* vfnmadd132pd/vfnmadd213pd/vfnmadd231pd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_fnmsub_round_ps(__mmask16, __m512, __m512, __m512, const int /*rnd*/))  /* vfnmsub132ps/vfnmsub213ps/vfnmsub231ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_fnmsub_round_pd(__mmask8, __m512d, __m512d, __m512d, const int /*rnd*/))  /* vfnmsub132pd/vfnmsub213pd/vfnmsub231pd */
_AVX512F_EWW_(extern __m512 __cdecl _mm512_mask3_fnmsub_round_ps(__m512, __m512, __m512, __mmask16, const int /*rnd*/))
_AVX512F_EWW_(extern __m512d __cdecl _mm512_mask3_fnmsub_round_pd(__m512d, __m512d, __m512d, __mmask8, const int /*rnd*/))
_AVX512F_(extern __m512 __cdecl _mm512_mask_fnmsub_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* vfnmsub132ps/vfnmsub213ps/vfnmsub231ps */
_AVX512F_(extern __m512d __cdecl _mm512_mask_fnmsub_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* vfnmsub132pd/vfnmsub213pd/vfnmsub231pd */

_AVX512F_(extern __mmask16 __cdecl _mm512_mask_cmp_round_ps_mask(__mmask16, __m512, __m512, const int /*predicate*/, const int /*sae*/))  /* vcmpps */
_AVX512F_(extern __mmask8 __cdecl _mm512_mask_cmp_round_pd_mask(__mmask8, __m512d, __m512d, const int /*predicate*/, const int /*sae*/))  /* vcmppd */

_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_broadcast_f32x2(__mmask16, __m128))
_AVX512F_(extern __m512 __cdecl _mm512_maskz_broadcast_f32x4(__mmask16, __m128))  /* vbroadcastf32x4 */
_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_broadcast_f32x8(__mmask16, __m256))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_broadcast_f64x2(__mmask8, __m128d))
_AVX512F_(extern __m512d __cdecl _mm512_maskz_broadcast_f64x4(__mmask8, __m256d))  /* vbroadcastf64x4 */
_AVX512F_(extern __m512 __cdecl _mm512_maskz_broadcastss_ps(__mmask16, __m128))  /* vbroadcastss */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_broadcastsd_pd(__mmask8, __m128d))  /* vbroadcastsd */
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_broadcast_f32x2(__m512, __mmask16, __m128))
_AVX512F_(extern __m512 __cdecl _mm512_mask_broadcast_f32x4(__m512, __mmask16, __m128))  /* composite(vbroadcastf32x4) */
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_broadcast_f32x8(__m512, __mmask16, __m256))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_broadcast_f64x2(__m512d, __mmask8, __m128d))
_AVX512F_(extern __m512d __cdecl _mm512_mask_broadcast_f64x4(__m512d, __mmask8, __m256d))  /* composite(vbroadcastf64x4) */
_AVX512F_(extern __m512 __cdecl _mm512_mask_broadcastss_ps(__m512, __mmask16, __m128))  /* composite(vbroadcastss) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_broadcastsd_pd(__m512d, __mmask8, __m128d))  /* composite(vbroadcastsd) */

_AVX512F_(extern __m128 __cdecl _mm512_maskz_extractf32x4_ps(__mmask8, __m512, const int))  /* vextractf32x4 */
_AVX512DQ_(extern __m256 __cdecl _mm512_maskz_extractf32x8_ps(__mmask8, __m512, const int))
_AVX512DQ_(extern __m128d __cdecl _mm512_maskz_extractf64x2_pd(__mmask8, __m512d, const int))
_AVX512F_(extern __m256d __cdecl _mm512_maskz_extractf64x4_pd(__mmask8, __m512d, const int))  /* vextractf64x4 */
_AVX512F_(extern __m128 __cdecl _mm512_mask_extractf32x4_ps(__m128, __mmask8, __m512, const int))  /* composite(vextractf32x4) */
_AVX512DQ_(extern __m256 __cdecl _mm512_mask_extractf32x8_ps(__m256, __mmask8, __m512, const int))
_AVX512DQ_(extern __m128d __cdecl _mm512_mask_extractf64x2_pd(__m128d, __mmask8, __m512d, const int))
_AVX512F_(extern __m256d __cdecl _mm512_mask_extractf64x4_pd(__m256d, __mmask8, __m512d, const int))  /* composite(vextractf64x4) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_insertf32x4(__mmask16, __m512, __m128, const int))  /* vinsertf32x4 */
_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_insertf32x8(__mmask16, __m512, __m256, const int))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_insertf64x2(__mmask8, __m512d, __m128d, const int))
_AVX512F_(extern __m512d __cdecl _mm512_maskz_insertf64x4(__mmask8, __m512d, __m256d, const int))  /* vinsertf64x4 */
_AVX512F_(extern __m512 __cdecl _mm512_mask_insertf32x4(__m512, __mmask16, __m512, __m128, const int))  /* composite(vinsertf32x4) */
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_insertf32x8(__m512, __mmask16, __m512, __m256, const int))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_insertf64x2(__m512d, __mmask8, __m512d, __m128d, const int))
_AVX512F_(extern __m512d __cdecl _mm512_mask_insertf64x4(__m512d, __mmask8, __m512d, __m256d, const int))  /* composite(vinsertf64x4) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_shuffle_f32x4(__mmask16, __m512, __m512, const int))  /* vshuff32x4 */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_shuffle_f64x2(__mmask8, __m512d, __m512d, const int))  /* vshuff64x2 */
_AVX512F_(extern __m512 __cdecl _mm512_maskz_shuffle_ps(__mmask16, __m512, __m512, const int))  /* vshufps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_shuffle_pd(__mmask8, __m512d, __m512d, const int))  /* vshufpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_shuffle_f32x4(__m512, __mmask16, __m512, __m512, const int))  /* composite(vshuff32x4) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_shuffle_f64x2(__m512d, __mmask8, __m512d, __m512d, const int))  /* composite(vshuff64x2) */
_AVX512F_(extern __m512 __cdecl _mm512_mask_shuffle_ps(__m512, __mmask16, __m512, __m512, const int))  /* composite(vshufps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_shuffle_pd(__m512d, __mmask8, __m512d, __m512d, const int))  /* composite(vshufpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_mov_ps(__mmask16, __m512))  /* vmovaps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_mov_pd(__mmask8, __m512d))  /* vmovapd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_mov_ps(__m512, __mmask16, __m512))  /* composite(vmovaps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_mov_pd(__m512d, __mmask8, __m512d))  /* composite(vmovapd) */

_AVX512F_(extern __m512d __cdecl _mm512_maskz_movedup_pd(__mmask8, __m512d))  /* vmovddup */
_AVX512F_(extern __m512 __cdecl _mm512_maskz_movehdup_ps(__mmask16, __m512))  /* vmovshdup */
_AVX512F_(extern __m512 __cdecl _mm512_maskz_moveldup_ps(__mmask16, __m512))  /* vmovsldup */
_AVX512F_(extern __m512d __cdecl _mm512_mask_movedup_pd(__m512d, __mmask8, __m512d))  /* composite(vmovddup) */
_AVX512F_(extern __m512 __cdecl _mm512_mask_movehdup_ps(__m512, __mmask16, __m512))  /* composite(vmovshdup) */
_AVX512F_(extern __m512 __cdecl _mm512_mask_moveldup_ps(__m512, __mmask16, __m512))  /* composite(vmovsldup) */

_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_and_ps(__mmask16, __m512, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_and_pd(__mmask8, __m512d, __m512d))
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_and_ps(__m512, __mmask16, __m512, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_and_pd(__m512d, __mmask8, __m512d, __m512d))

_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_andnot_ps(__mmask16, __m512, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_andnot_pd(__mmask8, __m512d, __m512d))
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_andnot_ps(__m512, __mmask16, __m512, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_andnot_pd(__m512d, __mmask8, __m512d, __m512d))

_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_or_ps(__mmask16, __m512, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_or_pd(__mmask8, __m512d, __m512d))
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_or_ps(__m512, __mmask16, __m512, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_or_pd(__m512d, __mmask8, __m512d, __m512d))

_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_xor_ps(__mmask16, __m512, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_xor_pd(__mmask8, __m512d, __m512d))
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_xor_ps(__m512, __mmask16, __m512, __m512))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_xor_pd(__m512d, __mmask8, __m512d, __m512d))

_AVX512F_(extern __m512 __cdecl _mm512_mask_blend_ps(__mmask16, __m512, __m512))  /* vblendmps */
_AVX512F_(extern __m512d __cdecl _mm512_mask_blend_pd(__mmask8, __m512d, __m512d))  /* vblendmpd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_unpackhi_ps(__mmask16, __m512, __m512))  /* vunpckhps */
_AVX512F_(extern __m512 __cdecl _mm512_maskz_unpacklo_ps(__mmask16, __m512, __m512))  /* vunpcklps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_unpackhi_pd(__mmask8, __m512d, __m512d))  /* vunpckhpd */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_unpacklo_pd(__mmask8, __m512d, __m512d))  /* vunpcklpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_unpackhi_ps(__m512, __mmask16, __m512, __m512))  /* composite(vunpckhps) */
_AVX512F_(extern __m512 __cdecl _mm512_mask_unpacklo_ps(__m512, __mmask16, __m512, __m512))  /* composite(vunpcklps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_unpackhi_pd(__m512d, __mmask8, __m512d, __m512d))  /* composite(vunpckhpd) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_unpacklo_pd(__m512d, __mmask8, __m512d, __m512d))  /* composite(vunpcklpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_getexp_round_ps(__mmask16, __m512, const int /*sae*/))  /* vgetexpps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_getexp_round_pd(__mmask8, __m512d, const int /*sae*/))  /* vgetexppd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_getexp_round_ps(__m512, __mmask16, __m512, const int /*sae*/))  /* composite(vgetexpps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_getexp_round_pd(__m512d, __mmask8, __m512d, const int /*sae*/))  /* composite(vgetexppd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_getmant_round_ps(__mmask16, __m512, const int /*_MM_MANTISSA_NORM_ENUM*/, const int /*_MM_MANTISSA_SIGN_ENUM*/, const int /*sae*/))  /* vgetmantps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_getmant_round_pd(__mmask8, __m512d, const int /*_MM_MANTISSA_NORM_ENUM*/, const int /*_MM_MANTISSA_SIGN_ENUM*/, const int /*sae*/))  /* vgetmantpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_getmant_round_ps(__m512, __mmask16, __m512, const int /*_MM_MANTISSA_NORM_ENUM*/, const int /*_MM_MANTISSA_SIGN_ENUM*/, const int /*sae*/))  /* composite(vgetmantps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_getmant_round_pd(__m512d, __mmask8, __m512d, const int /*_MM_MANTISSA_NORM_ENUM*/, const int /*_MM_MANTISSA_SIGN_ENUM*/, const int /*sae*/))  /* composite(vgetmantpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_permute_ps(__mmask16, __m512, const int))  /* vpermilps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_permute_pd(__mmask8, __m512d, const int))  /* vpermilpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_permute_ps(__m512, __mmask16, __m512, const int))  /* composite(vpermilps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_permute_pd(__m512d, __mmask8, __m512d, const int))  /* composite(vpermilpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_permutevar_ps(__mmask16, __m512, __m512i))  /* vpermilps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_permutevar_pd(__mmask8, __m512d, __m512i))  /* vpermilpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_permutevar_ps(__m512, __mmask16, __m512, __m512i))  /* composite(vpermilps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_permutevar_pd(__m512d, __mmask8, __m512d, __m512i))  /* composite(vpermilpd) */

_AVX512F_(extern __m512d __cdecl _mm512_maskz_permutex_pd(__mmask8, __m512d, const int))  /* vpermpd */
_AVX512F_(extern __m512d __cdecl _mm512_mask_permutex_pd(__m512d, __mmask8, __m512d, const int))  /* composite(vpermpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_permutexvar_ps(__mmask16, __m512i, __m512))  /* vpermps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_permutexvar_pd(__mmask8, __m512i, __m512d))  /* vpermpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_permutexvar_ps(__m512, __mmask16, __m512i, __m512))  /* composite(vpermps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_permutexvar_pd(__m512d, __mmask8, __m512i, __m512d))  /* composite(vpermpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_permutex2var_ps(__mmask16, __m512, __m512i, __m512))  /* vpermt2ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_permutex2var_pd(__mmask8, __m512d, __m512i, __m512d))  /* vpermt2pd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_permutex2var_ps(__m512, __mmask16, __m512i, __m512))  /* composite(vpermt2ps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_permutex2var_pd(__m512d, __mmask8, __m512i, __m512d))  /* composite(vpermt2pd) */

_AVX512F_(extern __m512 __cdecl _mm512_mask2_permutex2var_ps(__m512, __m512i, __mmask16, __m512))  /* vpermi2ps */
_AVX512F_(extern __m512d __cdecl _mm512_mask2_permutex2var_pd(__m512d, __m512i, __mmask8, __m512d))  /* vpermi2pd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_compress_ps(__mmask16, __m512))  /* vcompressps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_compress_pd(__mmask8, __m512d))  /* vcompresspd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_compress_ps(__m512, __mmask16, __m512))  /* composite(vcompressps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_compress_pd(__m512d, __mmask8, __m512d))  /* composite(vcompresspd) */

_AVX512F_(extern void __cdecl _mm512_mask_compressstoreu_ps(void *, __mmask16, __m512))  /* vcompressps */
_AVX512F_(extern void __cdecl _mm512_mask_compressstoreu_pd(void *, __mmask8, __m512d))  /* vcompresspd */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_expand_ps(__mmask16, __m512))  /* vexpandps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_expand_pd(__mmask8, __m512d))  /* vexpandpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_expand_ps(__m512, __mmask16, __m512))  /* composite(vexpandps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_expand_pd(__m512d, __mmask8, __m512d))  /* composite(vexpandpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_expandloadu_ps(__mmask16, const void *))  /* vexpandps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_expandloadu_pd(__mmask8, const void *))  /* vexpandpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_expandloadu_ps(__m512, __mmask16, const void *))  /* composite(vexpandps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_expandloadu_pd(__m512d, __mmask8, const void *))  /* composite(vexpandpd) */

_AVX512F_EWW_(extern float __cdecl _mm512_reduce_add_ps(__m512))  /* composite */
_AVX512F_EWW_(extern double __cdecl _mm512_reduce_add_pd(__m512d))  /* composite */
_AVX512F_EWW_(extern float __cdecl _mm512_mask_reduce_add_ps(__mmask16, __m512))  /* composite */
_AVX512F_EWW_(extern double __cdecl _mm512_mask_reduce_add_pd(__mmask8, __m512d))  /* composite */

_AVX512F_EWW_(extern float __cdecl _mm512_reduce_mul_ps(__m512))  /* composite */
_AVX512F_EWW_(extern double __cdecl _mm512_reduce_mul_pd(__m512d))  /* composite */
_AVX512F_EWW_(extern float __cdecl _mm512_mask_reduce_mul_ps(__mmask16, __m512))  /* composite */
_AVX512F_EWW_(extern double __cdecl _mm512_mask_reduce_mul_pd(__mmask8, __m512d))  /* composite */

_AVX512F_EWW_(extern float __cdecl _mm512_reduce_min_ps(__m512))  /* composite */
_AVX512F_EWW_(extern double __cdecl _mm512_reduce_min_pd(__m512d))  /* composite */
_AVX512F_EWW_(extern float __cdecl _mm512_mask_reduce_min_ps(__mmask16, __m512))  /* composite */
_AVX512F_EWW_(extern double __cdecl _mm512_mask_reduce_min_pd(__mmask8, __m512d))  /* composite */

_AVX512F_EWW_(extern float __cdecl _mm512_reduce_max_ps(__m512))  /* composite */
_AVX512F_EWW_(extern double __cdecl _mm512_reduce_max_pd(__m512d))  /* composite */
_AVX512F_EWW_(extern float __cdecl _mm512_mask_reduce_max_ps(__mmask16, __m512))  /* composite */
_AVX512F_EWW_(extern double __cdecl _mm512_mask_reduce_max_pd(__mmask8, __m512d))  /* composite */

_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_reduce_round_ps(__mmask16, __m512, const int, const int))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_reduce_round_pd(__mmask8, __m512d, const int, const int))
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_reduce_round_ps(__m512, __mmask16, __m512, const int, const int))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_reduce_round_pd(__m512d, __mmask8, __m512d, const int, const int))

_AVX512F_(extern __m512 __cdecl _mm512_maskz_roundscale_round_ps(__mmask16, __m512, const int, const int))  /* vrndscaleps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_roundscale_round_pd(__mmask8, __m512d, const int, const int))  /* vrndscalepd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_roundscale_round_ps(__m512, __mmask16, __m512, const int, const int))  /* composite(vrndscaleps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_roundscale_round_pd(__m512d, __mmask8, __m512d, const int, const int))  /* composite(vrndscalepd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_scalef_round_ps(__mmask16, __m512, __m512, const int /*rnd*/))  /* vscalefps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_scalef_round_pd(__mmask8, __m512d, __m512d, const int /*rnd*/))  /* vscalefpd */
_AVX512F_(extern __m512 __cdecl _mm512_mask_scalef_round_ps(__m512, __mmask16, __m512, __m512, const int /*rnd*/))  /* composite(vscalefps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_scalef_round_pd(__m512d, __mmask8, __m512d, __m512d, const int /*rnd*/))  /* composite(vscalefpd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_fixupimm_round_ps(__mmask16, __m512, __m512, __m512i, const int /*oops*/, const int /*sae*/))  /* composite(vfixupimmps) */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_fixupimm_round_pd(__mmask8, __m512d, __m512d, __m512i, const int /*oops*/, const int /*sae*/))  /* composite(vfixupimmpd) */
_AVX512F_(extern __m512 __cdecl _mm512_mask_fixupimm_round_ps(__m512, __mmask16, __m512, __m512i, const int /*oops*/, const int /*sae*/))  /* composite(vfixupimmps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_fixupimm_round_pd(__m512d, __mmask8, __m512d, __m512i, const int /*oops*/, const int /*sae*/))  /* composite(vfixupimmpd) */

_AVX512F_(extern void __cdecl _mm512_stream_ps(void *, __m512))  /* vmovntps */
_AVX512F_(extern void __cdecl _mm512_stream_pd(void *, __m512d))  /* vmovntpd */

_AVX512ER_(extern __m512 __cdecl _mm512_maskz_exp2a23_round_ps(__mmask16, __m512, const int))
_AVX512ER_(extern __m512d __cdecl _mm512_maskz_exp2a23_round_pd(__mmask8, __m512d, const int))
_AVX512ER_(extern __m512 __cdecl _mm512_mask_exp2a23_round_ps(__m512, __mmask16, __m512, const int))
_AVX512ER_(extern __m512d __cdecl _mm512_mask_exp2a23_round_pd(__m512d, __mmask8, __m512d, const int))

_AVX512DQ_(extern __mmask16 __cdecl _mm512_mask_fpclass_ps_mask(__mmask16, __m512, const int))
_AVX512DQ_(extern __mmask8 __cdecl _mm512_mask_fpclass_pd_mask(__mmask8, __m512d, const int))

_AVX512DQ_(extern __m512 __cdecl _mm512_maskz_range_round_ps(__mmask16, __m512, __m512, const int, const int))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_range_round_pd(__mmask8, __m512d, __m512d, const int, const int))
_AVX512DQ_(extern __m512 __cdecl _mm512_mask_range_round_ps(__m512, __mmask16, __m512, __m512, const int, const int))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_range_round_pd(__m512d, __mmask8, __m512d, __m512d, const int, const int))

_AVX512F_(extern __m512 __cdecl _mm512_mask_i32gather_ps(__m512, __mmask16, __m512i, const void *, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vgatherdps */
_AVX512F_(extern __m256 __cdecl _mm512_mask_i64gather_ps(__m256, __mmask8, __m512i, const void *, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vgatherqps */
_AVX512F_(extern __m512d __cdecl _mm512_mask_i32gather_pd(__m512d, __mmask8, __m256i, const void *, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vgatherdpd */
_AVX512F_(extern __m512d __cdecl _mm512_mask_i64gather_pd(__m512d, __mmask8, __m512i, const void *, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vgatherqpd */
_AVX512F_(extern __m512 __cdecl _mm512_i32gather_ps(__m512i, const void *, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vgatherdps */
_AVX512F_(extern __m256 __cdecl _mm512_i64gather_ps(__m512i, const void *, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vgatherqps */
_AVX512F_(extern __m512d __cdecl _mm512_i32gather_pd(__m256i, const void *, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vgatherdpd */
_AVX512F_(extern __m512d __cdecl _mm512_i64gather_pd(__m512i, const void *, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vgatherqpd */

_AVX512F_(extern void __cdecl _mm512_mask_i32scatter_ps(void *, __mmask16, __m512i, __m512, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vscatterdps */
_AVX512F_(extern void __cdecl _mm512_mask_i64scatter_ps(void *, __mmask8, __m512i, __m256, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vscatterqps */
_AVX512F_(extern void __cdecl _mm512_mask_i32scatter_pd(void *, __mmask8, __m256i, __m512d, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vscatterdpd */
_AVX512F_(extern void __cdecl _mm512_mask_i64scatter_pd(void *, __mmask8, __m512i, __m512d, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vscatterqpd */
_AVX512F_(extern void __cdecl _mm512_i32scatter_ps(void *, __m512i, __m512, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vscatterdps */
_AVX512F_(extern void __cdecl _mm512_i64scatter_ps(void *, __m512i, __m256, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vscatterqps */
_AVX512F_(extern void __cdecl _mm512_i32scatter_pd(void *, __m256i, __m512d, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vscatterdpd */
_AVX512F_(extern void __cdecl _mm512_i64scatter_pd(void *, __m512i, __m512d, const int /*_MM_INDEX_SCALE_ENUM*/))  /* vscatterqpd */

_AVX512PF_(extern void __cdecl _mm512_mask_prefetch_i32gather_ps(__m512i, __mmask16, const void *, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_mask_prefetch_i64gather_ps(__m512i, __mmask8, const void *, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_mask_prefetch_i32gather_pd(__m256i, __mmask8, const void *, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_mask_prefetch_i64gather_pd(__m512i, __mmask8, const void *, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_prefetch_i32gather_ps(__m512i, const void *, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_prefetch_i64gather_ps(__m512i, const void *, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_prefetch_i32gather_pd(__m256i, const void *, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_prefetch_i64gather_pd(__m512i, const void *, const int, const int))

_AVX512PF_(extern void __cdecl _mm512_mask_prefetch_i32scatter_ps(void *, __mmask16, __m512i, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_mask_prefetch_i64scatter_ps(void *, __mmask8, __m512i, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_mask_prefetch_i32scatter_pd(void *, __mmask8, __m256i, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_mask_prefetch_i64scatter_pd(void *, __mmask8, __m512i, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_prefetch_i32scatter_ps(void *, __m512i index, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_prefetch_i64scatter_ps(void *, __m512i, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_prefetch_i32scatter_pd(void *, __m256i, const int, const int))
_AVX512PF_(extern void __cdecl _mm512_prefetch_i64scatter_pd(void *, __m512i, const int, const int))

_AVX512F_(extern __m512d __cdecl _mm512_maskz_cvtepi32_pd(__mmask8, __m256i))  /* vcvtdq2pd */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_cvtepu32_pd(__mmask8, __m256i))  /* vcvtudq2pd */
_AVX512F_(extern __m512d __cdecl _mm512_mask_cvtepi32_pd(__m512d, __mmask8, __m256i))  /* composite(vcvtdq2pd) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_cvtepu32_pd(__m512d, __mmask8, __m256i))  /* composite(vcvtudq2pd) */

_AVX512F_(extern __m512d __cdecl _mm512_mask_cvtpslo_pd(__m512d, __mmask8, __m512))  /* vcvtps2pd */
_AVX512F_(extern __m512d __cdecl _mm512_mask_cvtepi32lo_pd(__m512d, __mmask8, __m512i))  /* vcvtdq2pd */
_AVX512F_(extern __m512d __cdecl _mm512_mask_cvtepu32lo_pd(__m512d, __mmask8, __m512i))  /* vcvtudq2pd */
_AVX512F_(extern __m512d __cdecl _mm512_cvtpslo_pd(__m512))  /* vcvtps2pd */
_AVX512F_(extern __m512d __cdecl _mm512_cvtepi32lo_pd(__m512i))  /* vcvtdq2pd */
_AVX512F_(extern __m512d __cdecl _mm512_cvtepu32lo_pd(__m512i))  /* vcvtudq2pd */

_AVX512F_(extern __m256 __cdecl _mm512_maskz_cvt_roundpd_ps(__mmask8, __m512d, const int /*rnd*/))  /* vcvtpd2ps */
_AVX512F_(extern __m512d __cdecl _mm512_maskz_cvt_roundps_pd(__mmask8, __m256, const int /*rnd*/))  /* vcvtps2pd */
_AVX512F_(extern __m256 __cdecl _mm512_mask_cvt_roundpd_ps(__m256, __mmask8, __m512d, const int /*rnd*/))  /* composite(vcvtpd2ps) */
_AVX512F_(extern __m512d __cdecl _mm512_mask_cvt_roundps_pd(__m512d, __mmask8, __m256, const int /*rnd*/))  /* composite(vcvtps2pd) */

_AVX512F_(extern __m512 __cdecl _mm512_maskz_cvt_roundepi32_ps(__mmask16, __m512i, const int /*rnd*/))  /* vcvtdq2ps */
_AVX512F_(extern __m512 __cdecl _mm512_maskz_cvt_roundepu32_ps(__mmask16, __m512i, const int /*rnd*/))  /* vcvtudq2ps */
_AVX512DQ_(extern __m256 __cdecl _mm512_maskz_cvt_roundepi64_ps(__mmask8, __m512i, const int /*rnd*/))
_AVX512DQ_(extern __m256 __cdecl _mm512_maskz_cvt_roundepu64_ps(__mmask8, __m512i, const int /*rnd*/))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_cvt_roundepi64_pd(__mmask8, __m512i, const int /*rnd*/))
_AVX512DQ_(extern __m512d __cdecl _mm512_maskz_cvt_roundepu64_pd(__mmask8, __m512i, const int /*rnd*/))
/* _AVX512F_(extern __m512 __cdecl _mm512_maskz_cvt_roundph_ps(__mmask16, __m256i, const int)) */
_AVX512F_(extern __m512 __cdecl _mm512_mask_cvt_roundepi32_ps(__m512, __mmask16, __m512i, const int /*rnd*/))  /* composite(vcvtdq2ps) */
_AVX512F_(extern __m512 __cdecl _mm512_mask_cvt_roundepu32_ps(__m512, __mmask16, __m512i, const int /*rnd*/))  /* composite(vcvtudq2ps) */
_AVX512DQ_(extern __m256 __cdecl _mm512_mask_cvt_roundepi64_ps(__m256, __mmask8, __m512i, const int /*rnd*/))
_AVX512DQ_(extern __m256 __cdecl _mm512_mask_cvt_roundepu64_ps(__m256, __mmask8, __m512i, const int /*rnd*/))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_cvt_roundepi64_pd(__m512d, __mmask8, __m512i, const int /*rnd*/))
_AVX512DQ_(extern __m512d __cdecl _mm512_mask_cvt_roundepu64_pd(__m512d, __mmask8, __m512i, const int /*rnd*/))
/* _AVX512F_(extern __m512 __cdecl _mm512_mask_cvt_roundph_ps(__m512, __mmask16, __m256i, const int)) */

#define _mm512_setzero()       _mm512_setzero_ps()
#define _mm512_undefined()     _mm512_setzero()
#define _mm512_undefined_pd()  _mm512_setzero_pd()
#define _mm512_undefined_ps()  _mm512_setzero_ps()
#define _mm512_undefined_epi32()  _mm512_castps_si512(_mm512_undefined())

#define _mm512_set4_ps(a,b,c,d) \
    _mm512_set_ps((a),(b),(c),(d), (a),(b),(c),(d), (a),(b),(c),(d), (a),(b),(c),(d))
#define _mm512_set4_pd(a,b,c,d) \
    _mm512_set_pd((a),(b),(c),(d), (a),(b),(c),(d))

#define _mm512_setr_ps(n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16) \
    _mm512_set_ps((n16),(n15),(n14),(n13),(n12),(n11),(n10),(n9),(n8),(n7),(n6),(n5),(n4),(n3),(n2),(n1))
#define _mm512_setr_pd(n1,n2,n3,n4,n5,n6,n7,n8) \
    _mm512_set_pd((n8),(n7),(n6),(n5),(n4),(n3),(n2),(n1))

#define _mm512_set_16to16_ps(n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16) \
    _mm512_set_ps((n1),(n2),(n3),(n4),(n5),(n6),(n7),(n8),(n9),(n10),(n11),(n12),(n13),(n14),(n15),(n16))
#define _mm512_set_8to8_pd(n1,n2,n3,n4,n5,n6,n7,n8) \
    _mm512_set_pd((n1),(n2),(n3),(n4),(n5),(n6),(n7),(n8))

#define _mm512_setr4_ps(a,b,c,d)      _mm512_set4_ps((d),(c),(b),(a))
#define _mm512_setr4_pd(a,b,c,d)      _mm512_set4_pd((d),(c),(b),(a))
#define _mm512_set_4to16_ps(a,b,c,d)  _mm512_set4_ps((d),(c),(b),(a))
#define _mm512_set_4to8_pd(a,b,c,d)   _mm512_set4_pd((d),(c),(b),(a))

#define _mm512_set_1to16_ps(x)  _mm512_set1_ps((x))
#define _mm512_set_1to8_pd(x)   _mm512_set1_pd((x))

#define _mm512_load_ps(addr)   _mm512_maskz_load_ps(_MM_K0_REG16, (addr))
#define _mm512_load_pd(addr)   _mm512_maskz_load_pd(_MM_K0_REG8, (addr))
#define _mm512_loadu_ps(addr)  _mm512_maskz_loadu_ps(_MM_K0_REG16, (addr))
#define _mm512_loadu_pd(addr)  _mm512_maskz_loadu_pd(_MM_K0_REG8, (addr))

#define _mm512_store_ps(addr,v)  _mm512_mask_store_ps((addr), _MM_K0_REG16, (v))
#define _mm512_store_pd(addr,v)  _mm512_mask_store_pd((addr), _MM_K0_REG8, (v))

#define _mm512_maskz_add_ps(k1,v2,v3)    _mm512_maskz_add_round_ps((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_add_pd(k1,v2,v3)    _mm512_maskz_add_round_pd((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_add_ps(v1,k2,v3,v4)  _mm512_mask_add_round_ps((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_add_pd(v1,k2,v3,v4)  _mm512_mask_add_round_pd((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_add_round_ps(v1,v2,e3)    _mm512_maskz_add_round_ps(_MM_K0_REG16, (v1), (v2), (e3))
#define _mm512_add_round_pd(v1,v2,e3)    _mm512_maskz_add_round_pd(_MM_K0_REG8, (v1), (v2), (e3))
#define _mm512_add_ps(v1,v2)             _mm512_maskz_add_round_ps(_MM_K0_REG16, (v1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_add_pd(v1,v2)             _mm512_maskz_add_round_pd(_MM_K0_REG8, (v1), (v2), _MM_FROUND_CUR_DIRECTION)

#define _mm512_maskz_sub_ps(k1,v2,v3)    _mm512_maskz_sub_round_ps((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_sub_pd(k1,v2,v3)    _mm512_maskz_sub_round_pd((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_sub_ps(v1,k2,v3,v4)  _mm512_mask_sub_round_ps((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_sub_pd(v1,k2,v3,v4)  _mm512_mask_sub_round_pd((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_sub_round_ps(v1,v2,e3)    _mm512_maskz_sub_round_ps(_MM_K0_REG16, (v1), (v2), (e3))
#define _mm512_sub_round_pd(v1,v2,e3)    _mm512_maskz_sub_round_pd(_MM_K0_REG8, (v1), (v2), (e3))
#define _mm512_sub_ps(v1,v2)             _mm512_maskz_sub_round_ps(_MM_K0_REG16, (v1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_sub_pd(v1,v2)             _mm512_maskz_sub_round_pd(_MM_K0_REG8, (v1), (v2), _MM_FROUND_CUR_DIRECTION)

#define _mm512_maskz_mul_ps(k1,v2,v3)    _mm512_maskz_mul_round_ps((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_mul_pd(k1,v2,v3)    _mm512_maskz_mul_round_pd((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_mul_ps(v1,k2,v3,v4)  _mm512_mask_mul_round_ps((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_mul_pd(v1,k2,v3,v4)  _mm512_mask_mul_round_pd((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mul_round_ps(v1,v2,e3)    _mm512_maskz_mul_round_ps(_MM_K0_REG16, (v1), (v2), (e3))
#define _mm512_mul_round_pd(v1,v2,e3)    _mm512_maskz_mul_round_pd(_MM_K0_REG8, (v1), (v2), (e3))
#define _mm512_mul_ps(v1,v2)             _mm512_maskz_mul_round_ps(_MM_K0_REG16, (v1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mul_pd(v1,v2)             _mm512_maskz_mul_round_pd(_MM_K0_REG8, (v1), (v2), _MM_FROUND_CUR_DIRECTION)

#define _mm512_maskz_div_ps(k1,v2,v3)    _mm512_maskz_div_round_ps((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_div_pd(k1,v2,v3)    _mm512_maskz_div_round_pd((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_div_ps(v1,k2,v3,v4)  _mm512_mask_div_round_ps((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_div_pd(v1,k2,v3,v4)  _mm512_mask_div_round_pd((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_div_round_ps(v1,v2,e3)    _mm512_maskz_div_round_ps(_MM_K0_REG16, (v1), (v2), (e3))
#define _mm512_div_round_pd(v1,v2,e3)    _mm512_maskz_div_round_pd(_MM_K0_REG8, (v1), (v2), (e3))
#define _mm512_div_ps(v1,v2)             _mm512_maskz_div_round_ps(_MM_K0_REG16, (v1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_div_pd(v1,v2)             _mm512_maskz_div_round_pd(_MM_K0_REG8, (v1), (v2), _MM_FROUND_CUR_DIRECTION)

#define _mm512_maskz_sqrt_ps(k1,v1)    _mm512_maskz_sqrt_round_ps((k1), (v1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_sqrt_pd(k1,v1)    _mm512_maskz_sqrt_round_pd((k1), (v1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_sqrt_ps(v1,k2,v2)  _mm512_mask_sqrt_round_ps(v1, k2, v2, _MM_FROUND_CUR_DIRECTION);
#define _mm512_mask_sqrt_pd(v1,k2,v2)  _mm512_mask_sqrt_round_pd(v1, k2, v2, _MM_FROUND_CUR_DIRECTION);
#define _mm512_sqrt_round_ps(v1,e2)    _mm512_maskz_sqrt_round_ps(_MM_K0_REG16, (v1), e2)
#define _mm512_sqrt_round_pd(v1,e2)    _mm512_maskz_sqrt_round_pd(_MM_K0_REG8, (v1), e2)
#define _mm512_sqrt_ps(v1)             _mm512_maskz_sqrt_round_ps(_MM_K0_REG16, (v1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_sqrt_pd(v1)             _mm512_maskz_sqrt_round_pd(_MM_K0_REG8, (v1), _MM_FROUND_CUR_DIRECTION)

/* #define _mm512_abs_ps(v1)  _mm512_maskz_abs_ps(_MM_K0_REG16, (v1)) */
/* #define _mm512_abs_pd(v1)  _mm512_maskz_abs_pd(_MM_K0_REG8, (v1)) */

#define _mm512_maskz_max_ps(k1,v2,v3)    _mm512_maskz_max_round_ps((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_max_pd(k1,v2,v3)    _mm512_maskz_max_round_pd((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_max_ps(v1,k2,v3,v4)  _mm512_mask_max_round_ps((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_max_pd(v1,k2,v3,v4)  _mm512_mask_max_round_pd((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_max_round_ps(v1,v2,e3)    _mm512_maskz_max_round_ps(_MM_K0_REG16, (v1), (v2), e3)
#define _mm512_max_round_pd(v1,v2,e3)    _mm512_maskz_max_round_pd(_MM_K0_REG8, (v1), (v2), e3)
#define _mm512_max_ps(v1,v2)             _mm512_maskz_max_round_ps(_MM_K0_REG16, (v1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_max_pd(v1,v2)             _mm512_maskz_max_round_pd(_MM_K0_REG8, (v1), (v2), _MM_FROUND_CUR_DIRECTION)

#define _mm512_maskz_min_ps(k1,v2,v3)    _mm512_maskz_min_round_ps((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_min_pd(k1,v2,v3)    _mm512_maskz_min_round_pd((k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_min_ps(v1,k2,v3,v4)  _mm512_mask_min_round_ps((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_min_pd(v1,k2,v3,v4)  _mm512_mask_min_round_pd((v1), (k2), (v3), (v4), _MM_FROUND_CUR_DIRECTION)
#define _mm512_min_round_ps(v1,v2,e3)    _mm512_maskz_min_round_ps(_MM_K0_REG16, (v1), (v2), e3)
#define _mm512_min_round_pd(v1,v2,e3)    _mm512_maskz_min_round_pd(_MM_K0_REG8, (v1), (v2), e3)
#define _mm512_min_ps(v1,v2)             _mm512_maskz_min_round_ps(_MM_K0_REG16, (v1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_min_pd(v1,v2)             _mm512_maskz_min_round_pd(_MM_K0_REG8, (v1), (v2), _MM_FROUND_CUR_DIRECTION)

#define _mm512_rcp14_ps(v1)  _mm512_maskz_rcp14_ps(_MM_K0_REG16, v1);
#define _mm512_rcp14_pd(v1)  _mm512_maskz_rcp14_pd(_MM_K0_REG8, v1);

#define _mm512_rsqrt14_ps(v1)  _mm512_maskz_rsqrt14_ps(_MM_K0_REG16, v1);
#define _mm512_rsqrt14_pd(v1)  _mm512_maskz_rsqrt14_pd(_MM_K0_REG8, v1);

/* #define _mm512_maskz_rcp28_ps(k1,v1)    _mm512_maskz_rcp28_round_ps((k1), (v1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_rcp28_pd(k1,v1)    _mm512_maskz_rcp28_round_pd((k1), (v1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_rcp28_ps(v1,k1,v2)  _mm512_mask_rcp28_round_ps((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_rcp28_pd(v1,k1,v2)  _mm512_mask_rcp28_round_pd((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_rcp28_round_ps(v1,e1)    _mm512_maskz_rcp28_round_ps(_MM_K0_REG16, (v1), (e1)) */
/* #define _mm512_rcp28_round_pd(v1,e1)    _mm512_maskz_rcp28_round_pd(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_rcp28_ps(v1)             _mm512_maskz_rcp28_ps(_MM_K0_REG16, (v1)) */
/* #define _mm512_rcp28_pd(v1)             _mm512_maskz_rcp28_pd(_MM_K0_REG8, (v1)) */

/* #define _mm512_maskz_rsqrt28_ps(k1,v1)    _mm512_maskz_rsqrt28_round_ps((k1), (v1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_rsqrt28_pd(k1,v1)    _mm512_maskz_rsqrt28_round_pd((k1), (v1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_rsqrt28_ps(v1,k1,v2)  _mm512_mask_rsqrt28_round_ps((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_rsqrt28_pd(v1,k1,v2)  _mm512_mask_rsqrt28_round_pd((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_rsqrt28_round_ps(v1,e1)    _mm512_maskz_rsqrt28_round_ps(_MM_K0_REG16, (v1), (e1)) */
/* #define _mm512_rsqrt28_round_pd(v1,e1)    _mm512_maskz_rsqrt28_round_pd(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_rsqrt28_ps(v1)             _mm512_maskz_rsqrt28_ps(_MM_K0_REG16, (v1)) */
/* #define _mm512_rsqrt28_pd(v1)             _mm512_maskz_rsqrt28_pd(_MM_K0_REG8, (v1)) */

#define _mm512_maskz_fmadd_ps(k1,v1,v2,v3)  _mm512_maskz_fmadd_round_ps((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_fmadd_pd(k1,v1,v2,v3)  _mm512_maskz_fmadd_round_pd((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fmadd_ps(v1,k1,v2,v3)   _mm512_mask_fmadd_round_ps((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fmadd_pd(v1,k1,v2,v3)   _mm512_mask_fmadd_round_pd((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fmadd_round_ps(v1,v2,v3,e4)  _mm512_maskz_fmadd_round_ps(_MM_K0_REG16, (v1), (v2), (v3), (e4))
#define _mm512_fmadd_round_pd(v1,v2,v3,e4)  _mm512_maskz_fmadd_round_pd(_MM_K0_REG8, (v1), (v2), (v3), (e4))
#define _mm512_fmadd_ps(v1,v2,v3)           _mm512_fmadd_round_ps((v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fmadd_pd(v1,v2,v3)           _mm512_fmadd_round_pd((v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)

#define _mm512_maskz_fmsub_ps(k1,v1,v2,v3)  _mm512_maskz_fmsub_round_ps((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_fmsub_pd(k1,v1,v2,v3)  _mm512_maskz_fmsub_round_pd((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fmsub_ps(v1,k1,v2,v3)   _mm512_mask_fmsub_round_ps((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fmsub_pd(v1,k1,v2,v3)   _mm512_mask_fmsub_round_pd((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fmsub_round_ps(v1,v2,v3,e4)  _mm512_maskz_fmsub_round_ps(_MM_K0_REG16, (v1), (v2), (v3), (e4))
#define _mm512_fmsub_round_pd(v1,v2,v3,e4)  _mm512_maskz_fmsub_round_pd(_MM_K0_REG8, (v1), (v2), (v3), (e4))
#define _mm512_fmsub_ps(v1,v2,v3)           _mm512_fmsub_round_ps((v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fmsub_pd(v1,v2,v3)           _mm512_fmsub_round_pd((v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)

#define _mm512_maskz_fnmadd_ps(k1,v1,v2,v3)  _mm512_maskz_fnmadd_round_ps((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_fnmadd_pd(k1,v1,v2,v3)  _mm512_maskz_fnmadd_round_pd((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fnmadd_ps(v1,k1,v2,v3)   _mm512_mask_fnmadd_round_ps((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fnmadd_pd(v1,k1,v2,v3)   _mm512_mask_fnmadd_round_pd((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fnmadd_round_ps(v1,v2,v3,e4)  _mm512_maskz_fnmadd_round_ps(_MM_K0_REG16, (v1), (v2), (v3), (e4))
#define _mm512_fnmadd_round_pd(v1,v2,v3,e4)  _mm512_maskz_fnmadd_round_pd(_MM_K0_REG8, (v1), (v2), (v3), (e4))
#define _mm512_fnmadd_ps(v1,v2,v3)           _mm512_fnmadd_round_ps((v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fnmadd_pd(v1,v2,v3)           _mm512_fnmadd_round_pd((v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)

#define _mm512_maskz_fnmsub_ps(k1,v1,v2,v3)  _mm512_maskz_fnmsub_round_ps((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_fnmsub_pd(k1,v1,v2,v3)  _mm512_maskz_fnmsub_round_pd((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fnmsub_ps(v1,k1,v2,v3)   _mm512_mask_fnmsub_round_ps((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fnmsub_pd(v1,k1,v2,v3)   _mm512_mask_fnmsub_round_pd((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fnmsub_round_ps(v1,v2,v3,e4)  _mm512_maskz_fnmsub_round_ps(_MM_K0_REG16, (v1), (v2), (v3), (e4))
#define _mm512_fnmsub_round_pd(v1,v2,v3,e4)  _mm512_maskz_fnmsub_round_pd(_MM_K0_REG8, (v1), (v2), (v3), (e4))
#define _mm512_fnmsub_ps(v1,v2,v3)           _mm512_fnmsub_round_ps((v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fnmsub_pd(v1,v2,v3)           _mm512_fnmsub_round_pd((v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)

#define _mm512_mask3_fmadd_ps(v1,v2,v3,k3)     _mm512_mask3_fmadd_round_ps((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fmadd_pd(v1,v2,v3,k3)     _mm512_mask3_fmadd_round_pd((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fmsub_ps(v1,v2,v3,k3)     _mm512_mask3_fmsub_round_ps((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fmsub_pd(v1,v2,v3,k3)     _mm512_mask3_fmsub_round_pd((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fnmadd_ps(v1,v2,v3,k3)    _mm512_mask3_fnmadd_round_ps((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fnmadd_pd(v1,v2,v3,k3)    _mm512_mask3_fnmadd_round_pd((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fnmsub_ps(v1,v2,v3,k3)    _mm512_mask3_fnmsub_round_ps((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fnmsub_pd(v1,v2,v3,k3)    _mm512_mask3_fnmsub_round_pd((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fmaddsub_ps(v1,v2,v3,k3)  _mm512_mask3_fmaddsub_round_ps((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fmaddsub_pd(v1,v2,v3,k3)  _mm512_mask3_fmaddsub_round_pd((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fmsubadd_ps(v1,v2,v3,k3)  _mm512_mask3_fmsubadd_round_ps((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask3_fmsubadd_pd(v1,v2,v3,k3)  _mm512_mask3_fmsubadd_round_pd((v1), (v2), (v3), (k3), _MM_FROUND_CUR_DIRECTION)

#define _mm512_maskz_fmaddsub_ps(k1,v1,v2,v3)  _mm512_maskz_fmaddsub_round_ps((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_fmaddsub_pd(k1,v1,v2,v3)  _mm512_maskz_fmaddsub_round_pd((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_fmsubadd_ps(k1,v1,v2,v3)  _mm512_maskz_fmsubadd_round_ps((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_fmsubadd_pd(k1,v1,v2,v3)  _mm512_maskz_fmsubadd_round_pd((k1), (v1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fmaddsub_ps(v1,k1,v2,v3)   _mm512_mask_fmaddsub_round_ps((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fmaddsub_pd(v1,k1,v2,v3)   _mm512_mask_fmaddsub_round_pd((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fmsubadd_ps(v1,k1,v2,v3)   _mm512_mask_fmsubadd_round_ps((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_fmsubadd_pd(v1,k1,v2,v3)   _mm512_mask_fmsubadd_round_pd((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fmaddsub_round_ps(v1,v2,v3,e1)  _mm512_maskz_fmaddsub_round_ps(_MM_K0_REG16, (v1), (v2), (v3), (e1))
#define _mm512_fmaddsub_ps(v1,v2,v3)           _mm512_maskz_fmaddsub_ps(_MM_K0_REG16, (v1), (v2), (v3))
#define _mm512_fmaddsub_round_pd(v1,v2,v3,e1)  _mm512_maskz_fmaddsub_round_pd(_MM_K0_REG8, (v1), (v2), (v3), (e1))
#define _mm512_fmaddsub_pd(v1,v2,v3)           _mm512_maskz_fmaddsub_pd(_MM_K0_REG8, (v1), (v2), (v3))
#define _mm512_fmsubadd_round_ps(v1,v2,v3,e1)  _mm512_maskz_fmsubadd_round_ps(_MM_K0_REG16, (v1), (v2), (v3), (e1))
#define _mm512_fmsubadd_ps(v1,v2,v3)           _mm512_maskz_fmsubadd_ps(_MM_K0_REG16, (v1), (v2), (v3))
#define _mm512_fmsubadd_round_pd(v1,v2,v3,e1)  _mm512_maskz_fmsubadd_round_pd(_MM_K0_REG8, (v1), (v2), (v3), (e1))
#define _mm512_fmsubadd_pd(v1,v2,v3)           _mm512_maskz_fmsubadd_pd(_MM_K0_REG8, (v1), (v2), (v3))

#define _mm512_mask_cmp_ps_mask(k1,v2,v3,i4)   _mm512_mask_cmp_round_ps_mask(k1, v2, v3, i4, _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_cmp_pd_mask(k1,v2,v3,i4)   _mm512_mask_cmp_round_pd_mask(k1, v2, v3, i4, _MM_FROUND_CUR_DIRECTION)
#define _mm512_cmp_round_ps_mask(v1,v2,i3,e4)  _mm512_mask_cmp_round_ps_mask(_MM_K0_REG16, v1, v2, i3, e4)
#define _mm512_cmp_round_pd_mask(v1,v2,i3,e4)  _mm512_mask_cmp_round_pd_mask(_MM_K0_REG8, v1, v2, i3, e4)
#define _mm512_cmp_ps_mask(v1,v2,i3)           _mm512_mask_cmp_round_ps_mask(_MM_K0_REG16, v1, v2, i3, _MM_FROUND_CUR_DIRECTION)
#define _mm512_cmp_pd_mask(v1,v2,i3)           _mm512_mask_cmp_round_pd_mask(_MM_K0_REG8, v1, v2, i3, _MM_FROUND_CUR_DIRECTION)

#define _mm512_cmpeq_ps_mask(v1,v2)     _mm512_cmp_ps_mask((v1), (v2), _CMP_EQ_OQ)
#define _mm512_cmpneq_ps_mask(v1,v2)    _mm512_cmp_ps_mask((v1), (v2), _CMP_NEQ_UQ)
#define _mm512_cmplt_ps_mask(v1,v2)     _mm512_cmp_ps_mask((v1), (v2), _CMP_LT_OS)
#define _mm512_cmple_ps_mask(v1,v2)     _mm512_cmp_ps_mask((v1), (v2), _CMP_LE_OS)
#define _mm512_cmpnlt_ps_mask(v1,v2)    _mm512_cmp_ps_mask((v1), (v2), _CMP_NLT_US)
#define _mm512_cmpnle_ps_mask(v1,v2)    _mm512_cmp_ps_mask((v1), (v2), _CMP_NLE_US)
#define _mm512_cmpord_ps_mask(v1,v2)    _mm512_cmp_ps_mask((v1), (v2), _CMP_ORD_Q)
#define _mm512_cmpunord_ps_mask(v1,v2)  _mm512_cmp_ps_mask((v1), (v2), _CMP_UNORD_Q)

#define _mm512_mask_cmpeq_ps_mask(k1,v1,v2)     _mm512_mask_cmp_ps_mask((k1), (v1), (v2), _CMP_EQ_OQ)
#define _mm512_mask_cmpneq_ps_mask(k1,v1,v2)    _mm512_mask_cmp_ps_mask((k1), (v1), (v2), _CMP_NEQ_UQ)
#define _mm512_mask_cmplt_ps_mask(k1,v1,v2)     _mm512_mask_cmp_ps_mask((k1), (v1), (v2), _CMP_LT_OS)
#define _mm512_mask_cmple_ps_mask(k1,v1,v2)     _mm512_mask_cmp_ps_mask((k1), (v1), (v2), _CMP_LE_OS)
#define _mm512_mask_cmpnlt_ps_mask(k1,v1,v2)    _mm512_mask_cmp_ps_mask((k1), (v1), (v2), _CMP_NLT_US)
#define _mm512_mask_cmpnle_ps_mask(k1,v1,v2)    _mm512_mask_cmp_ps_mask((k1), (v1), (v2), _CMP_NLE_US)
#define _mm512_mask_cmpord_ps_mask(k1,v1,v2)    _mm512_mask_cmp_ps_mask((k1), (v1), (v2), _CMP_ORD_Q)
#define _mm512_mask_cmpunord_ps_mask(k1,v1,v2)  _mm512_mask_cmp_ps_mask((k1), (v1), (v2), _CMP_UNORD_Q)

#define _mm512_cmpeq_pd_mask(v1,v2)     _mm512_cmp_pd_mask((v1), (v2), _CMP_EQ_OQ)
#define _mm512_cmpneq_pd_mask(v1,v2)    _mm512_cmp_pd_mask((v1), (v2), _CMP_NEQ_UQ)
#define _mm512_cmplt_pd_mask(v1,v2)     _mm512_cmp_pd_mask((v1), (v2), _CMP_LT_OS)
#define _mm512_cmple_pd_mask(v1,v2)     _mm512_cmp_pd_mask((v1), (v2), _CMP_LE_OS)
#define _mm512_cmpnlt_pd_mask(v1,v2)    _mm512_cmp_pd_mask((v1), (v2), _CMP_NLT_US)
#define _mm512_cmpnle_pd_mask(v1,v2)    _mm512_cmp_pd_mask((v1), (v2), _CMP_NLE_US)
#define _mm512_cmpord_pd_mask(v1,v2)    _mm512_cmp_pd_mask((v1), (v2), _CMP_ORD_Q)
#define _mm512_cmpunord_pd_mask(v1,v2)  _mm512_cmp_pd_mask((v1), (v2), _CMP_UNORD_Q)

#define _mm512_mask_cmpeq_pd_mask(k1,v1,v2)     _mm512_mask_cmp_pd_mask((k1), (v1), (v2), _CMP_EQ_OQ)
#define _mm512_mask_cmpneq_pd_mask(k1,v1,v2)    _mm512_mask_cmp_pd_mask((k1), (v1), (v2), _CMP_NEQ_UQ)
#define _mm512_mask_cmplt_pd_mask(k1,v1,v2)     _mm512_mask_cmp_pd_mask((k1), (v1), (v2), _CMP_LT_OS)
#define _mm512_mask_cmple_pd_mask(k1,v1,v2)     _mm512_mask_cmp_pd_mask((k1), (v1), (v2), _CMP_LE_OS)
#define _mm512_mask_cmpnlt_pd_mask(k1,v1,v2)    _mm512_mask_cmp_pd_mask((k1), (v1), (v2), _CMP_NLT_US)
#define _mm512_mask_cmpnle_pd_mask(k1,v1,v2)    _mm512_mask_cmp_pd_mask((k1), (v1), (v2), _CMP_NLE_US)
#define _mm512_mask_cmpord_pd_mask(k1,v1,v2)    _mm512_mask_cmp_pd_mask((k1), (v1), (v2), _CMP_ORD_Q)
#define _mm512_mask_cmpunord_pd_mask(k1,v1,v2)  _mm512_mask_cmp_pd_mask((k1), (v1), (v2), _CMP_UNORD_Q)

/* #define _mm512_broadcast_f32x2(v1)  _mm512_maskz_broadcast_f32x2(_MM_K0_REG16, (v1)) */
#define _mm512_broadcast_f32x4(v1)  _mm512_maskz_broadcast_f32x4(_MM_K0_REG16, (v1))
/* #define _mm512_broadcast_f32x8(v1)  _mm512_maskz_broadcast_f32x8(_MM_K0_REG16, (v1)) */
/* #define _mm512_broadcast_f64x2(v1)  _mm512_maskz_broadcast_f64x2(_MM_K0_REG8, (v1)) */
#define _mm512_broadcast_f64x4(v1)  _mm512_maskz_broadcast_f64x4(_MM_K0_REG8, (v1))
#define _mm512_broadcastsd_pd(v1)   _mm512_maskz_broadcastsd_pd(_MM_K0_REG8, (v1))
#define _mm512_broadcastss_ps(v1)   _mm512_maskz_broadcastss_ps(_MM_K0_REG16, (v1))

#define _mm512_extractf32x4_ps(v1,e2)  _mm512_maskz_extractf32x4_ps(_MM_K0_REG8, (v1), (e2))
/* #define _mm512_extractf32x8_ps(v1,e2)  _mm512_maskz_extractf32x8_ps(_MM_K0_REG8, (v1), (e2)) */
/* #define _mm512_extractf64x2_pd(v1,e2)  _mm512_maskz_extractf64x2_pd(_MM_K0_REG8, (v1), (e2)) */
#define _mm512_extractf64x4_pd(v1,e2)  _mm512_maskz_extractf64x4_pd(_MM_K0_REG8, (v1), (e2))

#define _mm512_insertf32x4(v1,v2,e3)  _mm512_maskz_insertf32x4(_MM_K0_REG16, (v1), (v2), (e3))
/* #define _mm512_insertf32x8(v1,v2,e3)  _mm512_maskz_insertf32x8(_MM_K0_REG16, (v1), (v2), (e3)) */
/* #define _mm512_insertf64x2(v1,v2,e3)  _mm512_maskz_insertf64x2(_MM_K0_REG8, (v1), (v2), (e3)) */
#define _mm512_insertf64x4(v1,v2,e3)  _mm512_maskz_insertf64x4(_MM_K0_REG8, (v1), (v2), (e3))

#define _mm512_shuffle_f32x4(v1,v2,e3)  _mm512_maskz_shuffle_f32x4(_MM_K0_REG16, (v1), (v2), (e3))
#define _mm512_shuffle_f64x2(v1,v2,e3)  _mm512_maskz_shuffle_f64x2(_MM_K0_REG8, (v1), (v2), (e3))
#define _mm512_shuffle_pd(v1,v2,e3)     _mm512_maskz_shuffle_pd(_MM_K0_REG8, (v1), (v2), (e3))
#define _mm512_shuffle_ps(v1,v2,e3)     _mm512_maskz_shuffle_ps(_MM_K0_REG16, (v1), (v2), (e3))

#define _mm512_movedup_pd(v1)   _mm512_maskz_movedup_pd(_MM_K0_REG8, (v1))
#define _mm512_movehdup_ps(v1)  _mm512_maskz_movehdup_ps(_MM_K0_REG16, (v1))
#define _mm512_moveldup_ps(v1)  _mm512_maskz_moveldup_ps(_MM_K0_REG16, (v1))

/* #define _mm512_and_ps(v1,v2)  _mm512_maskz_and_ps(_MM_K0_REG16, (v1), (v2)) */
/* #define _mm512_and_pd(v1,v2)  _mm512_maskz_and_pd(_MM_K0_REG8, (v1), (v2)) */

/* #define _mm512_andnot_ps(v1,v2)  _mm512_maskz_andnot_ps(_MM_K0_REG16, (v1), (v2)) */
/* #define _mm512_andnot_pd(v1,v2)  _mm512_maskz_andnot_pd(_MM_K0_REG8, (v1), (v2)) */

/* #define _mm512_or_ps(v1,v2)  _mm512_maskz_or_ps(_MM_K0_REG16, (v1), (v2)) */
/* #define _mm512_or_pd(v1,v2)  _mm512_maskz_or_pd(_MM_K0_REG8, (v1), (v2)) */

/* #define _mm512_xor_ps(v1,v2)  _mm512_maskz_xor_ps(_MM_K0_REG16, (v1), (v2)) */
/* #define _mm512_xor_pd(v1,v2)  _mm512_maskz_xor_pd(_MM_K0_REG8, (v1), (v2)) */

#define _mm512_unpackhi_pd(v1,v2)     _mm512_maskz_unpackhi_pd(_MM_K0_REG8, (v1), (v2))
#define _mm512_unpackhi_ps(v1,v2)     _mm512_maskz_unpackhi_ps(_MM_K0_REG16, (v1), (v2))
#define _mm512_unpacklo_pd(v1,v2)     _mm512_maskz_unpacklo_pd(_MM_K0_REG8, (v1), (v2))
#define _mm512_unpacklo_ps(v1,v2)     _mm512_maskz_unpacklo_ps(_MM_K0_REG16, (v1), (v2))

#define _mm512_mask_getexp_ps(v1,k1,v2)  _mm512_mask_getexp_round_ps((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_getexp_ps(k1,v1)    _mm512_maskz_getexp_round_ps((k1), (v1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_getexp_round_ps(v1,e1)    _mm512_maskz_getexp_round_ps(_MM_K0_REG16, (v1), (e1))
#define _mm512_getexp_ps(v1)             _mm512_maskz_getexp_ps(_MM_K0_REG16, (v1))
#define _mm512_mask_getexp_pd(v1,k1,v2)  _mm512_mask_getexp_round_pd((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_getexp_pd(k1,v1)    _mm512_maskz_getexp_round_pd((k1), (v1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_getexp_round_pd(v1,e1)    _mm512_maskz_getexp_round_pd(_MM_K0_REG8, (v1), (e1))
#define _mm512_getexp_pd(v1)             _mm512_maskz_getexp_pd(_MM_K0_REG8, (v1))

#define _mm512_mask_getmant_ps(v1,k1,v2,e1,e2)  _mm512_mask_getmant_round_ps((v1), (k1), (v2), (e1), (e2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_getmant_ps(k1,v1,e1,e2)    _mm512_maskz_getmant_round_ps((k1), (v1), (e1), (e2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_getmant_round_ps(v1,e1,e2,e3)    _mm512_maskz_getmant_round_ps(_MM_K0_REG16, (v1), (e1), (e2), (e3))
#define _mm512_getmant_ps(v1,e1,e2)             _mm512_maskz_getmant_ps(_MM_K0_REG16, (v1), (e1), (e2))
#define _mm512_mask_getmant_pd(v1,k1,v2,e1,e2)  _mm512_mask_getmant_round_pd((v1), (k1), (v2), (e1), (e2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_getmant_pd(k1,v1,e1,e2)    _mm512_maskz_getmant_round_pd((k1), (v1), (e1), (e2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_getmant_round_pd(v1,e1,e2,e3)    _mm512_maskz_getmant_round_pd(_MM_K0_REG8, (v1), (e1), (e2), (e3))
#define _mm512_getmant_pd(v1,e1,e2)             _mm512_maskz_getmant_pd(_MM_K0_REG8, (v1), (e1), (e2))

#define _mm512_permute_pd(v1,e1)             _mm512_maskz_permute_pd(_MM_K0_REG8, (v1), (e1))
#define _mm512_permute_ps(v1,e1)             _mm512_maskz_permute_ps(_MM_K0_REG16, (v1), (e1))
#define _mm512_permutevar_pd(v1,v2)          _mm512_maskz_permutevar_pd(_MM_K0_REG8, (v1), (v2))
#define _mm512_permutevar_ps(v1,v2)          _mm512_maskz_permutevar_ps(_MM_K0_REG16, (v1), (v2))
#define _mm512_permutex_pd(v1,e1)            _mm512_maskz_permutex_pd(_MM_K0_REG8, (v1), (e1))
#define _mm512_permutexvar_pd(v1,v2)         _mm512_maskz_permutexvar_pd(_MM_K0_REG8, (v1), (v2))
#define _mm512_permutexvar_ps(v1,v2)         _mm512_maskz_permutexvar_ps(_MM_K0_REG16, (v1), (v2))
#define _mm512_permutex2var_pd(v1,v2,v3)     _mm512_maskz_permutex2var_pd(_MM_K0_REG8, (v1), (v2), (v3))
#define _mm512_permutex2var_ps(v1,v2,v3)     _mm512_maskz_permutex2var_ps(_MM_K0_REG16, (v1), (v2), (v3))

/* #define _mm512_reduce_round_pd(v1,e1,e2)    _mm512_maskz_reduce_round_pd(_MM_K0_REG8, (v1), (e1), (e2)) */
/* #define _mm512_mask_reduce_pd(v1,k1,v2,e1)  _mm512_mask_reduce_round_pd((v1), (k1), (v2), (e1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_reduce_pd(k1,v1,e1)    _mm512_maskz_reduce_round_pd((k1), (v1), (e1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_reduce_pd(v1,e1)             _mm512_maskz_reduce_pd(_MM_K0_REG8, (v1), (e1)) */

/* #define _mm512_reduce_round_ps(v1,e1,e2)    _mm512_maskz_reduce_round_ps(_MM_K0_REG16, (v1), (e1), (e2)) */
/* #define _mm512_mask_reduce_ps(v1,k1,v2,e1)  _mm512_mask_reduce_round_ps((v1), (k1), (v2), (e1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_reduce_ps(k1,v1,e1)    _mm512_maskz_reduce_round_ps((k1), (v1), (e1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_reduce_ps(v1,e1)             _mm512_maskz_reduce_ps(_MM_K0_REG16, (v1), (e1)) */

#define _mm512_roundscale_round_pd(v1,e1,e2)    _mm512_maskz_roundscale_round_pd(_MM_K0_REG8, (v1), (e1), (e2))
#define _mm512_mask_roundscale_pd(v1,k1,v2,e1)  _mm512_mask_roundscale_round_pd((v1), (k1), (v2), (e1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_roundscale_pd(k1,v1,e1)    _mm512_maskz_roundscale_round_pd((k1), (v1), (e1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_roundscale_pd(v1,e1)             _mm512_maskz_roundscale_pd(_MM_K0_REG8, (v1), (e1))

#define _mm512_roundscale_round_ps(v1,e1,e2)    _mm512_maskz_roundscale_round_ps(_MM_K0_REG16, (v1), (e1), (e2))
#define _mm512_mask_roundscale_ps(v1,k1,v2,e1)  _mm512_mask_roundscale_round_ps((v1), (k1), (v2), (e1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_roundscale_ps(k1,v1,e1)    _mm512_maskz_roundscale_round_ps((k1), (v1), (e1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_roundscale_ps(v1,e1)             _mm512_maskz_roundscale_ps(_MM_K0_REG16, (v1), (e1))

#define _mm512_scalef_round_pd(v1,v2,e1)    _mm512_maskz_scalef_round_pd(_MM_K0_REG8, (v1), (v2), (e1))
#define _mm512_mask_scalef_pd(v1,k1,v2,v3)  _mm512_mask_scalef_round_pd((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_scalef_pd(k1,v1,v2)    _mm512_maskz_scalef_round_pd((k1), (v1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_scalef_pd(v1,v2)             _mm512_maskz_scalef_pd(_MM_K0_REG8, (v1), (v2))

#define _mm512_scalef_round_ps(v1,v2,e1)    _mm512_maskz_scalef_round_ps(_MM_K0_REG16, (v1), (v2), (e1))
#define _mm512_mask_scalef_ps(v1,k1,v2,v3)  _mm512_mask_scalef_round_ps((v1), (k1), (v2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_scalef_ps(k1,v1,v2)    _mm512_maskz_scalef_round_ps((k1), (v1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_scalef_ps(v1,v2)             _mm512_maskz_scalef_ps(_MM_K0_REG16, (v1), (v2))

#define _mm512_fixupimm_round_pd(v1,v2,v3,e1,e2)  _mm512_maskz_fixupimm_round_pd(_MM_K0_REG8, (v1), (v2), (v3), (e1), (e2))
#define _mm512_mask_fixupimm_pd(v1,k1,v2,v3,e1)   _mm512_mask_fixupimm_round_pd((v1), (k1), (v2), (v3), (e1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_fixupimm_pd(k1,v1,v2,v3,e1)  _mm512_maskz_fixupimm_round_pd((k1), (v1), (v2), (v3), (e1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fixupimm_pd(v1,v2,v3,e1)           _mm512_maskz_fixupimm_pd(_MM_K0_REG8, (v1), (v2), (v3), (e1))
#define _mm512_fixupimm_round_ps(v1,v2,v3,e1,e2)  _mm512_maskz_fixupimm_round_ps(_MM_K0_REG16, (v1), (v2), (v3), (e1), (e2))
#define _mm512_mask_fixupimm_ps(v1,k1,v2,v3,e1)   _mm512_mask_fixupimm_round_ps((v1), (k1), (v2), (v3), (e1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_fixupimm_ps(k1,v1,v2,v3,e1)  _mm512_maskz_fixupimm_round_ps((k1), (v1), (v2), (v3), (e1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_fixupimm_ps(v1,v2,v3,e1)           _mm512_maskz_fixupimm_ps(_MM_K0_REG16, (v1), (v2), (v3), (e1))

/* #define _mm512_exp2a23_round_ps(v1,e1)    _mm512_maskz_exp2a23_round_ps(_MM_K0_REG16, (v1), (e1)) */
/* #define _mm512_mask_exp2a23_ps(v1,k1,v2)  _mm512_mask_exp2a23_round_ps((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_exp2a23_ps(k1,v1)    _mm512_maskz_exp2a23_round_ps((k1), (v1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_exp2a23_ps(v1)             _mm512_maskz_exp2a23_ps(_MM_K0_REG16, (v1)) */
/* #define _mm512_exp2a23_round_pd(v1,e1)    _mm512_maskz_exp2a23_round_pd(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_mask_exp2a23_pd(v1,k1,v2)  _mm512_mask_exp2a23_round_pd((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_exp2a23_pd(k1,v1)    _mm512_maskz_exp2a23_round_pd((k1), (v1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_exp2a23_pd(v1)             _mm512_maskz_exp2a23_pd(_MM_K0_REG8, (v1)) */

/* #define _mm512_fpclass_ps_mask(v1,e1)  _mm512_mask_fpclass_ps_mask(_MM_K0_REG16, (v1), (e1)) */
/* #define _mm512_fpclass_pd_mask(v1,e1)  _mm512_mask_fpclass_pd_mask(_MM_K0_REG8, (v1), (e1)) */

/* #define _mm512_range_round_pd(v1,v2,e1,e2)    _mm512_maskz_range_round_pd(_MM_K0_REG8, (v1), (v2), (e1), (e2)) */
/* #define _mm512_mask_range_pd(v1,k1,v2,v3,e1)  _mm512_mask_range_round_pd((v1), (k1), (v2), (v3), (e1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_range_pd(k1,v1,v2,e1)    _mm512_maskz_range_round_pd((k1), (v1), (v2), (e1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_range_pd(v1,v2,e1)             _mm512_maskz_range_pd(_MM_K0_REG8, (v1), (v2), (e1)) */

/* #define _mm512_range_round_ps(v1,v2,e1,e2)    _mm512_maskz_range_round_ps(_MM_K0_REG16, (v1), (v2), (e1), (e2)) */
/* #define _mm512_mask_range_ps(v1,k1,v2,v3,e1)  _mm512_mask_range_round_ps((v1), (k1), (v2), (v3), (e1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_range_ps(k1,v1,v2,e1)    _mm512_maskz_range_round_ps((k1), (v1), (v2), (e1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_range_ps(v1,v2,e1)             _mm512_maskz_range_ps(_MM_K0_REG16, (v1), (v2), (e1)) */

#define _mm512_maskz_cvtps_pd(k1,v2)        _mm512_maskz_cvt_roundps_pd((k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_cvtpd_ps(k1,v2)        _mm512_maskz_cvt_roundpd_ps((k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_cvtps_pd(v1,k2,v3)      _mm512_mask_cvt_roundps_pd((v1), (k2), (v3), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_cvtpd_ps(v1_old,k1,v2)  _mm512_mask_cvt_roundpd_ps((v1_old), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_cvt_roundps_pd(v1,e2)        _mm512_maskz_cvt_roundps_pd(_MM_K0_REG8, (v1), e2)
#define _mm512_cvt_roundpd_ps(v1,e2)        _mm512_maskz_cvt_roundpd_ps(_MM_K0_REG8, (v1), e2)
#define _mm512_cvtps_pd(v1)                 _mm512_cvt_roundps_pd((v1), _MM_FROUND_CUR_DIRECTION)
#define _mm512_cvtpd_ps(v1)                 _mm512_cvt_roundpd_ps((v1), _MM_FROUND_CUR_DIRECTION)

#define _mm512_cvtepi32_pd(v1)  _mm512_maskz_cvtepi32_pd(_MM_K0_REG8, (v1))
#define _mm512_cvtepu32_pd(v1)  _mm512_maskz_cvtepu32_pd(_MM_K0_REG8, (v1))

/* #define _mm512_cvt_roundepi64_pd(v1,e1)   _mm512_maskz_cvt_roundepi64_pd(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_cvt_roundepu64_pd(v1,e1)   _mm512_maskz_cvt_roundepu64_pd(_MM_K0_REG8, (v1), (e1)) */
#define _mm512_cvtepi32_ps(v)               _mm512_cvt_roundepi32_ps((v), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_cvtepi32_ps(v1,k1,v2)   _mm512_mask_cvt_roundepi32_ps((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_cvtepi32_ps(k1,v2)     _mm512_maskz_cvt_roundepi32_ps((k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_cvtepu32_ps(v)               _mm512_cvt_roundepu32_ps((v), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_cvtepu32_ps(v1,k1,v2)   _mm512_mask_cvt_roundepu32_ps((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_cvtepu32_ps(k1,v2)     _mm512_maskz_cvt_roundepu32_ps((k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_cvtph_ps(v1)                 _mm512_cvt_roundph_ps((v1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_cvtph_ps(v1,k,v2)       _mm512_mask_cvt_roundph_ps((v1), (k), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_cvtph_ps(k,v1)         _mm512_maskz_cvt_roundph_ps((k), (v1), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_cvtps_ph(v1,a)               _mm512_cvt_roundps_ph((v1), (a)) */
/* #define _mm512_mask_cvtps_ph(v1,k,v2,a)     _mm512_mask_cvt_roundps_ph((v1), (k), (v2), (a)) */
/* #define _mm512_maskz_cvtps_ph(k,v2,a)       _mm512_maskz_cvt_roundps_ph((k), (v2), (a)) */
/* #define _mm512_cvtepi64_pd(v)               _mm512_cvt_roundepi64_pd((v), _MM_FROUND_CUR_DIRECTION) */
#define _mm512_mask_cvtepi64_pd(v1,k1,v2)   _mm512_mask_cvt_roundepi64_pd((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_maskz_cvtepi64_pd(k1,v2)     _mm512_maskz_cvt_roundepi64_pd((k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_cvtepu64_pd(v)               _mm512_cvt_roundepu64_pd((v), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_cvtepu64_pd(v1,k1,v2)   _mm512_mask_cvt_roundepu64_pd((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_cvtepu64_pd(k1,v2)     _mm512_maskz_cvt_roundepu64_pd((k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_cvtepi64_ps(v1,k1,v2)   _mm512_mask_cvt_roundepi64_ps((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_cvtepi64_ps(k1,v2)     _mm512_maskz_cvt_roundepi64_ps((k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_cvtepi64_ps(v)               _mm512_cvt_roundepi64_ps((v), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_cvtepu64_ps(v)               _mm512_cvt_roundepu64_ps((v), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_cvtepu64_ps(v1,k1,v2)   _mm512_mask_cvt_roundepu64_ps((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_cvtepu64_ps(k1,v2)     _mm512_maskz_cvt_roundepu64_ps((k1), (v2), _MM_FROUND_CUR_DIRECTION) */

_AVX512F_(extern __m512i __cdecl _mm512_setzero_si512(void))

/* _AVX512F_(extern __m512i __cdecl _mm512_set1_epi8(signed char)) */
/* _AVX512F_(extern __m512i __cdecl _mm512_set1_epi16(short)) */ 

_AVX512F_(extern __m512i __cdecl _mm512_set_epi8(signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char, signed char))  /* composite */
_AVX512F_(extern __m512i __cdecl _mm512_set_epi16(short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short, short))  /* composite */
_AVX512F_(extern __m512i __cdecl _mm512_set_epi32(int, int, int, int, int, int, int, int, int, int, int, int, int, int, int, int))  /* composite */
_AVX512F_(extern __m512i __cdecl _mm512_set_epi64(__int64, __int64, __int64, __int64, __int64, __int64, __int64, __int64))  /* composite */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_set1_epi8(__mmask64, signed char))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_set1_epi16(__mmask32, short))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_set1_epi32(__mmask16, int))  /* vpbroadcastd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_set1_epi64(__mmask8, __int64))  /* vpbroadcastq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_set1_epi8(__m512i, __mmask64, char))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_set1_epi16(__m512i, __mmask32, short))
_AVX512F_(extern __m512i __cdecl _mm512_mask_set1_epi32(__m512i, __mmask16, int))  /* composite(vpbroadcastd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_set1_epi64(__m512i, __mmask8, __int64))  /* composite(vpbroadcastq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_load_epi32(__mmask16, const void *))  /* vmovdqa32 */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_load_epi64(__mmask8, const void *))  /* vmovdqa64 */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_loadu_epi8(__mmask64, const void *))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_loadu_epi16(__mmask32, const void *))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_loadu_epi32(__mmask16, const void *))  /* vmovdqu32 */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_loadu_epi64(__mmask8, const void *))  /* vmovdqu64 */
_AVX512F_(extern __m512i __cdecl _mm512_mask_load_epi32(__m512i, __mmask16, const void *))  /* composite(vmovdqa32) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_load_epi64(__m512i, __mmask8, const void *))  /* composite(vmovdqa64) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_loadu_epi8(__m512i, __mmask64, const void *))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_loadu_epi16(__m512i, __mmask32, const void *))
_AVX512F_(extern __m512i __cdecl _mm512_mask_loadu_epi32(__m512i, __mmask16, const void *))  /* composite(vmovdqu32) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_loadu_epi64(__m512i, __mmask8, const void *))  /* composite(vmovdqu64) */

_AVX512F_(extern void __cdecl _mm512_mask_store_epi32(void *, __mmask16, __m512i))  /* vmovdqa32 */
_AVX512F_(extern void __cdecl _mm512_mask_store_epi64(void *, __mmask8, __m512i))  /* vmovdqa64 */
_AVX512BW_(extern void __cdecl _mm512_mask_storeu_epi8(void *, __mmask64, __m512i))
_AVX512BW_(extern void __cdecl _mm512_mask_storeu_epi16(void *, __mmask32, __m512i))
_AVX512F_(extern void __cdecl _mm512_mask_storeu_epi32(void *, __mmask16, __m512i))  /* vmovdqu32 */
_AVX512F_(extern void __cdecl _mm512_mask_storeu_epi64(void *, __mmask8, __m512i))  /* vmovdqu64 */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_add_epi8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_add_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_add_epi32(__mmask16, __m512i, __m512i))  /* vpaddd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_add_epi64(__mmask8, __m512i, __m512i))  /* vpaddq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_add_epi8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_add_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_add_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpaddd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_add_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpaddq) */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_adds_epi8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_adds_epi16(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_adds_epu8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_adds_epu16(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_adds_epi8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_adds_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_adds_epu8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_adds_epu16(__m512i, __mmask32, __m512i, __m512i))

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_sub_epi8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_sub_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_sub_epi32(__mmask16, __m512i, __m512i))  /* vpsubd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_sub_epi64(__mmask8, __m512i, __m512i))  /* vpsubq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_sub_epi8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_sub_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_sub_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpsubd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_sub_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpsubq) */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_subs_epi8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_subs_epi16(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_subs_epu8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_subs_epu16(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_subs_epi8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_subs_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_subs_epu8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_subs_epu16(__m512i, __mmask32, __m512i, __m512i))

_AVX512F_(extern __m512i __cdecl _mm512_maskz_mul_epi32(__mmask8, __m512i, __m512i))  /* vpmuldq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_mul_epu32(__mmask8, __m512i, __m512i))  /* vpmuludq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_mullo_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_mullo_epi32(__mmask16, __m512i, __m512i))  /* vpmulld */
_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_mullo_epi64(__mmask8, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_mulhi_epi16(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_mulhi_epu16(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_mulhrs_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_mul_epi32(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpmuldq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_mul_epu32(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpmuludq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_mullo_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_mullo_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpmulld) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_mullo_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpmullq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_mulhi_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_mulhi_epu16(__m512i, __mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_mulhrs_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_EWW_(extern __m512i __cdecl _mm512_mask_mullox_epi64(__m512i, __mmask8, __m512i, __m512i))
_AVX512F_EWW_(extern __m512i __cdecl _mm512_mullox_epi64(__m512i, __m512i))

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_abs_epi8(__mmask64, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_abs_epi16(__mmask32, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_abs_epi32(__mmask16, __m512i))  /* vpabsd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_abs_epi64(__mmask8, __m512i))  /* vpabsq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_abs_epi8(__m512i, __mmask64, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_abs_epi16(__m512i, __mmask32, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_abs_epi32(__m512i, __mmask16, __m512i))  /* composite(vpabsd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_abs_epi64(__m512i, __mmask8, __m512i))  /* composite(vpabsq) */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_max_epi8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_max_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_max_epi32(__mmask16, __m512i, __m512i))  /* vpmaxsd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_max_epi64(__mmask8, __m512i, __m512i))  /* vpmaxsq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_max_epu8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_max_epu16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_max_epu32(__mmask16, __m512i, __m512i))  /* vpmaxud */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_max_epu64(__mmask8, __m512i, __m512i))  /* vpmaxuq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_max_epi8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_max_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_max_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpmaxsd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_max_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpmaxsq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_max_epu8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_max_epu16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_max_epu32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpmaxud) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_max_epu64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpmaxuq) */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_min_epi8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_min_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_min_epi32(__mmask16, __m512i, __m512i))  /* vpminsd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_min_epi64(__mmask8, __m512i, __m512i))  /* vpminsq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_min_epu8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_min_epu16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_min_epu32(__mmask16, __m512i, __m512i))  /* vpminud */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_min_epu64(__mmask8, __m512i, __m512i))  /* vpminuq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_min_epi8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_min_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_min_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpminsd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_min_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpminsq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_min_epu8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_min_epu16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_min_epu32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpminud) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_min_epu64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpminuq) */

_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_broadcast_i32x2(__mmask16, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_broadcast_i32x4(__mmask16, __m128i))  /* vbroadcasti32x4 */
_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_broadcast_i32x8(__mmask16, __m256i))
_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_broadcast_i64x2(__mmask8, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_broadcast_i64x4(__mmask8, __m256i))  /* vbroadcasti64x4 */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_broadcastb_epi8(__mmask64, __m128i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_broadcastw_epi16(__mmask32, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_broadcastd_epi32(__mmask16, __m128i))  /* vpbroadcastd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_broadcastq_epi64(__mmask8, __m128i))  /* vpbroadcastq */
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_broadcast_i32x2(__m512i, __mmask16, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_broadcast_i32x4(__m512i, __mmask16, __m128i))  /* composite(vbroadcasti32x4) */
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_broadcast_i32x8(__m512i, __mmask16, __m256i))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_broadcast_i64x2(__m512i, __mmask8, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_broadcast_i64x4(__m512i, __mmask8, __m256i))  /* composite(vbroadcasti64x4) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_broadcastb_epi8(__m512i, __mmask64, __m128i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_broadcastw_epi16(__m512i, __mmask32, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_broadcastd_epi32(__m512i, __mmask16, __m128i))  /* composite(vpbroadcastd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_broadcastq_epi64(__m512i, __mmask8, __m128i))  /* composite(vpbroadcastq) */
_AVX512CD_(extern __m512i __cdecl _mm512_broadcastmw_epi32(__mmask16))
_AVX512CD_(extern __m512i __cdecl _mm512_broadcastmb_epi64(__mmask8))

_AVX512F_(extern __m128i __cdecl _mm512_maskz_extracti32x4_epi32(__mmask8, __m512i, const int))  /* vextracti32x4 */
_AVX512DQ_(extern __m256i __cdecl _mm512_maskz_extracti32x8_epi32(__mmask8, __m512i, const int))
_AVX512DQ_(extern __m128i __cdecl _mm512_maskz_extracti64x2_epi64(__mmask8, __m512i, const int))
_AVX512F_(extern __m256i __cdecl _mm512_maskz_extracti64x4_epi64(__mmask8, __m512i, const int))  /* vextracti64x4 */
_AVX512F_(extern __m128i __cdecl _mm512_mask_extracti32x4_epi32(__m128i, __mmask8, __m512i, const int))  /* composite(vextracti32x4) */
_AVX512DQ_(extern __m256i __cdecl _mm512_mask_extracti32x8_epi32(__m256i, __mmask8, __m512i, const int))
_AVX512DQ_(extern __m128i __cdecl _mm512_mask_extracti64x2_epi64(__m128i, __mmask8, __m512i, const int))
_AVX512F_(extern __m256i __cdecl _mm512_mask_extracti64x4_epi64(__m256i, __mmask8, __m512i, const int))  /* composite(vextracti64x4) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_inserti32x4(__mmask16, __m512i, __m128i, const int))  /* vinserti32x4 */
_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_inserti32x8(__mmask16, __m512i, __m256i, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_inserti64x2(__mmask8, __m512i, __m128i, const int))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_inserti64x4(__mmask8, __m512i, __m256i, const int))  /* vinserti64x4 */
_AVX512F_(extern __m512i __cdecl _mm512_mask_inserti32x4(__m512i, __mmask16, __m512i, __m128i, const int))  /* composite(vinserti32x4) */
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_inserti32x8(__m512i, __mmask16, __m512i, __m256i, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_inserti64x2(__m512i, __mmask8, __m512i, __m128i, const int))
_AVX512F_(extern __m512i __cdecl _mm512_mask_inserti64x4(__m512i, __mmask8, __m512i, __m256i, const int))  /* composite(vinserti64x4) */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_shuffle_epi8(__mmask64, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_shuffle_epi32(__mmask16, __m512i, const int))  /* vpshufd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_shuffle_i32x4(__mmask16, __m512i, __m512i, const int))  /* vshufi32x4 */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_shuffle_i64x2(__mmask8, __m512i, __m512i, const int))  /* vshufi64x2 */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_shufflehi_epi16(__mmask32, __m512i, const int))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_shufflelo_epi16(__mmask32, __m512i, const int))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_shuffle_epi8(__m512i, __mmask64, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_shuffle_epi32(__m512i, __mmask16, __m512i, const int))  /* composite(vpshufd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_shuffle_i32x4(__m512i, __mmask16, __m512i, __m512i, const int))  /* composite(vshufi32x4) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_shuffle_i64x2(__m512i, __mmask8, __m512i, __m512i, const int))  /* composite(vshufi64x2) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_shufflehi_epi16(__m512i, __mmask32, __m512i, const int))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_shufflelo_epi16(__m512i, __mmask32, __m512i, const int))

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_mov_epi8(__mmask64, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_mov_epi16(__mmask32, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_mov_epi32(__mmask16, __m512i))  /* vmovdqa32 */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_mov_epi64(__mmask8, __m512i))  /* vmovdqa64 */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_mov_epi8(__m512i, __mmask64, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_mov_epi16(__m512i, __mmask32, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_mov_epi32(__m512i, __mmask16, __m512i))  /* composite(vmovdqa32) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_mov_epi64(__m512i, __mmask8, __m512i))  /* composite(vmovdqa64) */

_AVX512BW_(extern __m512i __cdecl _mm512_movm_epi8(__mmask64))
_AVX512BW_(extern __m512i __cdecl _mm512_movm_epi16(__mmask32))
_AVX512DQ_(extern __m512i __cdecl _mm512_movm_epi32(__mmask16))
_AVX512DQ_(extern __m512i __cdecl _mm512_movm_epi64(__mmask8))
_AVX512BW_(extern __mmask64 __cdecl _mm512_movepi8_mask(__m512i))
_AVX512BW_(extern __mmask32 __cdecl _mm512_movepi16_mask(__m512i))
_AVX512DQ_(extern __mmask16 __cdecl _mm512_movepi32_mask(__m512i))
_AVX512DQ_(extern __mmask8 __cdecl _mm512_movepi64_mask(__m512i))

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_alignr_epi8(__mmask64, __m512i, __m512i, const int))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_alignr_epi32(__mmask16, __m512i, __m512i, const int))  /* valignd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_alignr_epi64(__mmask8, __m512i, __m512i, const int))  /* valignq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_alignr_epi8(__m512i, __mmask64, __m512i, __m512i, const int))
_AVX512F_(extern __m512i __cdecl _mm512_mask_alignr_epi32(__m512i, __mmask16, __m512i, __m512i, const int))  /* composite(valignd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_alignr_epi64(__m512i, __mmask8, __m512i, __m512i, const int))  /* composite(valignq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_and_epi32(__mmask16, __m512i, __m512i))  /* vpandd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_and_epi64(__mmask8, __m512i, __m512i))  /* vpandq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_and_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpandd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_and_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpandq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_andnot_epi32(__mmask16, __m512i, __m512i))  /* vpandnd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_andnot_epi64(__mmask8, __m512i, __m512i))  /* vpandnq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_andnot_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpandnd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_andnot_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpandnq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_or_epi32(__mmask16, __m512i, __m512i))  /* vpord */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_or_epi64(__mmask8, __m512i, __m512i))  /* vporq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_or_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpord) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_or_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vporq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_xor_epi32(__mmask16, __m512i, __m512i))  /* vpxord */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_xor_epi64(__mmask8, __m512i, __m512i))  /* vpxorq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_xor_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpxord) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_xor_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpxorq) */

_AVX512BW_(extern __m512i __cdecl _mm512_mask_blend_epi8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_blend_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_blend_epi32(__mmask16, __m512i, __m512i))  /* vpblendmd */
_AVX512F_(extern __m512i __cdecl _mm512_mask_blend_epi64(__mmask8, __m512i, __m512i))  /* vpblendmq */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_sll_epi16(__mmask32, __m512i, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_sll_epi32(__mmask16, __m512i, __m128i))  /* vpslld */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_sll_epi64(__mmask8, __m512i, __m128i))  /* vpsllq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_slli_epi16(__mmask32, __m512i, const unsigned int))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_slli_epi32(__mmask16, __m512i, const unsigned int))  /* vpslld */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_slli_epi64(__mmask8, __m512i, const unsigned int))  /* vpsllq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_sllv_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_sllv_epi32(__mmask16, __m512i, __m512i))  /* vpsllvd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_sllv_epi64(__mmask8, __m512i, __m512i))  /* vpsllvq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_sll_epi16(__m512i, __mmask32, __m512i, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_sll_epi32(__m512i, __mmask16, __m512i, __m128i))  /* composite(vpslld) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_sll_epi64(__m512i, __mmask8, __m512i, __m128i))  /* composite(vpsllq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_slli_epi16(__m512i, __mmask32, __m512i, const unsigned int))
_AVX512F_(extern __m512i __cdecl _mm512_mask_slli_epi32(__m512i, __mmask16, __m512i, const unsigned int))  /* composite(vpslld) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_slli_epi64(__m512i, __mmask8, __m512i, const unsigned int))  /* composite(vpsllq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_sllv_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_sllv_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpsllvd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_sllv_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpsllvq) */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_srl_epi16(__mmask32, __m512i, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srl_epi32(__mmask16, __m512i, __m128i))  /* vpsrld */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srl_epi64(__mmask8, __m512i, __m128i))  /* vpsrlq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_srli_epi16(__mmask32, __m512i, int))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srli_epi32(__mmask16, __m512i, const unsigned int))  /* vpsrld */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srli_epi64(__mmask8, __m512i, const unsigned int))  /* vpsrlq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_srlv_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srlv_epi32(__mmask16, __m512i, __m512i))  /* vpsrlvd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srlv_epi64(__mmask8, __m512i, __m512i))  /* vpsrlvq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_srl_epi16(__m512i, __mmask32, __m512i, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_srl_epi32(__m512i, __mmask16, __m512i, __m128i))  /* composite(vpsrld) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_srl_epi64(__m512i, __mmask8, __m512i, __m128i))  /* composite(vpsrlq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_srli_epi16(__m512i, __mmask32, __m512i, const unsigned int))
_AVX512F_(extern __m512i __cdecl _mm512_mask_srli_epi32(__m512i, __mmask16, __m512i, const unsigned int))  /* composite(vpsrld) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_srli_epi64(__m512i, __mmask8, __m512i, const unsigned int))  /* composite(vpsrlq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_srlv_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_srlv_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpsrlvd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_srlv_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpsrlvq) */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_sra_epi16(__mmask32, __m512i, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_sra_epi32(__mmask16, __m512i, __m128i))  /* vpsrad */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_sra_epi64(__mmask8, __m512i, __m128i))  /* vpsraq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_srai_epi16(__mmask32, __m512i, const unsigned int))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srai_epi32(__mmask16, __m512i, const unsigned int))  /* vpsrad */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srai_epi64(__mmask8, __m512i, const unsigned int))  /* vpsraq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_srav_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srav_epi32(__mmask16, __m512i, __m512i))  /* vpsravd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_srav_epi64(__mmask8, __m512i, __m512i))  /* vpsravq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_sra_epi16(__m512i, __mmask32, __m512i, __m128i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_sra_epi32(__m512i, __mmask16, __m512i, __m128i))  /* composite(vpsrad) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_sra_epi64(__m512i, __mmask8, __m512i, __m128i))  /* composite(vpsraq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_srai_epi16(__m512i, __mmask32, __m512i, const unsigned int))
_AVX512F_(extern __m512i __cdecl _mm512_mask_srai_epi32(__m512i, __mmask16, __m512i, const unsigned int))  /* composite(vpsrad) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_srai_epi64(__m512i, __mmask8, __m512i, const unsigned int))  /* composite(vpsraq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_srav_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_srav_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpsravd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_srav_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpsravq) */

_AVX512BW_(extern __m512i __cdecl _mm512_bslli_epi128(__m512i, const int))
_AVX512BW_(extern __m512i __cdecl _mm512_bsrli_epi128(__m512i, const int))

_AVX512F_(extern __m512i __cdecl _mm512_maskz_rol_epi32(__mmask16, __m512i, const int))  /* vprold */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_rol_epi64(__mmask8, __m512i, const int))  /* vprolq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_rolv_epi32(__mmask16, __m512i, __m512i))  /* vprolvd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_rolv_epi64(__mmask8, __m512i, __m512i))  /* vprolvq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_rol_epi32(__m512i, __mmask16, __m512i, const int))  /* composite(vprold) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_rol_epi64(__m512i, __mmask8, __m512i, const int))  /* composite(vprolq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_rolv_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vprolvd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_rolv_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vprolvq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_ror_epi32(__mmask16, __m512i, const int))  /* vprord */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_ror_epi64(__mmask8, __m512i, const int))  /* vprorq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_rorv_epi32(__mmask16, __m512i, __m512i))  /* vprorvd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_rorv_epi64(__mmask8, __m512i, __m512i))  /* vprorvq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_ror_epi32(__m512i, __mmask16, __m512i, const int))  /* composite(vprord) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_ror_epi64(__m512i, __mmask8, __m512i, const int))  /* composite(vprorq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_rorv_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vprorvd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_rorv_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vprorvq) */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_unpackhi_epi8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_unpackhi_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_unpackhi_epi32(__mmask16, __m512i, __m512i))  /* vpunpckhdq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_unpackhi_epi64(__mmask8, __m512i, __m512i))  /* vpunpckhqdq */
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_unpacklo_epi8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_unpacklo_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_unpacklo_epi32(__mmask16, __m512i, __m512i))  /* vpunpckldq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_unpacklo_epi64(__mmask8, __m512i, __m512i))  /* vpunpcklqdq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_unpackhi_epi8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_unpackhi_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_unpackhi_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpunpckhdq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_unpackhi_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpunpckhqdq) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_unpacklo_epi8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_unpacklo_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_unpacklo_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpunpckldq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_unpacklo_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpunpcklqdq) */

_AVX512F_(extern __m512i __cdecl _mm512_mask_permutevar_epi32(__m512i, __mmask16, __m512i, __m512i))  /* vpermd */
_AVX512F_(extern __m512i __declspec(deprecated("use _mm512_permutexvar_epi32().")) __cdecl _mm512_permutevar_epi32(__m512i, __m512i))

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_permutexvar_epi16(__mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_permutexvar_epi32(__mmask16, __m512i, __m512i))  /* vpermd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_permutexvar_epi64(__mmask8, __m512i, __m512i))  /* vpermq */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_permutexvar_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_permutexvar_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpermd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_permutexvar_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpermq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_permutex_epi64(__mmask8, __m512i, const int))  /* vpermq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_permutex_epi64(__m512i, __mmask8, __m512i, const int))  /* composite(vpermq) */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_permutex2var_epi16(__mmask32, __m512i, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_maskz_permutex2var_epi32(__mmask16, __m512i, __m512i, __m512i))  /* vpermt2d */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_permutex2var_epi64(__mmask8, __m512i, __m512i, __m512i))  /* vpermt2q */
_AVX512BW_(extern __m512i __cdecl _mm512_mask2_permutex2var_epi16(__m512i, __m512i, __mmask32, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask2_permutex2var_epi32(__m512i, __m512i, __mmask16, __m512i))  /* composite(vpermi2d) */
_AVX512F_(extern __m512i __cdecl _mm512_mask2_permutex2var_epi64(__m512i, __m512i, __mmask8, __m512i))  /* composite(vpermi2q) */
_AVX512BW_(extern __m512i __cdecl _mm512_mask_permutex2var_epi16(__m512i, __mmask32, __m512i, __m512i))
_AVX512F_(extern __m512i __cdecl _mm512_mask_permutex2var_epi32(__m512i, __mmask16, __m512i, __m512i))  /* composite(vpermt2d) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_permutex2var_epi64(__m512i, __mmask8, __m512i, __m512i))  /* composite(vpermt2q) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_compress_epi32(__mmask16, __m512i))  /* vpcompressd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_compress_epi64(__mmask8, __m512i))  /* vpcompressq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_compress_epi32(__m512i, __mmask16, __m512i))  /* composite(vpcompressd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_compress_epi64(__m512i, __mmask8, __m512i))  /* composite(vpcompressq) */

_AVX512F_(extern void __cdecl _mm512_mask_compressstoreu_epi32(void *, __mmask16, __m512i))  /* vpcompressd */
_AVX512F_(extern void __cdecl _mm512_mask_compressstoreu_epi64(void *, __mmask8, __m512i))  /* vpcompressq */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_expand_epi32(__mmask16, __m512i))  /* vpexpandd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_expand_epi64(__mmask8, __m512i))  /* vpexpandq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_expand_epi32(__m512i, __mmask16, __m512i))  /* composite(vpexpandd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_expand_epi64(__m512i, __mmask8, __m512i))  /* composite(vpexpandq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_expandloadu_epi32(__mmask16, const void *))  /* vpexpandd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_expandloadu_epi64(__mmask8, const void *))  /* vpexpandq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_expandloadu_epi32(__m512i, __mmask16, const void *))  /* composite(vpexpandd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_expandloadu_epi64(__m512i, __mmask8, const void *))  /* composite(vpexpandq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_ternarylogic_epi32(__mmask16, __m512i, __m512i, __m512i, const int))  /* composite(vpternlogd) */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_ternarylogic_epi64(__mmask8, __m512i, __m512i, __m512i, const int))  /* composite(vpternlogq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_ternarylogic_epi32(__m512i, __mmask16, __m512i, __m512i, const int))  /* composite(vpternlogd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_ternarylogic_epi64(__m512i, __mmask8, __m512i, __m512i, const int))  /* composite(vpternlogq) */

_AVX512CD_(extern __m512i __cdecl _mm512_maskz_conflict_epi32(__mmask16, __m512i))
_AVX512CD_(extern __m512i __cdecl _mm512_maskz_conflict_epi64(__mmask8, __m512i))
_AVX512CD_(extern __m512i __cdecl _mm512_mask_conflict_epi32(__m512i, __mmask16, __m512i))
_AVX512CD_(extern __m512i __cdecl _mm512_mask_conflict_epi64(__m512i, __mmask8, __m512i))

_AVX512CD_(extern __m512i __cdecl _mm512_maskz_lzcnt_epi32(__mmask16, __m512i))
_AVX512CD_(extern __m512i __cdecl _mm512_maskz_lzcnt_epi64(__mmask8, __m512i))
_AVX512CD_(extern __m512i __cdecl _mm512_mask_lzcnt_epi32(__m512i, __mmask16, __m512i))
_AVX512CD_(extern __m512i __cdecl _mm512_mask_lzcnt_epi64(__m512i, __mmask8, __m512i))

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_avg_epu8(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_avg_epu16(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_avg_epu8(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_avg_epu16(__m512i, __mmask32, __m512i, __m512i))

_AVX512BW_(extern __m512i __cdecl _mm512_sad_epu8(__m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_dbsad_epu8(__mmask32, __m512i, __m512i, const int))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_dbsad_epu8(__m512i, __mmask32, __m512i, __m512i, const int))

_AVX512F_EWW_(extern int __cdecl _mm512_reduce_add_epi32(__m512i))  /* composite */
_AVX512F_EWW_(extern int __cdecl _mm512_mask_reduce_add_epi32(__mmask16, __m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_reduce_add_epi64(__m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_mask_reduce_add_epi64(__mmask8, __m512i))  /* composite */

_AVX512F_EWW_(extern int __cdecl _mm512_reduce_mul_epi32(__m512i))  /* composite */
_AVX512F_EWW_(extern int __cdecl _mm512_mask_reduce_mul_epi32(__mmask16, __m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_reduce_mul_epi64(__m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_mask_reduce_mul_epi64(__mmask8, __m512i))  /* composite */

_AVX512F_EWW_(extern int __cdecl _mm512_reduce_min_epi32(__m512i))  /* composite */
_AVX512F_EWW_(extern int __cdecl _mm512_mask_reduce_min_epi32(__mmask16, __m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_reduce_min_epi64(__m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_mask_reduce_min_epi64(__mmask8, __m512i))  /* composite */
_AVX512F_EWW_(extern unsigned int __cdecl _mm512_reduce_min_epu32(__m512i))  /* composite */
_AVX512F_EWW_(extern unsigned int __cdecl _mm512_mask_reduce_min_epu32(__mmask16, __m512i))  /* composite */
_AVX512F_EWW_(extern unsigned __int64 __cdecl _mm512_reduce_min_epu64(__m512i))  /* composite */
_AVX512F_EWW_(extern unsigned __int64 __cdecl _mm512_mask_reduce_min_epu64(__mmask8, __m512i))  /* composite */

_AVX512F_EWW_(extern int __cdecl _mm512_reduce_max_epi32(__m512i))  /* composite */
_AVX512F_EWW_(extern int __cdecl _mm512_mask_reduce_max_epi32(__mmask16, __m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_reduce_max_epi64(__m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_mask_reduce_max_epi64(__mmask8, __m512i))  /* composite */
_AVX512F_EWW_(extern unsigned int __cdecl _mm512_reduce_max_epu32(__m512i))  /* composite */
_AVX512F_EWW_(extern unsigned int __cdecl _mm512_mask_reduce_max_epu32(__mmask16, __m512i))  /* composite */
_AVX512F_EWW_(extern unsigned __int64 __cdecl _mm512_reduce_max_epu64(__m512i))  /* composite */
_AVX512F_EWW_(extern unsigned __int64 __cdecl _mm512_mask_reduce_max_epu64(__mmask8, __m512i))  /* composite */

_AVX512F_EWW_(extern int __cdecl _mm512_reduce_and_epi32(__m512i))  /* composite */
_AVX512F_EWW_(extern int __cdecl _mm512_mask_reduce_and_epi32(__mmask16, __m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_reduce_and_epi64(__m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_mask_reduce_and_epi64(__mmask8, __m512i))  /* composite */

_AVX512F_EWW_(extern int __cdecl _mm512_reduce_or_epi32(__m512i))  /* composite */
_AVX512F_EWW_(extern int __cdecl _mm512_mask_reduce_or_epi32(__mmask16, __m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_reduce_or_epi64(__m512i))  /* composite */
_AVX512F_EWW_(extern __int64 __cdecl _mm512_mask_reduce_or_epi64(__mmask8, __m512i))  /* composite */

_AVX512F_(extern void __cdecl _mm512_stream_si512(void *, __m512i))  /* vmovntdq */
_AVX512F_(extern __m512i __cdecl _mm512_stream_load_si512(const void *))  /* vmovntdqa */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_madd_epi16(__mmask16, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_madd_epi16(__m512i, __mmask16, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_maddubs_epi16(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_maddubs_epi16(__m512i, __mmask32, __m512i, __m512i))

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_packs_epi16(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_packs_epi32(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_packs_epi16(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_packs_epi32(__m512i, __mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_packus_epi16(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_packus_epi32(__mmask32, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_packus_epi16(__m512i, __mmask64, __m512i, __m512i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_packus_epi32(__m512i, __mmask32, __m512i, __m512i))

_AVX512BW_(extern __mmask64 __cdecl _mm512_mask_cmp_epi8_mask(__mmask64, __m512i, __m512i, const int))
_AVX512BW_(extern __mmask32 __cdecl _mm512_mask_cmp_epi16_mask(__mmask32, __m512i, __m512i, const int))
_AVX512F_(extern __mmask16 __cdecl _mm512_mask_cmp_epi32_mask(__mmask16, __m512i, __m512i, const int))  /* vpcmpd */
_AVX512F_(extern __mmask8 __cdecl _mm512_mask_cmp_epi64_mask(__mmask8, __m512i, __m512i, const int))  /* vpcmpq */
_AVX512BW_(extern __mmask64 __cdecl _mm512_mask_cmp_epu8_mask(__mmask64, __m512i, __m512i, const int))
_AVX512BW_(extern __mmask32 __cdecl _mm512_mask_cmp_epu16_mask(__mmask32, __m512i, __m512i, const int))
_AVX512F_(extern __mmask16 __cdecl _mm512_mask_cmp_epu32_mask(__mmask16, __m512i, __m512i, const int))  /* vpcmpud */
_AVX512F_(extern __mmask8 __cdecl _mm512_mask_cmp_epu64_mask(__mmask8, __m512i, __m512i, const int))  /* vpcmpuq */

_AVX512BW_(extern __mmask64 __cdecl _mm512_mask_test_epi8_mask(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __mmask32 __cdecl _mm512_mask_test_epi16_mask(__mmask32, __m512i, __m512i))
_AVX512F_(extern __mmask16 __cdecl _mm512_mask_test_epi32_mask(__mmask16, __m512i, __m512i))  /* vptestmd */
_AVX512F_(extern __mmask8 __cdecl _mm512_mask_test_epi64_mask(__mmask8, __m512i, __m512i))  /* vptestmq */

_AVX512BW_(extern __mmask64 __cdecl _mm512_mask_testn_epi8_mask(__mmask64, __m512i, __m512i))
_AVX512BW_(extern __mmask32 __cdecl _mm512_mask_testn_epi16_mask(__mmask32, __m512i, __m512i))
_AVX512F_(extern __mmask16 __cdecl _mm512_mask_testn_epi32_mask(__mmask16, __m512i, __m512i))  /* vptestnmd */
_AVX512F_(extern __mmask8 __cdecl _mm512_mask_testn_epi64_mask(__mmask8, __m512i, __m512i))  /* vptestnmq */

_AVX512DQ_(extern unsigned char __cdecl _mm512_testz_and_mask8(__mmask8, __mmask8))
_AVX512DQ_(extern unsigned char __cdecl _mm512_testz_and_mask16(__mmask16, __mmask16))
_AVX512BW_(extern unsigned char __cdecl _mm512_testz_and_mask32(__mmask32, __mmask32))
_AVX512BW_(extern unsigned char __cdecl _mm512_testz_and_mask64(__mmask64, __mmask64))
_AVX512DQ_(extern unsigned char __cdecl _mm512_testz_andn_mask8(__mmask8, __mmask8))
_AVX512DQ_(extern unsigned char __cdecl _mm512_testz_andn_mask16(__mmask16, __mmask16))
_AVX512BW_(extern unsigned char __cdecl _mm512_testz_andn_mask32(__mmask32, __mmask32))
_AVX512BW_(extern unsigned char __cdecl _mm512_testz_andn_mask64(__mmask64, __mmask64))
_AVX512DQ_(extern unsigned char __cdecl _mm512_testz_or_mask8(__mmask8, __mmask8))
_AVX512F_(extern unsigned char __cdecl _mm512_testz_or_mask16(__mmask16, __mmask16))  /* composite(kortestw) */
_AVX512BW_(extern unsigned char __cdecl _mm512_testz_or_mask32(__mmask32, __mmask32))
_AVX512BW_(extern unsigned char __cdecl _mm512_testz_or_mask64(__mmask64, __mmask64))
_AVX512DQ_(extern unsigned char __cdecl _mm512_testz_nor_mask8(__mmask8, __mmask8))
_AVX512F_(extern unsigned char __cdecl _mm512_testz_nor_mask16(__mmask16, __mmask16))  /* composite(kortestw) */
_AVX512BW_(extern unsigned char __cdecl _mm512_testz_nor_mask32(__mmask32, __mmask32))
_AVX512BW_(extern unsigned char __cdecl _mm512_testz_nor_mask64(__mmask64, __mmask64))

_AVX512F_(extern __m512i __cdecl _mm512_mask_i32gather_epi32(__m512i, __mmask16, __m512i, const void *, const int))  /* vpgatherdd */
_AVX512F_(extern __m256i __cdecl _mm512_mask_i64gather_epi32(__m256i, __mmask8, __m512i, const void *, const int))  /* vpgatherqd */
_AVX512F_(extern __m512i __cdecl _mm512_mask_i32gather_epi64(__m512i, __mmask8, __m256i, const void *, const int))  /* vpgatherdq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_i64gather_epi64(__m512i, __mmask8, __m512i, const void *, const int))  /* vpgatherqq */
_AVX512F_(extern __m512i __cdecl _mm512_i32gather_epi32(__m512i, const void *, const int))  /* vpgatherdd */
_AVX512F_(extern __m256i __cdecl _mm512_i64gather_epi32(__m512i, const void *, const int))  /* vpgatherqd */
_AVX512F_(extern __m512i __cdecl _mm512_i32gather_epi64(__m256i, const void *, const int))  /* vpgatherdq */
_AVX512F_(extern __m512i __cdecl _mm512_i64gather_epi64(__m512i, const void *, const int))  /* vpgatherqq */

_AVX512F_(extern void __cdecl _mm512_mask_i32scatter_epi32(void *, __mmask16, __m512i, __m512i, const int))  /* vpscatterdd */
_AVX512F_(extern void __cdecl _mm512_mask_i64scatter_epi32(void *, __mmask8, __m512i, __m256i, const int))  /* vpscatterqd */
_AVX512F_(extern void __cdecl _mm512_mask_i32scatter_epi64(void *, __mmask8, __m256i, __m512i, const int))  /* vpscatterdq */
_AVX512F_(extern void __cdecl _mm512_mask_i64scatter_epi64(void *, __mmask8, __m512i, __m512i, const int))  /* vpscatterqq */
_AVX512F_(extern void __cdecl _mm512_i32scatter_epi32(void *, __m512i, __m512i, const int))  /* vpscatterdd */
_AVX512F_(extern void __cdecl _mm512_i64scatter_epi32(void *, __m512i, __m256i, const int))  /* vpscatterqd */
_AVX512F_(extern void __cdecl _mm512_i32scatter_epi64(void *, __m256i, __m512i, const int))  /* vpscatterdq */
_AVX512F_(extern void __cdecl _mm512_i64scatter_epi64(void *, __m512i, __m512i, const int))  /* vpscatterqq */

_AVX512BW_(extern __m512i __cdecl _mm512_maskz_cvtepi8_epi16(__mmask32, __m256i))
_AVX512BW_(extern __m512i __cdecl _mm512_maskz_cvtepu8_epi16(__mmask32, __m256i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_cvtepi8_epi16(__m512i, __mmask32, __m256i))
_AVX512BW_(extern __m512i __cdecl _mm512_mask_cvtepu8_epi16(__m512i, __mmask32, __m256i))

_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepi8_epi32(__mmask16, __m128i))  /* vpmovsxbd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepu8_epi32(__mmask16, __m128i))  /* vpmovzxbd */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepi8_epi32(__m512i, __mmask16, __m128i))  /* composite(vpmovsxbd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepu8_epi32(__m512i, __mmask16, __m128i))  /* composite(vpmovzxbd) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepi8_epi64(__mmask8, __m128i))  /* vpmovsxbq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepu8_epi64(__mmask8, __m128i))  /* vpmovzxbq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepi8_epi64(__m512i, __mmask8, __m128i))  /* composite(vpmovsxbq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepu8_epi64(__m512i, __mmask8, __m128i))  /* composite(vpmovzxbq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepi16_epi32(__mmask16, __m256i))  /* vpmovsxwd */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepu16_epi32(__mmask16, __m256i))  /* vpmovzxwd */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepi16_epi32(__m512i, __mmask16, __m256i))  /* composite(vpmovsxwd) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepu16_epi32(__m512i, __mmask16, __m256i))  /* composite(vpmovzxwd) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepi16_epi64(__mmask8, __m128i))  /* vpmovsxwq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepu16_epi64(__mmask8, __m128i))  /* vpmovzxwq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepi16_epi64(__m512i, __mmask8, __m128i))  /* composite(vpmovsxwq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepu16_epi64(__m512i, __mmask8, __m128i))  /* composite(vpmovzxwq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepi32_epi64(__mmask8, __m256i))  /* vpmovsxdq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtepu32_epi64(__mmask8, __m256i))  /* vpmovzxdq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepi32_epi64(__m512i, __mmask8, __m256i))  /* composite(vpmovsxdq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtepu32_epi64(__m512i, __mmask8, __m256i))  /* composite(vpmovzxdq) */

_AVX512BW_(extern __m256i __cdecl _mm512_maskz_cvtepi16_epi8(__mmask32, __m512i))
_AVX512BW_(extern __m256i __cdecl _mm512_maskz_cvtsepi16_epi8(__mmask32, __m512i))
_AVX512BW_(extern __m256i __cdecl _mm512_maskz_cvtusepi16_epi8(__mmask32, __m512i))
_AVX512BW_(extern __m256i __cdecl _mm512_mask_cvtepi16_epi8(__m256i, __mmask32, __m512i))
_AVX512BW_(extern __m256i __cdecl _mm512_mask_cvtsepi16_epi8(__m256i, __mmask32, __m512i))
_AVX512BW_(extern __m256i __cdecl _mm512_mask_cvtusepi16_epi8(__m256i, __mmask32, __m512i))

_AVX512F_(extern __m128i __cdecl _mm512_maskz_cvtepi32_epi8(__mmask16, __m512i))  /* vpmovdb */
_AVX512F_(extern __m128i __cdecl _mm512_maskz_cvtsepi32_epi8(__mmask16, __m512i))  /* vpmovsdb */
_AVX512F_(extern __m128i __cdecl _mm512_maskz_cvtusepi32_epi8(__mmask16, __m512i))  /* vpmovusdb */
_AVX512F_(extern __m128i __cdecl _mm512_mask_cvtepi32_epi8(__m128i, __mmask16, __m512i))  /* composite(vpmovdb) */
_AVX512F_(extern __m128i __cdecl _mm512_mask_cvtsepi32_epi8(__m128i, __mmask16, __m512i))  /* composite(vpmovsdb) */
_AVX512F_(extern __m128i __cdecl _mm512_mask_cvtusepi32_epi8(__m128i, __mmask16, __m512i))  /* composite(vpmovusdb) */

_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvtepi32_epi16(__mmask16, __m512i))  /* vpmovdw */
_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvtsepi32_epi16(__mmask16, __m512i))  /* vpmovsdw */
_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvtusepi32_epi16(__mmask16, __m512i))  /* vpmovusdw */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvtepi32_epi16(__m256i, __mmask16, __m512i))  /* composite(vpmovdw) */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvtsepi32_epi16(__m256i, __mmask16, __m512i))  /* composite(vpmovsdw) */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvtusepi32_epi16(__m256i, __mmask16, __m512i))  /* composite(vpmovusdw) */

_AVX512F_(extern __m128i __cdecl _mm512_maskz_cvtepi64_epi8(__mmask8, __m512i))  /* vpmovqb */
_AVX512F_(extern __m128i __cdecl _mm512_maskz_cvtsepi64_epi8(__mmask8, __m512i))  /* vpmovsqb */
_AVX512F_(extern __m128i __cdecl _mm512_maskz_cvtusepi64_epi8(__mmask8, __m512i))  /* vpmovusqb */
_AVX512F_(extern __m128i __cdecl _mm512_mask_cvtepi64_epi8(__m128i, __mmask8, __m512i))  /* composite(vpmovqb) */
_AVX512F_(extern __m128i __cdecl _mm512_mask_cvtsepi64_epi8(__m128i, __mmask8, __m512i))  /* composite(vpmovsqb) */
_AVX512F_(extern __m128i __cdecl _mm512_mask_cvtusepi64_epi8(__m128i, __mmask8, __m512i))  /* composite(vpmovusqb) */

_AVX512F_(extern __m128i __cdecl _mm512_maskz_cvtepi64_epi16(__mmask8, __m512i))  /* vpmovqw */
_AVX512F_(extern __m128i __cdecl _mm512_maskz_cvtsepi64_epi16(__mmask8, __m512i))  /* vpmovsqw */
_AVX512F_(extern __m128i __cdecl _mm512_maskz_cvtusepi64_epi16(__mmask8, __m512i))  /* vpmovusqw */
_AVX512F_(extern __m128i __cdecl _mm512_mask_cvtepi64_epi16(__m128i, __mmask8, __m512i))  /* composite(vpmovqw) */
_AVX512F_(extern __m128i __cdecl _mm512_mask_cvtsepi64_epi16(__m128i, __mmask8, __m512i))  /* composite(vpmovsqw) */
_AVX512F_(extern __m128i __cdecl _mm512_mask_cvtusepi64_epi16(__m128i, __mmask8, __m512i))  /* composite(vpmovusqw) */

_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvtepi64_epi32(__mmask8, __m512i))  /* vpmovqd */
_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvtsepi64_epi32(__mmask8, __m512i))  /* vpmovsqd */
_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvtusepi64_epi32(__mmask8, __m512i))  /* vpmovusqd */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvtepi64_epi32(__m256i, __mmask8, __m512i))  /* composite(vpmovqd) */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvtsepi64_epi32(__m256i, __mmask8, __m512i))  /* composite(vpmovsqd) */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvtusepi64_epi32(__m256i, __mmask8, __m512i))  /* composite(vpmovusqd) */

_AVX512BW_(extern void __cdecl _mm512_mask_cvtepi16_storeu_epi8(void *, __mmask32, __m512i))
_AVX512BW_(extern void __cdecl _mm512_mask_cvtsepi16_storeu_epi8(void *, __mmask32, __m512i))
_AVX512BW_(extern void __cdecl _mm512_mask_cvtusepi16_storeu_epi8(void *, __mmask32, __m512i))
_AVX512F_(extern void __cdecl _mm512_mask_cvtepi32_storeu_epi8(void *, __mmask16, __m512i))  /* vpmovdb */
_AVX512F_(extern void __cdecl _mm512_mask_cvtsepi32_storeu_epi8(void *, __mmask16, __m512i))  /* vpmovsdb */
_AVX512F_(extern void __cdecl _mm512_mask_cvtusepi32_storeu_epi8(void *, __mmask16, __m512i))  /* vpmovusdb */
_AVX512F_(extern void __cdecl _mm512_mask_cvtepi32_storeu_epi16(void *, __mmask16, __m512i))  /* vpmovdw */
_AVX512F_(extern void __cdecl _mm512_mask_cvtsepi32_storeu_epi16(void *, __mmask16, __m512i))  /* vpmovsdw */
_AVX512F_(extern void __cdecl _mm512_mask_cvtusepi32_storeu_epi16(void *, __mmask16, __m512i))  /* vpmovusdw */
_AVX512F_(extern void __cdecl _mm512_mask_cvtepi64_storeu_epi8(void *, __mmask8, __m512i))  /* vpmovqb */
_AVX512F_(extern void __cdecl _mm512_mask_cvtsepi64_storeu_epi8(void *, __mmask8, __m512i))  /* vpmovsqb */
_AVX512F_(extern void __cdecl _mm512_mask_cvtusepi64_storeu_epi8(void *, __mmask8, __m512i))  /* vpmovusqb */
_AVX512F_(extern void __cdecl _mm512_mask_cvtepi64_storeu_epi16(void *, __mmask8, __m512i))  /* vpmovqw */
_AVX512F_(extern void __cdecl _mm512_mask_cvtsepi64_storeu_epi16(void *, __mmask8, __m512i))  /* vpmovsqw */
_AVX512F_(extern void __cdecl _mm512_mask_cvtusepi64_storeu_epi16(void *, __mmask8, __m512i))  /* vpmovusqw */
_AVX512F_(extern void __cdecl _mm512_mask_cvtepi64_storeu_epi32(void *, __mmask8, __m512i))  /* vpmovqd */
_AVX512F_(extern void __cdecl _mm512_mask_cvtsepi64_storeu_epi32(void *, __mmask8, __m512i))  /* vpmovsqd */
_AVX512F_(extern void __cdecl _mm512_mask_cvtusepi64_storeu_epi32(void *, __mmask8, __m512i))  /* vpmovusqd */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvt_roundps_epi32(__mmask16, __m512, const int /*rnd*/))  /* vcvtps2dq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvt_roundps_epu32(__mmask16, __m512, const int /*rnd*/))  /* vcvtps2udq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvt_roundps_epi32(__m512i, __mmask16, __m512, const int /*rnd*/))  /* composite(vcvtps2dq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvt_roundps_epu32(__m512i, __mmask16, __m512, const int /*rnd*/))  /* composite(vcvtps2udq) */

_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtt_roundps_epi32(__mmask16, __m512, const int /*sae*/))  /* vcvttps2dq */
_AVX512F_(extern __m512i __cdecl _mm512_maskz_cvtt_roundps_epu32(__mmask16, __m512, const int /*sae*/))  /* vcvttps2udq */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtt_roundps_epi32(__m512i, __mmask16, __m512, const int /*sae*/))  /* composite(vcvttps2dq) */
_AVX512F_(extern __m512i __cdecl _mm512_mask_cvtt_roundps_epu32(__m512i, __mmask16, __m512, const int /*sae*/))  /* composite(vcvttps2udq) */

_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvt_roundpd_epi32(__mmask8, __m512d, const int /*rnd*/))  /* vcvtpd2dq */
_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvt_roundpd_epu32(__mmask8, __m512d, const int /*rnd*/))  /* vcvtpd2udq */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvt_roundpd_epi32(__m256i, __mmask8, __m512d, const int /*rnd*/))  /* composite(vcvtpd2dq) */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvt_roundpd_epu32(__m256i, __mmask8, __m512d, const int /*rnd*/))  /* composite(vcvtpd2udq) */

_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvtt_roundpd_epi32(__mmask8, __m512d, const int /*sae*/))  /* vcvttpd2dq */
_AVX512F_(extern __m256i __cdecl _mm512_maskz_cvtt_roundpd_epu32(__mmask8, __m512d, const int /*sae*/))  /* vcvttpd2udq */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvtt_roundpd_epi32(__m256i, __mmask8, __m512d, const int /*sae*/))  /* composite(vcvttpd2dq) */
_AVX512F_(extern __m256i __cdecl _mm512_mask_cvtt_roundpd_epu32(__m256i, __mmask8, __m512d, const int /*sae*/))  /* composite(vcvttpd2udq) */

_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_cvt_roundps_epi64(__mmask8, __m256, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_cvt_roundps_epu64(__mmask8, __m256, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_cvt_roundps_epi64(__m512i, __mmask8, __m256, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_cvt_roundps_epu64(__m512i, __mmask8, __m256, const int))

_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_cvtt_roundps_epi64(__mmask8, __m256, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_cvtt_roundps_epu64(__mmask8, __m256, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_cvtt_roundps_epi64(__m512i, __mmask8, __m256, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_cvtt_roundps_epu64(__m512i, __mmask8, __m256, const int))

_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_cvt_roundpd_epi64(__mmask8, __m512d, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_cvt_roundpd_epu64(__mmask8, __m512d, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_cvt_roundpd_epi64(__m512i, __mmask8, __m512d, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_cvt_roundpd_epu64(__m512i, __mmask8, __m512d, const int))

_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_cvtt_roundpd_epi64(__mmask8, __m512d, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_maskz_cvtt_roundpd_epu64(__mmask8, __m512d, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_cvtt_roundpd_epi64(__m512i, __mmask8, __m512d, const int))
_AVX512DQ_(extern __m512i __cdecl _mm512_mask_cvtt_roundpd_epu64(__m512i, __mmask8, __m512d, const int))

/* _AVX512F_(extern __m256i __cdecl _mm512_maskz_cvt_roundps_ph(__mmask16, __m512, const int)) */
/* _AVX512F_(extern __m256i __cdecl _mm512_mask_cvt_roundps_ph(__m256i, __mmask16, __m512, const int)) */

#define _mm512_setzero_epi32()  _mm512_setzero_si512()

/* #define _mm512_set1_epi8(x)   _mm512_maskz_set1_epi8(_MM_K0_REG64, (x)) */
/* #define _mm512_set1_epi16(x)  _mm512_maskz_set1_epi16((__mmask32)_MM_K0_REG64, (x)) */
#define _mm512_set1_epi32(x)  _mm512_maskz_set1_epi32(_MM_K0_REG16, (x))
#define _mm512_set1_epi64(x)  _mm512_maskz_set1_epi64(_MM_K0_REG8, (x))

#define _mm512_set_1to16_pi(x)     _mm512_set1_epi32((x))
#define _mm512_set_1to16_epi32(x)  _mm512_set1_epi32((x))
#define _mm512_set_1to8_pq(x)      _mm512_set1_epi64((x))
#define _mm512_set_1to8_epi64(x)   _mm512_set1_epi64((x))

#define _mm512_set4_epi32(a,b,c,d)   _mm512_set_epi32((a),(b),(c),(d),(a),(b),(c),(d),(a),(b),(c),(d),(a),(b),(c),(d))
#define _mm512_set4_epi64(a,b,c,d)   _mm512_set_epi64((a),(b),(c),(d),(a),(b),(c),(d))
#define _mm512_setr4_epi32(a,b,c,d)  _mm512_set4_epi32((d),(c),(b),(a))
#define _mm512_setr4_epi64(a,b,c,d)  _mm512_set4_epi64((d),(c),(b),(a))

#define _mm512_set_4to16_pi(a,b,c,d)     _mm512_set4_epi32((d),(c),(b),(a))
#define _mm512_set_4to16_epi32(a,b,c,d)  _mm512_set4_epi32((d),(c),(b),(a))
#define _mm512_set_4to8_pq(a,b,c,d)      _mm512_set4_epi64((d),(c),(b),(a))
#define _mm512_set_4to8_epi64(a,b,c,d)   _mm512_set4_epi64((d),(c),(b),(a))

#define _mm512_set_16to16_epi32(n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16) \
    _mm512_set_epi32((n1),(n2),(n3),(n4),(n5),(n6),(n7),(n8),(n9),(n10),(n11),(n12),(n13),(n14),(n15),(n16))
#define _mm512_setr_epi32(n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16) \
    _mm512_set_epi32((n16),(n15),(n14),(n13),(n12),(n11),(n10),(n9),(n8),(n7),(n6),(n5),(n4),(n3),(n2),(n1))
#define _mm512_set_16to16_pi(n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16) \
    _mm512_set_epi32((n1),(n2),(n3),(n4),(n5),(n6),(n7),(n8),(n9),(n10),(n11),(n12),(n13),(n14),(n15),(n16))
#define _mm512_setr_epi64(n1,n2,n3,n4,n5,n6,n7,n8) \
    _mm512_set_epi64((n8),(n7),(n6),(n5),(n4),(n3),(n2),(n1))
#define _mm512_set_8to8_epi64(n1,n2,n3,n4,n5,n6,n7,n8) \
    _mm512_set_epi64((n1),(n2),(n3),(n4),(n5),(n6),(n7),(n8))
#define _mm512_set_8to8_pq(n1,n2,n3,n4,n5,n6,n7,n8) \
    _mm512_set_epi64((n1),(n2),(n3),(n4),(n5),(n6),(n7),(n8))

#define _mm512_load_epi32(addr)     _mm512_maskz_load_epi32(_MM_K0_REG16, (addr))
#define _mm512_load_epi64(addr)     _mm512_maskz_load_epi64(_MM_K0_REG8, (addr))
#define _mm512_load_si512           _mm512_load_epi32
/* #define _mm512_loadu_epi8(p1)       _mm512_maskz_loadu_epi8(_MM_K0_REG64, (p1)) */
/* #define _mm512_loadu_epi16(p1)      _mm512_maskz_loadu_epi16((__mmask32)_MM_K0_REG64, (p1)) */
#define _mm512_loadu_epi32(addr)    _mm512_maskz_loadu_epi32(_MM_K0_REG16, (addr))
#define _mm512_loadu_epi64(addr)    _mm512_maskz_loadu_epi64(_MM_K0_REG8, (addr))
#define _mm512_loadu_si512          _mm512_loadu_epi32

#define _mm512_store_epi32(addr,v)  _mm512_mask_store_epi32((addr), _MM_K0_REG16, (v))
#define _mm512_store_epi64(addr,v)  _mm512_mask_store_epi64((addr), _MM_K0_REG8, (v))
#define _mm512_store_si512          _mm512_store_epi32
/* #define _mm512_storeu_epi8(addr,v)   _mm512_mask_storeu_epi8((addr), _MM_K0_REG64, (v)) */
/* #define _mm512_storeu_epi16(addr,v)  _mm512_mask_storeu_epi16((addr), (__mmask32)_MM_K0_REG64, (v)) */
#define _mm512_storeu_epi32(addr,v)  _mm512_mask_storeu_epi32((addr), _MM_K0_REG16, (v))
#define _mm512_storeu_epi64(addr,v)  _mm512_mask_storeu_epi64((addr), _MM_K0_REG8, (v))
#define _mm512_storeu_si512          _mm512_storeu_epi32

/* #define _mm512_add_epi8(v1,v2)    _mm512_maskz_add_epi8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_add_epi16(v1,v2)   _mm512_maskz_add_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_add_epi32(v1,v2)   _mm512_maskz_add_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_add_epi64(v1,v2)   _mm512_maskz_add_epi64(_MM_K0_REG8, (v1), (v2))

/* #define _mm512_adds_epi8(v1,v2)   _mm512_maskz_adds_epi8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_adds_epi16(v1,v2)  _mm512_maskz_adds_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_adds_epu8(v1,v2)   _mm512_maskz_adds_epu8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_adds_epu16(v1,v2)  _mm512_maskz_adds_epu16((__mmask32)_MM_K0_REG64, (v1), (v2)) */

/* #define _mm512_sub_epi8(v1,v2)    _mm512_maskz_sub_epi8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_sub_epi16(v1,v2)   _mm512_maskz_sub_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_sub_epi32(v1,v2)   _mm512_maskz_sub_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_sub_epi64(v1,v2)   _mm512_maskz_sub_epi64(_MM_K0_REG8, (v1), (v2))

/* #define _mm512_subs_epi8(v1,v2)   _mm512_maskz_subs_epi8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_subs_epi16(v1,v2)  _mm512_maskz_subs_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_subs_epu8(v1,v2)   _mm512_maskz_subs_epu8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_subs_epu16(v1,v2)  _mm512_maskz_subs_epu16((__mmask32)_MM_K0_REG64, (v1), (v2)) */

#define _mm512_mul_epi32(v1,v2)     _mm512_maskz_mul_epi32(_MM_K0_REG8, (v1), (v2))
#define _mm512_mul_epu32(v1,v2)     _mm512_maskz_mul_epu32(_MM_K0_REG8, (v1), (v2))
/* #define _mm512_mulhi_epi16(v1,v2)   _mm512_maskz_mulhi_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_mulhi_epu16(v1,v2)   _mm512_maskz_mulhi_epu16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_mullo_epi16(v1,v2)   _mm512_maskz_mullo_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_mullo_epi32(v1,v2)   _mm512_maskz_mullo_epi32(_MM_K0_REG16, (v1), (v2))
/* #define _mm512_mullo_epi64(v1,v2)   _mm512_maskz_mullo_epi64(_MM_K0_REG8, (v1), (v2)) */
/* #define _mm512_mulhrs_epi16(v1,v2)  _mm512_maskz_mulhrs_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */

/* #define _mm512_abs_epi8(v1)   _mm512_maskz_abs_epi8(_MM_K0_REG64, (v1)) */
/* #define _mm512_abs_epi16(v1)  _mm512_maskz_abs_epi16((__mmask32)_MM_K0_REG64, (v1)) */
#define _mm512_abs_epi32(v1)  _mm512_maskz_abs_epi32(_MM_K0_REG16, (v1))
#define _mm512_abs_epi64(v1)  _mm512_maskz_abs_epi64(_MM_K0_REG8, (v1))

/* #define _mm512_max_epi8(v1,v2)   _mm512_maskz_max_epi8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_max_epi16(v1,v2)  _mm512_maskz_max_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_max_epi32(v1,v2)  _mm512_maskz_max_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_max_epi64(v1,v2)  _mm512_maskz_max_epi64(_MM_K0_REG8, (v1), (v2))
/* #define _mm512_max_epu8(v1,v2)   _mm512_maskz_max_epu8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_max_epu16(v1,v2)  _mm512_maskz_max_epu16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_max_epu32(v1,v2)  _mm512_maskz_max_epu32(_MM_K0_REG16, (v1), (v2))
#define _mm512_max_epu64(v1,v2)  _mm512_maskz_max_epu64(_MM_K0_REG8, (v1), (v2))

/* #define _mm512_min_epi8(v1,v2)   _mm512_maskz_min_epi8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_min_epi16(v1,v2)  _mm512_maskz_min_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_min_epi32(v1,v2)  _mm512_maskz_min_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_min_epi64(v1,v2)  _mm512_maskz_min_epi64(_MM_K0_REG8, (v1), (v2))
/* #define _mm512_min_epu8(v1,v2)   _mm512_maskz_min_epu8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_min_epu16(v1,v2)  _mm512_maskz_min_epu16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_min_epu32(v1,v2)  _mm512_maskz_min_epu32(_MM_K0_REG16, (v1), (v2))
#define _mm512_min_epu64(v1,v2)  _mm512_maskz_min_epu64(_MM_K0_REG8, (v1), (v2))

/* #define _mm512_broadcast_i32x2(v1)   _mm512_maskz_broadcast_i32x2(_MM_K0_REG16, (v1)) */
#define _mm512_broadcast_i32x4(v1)   _mm512_maskz_broadcast_i32x4(_MM_K0_REG16, (v1))
/* #define _mm512_broadcast_i32x8(v1)   _mm512_maskz_broadcast_i32x8(_MM_K0_REG16, (v1)) */
/* #define _mm512_broadcast_i64x2(v1)   _mm512_maskz_broadcast_i64x2(_MM_K0_REG16, (v1)) */
#define _mm512_broadcast_i64x4(v1)   _mm512_maskz_broadcast_i64x4(_MM_K0_REG8, (v1))
/* #define _mm512_broadcastb_epi8(v1)   _mm512_maskz_broadcastb_epi8(_MM_K0_REG64, (v1)) */
/* #define _mm512_broadcastw_epi16(v1)  _mm512_maskz_broadcastw_epi16((__mmask32)_MM_K0_REG64, (v1)) */
#define _mm512_broadcastd_epi32(v1)  _mm512_maskz_broadcastd_epi32(_MM_K0_REG16, (v1))
#define _mm512_broadcastq_epi64(v1)  _mm512_maskz_broadcastq_epi64(_MM_K0_REG8, (v1))

#define _mm512_extracti32x4_epi32(v1,e1)  _mm512_maskz_extracti32x4_epi32(_MM_K0_REG8, (v1), (e1))
/* #define _mm512_extracti32x8_epi32(v1,e1)  _mm512_maskz_extracti32x8_epi32(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_extracti64x2_epi64(v1,e1)  _mm512_maskz_extracti64x2_epi64(_MM_K0_REG8, (v1), (e1)) */
#define _mm512_extracti64x4_epi64(v1,e1)  _mm512_maskz_extracti64x4_epi64(_MM_K0_REG8, (v1), (e1))

#define _mm512_inserti32x4(v1,v2,e1)  _mm512_maskz_inserti32x4(_MM_K0_REG16, (v1), (v2), (e1))
/* #define _mm512_inserti32x8(v1,v2,e1)  _mm512_maskz_inserti32x8(_MM_K0_REG16, (v1), (v2), (e1)) */
/* #define _mm512_inserti64x2(v1,v2,e1)  _mm512_maskz_inserti64x2(_MM_K0_REG8, (v1), (v2), (e1)) */
#define _mm512_inserti64x4(v1,v2,e1)  _mm512_maskz_inserti64x4(_MM_K0_REG8, (v1), (v2), (e1))

/* #define _mm512_shuffle_epi8(v1,v2)      _mm512_maskz_shuffle_epi8(_MM_K0_REG64, (v1), (v2)) */
#define _mm512_shuffle_epi32(v1,e1)     _mm512_maskz_shuffle_epi32(_MM_K0_REG16, (v1), (e1))
#define _mm512_shuffle_i32x4(v1,v2,e1)  _mm512_maskz_shuffle_i32x4(_MM_K0_REG16, (v1), (v2), (e1))
#define _mm512_shuffle_i64x2(v1,v2,e1)  _mm512_maskz_shuffle_i64x2(_MM_K0_REG8, (v1), (v2), (e1))
/* #define _mm512_shufflehi_epi16(v1,e1)   _mm512_maskz_shufflehi_epi16((__mmask32)_MM_K0_REG64, (v1), (e1)) */
/* #define _mm512_shufflelo_epi16(v1,e1)   _mm512_maskz_shufflelo_epi16((__mmask32)_MM_K0_REG64, (v1), (e1)) */

/* #define _mm512_alignr_epi8(v1,v2,e1)   _mm512_maskz_alignr_epi8(_MM_K0_REG64, (v1), (v2), (e1)) */
#define _mm512_alignr_epi32(v1,v2,e1)  _mm512_maskz_alignr_epi32(_MM_K0_REG16, (v1), (v2), (e1))
#define _mm512_alignr_epi64(v1,v2,e1)  _mm512_maskz_alignr_epi64(_MM_K0_REG8, (v1), (v2), (e1))

#define _mm512_and_epi32(v1,v2)     _mm512_maskz_and_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_and_epi64(v1,v2)     _mm512_maskz_and_epi64(_MM_K0_REG8, (v1), (v2))
#define _mm512_and_si512            _mm512_and_epi32

#define _mm512_andnot_epi32(v1,v2)  _mm512_maskz_andnot_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_andnot_epi64(v1,v2)  _mm512_maskz_andnot_epi64(_MM_K0_REG8, (v1), (v2))
#define _mm512_andnot_si512         _mm512_andnot_epi32

#define _mm512_or_epi32(v1,v2)  _mm512_maskz_or_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_or_epi64(v1,v2)  _mm512_maskz_or_epi64(_MM_K0_REG8, (v1), (v2))
#define _mm512_or_si512         _mm512_or_epi32

#define _mm512_xor_epi32(v1,v2)  _mm512_maskz_xor_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_xor_epi64(v1,v2)  _mm512_maskz_xor_epi64(_MM_K0_REG8, (v1), (v2))
#define _mm512_xor_si512         _mm512_xor_epi32

/* #define _mm512_sll_epi16(v1,v2)   _mm512_maskz_sll_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_sll_epi32(v1,v2)   _mm512_maskz_sll_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_sll_epi64(v1,v2)   _mm512_maskz_sll_epi64(_MM_K0_REG8, (v1), (v2))
/* #define _mm512_slli_epi16(v1,e1)  _mm512_maskz_slli_epi16((__mmask32)_MM_K0_REG64, (v1), (e1)) */
#define _mm512_slli_epi32(v1,e1)  _mm512_maskz_slli_epi32(_MM_K0_REG16, (v1), (e1))
#define _mm512_slli_epi64(v1,e1)  _mm512_maskz_slli_epi64(_MM_K0_REG8, (v1), (e1))
/* #define _mm512_sllv_epi16(v1,v2)  _mm512_maskz_sllv_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_sllv_epi32(v1,v2)  _mm512_maskz_sllv_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_sllv_epi64(v1,v2)  _mm512_maskz_sllv_epi64(_MM_K0_REG8, (v1), (v2))

/* #define _mm512_srl_epi16(v1,v2)   _mm512_maskz_srl_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_srl_epi32(v1,v2)   _mm512_maskz_srl_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_srl_epi64(v1,v2)   _mm512_maskz_srl_epi64(_MM_K0_REG8, (v1), (v2))
/* #define _mm512_srli_epi16(v1,e1)  _mm512_maskz_srli_epi16((__mmask32)_MM_K0_REG64, (v1), (e1)) */
#define _mm512_srli_epi32(v1,e1)  _mm512_maskz_srli_epi32(_MM_K0_REG16, (v1), (e1))
#define _mm512_srli_epi64(v1,e1)  _mm512_maskz_srli_epi64(_MM_K0_REG8, (v1), (e1))
/* #define _mm512_srlv_epi16(v1,v2)  _mm512_maskz_srlv_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_srlv_epi32(v1,v2)  _mm512_maskz_srlv_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_srlv_epi64(v1,v2)  _mm512_maskz_srlv_epi64(_MM_K0_REG8, (v1), (v2))

/* #define _mm512_sra_epi16(v1,v2)   _mm512_maskz_sra_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_sra_epi32(v1,v2)   _mm512_maskz_sra_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_sra_epi64(v1,v2)   _mm512_maskz_sra_epi64(_MM_K0_REG8, (v1), (v2))
/* #define _mm512_srai_epi16(v1,e1)  _mm512_maskz_srai_epi16((__mmask32)_MM_K0_REG64, (v1), (e1)) */
#define _mm512_srai_epi32(v1,e1)  _mm512_maskz_srai_epi32(_MM_K0_REG16, (v1), (e1))
#define _mm512_srai_epi64(v1,e1)  _mm512_maskz_srai_epi64(_MM_K0_REG8, (v1), (e1))
/* #define _mm512_srav_epi16(v1,v2)  _mm512_maskz_srav_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_srav_epi32(v1,v2)  _mm512_maskz_srav_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_srav_epi64(v1,v2)  _mm512_maskz_srav_epi64(_MM_K0_REG8, (v1), (v2))

#define _mm512_rol_epi32(v1,e1)   _mm512_maskz_rol_epi32(_MM_K0_REG16, (v1), (e1))
#define _mm512_rol_epi64(v1,e1)   _mm512_maskz_rol_epi64(_MM_K0_REG8, (v1), (e1))
#define _mm512_rolv_epi32(v1,v2)  _mm512_maskz_rolv_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_rolv_epi64(v1,v2)  _mm512_maskz_rolv_epi64(_MM_K0_REG8, (v1), (v2))

#define _mm512_ror_epi32(v1,e1)   _mm512_maskz_ror_epi32(_MM_K0_REG16, (v1), (e1))
#define _mm512_ror_epi64(v1,e1)   _mm512_maskz_ror_epi64(_MM_K0_REG8, (v1), (e1))
#define _mm512_rorv_epi32(v1,v2)  _mm512_maskz_rorv_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_rorv_epi64(v1,v2)  _mm512_maskz_rorv_epi64(_MM_K0_REG8, (v1), (v2))

/* #define _mm512_unpackhi_epi8(v1,v2)   _mm512_maskz_unpackhi_epi8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_unpackhi_epi16(v1,v2)  _mm512_maskz_unpackhi_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_unpackhi_epi32(v1,v2)  _mm512_maskz_unpackhi_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_unpackhi_epi64(v1,v2)  _mm512_maskz_unpackhi_epi64(_MM_K0_REG8, (v1), (v2))
/* #define _mm512_unpacklo_epi8(v1,v2)   _mm512_maskz_unpacklo_epi8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_unpacklo_epi16(v1,v2)  _mm512_maskz_unpacklo_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_unpacklo_epi32(v1,v2)  _mm512_maskz_unpacklo_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_unpacklo_epi64(v1,v2)  _mm512_maskz_unpacklo_epi64(_MM_K0_REG8, (v1), (v2))

#define _mm512_permutex_epi64(v1,e1)         _mm512_maskz_permutex_epi64(_MM_K0_REG8, (v1), (e1))
/* #define _mm512_permutexvar_epi16(v1,v2)      _mm512_maskz_permutexvar_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_permutexvar_epi32(v1,v2)      _mm512_maskz_permutexvar_epi32(_MM_K0_REG16, (v1), (v2))
#define _mm512_permutexvar_epi64(v1,v2)      _mm512_maskz_permutexvar_epi64(_MM_K0_REG8, (v1), (v2))
/* #define _mm512_permutex2var_epi16(v1,v2,v3)  _mm512_maskz_permutex2var_epi16((__mmask32)_MM_K0_REG64, (v1), (v2), (v3)) */
#define _mm512_permutex2var_epi32(v1,v2,v3)  _mm512_maskz_permutex2var_epi32(_MM_K0_REG16, (v1), (v2), (v3))
#define _mm512_permutex2var_epi64(v1,v2,v3)  _mm512_maskz_permutex2var_epi64(_MM_K0_REG8, (v1), (v2), (v3))

#define _mm512_ternarylogic_epi32(v1,v2,v3,e1)  _mm512_maskz_ternarylogic_epi32(_MM_K0_REG16, (v1), (v2), (v3), (e1))
#define _mm512_ternarylogic_epi64(v1,v2,v3,e1)  _mm512_maskz_ternarylogic_epi64(_MM_K0_REG8, (v1), (v2), (v3), (e1))

/* #define _mm512_conflict_epi32(v1)  _mm512_maskz_conflict_epi32(_MM_K0_REG16, (v1)) */
/* #define _mm512_conflict_epi64(v1)  _mm512_maskz_conflict_epi64(_MM_K0_REG8, (v1)) */

/* #define _mm512_lzcnt_epi32(v1)  _mm512_maskz_lzcnt_epi32(_MM_K0_REG16, (v1)) */
/* #define _mm512_lzcnt_epi64(v1)  _mm512_maskz_lzcnt_epi64(_MM_K0_REG8, (v1)) */

/* #define _mm512_avg_epu8(v1,v2)   _mm512_maskz_avg_epu8(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_avg_epu16(v1,v2)  _mm512_maskz_avg_epu16((__mmask32)_MM_K0_REG64, (v1), (v2)) */

/* #define _mm512_dbsad_epu8(v1,v2,e1)  _mm512_maskz_dbsad_epu8((__mmask32)_MM_K0_REG64, (v1), (v2), (e1)) */

/* #define _mm512_madd_epi16(v1,v2)     _mm512_maskz_madd_epi16(_MM_K0_REG16, (v1), (v2)) */
/* #define _mm512_maddubs_epi16(v1,v2)  _mm512_maskz_maddubs_epi16((__mmask32)_MM_K0_REG64, (v1), (v2)) */

/* #define _mm512_packs_epi16(v1,v2)   _mm512_maskz_packs_epi16(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_packs_epi32(v1,v2)   _mm512_maskz_packs_epi32((__mmask32)_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_packus_epi16(v1,v2)  _mm512_maskz_packus_epi16(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_packus_epi32(v1,v2)  _mm512_maskz_packus_epi32((__mmask32)_MM_K0_REG64, (v1), (v2)) */

/* #define _mm512_cmp_epi8_mask(v1,v2,e1)   _mm512_mask_cmp_epi8_mask(_MM_K0_REG64, (v1), (v2), (e1)) */
/* #define _mm512_cmp_epi16_mask(v1,v2,e1)  _mm512_mask_cmp_epi16_mask((__mmask32)_MM_K0_REG64, (v1), (v2), (e1)) */
#define _mm512_cmp_epi32_mask(v1,v2,e1)  _mm512_mask_cmp_epi32_mask(_MM_K0_REG16, (v1), (v2), (e1))
#define _mm512_cmp_epi64_mask(v1,v2,e1)  _mm512_mask_cmp_epi64_mask(_MM_K0_REG8, (v1), (v2), (e1))
/* #define _mm512_cmp_epu8_mask(v1,v2,e1)   _mm512_mask_cmp_epu8_mask(_MM_K0_REG64, (v1), (v2), (e1)) */
/* #define _mm512_cmp_epu16_mask(v1,v2,e1)  _mm512_mask_cmp_epu16_mask((__mmask32)_MM_K0_REG64, (v1), (v2), (e1)) */
#define _mm512_cmp_epu32_mask(v1,v2,e1)  _mm512_mask_cmp_epu32_mask(_MM_K0_REG16, (v1), (v2), (e1))
#define _mm512_cmp_epu64_mask(v1,v2,e1)  _mm512_mask_cmp_epu64_mask(_MM_K0_REG8, (v1), (v2), (e1))

/* #define _mm512_cmpeq_epi8_mask(v1,v2)   _mm512_cmp_epi8_mask((v1), (v2), _MM_CMPINT_EQ) */
/* #define _mm512_cmpge_epi8_mask(v1,v2)   _mm512_cmp_epi8_mask((v1), (v2), _MM_CMPINT_GE) */
/* #define _mm512_cmpgt_epi8_mask(v1,v2)   _mm512_cmp_epi8_mask((v1), (v2), _MM_CMPINT_GT) */
/* #define _mm512_cmple_epi8_mask(v1,v2)   _mm512_cmp_epi8_mask((v1), (v2), _MM_CMPINT_LE) */
/* #define _mm512_cmplt_epi8_mask(v1,v2)   _mm512_cmp_epi8_mask((v1), (v2), _MM_CMPINT_LT) */
/* #define _mm512_cmpneq_epi8_mask(v1,v2)  _mm512_cmp_epi8_mask((v1), (v2), _MM_CMPINT_NE) */
/* #define _mm512_cmpeq_epu8_mask(v1,v2)   _mm512_cmp_epu8_mask((v1), (v2), _MM_CMPINT_EQ) */
/* #define _mm512_cmpge_epu8_mask(v1,v2)   _mm512_cmp_epu8_mask((v1), (v2), _MM_CMPINT_GE) */
/* #define _mm512_cmpgt_epu8_mask(v1,v2)   _mm512_cmp_epu8_mask((v1), (v2), _MM_CMPINT_GT) */
/* #define _mm512_cmple_epu8_mask(v1,v2)   _mm512_cmp_epu8_mask((v1), (v2), _MM_CMPINT_LE) */
/* #define _mm512_cmplt_epu8_mask(v1,v2)   _mm512_cmp_epu8_mask((v1), (v2), _MM_CMPINT_LT) */
/* #define _mm512_cmpneq_epu8_mask(v1,v2)  _mm512_cmp_epu8_mask((v1), (v2), _MM_CMPINT_NE) */

/* #define _mm512_cmpeq_epi16_mask(v1,v2)   _mm512_cmp_epi16_mask((v1), (v2), _MM_CMPINT_EQ) */
/* #define _mm512_cmpge_epi16_mask(v1,v2)   _mm512_cmp_epi16_mask((v1), (v2), _MM_CMPINT_GE) */
/* #define _mm512_cmpgt_epi16_mask(v1,v2)   _mm512_cmp_epi16_mask((v1), (v2), _MM_CMPINT_GT) */
/* #define _mm512_cmple_epi16_mask(v1,v2)   _mm512_cmp_epi16_mask((v1), (v2), _MM_CMPINT_LE) */
/* #define _mm512_cmplt_epi16_mask(v1,v2)   _mm512_cmp_epi16_mask((v1), (v2), _MM_CMPINT_LT) */
/* #define _mm512_cmpneq_epi16_mask(v1,v2)  _mm512_cmp_epi16_mask((v1), (v2), _MM_CMPINT_NE) */
/* #define _mm512_cmpeq_epu16_mask(v1,v2)   _mm512_cmp_epu16_mask((v1), (v2), _MM_CMPINT_EQ) */
/* #define _mm512_cmpge_epu16_mask(v1,v2)   _mm512_cmp_epu16_mask((v1), (v2), _MM_CMPINT_GE) */
/* #define _mm512_cmpgt_epu16_mask(v1,v2)   _mm512_cmp_epu16_mask((v1), (v2), _MM_CMPINT_GT) */
/* #define _mm512_cmple_epu16_mask(v1,v2)   _mm512_cmp_epu16_mask((v1), (v2), _MM_CMPINT_LE) */
/* #define _mm512_cmplt_epu16_mask(v1,v2)   _mm512_cmp_epu16_mask((v1), (v2), _MM_CMPINT_LT) */
/* #define _mm512_cmpneq_epu16_mask(v1,v2)  _mm512_cmp_epu16_mask((v1), (v2), _MM_CMPINT_NE) */

#define _mm512_cmpeq_epi32_mask(v1,v2)   _mm512_cmp_epi32_mask((v1), (v2), _MM_CMPINT_EQ)
#define _mm512_cmpge_epi32_mask(v1,v2)   _mm512_cmp_epi32_mask((v1), (v2), _MM_CMPINT_GE)
#define _mm512_cmpgt_epi32_mask(v1,v2)   _mm512_cmp_epi32_mask((v1), (v2), _MM_CMPINT_GT)
#define _mm512_cmple_epi32_mask(v1,v2)   _mm512_cmp_epi32_mask((v1), (v2), _MM_CMPINT_LE)
#define _mm512_cmplt_epi32_mask(v1,v2)   _mm512_cmp_epi32_mask((v1), (v2), _MM_CMPINT_LT)
#define _mm512_cmpneq_epi32_mask(v1,v2)  _mm512_cmp_epi32_mask((v1), (v2), _MM_CMPINT_NE)
#define _mm512_cmpeq_epu32_mask(v1,v2)   _mm512_cmp_epu32_mask((v1), (v2), _MM_CMPINT_EQ)
#define _mm512_cmpge_epu32_mask(v1,v2)   _mm512_cmp_epu32_mask((v1), (v2), _MM_CMPINT_GE)
#define _mm512_cmpgt_epu32_mask(v1,v2)   _mm512_cmp_epu32_mask((v1), (v2), _MM_CMPINT_GT)
#define _mm512_cmple_epu32_mask(v1,v2)   _mm512_cmp_epu32_mask((v1), (v2), _MM_CMPINT_LE)
#define _mm512_cmplt_epu32_mask(v1,v2)   _mm512_cmp_epu32_mask((v1), (v2), _MM_CMPINT_LT)
#define _mm512_cmpneq_epu32_mask(v1,v2)  _mm512_cmp_epu32_mask((v1), (v2), _MM_CMPINT_NE)

#define _mm512_cmpeq_epi64_mask(v1,v2)   _mm512_cmp_epi64_mask((v1), (v2), _MM_CMPINT_EQ)
#define _mm512_cmpge_epi64_mask(v1,v2)   _mm512_cmp_epi64_mask((v1), (v2), _MM_CMPINT_GE)
#define _mm512_cmpgt_epi64_mask(v1,v2)   _mm512_cmp_epi64_mask((v1), (v2), _MM_CMPINT_GT)
#define _mm512_cmple_epi64_mask(v1,v2)   _mm512_cmp_epi64_mask((v1), (v2), _MM_CMPINT_LE)
#define _mm512_cmplt_epi64_mask(v1,v2)   _mm512_cmp_epi64_mask((v1), (v2), _MM_CMPINT_LT)
#define _mm512_cmpneq_epi64_mask(v1,v2)  _mm512_cmp_epi64_mask((v1), (v2), _MM_CMPINT_NE)
#define _mm512_cmpeq_epu64_mask(v1,v2)   _mm512_cmp_epu64_mask((v1), (v2), _MM_CMPINT_EQ)
#define _mm512_cmpge_epu64_mask(v1,v2)   _mm512_cmp_epu64_mask((v1), (v2), _MM_CMPINT_GE)
#define _mm512_cmpgt_epu64_mask(v1,v2)   _mm512_cmp_epu64_mask((v1), (v2), _MM_CMPINT_GT)
#define _mm512_cmple_epu64_mask(v1,v2)   _mm512_cmp_epu64_mask((v1), (v2), _MM_CMPINT_LE)
#define _mm512_cmplt_epu64_mask(v1,v2)   _mm512_cmp_epu64_mask((v1), (v2), _MM_CMPINT_LT)
#define _mm512_cmpneq_epu64_mask(v1,v2)  _mm512_cmp_epu64_mask((v1), (v2), _MM_CMPINT_NE)

/* #define _mm512_mask_cmpeq_epi8_mask(k1,v1,v2)   _mm512_mask_cmp_epi8_mask((k1), (v1), (v2), _MM_CMPINT_EQ) */
/* #define _mm512_mask_cmplt_epi8_mask(k1,v1,v2)   _mm512_mask_cmp_epi8_mask((k1), (v1), (v2), _MM_CMPINT_LT) */
/* #define _mm512_mask_cmple_epi8_mask(k1,v1,v2)   _mm512_mask_cmp_epi8_mask((k1), (v1), (v2), _MM_CMPINT_LE) */
/* #define _mm512_mask_cmpgt_epi8_mask(k1,v1,v2)   _mm512_mask_cmp_epi8_mask((k1), (v1), (v2), _MM_CMPINT_GT) */
/* #define _mm512_mask_cmpge_epi8_mask(k1,v1,v2)   _mm512_mask_cmp_epi8_mask((k1), (v1), (v2), _MM_CMPINT_GE) */
/* #define _mm512_mask_cmpneq_epi8_mask(k1,v1,v2)  _mm512_mask_cmp_epi8_mask((k1), (v1), (v2), _MM_CMPINT_NE) */
/* #define _mm512_mask_cmpeq_epu8_mask(k1,v1,v2)   _mm512_mask_cmp_epu8_mask((k1), (v1), (v2), _MM_CMPINT_EQ) */
/* #define _mm512_mask_cmplt_epu8_mask(k1,v1,v2)   _mm512_mask_cmp_epu8_mask((k1), (v1), (v2), _MM_CMPINT_LT) */
/* #define _mm512_mask_cmple_epu8_mask(k1,v1,v2)   _mm512_mask_cmp_epu8_mask((k1), (v1), (v2), _MM_CMPINT_LE) */
/* #define _mm512_mask_cmpgt_epu8_mask(k1,v1,v2)   _mm512_mask_cmp_epu8_mask((k1), (v1), (v2), _MM_CMPINT_GT) */
/* #define _mm512_mask_cmpge_epu8_mask(k1,v1,v2)   _mm512_mask_cmp_epu8_mask((k1), (v1), (v2), _MM_CMPINT_GE) */
/* #define _mm512_mask_cmpneq_epu8_mask(k1,v1,v2)  _mm512_mask_cmp_epu8_mask((k1), (v1), (v2), _MM_CMPINT_NE) */

/* #define _mm512_mask_cmpeq_epi16_mask(k1,v1,v2)   _mm512_mask_cmp_epi16_mask((k1), (v1), (v2), _MM_CMPINT_EQ) */
/* #define _mm512_mask_cmplt_epi16_mask(k1,v1,v2)   _mm512_mask_cmp_epi16_mask((k1), (v1), (v2), _MM_CMPINT_LT) */
/* #define _mm512_mask_cmple_epi16_mask(k1,v1,v2)   _mm512_mask_cmp_epi16_mask((k1), (v1), (v2), _MM_CMPINT_LE) */
/* #define _mm512_mask_cmpgt_epi16_mask(k1,v1,v2)   _mm512_mask_cmp_epi16_mask((k1), (v1), (v2), _MM_CMPINT_GT) */
/* #define _mm512_mask_cmpge_epi16_mask(k1,v1,v2)   _mm512_mask_cmp_epi16_mask((k1), (v1), (v2), _MM_CMPINT_GE) */
/* #define _mm512_mask_cmpneq_epi16_mask(k1,v1,v2)  _mm512_mask_cmp_epi16_mask((k1), (v1), (v2), _MM_CMPINT_NE) */
/* #define _mm512_mask_cmpeq_epu16_mask(k1,v1,v2)   _mm512_mask_cmp_epu16_mask((k1), (v1), (v2), _MM_CMPINT_EQ) */
/* #define _mm512_mask_cmplt_epu16_mask(k1,v1,v2)   _mm512_mask_cmp_epu16_mask((k1), (v1), (v2), _MM_CMPINT_LT) */
/* #define _mm512_mask_cmple_epu16_mask(k1,v1,v2)   _mm512_mask_cmp_epu16_mask((k1), (v1), (v2), _MM_CMPINT_LE) */
/* #define _mm512_mask_cmpgt_epu16_mask(k1,v1,v2)   _mm512_mask_cmp_epu16_mask((k1), (v1), (v2), _MM_CMPINT_GT) */
/* #define _mm512_mask_cmpge_epu16_mask(k1,v1,v2)   _mm512_mask_cmp_epu16_mask((k1), (v1), (v2), _MM_CMPINT_GE) */
/* #define _mm512_mask_cmpneq_epu16_mask(k1,v1,v2)  _mm512_mask_cmp_epu16_mask((k1), (v1), (v2), _MM_CMPINT_NE) */

#define _mm512_mask_cmpeq_epi32_mask(k1,v1,v2)   _mm512_mask_cmp_epi32_mask((k1), (v1), (v2), _MM_CMPINT_EQ)
#define _mm512_mask_cmpge_epi32_mask(k1,v1,v2)   _mm512_mask_cmp_epi32_mask((k1), (v1), (v2), _MM_CMPINT_GE)
#define _mm512_mask_cmpgt_epi32_mask(k1,v1,v2)   _mm512_mask_cmp_epi32_mask((k1), (v1), (v2), _MM_CMPINT_GT)
#define _mm512_mask_cmple_epi32_mask(k1,v1,v2)   _mm512_mask_cmp_epi32_mask((k1), (v1), (v2), _MM_CMPINT_LE)
#define _mm512_mask_cmplt_epi32_mask(k1,v1,v2)   _mm512_mask_cmp_epi32_mask((k1), (v1), (v2), _MM_CMPINT_LT)
#define _mm512_mask_cmpneq_epi32_mask(k1,v1,v2)  _mm512_mask_cmp_epi32_mask((k1), (v1), (v2), _MM_CMPINT_NE)
#define _mm512_mask_cmpeq_epu32_mask(k1,v1,v2)   _mm512_mask_cmp_epu32_mask((k1), (v1), (v2), _MM_CMPINT_EQ)
#define _mm512_mask_cmpge_epu32_mask(k1,v1,v2)   _mm512_mask_cmp_epu32_mask((k1), (v1), (v2), _MM_CMPINT_GE)
#define _mm512_mask_cmpgt_epu32_mask(k1,v1,v2)   _mm512_mask_cmp_epu32_mask((k1), (v1), (v2), _MM_CMPINT_GT)
#define _mm512_mask_cmple_epu32_mask(k1,v1,v2)   _mm512_mask_cmp_epu32_mask((k1), (v1), (v2), _MM_CMPINT_LE)
#define _mm512_mask_cmplt_epu32_mask(k1,v1,v2)   _mm512_mask_cmp_epu32_mask((k1), (v1), (v2), _MM_CMPINT_LT)
#define _mm512_mask_cmpneq_epu32_mask(k1,v1,v2)  _mm512_mask_cmp_epu32_mask((k1), (v1), (v2), _MM_CMPINT_NE)

#define _mm512_mask_cmpeq_epi64_mask(k1,v1,v2)   _mm512_mask_cmp_epi64_mask((k1), (v1), (v2), _MM_CMPINT_EQ)
#define _mm512_mask_cmpge_epi64_mask(k1,v1,v2)   _mm512_mask_cmp_epi64_mask((k1), (v1), (v2), _MM_CMPINT_GE)
#define _mm512_mask_cmpgt_epi64_mask(k1,v1,v2)   _mm512_mask_cmp_epi64_mask((k1), (v1), (v2), _MM_CMPINT_GT)
#define _mm512_mask_cmple_epi64_mask(k1,v1,v2)   _mm512_mask_cmp_epi64_mask((k1), (v1), (v2), _MM_CMPINT_LE)
#define _mm512_mask_cmplt_epi64_mask(k1,v1,v2)   _mm512_mask_cmp_epi64_mask((k1), (v1), (v2), _MM_CMPINT_LT)
#define _mm512_mask_cmpneq_epi64_mask(k1,v1,v2)  _mm512_mask_cmp_epi64_mask((k1), (v1), (v2), _MM_CMPINT_NE)
#define _mm512_mask_cmpeq_epu64_mask(k1,v1,v2)   _mm512_mask_cmp_epu64_mask((k1), (v1), (v2), _MM_CMPINT_EQ)
#define _mm512_mask_cmpge_epu64_mask(k1,v1,v2)   _mm512_mask_cmp_epu64_mask((k1), (v1), (v2), _MM_CMPINT_GE)
#define _mm512_mask_cmpgt_epu64_mask(k1,v1,v2)   _mm512_mask_cmp_epu64_mask((k1), (v1), (v2), _MM_CMPINT_GT)
#define _mm512_mask_cmple_epu64_mask(k1,v1,v2)   _mm512_mask_cmp_epu64_mask((k1), (v1), (v2), _MM_CMPINT_LE)
#define _mm512_mask_cmplt_epu64_mask(k1,v1,v2)   _mm512_mask_cmp_epu64_mask((k1), (v1), (v2), _MM_CMPINT_LT)
#define _mm512_mask_cmpneq_epu64_mask(k1,v1,v2)  _mm512_mask_cmp_epu64_mask((k1), (v1), (v2), _MM_CMPINT_NE)

/* #define _mm512_test_epi8_mask(v1,v2)    _mm512_mask_test_epi8_mask(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_test_epi16_mask(v1,v2)   _mm512_mask_test_epi16_mask((__mmask32)_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_testn_epi8_mask(v1,v2)   _mm512_mask_testn_epi8_mask(_MM_K0_REG64, (v1), (v2)) */
/* #define _mm512_testn_epi16_mask(v1,v2)  _mm512_mask_testn_epi16_mask((__mmask32)_MM_K0_REG64, (v1), (v2)) */
#define _mm512_test_epi32_mask(v1,v2)   _mm512_mask_test_epi32_mask(_MM_K0_REG16, (v1), (v2))
#define _mm512_test_epi64_mask(v1,v2)   _mm512_mask_test_epi64_mask(_MM_K0_REG8, (v1), (v2))
#define _mm512_testn_epi32_mask(v1,v2)  _mm512_mask_testn_epi32_mask(_MM_K0_REG16, (v1), (v2))
#define _mm512_testn_epi64_mask(v1,v2)  _mm512_mask_testn_epi64_mask(_MM_K0_REG8, (v1), (v2))

/* #define _kortestc_mask8_u8(k1,k2)   _mm512_testz_nor_mask8((k1), (k2)) */
#define _kortestc_mask16_u8(k1,k2)  _mm512_testz_nor_mask16((k1), (k2))
/* #define _kortestc_mask32_u8(k1,k2)  _mm512_testz_nor_mask32((k1), (k2)) */
/* #define _kortestc_mask64_u8(k1,k2)  _mm512_testz_nor_mask64((k1), (k2)) */

/* #define _kortestz_mask8_u8(k1,k2)   _mm512_testz_or_mask8((k1), (k2)) */
#define _kortestz_mask16_u8(k1,k2)  _mm512_testz_or_mask16((k1), (k2))
/* #define _kortestz_mask32_u8(k1,k2)  _mm512_testz_or_mask32((k1), (k2)) */
/* #define _kortestz_mask64_u8(k1,k2)  _mm512_testz_or_mask64((k1), (k2)) */

#define _mm512_kortestz(k1,k2)  ((int)_mm512_testz_or_mask16((k1), (k2)))
#define _mm512_kortestc(k1,k2)  ((int)_mm512_testz_nor_mask16((k1), (k2)))

/* #define _ktestc_mask8_u8(k1,k2)   _mm512_testz_andn_mask8((k1), (k2)) */
/* #define _ktestc_mask16_u8(k1,k2)  _mm512_testz_andn_mask16((k1), (k2)) */
/* #define _ktestc_mask32_u8(k1,k2)  _mm512_testz_andn_mask32((k1), (k2)) */
/* #define _ktestc_mask64_u8(k1,k2)  _mm512_testz_andn_mask64((k1), (k2)) */

/* #define _ktestz_mask8_u8(k1,k2)   _mm512_testz_and_mask8((k1), (k2)) */
/* #define _ktestz_mask16_u8(k1,k2)  _mm512_testz_and_mask16((k1), (k2)) */
/* #define _ktestz_mask32_u8(k1,k2)  _mm512_testz_and_mask32((k1), (k2)) */
/* #define _ktestz_mask64_u8(k1,k2)  _mm512_testz_and_mask64((k1), (k2)) */

#define _mm512_i32logather_epi64(index,addr,scale)             _mm512_i32gather_epi64(_mm512_castsi512_si256(index), (addr), (scale))
#define _mm512_mask_i32logather_epi64(v1,k1,index,addr,scale)  _mm512_mask_i32gather_epi64((v1), (k1), _mm512_castsi512_si256(index), (addr), (scale))
#define _mm512_i32logather_pd(index,addr,scale)                _mm512_i32gather_pd(_mm512_castsi512_si256(index), (addr), (scale))
#define _mm512_mask_i32logather_pd(v1,k1,index,addr,scale)     _mm512_mask_i32gather_pd((v1), (k1), _mm512_castsi512_si256(index), (addr), (scale))
#define _mm512_i32loscatter_pd(addr,index,v1,scale)            _mm512_i32scatter_pd((addr), _mm512_castsi512_si256(index), (v1), (scale))
#define _mm512_mask_i32loscatter_pd(addr,k1,index,v1,scale)    _mm512_mask_i32scatter_pd((addr), (k1), _mm512_castsi512_si256(index), (v1), (scale))

#define _mm512_cvt_roundepi32_ps(v1,e1)  _mm512_maskz_cvt_roundepi32_ps(_MM_K0_REG16, (v1), (e1))
#define _mm512_cvt_roundepu32_ps(v1,e1)  _mm512_maskz_cvt_roundepu32_ps(_MM_K0_REG16, (v1), (e1))
/* #define _mm512_cvt_roundph_ps(v1,e1)     _mm512_maskz_cvt_roundph_ps(_MM_K0_REG16, (v1), (e1)) */
/* #define _mm512_cvt_roundps_ph(v1,e1)     _mm512_maskz_cvt_roundps_ph(_MM_K0_REG16, (v1), (e1)) */
/* #define _mm512_cvt_roundepi64_ps(v1,e1)  _mm512_maskz_cvt_roundepi64_ps(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_cvt_roundepu64_ps(v1,e1)  _mm512_maskz_cvt_roundepu64_ps(_MM_K0_REG8, (v1), (e1)) */

/* #define _mm512_cvtepi8_epi16(v1)   _mm512_maskz_cvtepi8_epi16((__mmask32)_MM_K0_REG64, (v1)) */
/* #define _mm512_cvtepu8_epi16(v1)   _mm512_maskz_cvtepu8_epi16((__mmask32)_MM_K0_REG64, (v1)) */
#define _mm512_cvtepi8_epi32(v1)   _mm512_maskz_cvtepi8_epi32(_MM_K0_REG16, (v1))
#define _mm512_cvtepu8_epi32(v1)   _mm512_maskz_cvtepu8_epi32(_MM_K0_REG16, (v1))
#define _mm512_cvtepi8_epi64(v1)   _mm512_maskz_cvtepi8_epi64(_MM_K0_REG8, (v1))
#define _mm512_cvtepu8_epi64(v1)   _mm512_maskz_cvtepu8_epi64(_MM_K0_REG8, (v1))
#define _mm512_cvtepi16_epi32(v1)  _mm512_maskz_cvtepi16_epi32(_MM_K0_REG16, (v1))
#define _mm512_cvtepu16_epi32(v1)  _mm512_maskz_cvtepu16_epi32(_MM_K0_REG16, (v1))
#define _mm512_cvtepi16_epi64(v1)  _mm512_maskz_cvtepi16_epi64(_MM_K0_REG8, (v1))
#define _mm512_cvtepu16_epi64(v1)  _mm512_maskz_cvtepu16_epi64(_MM_K0_REG8, (v1))
#define _mm512_cvtepi32_epi64(v1)  _mm512_maskz_cvtepi32_epi64(_MM_K0_REG8, (v1))
#define _mm512_cvtepu32_epi64(v1)  _mm512_maskz_cvtepu32_epi64(_MM_K0_REG8, (v1))

/* #define _mm512_cvtepi16_epi8(v1)     _mm512_maskz_cvtepi16_epi8((__mmask32)_MM_K0_REG64, (v1)) */
/* #define _mm512_cvtsepi16_epi8(v1)    _mm512_maskz_cvtsepi16_epi8((__mmask32)_MM_K0_REG64, (v1)) */
/* #define _mm512_cvtusepi16_epi8(v1)   _mm512_maskz_cvtusepi16_epi8((__mmask32)_MM_K0_REG64, (v1)) */
#define _mm512_cvtepi32_epi8(v1)     _mm512_maskz_cvtepi32_epi8(_MM_K0_REG16, (v1))
#define _mm512_cvtsepi32_epi8(v1)    _mm512_maskz_cvtsepi32_epi8(_MM_K0_REG16, (v1))
#define _mm512_cvtusepi32_epi8(v1)   _mm512_maskz_cvtusepi32_epi8(_MM_K0_REG16, (v1))
#define _mm512_cvtepi32_epi16(v1)    _mm512_maskz_cvtepi32_epi16(_MM_K0_REG16, (v1))
#define _mm512_cvtsepi32_epi16(v1)   _mm512_maskz_cvtsepi32_epi16(_MM_K0_REG16, (v1))
#define _mm512_cvtusepi32_epi16(v1)  _mm512_maskz_cvtusepi32_epi16(_MM_K0_REG16, (v1))
#define _mm512_cvtepi64_epi8(v1)     _mm512_maskz_cvtepi64_epi8(_MM_K0_REG8, (v1))
#define _mm512_cvtsepi64_epi8(v1)    _mm512_maskz_cvtsepi64_epi8(_MM_K0_REG8, (v1))
#define _mm512_cvtusepi64_epi8(v1)   _mm512_maskz_cvtusepi64_epi8(_MM_K0_REG8, (v1))
#define _mm512_cvtepi64_epi16(v1)    _mm512_maskz_cvtepi64_epi16(_MM_K0_REG8, (v1))
#define _mm512_cvtsepi64_epi16(v1)   _mm512_maskz_cvtsepi64_epi16(_MM_K0_REG8, (v1))
#define _mm512_cvtusepi64_epi16(v1)  _mm512_maskz_cvtusepi64_epi16(_MM_K0_REG8, (v1))
#define _mm512_cvtepi64_epi32(v1)    _mm512_maskz_cvtepi64_epi32(_MM_K0_REG8, (v1))
#define _mm512_cvtsepi64_epi32(v1)   _mm512_maskz_cvtsepi64_epi32(_MM_K0_REG8, (v1))
#define _mm512_cvtusepi64_epi32(v1)  _mm512_maskz_cvtusepi64_epi32(_MM_K0_REG8, (v1))

#define _mm512_cvt_roundps_epi32(v1,e1)   _mm512_maskz_cvt_roundps_epi32(_MM_K0_REG16, (v1), (e1))
#define _mm512_cvt_roundps_epu32(v1,e1)   _mm512_maskz_cvt_roundps_epu32(_MM_K0_REG16, (v1), (e1))
/* #define _mm512_cvt_roundps_epi64(v1,e1)   _mm512_maskz_cvt_roundps_epi64(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_cvt_roundps_epu64(v1,e1)   _mm512_maskz_cvt_roundps_epu64(_MM_K0_REG8, (v1), (e1)) */
#define _mm512_cvt_roundpd_epi32(v1,e1)   _mm512_maskz_cvt_roundpd_epi32(_MM_K0_REG8, (v1), (e1))
#define _mm512_cvt_roundpd_epu32(v1,e1)   _mm512_maskz_cvt_roundpd_epu32(_MM_K0_REG8, (v1), (e1))
/* #define _mm512_cvt_roundpd_epi64(v1,e1)   _mm512_maskz_cvt_roundpd_epi64(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_cvt_roundpd_epu64(v1,e1)   _mm512_maskz_cvt_roundpd_epu64(_MM_K0_REG8, (v1), (e1)) */

#define _mm512_cvtt_roundps_epi32(v1,e1)  _mm512_maskz_cvtt_roundps_epi32(_MM_K0_REG16, (v1), (e1))
#define _mm512_cvtt_roundps_epu32(v1,e1)  _mm512_maskz_cvtt_roundps_epu32(_MM_K0_REG16, (v1), (e1))
/* #define _mm512_cvtt_roundps_epi64(v1,e1)  _mm512_maskz_cvtt_roundps_epi64(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_cvtt_roundps_epu64(v1,e1)  _mm512_maskz_cvtt_roundps_epu64(_MM_K0_REG8, (v1), (e1)) */
#define _mm512_cvtt_roundpd_epi32(v1,e1)  _mm512_maskz_cvtt_roundpd_epi32(_MM_K0_REG8, (v1), (e1))
#define _mm512_cvtt_roundpd_epu32(v1,e1)  _mm512_maskz_cvtt_roundpd_epu32(_MM_K0_REG8, (v1), (e1))
/* #define _mm512_cvtt_roundpd_epi64(v1,e1)  _mm512_maskz_cvtt_roundpd_epi64(_MM_K0_REG8, (v1), (e1)) */
/* #define _mm512_cvtt_roundpd_epu64(v1,e1)  _mm512_maskz_cvtt_roundpd_epu64(_MM_K0_REG8, (v1), (e1)) */

#define _mm512_cvtps_epi32(v)   _mm512_cvt_roundps_epi32((v), _MM_FROUND_CUR_DIRECTION)
#define _mm512_cvtps_epu32(v)   _mm512_cvt_roundps_epu32((v), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_cvtps_epi64(v)   _mm512_cvt_roundps_epi64((v), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_cvtps_epu64(v)   _mm512_cvt_roundps_epu64((v), _MM_FROUND_CUR_DIRECTION) */
#define _mm512_cvtpd_epi32(v)   _mm512_cvt_roundpd_epi32((v), _MM_FROUND_CUR_DIRECTION)
#define _mm512_cvtpd_epu32(v)   _mm512_cvt_roundpd_epu32((v), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_cvtpd_epi64(v)   _mm512_cvt_roundpd_epi64((v), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_cvtpd_epu64(v)   _mm512_cvt_roundpd_epu64((v), _MM_FROUND_CUR_DIRECTION) */

#define _mm512_cvttps_epi32(v)  _mm512_cvtt_roundps_epi32((v), _MM_FROUND_CUR_DIRECTION)
#define _mm512_cvttps_epu32(v)  _mm512_cvtt_roundps_epu32((v), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_cvttps_epi64(v)  _mm512_cvtt_roundps_epi64((v), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_cvttps_epu64(v)  _mm512_cvtt_roundps_epu64((v), _MM_FROUND_CUR_DIRECTION) */
#define _mm512_cvttpd_epi32(v)  _mm512_cvtt_roundpd_epi32((v), _MM_FROUND_CUR_DIRECTION)
#define _mm512_cvttpd_epu32(v)  _mm512_cvtt_roundpd_epu32((v), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_cvttpd_epi64(v)  _mm512_cvtt_roundpd_epi64((v), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_cvttpd_epu64(v)  _mm512_cvtt_roundpd_epu64((v), _MM_FROUND_CUR_DIRECTION) */

#define _mm512_maskz_cvtps_epi32(k1,v2)   _mm512_maskz_cvt_roundps_epi32((k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_cvtps_epu32(k1,v2)   _mm512_maskz_cvt_roundps_epu32((k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_maskz_cvtps_epi64(k1,v2)   _mm512_maskz_cvt_roundps_epi64((k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_cvtps_epu64(k1,v2)   _mm512_maskz_cvt_roundps_epu64((k1), (v2), _MM_FROUND_CUR_DIRECTION) */
#define _mm512_maskz_cvtpd_epi32(k1,v2)   _mm512_maskz_cvt_roundpd_epi32((k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_cvtpd_epu32(k1,v2)   _mm512_maskz_cvt_roundpd_epu32((k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_maskz_cvtpd_epi64(k1,v2)   _mm512_maskz_cvt_roundpd_epi64((k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_cvtpd_epu64(k1,v2)   _mm512_maskz_cvt_roundpd_epu64((k1), (v2), _MM_FROUND_CUR_DIRECTION) */

#define _mm512_maskz_cvttps_epi32(k1,v2)  _mm512_maskz_cvtt_roundps_epi32((k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_cvttps_epu32(k1,v2)  _mm512_maskz_cvtt_roundps_epu32((k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_maskz_cvttps_epi64(k1,v2)  _mm512_maskz_cvtt_roundps_epi64((k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_cvttps_epu64(k1,v2)  _mm512_maskz_cvtt_roundps_epu64((k1), (v2), _MM_FROUND_CUR_DIRECTION) */
#define _mm512_maskz_cvttpd_epi32(k1,v2)  _mm512_maskz_cvtt_roundpd_epi32((k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_maskz_cvttpd_epu32(k1,v2)  _mm512_maskz_cvtt_roundpd_epu32((k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_maskz_cvttpd_epi64(k1,v2)  _mm512_maskz_cvtt_roundpd_epi64((k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_maskz_cvttpd_epu64(k1,v2)  _mm512_maskz_cvtt_roundpd_epu64((k1), (v2), _MM_FROUND_CUR_DIRECTION) */

#define _mm512_mask_cvtps_epi32(v1,k1,v2)   _mm512_mask_cvt_roundps_epi32((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_cvtps_epu32(v1,k1,v2)   _mm512_mask_cvt_roundps_epu32((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_mask_cvtps_epi64(v1,k1,v2)   _mm512_mask_cvt_roundps_epi64((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_cvtps_epu64(v1,k1,v2)   _mm512_mask_cvt_roundps_epu64((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
#define _mm512_mask_cvtpd_epi32(v1,k1,v2)   _mm512_mask_cvt_roundpd_epi32((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_cvtpd_epu32(v1,k1,v2)   _mm512_mask_cvt_roundpd_epu32((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_mask_cvtpd_epi64(v1,k1,v2)   _mm512_mask_cvt_roundpd_epi64((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_cvtpd_epu64(v1,k1,v2)   _mm512_mask_cvt_roundpd_epu64((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */

#define _mm512_mask_cvttps_epi32(v1,k1,v2)  _mm512_mask_cvtt_roundps_epi32((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_cvttps_epu32(v1,k1,v2)  _mm512_mask_cvtt_roundps_epu32((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_mask_cvttps_epi64(v1,k1,v2)  _mm512_mask_cvtt_roundps_epi64((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_cvttps_epu64(v1,k1,v2)  _mm512_mask_cvtt_roundps_epu64((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
#define _mm512_mask_cvttpd_epi32(v1,k1,v2)  _mm512_mask_cvtt_roundpd_epi32((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
#define _mm512_mask_cvttpd_epu32(v1,k1,v2)  _mm512_mask_cvtt_roundpd_epu32((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION)
/* #define _mm512_mask_cvttpd_epi64(v1,k1,v2)  _mm512_mask_cvtt_roundpd_epi64((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */
/* #define _mm512_mask_cvttpd_epu64(v1,k1,v2)  _mm512_mask_cvtt_roundpd_epu64((v1), (k1), (v2), _MM_FROUND_CUR_DIRECTION) */

_AVX512DQ_(extern unsigned __int32 __cdecl _cvtmask8_u32(__mmask8))
_AVX512F_(extern unsigned __int32 __cdecl _cvtmask16_u32(__mmask16))  /* kmovw */
_AVX512BW_(extern unsigned __int32 __cdecl _cvtmask32_u32(__mmask32))
_AVX512BW_(extern unsigned __int64 __cdecl _cvtmask64_u64(__mmask64))
_AVX512DQ_(extern __mmask8 __cdecl _cvtu32_mask8(unsigned __int32))
_AVX512F_(extern __mmask16 __cdecl _cvtu32_mask16(unsigned __int32))  /* kmovw */
_AVX512BW_(extern __mmask32 __cdecl _cvtu32_mask32(unsigned __int32))
_AVX512BW_(extern __mmask32 __cdecl _cvtu64_mask64(unsigned __int64))
_AVX512DQ_(extern __mmask8 __cdecl _load_mask8(const __mmask8 *))
_AVX512F_(extern __mmask16 __cdecl _load_mask16(const __mmask16 *))  /* kmovw */
_AVX512BW_(extern __mmask32 __cdecl _load_mask32(const __mmask32 *))
_AVX512BW_(extern __mmask64 __cdecl _load_mask64(const __mmask64 *))
_AVX512DQ_(extern void __cdecl _store_mask8(__mmask8 *, __mmask8))
_AVX512F_(extern void __cdecl _store_mask16(__mmask16 *, __mmask16))  /* kmovw */
_AVX512BW_(extern void __cdecl _store_mask32(__mmask32 *, __mmask32))
_AVX512BW_(extern void __cdecl _store_mask64(__mmask64 *, __mmask64))

_AVX512F_(extern __mmask16 __cdecl _mm512_kmov(__mmask16))  /* kmovw */
_AVX512F_(extern __mmask16 __cdecl _mm512_knot(__mmask16))  /* knotw */
_AVX512F_(extern __mmask16 __cdecl _mm512_kand(__mmask16, __mmask16))  /* kandw */
_AVX512F_(extern __mmask16 __cdecl _mm512_kandn(__mmask16, __mmask16))  /* kandnw */
_AVX512F_(extern __mmask16 __cdecl _mm512_kor(__mmask16, __mmask16))  /* korw */
_AVX512F_(extern __mmask16 __cdecl _mm512_kxor(__mmask16, __mmask16))  /* kxorw */
_AVX512F_(extern __mmask16 __cdecl _mm512_kxnor(__mmask16, __mmask16))  /* kxnorw */
_AVX512F_(extern __mmask16 __cdecl _mm512_kshiftl(__mmask16, unsigned int))  /* kshiftl */
_AVX512F_(extern __mmask16 __cdecl _mm512_kshiftr(__mmask16, unsigned int))  /* kshiftr */

_AVX512F_(extern __mmask16 __cdecl _mm512_kunpackb(__mmask16, __mmask16))  /* kunpckbw */
_AVX512BW_(extern __mmask32 __cdecl _mm512_kunpackw(__mmask32, __mmask32))
_AVX512BW_(extern __mmask64 __cdecl _mm512_kunpackd(__mmask64, __mmask64))

#define _mm512_mask2int(k)  ((int)(__mmask16)(k))
#define _mm512_int2mask(n)  ((__mmask16)(n))

#define _knot_mask16  _mm512_knot
#define _kand_mask16  _mm512_kand
#define _kandn_mask16  _mm512_kandn
#define _kor_mask16  _mm512_kor
#define _kxnor_mask16  _mm512_kxnor
#define _kxor_mask16  _mm512_kxor
#define _kshiftli_mask16  _mm512_kshiftl
#define _kshiftri_mask16  _mm512_kshiftr

#endif /* __POCC__ >= 1000 && __POCC_TARGET__ == 3 */

#endif /* _ZMMINTRIN_H */
