import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('restaurants')
export class Restaurant {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    address: string

    @ManyToOne(
        () => User,
        (user) => user.resutaurants
    )
    @JoinColumn({
        name: 'ownerId'
    })
    owner: User;

    @Column({
        nullable: true
    })
    description?: string
}