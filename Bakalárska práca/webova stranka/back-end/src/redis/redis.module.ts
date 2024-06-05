import { Module, CacheModule } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get('REDIS_HOST'), // hist is set by env. variable REDIS_HOST
        store: redisStore,
        port: 6379,
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService], // This is IMPORTANT,  you need to export RedisCacheService here so that other modules can use it
})
export class RedisModule {}