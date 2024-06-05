import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from 'src/redis/redis/redis.service';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService, private redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization'] !== undefined) {
      //if token is in header
      const token = req.headers.authorization.split(' ')[1]; //get token from header

      try {
        await this.jwtService.verifyAsync(token);
      } catch {
        throw new UnauthorizedException();
      }
      const redisData = await this.redisService.get(token); //token is key in redis, value is '1' if logout was called with this token

      if (redisData === '1') {
        //token is unauthorized, throw exception
        throw new UnauthorizedException();
      }
    } else {
      throw new HttpException(
        'Wrong or missing Authorization',
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }


}
