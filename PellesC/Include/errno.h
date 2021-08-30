#ifndef _ERRNO_H
#define _ERRNO_H

/* errno.h - standard header */

#if __POCC__ >= 500
#pragma once
#endif

/* error codes */
#define EPERM         1     /* Operation not permitted */
#define ENOENT        2     /* No such file or directory */
#define ESRCH         3     /* No such process */
#define EINTR         4     /* Interrupted function */
#define EIO           5     /* I/O error */
#define ENXIO         6     /* No such device or address */
#define E2BIG         7     /* Argument list too long */
#define ENOEXEC       8     /* Executable file format error */
#define EBADF         9     /* Bad file descriptor */
#define ECHILD        10    /* No child processes */
#define EAGAIN        11    /* Resource temporarily unavailable */
#define ENOMEM        12    /* Not enough space */
#define EACCES        13    /* Permission denied */
#define EFAULT        14    /* Bad address */
#define EBUSY         16    /* Device or resource busy */
#define EEXIST        17    /* File exists */
#define EXDEV         18    /* Cross-device link */
#define ENODEV        19    /* No such device */
#define ENOTDIR       20    /* Not a directory */
#define EISDIR        21    /* Is a directory */
#define EINVAL        22    /* Invalid argument */
#define ENFILE        23    /* Too many files open in system */
#define EMFILE        24    /* Too many open files */
#define ENOTTY        25    /* Inappropriate I/O control operation */
#define EFBIG         27    /* File too large */
#define ENOSPC        28    /* No space left on device */
#define ESPIPE        29    /* Invalid seek */
#define EROFS         30    /* Read-only file system */
#define EMLINK        31    /* Too many links */
#define EPIPE         32    /* Broken pipe */
#define EDOM          33    /* Mathematics argument out of domain of function (STDC) */
#define ERANGE        34    /* Range error (STDC) */
#define EFPOS         35    /* File positioning error */
#define EDEADLK       36    /* Resource deadlock would occur */
#define ENAMETOOLONG  38    /* Filename too long */
#define ENOLCK        39    /* No locks available */
#define ENOSYS        40    /* Function not supported */
#define ENOTEMPTY     41    /* Directory not empty */
#define EILSEQ        42    /* Multibyte encoding error (STDC) */

/*
 Unsupported "POSIX" error codes.
#define EADDRINUSE    0
#define EADDRNOTAVAIL 0
#define EAFNOSUPPORT  0
#define EALREADY      0
#define EBADMSG       0
#define ECANCELED     0
#define ECONNABORTED  0
#define ECONNREFUSED  0
#define ECONNRESET    0
#define EDESTADDRREQ  0
#define EHOSTUNREACH  0
#define EIDRM         0
#define EINPROGRESS   0
#define EISCONN       0
#define ELOOP         0
#define EMSGSIZE      0
#define ENETDOWN      0
#define ENETRESET     0
#define ENETUNREACH   0
#define ENOBUFS       0
#define ENOMSG        0
#define ENOPROTOOPT   0
#define ENOTCONN      0
#define ENOTSOCK      0
#define ENOTSUP       0
#define EOPNOTSUPP    0
#define EOVERFLOW     0
#define EPROTO        0
#define EPROTONOSUPPORT  0
#define EPROTOTYPE    0
#define ETIMEDOUT     0
#define ETXTBSY       0
#define EWOULDBLOCK   EAGAIN
*/

#if defined(__MT__) || defined(_DLL)
extern int * __cdecl __errno(void);
#define errno  (*__errno())
#else
extern int errno;
#endif /* __MT__ */

/* bounds-checking interfaces (TR24731-1, C11 annex K) */
#if __STDC_WANT_LIB_EXT1__

#ifndef _ERRNO_T_DEFINED
#define _ERRNO_T_DEFINED
typedef int errno_t;
#endif /* _ERRNO_T_DEFINED */

#endif /* __STDC_WANT_LIB_EXT1__ */

#endif /* _ERRNO_H */
