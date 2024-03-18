import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/userEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [],
  providers: [
    UserService, 
    UserEntity
  ],
  exports: [UserService],
})
export class UserModule {}
