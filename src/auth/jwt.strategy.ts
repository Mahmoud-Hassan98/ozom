import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: string;
  username: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: { cookies?: { token?: string } }) => {
        if (req && req.cookies) {
          return req.cookies['token'];
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

   validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
      email: payload.email,
    };
  }
}
