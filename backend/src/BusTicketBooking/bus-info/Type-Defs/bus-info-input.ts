import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType() 
export class busInfoInput {
        @Field(type=>String)
        BusNumber:string;
        @Field(type => String)
        Brand:string;
        @Field(type=>String)
        Date:Date;
        @Field(type=>Int)
        price:number
        @Field(type=>Int)
        seats:number
        @Field(type=>String)
        srcDestId:string
        @Field(type=>String)
        routeId:string;
}
