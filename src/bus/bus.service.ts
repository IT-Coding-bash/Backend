import { HttpException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { getBusStopId } from 'src/lib/businfo';
import { BusStopEntity } from 'src/passenger/entities/busstop.Entity';

@Injectable()
export class BusService {
    constructor(
        @InjectEntityManager()
        private entityManager,
    ) {}

    async searchBusLine(number: string) {
        return getBusStopId(number);
    }

    async getBusStop(id : string) {
        let busStopInfo = await this.entityManager.find(BusStopEntity, {
            select: ["count", "type"],
            where: { busstop_id: id}
        });

        if(!busStopInfo){
            return new HttpException(`BusStop with ID ${id} not found.`, 404);
        }
    }

    async passBusStop(id: string) {
        let busstop = await this.entityManager.findOne(BusStopEntity,{
            where: {
                busstop_id: id
            }
        });
        
        if(!busstop) {
            return new HttpException(`BusStop with ID ${id} not found.`, 404);
        }

        busstop.count = 0;
        busstop.type = "없음";

        await this.entityManager.save(busstop);
    }
}
