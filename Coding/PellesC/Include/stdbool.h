#ifndef _STDBOOL_H
#define _STDBOOL_H

/* stdbool.h - standard header */

#if __POCC__ >= 500
#pragma once
#endif

/* macros */
#if __POCC_STDC_VERSION__ > 201710L
#define false  ((_Bool)+0u)
#define true   ((_Bool)+1u)
#else /* __POCC_STDC_VERSION__ <= 201710L */
#define false  0
#define true  1
#endif /* __POCC_STDC_VERSION__ <= 201710L */
#define bool  _Bool
#define __bool_true_false_are_defined  1

#endif /* _STDBOOL_H */
