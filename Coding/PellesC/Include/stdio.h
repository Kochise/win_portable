#ifndef _STDIO_H
#define _STDIO_H

/* stdio.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 1000
#error <stdio.h> need POCC version 10.0 or higher
#endif /* __POCC__ < 1000 */

#pragma once

#include <crtdef.h>

/* macros */
#ifndef NULL
#define NULL  ((void *)0)
#endif

#define EOF  (-1)

#define FILENAME_MAX  260

#define _IOFBF  0
#define _IOLBF  1
#define _IONBF  2

#define BUFSIZ  512

#define FOPEN_MAX  256

#define L_tmpnam  260
#define TMP_MAX  32

#define SEEK_SET  0
#define SEEK_CUR  1
#define SEEK_END  2

#define stdin   (&__stdin)
#define stdout  (&__stdout)
#define stderr  (&__stderr)

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

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif /* _WCHAR_T_DEFINED */

#ifndef _VA_LIST_DEFINED
#define _VA_LIST_DEFINED
typedef __VA_LIST_TYPE__ va_list;
#endif /* _VA_LIST_DEFINED */

#ifndef _OFF_T_DEFINED
#define _OFF_T_DEFINED
typedef __OFF_TYPE__ _off_t;
#ifdef __POCC__OLDNAMES
typedef __OFF_TYPE__ off_t;
#endif /* __POCC__OLDNAMES */
#endif /* _OFF_T_DEFINED */

typedef struct FILE FILE;  /* see N1439.pdf */

typedef struct fpos_t {
    long long off;
    mbstate_t wstate;
} fpos_t;

/* operations on files */
extern _CRTIMP int __cdecl remove(const char *);
extern _CRTIMP int __cdecl rename(const char *, const char *);
extern _CRTIMP _CRTUSE FILE * __cdecl tmpfile(void);
extern _CRTIMP char * __cdecl tmpnam(char *);
extern _CRTIMP wchar_t * __cdecl _wtmpnam(wchar_t *);

/* file access functions */
extern _CRTIMP _CRTFRE(1) int __cdecl fclose(FILE *);
extern _CRTIMP int __cdecl fflush(FILE *);
extern _CRTIMP _CRTUSE FILE * __cdecl fopen(const char * restrict, const char * restrict);
extern _CRTIMP int __cdecl setvbuf(FILE * restrict, char * restrict, int, size_t);
extern _CRTIMP _CRTUSE FILE * __cdecl freopen(const char * restrict, const char * restrict, FILE * restrict);
extern _CRTIMP void __cdecl setbuf(FILE * restrict, char * restrict);

/* formatted input/output functions */
extern _CRTIMP _CRTCHK(printf,2,3) int __cdecl fprintf(FILE * restrict, const char * restrict, ...);
extern _CRTIMP _CRTCHK(scanf,2,3) int __cdecl fscanf(FILE * restrict, const char * restrict, ...);
extern _CRTIMP _CRTCHK(printf,2,3) int __cdecl sprintf(char * restrict, const char * restrict, ...);
extern _CRTIMP _CRTCHK(scanf,2,3) int __cdecl sscanf(const char * restrict, const char * restrict, ...);
extern _CRTIMP int __cdecl vfprintf(FILE * restrict, const char * restrict, va_list);
extern _CRTIMP int __cdecl vsprintf(char * restrict, const char * restrict, va_list);
extern _CRTIMP int __cdecl vprintf(const char * restrict, va_list);
extern _CRTIMP _CRTCHK(printf,1,2) int __cdecl printf(const char * restrict, ...);
extern _CRTIMP _CRTCHK(scanf,1,2) int __cdecl scanf(const char * restrict, ...);
extern _CRTIMP int __cdecl vfscanf(FILE * restrict, const char * restrict, va_list);
extern _CRTIMP int __cdecl vsscanf(const char * restrict, const char * restrict, va_list);
extern _CRTIMP int __cdecl vscanf(const char * restrict, va_list);
extern _CRTIMP _CRTCHK(printf,3,4) int __cdecl snprintf(char * restrict, size_t, const char * restrict, ...);
extern _CRTIMP int __cdecl vsnprintf(char * restrict, size_t, const char * restrict, va_list);

/* character input/output functions */
extern _CRTIMP int __cdecl fgetc(FILE *);
extern _CRTIMP char * __cdecl fgets(char * restrict, int, FILE * restrict);
extern _CRTIMP int __cdecl fputc(int, FILE *);
extern _CRTIMP int __cdecl fputs(const char * restrict, FILE * restrict);
extern _CRTIMP int __cdecl getchar(void);
#if __POCC_STDC_VERSION__ < 201112L
extern _CRTOLD("Use fgets() or gets_s().") char * __cdecl gets(char *);
#endif /* __POCC_STDC_VERSION__ < 201112L */
extern _CRTIMP int __cdecl putchar(int);
extern _CRTIMP int __cdecl puts(const char *);
extern _CRTIMP int __cdecl ungetc(int, FILE *);
extern _CRTIMP int __cdecl getc(FILE *);
extern _CRTIMP int __cdecl putc(int, FILE *);

/* direct input/output functions */
extern _CRTIMP size_t __cdecl fread(void * restrict, size_t, size_t, FILE * restrict);
extern _CRTIMP size_t __cdecl fwrite(const void * restrict, size_t, size_t, FILE * restrict);

/* file positioning functions */
extern _CRTIMP int __cdecl fgetpos(FILE * restrict, fpos_t * restrict);
extern _CRTIMP int __cdecl fseek(FILE *, long, int);
extern _CRTIMP int __cdecl fsetpos(FILE *, const fpos_t *);
extern _CRTIMP long __cdecl ftell(FILE *);
extern _CRTIMP void __cdecl rewind(FILE *);

/* error-handling functions */
extern _CRTIMP void __cdecl clearerr(FILE *);
extern _CRTIMP int __cdecl feof(FILE *);
extern _CRTIMP int __cdecl ferror(FILE *);
extern _CRTIMP void __cdecl perror(const char *);
extern _CRTIMP void __cdecl _wperror(const wchar_t *);

/* private extensions to standard C */
extern _CRTIMP int __cdecl _fileno(FILE *);
extern _CRTIMP int __cdecl _fcloseall(void);
extern _CRTIMP _CRTUSE FILE * __cdecl _wfopen(const wchar_t * restrict, const wchar_t * restrict);
extern _CRTIMP _CRTUSE FILE * __cdecl _wfreopen(const wchar_t * restrict, const wchar_t * restrict, FILE * restrict);
extern _CRTIMP _CRTUSE FILE * __cdecl _fdopen(int, const char *);
extern _CRTIMP _CRTUSE FILE * __cdecl _wfdopen(int, const wchar_t *);
extern _CRTIMP _CRTUSE FILE * __cdecl _popen(const char *, const char *);
extern _CRTIMP _CRTFRE(1) int __cdecl _pclose(FILE *);
extern _CRTCHK(printf,3,4) int __cdecl _snprintf(char * restrict, size_t, const char * restrict, ...);
extern _CRTIMP int __cdecl _vsnprintf(char * restrict, size_t, const char * restrict, va_list);
extern _CRTIMP int __cdecl _wremove(const wchar_t *);
extern _CRTIMP int __cdecl _wrename(const wchar_t *, const wchar_t *);
extern _CRTIMP int __cdecl _fseeko(FILE *, _off_t, int);
extern _CRTIMP _off_t __cdecl _ftello(FILE *);
extern _CRTIMP int __cdecl _fseek64(FILE *, long long, int);  /* 14-06-29 */
extern _CRTIMP long long __cdecl _ftell64(FILE *);  /* 14-06-29 */

/* data declarations */
extern _CRTIMP FILE __stdin, __stdout, __stderr;

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern int __cdecl fcloseall(void);
extern int __cdecl fileno(FILE *);
extern _CRTUSE FILE * __cdecl fdopen(int, const char *);
extern int __cdecl fseeko(FILE *, off_t, int);
extern off_t __cdecl ftello(FILE *);
extern _CRTUSE FILE * __cdecl popen(const char *, const char *);
extern _CRTFRE(1) int __cdecl pclose(FILE *);
#endif /* __POCC__OLDNAMES */

#ifdef _MSC_EXTENSIONS
#define _fseeki64  _fseek64
#define _ftelli64  _ftell64
#endif /* _MSC_EXTENSIONS */

/* bounds-checking interfaces (TR24731-1, C11 annex K) */
#if __STDC_WANT_LIB_EXT1__

#define L_tmpnam_s  L_tmpnam
#define TMP_MAX_S  TMP_MAX

#ifndef _ERRNO_T_DEFINED
#define _ERRNO_T_DEFINED
typedef int errno_t;
#endif /* _ERRNO_T_DEFINED */

#ifndef _RSIZE_T_DEFINED
#define _RSIZE_T_DEFINED
typedef __SIZE_TYPE__ rsize_t;
#endif /* _RSIZE_T_DEFINED */

/* operations on files */
extern _CRTIMP _CRTUSE errno_t __cdecl tmpfile_s(FILE * restrict * restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl tmpnam_s(char *, rsize_t);

/* file access functions */
extern _CRTIMP _CRTUSE errno_t __cdecl fopen_s(FILE * restrict * restrict, const char * restrict, const char * restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl freopen_s(FILE * restrict * restrict, const char * restrict, const char * restrict, FILE * restrict);

/* formatted input/output functions */
extern _CRTIMP _CRTCHK(printf,2,3) int __cdecl fprintf_s(FILE * restrict, const char * restrict, ...);
extern _CRTIMP _CRTCHK(scanf_s,2,3) int __cdecl fscanf_s(FILE * restrict, const char * restrict, ...);
extern _CRTIMP _CRTCHK(printf,1,2) int __cdecl printf_s(const char * restrict, ...);
extern _CRTIMP _CRTCHK(scanf_s,1,2) int __cdecl scanf_s(const char * restrict, ...);
extern _CRTIMP _CRTCHK(printf,3,4) int __cdecl snprintf_s(char * restrict, rsize_t, const char * restrict, ...);
extern _CRTIMP _CRTCHK(printf,3,4) int __cdecl sprintf_s(char * restrict, rsize_t, const char * restrict, ...);
extern _CRTIMP _CRTCHK(scanf_s,2,3) int __cdecl sscanf_s(const char * restrict, const char * restrict, ...);
extern _CRTIMP int __cdecl vfprintf_s(FILE * restrict, const char * restrict, va_list);
extern _CRTIMP int __cdecl vfscanf_s(FILE * restrict, const char * restrict, va_list);
extern _CRTIMP int __cdecl vprintf_s(const char * restrict, va_list);
extern _CRTIMP int __cdecl vscanf_s(const char * restrict, va_list);
extern _CRTIMP int __cdecl vsnprintf_s(char * restrict, rsize_t, const char * restrict, va_list);
extern _CRTIMP int __cdecl vsprintf_s(char * restrict, rsize_t, const char * restrict, va_list);
extern _CRTIMP int __cdecl vsscanf_s(const char * restrict, const char * restrict, va_list);

/* character input/output functions */
extern _CRTIMP char * __cdecl gets_s(char *, rsize_t);

/* private extensions */
extern _CRTIMP _CRTUSE errno_t __cdecl _wfopen_s(FILE * restrict * restrict, const wchar_t * restrict, const wchar_t * restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl _wfreopen_s(FILE * restrict * restrict, const wchar_t * restrict, const wchar_t * restrict, FILE * restrict);

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

extern _CRTIMP _CRTUSE FILE * __cdecl fmemopen(void * restrict, size_t, const char * restrict);
extern _CRTIMP _CRTUSE FILE * __cdecl open_memstream(char ** restrict, size_t * restrict);

extern _CRTIMP _CRTCHK(printf,2,3) int __cdecl asprintf(char ** restrict, const char * restrict, ...);
extern _CRTIMP int __cdecl vasprintf(char ** restrict, const char * restrict, va_list);

extern _CRTIMP ssize_t __cdecl getdelim(char ** restrict, size_t * restrict, int, FILE *);
extern _CRTIMP ssize_t __cdecl getline(char **, size_t *, FILE *);

#endif /* __STDC_WANT_LIB_EXT2__ */

#endif /* !RC_INVOKED */

#endif /* _STDIO_H */
