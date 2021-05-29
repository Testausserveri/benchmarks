using System;
using System.Diagnostics;

int answer = 0;
var watch = Stopwatch.StartNew();

for (int i = 1; i <= 65535; i++)
{
    for (int j = 1; j <= 65535; j++)
    {
        if(i%j == 0)
        {
             answer++;
        }
    }
}

watch.Stop();

Console.WriteLine(answer);
Console.WriteLine($"{watch.Elapsed.TotalSeconds:F6}s");

