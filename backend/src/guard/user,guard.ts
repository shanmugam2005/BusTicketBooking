// roles.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<string>('role', context.getHandler());  // Get role metadata

        if (!requiredRole) {
            throw new UnauthorizedException('Role not specified');
        }

        const ctx = GqlExecutionContext.create(context);  
        const request = ctx.getContext().req;              
        const user = request['user'];                      

        if (!user) {
            throw new UnauthorizedException('User is not authenticated');
        }

        if (user.role !== requiredRole) {
            throw new UnauthorizedException('You do not have the required role');
        }

        return true;
    }
}
