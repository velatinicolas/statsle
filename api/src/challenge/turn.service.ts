import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, mergeMap, Observable, tap } from "rxjs";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Game } from "./game.entity";
import { TurnParserInterface } from "./parsers/turn-parser.interface";
import { Turn } from "./turn.entity";

@Injectable()
export class TurnService {
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
      mergeMap(() => {
        const turn = new Turn();
        turn.user = user;
        turn.game = game;
        turn.date = new Date();
        turn.rawResult = rawResult;
        turn.result = turnParser.extractResult(rawResult);
        turn.score = turnParser.extractScore(rawResult);

        return from(this.turnRepository.save(turn));
      })
    );
  }
}
