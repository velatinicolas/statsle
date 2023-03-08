import { TurnResultEnum } from "../enums/turn-result.enum";
import { TurnFileConstructorInterface } from "./turn-file-constructor.interface";
import { TurnParserInterface } from "./turn-parser.interface";

interface TurnParsersTestData {
  parserClass: string;
  rawResult: string;
  expectedScore: string;
  expectedDetailedScore: any;
}

const testDatas: TurnParsersTestData[] = [
  {
    parserClass: "cemantix",
    rawResult: `J'ai trouvé #cemantix nº365 en 2 coups !
  🥳
  🔥
  https://cemantix.certitudes.org/`,
    expectedScore: "2",
    expectedDetailedScore: { attempts: 2, result: TurnResultEnum.WON },
  },
  {
    parserClass: "cemantix",
    rawResult: `J'ai trouvé #cemantix nº365 en 236 coups !
  🥳
  🔥
  https://cemantix.certitudes.org/`,
    expectedScore: "236",
    expectedDetailedScore: { attempts: 236, result: TurnResultEnum.WON },
  },
  {
    parserClass: "cemantle",
    rawResult: `I found #cemantle #332 in 74 guesses!
🥳
🔥5️⃣
🥵7️⃣
😎1️⃣6️⃣
🥶🥶🥶🥶4️⃣2️⃣
🧊3️⃣`,
    expectedScore: "74",
    expectedDetailedScore: { attempts: 74, result: TurnResultEnum.WON },
  },
  {
    parserClass: "cemantle",
    rawResult: `I found #cemantle #245 in 25 guesses!
🥳
🥵
😎2️⃣
🥶1️⃣8️⃣
🧊3️⃣`,
    expectedScore: "25",
    expectedDetailedScore: { attempts: 25, result: TurnResultEnum.WON },
  },
  {
    parserClass: "duotrigordle",
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
    expectedScore: "36/37",
    expectedDetailedScore: {
      attempts: 36,
      over: 37,
      missed: 0,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "duotrigordle",
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
    expectedScore: "",
    expectedDetailedScore: {
      attempts: 37,
      over: 37,
      missed: 3,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "episode",
    rawResult: `Episode #26
📺 🟩 ⬛ ⬛ ⬛ ⬛ ⬛ ⬛ ⬛ ⬛ ⬛

https://episode.wtf`,
    expectedScore: "1 / 10",
    expectedDetailedScore: {
      attempts: 1,
      over: 10,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "episode",
    rawResult: `Episode #26
📺 🟥 🟥 🟥 🟩 ⬛ ⬛ ⬛ ⬛ ⬛ ⬛

https://episode.wtf`,
    expectedScore: "4 / 10",
    expectedDetailedScore: {
      attempts: 4,
      over: 10,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "episode",
    rawResult: `Episode #26
📺 🟥 🟥 🟥 🟥 🟥 🟥 🟥 🟥 🟥 🟥

https://episode.wtf`,
    expectedScore: "",
    expectedDetailedScore: {
      attempts: 10,
      over: 10,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "framed",
    rawResult: `Framed #360
🎥 🟥 🟥 🟥 🟥 🟥 🟥

https://framed.wtf`,
    expectedScore: "",
    expectedDetailedScore: {
      attempts: 6,
      over: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "framed",
    rawResult: `Framed #354
🎥 🟥 🟥 🟥 🟥 🟥 🟩

https://framed.wtf`,
    expectedScore: "6 / 6",
    expectedDetailedScore: { attempts: 6, over: 6, result: TurnResultEnum.WON },
  },
  {
    parserClass: "framed",
    rawResult: `Framed #338
🎥 🟩 ⬛ ⬛ ⬛ ⬛ ⬛

https://framed.wtf`,
    expectedScore: "1 / 6",
    expectedDetailedScore: { attempts: 1, over: 6, result: TurnResultEnum.WON },
  },
  {
    parserClass: "grumble",
    rawResult: `@GrumbleFR #116
1️⃣ 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 19
2️⃣ 🟨🟨🟨🟨🟨🟨🟨🟨 21
3️⃣ 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 25

Score: 65 / 65

https://www.grumble.fr`,
    expectedScore: "65 / 65",
    expectedDetailedScore: { score: 65, over: 65, result: TurnResultEnum.WON },
  },
  {
    parserClass: "grumble",
    rawResult: `@GrumbleFR #139
1️⃣ 🟪🟪🟪🟪🟪🟪🟪🟪 19
2️⃣ 🟪🟪🟪🟪🟪🟪🟪🟪🟪 26
3️⃣ 🟪🟪🟪🟪🟪🟪🟪🟪 13

Score: 58 / 65

https://www.grumble.fr`,
    expectedScore: "58 / 65",
    expectedDetailedScore: {
      score: 58,
      over: 65,
      result: TurnResultEnum.ONGOING,
    },
  },
  {
    parserClass: "nerdle",
    rawResult: `nerdlegame 411 4/6

⬛⬛⬛⬛⬛🟩🟪⬛
🟪🟪⬛🟪🟪🟩⬛⬛
🟪⬛🟪⬛⬛🟩⬛⬛
🟩🟩🟩🟩🟩🟩🟩🟩 https://nerdlegame.com/`,
    expectedScore: "4/6",
    expectedDetailedScore: { attempts: 4, over: 6, result: TurnResultEnum.WON },
  },
  {
    parserClass: "numble",
    rawResult: `Numble 386
SOLVED: ✅
Numbers used: 3/6
Final answer: 300
5.878s
https://numble.wtf`,
    expectedScore: "5.878s, 3/6, 300",
    expectedDetailedScore: {
      time: "5.878s",
      tilesUsed: 3,
      over: 6,
      answer: 300,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "numble",
    rawResult: `Numble 361
SOLVED: ❌
Numbers used: 5/6
Final answer: 939.5
6m 27.799s
https://numble.wtf`,
    expectedScore: "6m 27.799s, 5/6, 939.5",
    expectedDetailedScore: {
      time: "6m 27.799s",
      tilesUsed: 5,
      over: 6,
      answer: 939.5,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "pedantix",
    rawResult: `J'ai trouvé #pedantix nº293 en 32 coups !
🟩🟩🟩🟩🟩🟧🟧🟧🟧🟧🟧🟧🟥🟥🟥🟥🟥🟥🟥🟥
https://cemantix.certitudes.org/pedantix`,
    expectedScore: "32",
    expectedDetailedScore: { attempts: 32, result: TurnResultEnum.WON },
  },
  {
    parserClass: "pedantix",
    rawResult: `J'ai trouvé #pedantix nº293 en 632 coups !
🟩🟩🟩🟩🟩🟧🟧🟧🟧🟧🟧🟧🟥🟥🟥🟥🟥🟥🟥🟥
https://cemantix.certitudes.org/pedantix`,
    expectedScore: "632",
    expectedDetailedScore: { attempts: 632, result: TurnResultEnum.WON },
  },
  {
    parserClass: "pedantle",
    rawResult: `I found #pedantle #288 in 43 guesses!
🟩🟩🟩🟩🟩🟧🟧🟧🟧🟧🟧🟥🟥🟥🟥🟥🟥🟥🟥🟥`,
    expectedScore: "43",
    expectedDetailedScore: { attempts: 43, result: TurnResultEnum.WON },
  },
  {
    parserClass: "quordle",
    rawResult: `Daily Quordle 376
8️⃣4️⃣
5️⃣7️⃣
quordle.com
🟨⬜⬜🟨⬜ ⬜⬜⬜🟨🟨
⬜⬜⬜⬜⬜ 🟩⬜⬜🟩⬜
⬜⬜⬜⬜🟨 🟩🟩🟨⬜⬜
⬜⬜🟨⬜🟩 🟩🟩🟩🟩🟩
🟨⬜⬜⬜⬜ ⬛⬛⬛⬛⬛
⬜⬜⬜🟨⬜ ⬛⬛⬛⬛⬛
⬜🟩⬜⬜⬜ ⬛⬛⬛⬛⬛
🟩🟩🟩🟩🟩 ⬛⬛⬛⬛⬛

⬜🟩🟩⬜🟨 ⬜⬜⬜⬜⬜
⬜🟩🟩🟩⬜ 🟩⬜⬜⬜⬜
⬜⬜🟨⬜🟨 🟩🟨⬜⬜⬜
⬜⬜⬜🟩⬜ 🟩🟨🟨⬜⬜
🟩🟩🟩🟩🟩 ⬜⬜⬜⬜⬜
⬛⬛⬛⬛⬛ ⬜⬜🟩🟨🟩
⬛⬛⬛⬛⬛ 🟩🟩🟩🟩🟩
`,
    expectedScore: "8 / 9",
    expectedDetailedScore: {
      attempts: 8,
      over: 9,
      missed: 0,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "quordle",
    rawResult: `Daily Quordle 372
🟥7️⃣
6️⃣4️⃣
quordle.com
⬜⬜⬜🟨⬜ ⬜⬜⬜⬜⬜
⬜⬜⬜⬜⬜ ⬜🟨🟨⬜🟨
⬜⬜⬜🟨⬜ 🟩🟨🟩🟩⬜
⬜⬜⬜⬜⬜ 🟩🟨🟩⬜⬜
⬜⬜⬜🟨⬜ 🟩⬜🟩🟩🟩
⬜🟨⬜⬜🟩 🟨🟨⬜⬜⬜
⬜⬜⬜🟨⬜ 🟩🟩🟩🟩🟩
🟩🟩🟩⬜⬜ ⬛⬛⬛⬛⬛
🟩🟩🟩⬜🟩 ⬛⬛⬛⬛⬛

⬜⬜🟩🟨⬜ ⬜⬜🟨⬜⬜
⬜⬜🟨⬜⬜ ⬜🟨🟨⬜🟨
⬜🟨⬜🟨⬜ 🟩🟩🟩⬜⬜
⬜🟨⬜🟨⬜ 🟩🟩🟩🟩🟩
⬜🟨⬜🟨🟨 ⬛⬛⬛⬛⬛
🟩🟩🟩🟩🟩 ⬛⬛⬛⬛⬛
`,
    expectedScore: "1 missed",
    expectedDetailedScore: {
      attempts: 9,
      over: 9,
      missed: 1,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "quordle",
    rawResult: `Daily Quordle 382
7️⃣8️⃣
9️⃣3️⃣
quordle.com
⬜⬜⬜⬜⬜ 🟨⬜⬜⬜⬜
⬜🟨🟨🟨⬜ ⬜⬜⬜🟨🟨
⬜⬜🟨⬜⬜ ⬜⬜⬜⬜⬜
⬜🟨⬜⬜⬜ ⬜🟨⬜⬜⬜
🟨🟩🟨⬜🟨 ⬜⬜🟨⬜🟨
🟨⬜⬜🟨⬜ 🟨🟨🟨🟨⬜
🟩🟩🟩🟩🟩 🟨⬜🟩⬜⬜
⬛⬛⬛⬛⬛ 🟩🟩🟩🟩🟩

⬜🟨🟩⬜⬜ ⬜🟩⬜⬜🟩
⬜⬜⬜🟨⬜ ⬜🟨⬜⬜⬜
⬜🟨⬜⬜⬜ 🟩🟩🟩🟩🟩
⬜🟩🟩🟩🟩 ⬛⬛⬛⬛⬛
⬜⬜⬜⬜🟨 ⬛⬛⬛⬛⬛
🟨⬜⬜⬜⬜ ⬛⬛⬛⬛⬛
⬜⬜🟨⬜⬜ ⬛⬛⬛⬛⬛
⬜⬜🟨⬜⬜ ⬛⬛⬛⬛⬛
🟩🟩🟩🟩🟩 ⬛⬛⬛⬛⬛
`,
    expectedScore: "9 / 9",
    expectedDetailedScore: {
      attempts: 9,
      over: 9,
      missed: 0,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "sedecorder",
    rawResult: `Daily Sedec-order #364
Guesses: 20/21
0️⃣5️⃣ 0️⃣6️⃣
0️⃣7️⃣ 0️⃣8️⃣
0️⃣9️⃣ 1️⃣0️⃣
1️⃣1️⃣ 1️⃣2️⃣
1️⃣3️⃣ 1️⃣4️⃣
1️⃣5️⃣ 1️⃣6️⃣
1️⃣7️⃣ 1️⃣8️⃣
1️⃣9️⃣ 2️⃣0️⃣
https://sedecordle.com/
#sedecordle  #sedecorder`,
    expectedScore: "20/21",
    expectedDetailedScore: {
      attempts: 20,
      over: 21,
      missed: 0,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "sedecorder",
    rawResult: `Daily Sedec-order #363
Guesses: X/21
0️⃣3️⃣ 0️⃣7️⃣
0️⃣9️⃣ 1️⃣0️⃣
1️⃣1️⃣ 1️⃣2️⃣
1️⃣3️⃣ 1️⃣4️⃣
1️⃣5️⃣ 1️⃣6️⃣
1️⃣7️⃣ 1️⃣8️⃣
1️⃣9️⃣ 2️⃣0️⃣
2️⃣1️⃣ 🟥🟥
https://sedecordle.com/
#sedecordle  #sedecorder`,
    expectedScore: "1 missed",
    expectedDetailedScore: {
      attempts: 21,
      over: 21,
      missed: 1,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "sedecorder",
    rawResult: `Daily Sedec-order #360
Guesses: 21/21
0️⃣5️⃣ 0️⃣7️⃣
0️⃣8️⃣ 0️⃣9️⃣
1️⃣0️⃣ 1️⃣1️⃣
1️⃣2️⃣ 1️⃣3️⃣
1️⃣4️⃣ 1️⃣5️⃣
1️⃣6️⃣ 1️⃣7️⃣
1️⃣8️⃣ 1️⃣9️⃣
2️⃣0️⃣ 2️⃣1️⃣
https://sedecordle.com/
#sedecordle  #sedecorder`,
    expectedScore: "21/21",
    expectedDetailedScore: {
      attempts: 21,
      over: 21,
      missed: 0,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "sedecordle",
    rawResult: `Daily #359
1️⃣3️⃣⬛1️⃣4️⃣
1️⃣5️⃣⬛0️⃣7️⃣
1️⃣8️⃣⬛0️⃣4️⃣
1️⃣7️⃣⬛0️⃣8️⃣
1️⃣0️⃣⬛0️⃣9️⃣
0️⃣3️⃣⬛1️⃣1️⃣
1️⃣6️⃣⬛2️⃣0️⃣
0️⃣5️⃣⬛1️⃣2️⃣
sedecordle.com
#sedecordle
`,
    expectedScore: "20 / 21",
    expectedDetailedScore: {
      attempts: 20,
      over: 21,
      missed: 0,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "sedecordle",
    rawResult: `Daily #356
1️⃣5️⃣⬛1️⃣6️⃣
1️⃣7️⃣⬛🟥🟥
1️⃣8️⃣⬛0️⃣6️⃣
0️⃣8️⃣⬛0️⃣7️⃣
1️⃣9️⃣⬛2️⃣0️⃣
1️⃣1️⃣⬛1️⃣0️⃣
1️⃣4️⃣⬛1️⃣3️⃣
🟥🟥⬛2️⃣1️⃣
sedecordle.com
#sedecordle
`,
    expectedScore: "2 missed",
    expectedDetailedScore: {
      attempts: 21,
      over: 21,
      missed: 2,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "sedecordle",
    rawResult: `Daily #386
1️⃣0️⃣⬛0️⃣6️⃣
0️⃣8️⃣⬛0️⃣7️⃣
1️⃣1️⃣⬛1️⃣7️⃣
1️⃣8️⃣⬛1️⃣9️⃣
1️⃣2️⃣⬛2️⃣0️⃣
1️⃣3️⃣⬛1️⃣6️⃣
1️⃣5️⃣⬛1️⃣4️⃣
0️⃣4️⃣⬛2️⃣1️⃣
sedecordle.com
#sedecordle
`,
    expectedScore: "21 / 21",
    expectedDetailedScore: {
      attempts: 21,
      over: 21,
      missed: 0,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "statele",
    rawResult: `#Statele #89 X/6 (71%)
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
https://statele.teuteuf.fr`,
    expectedScore: "71% bonus 0/6",
    expectedDetailedScore: {
      attempts: 6,
      attemptsOver: 6,
      percentage: 71,
      bonuses: 0,
      bonusesOver: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "statele",
    rawResult: `#Statele #89 1/6 (100%)
🟩🟩🟩🟩🟩🎉
https://statele.teuteuf.fr`,
    expectedScore: "1/6 bonus 0/6",
    expectedDetailedScore: {
      attempts: 1,
      attemptsOver: 6,
      percentage: 100,
      bonuses: 0,
      bonusesOver: 6,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "statele",
    rawResult: `#Statele #89 X/6 (71%)
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
⭐
https://statele.teuteuf.fr`,
    expectedScore: "71% bonus 1/6",
    expectedDetailedScore: {
      attempts: 6,
      attemptsOver: 6,
      percentage: 71,
      bonuses: 1,
      bonusesOver: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "statele",
    rawResult: `#Statele #89 X/6 (71%)
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
⭐⭐
https://statele.teuteuf.fr`,
    expectedScore: "71% bonus 2/6",
    expectedDetailedScore: {
      attempts: 6,
      attemptsOver: 6,
      percentage: 71,
      bonuses: 2,
      bonusesOver: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "statele",
    rawResult: `#Statele #89 X/6 (71%)
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
⭐🪙
https://statele.teuteuf.fr`,
    expectedScore: "71% bonus 2/6",
    expectedDetailedScore: {
      attempts: 6,
      attemptsOver: 6,
      percentage: 71,
      bonuses: 2,
      bonusesOver: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "statele",
    rawResult: `#Statele #89 X/6 (71%)
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
🟩🟩🟩🟨⬜⬅️
⭐⭐⭐📏🏙️🪙
https://statele.teuteuf.fr`,
    expectedScore: "71% bonus 6/6",
    expectedDetailedScore: {
      attempts: 6,
      attemptsOver: 6,
      percentage: 71,
      bonuses: 6,
      bonusesOver: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "statele",
    rawResult: `#Statele #91 1/6 (100%)
🟩🟩🟩🟩🟩🎉
⭐⭐⭐📏🏙️🪙
https://statele.teuteuf.fr`,
    expectedScore: "1/6 bonus 6/6",
    expectedDetailedScore: {
      attempts: 1,
      attemptsOver: 6,
      percentage: 100,
      bonuses: 6,
      bonusesOver: 6,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "sutom",
    rawResult: `#SUTOM #425 3/6

🟥🟦🟡🟦🟦🟡
🟥🟥🟦🟦🟦🟥
🟥🟥🟥🟥🟥🟥

https://sutom.nocle.fr`,
    expectedScore: "3/6",
    expectedDetailedScore: { attempts: 3, over: 6, result: TurnResultEnum.WON },
  },
  {
    parserClass: "sutom",
    rawResult: `#SUTOM #425 -/6

🟥🟦🟡🟦🟦🟡
🟥🟦🟡🟦🟦🟡
🟥🟦🟡🟦🟦🟡
🟥🟦🟡🟦🟦🟡
🟥🟦🟡🟦🟦🟡
🟥🟦🟡🟦🟦🟡

https://sutom.nocle.fr`,
    expectedScore: "",
    expectedDetailedScore: {
      attempts: 6,
      over: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "tusmo-series",
    rawResult: `🇫🇷 TUSMO (@tusmo_xyz) Suite de mots #395

6 lettres ✅  - 🔴🔴🔴🔴
7 lettres ✅  - 🔴🔴🔴🔴
8 lettres ✅  - 🔴🔴🔴🔴🔴
9 lettres ✅  - 🔴🔴

https://www.tusmo.xyz`,
    expectedScore: "4 / 4",
    expectedDetailedScore: {
      words: 4,
      over: 4,
      attempts: 15,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "tusmo-series",
    rawResult: `🇫🇷 TUSMO (@tusmo_xyz) Suite de mots #395

6 lettres ✅  - 🔴🔴🔴🔴🔴
7 lettres ✅  - 🔴🔴
8 lettres ❌ 
9 lettres ❌ 

https://www.tusmo.xyz`,
    expectedScore: "2 / 4",
    expectedDetailedScore: {
      words: 2,
      over: 4,
      attempts: 7,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "tusmo-word",
    rawResult: `🇫🇷 TUSMO (@tusmo_xyz) #402 - 3/6

🟥🟨⬛️⬛️🟨⬛️⬛️🟥
🟥🟥⬛️🟨🟨🟨⬛️⬛️
🟥🟥🟥🟥🟥🟥🟥🟥

https://www.tusmo.xyz`,
    expectedScore: "3/6",
    expectedDetailedScore: { attempts: 3, over: 6, result: TurnResultEnum.WON },
  },
  {
    parserClass: "tusmo-word",
    rawResult: `🇫🇷 TUSMO (@tusmo_xyz) #402 

🟥🟨⬛️⬛️🟨⬛️⬛️🟥
🟥🟨⬛️⬛️🟨⬛️⬛️🟥
🟥🟨⬛️⬛️🟨⬛️⬛️🟥
🟥🟨⬛️⬛️🟨⬛️⬛️🟥
🟥🟨⬛️⬛️🟨⬛️⬛️🟥
🟥🟨⬛️⬛️🟨⬛️⬛️🟥

https://www.tusmo.xyz`,
    expectedScore: "",
    expectedDetailedScore: {
      attempts: 6,
      over: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "unlockle",
    rawResult: `Unlockle 381 6/6*

⚪⚪🟢🟡⚪
🟡🟡🟡🟢⚪
🟡🟡🟡🟡🟡
🟢🟡🟡🟡🟢
🟢🟡🟡🟡🟢
🟢🟢🟢🟢🟢

@unlockle https://unlockle.app`,
    expectedScore: "6/6",
    expectedDetailedScore: { attempts: 6, over: 6, result: TurnResultEnum.WON },
  },
  {
    parserClass: "unlockle",
    rawResult: `Unlockle 381 X/6*

⚪⚪🟢🟡⚪
⚪⚪🟢🟡⚪
⚪⚪🟢🟡⚪
⚪⚪🟢🟡⚪
⚪⚪🟢🟡⚪
⚪⚪🟢🟡⚪

@unlockle https://unlockle.app`,
    expectedScore: "",
    expectedDetailedScore: {
      attempts: 6,
      over: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "waffle",
    rawResult: `#waffle365 0/5

🟩🟩🟩🟩🟩
🟩⬜🟩⬜🟩
🟩🟩🟩🟩🟩
🟩⬜🟩⬜🟩
🟩🟩🟩🟩🟩

🔥 streak: 13
wafflegame.net`,
    expectedScore: "0/5",
    expectedDetailedScore: { stars: 0, over: 5, result: TurnResultEnum.WON },
  },
  {
    parserClass: "waffle",
    rawResult: `#waffle411 5/5

🟩🟩🟩🟩🟩
🟩⭐🟩⭐🟩
🟩🟩⭐🟩🟩
🟩⭐🟩⭐🟩
🟩🟩🟩🟩🟩

🔥 streak: 1
wafflegame.net`,
    expectedScore: "5/5",
    expectedDetailedScore: { stars: 5, over: 5, result: TurnResultEnum.WON },
  },
  {
    parserClass: "waffle",
    rawResult: `#waffle387 3/5

🟩🟩🟩🟩🟩
🟩⭐🟩⬜🟩
🟩🟩⭐🟩🟩
🟩⬜🟩⭐🟩
🟩🟩🟩🟩🟩

🔥 streak: 7
wafflegame.net`,
    expectedScore: "3/5",
    expectedDetailedScore: { stars: 3, over: 5, result: TurnResultEnum.WON },
  },
  {
    parserClass: "waffle",
    rawResult: `#waffle394 X/5

🟩🟩🟩🟩🟩
🟩⬜⬛⬜🟩
🟩🟩🟩🟩🟩
🟩⬜⬛⬜🟩
🟩🟩🟩🟩🟩

💔 streak: 0
wafflegame.net`,
    expectedScore: "",
    expectedDetailedScore: { stars: 0, over: 5, result: TurnResultEnum.LOST },
  },
  {
    parserClass: "wordle",
    rawResult: `Wordle 599 X/6

🟨🟩🟨⬛⬛
🟨🟨⬛⬛🟨
⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛
⬛🟩🟩🟩⬛
⬛🟩🟩🟩⬛`,
    expectedScore: "",
    expectedDetailedScore: {
      attempts: 6,
      over: 6,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "wordle",
    rawResult: `Wordle 597 6/6

⬛⬛🟨⬛🟨
⬛⬛⬛⬛⬛
⬛🟩🟩⬛⬛
⬛🟩🟩⬛⬛
⬛🟩🟩⬛🟩
🟩🟩🟩🟩🟩`,
    expectedScore: "6/6",
    expectedDetailedScore: { attempts: 6, over: 6, result: TurnResultEnum.WON },
  },
  {
    parserClass: "worldle",
    rawResult: `#Worldle #381 X/6 (96%)
🟩🟩🟨⬛⬛↙️
🟩🟩🟩🟩⬛⬇️
🟩🟩🟩🟨⬛⬇️
🟩🟩🟩🟩🟨⬅️
🟩🟩🟩🟩🟨⬅️
🟩🟩🟩🟩⬛↙️
https://worldle.teuteuf.fr`,
    expectedScore: "96% bonus 0/5",
    expectedDetailedScore: {
      attempts: 6,
      attemptsOver: 6,
      percentage: 96,
      bonuses: 0,
      bonusesOver: 5,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "worldle",
    rawResult: `#Worldle #405 X/6 (95%)
🟩🟩🟨⬜⬜⬅️
🟩🟩🟩🟨⬜⬇️
🟩🟩🟩🟩⬜↘️
🟩🟩🟩🟩🟨⬆️
🟩🟩🟩🟨⬜↘️
🟩🟩🟩🟩⬜⬆️
⭐⭐🏙️
https://worldle.teuteuf.fr`,
    expectedScore: "95% bonus 3/5",
    expectedDetailedScore: {
      attempts: 6,
      attemptsOver: 6,
      percentage: 95,
      bonuses: 3,
      bonusesOver: 5,
      result: TurnResultEnum.LOST,
    },
  },
  {
    parserClass: "worldle",
    rawResult: `#Worldle #395 4/6 (100%)
🟩🟩🟨⬛⬛⬇️
🟩🟩🟩🟩⬛⬇️
🟩🟩🟩🟩🟨➡️
🟩🟩🟩🟩🟩🎉
⭐
https://worldle.teuteuf.fr`,
    expectedScore: "4/6 bonus 1/5",
    expectedDetailedScore: {
      attempts: 4,
      attemptsOver: 6,
      percentage: 100,
      bonuses: 1,
      bonusesOver: 5,
      result: TurnResultEnum.WON,
    },
  },
  {
    parserClass: "worldle",
    rawResult: `#Worldle #394 1/6 (100%)
🟩🟩🟩🟩🟩🎉
⭐⭐⭐🏙️🪙
https://worldle.teuteuf.fr`,
    expectedScore: "1/6 bonus 5/5",
    expectedDetailedScore: {
      attempts: 1,
      attemptsOver: 6,
      percentage: 100,
      bonuses: 5,
      bonusesOver: 5,
      result: TurnResultEnum.WON,
    },
  },
];

// Implement to string to have a clean test output
testDatas.forEach((testData) => {
  testData.toString = function () {
    return `${testData.parserClass} with detailed score ${JSON.stringify(
      testData.expectedDetailedScore
    )}`;
  };
});

describe("Turn parsers", () => {
  it.each<TurnParsersTestData | jest.DoneCallback>(testDatas)(
    "should parse %s",
    (testData: TurnParsersTestData, done: jest.DoneCallback) => {
      import(
        `./${testData.parserClass}/${testData.parserClass}.parser.ts`
      ).then((importData) => {
        const className =
          Object.values<TurnFileConstructorInterface<TurnParserInterface>>(
            importData
          )[0];
        const parser = new className();
        expect(parser.extractScore(testData.rawResult)).toBe(
          testData.expectedScore
        );
        expect(parser.extractDetailedScore(testData.rawResult)).toStrictEqual(
          testData.expectedDetailedScore
        );
        done();
      });
    }
  );
});
