import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CrawlerModule } from 'src/modules/crawler/crawler.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GeminiModule } from 'src/modules/gemini/gemini.module';
import { JobScheduleModule } from 'src/modules/schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL ?? ''),
    GeminiModule,
    CrawlerModule,
    JobScheduleModule,
  ],
})
export class AppModule {}
