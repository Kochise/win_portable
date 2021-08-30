#ifndef _XMMINTRIN_H
#define _XMMINTRIN_H

/* xmmintrin.h - private header for SSE intrinsics */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <xmmintrin.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

#include <mmintrin.h>

#if (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3)

#include <crtdef.h>

/* type definitions */
#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

typedef union __declspec(align(16)) __m128 {
    float m128_f32[4];
    double m128_f64[2];
    __int8 m128_i8[16];
    __int16 m128_i16[8];
    __int32 m128_i32[4];
    __int64 m128_i64[2];
    unsigned __int8 m128_u8[16];
    unsigned __int16 m128_u16[8];
    unsigned __int32 m128_u32[4];
    unsigned __int64 m128_u64[2];
} __m128;

extern _CRTIMP _CRTUSE _CRTMEM void * __cdecl _mm_malloc(size_t, size_t);
extern _CRTIMP _CRTFRE(1) void __cdecl _mm_free(void *);

/* constants for _mm_prefetch() */
#define _MM_HINT_T0   1
#define _MM_HINT_T1   2
#define _MM_HINT_T2   3
#define _MM_HINT_NTA  0

/* constants for _mm_getcsr(), _mm_setcsr() */
/* exception (bit 0-5) */
#define _MM_EXCEPT_MASK        0X003F
#define _MM_EXCEPT_INVALID     0x0001
#define _MM_EXCEPT_DENORM      0x0002
#define _MM_EXCEPT_DIV_ZERO    0x0004
#define _MM_EXCEPT_OVERFLOW    0x0008
#define _MM_EXCEPT_UNDERFLOW   0x0010
#define _MM_EXCEPT_INEXACT     0x0020
/* exception mask (bit 7-12) */
#define _MM_MASK_MASK          0X1F80
#define _MM_MASK_INVALID       0x0080
#define _MM_MASK_DENORM        0x0100
#define _MM_MASK_DIV_ZERO      0x0200
#define _MM_MASK_OVERFLOW      0x0400
#define _MM_MASK_UNDERFLOW     0x0800
#define _MM_MASK_INEXACT       0x1000
/* rounding control (bit 13-14) */
#define _MM_ROUND_MASK         0x6000
#define _MM_ROUND_NEAREST      0x0000
#define _MM_ROUND_DOWN         0x2000
#define _MM_ROUND_UP           0x4000
#define _MM_ROUND_TOWARD_ZERO  0x6000
/* flush to zero (bit 15) */
#define _MM_FLUSH_ZERO_MASK    0x8000
#define _MM_FLUSH_ZERO_ON      0x8000
#define _MM_FLUSH_ZERO_OFF     0x0000

#define _MM_GET_EXCEPTION_STATE()  (_mm_getcsr() & _MM_EXCEPT_MASK)
#define _MM_GET_EXCEPTION_MASK()   (_mm_getcsr() & _MM_MASK_MASK)
#define _MM_GET_ROUNDING_MODE()    (_mm_getcsr() & _MM_ROUND_MASK)
#define _MM_GET_FLUSH_ZERO_MODE()  (_mm_getcsr() & _MM_FLUSH_ZERO_MASK)

#define _MM_SET_EXCEPTION_STATE(mask)  _mm_setcsr((_mm_getcsr() & ~_MM_EXCEPT_MASK)|(mask))
#define _MM_SET_EXCEPTION_MASK(mask)   _mm_setcsr((_mm_getcsr() & ~_MM_MASK_MASK)|(mask))
#define _MM_SET_ROUNDING_MODE(mode)    _mm_setcsr((_mm_getcsr() & ~_MM_ROUND_MASK)|(mode))
#define _MM_SET_FLUSH_ZERO_MODE(mode)  _mm_setcsr((_mm_getcsr() & ~_MM_FLUSH_ZERO_MASK)|(mode))

#if __POCC_TARGET__ == 3

#define _MM_SHUFFLE(f3,f2,f1,f0)  (((f3)<<6)|((f2)<<4)|((f1)<<2)|((f0)))

#define _MM_TRANSPOSE4_PS(row0,row1,row2,row3) \
    do { \
        __m128 t0 = _mm_unpacklo_ps((row0),(row1)); \
        __m128 t2 = _mm_unpacklo_ps((row2),(row3)); \
        __m128 t1 = _mm_unpackhi_ps((row0),(row1)); \
        __m128 t3 = _mm_unpackhi_ps((row2),(row3)); \
        (row0) = _mm_movelh_ps(t0, t2); \
        (row1) = _mm_movehl_ps(t2, t0); \
        (row2) = _mm_movelh_ps(t1, t3); \
        (row3) = _mm_movehl_ps(t3, t1); \
    } while(0)

/* single-precision arithmetic */
extern __m128 __cdecl _mm_add_ss(__m128, __m128);  /* addss */
extern __m128 __cdecl _mm_add_ps(__m128, __m128);  /* addps */
extern __m128 __cdecl _mm_sub_ss(__m128, __m128);  /* subss */
extern __m128 __cdecl _mm_sub_ps(__m128, __m128);  /* subps */
extern __m128 __cdecl _mm_mul_ss(__m128, __m128);  /* mulss */
extern __m128 __cdecl _mm_mul_ps(__m128, __m128);  /* mulps */
extern __m128 __cdecl _mm_div_ss(__m128, __m128);  /* divss */
extern __m128 __cdecl _mm_div_ps(__m128, __m128);  /* divps */
extern __m128 __cdecl _mm_max_ss(__m128, __m128);  /* maxss */
extern __m128 __cdecl _mm_max_ps(__m128, __m128);  /* maxps */
extern __m128 __cdecl _mm_min_ss(__m128, __m128);  /* minss */
extern __m128 __cdecl _mm_min_ps(__m128, __m128);  /* minps */
extern __m128 __cdecl _mm_sqrt_ss(__m128);  /* sqrtss */
extern __m128 __cdecl _mm_sqrt_ps(__m128);  /* sqrtps */
extern __m128 __cdecl _mm_rcp_ss(__m128);  /* rcpss */
extern __m128 __cdecl _mm_rcp_ps(__m128);  /* rcpps */
extern __m128 __cdecl _mm_rsqrt_ss(__m128);  /* rsqrtss */
extern __m128 __cdecl _mm_rsqrt_ps(__m128);  /* rsqrtps */

/* single-precision logical */
extern __m128 __cdecl _mm_and_ps(__m128, __m128);  /* andps */
extern __m128 __cdecl _mm_andnot_ps(__m128, __m128);  /* andnps */
extern __m128 __cdecl _mm_or_ps(__m128, __m128);  /* orps */
extern __m128 __cdecl _mm_xor_ps(__m128, __m128);  /* xorps */

/* single-precision comparison */
extern __m128 __cdecl _mm_cmpeq_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpeq_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmplt_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmplt_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmple_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmple_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmpgt_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpgt_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmpge_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpge_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmpneq_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpneq_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmpnlt_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpnlt_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmpnle_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpnle_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmpngt_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpngt_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmpnge_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpnge_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmpord_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpord_ps(__m128, __m128);  /* cmpps */
extern __m128 __cdecl _mm_cmpunord_ss(__m128, __m128);  /* cmpss */
extern __m128 __cdecl _mm_cmpunord_ps(__m128, __m128);  /* cmpps */

extern int __cdecl _mm_comieq_ss(__m128, __m128);  /* comiss */
extern int __cdecl _mm_comilt_ss(__m128, __m128);  /* comiss */
extern int __cdecl _mm_comile_ss(__m128, __m128);  /* comiss */
extern int __cdecl _mm_comigt_ss(__m128, __m128);  /* comiss */
extern int __cdecl _mm_comige_ss(__m128, __m128);  /* comiss */
extern int __cdecl _mm_comineq_ss(__m128, __m128);  /* comiss */
extern int __cdecl _mm_ucomieq_ss(__m128, __m128);  /* ucomiss */
extern int __cdecl _mm_ucomilt_ss(__m128, __m128);  /* ucomiss */
extern int __cdecl _mm_ucomile_ss(__m128, __m128);  /* ucomiss */
extern int __cdecl _mm_ucomigt_ss(__m128, __m128);  /* ucomiss */
extern int __cdecl _mm_ucomige_ss(__m128, __m128);  /* ucomiss */
extern int __cdecl _mm_ucomineq_ss(__m128, __m128);  /* ucomiss */

/* single-precision conversion */
extern int __cdecl _mm_cvt_ss2si(__m128);  /* cvtss2si */
extern int __cdecl _mm_cvtt_ss2si(__m128);  /* cvttss2si */
extern __m128 __cdecl _mm_cvt_si2ss(__m128, int);  /* cvtsi2ss */

/* __m64 __cdecl _mm_cvt_ps2pi(__m128); */
/* __m64 __cdecl _mm_cvtt_ps2pi(__m128); */
/* __m128 __cdecl _mm_cvt_pi2ps(__m128, __m64); */

/* 64-bit */
#if __POCC_TARGET__ == 3
extern __int64 __cdecl _mm_cvtss_si64(__m128);  /* cvtss2si */
extern __int64 __cdecl _mm_cvttss_si64(__m128);  /* cvttss2si */
extern __m128 __cdecl _mm_cvtsi64_ss(__m128, __int64);  /* cvtsi2ss */
#endif /* __POCC_TARGET__ == 3 */

/* single-precision misc */
extern __m128 __cdecl _mm_shuffle_ps(__m128, __m128, const unsigned int);  /* shufps */
extern __m128 __cdecl _mm_unpackhi_ps(__m128, __m128);  /* unpckhps */
extern __m128 __cdecl _mm_unpacklo_ps(__m128, __m128);  /* unpcklps */
extern __m128 __cdecl _mm_movehl_ps(__m128, __m128);  /* movhlps */
extern __m128 __cdecl _mm_movelh_ps(__m128, __m128);  /* movlhps */
/* __m128 __cdecl _mm_loadh_pi(__m128, const __m64 *); */
/* __m128 __cdecl _mm_loadl_pi(__m128, const __m64 *); */
/* void __cdecl _mm_storeh_pi(__m64 *, __m128); */
/* void __cdecl _mm_storel_pi(__m64 *, __m128); */
extern int __cdecl _mm_movemask_ps(__m128);  /* movmskps */

/* integer extensions */
/* int __cdecl _m_pextrw(__m64, int); */
/* __m64 __cdecl _m_pinsrw(__m64, int, int); */
/* __m64 __cdecl _m_pmaxsw(__m64, __m64); */
/* __m64 __cdecl _m_pmaxub(__m64, __m64); */
/* __m64 __cdecl _m_pminsw(__m64, __m64); */
/* __m64 __cdecl _m_pminub(__m64, __m64); */
/* int __cdecl _m_pmovmskb(__m64); */
/* __m64 __cdecl _m_pmulhuw(__m64, __m64); */
/* __m64 __cdecl _m_pshufw(__m64, int); */
/* void __cdecl _m_maskmovq(__m64, __m64, char *); */
/* __m64 __cdecl _m_pavgb(__m64, __m64); */
/* __m64 __cdecl _m_pavgw(__m64, __m64); */
/* __m64 __cdecl _m_psadbw(__m64, __m64); */

/* memory and initialization */
extern __m128 __cdecl _mm_set_ss(float);  /* xorps + movss */
extern __m128 __cdecl _mm_set_ps1(float);  /* movss + shufps */
extern __m128 __cdecl _mm_set_ps(float, float, float, float);  /* composite */
extern __m128 __cdecl _mm_setr_ps(float, float, float, float);  /* composite */
extern __m128 __cdecl _mm_setzero_ps(void);  /* xorps */
extern __m128 __cdecl _mm_load_ss(const float *);  /* movss */
extern __m128 __cdecl _mm_load_ps1(const float *);  /* movss + shufps */
extern __m128 __cdecl _mm_load_ps(const float *);  /* movaps */
extern __m128 __cdecl _mm_loadr_ps(const float *);  /* movaps + shufps */
extern __m128 __cdecl _mm_loadu_ps(const float *);  /* movups */
extern void __cdecl _mm_store_ss(float *, __m128);  /* movss */
extern void __cdecl _mm_store_ps1(float *, __m128);  /* shufps + movaps */
extern void __cdecl _mm_store_ps(float *, __m128);  /* movaps */
extern void __cdecl _mm_storer_ps(float *, __m128);  /* shufps + movaps */
extern void __cdecl _mm_storeu_ps(float *, __m128);  /* movups */
/* void __cdecl _mm_stream_pi(__m64 *, __m64); */
extern void __cdecl _mm_stream_ps(float *, __m128);  /* movntps */
extern __m128 __cdecl _mm_move_ss(__m128, __m128);  /* movss */
extern float __cdecl _mm_cvtss_f32(__m128);  /* movss */

/* Alternate names */
#define _mm_cvtss_si32  _mm_cvt_ss2si
/* #define _mm_cvtps_pi32  _mm_cvt_ps2pi */
#define _mm_cvttss_si32  _mm_cvtt_ss2si
/* #define _mm_cvttps_pi32  _mm_cvtt_ps2pi */
#define _mm_cvtsi32_ss  _mm_cvt_si2ss
/* #define _mm_cvtpi32_ps  _mm_cvt_pi2ps */
/* #define _mm_extract_pi16  _m_pextrw */
/* #define _mm_insert_pi16  _m_pinsrw */
/* #define _mm_max_pi16  _m_pmaxsw */
/* #define _mm_max_pu8  _m_pmaxub */
/* #define _mm_min_pi16  _m_pminsw */
/* #define _mm_min_pu8  _m_pminub */
/* #define _mm_movemask_pi8  _m_pmovmskb */
/* #define _mm_mulhi_pu16  _m_pmulhuw */
/* #define _mm_shuffle_pi16  _m_pshufw */
/* #define _mm_maskmove_si64  _m_maskmovq */
/* #define _mm_avg_pu8  _m_pavgb */
/* #define _mm_avg_pu16  _m_pavgw */
/* #define _mm_sad_pu8  _m_psadbw */
#define _mm_set1_ps  _mm_set_ps1
#define _mm_load1_ps  _mm_load_ps1
#define _mm_store1_ps  _mm_store_ps1

#endif /* __POCC_TARGET__ == 3 */

/*
#define _mm_cvtpi16_ps(a) \
    _mm_cvtpi32_ps(_mm_movelh_ps(_mm_setzero_ps(), _mm_cvtpi32_ps(_mm_setzero_ps(), \
        _mm_unpackhi_pi16((a), _mm_cmpgt_pi16(_mm_setzero_si64(), (a))))), \
        _mm_unpacklo_pi16((a), _mm_cmpgt_pi16(_mm_setzero_si64(), (a))))

#define _mm_cvtpu16_ps(a) \
    _mm_cvtpi32_ps(_mm_movelh_ps(_mm_setzero_ps(), _mm_cvtpi32_ps(_mm_setzero_ps(), \
        _mm_unpackhi_pi16((a), _mm_setzero_si64()))), _mm_unpacklo_pi16((a), _mm_setzero_si64()))

#define _mm_cvtps_pi16(a) \
    _mm_packs_pi32(_mm_cvtps_pi32(a), _mm_cvtps_pi32(_mm_movehl_ps((a), (a))))

#define _mm_cvtpi8_ps(a) \
    _mm_cvtpi16_ps(_mm_unpacklo_pi8((a), _mm_cmpgt_pi8(_mm_setzero_si64(), (a))))

#define _mm_cvtpu8_ps(a) \
    _mm_cvtpu16_ps(_mm_unpacklo_pi8((a), _mm_setzero_si64()))

#define _mm_cvtps_pi8(a) \
    _mm_packs_pi16(_mm_cvtps_pi16(a), _mm_setzero_si64())

#define _mm_cvtpi32x2_ps(a,b) \
    _mm_movelh_ps(_mm_cvt_pi2ps(_mm_setzero_ps(), (a)), \
                  _mm_cvt_pi2ps(_mm_setzero_ps(), (b)))
*/

extern void __cdecl _mm_prefetch(const char *, int);  /* prefetch* */
extern void __cdecl _mm_sfence(void);  /* sfence */
extern unsigned int __cdecl _mm_getcsr(void);  /* stmxcsr */
extern void __cdecl _mm_setcsr(unsigned int);  /* ldmxcsr */

#endif /* (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3) */

#endif /* !RC_INVOKED */

#endif /* _XMMINTRIN_H */
