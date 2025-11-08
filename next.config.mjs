/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.catalog-store.link",
      },
    ],
  },
};

export default nextConfig;
