import * as Benchmark from "benchmark";

const suite = new Benchmark.Suite();

const string = process.argv[process.argv.length - 1] || "/";

// console.log(string);
process.stdout.write(`${string.split("/").length - 1}`);

function splitByIndexOf(str: string, sep: string): string[] {
  const parts: string[] = [];
  for (let i = 0, j = str.indexOf(sep); ; j = str.indexOf(sep, i)) {
    if (j === -1) {
      parts.push(str.substring(i));
      break;
    } else {
      parts.push(str.substring(i, j));
      i = j + 1;
    }
  }
  return parts;
}

suite
  .add(`"/"`, () => {
    return string.split("/");
  })
  .add("/\\//", () => {
    return string.split(/\//);
  })
  .add("splitByIndexOf", () => {
    return splitByIndexOf(string, "/");
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
