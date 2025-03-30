import { HttpException, Injectable } from '@nestjs/common';
import { busInfoInput } from './Type-Defs/bus-info-input';
import { InjectModel } from '@nestjs/mongoose';
import { BusInfoSchema } from './schema/bus-info.schema';
import { Model } from 'mongoose';
import { SourceDestinationService } from '../source_destination/source_destination.service';
import { routeService } from '../route/route.service';

@Injectable()
export class BusInfoService {
    constructor(@InjectModel(BusInfoSchema.name) private busInfoModel:Model<BusInfoSchema>,
        private srcDestModel:SourceDestinationService,
        private routeModel:routeService
){}
    async create(busInfoInput:busInfoInput){
        const {BusNumber,Brand,Date,price,seats,srcDestId,routeId}=busInfoInput;
        const srcDestID=await this.srcDestModel.getSrcDestId(srcDestId);
        if (!srcDestID) throw new Error("please Give crt src and destinationID");
        const routeID=await this.routeModel.getRouteId(routeId);
        if(!routeID)throw new Error("please Give a valid routeID");
        const val=await this.busInfoModel.create({
            BusNumber, Brand, Date, price, seats,srcDestID,routeID
        })
        return val;

    }
    async getBusInfo(){
        const val=await this.busInfoModel.find({})
        return val;
    }
    async getBusId(srcDestID){
        console.log(srcDestID)
        const val=await this.busInfoModel.findOne({srcDestID});
        return val;
    }
}
