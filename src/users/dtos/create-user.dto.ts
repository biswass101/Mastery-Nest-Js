import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";

export class CreateUserDto {
   

    @IsString({message: "First name should be a string value"})
    @IsNotEmpty()
    @MinLength(3, {message: "First name  should be at least 3 charcter long"})
    @MaxLength(100)
    firstName: string;

    @IsString({message: "Last name  be a string value"})
    @IsNotEmpty()
    @MinLength(3, {message: "Last should be at least 3 charcter long"})
    @MaxLength(100)
    lastName: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    gender?: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(100)
    password: string

}