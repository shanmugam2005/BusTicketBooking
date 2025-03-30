import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookTicketSchema } from '../book-tickets/schema/bookTicketsSchema';
import { userSchema } from 'src/Authentication/Schemas/user.schema';
import * as nodemailer from 'nodemailer';



@Injectable()
export class TicketNotificationService {
    constructor(
        @InjectModel(BookTicketSchema.name) private readonly bookTicketModel: Model<BookTicketSchema>,
        @InjectModel(userSchema.name) private readonly userModel:Model<userSchema>
    ) { }

    @Cron('*/1 * * * *')
    async handleNotification() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        const tickets = await this.bookTicketModel.find({
            Date: tomorrowFormatted,
        });
        tickets.forEach(async(ticket) => {
            console.log(`Notify user ${ticket.userId} about the booking on ${ticket.Date}`);
            const payload=await this.userModel.findOne(ticket.userId);
            if(!payload)return;
            //this.sendBookingRemainderEmail(payload.email);
            
        });
    }
    
      private async sendBookingRemainderEmail(to: string) {
        const transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
            user: '2212049@nec.edu.in', 
            pass: 'nahs@12$$' 
          }
        });
    
        const mailOptions = {
          from: '2212049@nec.edu.in', 
          to: to, 
          subject: 'Remainder',
          text: `You ticket booked on Tomorrow !`
        };
    
        try {
          await transporter.sendMail(mailOptions);
          console.log('Booking Notification email sent successfully');
        } catch (error) {
          console.error('Error sending email:', error);
        }
      }
    
}
