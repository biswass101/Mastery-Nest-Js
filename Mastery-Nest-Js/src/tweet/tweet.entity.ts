
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Hashtag } from "../hashtags/hashtag.entity";

@Entity()
export class Tweet {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
        nullable: false
    })
    text: string

    @Column({
        type: 'text',
        nullable: true
    })
    image: string

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.tweets, { eager: true })
    user: User

    @ManyToMany(() => Hashtag, (hashtag) => hashtag.tweets, { eager: true })
    @JoinTable()
    hashtags: Hashtag[]
    
}