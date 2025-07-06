import { Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users') //users url
export class UsersController {

    @Get() // Get routing decorator
    // @Query('id')
    getUsers(@Query() query: any) {
        const usersService = new UsersService();
        console.log(query.isMarried);
        const isMarried = query.isMarried === 'true';
        if(query.isMarried !== undefined) return usersService.getAllUsers().filter(u => u.isMarried === isMarried);
        return usersService.getAllUsers();
        // return "You made a GET request to get all users!"
    }
    // :id/:name/:gender
    @Get(':id') // ? means this parameter is optional
    getUserById(@Param('id', ParseIntPipe) id: any) {
        const usersService = new UsersService();
        // console.log(typeof(id), id);
        return usersService.getUserById(id);
    }

    @Post() // Post routing decorator
    createUser() {
        const user = {id: 5, name: 'marry', age: 23, gender: 'female', isMarried: false}
        const usersService = new UsersService();
        usersService.createUser(user);
        return "A new user has been created!"
    }
}