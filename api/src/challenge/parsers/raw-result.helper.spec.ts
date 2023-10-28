import {
  countOccurrences,
  extractData,
  findLine,
  findLines,
  getLine,
} from "./raw-result.helper";

describe("Raw result helper", () => {
  describe("Get line", () => {
    it.each([
      ["", 1, ""],
      [" ", 1, " "],
      ["foo", 1, "foo"],
      ["foo\nbar bar\nbaz", 0, undefined],
      ["foo\nbar bar\nbaz", 1, "foo"],
      ["foo\nbar bar\nbaz", 2, "bar bar"],
      ["foo\nbar bar\nbaz", 3, "baz"],
      ["foo\nbar bar\nbaz", 4, undefined],
    ])("should get line", (rawResult, lineNumber, expectedResult) => {
      expect(getLine(rawResult, lineNumber)).toBe(expectedResult);
    });
  });

  describe.each([
    ["", /foo/, undefined],
    ["foo", /foo/, "foo"],
    ["foo", /bar/, undefined],
    ["foo\nbar bar\nbaz", /foo/, "foo"],
    ["foo\nbar bar\nbaz", /ba./, "bar bar"],
    ["foo\nbar bar\nbaz", /baz/, "baz"],
    ["foo\nbar bar\nbaz", /fail/, undefined],
  ])(
    "Find line",
    (rawResult: string, regex: RegExp, expectedResult: string) => {
      it("should find line without exception thrown", () => {
        expect(findLine(rawResult, regex, false)).toBe(expectedResult);
      });

      it("should find line with exception thrown by default", () => {
        if (expectedResult) {
          expect(findLine(rawResult, regex)).toBe(expectedResult);
        } else {
          expect(() => findLine(rawResult, regex)).toThrowError();
        }
      });

      it("should find line with exception thrown", () => {
        if (expectedResult) {
          expect(findLine(rawResult, regex, true)).toBe(expectedResult);
        } else {
          expect(() => findLine(rawResult, regex)).toThrowError();
        }
      });
    }
  );

  describe("Find lines", () => {
    it.each([
      ["", /foo/, []],
      ["foo", /bar/, []],
      ["foo\nbar bar\nbaz", /foo/, ["foo"]],
      ["foo\nbar bar\nbaz", /ba./, ["bar bar", "baz"]],
      ["foo\nbar bar\nbaz", /baz/, ["baz"]],
      ["foo\nbar bar\nbaz", /.*/, ["foo", "bar bar", "baz"]],
    ])(
      "should find lines",
      (source: string, regex: RegExp, expectedResult: string[]) => {
        expect(findLines(source, regex)).toStrictEqual(expectedResult);
      }
    );
  });

  describe("Extract data", () => {
    it.each([
      ["", /foo/, 1, undefined],
      ["4 / 6", /[0-9]/, 1, "4"],
      ["4 / 6", /[0-9]/, 2, "6"],
      ["4 / 6", /[0-9]/, 3, undefined],
      ["4 / 6", /[0-9]+/, 1, "4"],
      ["4 / 6", /[0-9]+/, 2, "6"],
      ["4 / 6", /[0-9]+/, 3, undefined],
    ])(
      "should extract data",
      (
        source: string,
        regex: RegExp,
        matchIndex: number,
        expectedResult: string
      ) => {
        if (expectedResult) {
          expect(extractData(source, regex, matchIndex)).toBe(expectedResult);
        } else {
          expect(() => extractData(source, regex, matchIndex)).toThrowError();
        }
      }
    );
  });

  describe("Count occurrences", () => {
    it.each([
      ["", "a", 0],
      ["a", "a", 1],
      ["a", "b", 0],
      ["aa", "a", 2],
      ["aba", "a", 2],
      ["aba a b", "a", 3],
      ["foo bar baz foo", "foo", 2],
      ["aaaaaa", "aa", 3],
    ])(
      "should count occurrences",
      (source: string, data: string, expectedResult: number) => {
        expect(countOccurrences(source, data)).toBe(expectedResult);
      }
    );
  });
});
