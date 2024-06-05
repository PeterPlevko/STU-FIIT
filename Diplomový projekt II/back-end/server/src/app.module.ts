import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { Neo4jModule } from './neo4j/neo4j.module';
import { AnnotationModule } from './api/annotation/annotation.module';
import { FirebaseService } from './firebase/fire-base.service';
import { SeederService } from './seeders/seeder-service';
import { SeedNeo4jService } from './seeders/seed-neo4j-service';
import { DatasetModule } from './api/dataset/dataset.module';
import { ColumnModule } from './api/column/column.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    Neo4jModule.forRootAsync(),
    AnnotationModule,
    DatasetModule,
    ColumnModule,
  ],
  controllers: [AppController],
  providers: [FirebaseService, SeederService, SeedNeo4jService],
})
export class AppModule {}
