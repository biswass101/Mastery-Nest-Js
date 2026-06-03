import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, 
    ){}

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: string) {
        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {
                email
            }
        })
    }

    async findByEmailWithPassword(email: string) {
        return await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', {
                email
            })
            .getOne()
    }

    async create(createUserDto: CreateUserDto) {

        const existingUser = 
            await this.userRepository.findOne({
                where: {
                    email: createUserDto.email,
                },
            });
        
        if(existingUser) {
            throw new ConflictException(
                'Email already exists',
            );
        }

        const user = this.userRepository.create(createUserDto);

        return await this.userRepository.save(user);
    }
}
