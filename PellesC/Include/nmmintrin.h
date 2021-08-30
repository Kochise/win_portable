#ifndef _NMMINTRIN_H
#define _NMMINTRIN_H

/* nmmintrin.h - private header for SSE4.2 intrinsics */

#if __POCC__ >= 500
#pragma once
#endif

#include <smmintrin.h>

#if __POCC__ >= 650 && (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3)

/*
#define _MM_ULE_MASK  0x20000
#define _MM_ULE_ON    0x20000
#define _MM_ULE_OFF   0x00000

#define _MM_SET_ULE_MODE(mode)  _mm_setcsr((_mm_getcsr() & ~_MM_ULE_MASK) | (mode))
#define _MM_GET_ULE_MODE()  (_mm_getcsr() & _MM_ULE_MASK)
*/

#if __POCC_TARGET__ == 3

/* source data format (bit 0-1) */
#define _SIDD_UBYTE_OPS  0x00
#define _SIDD_UWORD_OPS  0x01
#define _SIDD_SBYTE_OPS  0x02
#define _SIDD_SWORD_OPS  0x03

/* aggregation operation (bit 2-3) */
#define _SIDD_CMP_EQUAL_ANY  0x00
#define _SIDD_CMP_RANGES  0x04
#define _SIDD_CMP_EQUAL_EACH  0x08
#define _SIDD_CMP_EQUAL_ORDERED  0x0C

/* polarity (bit 4-5) */
#define _SIDD_POSITIVE_POLARITY  0x00
#define _SIDD_NEGATIVE_POLARITY  0x10
#define _SIDD_MASKED_POSITIVE_POLARITY  0x20
#define _SIDD_MASKED_NEGATIVE_POLARITY  0x30

/* output selection (bit 6) - pcmpestri/pcmpistri */
#define _SIDD_LEAST_SIGNIFICANT  0x00
#define _SIDD_MOST_SIGNIFICANT  0x40

/* output selection (bit 6) - pcmpestrm/pcmpistrm */
#define _SIDD_BIT_MASK  0x00
#define _SIDD_UNIT_MASK  0x40

extern __m128i __cdecl _mm_cmpistrm(__m128i, __m128i, const int);  /* pcmpistrm */
extern int __cdecl _mm_cmpistri(__m128i, __m128i, const int);  /* pcmpistri */

extern __m128i __cdecl _mm_cmpestrm(__m128i, int, __m128i, int, const int);  /* pcmpestrm */
extern int __cdecl _mm_cmpestri(__m128i, int, __m128i, int, const int);  /* pcmpestri */

extern int __cdecl _mm_cmpistrz(__m128i, __m128i, const int);  /* composite */
extern int __cdecl _mm_cmpistrc(__m128i, __m128i, const int);  /* composite */
extern int __cdecl _mm_cmpistrs(__m128i, __m128i, const int);  /* composite */
extern int __cdecl _mm_cmpistro(__m128i, __m128i, const int);  /* composite */
extern int __cdecl _mm_cmpistra(__m128i, __m128i, const int);  /* composite */

extern int __cdecl _mm_cmpestrz(__m128i, int, __m128i, int, const int);  /* composite */
extern int __cdecl _mm_cmpestrc(__m128i, int, __m128i, int, const int);  /* composite */
extern int __cdecl _mm_cmpestrs(__m128i, int, __m128i, int, const int);  /* composite */
extern int __cdecl _mm_cmpestro(__m128i, int, __m128i, int, const int);  /* composite */
extern int __cdecl _mm_cmpestra(__m128i, int, __m128i, int, const int);  /* composite */

extern __m128i __cdecl _mm_cmpgt_epi64(__m128i, __m128i);  /* pcmpgtq */

extern __int64 __cdecl _mm_popcnt_u64(unsigned __int64);  /* popcnt */

extern unsigned __int64 __cdecl _mm_crc32_u64(unsigned __int64, unsigned __int64);  /* crc32 */

#endif /* __POCC_TARGET__ == 3 */

extern __int32 __cdecl _mm_popcnt_u32(unsigned __int32);  /* popcnt */

extern unsigned __int32 __cdecl _mm_crc32_u8(unsigned __int32, unsigned __int8);  /* crc32 */
extern unsigned __int32 __cdecl _mm_crc32_u16(unsigned __int32, unsigned __int16);  /* crc32 */
extern unsigned __int32 __cdecl _mm_crc32_u32(unsigned __int32, unsigned __int32);  /* crc32 */

#endif /* __POCC__ >= 650 && (__POCC_TARGET__ == 1 || __POCC_TARGET__ == 3) */

#endif /* _NMMINTRIN_H */
