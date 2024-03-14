import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty( { example: 'op@ye0ngjae.com' } )
    @Column()
    email: string;

    @Column()
    type: string;

    @Column()
    value: string;
}