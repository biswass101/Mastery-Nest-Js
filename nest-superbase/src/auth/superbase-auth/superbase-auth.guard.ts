import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable, retry } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SuperbaseAuthGuard implements CanActivate {

  constructor(private configService: ConfigService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No Token Provided!');
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = this.configService.get<string>('SUPERBASE_JWT_SECRET');

    if (!jwtSecret) throw new UnauthorizedException('Jwt secret key not found!');

    try {
      const decode = jwt.verify(token, jwtSecret);
      request['user'] = decode;

      return true;
    } catch (error) {
      if (!jwtSecret) throw new UnauthorizedException('Invalid Token!');

    }

    return true;
  }
}
