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
import { RoleEnum } from "src/user/role.enum";
import { Roles } from "src/user/roles.decorator";
import { RolesGuard } from "src/user/roles.guard";
import { ChallengeDto } from "./challenge.dto";
import { ChallengeResource } from "./challenge.resource";
import { ChallengeService } from "./challenge.service";

@Controller("challenges")
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get(":identifier")
  get(@Param("identifier") identifier: number): Observable<ChallengeResource> {
    return this.challengeService.get(identifier).pipe(
      map((challenge) => {
        if (challenge === null) {
          throw new NotFoundException();
        }

        return new ChallengeResource(challenge);
      })
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Post()
  post(@Body() challengeDto: ChallengeDto): Observable<ChallengeResource> {
    return this.challengeService
      .create(challengeDto.name, challengeDto.url)
      .pipe(map((challenge) => new ChallengeResource(challenge)));
  }

  @Get()
  getAll(): Observable<ChallengeResource[]> {
    return this.challengeService
      .getAll()
      .pipe(
        map((challenges) =>
          challenges.map((challenge) => new ChallengeResource(challenge))
        )
      );
  }
}
