#ifndef _CPUFEAT_H
#define _CPUFEAT_H

/* cpufeat.h - private header for processor features */

#ifndef RC_INVOKED

#if __POCC__ < 1000
#error <cpufeat.h> need POCC version 10.0 or higher
#endif /* __POCC__ < 1000 */

#define __cpu_feature_mmx()      ((__cpu_features() & _CPU_FEATURE_MMX) != 0)
#define __cpu_feature_sse()      ((__cpu_features() & _CPU_FEATURE_SSE) != 0)
#define __cpu_feature_sse2()     ((__cpu_features() & _CPU_FEATURE_SSE2) != 0)
#define __cpu_feature_sse3()     ((__cpu_features() & _CPU_FEATURE_SSE3) != 0)
#define __cpu_feature_fxsr()     ((__cpu_features() & _CPU_FEATURE_FXSR) != 0)
#define __cpu_feature_ssse3()    ((__cpu_features() & _CPU_FEATURE_SSSE3) != 0)
#define __cpu_feature_sse41()    ((__cpu_features() & _CPU_FEATURE_SSE41) != 0)
#define __cpu_feature_sse42()    ((__cpu_features() & _CPU_FEATURE_SSE42) != 0)
#define __cpu_feature_avx()      ((__cpu_features() & _CPU_FEATURE_AVX) != 0)
#define __cpu_feature_avx2()     ((__cpu_features() & _CPU_FEATURE_AVX2) != 0)
#define __cpu_feature_avx512f()  ((__cpu_features() & _CPU_FEATURE_AVX512F) != 0)

#define _CPU_FEATURE_MMX      0x00000001
#define _CPU_FEATURE_SSE      0x00000002
#define _CPU_FEATURE_SSE2     0x00000004
#define _CPU_FEATURE_SSE3     0x00000008
#define _CPU_FEATURE_FXSR     0x00000010
#define _CPU_FEATURE_SSSE3    0x00000020
#define _CPU_FEATURE_SSE41    0x00000040
#define _CPU_FEATURE_SSE42    0x00000080
#define _CPU_FEATURE_AVX      0x00000100
#define _CPU_FEATURE_AVX2     0x00000200
#define _CPU_FEATURE_AVX512F  0x00000400

/* declarations */
extern unsigned long __cdecl __cpu_features(void);

#endif /* !RC_INVOKED */

#endif /* _CPUFEAT_H */
