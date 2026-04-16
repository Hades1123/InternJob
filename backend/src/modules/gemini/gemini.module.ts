import { Module, Global } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'GEMINI_AI',
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('GEMINI_KEY');
        return new GoogleGenAI({ apiKey });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['GEMINI_AI'],
})
export class GeminiModule {}
