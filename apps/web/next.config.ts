import type { NextConfig } from "next";
import "@workspace/env/web";

const nextConfig: NextConfig = {
  experimental: {
    // Enable filesystem caching for `next build`
    turbopackFileSystemCacheForBuild: true,
    // Enable filesystem caching for `next dev`
    turbopackFileSystemCacheForDev: true,
  },
  reactCompiler: true,
  transpilePackages: ["@workspace/ui", "@workspace/api", "@workspace/env"],
  typedRoutes: true,
  typescript: {
    // `bun run typecheck` (tsrs) is the single type checker; skip Next's own pass.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
