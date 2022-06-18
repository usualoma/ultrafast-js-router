import * as Benchmark from "benchmark";

const suite = new Benchmark.Suite();

const html = Array.from({ length: 1000 }, () => "<>").join("");

const entityMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};
const escapeRe = new RegExp(`[${Object.keys(entityMap).join("")}]`, "g");
const replaceFn = (m: string) => entityMap[m];
const escape = (str: string): string => {
  return str.replace(escapeRe, replaceFn);
};

const escapeInline = (str: string): string => {
  return str.replace(
    /[&<>"]/g,
    (m) =>
      ((
        {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
        } as Record<string, string>
      )[m])
  );
};

suite
  .add("escape", () => {
    return escape(html);
  })
  .add("escapeInline", () => {
    return escapeInline(html);
  })
  .on("cycle", (ev: any) => {
    console.log(String(ev.target));
  })
  .on("complete", (ev: any) => {
    console.log(`Fastest is ${ev.currentTarget.filter("fastest").map("name")}`);
  })
  .run();
