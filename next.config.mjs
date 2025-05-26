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
  webpack: (config) => {
    // Fix for leaflet icons
    config.module.rules.push({
      test: /leaflet.+\.png$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]',
      },
    });
    return config;
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'vehicle-tracker.vercel.app']
    }
  }
}

export default nextConfig;
