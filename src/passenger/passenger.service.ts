import { HttpException, Injectable } from '@nestjs/common';
import { BusStopRepository } from './entities/busstop.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { getNearbyBusStop } from '../lib/businfo';

@Injectable()
export class PassengerService {
    constructor(
        @InjectRepository(BusStopRepository)
        private busstopEntity: BusStopRepository
    ) {}

    getnearbyBusStop(x: string, y: string) {
        return getNearbyBusStop(x, y);
    }

    getBusArrivalInfo(id: string) {
        return 'Bus Arrival Info';
    }

    searchBusStop() {
        return 'BusStop Search';
    }

    searchBusLine() {
        return 'BusLine Search';
    }

    async leaveBus(id: string) {
        let busstop = await this.busstopEntity.findOne({
            where: {
                busstop_id: id
            }
        });
        if(!busstop) {
            return new HttpException(`BusStop with ID ${id} not found.`, 404);
        }

        busstop.count -= 1;
        if(busstop.count < 0) {
            busstop.count = 0;
        }

        await this.busstopEntity.save(busstop);
    }

    async boardBus(id: string, ptype: string) {
        let busstop = await this.busstopEntity.findOne({
            where: {
                busstop_id: id
            }
        });
        if(!busstop) {
            return new HttpException(`BusStop with ID ${id} not found.`, 404);
        }

        busstop.count += 1;
        if(busstop.type === "없음" || !busstop.type) {
            busstop.type = ptype;
        }
        else {
            busstop.type += `, ${ptype}`;
        }

        await this.busstopEntity.save(busstop);
    }
}
