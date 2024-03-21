import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'ROUTE_ID_TB',
    synchronize: false
})
export class BusRouteId {
    @ApiProperty( { example: '79' } )
    @Column()
    name: string;

    @ApiProperty( { example: '100100578' } )
    @PrimaryColumn()
    routeid: string;
}