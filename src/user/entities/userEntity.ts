import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @ApiProperty( { example: '19292' } )
    @PrimaryColumn() nv 
    id: string;

    @ApiProperty( { example: 'password' } )
    @Column()
    password: string;

    @ApiProperty( { example: '버스' } )
    @Column()
    type: string;

    @ApiProperty( { example: '79' } )
    @Column()
    value: string;

    @ApiProperty( { example: '없음' } )
    @Column()
    refreshToken: string;

    @ApiProperty( { example: 'kakao'})
    @Column()
    provider: string;
}