import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new Error('Not authorized');
    }
    next();
  }
}
