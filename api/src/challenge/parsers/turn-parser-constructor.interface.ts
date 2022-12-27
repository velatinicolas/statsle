import { TurnParserInterface } from "./turn-parser.interface";

// This strange interface only exists in order to allow the dynamic new
// when providing the `TURN_PARSERS` token in `ChallengeModule`
//
export interface TurnParserConstructorInterface {
  new (): TurnParserInterface;
}
