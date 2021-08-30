#ifndef _PROCESS_H
#define _PROCESS_H

/* process.h - private header for process control */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <process.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif

#ifndef _INTPTR_T_DEFINED
#define _INTPTR_T_DEFINED
typedef __INTPTR_TYPE__ intptr_t;
#endif /* _INTPTR_T_DEFINED */

#ifndef _UINTPTR_T_DEFINED
#define _UINTPTR_T_DEFINED
typedef __UINTPTR_TYPE__ uintptr_t;
#endif /* _UINTPTR_T_DEFINED */

/* modes for _spawn* functions */
#define _P_WAIT     0
#define _P_NOWAIT   1
#define _P_OVERLAY  2
#define _P_NOWAITO  3
#define _P_DETACH   4

/* declarations */
#ifdef __MT__
extern _CRTIMP uintptr_t __cdecl _beginthread(void (__cdecl *)(void *), unsigned int, void *);
extern _CRTIMP _CRTEND void __cdecl _endthread(void);
#ifdef _MSC_EXTENSIONS  /* __stdcall require this */
extern _CRTIMP uintptr_t __cdecl _beginthreadex(void *, unsigned int, unsigned int (__stdcall *)(void *), void *, unsigned int, unsigned int *);
extern _CRTIMP _CRTEND void __cdecl _endthreadex(unsigned int);
#endif /* _MSC_EXTENSIONS */
#endif /* __MT__ */

extern _CRTIMP int __cdecl _getpid(void);
extern _CRTIMP int __cdecl _gettid(void);
extern _CRTIMP intptr_t __cdecl _cwait(int *, intptr_t, int);
extern _CRTIMP intptr_t __cdecl _execl(const char *, const char *, ...);
extern _CRTIMP intptr_t __cdecl _execle(const char *, const char *, ...);
extern _CRTIMP intptr_t __cdecl _execlp(const char *, const char *, ...);
extern _CRTIMP intptr_t __cdecl _execlpe(const char *, const char *, ...);
extern _CRTIMP intptr_t __cdecl _execv(const char *, char * const *);
extern _CRTIMP intptr_t __cdecl _execve(const char *, char * const *, char * const *);
extern _CRTIMP intptr_t __cdecl _execvp(const char *, char * const *);
extern _CRTIMP intptr_t __cdecl _execvpe(const char *, char * const *, char * const *);
extern _CRTIMP intptr_t __cdecl _spawnl(int, const char *, const char *, ...);
extern _CRTIMP intptr_t __cdecl _spawnle(int, const char *, const char *, ...);
extern _CRTIMP intptr_t __cdecl _spawnlp(int, const char *, const char *, ...);
extern _CRTIMP intptr_t __cdecl _spawnlpe(int, const char *, const char *, ...);
extern _CRTIMP intptr_t __cdecl _spawnv(int, const char *, char * const *);
extern _CRTIMP intptr_t __cdecl _spawnve(int, const char *, char * const *, char * const *);
extern _CRTIMP intptr_t __cdecl _spawnvp(int, const char *, char * const *);
extern _CRTIMP intptr_t __cdecl _spawnvpe(int, const char *, char * const *, char * const *);
extern _CRTIMP intptr_t __cdecl _wexecl(const wchar_t *, const wchar_t *, ...);
extern _CRTIMP intptr_t __cdecl _wexecle(const wchar_t *, const wchar_t *, ...);
extern _CRTIMP intptr_t __cdecl _wexeclp(const wchar_t *, const wchar_t *, ...);
extern _CRTIMP intptr_t __cdecl _wexeclpe(const wchar_t *, const wchar_t *, ...);
extern _CRTIMP intptr_t __cdecl _wexecv(const wchar_t *, wchar_t * const *);
extern _CRTIMP intptr_t __cdecl _wexecve(const wchar_t *, wchar_t * const *, wchar_t * const *);
extern _CRTIMP intptr_t __cdecl _wexecvp(const wchar_t *, wchar_t * const *);
extern _CRTIMP intptr_t __cdecl _wexecvpe(const wchar_t *, wchar_t * const *, wchar_t * const *);
extern _CRTIMP intptr_t __cdecl _wspawnl(int, const wchar_t *, const wchar_t *, ...);
extern _CRTIMP intptr_t __cdecl _wspawnle(int, const wchar_t *, const wchar_t *, ...);
extern _CRTIMP intptr_t __cdecl _wspawnlp(int, const wchar_t *, const wchar_t *, ...);
extern _CRTIMP intptr_t __cdecl _wspawnlpe(int, const wchar_t *, const wchar_t *, ...);
extern _CRTIMP intptr_t __cdecl _wspawnv(int, const wchar_t *, wchar_t * const *);
extern _CRTIMP intptr_t __cdecl _wspawnve(int, const wchar_t *, wchar_t * const *, wchar_t * const *);
extern _CRTIMP intptr_t __cdecl _wspawnvp(int, const wchar_t *, wchar_t * const *);
extern _CRTIMP intptr_t __cdecl _wspawnvpe(int, const wchar_t *, wchar_t * const *, wchar_t * const *);

/* compatibility names */
#ifdef __POCC__OLDNAMES
#define P_WAIT  _P_WAIT
#define P_NOWAIT  _P_NOWAIT
#define P_OVERLAY  _P_OVERLAY
#define P_NOWAITO  _P_NOWAITO
#define P_DETACH  _P_DETACH

extern int __cdecl getpid(void);
extern int __cdecl gettid(void);
extern intptr_t __cdecl cwait(int *, intptr_t, int);
extern intptr_t __cdecl execl(const char *, const char *, ...);
extern intptr_t __cdecl execle(const char *, const char *, ...);
extern intptr_t __cdecl execlp(const char *, const char *, ...);
extern intptr_t __cdecl execlpe(const char *, const char *, ...);
extern intptr_t __cdecl execv(const char *, char * const *);
extern intptr_t __cdecl execve(const char *, char * const *, char * const *);
extern intptr_t __cdecl execvp(const char *, char * const *);
extern intptr_t __cdecl execvpe(const char *, char * const *, char * const *);
extern intptr_t __cdecl spawnl(int, const char *, const char *, ...);
extern intptr_t __cdecl spawnle(int, const char *, const char *, ...);
extern intptr_t __cdecl spawnlp(int, const char *, const char *, ...);
extern intptr_t __cdecl spawnlpe(int, const char *, const char *, ...);
extern intptr_t __cdecl spawnv(int, const char *, char * const *);
extern intptr_t __cdecl spawnve(int, const char *, char * const *, char * const *);
extern intptr_t __cdecl spawnvp(int, const char *, char * const *);
extern intptr_t __cdecl spawnvpe(int, const char *, char * const *, char * const *);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _PROCESS_H */
