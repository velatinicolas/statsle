import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { Challenge } from "../entities/challenge.entity";

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>
  ) {}

  get(identifier: number): Observable<Challenge | null> {
    return from(this.challengeRepository.findOneBy({ identifier }));
  }

  getAll(): Observable<Challenge[]> {
    return from(this.challengeRepository.find());
  }

  create(name: string, url: string): Observable<Challenge> {
    const challenge = this.challengeRepository.create({ name, url });

    return from(this.challengeRepository.save(challenge));
  }
}
