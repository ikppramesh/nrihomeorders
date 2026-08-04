/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  transpilePackages: ['@homebridge/ui'],
  images: {
    unoptimized: true,
    domains: ['storage.googleapis.com', 's3.ap-south-1.amazonaws.com'],
  },
};
module.exports = nextConfig;
