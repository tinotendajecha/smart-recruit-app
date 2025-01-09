import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add a rule to ignore .node files
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader", // Add node-loader to handle .node files
    });

    return config;
  },
  // images: {
  //   domains: ['unsplash.com'], // Add this line to allow Unsplash images
  // },
};

export default nextConfig;
