import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChallengeController } from "./controllers/challenge.controller";
import { Challenge } from "./entities/challenge.entity";
import { ChallengeService } from "./services/challenge.service";
import { GameFinder } from "./services/game-finder.service";
import { TurnService } from "./services/turn.service";
import { TurnController } from "./controllers/turn.controller";
import { TurnParserChain } from "./parsers/turn-parser-chain.service";
import { ReintegrateTurnsCommand } from "./commands/reintegrate-turns.command";
import { Game } from "./entities/game.entity";
import { Turn } from "./entities/turn.entity";
import { provideTurnParsers, provideTurnsSorters } from "./parsers/provide-turn-files.helper";
import { GameController } from "./controllers/game.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, Game, Turn])],
  controllers: [ChallengeController, TurnController, GameController],
  providers: [
    ChallengeService,
    GameFinder,
    TurnService,
    TurnParserChain,
    TurnsSorterChain,
    ReintegrateTurnsCommand,
    provideTurnParsers(),
    provideTurnsSorters(),
  ],
})
export class ChallengeModule {}
