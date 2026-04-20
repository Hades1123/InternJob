import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  port: process.env.PORT || 8000,
  companyUrl: process.env.COMPANY_URL as string,
  jobUrl: process.env.JOB_URL as string,
  baseUrl: process.env.BASE_URL as string,
  geminiModel: process.env.GEMINI_MODEL as string,
  geminiKey: process.env.GEMINI_KEY as string,
}));
