import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { PaginationProvider } from '../common/pagination/pagination.provider';
import { HashingProvider } from '../auth/provider/hashing.provider';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { Paginated } from '../common/pagination/pagineter.interface';
import { UserAlreadyExistsException } from '../customExceptions/user-already-exists-exception';
import { isArray } from 'class-validator';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly paginationProvider: PaginationProvider,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider

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

      // hash the password before saving
      let user = this.userRepository.create({
        ...userDto,
        password: await this.hashingProvider.hashPassword(userDto.password)
      });

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


  public async findUserByUserName(username: string): Promise<User | null> {
    let user: User | null = null;

    try {
      user = await this.userRepository.findOneBy({ username });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'User with given username could not be found',
      })
    }

    if(!user) {
      throw new UnauthorizedException(`User does not exist`);
    }

    return user;
  }
}
