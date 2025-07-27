import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
};

export default nextConfig;
