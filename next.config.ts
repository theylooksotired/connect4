import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/connect4",
  experimental: {
    agentFeedback: true,
  },
  output: "export"
};

export default nextConfig;
