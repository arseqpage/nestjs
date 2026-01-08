import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

// @Injectable()
// export class LoggingMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(`Request: ${req.method}. URL: ${req.url}`);
//
//     next();
//   }
// }

export function LoggingMiddlewareForMain(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Request: ${req.method}. URL: ${req.url}`);
  next();
}
