import { Module } from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { DatasetController } from './dataset.controller';

@Module({
  providers: [DatasetService],
  controllers: [DatasetController],
})
export class DatasetModule {}
