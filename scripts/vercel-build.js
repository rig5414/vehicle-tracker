const { execSync } = require("child_process");
const fs = require('fs');
const path = require('path');

// Log the start of the build process
console.log("🚀 Starting Vercel build process");

// Function to safely delete directory
function safeRemoveDir(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Successfully removed ${dirPath}`);
    }
  } catch (error) {
    console.warn(`Warning: Could not remove directory ${dirPath}:`, error);
  }
}

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.warn('⚠️ No DATABASE_URL found. Skipping database operations...');
} else {
  try {
    console.log("🧹 Cleaning up existing Prisma generated files...")
    safeRemoveDir(path.join('node_modules', '.prisma'));

    console.log('Running prisma generate...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    // Only run migrations in production
    if (process.env.VERCEL_ENV === 'production') {
      console.log('Running prisma migrations...');
      execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    }
  } catch (error) {
    console.error('⚠️ Database operations failed, but continuing build...');
    console.error(error.message);
  }
}

// Continue with the Next.js build regardless of database status
console.log("🏗️ Building Next.js application...")
try {
  execSync("next build")
  console.log("✅ Build completed successfully!")
} catch (error) {
  console.error("❌ Build failed:", error.message)
  console.error(error.stdout.toString())
  process.exit(1)
}
