import type { NextConfig } from 'next'

const nextConfig: NextConfig={
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
        search: '',
      },
      new URL('http://localhost:3000/**'),
      new URL('https://localhost:3000/**'),
      new URL('https://supabase.com/**'),
      new URL('https://stxsnrianylaldkorlgy.supabase.co/**'),
      new URL('https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/public/documentos'),
    ],
  },

}

export default nextConfig