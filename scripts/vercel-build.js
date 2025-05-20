const { execSync } = require("child_process")

// Log the start of the build process
console.log("🚀 Starting Vercel build process")

try {
  // Clean any existing generated Prisma files
  console.log("🧹 Cleaning up existing Prisma generated files...")
  execSync("rm -rf node_modules/.prisma")

  // Generate Prisma client
  console.log("🔧 Generating Prisma client...")
  execSync("npx prisma generate")

  // Run the Next.js build
  console.log("🏗️ Building Next.js application...")
  execSync("next build")

  console.log("✅ Build completed successfully!")
} catch (error) {
  console.error("❌ Build failed:", error.message)
  console.error(error.stdout.toString())
  process.exit(1)
}
