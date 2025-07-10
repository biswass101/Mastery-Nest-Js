import { Profile } from "src/profile/porfile.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

     @Column({
        type: 'varchar',
        nullable: false,
        length: 24,
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 100,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 100
    })
    password: string;

    @OneToOne(() => Profile) //this entity(User) will have the foreign key and 
    // Profile will have the primary key
    @JoinColumn() //joining the table
    profile?: Profile

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}