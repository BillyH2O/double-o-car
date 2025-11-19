import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Prisma engines are not bundled away by Turbopack/Next
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
  // Ensure the Prisma engine folder is traced into the server output
  outputFileTracingIncludes: {
    // Include for App Router API routes
    "app/api/**": ["./node_modules/.prisma/client"],
    // Include for any server code importing Prisma
    "app/**": ["./node_modules/.prisma/client"],
  },
  // Migrate away from deprecated images.domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
