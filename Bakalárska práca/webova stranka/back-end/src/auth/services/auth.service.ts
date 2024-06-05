import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from '../dto-and-response/user.dto';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from '../dto-and-response/userCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRegistrationDto } from '../dto-and-response/userRegistration.dto';
import { RedisService } from 'src/redis/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async createUser(user: UserRegistrationDto) {
    if (user.password != user.confirmPassword) {
      throw new HttpException(
        'Wrong or missing Authorization',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const checkIfExists = await this.userModel.findOne({
        username: user.username,
      });
      if (checkIfExists) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      } else {
        delete user.confirmPassword;
        const createdUser = new this.userModel(user);
        createdUser.userType = 'user';
        const salt = await bcrypt.genSalt();
        createdUser.password = await bcrypt.hash(user.password, salt);
        return await createdUser.save();
      }
    }
  }

  // work in progress
  async updateUser(user: UserDto) {
  }

  async login(user: UserCredentialsDto) {
    const userFound = await this.userModel.findOne({ username: user.username });
    if (userFound) {
      const isPasswordCorrect = await bcrypt.compare(
        user.password,
        userFound.password,
      );
      if (isPasswordCorrect) {
        const payload = {
          username: userFound.username,
          userType: userFound.userType,
          firstname: userFound.firstname,
          surname: userFound.surname,
        };

        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
    }
    throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  }

  // work in progress
  async checkUser(user: any) {
    const userFound = await this.userModel.findOne({ username: user });
    return userFound;
  }

  async getUserByUsername(user: any) {
    const userFound = await this.userModel.findOne({ username: user });
    return userFound;
  }

  async logout(token: string) {
    const expire = this.jwtService.decode(token)['exp']; //decode token to get expiration time
    const ttl = parseInt((expire - Date.now() / 1000).toFixed(0)); //ttl for token store in redis, ttl is max time while token is valid, after it is expired

    this.redisService.set(token, '1', ttl); //set logouted token in redis [token] = '1'

    return { message: 'logout successfully' }; //endpoint response
  }
}
