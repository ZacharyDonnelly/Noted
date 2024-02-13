// @ts-check
import withMDX from '@next/mdx';

/** @type {import('next').NextConfig & import('@next/mdx').NextMDXOptions} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['js', 'mdx', 'ts', 'tsx'],
  sassOptions: {
    includePaths: ['./src/app/styles/**']
  },
  experimental: {
    mdxRs: true
  }
};

export default withMDX(nextConfig);
