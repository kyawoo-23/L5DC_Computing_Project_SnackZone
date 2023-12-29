/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/orders",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
