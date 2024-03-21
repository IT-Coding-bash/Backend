import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusStopEntity } from 'src/passenger/entities/busstop.Entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusStopEntity,
    ]),
  ],
  controllers: [],
  providers: [BusService],
  exports: [BusService],
})
export class BusModule {}
