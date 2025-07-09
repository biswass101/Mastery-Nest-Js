import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";

export class CreateUserDto {
    @IsNumber()
    id: number;

    @IsString({message: "Name should be a string value"})
    @IsNotEmpty()
    @MinLength(3, {message: "Name should be at least 3 charcter long"})
    name: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsEmail()
    email: string;

    @IsBoolean()
    isMarried: boolean;
}