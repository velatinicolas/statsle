import { TurnResultEnum } from "../enums/turn-result.enum";
import { TurnFileConstructorInterface } from "./turn-file-constructor.interface";
import { TurnParserInterface } from "./turn-parser.interface";

interface TurnParsersTestData {
  parserClass: string,
  rawResult: string,
  expectedScore: string,
  expectedDetailedScore: any,
  expectedResult: TurnResultEnum,
}

const dataset: TurnParsersTestData[] = [
  {
    parserClass: 'cemantix',
    rawResult: `J'ai trouvé #cemantix nº365 en 2 coups !
  🥳
  🔥
  https://cemantix.certitudes.org/`,
    expectedScore: "2",
    expectedDetailedScore: { attempts: 2 },
    expectedResult: TurnResultEnum.WON,
  },
  {
    parserClass: 'cemantix',
    rawResult: `J'ai trouvé #cemantix nº365 en 236 coups !
  🥳
  🔥
  https://cemantix.certitudes.org/`,
    expectedScore: "236",
    expectedDetailedScore: { attempts: 236 },
    expectedResult: TurnResultEnum.WON,
  },
  {
    parserClass: 'cemantle',
    rawResult: `I found #cemantle #332 in 74 guesses!
🥳
🔥5️⃣
🥵7️⃣
😎1️⃣6️⃣
🥶🥶🥶🥶4️⃣2️⃣
🧊3️⃣`,
    expectedScore: '74',
    expectedDetailedScore: { attempts: 74 },
    expectedResult: TurnResultEnum.WON,
  },
  {
    parserClass: 'cemantle',
    rawResult: `I found #cemantle #245 in 25 guesses!
🥳
🥵
😎2️⃣
🥶1️⃣8️⃣
🧊3️⃣`,
    expectedScore: '25',
    expectedDetailedScore: { attempts: 25 },
    expectedResult: TurnResultEnum.WON,
  },
  {
    parserClass: 'duotrigordle',
    rawResult: `Daily Duotrigordle #367
Guesses: 36/37
2️⃣1️⃣ 3️⃣3️⃣ 0️⃣4️⃣ 0️⃣5️⃣
0️⃣7️⃣ 2️⃣2️⃣ 2️⃣3️⃣ 3️⃣4️⃣
2️⃣4️⃣ 2️⃣5️⃣ 3️⃣5️⃣ 2️⃣6️⃣
0️⃣8️⃣ 2️⃣7️⃣ 0️⃣9️⃣ 2️⃣8️⃣
1️⃣0️⃣ 1️⃣2️⃣ 1️⃣1️⃣ 2️⃣9️⃣
3️⃣1️⃣ 1️⃣3️⃣ 3️⃣0️⃣ 1️⃣4️⃣
1️⃣5️⃣ 1️⃣6️⃣ 3️⃣6️⃣ 3️⃣2️⃣
1️⃣8️⃣ 1️⃣9️⃣ 2️⃣0️⃣ 1️⃣7️⃣
https://duotrigordle.com/`,
    expectedScore: '36/37',
    expectedDetailedScore: { attempts: 36, over: 37, missed: 0 },
    expectedResult: TurnResultEnum.WON,
  },
  {
    parserClass: 'duotrigordle',
    rawResult: `Daily Duotrigordle #347
Guesses: X/37
1️⃣3️⃣ 2️⃣6️⃣ 1️⃣4️⃣ 🟥🟥
1️⃣5️⃣ 3️⃣0️⃣ 🟥🟥 3️⃣1️⃣
3️⃣2️⃣ 3️⃣3️⃣ 3️⃣4️⃣ 1️⃣6️⃣
1️⃣7️⃣ 1️⃣8️⃣ 🟥🟥 1️⃣9️⃣
2️⃣0️⃣ 2️⃣3️⃣ 2️⃣1️⃣ 2️⃣2️⃣
2️⃣4️⃣ 0️⃣3️⃣ 0️⃣5️⃣ 0️⃣7️⃣
2️⃣5️⃣ 3️⃣5️⃣ 0️⃣8️⃣ 0️⃣9️⃣
3️⃣6️⃣ 1️⃣0️⃣ 3️⃣7️⃣ 1️⃣1️⃣
https://duotrigordle.com/`,
    expectedScore: '',
    expectedDetailedScore: { attempts: 37, over: 37, missed: 3 },
    expectedResult: TurnResultEnum.LOST,
  },
  {
    parserClass: 'episode',
    rawResult: `Episode #26
📺 🟩 ⬛ ⬛ ⬛ ⬛ ⬛ ⬛ ⬛ ⬛ ⬛

https://episode.wtf`,
    expectedScore: '1 / 10',
    expectedDetailedScore: { attempts: 1, over: 10 },
    expectedResult: TurnResultEnum.WON,
  },
  {
    parserClass: 'episode',
    rawResult: `Episode #26
📺 🟥 🟥 🟥 🟩 ⬛ ⬛ ⬛ ⬛ ⬛ ⬛

https://episode.wtf`,
    expectedScore: '4 / 10',
    expectedDetailedScore: { attempts: 4, over: 10 },
    expectedResult: TurnResultEnum.WON,
  },
  {
    parserClass: 'episode',
    rawResult: `Episode #26
📺 🟥 🟥 🟥 🟥 🟥 🟥 🟥 🟥 🟥 🟥

https://episode.wtf`,
    expectedScore: '',
    expectedDetailedScore: { attempts: 10, over: 10 },
    expectedResult: TurnResultEnum.LOST,
  },
  {
    parserClass: "pedantix",
    rawResult: `J'ai trouvé #pedantix nº293 en 32 coups !
🟩🟩🟩🟩🟩🟧🟧🟧🟧🟧🟧🟧🟥🟥🟥🟥🟥🟥🟥🟥
https://cemantix.certitudes.org/pedantix`,
    expectedScore: "32",
    expectedDetailedScore: { attempts: 32 },
    expectedResult: TurnResultEnum.WON,
  },
  {
    parserClass: "pedantix",
    rawResult: `J'ai trouvé #pedantix nº293 en 632 coups !
🟩🟩🟩🟩🟩🟧🟧🟧🟧🟧🟧🟧🟥🟥🟥🟥🟥🟥🟥🟥
https://cemantix.certitudes.org/pedantix`,
    expectedScore: "632",
    expectedDetailedScore: { attempts: 632 },
    expectedResult: TurnResultEnum.WON,
  },
];

describe("Turn parsers", () => {
  it.each<TurnParsersTestData | jest.DoneCallback>(dataset)(
    "should parse",
    (
      testData: TurnParsersTestData,
      done: jest.DoneCallback
    ) => {
      import(`./${testData.parserClass}/${testData.parserClass}.parser.ts`).then((importData) => {
        const className =
          Object.values<TurnFileConstructorInterface<TurnParserInterface>>(
            importData
          )[0];
        const parser = new className();
        expect(parser.extractScore(testData.rawResult)).toBe(testData.expectedScore);
        expect(parser.extractDetailedScore(testData.rawResult)).toStrictEqual(
          testData.expectedDetailedScore
        );
        expect(parser.extractResult(testData.rawResult)).toBe(testData.expectedResult);
        done();
      });
    }
  );
});
