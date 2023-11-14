/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://firebasestorage.googleapis.com'],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://flask-production-85d1.up.railway.app/',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin', // "same-origin-allow-popups"
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/profile',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
