import { Controller, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('trigger')
  async triggerPipeline() {
    const result = await this.scheduleService.runFullPipeline();
    return {
      message: `Pipeline completed. Processed ${result.processed} companies.`,
      ...result,
    };
  }
}
