import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CompanyModule } from '@/modules/company/company.module';

@Module({
  imports: [CompanyModule],
  providers: [CrawlerService],
  exports: [CrawlerService],
})
export class CrawlerModule {}
