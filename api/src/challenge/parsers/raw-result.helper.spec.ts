import { findLine, getLine } from "./raw-result.helper"

describe("Raw result helper", () => {
  describe("Get line", () => {
    it.each([
      [ "", 1, "" ],
      [ " ", 1, " " ],
      [ "foo", 1, "foo" ],
      [ "foo\nbar bar\nbaz", 0, undefined ],
      [ "foo\nbar bar\nbaz", 1, "foo" ],
      [ "foo\nbar bar\nbaz", 2, "bar bar" ],
      [ "foo\nbar bar\nbaz", 3, "baz" ],
      [ "foo\nbar bar\nbaz", 4, undefined ],
    ])("should get line", (rawResult, lineNumber, expectedResult) => {
      expect(getLine(rawResult, lineNumber)).toBe(expectedResult)
    })
  })

  describe("Find line", () => {
    it.each([
      [ "foo\nbar bar\nbaz", /foo/, "foo" ],
      [ "foo\nbar bar\nbaz", /ba./, "bar bar" ],
      [ "foo\nbar bar\nbaz", /baz/, "baz" ],
      [ "foo\nbar bar\nbaz", /fail/, undefined ],
    ])("should find line without exception thrown", (rawResult, regex, expectedResult) => {
      expect(findLine(rawResult, regex, false)).toBe(expectedResult)
    })
  })
})