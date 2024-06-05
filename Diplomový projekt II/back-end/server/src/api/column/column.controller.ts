import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ColumnService } from './column.service';
import { GetColumnDescriptionResponse } from './dto-and-response/get-column-description-response';
import { UpdateOrCreateDTO } from './dto-and-response/update-or-create.dto';
import { UpdateOrCreateResponse } from './dto-and-response/update-or-create-response';
import { UserGuard } from '../guards/user.guard';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  // in some later time move this into a separate controller
  @Get('/getColumnDescription')
  async getColumnDescription(
    @Query('columnName') columnName: string,
    @Query('datasetId') datasetId: string,
  ): Promise<GetColumnDescriptionResponse | null> {
    const decodedColumnName = decodeURIComponent(columnName);
    const decodedDatasetId = decodeURIComponent(datasetId);

    // You can now use encodedName and datasetName in your method
    return await this.columnService.getColumnDescription(
      decodedColumnName,
      decodedDatasetId,
    );
  }

  @Post('/updateOrCreate')
  @UseGuards(UserGuard)
  async annotateColumn(
    @Body() updateOrCreate: UpdateOrCreateDTO,
  ): Promise<UpdateOrCreateResponse[]> {
    return await this.columnService.updateOrCreate(updateOrCreate);
  }
}
