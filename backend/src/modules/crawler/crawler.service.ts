import { createPartFromUri, GoogleGenAI, Part } from '@google/genai';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { DEFAULT_MODEL, PROMPT, UNKNOWN } from 'src/shared/constants/constant';
import * as mammoth from 'mammoth';

interface GeminiSumary {
  positions: {
    title: string;
    techStack: string[];
    requirements: string;
    description: string;
  }[];
  generalNotes: string;
}

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  constructor(@Inject('GEMINI_AI') private readonly ai: GoogleGenAI) {}

  /**
   * Upload file PDF lên Gemini File API và đợi xử lý xong
   */
  async uploadRemotePDF(url: string, displayName: string) {
    const pdfBuffer = await fetch(url).then((response) => response.arrayBuffer());
    const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

    const file = await this.ai.files.upload({
      file: fileBlob,
      config: { displayName },
    });

    let getFile = await this.ai.files.get({ name: file.name ?? UNKNOWN });
    while (getFile.state === 'PROCESSING') {
      getFile = await this.ai.files.get({ name: file.name ?? UNKNOWN });
      this.logger.debug(`File ${displayName} status: ${getFile.state}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (getFile.state === 'FAILED') {
      throw new Error(`File processing failed: ${displayName}`);
    }

    return file;
  }

  /**
   * Strip markdown code block nếu AI trả kèm ```json ... ```
   */
  parseAiResponse(text: string | undefined): GeminiSumary {
    if (!text) {
      return { positions: [], generalNotes: '' };
    }

    // Loại bỏ markdown code block wrapper
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }

    try {
      return JSON.parse(cleaned) as GeminiSumary;
    } catch (error) {
      this.logger.warn(`Failed to parse AI response as JSON: ${error.message}`);
      return { positions: [], generalNotes: cleaned };
    }
  }

  /**
   * Gọi Gemini API với cơ chế retry khi gặp lỗi (ví dụ: 503 Overloaded)
   */
  private async generateContentWithRetry(request: any, maxRetries = 5): Promise<any> {
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        return await this.ai.models.generateContent(request);
      } catch (error) {
        attempt++;
        this.logger.warn(`Gemini API error (attempt ${attempt}/${maxRetries}): ${error.message}`);
        if (attempt >= maxRetries) {
          throw error;
        }
        // Linear/Exponential backoff delay (ví dụ: 5s, 10s...)
        const delayMs = attempt * 5000;
        this.logger.log(`Waiting ${delayMs}ms before retrying...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  /**
   * Xử lý file PDF: upload lên Gemini → AI đọc → trả về JSON
   */
  async processMultipleFiles(urls: string[]): Promise<GeminiSumary> {
    this.logger.log(`Processing ${urls.length} PDF file(s)...`);
    const uploadPromises = urls.map((url, index) => this.uploadRemotePDF(url, `Job_File_${index}`));

    const uploadedFiles = await Promise.all(uploadPromises);
    const content: (string | Part)[] = [PROMPT];

    uploadedFiles.forEach((item) => {
      if (item.uri && item.mimeType) {
        content.push(createPartFromUri(item.uri, item.mimeType));
      }
    });

    const result = await this.generateContentWithRetry({
      model: process.env.GEMINI_MODEL ?? DEFAULT_MODEL,
      contents: content,
    });

    return this.parseAiResponse(result.text);
  }

  /**
   * Xử lý file DOCX: extract text bằng mammoth → AI đọc → trả về JSON
   */
  async processMultipleDocx(urls: string[]): Promise<GeminiSumary> {
    this.logger.log(`Processing ${urls.length} DOCX file(s)...`);
    const extractPromises = urls.map(async (url) => {
      try {
        const response = await fetch(url);
        const buffer = Buffer.from(await response.arrayBuffer());
        const { value } = await mammoth.extractRawText({ buffer });
        return { success: true, content: value };
      } catch (error) {
        this.logger.warn(`Failed to extract DOCX from ${url}: ${error.message}`);
        return { success: false, content: null };
      }
    });

    const results = await Promise.all(extractPromises);
    const validTexts = results
      .filter((item) => item.success && item.content)
      .map((item) => item.content)
      .join('\n---\n');

    if (!validTexts) {
      return { positions: [], generalNotes: 'Không trích xuất được nội dung từ file DOCX' };
    }

    const aiResponse = await this.generateContentWithRetry({
      model: process.env.GEMINI_MODEL ?? DEFAULT_MODEL,
      contents: `${PROMPT}\n\nNội dung tài liệu:\n${validTexts}`,
    });

    return this.parseAiResponse(aiResponse.text);
  }

  /**
   * Pipeline chính: xử lý tất cả file của 1 công ty (ưu tiên PDF, fallback DOCX)
   */
  async processCompanyFiles(files: { name: string; path: string; fileType: string }[]): Promise<GeminiSumary> {
    const baseUrl = process.env.BASE_URL ?? '';

    const pdfFiles = files.filter((f) => f.fileType === 'pdf').map((f) => baseUrl.concat(f.path));

    if (pdfFiles.length > 0) {
      return this.processMultipleFiles(pdfFiles);
    }

    const docxFiles = files.filter((f) => f.fileType === 'docx').map((f) => baseUrl.concat(f.path));

    if (docxFiles.length > 0) {
      return this.processMultipleDocx(docxFiles);
    }

    return { positions: [], generalNotes: 'Không tìm thấy file PDF hoặc DOCX' };
  }
}
