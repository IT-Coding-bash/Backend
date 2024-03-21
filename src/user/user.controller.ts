import { Get, Req, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Request } from 'express';
import { Controller } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
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
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    description: '수정할 값의 타입'
                },
                value: {
                    type: 'string',
                    description: '수정할 값'
                }
            }
        }
    })
    @Post('profile/edit')
    async editProfile(@Req() req: Request) {
        const id = req.user.userId;
        const type = req.body.type;
        const value = req.body.value;

        return this.userService.updateUser(id, type, value);
    }


}
