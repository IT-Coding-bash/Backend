import { Get, Query, Req, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PassengerService } from './passenger.service';
import { AuthGuard } from '@nestjs/passport';
import { getBusRoutebyId } from 'src/lib/businfo';

@ApiTags('Passenger')
@Controller('passenger')
export class PassengerController {
    constructor(
        private readonly passengerService: PassengerService,
    ) {}

    @ApiOperation({ summary: '가까운 버스정류장 조회' })
    @ApiCreatedResponse({ description: '주변 버스정류장 조회' })
    @ApiParam({ name: 'x', required: true, description: 'x좌표' })
    @ApiParam({ name: 'y', required: true, description: 'y좌표' })
    @Get('/busstop')
    async getnearbyBusStop(@Req() req: any){
        return await this.passengerService.getnearbyBusStop(req.query.x, req.query.y);
    }

    @ApiOperation({ summary: '버스정류장 도착정보 조회' })
    @ApiCreatedResponse({ description: '버스정류장 도착정보 조회' })
    @UseGuards(AuthGuard('jwt'))
    @Get('/busstop/arrival')
    @ApiParam({ name: 'id', required: true, description: '정류장 ID' })
    async getBusArrivalInfo(id: string) {
        return await this.passengerService.getBusArrivalInfo(id);
    }

    @ApiOperation({ summary: '버스정류장 검색' })
    @ApiCreatedResponse({ description: '버스정류장 검색' })
    @UseGuards(AuthGuard('jwt'))
    @Get('/busstop/search')
    async searchBusStop() {
        return await this.passengerService.searchBusStop();
    }

    @ApiOperation({ summary: '버스노선 검색' })
    @ApiCreatedResponse({ description: '버스노선 검색' })
    @UseGuards(AuthGuard('jwt'))
    @ApiQuery({ name: 'name', required: true, description: '버스노선 이름' })
    @Get('/busline/search')
    async searchBusLine(@Query('name') name: string){

        const routeid = await this.passengerService.searchBusLine(name);

        return await getBusRoutebyId(routeid.routeid);
    }

    @ApiOperation({ summary: '탑승 정보 전송' })
    @ApiCreatedResponse({ description: '탑승 정보 전송' })
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id', required: true, description: '정류장 ID' })
    @ApiParam({ name: 'ptype', required: true, description: '탑승 유형' })
    @Post('/busstop/board')
    async boardBus(id: string, ptype: string) {
        return await this.passengerService.boardBus(id, ptype);
    }

    @ApiOperation({ summary: '하차 정보 전송' })
    @ApiCreatedResponse({ description: '하차 정보 전송' })
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id', required: true, description: '정류장 ID' })
    @Post('/busstop/leave')
    async leaveBus(id: string) {
        return await this.passengerService.leaveBus(id);
    }

}
