import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter
  implements ExceptionFilter
{
  catch(exception: unknown, host: ArgumentsHost) {
    if (host.getType<'http' | 'rpc' | 'ws' | 'graphql'>() !== 'http') {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let errors: any = null;

    // 1. Handle Nest HTTP exceptions (BadRequest, NotFound, etc.)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();

      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object') {
        const r = response as any;

        message = r.message || message;
        errors = r.message && Array.isArray(r.message)
          ? r.message
          : r.errors || null;
      }
    }

    // 2. Handle MongoDB/Mongoose errors
    if ((exception as any)?.name === 'MongoServerError') {
      const err = exception as any;

      status = 400;
      message = err.message;

      // duplicate key error (common)
      if (err.code === 11000) {
        message = 'Duplicate key error';
        errors = err.keyValue;
      }
    }

    // 3. Handle unexpected errors
    if (status === 500 && exception instanceof Error) {
      message = exception.message;
    }

    res.status(status).json({
      success: false,
      statusCode: status,
      path: req.url,
      method: req.method,
      timestamp: new Date().toISOString(),
      message,
      errors,
    });
  }
}
