describe("loop", () => {
  let array: number[] = [];
  let result: number[] = [];
  beforeEach(() => {
    array = Array.from({ length: 5 }, (_, k) => k);
    result = [];
  });

  describe("shift", () => {
    it("for", () => {
      for (let i = 0; i < array.length; i++) {
        result.push(array[i]);
        array.shift();
      }
      expect(result).toEqual([0, 2, 4]);
    });

    it("forEach", () => {
      array.forEach((v) => {
        result.push(v);
        array.shift();
      });
      expect(result).toEqual([0, 2, 4]);
    });

    it("for-of", () => {
      for (const v of array) {
        result.push(v);
        array.shift();
      }
      expect(result).toEqual([0, 2, 4]);
    });
  });

  describe("push", () => {
    it("for", () => {
      for (let i = 0; i < array.length; i++) {
        result.push(array[i]);
        if (array.length < 10) array.push(array[i]);
      }
      expect(result).toEqual([0, 1, 2, 3, 4, 0, 1, 2, 3, 4]);
    });

    it("forEach", () => {
      array.forEach((v) => {
        result.push(v);
        array.push(v);
      });
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it("for-of", () => {
      for (const v of array) {
        result.push(v);
        if (array.length < 10) array.push(v);
      }
      expect(result).toEqual([0, 1, 2, 3, 4, 0, 1, 2, 3, 4]);
    });
  });

  describe("splice", () => {
    it("for", () => {
      for (let i = 0; i < array.length; i++) {
        result.push(array[i]);
        array.splice(array.length - 1, 1, array[i]);
      }
      expect(result).toEqual([0, 1, 2, 3, 3]);
    });

    it("forEach", () => {
      array.forEach((v) => {
        result.push(v);
        array.splice(array.length - 1, 1, v);
      });
      expect(result).toEqual([0, 1, 2, 3, 3]);
    });

    it("for-of", () => {
      for (const v of array) {
        result.push(v);
        array.splice(array.length - 1, 1, v);
      }
      expect(result).toEqual([0, 1, 2, 3, 3]);
    });
  });

  describe("sparse array", () => {
    beforeEach(() => {
      array = [];
      for (let i = 0; i < 5; i++) {
        array[i * 2] = i;
      }
      result = [];
    });

    it("for", () => {
      for (let i = 0; i < array.length; i++) {
        result.push(array[i]);
      }
      expect(result).toEqual([
        0,
        undefined,
        1,
        undefined,
        2,
        undefined,
        3,
        undefined,
        4,
      ]);
    });

    it("forEach", () => {
      array.forEach((v) => {
        result.push(v);
      });
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it("for-of", () => {
      for (const v of array) {
        result.push(v);
      }
      expect(result).toEqual([
        0,
        undefined,
        1,
        undefined,
        2,
        undefined,
        3,
        undefined,
        4,
      ]);
    });
  });

  describe("Symbol.iterator", () => {
    it("for-of", () => {
      array[Symbol.iterator] = function* () {
        for (let i = 0; i < array.length; i++) {
          yield array[i] * 2;
        }
      };
      for (const v of array) {
        result.push(v);
      }
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });
  });
});
