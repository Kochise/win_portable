#ifndef _TCHAR_H
#define _TCHAR_H

/* tchar.h - private header for generic text functions */

#if __POCC__ >= 500
#pragma once
#endif

#define _T(x)  __T(x)
#define _TEXT(x)  __T(x)

#ifdef _UNICODE

/* Map generic names to Unicode functions */

#include <wchar.h>

#define _TEOF  WEOF
#define __T(x)  L##x

typedef wchar_t _TCHAR;
typedef wint_t _TINT;

#define _tfinddata_t  _wfinddata_t  /* 05-07-18 */
#define _tfinddata64_t  _wfinddata64_t  /* 06-03-02 */

/* entry points */
#define _tmain  wmain
#define _tWinMain  wWinMain
#define __targv  __wargv

/* formatted input/output */
#define _ftprintf  fwprintf
#define _ftscanf  fwscanf
#define _stprintf  swprintf
#define _sntprintf  swprintf  /* 04-10-12 */
#define _stscanf  swscanf
#define _vftprintf  vfwprintf
#define _vftscanf  vfwscanf
#define _vstprintf  _vsnwprintf  /* 04-10-12: vswprintf -> _vsnwprintf */
#define _vsntprintf _vsnwprintf  /* 04-10-12 */
#define _vstscanf  vswscanf
#define _vtprintf  vwprintf
#define _vtscanf  vwscanf
#define _tprintf  wprintf
#define _tscanf  wscanf

/* input/output */
#define _fgettc  fgetwc
#define _fgetts  fgetws
#define _fputtc  fputwc
#define _fputts  fputws
#define _gettc  getwc
#define _gettchar  getwchar
#define _puttc  putwc
#define _puttchar  putwchar
#define _ungettc  ungetwc

/* string handling */
#define _tcscpy  wcscpy
#define _tcsncpy  wcsncpy
#define _tcscat  wcscat
#define _tcsncat  wcsncat
#define _tcscmp  wcscmp
#define _tcsncmp  wcsncmp
#define _tcsicmp  _wcsicmp
#define _tcsnicmp  _wcsnicmp
#define _tcscoll  wcscoll
#define _tcsxfrm  wcsxfrm
#define _tcschr  wcschr
#define _tcsichr  _wcsichr  /* 05-09-08 */
#define _tcscspn  wcscspn
#define _tcslen  wcslen
#define _tcspbrk  wcspbrk
#define _tcsrchr  wcsrchr
#define _tcsrichr  _wcsrichr  /* 05-09-08 */
#define _tcsspn  wcsspn
#define _tcsstr  wcsstr
#define _tcsistr  _wcsistr  /* 05-09-08 */
#define _tcstok  _wcstok_ms  /* 05-07-18 */
#define _tcsdup  _wcsdup
#define _tcslwr  _wcslwr
#define _tcsupr  _wcsupr
#define _tcsset  _wcsset  /* 19-03-20 */
#define _tcsnset  _wcsnset
#define _tcsrev  _wcsrev
#define _tmemchr  wmemchr
#define _tmemichr  _wmemichr  /* 05-09-08 */
#define _tmemcmp  wmemcmp
#define _tmemicmp  _wmemicmp  /* 05-09-08 */
#define _tmemcpy  wmemcpy
#define _tmemmove  wmemmove
#define _tmemset  wmemset

/* character classification */
#define _istalnum  iswalnum
#define _istalpha  iswalpha
#define _istcntrl  iswcntrl
#define _istdigit  iswdigit
#define _istgraph  iswgraph
#define _istlower  iswlower
#define _istprint  iswprint
#define _istpunct  iswpunct
#define _istspace  iswspace
#define _istblank  iswblank
#define _istupper  iswupper
#define _istxdigit  iswxdigit
#define _istascii  _iswascii
#define _totlower  towlower
#define _totupper  towupper

/* number conversion */
#define _itot  _itow  /* 05-07-18 */
#define _ltot  _ltow  /* 05-07-18 */
#define _ultot  _ultow  /* 05-07-18 */
#define _ttoi  _wtoi  /* 05-07-18 */
#define _ttol  _wtol  /* 05-07-18 */
#define _ttoll  _wtoll  /* 05-07-18 */
#define _tcstod  wcstod
#define _tcstof  wcstof
#define _tcstold  wcstold
#define _tcstol  wcstol
#define _tcstoll  wcstoll
#define _tcstoul  wcstoul
#define _tcstoull  wcstoull
#define _tcstoimax  wcstoimax
#define _tcstoumax  wcstoumax

/* time and date */
#define _tcsftime  wcsftime
/* #define _tstrdate  _wcsdate */
/* #define _tstrtime  _wcstime */
#define _tutime  _wutime  /* 05-07-18 */

/* process control */
#define _texecl  _wexecl  /* 05-07-18 */
#define _texecle  _wexecle  /* 05-07-18 */
#define _texeclp  _wexeclp  /* 05-07-18 */
#define _texeclpe  _wexeclpe  /* 05-07-18 */
#define _texecv  _wexecv  /* 05-07-18 */
#define _texecve  _wexecve  /* 05-07-18 */
#define _texecvp  _wexecvp  /* 05-07-18 */
#define _texecvpe  _wexecvpe  /* 05-07-18 */
#define _tspawnl  _wspawnl  /* 05-07-18 */
#define _tspawnle  _wspawnle  /* 05-07-18 */
#define _tspawnlp  _wspawnlp  /* 05-07-18 */
#define _tspawnlpe  _wspawnlpe  /* 05-07-18 */
#define _tspawnv  _wspawnv  /* 05-07-18 */
#define _tspawnve  _wspawnve  /* 05-07-18 */
#define _tspawnvp  _wspawnvp  /* 05-07-18 */
#define _tspawnvpe  _wspawnvpe  /* 05-07-18 */
#define _tsystem  _wsystem  /* 05-07-18 */

/* directory handling */
#define _tchdir  _wchdir  /* 05-07-18 */
#define _tgetcwd  _wgetcwd  /* 05-07-18 */
#define _tmkdir  _wmkdir  /* 05-07-18 */
#define _trmdir  _wrmdir  /* 05-07-18 */

/* environment and path */
#define _tfullpath  _wfullpath  /* 05-07-18 */
#define _tgetenv  _wgetenv  /* 05-07-18 */
#define _tmakepath  _wmakepath  /* 05-07-18 */
#define _tputenv  _wputenv  /* 05-07-18 */
#define _tsearchenv  _wsearchenv  /* 05-07-18 */
#define _tsplitpath  _wsplitpath  /* 05-07-18 */

/* file operations */
#define _tremove  _wremove  /* 05-07-18 */
#define _trename  _wrename  /* 05-07-18 */
#define _ttmpnam  _wtmpnam  /* 05-07-18 */

/* file access */
#define _tfdopen  _wfdopen  /* 05-07-18 */
#define _tfopen  _wfopen  /* 05-07-18 */
#define _tfreopen  _wfreopen  /* 05-07-18 */

/* low-level I/O */
#define _taccess  _waccess  /* 05-07-18 */
#define _tchmod  _wchmod  /* 05-07-18 */
#define _tcreat  _wcreat  /* 05-07-18 */
#define _tfindfirst  _wfindfirst  /* 05-07-18 */
#define _tfindfirst64  _wfindfirst64  /* 06-03-02 */
#define _tfindnext  _wfindnext  /* 05-07-18 */
#define _tfindnext64  _wfindnext64  /* 06-03-02 */
#define _topen  _wopen  /* 05-07-18 */
#define _tsopen  _wsopen  /* 05-07-18 */
#define _tunlink  _wunlink  /* 05-07-18 */

/* misc */
#define _tstat  _wstat  /* 05-07-18 */
#define _tcserror  _wcserror  /* 05-07-18 */
#define _tperror  _wperror  /* 05-07-18 */

#else  /* _UNICODE */

/* Map generic names to string functions */

#include <string.h>

#define _TEOF  EOF
#define __T(x)  x

typedef char _TCHAR;
typedef int _TINT;

#define _tfinddata_t  _finddata_t  /* 05-07-18 */
#define _tfinddata64_t  _finddata64_t  /* 06-03-02 */

/* entry points */
#define _tmain  main
#define _tWinMain  WinMain
#define __targv  __argv

/* formatted input/output */
#define _ftprintf  fprintf
#define _ftscanf  fscanf
#define _stprintf  snprintf  /* 03-07-27: sprintf -> snprintf */
#define _sntprintf  snprintf  /* 04-10-12 */
#define _stscanf  sscanf
#define _vftprintf  vfprintf
#define _vftscanf  vfscanf
#define _vstprintf  vsnprintf  /* 04-10-12: vsprintf -> vsnprintf */
#define _vsntprintf _vsnprintf  /* 04-10-12 */
#define _vstscanf  vsscanf
#define _vtprintf  vprintf
#define _vtscanf  vscanf
#define _tprintf  printf
#define _tscanf  scanf

/* input/output */
#define _fgettc  fgetc
#define _fgetts  fgets
#define _fputtc  fputc
#define _fputts  fputs
#define _gettc  getc
#define _gettchar  getchar
#define _puttc  putc
#define _puttchar  putchar
#define _ungettc  ungetc

/* string handling */
#define _tcscpy  strcpy
#define _tcsncpy  strncpy
#define _tcscat  strcat
#define _tcsncat  strncat
#define _tcscmp  strcmp
#define _tcsncmp  strncmp
#define _tcsicmp  _stricmp
#define _tcsnicmp  _strnicmp
#define _tcscoll  strcoll
#define _tcsxfrm  strxfrm
#define _tcschr  strchr
#define _tcsichr  _strichr  /* 05-09-08 */
#define _tcscspn  strcspn
#define _tcslen  strlen
#define _tcspbrk  strpbrk
#define _tcsrchr  strrchr
#define _tcsrichr  _strrichr  /* 05-09-08 */
#define _tcsspn  strspn
#define _tcsstr  strstr
#define _tcsistr  _stristr  /* 05-09-08 */
#define _tcstok  strtok
#define _tcsdup  _strdup
#define _tcslwr  _strlwr
#define _tcsupr  _strupr
#define _tcsset  _strset  /* 19-03-20 */
#define _tcsnset  _strnset
#define _tcsrev  _strrev
#define _tmemchr  memchr
#define _tmemichr  _memichr  /* 05-09-08 */
#define _tmemcmp  memcmp
#define _tmemicmp  _memicmp  /* 05-09-08 */
#define _tmemcpy  memcpy
#define _tmemmove  memmove
#define _tmemset  memset

/* character classification */
#define _istalnum  isalnum
#define _istalpha  isalpha
#define _istcntrl  iscntrl
#define _istdigit  isdigit
#define _istgraph  isgraph
#define _istlower  islower
#define _istprint  isprint
#define _istpunct  ispunct
#define _istspace  isspace
#define _istblank  isblank
#define _istupper  isupper
#define _istxdigit  isxdigit
#define _istascii  _isascii
#define _totlower  tolower
#define _totupper  toupper

/* number conversion */
#define _itot  _itoa  /* 05-07-18 */
#define _ltot  _ltoa  /* 05-07-18 */
#define _ultot  _ultoa  /* 05-07-18 */
#define _ttoi  atoi  /* 05-07-18 */
#define _ttol  atol  /* 05-07-18 */
#define _ttoll  atoll  /* 05-07-18 */
#define _tcstod  strtod
#define _tcstof  strtof
#define _tcstold  strtold
#define _tcstol  strtol
#define _tcstoll  strtoll
#define _tcstoul  strtoul
#define _tcstoull  strtoull
#define _tcstoimax  strtoimax
#define _tcstoumax  strtoumax

/* time and date */
#define _tcsftime  strftime
/* #define _tstrdate  _strdate */
/* #define _tstrtime  _strtime */
#define _tutime  _utime  /* 05-07-18 */

/* process control */
#define _texecl  _execl  /* 05-07-18 */
#define _texecle  _execle  /* 05-07-18 */
#define _texeclp  _execlp  /* 05-07-18 */
#define _texeclpe  _execlpe  /* 05-07-18 */
#define _texecv  _execv  /* 05-07-18 */
#define _texecve  _execve  /* 05-07-18 */
#define _texecvp  _execvp  /* 05-07-18 */
#define _texecvpe  _execvpe  /* 05-07-18 */
#define _tspawnl  _spawnl  /* 05-07-18 */
#define _tspawnle  _spawnle  /* 05-07-18 */
#define _tspawnlp  _spawnlp  /* 05-07-18 */
#define _tspawnlpe  _spawnlpe  /* 05-07-18 */
#define _tspawnv  _spawnv  /* 05-07-18 */
#define _tspawnve  _spawnve  /* 05-07-18 */
#define _tspawnvp  _spawnvp  /* 05-07-18 */
#define _tspawnvpe  _spawnvpe  /* 05-07-18 */
#define _tsystem  system  /* 05-07-18 */

/* directory handling */
#define _tchdir  _chdir  /* 05-07-18 */
#define _tgetcwd  _getcwd  /* 05-07-18 */
#define _tmkdir  _mkdir  /* 05-07-18 */
#define _trmdir  _rmdir  /* 05-07-18 */

/* environment and path */
#define _tfullpath  _fullpath  /* 05-07-18 */
#define _tgetenv  getenv  /* 05-07-18 */
#define _tmakepath  _makepath  /* 05-07-18 */
#define _tputenv  _putenv  /* 05-07-18 */
#define _tsearchenv  _searchenv  /* 05-07-18 */
#define _tsplitpath  _splitpath  /* 05-07-18 */

/* file operations */
#define _tremove  remove  /* 05-07-18 */
#define _trename  rename  /* 05-07-18 */
#define _ttmpnam  tmpnam  /* 05-07-18 */

/* file access */
#define _tfdopen  _fdopen  /* 05-07-18 */
#define _tfopen  fopen  /* 05-07-18 */
#define _tfreopen  reopen  /* 05-07-18 */

/* low-level I/O */
#define _taccess  _access  /* 05-07-18 */
#define _tchmod  _chmod  /* 05-07-18 */
#define _tcreat  _creat  /* 05-07-18 */
#define _tfindfirst  _findfirst  /* 05-07-18 */
#define _tfindfirst64  _findfirst64  /* 06-03-02 */
#define _tfindnext  _findnext  /* 05-07-18 */
#define _tfindnext64  _findnext64  /* 06-03-02 */
#define _topen  _open  /* 05-07-18 */
#define _tsopen  _sopen  /* 05-07-18 */
#define _tunlink  _unlink  /* 05-07-18 */

/* misc */
#define _tstat  _stat  /* 05-07-18 */
#define _tcserror  strerror  /* 05-07-18 */
#define _tperror  perror  /* 05-07-18 */

#endif  /* _UNICODE */


/* bounds-checking interfaces (TR24731-1, C11 annex K) */
#if __STDC_WANT_LIB_EXT1__

#ifdef _UNICODE

/* formatted input/output */
#define _ftprintf_s  fwprintf_s
#define _ftscanf_s  fwscanf_s
#define _stprintf_s  swprintf_s
#define _stscanf_s  swscanf_s
#define _vftprintf_s  vfwprintf_s
#define _vftscanf_s  vfwscanf_s
#define _vstscanf_s  vswscanf_s
#define _vtprintf_s  vwprintf_s
#define _vtscanf_s  vwscanf_s
#define _tprintf_s  wprintf_s
#define _tscanf_s  wscanf_s

/* string handling */
#define _tcscpy_s  wcscpy_s
#define _tcsncpy_s  wcsncpy_s
#define _tcscat_s  wcscat_s
#define _tcsncat_s  wcsncat_s
#define _tcsnlen_s  wcsnlen_s
#define _tcstok_s  wcstok_s
#define _tmemcpy_s  wmemcpy_s
#define _tmemmove_s  wmemmove_s

#else  /* _UNICODE */

/* formatted input/output */
#define _ftprintf_s  fprintf_s
#define _ftscanf_s  fscanf_s
#define _stprintf_s  sprintf_s
#define _stscanf_s  sscanf_s
#define _vftprintf_s  vfprintf_s
#define _vftscanf_s  vfscanf_s
#define _vstscanf_s  vsscanf_s
#define _vtprintf_s  vprintf_s
#define _vtscanf_s  vscanf_s
#define _tprintf_s  printf_s
#define _tscanf_s  scanf_s

/* string handling */
#define _tcscpy_s  strcpy_s
#define _tcsncpy_s  strncpy_s
#define _tcscat_s  strcat_s
#define _tcsncat_s  strncat_s
#define _tcsnlen_s  strnlen_s
#define _tcstok_s  strtok_s
#define _tmemcpy_s  memcpy_s
#define _tmemmove_s  memmove_s

#endif  /* _UNICODE */

#endif /* __STDC_WANT_LIB_EXT1__ */

#endif  /* _TCHAR_H */
