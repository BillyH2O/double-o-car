import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  // Ensure Prisma engines are not bundled away by Turbopack/Next
  serverExternalPackages: ["@prisma/client", "prisma"],
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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
