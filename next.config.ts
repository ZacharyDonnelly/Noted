import type { NextMDXOptions } from '@next/mdx';
import withMDX from '@next/mdx';
import type { NextConfig } from 'next/types';

interface LocalNextConfig extends NextConfig, NextMDXOptions {}

const nextConfig: LocalNextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['js', 'mdx', 'ts', 'tsx'],
  sassOptions: {
    includePaths: ['./src/app/styles/**']
  }
};

export default withMDX(nextConfig);
