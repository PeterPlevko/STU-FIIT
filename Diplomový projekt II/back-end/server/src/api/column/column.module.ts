import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  providers: [ColumnService],
  controllers: [ColumnController],
})
export class ColumnModule {}
