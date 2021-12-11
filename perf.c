#include <stdio.h>
#include <time.h>

int main() {
    clock_t begin = clock();
    int ans = 0;
    for(int i = 1; i <= 65535; ++i) {
        for(int j = 1; j <= 65535; ++j) {
            ans += (i%j == 0);
        }
    }
    clock_t end = clock();
    double time = (double)(end-begin) / CLOCKS_PER_SEC;
    printf("%i\n", ans);
    printf("%fs\n", time);
    return 0;
}
