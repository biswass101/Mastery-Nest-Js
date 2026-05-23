import {
  HttpException,
  Injectable,
  NestMiddleware,
  Param,
} from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;

    if (!name) throw new Error('You are not allowe');

    console.log('Inside the middleware');
    next();
  }
}
