import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException('An error has occureed', {
          description: 'Could not connect to the database',
        });
      }

      console.log('Error: ', error);
    }
  }

  async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile = userDto.profile ?? {};

      const isExists = await this.userRepository.findOne({
        where: [{ email: userDto.email }, { username: userDto.username }],
      });

      if (isExists) {
        throw new BadRequestException(
          'User with this username/email already existsss',
        );
      }

      let user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException('An error has occureed', {
          description: 'Could not connect to the database',
        });
      }
      throw error;
    }
  }

  async deleteUser(id: number) {
    const isExists = await this.userRepository.findOneBy({ id });
    if (!isExists) throw new NotFoundException('User Nt Found');

    await this.userRepository.delete(id);
    return { msg: 'usr deleted' };
  }

  async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
