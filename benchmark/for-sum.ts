import * as Benchmark from "benchmark";

const suite = new Benchmark.Suite();

const array = Array.from({ length: 100 }, (_, k) => k);
const reducer = (acc: number, v: number) => acc + v;

suite
  .add("while", () => {
    let i = 0;
    let sum = 0;
    while (i < array.length) {
      sum = (sum + array[i]) | 0;
      i = (i + 1) | 0;
    }
    return sum;
  })
  .add("for", () => {
    let sum = 0;
    for (let i = 0; i < array.length; i = (i + 1) | 0) {
      sum = (sum + array[i]) | 0;
    }
    return sum;
  })
  .add("for with len", () => {
    let sum = 0;
    for (let i = 0, len = array.length; i < len; i = (i + 1) | 0) {
      sum = (sum + array[i]) | 0;
    }
    return sum;
  })
  .add("for with decrement", () => {
    let sum = 0;
    for (let i = array.length - 1; -1 < i; i = (i - 1) | 0) {
      sum = (sum + array[i]) | 0;
    }
    return sum;
  })
  .add("forEach", () => {
    let sum = 0;
    array.forEach((v) => {
      sum = (sum + v) | 0;
    });
    return sum;
  })
  .add("reduce", () => {
    return array.reduce(reducer, 0);
  })
  .add("for-of", () => {
    let sum = 0;
    for (const v of array) {
      sum = (sum + v) | 0;
    }
    return sum;
  })
  .on("cycle", (ev: any) => {
    console.log(String(ev.target));
  })
  .on("complete", (ev: any) => {
    console.log(`Fastest is ${ev.currentTarget.filter("fastest").map("name")}`);
  })
  .run();
