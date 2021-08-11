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
        perf: "pypy3 perf.py"
    }
];

const run = (perf, cwd = ".") => new Promise((resolve, reject) => {
    const arguments = perf.split(" ");
    const perfProcess = process.spawn(arguments.shift(), arguments, {cwd});

    let data = "";
    perfProcess.stdout.on("data", (output) => data += output.toString());
    perfProcess.on("close", () => {
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
