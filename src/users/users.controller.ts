import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";

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
    createUser(@Body() user: CreateUserDto) {
        // const user = {id: 5, name: 'marry', email: 'marry@wedding.com', gender: 'female', isMarried: false}
        // this.usersService.createUser(user);
        return "A new user has been created!"
    }
}