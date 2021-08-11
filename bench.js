const process = require("child_process");
const fs = require("fs/promises");

const benchmarks = [
    {
        name: "C#",
        perf: "dotnet run --configuration Release --verbosity quiet",
        cwd: "./perfcsharpsrc/"
    },
    {
        name: "Node.js",
        perf: "node perf.js"
    },
    {
        name: "Python (PyPy)",
        perf: "pypy perf.py"
    },
    {
        name: "Lua (LuaJIT)",
        perf: "luajit perf.lua"
    },
    {
        name: "Rust",
        perf: "cargo run -q --release",
        cwd: "./perfrustsrc/"
    },
    {
        name: "Go",
        perf: "go run perf.go"
    },
    {
        name: "C (GCC)",
        build: "gcc perf.c -Ofast -o perfc",
        perf: "./perfc"
    },
    {
        name: "C++ (G++)",
        build: "g++ perf.cpp -Ofast -o perfcpp",
        perf: "./perfcpp"
    },
    {
        name: "Java",
        build: "javac perf.java",
        perf: "java perf"
    }
];

const run = (perf, cwd = ".") => new Promise((resolve, reject) => {
    const arguments = perf.split(" ");
    const perfProcess = process.spawn(arguments.shift(), arguments, {cwd});

    let data = "";
    perfProcess.stdout.on("data", (output) => data += output.toString());
    perfProcess.on("close", () => {
        console.log(`${perf}\n${data.split('\n').map(d => `    ${d}`).join('\n')}`);
        resolve(data)
    });
});

const timeToFloat = time => parseFloat(time.slice(0, -1));

const generateChartUrl = (benchmarks) => {
    const data = {
        type: "bar",
        data: {
            labels: benchmarks.map(b => b.name),
            datasets: [{
                label: "Time",
                data: benchmarks.map(b => timeToFloat(b.time))
            }]
        }
    };
    return `https://quickchart.io/chart?backgroundColor=white&c=${encodeURIComponent(JSON.stringify(data))}`;
};

const generateMarkdownTable = (benchmarks) => {
    const header = `|#|Name|Time|Answer|\n|---|---|---|---|\n`;
    const content = benchmarks.map((benchmark, index) => `|${index + 1}|${benchmark.name}|${benchmark.time}|${benchmark.size}|\n`).join("");
    return header + content;
};

(async () => {
    for await (const benchmark of benchmarks) {
        if (benchmark.build) await run(benchmark.build);
        const results = await run(benchmark.perf, benchmark.cwd);
        const [size, time] = results.split("\n").map(i => i.trim());
        benchmark.size = size;
        benchmark.time = time;
    }
    benchmarks.sort((a, b) => (timeToFloat(a.time) - timeToFloat(b.time)));

    console.log(benchmarks);

    const chartUrl = generateChartUrl(benchmarks);
    const table = generateMarkdownTable(benchmarks);

    const content = `<img src="${chartUrl}" />\n\n${table}`;

    let readme = await fs.readFile("README.md", "utf8");

    // Be sure that README.md uses LF line endings
    readme = readme.replace(/(.*<!-- RESULTS START -->\n)(.*)(\n<!-- RESULTS END -->.*)/s, `$1${content}$3`);

    await fs.writeFile("README.md", readme);
})();
