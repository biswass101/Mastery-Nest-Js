import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateBookInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    title!: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string

    @Field()
    @IsString()
    @IsNotEmpty()
    author!: string;    
}
