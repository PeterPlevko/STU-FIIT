import { Module } from '@nestjs/common';
import { AnnotationController } from './annotation.controller';
import { AnnotationService } from './annotation.service';

@Module({
  controllers: [AnnotationController],
  providers: [AnnotationService],
})
export class AnnotationModule {}
