import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiLoginResponse } from '../dto-and-response/login-response';
import { UserDto } from '../dto-and-response/user.dto';
import { UserCredentialsDto } from '../dto-and-response/userCredentials.dto';
import { UserRegistrationDto } from '../dto-and-response/userRegistration.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() user: UserRegistrationDto) {
    return this.authService.createUser(user);
  }

  @Put('/updateUser')
  @ApiResponse({ status: 401, description: 'Unauthorized user' })
  update(@Body() user: UserDto) {
    return this.authService.updateUser(user);
  }

  @Post('/login')
  @ApiResponse({ status: 401, description: 'Unauthorized user' })
  @ApiLoginResponse()
  getUser(@Body() user: UserCredentialsDto) {
    return this.authService.login(user);
  }

  @Post('/checkUsername')
  checkUser(@Body() userName: any) {
    return this.authService.checkUser(userName.username);
  }

  @Post('/getUserByUsername')
  getUserByUsername(@Body() userName: any) {
    return this.authService.getUserByUsername(userName.username);
  }

  @Post('/logout')
  async logout(@Req() req) {
    const token = req.headers.authorization.split(' ')[1]; //get token from header
    return await this.authService.logout(token); //start logout process
  }
}
