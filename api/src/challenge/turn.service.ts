import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { catchError, from, map, mergeMap, Observable, tap } from "rxjs";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Game } from "./game.entity";
import { TurnParserInterface } from "./parsers/turn-parser.interface";
import { TurnResultEnum } from "./turn-result.enum";
import { Turn } from "./turn.entity";
import { TurnsDto } from "./turns.dto";

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
      this.turnRepository.findOneBy({
        user: { username: user.username },
        game: { identifier: game.identifier },
      })
    ).pipe(
      tap((turn) => {
        if (turn) {
          throw new ConflictException("You already played this game!");
        }
      }),
      map(() => {
        const turn = new Turn();
        turn.user = user;
        turn.game = game;
        turn.date = new Date();
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
        turn.result = turnParser.extractResult(turn.rawResult);
        turn.score = turnParser.extractScore(turn.rawResult);
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
