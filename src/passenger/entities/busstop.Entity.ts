import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('busstop')
export class BusStopEntity {
    @ApiProperty( { 
        example: '123456',
        description: '버스정류장 ID',
        required: true
    } )
    @PrimaryColumn()
    busstop_id: string;

    @ApiProperty( { 
        example: '역삼역',
        description: '버스정류장 이름',
        required: true
    } )
    @Column()
    name: string;

    @ApiProperty( { 
        example: 0 ,
        description: '버스정류장 탑승 희망 승객 수',
        required: false
    } )
    @Column({ default: 0})
    count: number;

    @ApiProperty({ 
        example: '없음',
        description: '버스정류장 탑승 희망 승객 장애 유형',
        required: false
    })
    @Column( { default: "없음"})
    type: string;
}