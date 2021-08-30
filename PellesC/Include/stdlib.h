#ifndef _STDLIB_H
#define _STDLIB_H

/* stdlib.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <stdlib.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

/* macros */
#ifndef NULL
#define NULL  ((void *)0)
#endif

#define EXIT_FAILURE  1
#define EXIT_SUCCESS  0

#define MB_CUR_MAX  ((size_t)__mbcurmax)
#define RAND_MAX  0x3fffffff

/* type definitions */
#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif /* _WCHAR_T_DEFINED */

typedef struct {
    int quot;
    int rem;
} div_t;

typedef struct {
    long quot;
    long rem;
} ldiv_t;

typedef struct {
    long long quot;
    long long rem;
} lldiv_t;

typedef int __cdecl __cmpfunc(const void *, const void *);

/* declarations */
extern _CRTIMP int __cdecl abs(int);
extern _CRTIMP int __cdecl atexit(void (__cdecl *)(void));
extern _CRTIMP double __cdecl atof(const char *);
extern _CRTIMP int __cdecl atoi(const char *);
extern _CRTIMP long __cdecl atol(const char *);
extern _CRTIMP _CRTUSE _CRTMEM void * __cdecl calloc(size_t, size_t);
extern _CRTIMP div_t __cdecl div(int, int);
extern _CRTIMP _CRTFRE(1) void __cdecl free(void *);
extern _CRTIMP long __cdecl labs(long);
extern _CRTIMP ldiv_t __cdecl ldiv(long, long);
extern _CRTIMP _CRTUSE _CRTMEM void * __cdecl malloc(size_t);
extern _CRTIMP size_t __cdecl mbstowcs(wchar_t * restrict, const char * restrict, size_t);
extern _CRTIMP int __cdecl rand(void);
extern _CRTIMP void __cdecl srand(unsigned int);
extern _CRTIMP int __cdecl _rand_s(unsigned int *);
extern _CRTIMP _CRTUSE _CRTMEM void * __cdecl realloc(void *, size_t);
extern _CRTIMP double __cdecl strtod(const char * restrict, char ** restrict);
extern _CRTIMP long __cdecl strtol(const char * restrict, char ** restrict, int);
extern _CRTIMP unsigned long __cdecl strtoul(const char * restrict, char ** restrict, int);
extern _CRTIMP size_t __cdecl wcstombs(char * restrict, const wchar_t * restrict, size_t);

extern _CRTIMP _CRTEND void __cdecl abort(void);
extern _CRTIMP long long __cdecl atoll(const char *);
extern _CRTIMP void * __cdecl bsearch(const void *, const void *, size_t, size_t, __cmpfunc *);
extern _CRTIMP _CRTEND void __cdecl _Exit(int);
extern _CRTIMP _CRTEND void __cdecl exit(int);
extern _CRTIMP char * __cdecl getenv(const char *);
extern _CRTIMP long long __cdecl llabs(long long);
extern _CRTIMP lldiv_t __cdecl lldiv(long long, long long);
extern _CRTIMP int __cdecl mblen(const char *, size_t);
extern _CRTIMP int __cdecl mbtowc(wchar_t * restrict, const char * restrict, size_t);
extern _CRTIMP void __cdecl qsort(void *, size_t, size_t, __cmpfunc *);
extern _CRTIMP float __cdecl strtof(const char * restrict, char ** restrict);
extern _CRTIMP long double __cdecl strtold(const char * restrict, char ** restrict);
extern _CRTIMP long long __cdecl strtoll(const char * restrict, char ** restrict, int);
extern _CRTIMP unsigned long long __cdecl strtoull(const char * restrict, char ** restrict, int);
extern _CRTIMP int __cdecl system(const char *);
extern _CRTIMP int __cdecl wctomb(char *, wchar_t);

#if __POCC_STDC_VERSION__ >= 201112L
extern _CRTIMP _CRTUSE _CRTMEM void * __cdecl aligned_alloc(size_t, size_t);
extern _CRTIMP int __cdecl at_quick_exit(void (__cdecl *)(void));
extern _CRTIMP _Noreturn void __cdecl quick_exit(int);
#endif /* __POCC_STDC_VERSION__ >= 201112L */

/* private extensions to standard C */
extern _CRTUSE _CRTMEM void * __cdecl _alloca(size_t);
extern _CRTIMP int __cdecl _heap_validate(void *);
extern _CRTIMP size_t __cdecl _msize(void *);
extern _CRTIMP char * __cdecl _itoa(int, char *, int);
extern _CRTIMP char * __cdecl _ltoa(long, char *, int);
extern _CRTIMP unsigned long long __cdecl _llrotl(unsigned long long, int);
extern _CRTIMP unsigned long long __cdecl _llrotr(unsigned long long, int);
extern _CRTIMP unsigned long __cdecl _lrotl(unsigned long, int);
extern _CRTIMP unsigned long __cdecl _lrotr(unsigned long, int);
extern _CRTIMP unsigned int __cdecl _rotl(unsigned int, int);
extern _CRTIMP unsigned int __cdecl _rotr(unsigned int, int);
extern _CRTIMP char * __cdecl _ultoa(unsigned long, char *, int);
extern _CRTIMP unsigned int __cdecl _bswap(unsigned int);
extern _CRTIMP unsigned short __cdecl _bswap16(unsigned short);
extern _CRTIMP unsigned long long __cdecl _bswap64(unsigned long long);

extern _CRTIMP _CRTUSE _CRTMEM void * __cdecl _mm_malloc(size_t, size_t);
extern _CRTIMP _CRTFRE(1) void __cdecl _mm_free(void *);
#ifdef _MSC_EXTENSIONS
#define _aligned_malloc(n,m)  _mm_malloc(n,m)
#define _aligned_free(p)  _mm_free(p)
#if __POCC_TARGET__ == 3
extern _CRTIMP int __cdecl _resetstkoflw(void);  /*sic*/
#endif /* __POCC_TARGET__ */
#endif /* _MSC_EXTENSIONS */

extern _CRTIMP char * __cdecl _fullpath(char *, const char *, size_t);
extern _CRTIMP void __cdecl _makepath(char *, const char *, const char *, const char *, const char *);
extern _CRTIMP int __cdecl _putenv(const char *);
extern _CRTIMP void __cdecl _searchenv(const char *, const char *, char *);
extern _CRTIMP void __cdecl _splitpath(const char *, char *, char *, char *, char *);
extern size_t __cdecl _set_crt_heap_size(size_t);
extern _CRTIMP wchar_t * __cdecl _wfullpath(wchar_t *, const wchar_t *, size_t);
extern _CRTIMP wchar_t * __cdecl _wgetenv(const wchar_t *);
extern _CRTIMP void __cdecl _wmakepath(wchar_t *, const wchar_t *, const wchar_t *, const wchar_t *, const wchar_t *);
extern _CRTIMP int __cdecl _wputenv(const wchar_t *);
extern _CRTIMP void __cdecl _wsearchenv(const wchar_t *, const wchar_t *, wchar_t *);
extern _CRTIMP void __cdecl _wsplitpath(const wchar_t *, wchar_t *, wchar_t *, wchar_t *, wchar_t *);
extern _CRTIMP int __cdecl _wsystem(const wchar_t *);

extern void __cdecl __debugbreak(void);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern char * __cdecl itoa(int, char *, int);
extern char * __cdecl ltoa(long, char *, int);
extern int __cdecl putenv(const char *);
extern char * __cdecl ultoa(unsigned long, char *, int);
#undef alloca
#define alloca  _alloca
#endif /* __POCC__OLDNAMES */

/* data declarations */
extern _CRTIMP unsigned char __mbcurmax;

/* private extensions */
extern _CRTIMP int __argc;
extern _CRTIMP char **__argv;
extern _CRTIMP wchar_t **__wargv;
extern _CRTIMP size_t __bheap_threshold;

/* bounds-checking interfaces (TR24731-1, C11 annex K) */
#if __STDC_WANT_LIB_EXT1__

#ifndef _ERRNO_T_DEFINED
#define _ERRNO_T_DEFINED
typedef int errno_t;
#endif /* _ERRNO_T_DEFINED */

#ifndef _RSIZE_T_DEFINED
#define _RSIZE_T_DEFINED
typedef __SIZE_TYPE__ rsize_t;
#endif /* _RSIZE_T_DEFINED */

typedef void (__cdecl *constraint_handler_t)(const char * restrict, void * restrict, errno_t);
typedef int __cdecl __cmpfunc_s(const void *, const void *, void *);

/* declarations */
extern _CRTIMP constraint_handler_t __cdecl set_constraint_handler_s(constraint_handler_t);
extern _CRTEND void __cdecl abort_handler_s(const char * restrict, void * restrict, errno_t);
extern void __cdecl ignore_handler_s(const char * restrict, void * restrict, errno_t);
extern _CRTIMP _CRTUSE errno_t __cdecl getenv_s(size_t * restrict, char * restrict, rsize_t, const char * restrict);
extern _CRTIMP void * __cdecl bsearch_s(const void *, const void *, rsize_t, rsize_t, __cmpfunc_s *, void *);
extern _CRTIMP _CRTUSE errno_t __cdecl qsort_s(void *, rsize_t, rsize_t, __cmpfunc_s *, void *);
extern _CRTIMP _CRTUSE errno_t __cdecl wctomb_s(int * restrict, char * restrict, rsize_t, wchar_t);
extern _CRTIMP _CRTUSE errno_t __cdecl mbstowcs_s(size_t * restrict, wchar_t * restrict, rsize_t, const char * restrict, rsize_t);
extern _CRTIMP _CRTUSE errno_t __cdecl wcstombs_s(size_t * restrict, char * restrict, rsize_t, const wchar_t * restrict, rsize_t);

#endif /* __STDC_WANT_LIB_EXT1__ */

#endif /* !RC_INVOKED */

#endif /* _STDLIB_H */
