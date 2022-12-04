import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { mergeMap, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PassportRequest } from 'src/passport-request';
import { GameFinder } from './game-finder.service';
import { TurnService } from './turn.service';
import { TurnDto } from './turn.dto';
import { Turn } from './turn.entity';

@Controller('turns')
export class TurnController {
  constructor(
    private readonly gameFinder: GameFinder,
    private readonly turnService: TurnService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  post(@Req() req: PassportRequest, @Body() turnDto: TurnDto): Observable<Turn> {
    const user = req.user
    const rawResult = turnDto.rawResult
    
    return this.gameFinder.find(rawResult)
      .pipe(
        mergeMap(game => this.turnService.create(user, game, rawResult))
      )
  }
}

