import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, mergeMap, Observable, of } from "rxjs";
import { Repository } from "typeorm";
import { Challenge } from "./challenge.entity";
import { Game } from "./game.entity";
import { TurnParserInterface } from "./parsers/turn-parser.interface";

@Injectable()
export class GameFinder {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>
  ) {}

  find(rawResult: string, turnParser: TurnParserInterface): Observable<Game> {
    const challengeName = turnParser.getChallengeName();
    const gameNumber = turnParser.extractGameNumber(rawResult);

    return from(
      this.gameRepository.findOne({
        relations: ["challenge"],
        where: {
          challenge: { name: challengeName },
          number: gameNumber,
        },
      })
    ).pipe(
      mergeMap((game) => {
        if (game) {
          return of(game);
        }

        return from(
          this.challengeRepository.findOneBy({ name: challengeName })
        ).pipe(
          mergeMap((challenge) => {
            if (!challenge) {
              throw new InternalServerErrorException(
                "Challenge not registered!"
              );
            }

            const newGame = new Game();
            newGame.challenge = challenge;
            newGame.number = gameNumber;
            return this.gameRepository.save(newGame);
          })
        );
      })
    );
  }
}
