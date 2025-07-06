import { Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users') //users url
export class UsersController {

    @Get() // Get routing decorator
    getUsers() {
        const usersService = new UsersService();
        return usersService.getAllUsers();
        // return "You made a GET request to get all users!"
    }
    // :id/:name/:gender
    @Get(':id') // ? means this parameter is optional
    getUserById(@Param('id') id: any) {
        const usersService = new UsersService();
        return usersService.getUserById(+id);
    }

    @Post() // Post routing decorator
    createUser() {
        const user = {id: 5, name: 'marry', age: 23, gender: 'female', isMarried: false}
        const usersService = new UsersService();
        usersService.createUser(user);
        return "A new user has been created!"
    }
}