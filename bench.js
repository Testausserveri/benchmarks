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
        perf: "gcc perf.c -Ofast -o perfc && ./perfc"
    },
    {
        name: "C++ (G++)",
        perf: "g++ perf.cpp -Ofast -o perfcpp && ./perfcpp"
    },
    {
        name: "Java",
        perf: "javac perf.java && java perf"
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
    return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(data))}`;
};

const generateMarkdownTable = (benchmarks) => {
    const header = `|Name|Time|\n|---|---|\n`;
    benchmarks.sort((a, b) => (timeToFloat(a.time) - timeToFloat(b.time)))
    const content = benchmarks.map(benchmark => `|${benchmark.name}|${benchmark.time}|\n`).join("");
    return header + content;
};

(async () => {
    for await (const benchmark of benchmarks) {
        const results = await run(benchmark.perf, benchmark.cwd)
        const [size, time] = results.split("\n").map(i => i.trim());
        benchmark.size = size;
        benchmark.time = time;
    }

    console.log(benchmarks);

    const chartUrl = generateChartUrl(benchmarks);
    const table = generateMarkdownTable(benchmarks);

    const content = `<img src="${chartUrl}" />\n\n${table}`;

    let readme = await fs.readFile("README.md", "utf8");

    // Be sure that README.md uses LF line endings
    readme = readme.replace(/(.*<!-- RESULTS START -->\n)(.*)(\n<!-- RESULTS END -->.*)/s, `$1${content}$3`);

    await fs.writeFile("README.md", readme);
})();
