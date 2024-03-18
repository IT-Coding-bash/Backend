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
        
    ) {}

}
