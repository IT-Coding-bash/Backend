import { ConfigModule } from "@nestjs/config";
import axios from "axios";
import { BusRouteId } from "src/bus/entities/busRouteId.entity";
import { xmlParser } from "./xmlparser";

ConfigModule.forRoot();
const APIKEY = process.env.API_KEY;
const APIURL = process.env.API_URL;

async function getBusStopId(name: string): Promise<any>{ // 버스 정류장 이름을 받아서 버스 정류장 ID를 조회하는 함수
    const url: string = `${APIURL}rest/stationinfo/getStationByName?serviceKey=${APIKEY}&stSrch=${name}`;
    const response = await axios.get(url);
    if(!response.status){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.data);

    return response.data;
}

async function getBusInfo(id: string): Promise<any> { // 버스 정류장 ID를 받아서 도착 예정 버스 정보를 조회하는 함수
    const url: string = `${APIURL}rest/stationinfo/getStationByUid?serviceKey=${APIKEY}&arsId=${id}`;

    const response = await axios.get(url);
    if(!response.status){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.data);

    return response.data;
}

async function getLowBusInfo(id: string): Promise<any> { // 버스 정류장 ID를 받아서 도착 예정 저상 버스 정보를 조회하는 함수
    const url: string = `${APIURL}rest/stationinfo/getLowStaionByUidList?serviceKey=${APIKEY}&arsId=${id}`;

    const response = await axios.get(url);
    if(!response.status){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.data);

    return response.data;
}

async function getNearbyBusStop(x: string, y: string): Promise<any> { // x, y 좌표를 받아서 주변 버스정류장을 조회하는 함수
    const url: string = `${APIURL}rest/stationinfo/getStationByPos?serviceKey=${APIKEY}&posX=${x}&posY=${y}&radius=100`;

    console.log(url);

    const response = await axios.get(url);
    if(!response.status){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
}

async function getLocationInfo(name: string){ //도착지 이름을 받아서 도착지 경로 정보를 조회하는 함수
    const url: string = `${APIURL}rest/pathinfo/getLocationInfo?serviceKey=${APIKEY}&stSrch=${name}`;

    const response = await axios.get(url);
    if(!response.status){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.data);

    return response.data;
}

async function getBusRoutebyId(id: string): Promise<any> { // 버스 노선 ID를 받아서 버스 노선 정보를 조회하는 함수
    const url: string = `${APIURL}rest/busRouteInfo/getStaionByRoute?serviceKey=${APIKEY}&busRouteId=${id}`;

    const response = await axios.get(url);
    if(!response.status){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = xmlParser(response.data);
    //console.log(data);

    if(!data){
        return new Error('API Error')
    }

    return data;
}

export {
    getBusStopId,
    getBusInfo,
    getLowBusInfo,
    getNearbyBusStop,
    getLocationInfo,
    getBusRoutebyId
}