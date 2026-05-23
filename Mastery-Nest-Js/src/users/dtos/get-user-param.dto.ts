import { IsBoolean, IsOptional } from "class-validator";

export class GetUserParamDto {
    
    @IsBoolean()
    @IsOptional()
    isMarrid: boolean
}