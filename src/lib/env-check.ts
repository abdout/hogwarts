/**
 * Environment variables validation for AuthJS
 */

const requiredEnvVars = {
  // OAuth Providers
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  
  // NextAuth
  AUTH_SECRET: process.env.AUTH_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  
  // Email Service
  RESEND_API_KEY: process.env.RESEND_API_KEY,
} as const;

export function validateEnv() {
  const missingVars: string[] = [];
  
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      missingVars.push(key);
    }
  }
  
  if (missingVars.length > 0) {
    console.warn(
      `Warning: The following environment variables are missing: ${missingVars.join(', ')}\n` +
      'Some features may not work correctly.'
    );
  }
  
  return missingVars.length === 0;
} 