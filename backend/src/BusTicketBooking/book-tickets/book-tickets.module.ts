import { Module } from '@nestjs/common';
import { BookTicketsService } from './book-tickets.service';
import { BookTicketsResolver } from './book-tickets.resolver';
import { SourceDestinationModule } from '../source_destination/source_destination.module';
import { LoginModule } from 'src/Authentication/login/login.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookTicketSchema, BookTicketSchemaModel } from './schema/bookTicketsSchema';
import { BusInfoModule } from '../bus-info/bus-info.module';
import { StripeGatewayModule } from '../stripe-gateway/stripe-gateway.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: BookTicketSchema.name, schema: BookTicketSchemaModel
  }]), LoginModule, SourceDestinationModule,BusInfoModule,StripeGatewayModule],
  providers: [BookTicketsService, BookTicketsResolver]
  
})
export class BookTicketsModule {}
