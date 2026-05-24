import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enum';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('user-role')
export class UserRoleController {

    @Get('admin-data')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    getAdminInfo() {
        return "Admin Access granted!";
    }

    @Get('user-data')
    getUserData() {
        return "Anyone can get this access";
    }
}
