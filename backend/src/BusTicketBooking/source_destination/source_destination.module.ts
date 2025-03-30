import { Module } from '@nestjs/common';
import { SourceDestinationService } from '../source_destination/source_destination.service';
import { sourDestResolver } from '../source_destination/sourDesResolver';
import { MongooseModule } from '@nestjs/mongoose';
import { srcDestModel, srcDestSchema } from './schema/src-dest.schema';


@Module({
  imports: [ MongooseModule.forFeature([{
      name: srcDestSchema.name, schema: srcDestModel
    }])],
  providers: [sourDestResolver,SourceDestinationService],
  exports:[SourceDestinationService]
})
export class SourceDestinationModule {}
