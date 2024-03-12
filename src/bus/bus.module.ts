import { Module } from '@nestjs/common';
import { BusService } from './bus.service';

@Module({
  providers: [BusService]
})
export class BusModule {}
