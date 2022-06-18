import * as Benchmark from "benchmark";

const suite = new Benchmark.Suite();

const prefix = Array.from({ length: 1000 }, () => "prefix").join("");
const re = new RegExp(Array.from({ length: 26 }, (_, k) => `${prefix}${String.fromCharCode("a".charCodeAt(0) + k)}`).join("|"));

suite
  .add("a", () => {
    re.test(`${prefix}a`);
  })
  .add("z", () => {
    re.test(`${prefix}z`);
  })
  .on("cycle", (ev: any) => {
    console.log(String(ev.target));
  })
  .on("complete", (ev: any) => {
    console.log(`Fastest is ${ev.currentTarget.filter("fastest").map("name")}`);
  })
  .run();
