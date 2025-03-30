import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BookTicketSchema } from './schema/bookTicketsSchema';
import { Model } from 'mongoose';
import { ticketInput } from './type-defs/ticketInput';
import { InjectModel } from '@nestjs/mongoose';
import { SourceDestinationService } from '../source_destination/source_destination.service';
import { LoginService } from 'src/Authentication/login/login.service';
import * as nodemailer from 'nodemailer';
import { BusInfoService } from '../bus-info/bus-info.service';
import { StripeGatewayService } from '../stripe-gateway/stripe-gateway.service';
require('dotenv').config(); 
@Injectable()
export class BookTicketsService {
  constructor(
    @InjectModel(BookTicketSchema.name) private bookModel: Model<BookTicketSchema>,
    private srcDestService: SourceDestinationService,
    private loginService: LoginService,
    private busService:BusInfoService,
    private stripeService:StripeGatewayService
  ) { }

  async create(bookTicketInput: ticketInput) {
    const { email, from, to} = bookTicketInput;
    const userId = await this.loginService.getUserId(email);
    if (!userId) throw new UnauthorizedException("Please provide valid UserID information");

    const srcDes = await this.srcDestService.getSourceDestId(from, to);

    if (!srcDes) {
      throw new UnauthorizedException("Please provide valid  SrcDes information");
    }
    const busId = await this.busService.getBusId(srcDes);
    if (!busId) {
      throw new UnauthorizedException("Please provide valid BusId information");
    }
    const amount=busId.amount;
    const busNumber=busId.BusNumber
    const Date=busId.Date;
    const paymentIntent = await this.stripeService.createPaymentIntent(amount, 'usd');
    if (!paymentIntent || !paymentIntent.id) {
      throw new UnauthorizedException("Payment processing failed");
    }
    const clientSecret = paymentIntent.id;
    const val = await this.bookModel.create({
      userId,
      busNumber,
      Date
    });
    await this.sendBookingConfirmationEmail(email, from, to);

    return { from, to,clientSecret };
  }

  private async sendBookingConfirmationEmail(to: string, from: string, toDestination: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth:{
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,}
    });
    const mailOptions = {
      from: process.env.EMAIL, 
      to: to, 
      subject: 'Ticket Booking Confirmation',
      text: `Your ticket has been successfully booked from ${from} to ${toDestination}. Thank you for choosing us!`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Booking confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
