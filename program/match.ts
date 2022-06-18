const url = "/users/123/posts";
const a = 0,
  b = 1,
  c = 2;

const routeData: [number, Array<[string, number]>][] = [];
routeData[1] = [a, []];
routeData[3] = [b, [["id", 1]]];
routeData[4] = [c, [["id", 1]]];
const matchResult = url.match(/^\/(?:$()|users\/([^\/]+)(?:$()|\/posts$()))/);
console.log(matchResult);
if (matchResult) {
  const [handler, paramMap] = routeData[matchResult.indexOf("", 1)];
}
