import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  // App
  @IsNumber()
  PORT: number;

  @IsString()
  COMPANY_URL: string;

  @IsString()
  JOB_URL: string;

  @IsString()
  BASE_URL: string;

  // API key
  @IsString()
  GEMINI_MODEL: string;

  @IsString()
  GEMINI_KEY: string;

  // Database
  @IsString()
  MONGO_USERNAME: string;

  @IsString()
  MONGO_PASSWORD: string;

  @IsString()
  MONGO_DB_NAME: string;

  @IsString()
  MONGO_DB_URL: string;

  // GOOGLE_AUTH
  @IsString()
  GOOGLE_AUTH_CLIENT_ID: string;

  @IsString()
  GOOGLE_AUTH_CLIENT_SECRET: string;

  @IsString()
  GOOGLE_AUTH_CALLBACK_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
