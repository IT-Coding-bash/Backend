import { HttpException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/userEntity';

@Injectable()
export class UserService {
    constructor(
        @InjectEntityManager()
        private entityManager,
        private userEntity: UserEntity
    ) {}

    async findById(id: string) {
        const user = await this.entityManager.findOne(UserEntity, 
            { where: { id:id } }
        );

        if(!user) {
            return new HttpException(`User with ID ${id} not found.`, 404);
        }

        return user;
    }

    async createUser(kakaoId: string, name: string) {
        const user = new UserEntity();
        user.id = kakaoId;
        user.name = name;
        user.type = 'kakao';
        user.value = 'kakao';
        user.provider = 'kakao';

        await this.entityManager.save(user);

        return user;
    }

    async findByRefreshToken(refreshToken: string) {
        const user = this.entityManager.findOne(UserEntity,
            { refreshToken: refreshToken });
        
        if(!user) {
            return new HttpException('User not found.', 404);
        }
        
        return user;
    }

}
