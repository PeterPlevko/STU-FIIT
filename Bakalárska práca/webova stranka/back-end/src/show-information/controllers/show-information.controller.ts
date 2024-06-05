import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ShowInformationService } from '../services/show-information.service';

@Controller('show-information')
export class ShowInformationController {
  constructor(private showInformationService: ShowInformationService) {}
  // default values adde by me a developer
  @Get('/getSoldierDefault')
  getSoldierDefault() {
    return this.showInformationService.getSoldierDefault();
  }

  @Get('/getCemeteryDefault')
  getCemeteryDefault() {
    return this.showInformationService.getCemeteryDefault();
  }

  @Get('/getBattleDefault')
  getBattleDefault() {
    return this.showInformationService.getBattleDefault();
  }

  @Get('/getMemorialDefault')
  getMemorialDefault() {
    return this.showInformationService.getMemorialDefault();
  }

  @Get('/getWarCampDefault')
  getWarCampDefault() {
    return this.showInformationService.getWarCampDefault();
  }
  // values added by users on my web page
  @Get('/getSoldierAdded')
  getSoldierAdded() {
    return this.showInformationService.getSoldierAdded();
  }

  @Get('/getCemeteryAdded')
  getCemeteryAdded() {
    return this.showInformationService.getCemeteryAdded();
  }

  @Get('/getBattleAdded')
  getBattleAdded() {
    return this.showInformationService.getBattleAdded();
  }

  @Get('/getMemorialAdded')
  getMemorialAdded() {
    return this.showInformationService.getMemorialAdded();
  }

  @Get('/getWarCampAdded')
  getWarCampAdded() {
    return this.showInformationService.getWarCampAdded();
  }

  @Post('file')
  display(@Body() imagePath: any, @Res() res) {
    res.sendFile(`${imagePath.imagePath}`, { root: './data/memorials' });
  }
}
