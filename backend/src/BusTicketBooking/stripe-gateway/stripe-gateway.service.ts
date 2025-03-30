import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeGatewayService {
    private stripe: Stripe;

    constructor(private configService: ConfigService) {
        const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET');
        if (!stripeSecretKey) {
            throw new Error('STRIPE_SECRET is not defined in the .env file');
        }
        this.stripe = new Stripe(stripeSecretKey);
    }
    async createPaymentIntent(amount: number, currency: string) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: currency,
                            product_data: {
                                name: 'Ticket Booking',
                            },
                            unit_amount: amount * 100,  // Convert to cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:5173/cancel`,
            });
            return session
        } catch (error) {
            console.log(error)
            throw new Error('Error creating payment intent');
        }
    }
    async createCustomer(email: string, name: string) {
        try {
            const customer = await this.stripe.customers.create({
                email,
                name,
            });
            return customer;
        } catch (error) {
            throw new Error('Error creating Stripe customer');
        }
    }
}
