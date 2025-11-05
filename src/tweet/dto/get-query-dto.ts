import { IsDate, IsOptional } from "class-validator";
import { PaginationQueryDto } from "../../common/pagination/dto/pagination-query.dto";
import { IntersectionType } from "@nestjs/mapped-types";

class GetTweetBaseDto {
    @IsOptional()
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @IsDate()
    endDate?: Date;
}

export class GetTweetQueryDto extends IntersectionType(
    GetTweetBaseDto,
    PaginationQueryDto
) {} 