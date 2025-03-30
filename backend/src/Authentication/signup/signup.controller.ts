import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { SignupService } from './signup.service';
import { userSchema } from '../Schemas/user.schema';
@UsePipes(new ValidationPipe())
@Controller('signup')
export class SignupController {
    constructor(private signupService:SignupService){}
    @Post()
    async create(@Body() userDetails: userDto){
        return this.signupService.create(userDetails)
    }
}
