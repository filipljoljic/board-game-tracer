import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Automatically optimize package imports to avoid loading entire libraries
    // This transforms barrel imports into direct imports at build time
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
