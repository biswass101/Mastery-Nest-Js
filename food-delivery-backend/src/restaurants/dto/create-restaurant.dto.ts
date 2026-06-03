import { IsOptional, IsString } from "class-validator";

export class CreateRestaurantDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    description?: string;
}