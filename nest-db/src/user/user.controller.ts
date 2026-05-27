import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post() 
    async createUser() {
        return this.userService.createUser();
    }   

    @Get() 
    async getUsers() {
        return this.userService.findAll();
    }
}
