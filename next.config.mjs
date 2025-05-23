/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  // Add this to allow access from your local network IP
  allowedDevOrigins: ['http://192.168.1.103:3000'],
  experimental: {
    // Allow more experimental features
    serverActions: true,
  }
}

export default nextConfig;
