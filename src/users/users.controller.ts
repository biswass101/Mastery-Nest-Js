import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { GetUserParamDto } from "./dtos/get-user-param.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller('users') //users url
export class UsersController {
    constructor(private usersService: UsersService) {}
   
    @Get()
    getAllusers() {
        return this.usersService.getAllUsers();
    }
 
    @Post() // Post routing decorator
    createUser(@Body() user: CreateUserDto) {
       return this.usersService.createUser(user);
    }


    @Patch()
    updateUser(@Body() user: UpdateUserDto) {
        console.log(user);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}