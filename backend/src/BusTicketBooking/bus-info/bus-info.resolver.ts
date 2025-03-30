import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BusInfoService } from './bus-info.service';
import { busInfoType } from './Type-Defs/bus-info.type';
import { busInfoInput } from './Type-Defs/bus-info-input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/guard/role.assign';
import { RolesGuard } from 'src/guard/user,guard';

@Resolver()
@UseGuards(AuthGuard)
export class BusInfoResolver {
    constructor(private readonly busInfoService: BusInfoService) { }

    @Mutation(() => busInfoType)
    @Roles('admin')      
    @UseGuards(RolesGuard)
    async addBusInfo(@Args('BusInfoInput') busInfoInput: busInfoInput) {
        const val = await this.busInfoService.create(busInfoInput);
        return val;
    }

    @UseGuards(AuthGuard)
    @Query(() => [busInfoType])
    async getBusInfo() {
        const val = await this.busInfoService.getBusInfo();
        return val;
    }
}
