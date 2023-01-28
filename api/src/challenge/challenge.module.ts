import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChallengeController } from "./controllers/challenge.controller";
import { Challenge } from "./entities/challenge.entity";
import { ChallengeService } from "./services/challenge.service";
import { GameFinder } from "./services/game-finder.service";
import { TurnService } from "./services/turn.service";
import { TurnController } from "./controllers/turn.controller";
import { readdirSync } from "fs";
import { TurnParserConstructorInterface } from "./parsers/turn-parser-constructor.interface";
import { TurnParserInterface } from "./parsers/turn-parser.interface";
import { TurnParserChain } from "./parsers/parser-chain.service";
import { ReintegrateTurnsCommand } from "./commands/reintegrate-turns.command";
import { Game } from "./entities/game.entity";
import { Turn } from "./entities/turn.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, Game, Turn])],
  controllers: [ChallengeController, TurnController],
  providers: [
    ChallengeService,
    GameFinder,
    TurnService,
    TurnParserChain,
    ReintegrateTurnsCommand,
    {
      // This dynamically import in `TURN_PARSERS` token
      // every turn parsers stored in the `parsers` directory
      provide: "TURN_PARSERS",
      useFactory: async () => {
        const parsers: TurnParserInterface[] = [];
        // Find every parser in the directory
        // Check is done on `.js` files because this is done on runtime
        const files = readdirSync(`${__dirname}/parsers`).filter((fn) =>
          fn.endsWith("parser.js")
        );
        files.forEach(
          async (file) =>
            await import(`${__dirname}/parsers/${file}`).then((importData) => {
              // Extract class name, and assume that is an instance of `TurnParserConstructorInterface`
              // so TypeScript allows the dynamic new below.
              const className =
                Object.values<TurnParserConstructorInterface>(importData)[0];
              parsers.push(new className());
            })
        );
        return parsers;
      },
    },
  ],
})
export class ChallengeModule {}
