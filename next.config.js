const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig & import('@next/mdx').NextMDXOptions} */
const nextConfig = withMDX({
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['js', 'mdx', 'ts', 'tsx'],
  sassOptions: {
    includePaths: ['./src/app/styles/**']
  },
  experimental: {
    mdxRs: true
  }
});
module.exports = nextConfig;
