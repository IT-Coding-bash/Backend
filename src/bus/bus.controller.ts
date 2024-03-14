import { Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BusService } from './bus.service';

@ApiTags('Bus')
@Controller('bus')
export class BusController {
    constructor(
        private readonly busService: BusService,
    ) {}

    @ApiOperation({ summary: '버스노선 검색' })
    @ApiCreatedResponse({ description: '버스노선 검색' })
    @Get('/busline/search')
    async searchBusLine() {
        return 'BusLine Search';
    }

    @ApiOperation({ summary: '버스 정류장 탑승 검색'})
    @ApiCreatedResponse({ description: '버스 정류장 탑승 검색'})
    @Get('/busstop/board/:id')
    async getBusStop(id: string) {
        return await this.busService.getBusStop(id);
    }

    @ApiOperation({ summary: '버스 정류장 통과'})
    @ApiCreatedResponse({ description: '버스 정류장 통과'})
    @Post('/busstop/board/:id')
    async passBusStop(id: string) {
        return await this.busService.passBusStop(id);
    }
}
