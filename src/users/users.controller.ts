import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { GetUserParamDto } from "./dtos/get-user-param.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller('users') //users url
export class UsersController {
    constructor(private usersService: UsersService) {}
    // @Get() // Get routing decorator
    // // @Query('id')
    // getUsers(
    //     @Query('limit',new DefaultValuePipe(10),  ParseIntPipe) limit: number, 
    //     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    //     @Param() param: GetUserParamDto,
    // ) {
    //     console.log(param);
    // }

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
}