import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DB_CONNECTION_KEY: process.env.DB_CONNECTION_KEY,
  },
};

export default nextConfig;
