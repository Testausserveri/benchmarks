const start = Date.now();
const size = 65535;
let answer = 0;

for(let i = 1; i <= size; i++) {
  for(let j = 1; j <= size; j++) {
    if(i % j === 0) answer++;
  }
}
const diff = Date.now() - start;
console.log(answer.toString());
console.log(diff / 1000 + "s");

