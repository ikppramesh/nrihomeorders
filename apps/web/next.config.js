/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['@homebridge/ui'],
  images: {
    unoptimized: true,
    domains: ['storage.googleapis.com', 's3.ap-south-1.amazonaws.com'],
  },
};
module.exports = nextConfig;
