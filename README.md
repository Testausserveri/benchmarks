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

## Results

Benchmark results of GitHub actions runner.

<!-- RESULTS START -->
<img src="https://quickchart.io/chart?backgroundColor=white&c=%7B%22type%22%3A%22bar%22%2C%22data%22%3A%7B%22labels%22%3A%5B%22C%23%22%2C%22Node.js%22%2C%22Python%20(PyPy)%22%2C%22Lua%20(LuaJIT)%22%2C%22Rust%22%2C%22Go%22%2C%22C%20(GCC)%22%2C%22C%2B%2B%20(G%2B%2B)%22%2C%22Java%22%5D%2C%22datasets%22%3A%5B%7B%22label%22%3A%22Time%22%2C%22data%22%3A%5B11.512607%2C18.727338117999984%2C56.4145078659%2C6.938127%2C11.512%2C40.967403904%2C11.498816%2C10.160059%2C17.18%5D%7D%5D%7D%7D" />

|Name|Time|
|---|---|
|Lua (LuaJIT)|6.938127s|
|C++ (G++)|10.160059s|
|C (GCC)|11.498816s|
|Rust|11.512s|
|C#|11.512607s|
|Java|17.18s|
|Node.js|18.727338117999984s|
|Go|40.967403904s|
|Python (PyPy)|56.4145078659s|

<!-- RESULTS END -->

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
