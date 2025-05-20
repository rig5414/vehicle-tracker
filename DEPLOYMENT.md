# Deployment Guide for Vehicle Tracking System

This guide will help you deploy the Vehicle Tracking System to Vercel.

## Prerequisites

- A Vercel account
- A Neon PostgreSQL database (already set up)
- Git repository with your code

## Step 1: Set Up Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project (or import it if not already done)
3. Go to "Settings" > "Environment Variables"
4. Add the following environment variables:

   - `DATABASE_URL`: Your Neon PostgreSQL connection string
     \`\`\`
     postgresql://Vehicle%20Tracking%20System_owner:npg_BJ1LvUlOQDf9@ep-sweet-mountain-abcs3d95-pooler.eu-west-2.aws.neon.tech/Vehicle%20Tracking%20System?sslmode=require
     \`\`\`
   - `NEXTAUTH_SECRET`: A secure random string for session encryption
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., https://your-app.vercel.app)
   - `API_KEY_SECRET`: A secure random string for API key generation

## Step 2: Deploy to Vercel

1. Connect your Git repository to Vercel
2. Configure the build settings:
   - Build Command: `npm run build` (this will run prisma generate automatically)
   - Output Directory: `.next`
   - Install Command: `npm install`

3. Deploy your application

## Step 3: Initialize Your Database

After deployment, you need to initialize your database schema:

1. Locally, run:
   \`\`\`bash
   npx prisma db push
   \`\`\`

2. Optionally, seed your database with initial data:
   \`\`\`bash
   npx prisma db seed
   \`\`\`

## Step 4: Verify Deployment

1. Visit your deployed application URL
2. Log in with the default admin credentials:
   - Email: admin@example.com
   - Password: password123

## Troubleshooting

If you encounter any issues:

1. Check Vercel build logs for errors
2. Verify environment variables are correctly set
3. Ensure your database is accessible from Vercel's servers
4. Check that Prisma Client is being generated during the build process

For Prisma-specific issues, refer to the [Prisma documentation on Vercel deployment](https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-vercel).
