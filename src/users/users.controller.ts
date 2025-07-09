import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users') //users url
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get() // Get routing decorator
    // @Query('id')
    getUsers(
        @Query('limit',new DefaultValuePipe(10),  ParseIntPipe) limit: number, 
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        console.log(limit + ' ' + page);
    }
    // :id/:name/:gender
    @Get(':id') // ? means this parameter is optional
    getUserById(@Param('id', ParseIntPipe) id: any) {
       
        return this.usersService.getUserById(id);
    }

    @Post() // Post routing decorator
    createUser() {
        const user = {id: 5, name: 'marry', age: 23, gender: 'female', isMarried: false}
        this.usersService.createUser(user);
        return "A new user has been created!"
    }
}