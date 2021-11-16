#ifndef _CONIO_H
#define _CONIO_H

/* conio.h - private header for console I/O definitions */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <conio.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef __WCHAR_TYPE__ wchar_t;
#endif

#ifndef _WINT_T_DEFINED
#define _WINT_T_DEFINED
typedef __WINT_TYPE__ wint_t;
#endif /* _WINT_T_DEFINED */

#ifdef _CONIO_RETRO_COLORS
#define BLACK  0
#define BLUE  1
#define GREEN  2
#define CYAN  3
#define RED  4
#define MAGENTA  5
#define BROWN  6
#define LIGHTGRAY  7
#define DARKGRAY  8
#define LIGHTBLUE  9
#define LIGHTGREEN  10
#define LIGHTCYAN  11
#define LIGHTRED  12
#define LIGHTMAGENTA  13
#define YELLOW  14
#define WHITE  15
#endif /* _CONIO_RETRO_COLORS */

/* declarations */
extern _CRTIMP char * __cdecl _cgets(char *);
extern _CRTIMP void __cdecl _clreol(void);
extern _CRTIMP void __cdecl _clrscr(void);
extern _CRTIMP _CRTCHK(printf,1,2) int __cdecl _cprintf(const char * restrict, ...);
extern _CRTIMP int __cdecl _cputs(const char *);
extern _CRTIMP _CRTCHK(scanf,1,2) int __cdecl _cscanf(const char * restrict, ...);
extern _CRTIMP _CRTCHK(printf,1,2) int __cdecl _cwprintf(const wchar_t * restrict, ...);
extern _CRTIMP int __cdecl _getch(void);
extern _CRTIMP int __cdecl _getche(void);
extern _CRTIMP void __cdecl _gotoxy(int, int);
extern _CRTIMP int __cdecl _inp(unsigned short);
extern _CRTIMP unsigned short __cdecl _inpw(unsigned short);
extern _CRTIMP unsigned long __cdecl _inpd(unsigned short);
extern _CRTIMP int __cdecl _kbhit(void);
extern _CRTIMP int __cdecl _outp(unsigned short, int);
extern _CRTIMP unsigned short __cdecl _outpw(unsigned short, unsigned short);
extern _CRTIMP unsigned long __cdecl _outpd(unsigned short, unsigned long);
extern _CRTIMP int __cdecl _putch(int);
extern _CRTIMP wint_t __cdecl _putwch(wchar_t);
extern _CRTIMP void __cdecl _textbackground(int);
extern _CRTIMP void __cdecl _textcolor(int);
extern _CRTIMP int __cdecl _ungetch(int);
extern _CRTIMP int __cdecl _wherex(void);
extern _CRTIMP int __cdecl _wherey(void);

/* compatibility names */
#ifdef __POCC__OLDNAMES
extern char * __cdecl cgets(char *);
extern void __cdecl clreol(void);
extern void __cdecl clrscr(void);
extern _CRTCHK(printf,1,2) int __cdecl cprintf(const char * restrict, ...);
extern int __cdecl cputs(const char *);
extern _CRTCHK(scanf,1,2) int __cdecl cscanf(const char * restrict, ...);
extern int __cdecl getch(void);
extern int __cdecl getche(void);
extern void __cdecl gotoxy(int, int);
extern int __cdecl inp(unsigned short);
extern unsigned short __cdecl inpw(unsigned short);
extern int __cdecl kbhit(void);
extern int __cdecl outp(unsigned short, int);
extern unsigned short __cdecl outpw(unsigned short, unsigned short);
extern int __cdecl putch(int);
extern void __cdecl textbackground(int);
extern void __cdecl textcolor(int);
extern int __cdecl ungetch(int);
extern int __cdecl wherex(void);
extern int __cdecl wherey(void);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _CONIO_H */
