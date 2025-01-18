import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: ["avatars.githubusercontent.com", "i.ibb.co", "lh3.googleusercontent.com"],
  }
};

export default nextConfig;
