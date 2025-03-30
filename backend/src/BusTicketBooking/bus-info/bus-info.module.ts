import { Module } from '@nestjs/common';
import { BusInfoResolver } from './bus-info.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BusInfoSchema, BusModel } from './schema/bus-info.schema';
import { BusInfoService } from './bus-info.service';
import { SourceDestinationModule } from '../source_destination/source_destination.module';
import { routeModule } from '../route/route.module';

@Module({
  imports:[MongooseModule.forFeature([{
    name:BusInfoSchema.name,schema:BusModel
  }]),SourceDestinationModule,routeModule],
  providers: [BusInfoResolver,BusInfoService],
  exports:[BusInfoService]
})
export class BusInfoModule {}
