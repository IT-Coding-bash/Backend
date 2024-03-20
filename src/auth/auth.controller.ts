import { Get, HttpCode, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
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
            req.user.kakaoId.toString()
            );
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.cookie('isLoggedIn', true, { httpOnly: false });

        return res.redirect(process.env.KAKAO_REDIRECT_URI);
    }

    @ApiOperation({ summary: '로그아웃' })
    @ApiCreatedResponse({ description: '로그아웃' })
    @UseGuards(AuthGuard('jwt'))
    @Get('/logout')
    async logout(@Req() req: Request, @Res() res: Response){
        const refreshToken = req.cookies.refreshToken;

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('isLoggedIn');
        
        return this.authService.logout(refreshToken);
    }

    @ApiOperation({ summary: '카카오 토큰 재발급' })
    @ApiCreatedResponse({ description: '카카오 토큰 재발급' })
    @Get('/kakao/refresh')
    @HttpCode(200)
    async refresh(@Req() req: Request, @Res() res: Response) {
        try {
            const newAccessToken = await this.authService.refresh(
              req.cookies.refreshToken,
            );
            res.cookie('accessToken', newAccessToken, {
              httpOnly: true,
            });
            return res.send();
          } catch (err) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.clearCookie('isLoggedIn');
            throw new UnauthorizedException();
          }
    }

    @ApiOperation({ summary: '로그인 테스트' })
    @ApiCreatedResponse({ description: '로그인 테스트' })
    @UseGuards(AuthGuard('jwt'))
    @Get('/test')
    async test(@Req() req: Request) {
        console.log(req.user.userId) //debugging
        return req.user;
    }
}
