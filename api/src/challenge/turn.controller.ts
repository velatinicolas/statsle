import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { mergeMap, Observable } from "rxjs";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PassportRequest } from "src/passport-request";
import { GameFinder } from "./game-finder.service";
import { TurnService } from "./turn.service";
import { TurnDto } from "./turn.dto";
import { Turn } from "./turn.entity";
import { TurnParserChain } from "./parsers/parser-chain.service";

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
  getMyTurns(@Req() req: PassportRequest): Observable<Turn[]> {
    return this.turnService.findByUser(req.user);
  }
}
