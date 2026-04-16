import { Controller, Get, Param, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './schema/company.schema';
import { SearchCompanyDto } from './dto/search.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

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
    const { address, name, techStacks, techMode, sortBy, sortOrder, page, pageSize } = query;
    const result = await this.companyService.searchCompanies({
      address,
      name,
      techStacks: techStacks?.split(','),
      techMode,
      sortBy,
      sortOrder: sortOrder == 'asc' ? 1 : -1,
      page,
      pageSize,
    });

    return {
      success: true,
      data: result.data,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }
}
