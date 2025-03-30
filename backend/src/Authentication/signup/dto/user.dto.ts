import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class userDto{
    @IsString()
    username:string;
    @IsEmail()
    email:string;
    @IsStrongPassword()
    password:string
}