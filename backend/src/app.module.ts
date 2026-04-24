import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CrawlerModule } from '@/modules/crawler/crawler.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GeminiModule } from '@/modules/gemini/gemini.module';
import { JobScheduleModule } from '@/modules/schedule/schedule.module';
import { validate } from '@/config/env.validation';
import environmentConfig from '@/config/env.config';
import googleOAuthConfig from '@/config/google-oauth.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate, load: [environmentConfig, googleOAuthConfig] }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL ?? ''),
    GeminiModule,
    CrawlerModule,
    JobScheduleModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
