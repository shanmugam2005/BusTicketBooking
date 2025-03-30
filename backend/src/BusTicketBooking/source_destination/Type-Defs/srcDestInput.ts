import { InputType, Field } from '@nestjs/graphql';

@InputType() 
export class srcDestInput {
    @Field()
    srcDestId:string;
    @Field() 
    from: string;
    @Field() 
    to: string;
}
