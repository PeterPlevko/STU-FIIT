import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { CreateAnnotationDto } from './dto-and-response/create-annotation.dto';
import { CreateAnnotationResponse } from './dto-and-response/create-annotation-response';
import { GetAnnotationsResponse } from './dto-and-response/get-annotations-response';
import { AnnotateColumnDto } from './dto-and-response/annotate-column-dto';
import { GetExportResponse } from './dto-and-response/get-export-response';
import { AnnotationResponse } from './dto-and-response/annotate-column-response';
import { ConnectAnnotationsDto } from './dto-and-response/connect-annotations-dto';
import { GetColumnAnnotationsResponse } from './dto-and-response/get-column-annotations-response';
import { UserGuard } from '../guards/user.guard';

@Controller('annotation')
export class AnnotationController {
  constructor(private readonly annotationService: AnnotationService) {}

  @Post('/createAnnotation')
  @UseGuards(UserGuard)
  async createAnnotation(
    @Body() createAnnotationDto: CreateAnnotationDto,
  ): Promise<CreateAnnotationResponse> {
    return await this.annotationService.createAnnotation(createAnnotationDto);
  }

  @Get('/getAnnotations')
  async getAnnotations(): Promise<GetAnnotationsResponse[]> {
    return await this.annotationService.getAnnotations();
  }

  @Post('/annotateColumn')
  @UseGuards(UserGuard)
  async annotateColumn(
    @Body() annotateColumnDto: AnnotateColumnDto,
  ): Promise<AnnotationResponse[]> {
    return await this.annotationService.annotateColumn(annotateColumnDto);
  }

  @Get('/getExport/:id')
  async getExport(@Param('id') id: string): Promise<GetExportResponse> {
    return await this.annotationService.getExport(id);
  }

  @Delete('/deleteAnnotation/:id')
  @UseGuards(UserGuard)
  async deleteAnnotation(@Param('id') id: string): Promise<string> {
    return await this.annotationService.deleteAnnotation(id);
  }

  @Post('/connectAnnotations')
  @UseGuards(UserGuard)
  async connectAnnotation(
    @Body() connectAnnotationsDto: ConnectAnnotationsDto,
  ): Promise<string> {
    return await this.annotationService.connectAnnotation(
      connectAnnotationsDto,
    );
  }

  @Get('/getColumnAnnotations')
  async getColumnAnnotations(
    @Query('datasetId') datasetId: string,
    @Query('columnName') columnName: string,
  ): Promise<GetColumnAnnotationsResponse[]> {
    const decodedDatasetId = decodeURIComponent(datasetId);
    const decodedColumnName = decodeURIComponent(columnName);
    return await this.annotationService.getColumnAnnotations(
      decodedDatasetId,
      decodedColumnName,
    );
  }
}
