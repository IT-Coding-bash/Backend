import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @ApiProperty( { example: '19292' } )
    @PrimaryColumn()
    id: string;

    @ApiProperty( { example: '김현수' } )
    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;

    @ApiProperty( { example: 'password' } )
    @Column({type: 'varchar', length: 100, nullable: true})
    password: string;

    @ApiProperty( { example: '버스' } )
    @Column({type: 'varchar', length: 100, nullable: false})
    type: string;

    @ApiProperty( { example: '79' } )
    @Column({type: 'varchar', length: 100, nullable: false})
    value: string;

    @ApiProperty( { example: '없음' } )
    @Column({type: 'varchar', length: 300, nullable: true})
    refreshToken: string;

    @ApiProperty( { example: 'kakao'})
    @Column({type: 'varchar', length: 100, nullable: false})
    provider: string;
}