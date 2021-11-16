#ifndef _OMP_H
#define _OMP_H

/* omp.h - OpenMP 3.1 header */

#if __POCC__ >= 500
#pragma once
#endif

#include <crtdef.h>

/* type definitions */
typedef void *omp_lock_t;
typedef void *omp_nest_lock_t;

/* schedule kinds (3.0) */
typedef enum omp_sched_t {
    omp_sched_static = 1,
    omp_sched_dynamic = 2,
    omp_sched_guided = 3,
    omp_sched_auto = 4
} omp_sched_t;

/* execution environment functions */
extern _CRTIMP void __cdecl omp_set_num_threads(int);
extern _CRTIMP int __cdecl omp_get_num_threads(void);
extern _CRTIMP int __cdecl omp_get_max_threads(void);
extern _CRTIMP int __cdecl omp_get_thread_num(void);
extern _CRTIMP int __cdecl omp_get_num_procs(void);
extern _CRTIMP int __cdecl omp_in_parallel(void);
extern _CRTIMP void __cdecl omp_set_dynamic(int);
extern _CRTIMP int __cdecl omp_get_dynamic(void);
extern _CRTIMP void __cdecl omp_set_nested(int);
extern _CRTIMP int __cdecl omp_get_nested(void);
extern _CRTIMP void __cdecl omp_set_schedule(omp_sched_t, int);  /* 3.0 */
extern _CRTIMP void __cdecl omp_get_schedule(omp_sched_t *, int *);  /* 3.0 */
extern _CRTIMP int __cdecl omp_get_thread_limit(void);  /* 3.0 */
extern _CRTIMP void __cdecl omp_set_max_active_levels(int);  /* 3.0 */
extern _CRTIMP int __cdecl omp_get_max_active_levels(void);  /* 3.0 */
extern _CRTIMP int __cdecl omp_get_level(void);  /* 3.0 */
extern _CRTIMP int __cdecl omp_get_ancestor_thread_num(int);  /* 3.0 */
extern _CRTIMP int __cdecl omp_get_team_size(int);  /* 3.0 */
extern _CRTIMP int __cdecl omp_get_active_level(void);  /* 3.0 */
extern _CRTIMP int __cdecl omp_in_final(void);  /* 3.1 */

/* simple lock functions */
extern _CRTIMP void __cdecl omp_init_lock(omp_lock_t *);
extern _CRTIMP _CRTFRE(1) void __cdecl omp_destroy_lock(omp_lock_t *);
extern _CRTIMP void __cdecl omp_set_lock(omp_lock_t *);
extern _CRTIMP void __cdecl omp_unset_lock(omp_lock_t *);
extern _CRTIMP int __cdecl omp_test_lock(omp_lock_t *);

/* nestable lock functions */
extern _CRTIMP void __cdecl omp_init_nest_lock(omp_nest_lock_t *);
extern _CRTIMP _CRTFRE(1) void __cdecl omp_destroy_nest_lock(omp_nest_lock_t *);
extern _CRTIMP void __cdecl omp_set_nest_lock(omp_nest_lock_t *);
extern _CRTIMP void __cdecl omp_unset_nest_lock(omp_nest_lock_t *);
extern _CRTIMP int __cdecl omp_test_nest_lock(omp_nest_lock_t *);

/* timing functions */
extern _CRTIMP double __cdecl omp_get_wtime(void);
extern _CRTIMP double __cdecl omp_get_wtick(void);

/* internal */
#if defined(_OPENMP) || defined(__CRTBUILD__)
extern void __cdecl __pomp_barrier(void);
extern void __cdecl __pomp_flush(void);
extern void __cdecl __pomp_taskwait(void);  /* 3.0 */
extern void __cdecl __pomp_taskyield(void);  /* 3.1 */
#endif /* defined(_OPENMP) */

#endif /* _OMP_H */
