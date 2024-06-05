import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { CemeteryDto } from '../dto-and-response/cemetery.dto';
import { MemorialDto } from '../dto-and-response/memorial.dto';
import { AddInformationService } from '../services/add-information.service';
import { WarCampDto } from '../dto-and-response/warCamp.dto';
import { SoldierDto } from '../dto-and-response/soldier.dto';
import { BattleDto } from '../dto-and-response/battle.dto';
import fs = require('fs');
import { fileURLToPath } from 'url';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import path, { extname } from 'path';
import { json } from 'stream/consumers';
import { UserGuardGuard } from '../user-guard.guard';

@UseGuards(UserGuardGuard)
@Controller('add-information')
@SetMetadata('roles', ['historian', 'admin', 'user'])
export class AddInformationController {
  constructor(private informationService: AddInformationService) {}

  @Get('/test')
  getString() {
    return 'ss';
  }

  @Post('/memorial')
  @UseInterceptors(FileInterceptor('file'))
  addMemorial(
    @Body() memorial: MemorialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const path = this.writeToFile(file, memorial.name);
    delete memorial.file;
    memorial.imagePath = path;

    return this.informationService.addMemorial(memorial);
  }

  @Post('/cemetery')
  addCemetery(@Body() cemetery: CemeteryDto) {
    return this.informationService.addCemetery(cemetery);
  }

  @Post('/warcamp')
  addWarCamp(@Body() warCamp: WarCampDto) {
    return this.informationService.addWarCamp(warCamp);
  }

  @Post('/soldier')
  addSoldier(@Body() soldier: SoldierDto) {
    return this.informationService.addSoldier(soldier);
  }

  @Post('/battle')
  addBattle(@Body() battle: BattleDto) {
    return this.informationService.addBattle(battle);
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

  readImage(entry_id: string) {
    let base64data = 'none';
    try {
      const buff = fs.readFileSync('./memorials/' + entry_id + '.jpg');
      base64data = buff.toString('base64');
    } catch (e) {
      base64data = 'none';
    }

    return base64data;
  }

  @Post('file')
  display(@Body() imagePath: any, @Res() res) {
    res.sendFile(`${imagePath.imagePath}`, { root: './data/memorials' });
  }
}
