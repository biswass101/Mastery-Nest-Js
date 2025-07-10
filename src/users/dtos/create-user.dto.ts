import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";

export class CreateUserDto {
   

    @IsString({message: "First name should be a string value"})
    @IsNotEmpty()
    @MinLength(3, {message: "First name  should be at least 3 charcter long"})
    firstName: string;

    @IsString({message: "Last name  be a string value"})
    @IsNotEmpty()
    @MinLength(3, {message: "Last should be at least 3 charcter long"})
    lastName: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string

}