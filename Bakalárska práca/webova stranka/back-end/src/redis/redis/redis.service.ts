import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  @Inject(CACHE_MANAGER) private readonly cache: Cache;

  async getArray(key: string): Promise<string[]> {
    //get value from redis store
    return await this.cache.get(key);
  }

  async get(key: string): Promise<string> {
    //get value from redis store
    return await this.cache.get(key);
  }

  async set(key: string, value: string, ttl = 3600) {
    //set value in redis store, ttl is 3600 seconds if it is not given otherwise
    await this.cache.set(key, value, { ttl: ttl });
  }

  async remove(key: string) {
    //remove value from redis store
    await this.cache.del(key);
  }

  async reset() {
    //reset all values from redis store
    await this.cache.reset();
  }
}