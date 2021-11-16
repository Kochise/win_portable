#ifndef _STDNORETURN_H
#define _STDNORETURN_H

/* stdnoreturn.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ >= 500
#pragma once
#endif

#if __POCC_STDC_VERSION__ < 201112L

#error <stdnoreturn.h> is not supported in C99 mode

#else /* __POCC_STDC_VERSION__ >= 201112L */

/* macros */
#define noreturn  _Noreturn

#endif /* __POCC_STDC_VERSION__ >= 201112L */

#endif /* !RC_INVOKED */

#endif /* _STDNORETURN_H */
