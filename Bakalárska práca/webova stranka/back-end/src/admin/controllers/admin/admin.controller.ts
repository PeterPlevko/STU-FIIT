import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { AdminService } from 'src/admin/services/admin/admin.service';
import fs = require('fs');
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/security/admin.guard';
var rimraf = require("rimraf");

@UseGuards(AdminGuard)
@Controller('admin')
@SetMetadata('roles', ['admin'])

export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/verifyToken')
  verifyToken(){
    return true
  }

  @Get('/getUsers')
  getUsers() {
    return this.adminService.getAllUsers();
  }

  @Delete('/deleteUser/:id')
  removeUser(@Param('id') id: string) {

    return this.adminService.removeUser(id);
  }

  @Put('/updateUser')
  update(@Body() user: any) {

    return this.adminService.updateUser(user);
  }

  @Post('/addIssue')
  addUser(@Body() user: any) {

    return this.adminService.addUser(user);
  }

  ////////////////////////////////////////// cemetery
  @Get('/getCemeteries')
  getCemeteries() {
    return this.adminService.getCemeteries();
  }

  @Delete('/deleteCemetery/:id')
  removeCemetery(@Param('id') id: string) {

    return this.adminService.removeCemetery(id);
  }

  @Put('/updateCemetery')
  updateCemetery(@Body() cemetery: any) {

    return this.adminService.updateCemetery(cemetery);
  }

  @Post('/addCemetery')
  addCemetery(@Body() cemetery: any) {

    return this.adminService.addCemetery(cemetery);
  }

  ////////////////////////////////////////// soldier
  @Get('/getSoldiers')
  getSoldiers() {
    return this.adminService.getSoldiers();
  }

  @Delete('/deleteSoldier/:id')
  deleteSoldier(@Param('id') id: string) {

    return this.adminService.deleteSoldier(id);
  }

  @Put('/updateSoldier')
  updateSoldier(@Body() soldier: any) {

    return this.adminService.updateSoldier(soldier);
  }

  @Post('/addSoldier')
  addSoldier(@Body() soldier: any) {

    return this.adminService.addSoldier(soldier);
  }

  ////////////////////////////////////////// boj
  @Get('/getBattles')
  getBattles() {
    return this.adminService.getBattles();
  }

  @Delete('/deleteBattle/:id')
  deleteBattle(@Param('id') id: string) {

    return this.adminService.deleteBattle(id);
  }

  @Put('/updateBattle')
  updateBattle(@Body() battle: any) {

    return this.adminService.updateBattle(battle);
  }

  @Post('/addBattle')
  addBattle(@Body() battle: any) {

    return this.adminService.addBattle(battle);
  }

  ////////////////////////////////////////// zajatecky tabor
  @Get('/getWarCamps')
  getWarCamps() {
    return this.adminService.getWarCamps();
  }

  @Delete('/deleteWarCamp/:id')
  deleteWarCamp(@Param('id') id: string) {

    return this.adminService.deleteWarCamp(id);
  }

  @Put('/updateWarCamp')
  updateWarCamp(@Body() warCamp: any) {

    return this.adminService.updateWarCamp(warCamp);
  }

  @Post('/addWarCamp')
  addWarCamp(@Body() warCamp: any) {

    return this.adminService.addWarCamp(warCamp);
  }

  ////////////////////////////////////////// pamatnik
  @Get('/getMemorials')
  getMemorials() {
    return this.adminService.getMemorials();
  }

  @Delete('/deleteMemorial/:id')
  async deleteMemorial(@Param('id') id: string) {
    const memorial = await this.adminService.getMemorialById(id);
    this.deleteFile(memorial.imagePath);
    return this.adminService.deleteMemorial(id);
  }

  @Put('/updateMemorial')
  @UseInterceptors(FileInterceptor('file'))
  updateMemorial(@Body() memorial: any, @UploadedFile() file: Express.Multer.File,) {
    this.deleteFile(memorial.imagePath);
    const path = this.writeToFile(file, memorial.name);
    delete memorial.file;
    memorial.imagePath = path;
    return this.adminService.updateMemorial(memorial);
  }

  @Put('/updateMemorialWithoutFile')
  updateMemorialWithoutFile(@Body() memorial: any) {
    return this.adminService.updateMemorialWithoutFile(memorial);
  }

  @Post('/addMemorial')
  @UseInterceptors(FileInterceptor('file'))
  addMemorial(@Body() memorial: any, @UploadedFile() file: Express.Multer.File,) {
    const path = this.writeToFile(file, memorial.name);
    delete memorial.file;
    memorial.imagePath = path;
    return this.adminService.addMemorial(memorial);
  }

   // here i write and read a file
   writeToFile(file, memorialName) {
    const dir = `./data/memorials/${memorialName}/`;
    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true });
    }

    fs.mkdir(dir, err => {
      if (err) {
        throw err;
      }
    });
    const fileName = file.originalname.split('.')[0];
    const extension = file.originalname.split('.')[1];

    const writeStream = fs.createWriteStream(
      `./data/memorials/${memorialName}/${fileName}.${extension}`,
    );
    const myPath = `/${memorialName}/${fileName}.${extension}`;

    writeStream.write(file.buffer);
    writeStream.end();
    return myPath;
  }

  deleteFile(fileName: any){

    let dirName = fileName.split('/')[1];

    const dir = `./data/memorials/${dirName}/`;

    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true });
    }
  }

  @Post('file')
  display(@Body() imagePath: any, @Res() res) {
    res.sendFile(`${imagePath.imagePath}`, { root: './data/memorials' });
  }
}
