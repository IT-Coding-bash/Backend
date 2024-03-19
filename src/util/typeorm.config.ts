import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BusRouteId } from 'src/bus/entities/busRouteId.entity';
import { BusStopEntity } from 'src/passenger/entities/busstop.Entity';
import { UserEntity } from 'src/user/entities/userEntity';

ConfigModule.forRoot();
export const typeORMConfig: TypeOrmModuleOptions = {
    type: "mariadb",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [BusStopEntity, UserEntity, BusRouteId],
    synchronize: true
}