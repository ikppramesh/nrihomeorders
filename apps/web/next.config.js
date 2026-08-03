/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@homebridge/ui'],
  images: {
    domains: ['storage.googleapis.com', 's3.ap-south-1.amazonaws.com'],
  },
};
module.exports = nextConfig;
