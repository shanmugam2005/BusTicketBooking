import { Body, Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@UsePipes(new ValidationPipe())
@Controller('login')
export class LoginController {
    constructor(private loginService:LoginService){}
    @Get()
    getToken(@Body()loginDetails:loginDto){
        return this.loginService.getToken(loginDetails);
    }
}
