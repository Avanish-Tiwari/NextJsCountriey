/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['flagcdn.com', 'upload.wikimedia.org'], // Add other domains if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
