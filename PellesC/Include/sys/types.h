#ifndef _SYS_TYPES_H
#define _SYS_TYPES_H

/* sys/types.h - private header for system types */

#ifndef RC_INVOKED

#if __POCC__ < 1000
#error <sys/types.h> need POCC version 10.0 or higher
#endif /* __POCC__ < 1000 */

#pragma once

/* type definitions */
#ifndef _CLOCK_T_DEFINED
#define _CLOCK_T_DEFINED
typedef unsigned int clock_t;
#endif /* _CLOCK_T_DEFINED */

#ifndef _TIME_T_DEFINED
#define _TIME_T_DEFINED
typedef __TIME_TYPE__ time_t;
#endif /* _TIME_T_DEFINED */

#ifndef _SUSECONDS_T_DEFINED
#define _SUSECONDS_T_DEFINED
typedef signed long _suseconds_t;
#ifdef __POCC__OLDNAMES
typedef signed long suseconds_t;
#endif /* __POCC__OLDNAMES */
#endif /* _SUSECONDS_T_DEFINED */

#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

#ifndef _SSIZE_T_DEFINED
#define _SSIZE_T_DEFINED
typedef __SSIZE_TYPE__ _ssize_t;
#ifdef __POCC__OLDNAMES
typedef __SSIZE_TYPE__ ssize_t;
#endif /* __POCC__OLDNAMES */
#endif /* SSIZE_T_DEFINED */

#ifndef _DEV_T_DEFINED
#define _DEV_T_DEFINED
typedef unsigned int _dev_t;
#ifdef __POCC__OLDNAMES
typedef unsigned int dev_t;
#endif /* __POCC__OLDNAMES */
#endif /* _DEV_T_DEFINED */

#ifndef _INO_T_DEFINED
#define _INO_T_DEFINED
typedef unsigned short _ino_t;
#ifdef __POCC__OLDNAMES
typedef unsigned short ino_t;
#endif /* __POCC__OLDNAMES */
#endif /* _INO_T_DEFINED */

#ifndef _OFF_T_DEFINED
#define _OFF_T_DEFINED
typedef __OFF_TYPE__ _off_t;
#ifdef __POCC__OLDNAMES
typedef __OFF_TYPE__ off_t;
#endif /* __POCC__OLDNAMES */
#endif /* _OFF_T_DEFINED */

#ifndef _PID_T_DEFINED
#define _PID_T_DEFINED
typedef __INTPTR_TYPE__ _pid_t;
#ifdef __POCC__OLDNAMES
typedef __INTPTR_TYPE__ pid_t;
#endif /* __POCC__OLDNAMES */
#endif /* _PID_T_DEFINED */

#endif /* !RC_INVOKED */

#endif /* _SYS_TYPES_H */
