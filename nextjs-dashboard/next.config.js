/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 's7d2.scene7.com',
            port: '',
            pathname: '/is/image/Caterpillar/**',
          },
        ],
      },
};

module.exports = nextConfig;
