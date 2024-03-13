import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    type: string;

    @Column()
    value: string;
}