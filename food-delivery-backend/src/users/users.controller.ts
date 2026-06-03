import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { ParseUuidPipe } from 'src/common/pipes/parse-uuid.pipe';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) {}

    @Get()
    getAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    getOne(@Param('id', ParseUuidPipe) id: string) {
        return this.userService.findOne(id);
    }

    @Get('admin')
    @UseGuards(
        JwtAuthGuard,
        RolesGuard
    )
    @Roles(Role.ADMIN)
    adminOnly() {
        return "Admin Area";
    }

    @Post()
    create(
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.userService.create(createUserDto);
    }
}
