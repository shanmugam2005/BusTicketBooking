import { InputType, Field, Float } from '@nestjs/graphql';

@InputType() 
export class ticketInput {
    @Field()
    email:string;
    @Field() 
    from: string;
    @Field() 
    to: string;
}
