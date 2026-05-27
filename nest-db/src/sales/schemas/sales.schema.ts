import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Sales extends Document{
    @Prop()
    item!: string;

    @Prop()
    price!: number;

    @Prop()
    quantity!: number;

    @Prop()
    category!: string;

    @Prop()
    date!: Date

    @Prop({ type: Types.ObjectId, ref: 'Customer'})
    customer_id!: Types.ObjectId
}

export const SalesShema = SchemaFactory.createForClass(Sales);