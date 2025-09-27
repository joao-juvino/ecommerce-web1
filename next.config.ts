// next.config.ts

import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Adicione esta seção de 'images'
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/static/imagens_produtos/**',
      },
    ],
  },
};

export default nextConfig;