import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { TurnParserChain } from "./parser-chain.service";
import { TurnParserInterface } from "./turn-parser.interface";

const buildTurnParsers = (returnValues: boolean[]): TurnParserInterface[] =>
  returnValues.map(
    (returnValue) =>
      ({
        handles: jest.fn(() => returnValue),
      } as unknown as TurnParserInterface)
  );

describe("Parser chain service", () => {
  describe("Find parser handling", () => {
    it.each([
      [[true], 0],
      [[true, false], 0],
      [[false, true], 1],
      [[false, true, false], 1],
    ])(
      "should find parser",
      (returnValues: boolean[], expectedTurnParserIndex: number) => {
        const turnParsers = buildTurnParsers(returnValues);
        const turnParserChain = new TurnParserChain(turnParsers);
        expect(turnParserChain.findParserHandling("foo")).toBe(
          turnParsers[expectedTurnParserIndex]
        );
        turnParsers.forEach((turnParser) => {
          expect(turnParser.handles).toHaveBeenCalledWith("foo");
        });
      }
    );

    it.each([[[]], [[false]], [[false, false]]])(
      "should throw exception if no parser found",
      (returnValues: boolean[]) => {
        const turnParsers = buildTurnParsers(returnValues);
        const turnParserChain = new TurnParserChain(turnParsers);
        expect(() => turnParserChain.findParserHandling("foo")).toThrow(
          BadRequestException
        );
        turnParsers.forEach((turnParser) => {
          expect(turnParser.handles).toHaveBeenCalledWith("foo");
        });
      }
    );

    it.each([[[true, true]], [[true, false, true]], [[false, true, true]]])(
      "should throw exception if many parsers found",
      (returnValues: boolean[]) => {
        const turnParsers = buildTurnParsers(returnValues);
        const turnParserChain = new TurnParserChain(turnParsers);
        expect(() => turnParserChain.findParserHandling("foo")).toThrow(
          InternalServerErrorException
        );
        turnParsers.forEach((turnParser) => {
          expect(turnParser.handles).toHaveBeenCalledWith("foo");
        });
      }
    );
  });
});
