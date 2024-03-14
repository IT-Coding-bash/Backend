import { Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerService } from './passenger.service';

@ApiTags('Passenger')
@Controller('passenger')
export class PassengerController {
    constructor(
        private readonly passengerService: PassengerService,
    ) {}

    @ApiOperation({ summary: '가까운 버스정류장 조회' })
    @ApiCreatedResponse({ description: '주변 버스정류장 조회' })
    @Get('/busstop')
    async getnearbyBusStop() {
        return await this.passengerService.getnearbyBusStop();
    }

    @ApiOperation({ summary: '버스정류장 도착정보 조회' })
    @ApiCreatedResponse({ description: '버스정류장 도착정보 조회' })
    @Get('/busstop/arrival/:id')
    async getBusArrivalInfo(id: string) {
        return await this.passengerService.getBusArrivalInfo(id);
    }

    @ApiOperation({ summary: '버스정류장 검색' })
    @ApiCreatedResponse({ description: '버스정류장 검색' })
    @Get('/busstop/search')
    async searchBusStop() {
        return await this.passengerService.searchBusStop();
    }

    @ApiOperation({ summary: '버스노선 검색' })
    @ApiCreatedResponse({ description: '버스노선 검색' })
    @Get('/busline/search')
    async searchBusLine() {
        return await this.passengerService.searchBusLine();
    }

    @ApiOperation({ summary: '탑승 정보 전송' })
    @ApiCreatedResponse({ description: '탑승 정보 전송' })
    @Post('/busstop/board/:id')
    async boardBus(id: string, ptype: string) {
        return await this.passengerService.boardBus(id, ptype);
    }

}
