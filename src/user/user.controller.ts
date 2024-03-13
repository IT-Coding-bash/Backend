import { Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor() {}

    @ApiOperation({ summary: '유저 프로필 불러오기' })
    @ApiCreatedResponse({ description: '유저 프로필 불러오기' })
    @Get('/profile')
    async getUser() {
        return 'Hello User';
    }

    @ApiOperation({ summary: '유저 프로필 수정' })
    @ApiCreatedResponse({ description: '유저 프로필 수정' })
    @Post('profile/edit')
    async editProfile() {
        return 'Profile edited';
    }


}
