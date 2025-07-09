import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";

export class CreateUserDto {
    
    id: number;

    @IsString({message: "Name should be a string value"})
    @IsNotEmpty()
    @MinLength(3, {message: "Name should be at least 3 charcter long"})
    name: string;

    @IsEnum(Gender, {message: "Gender must be: male or female"})
    gender: string;

    @IsEmail()
    email: string;

    
    isMarried: boolean;
}