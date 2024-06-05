import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BattleDto } from '../dto-and-response/battle.dto';
import { CemeteryDto } from '../dto-and-response/cemetery.dto';
import { SoldierDto } from '../dto-and-response/soldier.dto';
import { WarCampDto } from '../dto-and-response/warCamp.dto';
import { ConfirmInformationService } from '../services/confirm-information.service';
import { Res } from '@nestjs/common';
import { MemorialDto } from '../dto-and-response/memorial.dto';
import fs = require('fs');
import { FileInterceptor } from '@nestjs/platform-express';
import { HistorianGuardGuard } from '../historian-guard.guard';


@UseGuards(HistorianGuardGuard)
@Controller('confirm-information')
@SetMetadata('roles', ['historian'])
export class ConfirmInformationController {
  constructor(private confirmInformationService: ConfirmInformationService) {}
  @Get('/test')
  getString() {
    return 'ss';
  }

  @Get('/getAllUnconfirmedCount')
  getAllUnconfirmedCount() {
    return this.confirmInformationService.getAllUnconfirmedCount();
  }

  @Get('/getSoldier')
  getSoldier() {
    return this.confirmInformationService.getSoldier();
  }

  @Get('/getCemetery')
  getCemetery() {
    return this.confirmInformationService.getCemetery();
  }

  @Get('/getBattle')
  getBattle() {
    return this.confirmInformationService.getBattle();
  }

  @Get('/getMemorial')
  getMemorial() {
    return this.confirmInformationService.getMemorial();
  }

  @Get('/getWarCamp')
  getWarCamp() {
    return this.confirmInformationService.getWarCamp();
  }
  // here starts changinch state to added
  @Post('/addWarCamp')
  addWarCamp(@Body() warCamp: WarCampDto) {
    return this.confirmInformationService.addWarCamp(warCamp);
  }

  @Delete('/removeWarCamp/:id')
  removeWarCamp(@Param('id') id: string) {
    return this.confirmInformationService.removeWarCamp(id);
  }

  @Post('/addBattle')
  addBattle(@Body() battle: BattleDto) {
    return this.confirmInformationService.addBattle(battle);
  }

  @Delete('/removeBattle/:id')
  removeBattle(@Param('id') id: string) {
    return this.confirmInformationService.removeBattle(id);
  }

  @Post('/addSoldier')
  addSoldier(@Body() soldier: SoldierDto) {
    return this.confirmInformationService.addSoldier(soldier);
  }

  @Delete('/removeSoldier/:id')
  removeSoldier(@Param('id') id: string) {
    return this.confirmInformationService.removeSoldier(id);
  }

  // add cemetery
  @Post('/addCemetery')
  addCemetery(@Body() cemetery: CemeteryDto) {
    return this.confirmInformationService.addCemetery(cemetery);
  }

  // remove cemetery
  @Delete('/removeCemetery/:id')
  removeCemetery(@Param('id') id: string) {
    return this.confirmInformationService.removeCemetery(id);
  }

  @Post('file')
  display(@Body() imagePath: any, @Res() res) {
    res.sendFile(`${imagePath.imagePath}`, { root: './data/memorials' });
  }

  // remove cemetery
  @Delete('/removeMemorial/:id')
  removeMemorial(@Param('id') id: string) {
    return this.confirmInformationService.removeMemorial(id);
  }

  @Post('/addMemorial')
  @UseInterceptors(FileInterceptor('file'))
  addMemorial(
    @Body() memorial: MemorialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file !== undefined) {
      const dirPath = memorial.imagePath.split('/')[1];

      const dir = `./data/memorials/${dirPath}/`;

      if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true });
      }

      const path = this.writeToFile(file, memorial.name);
      memorial.imagePath = path;
      delete memorial.file;

      return this.confirmInformationService.addMemorial(memorial);
    } else {
      memorial.imagePath = memorial.imagePath;
      delete memorial.file;

      return this.confirmInformationService.addMemorial(memorial);
    }
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
}
