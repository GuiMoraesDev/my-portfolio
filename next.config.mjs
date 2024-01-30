/** @type {import('next').NextConfig} */
import withImages from "next-images";

const nextConfig = withImages({
  images: {
    domains: ["raw.githubusercontent.com"],
  },
});

export default nextConfig;
