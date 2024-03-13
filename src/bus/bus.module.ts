import { Module } from '@nestjs/common';
import { BusService } from './bus.service';

@Module({
  imports: [],
  controllers: [],
  providers: [BusService],
  exports: [BusService],
})
export class BusModule {}
