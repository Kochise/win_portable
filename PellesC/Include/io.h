#ifndef _IO_H
#define _IO_H

/* io.h - private header for low-level I/O definitions */

#ifndef RC_INVOKED

#if __POCC__ < 1000
#error <io.h> need POCC version 10.0 or higher
#endif /* __POCC__ < 1000 */

#pragma once

#include <crtdef.h>

/* type definitions */
#ifndef _TIME_T_DEFINED
#define _TIME_T_DEFINED
typedef __TIME_TYPE__ time_t;
#endif /* _TIME_T_DEFINED */

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif /* _WCHAR_T_DEFINED */

#ifndef _INTPTR_T_DEFINED
#define _INTPTR_T_DEFINED
typedef __INTPTR_TYPE__ intptr_t;
#endif /* _INTPTR_T_DEFINED */

#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

#ifndef _OFF_T_DEFINED
#define _OFF_T_DEFINED
typedef __OFF_TYPE__ _off_t;
#ifdef __POCC__OLDNAMES
typedef __OFF_TYPE__ off_t;
#endif /* __POCC__OLDNAMES */
#endif /* _OFF_T_DEFINED */

#ifndef _SSIZE_T_DEFINED
#define _SSIZE_T_DEFINED
typedef __SSIZE_TYPE__ _ssize_t;
#ifdef __POCC__OLDNAMES
typedef __SSIZE_TYPE__ ssize_t;
#endif /* __POCC__OLDNAMES */
#endif /* SSIZE_T_DEFINED */

#if _USE_32BIT_TIME_T
struct _finddata_t {
    unsigned int attrib;
    time_t time_create;
    time_t time_access;
    time_t time_write;
    unsigned long size;
    char name[260];
};
#endif /* _USE_32BIT_TIME_T */

#if _USE_32BIT_TIME_T
struct _wfinddata_t {
    unsigned int attrib;
    time_t time_create;
    time_t time_access;
    time_t time_write;
    unsigned long size;
    wchar_t name[260];
};
#endif /* _USE_32BIT_TIME_T */

struct _finddata64_t {
    unsigned int attrib;
    time_t time_create;
    time_t time_access;
    time_t time_write;
    unsigned long long size;
    char name[260];
};

struct _wfinddata64_t {
    unsigned int attrib;
    time_t time_create;
    time_t time_access;
    time_t time_write;
    unsigned long long size;
    wchar_t name[260];
};

/* attributes for _findfirst() */
#define _A_NORMAL   0x00
#define _A_RDONLY   0x01
#define _A_HIDDEN   0x02
#define _A_SYSTEM   0x04
#define _A_SUBDIR   0x10
#define _A_ARCH     0x20

/* sharing modes for _sopen() */
#define _SH_DENYRW  0x10
#define _SH_DENYWR  0x20
#define _SH_DENYRD  0x30
#define _SH_DENYNO  0x40

/* flags for _open() and _chmod() */
#define _S_IREAD    0x100
#define _S_IWRITE   0x80

/* locking modes for _locking() and _locking64() */
#define _LK_UNLCK   0
#define _LK_LOCK    1
#define _LK_NBLCK   2
#define _LK_RLCK    3
#define _LK_NBRLCK  4

/* declarations */
extern _CRTIMP int __cdecl _access(const char *, int);
extern _CRTIMP int __cdecl _chmod(const char *, int);
extern _CRTIMP int __cdecl _chsize(int, long);
extern _CRTIMP int __cdecl _chsize64(int, long long);
extern _CRTIMP _CRTFRE(1) int __cdecl _close(int);
extern _CRTIMP int __cdecl _commit(int);
extern _CRTIMP _CRTUSE int __cdecl _creat(const char *, int);
extern _CRTIMP _CRTUSE int __cdecl _dup(int);
extern _CRTIMP int __cdecl _dup2(int, int);
extern _CRTIMP int __cdecl _eof(int);
extern _CRTIMP long __cdecl _filelength(int);
extern _CRTIMP long long __cdecl _filelength64(int);
#if _USE_32BIT_TIME_T
extern _CRTIMP _CRTOLD("Use _findfirst64().") _CRTUSE intptr_t __cdecl _findfirst(const char *, struct _finddata_t *);
extern _CRTIMP _CRTOLD("Use _findnext64().") int __cdecl _findnext(intptr_t, struct _finddata_t *);
#endif /* _USE_32BIT_TIME_T */
extern _CRTIMP _CRTUSE intptr_t __cdecl _findfirst64(const char *, struct _finddata64_t *);
extern _CRTIMP int __cdecl _findnext64(intptr_t, struct _finddata64_t *);
extern _CRTIMP _CRTFRE(1) int __cdecl _findclose(intptr_t);
extern _CRTIMP int __cdecl _ftruncate(int, _off_t);
extern _CRTIMP intptr_t __cdecl _get_osfhandle(int);
extern _CRTIMP int __cdecl _open_osfhandle(intptr_t, int);
extern _CRTIMP int __cdecl _isatty(int);
extern _CRTIMP int __cdecl _locking(int, int, long);
extern _CRTIMP int __cdecl _locking64(int, int, long long);
extern _CRTIMP _off_t __cdecl _lseek(int, _off_t, int);
extern _CRTIMP long long __cdecl _lseek64(int, long long, int);
extern _CRTIMP _CRTUSE int __cdecl _open(const char *, int, ...);
extern _CRTIMP int __cdecl _pipe(int *, unsigned int, int);
extern _CRTIMP _ssize_t __cdecl _read(int, void *, size_t);
extern _CRTIMP int __cdecl _setmode(int, int);
extern _CRTIMP _CRTUSE int __cdecl _sopen(const char *, int, int, ...);
extern _CRTIMP int __cdecl _symlink(const char *, const char *);
extern _CRTIMP long __cdecl _tell(int);
extern _CRTIMP long long __cdecl _tell64(int);
extern _CRTIMP int __cdecl _unlink(const char *);
extern _CRTIMP _ssize_t __cdecl _write(int, const void *, size_t);

/* wide-character */
extern _CRTIMP int __cdecl _waccess(const wchar_t *, int);
extern _CRTIMP int __cdecl _wchmod(const wchar_t *, int);
extern _CRTIMP _CRTUSE int __cdecl _wcreat(const wchar_t *, int);
#if _USE_32BIT_TIME_T
extern _CRTIMP _CRTOLD("Use _wfindfirst64().") _CRTUSE intptr_t __cdecl _wfindfirst(const wchar_t *, struct _wfinddata_t *);
extern _CRTIMP _CRTOLD("Use _wfindnext64().") int __cdecl _wfindnext(intptr_t, struct _wfinddata_t *);
#endif /* _USE_32BIT_TIME_T */
extern _CRTIMP _CRTUSE intptr_t __cdecl _wfindfirst64(const wchar_t *, struct _wfinddata64_t *);
extern _CRTIMP int __cdecl _wfindnext64(intptr_t, struct _wfinddata64_t *);
extern _CRTIMP _CRTUSE int __cdecl _wopen(const wchar_t *, int, ...);
extern _CRTIMP _CRTUSE int __cdecl _wsopen(const wchar_t *, int, int, ...);
extern _CRTIMP int __cdecl _wsymlink(const wchar_t *, const wchar_t *);
extern _CRTIMP int __cdecl _wunlink(const wchar_t *);

/* macros */
#define _tell(fh)  _lseek((fh),0L,/*SEEK_CUR*/1)
#define _tell64(fh)  _lseek64((fh),0LL,/*SEEK_CUR*/1)

/* compatibility names */
#ifdef __POCC__OLDNAMES
#define SH_DENYRW  _SH_DENYRW
#define SH_DENYWR  _SH_DENYWR
#define SH_DENYRD  _SH_DENYRD
#define SH_DENYNO  _SH_DENYNO
#define S_IREAD  _S_IREAD
#define S_IWRITE  _S_IWRITE
#define LK_UNLCK  _LK_UNLCK
#define LK_LOCK  _LK_LOCK
#define LK_NBLCK  _LK_NBLCK
#define LK_RLCK  _LK_RLCK
#define LK_NBRLCK  _LK_NBRLCK

extern int __cdecl access(const char *, int);
extern int __cdecl chmod(const char *, int);
extern int __cdecl chsize(int, long);
extern int __cdecl close(int);
extern _CRTUSE int __cdecl creat(const char *, int);
extern _CRTUSE int __cdecl dup(int);
extern int __cdecl dup2(int, int);
extern int __cdecl eof(int);
extern long __cdecl filelength(int);
extern int __cdecl ftruncate(int, off_t);
extern int __cdecl isatty(int);
extern int __cdecl locking(int, int, long);
extern off_t __cdecl lseek(int, off_t, int);
extern _CRTUSE int __cdecl open(const char *, int, ...);
extern ssize_t __cdecl read(int, void *, size_t);
extern int __cdecl setmode(int, int);
extern _CRTUSE int __cdecl sopen(const char *, int, int, ...);
extern long __cdecl tell(int);
extern int __cdecl unlink(const char *);
extern ssize_t __cdecl write(int, const void *, size_t);
#endif /* __POCC__OLDNAMES */

#ifdef _MSC_EXTENSIONS
#define _filelengthi64(h)  _filelength64(h)
#define _lseeki64(h,o,m)  _lseek64(h,o,m)
#define _telli64(h)  _tell64(h)
#endif /* _MSC_EXTENSIONS */

#endif /* !RC_INVOKED */

#endif /* _IO_H */
