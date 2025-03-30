import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class srcDestSchema extends Document{
    @Prop({required:true})
    srcDestId:string
    @Prop({ required: true })
    from: string;
    @Prop({ required: true })
    to: string;
}
export const srcDestModel=SchemaFactory.createForClass(srcDestSchema)
