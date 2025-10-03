import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserAlreadyExistsException } from 'src/customExceptions/user-already-exists-exception';
import { isArray } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/pagineter.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly paginationProvider: PaginationProvider
  ) {}

  async getAllUsers(paginationQueryDto: PaginationQueryDto): Promise<Paginated<User>> {
    try {
      return await this.paginationProvider.paginateQuery(
        paginationQueryDto,
        this.userRepository,
        null!,
        ['profile']
      );
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException('An error has occureed', {
          description: 'Could not connect to the database',
        });
      }

      console.log('Error: ', error);
      return error;
    }
  }

  async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile = userDto.profile ?? {};

      // const isExists = await this.userRepository.findOne({
      //   where: [{ email: userDto.email }, { username: userDto.username }],
      // });

       const isExistsUserName = await this.userRepository.findOne({
        where: { username: userDto.username },
      });

      if (isExistsUserName) {
        throw new UserAlreadyExistsException(
          'username', userDto.username
        );
      }

      const isExistsEmail = await this.userRepository.findOne({
        where: { email: userDto.email },
      });

      if (isExistsEmail) {
        throw new UserAlreadyExistsException(
          'email', userDto.email
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

  async createManyUsers(users: CreateUserDto[]) {
    if(!isArray(users)) throw new BadRequestException('Array of users expected');
    let usersToSave: User[] = [];
    for (const userDto of users) {
      userDto.profile = userDto.profile ?? {};

      const isExists = await this.userRepository.findOne({
        where: [{ email: userDto.email }, { username: userDto.username }],
      });

      if (isExists) {
        throw new BadRequestException(
          `User with email ${userDto.email} or username ${userDto.username} already exists`,
        );
      }

      let user = this.userRepository.create(userDto);
      usersToSave.push(user);
    }
    return await this.userRepository.save(usersToSave);
  }

  async deleteUser(id: number) {
    const isExists = await this.userRepository.findOneBy({ id });
    if (!isExists) throw new NotFoundException('User Nt Found');

    await this.userRepository.delete(id);
    return { msg: 'usr deleted' };
  }

  async findUserById(id: number) {

    const user = await this.userRepository.findOneBy({ id });

    if(!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `User with id ${id} not found`,
        table: 'user',
        hudai: 'Gu'
      }, HttpStatus.NOT_FOUND, {
        description: 'The user you are looking for does not exist in the database'
      })
    }

    return user;
  }
}
