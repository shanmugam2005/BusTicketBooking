import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request: Request = ctx.getContext().req;
        const token = this.getToken(request);

        if (!token) {
            throw new UnauthorizedException("Token is missing");
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            console.log(payload)
            request['user'] = payload; 
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }

    private getToken(request: Request): string | undefined {
        return request.headers.authorization?.split(" ")[1];
    }
}
