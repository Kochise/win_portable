#ifndef _WCHAR_H
#define _WCHAR_H

/* wchar.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 1000
#error <wchar.h> need POCC version 10.0 or higher
#endif /* __POCC__ < 1000 */

#pragma once

#include <crtdef.h>

/* macros */
#ifndef NULL
#define NULL  ((void *)0)
#endif

#define WCHAR_MIN  __WCHAR_MIN__
#define WCHAR_MAX  __WCHAR_MAX__

#define WEOF  ((wint_t)(-1))

/* type definitions */
#ifndef _MBSTATE_T_DEFINED
#define _MBSTATE_T_DEFINED
typedef struct mbstate_t {
    unsigned long wchar;
    unsigned short rsrv, state;
} mbstate_t;
#endif /* _MBSTATE_T_DEFINED */

#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

#ifndef _VA_LIST_DEFINED
#define _VA_LIST_DEFINED
typedef __VA_LIST_TYPE__ va_list;
#endif /* _VA_LIST_DEFINED */

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif /* _WCHAR_T_DEFINED */

#ifndef _WINT_T_DEFINED
#define _WINT_T_DEFINED
typedef __WINT_TYPE__ wint_t;
#endif /* _WINT_T_DEFINED */

struct tm;
struct FILE;

/* formatted wide-character input/output functions */
extern _CRTIMP _CRTCHK(printf,2,3) int __cdecl fwprintf(struct FILE * restrict, const wchar_t * restrict, ...);
extern _CRTIMP _CRTCHK(scanf,2,3) int __cdecl fwscanf(struct FILE * restrict, const wchar_t * restrict, ...);
extern _CRTIMP _CRTCHK(scanf,2,3) int __cdecl swscanf(const wchar_t * restrict, const wchar_t * restrict, ...);
extern _CRTIMP int __cdecl vfwprintf(struct FILE * restrict, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vwprintf(const wchar_t * restrict, va_list);
extern _CRTIMP _CRTCHK(printf,1,2) int __cdecl wprintf(const wchar_t * restrict, ...);
extern _CRTIMP _CRTCHK(scanf,1,2) int __cdecl wscanf(const wchar_t * restrict, ...);
extern _CRTIMP _CRTCHK(printf,3,4) int __cdecl swprintf(wchar_t * restrict, size_t, const wchar_t * restrict, ...);
extern _CRTIMP int __cdecl vfwscanf(struct FILE * restrict, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vswprintf(wchar_t * restrict, size_t, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vswscanf(const wchar_t * restrict, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vwscanf(const wchar_t * restrict, va_list);

/* wide character input/output functions */
extern _CRTIMP wint_t __cdecl fgetwc(struct FILE *);
extern _CRTIMP wchar_t * __cdecl fgetws(wchar_t * restrict, int, struct FILE * restrict);
extern _CRTIMP wint_t __cdecl fputwc(wchar_t, struct FILE *);
extern _CRTIMP int __cdecl fputws(const wchar_t * restrict, struct FILE * restrict);
extern _CRTIMP wint_t __cdecl getwchar(void);
extern _CRTIMP wint_t __cdecl putwchar(wchar_t);
extern _CRTIMP wint_t __cdecl ungetwc(wint_t, struct FILE *);
extern _CRTIMP int __cdecl fwide(struct FILE *, int);
extern _CRTIMP wint_t __cdecl getwc(struct FILE *);
extern _CRTIMP wint_t __cdecl putwc(wchar_t, struct FILE *);

/* general wide-string utilities */
extern _CRTIMP double __cdecl wcstod(const wchar_t * restrict, wchar_t ** restrict);
extern _CRTIMP long __cdecl wcstol(const wchar_t * restrict, wchar_t ** restrict, int);
extern _CRTIMP unsigned long __cdecl wcstoul(const wchar_t * restrict, wchar_t ** restrict, int);
extern _CRTIMP wchar_t * __cdecl wcscpy(wchar_t * restrict, const wchar_t * restrict);
extern _CRTIMP wchar_t * __cdecl wcsncpy(wchar_t * restrict, const wchar_t * restrict, size_t);
extern _CRTIMP wchar_t * __cdecl wcscat(wchar_t * restrict, const wchar_t * restrict);
extern _CRTIMP wchar_t * __cdecl wcsncat(wchar_t * restrict, const wchar_t * restrict, size_t);
extern _CRTIMP int __cdecl wcscmp(const wchar_t *, const wchar_t *);
extern _CRTIMP int __cdecl wcsncmp(const wchar_t *, const wchar_t *, size_t);
extern _CRTIMP wchar_t * __cdecl wcschr(const wchar_t *, wchar_t);
extern _CRTIMP size_t __cdecl wcscspn(const wchar_t *, const wchar_t *);
extern _CRTIMP size_t __cdecl wcslen(const wchar_t *);
extern _CRTIMP wchar_t * __cdecl wcspbrk(const wchar_t *, const wchar_t *);
extern _CRTIMP wchar_t * __cdecl wcsrchr(const wchar_t *, wchar_t);
extern _CRTIMP size_t __cdecl wcsspn(const wchar_t *, const wchar_t *);
extern _CRTIMP wchar_t * __cdecl wcsstr(const wchar_t *, const wchar_t *);
extern _CRTIMP wchar_t * __cdecl wcstok(wchar_t * restrict, const wchar_t * restrict, wchar_t ** restrict);

extern _CRTIMP float __cdecl wcstof(const wchar_t * restrict, wchar_t ** restrict);
extern _CRTIMP long double __cdecl wcstold(const wchar_t * restrict, wchar_t ** restrict);
extern _CRTIMP long long __cdecl wcstoll(const wchar_t * restrict, wchar_t ** restrict, int);
extern _CRTIMP unsigned long long __cdecl wcstoull(const wchar_t * restrict, wchar_t ** restrict, int);
extern _CRTIMP int __cdecl wcscoll(const wchar_t *, const wchar_t *);
extern _CRTIMP size_t __cdecl wcsxfrm(wchar_t * restrict, const wchar_t * restrict, size_t);

extern _CRTIMP wchar_t * __cdecl wmemchr(const wchar_t *, wchar_t, size_t);
extern _CRTIMP int __cdecl wmemcmp(const wchar_t *, const wchar_t *, size_t);
extern _CRTIMP wchar_t * __cdecl wmemcpy(wchar_t * restrict, const wchar_t * restrict, size_t);
extern _CRTIMP wchar_t * __cdecl wmemmove(wchar_t *, const wchar_t *, size_t);
extern _CRTIMP wchar_t * __cdecl wmemset(wchar_t *, wchar_t, size_t);

/* wide-character time conversion functions */
extern _CRTIMP size_t __cdecl wcsftime(wchar_t * restrict, size_t, const wchar_t * restrict, const struct tm * restrict);

/* extended multibyte and wide-character conversion utilities */
extern _CRTIMP wint_t __cdecl btowc(int);
extern _CRTIMP int __cdecl wctob(wint_t);
extern _CRTIMP int __cdecl mbsinit(const mbstate_t *);
extern _CRTIMP size_t __cdecl mbrlen(const char * restrict, size_t, mbstate_t * restrict);
extern _CRTIMP size_t __cdecl mbrtowc(wchar_t * restrict, const char * restrict, size_t, mbstate_t * restrict);
extern _CRTIMP size_t __cdecl wcrtomb(char * restrict, wchar_t, mbstate_t * restrict);
extern _CRTIMP size_t __cdecl mbsrtowcs(wchar_t * restrict, const char ** restrict, size_t, mbstate_t * restrict);
extern _CRTIMP size_t __cdecl wcsrtombs(char * restrict, const wchar_t ** restrict, size_t, mbstate_t * restrict);

/* private extensions to standard C */
extern _CRTIMP wchar_t * __cdecl _itow(int, wchar_t *, int);
extern _CRTIMP wchar_t * __cdecl _ltow(long, wchar_t *, int);
extern _CRTIMP wchar_t * __cdecl _ultow(unsigned long, wchar_t *, int);
extern _CRTIMP _CRTCHK(printf,3,4) int __cdecl _snwprintf(wchar_t * restrict, size_t, const wchar_t * restrict, ...);
extern _CRTIMP int __cdecl _vsnwprintf(wchar_t * restrict, size_t, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl _wcsicmp(const wchar_t *, const wchar_t *);
extern _CRTIMP int __cdecl _wcsnicmp(const wchar_t *, const wchar_t *, size_t);
extern _CRTIMP wchar_t * __cdecl _wcsdup(const wchar_t *);
extern _CRTIMP wchar_t * __cdecl _wcsupr(wchar_t *);
extern _CRTIMP wchar_t * __cdecl _wcslwr(wchar_t *);
extern _CRTIMP wchar_t * __cdecl _wcsndup(const wchar_t *, size_t);
extern _CRTIMP wchar_t * __cdecl _wcsnset(wchar_t *, wchar_t, size_t);
extern _CRTIMP wchar_t * __cdecl _wcsrev(wchar_t *);
extern _CRTIMP long __cdecl _wtol(const wchar_t *);
extern _CRTIMP long long __cdecl _wtoll(const wchar_t *);
extern _CRTIMP wchar_t * __cdecl _wcserror(int);
extern _CRTIMP wchar_t * __cdecl _wcsichr(const wchar_t *, wchar_t);
extern _CRTIMP wchar_t * __cdecl _wcsistr(const wchar_t *, const wchar_t *);
extern _CRTIMP wchar_t * __cdecl _wcsrichr(const wchar_t *, wchar_t);
extern _CRTIMP wchar_t * __cdecl _wcstok_ms(wchar_t * restrict, const wchar_t * restrict);  /* 06-03-28 */
extern _CRTIMP wchar_t * __cdecl _wmemichr(const wchar_t *, wchar_t, size_t);
extern _CRTIMP int __cdecl _wmemicmp(const wchar_t *, const wchar_t *, size_t);
extern _CRTIMP int __cdecl _wtoi(const wchar_t *);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern int __cdecl wcsicmp(const wchar_t *, const wchar_t *);
extern int __cdecl wcsnicmp(const wchar_t *, const wchar_t *, size_t);
extern wchar_t * __cdecl wcsdup(const wchar_t *);
extern wchar_t * __cdecl wcsupr(wchar_t *);
extern wchar_t * __cdecl wcslwr(wchar_t *);
extern wchar_t * __cdecl wcsnset(wchar_t *, wchar_t, size_t);
extern wchar_t * __cdecl wcsrev(wchar_t *);
#endif /* __POCC__OLDNAMES */

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

/* formatted wide-character input/output functions */
extern _CRTIMP _CRTCHK(printf,2,3) int __cdecl fwprintf_s(struct FILE * restrict, const wchar_t * restrict, ...);
extern _CRTIMP _CRTCHK(scanf_s,2,3) int __cdecl fwscanf_s(struct FILE * restrict, const wchar_t * restrict, ...);
extern _CRTIMP _CRTCHK(printf,3,4) int __cdecl snwprintf_s(wchar_t * restrict, rsize_t, const wchar_t * restrict, ...);
extern _CRTIMP _CRTCHK(printf,3,4) int __cdecl swprintf_s(wchar_t * restrict, rsize_t, const wchar_t * restrict, ...);
extern _CRTIMP _CRTCHK(scanf_s,2,3) int __cdecl swscanf_s(const wchar_t * restrict, const wchar_t * restrict, ...);
extern _CRTIMP int __cdecl vfwprintf_s(struct FILE * restrict, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vfwscanf_s(struct FILE * restrict, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vsnwprintf_s(wchar_t * restrict, rsize_t, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vswprintf_s(wchar_t * restrict, rsize_t, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vswscanf_s(const wchar_t * restrict, const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vwprintf_s(const wchar_t * restrict, va_list);
extern _CRTIMP int __cdecl vwscanf_s(const wchar_t * restrict, va_list);
extern _CRTIMP _CRTCHK(printf,1,2) int __cdecl wprintf_s(const wchar_t * restrict, ...);
extern _CRTIMP _CRTCHK(scanf_s,1,2) int __cdecl wscanf_s(const wchar_t * restrict, ...);

/* general wide-string utilities */
extern _CRTIMP _CRTUSE errno_t __cdecl wcscpy_s(wchar_t * restrict, rsize_t, const wchar_t * restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl wcsncpy_s(wchar_t * restrict, rsize_t, const wchar_t * restrict, rsize_t);
extern _CRTIMP _CRTUSE errno_t __cdecl wmemcpy_s(wchar_t * restrict, rsize_t, const wchar_t * restrict, rsize_t);
extern _CRTIMP _CRTUSE errno_t __cdecl wmemmove_s(wchar_t *, rsize_t, const wchar_t *, rsize_t);
extern _CRTIMP _CRTUSE errno_t __cdecl wcscat_s(wchar_t * restrict, rsize_t, const wchar_t * restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl wcsncat_s(wchar_t * restrict, rsize_t, const wchar_t * restrict, rsize_t);
extern _CRTIMP wchar_t * __cdecl wcstok_s(wchar_t * restrict, rsize_t * restrict, const wchar_t * restrict, wchar_t ** restrict);
extern _CRTIMP size_t __cdecl wcsnlen_s(const wchar_t *, size_t);

/* extended multibyte and wide-character conversion utilities */
extern _CRTIMP _CRTUSE errno_t __cdecl wcrtomb_s(size_t * restrict, char * restrict, rsize_t, wchar_t, mbstate_t * restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl mbsrtowcs_s(size_t * restrict, wchar_t * restrict, rsize_t, const char ** restrict, rsize_t, mbstate_t * restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl wcsrtombs_s(size_t * restrict, char * restrict, rsize_t, const wchar_t ** restrict, rsize_t, mbstate_t * restrict);

#endif /* __STDC_WANT_LIB_EXT1__ */

/* dynamic allocation functions (TR24731-2) */
#if __STDC_WANT_LIB_EXT2__

#ifndef _SSIZE_T_DEFINED
#define _SSIZE_T_DEFINED
typedef __SSIZE_TYPE__ _ssize_t;
typedef __SSIZE_TYPE__ ssize_t;
#else /* SSIZE_T_DEFINED */
#ifndef __POCC__OLDNAMES
typedef __SSIZE_TYPE__ ssize_t;
#endif /* __POCC__OLDNAMES */
#endif /* SSIZE_T_DEFINED */

extern _CRTIMP _CRTUSE struct FILE * __cdecl open_wmemstream(wchar_t **, size_t *);

extern _CRTIMP _CRTCHK(printf,2,3) int __cdecl aswprintf(wchar_t ** restrict, const wchar_t * restrict, ...);
extern _CRTIMP int __cdecl vaswprintf(wchar_t ** restrict, const wchar_t * restrict, va_list);

extern _CRTIMP ssize_t __cdecl getwdelim(wchar_t ** restrict, size_t * restrict, wint_t, struct FILE *);
extern _CRTIMP ssize_t __cdecl getwline(wchar_t **, size_t *, struct FILE *);

#endif /* __STDC_WANT_LIB_EXT2__ */

#endif /* !RC_INVOKED */

#endif /* _WCHAR_H */
