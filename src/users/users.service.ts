import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profile/porfile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async createUser(userDto: CreateUserDto) {
    userDto.profile = userDto.profile ?? {}; //profile will always created
    let user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }
  
  
  async deleteUser(id: number) {
    const isExists = await this.userRepository.findOneBy({id})
    if(!isExists) throw new NotFoundException("User Nt Found")
    
    await this.userRepository.delete(id);
    return {msg: "usr deleted"};
  }

  async findUserById(id: number) {
    return await this.userRepository.findOneBy({id});
  }
}
