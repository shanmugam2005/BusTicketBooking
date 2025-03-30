import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class routeType{
    @Field(()=>String)
    routeID:string
    @Field(()=>[String])
    path:[string];
}