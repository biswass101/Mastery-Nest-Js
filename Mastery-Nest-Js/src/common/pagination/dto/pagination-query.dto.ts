import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number) //get the string from the url and convert it to number
    limit?: number = 10;

    @IsOptional()
    @IsPositive()
    @Type(() => Number) //get the string from the url and convert it to number
    page?: number = 1;
}