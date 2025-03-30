import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel, userSchema } from '../Schemas/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:userSchema.name,schema:userModel
  }])],
  controllers: [SignupController],
  providers: [SignupService]
})
export class SignupModule {}
