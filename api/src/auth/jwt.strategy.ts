import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('JWT_PRIVATE_KEY') private readonly jwtPrivateKey: string) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtPrivateKey,
    });
  }

  async validate(payload: any): Promise<Partial<User>> {
    return { identifier: payload.sub, username: payload.username };
  }
}