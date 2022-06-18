import * as Benchmark from "benchmark";

const suite = new Benchmark.Suite();

const strings = Array.from({ length: 1000 }, () => "hello");

suite
  .add("join", () => {
    return strings.join("");
  })
  .add("+=", () => {
    let res = "";
    strings.forEach((str) => (res += str));
    return res;
  })
  .add("join by reduce", () => {
    return strings.reduce((res, str) => res + str, "");
  })
  .on("cycle", (ev: any) => {
    console.log(String(ev.target));
  })
  .on("complete", (ev: any) => {
    console.log(`Fastest is ${ev.currentTarget.filter("fastest").map("name")}`);
  })
  .run();
