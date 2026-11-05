import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

if (process.env.VERCEL && process.env.NEXT_PUBLIC_SAP_PREVIEW_URL) {
  throw new Error("Remove NEXT_PUBLIC_SAP_PREVIEW_URL before deploying to Vercel");
}

const nextConfig = (phase: string): NextConfig => ({
  // Production builds must not replace the cache of a running dev server.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
});

export default nextConfig;
