import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Command, CommandRunner } from "nest-commander";
import { catchError, from, lastValueFrom, map, mergeMap, of } from "rxjs";
import { Repository } from "typeorm";
import { Turn } from "../entities/turn.entity";
import { TurnParserChain } from "../parsers/parser-chain.service";
import { TurnService } from "../services/turn.service";

@Command({ name: "reintegrateTurns", description: "A parameter parse" })
export class ReintegrateTurnsCommand extends CommandRunner {
  private readonly logger = new Logger();

  constructor(
    private readonly turnService: TurnService,
    private readonly turnParserChain: TurnParserChain,
    @InjectRepository(Turn) private readonly turnRepository: Repository<Turn>
  ) {
    super();
  }

  async run(): Promise<void> {
    return lastValueFrom(
      // Save current table, for safety
      from(
        this.turnRepository.query(
          `CREATE TABLE turns_${new Date()
            .toISOString()
            .replace(/\D/g, "")} AS SELECT * FROM turns`
        )
      ).pipe(
        mergeMap(() =>
          from(
            this.turnRepository.find({
              relations: ["game", "user", "game.challenge"],
              order: {
                game: {
                  // Turns are ordered by game number ASC
                  // in order to recalculate the combos properly
                  number: "ASC",
                },
              },
            })
          )
        ),
        mergeMap((turns) => turns),
        mergeMap(
          (turn) =>
            this.turnService
              .calculateScoreAndCombo(
                turn,
                this.turnParserChain.findParserHandling(turn.rawResult)
              )
              .pipe(
                mergeMap((turn) =>
                  from(this.turnRepository.save(turn)).pipe(map(() => void 0))
                )
              ),
          // One at a time, because the combo is calculated based on
          // the turns already stored in database
          1
        ),
        catchError((error) => {
          this.logger.error(error);
          return of(void 0);
        })
      )
    );
  }
}
