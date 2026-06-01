import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(@InjectModel(AuthUser.name)
    private userModel: Model<AuthUser>,

        private jwtService: JwtService
    ) { }


    async signup(email: string, password: string) {
        const hash = await bcrypt.hash(password, 10);

        console.log(hash);

        const user = await this.userModel.create({ email, password: hash });

        console.log(user);

        return user.save();
    }

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email });

        if(!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return null;

        const payload = {
            email: user.email, sub: user._id
        };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
