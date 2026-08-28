import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit .next/standalone so the container image ships only the traced
  // runtime files instead of the full node_modules tree. This keeps the
  // Cloud Run image small and cold starts fast. It does not change how the
  // app runs locally -- `next start` still works exactly as before.
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
