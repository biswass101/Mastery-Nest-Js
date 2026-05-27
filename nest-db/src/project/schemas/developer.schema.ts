import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Developer extends Document {
    @Prop({ require: true })
    name!: string

    @Prop({ type: [Types.ObjectId], ref: 'Project' })
    projects!: Types.ObjectId[]

}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);