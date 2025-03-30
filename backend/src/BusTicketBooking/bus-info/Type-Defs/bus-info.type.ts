import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ObjectType()
export class busInfoType{
    @Field(type=>String)
    BusNumber:string;
    @Field(type => String)
    Brand:string;
    @Field(type=>String)
    Date:string;
    @Field(type=>ID)
    srcDestID
    @Field(type=>ID)
    routeID
}