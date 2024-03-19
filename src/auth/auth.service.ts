import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import axios from 'axios';
import { UserEntity } from 'src/user/entities/userEntity';
import { UserService } from 'src/user/user.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectEntityManager()
        private entityManager,
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async getJWT(kakaoId: Number){
        const user = await this.kakaoValidateUser(kakaoId);
        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        return { accessToken, refreshToken };
    }

    async kakaoValidateUser(kakaoId: Number): Promise<any> {
        let user: UserEntity;
        await this.userService.findById(kakaoId);

        if(!user){
            user = await this.userService.createUser(kakaoId);
        }
        return user;
    }

    async generateAccessToken(user: UserEntity): Promise<any> {
        const payload = {
            userId: user.id,
        }

        return this.jwtService.sign(payload);
    }

    async generateRefreshToken(user: UserEntity): Promise<any> {
        const payload = {
            userId: user.id,
        }

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,     
            expiresIn: '7d' 
        });

        const saltOrRounds = 10;
        const hashedRefreshToken = await hash(refreshToken, saltOrRounds);

        await this.entityManager.update(UserEntity,
            { id: user.id },
            { refreshToken: hashedRefreshToken }
        );

        return refreshToken;
    }
}
