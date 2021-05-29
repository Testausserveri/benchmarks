package main

import "fmt"
import "time"

func main() {
  start := time.Now()
  ans := 0;
  for i := 1; i <= 65535; i++ {
    for j := 1; j <= 65535; j++ {
      if i % j == 0 {
        ans += 1;
      }
    }
  }
  duration := time.Since(start)
  fmt.Println(ans)
  fmt.Println(duration)
}
