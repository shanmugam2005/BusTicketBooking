import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { routeSchema } from './schema/route.schema';
import { Model } from 'mongoose';
import { routeInput } from './Type-Defs/route.input.type';

@Injectable()
export class routeService {
  constructor(@InjectModel(routeSchema.name) private routeModel:Model<routeSchema>){}
  async addRoute(routeInput:routeInput){
      const {routeID,path}=routeInput;
      const flag = await this.routeModel.findOne({ routeID })
      if (flag) return flag;
      const val = await this.routeModel.create({
        routeID, 
          path
      });
      return val;

  }

  async getRouteId(routeId:string){
    const flag = await this.routeModel.findOne({routeID:routeId} )
    return flag?._id;


  }
}
