
import { InputType, Field } from '@nestjs/graphql';

@InputType() 
export class routeInput {
    @Field(()=>String)
    routeID:string;
    @Field(()=>[String]) 
    path:[string]
}
