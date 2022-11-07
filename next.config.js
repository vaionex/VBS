/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'tailwindui.com',
    ],
  },
}

module.exports = nextConfig
