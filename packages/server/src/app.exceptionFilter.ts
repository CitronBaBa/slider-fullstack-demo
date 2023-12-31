import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BizException } from './util/util.exception';

export type StandardErrorResponse = {
  statusCode: number;
  timestamp: string;
  path: string;
  hint?: string;
  bizCode?: string;
};

@Catch(BizException)
export class BizExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: BizException, host: ArgumentsHost): void {
    console.error('BizExceptionFilter:', exception);

    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const responseBody: StandardErrorResponse = {
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      hint: exception.hint,
      bizCode: exception.bizCode,
    };

    httpAdapter.setHeader(
      ctx.getResponse(),
      'Content-Type',
      'application/json'
    );
    httpAdapter.reply(
      ctx.getResponse(),
      JSON.stringify(responseBody),
      exception.getStatus()
    );
  }
}

@Catch()
export class RootExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    console.error('RootExceptionFilter:', exception);

    const httpStatusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    // TODO unify these error handling logics in one place
    const responseBody: StandardErrorResponse = {
      statusCode: httpStatusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.setHeader(
      ctx.getResponse(),
      'Content-Type',
      'application/json'
    );
    httpAdapter.reply(
      ctx.getResponse(),
      JSON.stringify(responseBody),
      httpStatusCode
    );
  }
}
