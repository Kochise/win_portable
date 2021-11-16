#ifndef _REGEX_H
#define _REGEX_H

/* regex.h - private header for regular expression matching */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <regex.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

/* type definitions */
#ifndef _SIZE_T_DEFINED
#define _SIZE_T_DEFINED
typedef __SIZE_TYPE__ size_t;
#endif /* _SIZE_T_DEFINED */

typedef struct {
    int re_magic;
    size_t re_nsub;
    const char *re_endp;
    struct re_guts *re_g;
} _regex_t;

typedef long _regoff_t;

typedef struct {
    _regoff_t rm_so;
    _regoff_t rm_eo;
} _regmatch_t;

/* flags for regcomp() */
#define _REG_EXTENDED  0x0001
#define _REG_ICASE     0x0002
#define _REG_NOSUB     0x0004
#define _REG_NEWLINE   0x0008
#define _REG_NOSPEC    0x0010
#define _REG_PEND      0x0020

/* flags for regexec() */
#define _REG_NOTBOL    0x0001
#define _REG_NOTEOL    0x0002
#define _REG_STARTEND  0x0004
#define _REG_LARGE     0x1000
#define _REG_BACKR     0x2000

/* error return values */
#define _REG_NOMATCH  1
#define _REG_BADPAT  2
#define _REG_ECOLLATE  3
#define _REG_ECTYPE  4
#define _REG_EESCAPE  5
#define _REG_ESUBREG  6
#define _REG_EBRACK  7
#define _REG_EPAREN  8
#define _REG_EBRACE  9
#define _REG_BADBR  10
#define _REG_ERANGE  11
#define _REG_ESPACE  12
#define _REG_BADRPT  13
#define _REG_EMPTY  14
#define _REG_ASSERT  15
#define _REG_INVARG  16

/* declarations */
extern _CRTIMP int __cdecl _regcomp(_regex_t * restrict, const char * restrict, int);
extern _CRTIMP size_t __cdecl _regerror(int, const _regex_t * restrict, char * restrict, size_t);
extern _CRTIMP int __cdecl _regexec(const _regex_t * restrict, const char * restrict, size_t, _regmatch_t [restrict], int);
extern _CRTIMP _CRTFRE(1) void __cdecl _regfree(_regex_t *);

/* compatibility names */
#ifdef __POCC__OLDNAMES
typedef long regoff_t;

typedef struct {
    int re_magic;
    size_t re_nsub;
    const char *re_endp;
    struct re_guts *re_g;
} regex_t;

typedef struct {
    regoff_t rm_so;
    regoff_t rm_eo;
} regmatch_t;

#define REG_EXTENDED  _REG_EXTENDED
#define REG_ICASE  _REG_ICASE
#define REG_NOSUB  _REG_NOSUB
#define REG_NEWLINE  _REG_NEWLINE

#define REG_NOTBOL  _REG_NOTBOL
#define REG_NOTEOL  _REG_NOTEOL

#define REG_NOMATCH  _REG_NOMATCH
#define REG_BADPAT  _REG_BADPAT
#define REG_ECOLLATE  _REG_ECOLLATE
#define REG_ECTYPE  _REG_ECTYPE
#define REG_EESCAPE  _REG_EESCAPE
#define REG_ESUBREG  _REG_ESUBREG
#define REG_EBRACK  _REG_EBRACK
#define REG_EPAREN  _REG_EPAREN
#define REG_EBRACE  _REG_EBRACE
#define REG_BADBR  _REG_BADBR
#define REG_ERANGE  _REG_ERANGE
#define REG_ESPACE  _REG_ESPACE
#define REG_BADRPT  _REG_BADRPT
#define REG_EMPTY  _REG_EMPTY
#define REG_ASSERT  _REG_ASSERT
#define REG_INVARG  _REG_INVARG

extern int __cdecl regcomp(regex_t * restrict, const char * restrict, int);
extern size_t __cdecl regerror(int, const regex_t * restrict, char * restrict, size_t);
extern int __cdecl regexec(const regex_t * restrict, const char * restrict, size_t, regmatch_t [restrict], int);
extern void __cdecl regfree(regex_t *);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _REGEX_H */
