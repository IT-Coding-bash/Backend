import { Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Passenger')
@Controller('passenger')
export class PassengerController {
    constructor() {}

    @ApiOperation({ summary: '가까운 버스정류장 조회' })
    @ApiCreatedResponse({ description: '주변 버스정류장 조회' })
    @Get('/busstop')
    async getnearbyBusStop() {
        return 'Hello BusStop';
    }

    @ApiOperation({ summary: '버스정류장 도착정보 조회' })
    @ApiCreatedResponse({ description: '버스정류장 도착정보 조회' })
    @Get('/busstop/arrival')
    async getBusArrivalInfo() {
        return 'Bus Arrival Info';
    }

    @ApiOperation({ summary: '버스정류장 검색' })
    @ApiCreatedResponse({ description: '버스정류장 검색' })
    @Get('/busstop/search')
    async searchBusStop() {
        return 'BusStop Search';
    }

    @ApiOperation({ summary: '버스노선 검색' })
    @ApiCreatedResponse({ description: '버스노선 검색' })
    @Get('/busline/search')
    async searchBusLine() {
        return 'BusLine Search';
    }

    @ApiOperation({ summary: '탑승 정보 전송' })
    @ApiCreatedResponse({ description: '탑승 정보 전송' })
    @Post('/busstop/board')
    async boardBus() {
        return 'Board Bus';
    }

}
