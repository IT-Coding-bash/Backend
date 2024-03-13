import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor() {}

    @ApiOperation({ summary: '로그인' })
    @ApiCreatedResponse({ description: '로그인' })
    @Get('/login')
    async login() {
        return 'Login';
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
}
