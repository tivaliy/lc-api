import { registerAs } from '@nestjs/config';

export const appSettingsKey = 'app';

export type AppSettings = {
  port: number;
};

export default registerAs<AppSettings>(appSettingsKey, () => ({
  port: parseInt(process.env.APP_PORT, 10) || 8888,
}));
