import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>
    ) { }

    async create(employeeData: Partial<Employee>): Promise<Employee> {
        const employee = this.employeeRepository.create(employeeData);
        return this.employeeRepository.save(employee);
    }

    async findAll(): Promise<Employee[]> {
        return await this.employeeRepository.find();
    }

    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy({id});

        if(!employee) throw new NotFoundException(`Employe with id ${id} not found!`);

        return employee;
    }

    async search(filters: {name?: string; department?: string}): Promise<Employee[]> {
        const query = this.employeeRepository.createQueryBuilder('employee');

        if(filters.name) {
            query.andWhere('employee.name ILIKE :name', {name: `%${filters.name}%`})
        }

        if(filters.department) {
            query.andWhere('employee.department = :department', { department: filters.department })
        }

        return query.getMany();
    }

}
