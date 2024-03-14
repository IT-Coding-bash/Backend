import { HttpException, Injectable } from '@nestjs/common';
import { BusStopRepository } from './entities/busstop.repository';

@Injectable()
export class PassengerService {
    constructor(
        private busstopEntity: BusStopRepository
    ) {}

    getnearbyBusStop() {
        return 'Hello BusStop';
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
