import { Injectable, NotFoundException } from "@nestjs/common";
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
       return await this.userRepository.find({
        relations: {
          profile: true
        }
       })
    }

    async createUser(userDto: CreateUserDto) {

      userDto.profile = userDto.profile ?? {} //profile will always created
      let user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    }
    async deleteUser(id: number) {
      const user = await this.userRepository.findOneBy({id});
      if(!user) throw new NotFoundException("User Not Found!");
      
      await this.userRepository.delete(id);
      this.profileRepository.delete(Number(user?.profile?.id));

      return {
        deleted: true
      }
    }
}