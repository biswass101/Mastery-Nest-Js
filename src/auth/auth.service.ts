import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from '../users/users.service'; 
import authConfig from './config/auth.config';
import { CreateUserDto } from '../users/dtos/create-user.dto'; 
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userServicce: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig> ,

        private readonly hasingProvider: HashingProvider
    ) {}

    async login(loginDto: LoginDto) {
        let user = await this.userServicce.findUserByUserName(loginDto.username);

        let isEqual: boolean = false;

        isEqual = await this.hasingProvider.comparePassword(loginDto.password, user?.password as string)

        if(!isEqual) {
            throw new UnauthorizedException("Incorrect Password")
        }   

        return {
            data: user,
            success: true,
            message: 'User logged in successfully!'
        };
    }

    public async signup(createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return await this.userServicce.createUser(createUserDto)
    }
}
