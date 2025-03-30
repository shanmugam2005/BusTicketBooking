import { IsString, IsStrongPassword } from "class-validator";

export class loginDto{
    @IsString()
    email:string
    @IsStrongPassword()
    password:string
}