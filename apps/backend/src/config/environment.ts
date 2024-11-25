import { z } from '../deps'

const envSchema = z.object({
  PORT: z.string().default("8000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_PRIVATE_KEY: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  API_VERSION: z.string().default("1.0.0")
});

const parsed = envSchema.safeParse(Deno.env.toObject());

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  Deno.exit(1);
}

export const config = {
  port: parseInt(parsed.data.PORT),
  environment: parsed.data.NODE_ENV,
  version: parsed.data.API_VERSION,
  firebase: {
    projectId: parsed.data.FIREBASE_PROJECT_ID,
    privateKey: parsed.data.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: parsed.data.FIREBASE_CLIENT_EMAIL
  }
};