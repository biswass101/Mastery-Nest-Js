import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number) //get the string from the url and convert it to number
    limit?: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number) //get the string from the url and convert it to number
    page: number;
}