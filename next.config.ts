import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

import '@/core/configs/env.config';

const isDev = process.argv.includes('dev');
if (!process.env.VELITE_STARTED && isDev) {
  process.env.VELITE_STARTED = '1';
  void import('velite')
    .then((m) => m.build({ watch: true, clean: false }))
    .catch((error) => {
      console.error('Failed to build with Velite:', error);
      process.exit(1);
    });
}

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    qualities: [75, 85],
  },
};

const withMDX = createMDX({
  // markdown plugins here
});

export default withMDX(nextConfig);
