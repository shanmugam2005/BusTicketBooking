import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class srcDest{
    @Field(type=>String)
    srcDestId:string
    @Field(type=>String)
    from:string;
    @Field(type=>String)
    to:string;
}