import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userService.findByEmail(registerDto.email);

        if (existingUser) throw new ConflictException(
            'Email Already Exists!'
        )

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user =
            await this.userService.create(
                {
                    ...registerDto, password: hashedPassword
                }
            )

        return user;
    }


    async login(loginDto: LoginDto) {
        const user = await this.userService.findByEmailWithPassword(
            loginDto.email
        )

        if (!user) {
            throw new UnauthorizedException(
                'Invalid credentials',
            );
        }

        const isPasswordValid =
            await bcrypt.compare(
                loginDto.password,
                user.password
            )
        
        if(!isPasswordValid)
            throw new UnauthorizedException(
                'Invalid credentials'
        )

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        }

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken
        }
    }
}
