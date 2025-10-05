import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userServicce: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig> 
    ) {}

    async login(loginDto: LoginDto) {
        let user = await this.userServicce.findUserByUserName(loginDto.username);

        return user;
    }

    public async signup(createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return await this.userServicce.createUser(createUserDto)
    }
}
