import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class bookTickets{
    @Field(type=>String)
    from:string;
    @Field(type=>String)
    to:string;
    @Field(type=>String)
    clientSecret:string
}