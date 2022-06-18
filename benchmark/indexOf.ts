import Benchmark from "benchmark";

const suite = new Benchmark.Suite();
const re = new RegExp([...Array(1000)].map((_, i) => `/${i}$()`).join("|"));
const m = "/500".match(re);

if (!m) {
  throw new Error("match failed");
}

console.log(m.length);
console.log(m.indexOf(""));
console.log(m.lastIndexOf(""));

suite
  .add("indexOf()", () => {
    return m.indexOf("");
  })
  .add("lastIndexOf()", () => {
    return m.lastIndexOf("");
  })
  .on("cycle", (ev: any) => {
    console.log(String(ev.target));
  })
  .on("complete", (ev: any) => {
    console.log(`Fastest is ${ev.currentTarget.filter("fastest").map("name")}`);
  })
  .run();
