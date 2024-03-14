import { EntityRepository, Repository } from "typeorm";
import { BusStopEntity } from "./busstop.Entity";

    @EntityRepository(BusStopEntity)
    export class BusStopRepository extends Repository<BusStopEntity> {
        
    }