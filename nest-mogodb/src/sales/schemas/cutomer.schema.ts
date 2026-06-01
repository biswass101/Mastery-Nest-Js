import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Customer extends Document {
    @Prop()
    name!: string;

    @Prop()
    age!: number;

    @Prop()
    loyalty!: boolean;
}

export const CustomerShema = SchemaFactory.createForClass(Customer);