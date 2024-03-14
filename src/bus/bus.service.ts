import { HttpException, Injectable } from '@nestjs/common';
import { BusStopRepository } from 'src/passenger/entities/busstop.repository';

@Injectable()
export class BusService {
    constructor(
        private busstopEntity: BusStopRepository
    ) {}

    async getBusStop(id : string) {
        let busStopInfo = await this.busstopEntity.find({
            select: ["count", "type"],
            where: { busstop_id: id}
        });

        if(!busStopInfo){
            return new HttpException(`BusStop with ID ${id} not found.`, 404);
        }
    }
}
