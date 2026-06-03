import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}