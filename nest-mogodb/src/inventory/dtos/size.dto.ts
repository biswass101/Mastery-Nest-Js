import { IsInt, IsString } from "class-validator";

export class SizeDto  {
    @IsInt()
    h!: number;

    @IsInt()
    w!: number;

    @IsString()
    uom!: string;
}