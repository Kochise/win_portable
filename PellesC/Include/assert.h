/* assert.h - standard header */

#undef assert

#ifdef NDEBUG
#define assert(exp)  ((void)0)
#else /* !NDEBUG */
#if __POCC__ < 1100
#error <assert.h> need POCC version 11.0 or higher
#endif /* __POCC__ < 1100 */
#define assert(exp)  __assert(exp, #exp)
#endif /* !NDEBUG */

#if __POCC_STDC_VERSION__ >= 201112L
#define static_assert  _Static_assert
#endif /* __POCC_STDC_VERSION__ >= 201101L */
