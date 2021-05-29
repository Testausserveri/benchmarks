class perf {
  public static void main(String[] args) {
    int answer = 0;
    long start = System.currentTimeMillis();
    for(int i = 1; i <= 65535; i++) {
      for(int j = 1; j <= 65535; j++) {
        if(i % j == 0) answer++;
      }
    }
    System.out.println(answer);
    System.out.println(Float.toString((System.currentTimeMillis() - start) / 1000f) + "s");
  }
}
