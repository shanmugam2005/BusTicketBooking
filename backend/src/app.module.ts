import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SourceDestinationModule } from './BusTicketBooking/source_destination/source_destination.module';
import { LoginModule } from './Authentication/login/login.module';
import { SignupModule } from './Authentication/signup/signup.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { BusInfoModule } from './BusTicketBooking/bus-info/bus-info.module';
import { routeModule } from './BusTicketBooking/route/route.module';
import { BookTicketsModule } from './BusTicketBooking/book-tickets/book-tickets.module';
import { TicketNotificationService } from './BusTicketBooking/CronJob/notify.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BookTicketSchema, BookTicketSchemaModel } from './BusTicketBooking/book-tickets/schema/bookTicketsSchema';
import { userSchema,userModel } from './Authentication/Schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      context: ({ req }) => ({ req }),
      playground: true,
    }), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global:true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: BookTicketSchema.name, schema: BookTicketSchemaModel }]),
    MongooseModule.forFeature([
      { name: userSchema.name, schema: userModel },
    ]),
    ScheduleModule.forRoot(),
    SourceDestinationModule,
    BusInfoModule,
    routeModule,
    LoginModule,
    SignupModule,
    BookTicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TicketNotificationService],
})
export class AppModule { }
