import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enums/role.enum";
import { Exclude } from "class-transformer";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    email: string;

    @Exclude()
    @Column({
        select: false
    })
    password: string;

    @Column()
    fullName: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.CUSTOMER
    })
    role: Role

    @OneToMany(
        () => Restaurant,
        (restaurant) => restaurant.owner,
    )
    resutaurants: Restaurant[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}