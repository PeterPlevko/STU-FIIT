import {
  CacheModule,
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTMiddleware } from './security/jwt/jwt.middleware';
import { AddInformationModule } from './add-information/add-information.module';
import { ConfirmInformationModule } from './confirm-information/confirm-information.module';
import { MulterModule } from '@nestjs/platform-express';
import { SeederModule } from './seeder/seeder.module';
import { ShowInformationModule } from './show-information/show-information.module';
import { AdminModule } from './admin/admin.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    SeederModule,
    ShowInformationModule,
    HttpModule,
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_HOST')}:27017/bakalarska-praca`,
      }),
    }),
    
    // MongooseModule.forRoot('mongodb://localhost/bakalarska-praca'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AddInformationModule,
    ConfirmInformationModule,
    MulterModule.register({ dest: './data' }),
    SeederModule,
    ShowInformationModule,
    AdminModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes(AppController);
  } 
}
