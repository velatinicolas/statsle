import { Expose, plainToClass } from "class-transformer";

export class ChallengeResource {
  constructor(challenge: Partial<ChallengeResource>) {
    // excludeExtraneousValues MUST be used with all @Expose decorators
    return plainToClass(ChallengeResource, challenge, {
      excludeExtraneousValues: true,
    });
  }

  @Expose()
  identifier: number;

  @Expose()
  name: string;

  @Expose()
  url: string;
}
