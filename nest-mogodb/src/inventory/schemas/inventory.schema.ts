import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Size } from "./size.schema";
import { DbValidationMessageUtil } from "src/common/utils/db-validation-message.util";

@Schema({ timestamps: true })
export class Inventory extends Document {
    @Prop({
        required: [true, DbValidationMessageUtil.required("item")],
        trim: true,
    })
    item!: string;
    
    @Prop({
        required: [true, DbValidationMessageUtil.required("qty")],
        min: [0, DbValidationMessageUtil.minimum("qty", 0)]
    })
    qty!: number;

    @Prop({ type: Size, required: [true, DbValidationMessageUtil.required("size")]})
    size!: Size;

    @Prop({
        required: [true, DbValidationMessageUtil.required("status")]
    })
    status!: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);