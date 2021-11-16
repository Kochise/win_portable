#ifndef _MINMAX_H
#define _MINMAX_H

/* minmax.h - private header for min and max macros */

#if __POCC__ >= 500
#pragma once
#endif

#ifndef max
#define max(a,b)  ((a) > (b) ? (a) : (b))
#endif /* max */

#ifndef min
#define min(a,b)  ((a) < (b) ? (a) : (b))
#endif /* min */

#endif /* _MINMAX_H */
