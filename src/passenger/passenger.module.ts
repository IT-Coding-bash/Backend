import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusStopEntity } from './entities/busstop.Entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusStopEntity
    ]),
  ],
  controllers: [],
  providers: [PassengerService,],
  exports: [PassengerService],
})
export class PassengerModule {}
