import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { CreateDatasetDto } from './dto-and-response/create-dataset.dto';
import { CreateDatasetResponse } from './dto-and-response/create-dataset-response';
import { UpdateDatasetDescriptionDTO } from './dto-and-response/update-dataset-description.dto';
import { UserGuard } from '../guards/user.guard';

@Controller('dataset')
export class DatasetController {
  constructor(private readonly datasetService: DatasetService) {}

  @Post('/createDataset')
  @UseGuards(UserGuard)
  async createDataset(
    @Body() createDatasetDto: CreateDatasetDto,
  ): Promise<CreateDatasetResponse | null> {
    return await this.datasetService.createDataset(createDatasetDto);
  }

  @Get('/getDatasetDescription/:datasetId')
  async getDatasetDescription(
    @Param('datasetId') datasetId: string,
  ): Promise<string> {
    return await this.datasetService.getDatasetDescription(datasetId);
  }

  @Post('/updateDatasetDescription')
  @UseGuards(UserGuard)
  async updateDatasetDescription(
    @Body() updateDatasetDescription: UpdateDatasetDescriptionDTO,
  ): Promise<any> {
    return await this.datasetService.updateDatasetDescription(
      updateDatasetDescription,
    );
  }
}
