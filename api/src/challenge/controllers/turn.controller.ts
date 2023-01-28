import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { mergeMap, Observable } from "rxjs";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TurnService } from "../services/turn.service";
import { TurnDto } from "../dtos/turn.dto";
import { TurnParserChain } from "../parsers/parser-chain.service";
import { TurnsDto } from "../dtos/turns.dto";
import { GameFinder } from "../services/game-finder.service";
import { PassportRequest } from "src/auth/interfaces/passport-request.interface";
import { Turn } from "../entities/turn.entity";

@Controller()
export class TurnController {
  constructor(
    private readonly gameFinder: GameFinder,
    private readonly turnService: TurnService,
    private readonly turnParserChain: TurnParserChain
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("turns")
  post(
    @Req() req: PassportRequest,
    @Body() turnDto: TurnDto
  ): Observable<Turn> {
    const user = req.user;
    const rawResult = turnDto.rawResult;

    const turnParser = this.turnParserChain.findParserHandling(rawResult);

    return this.gameFinder
      .find(rawResult, turnParser)
      .pipe(
        mergeMap((game) =>
          this.turnService.create(user, game, rawResult, turnParser)
        )
      );
  }

  @UseGuards(JwtAuthGuard)
  @Get("me/turns")
  mine(
    @Req() req: PassportRequest,
    @Query() turnsMine: TurnsDto
  ): Observable<Turn[]> {
    return this.turnService.findByUser(req.user, turnsMine);
  }
}
