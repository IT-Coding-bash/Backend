import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusStopRepository } from 'src/passenger/entities/busstop.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusStopRepository,
    ]),
  ],
  controllers: [],
  providers: [BusService],
  exports: [BusService],
})
export class BusModule {}
