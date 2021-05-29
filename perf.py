from time import time

ans = 0

start = time()

for i in range(1, 65536):
  for j in range(1, 65536):
    if i % j == 0:
      ans += 1

print(ans)
print(str(time() - start) + "s")
