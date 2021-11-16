#ifndef _SYS_MMAN_H
#define _SYS_MMAN_H

/* sys/mman.h - private header for memory maps */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <sys/mman.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <sys/types.h>
#include <crtdef.h>

/* type definitions */
#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

#define _PROT_READ      0x01    /* data can be read */
#define _PROT_WRITE     0x02    /* data can be written */
#define _PROT_EXEC      0x04    /* data can be executed */
#define _PROT_NONE      0x00    /* data cannot be accessed */

#define _MAP_SHARED     0x00    /* changes are shared */
#define _MAP_PRIVATE    0x01    /* changes are private */
#define _MAP_FIXED      0x02    /* interpret address exactly */

#define _MAP_FAILED  ((void *)-1)

/* declarations */
extern _CRTIMP void * __cdecl _mmap(void *, size_t, int, int, int, _off_t);
extern _CRTIMP int __cdecl _msync(void *, size_t, int);
extern _CRTIMP _CRTFRE(1) int __cdecl _munmap(void *, size_t);

/* compatibility names */
#ifdef __POCC__OLDNAMES
#define PROT_READ  _PROT_READ
#define PROT_WRITE  _PROT_WRITE
#define PROT_EXEC  _PROT_EXEC
#define PROT_NONE  _PROT_NONE

#define MAP_SHARED  _MAP_SHARED
#define MAP_PRIVATE  _MAP_PRIVATE
#define MAP_FIXED  _MAP_FIXED

#define MAP_FAILED  _MAP_FAILED

extern void * __cdecl mmap(void *, size_t, int, int, int, off_t);
extern int __cdecl msync(void *, size_t, int);
extern _CRTFRE(1) int __cdecl munmap(void *, size_t);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _SYS_MMAN_H */
