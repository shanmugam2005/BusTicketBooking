import { Injectable } from '@nestjs/common';
import { srcDestInput } from './Type-Defs/srcDestInput'; 
import { InjectModel } from '@nestjs/mongoose';
import { srcDestSchema } from './schema/src-dest.schema';
import { Model } from 'mongoose';

@Injectable()
export class SourceDestinationService {
    constructor(@InjectModel(srcDestSchema.name) private srcDestModel:Model<srcDestSchema>){}
    async create(srcDesInput: srcDestInput){
        const {from,to}=srcDesInput;
        const flag=await this.srcDestModel.findOne({from,to})
        if (!flag) return flag;
      const val= await this.srcDestModel.create({
        from,
        to
       });
       return val
    }
    
    async getSrcDestId(srcDesId:string){
      const flag = await this.srcDestModel.findOne({srcDestId:srcDesId});
      return flag?._id;
    }
    async getSourceDestId(from:string,to:string){
        const flag=await this.srcDestModel.findOne({from,to});
      return flag?._id;
    }
}
