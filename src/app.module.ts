import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { BusController } from './bus/bus.controller';
import { BusModule } from './bus/bus.module';
import { PassengerController } from './passenger/passenger.controller';
import { PassengerModule } from './passenger/passenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './util/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule, 
    AuthModule, 
    BusModule, 
    PassengerModule,
    TypeOrmModule.forRoot(typeORMConfig)
  ],
  controllers: [
    AppController, 
    UserController, 
    AuthController, 
    BusController, 
    PassengerController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
