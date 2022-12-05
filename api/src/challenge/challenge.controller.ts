import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChallengeDto } from "./challenge.dto";
import { Challenge } from "./challenge.entity";
import { ChallengeService } from "./challenge.service";

@Controller("challenges")
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get(":identifier")
  get(@Param("identifier") identifier: number): Observable<Challenge> {
    return this.challengeService.get(identifier).pipe(
      map((challenge) => {
        if (challenge === null) {
          throw new NotFoundException();
        }

        return challenge;
      })
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  post(@Body() challengeDto: ChallengeDto): Observable<Challenge> {
    return this.challengeService.create(challengeDto.name, challengeDto.url);
  }
}
