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
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RoleEnum } from "src/user/enums/role.enum";
import { Roles } from "src/user/decorators/roles.decorator";
import { RolesGuard } from "src/user/guards/roles.guard";
import { ChallengeDto } from "../dtos/challenge.dto";
import { ChallengeResource } from "../resources/challenge.resource";
import { ChallengeService } from "../services/challenge.service";

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
