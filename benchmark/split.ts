import * as Benchmark from "benchmark";

const suite = new Benchmark.Suite();

const string = process.argv[process.argv.length - 1] || "/";

// console.log(string);
process.stdout.write(`${string.split("/").length - 1}`);

suite
  .add(`"/"`, () => {
    return string.split("/");
  })
  .add("/\\//", () => {
    return string.split(/\//);
  })
  .on("cycle", (ev: any) => {
    // console.log(String(ev.target));
    process.stdout.write(`,${ev.target.hz}`);
  })
  .on("complete", (ev: any) => {
    // console.log(`Fastest is ${ev.currentTarget.filter("fastest").map("name")}`);
    console.log("");
  })
  .run();
