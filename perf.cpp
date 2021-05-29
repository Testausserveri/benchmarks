#include <iostream>
#include <math.h> //pow
#include <chrono> //time
using namespace std;
using namespace chrono;

typedef uint32_t data_t;

const data_t size = 65535;

int main(){
  cout << fixed; //don't use 23e10
  auto before = high_resolution_clock::now();
  data_t answer = 0;
  for(data_t i = 1; i <= size; i++) {
    for(data_t j = 1; j <= size; j++) {
      if(i % j == 0) answer++;
    }
  }
  auto after = high_resolution_clock::now();
  auto seconds = duration_cast<duration<double>>(after - before).count();
  cout << answer << endl;
  cout << seconds << "s" << endl;
  return 0;
}

