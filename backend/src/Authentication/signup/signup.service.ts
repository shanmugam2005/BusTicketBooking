import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userSchema } from '../Schemas/user.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs'
@Injectable()
export class SignupService {
    constructor(@InjectModel(userSchema.name) private userModel:Model<userSchema>){}
    async create(userDetails:userDto){
        const {username,email,password}=userDetails;
        const user=await this.userModel.findOne({email})
        if (user) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);;
        const hashPassword=await bcrypt.hash(password,10);
        const role='user';
        await this.userModel.create({
            username,
            email,
            role,
            password:hashPassword
        })
        return {message:'user successfully added'}
    }
}
