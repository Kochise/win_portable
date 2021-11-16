#ifndef _SETJMP_H
#define _SETJMP_H

/* setjmp.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <srtjmp.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

#if __POCC_TARGET__ == 1

/* macros */
#define setjmp(env)  _setjmp3((env),0)

/* type definitions */
typedef int jmp_buf[16];

/* declarations */
extern _CRTJMP int __cdecl _setjmp3(jmp_buf, int);  /* MS compatible */
extern _CRTEND void __cdecl longjmp(jmp_buf, int);

#elif __POCC_TARGET__ == 3

/* macros */
#define setjmp(env)  _setjmp((env),0)

/* type definitions */
typedef struct __declspec(align(16)) {
    unsigned long long data[2];
} jmp_buf[16];

/* declarations */
extern _CRTJMP int __cdecl _setjmp(jmp_buf, int);
extern _CRTEND void __cdecl longjmp(jmp_buf, int);

#else /* __POCC_TARGET__ == WTF */

#error Unknown target machine in <setjmp.h>

#endif /* __POCC_TARGET__ */

#endif /* !RC_INVOKED */

#endif /* _SETJMP_H */
