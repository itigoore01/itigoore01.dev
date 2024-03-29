/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: { dirs: ['.'], ignoreDuringBuilds: true },
  transpilePackages: ['@itigoore01.dev/ui'],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
