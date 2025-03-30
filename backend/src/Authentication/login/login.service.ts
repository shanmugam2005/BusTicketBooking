import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { userModel, userSchema } from '../Schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'




@Injectable()
export class LoginService {
    constructor(@InjectModel(userSchema.name) private Model: Model<userSchema>,
        private jwtService: JwtService
    ) { }
    async getToken(loginDetails: loginDto) {
        const { email, password } = loginDetails;
        const payload = await this.Model.findOne(
            {
                email
            }
        )
        if (!payload) {
            throw new UnauthorizedException("Cannot Have an account")
        }
        const role=payload.role;
        const value = await bcrypt.compare(password, payload.password);
        if (!value) {
            throw new UnauthorizedException("Password is invalid");
        }
        return this.generatedToken(payload._id,role);

    }
    async check(userId){
        return await this.jwtService.sign({ userId })

    }
    async generatedToken(userId,role) {
        const Token = await this.jwtService.sign({ userId,role })
        return { Token }
    }
    async getUserId(email:string){
        const payload=await this.Model.findOne({email});
        console.log(payload,"kdnfkf")
        return payload?._id;
    }
}

