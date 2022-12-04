import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeController } from './challenge.controller';
import { Challenge } from './challenge.entity';
import { ChallengeService } from './challenge.service';
import { GameFinder } from './game-finder.service';
import { Game } from './game.entity';
import { TurnService } from './turn.service';
import { GrumbleParser } from './grumble.parser';
import { Turn } from './turn.entity';
import { TurnController } from './turn.controller';
import { TusmoWordParser } from './tusmo-word.parser';
import { TurnParserChain } from './parser-chain.service';
import { TusmoSeriesParser } from './tusmo-series.parser';

@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge, Game, Turn]),
  ],
  controllers: [ChallengeController, TurnController],
  providers: [
    ChallengeService,
    GameFinder,
    TurnService,
    TurnParserChain,
    GrumbleParser,
    TusmoWordParser,
    TusmoSeriesParser,
    {
      provide: 'TURN_PARSERS',
      useFactory: (
        grumbleParser: GrumbleParser,
        tusmoWordParser: TusmoWordParser,
        tusmoSeriesParser: TusmoSeriesParser,
      ) => [
        grumbleParser,
        tusmoWordParser,
        tusmoSeriesParser,
      ],
      inject: [
        GrumbleParser,
        TusmoWordParser,
        TusmoSeriesParser,
      ],
    },
  ],
})
export class ChallengeModule {}
