#ifndef _STDATOMIC_H
#define _STDATOMIC_H

/* stdatomic.h - standard header */

#ifndef RC_INVOKED

#if __POCC__ < 900
#error <stdatomic.h> need POCC version 9.0 or higher
#endif /* __POCC__ < 900 */

#pragma once

#if __POCC_STDC_VERSION__ < 201112L

#error <stdatomic.h> is not supported in C99 mode

#else /* __POCC_STDC_VERSION__ >= 201112L */

#include <crtdef.h>

/* type definitions */
#ifndef _CHAR16_T_DEFINED
#define _CHAR16_T_DEFINED
typedef unsigned short char16_t;
#endif /* _CHAR16_T_DEFINED */

#ifndef _CHAR32_T_DEFINED
#define _CHAR32_T_DEFINED
typedef unsigned int char32_t;
#endif /* _CHAR32_T_DEFINED */

#ifndef _WCHAR_T_DEFINED
#define _WCHAR_T_DEFINED
typedef unsigned short wchar_t;
#endif /* _WCHAR_T_DEFINED */

typedef _Atomic struct atomic_flag { _Bool __f__; } atomic_flag;

typedef _Atomic _Bool atomic_bool;
typedef _Atomic char atomic_char;
typedef _Atomic signed char atomic_schar;
typedef _Atomic unsigned char atomic_uchar;
typedef _Atomic short atomic_short;
typedef _Atomic unsigned short atomic_ushort;
typedef _Atomic int atomic_int;
typedef _Atomic unsigned int atomic_uint;
typedef _Atomic long atomic_long;
typedef _Atomic unsigned long atomic_ulong;
typedef _Atomic long long atomic_llong;
typedef _Atomic unsigned long long atomic_ullong;
typedef _Atomic char16_t atomic_char16_t;
typedef _Atomic char32_t atomic_char32_t;
typedef _Atomic wchar_t atomic_wchar_t;
typedef _Atomic signed char atomic_int_least8_t;
typedef _Atomic unsigned char atomic_uint_least8_t;
typedef _Atomic signed short atomic_int_least16_t;
typedef _Atomic unsigned short atomic_uint_least16_t;
typedef _Atomic signed int atomic_int_least32_t;
typedef _Atomic unsigned int atomic_uint_least32_t;
typedef _Atomic signed long long atomic_int_least64_t;
typedef _Atomic unsigned long long atomic_uint_least64_t;
typedef _Atomic signed char atomic_int_fast8_t;
typedef _Atomic unsigned char atomic_uint_fast8_t;
typedef _Atomic signed int atomic_int_fast16_t;
typedef _Atomic unsigned int atomic_uint_fast16_t;
typedef _Atomic signed int atomic_int_fast32_t;
typedef _Atomic unsigned int atomic_uint_fast32_t;
typedef _Atomic signed long long atomic_int_fast64_t;
typedef _Atomic unsigned long long atomic_uint_fast64_t;
typedef _Atomic __INTPTR_TYPE__ atomic_intptr_t;
typedef _Atomic __UINTPTR_TYPE__ atomic_uintptr_t;
typedef _Atomic __SIZE_TYPE__ atomic_size_t;
typedef _Atomic __PTRDIFF_TYPE__ atomic_ptrdiff_t;
typedef _Atomic signed long long atomic_intmax_t;
typedef _Atomic unsigned long long atomic_uintmax_t;

typedef enum memory_order {
    memory_order_relaxed = 0,
    memory_order_consume = 1,
    memory_order_acquire = 2,
    memory_order_release = 3,
    memory_order_acq_rel = 4,
    memory_order_seq_cst = 5,
} memory_order;

#define ATOMIC_FLAG_INIT  {0}
#define ATOMIC_VAR_INIT(X)  {X}

#if __POCC_STDC_VERSION__ >= 201710L
#pragma deprecated(ATOMIC_VAR_INIT)  /* C17: "The macro ATOMIC_VAR_INIT is an obsolescent feature" */
#endif

/* macros */

/* a value of 0 indicates that the type is never lock-free;
 * a value of 1 indicates that the type is sometimes lock-free;
 * a value of 2 indicates that the type is always lock-free
 */
#define ATOMIC_BOOL_LOCK_FREE      __POCC_ATOMIC_BOOL_LOCK_FREE__
#define ATOMIC_CHAR_LOCK_FREE      __POCC_ATOMIC_CHAR_LOCK_FREE__
#define ATOMIC_CHAR16_T_LOCK_FREE  __POCC_ATOMIC_CHAR16_LOCK_FREE__
#define ATOMIC_CHAR32_T_LOCK_FREE  __POCC_ATOMIC_CHAR32_LOCK_FREE__
#define ATOMIC_WCHAR_T_LOCK_FREE   __POCC_ATOMIC_WCHAR_LOCK_FREE__
#define ATOMIC_SHORT_LOCK_FREE     __POCC_ATOMIC_SHORT_LOCK_FREE__
#define ATOMIC_INT_LOCK_FREE       __POCC_ATOMIC_INT_LOCK_FREE__
#define ATOMIC_LONG_LOCK_FREE      __POCC_ATOMIC_LONG_LOCK_FREE__
#define ATOMIC_LLONG_LOCK_FREE     __POCC_ATOMIC_LLONG_LOCK_FREE__
#define ATOMIC_POINTER_LOCK_FREE   __POCC_ATOMIC_POINTER_LOCK_FREE__

/* fence functions */
extern _CRTIMP void __cdecl atomic_thread_fence(memory_order);
extern _CRTIMP void __cdecl atomic_signal_fence(memory_order);

/* atomic_flag functions */
extern _CRTIMP _Bool __cdecl atomic_flag_test_and_set(volatile atomic_flag *);
extern _CRTIMP _Bool __cdecl atomic_flag_test_and_set_explicit(volatile atomic_flag *, memory_order);
extern _CRTIMP void __cdecl atomic_flag_clear(volatile atomic_flag *);
extern _CRTIMP void __cdecl atomic_flag_clear_explicit(volatile atomic_flag *, memory_order);

/* kill_dependency macro */
#define kill_dependency(X)  (X)  /*TODO*/

/*
 * atomic_init generic function
 */
#define atomic_init(A,C)  do { *(A) = (C); } while(0)

/*
 * atomic_load generic functions
 */
#define atomic_load(A)  __atomic_load_explicit(A, memory_order_seq_cst)
#define atomic_load_explicit(A,M)  __atomic_load_explicit(A, M)

/*
 * atomic_store generic functions
 */
#define atomic_store(A,C)  __atomic_store_explicit(A, C, memory_order_seq_cst)
#define atomic_store_explicit(A,C,M)  __atomic_store_explicit(A, C, M)

/*
 * atomic_is_lock_free generic function
 */
#define atomic_is_lock_free(A)  __atomic_is_lock_free(A)

/*
 * atomic_exchange generic functions
 */
#define atomic_exchange(A,C)  __atomic_exchange_explicit(A, C, memory_order_seq_cst)
#define atomic_exchange_explicit(A,C,M)  __atomic_exchange_explicit(A, C, M)

/*
 * atomic_compare_exchange generic functions
 */
#define atomic_compare_exchange_strong(A,C1,C2)  __atomic_compare_exchange_strong_explicit(A, C1, C2, memory_order_seq_cst, memory_order_seq_cst)
#define atomic_compare_exchange_strong_explicit(A,C1,C2,M1,M2)  __atomic_compare_exchange_strong_explicit(A, C1, C2, M1, M2)

#define atomic_compare_exchange_weak(A,C1,C2)  __atomic_compare_exchange_weak_explicit(A, C1, C2, memory_order_seq_cst, memory_order_seq_cst)
#define atomic_compare_exchange_weak_explicit(A,C1,C2,M1,M2)  __atomic_compare_exchange_weak_explicit(A, C1, C2, M1, M2)

/*
 * atomic_fetch and modify generic functions
 */
#define atomic_fetch_add(A,C)  __atomic_fetch_add_explicit(A, C, memory_order_seq_cst)
#define atomic_fetch_sub(A,C)  __atomic_fetch_sub_explicit(A, C, memory_order_seq_cst)
#define atomic_fetch_or(A,C)   __atomic_fetch_or_explicit(A, C, memory_order_seq_cst)
#define atomic_fetch_xor(A,C)  __atomic_fetch_xor_explicit(A, C, memory_order_seq_cst)
#define atomic_fetch_and(A,C)  __atomic_fetch_and_explicit(A, C, memory_order_seq_cst)

#define atomic_fetch_add_explicit(A,C,M)  __atomic_fetch_add_explicit(A, C, M)
#define atomic_fetch_sub_explicit(A,C,M)  __atomic_fetch_sub_explicit(A, C, M)
#define atomic_fetch_or_explicit(A,C,M)   __atomic_fetch_or_explicit(A, C, M)
#define atomic_fetch_xor_explicit(A,C,M)  __atomic_fetch_xor_explicit(A, C, M)
#define atomic_fetch_and_explicit(A,C,M)  __atomic_fetch_and_explicit(A, C, M)

#endif /* __POCC_STDC_VERSION__ >= 201112L */

#endif /* !RC_INVOKED */

#endif /* _STDATOMIC_H */
