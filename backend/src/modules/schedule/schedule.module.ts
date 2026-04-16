import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CompanyModule } from 'src/modules/company/company.module';
import { CrawlerModule } from 'src/modules/crawler/crawler.module';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [CompanyModule, CrawlerModule],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class JobScheduleModule {}
