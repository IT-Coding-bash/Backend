import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'busRouteId',
    synchronize: false
})
export class BusRouteId {
    @ApiProperty( { example: '79' } )
    @Column()
    busRouteId: string;

    @ApiProperty( { example: '100100578' } )
    @PrimaryColumn()
    routeid: string;
}