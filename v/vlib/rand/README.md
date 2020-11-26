# Quickstart

The V `rand` module provides two main ways in which users can generate pseudorandom numbers:

1. Through top-level functions in the `rand` module.
   - `import rand` - Import the `rand` module.
   - `rand.seed(seed_data)` to seed (optional).
   - Use `rand.int()`, `rand.u32n(max)`, etc.
2. Through a generator of choice. The PRNGs are included in their respective submodules.
   - `import rand.pcg32` - Import the module of the PRNG required.
   - `mut rng := pcg32.PCG32RNG{}` - Initialize the struct. Note that the **`mut`** is important.
   - `rng.seed(seed_data)` - optionally seed it with an array of `u32` values.
   - Use `rng.int()`, `rng.u32n(max)`, etc.

# General Background

A PRNG is a Pseudo Random Number Generator. Computers cannot generate truly random numbers without an external source of noise or entropy. We can use algorithms to generate sequences of seemingly random numbers, but their outputs will always be deterministic. This is often useful for simulations that need the same starting seed.

If you need truly random numbers that are going to be used for cryptography, use the `crypto.rand` module.

# Guaranteed functions

The following 21 functions are guaranteed to be supported by `rand` as well as the individual PRNGs.

- `seed(seed_data)` where `seed_data` is an array of `u32` values. Different generators require different number of bits as the initial seed. The smallest is 32-bits, required by `sys.SysRNG`. Most others require 64-bits or 2 `u32` values.
- `u32()`, `u64()`, `int()`, `i64()`, `f32()`, `f64()`
- `u32n(max)`, `u64n(max)`, `intn(max)`, `i64n(max)`, `f32n(max)`, `f64n(max)`
- `u32_in_range(min, max)`, `u64_in_range(min, max)`, `int_in_range(min, max)`, `i64_in_range(min, max)`, `f32_in_range(min, max)`, `f64_in_range(min, max)`
- `int31()`, `int63()`

# Utility Functions

All the generators are time-seeded. The helper functions publicly available in `rand.util` module are:

1. `time_seed_array()` - returns a `[]u32` that can be directly plugged into the `seed()` functions.
2. `time_seed_32()` and `time_seed_64()` - 32-bit and 64-bit values respectively that are generated from the current time.

# Caveats

Note that the `sys.SysRNG` struct (in the C backend) uses `C.srand()` which sets the seed globally. Consequently, all instances of the RNG will be affected. This problem does not arise for the other RNGs. A workaround (if you _must_ use the libc RNG) is to:

1. Seed the first instance.
2. Generate all values required.
3. Seed the second instance.
4. Generate all values required.
5. And so on...
