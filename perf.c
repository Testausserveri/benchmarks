#include <stdio.h>
#include <time.h>

int main() {
  int ans = 0;
  int i;
  int j;
  clock_t begin = clock();
  for(i = 1; i <= 65535; i++) {
     for(j = 1; j <= 65535; j++) {
       if(i % j == 0) {
         ans++;
       }
     }
  }
  clock_t end = clock();
  double time = (double)(end - begin) / CLOCKS_PER_SEC;
  printf("%d\n", ans);
  printf("%fs\n", time);
  return 0;
}
