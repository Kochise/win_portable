#ifndef _DIRENT_H
#define _DIRENT_H

/* dirent.h - private header for directory entries */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <dirent.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#include <sys/types.h>
#include <crtdef.h>

/* type definitions */
typedef struct _dirent_dir _DIR;

struct _dirent {
    _ino_t d_ino;
    unsigned char d_type;  /* non-standard field for dummies */
    char d_name[260];
};

/* d_type */
#define _DT_UNKNOWN  0
#define _DT_REG  1
#define _DT_DIR  2
#define _DT_LNK  3
#define _DT_BLK  4
#define _DT_CHR  5
#define _DT_FIFO  6
#define _DT_SOCK  7

/* declarations */
extern _CRTFRE(1) int  __cdecl _closedir(_DIR *);
extern _CRTUSE _DIR * __cdecl _opendir(const char *);
extern struct _dirent * __cdecl _readdir(_DIR *);
extern void __cdecl _rewinddir(_DIR *);

/* compatibility names */
#ifdef __POCC__OLDNAMES
typedef struct _dirent_dir DIR;

struct dirent {
    ino_t d_ino;
    unsigned char d_type;  /* non-standard field for dummies */
    char d_name[260];
};

/* d_type */
#define DT_UNKNOWN  _DT_UNKNOWN
#define DT_REG  _DT_REG
#define DT_DIR  _DT_DIR
#define DT_LNK  _DT_LNK
#define DT_BLK  _DT_BLK
#define DT_CHR  _DT_CHR
#define DT_FIFO  _DT_FIFO
#define DT_SOCK  _DT_SOCK

extern _CRTFRE(1) int  __cdecl closedir(DIR *);
extern _CRTUSE DIR * __cdecl opendir(const char *);
extern struct dirent * __cdecl readdir(DIR *);
extern void __cdecl rewinddir(DIR *);
#endif /* __POCC__OLDNAMES */

#endif /* !RC_INVOKED */

#endif /* _DIRENT_H */
