import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CompanyService } from 'src/modules/company/company.service';
import { CrawlerService } from 'src/modules/crawler/crawler.service';
import { CRON_EVERY_20_MINUTES } from 'src/shared/constants/constant';

@Injectable()
export class ScheduleService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ScheduleService.name);
  private isRunning = false;

  constructor(
    private readonly companyService: CompanyService,
    private readonly crawlerService: CrawlerService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Server started — running initial sync...');
    await this.runFullPipeline();
  }

  @Cron(CRON_EVERY_20_MINUTES)
  async handleCron() {
    this.logger.log('Cron job triggered (every 20 minutes)');
    await this.runFullPipeline();
  }

  /**
   * Pipeline chính: Sync companies → AI xử lý file chưa đọc → Lưu DB
   */
  async runFullPipeline(): Promise<{ synced: boolean; processed: number }> {
    if (this.isRunning) {
      this.logger.warn('Pipeline is already running, skipping...');
      return { synced: false, processed: 0 };
    }

    this.isRunning = true;
    let processedCount = 0;

    try {
      // Giai đoạn 1: Sync danh sách công ty + metadata từ API trường
      this.logger.log('=== Phase 1: Syncing companies from API ===');
      await this.companyService.syncCompaniesFromApi();

      // Giai đoạn 2: Tìm công ty có file chưa AI xử lý
      this.logger.log('=== Phase 2: Processing unprocessed files with AI ===');
      const unprocessed = await this.companyService.getUnprocessedCompanies();
      this.logger.log(`Found ${unprocessed.length} companies with unprocessed files`);

      for (const company of unprocessed) {
        try {
          this.logger.log(`Processing: ${company.shortName} (${company.companyId})`);

          const summary = await this.crawlerService.processCompanyFiles(company.files);

          await this.companyService.saveGeminiSumary(company.companyId, summary);

          processedCount++;
          this.logger.log(`✓ Done: ${company.shortName}`);
        } catch (error) {
          this.logger.error(`✗ Failed to process ${company.shortName}: ${error.message}`);
        }
      }

      this.logger.log(`=== Pipeline complete: ${processedCount}/${unprocessed.length} companies processed ===`);
      return { synced: true, processed: processedCount };
    } catch (error) {
      this.logger.error(`Pipeline failed: ${error.message}`);
      return { synced: false, processed: processedCount };
    } finally {
      this.isRunning = false;
    }
  }
}
