import {  IsDefined, IsInt, IsString, ValidateNested } from "class-validator";
import { SizeDto } from "./size.dto";
import { Type } from "class-transformer";

export class CreateInventoryDto  {

    @IsString()
    item!: string

    @IsInt()
    qty!: number

    @ValidateNested()
    @Type(() => SizeDto)
    size!: SizeDto

    @IsDefined()
    @IsString()
    status!: string
}