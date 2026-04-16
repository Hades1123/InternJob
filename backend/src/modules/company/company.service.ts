import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIResponse } from 'src/shared/types/common';
import { Company } from './schema/company.schema';
import axios from 'axios';
import { JobAPIRes } from 'src/shared/types/company';
import { UNKNOWN } from 'src/shared/constants/constant';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {}
  private readonly logger = new Logger(CompanyService.name);

  async syncCompaniesFromApi(): Promise<APIResponse<any>> {
    try {
      this.logger.log('Fetching companies from API...');
      const response = await axios.get(process.env.COMPANY_URL ?? '');
      const companies = response.data.items;
      let syncedCount = 0;

      for (const item of companies) {
        const currentJobDetailResponse = await axios.get<JobAPIRes>(process.env.JOB_URL?.concat(item._id) ?? '');
        const currentJobDetail = currentJobDetailResponse.data;

        const formatInternFile = currentJobDetail.item.internshipFiles.map((e) => ({
          name: e.name,
          path: e.path,
          fileType: e.name.split('.').pop() ?? UNKNOWN,
        }));

        // Lấy company hiện tại trong DB để giữ lại isProcessed flag
        const existingCompany = await this.companyModel.findOne({ companyId: item._id });
        const existingFiles = existingCompany?.files ?? [];

        // Merge isProcessed flag: nếu file đã tồn tại và đã xử lý thì giữ nguyên
        const mergedFiles = formatInternFile.map((newFile) => {
          const existing = existingFiles.find((f) => f.path === newFile.path);
          return {
            ...newFile,
            isProcessed: existing?.isProcessed ?? false,
            processedAt: existing?.processedAt,
          };
        });

        await this.companyModel.findOneAndUpdate(
          { companyId: item._id },
          {
            companyIcon: item.image,
            shortName: item.shortname,
            fullName: item.fullname,
            address: currentJobDetail.item.address,
            stat: {
              maxAcceptedStudent: currentJobDetail.item.maxAcceptedStudent,
              maxRegister: currentJobDetail.item.maxRegister,
              adminMaxRegister: currentJobDetail.item.adminMaxRegister,
              acceptedIntern: currentJobDetail.item.acceptedIntern,
              studentRegister: currentJobDetail.item.studentRegister,
              studentAccepted: currentJobDetail.item.studentAccepted,
            },
            files: mergedFiles,
          },
          { upsert: true },
        );
        syncedCount++;
      }

      this.logger.log(`[Crawler] Successfully synced ${syncedCount} companies to Database.`);
      return { message: '[Crawler] Success', success: true };
    } catch (error) {
      this.logger.error(`[Crawler] Sync failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Tìm company theo companyId
   */
  async findCompanyByID(companyId: string): Promise<APIResponse<any>> {
    const company = await this.companyModel.findOne({ companyId });
    if (!company) {
      return { message: 'Not exist', success: false };
    }
    return { message: 'Success', success: true, data: company };
  }

  /**
   * Lấy danh sách công ty có file chưa được AI xử lý
   */
  async getUnprocessedCompanies(): Promise<Company[]> {
    return this.companyModel.find({
      'files.isProcessed': false,
    });
  }

  /**
   * Lưu kết quả AI summary và đánh dấu tất cả file đã xử lý
   */
  async saveGeminiSumary(
    companyId: string,
    summary: {
      positions: { title: string; techStack: string[]; requirements: string; description: string }[];
      generalNotes: string;
    },
  ): Promise<void> {
    const allTechStacks = summary.positions.flatMap((item) => item.techStack);
    const uniqueTechStacks = [...new Set(allTechStacks)].map((item) => item.toLowerCase());
    await this.companyModel.updateOne(
      { companyId },
      {
        $set: {
          allTechStacks: uniqueTechStacks,
          GeminiSumary: {
            positions: summary.positions,
            generalNotes: summary.generalNotes,
            updatedAt: new Date(),
          },
          'files.$[].isProcessed': true,
          'files.$[].processedAt': new Date(),
        },
      },
    );
    this.logger.log(`[AI] Saved summary for company ${companyId}`);
  }

  /**
   * Lấy tất cả company (cho Frontend)
   */
  async findAll(): Promise<Company[]> {
    return this.companyModel.find().sort({ shortName: 1 });
  }

  async searchCompanies(options: {
    name?: string;
    address?: string;
    techStacks?: string[];
    techMode?: 'any' | 'all';
    sortBy?: 'updatedAt' | 'createdAt';
    sortOrder?: 1 | -1;
    page?: number;
    pageSize?: number;
  }): Promise<{ data: Company[]; total: number; page: number; pageSize: number }> {
    const query: any = {};

    if (options.name) {
      query.$or = [
        { shortName: { $regex: options.name, $options: 'i' } },
        { fullName: { $regex: options.name, $options: 'i' } },
      ];
    }

    if (options.address) {
      query.address = { $regex: options.address, $options: 'i' };
    }

    if (options.techStacks) {
      query.allTechStacks = options.techMode === 'all' ? { $all: options.techStacks } : { $in: options.techStacks };
    }

    const page = options.page || 1;
    const pageSize = options.pageSize || 10;
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.companyModel
        .find(query)
        .sort({ [options.sortBy ?? 'updatedAt']: options.sortOrder ?? -1 })
        .skip(skip)
        .limit(pageSize),
      this.companyModel.countDocuments(query),
    ]);

    return { data, total, page, pageSize };
  }
}
