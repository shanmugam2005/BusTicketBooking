import { Module } from '@nestjs/common';
import { StripeGatewayService } from './stripe-gateway.service';

@Module({
  providers: [StripeGatewayService],
  exports:[StripeGatewayService]
})
export class StripeGatewayModule {}
