import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";


@Schema()
@ObjectType()
export class Book extends Document {
    @Field(() => ID)
    declare readonly _id: Types.ObjectId;

    @Prop({ required: true })
    @Field()
    title!: string

    @Prop()
    @Field({ nullable: true })
    description?: string;

    @Prop()
    @Field()
    author!: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);