import * as dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();
const envSchema = z.object({
    APP_HOST: z.string().url(),
    APP_PORT: z.string().regex(/^\d+$/),
    DB_NAME: z.string()
});
export const env = envSchema.parse(process.env);
