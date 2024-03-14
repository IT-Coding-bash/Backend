import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusStopRepository } from './entities/busstop.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusStopRepository
    ]),
  ],
  controllers: [],
  providers: [PassengerService,],
  exports: [PassengerService],
})
export class PassengerModule {}
