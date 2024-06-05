import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

interface decodedToken extends JwtPayload {
  username: string;
}
@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  isAdmin(token: string) {
    this.jwtService.verify(token);
    const decoded = jwtDecode<decodedToken>(token); // Returns with the JwtPayload type
    return this.userModel.findOne({ username: decoded.username }).then(user => {
      if (user.userType === 'admin') {
        return true;
      } else {
        return false;
      }
    });
  }

  isHistorian(token: string) {
    this.jwtService.verify(token);
    const decoded = jwtDecode<decodedToken>(token); // Returns with the JwtPayload type
    return this.userModel.findOne({ username: decoded.username }).then(user => {
      if (user.userType === 'historian') {
        return true;
      } else {
        return false;
      }
    });
  }

  isUser(token: string) {
    this.jwtService.verify(token);
    const decoded = jwtDecode<decodedToken>(token); // Returns with the JwtPayload type
    return this.userModel.findOne({ username: decoded.username }).then(user => {
      if (user.userType === 'user' || user.userType === 'historian') {
        return true;
      } else {
        return false;
      }
    });
  }
}
