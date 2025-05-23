const { execSync } = require("child_process")

// Log the start of the build process
console.log("🚀 Starting Vercel build process")

try {
  // Clean any existing generated Prisma files
  console.log("🧹 Cleaning up existing Prisma generated files...")
  execSync("rm -rf node_modules/.prisma")

  // Only run migrations in production
  if (process.env.VERCEL_ENV === 'production') {
    console.log('Running prisma migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  }

  // Generate Prisma client
  console.log("🔧 Generating Prisma client...")
  execSync("npx prisma generate", { stdio: 'inherit' })

  // Run the Next.js build
  console.log("🏗️ Building Next.js application...")
  execSync("next build")

  console.log("✅ Build completed successfully!")
} catch (error) {
  console.error("❌ Build failed:", error.message)
  console.error(error.stdout.toString())
  process.exit(1)
}
