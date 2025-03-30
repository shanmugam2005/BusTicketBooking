import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { routeSchema } from "src/BusTicketBooking/route/schema/route.schema";
import { srcDestSchema } from "src/BusTicketBooking/source_destination/schema/src-dest.schema";

@Schema()
export class BusInfoSchema{
    @Prop({required:true})
    BusNumber:string;
    @Prop({required:true})
    Brand:string;
    @Prop({required:true})
    Date:string;
    @Prop({required:true})
    price:number
    @Prop({required:true})
    seats:number
    @Prop({required:true})
    amount:number
    @Prop({ type: Types.ObjectId, ref: srcDestSchema.name, required: true })
    srcDestID: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: routeSchema.name, required: true })
    routeID: Types.ObjectId;
}
export const BusModel=SchemaFactory.createForClass(BusInfoSchema)
