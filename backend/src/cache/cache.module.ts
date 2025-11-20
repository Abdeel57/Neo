import { Module, Global } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        
        // Si hay Redis URL, usar Redis, sino usar memoria
        if (redisUrl) {
          return {
            store: redisStore,
            url: redisUrl,
            ttl: 300, // TTL por defecto: 5 minutos
            max: 1000, // Máximo de items en cache
          };
        }
        
        // Fallback a memoria si no hay Redis
        return {
          ttl: 300,
          max: 1000,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}

