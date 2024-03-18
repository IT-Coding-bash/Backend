import { ConfigModule } from "@nestjs/config";
import axios from "axios";
import { BusRouteId } from "src/bus/entities/busRouteId.entity";


ConfigModule.forRoot();
const APIKEY = process.env.API_KEY;
const APIURL = process.env.API_URL;

async function getBusStopId(name: string): Promise<any>{
    const url: string = `${APIURL}rest/stationinfo/getStationByName?serviceKey=${APIKEY}&stSrch=${name}`;
    const response = await axios.get(url);
    if(!response.status){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.data);

    return response.data;
}

async function getBusRoutId(number: string): Promise<any> {
    
}

async function getBusInfo(id: string): Promise<any> {
    const url: string = `${APIURL}rest/stationinfo/getStationByUid?serviceKey=${APIKEY}&arsId=${id}`;

    const response = await axios.get(url);
    if(!response.status){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.data);

    return response.data;
}

async function getLowBusInfo(id: string): Promise<any> {
    const url: string = `${APIURL}rest/stationinfo/getLowStaionByUidList?serviceKey=${APIKEY}&arsId=${id}`;

    const response = await axios.get(url);
    if(!response.status){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.data);

    return response.data;
}

export {
    getBusStopId,
    getBusRoutId,
    getBusInfo
}