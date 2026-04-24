// Global configs
export { envConfig } from './app.config';
export { default as databaseConfig } from './database.config';

// Module-specific configs (use with ConfigModule.forFeature)
export { accessJwtConfig, refreshJwtConfig } from './jwt.config';
export { googleOAuthConfig } from './oauth.config';

// Validation
export * from './env.validation';
