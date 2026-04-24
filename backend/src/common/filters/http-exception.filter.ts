import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { APIResponse } from '@/common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = 'Internal server error';
    let error = undefined;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object') {
      const responseObj = exceptionResponse as Record<string, any>;
      message = responseObj.message || exception.message;
      error = responseObj.error;
    }

    this.logger.error(`${request.method} ${request.url} - ${status}: ${message}`);

    const errorResponse: APIResponse<null> = {
      success: false,
      message: typeof message === 'string' ? message : JSON.stringify(message),
      error: error || HttpStatus[status],
    };

    response.status(status).json(errorResponse);
  }
}