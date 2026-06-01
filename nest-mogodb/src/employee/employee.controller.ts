import { Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) {}

    @Post()
    async createEmployee() {
        return this.employeeService.createEmployee();
    }

    @Get()
    async getAll() {
        return this.employeeService.findAll();
    }
}
