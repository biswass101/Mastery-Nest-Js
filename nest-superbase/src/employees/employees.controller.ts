import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { SuperbaseAuthGuard } from 'src/auth/superbase-auth/superbase-auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() body: Partial<Employee>):Promise<Employee> {
    return this.employeesService.create(body);
  }

  @UseGuards(SuperbaseAuthGuard)
  @Get()
  async findAll():Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Get('search')
  async searchEmployee(
    @Query('name') name?: string,
    @Query('department') department?: string
  ):Promise<Employee[]> {
    return this.employeesService.search({ name, department });
  }

  @Get(":id")
  async findOne(@Param('id') id: number):Promise<Employee> {
    return this.employeesService.findOne(id);
  }
}
