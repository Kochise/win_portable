#ifndef _DLFCN_H
#define _DLFCN_H

/* dlfcn.h - private header for dynamic linking */

#if __POCC__ >= 500
#pragma once
#endif

#include <crtdef.h>

/* modes for _dlopen() */
#define _RTLD_NOW   0x0000
#define _RTLD_LAZY  0x0001

/* declarations */
extern _CRTFRE(1) int __cdecl _dlclose(void *);
extern const char * __cdecl _dlerror(void);
extern void * __cdecl _dlopen(const char *, int);
extern void * __cdecl _dlsym(void * restrict, const char * restrict);

/* compatibility names */
#ifdef __POCC__OLDNAMES
#define RTLD_NOW  _RTLD_NOW
#define RTLD_LAZY  _RTLD_LAZY

extern _CRTFRE(1) int __cdecl dlclose(void *);
extern const char * __cdecl dlerror(void);
extern void * __cdecl dlopen(const char *, int);
extern void * __cdecl dlsym(void * restrict, const char * restrict);
#endif /* __POCC__OLDNAMES */

#endif /* _DLFCN_H */
