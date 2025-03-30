import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { routeType } from "./Type-Defs/route.type";
import { routeInput } from "./Type-Defs/route.input.type";
import { routeService } from "./route.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard} from "src/guard/auth.guard";
import { RolesGuard } from "src/guard/user,guard";
import { Roles } from "src/guard/role.assign";


@Resolver()
@UseGuards(AuthGuard)
export class routeResolver{
    constructor(private readonly routeService:routeService){}
     @Mutation(()=>routeType)
     @Roles('admin')
     @UseGuards(RolesGuard) 
     async addRoute(@Args('routeInput') routeInput:routeInput){
        return this.routeService.addRoute(routeInput)
     }
}