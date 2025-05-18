import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class SuccessInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        data,
        status: 0,
        extra: {},
        message: 'success',
        success: true,
      })),
    );
  }
}
