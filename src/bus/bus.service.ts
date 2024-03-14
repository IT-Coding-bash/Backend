import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusStopRepository } from 'src/passenger/entities/busstop.repository';

@Injectable()
export class BusService {
    constructor(
        @InjectRepository(BusStopRepository)
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

    async passBusStop(id: string) {
        let busstop = await this.busstopEntity.findOne({
            where: {
                busstop_id: id
            }
        });
        if(!busstop) {
            return new HttpException(`BusStop with ID ${id} not found.`, 404);
        }

        busstop.count = 0;
        busstop.type = "없음";

        await this.busstopEntity.save(busstop);
    }
}
