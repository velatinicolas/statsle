import { Inject, Injectable } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

@Injectable()
export class EncryptionService {
  constructor(
    @Inject("ENCRYPTION_KEY") private readonly encryptionKey: string
  ) {}

  encrypt(input: string): string {
    const initializationVector = randomBytes(32).toString("base64");
    const cipher = createCipheriv(
      "aes-256-gcm",
      this.encryptionKey,
      initializationVector
    );

    let encrypted = cipher.update(input, "utf8", "base64");
    encrypted += cipher.final("base64");
    encrypted += `:${initializationVector}`;

    return encrypted;
  }

  decrypt(input: string | null): string | null {
    if (!input) {
      return null;
    }

    const initializationVector = input.split(":")[1];
    const decipher = createDecipheriv(
      "aes-256-gcm",
      this.encryptionKey,
      initializationVector
    );

    return decipher.update(input.split(":")[0], "base64", "utf8");
  }

  generatePasswordRecoveryToken(): string {
    return randomBytes(32).toString("base64");
  }
}
