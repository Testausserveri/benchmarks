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

- [Java JDK](https://adoptopenjdk.net/)
- [Rust/Cargo](https://www.rust-lang.org/tools/install)
- [Go](https://golang.org/doc/install)
- [PyPy](https://www.pypy.org/download.html)
- [LuaJIT](https://luajit.org/download.html)
- GCC ([MinGW](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/installer/mingw-w64-install.exe/download) on Windows\*)
- [Node.js](https://nodejs.org/en/download/)
- [.NET 5.0 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)

Each program needs to be added to PATH if the associated installer or package doesn't do so automatically.

\*You should select x86_64 architecture, POSIX threads, and SEH exceptions for your MinGW installation.

## Running

Simply run the `bench` script (`bench.bat` on Windows) and wait for all the results. You may notice some new files as languages like C, C++, C#, Java, and Rust need to be compiled and leave build artefacts. If there is an error, ensure that the program that errored is installed and on the PATH environment variable. If it is and it keeps erroring or crashing, then open an issue.

## Results

Benchmark results of GitHub actions runner.

<!-- RESULTS -->
