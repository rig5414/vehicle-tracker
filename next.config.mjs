/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add this to allow access from your local network IP
  allowedDevOrigins: ['http://192.168.1.103:3000'],
}

export default nextConfig
