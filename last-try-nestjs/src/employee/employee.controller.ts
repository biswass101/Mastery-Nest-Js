import { Controller, Get } from '@nestjs/common';

@Controller('employee')
export class EmployeeController {
    @Get()
      async getEmployee() {
        return "Employee Data fetched!";
      }
}
