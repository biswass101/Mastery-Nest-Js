import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTweetDto {

    @IsNotEmpty()
    @IsString()
    text: string

    @IsString()
    @IsOptional()
    image?: string

    @IsNotEmpty()
    @IsInt()
    userId: number
}