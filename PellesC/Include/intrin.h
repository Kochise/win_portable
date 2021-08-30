#ifndef _INTRIN_H
#define _INTRIN_H

/* intrin.h - private header for compiler intrinsic functions */

#ifndef RC_INVOKED

#if __POCC__ < 1000
#error <intrin.h> need POCC version 10.0 or higher
#endif /* __POCC__ < 1000 */

#pragma once

#include <crtdef.h>

#include <zmmintrin.h>

/* type definitions */
#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif /* _WCHAR_T_DEFINED */

/* data declarations */
#ifdef _WINNT_H
extern IMAGE_DOS_HEADER __ImageBase;
#endif /* _WINNT_H */

enum {  /* internal use only */
    _X86_REG_EAX = 0,
    _X86_REG_ECX = 1,
    _X86_REG_EDX = 2,
    _X86_REG_EBX = 3,
    _X86_REG_ESP = 4,
    _X86_REG_EBP = 5,
    _X86_REG_ESI = 6,
    _X86_REG_EDI = 7,
};

enum {  /* internal use only */
    _X64_REG_RAX = 0,
    _X64_REG_RCX = 1,
    _X64_REG_RDX = 2,
    _X64_REG_RBX = 3,
    _X64_REG_RSP = 4,
    _X64_REG_RBP = 5,
    _X64_REG_RSI = 6,
    _X64_REG_RDI = 7,
    _X64_REG_R8 = 8,
    _X64_REG_R9 = 9,
    _X64_REG_R10 = 10,
    _X64_REG_R11 = 11,
    _X64_REG_R12 = 12,
    _X64_REG_R13 = 13,
    _X64_REG_R14 = 14,
    _X64_REG_R15 = 15,
};

#undef _INTRIN_ALL_
#undef _INTRIN_X86_
#undef _INTRIN_X86_X64_
#undef _INTRIN_X64_
#undef _INTRIN_NIL_
#undef _INTRIN_DEF_

#define _INTRIN_NIL_(N)  /* not so much, no */
#define _INTRIN_DEF_(N)  N;

#if __POCC_TARGET__ == 1
#define _INTRIN_ALL_      _INTRIN_DEF_
#define _INTRIN_X86_      _INTRIN_DEF_
#define _INTRIN_X86_X64_  _INTRIN_DEF_
#define _INTRIN_X64_      _INTRIN_NIL_
#elif __POCC_TARGET__ == 3
#define _INTRIN_ALL_      _INTRIN_DEF_
#define _INTRIN_X86_      _INTRIN_NIL_
#define _INTRIN_X86_X64_  _INTRIN_DEF_
#define _INTRIN_X64_      _INTRIN_DEF_
#else /* WTF */
#define _INTRIN_ALL_      _INTRIN_NIL_
#define _INTRIN_X86_      _INTRIN_NIL_
#define _INTRIN_X86_X64_  _INTRIN_NIL_
#define _INTRIN_X64_      _INTRIN_NIL_
#endif /* __POCC_TARGET__ */

/* declarations */
_INTRIN_X86_X64_(_CRTIMP size_t __cdecl strlen(const char *))
_INTRIN_X86_(_CRTIMP char * __cdecl strcpy(char * restrict, const char * restrict))
_INTRIN_X86_(_CRTIMP int __cdecl strcmp(const char *, const char *))
_INTRIN_ALL_(_CRTIMP void * __cdecl memcpy(void * restrict, const void * restrict, size_t))
_INTRIN_X86_X64_(_CRTIMP void * __cdecl memset(void *, int, size_t))
_INTRIN_X86_X64_(_CRTIMP size_t __cdecl wcslen(const wchar_t *))
_INTRIN_X86_(_CRTIMP wchar_t * __cdecl wcscpy(wchar_t * restrict, const wchar_t * restrict))
_INTRIN_ALL_(_CRTIMP wchar_t * __cdecl wmemcpy(wchar_t * restrict, const wchar_t * restrict, size_t))
_INTRIN_X86_X64_(_CRTIMP wchar_t * __cdecl wmemset(wchar_t *, wchar_t, size_t))

/* bounds-checking interfaces (TR24731-1, C11 annex K) */
#if __STDC_WANT_LIB_EXT1__
_INTRIN_X64_(_CRTIMP size_t __cdecl strnlen_s(const char *, size_t))
_INTRIN_X64_(_CRTIMP size_t __cdecl wcsnlen_s(const wchar_t *, size_t))
#endif /* __STDC_WANT_LIB_EXT1__ */

_INTRIN_ALL_(_CRTIMP int __cdecl abs(int))
_INTRIN_ALL_(_CRTIMP long __cdecl labs(long))
_INTRIN_X64_(_CRTIMP long long __cdecl llabs(long long))
_INTRIN_X86_X64_(_CRTIMP double __cdecl fabs(double))
_INTRIN_X86_X64_(_CRTIMP float __cdecl fabsf(float))
_INTRIN_X86_X64_(_CRTIMP long double __cdecl fabsl(long double))
_INTRIN_X86_X64_(_CRTIMP double __cdecl sqrt(double))
_INTRIN_X86_X64_(_CRTIMP float __cdecl sqrtf(float))
_INTRIN_X86_X64_(_CRTIMP long double __cdecl sqrtl(long double))
_INTRIN_X86_(_CRTIMP double __cdecl exp(double))
_INTRIN_X86_(_CRTIMP float __cdecl expf(float))
_INTRIN_X86_(_CRTIMP long double __cdecl expl(long double))
#ifndef _MATH_H
_INTRIN_X86_(_CRTIMP double __cdecl log(double))
_INTRIN_X86_(_CRTIMP float __cdecl logf(float))
_INTRIN_X86_(_CRTIMP long double __cdecl logl(long double))
_INTRIN_X86_(_CRTIMP double __cdecl log10(double))
_INTRIN_X86_(_CRTIMP float __cdecl log10f(float))
_INTRIN_X86_(_CRTIMP long double __cdecl log10l(long double))
_INTRIN_X86_(_CRTIMP double __cdecl log2(double))
_INTRIN_X86_(_CRTIMP float __cdecl log2f(float))
_INTRIN_X86_(_CRTIMP long double __cdecl log2l(long double))
_INTRIN_X86_(_CRTIMP double __cdecl logb(double))
_INTRIN_X86_(_CRTIMP float __cdecl logbf(float))
_INTRIN_X86_(_CRTIMP long double __cdecl logbl(long double))
_INTRIN_X86_(_CRTIMP double __cdecl sin(double))
_INTRIN_X86_(_CRTIMP float __cdecl sinf(float))
_INTRIN_X86_(_CRTIMP long double __cdecl sinl(long double))
_INTRIN_X86_(_CRTIMP double __cdecl cos(double))
_INTRIN_X86_(_CRTIMP float __cdecl cosf(float))
_INTRIN_X86_(_CRTIMP long double __cdecl cosl(long double))
#endif /* !_MATH_H */
_INTRIN_X86_(_CRTIMP double __cdecl tan(double))
_INTRIN_X86_(_CRTIMP float __cdecl tanf(float))
_INTRIN_X86_(_CRTIMP long double __cdecl tanl(long double))
_INTRIN_X86_(_CRTIMP double __cdecl atan(double))
_INTRIN_X86_(_CRTIMP float __cdecl atanf(float))
_INTRIN_X86_(_CRTIMP long double __cdecl atanl(long double))
_INTRIN_X86_(_CRTIMP double __cdecl atan2(double, double))
_INTRIN_X86_(_CRTIMP float __cdecl atan2f(float, float))
_INTRIN_X86_(_CRTIMP long double __cdecl atan2l(long double, long double))
_INTRIN_X86_(_CRTIMP long __cdecl lrint(double))
_INTRIN_X86_(_CRTIMP long __cdecl lrintf(float))
_INTRIN_X86_(_CRTIMP long __cdecl lrintl(long double))
_INTRIN_X86_(_CRTIMP long long __cdecl llrint(double))
_INTRIN_X86_(_CRTIMP long long __cdecl llrintf(float))
_INTRIN_X86_(_CRTIMP long long __cdecl llrintl(long double))
_INTRIN_X86_(_CRTIMP double __cdecl nearbyint(double))
_INTRIN_X86_(_CRTIMP float __cdecl nearbyintf(float))
_INTRIN_X86_(_CRTIMP long double __cdecl nearbyintl(long double))
_INTRIN_X64_(_CRTIMP double __cdecl fmax(double, double))
_INTRIN_X64_(_CRTIMP double __cdecl fmin(double, double))
_INTRIN_X64_(_CRTIMP float __cdecl fmaxf(float, float))
_INTRIN_X64_(_CRTIMP float __cdecl fminf(float, float))
_INTRIN_X64_(_CRTIMP long double __cdecl fmaxl(long double, long double))
_INTRIN_X64_(_CRTIMP long double __cdecl fminl(long double, long double))
_INTRIN_X86_(_CRTIMP double __cdecl fmod(double, double))
_INTRIN_X86_(_CRTIMP float __cdecl fmodf(float, float))
_INTRIN_X86_(_CRTIMP long double __cdecl fmodl(long double, long double))
_INTRIN_X86_(_CRTIMP double __cdecl remainder(double, double))
_INTRIN_X86_(_CRTIMP float __cdecl remainderf(float, float))
_INTRIN_X86_(_CRTIMP long double __cdecl remainderl(long double, long double))

_INTRIN_X64_(_CRTIMP unsigned long long __cdecl _llrotl(unsigned long long, int))
_INTRIN_X64_(_CRTIMP unsigned long long __cdecl _llrotr(unsigned long long, int))
_INTRIN_ALL_(_CRTIMP unsigned long __cdecl _lrotl(unsigned long, int))
_INTRIN_ALL_(_CRTIMP unsigned long __cdecl _lrotr(unsigned long, int))
_INTRIN_ALL_(_CRTIMP unsigned int __cdecl _rotl(unsigned int, int))
_INTRIN_ALL_(_CRTIMP unsigned int __cdecl _rotr(unsigned int, int))
_INTRIN_X86_X64_(_CRTIMP int __cdecl _ffs(int))
_INTRIN_X86_X64_(unsigned __int8 __cdecl _rotl8(unsigned __int8, unsigned __int8))
_INTRIN_X86_X64_(unsigned __int8 __cdecl _rotr8(unsigned __int8, unsigned __int8))
_INTRIN_X86_X64_(unsigned __int16 __cdecl _rotl16(unsigned __int16, unsigned __int8))
_INTRIN_X86_X64_(unsigned __int16 __cdecl _rotr16(unsigned __int16, unsigned __int8))
_INTRIN_X86_X64_(unsigned __int32 __cdecl _rotl32(unsigned __int32, unsigned __int8))
_INTRIN_X86_X64_(unsigned __int32 __cdecl _rotr32(unsigned __int32, unsigned __int8))
_INTRIN_X64_(unsigned __int64 __cdecl _rotl64(unsigned __int64, unsigned __int8))
_INTRIN_X64_(unsigned __int64 __cdecl _rotr64(unsigned __int64, unsigned __int8))

_INTRIN_X64_(unsigned __int64 __cdecl __shiftleft128(unsigned __int64, unsigned __int64, unsigned char))
_INTRIN_X64_(unsigned __int64 __cdecl __shiftright128(unsigned __int64, unsigned __int64, unsigned char))
_INTRIN_X64_(__int64 __cdecl __mulh64(__int64, __int64))
_INTRIN_X64_(unsigned __int64 __cdecl __umulh64(unsigned __int64, unsigned __int64))
#ifdef _MSC_EXTENSIONS
_INTRIN_X64_(__int64 __cdecl __mulh(__int64, __int64))
_INTRIN_X64_(unsigned __int64 __cdecl __umulh(unsigned __int64, unsigned __int64))
#endif /* _MSC_EXTENSIONS */
_INTRIN_X64_(__int64 __cdecl __mul128(__int64, __int64, __int64 *))
_INTRIN_X64_(unsigned __int64 __cdecl __umul128(unsigned __int64, unsigned __int64, unsigned __int64 *))
_INTRIN_X64_(__int64 __cdecl __div128(__int64, __int64, __int64, __int64 *))
_INTRIN_X64_(unsigned __int64 __cdecl __udiv128(unsigned __int64, unsigned __int64, unsigned __int64, unsigned __int64 *))
#ifdef _MSC_EXTENSIONS
_INTRIN_X64_(__int64 __cdecl _mul128(__int64, __int64, __int64 *))
_INTRIN_X64_(unsigned __int64 __cdecl _umul128(unsigned __int64, unsigned __int64, unsigned __int64 *))
_INTRIN_X64_(__int64 __cdecl _div128(__int64, __int64, __int64, __int64 *))
_INTRIN_X64_(unsigned __int64 __cdecl _udiv128(unsigned __int64, unsigned __int64, unsigned __int64, unsigned __int64 *))
#endif /* _MSC_EXTENSIONS */

_INTRIN_ALL_(void __cdecl __nop(void))
_INTRIN_ALL_(void __cdecl __memory_barrier(void))
#pragma deprecated(__memory_barrier)
_INTRIN_X64_(void __cdecl __faststorefence(void))
#ifdef _MSC_EXTENSIONS
#pragma deprecated(_ReadWriteBarrier)
#pragma deprecated(_ReadBarrier)
#pragma deprecated(_WriteBarrier)
#undef  _ReadWriteBarrier
#define _ReadWriteBarrier  __memory_barrier
#undef _ReadBarrier
#define _ReadBarrier  __memory_barrier
#undef _WriteBarrier
#define _WriteBarrier  __memory_barrier
#endif /* _MSC_EXTENSIONS */
_INTRIN_ALL_(void __cdecl __debugbreak(void))
_INTRIN_ALL_(void __unreachable(void))
_INTRIN_X86_X64_(void __cdecl __int2c(void))
_INTRIN_X86_X64_(void * __cdecl _ReturnAddress(void))
_INTRIN_X86_X64_(void * __cdecl _AddressOfReturnAddress(void))
_INTRIN_X86_X64_(void __cdecl __fastfail(unsigned int))

_INTRIN_X86_(unsigned __int32 __cdecl __getflags(void))
_INTRIN_X64_(unsigned __int64 __cdecl __getflags(void))
_INTRIN_X86_(unsigned __int32 __cdecl __getreg(const int))  /* internal use only */
_INTRIN_X64_(unsigned __int64 __cdecl __getreg(const int))  /* internal use only */
#ifdef _MSC_EXTENSIONS
_INTRIN_X86_(unsigned __int32 __cdecl __readeflags(void))
_INTRIN_X64_(unsigned __int64 __cdecl __readeflags(void))
#endif /* _MSC_EXTENSIONS */

_INTRIN_X86_X64_(_CRTIMP unsigned int __cdecl _bswap(unsigned int))
_INTRIN_X86_X64_(_CRTIMP unsigned short __cdecl _bswap16(unsigned short))
_INTRIN_X86_X64_(_CRTIMP unsigned long long __cdecl _bswap64(unsigned long long))
#ifdef _MSC_EXTENSIONS
_INTRIN_X86_X64_(unsigned short __cdecl _byteswap_ushort(unsigned short))
_INTRIN_X86_X64_(unsigned long __cdecl _byteswap_ulong(unsigned long))
_INTRIN_X86_X64_(unsigned __int64 __cdecl _byteswap_uint64(unsigned __int64))
#endif /* _MSC_EXTENSIONS */
_INTRIN_X86_X64_(void __cdecl _cpuid(int *, int))
_INTRIN_X86_X64_(void __cdecl _cpuidex(int *, int, int))
#ifdef _MSC_EXTENSIONS
_INTRIN_X86_X64_(void __cdecl __cpuid(int *, int))
_INTRIN_X86_X64_(void __cdecl __cpuidex(int *, int, int))
#endif /* _MSC_EXTENSIONS */
_INTRIN_X86_X64_(int __cdecl _inp(unsigned short))
_INTRIN_X86_X64_(unsigned short __cdecl _inpw(unsigned short))
_INTRIN_X86_X64_(unsigned long __cdecl _inpd(unsigned short))
_INTRIN_X86_X64_(int __cdecl _outp(unsigned short, int))
_INTRIN_X86_X64_(unsigned short __cdecl _outpw(unsigned short, unsigned short))
_INTRIN_X86_X64_(unsigned long __cdecl _outpd(unsigned short, unsigned long))
_INTRIN_X86_X64_(unsigned long long __cdecl _rdtsc(void))
#ifdef _MSC_EXTENSIONS
_INTRIN_X86_X64_(unsigned __int64 __cdecl __rdtsc(void))
#endif /* _MSC_EXTENSIONS */
_INTRIN_X86_X64_(unsigned long long __cdecl __rdtscp(unsigned int *))
_INTRIN_X86_X64_(void __cdecl _enable(void))
_INTRIN_X86_X64_(void __cdecl _disable(void))
_INTRIN_X86_X64_(unsigned long long __cdecl __readpmc(unsigned long))
_INTRIN_X86_X64_(unsigned long __cdecl __segmentlimit(unsigned long))

_INTRIN_ALL_(_CRTUSE _CRTMEM void * __cdecl _alloca(size_t))

_INTRIN_X86_X64_(unsigned char __cdecl _bittest(const long *, long))
_INTRIN_X86_X64_(unsigned char __cdecl _bittestandcomplement(long *, long))
_INTRIN_X86_X64_(unsigned char __cdecl _bittestandset(long *, long))
_INTRIN_X86_X64_(unsigned char __cdecl _bittestandreset(long *, long))
_INTRIN_X86_X64_(unsigned char __cdecl _interlockedbittestandset(long *, long))
_INTRIN_X86_X64_(unsigned char __cdecl _interlockedbittestandreset(long *, long))
_INTRIN_X86_X64_(unsigned char __cdecl _BitScanForward(unsigned long *, unsigned long))
_INTRIN_X86_X64_(unsigned char __cdecl _BitScanReverse(unsigned long *, unsigned long))
_INTRIN_X86_X64_(short __cdecl _InterlockedExchange16(short volatile *, short))
_INTRIN_X86_X64_(short __cdecl _InterlockedIncrement16(short volatile *))
_INTRIN_X86_X64_(short __cdecl _InterlockedDecrement16(short volatile *))
_INTRIN_X86_X64_(short __cdecl _InterlockedCompareExchange16(volatile short *, short, short))
_INTRIN_X86_X64_(short __cdecl _InterlockedAnd16(short volatile *, short))
_INTRIN_X86_X64_(short __cdecl _InterlockedOr16(short volatile *, short))
_INTRIN_X86_X64_(short __cdecl _InterlockedXor16(short volatile *, short))
_INTRIN_X86_X64_(long __cdecl _InterlockedExchange(long volatile *, long))
_INTRIN_X86_X64_(long __cdecl _InterlockedExchangeAdd(long volatile *, long))
_INTRIN_X86_X64_(void * __cdecl _InterlockedExchangePointer(void * volatile *, void *))
_INTRIN_X86_X64_(long __cdecl _InterlockedIncrement(long volatile *))
_INTRIN_X86_X64_(long __cdecl _InterlockedDecrement(long volatile *))
_INTRIN_X86_X64_(long __cdecl _InterlockedCompareExchange(volatile long *, long, long))
_INTRIN_X86_X64_(void * __cdecl _InterlockedCompareExchangePointer(void * volatile *, void *, void *))
_INTRIN_X86_X64_(long __cdecl _InterlockedAnd(long volatile *, long))
_INTRIN_X86_X64_(long __cdecl _InterlockedOr(long volatile *, long))
_INTRIN_X86_X64_(long __cdecl _InterlockedXor(long volatile *, long))
_INTRIN_X86_X64_(unsigned long __cdecl _bit_scan_forward(unsigned long))
_INTRIN_X86_X64_(unsigned long __cdecl _bit_scan_reverse(unsigned long))
_INTRIN_X64_(unsigned char __cdecl _bittest64(const long long *, long long))
_INTRIN_X64_(unsigned char __cdecl _bittestandcomplement64(long long *, long long))
_INTRIN_X64_(unsigned char __cdecl _bittestandset64(long long *, long long))
_INTRIN_X64_(unsigned char __cdecl _bittestandreset64(long long *, long long))
_INTRIN_X64_(unsigned char __cdecl _interlockedbittestandset64(long long *, long long))
_INTRIN_X64_(unsigned char __cdecl _interlockedbittestandreset64(long long *, long long))
_INTRIN_X64_(unsigned char __cdecl _BitScanForward64(unsigned long *, unsigned long long))
_INTRIN_X64_(unsigned char __cdecl _BitScanReverse64(unsigned long *, unsigned long long))
_INTRIN_X64_(long long __cdecl _InterlockedExchange64(long long volatile *, long long))
_INTRIN_X64_(long long __cdecl _InterlockedExchangeAdd64(long long volatile *, long long))
_INTRIN_X64_(long long __cdecl _InterlockedIncrement64(long long volatile *))
_INTRIN_X64_(long long __cdecl _InterlockedDecrement64(long long volatile *))
_INTRIN_X64_(long long __cdecl _InterlockedCompareExchange64(volatile long long *, long long, long long))
_INTRIN_X64_(unsigned char __cdecl _InterlockedCompareExchange128(volatile long long *, long long, long long, long long *))
_INTRIN_X64_(long long __cdecl _InterlockedAnd64(long long volatile *, long long))
_INTRIN_X64_(long long __cdecl _InterlockedOr64(long long volatile *, long long))
_INTRIN_X64_(long long __cdecl _InterlockedXor64(long long volatile *, long long))
_INTRIN_X64_(unsigned long long __cdecl _bit_scan_forward64(unsigned long long))
_INTRIN_X64_(unsigned long long __cdecl _bit_scan_reverse64(unsigned long long))

_INTRIN_X86_X64_(void __cdecl __movsb(unsigned char *, const unsigned char *, size_t))
_INTRIN_X86_X64_(void __cdecl __movsw(unsigned short *, const unsigned short *, size_t))
_INTRIN_X86_X64_(void __cdecl __movsd(unsigned long *, const unsigned long *, size_t))
_INTRIN_X64_(void __cdecl __movsq(unsigned long long *, const unsigned long long *, size_t))
_INTRIN_X86_X64_(void __cdecl __stosb(unsigned char *, unsigned char, size_t))
_INTRIN_X86_X64_(void __cdecl __stosw(unsigned short *, unsigned short, size_t))
_INTRIN_X86_X64_(void __cdecl __stosd(unsigned long *, unsigned long, size_t))
_INTRIN_X64_(void __cdecl __stosq(unsigned long long *, unsigned long long, size_t))

_INTRIN_X86_(unsigned char __cdecl __readfsbyte(unsigned long))
_INTRIN_X86_(unsigned short __cdecl __readfsword(unsigned long))
_INTRIN_X86_(unsigned long __cdecl __readfsdword(unsigned long))
_INTRIN_X86_(void __cdecl __writefsbyte(unsigned long, unsigned char))
_INTRIN_X86_(void __cdecl __writefsword(unsigned long, unsigned short))
_INTRIN_X86_(void __cdecl __writefsdword(unsigned long, unsigned long))

_INTRIN_X64_(unsigned char __cdecl __readgsbyte(unsigned long))
_INTRIN_X64_(unsigned short __cdecl __readgsword(unsigned long))
_INTRIN_X64_(unsigned long __cdecl __readgsdword(unsigned long))
_INTRIN_X64_(unsigned long long __cdecl __readgsqword(unsigned long))
_INTRIN_X64_(void __cdecl __writegsbyte(unsigned long, unsigned char))
_INTRIN_X64_(void __cdecl __writegsword(unsigned long, unsigned short))
_INTRIN_X64_(void __cdecl __writegsdword(unsigned long, unsigned long))
_INTRIN_X64_(void __cdecl __writegsqword(unsigned long, unsigned long long))

/* "somewhere else" */
_INTRIN_X86_X64_(void __cdecl _m_prefetchw(const void *))

#endif /* !RC_INVOKED */

#endif /* _INTRIN_H */
