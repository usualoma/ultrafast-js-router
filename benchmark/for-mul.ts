import * as Benchmark from "benchmark";

const suite = new Benchmark.Suite();

const array = Array.from({ length: 100 }, (_, k) => () => k);

suite
  .add("while", () => {
    let i = 0;
    while (i < array.length) {
      array[i]();
      i = (i + 1) | 0;
    }
  })
  .add("for", () => {
    for (let i = 0; i < array.length; i = (i + 1) | 0) {
      array[i]();
    }
  })
  .add("for with len", () => {
    for (let i = 0, len = array.length; i < len; i = (i + 1) | 0) {
      array[i]();
    }
  })
  .add("for with decrement", () => {
    for (let i = array.length - 1; -1 < i; i = (i - 1) | 0) {
      array[i]();
    }
  })
  .add("forEach", () => {
    array.forEach((v) => {
      v();
    });
  })
  .add("for-of", () => {
    for (const v of array) {
      v();
    }
  })
  .on("cycle", (ev: any) => {
    console.log(String(ev.target));
  })
  .on("complete", (ev: any) => {
    console.log(`Fastest is ${ev.currentTarget.filter("fastest").map("name")}`);
  })
  .run();
