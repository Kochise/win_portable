#ifndef _INTTYPES_H
#define _INTTYPES_H

/* inttypes.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <inttypes.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <crtdef.h>
#include <stdint.h>

/* fprintf formats for signed integers */
#define PRId8        "hhd"
#define PRId16       "hd"
#define PRId32       "ld"
#define PRId64       "lld"
#define PRIdLEAST8   "hhd"
#define PRIdLEAST16  "hd"
#define PRIdLEAST32  "ld"
#define PRIdLEAST64  "lld"
#define PRIdFAST8    "ld"
#define PRIdFAST16   "ld"
#define PRIdFAST32   "ld"
#define PRIdFAST64   "lld"
#define PRIdMAX      "lld"
#if __POCC_TARGET__ == 3
#define PRIdPTR      "lld"
#else
#define PRIdPTR      "ld"
#endif /* __POCC_TARGET__ */

#define PRIi8        "hhi"
#define PRIi16       "hi"
#define PRIi32       "li"
#define PRIi64       "lli"
#define PRIiLEAST8   "hhi"
#define PRIiLEAST16  "hi"
#define PRIiLEAST32  "li"
#define PRIiLEAST64  "lli"
#define PRIiFAST8    "li"
#define PRIiFAST16   "li"
#define PRIiFAST32   "li"
#define PRIiFAST64   "lli"
#define PRIiMAX      "lli"
#if __POCC_TARGET__ == 3
#define PRIiPTR      "lli"
#else
#define PRIiPTR      "li"
#endif /* __POCC_TARGET__ */

/* fprintf formats for unsigned integers */
#define PRIo8        "hho"
#define PRIo16       "ho"
#define PRIo32       "lo"
#define PRIo64       "llo"
#define PRIoLEAST8   "hho"
#define PRIoLEAST16  "ho"
#define PRIoLEAST32  "lo"
#define PRIoLEAST64  "llo"
#define PRIoFAST8    "lo"
#define PRIoFAST16   "lo"
#define PRIoFAST32   "lo"
#define PRIoFAST64   "llo"
#define PRIoMAX      "llo"
#if __POCC_TARGET__ == 3
#define PRIoPTR      "llo"
#else
#define PRIoPTR      "lo"
#endif /* __POCC_TARGET__ */

#define PRIu8        "hhu"
#define PRIu16       "hu"
#define PRIu32       "lu"
#define PRIu64       "llu"
#define PRIuLEAST8   "hhu"
#define PRIuLEAST16  "hu"
#define PRIuLEAST32  "lu"
#define PRIuLEAST64  "llu"
#define PRIuFAST8    "lu"
#define PRIuFAST16   "lu"
#define PRIuFAST32   "lu"
#define PRIuFAST64   "llu"
#define PRIuMAX      "llu"
#if __POCC_TARGET__ == 3
#define PRIuPTR      "llu"
#else
#define PRIuPTR      "lu"
#endif /* __POCC_TARGET__ */

#define PRIx8        "hhx"
#define PRIx16       "hx"
#define PRIx32       "lx"
#define PRIx64       "llx"
#define PRIxLEAST8   "hhx"
#define PRIxLEAST16  "hx"
#define PRIxLEAST32  "lx"
#define PRIxLEAST64  "llx"
#define PRIxFAST8    "lx"
#define PRIxFAST16   "lx"
#define PRIxFAST32   "lx"
#define PRIxFAST64   "llx"
#define PRIxMAX      "llx"
#if __POCC_TARGET__ == 3
#define PRIxPTR      "llx"
#else
#define PRIxPTR      "lx"
#endif /* __POCC_TARGET__ */

#define PRIX8        "hhX"
#define PRIX16       "hX"
#define PRIX32       "lX"
#define PRIX64       "llX"
#define PRIXLEAST8   "hhX"
#define PRIXLEAST16  "hX"
#define PRIXLEAST32  "lX"
#define PRIXLEAST64  "llX"
#define PRIXFAST8    "lX"
#define PRIXFAST16   "lX"
#define PRIXFAST32   "lX"
#define PRIXFAST64   "llX"
#define PRIXMAX      "llX"
#if __POCC_TARGET__ == 3
#define PRIXPTR      "llX"
#else
#define PRIXPTR      "lX"
#endif /* __POCC_TARGET__ */

/* fscanf formats for signed integers */
#define SCNd8        "hhd"
#define SCNd16       "hd"
#define SCNd32       "ld"
#define SCNd64       "lld"
#define SCNdLEAST8   "hhd"
#define SCNdLEAST16  "hd"
#define SCNdLEAST32  "ld"
#define SCNdLEAST64  "lld"
#define SCNdFAST8    "ld"
#define SCNdFAST16   "ld"
#define SCNdFAST32   "ld"
#define SCNdFAST64   "lld"
#define SCNdMAX      "lld"
#if __POCC_TARGET__ == 3
#define SCNdPTR      "lld"
#else
#define SCNdPTR      "ld"
#endif /* __POCC_TARGET__ */

#define SCNi8        "hhi"
#define SCNi16       "hi"
#define SCNi32       "li"
#define SCNi64       "lli"
#define SCNiLEAST8   "hhi"
#define SCNiLEAST16  "hi"
#define SCNiLEAST32  "li"
#define SCNiLEAST64  "lli"
#define SCNiFAST8    "li"
#define SCNiFAST16   "li"
#define SCNiFAST32   "li"
#define SCNiFAST64   "lli"
#define SCNiMAX      "lli"
#if __POCC_TARGET__ == 3
#define SCNiPTR      "lli"
#else
#define SCNiPTR      "li"
#endif /* __POCC_TARGET__ */

/* fscanf formats for unsigned integers */
#define SCNo8        "hho"
#define SCNo16       "ho"
#define SCNo32       "lo"
#define SCNo64       "llo"
#define SCNoLEAST8   "hho"
#define SCNoLEAST16  "ho"
#define SCNoLEAST32  "lo"
#define SCNoLEAST64  "llo"
#define SCNoFAST8    "lo"
#define SCNoFAST16   "lo"
#define SCNoFAST32   "lo"
#define SCNoFAST64   "llo"
#define SCNoMAX      "llo"
#if __POCC_TARGET__ == 3
#define SCNoPTR      "llo"
#else
#define SCNoPTR      "lo"
#endif /* __POCC_TARGET__ */

#define SCNu8        "hhu"
#define SCNu16       "hu"
#define SCNu32       "lu"
#define SCNu64       "llu"
#define SCNuLEAST8   "hhu"
#define SCNuLEAST16  "hu"
#define SCNuLEAST32  "lu"
#define SCNuLEAST64  "llu"
#define SCNuFAST8    "lu"
#define SCNuFAST16   "lu"
#define SCNuFAST32   "lu"
#define SCNuFAST64   "llu"
#define SCNuMAX      "llu"
#if __POCC_TARGET__ == 3
#define SCNuPTR      "llu"
#else
#define SCNuPTR      "lu"
#endif /* __POCC_TARGET__ */

#define SCNx8        "hhx"
#define SCNx16       "hx"
#define SCNx32       "lx"
#define SCNx64       "llx"
#define SCNxLEAST8   "hhx"
#define SCNxLEAST16  "hx"
#define SCNxLEAST32  "lx"
#define SCNxLEAST64  "llx"
#define SCNxFAST8    "lx"
#define SCNxFAST16   "lx"
#define SCNxFAST32   "lx"
#define SCNxFAST64   "llx"
#define SCNxMAX      "llx"
#if __POCC_TARGET__ == 3
#define SCNxPTR      "llx"
#else
#define SCNxPTR      "lx"
#endif /* __POCC_TARGET__ */

typedef struct {
    intmax_t quot;
    intmax_t rem;
} imaxdiv_t;

/* conversion functions for greatest-width integer types */
extern _CRTIMP intmax_t __cdecl imaxabs(intmax_t);
extern _CRTIMP imaxdiv_t __cdecl imaxdiv(intmax_t, intmax_t);
extern _CRTIMP intmax_t __cdecl strtoimax(const char * restrict, char ** restrict, int);
extern _CRTIMP uintmax_t __cdecl strtoumax(const char * restrict, char ** restrict, int);
extern _CRTIMP intmax_t __cdecl wcstoimax(const __WCHAR_TYPE__ * restrict, __WCHAR_TYPE__ ** restrict, int);
extern _CRTIMP uintmax_t __cdecl wcstoumax(const __WCHAR_TYPE__ * restrict, __WCHAR_TYPE__ ** restrict, int);

#endif /* !RC_INVOKED */

#endif /* _INTTYPES_H */
