import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { srcDestInput } from './Type-Defs/srcDestInput'; import { SourceDestinationService } from './source_destination.service';
import { srcDest } from './Type-Defs/sourDestType';
import { AuthGuard } from 'src/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guard/user,guard';
import { Roles } from 'src/guard/role.assign';

@Resolver()
@UseGuards(AuthGuard) 
export class sourDestResolver {
    constructor(private readonly srcDesService: SourceDestinationService) { }
    @Mutation(() => srcDest)
    @Roles('admin')
    @UseGuards(RolesGuard)
    async addSrcDest(@Args('srcDesInput') srcDesInput: srcDestInput) {
        return this.srcDesService.create(srcDesInput); 
    }
}
