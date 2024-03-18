import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/userEntity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    UserEntity
  ],
  exports: [AuthService],
})
export class AuthModule {}
