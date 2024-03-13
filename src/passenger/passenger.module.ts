import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PassengerService],
  exports: [PassengerService],
})
export class PassengerModule {}
