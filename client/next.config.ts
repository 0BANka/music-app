import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: `${process.env.SERVER_URL}/uploads/**`,
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
