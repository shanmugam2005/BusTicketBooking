import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { routeModel, routeSchema } from './schema/route.schema';
import { routeService } from './route.service';
import { routeResolver } from './route.resolver';


@Module({
  imports:[MongooseModule.forFeature([{
    name:routeSchema.name,schema:routeModel
  }])],
  providers: [routeResolver,routeService],
  exports:[routeService]
})
export class routeModule {}
