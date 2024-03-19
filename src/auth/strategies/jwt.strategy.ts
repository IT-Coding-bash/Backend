import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // controller에 요청이 왔을 때 constructor가 실행
  constructor() {
    super({	// accessToken 위치
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request.cookies.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    return { userId: payload.userId };
  }
}