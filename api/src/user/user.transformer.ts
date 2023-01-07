import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { EncryptionService } from "src/encryption/encryption.service";
import { User } from "./user.entity";
import { UserResource } from "./user.resource";

@Injectable()
export class UserTransformer {
  constructor(private readonly encryptionService: EncryptionService) {}

  transform(entity: User): UserResource {
    const resource = plainToClass(UserResource, entity, {
      excludeExtraneousValues: true,
    });
    resource.email = this.encryptionService.decrypt(entity.email);
    return resource;
  }
}
