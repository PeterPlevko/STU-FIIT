import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User, UserDocument } from 'src/schemas/user.schema';

interface decodedToken extends JwtPayload {
  username: string;
}

@Injectable()
export class UserGuardGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.headers['authorization'] !== undefined) {
      //if token is in header
      const token = req.headers.authorization.split(' ')[1]; //get token from header

      try {
        this.jwtService.verify(token);
        const decoded = jwtDecode<decodedToken>(token); // Returns with the JwtPayload type
        // work in progress

        return this.userModel
          .findOne({ username: decoded.username })
          .then(user => {
            if (user.userType === 'user' || user.userType === 'historian') {
              return true;
            } else {
              return false;
            }
          });
      } catch {
        throw new UnauthorizedException();
      }
    }
    return false;
  }
}
