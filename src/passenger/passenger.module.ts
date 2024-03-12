import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';

@Module({
  providers: [PassengerService]
})
export class PassengerModule {}
