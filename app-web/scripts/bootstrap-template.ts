#!/usr/bin/env pnpm tsx
/**
 * Bootstrap template: install, Prisma generate, db push, and print Vercel CLI steps.
 * Run from repo root: pnpm tsx scripts/bootstrap-template.ts
 * Or: cd app-web && pnpm tsx scripts/bootstrap-template.ts
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLATFORM_ROOT = join(__dirname, "..");

console.log("=== GreenCircle app-web bootstrap ===\n");

// 1. pnpm install
console.log("1. Running pnpm install...");
execSync("pnpm install", { cwd: PLATFORM_ROOT, stdio: "inherit" });
console.log("   ✓ Dependencies installed\n");

// 2. Prisma generate
console.log("2. Generating Prisma client...");
execSync("pnpm exec prisma generate", { cwd: PLATFORM_ROOT, stdio: "inherit" });
console.log("   ✓ Prisma client generated\n");

// 3. Prisma db push (optional - may fail if no DB)
console.log("3. Pushing Prisma schema to database...");
try {
  execSync("pnpm db:push", { cwd: PLATFORM_ROOT, stdio: "inherit" });
  console.log("   ✓ Database schema pushed\n");
} catch {
  console.log("   ⚠ db:push failed (ensure DATABASE_URL is set in .env)\n");
}

// 4. Vercel CLI steps
console.log("=== Vercel deployment steps ===\n");
console.log("From the app-web directory, run:\n");
console.log("  cd app-web");
console.log("  pnpm dlx vercel link    # Link to existing project, or");
console.log("  pnpm dlx vercel         # Deploy (creates project if needed)");
console.log("  pnpm dlx vercel --prod  # Production deploy\n");
console.log("Set environment variables in Vercel dashboard:");
console.log("  - DATABASE_URL");
console.log("  - AUTH_SECRET");
console.log("  - NEXTAUTH_URL (e.g. https://yourapp.vercel.app)\n");
console.log("=== Bootstrap complete ===\n");
