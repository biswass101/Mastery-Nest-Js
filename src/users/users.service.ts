import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Profile } from "src/profile/porfile.entity";

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User) 
      private userRepository: Repository<User>,
      
      @InjectRepository(Profile) 
      private profileRepository: Repository<Profile>
   ){}

    async getAllUsers() {
       return await this.userRepository.find()
    }

    async createUser(userDto: CreateUserDto) {

      userDto.profile = userDto.profile ?? {} //profile will always created
      // let profile = this.profileRepository.create(userDto.profile);
      // await this.profileRepository.save(profile);

      let user = this.userRepository.create(userDto);
      // user.profile = profile

      return await this.userRepository.save(user);
    }
}