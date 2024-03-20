import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

ConfigModule.forRoot();
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({	// 여기 적어준 정보를 가지고 카카오 서버에 POST /oauth/token 요청이 날아갑니다.
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: '',
      callbackURL: `${process.env.BACKEND_URL}/auth/kakao/`,
    });
  }

  async validate(	// POST /oauth/token 요청에 대한 응답이 담깁니다.
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      const { _json } = profile;
      const user = {
        kakaoId: _json.id,
        name: _json.kakao_account.profile.nickname,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}