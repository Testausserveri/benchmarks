@echo off
echo Very cool language benchmark script
echo ---
echo Node.js
node perf.js
echo ---
echo Lua (LuaJIT)
luajit perf.lua
echo ---
echo Rust
cd perfrustsrc
cargo run -q --release
cd ..
echo ---
echo Go
go run perf.go
echo ---
echo Python (PyPy)
pypy3 perf.py
echo ---
echo C (GCC)
gcc perf.c -march=native -mtune=native -Ofast -o perfc.exe
perfc.exe
echo ---
echo C++ (G++)
g++ perf.cpp -march=native -mtune=native -Ofast -o perfcpp.exe
perfcpp.exe
echo ---
echo C#
cd perfcsharpsrc
dotnet run --configuration Release --verbosity quiet
cd ..
echo ---
echo Java
javac perf.java
java perf
echo ---
