import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:8000",
  },
  experimental: {
    allowedDevOrigins: ['http://192.168.1.150:3000'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
  }
};

export default nextConfig;
