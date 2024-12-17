/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['html2pdf.js']
  },
  pages: {
    '/preview': {
      ssr: false
    }
  }
};

module.exports = nextConfig;