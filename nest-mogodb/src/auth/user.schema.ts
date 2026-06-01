import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'users' })
export class AuthUser extends Document {
    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true })
    password!: string;

}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);