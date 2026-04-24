import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse } from '@/common/interfaces';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, APIResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<APIResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: 'Success',
        data,
      })),
    );
  }
}