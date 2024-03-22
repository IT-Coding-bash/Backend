import { HttpException, Injectable } from '@nestjs/common';
import { getBusStopId, getNearbyBusStop } from '../lib/businfo';
import { BusStopEntity } from './entities/busstop.Entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { BusRouteId } from 'src/bus/entities/busRouteId.entity';

@Injectable()
export class PassengerService {
    constructor(
        @InjectEntityManager()
        private entityManager,
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

    async searchBusLine(name: string) { // 버스 노선 이름을 받아서 버스 노선 ID를 조회하는 함수
        const routeid = await this.entityManager.findOne(BusRouteId, {
            select: ["routeid"],
            where: { name: name}
            });

        if(!routeid){
            return new HttpException(`BusStop with name ${name} not found.`, 404);
        }

        return routeid  ;
    }

    async leaveBus(id: string) {
        let busstop = await this.entityManager.findOne(BusStopEntity,{
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

        await this.entityManager.save(BusStopEntity, busstop);
    }

    async boardBus(id: string, ptype: string) {
        let busstop = await this.entityManager.findOne(BusStopEntity,{
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

        await this.entityManager.save(busstop);
    }
}
