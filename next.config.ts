import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Désactive ESLint lors du build
},
};

export default nextConfig;
