import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookTicketsService } from './book-tickets.service';
import { ticketInput } from './type-defs/ticketInput';
import { bookTickets } from './type-defs/bookTickets';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guard/user,guard';
import { AuthGuard } from 'src/guard/auth.guard';


@Resolver()
//@UseGuards(AuthGuard) 

export class BookTicketsResolver {
    constructor(private readonly bookService:BookTicketsService){}
    @Mutation(() => bookTickets)
    async bookTicket(@Args('ticketInput') ticketInput: ticketInput) {
        try {
            const result = await this.bookService.create(ticketInput);
            return result;
        } catch (err) {
            console.error('Error in booking ticket:', err);
            throw new Error('Internal server error');
        }
    }

}
