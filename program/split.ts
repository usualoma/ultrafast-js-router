const sp = {
  [Symbol.split](): string[] {
    return ["42"];
  },
};

console.log("test".split(sp));
