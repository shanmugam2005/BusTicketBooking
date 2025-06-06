import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class userSchema extends Document{
    @Prop({ required: true })
    username: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    role: string;
    @Prop({ required: true })
    password: string
}
export const userModel=SchemaFactory.createForClass(userSchema)
