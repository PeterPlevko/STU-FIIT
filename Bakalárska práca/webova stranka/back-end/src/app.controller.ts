import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'This is a test' })
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('/isAdmin')
  isAdmin(@Req() req){
    const token = req.headers.authorization.split(' ')[1]; //get token from header
    return this.appService.isAdmin(token);
  }

  @Get('/isHistorian')
  isHistorian(@Req() req){
    const token = req.headers.authorization.split(' ')[1]; //get token from header
    return this.appService.isHistorian(token);
  }

  @Get('/isUser')
  isUser(@Req() req){
    const token = req.headers.authorization.split(' ')[1]; //get token from header
    return this.appService.isUser(token);
  }
}
