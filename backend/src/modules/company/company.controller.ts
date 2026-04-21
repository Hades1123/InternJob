import { Controller, Get, Param, HttpCode, HttpStatus, Query, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './schema/company.schema';
import { SearchCompanyDto } from './dto/search.dto';
import type { APIResponse } from 'src/shared/types/common';
import { UpdateSummaryDto } from './dto/update-summary.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<APIResponse<Company[]>> {
    const result = await this.companyService.findAllCompanies();
    return {
      message: 'success',
      success: true,
      data: result,
    };
  }

  @Get(':companyId')
  @HttpCode(HttpStatus.OK)
  async getCompanyById(
    @Param('companyId') companyId: string,
  ): Promise<{ success: boolean; data?: Company; message?: string }> {
    const result = await this.companyService.findCompanyByID(companyId);
    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }
    return {
      success: true,
      data: result.data,
    };
  }

  @Get()
  async getAllCompanies(@Query() query: SearchCompanyDto) {
    const { address, name, techStacks, techMode, sortBy, sortOrder, page, pageSize, checked, liked, position } = query;
    const result = await this.companyService.searchCompanies({
      address,
      name,
      techStacks: techStacks?.split(','),
      techMode,
      sortBy,
      sortOrder: sortOrder == 'asc' ? 1 : -1,
      page,
      pageSize,
      checked,
      liked,
      position,
    });

    return {
      success: true,
      data: result.data,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  @Post('checked')
  async checkedCompany(@Body() body: { id: string; checked: boolean }) {
    const { checked, id } = body;
    return this.companyService.checkCompany(id, checked);
  }

  @Post('liked')
  async likedCompany(@Body() body: { id: string; liked: boolean }) {
    const { liked, id } = body;
    return this.companyService.likeCompany(id, liked);
  }

  @Post('summary')
  async updateSummary(@Body() body: UpdateSummaryDto): Promise<APIResponse<Company>> {
    const { allTechStacks, generalNotes, id } = body;
    const data = await this.companyService.updateSummary(id, allTechStacks, generalNotes);
    return {
      message: 'Update successfully',
      success: true,
      data,
    };
  }
}
