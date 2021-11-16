#ifndef _STDALIGN_H
#define _STDALIGN_H

/* stdalign.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ >= 500
#pragma once
#endif

#if __POCC_STDC_VERSION__ < 201112L

#error <stdalign.h> is not supported in C99 mode

#else /* __POCC_STDC_VERSION__ >= 201112L */

/* macros */
#define alignas  _Alignas
#define alignof  _Alignof
#define __alignas_is_defined  1
#define __alignof_is_defined  1

#endif /* __POCC_STDC_VERSION__ >= 201112L */

#endif /* !RC_INVOKED */

#endif /* _STDALIGN_H */
