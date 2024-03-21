import { Get, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BusService } from './bus.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Bus')
@Controller('bus')
export class BusController {
    constructor(
        private readonly busService: BusService,
    ) {}

    @ApiOperation({ summary: '버스노선 검색' })
    @ApiCreatedResponse({ description: '버스노선 검색' })
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'number', required: true, description: '버스 번호' })
    @Get('/busline/search')
    async searchBusLine() {
        return await this.busService.searchBusLine('남영역');
    }

    @ApiOperation({ summary: '버스 정류장 탑승 검색'})
    @ApiCreatedResponse({ description: '버스 정류장 탑승 검색'})
    @UseGuards(AuthGuard('jwt'))
    @Get('/busstop/board/:id')
    async getBusStop(id: string) {
        return await this.busService.getBusStop(id);
    }

    @ApiOperation({ summary: '버스 정류장 통과'})
    @ApiCreatedResponse({ description: '버스 정류장 통과'})
    @UseGuards(AuthGuard('jwt'))
    @Post('/busstop/board/:id')
    async passBusStop(id: string) {
        return await this.busService.passBusStop(id);
    }
}
