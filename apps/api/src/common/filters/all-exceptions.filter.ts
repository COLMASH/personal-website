import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import * as Sentry from '@sentry/nestjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: unknown = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as Record<string, unknown>).message as string ?? exception.message;
      details = typeof res === 'object' ? (res as Record<string, unknown>).message : undefined;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Resource already exists';
          break;
        case 'P2003':
          status = HttpStatus.CONFLICT;
          message = 'Related resource constraint violation';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Resource not found';
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          message = 'Database error';
      }
    }

    // Sentry error classification
    if (status >= 500) {
      Sentry.captureException(exception, {
        tags: { 'error.type': 'api', 'api.path': request.url, 'api.method': request.method },
        extra: { statusCode: status, message },
      });
    } else if (status >= 400 && status !== 401) {
      Sentry.captureMessage(`${request.method} ${request.url} — ${status}: ${message}`, {
        level: 'warning',
        tags: { 'error.type': 'api', 'api.status': String(status) },
        fingerprint: ['api-error', request.method, request.url, String(status)],
      });
    }

    this.logger.error(`${request.method} ${request.url} — ${status}: ${message}`, exception instanceof Error ? exception.stack : undefined);

    response.status(status).json({
      statusCode: status,
      message,
      ...(details && Array.isArray(details) ? { errors: details } : {}),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
