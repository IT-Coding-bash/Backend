import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Bus')
@Controller('bus')
export class BusController {
    constructor() {}

    @ApiOperation({ summary: '버스노선 검색' })
    @ApiCreatedResponse({ description: '버스노선 검색' })
    @Get('/busline/search')
    async searchBusLine() {
        return 'BusLine Search';
    }

    @ApiOperation({ summary: '버스 정류장 탑승 검색'})
    @ApiCreatedResponse({ description: '버스 정류장 탑승 검색'})
    @Get('/busstop/board')
    async searchBusStop() {
        return 'BusStop Search';
    }
}
