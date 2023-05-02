import { Controller, Get, Param } from "@nestjs/common";
import { mergeMap, Observable } from "rxjs";
import { Turn } from "../entities/turn.entity";
import { GameFinder } from "../services/game-finder.service";
import { TurnService } from "../services/turn.service";

@Controller("games")
export class GameController {
  constructor(
    private readonly gameFinder: GameFinder,
    private readonly turnService: TurnService,
  ) {}

  @Get("/:identifier/turns")
  getGameTurns(@Param("identifier") identifier: number): Observable<Turn[]> {
    return this.gameFinder.find(identifier)
      .pipe(
        mergeMap(game => this.turnService.findByGame(game))
      )
  }
}