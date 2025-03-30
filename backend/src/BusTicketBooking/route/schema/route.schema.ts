import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class routeSchema{
    @Prop({required:true})
    routeID:string;
    @Prop({require:true})
    path:string[];
}
export const routeModel=SchemaFactory.createForClass(routeSchema)
