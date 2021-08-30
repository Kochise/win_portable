#ifndef _STRING_H
#define _STRING_H

/* string.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <string.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

/* macros */
#ifndef NULL
#define NULL  ((void *)0)
#endif

/* type definitions */
#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

/* declarations */
extern _CRTIMP void * __cdecl memchr(const void *, int, size_t);
extern _CRTIMP int __cdecl memcmp(const void *, const void *, size_t);
extern _CRTIMP void * __cdecl memcpy(void * restrict, const void * restrict, size_t);
extern _CRTIMP void * __cdecl memmove(void *, const void *, size_t);
extern _CRTIMP void * __cdecl memset(void *, int, size_t);
extern _CRTIMP char * __cdecl strcat(char * restrict, const char * restrict);
extern _CRTIMP char * __cdecl strchr(const char *, int);
extern _CRTIMP int __cdecl strcmp(const char *, const char *);
extern _CRTIMP char * __cdecl strcpy(char * restrict, const char * restrict);
extern _CRTIMP size_t __cdecl strcspn(const char *, const char *);
extern _CRTIMP size_t __cdecl strlen(const char *);
extern _CRTIMP char * __cdecl strncat(char * restrict, const char * restrict, size_t);
extern _CRTIMP int __cdecl strncmp(const char *, const char *, size_t);
extern _CRTIMP char * __cdecl strncpy(char * restrict, const char * restrict, size_t);
extern _CRTIMP char * __cdecl strpbrk(const char *, const char *);
extern _CRTIMP char * __cdecl strrchr(const char *, int);
extern _CRTIMP size_t __cdecl strspn(const char *, const char *);
extern _CRTIMP char * __cdecl strstr(const char *, const char *);
extern _CRTIMP char * __cdecl strtok(char * restrict, const char * restrict);
extern _CRTIMP int __cdecl strcoll(const char *, const char *);
extern _CRTIMP char * __cdecl strerror(int);
extern _CRTIMP size_t __cdecl strxfrm(char * restrict, const char * restrict, size_t);
#if __POCC_STDC_VERSION__ > 201710L
extern _CRTIMP void * __cdecl memccpy(void * restrict, const void * restrict, int, size_t);
extern _CRTIMP _CRTUSE char * __cdecl strdup(const char *);
extern _CRTIMP _CRTUSE char * __cdecl strndup(const char *, size_t);
#endif /* __POCC_STDC_VERSION__ > 201710L */

/* private extensions to standard C */
extern _CRTIMP int __cdecl _memicmp(const void *, const void *, size_t);
#if __POCC_STDC_VERSION__ > 201710L
extern _CRTIMP _CRTUSE _CRTOLD("Use strdup().") char * __cdecl _strdup(const char *);
#else /* __POCC_STDC_VERSION__ <= 201710L */
extern _CRTIMP _CRTUSE char * __cdecl _strdup(const char *);
#endif /* __POCC_STDC_VERSION__ <= 201710L */
extern _CRTIMP int __cdecl _stricmp(const char *, const char *);
extern _CRTIMP char * __cdecl _strlwr(char *);
#if __POCC_STDC_VERSION__ > 201710L
extern _CRTIMP _CRTUSE _CRTOLD("Use strndup().") char * __cdecl _strndup(const char *, size_t);
#else /* __POCC_STDC_VERSION__ <= 201710L */
extern _CRTIMP _CRTUSE char * __cdecl _strndup(const char *, size_t);
#endif /* __POCC_STDC_VERSION__ <= 201710L */
extern _CRTIMP int __cdecl _strnicmp(const char *, const char *, size_t);
extern _CRTIMP char * __cdecl _strset(char *, int);
extern _CRTIMP char * __cdecl _strnset(char *, int, size_t);
extern _CRTIMP char * __cdecl _strrev(char *);
extern _CRTIMP char * __cdecl _strupr(char *);
extern _CRTIMP void * __cdecl _memichr(const void *, int, size_t);
extern _CRTIMP char * __cdecl _strichr(const char *, int);
extern _CRTIMP char * __cdecl _stristr(const char *, const char *);
extern _CRTIMP char * __cdecl _strrichr(const char *, int);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern int __cdecl memicmp(const void *, const void *, size_t);
#if __POCC_STDC_VERSION__ <= 201710L
extern _CRTUSE char * __cdecl strdup(const char *);
#endif /* __POCC_STDC_VERSION__ <= 201710L */
extern int __cdecl stricmp(const char *, const char *);
extern char * __cdecl strlwr(char *);
extern int __cdecl strnicmp(const char *, const char *, size_t);
extern char * __cdecl strset(char *, int);
extern char * __cdecl strnset(char *, int, size_t);
extern char * __cdecl strrev(char *);
extern char * __cdecl strupr(char *);
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

/* declarations */
extern _CRTIMP _CRTUSE errno_t __cdecl memcpy_s(void * restrict, rsize_t, const void * restrict, rsize_t);
extern _CRTIMP _CRTUSE errno_t __cdecl memmove_s(void *, rsize_t, const void *, rsize_t);
#if __POCC_STDC_VERSION__ >= 201112L
extern _CRTIMP _CRTUSE errno_t __cdecl memset_s(void * restrict, rsize_t, int, rsize_t);
#endif /* __POCC_STDC_VERSION__ >= 201112L */
extern _CRTIMP _CRTUSE errno_t __cdecl strcpy_s(char * restrict, rsize_t, const char * restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl strncpy_s(char * restrict, rsize_t, const char * restrict, rsize_t);
extern _CRTIMP _CRTUSE errno_t __cdecl strcat_s(char * restrict, rsize_t, const char * restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl strncat_s(char * restrict, rsize_t, const char * restrict, rsize_t);
extern _CRTIMP char * __cdecl strtok_s(char * restrict, rsize_t * restrict, const char * restrict, char ** restrict);
extern _CRTIMP _CRTUSE errno_t __cdecl strerror_s(char *, rsize_t, errno_t);
extern _CRTIMP size_t __cdecl strerrorlen_s(errno_t);
extern _CRTIMP size_t __cdecl strnlen_s(const char *, size_t);

#endif /* __STDC_WANT_LIB_EXT1__ */

/* dynamic allocation functions (TR24731-2) */
#if __STDC_WANT_LIB_EXT2__

#ifndef __POCC__OLDNAMES
extern char * __cdecl strdup(const char *);
#endif /* !__POCC__OLDNAMES */
extern char * __cdecl strndup(const char *, size_t);

#endif /* __STDC_WANT_LIB_EXT2__ */

#endif /* !RC_INVOKED */

#endif /* _STRING_H */
