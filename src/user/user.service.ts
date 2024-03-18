import { HttpException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/userEntity';
import { getRepository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectEntityManager()
        private entityManager,
        private userEntity: UserEntity
    ) {}

    async findById(id: string) {
        const user = this.entityManager.findOne(UserEntity, { id });

        if(!user) {
            return new HttpException(`User with ID ${id} not found.`, 404);
        }

        return user;
    }



}
