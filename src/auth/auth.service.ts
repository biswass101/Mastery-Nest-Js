import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UsersService)
        private readonly userServicce: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig> 
    ) {}

    login(email: string, password: string) {
        console.log(this.authConfiguration.sharedSecretKey);
        return {msg: "user logged in"};
    }

    public async signup(createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return await this.userServicce.createUser(createUserDto)
    }
}
