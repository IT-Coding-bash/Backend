import { Get, HttpCode, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @ApiOperation({ summary: '로그인' })
    @ApiCreatedResponse({ description: '로그인' })
    @Get('/login')
    async login() {
        return 'Login';
    }

    @ApiOperation({ summary: '카카오 로그인' })
    @ApiCreatedResponse({ description: '카카오 로그인' })
    @Get('/kakao')
    @UseGuards(AuthGuard('kakao'))
    @HttpCode(301)
    async kakaoLogin(@Req() req: Request, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.authService.getJWT(
            req.user.kakaoId
            );
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.cookie('isLoggedIn', true, { httpOnly: false });

        return res.redirect(process.env.KAKAO_REDIRECT_URI);
    }

    @ApiOperation({ summary: '카카오 callback' })
    @ApiCreatedResponse({ description: '카카오 callback' })
    @Get('/kakao/callback')
    async kakaoCallback() {
        return 'Kakao Callback';
    }

    @ApiOperation({ summary: '로그아웃' })
    @ApiCreatedResponse({ description: '로그아웃' })
    @Get('/logout')
    async logout() {
        return 'Logout';
    }

    @ApiOperation({ summary: '로그인 테스트' })
    @ApiCreatedResponse({ description: '로그인 테스트' })
    @UseGuards(AuthGuard('jwt'))
    @Get('/test')
    async test(@Req() req: Request) {
        console.log(req.user.userId)
        return req.user;
    }
}
