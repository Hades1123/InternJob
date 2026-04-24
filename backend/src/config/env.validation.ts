import { IsStringValue } from '@/common/decorators/IsStringValue.decorator';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, Min, validateSync } from 'class-validator';
import { type StringValue } from 'ms';

class EnvironmentVariables {
  // App
  @Min(1)
  PORT: number;

  @IsNotEmpty()
  FRONTEND_URL: string;

  @IsNotEmpty()
  COMPANY_URL: string;

  @IsNotEmpty()
  JOB_URL: string;

  @IsNotEmpty()
  BASE_URL: string;

  // API key
  @IsNotEmpty()
  GEMINI_MODEL: string;

  @IsNotEmpty()
  GEMINI_KEY: string;

  // Database
  @IsNotEmpty()
  MONGO_USERNAME: string;

  @IsNotEmpty()
  MONGO_PASSWORD: string;

  @IsNotEmpty()
  MONGO_DB_NAME: string;

  @IsNotEmpty()
  MONGO_DB_URL: string;

  // GOOGLE_AUTH
  @IsNotEmpty()
  GOOGLE_AUTH_CLIENT_ID: string;

  @IsNotEmpty()
  GOOGLE_AUTH_CLIENT_SECRET: string;

  @IsNotEmpty()
  GOOGLE_AUTH_CALLBACK_URL: string;

  // JWT
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsStringValue('JWT_ACCESS_TOKEN_EXPIRES', {
    message: 'JWT_ACCESS_TOKEN_EXPIRES must be a valid time string (e.g., "1d", "2h", "30m")',
  })
  JWT_ACCESS_TOKEN_EXPIRES: StringValue;

  @IsNotEmpty()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsStringValue('JWT_REFRESH_TOKEN_EXPIRES', {
    message: 'JWT_REFRESH_TOKEN_EXPIRES must be a valid time string',
  })
  JWT_REFRESH_TOKEN_EXPIRES: StringValue;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    const messages = errors
      .map((error) => {
        const constraint = error.constraints ? Object.values(error.constraints).join(', ') : '';
        return `${constraint}`;
      })
      .join('\n');
    throw new Error(`Environment validation failed:\n${messages}`);
  }
  return validatedConfig;
}
