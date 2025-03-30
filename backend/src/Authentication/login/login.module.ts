import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel, userSchema } from '../Schemas/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{
      name:userSchema.name,schema:userModel
    }])],
  controllers: [LoginController],
  providers: [LoginService],
  exports:[LoginService]
})
export class LoginModule {}
