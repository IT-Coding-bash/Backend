import { Get, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @ApiOperation({ summary: '유저 프로필 불러오기' })
    @ApiCreatedResponse({ description: '유저 프로필 불러오기' })
    @Get('/profile')
    async getUser() {
        return 'Hello User';
    }

    @ApiOperation({ summary: '유저 프로필 수정' })
    @ApiCreatedResponse({ description: '유저 프로필 수정' })
    @UseGuards(AuthGuard('jwt'))
    @Post('profile/edit')
    async editProfile() {

        //get user id, type, value from cookie

        return this.userService.updateUser('d','d','d');
    }


}
