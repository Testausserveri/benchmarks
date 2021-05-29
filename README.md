# Benchmarks

The goal of each language is to execute the pseudo code of

```
answer = 0
for (a = 1; a <= 65535; a++) {
   for (b = 1; b <= 65535; b++) {
     if (a % b == 0) answer++
   }
}
```

and return the answer and time in seconds it took to calculate.

## Dependencies

- Java JDK
- Rust/
- Go
- PyPy
- LuaJIT
- GCC
- Node.JS

## Building

### Java

`javac perf.class`

### C

`gcc perf.c -O3 -o perfc`

### CPP

`g++ perf.cpp -O3 -o perfcpp`

### Rust

`cd perfrustsrc`
`cargo build --release`
`cp target/release/perfrust ../`

## Results

You can insert your results here.
