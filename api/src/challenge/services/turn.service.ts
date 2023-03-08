import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { catchError, from, map, mergeMap, Observable, tap } from "rxjs";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { TurnParserInterface } from "../parsers/turn-parser.interface";
import { TurnResultEnum } from "../enums/turn-result.enum";
import { TurnsDto } from "../dtos/turns.dto";
import { Turn } from "../entities/turn.entity";
import { Game } from "../entities/game.entity";

@Injectable()
export class TurnService {
  private readonly logger = new Logger(TurnService.name);

  constructor(
    @InjectRepository(Turn) private readonly turnRepository: Repository<Turn>
  ) {}

  create(
    user: User,
    game: Game,
    rawResult: string,
    turnParser: TurnParserInterface
  ): Observable<Turn> {
    return from(
      this.turnRepository.findOne({
        relations: ["user", "game", "game.challenge"],
        where: {
          user: { username: user.username },
          game: { identifier: game.identifier },
        },
      })
    ).pipe(
      tap((turn) => {
        if (turn && !game.challenge.replayable) {
          throw new ConflictException("You already played this game!");
        }
      }),
      map((turn) => {
        if (!turn) {
          turn = new Turn();
          turn.user = user;
          turn.game = game;
          turn.date = new Date();
        }

        // Raw result is always overwritten
        turn.rawResult = rawResult;

        return turn;
      }),
      mergeMap((turn) =>
        this.calculateScoreAndCombo(turn, turnParser).pipe(
          catchError((error) => {
            this.logger.error(
              `Failed extracting data for user ${turn.user.identifier}, game ${turn.game.identifier}, raw result "${rawResult}": ${error}`
            );
            throw new BadRequestException(
              "Failed saving result, input must be wrong!"
            );
          })
        )
      ),
      mergeMap((turn) => from(this.turnRepository.save(turn)))
    );
  }

  findByUser(user: User, turns?: TurnsDto): Observable<Turn[]> {
    return from(
      this.turnRepository.find({
        relations: ["game", "game.challenge"],
        where: {
          user: {
            identifier: user.identifier,
          },
        },
        order: turns?.orders,
      })
    );
  }

  calculateScoreAndCombo(
    turn: Turn,
    turnParser: TurnParserInterface
  ): Observable<Turn> {
    return this.getLastCombo(turn.user, turn.game).pipe(
      map((lastCombo) => {
        const detailedScore = turnParser.extractDetailedScore(turn.rawResult);
        turn.result = detailedScore.result;
        turn.score = turnParser.extractScore(turn.rawResult);
        turn.detailedScore = detailedScore;
        turn.combo = turn.result === TurnResultEnum.WON ? lastCombo + 1 : 0;

        return turn;
      })
    );
  }

  getLastCombo(user: User, game: Game): Observable<number> {
    return from(
      this.turnRepository.findOne({
        where: {
          user: {
            identifier: user.identifier,
          },
          game: {
            challenge: {
              identifier: game.challenge.identifier,
            },
            number: game.number - 1,
          },
        },
      })
    ).pipe(
      map((lastTurn) => {
        if (!lastTurn) {
          return 0;
        }

        return lastTurn.combo || 0;
      })
    );
  }
}
/*
Cemantle
Cémantix
Duotrigordle
Episode
Framed        OK
Grumble
Nerdle
Numble
Pedantle
Pédantix
Quordle
Sedecorder
Sedecordle
Statele
Sutom
Tusmo mot
Tusmo suite
Unlockle
Waffle
Wordle        OK
Worldle
*/
